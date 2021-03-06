﻿using AutoMapper;
using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using iNube.Utility.Framework.Notification;
using System.Threading.Tasks;
using iNube.Utility.Framework.Model;
using iNube.Services.UserManagement.Helpers;
using iNube.Services.UserManagement.Entities.MICACP;
using iNube.Services.UserManagement.Controllers.CustomerProvisioning.IntegrationService;

namespace iNube.Services.UserManagement.Controllers.UserProfile.UserProfileService.MicaProfile
{
    public class MicaProfileService : IUserProductService
    {
        private MICAUMContext _context;
        private MICACPContext _cpcontext;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private bool Result;
        public static int otpvalue { get; set; }
        private readonly IEmailService _emailService;

        public MicaProfileService(IMapper mapper, IEmailService emailService, IIntegrationService integrationService)
        {
            _mapper = mapper;
            _emailService = emailService;
            _integrationService = integrationService;
        }

        public UserDetailsDTO GetUserByUserId(string Id, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var _userDetails = _context.TblUserDetails.SingleOrDefault(x => x.UserId == Id);
            var result = _mapper.Map<UserDetailsDTO>(_userDetails);
            return result;
        }

        public UserDTO SearchUserById(string userId, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            AspNetUsers _userd = _context.AspNetUsers.Where(user => user.Id == userId)
                        .Include(add => add.TblUserDetails)
                        .Include(add => add.TblUserAddress)
                        .FirstOrDefault();
            var _UsrDTO = _mapper.Map<UserDTO>(_userd);
            return _UsrDTO;
        }

        public async Task<UserResponse> CreateProfileUser(UserDTO user, ApiContext apiContext)
        {

            CustomerSettingsDTO UserDateTime = DbManager.GetCustomerSettings("TimeZone", apiContext);
            DbManager._TimeZone = UserDateTime.KeyValue;
            DateTime DateTimeNow = DbManager.GetDateTimeByZone(DbManager._TimeZone);


            if (user.EnvId > 0)
            {
                _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, user.EnvId.ToString());
            }
            else
            {
                _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            }


            var userDetails = user.UserDetails.First();
            //var userAddress = user.UserAddress.FirstOrDefault();
            EmailRequest emailTest = new EmailRequest();
            if (string.IsNullOrEmpty(userDetails.UserId))
            {
                var aspNet = _context.AspNetUsers.FirstOrDefault(x => x.UserName == userDetails.Email);
                if (aspNet == null)
                {
                    userDetails.UserName = userDetails.Email;
                    userDetails.CreatedBy = apiContext.UserId;
                    userDetails.CreatedDate = DateTimeNow;
                    userDetails.IsActive = true;
                    if (userDetails.OrganizationId != null && userDetails.OrganizationId > 0)
                    {
                        userDetails.OrganizationId = userDetails.OrganizationId;
                    }
                    else
                    {
                        userDetails.OrganizationId = apiContext.OrgId;
                    }
                    //.OrganizationId = user.CustomerID > 0 ? user.CustomerID: apiContext.OrgId;
                    AspNetUsers _users = _mapper.Map<AspNetUsers>(user);
                    if (string.IsNullOrEmpty(_users.Id))
                    {
                        _users.Id = Guid.NewGuid().ToString();
                        _users.UserName = userDetails.Email;
                        _users.Email = userDetails.Email;
                        _users.FirstTimeLogin = 0;
                        _users.LastPasswordChanged = DateTimeNow;
                        _users.PasswordHash = Utilities.GenerateDefaultPassword();
                        emailTest.To = userDetails.Email;
                        emailTest.Subject = "User profile creation";
                        emailTest.Message = "Your account has been created with Username:" + _users.UserName + " and password: Mica@123 \n" + "This is a system generated password. Kindly reset the same after log in.";
                        _context.AspNetUsers.Add(_users);
                    }
                    _context.SaveChanges();
                    var _usersDTOs = _mapper.Map<UserDTO>(_users);

                    _cpcontext = (MICACPContext)DbManager.GetCPContext(apiContext.ProductType);

                    var cpdata = _cpcontext.TblCustomerUsers.FirstOrDefault(a => a.UserName == userDetails.Email);
                    if (cpdata == null)
                    {
                        TblCustomerUsers customerUsers = new TblCustomerUsers();

                        if (userDetails.OrganizationId != null && userDetails.OrganizationId > 0)
                        {
                            customerUsers.CustomerId = userDetails.OrganizationId;
                        }
                        else
                        {
                            customerUsers.CustomerId = apiContext.OrgId;
                        }
                        customerUsers.UserName = userDetails.Email;
                        customerUsers.Email = userDetails.Email;
                        customerUsers.CreatedDate = DateTimeNow;
                        customerUsers.ContactNumber = userDetails.ContactNumber;
                        customerUsers.UserId = _users.Id;
                        customerUsers.IsActive = true;
                        customerUsers.LoginProvider = "Form";
                        customerUsers.IsFirstTimeLogin = 1;

                        _cpcontext.TblCustomerUsers.Add(customerUsers);
                        _cpcontext.SaveChanges();
                    }
                    //await SendEmailAsync(emailTest);

                    await SendNotificationAsync(apiContext, userDetails.Email);
                    return new UserResponse { Status = BusinessStatus.Created, users = _usersDTOs, Id = _usersDTOs.Id, ResponseMessage = $"User created successfully! \n for user: {_usersDTOs.Email}" };
                }
                else
                {
                    return new UserResponse { Status = BusinessStatus.Error, ResponseMessage = $"User already exists" };
                }
            }
            else
            {
                AspNetUsers _users = _mapper.Map<AspNetUsers>(user);
                userDetails.ModifiedBy = apiContext.UserId;
                userDetails.ModifiedDate = DateTimeNow;

                var useraddr = _context.TblUserAddress.Where(p => p.Id == userDetails.UserId);
                foreach (var item in useraddr)
                {
                    _context.TblUserAddress.Remove(item);
                }
                _context.SaveChanges();
                var _usersDetail = _mapper.Map<TblUserDetails>(userDetails);
                _context.Update(_usersDetail);

                var _useraddress1 = _mapper.Map<HashSet<TblUserAddress>>(user.UserAddress);

                foreach (var item in _useraddress1)
                {
                    item.Id = userDetails.UserId;
                    _context.TblUserAddress.Add(item);
                }
                _context.SaveChanges();

                _cpcontext = (MICACPContext)DbManager.GetCPContext(apiContext.ProductType);

                var cpdata = _cpcontext.TblCustomerUsers.SingleOrDefault(a => a.UserName == userDetails.Email);
                TblCustomerUsers customerUsers = new TblCustomerUsers();

                customerUsers.ModifiedDate = DateTimeNow;
                customerUsers.Email = userDetails.Email;
                customerUsers.ContactNumber = userDetails.ContactNumber;

                _cpcontext.TblCustomerUsers.Update(customerUsers);
                _cpcontext.SaveChanges();

                return new UserResponse { Status = BusinessStatus.Created, users = user, Id = _usersDetail.UserId, ResponseMessage = $"User modified successfully!" };
            }
        }

        //public UserDTO CreateProfileUser(UserDTO user)
        //{
        //    //  var userDetail = user.TblUserDetails.First();
        //    AspNetUsers _users = _mapper.Map<AspNetUsers>(user);
        //    _users.Id = Guid.NewGuid().ToString();
        //    DateTime now = DateTime.Now;
        //    _users.LockoutEnd = now;
        //    _context.AspNetUsers.Add(_users);
        //    _context.SaveChanges();
        //    var _usersDTOs = _mapper.Map<UserDTO>(_users);
        //    return _usersDTOs;
        //}

        public EmployeeDTO CreateProfileemployee(EmployeeDTO emp, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            //  var userDetail = user.TblUserDetails.First();
            emp.CreatedBy = apiContext.UserId;
            var _empls = _mapper.Map<TblEmployees>(emp);
            //_empls.Empid = Guid.NewGuid().ToString();
            //DateTime now = DateTime.Now;
            //_users.LockoutEnd = now;
            _context.TblEmployees.Add(_empls);
            _context.SaveChanges();
            var _empDTOs = _mapper.Map<EmployeeDTO>(_empls);
            return _empDTOs;
        }

        public UserDTO ChangeEmailId(UserDTO userDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            AspNetUsers _aspNet = _mapper.Map<AspNetUsers>(userDTO);
            var _aspUsers = _context.AspNetUsers.SingleOrDefault(x => x.Id == _aspNet.Id);

            var _users = _context.TblUserDetails.SingleOrDefault(x => x.UserId == _aspNet.Id);

            _aspUsers.Email = userDTO.Email;
            _users.Email = userDTO.Email;
            _context.AspNetUsers.Update(_aspUsers);
            _context.TblUserDetails.Update(_users);
            _context.SaveChanges();
            var _usersDTOs = _mapper.Map<UserDTO>(_aspUsers);
            return _usersDTOs;
        }

        public UserDTO ChangeMobileNumber(UserDTO userDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            AspNetUsers _aspNet = _mapper.Map<AspNetUsers>(userDTO);
            var _aspUsers = _context.AspNetUsers.SingleOrDefault(x => x.Id == _aspNet.Id);

            var _users = _context.TblUserDetails.SingleOrDefault(x => x.UserId == _aspNet.Id);

            _aspUsers.PhoneNumber = userDTO.PhoneNumber;
            _users.ContactNumber = userDTO.PhoneNumber;
            _context.AspNetUsers.Update(_aspUsers);
            _context.TblUserDetails.Update(_users);
            _context.SaveChanges();
            var _usersDTOs = _mapper.Map<UserDTO>(_aspUsers);
            return _usersDTOs;
        }

        public IEnumerable<UserDetailsDTO> SearchUser(UserSearchDTO searchRequest, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var _users = _context.TblUserDetails.OrderByDescending(u => u.CreatedDate).Select(x => x);
            if (apiContext.OrgId > 0 && apiContext.PartnerId > 0)
            {
                _users = _users.Where(u => (u.OrganizationId == apiContext.OrgId && u.PartnerId == apiContext.PartnerId));
            }
            //else
            //{
            //    _users = _users.Where(pr => (pr.OrganizationId == apiContext.OrgId && pr.PartnerId == apiContext.PartnerId));
            //}
            else if (apiContext.OrgId > 0)
            {
                _users = _users.Where(u => u.OrganizationId == apiContext.OrgId);
            }

            if (searchRequest.Status == 1009)
            {
                _users = _users.Where(u => u.IsActive == true);
            }
            if (searchRequest.Status == 1010)
            {
                _users = _users.Where(u => u.IsActive == false);
            }
            if (searchRequest.Status == 1011)
            {
                _users = _context.TblUserDetails.OrderByDescending(u => u.CreatedDate).Select(x => x);
            }
            if (!string.IsNullOrEmpty(searchRequest.FirstName))
            {
                _users = _users.Where(u => u.FirstName.Contains(searchRequest.FirstName));
            }
            if (!string.IsNullOrEmpty(searchRequest.PanNo))
            {
                _users = _users.Where(u => u.PanNo.Contains(searchRequest.PanNo));
            }
            if (!string.IsNullOrEmpty(searchRequest.EmailId))
            {
                _users = _users.Where(u => u.Email == searchRequest.EmailId);
            }
            if (searchRequest.PartnerId > 0)
            {
                _users = _users.Where(u => u.PartnerId == searchRequest.PartnerId);
            }
            if (!string.IsNullOrEmpty(searchRequest.ContactNumber))
            {
                _users = _users.Where(u => u.ContactNumber == searchRequest.ContactNumber);
            }
            var _usersDTOs = _mapper.Map<List<UserDetailsDTO>>(_users);
            var userdata = _context.AspNetUsers.Select(a => a).ToList();
            foreach (var item in _usersDTOs)
            {
                var result = userdata.FirstOrDefault(a => a.Id == item.UserId).AccessFailedCount;
                if (result > 5)
                {
                    item.Userlocked = true;
                }
                if (result < 5)
                {
                    item.Userlocked = false;
                }
            }
            return _usersDTOs;
        }

        public EmployeeDTO SearchEmployee(int Empid, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var _emp = _context.TblEmployees.SingleOrDefault(x => x.Empid == Empid);
            if (_emp != null)
            {
                TblEmployees _tblUserDetails = _mapper.Map<TblEmployees>(_emp);
                _context.TblEmployees.Find(_emp.Empid);
                var emplDTOs = _mapper.Map<EmployeeDTO>(_emp);
                return emplDTOs;
            }
            else
            {
                return null;
            }
        }

        public UserDTO ModifyUser(UserDTO usersDTOs, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            AspNetUsers _aspNet = _mapper.Map<AspNetUsers>(usersDTOs);
            //We Use .Include Function  to add all Child Classes from a Parent Table 
            //In this Case Parent table is AspNet Users (Primary Key) Child Table is UserDetails (foreign Key)
            // var _aspUsers = _context.AspNetUsers.Include<>.SingleOrDefault(x => x.Id == usersDTOs.Id);
            //var _aspUsers = _context.AspNetUsers.Include<TblUserDetails,>
            //.SingleOrDefault(x => x.Id == usersDTOs.Id);

            //if (_aspUsers != null)
            //{
            //  _aspUsers.PhoneNumber = usersDTOs.PhoneNumber;
            //_aspNet.TblUserDetails.Update();
            _context.AspNetUsers.Update(_aspNet);
            _context.SaveChanges();
            //}
            var _usersDTOs = _mapper.Map<UserDTO>(_aspNet);
            return _usersDTOs;
        }

        //get for master
        public IEnumerable<ddDTO> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblmasUmcommonTypes
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
            return ddDTOs;
        }

        // get Location
        public IEnumerable<ddDTO> GetLocation(string locationType, int parentID, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            IEnumerable<ddDTO> ddDTOs;

            switch (locationType)
            {
                case "State":
                    ddDTOs = _context.TblMasState.Where(location => location.CountryId == parentID)
                        .Select(c => new ddDTO
                        {
                            mID = c.StateId,
                            mValue = c.StateName,
                            mType = "State"
                        });
                    break;
                case "District":
                    ddDTOs = _context.TblMasDistrict.Where(location => location.StateId == parentID)
                        .Select(c => new ddDTO
                        {
                            mID = c.DistrictId,
                            mValue = c.DistrictName,
                            mType = "District"
                        });
                    break;
                case "City":
                    ddDTOs = _context.TblMasCity.Where(location => location.DistrictId == parentID)
                    .Select(c => new ddDTO
                    {
                        mID = c.CityId,
                        mValue = c.CityName,
                        mType = "City"
                    });
                    break;
                case "Pincode":
                    ddDTOs = _context.TblMasPinCode.Where(location => location.CityId == parentID)
                    .Select(c => new ddDTO
                    {
                        mID = c.PincodeId,
                        mValue = c.Pincode,
                        mType = "Pincode"
                    });
                    break;
                default:
                    ddDTOs = _context.TblMasCountry.Select(location => location)
                    .Select(c => new ddDTO
                    {
                        mID = c.CountryId,
                        mValue = c.CountryName,
                        mType = "Country"
                    });
                    break;
            }
            return ddDTOs;

        }

        public async Task<bool> SendEmailAsync(EmailTest emailTest)
        {
            try
            {
                await _emailService.SendEmail(emailTest.To, emailTest.Subject, emailTest.Message);
            }
            catch (Exception ex)
            {

                throw;
            }
            return true;
        }

        public async Task<bool> SendEmailAsync(EmailRequest emailTest, ApiContext apiContext)
        {
            try
            {
                EmailRequest email = new EmailRequest();
                email.mailTo.Add(emailTest.To);
                email.Subject = emailTest.Subject;
                email.Message = emailTest.Message;
                var res = await _integrationService.SendEmailAsync(email, apiContext);
            }
            catch (Exception ex)
            {

            }
            return true;
        }

        private async Task SendNotificationAsync(ApiContext apiContext, string userEmail)
        {
            if (!string.IsNullOrEmpty(userEmail))
            {
                EmailRequest emailTest = new EmailRequest()
                {
                    Message = $"Your account has been created with Username:" + userEmail + " and password: Mica@123 \n" + "This is a system generated password. Kindly reset the same after log in.",
                    Subject = $"User profile creation",
                    To = userEmail
                };
                await SendEmailAsync(emailTest, apiContext);
            }
        }

        public decimal GetCustomerId(decimal envid, string product)
        {
            _cpcontext = (MICACPContext)DbManager.GetCPContext(product);
            var data = _cpcontext.TblCustomerEnvironment.FirstOrDefault(a => a.Id == envid);
            return Convert.ToDecimal(data.CustomerId);
        }

        public PasswordResponse ChangePassword(Password pass, ApiContext apiContext)
        {
            if (pass.EnvId > 0)
            {
                _context = (MICAUMContext)DbManager.GetContext(pass.ProductType, pass.EnvId.ToString());
                apiContext.ProductType = pass.ProductType;
                apiContext.ServerType = pass.EnvId.ToString();
                apiContext.OrgId = GetCustomerId(pass.EnvId, pass.ProductType);
            }
            else
            {
                _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            }

            CustomerSettingsDTO UserDateTime = DbManager.GetCustomerSettings("TimeZone", apiContext);
            DbManager._TimeZone = UserDateTime.KeyValue;
            DateTime DateTimeNow = DbManager.GetDateTimeByZone(DbManager._TimeZone);

            //_context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            byte[] passwordHash;
            byte[] passwordSalt;
            var _aspUsers = _context.AspNetUsers.FirstOrDefault(x => x.Id == pass.Id);
            if (pass.IsChangePassword == true)
            {
                if (pass.NewPassword == pass.ConfirmPassword)
                {
                    AspNetUsers _aspNet = _mapper.Map<AspNetUsers>(_aspUsers);

                    if (string.IsNullOrWhiteSpace(pass.ConfirmPassword)) throw new ArgumentException("Please enter valid password", "password");

                    passwordSalt = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };
                    using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
                    {
                        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(pass.ConfirmPassword));
                    }
                    _aspNet.PasswordHash = passwordHash;
                    _aspNet.FirstTimeLogin = 1;
                    _aspNet.AccessFailedCount = 0;
                    _aspNet.LastPasswordChanged = DateTimeNow;
                    _context.AspNetUsers.Update(_aspNet);
                    _context.SaveChanges();
                    var _usersDTOs = _mapper.Map<UserDTO>(_aspUsers);
                    return new PasswordResponse { Status = BusinessStatus.Created, passwd = pass, ResponseMessage = $"Password changed successfully!" };
                }
                else
                {
                    return new PasswordResponse { Status = BusinessStatus.Error, ResponseMessage = $"Password not matching" };
                }
            }
            else
            {
                if (pass.OldPassword != null)
                {
                    // check if user exists
                    if (_aspUsers == null)
                        return null;

                    passwordSalt = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };

                    //// check if password is correct
                    if (!Utilities.VerifyPasswordHash(pass.OldPassword, _aspUsers.PasswordHash, passwordSalt))
                        return new PasswordResponse { Status = BusinessStatus.UnAuthorized, ResponseMessage = $"Please enter valid old password" };
                    //return null;

                    if (pass.NewPassword == pass.ConfirmPassword)
                    {
                        AspNetUsers _aspNet = _mapper.Map<AspNetUsers>(_aspUsers);
                        if (string.IsNullOrWhiteSpace(pass.ConfirmPassword)) throw new ArgumentException("Please enter valid password", "password");

                        passwordSalt = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };
                        using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
                        {
                            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(pass.ConfirmPassword));
                        }
                        _aspNet.PasswordHash = passwordHash;
                        _aspNet.LastPasswordChanged = DateTimeNow;
                        _aspNet.AccessFailedCount = 0;
                        _context.AspNetUsers.Update(_aspNet);
                        _context.SaveChanges();
                        var _usersDTOs = _mapper.Map<UserDTO>(_aspUsers);
                        return new PasswordResponse { Status = BusinessStatus.Created, passwd = pass, ResponseMessage = $"Password changed successfully!" };
                    }
                    else
                    {
                        return new PasswordResponse { Status = BusinessStatus.InputValidationFailed, passwd = pass, ResponseMessage = $"Password not matching" };
                    }
                }
                else
                {
                    return new PasswordResponse { Status = BusinessStatus.UnAuthorized, ResponseMessage = $"Please enter valid old password" };
                }
            }
        }

        public async Task<SendOtpResponse> SendOTP(SendOtp sendOtp, ApiContext apiContext)
        {
            if (sendOtp.EnvId > 0)
            {
                _context = (MICAUMContext)DbManager.GetContext(sendOtp.ProductType, sendOtp.EnvId.ToString());
            }
            else
            {
                _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            }
            //_context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var user = _context.AspNetUsers.SingleOrDefault(x => x.UserName == sendOtp.UserName);
            try
            {
                if (user != null)
                {
                    EmailRequest emailTest = new EmailRequest();
                    Random random = new Random();
                    int otp = random.Next(100001, 999999);
                    var chkotp = _context.TblSendOtp.Where(a => a.Email == user.Email);
                    if (chkotp != null)
                    {
                        foreach (var item in chkotp)
                        {
                            _context.TblSendOtp.Remove(item);
                        }
                    }
                    sendOtp.UserId = user.Id;
                    sendOtp.Email = user.Email;
                    sendOtp.Otp = otp.ToString();
                    TblSendOtp _otp = _mapper.Map<TblSendOtp>(sendOtp);
                    _context.TblSendOtp.Add(_otp);
                    _context.SaveChanges();
                    emailTest.To = user.Email;
                    emailTest.Subject = "Password reset for MICA";
                    emailTest.Message = "Dear User,\n" + "      " + "\n" + "      OTP for re-setting your MICA password is: " + otp + "      " + "\n" + "\nThanks & Regards:\n" + "      " + "MICA Team";
                    //await SendEmailAsync(emailTest);

                    await SendOTPNotificationAsync(apiContext, user.Email, emailTest);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return new SendOtpResponse { Status = BusinessStatus.Ok, sendOtp = sendOtp, ResponseMessage = $"OTP sent successfully!" };
        }

        private async Task SendOTPNotificationAsync(ApiContext apiContext, string userEmail, EmailRequest emailTest)
        {
            if (!string.IsNullOrEmpty(userEmail))
            {
                await SendEmailAsync(emailTest, apiContext);
            }
        }

        public async Task<SendOtpResponse> ResetOTP(SendOtp sendOtp, ApiContext apiContext)
        {
            if (sendOtp.EnvId > 0)
            {
                _context = (MICAUMContext)DbManager.GetContext(sendOtp.ProductType, sendOtp.EnvId.ToString());
            }
            else
            {
                _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            }
            //_context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var user = _context.AspNetUsers.SingleOrDefault(x => x.Email == sendOtp.Email);
            try
            {
                if (user != null)
                {
                    EmailRequest emailTest = new EmailRequest();
                    Random random = new Random();
                    int otp = random.Next(100001, 999999);
                    var chkotp = _context.TblSendOtp.Where(a => a.Email == sendOtp.Email);
                    if (chkotp != null)
                    {
                        foreach (var item in chkotp)
                        {
                            _context.TblSendOtp.Remove(item);
                        }
                    }
                    sendOtp.UserId = user.Id;
                    sendOtp.UserName = user.UserName;
                    sendOtp.Otp = otp.ToString();
                    TblSendOtp _otp = _mapper.Map<TblSendOtp>(sendOtp);
                    _context.TblSendOtp.Add(_otp);
                    _context.SaveChanges();
                    emailTest.To = sendOtp.Email;
                    emailTest.Subject = "Password reset for MICA";
                    emailTest.Message = "Dear User,\n" + "      " + "\n" + "      OTP for re-setting your MICA password is: " + otp + "      " + "\n" + "\nThanks & Regards:\n" + "      " + "MICA Team";
                    //await SendEmailAsync(emailTest);

                    await SendOTPNotificationAsync(apiContext, sendOtp.Email, emailTest);
                }
                else
                {
                    return new SendOtpResponse { Status = BusinessStatus.NotFound, sendOtp = sendOtp, ResponseMessage = $"Please enter registered Email-ID" };
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return new SendOtpResponse { Status = BusinessStatus.Ok, sendOtp = sendOtp, ResponseMessage = $"OTP Sent Successfully!" };
        }

        public VerifyOTPResponse VerifyingOTP(VerifyOTP onetp, ApiContext apiContext)
        {
            if (onetp.EnvId > 0)
            {
                _context = (MICAUMContext)DbManager.GetContext(onetp.ProductType, onetp.EnvId.ToString());
            }
            else
            {
                _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            }
            //_context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var sentotp = _context.TblSendOtp.SingleOrDefault(x => x.UserId == onetp.UserId);

            if (sentotp.Otp == onetp.Otp)
            {
                var user = _context.AspNetUsers.SingleOrDefault(x => x.Id == sentotp.UserId);
                if (user != null)
                {
                    user.FirstTimeLogin = 1;
                }
                _context.AspNetUsers.Update(user);
                _context.TblSendOtp.Remove(sentotp);
                _context.SaveChanges();
                return new VerifyOTPResponse { Status = BusinessStatus.Ok, ResponseMessage = $"OTP verified successfully!" }; ;
            }
            else
            {
                return new VerifyOTPResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"Invalid OTP" }; ;
            }
        }

        public UserEmailResponse UserEmailValidations(string emailid, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var email = _context.AspNetUsers.Any(item => item.Email == emailid);
            if (email == true)
            {
                return new UserEmailResponse { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Email ID already Exist" };
            }
            else
            {
                return new UserEmailResponse { Status = BusinessStatus.Ok };
            }
        }

        public UserDTO DeleteUserById(string Id, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            var user = _context.TblUserDetails.Where(item => item.UserId == Id).FirstOrDefault();
            user.IsActive = (user.IsActive == false ? user.IsActive = true : user.IsActive = false);
            _context.TblUserDetails.Update(user);

            var tbl_userdata = _context.AspNetUsers.Where(item => item.Id == Id).FirstOrDefault();
            tbl_userdata.IsActive = (tbl_userdata.IsActive == false ? tbl_userdata.IsActive = true : tbl_userdata.IsActive = false);
            //tbl_userdata.IsActive = !tbl_userdata.IsActive;

            _context.AspNetUsers.Update(tbl_userdata);
            _context.SaveChanges();

            _cpcontext = (MICACPContext)DbManager.GetCPContext(apiContext.ProductType);

            var cpdata = _cpcontext.TblCustomerUsers.SingleOrDefault(a => a.UserId == Id);
            cpdata.IsActive = (cpdata.IsActive == false ? cpdata.IsActive = true : cpdata.IsActive = false);

            //cpdata.IsActive = !cpdata.IsActive;

            _cpcontext.TblCustomerUsers.Update(cpdata);
            _cpcontext.SaveChanges();

            EmailTest emailTest = new EmailTest();
            emailTest.To = tbl_userdata.Email;
            emailTest.Subject = "Deletion of User";
            emailTest.Message = "Dear User,\n" + "      " + "\n" + "      Your account has been Deactivated to Activate please contact Admin." + "\n" + "\nThanks & Regards:\n" + "      " + "MICA Team";

            return null;
        }

        public UserUploadImageResponse Uploadimage(ImageDTO image, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            //var claimdetails = _context.TblClaimdoc.SingleOrDefault(x => x.ClaimId == ClaimId);

            var users = _context.TblUserDetails.SingleOrDefault(a => a.UserId == image.UserId);
            users.ProfileImage = image.Document;

            var result = _mapper.Map<TblUserDetails>(users);

            _context.Update(result);
            _context.SaveChanges();

            var user = _mapper.Map<UserDetailsDTO>(result);

            return new UserUploadImageResponse { Status = BusinessStatus.Created, details = user, Id = user.UserId, ResponseMessage = $"Image uploaded successfully!" };
        }

        //Get User name from CreatedUserId for Billing
        public UserNameById GetUserNameById(string Id, ApiContext apiContext)
        {
            try
            {
                UserNameById userNameById = new UserNameById();
                //UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
                _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
                var UserName = _context.TblUserDetails.Where(u => u.UserId == Id).FirstOrDefault();
                var name = UserName.UserName;
                var data = _mapper.Map<UserNameById>(UserName);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public UnlockResponse UnlockUser(string userid, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            var user = _context.AspNetUsers.FirstOrDefault(a => a.Id == userid);
            user.AccessFailedCount = 0;
            var _user = _mapper.Map<UserDTO>(user);
            return new UnlockResponse { Status = BusinessStatus.Updated, Id = _user.Id, ResponseMessage = $"User unlocked successfully!" };
        }

        public DefaultPasswordReset ResetDefaultPassword(Userpasswordreset userpasswordreset, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, userpasswordreset.EnvId.ToString());

            CustomerSettingsDTO UserDateTime = DbManager.GetCustomerSettings("TimeZone", apiContext);
            DbManager._TimeZone = UserDateTime.KeyValue;
            DateTime DateTimeNow = DbManager.GetDateTimeByZone(DbManager._TimeZone);


            var data = _context.AspNetUsers.FirstOrDefault(a => a.UserName == userpasswordreset.Username);
            string DefaultPassword = "Mica@123";

            byte[] passwordHash;
            byte[] passwordSalt;

            if (data != null)
            {
                passwordSalt = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };

                using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
                {
                    passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(DefaultPassword));
                }
                data.PasswordHash = passwordHash;
                data.AccessFailedCount = 0;
                data.LastPasswordChanged = DateTimeNow;
                _context.AspNetUsers.Update(data);
                _context.SaveChanges();

                var dto = _mapper.Map<UserDTO>(data);
                return new DefaultPasswordReset { Status = BusinessStatus.Updated, ResponseMessage = $"Password set to default password " + DefaultPassword + " successfully!" };
            }
            else
            {
                return new DefaultPasswordReset { Status = BusinessStatus.NotFound, ResponseMessage = $"Username doesn't exist or Invalid Environment" };
            }
        }
    }
}