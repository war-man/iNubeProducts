using AutoMapper;
using iNube.Services.ReInsurance.Controllers.ReInsurance.IntegrationServices;
using iNube.Services.ReInsurance.Entities;
using iNube.Services.ReInsurance.Helpers;
using iNube.Services.ReInsurance.Models;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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
        Task<ParticpantResponse> ModifyParticipant(TblParticipantMasterDto tblParticipantMasterDto, ApiContext apiContext);

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
        Task<RetentionResponse> ModifyfRetention(TblRetentionGroupDto tblRetentionGroupDto, ApiContext apiContext);

        //Treaty Functions

        Task<TransactionMapResponse> SaveTreatyData(TblTreatyDto tblTreatyDto, ApiContext apiContext);
        Task<IEnumerable<TblTreatyDto>> SearchTreaty(TblTreatyDto tblRetentionGroupDto, ApiContext apiContext);
        Task<TransactionMapResponse> DeleteTeaty(decimal tratyId, ApiContext apiContext);
        Task<TreatyResponse> ModifyfTraty(TblTreatyDto tblRetentionGroupDto, ApiContext apiContext);
        Task<IAsyncResult> AddTreatyParticipant(TblParticipantDto tblParticipantDto, ApiContext apiContext);



        //RI Functions

        Task<TransactionMapResponse> SaveRIMapping(TblRimappingDto tblRimappingDto, ApiContext apiContext);

        Task<IEnumerable<RIMappingDTO>> GetDescriptionRIGrid(decimal treatyid, ApiContext apiContext);

        //Task<IEnumerable<RIMappingDTO>> GetTreatyTypeRIGrid(string treatycode, ApiContext apiContext);

        Task<IEnumerable<TblRimappingDto>> SearchRImapping(TblRimappingDto tblRimappingDto, ApiContext apiContext);
        Task<TblRimappingResponse> ModifyRImapping(TblRimappingDto tblParticipantMasterDto, ApiContext apiContext);
        Task<TransactionMapResponse> DeleteRiMapping(decimal RimappingId, ApiContext apiContext);


        //Get elements By id for the modifications

        Task<TblRetentionGroupDto> GetRetentionGroupById(decimal retentionGroupId, ApiContext apiContext);

        //GetTreaty BY id

        Task<TblTreatyDto> GetTreatyById(decimal treatyId, ApiContext apiContext);

        //TblParticipantMasterDto

        Task<TblParticipantMasterDto> GetParticipantBYId(decimal participantMasterId, ApiContext apiContext);

        Task<TblRimappingDto> GetRImappingBYId(decimal RImappingID, ApiContext apiContext);
        Task<object> GetAllocationByPolicyNo(string policyNo, ApiContext apiContext);
        Task<RiallocationDto> ModifyReAllocation(RiallocationDto riallocationDto, ApiContext apiContext);
        Task<IActionResult> Calulationddata(CalulationDto calulationDto, ApiContext apiContext);
        Task<IEnumerable<TblParticipantMasterDto>> GetParticipantNameByCode(string participantcode, ApiContext apiContext);
        Task<ValidationResponse> TreatyCodeAndGroupValidation(string codeName, string type, ApiContext apiContext);


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
        //private readonly  IReInsuranceService _reInsuranceService;
        private readonly IIntegrationService _integrationService;
        private IConfiguration _configuration;
        public DbHelper dbHelper;


        public ReInsuranceService( MICARIContext context, IMapper mapper, IServiceProvider serviceProvider, ILoggerManager logger, IEmailService emailService, IOptions<AppSettings> appSettings, IConfiguration configuration, IIntegrationService integrationService)
        {

            _mapper = mapper;
            _serviceProvider = serviceProvider;
            _logger = logger;
            _emailService = emailService;
            _context = context;
           // _reInsuranceService = reinsuranceService;
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

            var MasterData = _context.TblParticipantMaster.Where(s => s.ParticipantTypeId == 8 && (s.IsActive!="N" && s.IsActive!="n") )
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

            var MasterData = _context.TblParticipantMaster.Where(s => s.ParticipantTypeId == 9 && (s.IsActive != "N" && s.IsActive != "n"))
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
        public async Task<ParticpantResponse> ModifyParticipant(TblParticipantMasterDto tblParticipantMasterDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_participant = _mapper.Map<TblParticipantMaster>(tblParticipantMasterDto);
            var tbl_particiant = _context.TblParticipantMaster.Find(tbl_participant.ParticipantMasterId);

            if (tbl_particiant == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_particiant.ModifiedDate = DateTime.Now;
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
           
            tbl_particiant.ModifiedBy = tblParticipantMasterDto.ModifiedBy;
            tbl_particiant.IsActive = tblParticipantMasterDto.IsActive;
            _context.TblParticipantMaster.Update(tbl_particiant);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<TblParticipantMasterDto>(tbl_particiant);
            // return accountDTO;
            return new ParticpantResponse { Status = BusinessStatus.Updated, ResponseMessage = $"Participant updated  sucessfully ",participantMasterDto= accountDTO };
        }

        public async Task<TransactionMapResponse> SaveParticipentData(TblParticipantMasterDto participantMasterDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            participantMasterDto.CreatedDate = DateTime.Now;
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
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $" Participant Created sucessfully With ParticipantCode "+ data .ParticipantCode};
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
            tblRetentionGroupDto.CreatedDate = DateTime.Now;
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
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $" Retention Created sucessfully with Retetion GroupName "+ data.RetentionGroupName };
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

        public async Task<RetentionResponse> ModifyfRetention(TblRetentionGroupDto tblRetentionGroupDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_participant = _mapper.Map<TblRetentionGroupDto>(tblRetentionGroupDto);
            var tbl_particiant = _context.TblRetentionGroup.Find(tbl_participant.RetentionGroupId);

            if (tbl_particiant == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_particiant.ModifiedDate = DateTime.Now;
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
            //  return accountDTO;
            return new RetentionResponse { Status = BusinessStatus.Updated, ResponseMessage = $"Retention updated  sucessfully ",retentionGroupDto= accountDTO };
        }

        //Treaty
        //Save Treaty
        public async Task<TransactionMapResponse> SaveTreatyData(TblTreatyDto tblTreatyDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            tblTreatyDto.CreatedDate = DateTime.Now;
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
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"Treaty Created sucessfully with Treaty Code: "+ tblTreatyDto.TreatyCode };
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

        public async Task<TreatyResponse> ModifyfTraty(TblTreatyDto tblTreatyDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_treaty = _mapper.Map<TblTreatyDto>(tblTreatyDto);
            var tbl_traty = _context.TblTreaty.Find(tbl_treaty.TreatyId);

            if (tbl_traty == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_traty.ModifiedDate = DateTime.Now;
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

            //return accountDTO;
            return new TreatyResponse { Status = BusinessStatus.Updated, ResponseMessage = $"Treaty updated  sucessfully ",treatyDto= accountDTO };
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
            tblRimappingDto.CreatedDate = DateTime.Now;
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
            return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"RI Mapping Details Saved sucessfully" };
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

        public async Task<TblRimappingResponse> ModifyRImapping(TblRimappingDto tblParticipantMasterDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_Rimaping = _mapper.Map<TblRimapping>(tblParticipantMasterDto);
            var tbl_particiant = _context.TblRimapping.Find(tbl_Rimaping.RimappingId);

            if (tbl_particiant == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_particiant.ModifiedDate = DateTime.Now;
            tbl_particiant.Year = tblParticipantMasterDto.Year;
            tbl_particiant.Level = tblParticipantMasterDto.Level;
            tbl_particiant.LobProductCover = tblParticipantMasterDto.LobProductCover;
            _context.TblRimapping.Update(tbl_particiant);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<TblRimappingDto>(tbl_particiant);
            //  return accountDTO;
            return new TblRimappingResponse { Status = BusinessStatus.Updated, ResponseMessage = $"RI Mapping Updated  sucessfully ",RimappingDto= accountDTO };
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
            //treatyId
            var tbltreaty = _context.TblTreaty.Where(s => s.TreatyId == treatyId).Include(add => add.TblParticipant)
                .Include(add => add.TblTreatyGroup)
                .Include("TblTreatyGroup.TblArrangement").FirstOrDefault();
            
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
               // Find(participantMasterId)
                var tblparticipant = _context.TblParticipantMaster.Where(s=>s.ParticipantMasterId== participantMasterId).Include(add=>add.TblParticipantBranch).FirstOrDefault();
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
                var tblRImapping = _context.TblRimapping.
                    Where(s => s.RimappingId == RImappingId).Include(add => add.TblRimappingDetail)
                    .FirstOrDefault();
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
        public async Task<IEnumerable<TblParticipantMasterDto>> GetParticipantNameByCode(string participantcode, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var participantMasDTO = _context.TblParticipantMaster.Where(x => x.ParticipantCode == participantcode).ToList();
                var participantMasterDTO = _mapper.Map<IEnumerable<TblParticipantMasterDto>>(participantMasDTO);
                return participantMasterDTO;
            }
            catch (Exception e)
            {

            }
            return null;
        }
        //Get Participant Name(RI or Broker)
        public async Task<object> GetAllocationByPolicyNo(string policyNo, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));


            try
            {
                var tblRiAllocationdata = _context.TblRiallocation.Where(a=>a.PolicyNo==policyNo).FirstOrDefault();
                var json = JsonConvert.DeserializeObject<object>(tblRiAllocationdata.AllocationDetails.ToString());
                return json;

            }
            catch (Exception e)
            {
                return null;
            }

        }

        public async Task<RiallocationDto> ModifyReAllocation(RiallocationDto riallocationDto, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var tblAllocationDto = _mapper.Map<RiallocationDto>(riallocationDto);
            var tblAllocation = _context.TblRiallocation.Where(a => a.AllocationId == riallocationDto.AllocationId).
                FirstOrDefault();

            if (tblAllocation == null)
                throw new AppException("Account Not Found");
            var allocationHistorydata = tblAllocation.AllocationDetails;
            var mappingId = tblAllocation.MappingId;
            var allocatioinLevel = tblAllocation.AllocationLevel;
            var allocationId = tblAllocation.AllocationId;
            var policyNo = tblAllocation.PolicyNo;
            var itemName = tblAllocation.ItemId;
            var allocationAmount = tblAllocation.AllocationAmount;
            var allocationPremium = tblAllocation.Premium;
            var transectiondate = DateTime.Now;

            tblAllocation.AllocationAmount = tblAllocationDto.AllocationAmount;
           // tblAllocation.PolicyNo = tblAllocationDto.PolicyNo;
            tblAllocation.AllocationDetails = tblAllocationDto.AllocationDetails;
           // tblAllocation.AllocationLevel = tblAllocationDto.AllocationLevel;
            tblAllocation.Premium = tblAllocationDto.Premium;

            _context.TblRiallocation.Update(tblAllocation);

            TblRiallocationHistory tblRiallocationHistory = new TblRiallocationHistory();
            tblRiallocationHistory.Premium = allocationPremium;
            tblRiallocationHistory.AloocationDetails = allocationHistorydata;
            tblRiallocationHistory.MaapingId = mappingId;
            tblRiallocationHistory.AllocationLevel = allocatioinLevel;
            tblRiallocationHistory.AllocationLevel = allocatioinLevel;
            tblRiallocationHistory.AllocationAmount = allocationAmount;
            tblRiallocationHistory.Premium = allocationPremium;
            tblRiallocationHistory.TransectionDate = transectiondate;
            _context.TblRiallocationHistory.Add(tblRiallocationHistory);
            _context.SaveChanges();
            var riallocation = _mapper.Map<RiallocationDto>(tblAllocation);
            return riallocation;
        }

        public async Task<IActionResult> Calulationddata(CalulationDto calulationDto, ApiContext apiContext)
        {
            //Year,Level,Product is used for pulling the data for treaty
            //use of Premium and SI
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));


            ReallocatedDTO reallocatedDTO = new ReallocatedDTO();
            MapDetails mapDetails = new MapDetails();
            List<MapDetails> mapDetails1 = new List<MapDetails>();
            Participant participant = new Participant();
            List<Participant> participants = new List<Participant>();

            //Policy Or Sometihng id need to take
            Mapping mapping = new Mapping();
            List<Map> maps = new List<Map>();

            Map map = new Map();

            mapping.PolicyNo = calulationDto.PolicyNo;
            mapping.Premium = calulationDto.PremiumAmount;
            mapping.AllocationAmmount = calulationDto.SumInsured;
            mapping.Level = calulationDto.level;
            mapping.Year = calulationDto.Year;
            mapping.ProductName = calulationDto.ProductName;


            //step1
            var tblRiMapping = _context.TblRimapping.Where(a => a.Year == calulationDto.Year && a.Level == calulationDto.level && a.LobProductCover == calulationDto.ProductName).FirstOrDefault();
            var RIMappingDTO = _mapper.Map<TblRimappingDto>(tblRiMapping);

            //step2
            var RImappingDetails = _context.TblRimappingDetail.Where(a => a.RimappingId == RIMappingDTO.RimappingId).ToList();
            var LstRImappingDetails = _mapper.Map<List<TblRimappingDetailDto>>(RImappingDetails);

            //step3
            var retentionGroups = _context.TblRetentionGroup.Where(a => a.RetentionGroupId == RIMappingDTO.RetentionGroupId).FirstOrDefault();
            var retensionDto = _mapper.Map<TblRetentionGroupDto>(retentionGroups);

            map.Type = "Retention";
            if (Convert.ToInt32(retensionDto.RetentionLogicId) == 20)
            {
                map.AllocationMethod = "Percentage";
                map.Percentage = retensionDto.Percentage.ToString();
            }
            else if (Convert.ToInt32(retensionDto.RetentionLogicId) == 21)
            {
                map.AllocationMethod = "Limit";
                map.Limit = retensionDto.Limit.ToString();

            }
            else if (Convert.ToInt32(retensionDto.RetentionLogicId) == 22)
            {
                map.AllocationMethod = "Percentage with Limit";
                map.Limit = retensionDto.Limit.ToString();
                if (retensionDto.Percentage.ToString() != "")
                {
                    map.Percentage = retensionDto.Percentage.ToString();
                }
                else
                {
                    map.Percentage = "0";
                }
            }
            else
            {
                map.AllocationMethod = "Lines";
            }
            map.AllocationBasis = calulationDto.SumInsured.ToString();
            map.Balance = calulationDto.SumInsured.ToString();

            map.AllocatedRetention = "0";
            map.AllocatedQS = "0";
            map.TotalAllocation = "0";
            map.AllocationBasedOn = "";
            map.NoofLines = "0";
            map.HL = "";

            //This is Extra only for testing Purpuse
            map.Percentage = "0";





            maps.Add(map);
            //doing for mapping

            mapDetails.Type = map.Type;
            mapDetails.Percentage = Convert.ToInt32(map.Percentage);
            mapDetails.Limit = Convert.ToInt32(map.Limit);
            mapDetails.AllocationBasis = map.AllocationBasis;
            mapDetails.NoOfLines = Convert.ToInt32(map.NoofLines);
            mapDetails.AllocatedAmount = 0;//need to get it from integration call value
            mapDetails.AllocatedPremium = 0;////need to get it from integration call value
            mapDetails1.Add(mapDetails);
            // Treaty data need to be filled

            var treatyData = _context.TblTreatyGroup.ToList();   //getting all child data;
            var treatyDataLst = _mapper.Map<List<TblTreatyGroupDto>>(treatyData);

            foreach (var item in LstRImappingDetails)
            {
                foreach (var treatyitem in treatyDataLst)
                {
                    if (item.TreatyGroupId == treatyitem.TreatyGroupId)
                    {
                        var tratyparntdata = _context.TblTreaty.Find(treatyitem.TreatyId);
                        var trtdata = _mapper.Map<TblTreatyDto>(tratyparntdata);
                        var Arrangementdata = _context.TblArrangement.Find(treatyitem.TreatyId);
                        var arrangementsvalue = _mapper.Map<TblArrangementDto>(Arrangementdata);
                        //treatytypeid ->5 means Surplus and 4 means Quotashare
                        if (trtdata.TreatyTypeId == 5)
                        {
                            map = new Map();
                            // surPlus.Percent = trtdata.pe;
                            map.Type = "Surplus";
                            // map.Percentage = Convert.ToInt32(arrangementsvalue.Percentage);
                            // map.Limit= Convert.ToInt32(arrangementsvalue.li)
                            if (Convert.ToInt32(arrangementsvalue.AllocationLogicId) == 20)
                            {
                                map.AllocationMethod = "Percentage";
                                map.Percentage = arrangementsvalue.Percentage.ToString();
                                map.Limit = "0";
                            }
                            else if (Convert.ToInt32(arrangementsvalue.AllocationLogicId) == 21)
                            {
                                map.AllocationMethod = "Limit";
                                map.Limit = arrangementsvalue.Amount.ToString();
                                map.Percentage = "0";
                            }
                            else if (Convert.ToInt32(arrangementsvalue.AllocationLogicId) == 22)
                            {
                                map.AllocationMethod = "PercentageWithLimit";
                                map.Percentage = arrangementsvalue.Percentage.ToString();
                                map.Limit = arrangementsvalue.Amount.ToString();
                            }
                            else
                            {
                                map.AllocationMethod = "NoOfLines";
                                map.Percentage = "0";
                                map.Limit = "0";
                            }

                            map.AllocationBasis = calulationDto.SumInsured.ToString();
                            // Convert.ToDecimal(arrangementsvalue.Amount);
                            map.Balance = calulationDto.SumInsured.ToString();
                            if (arrangementsvalue.HigherOrLowerId == 24)
                            {
                                map.HL = "H";
                            }
                            else
                            {
                                map.HL = "L";
                            }
                            map.NoofLines = arrangementsvalue.NoOfLines.ToString();
                            if (arrangementsvalue.AllocationBasisId == 26)
                            {
                                map.AllocationBasedOn = "Sum Insured";

                            }
                            else if (arrangementsvalue.AllocationBasisId == 27)
                            {
                                map.AllocationBasedOn = "Retention";

                            }
                            else
                            {
                                map.AllocationBasedOn = "Retention + QS";
                            }

                            map.AllocatedRetention = "0";
                            map.AllocatedQS = "0";
                            map.TotalAllocation = "0";

                            // map.High
                            maps.Add(map);

                            mapDetails.Type = map.Type;
                            mapDetails.Percentage = Convert.ToInt32(map.Percentage);
                            mapDetails.Limit = Convert.ToInt32(map.Limit);
                            mapDetails.AllocationBasis = map.AllocationBasis;
                            mapDetails.NoOfLines = Convert.ToInt32(map.NoofLines);
                            mapDetails.AllocatedAmount = 0;//need to get it from integration call value
                            mapDetails.AllocatedPremium = 0;////need to get it from integration call value
                            mapDetails1.Add(mapDetails);



                            var tblparticipnatList = _context.TblParticipant.Where(s => s.TreatyId == trtdata.TreatyId).ToList();
                            foreach (var item1 in tblparticipnatList)
                            {
                                participant = new Participant();
                                participant.ParticipantId = Convert.ToInt32(item1.ParticipantId);
                                //doubt for below line
                                participant.Branch = _context.TblParticipantBranch.Where(s => s.BranchId == item1.ReInsurerBranchId).Select(s => s.BranchCode).FirstOrDefault();
                                participant.Branch = _context.TblParticipantBranch.Where(s => s.BranchId == item1.ReInsurerBranchId).Select(s => s.BranchCode).FirstOrDefault();
                                participant.Share = Convert.ToDecimal(item1.SharePercentage);
                                participant.CommissionRate = Convert.ToDecimal(item1.RicommissionPercentage);
                                participant.BrokerageRate = Convert.ToDecimal(item1.BrokeragePercentage);
                                //  participant.Commission= item1.   I think need to be calculated
                                participant.AllocatedAmount = 0;//need to ask the calculation
                                participant.AllocatedPremium = 0;//need to ask the caluation
                                participants.Add(participant);


                            }
                            mapDetails.participants = participants;
                            mapDetails1.Add(mapDetails);





                        }
                        if (trtdata.TreatyTypeId == 4)
                        {
                            map = new Map();
                            // surPlus.Percent = trtdata.pe;
                            map.Type = "QS";
                            if (Convert.ToInt32(arrangementsvalue.AllocationLogicId) == 20)
                            {
                                map.AllocationMethod = "Percentage";
                                map.Percentage = arrangementsvalue.Percentage.ToString();
                            }
                            else if (Convert.ToInt32(arrangementsvalue.AllocationLogicId) == 21)
                            {
                                map.AllocationMethod = "Limit";
                                map.Limit = arrangementsvalue.Amount.ToString();
                            }
                            else if (Convert.ToInt32(arrangementsvalue.AllocationLogicId) == 22)
                            {
                                map.AllocationMethod = "PercentageWithLimit";
                                map.Percentage = arrangementsvalue.Percentage.ToString();
                                map.Limit = arrangementsvalue.Amount.ToString();
                            }
                            else
                            {
                                map.AllocationMethod = "NoOfLines";
                            }

                            map.AllocationBasis = calulationDto.SumInsured.ToString();
                            // Convert.ToDecimal(arrangementsvalue.Amount);
                            map.Balance = calulationDto.SumInsured.ToString();
                            if (arrangementsvalue.HigherOrLowerId == 24)
                            {
                                map.HL = "H";
                            }
                            else
                            {
                                map.HL = "L";
                            }
                            map.NoofLines = arrangementsvalue.NoOfLines.ToString();
                            if (arrangementsvalue.AllocationBasisId == 26)
                            {
                                map.AllocationBasedOn = "Sum Insured";

                            }
                            else if (arrangementsvalue.AllocationBasisId == 27)
                            {
                                map.AllocationBasedOn = "Retention";

                            }
                            else
                            {
                                map.AllocationBasedOn = "Retention + QS";
                            }




                            map.AllocatedRetention = "0";
                            map.AllocatedQS = "0";
                            map.TotalAllocation = "0";

                            maps.Add(map);

                            mapDetails.Type = map.Type;
                            mapDetails.Percentage = Convert.ToInt32(map.Percentage);
                            mapDetails.Limit = Convert.ToInt32(map.Limit);
                            mapDetails.AllocationBasis = map.AllocationBasis;
                            mapDetails.NoOfLines = Convert.ToInt32(map.NoofLines);
                            mapDetails.AllocatedAmount = 0;//need to get it from integration call value
                            mapDetails.AllocatedPremium = 0;////need to get it from integration call value
                            mapDetails1.Add(mapDetails);

                            var tblparticipnatList = _context.TblParticipant.Where(s => s.TreatyId == trtdata.TreatyId).ToList();
                            foreach (var item1 in tblparticipnatList)
                            {
                                participant = new Participant();
                                participant.ParticipantId = Convert.ToInt32(item1.ParticipantId);
                                //doubt for below line
                                participant.Branch = _context.TblParticipantBranch.Where(s => s.BranchId == item1.ReInsurerBranchId).Select(s => s.BranchCode).FirstOrDefault();
                                participant.Branch = _context.TblParticipantBranch.Where(s => s.BranchId == item1.ReInsurerBranchId).Select(s => s.BranchCode).FirstOrDefault();
                                participant.Share = Convert.ToDecimal(item1.SharePercentage);
                                participant.CommissionRate = Convert.ToDecimal(item1.RicommissionPercentage);
                                participant.BrokerageRate = Convert.ToDecimal(item1.BrokeragePercentage);
                                //  participant.Commission= item1.   I think need to be calculated
                                participant.AllocatedAmount = 0;//need to ask the calculation
                                participant.AllocatedPremium = 0;//need to ask the caluation
                                participants.Add(participant);


                            }
                            mapDetails.participants = participants;
                            mapDetails1.Add(mapDetails);

                        }

                    }
                    mapping.maps = maps;

                }
            }

            List<Map> list = new List<Map>();

            var test = mapping;
            list = test.maps;
            //  var MAPList=JsonConvert.DeserializeObject<List<Map>>(list.ToString);
            var from = 1;
            var To = list.Count;
            var data = await _integrationService.AllocationCalulation(list, from, To, apiContext);

            var listdata = data.ToList();
            var filterData = listdata.Where(s => s.Period == 1).Select(s => s.RetentionAmount).ToList();
            var data1 = filterData[0].ToString();

            //Preparing Json 
            reallocatedDTO.MappingId = Convert.ToInt32(RIMappingDTO.RimappingId);
            reallocatedDTO.Year = calulationDto.Year;
            reallocatedDTO.Level = calulationDto.level;
            reallocatedDTO.AllocationAmount = calulationDto.SumInsured;
            reallocatedDTO.PremiumAmount = calulationDto.PremiumAmount;
            reallocatedDTO.PolicyNumber = calulationDto.PolicyNo;
            reallocatedDTO.Name = "";//i think i have to call policy to get the cover details



            reallocatedDTO.mapDetails = mapDetails1;

            var test1 = reallocatedDTO;


            return null;
        }

        public async Task<ValidationResponse> TreatyCodeAndGroupValidation(string codeName, string type, ApiContext apiContext)
        {
            _context = (MICARIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            //List<ErrorInfo> Errors = new List<ErrorInfo>();
            ValidationResponse validationResponse = new ValidationResponse();
            if (type == "TreatyCode")
            {
                var lsttreatyCode = _context.TblTreaty.Select(s => s.TreatyCode).ToList();
                if(lsttreatyCode.Contains(codeName)==true)
                {
                    validationResponse.ResponseMessage = $"Treaty Code " + codeName + " can not be dublicated";
                    //ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = "Treaty Code " + codeName +" can not be dublicated" };
                    // Errors.Add(errorInfo);
                }
            }
            if (type == "GroupName")
            {
                var lstTratyGroupName = _context.TblTreatyGroup.Select(s => s.TreatyGroupName).ToList();
                if (lstTratyGroupName.Contains(codeName) == true)
                {
                    validationResponse.ResponseMessage = $"Treaty GroupName " + codeName + " can not be dublicated";

                    //ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = "Treaty GroupName " + codeName + " can not be dublicated" };
                    // Errors.Add(errorInfo);
                }
            }
            if (type == "ParticipantCode")
            {
                var lstParticipanctCode = _context.TblParticipantMaster.Select(s => s.ParticipantCode).ToList();
                if (lstParticipanctCode.Contains(codeName) == true)
                {
                    validationResponse.ResponseMessage = $"Participant Code " + codeName + " can not be dublicated";

                    //    ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = "Participant Code " + codeName + " can not be dublicated" };
                    //  Errors.Add(errorInfo);
                }
            }
            if (type == "ParticipantBranchCode")
            {
                var lstParticipanctBranchCode = _context.TblParticipantBranch.Select(s => s.BranchCode).ToList();
                if (lstParticipanctBranchCode.Contains(codeName) == true)
                {
                    validationResponse.ResponseMessage = $"Participant BranchCode " + codeName + " can not be dublicated";

                    // ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = "Participant BranchCode " + codeName + " can not be dublicated" };
                    //Errors.Add(errorInfo);
                }
            }
            if (type == "RetentionGroupName")
            {
                var lstRetentionGroupName = _context.TblRetentionGroup.Select(s => s.RetentionGroupName).ToList();
                if (lstRetentionGroupName.Contains(codeName) == true)
                {
                    validationResponse.ResponseMessage = $"Retention GroupName " + codeName + " can not be dublicated";

                    // ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = "Retention GroupName " + codeName + " can not be dublicated" };
                    // Errors.Add(errorInfo);
                }
            }

            return new ValidationResponse { Status = BusinessStatus.InputValidationFailed, ResponseMessage=validationResponse.ResponseMessage};
        }
    }

}

