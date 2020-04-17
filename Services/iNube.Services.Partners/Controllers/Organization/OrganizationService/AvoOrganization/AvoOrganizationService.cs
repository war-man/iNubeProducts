using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Partners.Entities.AVO;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.UserManagement.Helpers;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace iNube.Services.Partners.Controllers.Organization.OrganizationService
{

    public class AvoOrganizationService : IAvoOrganizationProductService
    {
        private AVOPRContext _context;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;

        private IIntegrationService _integrationService;
        public AvoOrganizationService(AVOPRContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
        }

        //get for master
        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblmasPrcommonTypes
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
            return ddDTOs;
        }

        // get Location
        public async Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext)
        {

            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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

        public async Task<AVOOrganizationResponse> CreateOrganizationAsync(AVOOrganizationDTO orgDTO, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            TblOrganization organization = _mapper.Map<TblOrganization>(orgDTO);
            //_context.Entry(organization).State = organization.OrganizationId == 0 ? EntityState.Added : EntityState.Modified;
            if (organization.OrganizationId == 0)
            {
                var _organization = _mapper.Map<TblOrganization>(orgDTO);

                var orgoffspoc = orgDTO.AVOOrgSpocDetails.FirstOrDefault();
                TblOrgOffice orgOffice = new TblOrgOffice();
                orgOffice.OfficeName = orgDTO.OrgName;
                //orgOffice.OfficeCode = orgoffspoc.SpocBrachCode;
                orgOffice.OfficePhoneNo = orgDTO.OrgPhoneNo;
                orgOffice.OfficeFaxNo = orgDTO.OrgFaxNo;
                //orgOffice.OfficeLevelId = 1;
                //orgOffice.OfficeReportingOfficeId = 0;
                orgOffice.OfficeCountryId = orgoffspoc.SpoccountryId;
                orgOffice.OfficeStateId = orgoffspoc.SpocstateId;
                orgOffice.OfficeDistrictId = orgoffspoc.SpocdistrictId;
                orgOffice.OfficeCityId = orgoffspoc.SpoccityId;
                orgOffice.OfficeAddressLine1 = orgoffspoc.SpocaddressLine1;
                orgOffice.OfficeAddressLine2 = orgoffspoc.SpocaddressLine2;
                orgOffice.OfficeAddressLine3 = orgoffspoc.SpocaddressLine3;
                orgOffice.OfficePincodeId = orgoffspoc.SpoccityId;
                orgOffice.IsActive = true;
                orgOffice.CreatedBy = apiContext.UserId;
                orgOffice.CreatedDate = DateTime.Now;

                TblOfficeSpocDetails OrgOfficeSpoc = new TblOfficeSpocDetails();
                OrgOfficeSpoc.Spocname = orgoffspoc.SpocfirstName;
                OrgOfficeSpoc.Spocmobileno = orgoffspoc.Spocmobileno;
                OrgOfficeSpoc.SpocemailId = orgoffspoc.SpocemailId;
                OrgOfficeSpoc.Spocdesignation = orgoffspoc.Spocdesignation;
                OrgOfficeSpoc.SpoccountryId = orgoffspoc.SpoccountryId;
                OrgOfficeSpoc.SpocstateId = orgoffspoc.SpocstateId;
                OrgOfficeSpoc.SpocdistrictId = orgoffspoc.SpocdistrictId;
                OrgOfficeSpoc.SpoccityId = orgoffspoc.SpoccityId;
                OrgOfficeSpoc.SpocaddressLine1 = orgoffspoc.SpocaddressLine1;
                OrgOfficeSpoc.SpocaddressLine2 = orgoffspoc.SpocaddressLine2;
                OrgOfficeSpoc.SpocaddressLine3 = orgoffspoc.SpocaddressLine3;
                OrgOfficeSpoc.SpocpincodeId = orgoffspoc.SpoccityId;

                orgOffice.TblOfficeSpocDetails.Add(OrgOfficeSpoc);

                _organization.TblOrgOffice.Add(orgOffice);

                var structuretype = _context.TblmasPrcommonTypes.Where(a => a.MasterType == "StructureType").Select(b => b);

                var orgstucture = orgDTO.OrgStructure;
                foreach (var item in orgstucture)
                {
                    try
                    {
                        TblOrgStructure tblOrg = new TblOrgStructure();
                        tblOrg.LevelId = item.levelId;
                        tblOrg.LevelDefinition = item.levelname;
                        if (!string.IsNullOrEmpty(item.levelname))
                        {
                            if (item.reportto == "self")
                            {
                                tblOrg.RepotrsToId = null;
                                tblOrg.ParentId = null;
                            }
                            else
                            {
                                tblOrg.RepotrsToId = _organization.TblOrgStructure.FirstOrDefault(a => a.LevelDefinition == item.reportto).LevelId;
                                tblOrg.ParentId = _organization.TblOrgStructure.FirstOrDefault(a => a.LevelDefinition == item.reportto).LevelId;
                            }
                        }
                        tblOrg.UserName = apiContext.UserName;
                        tblOrg.CreatedDateTime = DateTime.Now;
                        tblOrg.StructureTypeId = structuretype.FirstOrDefault(a => a.Value == item.StructureType).CommonTypeId;
                        _organization.TblOrgStructure.Add(tblOrg);
                    }
                    catch (Exception ex)
                    {

                    }
                }

                _context.TblOrganization.Add(_organization);
            }
            else
            {
                //_context.Entry(organization).State = EntityState.Modified;
                _context.Update(organization);
            }
            _context.SaveChanges();
            var organizationDTOs = _mapper.Map<AVOOrganizationDTO>(organization);

            if (orgDTO.OrganizationId == 0)
            {
                var userCount = await CreateUserAsync(organizationDTOs, apiContext);
            }

            return new AVOOrganizationResponse() { Status = BusinessStatus.Created, Id = organizationDTOs.OrganizationId.ToString(), ResponseMessage = $"Organizations ID {organizationDTOs.OrganizationId} successfully {(orgDTO.OrganizationId == 0 ? "created " : "modified")} for {organizationDTOs.OrgName}" };
            //return organizationDTOs;
        }

        public async Task<AVOOrganizationDTO> GetOrganization(int orgId, ApiContext apiContext)
        {

            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            AVOOrganizationDTO _organizationDTO = new AVOOrganizationDTO();
            TblOrganization _tblOrg = _context.TblOrganization.Where(org => org.OrganizationId == orgId)
                                        .Include(add => add.TblOrgAddress)
                                        .Include(spoc => spoc.TblOrgSpocDetails)
                                        .FirstOrDefault();
            _organizationDTO = _mapper.Map<AVOOrganizationDTO>(_tblOrg);
            return _organizationDTO;
        }

        public async Task<IEnumerable<AVOOrganizationDTO>> SearchOrganizationById(int orgId, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration)); ;
            var _org = _context.TblOrganization.Where(org => org.OrganizationId == orgId)
                        .Include(add => add.TblOrgAddress)
                        .Include(add => add.TblOrgOffice)
                        .Include(add => add.TblOrgStructure)
                        .Include(spoc => spoc.TblOrgSpocDetails)
                        .ToList();
            var _OrgDTO = _mapper.Map<List<AVOOrganizationDTO>>(_org);
            return _OrgDTO;
        }

        public async Task<IEnumerable<AVOOrganizationDTO>> SearchOrganization(OrgSearchDTO searchorg, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var _org = _context.TblOrganization
                 .Include(add => add.TblOrgAddress)
                 .Include(add => add.TblOrgOffice)
                 .Include(add => add.TblOrgStructure)
                 .Include(spoc => spoc.TblOrgSpocDetails)
                 .ToList();
            var _OrgDTO = _mapper.Map<List<AVOOrganizationDTO>>(_org);
            return _OrgDTO;
        }

        public int TestMethod(ApiContext apiContext)
        {
            //_context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            return 0;
        }

        public async Task<int> CreateUserAsync(AVOOrganizationDTO orgDTO, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            if (orgDTO.ConfigurationTypeId == 3)
            {
                var user = GetUserData(orgDTO.AVOOrgSpocDetails.FirstOrDefault());
                await _integrationService.CreateUserAsync(user, apiContext);
            }
            return 1;

        }

        private UserDTO GetUserData(AVOOrgSpocDetails orgSpocDetailsDTO)
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

        public async Task<IEnumerable<AVOOrganizationDTO>> GetOrgByParentId(int orgid, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var orgdata = _context.TblOrganization.Select(o => o.ParentId == orgid);
            var _result = _mapper.Map<List<AVOOrganizationDTO>>(orgdata);
            return _result.ToList();
        }

        public async Task<IEnumerable<ddDTO>> GetOrgDropdown(ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblOrganization.Select(a => new ddDTO
            {
                mID = Convert.ToInt32(a.OrganizationId),
                mValue = a.OrgName,
            });
            return ddDTOs;
        }

        public async Task<IEnumerable<ddDTO>> GetOffbyOrgid(int orgid, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblOrgOffice.Where(a => a.OrganizationId == orgid).Select(a => new ddDTO
            {
                mID = Convert.ToInt32(a.OrgOfficeId),
                mValue = a.OfficeName,
            });
            return ddDTOs;
        }
    }
}
