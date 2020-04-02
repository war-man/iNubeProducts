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
        Task<CustomerResponse> createProvision(CustomerProvisioningDTO customerProvisioningDTO, ApiContext apiContext);
        CustomerSettingsDTO GetCustomerSettings(int customerid, string type, int envid, ApiContext apiContext);

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

        public CustomerProvisioningService(MICACPContext context, IMapper mapper, IIntegrationService integrationService, IOptions<AppSettings> appSettings, IUserProfileService userService, IRoleService roleService)
        {
            _mapper = mapper;
            _integrationService = integrationService;
            _appSettings = appSettings.Value;
            _userService = userService;
            _roleService = roleService;
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

        public async Task<CustomerResponse> createProvision(CustomerProvisioningDTO customerProvisioningDTO, ApiContext apiContext)
        {
            _cpcontext = (MICACPContext)DbManager.GetCPContext(apiContext.ProductType);
            // _cpcontext = (MICACPContext)(DbManager.GetContext(apiContext.ProductType, apiContext.ServerType));
            CustomerSettingsDTO customerSettings = new CustomerSettingsDTO();
            var count = 0;
            foreach (var item in customerProvisioningDTO.customerSettings)
            {
                item.CreatedDate = DateTime.Now;
                item.CustomerId = customerProvisioningDTO.CustomerId;

                if (item.Type == "Database")
                {
                    if (count == 0)
                    {
                        foreach (var i in customerProvisioningDTO.customerEnvironmentDTOs)
                        {
                            i.Product = apiContext.ProductType;
                            i.CustomerId = customerProvisioningDTO.CustomerId;
                            i.CreatedDate = DateTime.Now;
                            i.IsActive = true;
                            i.Dbconnection = "Data Source=inubepeg.database.windows.net; Initial Catalog =" + item.KeyValue + "; User Id=MICAUSER; Password=MICA*user123";
                        }
                        count++;
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
            var envid = _cpcontext.TblCustomerEnvironment.Where(a => a.CustomerId == customerProvisioningDTO.CustomerId).FirstOrDefault();



            UserDTO userDTO = new UserDTO();
            userDTO.EnvId = envid.Id;
            //userDTO.EnvId = cpdata;
            UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
            userDetailsDTO.FirstName = userdetails.FirstName;
            userDetailsDTO.LastName = userdetails.LastName;
            //userDetailsDTO.MaritalStatusId = userdetails.MaritalStatusId;
            //userDetailsDTO.GenderId = userdetails.GenderId;
            userDetailsDTO.MaritalStatusId = 1005;
            userDetailsDTO.GenderId = 1001;
            userDetailsDTO.UserTypeId = 1004; //Internal User type 
            userDetailsDTO.Dob = userdetails.Dob;
            userDetailsDTO.Doj = userdetails.Doj;
            userDetailsDTO.ContactNumber = userdetails.Mobileno;
            userDetailsDTO.Email = userdetails.EmailId;
            userDetailsDTO.PanNo = userdetails.PanNo;
            userDetailsDTO.BranchName = userdetails.BranchName;
            userDetailsDTO.RoleId = "efffe944-6a34-433b-964f-9311c90192eb"; //Role Customer Admin
            userDetailsDTO.PartnerId = 0;
            userDetailsDTO.OrganizationId = customerProvisioningDTO.CustomerId;
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
                //var envids = _cpcontext.TblCustomerEnvironment.Where(a => a.CustomerId == customerProvisioningDTO.CustomerId).Select(x=>x);
                if (Convert.ToInt32(result.Status) == 7)
                {
                    return new CustomerResponse { Status = BusinessStatus.Error, ResponseMessage = $"Customer user already exists" };
                }
                else
                {
                    UserRoleMapDTO userRoles = new UserRoleMapDTO();
                    //userRoles.UserId = result.users.Id;
                    userRoles.EnvId = envid.Id;
                    userRoles.UserId = result.users.Id;
                    string[] roleid = { "6EAE7D39-D9DB-41EF-A4B1-12E07F1E5020" };
                    userRoles.RoleId = roleid;
                    var roles = _roleService.AssignRole(userRoles, apiContext);
                }
            }
            catch (Exception ex)
            {
                throw;
            }

            var responsedata = _mapper.Map<List<CustomerSettingsDTO>>(customers);
            //return responsedata;
            return new CustomerResponse { Status = BusinessStatus.Created, ResponseMessage = $"Customer user created successfully!" };

        }

        public CustomerSettingsDTO GetCustomerSettings(int customerid, string type, int envid, ApiContext apiContext)
        {
            var data = _cpcontext.TblCustomerSettings.FirstOrDefault(a => a.CustomerId == customerid && a.Type == type);

            if (envid != 0)
            {
                data = _cpcontext.TblCustomerSettings.FirstOrDefault(a => a.CustomerId == customerid && a.Type == type && a.EnvId == envid);
            }

            CustomerSettingsDTO customer = new CustomerSettingsDTO();

            customer.Id = data.Id;
            customer.Key = data.Key;
            customer.KeyValue = data.KeyValue;
            customer.Type = data.Type;
            customer.CustomerId = data.CustomerId;
            customer.IsActive = data.IsActive;
            customer.ModifiedDate = data.ModifiedDate;
            customer.EnvId = data.EnvId;

            return customer;
        }
    }
}
