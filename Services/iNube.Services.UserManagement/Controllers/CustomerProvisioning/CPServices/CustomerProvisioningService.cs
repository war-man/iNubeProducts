using AutoMapper;
using AutoMapper.Configuration;
using iNube.Services.UserManagement.Controllers.CustomerProvisioning.IntegrationService;
using iNube.Services.UserManagement.Controllers.Role.RoleService;
using iNube.Services.UserManagement.Controllers.UserProfile;
using iNube.Services.UserManagement.Controllers.UserProfile.UserProfileService;
using iNube.Services.UserManagement.Entities.MICACP;
using iNube.Services.UserManagement.Helpers;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Controllers.CustomerProvisioning.CPServices
{
    public interface ICustomerProvisioningService
    {
        IEnumerable<ddDTOs> GetMaster(string lMasterlist);
        Task<List<CustomerSettingsDTO>> createProvision(CustomerProvisioningDTO customerProvisioningDTO, ApiContext apiContext);

    }
    public class CustomerProvisioningService : ICustomerProvisioningService
    {

        private MICACPContext _cpcontext;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private readonly AppSettings _appSettings;


        private IUserProfileService _userService;
        private IRoleService _roleService;
        //private IMapper mapper;
        //private IOptions<AppSettings> appSettings;

        public CustomerProvisioningService(MICACPContext context, IMapper mapper, IIntegrationService integrationService, IOptions<AppSettings> appSettings, IUserProfileService userService)
        {
            _mapper = mapper;
            _integrationService = integrationService;
            _appSettings = appSettings.Value;
            _userService = userService;
            _cpcontext = context;
        }

        public IEnumerable<ddDTOs> GetMaster(string lMasterlist)
        {

            IEnumerable<ddDTOs> ddDtos;
            ddDtos = _cpcontext.TblmasCpcommonTypes.
                Select(c => new ddDTOs
                {
                    mID = c.CommonTypeId,
                    mValue = c.Value,
                    mType = c.MasterType
                });
            return ddDtos;
        }

        public async Task<List<CustomerSettingsDTO>> createProvision(CustomerProvisioningDTO customerProvisioningDTO, ApiContext apiContext)
        {
            _cpcontext = (MICACPContext)DbManager.GetCPContext(apiContext.ProductType);
            // _cpcontext = (MICACPContext)(DbManager.GetContext(apiContext.ProductType, apiContext.ServerType));
            CustomerSettingsDTO customerSettings = new CustomerSettingsDTO();

            foreach (var item in customerProvisioningDTO.customerSettings)
            {
                item.CreatedDate = DateTime.Now;
                item.CustomerId = customerProvisioningDTO.CustomerId;

                if (item.Type == "Database")
                {
                    foreach (var i in customerProvisioningDTO.customerEnvironmentDTOs)
                    {
                        i.Product = apiContext.ProductType;
                        i.CustomerId = customerProvisioningDTO.CustomerId;
                        i.CreatedDate = DateTime.Now;
                        i.IsActive = true;
                        i.Dbconnection = "inubepeg.database.windows.net; Initial Catalog =" + item.KeyValue + "; User Id =MICAUSER; Password = MICA * user123"; ;
                    }
                }

            }

            var customers = _mapper.Map<List<TblCustomerSettings>>(customerProvisioningDTO.customerSettings);
            try
            {
                var customer = _mapper.Map<List<TblCustomerEnvironment>>(customerProvisioningDTO.customerEnvironmentDTOs);

                _cpcontext.TblCustomerSettings.AddRange(customers);
                _cpcontext.TblCustomerEnvironment.AddRange(customer);

                _cpcontext.SaveChanges();

            }
            catch (Exception ex)
            {

            }
            var _spocdetails = await _integrationService.GetCustProvisioningDetailsAsync(customerProvisioningDTO.CustomerId, apiContext);
            var userdetails = _spocdetails.CustSpocDetails.FirstOrDefault();
            var useradress = _spocdetails.CustAddress.FirstOrDefault();
            UserDTO userDTO = new UserDTO();
            UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
            userDetailsDTO.FirstName = userdetails.FirstName;
            userDetailsDTO.LastName = userdetails.LastName;
            userDetailsDTO.MaritalStatusId = userdetails.MaritalStatusId;
            //userDetailsDTO.GenderId = userdetails.GenderId;
            userDetailsDTO.Dob = userdetails.Dob;
            userDetailsDTO.Doj = userdetails.Doj;
            userDetailsDTO.ContactNumber = userdetails.Mobileno;
            userDetailsDTO.Email = userdetails.EmailId;
            userDetailsDTO.PanNo = userdetails.PanNo;
            userDetailsDTO.BranchName = userdetails.BranchName;
            userDetailsDTO.Email = userdetails.EmailId;
            userDetailsDTO.RoleId = "6EAE7D39-D9DB-41EF-A4B1-12E07F1E5020";
            userDTO.UserDetails.Add(userDetailsDTO);

            UserAddressDTO userAddressDTO = new UserAddressDTO();
            userAddressDTO.UserAddressLine1 = useradress.AddressLine1;
            userAddressDTO.UserAddressLine2 = useradress.AddressLine2;
            userAddressDTO.UserAddressLine3 = useradress.AddressLine3;
            userAddressDTO.UserCityId = useradress.CityId;
            userAddressDTO.UserCountryId = useradress.CountryId;
            userAddressDTO.UserDistrictId = useradress.DistrictId;
            userAddressDTO.UserPincodeId = useradress.PincodeId;
            userAddressDTO.UserStateId = useradress.StateId;
            userDTO.UserAddress.Add(userAddressDTO);

            try
            {
                var result = _userService.CreateProfileUser(userDTO, apiContext);

                UserRoleMapDTO userRoles = new UserRoleMapDTO();
                userRoles.UserId = result.users.Id;
                string[] roleid = { "6EAE7D39-D9DB-41EF-A4B1-12E07F1E5020" };
                userRoles.RoleId = roleid;
                var roles = _roleService.AssignRole(userRoles, apiContext);
            }
            catch (Exception ex)
            {
                throw;
            }

            var responsedata = _mapper.Map<List<CustomerSettingsDTO>>(customers);
            return responsedata;
        }
    }
}
