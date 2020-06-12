using AutoMapper;
using iNube.Services.ReInsurance.Controllers.ReInsurance.IntegrationServices;
using iNube.Services.ReInsurance.Entities;
using iNube.Services.ReInsurance.Helpers;
using iNube.Services.ReInsurance.Models;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.ReInsurance.Controllers.ReInsurance.ReInsuranceService
{
    public interface IReInsuranceService
    {
        Task<List<ddDTOs>> MastertypeData(ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetLocation(string locationType, int parentID, ApiContext apiContext);
        Task<List<yearDto>> MasterYearData(ApiContext apiContext);

        Task<List<GroupGroupDto>> RetentionGroup(ApiContext apiContext);

        Task<List<GroupGroupDto>> TreatyName(ApiContext apiContext);

        Task<List<GroupGroupDto>> TreatyCode(decimal treatyId, ApiContext apiContext);
        Task<List<GroupGroupDto>> Reinsurer(ApiContext apiContext);
        Task<List<GroupGroupDto>> Broker(ApiContext apiContext);
        Task<List<GroupGroupDto>> GetBrachCode(decimal participantmasteId, ApiContext apiContext);



        //Participent Master
        Task<TransactionMapResponse> SaveParticipentData(TblParticipantMasterDto participantMasterDto, ApiContext apiContext);
        Task<List<TblParticipantMasterDto>> SearchParticipant(TblParticipantMasterDto tblParticipantMasterDto, ApiContext apiContext);
        Task<TransactionMapResponse> DeleteParticipant(decimal participantMasterId, ApiContext apiContext);
        Task<TblParticipantMasterDto> ModifyParticipant(TblParticipantMasterDto tblParticipantMasterDto, ApiContext apiContext);

        //add participant

        Task<IEnumerable<TblParticipantMasterDto>> GetName(decimal participantmasteId, ApiContext apiContext);

        //GetBranchCode For add participant page in dropdown

        // Task<IEnumerable<GroupGroupDto>> GetBrachCode(decimal participantmasteId);
        //pending task in participant
        // 1: Excel upload 2: Excel Download


        //Retention Functions

        Task<TransactionMapResponse> SaveRetentionData(TblRetentionGroupDto tblRetentionGroupDto, ApiContext apiContext);
        Task<IEnumerable<TblRetentionGroupDto>> SearchRetention(TblRetentionGroupDto tblRetentionGroupDto, ApiContext apiContext);
        Task<TransactionMapResponse> DeleteRetention(decimal retentionGroupId, ApiContext apiContext);
        Task<TblRetentionGroupDto> ModifyfRetention(TblRetentionGroupDto tblRetentionGroupDto, ApiContext apiContext);

        //Treaty Functions

        Task<TransactionMapResponse> SaveTreatyData(TblTreatyDto tblTreatyDto, ApiContext apiContext);
        Task<IEnumerable<TblTreatyDto>> SearchTreaty(TblTreatyDto tblRetentionGroupDto, ApiContext apiContext);
        Task<TransactionMapResponse> DeleteTeaty(decimal tratyId, ApiContext apiContext);
        Task<TblTreatyDto> ModifyfTraty(TblTreatyDto tblRetentionGroupDto, ApiContext apiContext);
        Task<IAsyncResult> AddTreatyParticipant(TblParticipantDto tblParticipantDto, ApiContext apiContext);



        //RI Functions

        Task<TransactionMapResponse> SaveRIMapping(TblRimappingDto tblRimappingDto, ApiContext apiContext);

        Task<IEnumerable<RIMappingDTO>> GetDescriptionRIGrid(decimal treatyid, ApiContext apiContext);

        //Task<IEnumerable<RIMappingDTO>> GetTreatyTypeRIGrid(string treatycode, ApiContext apiContext);

        Task<IEnumerable<TblRimappingDto>> SearchRImapping(TblRimappingDto tblRimappingDto, ApiContext apiContext);
        Task<TblRimappingDto> ModifyRImapping(TblRimappingDto tblParticipantMasterDto, ApiContext apiContext);
        Task<TransactionMapResponse> DeleteRiMapping(decimal RimappingId, ApiContext apiContext);


        //Get elements By id for the modifications

        Task<TblRetentionGroupDto> GetRetentionGroupById(decimal retentionGroupId, ApiContext apiContext);

        //GetTreaty BY id

        Task<TblTreatyDto> GetTreatyById(decimal treatyId, ApiContext apiContext);

        //TblParticipantMasterDto

        Task<TblParticipantMasterDto> GetParticipantBYId(decimal participantMasterId, ApiContext apiContext);

        Task<TblRimappingDto> GetRImappingBYId(decimal RImappingID, ApiContext apiContext);


    }

    public class ReInsuranceService : IReInsuranceService
    {

        //Global Variables

        private MICARIContext _context;
        //  public IIntegrationService _integrationService;
        private IMapper _mapper;
        private readonly IServiceProvider _serviceProvider;
        private ILoggerManager _logger;
        private readonly IEmailService _emailService;


      
        private readonly AppSettings _appSettings;
        private readonly  IReInsuranceService _reInsuranceService;
        private readonly IIntegrationService _integrationService;
        private IConfiguration _configuration;
        public DbHelper dbHelper;


        public ReInsuranceService( IReInsuranceService reinsuranceService,MICARIContext context, IMapper mapper, IServiceProvider serviceProvider, ILoggerManager logger, IEmailService emailService, IOptions<AppSettings> appSettings, IConfiguration configuration, IIntegrationService integrationService)
        {

            _mapper = mapper;
            _serviceProvider = serviceProvider;
            _logger = logger;
            _emailService = emailService;
            _context = context;
            _reInsuranceService = reinsuranceService;
            _configuration = configuration;
            _appSettings = appSettings.Value;
            dbHelper = new DbHelper(new IntegrationService(configuration));
            _integrationService = integrationService;
        }

        //master data

        public async Task<List<ddDTOs>> MastertypeData(ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
          
            var MasterData = _context.TblMasRicommonTypes
                                                    .Select(x => new ddDTOs
                                                    {
                                                        mID = x.CommonTypeId,
                                                        mType = x.MasterType,
                                                        mValue = x.Value

                                                    }).ToList();
            return MasterData;
        }

        public async Task<List<GroupGroupDto>> RetentionGroup(ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var MasterData = _context.TblRetentionGroup
                                                    .Select(x => new GroupGroupDto
                                                    {
                                                        mID = x.RetentionGroupId,
                                                        mType = "TratyCode",
                                                        mValue = x.RetentionGroupName

                                                    }).ToList();
            return MasterData;
        }
        //TreatyCode
        public async Task<List<GroupGroupDto>> TreatyName(ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var MasterData = _context.TblTreaty
                                                    .Select(x => new GroupGroupDto
                                                    {
                                                        mID = x.TreatyId,
                                                        mType = "TratyGroup",
                                                        mValue = x.TreatyCode

                                                    }).ToList();
            return MasterData;
        }
        //TreatyGroup
        public async Task<List<GroupGroupDto>> TreatyCode(decimal treatyId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var MasterData = _context.TblTreatyGroup.Where(s => s.TreatyId == treatyId)
                                                    .Select(x => new GroupGroupDto
                                                    {
                                                        mID = x.TreatyId,
                                                        mType = "TreatyGroupName",
                                                        mValue = x.TreatyGroupName

                                                    }).ToList();
            return MasterData;
        }

        //Broker master data for the Add participant

        public async Task<List<GroupGroupDto>> Reinsurer(ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var MasterData = _context.TblParticipantMaster.Where(s => s.ParticipantTypeId == 8)
                                                    .Select(x => new GroupGroupDto
                                                    {
                                                        mID = x.ParticipantMasterId,
                                                        mType = "Reinsurer",
                                                        mValue = x.ParticipantCode

                                                    }).ToList();
            return MasterData;
        }
        public async Task<List<GroupGroupDto>> Broker(ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var MasterData = _context.TblParticipantMaster.Where(s => s.ParticipantTypeId == 9)
                                                    .Select(x => new GroupGroupDto
                                                    {
                                                        mID = x.ParticipantMasterId,
                                                        mType = "Broker",
                                                        mValue = x.ParticipantCode

                                                    }).ToList();
            return MasterData;
        }

        //GetBranchCode for the addparticipantPage

        public async Task<List<GroupGroupDto>> GetBrachCode(decimal ParticipantMasterId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var MasterData = _context.TblParticipantBranch.Where(s => s.ParticipantMasterId == ParticipantMasterId)
                                                    .Select(x => new GroupGroupDto
                                                    {
                                                        mID = x.BranchId,
                                                        mType = "BrachCode",
                                                        mValue = x.BranchCode

                                                    }).ToList();
            return MasterData;
        }


        //Master data of Participants(Broker/insurer)



        //Get Location

        public async Task<IEnumerable<ddDTOs>> GetLocation(string locationType, int parentID, ApiContext apiContext)
        {
            //  _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            IEnumerable<ddDTOs> ddDTOs;

            switch (locationType)
            {
                case "State":
                    ddDTOs = _context.TblMasState.Where(location => location.CountryId == parentID)
                        .Select(c => new ddDTOs
                        {
                            mID = c.StateId,
                            mValue = c.StateName,
                            mType = "State"
                        });
                    break;
                case "District":
                    ddDTOs = _context.TblMasDistrict.Where(location => location.StateId == parentID)
                        .Select(c => new ddDTOs
                        {
                            mID = c.DistrictId,
                            mValue = c.DistrictName,
                            mType = "District"
                        });
                    break;
                case "City":
                    ddDTOs = _context.TblMasCity.Where(location => location.DistrictId == parentID)
                    .Select(c => new ddDTOs
                    {
                        mID = c.CityId,
                        mValue = c.CityName,
                        mType = "City"
                    });
                    break;
                case "Pincode":
                    ddDTOs = _context.TblMasPinCode.Where(location => location.CityId == parentID)
                    .Select(c => new ddDTOs
                    {
                        mID = c.PincodeId,
                        mValue = c.Pincode,
                        mType = "Pincode"
                    });
                    break;
                default:
                    ddDTOs = _context.TblMasCountry.Select(location => location)
                    .Select(c => new ddDTOs
                    {
                        mID = c.CountryId,
                        mValue = c.CountryName,
                        mType = "Country"
                    });
                    break;
            }
            return ddDTOs;
        }

        //GetMasterYear
        public async Task<List<yearDto>> MasterYearData(ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var MasterData = _context.TblMasYear
                                                    .Select(x => new yearDto
                                                    {
                                                        mID = x.YearId,
                                                        mType = "Year",
                                                        mValue = x.Year

                                                    }).ToList();
            return MasterData;
        }

        //delete Participant
        public async Task<TransactionMapResponse> DeleteParticipant(decimal participantMasterId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var delete_caoMap = _context.TblParticipantMaster.Find(participantMasterId);
                if (delete_caoMap != null)
                {
                    _context.TblParticipantMaster.Remove(delete_caoMap);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {

            }
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"Participant Master deleted sucessfully " };
        }

        //modifyParticipant
        public async Task<TblParticipantMasterDto> ModifyParticipant(TblParticipantMasterDto tblParticipantMasterDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_participant = _mapper.Map<TblParticipantMaster>(tblParticipantMasterDto);
            var tbl_particiant = _context.TblParticipantMaster.Find(tbl_participant.ParticipantMasterId);

            if (tbl_particiant == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_particiant.ParticipantTypeId = tblParticipantMasterDto.ParticipantTypeId;
            tbl_particiant.ParticipantCode = tblParticipantMasterDto.ParticipantCode;
            tbl_particiant.ParticipantName = tblParticipantMasterDto.ParticipantName;
            tbl_particiant.ContactNo = tblParticipantMasterDto.ContactNo;
            tbl_particiant.Address1 = tblParticipantMasterDto.Address1;
            tbl_particiant.Address2 = tblParticipantMasterDto.Address2;
            tbl_particiant.Address3 = tblParticipantMasterDto.Address3;
            tbl_particiant.CountryId = tblParticipantMasterDto.CountryId;

            tbl_particiant.StateId = tblParticipantMasterDto.StateId;
            tbl_particiant.Pincode = tblParticipantMasterDto.Pincode;


            tbl_particiant.CreatedBy = tblParticipantMasterDto.CreatedBy;
            tbl_particiant.CreatedDate = tblParticipantMasterDto.CreatedDate;
            tbl_particiant.ModifiedDate = tblParticipantMasterDto.ModifiedDate;
            tbl_particiant.ModifiedBy = tblParticipantMasterDto.ModifiedBy;
            tbl_particiant.IsActive = tblParticipantMasterDto.IsActive;
            _context.TblParticipantMaster.Update(tbl_particiant);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<TblParticipantMasterDto>(tbl_particiant);
            return accountDTO;
        }

        public async Task<TransactionMapResponse> SaveParticipentData(TblParticipantMasterDto participantMasterDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var data = _mapper.Map<TblParticipantMaster>(participantMasterDto);
            try
            {
                _context.TblParticipantMaster.Add(data);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $" Participant Created sucessfully " };
        }
        //search Participant data

        public async Task<List<TblParticipantMasterDto>> SearchParticipant(TblParticipantMasterDto tblParticipantMasterDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));




            try
            {
                var msterdata = await MastertypeData(apiContext);
                IEnumerable<TblParticipantMasterDto> scontract = null;
                TblParticipantMasterDto scontract1 = new TblParticipantMasterDto() ;
                List<TblParticipantMasterDto> scontract2 = new List<TblParticipantMasterDto>();
                scontract = _context.TblParticipantMaster
                              .Select(c => new TblParticipantMasterDto
                              {
                                  ParticipantMasterId = c.ParticipantMasterId,
                                  ParticipantTypeId = c.ParticipantTypeId,
                                  ParticipantCode = c.ParticipantCode,
                                  ParticipantType = msterdata.FirstOrDefault(p => p.mID == c.ParticipantTypeId).mValue,
                                  ParticipantName = c.ParticipantName,
                                  IsActive = c.IsActive,

                              });

                if (tblParticipantMasterDto.ParticipantTypeId != null)
                {
                    scontract = scontract.Where(s => s.ParticipantTypeId == tblParticipantMasterDto.ParticipantTypeId);

                }
                if (!string.IsNullOrEmpty(tblParticipantMasterDto.ParticipantName))
                {
                    scontract = scontract.Where(s => s.ParticipantName == tblParticipantMasterDto.ParticipantName);

                }
                if (!string.IsNullOrEmpty(tblParticipantMasterDto.ParticipantCode))
                {
                    scontract = scontract.Where(s => s.ParticipantCode == tblParticipantMasterDto.ParticipantCode);

                }
                foreach (var i in scontract)
                {
                    scontract1 = new TblParticipantMasterDto();
                    //if(i.ParticipantMasterId!=null || i.ParticipantTypeId!=null )
                    scontract1.ParticipantMasterId = i.ParticipantMasterId;
                    scontract1.ParticipantTypeId = i.ParticipantTypeId;
                    scontract1.ParticipantCode = i.ParticipantCode;
                    if (i.ParticipantTypeId != null)
                    {
                        if (msterdata.FirstOrDefault(p => p.mID == i.ParticipantTypeId).mValue != null)
                        {
                            scontract1.ParticipantType = msterdata.FirstOrDefault(p => p.mID == i.ParticipantTypeId).mValue;
                        }
                    }
                    scontract1.ParticipantName = i.ParticipantName;

                    if (i.IsActive=="y" || i.IsActive=="Y")
                    {
                        scontract1.IsActive = "Active";
                    }
                    if (i.IsActive == "n" || i.IsActive == "N")
                    {
                        scontract1.IsActive = "InActive";
                    }
                    scontract2.Add(scontract1);

                }
                


                var contractdata = _mapper.Map<List<TblParticipantMasterDto>>(scontract2);
             
                return contractdata;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        //save retention

        public async Task<TransactionMapResponse> SaveRetentionData(TblRetentionGroupDto tblRetentionGroupDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var data = _mapper.Map<TblRetentionGroup>(tblRetentionGroupDto);
            try
            {
                _context.TblRetentionGroup.Add(data);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $" Retention Created sucessfully " };
        }

        //Search Retention

        public async Task<IEnumerable<TblRetentionGroupDto>> SearchRetention(TblRetentionGroupDto tblRetentionGroupDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var msterdata = await MastertypeData(apiContext);
            var yeardata =await MasterYearData(apiContext);


            try
            {
                IEnumerable<TblRetentionGroupDto> scontract = null;
                scontract = _context.TblRetentionGroup.OrderBy(s => s.CreatedDate)
                              .Select(c => new TblRetentionGroupDto
                              {
                                  YearId = c.Year,
                                  Year = yeardata.FirstOrDefault(p => p.mID == c.Year).mValue,
                                 // Year=c.Year,
                                  BusinessTypeId = c.BusinessTypeId,
                                  RetentionGroupName = c.RetentionGroupName,
                                  BusinessType = msterdata.FirstOrDefault(p => p.mID == c.BusinessTypeId).mValue,
                                  RetentionGroupId = c.RetentionGroupId,
                                  RetentionType = msterdata.FirstOrDefault(p => p.mID == c.RetentionGroupId).mValue,
                                  EffectiveTo = c.EffectiveTo,
                                  EffectiveFrom = c.EffectiveFrom,
                              });


                if (tblRetentionGroupDto.Year != null)
                {
                    scontract = scontract.Where(s => s.YearId == tblRetentionGroupDto.Year);

                }
                if (!string.IsNullOrEmpty(tblRetentionGroupDto.BusinessTypeId.ToString()))
                {
                    scontract = scontract.Where(s => s.BusinessTypeId == tblRetentionGroupDto.BusinessTypeId);

                }
                if (tblRetentionGroupDto.RetentionGroupName != null )
                {
                    scontract = scontract.Where(s => s.RetentionGroupName == tblRetentionGroupDto.RetentionGroupName);

                }
                if (tblRetentionGroupDto.EffectiveFrom != null)
                {
                    scontract = scontract.Where(s => s.EffectiveFrom == tblRetentionGroupDto.EffectiveFrom);

                }
                if (tblRetentionGroupDto.EffectiveTo != null)
                {
                    scontract = scontract.Where(s => s.EffectiveTo == tblRetentionGroupDto.EffectiveTo);

                }
              


                var contractdata = _mapper.Map<IEnumerable<TblRetentionGroupDto>>(scontract);
                

                return contractdata;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        //Delete Retention

        public async Task<TransactionMapResponse> DeleteRetention(decimal retentionGroupId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var delete_caoMap = _context.TblRetentionGroup.Find(retentionGroupId);
                if (delete_caoMap != null)
                {
                    _context.TblRetentionGroup.Remove(delete_caoMap);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {

            }
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"Retention deleted sucessfully " };
        }

        //modifyRetention

        public async Task<TblRetentionGroupDto> ModifyfRetention(TblRetentionGroupDto tblRetentionGroupDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_participant = _mapper.Map<TblRetentionGroupDto>(tblRetentionGroupDto);
            var tbl_particiant = _context.TblRetentionGroup.Find(tbl_participant.RetentionGroupId);

            if (tbl_particiant == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_particiant.Year = tblRetentionGroupDto.Year;
            tbl_particiant.BusinessTypeId = tblRetentionGroupDto.BusinessTypeId;
            tbl_particiant.RetentionGroupName = tblRetentionGroupDto.RetentionGroupName;
            tbl_particiant.RetentionLogicId = tblRetentionGroupDto.RetentionLogicId;
            tbl_particiant.Percentage = tblRetentionGroupDto.Percentage;
            tbl_particiant.Limit = tblRetentionGroupDto.Limit;
            tbl_particiant.EffectiveFrom = tblRetentionGroupDto.EffectiveFrom;
            tbl_particiant.EffectiveTo = tblRetentionGroupDto.EffectiveTo;
            _context.TblRetentionGroup.Update(tbl_particiant);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<TblRetentionGroupDto>(tbl_particiant);
            return accountDTO;
        }

        //Treaty
        //Save Treaty
        public async Task<TransactionMapResponse> SaveTreatyData(TblTreatyDto tblTreatyDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var data = _mapper.Map<TblTreaty>(tblTreatyDto);

                _context.TblTreaty.Add(data);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"Treaty Created sucessfully " };
        }

        //Search Treaty

        public async Task<IEnumerable<TblTreatyDto>> SearchTreaty(TblTreatyDto tblTreatyDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var msterdata = await MastertypeData(apiContext);
            var yeardata = await MasterYearData(apiContext);


            try
            {
                IEnumerable<TblTreatyDto> scontract = null;
                scontract = _context.TblTreaty.OrderBy(s => s.CreatedDate)
                              .Select(c => new TblTreatyDto
                              {
                                  TreatyId = c.TreatyId,
                                  TreatyTypeId = c.TreatyTypeId,
                                  //   TreatyType = msterdata.FirstOrDefault(p => p.mID == c.TreatyTypeId).mValue,
                                  TreatyCode = c.TreatyCode,
                                  TreatyDescription = c.TreatyDescription,
                                  StartDate = c.StartDate,
                                  EndDate = c.EndDate,
                                  TreatyYearId = c.TreatyYearId,
                                  TreatyYear = yeardata.FirstOrDefault(p => p.mID == c.TreatyYearId).mValue,
                                  StatusId = c.StatusId,
                                //  StausType = msterdata.FirstOrDefault(p => p.mID == c.StatusId).mValue,
                              });


                if (tblTreatyDto.TreatyCode != null)
                {
                    scontract = scontract.Where(s => s.TreatyCode == tblTreatyDto.TreatyCode);

                }
                if (!string.IsNullOrEmpty(tblTreatyDto.TreatyDescription))
                {
                    scontract = scontract.Where(s => s.TreatyDescription == tblTreatyDto.TreatyDescription);

                }
                if (!string.IsNullOrEmpty(tblTreatyDto.StartDate.ToString()))
                {
                    scontract = scontract.Where(s => s.StartDate == tblTreatyDto.StartDate);

                }
                if (!string.IsNullOrEmpty(tblTreatyDto.EndDate.ToString()))
                {
                    scontract = scontract.Where(s => s.EndDate == tblTreatyDto.EndDate);

                }
                if (!string.IsNullOrEmpty(tblTreatyDto.EndDate.ToString()))
                {
                    scontract = scontract.Where(s => s.StatusId == tblTreatyDto.StatusId);

                }
                if (!string.IsNullOrEmpty(tblTreatyDto.TreatyYearId.ToString()))
                {
                    scontract = scontract.Where(s => s.TreatyYearId == tblTreatyDto.TreatyYearId);

                }


                var contractdata = _mapper.Map<IEnumerable<TblTreatyDto>>(scontract);
                return contractdata;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        //delete Treaty

      public async  Task<TransactionMapResponse> DeleteTeaty(decimal tratyId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                
                var delete_caoMap = _context.TblTreaty.Find(tratyId);
                if (delete_caoMap != null)
                {
                    _context.TblTreaty.Remove(delete_caoMap);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {

            }
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"Treaty deleted sucessfully " };
        }

        //modify TreatyData

        public async Task<TblTreatyDto> ModifyfTraty(TblTreatyDto tblTreatyDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_treaty = _mapper.Map<TblTreatyDto>(tblTreatyDto);
            var tbl_traty = _context.TblTreaty.Find(tbl_treaty.TreatyId);

            if (tbl_traty == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_traty.TreatyCode = tblTreatyDto.TreatyCode;
            tbl_traty.TreatyDescription = tblTreatyDto.TreatyDescription;
            tbl_traty.TreatyTypeId = tblTreatyDto.TreatyTypeId;
            tbl_traty.StartDate = tblTreatyDto.StartDate;
            tbl_traty.EndDate = tblTreatyDto.EndDate;
            tbl_traty.TreatyYearId = tblTreatyDto.TreatyYearId;
            tbl_traty.TreatyBasisId = tblTreatyDto.TreatyBasisId;
            tbl_traty.AccountingToId = tblTreatyDto.AccountingToId;
            tbl_traty.CurrencyId = tblTreatyDto.CurrencyId;
            tbl_traty.BorderauxFreqId = tblTreatyDto.BorderauxFreqId;
            tbl_traty.Remarks = tblTreatyDto.Remarks;

            _context.TblTreaty.Update(tbl_traty);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<TblTreatyDto>(tbl_traty);
            return accountDTO;
        }

        //AddTreatyParticipant 
        public async Task<IAsyncResult> AddTreatyParticipant(TblParticipantDto tblParticipantDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var data = _mapper.Map<TblParticipant>(tblParticipantDto);
            try
            {
                _context.TblParticipant.Add(data);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }
            return null; ;
        }





        //RI Mapping

        //RI mapping to fetch the Groups

        //Get Grid of RI screen 
        public async Task<IEnumerable<RIMappingDTO>> GetDescriptionRIGrid(decimal treatyid, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var msterdata =await MastertypeData(apiContext);
            try
            {
                var coaMapppingDto = from tblTreaty in _context.TblTreaty.Where(s => s.TreatyId == treatyid)
                                     join tblTreatyGroup in _context.TblTreatyGroup on (decimal)tblTreaty.TreatyId equals tblTreatyGroup.TreatyId

                                     select new RIMappingDTO
                                     {

                                         TreatyDescription = tblTreaty.TreatyDescription,

                                         treatyType = msterdata.FirstOrDefault(p => p.mID == tblTreaty.TreatyTypeId).mValue
                                     };
                var coaMappingDetails = _mapper.Map<IEnumerable<RIMappingDTO>>(coaMapppingDto);
                return coaMappingDetails;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //Get Participant Name(RI or Broker)
        public async Task<IEnumerable<TblParticipantMasterDto>> GetName(decimal participantMasterId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var msterdata = MastertypeData(apiContext);
            try
            {
                var coaMapppingDto = from tblparticipant in _context.TblParticipantMaster.Where(s => s.ParticipantMasterId == participantMasterId)

                                     select new TblParticipantMasterDto
                                     {

                                         ParticipantName = tblparticipant.ParticipantName,

                                       // treatyType = msterdata.FirstOrDefault(p => p.mID == tblTreaty.TreatyTypeId).mValue
                                     };
                var coaMappingDetails = _mapper.Map<IEnumerable<TblParticipantMasterDto>>(coaMapppingDto);
                return coaMappingDetails;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        public async Task<TransactionMapResponse> SaveRIMapping(TblRimappingDto tblRimappingDto,ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            //taking id 20 for retention group and 21 for treaty
            foreach (var d in tblRimappingDto.TblRimappingDetail)
            {
                if(d.RetentionGroupId!=null)
                {
                    d.SequenceNo = 01;
                    d.RimappingTypeId = 31;
                    tblRimappingDto.TblRimappingDetail.Add(d);
                }
                else
                {
                    d.RimappingTypeId = 32;
                    tblRimappingDto.TblRimappingDetail.Add(d);
                }
            }
              var data = _mapper.Map<TblRimapping>(tblRimappingDto);
          
            
            try
            {
                _context.TblRimapping.Add(data);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"RI Mapping Details Saved sucessfully " };
        }

        //search RI mapping

        public async Task<IEnumerable<TblRimappingDto>> SearchRImapping(TblRimappingDto tblRimappingDto, ApiContext apiContext)
        {
            //var msterdata = MastertypeData();
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var yeardata = await MasterYearData(apiContext);


            try
            {
                IEnumerable<TblRimappingDto> scontract = null;
                scontract = _context.TblRimapping.OrderBy(s => s.CreatedDate)
                              .Select(c => new TblRimappingDto
                              {
                                  RimappingId=c.RimappingId,
                                  Year1 = c.Year,
                                  Level = c.Level,
                                  Year = yeardata.FirstOrDefault(p => p.mID == c.Year).mValue,
                                  LobProductCover = c.LobProductCover,
                                  CreatedDate = c.CreatedDate,

                              });


                if (tblRimappingDto.Year != null)
                {
                    scontract = scontract.Where(s => s.Year1 == tblRimappingDto.Year);

                }
                if (!string.IsNullOrEmpty(tblRimappingDto.Level))
                {
                    scontract = scontract.Where(s => s.Level == tblRimappingDto.Level);

                }
                if (!string.IsNullOrEmpty(tblRimappingDto.LobProductCover))
                {
                    scontract = scontract.Where(s => s.LobProductCover == tblRimappingDto.LobProductCover);

                }



                var contractdata = _mapper.Map<IEnumerable<TblRimappingDto>>(scontract);
                return contractdata;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        //Delete RI mapping
        //modify Ri

        public async Task<TblRimappingDto> ModifyRImapping(TblRimappingDto tblParticipantMasterDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_Rimaping = _mapper.Map<TblRimapping>(tblParticipantMasterDto);
            var tbl_particiant = _context.TblRimapping.Find(tbl_Rimaping.RimappingId);

            if (tbl_particiant == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_particiant.Year = tblParticipantMasterDto.Year;
            tbl_particiant.Level = tblParticipantMasterDto.Level;
            tbl_particiant.LobProductCover = tblParticipantMasterDto.LobProductCover;
            _context.TblRimapping.Update(tbl_particiant);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<TblRimappingDto>(tbl_particiant);
            return accountDTO;
        }


        public async Task<TransactionMapResponse> DeleteRiMapping(decimal RimappingId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var delete_caoMap = _context.TblRimapping.Find(RimappingId);
                if (delete_caoMap != null)
                {
                    _context.TblRimapping.Remove(delete_caoMap);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {

            }
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"RI Mapping Deleted sucessfully " };
        }

        //GetElements by id
        public async Task<TblRetentionGroupDto> GetRetentionGroupById(decimal retentionGroupId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));


            var tblRetentionGroup = _context.TblRetentionGroup.Find(retentionGroupId);
            if (tblRetentionGroup != null)
            {
                var tblRetetionDTO = _mapper.Map<TblRetentionGroupDto>(tblRetentionGroup);
                return tblRetetionDTO;
            }
            return null;
        }



        //GetTreaty By Id

        public async Task<TblTreatyDto> GetTreatyById(decimal treatyId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tbltreaty = _context.TblTreaty.Find(treatyId);
            if (tbltreaty != null)
            {
                var tblTratyDTO = _mapper.Map<TblTreatyDto>(tbltreaty);
                return tblTratyDTO;
            }
            return null;
        }

        //GetparticipantById

        public async Task<TblParticipantMasterDto> GetParticipantBYId(decimal participantMasterId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var tblparticipant = _context.TblParticipantMaster.Find(participantMasterId);
                if (tblparticipant != null)
                {
                    var participantMasterDTO = _mapper.Map<TblParticipantMasterDto>(tblparticipant);
                    return participantMasterDTO;
                }
            }catch(Exception e)
            {

            }
            return null;
        }

        public async Task<TblRimappingDto> GetRImappingBYId(decimal RImappingId, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var tblRImapping = _context.TblRimapping.Find(RImappingId);
                if (tblRImapping != null)
                {
                    var RImappingrDTO = _mapper.Map<TblRimappingDto>(tblRImapping);
                    return RImappingrDTO;
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return null;
        }


    }

}

