using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.UserManagement.Entities.AVO;
using iNube.Services.UserManagement.Entities.MICACP;
using iNube.Services.UserManagement.Helpers;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace iNube.Services.UserManagement.Controllers.Login.LoginServices.MicaLogin
{
    public class AvoLoginService : ILoginProductService
    {
        private AVOUMContext _context;
        private MICACPContext _cpcontext;
        private bool Result;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        public static int? logincount { get; set; }
        public IConfiguration _config;
        private readonly IEmailService _emailService;
        public AvoLoginService(IMapper mapper, IOptions<AppSettings> appSettings, IConfiguration configuration, IEmailService emailService)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _config = configuration;
            _emailService = emailService;
        }

        public AspNetUsersDTO Authenticate(LoginDTO loginDTO)
        {
            var dbConnection = GetEnvironmentConnection(loginDTO.ProductType, loginDTO.EnvId).Dbconnection;
            _context = (AVOUMContext)DbManager.GetContextByConnection(loginDTO.ProductType, dbConnection);
            var user = _context.AspNetUsers.FirstOrDefault(x => x.UserName == loginDTO.Username);

            // check if username exists
            if (user == null)
                return null;

            byte[] passwordSalt = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };

            //// check if password is correct
            if (!Utilities.VerifyPasswordHash(loginDTO.Password, user.PasswordHash, passwordSalt))
            {
                if (user.AccessFailedCount < 5)
                {
                    user.AccessFailedCount = user.AccessFailedCount + 1;
                    _context.SaveChanges();
                    return null;
                }
                else
                {
                }
            }
            // authentication successful
            AspNetUsersDTO userDTO = _mapper.Map<AspNetUsersDTO>(user);
            return userDTO;
            //  return new LoginResponse { Status = BusinessStatus.Created, log = user, ResponseMessage = $"Product code {user.Username} created successfully!! " };

        }

        public AspNetUsersDTO RefreshTokenAuthenticate(LoginDTO loginDTO)
        {
            var dbConnection = GetEnvironmentConnection(loginDTO.ProductType, loginDTO.EnvId).Dbconnection;
            _context = (AVOUMContext)DbManager.GetContextByConnection(loginDTO.ProductType, dbConnection);
            var user = _context.AspNetUsers.SingleOrDefault(x => x.UserName == loginDTO.Username);

            // check if username exists
            if (user == null)
                return null;

            // authentication successful
            AspNetUsersDTO userDTO = _mapper.Map<AspNetUsersDTO>(user);
            return userDTO;
            //  return new LoginResponse { Status = BusinessStatus.Created, log = user, ResponseMessage = $"Product code {user.Username} created successfully!! " };

        }

        public bool GoogleValidate(AspNetUsersDTO asp, string productType, string serverType)
        {

            var VerifyGmail = _context.AspNetUsers.SingleOrDefault(x => x.Email == asp.Email);

            try
            {
                if (VerifyGmail.Email == null)
                {
                    VerifyGmail.Email = "WrongEmail";
                }
                bool result = (VerifyGmail.Email == asp.Email);

                if (result)
                {
                    Result = true;
                }
                else
                {
                    Result = false;
                }
            }
            catch (Exception ex)
            {

            }
            return Result;
        }

        public async Task<string> ForgetUserNameAsync(string emailId, string productType)
        {
            _cpcontext = (MICACPContext)DbManager.GetCPContext(productType);
            EmailTest emailTest = new EmailTest();
            var _aspUsers = _cpcontext.TblCustomerUsers.SingleOrDefault(x => x.Email == emailId);
            if (_aspUsers != null)
            {
                string username = _aspUsers.UserName;
                emailTest.To = emailId;
                emailTest.Subject = "AVO Username";
                emailTest.Message = "Dear User,\n" + "      " + "\n" + "      Your Username: " + username + "      " + "\n" + "\nThanks & Regards:\n" + "      " + "MICA Team";
                await SendEmailAsync(emailTest);
                return _aspUsers.UserName;
            }
            else
            {
                return null;
            }
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

        public UserLoginResponse GetUserType(string username, string productType)
        {
            _cpcontext = (MICACPContext)DbManager.GetCPContext(productType);

            var userdetails = (from cu in _cpcontext.TblCustomerUsers
                               join ce in _cpcontext.TblCustomerEnvironment on cu.CustomerId equals ce.CustomerId
                               where cu.UserName == username && ce.Product == productType && cu.IsActive == true
                               select new UserLoginType
                               {
                                   UserType = cu.UserType,
                                   LoginProvider = cu.LoginProvider,
                                   UserName = cu.UserName,
                                   IsFirstTimeLogin = cu.IsFirstTimeLogin,
                                   UserId = cu.UserId,
                                   //Dbconnection = ce.Dbconnection,
                                   //CustomerId = cu.CustomerId,
                                   EnvName = ce.EnvName,
                                   //Name = ce.Name,
                                   Id = ce.Id,
                               }).ToList();
            List<ddDTO> environment = new List<ddDTO>();

            ddDTO env = null;
            foreach (var item in userdetails)
            {
                env = new ddDTO();
                env.mValue = item.EnvName;
                env.mID = Convert.ToInt32(item.Id);
                environment.Add(env);
            }
            var userdetail = userdetails.FirstOrDefault();
            userdetail.EnvironmentDTOs.AddRange(environment);

            if (userdetails != null)
            {
                return new UserLoginResponse { Status = BusinessStatus.Ok, userLogin = userdetail, ResponseMessage = $"UserName Exist" };
            }
            else
            {
                return new UserLoginResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"UserName does not Exist" };
            }
        }

        public LoginResponse GenerateToken(AspNetUsersDTO user, string productType, decimal envId, bool isTokenExpire)
        {
            LoginResponse loginResponse = new LoginResponse();
            var dbConnection = GetEnvironmentConnection(productType, envId).Dbconnection;
            _context = (AVOUMContext)DbManager.GetContextByConnection(productType, dbConnection);
            if (isTokenExpire == true)
            {
                loginResponse.PasswordExpire = false;
                var userDetails = _context.TblUserDetails.FirstOrDefault(u => u.UserName == user.UserName);
                //var roleDetails = from ro in _context.AspNetRoles
                //                  join ur in _context.AspNetUserRoles on ro.Id equals ur.RoleId
                //                  where ur.UserId == user.Id
                //                  select ur;
                var roleName = _context.AspNetRoles.FirstOrDefault(u => u.Id == userDetails.RoleId).Name;
                var issuer = _config["Jwt:Issuer"];
                var audience = _config["Jwt:Audience"];
                var expiry = isTokenExpire ? DateTime.Now.AddMinutes(120) : DateTime.Now.AddYears(3);
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                // Add standard claims
                var claims = new List<Claim>
            {
                new Claim("UserId", user.Id),
                new Claim("Email", user.Email),
                new Claim("OrgId",Convert.ToString(userDetails.OrganizationId)),
                new Claim("PartnerId",Convert.ToString(userDetails.PartnerId)),
                new Claim("Role",roleName),
                new Claim("Name",userDetails.FirstName),
                new Claim("UserName",userDetails.UserName),
                new Claim("ProductType",productType),
                new Claim("ServerType",envId.ToString()),
            };
                var token = new JwtSecurityToken(issuer: issuer, audience: audience, claims: claims,
                    expires: expiry, signingCredentials: credentials);

                var tokenHandler = new JwtSecurityTokenHandler();
                var stringToken = tokenHandler.WriteToken(token);
                loginResponse.Token = stringToken;
                loginResponse.UserId = user.Id;
                loginResponse.RoleId = userDetails.RoleId;
                loginResponse.PartnerId = userDetails.PartnerId;
                loginResponse.OrganizationId = userDetails.OrganizationId;
                loginResponse.UserName = user.UserName;
                loginResponse.FirstName = userDetails.FirstName;
                loginResponse.LastName = userDetails.LastName;
                loginResponse.IsMale = userDetails.GenderId == 1001 ? true : false;
                loginResponse.ProfileImage = userDetails.ProfileImage;
                loginResponse.DisplayName = loginResponse.FirstName + "  " + loginResponse.LastName;
                if ((DateTime.Now.Date - user.LastPasswordChanged.Value.Date).TotalDays > 60)
                {
                    loginResponse.PasswordExpire = true;
                }
                loginResponse.FirstTimeLogin = user.FirstTimeLogin;

                loginResponse.ProfileImage = userDetails.ProfileImage;

                loginResponse.Status = BusinessStatus.Ok;
            }
            else
            {
                loginResponse.Status = BusinessStatus.Error;
                loginResponse.ResponseMessage = "Your accont has been Locked, please contact Admin.";
            }
            return loginResponse;
        }

        public EnvironmentResponse GetEnvironmentConnection(string product, decimal EnvId)
        {
            _cpcontext = (MICACPContext)DbManager.GetCPContext(product);
            EnvironmentResponse environment = new EnvironmentResponse();
            environment.Dbconnection = _cpcontext.TblCustomerEnvironment.FirstOrDefault(ce => ce.Id == EnvId).Dbconnection;
            environment.Status = BusinessStatus.Ok;
            return environment;
        }
    }
}
