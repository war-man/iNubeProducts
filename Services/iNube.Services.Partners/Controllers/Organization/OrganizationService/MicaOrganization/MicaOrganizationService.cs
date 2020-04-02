using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Partners.Controllers.Partner.PartnerService;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Helpers;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.UserManagement.Helpers;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace iNube.Services.Partners.Controllers.Organization.OrganizationService
{
    
    public class MicaOrganizationService : IOrganizationProductService
    {
        private MICAPRContext _context;
        private IMapper _mapper;

        private readonly IConfiguration _configuration;
        private IIntegrationService _integrationService;
        public DbHelper dbHelper;
        public MicaOrganizationService(MICAPRContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            dbHelper = new DbHelper(new IntegrationService(configuration)); ;
        }

        //get for master
        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist , ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            IEnumerable<ddDTO> ddDTOs;
            ddDTOs  = _context.TblmasPrcommonTypes
             .Select(c => new ddDTO
              {
                  mID = c.CommonTypeId,
                  mValue = c.Value,
                  mType = c.MasterType
              });
             return ddDTOs;
        }

        // get Location
        public async Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID,ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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

        public async Task<OrganizationResponse> CreateOrganizationAsync(OrganizationDTO orgDTO,ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration)); ;

            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
            TblOrganization organization = _mapper.Map<TblOrganization>(orgDTO);
            //_context.Entry(organization).State = organization.OrganizationId == 0 ? EntityState.Added : EntityState.Modified;
            if (organization.OrganizationId == 0)
            {
                if (orgDTO.CustomerId<= 0)
                {
                    organization.ParentId = apiContext.OrgId;
                }
                organization.CreatedBy = apiContext.UserId;
                organization.CreatedDate = DateTimeNow;
                _context.TblOrganization.Add(organization);
            }
            else
            {
                organization.ModifiedBy = apiContext.UserId;
                organization.ModifiedDate = DateTimeNow;
                //_context.Entry(organization).State = EntityState.Modified;
                _context.Update(organization);
            }
            _context.SaveChanges();
            var organizationDTOs = _mapper.Map<OrganizationDTO>(organization);
            if (orgDTO.OrganizationId == 0)
            {
                var userCount = await CreateUserAsync(organizationDTOs,apiContext);
            }
            return new OrganizationResponse() { Status = BusinessStatus.Created, Id = organizationDTOs.OrganizationId.ToString(), ResponseMessage = $"Organizations ID {organizationDTOs.OrganizationId} successfully {(orgDTO.OrganizationId == 0 ? "created " : "modified")} for {organizationDTOs.OrgName}" };
            //return organizationDTOs;
        }

        public async Task<OrganizationDTO> GetOrganization(int orgId,ApiContext apiContext)
        {

            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            OrganizationDTO _organizationDTO = new OrganizationDTO();
            TblOrganization _tblOrg = _context.TblOrganization.Where(org => org.OrganizationId == orgId)
                                        .Include(add => add.TblOrgAddress)
                                        .Include(spoc => spoc.TblOrgSpocDetails)
                                        .FirstOrDefault();
            _organizationDTO = _mapper.Map<OrganizationDTO>(_tblOrg);
            return _organizationDTO;
        }

        public async Task<IEnumerable<OrganizationDTO>> SearchOrganizationById(int orgId,ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var _org = _context.TblOrganization.Where(org => org.OrganizationId == orgId)
                        .Include(add => add.TblOrgAddress)
                        .Include(spoc => spoc.TblOrgSpocDetails)
                        .ToList();
            var _OrgDTO = _mapper.Map<List<OrganizationDTO>>(_org);
            return _OrgDTO;
        }

        public async Task<IEnumerable<OrganizationDTO>> SearchOrganization(OrgSearchDTO searchorg,ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var _org = _context.TblOrganization
                 .Include(add => add.TblOrgAddress)
                 .Include(spoc => spoc.TblOrgSpocDetails)
                 .ToList();
            var _OrgDTO = _mapper.Map<List<OrganizationDTO>>(_org);
            return _OrgDTO;
        }

        public int TestMethod(ApiContext apiContext)
        {
            //_context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            return 0;
        }

        public async Task<int> CreateUserAsync(OrganizationDTO orgDTO,ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration)); ;

            if (orgDTO.ConfigurationTypeId == 3)
            {
                var user = GetUserData(orgDTO.OrgSpocDetails.FirstOrDefault());
                await _integrationService.CreateUserAsync(user,apiContext);
            }
            return 1;

        }
        private UserDTO GetUserData(OrgSpocDetailsDTO orgSpocDetailsDTO)
        {
            UserDTO userDTO = new UserDTO();
            
            UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
            UserAddressDTO userAddressDTO = new UserAddressDTO();
            userDetailsDTO.Email = orgSpocDetailsDTO.SpocemailId;
            userDetailsDTO.FirstName = orgSpocDetailsDTO.SpocfirstName;
            userDetailsDTO.MiddleName = orgSpocDetailsDTO.SpocMiddleName;
            userDetailsDTO.LastName = orgSpocDetailsDTO.SpocLastName;
            userDetailsDTO.MaritalStatusId = orgSpocDetailsDTO.SpocMaritalStatusId;
            userDetailsDTO.GenderId = orgSpocDetailsDTO.SpocGenderId;
            userDetailsDTO.ContactNumber = orgSpocDetailsDTO.Spocmobileno;
            userDetailsDTO.PanNo = orgSpocDetailsDTO.SpocpanNo;
            userDetailsDTO.Dob = orgSpocDetailsDTO.Spocdob;
            userDetailsDTO.Doj = orgSpocDetailsDTO.Spocdoj;
            userDetailsDTO.Email = orgSpocDetailsDTO.SpocemailId;
            //userDetailsDTO.CreatedBy = apiContext.UserId;
            userAddressDTO.UserAddressLine1 = orgSpocDetailsDTO.SpocaddressLine1;
            userAddressDTO.UserAddressLine2 = orgSpocDetailsDTO.SpocaddressLine2;
            userAddressDTO.UserAddressLine3 = orgSpocDetailsDTO.SpocaddressLine3;
            userAddressDTO.UserPincodeId = orgSpocDetailsDTO.SpocpincodeId;
            userAddressDTO.UserCountryId = orgSpocDetailsDTO.SpoccountryId;
            userAddressDTO.UserStateId = orgSpocDetailsDTO.SpocstateId;
            userAddressDTO.UserCityId = orgSpocDetailsDTO.SpoccityId;
            userAddressDTO.UserDistrictId = orgSpocDetailsDTO.SpocdistrictId;

            userDetailsDTO.UserTypeId = 1004;
            userDTO.UserDetails.Add(userDetailsDTO);
            userDTO.UserAddress.Add(userAddressDTO);
            return userDTO;
        }

        public async Task<IEnumerable<OrganizationDTO>> GetOrgByParentId(int orgid, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var orgdata = _context.TblOrganization.Select(o => o.ParentId == orgid);
            var _result = _mapper.Map<List<OrganizationDTO>>(orgdata);
            return _result;
        }
    }
}
