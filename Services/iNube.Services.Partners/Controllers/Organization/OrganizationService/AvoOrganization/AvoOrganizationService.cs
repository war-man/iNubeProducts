using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
                orgOffice.OfficeCode = orgDTO.OrganizationCode;
                orgOffice.OfficePhoneNo = orgDTO.OrgPhoneNo;
                orgOffice.OfficeFaxNo = orgDTO.OrgFaxNo;
                orgOffice.OfficeLevelId = 0;
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

        public async Task<AVOOrganizationNewDTO> GetOrganization(int orgId, ApiContext apiContext)
        {
            try
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

                AVOOrganizationNewDTO _organizationDTO = new AVOOrganizationNewDTO();
                TblOrganization _tblOrg = _context.TblOrganization.Where(org => org.OrganizationId == orgId)
                                            .Include(add => add.TblOrgAddress)
                                            .Include(spoc => spoc.TblOrgSpocDetails)
                                            .Include(add => add.TblOrgStructure)
                                            .FirstOrDefault();
                _organizationDTO = _mapper.Map<AVOOrganizationNewDTO>(_tblOrg);
                return _organizationDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        //public async Task<AVOOrganizationDTO> GetOrganization(int orgId, ApiContext apiContext)
        //{

        //    _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

        //    AVOOrganizationDTO _organizationDTO = new AVOOrganizationDTO();
        //    TblOrganization _tblOrg = _context.TblOrganization.Where(org => org.OrganizationId == orgId)
        //                                .Include(add => add.TblOrgAddress)
        //                                .Include(spoc => spoc.TblOrgSpocDetails)
        //                                .FirstOrDefault();
        //    _organizationDTO = _mapper.Map<AVOOrganizationDTO>(_tblOrg);
        //    return _organizationDTO;
        //}


        public async Task<IEnumerable<AVOOrganizationDTO>> SearchOrganizationById(int orgId, ApiContext apiContext)
        {
            try
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
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<AVOOrganizationNewDTO>> SearchOrganization(OrgSearchDTO searchorg, ApiContext apiContext)
        {
            try
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
                var _org = _context.TblOrganization
                     .Include(add => add.TblOrgAddress)
                     .Include(add => add.TblOrgOffice)
                     .Include(add => add.TblOrgStructure)
                     .Include(spoc => spoc.TblOrgSpocDetails)
                     .ToList();
                var _OrgDTO = _mapper.Map<List<AVOOrganizationNewDTO>>(_org);
                return _OrgDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
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


        public async Task<IEnumerable<AvoOrgEmployeeSearch>> GetEmployeeDetails(AvoOrgEmployeeSearch empdata, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            //  var Emp = _context.TblOrgEmployee.OrderByDescending(p => p.CreatedDate);

            var Emp = from emp in _context.TblOrgEmployee
                          //join mov in _context.TblMovements on emp.OrgEmpId equals mov.OrgEmpId
                      join pos in _context.TblOrgPositions on emp.PositionId equals pos.PositionId
                      select new AvoOrgEmployeeSearch
                      {
                          OrgEmpId = emp.OrgEmpId,
                          StaffCode = emp.StaffCode,
                          StaffName = emp.StaffName,
                          PositionId = emp.PositionId,
                          Position = pos.PositionName,
                          Email = emp.Email,
                          PhoneNumber = emp.PhoneNumber,
                          StaffTypeId = emp.StaffTypeId,
                          Function = emp.Function,
                          AppointmentDate = emp.AppointmentDate,
                          Smcode = emp.Smcode,
                          Imdcode = emp.Imdcode,
                          StaffStatus = emp.StaffStatus,
                          CreatedBy = emp.CreatedBy,
                          CreatedDate = emp.CreatedDate,
                          ModifiedBy = emp.ModifiedBy,
                          ModifiedDate = emp.ModifiedDate,
                          // MovementId = mov.MovementId,
                          // MovementStatusId = mov.MovementStatusId,
                          OrganizationId = pos.OrganizationId,

                      };

            if (empdata.StaffCode != "")
            {
                Emp = Emp.Where(bi => Convert.ToInt32(bi.StaffCode) == Convert.ToInt32(empdata.StaffCode));

            }
            return Emp;
        }

        public async Task<CreateOfficeResponse> CreateOffice(AVOOrgOffice aVOOrgOffice, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {

                var data = _mapper.Map<TblOrgOffice>(aVOOrgOffice);
                var officeReportingId = data.OfficeReportingOfficeId;

                var officelevelid = _context.TblOrgOffice.FirstOrDefault(a => a.OrgOfficeId == officeReportingId).OfficeLevelId;
                if (officelevelid == 0)
                {
                    data.OfficeLevelId = 1;

                }
                else
                {

                    data.OfficeLevelId = officelevelid + 1;
                }

                _context.TblOrgOffice.Add(data);
                _context.SaveChanges();
                return new CreateOfficeResponse { Status = BusinessStatus.Created, ResponseMessage = $" Office Created sucessfully " };
            }
            catch (Exception ex)
            {

                return new CreateOfficeResponse { Status = BusinessStatus.Error, ResponseMessage = $" Something went Wrong" };
            }

        }

        public async Task<IEnumerable<ddDTO>> GetNewBranchDropdown(int posid, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            //  var Emp = _context.TblOrgEmployee.OrderByDescending(p => p.CreatedDate);

            var Emp = from emp in _context.TblOrgEmployee
                      join pos in _context.TblOrgPositions on emp.PositionId equals pos.PositionId
                      join off in _context.TblOrgOffice on pos.OrganizationId equals off.OrganizationId
                      select new ddDTO
                      {
                          mID = Convert.ToInt32(off.OrgOfficeId),
                          mValue = off.OfficeName,

                      };
            //  var employeeList = _mapper.Map<IEnumerable<AvoOrgEmployeeSearch>>(Emp);

            return Emp.Distinct();
        }
        public async Task<List<MasterDto>> GetDesignation(int orgid, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var masterdata = _context.TblOrgStructure.Where(s => s.OrganizationId == orgid && s.StructureTypeId == 28)
                                                    .Select(x => new MasterDto
                                                    {
                                                        mID = Convert.ToInt32(x.OrgStructureId),
                                                        mType = "Designation",
                                                        mValue = x.LevelDefinition
                                                    }).ToList();
            return masterdata;


        }
        public async Task<List<MasterDto>> GetEmployee(int orgid, int offid, int desgiId, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var positionid = _context.TblOrgPositions.FirstOrDefault(x => x.OrganizationId == orgid && x.OfficeId == offid && x.DesignationId == desgiId).PositionId;

            var masterdata = _context.TblOrgEmployee.Where(s => s.PositionId == positionid)
                                                    .Select(x => new MasterDto
                                                    {
                                                        mID = Convert.ToInt32(x.OrgEmpId),
                                                        mType = "Employee",
                                                        mValue = x.StaffName
                                                    }).ToList();
            return masterdata;


        }

        public async Task<int> GetCount(int empid, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var count = 0;
            var positionid = _context.TblOrgEmployee.FirstOrDefault(x => x.OrgEmpId == empid).PositionId;

            var masterdata = _context.TblOrgPositions.Where(s => s.PositionId == positionid)
                                                    .Select(x => new CountDto
                                                    {
                                                        ParentId = Convert.ToInt32(x.ParentId),
                                                        Positionid = Convert.ToInt32(x.PositionId)

                                                    }).ToList();
            foreach (var item in masterdata)
            {
                if (item.ParentId == item.Positionid)
                {
                    count++;
                }
            }
            return count;


        }

        public async Task<AVOOrgEmployee> GetEmployeeDetailsById(int empid, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var Emp = _context.TblOrgEmployee.Where(item => item.OrgEmpId == empid)
                  .Include(add => add.TblOrgEmpAddress)
                  .Include(a => a.TblOrgEmpEducation)
                  .SingleOrDefault();

            //var Emp = from emp in _context.TblOrgEmployee
            //          join ed in _context.TblOrgEmpEducation on emp.OrgEmpId equals ed.OrgEmpId
            //          join add in _context.TblOrgEmpAddress on emp.OrgEmpId equals add.OrgEmpId
            //          select new ddDTO
            //          {
            //              mID = Convert.ToInt32(off.OrgOfficeId),
            //              mValue = off.OfficeName,

            //          };
            var contractdata = _mapper.Map<AVOOrgEmployee>(Emp);

            return contractdata;
        }


        public async Task<CreateOfficeResponse> Saveoffice(AvoOfficeDto Officedto, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {

                //  var data = _mapper.Map<TblOrgOffice>(aVOOrgOffice);
                var positioncount = Officedto.newpositioncount;
                for (var i = 0; i < positioncount; i++)
                {
                    var positionName = _context.TblOrgStructure.FirstOrDefault(a => a.OrganizationId == Officedto.DesignationId).LevelDefinition;
                    var parentId = _context.TblOrgEmployee.FirstOrDefault(a => a.OrgEmpId == Officedto.EmpId).PositionId;
                    TblOrgPositions tblOrgPositions = new TblOrgPositions();
                    tblOrgPositions.OrganizationId = Officedto.OrganizationId;
                    tblOrgPositions.OfficeId = Officedto.OfficeId;
                    tblOrgPositions.DesignationId = Officedto.DesignationId;
                    tblOrgPositions.PositionName = positionName;
                    tblOrgPositions.RepOrgId = Officedto.OrganizationId;
                    tblOrgPositions.RepOfficeId = Officedto.OfficeId;
                    tblOrgPositions.ParentId = parentId;
                    tblOrgPositions.IsActive = true;
                    tblOrgPositions.IsVacant = true;
                    _context.TblOrgPositions.Add(tblOrgPositions);
                }
                _context.SaveChanges();
                return new CreateOfficeResponse { Status = BusinessStatus.Created, ResponseMessage = $" Data saved sucessfully " };
            }
            catch (Exception ex)
            {

                return new CreateOfficeResponse { Status = BusinessStatus.Error, ResponseMessage = $" Something went Wrong" };
            }

        }

        public async Task<IEnumerable<AVOOrgEmployee>> SearchPeople(SearchPeople searchPeople, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var SearchData = _context.TblOrgEmployee/*.OrderByDescending(b=>b.CreatedDate)*/.Select(a => a)
                 .Include(add => add.TblOrgEmpAddress)
                 .Include(add => add.TblOrgEmpEducation)
                 .ToList();

            if (!string.IsNullOrEmpty(searchPeople.EmpCode))
            {
                SearchData = SearchData.Where(a => a.StaffCode == searchPeople.EmpCode).Select(a => a).ToList();
            }

            var _SearchData = _mapper.Map<List<AVOOrgEmployee>>(SearchData);

            foreach (var item in _SearchData)
            {
                var designation = _context.TblOrgPositions.FirstOrDefault(a => a.PositionId == item.PositionId);
                if (designation != null)
                {
                    item.Designation = designation.PositionName;
                }
                var offname = _context.TblOrgOffice.FirstOrDefault(a => a.OrgOfficeId == designation.OfficeId);
                if (offname != null)
                {
                    item.OfficeName = offname.OfficeName;
                }
            }

            return _SearchData;
        }



        public async Task<List<vacantPositiondto>> GetVecPositions(decimal orgid, ApiContext apiContext)
        {
            //get context
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var totalPosition = _context.TblOrgStructure.Where(a => a.OrganizationId == orgid && a.StructureTypeId == 28).ToList();
            List<vacantPositiondto> ddDTOs = new List<vacantPositiondto>();
            vacantPositiondto ddDTO = new vacantPositiondto();
            var positname = "";
            foreach (var positions in totalPosition)
            {
                var count = _context.TblOrgPositions.Where(a => a.DesignationId == positions.OrgStructureId && a.IsVacant == true).Count();
                if (count > 0)
                {
                    ddDTO = new vacantPositiondto();
                    ddDTO.mID = positions.LevelDefinition;
                    ddDTO.mValue = positions.LevelDefinition;
                    ddDTOs.Add(ddDTO);
                }

            }
            return ddDTOs;


        }

        public async Task<int> GetVacantPositonCount(string designame, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var count = _context.TblOrgPositions.Where(a => a.PositionName == designame && a.IsVacant == true).Count();
            return count;
        }




        public async Task<CreatePeopleResponse> SaveEmplMappingDetails(updatepositionDto avOOrgEmployee, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {

                var positiondata = _context.TblOrgPositions.FirstOrDefault(a => a.PositionName == avOOrgEmployee.DeginName && a.IsVacant == true);
                positiondata.IsVacant = false;
                _context.TblOrgPositions.Update(positiondata);

                var mappingdto = avOOrgEmployee.AVOOrgEmployee;

                var data = _mapper.Map<TblOrgEmployee>(mappingdto);
                data.StaffName = data.FirstName + " " + (!string.IsNullOrEmpty(data.MiddleName) ? data.MiddleName : "") + " " + (!string.IsNullOrEmpty(data.LastName) ? data.LastName : "");
                data.PositionId = positiondata.PositionId;
                data.ReportingTo = avOOrgEmployee.EmpId;
                _context.TblOrgEmployee.Add(data);
                //data.
                _context.SaveChanges();
                return new CreatePeopleResponse { Status = BusinessStatus.Created, ResponseMessage = $"Employee created successfully with Employee code: {data.StaffCode}." };
            }
            catch (Exception ex)
            {

                return new CreatePeopleResponse { Status = BusinessStatus.Error, ResponseMessage = $" Something went Wrong" };
            }

        }

        public async Task<List<ddDTO>> GetEmpDetails(decimal orgId, decimal offid, ApiContext apiContext)
        {
            try
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

                List<ddDTO> ddDTOs = new List<ddDTO>();
                var positionid = _context.TblOrgPositions.FirstOrDefault(a => a.OrganizationId == orgId && a.OfficeId == offid).PositionId;
                var scontract = _context.TblOrgEmployee.Where(a => a.PositionId == positionid)
                    .Select(a => new ddDTO
                    {
                        mID = Convert.ToInt32(a.OrgEmpId),
                        mValue = a.StaffName,
                    });

                var contractdata = _mapper.Map<List<ddDTO>>(scontract);

                return contractdata;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<AVOOrgEmployee> searchpeoplebycode(string empcode, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var SearchData = _context.TblOrgEmployee.Select(a => a)
                 .Include(add => add.TblOrgEmpAddress).ToList();


            if (!string.IsNullOrEmpty(empcode))
            {
                SearchData = SearchData.Where(a => a.StaffCode == empcode).Select(a => a).ToList();
            }

            var _SearchData = _mapper.Map<List<AVOOrgEmployee>>(SearchData);
            var objdata = _SearchData[0];
            return objdata;
        }

        public async Task<MovementCounts> GetMovementCount(ApiContext apiContext)
        {

            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var _movement = (from a in _context.TblOrgEmployee.OrderByDescending(p => p.CreatedDate)
                             join b in _context.TblMovements on a.OrgEmpId equals b.OrgEmpId
                             select b);

            MovementCounts counts = new MovementCounts();

            counts.Recommended = _movement.Where(g => g.MovementStatusId == 34).Count();
            counts.Approved = _movement.Where(g => g.MovementStatusId == 35).Count();
            counts.Rejected = _movement.Where(g => g.MovementStatusId == 36).Count();

            return counts;
        }

        public async Task<AVOOrgEmployee> UpdateEmployee(AVOOrgEmployee Empdata, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {
                var peopledata = _mapper.Map<TblOrgEmployee>(Empdata);
                // var tbl_people = _context.TblOrgEmployee.Find(peopledata.OrgEmpId);

                _context.TblOrgEmployee.Update(peopledata);
                _context.SaveChanges();
                var empDTO = _mapper.Map<AVOOrgEmployee>(peopledata);
                return empDTO;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<AVOMovements> SaveDecision(AVOMovements data, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var _tblmovements = _mapper.Map<TblMovements>(data);
            _tblmovements.MovementStatusId = 34;

            _context.TblMovements.Add(_tblmovements);

            _context.SaveChanges();
            var decisionData = _mapper.Map<AVOMovements>(_tblmovements);
            return decisionData;
        }

        public async Task<EmployeeRoles> GetEmployeeRoles(string empCode, ApiContext apiContext)
        {

            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var Roles = (from a in _context.TblOrgEmployee.Where(emp => emp.StaffCode == empCode)
                         join b in _context.TblOrgPositions on a.PositionId equals b.PositionId
                         join d in _context.TblDesignationRole on b.DesignationId equals d.DesignationId
                         select d.RoleId);

            //  EmployeeRoles empRoles = new EmployeeRoles() {Status = BusinessStatus.Ok };
            EmployeeRoles employeeRoles = new EmployeeRoles();
            if (Roles != null)
            {
                employeeRoles.Roles = Roles.ToArray();
                return employeeRoles;
            }
            //empRoles.Status = BusinessStatus.NotFound;
            //empRoles.ResponseMessage = "No Record Exist";
            return employeeRoles;

        }
        public async Task<RoleDesigResponse> AssignDesigRole(RoleDesigMapDTO desigRoles, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var roledata = _context.TblOrgStructure.FirstOrDefault(x => x.OrgStructureId == desigRoles.DesignationId);
            var roleDTO = new DesignationRoleDTO();
            if (desigRoles.RoleId.Length != 0)
            {
                if (roledata == null)
                {
                    for (int i = 0; i < desigRoles.RoleId.Length; i++)
                    {
                        roleDTO.DesignationId = desigRoles.DesignationId;
                        roleDTO.RoleId = desigRoles.RoleId[i];
                        TblDesignationRole _usersRole = _mapper.Map<TblDesignationRole>(roleDTO);

                        _context.TblDesignationRole.Add(_usersRole);
                    }
                }
                else
                {
                    var role = _context.TblDesignationRole.Where(a => a.DesignationId == desigRoles.DesignationId);
                    foreach (var item in role)
                    {
                        _context.TblDesignationRole.Remove(item);
                    }
                    for (int i = 0; i < desigRoles.RoleId.Length; i++)
                    {
                        roleDTO.DesignationId = desigRoles.DesignationId;
                        roleDTO.RoleId = desigRoles.RoleId[i];
                        TblDesignationRole _usersRole = _mapper.Map<TblDesignationRole>(roleDTO);

                        _context.TblDesignationRole.Add(_usersRole);
                    }
                }

                _context.SaveChanges();

                //return userRoles;
                return new RoleDesigResponse { Status = BusinessStatus.Created, role = desigRoles, ResponseMessage = $"Role assigned to designation successfully!" };
            }
            else
            {
                var role = _context.TblDesignationRole.Where(a => a.DesignationId == desigRoles.DesignationId);
                foreach (var item in role)
                {
                    _context.TblDesignationRole.Remove(item);
                }

                _context.SaveChanges();
                return new RoleDesigResponse { Status = BusinessStatus.Created, role = desigRoles, ResponseMessage = $"Role removed from designation successfully" };
            }
        }
        public async Task<IEnumerable<AvoOrgEmployeeSearch>> SearchEmployeeDetailsByMovStatus(MovementDTO movementDTO, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var Emp = from emp in _context.TblOrgEmployee
                      join mov in _context.TblMovements on emp.OrgEmpId equals mov.OrgEmpId
                      join pos in _context.TblOrgPositions on emp.PositionId equals pos.PositionId
                      where mov.MovementStatusId == movementDTO.movementStatusId

                      select new AvoOrgEmployeeSearch
                      {
                          OrgEmpId = emp.OrgEmpId,
                          StaffCode = emp.StaffCode,
                          StaffName = emp.StaffName,
                          PositionId = emp.PositionId,
                          Position = pos.PositionName,
                          Email = emp.Email,
                          PhoneNumber = emp.PhoneNumber,
                          StaffTypeId = emp.StaffTypeId,
                          Function = emp.Function,
                          AppointmentDate = emp.AppointmentDate,
                          Smcode = emp.Smcode,
                          Imdcode = emp.Imdcode,
                          StaffStatus = emp.StaffStatus,
                          CreatedBy = emp.CreatedBy,
                          CreatedDate = emp.CreatedDate,
                          ModifiedBy = emp.ModifiedBy,
                          ModifiedDate = emp.ModifiedDate,
                          MovementId = mov.MovementId,
                          MovementStatusId = mov.MovementStatusId,
                          OrganizationId = pos.OrganizationId,
                      };

            return Emp;
        }

        public async Task<AVOMovements> UpdateEmployeePosition(PositionStatusDTO movements, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {
                var movementdata = _context.TblMovements.FirstOrDefault(x => x.MovementId == movements.MovementId);
                var positiondata = (from pos in _context.TblOrgPositions
                                    join emp in _context.TblOrgEmployee on pos.PositionId equals emp.PositionId
                                    where emp.OrgEmpId == movementdata.OrgEmpId
                                    select (pos));
                var pdata = positiondata.FirstOrDefault();

                if (movements.MovementStatusId == 34)//Recommended
                {
                    movementdata.MovementStatusId = movements.MovementStatusId;
                    movementdata.Reason = movements.Remarks;
                    movementdata.ModifiedDate = DateTime.Now;
                    movementdata.ModifiedBy = apiContext.UserId;
                }
                if (movements.MovementStatusId == 36)//rejected
                {
                    movementdata.MovementStatusId = movements.MovementStatusId;
                    movementdata.Reason = movements.Remarks;
                    movementdata.ModifiedDate = DateTime.Now;
                    movementdata.ModifiedBy = apiContext.UserId;
                }
                if (movements.MovementStatusId == 35)//approved
                {
                    movementdata.MovementStatusId = movements.MovementStatusId;
                    movementdata.Reason = movements.Remarks;
                    movementdata.ModifiedDate = DateTime.Now;
                    movementdata.ModifiedBy = apiContext.UserId;
                    //pdata.DesignationId = movementdata.NewPositionId;
                    //_context.TblOrgPositions.Update(pdata);

                    //Updating Movement details table
                    var movementDetailsData = _context.TblMovementDetails.Where(x => x.MovementId == movementdata.MovementId).ToList();
                    foreach (var movData in movementDetailsData)
                    {
                        if (movData.MovementFormId == 1009)
                        {
                            var reportee = _context.TblOrgEmployee.FirstOrDefault(x => x.OrgEmpId == movData.MovingId).PositionId;
                            var supervisorPos = _context.TblOrgEmployee.FirstOrDefault(x => x.OrgEmpId == movData.MovedTo).PositionId;

                            var reporteePos = _context.TblOrgPositions.FirstOrDefault(x => x.PositionId == reportee);
                            reporteePos.ParentId = supervisorPos;

                            _context.TblOrgPositions.Update(reporteePos);
                            movData.Status = 1;
                        }
                    }
                    //Create new position
                    var newPos = await CreateNewPosition(movementdata.MovementId, apiContext);
                }
                _context.TblMovements.Update(movementdata);
                var mapData = _mapper.Map<AVOMovements>(movementdata);

                _context.SaveChanges();
                return mapData;
            }
                
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ResponseStatus> CreateNewPosition(decimal MovementId, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //Random Numb
            int _min = 1000;
            int _max = 9999;
            Random _rdm = new Random();

            ResponseStatus response = new ResponseStatus()
            {
                Status = BusinessStatus.Created
            };
            

             var movementData = _context.TblMovements.FirstOrDefault(x => x.MovementId == MovementId);
            if (movementData == null) {
                response.Status = BusinessStatus.Error;
                return response ;
            }
            

            var positiondata = (from pos in _context.TblOrgPositions
                                join emp in _context.TblOrgEmployee on pos.PositionId equals emp.PositionId
                                where emp.OrgEmpId == movementData.OrgEmpId
                                select (pos));
        
            var pdata = positiondata.FirstOrDefault();

            if (pdata != null)
            {
                //update IsVacant as true into existing row
                //pdata.IsVacant = true;
                //pdata.ModifiedBy = apiContext.UserId;
                //pdata.ModifiedDate = DateTime.Now;
                //_context.TblOrgPositions.Update(pdata);
                //_context.SaveChanges();
                var postionCheck = _context.TblOrgPositions.FirstOrDefault(x => x.OrganizationId == pdata.OrganizationId && x.IsVacant == true);
                if (postionCheck == null)
                {
                    TblOrgPositions position = new TblOrgPositions();
                    position.OrganizationId = pdata.OrganizationId;
                    position.OfficeId = (decimal)movementData.NewBranchId;
                    position.DesignationId = movementData.NewPositionId;
                    position.PositionName = pdata.PositionName + _rdm.Next(_min, _max);
                    position.RepOrgId = pdata.RepOrgId;
                    position.RepOfficeId = pdata.RepOfficeId;
                    position.ParentId = pdata.ParentId;//for whom he is Reporting to
                    position.ParentLineId = pdata.ParentLineId;
                    position.ReportingId = pdata.ReportingId;
                    position.CreatedBy = apiContext.UserId;
                    position.CreatedDate = DateTime.Now;
                    position.IsVacant = false;
                    position.IsActive = true;
                    _context.TblOrgPositions.Add(position);
                    _context.SaveChanges();

                    response.Id= position.PositionId.ToString();
                }
                else
                response.Id= postionCheck.PositionId.ToString();
            }
            return response;
        }

    public async Task<AVOOrgEmployee> ModifyPeople(AVOOrgEmployee tblRetentionGroupDto, ApiContext apiContext)
    {
        // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
        _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
        var tbl_participant = _mapper.Map<AVOOrgEmployee>(tblRetentionGroupDto);
        var tbl_particiant = _context.TblOrgEmployee.Find(tbl_participant.OrgEmpId);
        var tbl_address = _context.TblOrgEmpAddress.FirstOrDefault(a => a.OrgEmpId == tbl_participant.OrgEmpId);
        var tbl_edu = _context.TblOrgEmpEducation.FirstOrDefault(a => a.OrgEmpId == tbl_participant.OrgEmpId);

        // update user properties
        tbl_particiant.AccountNumber = tblRetentionGroupDto.AccountNumber;
        tbl_particiant.AppointmentDate = tblRetentionGroupDto.AppointmentDate;
        tbl_particiant.BankName = tblRetentionGroupDto.BankName;
        tbl_particiant.BranchName = tblRetentionGroupDto.BranchName;
        tbl_particiant.DateOfJoining = tblRetentionGroupDto.DateOfJoining;
        tbl_particiant.Dob = tblRetentionGroupDto.Dob;
        tbl_particiant.Email = tblRetentionGroupDto.Email;
        tbl_particiant.FirstName = tblRetentionGroupDto.FirstName;
        tbl_particiant.GenderId = tblRetentionGroupDto.GenderId;
        tbl_particiant.LastName = tblRetentionGroupDto.LastName;
        tbl_particiant.MaritalStatusId = tblRetentionGroupDto.MaritalStatusId;
        tbl_particiant.MiddleName = tblRetentionGroupDto.MiddleName;
        tbl_particiant.ModifiedBy = tblRetentionGroupDto.ModifiedBy;
        tbl_particiant.ModifiedDate = tblRetentionGroupDto.ModifiedDate;
        tbl_particiant.PhoneNumber = tblRetentionGroupDto.PhoneNumber;
        tbl_particiant.PhoneNumber1 = tblRetentionGroupDto.PhoneNumber1;
        tbl_particiant.ReportingTo = tblRetentionGroupDto.ReportingTo;
        tbl_particiant.SalutationId = tblRetentionGroupDto.SalutationId;
        tbl_particiant.StaffCode = tblRetentionGroupDto.StaffCode;
        tbl_particiant.StaffName = tblRetentionGroupDto.StaffName;
        tbl_particiant.StaffStatus = tblRetentionGroupDto.StaffStatus;
        tbl_particiant.StaffTypeId = tblRetentionGroupDto.StaffTypeId;

        foreach (var adddto in tbl_participant.AVOOrgEmpAddress)
        {


            tbl_address.EmpAddressLine1 = adddto.EmpAddressLine1;
            tbl_address.EmpAddressLine2 = adddto.EmpAddressLine2;
            tbl_address.EmpAddressLine3 = adddto.EmpAddressLine3;
            tbl_address.EmpAddressType = adddto.EmpAddressType;
            tbl_address.EmpCityId = adddto.EmpCityId;
            tbl_address.EmpCountryId = adddto.EmpCountryId;
            tbl_address.EmpDistrictId = adddto.EmpDistrictId;
            tbl_address.EmpPincodeId = adddto.EmpPincodeId;
            _context.TblOrgEmpAddress.Update(tbl_address);


        }

        foreach (var edudto in tbl_participant.AVOOrgEmpEducation)
        {

            tbl_edu.GradeOrPercentage = edudto.GradeOrPercentage;
            tbl_edu.Certification = edudto.Certification;
            tbl_edu.Year = edudto.Year;
            _context.TblOrgEmpEducation.Update(tbl_edu);

        }




        //var tbl_empaddress = _context.TblOrgEmpAddress.Find(tbl_participant.OrgEmpId);
        //tbl_empaddress.EmpAddressLine1 = tblRetentionGroupDto.AVOOrgEmpAddress[0].EmpA

        _context.TblOrgEmployee.Update(tbl_particiant);
        _context.SaveChanges();
        var accountDTO = _mapper.Map<AVOOrgEmployee>(tbl_particiant);
        return accountDTO;
    }

    public async Task<AVOReporteeGrid> GetReporteeGrid(int Empcode, int position, ApiContext apiContext)
    {
        _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

        position = 2;

        var _emp = from emp in _context.TblOrgEmployee.OrderByDescending(p => p.CreatedDate)
                   select emp;

        var record = _emp.Where(x => x.OrgEmpId == Empcode).Select(x => x.PositionId);
        //var Emp = _context.TblOrgEmployee.Select(x => x).Where(c => c.OrgEmpId == Empcode).Select(x => x.PositionId);

        var pos = _context.TblOrgPositions.Where(x => x.PositionId > record.SingleOrDefault()).Select(x => x).Take(position);

        AVOReporteeGrid val = new AVOReporteeGrid();
        List<AVOReportee> val2 = new List<AVOReportee>();
        List<MasterDto> masval = new List<MasterDto>();
        foreach (var i in pos)
        {
            // AVOOrgEmployee Ival = new AVOOrgEmployee();
            var Ival = _emp.Where(x => x.PositionId == i.PositionId);

            foreach (var v in Ival)
            {
                AVOReportee val3 = new AVOReportee();
                val3.OrgEmpId = v.OrgEmpId;
                val3.StaffCode = v.StaffCode;
                val3.StaffName = v.StaffName;
                val3.PositionId = v.PositionId;
                val3.Email = v.Email;
                val3.PhoneNumber = v.PhoneNumber;

                val2.Add(val3);

            }
            val.reporteedata = val2;
        }

        var pos1 = _context.TblOrgPositions.Where(x => x.PositionId < record.SingleOrDefault()).Select(x => x).Take(position);

        foreach (var i in pos1)
        {
            // AVOOrgEmployee Ival = new AVOOrgEmployee();
            var Ival = _emp.Where(x => x.PositionId == i.PositionId);

            foreach (var v in Ival)
            {
                MasterDto val3 = new MasterDto();
                val3.mID = Convert.ToInt32(v.OrgEmpId);
                val3.mValue = v.StaffName;

                masval.Add(val3);

            }
            val.masterData = masval;
        }


        return val;
    }


}
}
