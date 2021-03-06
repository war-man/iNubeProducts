﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Partners.Entities.AVO;
using iNube.Services.Partners.Helpers;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.UserManagement.Helpers;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace iNube.Services.Partners.Controllers.Organization.OrganizationService
{

    public class AvoOrganizationService : IAvoOrganizationProductService
    {
        private AVOPRContext _context = null;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;

        private IIntegrationService _integrationService;
        public AvoOrganizationService(AVOPRContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration)
        {
            // _context = context;
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

            var _organization = _mapper.Map<TblOrganization>(orgDTO);

            if (organization.OrganizationId == 0)
            {
                Random random = new Random();
                int rdm = random.Next(101, 999);

                var orgoffspoc = orgDTO.AVOOrgSpocDetails.FirstOrDefault();
                TblOrgOffice orgOffice = new TblOrgOffice();
                orgOffice.OfficeName = orgDTO.OrgName;
                orgOffice.OfficeCode = orgDTO.OrgName + rdm;
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

                _organization.CreatedBy = apiContext.UserId;
                _organization.CreatedDate = DateTime.Now;
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
                            if (item.reportto == "0")
                            {
                                tblOrg.RepotrsToId = 0;
                                tblOrg.ParentId = 0;
                            }
                            else
                            {
                                var parentid = _organization.TblOrgStructure.FirstOrDefault(a => a.LevelDefinition == item.reportto).OrgStructureId;
                                tblOrg.RepotrsToId = Convert.ToInt32(parentid);
                                tblOrg.ParentId = Convert.ToInt32(parentid);
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
                var office = _context.TblOrgOffice.FirstOrDefault(a => a.OrganizationId == _organization.OrganizationId && a.OfficeName == _organization.OrgName);
                var orgoffspoc = orgDTO.AVOOrgSpocDetails.FirstOrDefault();

                office.OfficePhoneNo = orgDTO.OrgPhoneNo;
                office.OfficeFaxNo = orgDTO.OrgFaxNo;
                //orgOffice.OfficeReportingOfficeId = 0;
                office.OfficeCountryId = orgoffspoc.SpoccountryId;
                office.OfficeStateId = orgoffspoc.SpocstateId;
                office.OfficeDistrictId = orgoffspoc.SpocdistrictId;
                office.OfficeCityId = orgoffspoc.SpoccityId;
                office.OfficeAddressLine1 = orgoffspoc.SpocaddressLine1;
                office.OfficeAddressLine2 = orgoffspoc.SpocaddressLine2;
                office.OfficeAddressLine3 = orgoffspoc.SpocaddressLine3;
                office.OfficePincodeId = orgoffspoc.SpoccityId;
                office.ModifiedBy = apiContext.UserId;
                office.ModifiedDate = DateTime.Now;

                var spoc = _context.TblOfficeSpocDetails.FirstOrDefault(a => a.OfficeId == office.OrgOfficeId);

                spoc.Spocname = orgoffspoc.SpocfirstName;
                spoc.Spocmobileno = orgoffspoc.Spocmobileno;
                spoc.SpocemailId = orgoffspoc.SpocemailId;
                spoc.Spocdesignation = orgoffspoc.Spocdesignation;
                spoc.SpoccountryId = orgoffspoc.SpoccountryId;
                spoc.SpocstateId = orgoffspoc.SpocstateId;
                spoc.SpocdistrictId = orgoffspoc.SpocdistrictId;
                spoc.SpoccityId = orgoffspoc.SpoccityId;
                spoc.SpocaddressLine1 = orgoffspoc.SpocaddressLine1;
                spoc.SpocaddressLine2 = orgoffspoc.SpocaddressLine2;
                spoc.SpocaddressLine3 = orgoffspoc.SpocaddressLine3;
                spoc.SpocpincodeId = orgoffspoc.SpoccityId;

                //_context.Entry(organization).State = EntityState.Modified;
                _context.Update(_organization);
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

                var _org1 = from bi in _context.TblOrganization.OrderByDescending(p => p.OrganizationId)
                            select bi;
                if (!string.IsNullOrEmpty(searchorg.OrgName))
                {
                    var _contract = _context.TblOrganization.SingleOrDefault(x => x.OrgName == searchorg.OrgName);
                    _org1 = _org1.Where(bi => bi.OrganizationId == _contract.OrganizationId);
                }

                if (searchorg.OrganizationId > 0)
                {
                    _org1 = _org1.Where(bi => bi.OrganizationId == searchorg.OrganizationId);

                }
                if (searchorg.OrgPhoneNo != "")
                {
                    _org1 = _org1.Where(bi => bi.OrgPhoneNo == searchorg.OrgPhoneNo);

                }
                if (searchorg.OrgRegistrationNo != "")
                {
                    _org1 = _org1.Where(bi => bi.OrgRegistrationNo == searchorg.OrgRegistrationNo);

                }
                if (searchorg.OrgWebsite != "")
                {
                    _org1 = _org1.Where(bi => bi.OrgWebsite == searchorg.OrgWebsite);

                }
                var _OrgDTO = _mapper.Map<IEnumerable<AVOOrganizationNewDTO>>(_org1);
                foreach (var item in _OrgDTO)
                {
                    item.OrgName = item.OrgName;
                    item.OrganizationId = item.OrganizationId;
                    item.OrgPhoneNo = item.OrgPhoneNo;
                    item.OrgRegistrationNo = item.OrgRegistrationNo;
                    item.OrgWebsite = item.OrgWebsite;
                }
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
                          BranchName = emp.BranchName,

                      };

            if (empdata.StaffCode != "")
            {
                Emp = Emp.Where(bi => bi.StaffCode == empdata.StaffCode);

            }
            return Emp;
        }

        public async Task<CreateOfficeResponse> CreateOffice(AVOOrgOffice aVOOrgOffice, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {
                if (aVOOrgOffice.OrgOfficeId == 0)
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
                    data.CreatedBy = apiContext.UserId;
                    data.CreatedDate = DateTime.Now;

                    _context.TblOrgOffice.Add(data);
                    _context.SaveChanges();
                    return new CreateOfficeResponse { Status = BusinessStatus.Created, ResponseMessage = $" Office created sucessfully " };

                }
                else
                {
                    var data = _mapper.Map<TblOrgOffice>(aVOOrgOffice);
                    data.ModifiedBy = apiContext.UserId;
                    data.ModifiedDate = DateTime.Now;
                    _context.Update(data);
                    _context.SaveChanges();
                    return new CreateOfficeResponse { Status = BusinessStatus.Created, ResponseMessage = $" Office modify sucessfully " };
                }
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

            //var Emp = from emp in _context.TblOrgEmployee
            //          join pos in _context.TblOrgPositions on emp.PositionId equals pos.PositionId
            //          join off in _context.TblOrgOffice on pos.OrganizationId equals off.OrganizationId
            //          select new ddDTO
            //          {
            //              mID = Convert.ToInt32(off.OrgOfficeId),
            //              mValue = off.OfficeName,

            //          };

            var Emp = from pos in _context.TblOrgPositions
                      where (pos.PositionId == posid)
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
            var desg = _context.TblOrgStructure.FirstOrDefault(x => x.OrganizationId == orgid && x.OrgStructureId == desgiId);
            List<decimal> PositionIds = new List<decimal>();
            PositionIds.Add(desg.OrgStructureId);
            PositionIds.Add((decimal)desg.ParentId);
            var Data = (from objposition in _context.TblOrgPositions.Where(x => x.OrganizationId == orgid && x.OfficeId == offid && PositionIds.Contains(Convert.ToDecimal(x.DesignationId)))
                        join objempdetails in _context.TblOrgEmployee on objposition.PositionId equals objempdetails.PositionId
                        select new MasterDto
                        {
                            mID = Convert.ToInt32(objempdetails.OrgEmpId),
                            mType = "Employee",
                            mValue = objempdetails.StaffName
                        }).ToList();
            return Data;

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

        public async Task<Createposition> CreatePosition(NewPositionDTO Officedto, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {
                var positioncount = Convert.ToInt32(Officedto.Newpositioncount);
                for (var i = 0; i < positioncount; i++)
                {
                    Random random = new Random();
                    int ran = random.Next(10001, 99999);
                    var position = _context.TblOrgStructure.FirstOrDefault(a => a.OrgStructureId == Convert.ToDecimal(Officedto.DesignationId));
                    var positionname = position.LevelDefinition;
                    TblOrgPositions tblOrgPositions = new TblOrgPositions();
                    if (Officedto.EmpId != null)
                    {
                        var parentId = _context.TblOrgEmployee.FirstOrDefault(a => a.OrgEmpId == Officedto.EmpId).PositionId;
                        tblOrgPositions.ParentId = parentId;
                    }
                    else
                    {
                        tblOrgPositions.ParentId = null;
                    }

                    tblOrgPositions.OrganizationId = Officedto.OrganizationId;
                    tblOrgPositions.OfficeId = Officedto.OfficeId;
                    tblOrgPositions.DesignationId = Officedto.DesignationId;
                    tblOrgPositions.PositionName = positionname + ran;
                    tblOrgPositions.RepOrgId = Officedto.OrganizationId;
                    tblOrgPositions.RepOfficeId = Officedto.OfficeId;
                    tblOrgPositions.IsActive = true;
                    tblOrgPositions.IsVacant = true;
                    _context.TblOrgPositions.Add(tblOrgPositions);
                }

                _context.SaveChanges();

                return new Createposition { Status = BusinessStatus.Created, ResponseMessage = $" Data saved sucessfully!" };
            }
            catch (Exception ex)
            {
                return new Createposition { Status = BusinessStatus.Error, ResponseMessage = $"Something Went Wrong" };
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
                var positions = _context.TblOrgPositions.FirstOrDefault(a => a.PositionId == item.PositionId);
                var designatioinid = _context.TblOrgStructure.FirstOrDefault(a => a.OrgStructureId == positions.DesignationId).LevelDefinition;
                if (positions != null)
                {
                    item.Designation = designatioinid;
                }
                var supervisor = _context.TblOrgEmployee.FirstOrDefault(a => a.PositionId == positions.ParentId);
                if (supervisor != null)
                {
                    item.Supervisorname = supervisor.StaffName;
                }
                var offname = _context.TblOrgOffice.FirstOrDefault(a => a.OrgOfficeId == positions.OfficeId);
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
            //var totalPosition = _context.TblOrgStructure.Where(a => a.OrganizationId == orgid && a.StructureTypeId == 28).ToList();
            var totalPosition = _context.TblOrgPositions.Where(a => a.OrganizationId == orgid).ToList();
            List<vacantPositiondto> ddDTOs = new List<vacantPositiondto>();
            vacantPositiondto ddDTO = new vacantPositiondto();
            foreach (var positions in totalPosition)
            {
                var count = _context.TblOrgPositions.Where(a => a.PositionName == positions.PositionName && a.IsVacant == true).Count();
                if (count > 0)
                {
                    ddDTO = new vacantPositiondto();
                    ddDTO.mID = positions.PositionName;
                    ddDTO.mValue = positions.PositionName;
                    ddDTOs.Add(ddDTO);
                }

            }
            return ddDTOs;
        }

        public async Task<string> GetSupervisorname(string designame, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var positions = _context.TblOrgPositions.Where(a => a.PositionName == designame && a.IsVacant == true).FirstOrDefault();
            var supervisorname = _context.TblOrgEmployee.FirstOrDefault(a => a.PositionId == positions.ParentId).StaffName;
            return supervisorname;
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
                data.CreatedBy = apiContext.UserId;
                data.CreatedDate = DateTime.Now;
                //data.ReportingTo = avOOrgEmployee.EmpId;
                _context.TblOrgEmployee.Add(data);
                var contract = _context.TblContract.FirstOrDefault(a => a.RecruitmentNo == data.RecruitmentNo);
                if (contract != null)
                {
                    contract.IsEmployee = true;
                }
                _context.SaveChanges();
                //Update Contract
                
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

            //var SearchData = _context.TblOrgEmployee.Select(a => a)
            //     .Include(add => add.TblOrgEmpAddress).ToList();
            var SearchData = _context.TblOrgEmployee.Select(a => a)
                            .Include(add => add.TblOrgEmpAddress)
                            .Include(add => add.TblOrgEmpEducation).ToList();


            if (!string.IsNullOrEmpty(empcode))
            {
                SearchData = SearchData.Where(a => a.StaffCode == empcode).Select(a => a).ToList();
            }

            var _SearchData = _mapper.Map<List<AVOOrgEmployee>>(SearchData);
            var office = _context.TblOrgOffice.Select(a => a);
            foreach (var item in _SearchData)
            {
                var position = _context.TblOrgPositions.FirstOrDefault(a => a.PositionId == item.PositionId).OfficeId;
                item.OfficeName = office.FirstOrDefault(a => a.OrgOfficeId == position).OfficeName;
                item.BranchCode = office.FirstOrDefault(a => a.OrgOfficeId == position).OfficeCode;
            }

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
            try
            {
                var _tblmovements = _mapper.Map<TblMovements>(data);
                _tblmovements.MovementStatusId = 34;

                _context.TblMovements.Add(_tblmovements);

                _context.SaveChanges();
                var decisionData = _mapper.Map<AVOMovements>(_tblmovements);
                return decisionData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EmployeeRoles> GetEmployeeRoles(string empCode, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
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
                          BranchName = emp.BranchName,
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
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                var movementdata = _context.TblMovements.FirstOrDefault(x => x.MovementId == movements.MovementId);

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
                    if (movementDetailsData != null)
                    {
                        var movementdetails = movementDetailsData.Where(a => a.MovementFormId == 1009).ToList();
                        if (movementdetails.Count() > 0)
                        {
                            foreach (var movData in movementdetails)
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
                        }
                        var movementsdata = movementDetailsData.Where(a => a.MovementFormId == 1010).ToList();
                        if (movementsdata != null)
                        {
                            //Prospect
                            var prospectcount = movementsdata.Where(a => a.MovementSubFormId == 37).Count();
                            if (prospectcount != 0)
                            {
                                //prospect
                                var prospect = movementsdata.Where(a => a.MovementSubFormId == 37)
                                    .Select(a => new EMPDistributeDTO
                                    {
                                        PositionId = Convert.ToDecimal(_context.TblOrgEmployee.FirstOrDefault(b => b.OrgEmpId == a.MovedTo).PositionId),
                                        PrimaryIds = Convert.ToDecimal(a.MovingId)
                                    }).ToList();
                                EMPDistribute eMPDistribute = new EMPDistribute();
                                if(prospect.Count > 0) { 
                                eMPDistribute.EMPDistributeDTO.AddRange(prospect);
                                }
                                var prospectcall = await _integrationService.UpdateEmpProspectData(eMPDistribute, apiContext);
                            }
                            //Quotation
                            var quotationcount = movementsdata.Where(a => a.MovementSubFormId == 38).Count();
                            if (quotationcount != 0)
                            {
                                //quotation
                                var quotation = movementsdata.Where(a => a.MovementSubFormId == 38)
                                    .Select(a => new EMPDistributeDTO
                                    {
                                        PositionId = Convert.ToDecimal(_context.TblOrgEmployee.FirstOrDefault(b => b.OrgEmpId == a.MovedTo).PositionId),
                                        PrimaryIds = Convert.ToDecimal(a.MovingId)
                                    }).ToList();
                                EMPDistribute eMPDistribute = new EMPDistribute();
                                if (quotation.Count > 0)
                                {
                                    eMPDistribute.EMPDistributeDTO.AddRange(quotation);
                                }
                                var prospectcall = await _integrationService.UpdateEmpQuotationData(eMPDistribute, apiContext);
                            }
                            //Proposal
                            var proposalcount = movementsdata.Where(a => a.MovementSubFormId == 39).Count();
                            if (proposalcount != 0)
                            {
                                //proposal
                                var proposal = movementsdata.Where(a => a.MovementSubFormId == 39)
                                    .Select(a => new EMPDistributeDTO
                                    {
                                        PositionId = Convert.ToDecimal(_context.TblOrgEmployee.FirstOrDefault(b => b.OrgEmpId == a.MovedTo).PositionId),
                                        PrimaryIds = Convert.ToDecimal(a.MovingId)
                                    }).ToList();
                                EMPDistribute eMPDistribute = new EMPDistribute();
                                if (proposal.Count > 0)
                                {
                                    eMPDistribute.EMPDistributeDTO.AddRange(proposal);
                                }
                                var prospectcall = await _integrationService.UpdateEmpProposalData(eMPDistribute, apiContext);
                            }
                            //Policy
                            var policycount = movementsdata.Where(a => a.MovementSubFormId == 40).Count();
                            if (policycount != 0)
                            {
                                //policy
                                var policy = movementsdata.Where(a => a.MovementSubFormId == 40)
                                    .Select(a => new EMPDistributeDTO
                                    {
                                        PositionId = Convert.ToDecimal(_context.TblOrgEmployee.FirstOrDefault(b => b.OrgEmpId == a.MovedTo).PositionId),
                                        PrimaryIds = Convert.ToDecimal(a.MovingId)
                                    }).ToList();
                                EMPDistribute eMPDistribute = new EMPDistribute();
                                if (policy.Count > 0)
                                {
                                    eMPDistribute.EMPDistributeDTO.AddRange(policy);
                                }
                                var prospectcall = await _integrationService.UpdateEmpPolicyData(eMPDistribute, apiContext);
                            }
                            //Suspect
                            var suspectcount = movementsdata.Where(a => a.MovementSubFormId == 43).Count();
                            if (suspectcount != 0)
                            {
                                //policy
                                var suspect = movementsdata.Where(a => a.MovementSubFormId == 43)
                                    .Select(a => new EMPDistributeDTO
                                    {
                                        PositionId = Convert.ToDecimal(_context.TblOrgEmployee.FirstOrDefault(b => b.OrgEmpId == a.MovedTo).PositionId),
                                        PrimaryIds = Convert.ToDecimal(a.MovingId)
                                    }).ToList();
                                EMPDistribute eMPDistribute = new EMPDistribute();
                                eMPDistribute.EMPDistributeDTO.AddRange(suspect);
                                var suspectcall = await _integrationService.UpdateEmpSuspectData(eMPDistribute, apiContext);
                            }
                        }
                    }
                    //Create new position
                    var newPos = await CreateNewPosition(movementdata.MovementId, apiContext);
                    var promote = _context.TblOrgEmployee.FirstOrDefault(a => a.OrgEmpId == movementdata.OrgEmpId);
                    promote.PositionId = Convert.ToDecimal(newPos.Id);

                    //based on designation change Updating new designation roles to the user account
                    EmpRoleMapDTO empRole = new EmpRoleMapDTO();
                    empRole.Empcode = promote.StaffCode;
                    var roles = await GetEmployeeRoles(empRole.Empcode, apiContext);
                    empRole.RoleId = roles.Roles;
                    var changeDesig = await _integrationService.UpdateEmpRole(empRole, apiContext);
                }
                _context.TblMovements.Update(movementdata);
                _context.SaveChanges();
                var mapData = _mapper.Map<AVOMovements>(movementdata);
                return mapData;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ResponseStatus> CreateNewPosition(decimal MovementId, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //Random Numb
            int _min = 1000;
            int _max = 9999;
            Random _rdm = new Random();

            ResponseStatus response = new ResponseStatus()
            {
                Status = BusinessStatus.Created
            };


            var movementData = _context.TblMovements.FirstOrDefault(x => x.MovementId == MovementId);
            if (movementData == null)
            {
                response.Status = BusinessStatus.Error;
                return response;
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
                var postionCheck = _context.TblOrgPositions.FirstOrDefault(x => x.OrganizationId == pdata.OrganizationId
                && x.OfficeId == movementData.NewBranchId && x.DesignationId == movementData.NewPositionId
                && x.IsVacant == true);
                if (postionCheck == null)
                {
                    TblOrgPositions position = new TblOrgPositions();
                    position.OrganizationId = pdata.OrganizationId;
                    // position.OfficeId = (decimal)movementData.NewBranchId;
                    position.OfficeId = Convert.ToDecimal(movementData.NewBranchId);
                    position.DesignationId = movementData.NewPositionId;
                    position.PositionName = pdata.PositionName + _rdm.Next(_min, _max);
                    position.RepOrgId = pdata.RepOrgId;
                    position.RepOfficeId = pdata.RepOfficeId;
                    position.ParentId = pdata.ParentId;//for whom he is Reporting to
                    position.ParentLineId = pdata.ParentLineId;
                    position.ReportingId = pdata.ReportingId;
                    position.CreatedBy = apiContext.UserId;
                    position.CreatedDate = DateTime.Now;
                    position.IsVacant = true;
                    position.IsActive = true;
                    _context.TblOrgPositions.Add(position);
                    _context.SaveChanges();
                    position.IsVacant = false;
                    response.Id = position.PositionId.ToString();
                }
                else
                {
                    postionCheck.IsVacant = false;
                    response.Id = postionCheck.PositionId.ToString();
                }
            }
            return response;
        }

        public async Task<AVOOrgEmployee> ModifyPeople(AVOOrgEmployee tblRetentionGroupDto, ApiContext apiContext)
        {
            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var tbl_participant = _mapper.Map<AVOOrgEmployee>(tblRetentionGroupDto);
            var tbl_particiant = _context.TblOrgEmployee.Where(a => a.StaffCode == tbl_participant.StaffCode).FirstOrDefault();
            var tbl_address = _context.TblOrgEmpAddress.FirstOrDefault(a => a.OrgEmpId == tbl_particiant.OrgEmpId);
            var tbl_edu = _context.TblOrgEmpEducation.FirstOrDefault(a => a.OrgEmpId == tbl_particiant.OrgEmpId);

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
            return new AVOOrgEmployee { Status = BusinessStatus.Created, ResponseMessage = $"data modified sucessfully " }; ;
        }

        public async Task<AVOReporteeGrid> GetReporteeGrid(int Empcode, int position, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            position = 2;

            //var _emp = from emp in _context.TblOrgEmployee.OrderByDescending(p => p.CreatedDate)
            //           select emp;

            var record = _context.TblOrgEmployee.Where(x => x.OrgEmpId == Empcode).Select(x => x.PositionId);
            //var Emp = _context.TblOrgEmployee.Select(x => x).Where(c => c.OrgEmpId == Empcode).Select(x => x.PositionId);

            var pos = _context.TblOrgPositions.Where(x => x.ParentId == record.SingleOrDefault()).Select(x => x);

            //var posss = _context.TblOrgPositions.Where(x => x.PositionId == record.SingleOrDefault()).Select(x => x.ParentId).Single();
            //var pos = _context.TblOrgPositions.Where(x => x.PositionId == posss).Select(x => x);
            AVOReporteeGrid val = new AVOReporteeGrid();
            List<AVOReportee> val2 = new List<AVOReportee>();
            List<MasterDto> masval = new List<MasterDto>();
            foreach (var i in pos)
            {
                // AVOOrgEmployee Ival = new AVOOrgEmployee();
                var Ival = _context.TblOrgEmployee.Where(x => x.PositionId == i.PositionId);

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

            // var pos1 = _context.TblOrgPositions.Where(x => x.PositionId < record.SingleOrDefault()).Select(x => x).Take(position);
            var pos1 = _context.TblOrgPositions.Where(x => x.PositionId == record.SingleOrDefault()).Select(x => x).SingleOrDefault();
            //var designation = _context.TblOrgStructure.Where(x => x.OrgStructureId == pos1.SingleOrDefault()).Select(x => x.ParentId);
            var desg = _context.TblOrgStructure.FirstOrDefault(x => x.OrgStructureId == pos1.DesignationId);
            List<decimal> PositionIds = new List<decimal>();
            PositionIds.Add(desg.OrgStructureId);
            PositionIds.Add((decimal)desg.ParentId);
            var Data = (from objposition in _context.TblOrgPositions.Where(x => x.OrganizationId == pos1.OrganizationId && x.OfficeId == pos1.OfficeId && PositionIds.Contains(Convert.ToDecimal(x.DesignationId)))
                        join objempdetails in _context.TblOrgEmployee on objposition.PositionId equals objempdetails.PositionId
                        select new MasterDto
                        {
                            mID = Convert.ToInt32(objempdetails.OrgEmpId),
                            //  mType = "Employee",
                            mValue = objempdetails.StaffName
                        }).ToList();
            //   return Data;
            var emp = Data.Where(x => x.mID != Empcode).ToList();
            val.masterData = emp;

            //foreach (var i in pos1)
            //{
            //    // AVOOrgEmployee Ival = new AVOOrgEmployee();
            //    var Ival = _context.TblOrgEmployee.Where(x => x.PositionId == i.ParentId);

            //    foreach (var v in Ival)
            //    {
            //        MasterDto val3 = new MasterDto();
            //        val3.mID = Convert.ToInt32(v.OrgEmpId);
            //        val3.mValue = v.StaffName;

            //        masval.Add(val3);

            //    }
            //    val.masterData = masval;
            //}


            return val;
        }

        public async Task<List<MovementDetails>> GetMovementDetails(MovementDetails movement, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var movData = from a in _context.TblMovements
                          join b in _context.TblMovementDetails on a.MovementId equals b.MovementId
                          where b.MovementId == movement.MovementId
                          select new MovementDetails
                          {
                              MovementTypeId = a.MovementTypeId,
                              NewBranchId = a.NewBranchId,
                              NewPositionId = a.NewPositionId,
                              Reason = a.Reason,
                              MovementFormId = b.MovementFormId,
                              MovementId = b.MovementId,
                              MovedTo = b.MovedTo
                          };

            var _movData = _mapper.Map<List<MovementDetails>>(movData);
            return _movData;

        }

        // || AVO
        public async Task<List<FetchData>> GetHierarchy(int OrgId, string type, string keyValue, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            List<FetchData> Data = null;
            if (type == "People")
            {
                return await GetPeopleHierachyAsync(OrgId, type, keyValue, apiContext);
            }
            else if (type == "Office")
            {
                return await GetOfficeHierachyAsync(OrgId, type, keyValue, apiContext);
            }
            return Data;
        }

        private async Task<List<FetchData>> GetPeopleHierachyAsync(int OrgId, string type, string keyValue, ApiContext apiContext)
        {
            List<FetchData> Data = null;
            if (keyValue != null)
            {
                var dtEmp = await GetEmpHierarchy(keyValue, apiContext);
                Data = (from DataRow dr in dtEmp.Rows
                        select new FetchData()
                        {
                            Positionid = Convert.ToInt32(dr["PositionID"]),
                            StaffName = dr["StaffName"].ToString(),
                            ParentId = Convert.ToInt32(dr["ParentID"]),
                            PostionName = dr["LevelDefinition"].ToString(),
                            LevelId = Convert.ToInt32(dr["LevelId"])
                        }).ToList();

                var empHierData = Data.Where(a => a.LevelId == Convert.ToInt32(dtEmp.Rows[0]["LevelId"])).
                 Select(b => new FetchData
                 {
                     PostionName = b.PostionName,
                     Positionid = Convert.ToInt32(b.Positionid),
                     ParentId = Convert.ToInt32(b.ParentId),
                     StaffName = b.StaffName,
                     LevelId = b.LevelId,
                     Designationid = Convert.ToInt32(b.Designationid),
                     Children = GetChildData(Data, Convert.ToInt32(b.Positionid), apiContext)
                 }).ToList();
                return empHierData;
            }
            else
            {
                Data =
                    (from objdesig in _context.TblOrgStructure.Where(a => a.OrganizationId == OrgId)
                     join objposition in _context.TblOrgPositions on objdesig.OrgStructureId equals objposition.DesignationId
                     join objempdetails in _context.TblOrgEmployee on objposition.PositionId equals objempdetails.PositionId

                     select new FetchData
                     {
                         PostionName = objdesig.LevelDefinition,
                         Positionid = Convert.ToInt32(objposition.PositionId),
                         ParentId = Convert.ToInt32(objposition.ParentId),
                         StaffName = objempdetails.StaffName,
                         Designationid = Convert.ToInt32(objposition.DesignationId),
                         LevelId = objdesig.LevelId,
                     }).ToList();
            }

            var checkdata = Data;
            var hierData = Data.Where(a => a.LevelId == 1).
                  Select(b => new FetchData
                  {
                      PostionName = b.PostionName,
                      Positionid = Convert.ToInt32(b.Positionid),
                      ParentId = Convert.ToInt32(b.ParentId),
                      StaffName = b.StaffName,
                      LevelId = b.LevelId,
                      Designationid = Convert.ToInt32(b.Designationid),
                      Children = GetChildData(Data, Convert.ToInt32(b.Positionid), apiContext)
                  }).ToList();
            //foreach (var item in hierData)
            //{
            //    int catCount=0;
            //    GetChildCount(item, ref catCount);
            //}
            //hierData[0].Count = Data.Count();
            return hierData;
        }

        public void GetChildCount(FetchData fetchDatas, ref int count)
        {
            foreach (var item in fetchDatas.Children)
            {
                GetChildCount(item, ref count);
            }
            count += fetchDatas.Children.Count;
            fetchDatas.TotalCount = count;
        }

        public List<FetchData> GetChildData(List<FetchData> fetchDatas, int? positionid, ApiContext apiContext)
        {
            List<FetchData> data1 = fetchDatas.Where(b => b.ParentId == positionid).
                  Select(b => new FetchData
                  {
                      PostionName = b.PostionName,
                      Positionid = Convert.ToInt32(b.Positionid),
                      ParentId = Convert.ToInt32(b.ParentId),
                      StaffName = b.StaffName,
                      Designationid = Convert.ToInt32(b.Designationid),
                      Children = GetChildData(fetchDatas, Convert.ToInt32(b.Positionid), apiContext)

                  }).ToList();

            return data1;
        }

        public async Task<List<HierarchyItemDTO>> ChildData(int positonid, List<HierarchyItemDTO> hierarchyItemDTOs, HierarchyItemDTO hierarchyItemDTO, ParetAndPosoition paretAndPosoition, List<ParetAndPosoition> paretAndPosoitions, ApiContext apiContext)
        {

            var positiondetails = _context.TblOrgPositions.Where(a => a.ParentId == positonid).ToList();//got 3 rows

            foreach (var item in positiondetails)
            {
                paretAndPosoition = new ParetAndPosoition();
                paretAndPosoition.ParentId = Convert.ToInt32(item.ParentId);
                paretAndPosoition.Positionid = Convert.ToInt32(item.PositionId);

                paretAndPosoitions.Add(paretAndPosoition);

            }
            List<int> l = new List<int>();
            foreach (var postionid in paretAndPosoitions)
            {
                hierarchyItemDTO = new HierarchyItemDTO();
                hierarchyItemDTO.Count = paretAndPosoitions.Count();
                var des = _context.TblOrgPositions.FirstOrDefault(a => a.PositionId == postionid.Positionid).PositionName.ToString();
                hierarchyItemDTO.Designation = des;
                var name = _context.TblOrgEmployee.FirstOrDefault(a => a.PositionId == postionid.Positionid).StaffName.ToString();
                hierarchyItemDTO.Name = name;
                hierarchyItemDTOs.Add(hierarchyItemDTO);
                l.Add(Convert.ToInt32(postionid.Positionid));

            }
            var positionid = 0;
            for (var i = 1; i <= l.Count; i++)  //8,9,41
            {
                positionid = l[1];
                l.RemoveAt(i);
                ChildData(positionid, hierarchyItemDTOs, hierarchyItemDTO, paretAndPosoition, paretAndPosoitions, apiContext);
            }

            return hierarchyItemDTOs;
        }

        public async Task<ViewDetails> ViewDetailsByEmpCode(string empcode, ApiContext apiContext)
        {
            //get context
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var positionid = _context.TblOrgEmployee.FirstOrDefault(a => a.StaffCode == empcode).PositionId;
            var posint = Convert.ToInt32(positionid);
            var strposid = posint.ToString();
            var data = await _integrationService.ViewDetailsByEmpCode(strposid, apiContext);
            var mappeddata = _mapper.Map<ViewDetails>(data);
            return mappeddata;
        }

        public async Task<EmpMappingData> GetEmpMappingData(string empcode, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            EmpMappingData mappingData = new EmpMappingData();

            var positionid = _context.TblOrgEmployee.FirstOrDefault(a => a.StaffCode == empcode);
            var Data = _context.TblOrgPositions.FirstOrDefault(a => a.PositionId == positionid.PositionId);

            mappingData.Designation = _context.TblOrgStructure.FirstOrDefault(a => a.OrgStructureId == Data.DesignationId).LevelDefinition;
            mappingData.Organization = _context.TblOrganization.FirstOrDefault(a => a.OrganizationId == Data.OrganizationId).OrgName;
            mappingData.Office = _context.TblOrgOffice.FirstOrDefault(a => a.OrgOfficeId == Data.OfficeId).OfficeName;

            return mappingData;
        }

        public async Task<List<Supervisor>> GetNewSupervisorByMovementId(Supervisor supervisor, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var supData = from a in _context.TblOrgEmployee
                          join b in _context.TblMovements on a.OrgEmpId equals b.OrgEmpId
                          join c in _context.TblMovementDetails on b.MovementId equals c.MovementId
                          where b.MovementId == supervisor.MovementId && b.MovementStatusId == supervisor.MovementStatusId
                          && a.OrgEmpId == supervisor.OrgEmpId
                          select new Supervisor
                          {
                              MovedTo = c.MovedTo,
                              MovementSubFormId = c.MovementSubFormId

                          };
            var _supData = _mapper.Map<List<Supervisor>>(supData);
            return _supData;

        }

        public async Task<AVOReporteeGrid> ViewReporteeGrid(int Empcode, int MovementId, int MovementStatusId, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var _emp = from a in _context.TblOrgEmployee
                       join b in _context.TblMovements on a.OrgEmpId equals b.OrgEmpId
                       join c in _context.TblMovementDetails on b.MovementId equals c.MovementId
                       where b.MovementId == MovementId && b.MovementStatusId == MovementStatusId
                       select new { a, c };

            var record = _emp.FirstOrDefault(x => x.a.OrgEmpId == Empcode).a.PositionId;

            var pos = _context.TblOrgPositions.Where(x => x.PositionId >= record).Select(x => x);

            AVOReporteeGrid val = new AVOReporteeGrid();
            List<AVOReportee> val2 = new List<AVOReportee>();
            List<MasterDto> masval = new List<MasterDto>();
            foreach (var i in pos)
            {
                var Ival = _emp.Where(x => x.a.PositionId == i.PositionId);

                foreach (var v in Ival)
                {
                    AVOReportee val3 = new AVOReportee();
                    val3.OrgEmpId = v.a.OrgEmpId;
                    val3.StaffCode = v.a.StaffCode;
                    val3.StaffName = v.a.StaffName;
                    val3.PositionId = v.a.PositionId;
                    val3.Email = v.a.Email;
                    val3.PhoneNumber = v.a.PhoneNumber;
                    val3.MovedTo = v.c.MovedTo;
                    val3.MovingFormId = v.c.MovementFormId;
                    val2.Add(val3);

                }
                val.reporteedata = val2;
            }

            var pos1 = _context.TblOrgPositions.Where(x => x.PositionId <= record).Select(x => x);

            foreach (var i in pos1)
            {
                var Ival = _emp.Where(x => x.a.PositionId == i.PositionId);

                foreach (var v in Ival)
                {
                    MasterDto val3 = new MasterDto();
                    val3.mID = Convert.ToInt32(v.a.OrgEmpId);
                    val3.mValue = v.a.StaffName;

                    masval.Add(val3);

                }
                val.masterData = masval;
            }


            return val;
        }

        public async Task<EmployeeRoles> DesignationRoles(string designationid, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var roledata = _context.TblDesignationRole.Where(a => a.DesignationId == Convert.ToDecimal(designationid)).Select(a => a.RoleId).ToList();

            EmployeeRoles roles = new EmployeeRoles();
            roles.Roles = roledata.ToArray();
            return roles;
        }

        public async Task<DataTable> GetEmpHierarchy(string empcode, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            EmpHierarchy emp = new EmpHierarchy();
            // Get Emp Pos
            var empdetail = _context.TblOrgEmployee.FirstOrDefault(e => e.StaffCode == empcode);
            string connectionString = _context.Database.GetDbConnection().ConnectionString;
            DbHelper dbHelper = new DbHelper(new IntegrationService(_configuration, new LoggerManager(_configuration)));
            string dbConnectionString = dbHelper.GetEnvironmentConnectionAsync(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType)).Result;
            DataTable dt = new DataTable();
            //string connectionString = "Server=inubepeg.database.windows.net;Database=MICADev;User ID=MICAUSER;Password=MICA*user123;Trusted_Connection=False;";
            using (SqlConnection connection = new SqlConnection(dbConnectionString))
            {
                string queryForCol = $"WITH cte_Hierarchy (PositionID,ParentID,staffcode,staffName,LevelDefinition,LevelId) AS  ( select pos.PositionID,ISNULL(pos.ParentID,0),emp.staffcode,emp.staffName,desig.LevelDefinition,desig.LevelId from [PR].[tblOrgPositions] pos inner join [PR].[tblOrgEmployee] emp on emp.PositionId= pos.PositionID inner join [PR].[tblOrgStructure] desig on desig.OrgStructureId= pos.designationId where pos.PositionId = {empdetail.PositionId} union all select t1.PositionID,ISNULL(t1.ParentID,0),emp1.staffcode,emp1.staffName,desig1.LevelDefinition,desig1.LevelId from [PR].[tblOrgPositions] t1  inner join [PR].[tblOrgEmployee] emp1 on emp1.PositionId= t1.PositionID inner join [PR].[tblOrgStructure] desig1 on desig1.OrgStructureId= t1.designationId inner join cte_Hierarchy t2 on t1.ParentID = t2.PositionId ) select * from cte_Hierarchy ";
                connection.Open();
                using (SqlCommand command = new SqlCommand(queryForCol, connection))
                {
                    SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(command);
                    sqlDataAdapter.Fill(dt);
                }
                connection.Close();
            }
            return dt;
        }

        public async Task<List<MasterDto>> GetDesignationMovement(int orgid, int pos, int movementType, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var des = _context.TblOrgPositions.Where(s => s.OrganizationId == orgid && s.PositionId == pos).Select(x => x).SingleOrDefault();

            var Data = new List<MasterDto>();
            //Promotion
            if (movementType == 44)
            {
                var desg = _context.TblOrgStructure.FirstOrDefault(x => x.OrganizationId == orgid && x.OrgStructureId == des.DesignationId);
                List<decimal> PositionIds = new List<decimal>();
                // PositionIds.Add(desg.OrgStructureId);
                PositionIds.Add((decimal)desg.ParentId);
                Data = (from objposition in _context.TblOrgStructure.Where(x => x.OrganizationId == orgid && PositionIds.Contains(Convert.ToDecimal(x.OrgStructureId)))
                        select new MasterDto
                        {
                            mID = Convert.ToInt32(objposition.OrgStructureId),
                            mType = "Designation",
                            mValue = objposition.LevelDefinition
                        }).ToList();

            }
            if (movementType == 30)
            {
                var desg = _context.TblOrgStructure.Where(x => x.OrganizationId == orgid && x.ParentId == des.DesignationId).Select(x => x);
                List<decimal> PositionIds = new List<decimal>();
                foreach (var i in desg)
                {
                    PositionIds.Add(i.OrgStructureId);
                    // PositionIds.Add((decimal)desg.ParentId);
                }

                Data = (from objposition in _context.TblOrgStructure.Where(x => x.OrganizationId == orgid && PositionIds.Contains(Convert.ToDecimal(x.OrgStructureId)))
                        select new MasterDto
                        {
                            mID = Convert.ToInt32(objposition.OrgStructureId),
                            mType = "Designation",
                            mValue = objposition.LevelDefinition
                        }).ToList();

            }

            if (movementType == 32)
            {

                Data = (from objposition in _context.TblOrgStructure.Where(x => x.OrganizationId == orgid && x.OrgStructureId == des.DesignationId)
                        select new MasterDto
                        {
                            mID = Convert.ToInt32(objposition.OrgStructureId),
                            mType = "Designation",
                            mValue = objposition.LevelDefinition
                        }).ToList();

            }
            return Data;
        }

        private async Task<List<FetchData>> GetOfficeHierachyAsync(int OrgId, string type, string keyValue, ApiContext apiContext)
        {
            List<FetchData> Data = null;
            if (OrgId <= 0)
            {
                OrgId = (int)apiContext.OrgId;
            }
            var dtEmp = await GetOfficeHierarchy(OrgId, type, keyValue, apiContext);
            if (dtEmp == null)
            {
                return Data;
            }
            Data = (from DataRow dr in dtEmp.Rows
                    select new FetchData()
                    {
                        Positionid = Convert.ToInt32(dr["OrgOfficeId"]),
                        StaffName = dr["OfficeName"].ToString(),
                        ParentId = Convert.ToInt32(dr["OfficeReportingOfficeId"]),
                        PostionName = dr["CityName"].ToString(),
                        LevelId = Convert.ToInt32(dr["OfficeLevelId"])
                    }).ToList();

            var offHierData = Data.Where(a => a.LevelId == Convert.ToInt32(dtEmp.Rows[0]["OfficeLevelId"])).
             Select(b => new FetchData
             {
                 PostionName = b.PostionName,
                 Positionid = Convert.ToInt32(b.Positionid),
                 ParentId = Convert.ToInt32(b.ParentId),
                 StaffName = b.StaffName,
                 LevelId = b.LevelId,
                 Designationid = Convert.ToInt32(b.Designationid),
                 Children = GetChildData(Data, Convert.ToInt32(b.Positionid), apiContext)
             }).ToList();
            return offHierData;
        }

        public async Task<DataTable> GetOfficeHierarchy(int OrgId, string type, string keyValue, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            EmpHierarchy emp = new EmpHierarchy();
            // Get Emp Pos
            TblOrgOffice offdetail = null;
            if (OrgId > 0 && string.IsNullOrEmpty(keyValue))
            {
                offdetail = _context.TblOrgOffice.FirstOrDefault(e => e.OrganizationId == OrgId);
            }
            else
            {
                offdetail = _context.TblOrgOffice.FirstOrDefault(e => e.OfficeCode == keyValue && e.OrganizationId == OrgId);
            }
            string connectionString = _context.Database.GetDbConnection().ConnectionString;
            DbHelper dbHelper = new DbHelper(new IntegrationService(_configuration, new LoggerManager(_configuration)));
            string dbConnectionString = dbHelper.GetEnvironmentConnectionAsync(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType)).Result;
            DataTable dt = new DataTable();
            //string connectionString = "Server=inubepeg.database.windows.net;Database=MICADev;User ID=MICAUSER;Password=MICA*user123;Trusted_Connection=False;";
            using (SqlConnection connection = new SqlConnection(dbConnectionString))
            {
                string queryForCol = $"WITH cte_Hierarchy (OrgOfficeId,OfficeName,OfficeCode,OfficeLevelId,OfficeReportingOfficeId,CityName) AS  ( select OrgOfficeId,OfficeName,OfficeCode,OfficeLevelId,ISNULL(OfficeReportingOfficeId,0),ct.CityName from [PR].[tblOrgOffice] off1 inner join [PR].[tblMasCity] ct on off1.OfficeCityId=ct.CityId where orgOfficeId= {offdetail.OrgOfficeId} union all select t1.OrgOfficeId,t1.OfficeName,t1.OfficeCode,t1.OfficeLevelId,ISNULL(t1.OfficeReportingOfficeId,0),ct1.CityName from [PR].[tblOrgOffice] t1 inner join [PR].[tblMasCity] ct1 on t1.OfficeCityId=ct1.CityId inner join cte_Hierarchy t2 on t1.OfficeReportingOfficeId = t2.OrgOfficeId ) select * from cte_Hierarchy ";
                connection.Open();
                using (SqlCommand command = new SqlCommand(queryForCol, connection))
                {
                    SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(command);
                    sqlDataAdapter.Fill(dt);
                }
                connection.Close();
            }
            return dt;
        }

        public async Task<IEnumerable<EntityDTOs>> GetEntityMaster(ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //List<int> lstParentId = new List<int> { 0, parentID };
            var productMasters_list = _context.TblOrgEntity.ToList();
            IEnumerable<EntityDTOs> entityDTOs;
            entityDTOs = productMasters_list
             .Select(c => new EntityDTOs
             {
                 mID = c.MasterId,
                 mValue = c.Value,
                 name = c.MasterType,
                 mType = c.MasterType,
                 mIsRequired = c.IsDisable,
                 parameter = c.Parameter,
                 level = c.Level,
                 disable = c.IsDisable,
                 parentId = c.ParentId
             });

            return entityDTOs;
        }

        public async Task<MasterDataResponse> AddMasterData(OrgMasterDTO masterDataDTO, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var masdata = _mapper.Map<TblmasOrgMaster>(masterDataDTO);
            _context.TblmasOrgMaster.Add(masdata);
            _context.SaveChanges();
            var _masterDTOs = _mapper.Map<OrgMasterDTO>(masdata);
            return new MasterDataResponse { Status = BusinessStatus.Created, master = _masterDTOs, Id = _masterDTOs.MasterType, ResponseMessage = $"MasterData added successfully!" };
        }

        public async Task<IEnumerable<ddDTOs>> GetOrgMaster(string masterType, int parentID, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            List<int> lstParentId = new List<int> { 0, parentID };
            var productMasters_list = _context.TblmasOrgMaster.Where(x => x.MasterType == masterType && x.IsActive && lstParentId.Contains((int)x.ParentId))
                .OrderByDescending(p => p.IsDisable).ThenBy(p => p.SortOrder);
            IEnumerable<ddDTOs> ddDTOs;
            ddDTOs = productMasters_list
             .Select(c => new ddDTOs
             {
                 mID = c.OrgMasterId,
                 mValue = c.Value,
                 mType = c.MasterType,
                 mIsRequired = c.IsDisable,

             });

            return ddDTOs;
        }

        public async Task<OrgEntityDTO> AddEntityData(OrgEntityDTO entityDTO, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var records = _context.TblOrgEntity.Where(p => p.MasterId != 0).Max(x => x.Level);
            var _entity = _mapper.Map<TblOrgEntity>(entityDTO);

            _entity.MasterType = entityDTO.MasterType;
            _entity.TypeCode = entityDTO.TypeCode;
            _entity.Parameter = entityDTO.Parameter;
            _entity.IsDisable = entityDTO.IsDisable;
            _entity.IsActive = entityDTO.IsActive;
            _entity.Value = entityDTO.Value;
            _entity.ParentId = entityDTO.ParentId;
            _entity.Level = records + 1;

            _context.TblOrgEntity.Add(_entity);
            _context.SaveChanges();
            var _entities = _mapper.Map<OrgEntityDTO>(_entity);
            return _entities;
        }
    }
}
