using AutoMapper;
using iNube.Services.Lead.Entities;
using iNube.Services.Lead.Models;
using iNube.Services.NeedAnalysis.Controllers.IntegrationServices;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Utility.Framework.Model;
using System;

namespace iNube.Services.NeedAnalysis.Controllers.NeedAnalysis.NeedAnalysisServices
{
    public interface INeedAnalysisService
    {

        //IEnumerable<LeadDTO> LoadContactInformation(int ContactId);
        //Task<List<LeadDTO>> LoadNACompletedInfo(int ContactID);
        List<ProspectPoolDTO> GetProspectPool(ApiContext context);
        IEnumerable<ProspectDTO> LoadPersonalInformation(int ContactID);
        int GetCurrentAge(DateTime? dob, DateTime? RiskCommencementdate = null);
        //List<NeedsDTO> GetNeedsData(ProspectDTO objProspect);
        List<CalculatorDTO> GetCalcRetirement(int contactId);
        List<HealthCalDTO> GetHealthCalc(int contactId);
        IEnumerable<ddDTO> GetMaster(string lMasterlist);
        IEnumerable<ddDTO> GetMasterData(string lMasterlist);
        

    }
    public class NeedAnalysisService : INeedAnalysisService
    {
        private AVOLMContext _context;
        private IMapper _mapper;
        private INAIntegrationService _integrationService;

        public NeedAnalysisService(AVOLMContext context, IMapper mapper, INAIntegrationService integrationService)
        {
            
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;

        }
        public IEnumerable<ddDTO> GetMasterData(string lMasterlist)
        {
            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblmasLdcommonTypes.Where(a=>a.MasterType == "Category")
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
            return ddDTOs;
        }
        public IEnumerable<ddDTO> GetMaster(string lMasterlist)
        {
            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblmasLdcommonTypes
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 Label =c.Value,
                 name = c.Value,
                 value = c.Value,
                 mType = c.MasterType
             });
            return ddDTOs;
        }
        //public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist)
        //{

        //    var ProspectRetData = await _integrationService.GetMaster(lMasterlist);

        //    //var RetMasData = _mapper.Map<List<ddDTO>>(ProspectRetData);

        //    return ProspectRetData;


        //}

        //public IEnumerable<LeadDTO> LoadContactInformation(int ContactId)
        //{
        //    IEnumerable<LeadDTO> PersonalInfo = _context.TblContacts.OrderByDescending(p => p.CreationDate)
        //                     .Select(c => new LeadDTO
        //                     {
        //                         // ContactTypeId = c.ContactTypeId,
        //                         ContactID = c.ContactId,
        //                         //ContactTypeId = c.ContactTypeId,
        //                         FirstName = c.FirstName,

        //                         Age = (int) c.Age,
        //                         DateOfBirth=c.DateOfBirth,
        //                         SpouseName =c.SpouseName,
        //                         SpouseAge=c.SpouseAge,
        //                         SpouseDob=c.SpouseDob,
        //                     })
        //                     .Where(p => p.ContactID == ContactId);
        //    var prospectpool = _mapper.Map<IEnumerable<LeadDTO>>(PersonalInfo);
        //    return PersonalInfo;

        //}
        public int GetCurrentAge(DateTime? dob, DateTime? RiskCommencementdate = null)
        {
            string Now = "";
            DateTime dt = RiskCommencementdate ?? DateTime.Now;

            DateTime DateOfBirth = DateTime.Now;
            if (dob != null)
            {
                DateOfBirth = Convert.ToDateTime(dob);
            }
            else
            {
                return 0;
            }
            string Dob = DateOfBirth.ToString("dd/MM/yyyy");

            //int Days = (DateTime.Now - DateOfBirth).Days;
            //return Days;            
            Now = dt.ToString("dd/MM/yyyy");
            var arr1 = Now.Split('-');
            var arr = Dob.Split('-');
            var birthYear = arr[2];
            var birthMonth = arr[1];
            var birthdate = arr[0];
            var Year = arr1[2];
            var Month = arr1[1];
            var date = arr1[0];
            var calYear = Convert.ToInt32(Year) - Convert.ToInt32(birthYear);
            var CalMonth = Convert.ToInt32(Month) - Convert.ToInt32(birthMonth);// monthDiff(BirthDate,dt); //              
            //var calcAge = 0;
            if (CalMonth < 0 || (CalMonth == 0 && Convert.ToInt32(date) < Convert.ToInt32(birthdate)))
            {
                calYear--;
            }
            return calYear + 1;
        }

        //public List<NeedsDTO> GetNeedsData(ProspectDTO objProspect)
        //{
        //    //AVOAIALifeEntities Context = new AVOAIALifeEntities();
        //    var objtblMasNeeds = (from e in _context.TblMasNeeds
        //                          select e).ToList();

        //    foreach (var item in objtblMasNeeds)
        //    {
        //        NeedsDTO objMassNeeds = new NeedsDTO();

        //        objMassNeeds.NeedID = Convert.ToInt32(item.NeedId);
        //        objMassNeeds.NeedName = item.NeedName;
        //        objMassNeeds.Priority = "";
        //        objMassNeeds.Value = "";
        //        objMassNeeds.IsNeedOpted = false;
        //        objMassNeeds.PlanSuggested = item.SuggestedProductName;
        //        objMassNeeds.ImagePath = item.ImagePath;
        //        objProspect.NeedAnalysisDTO.objNeeds.Add(objMassNeeds);
        //    }
        //    return objProspect.NeedAnalysisDTO.objNeeds;
        //}
        public string[] GetString(string str)
        {
            string[] res;
            if (str != null)
            {
                res = str.Split(',');
            }
            else
            {
                res = null;
            }
            return res;
        }



        public IEnumerable<ProspectDTO> LoadPersonalInformation(int ContactID)
        {
            IEnumerable<ProspectDTO> PersonalInfo = _context.TblContacts.Where(p => p.ContactId == ContactID)
                             .Select(c => new ProspectDTO
                             {
                                 // ContactTypeId = c.ContactTypeId,
                                 ContactID = c.ContactId,
                                 Type = c.ContactType,
                                 Name = c.FirstName,
                                 LastName = c.LastName,
                                 Email = c.EmailId,
                                 Mobile = c.MobileNo,
                                 Home = c.PhoneNo,
                                 Work = c.Work,
                                 AgeNextBdy = Convert.ToInt32(c.Age),
                                 CurrentAge = Convert.ToInt32(c.CurrentAge),
                                 ClientCode = c.ClientCode,
                                 DateofBirth = c.DateOfBirth,
                                 fullName = c.FirstName + c.LastName,
        });
            var prospectpool = _mapper.Map<IEnumerable<ProspectDTO>>(PersonalInfo);
            return PersonalInfo;

            
        }

        public List<ProspectPoolDTO> GetProspectPool( ApiContext context)
        {
           
            ProspectDTO prospectDTO = new ProspectDTO();
            //string userId = Common.CommonBusiness.GetUserId(objProspect.CreatedBy);
            string userId = context.UserId;
            //AVOAIALifeEntities Context = new AVOAIALifeEntities();
            List<ProspectPoolDTO> objLstProspectPoolDTO = (from Opportunity in _context.TblOpportunity//.Where(a => a.StageId == 2 && a.IsDeleted != true )//|| a.Createdby == userId)
                                                           join Contact in _context.TblContacts//.Where(b => b.CreatedBy == userId)
                                                           on Opportunity.ContactId equals Contact.ContactId
                                                           join objtblAddress in _context.TblAddress
                                                           on Contact.AddressId equals objtblAddress.AddressId
                                                           orderby Contact.ContactId descending
                                                           select new ProspectPoolDTO
                                                           {

                                                               ContactId = Contact.ContactId,
                                                               // ProspectId = Contact.P,
                                                               ProspectType = Contact.ContactType,
                                                               ProspectName = Contact.FirstName,
                                                               ProspectLastName = Contact.LastName,
                                                               Salutation = _context.TblMasCommonTypes.Where(a => a.CommonTypesId.ToString() == Contact.Salutation).Select(b => b.Description).FirstOrDefault(),
                                                               ProspectMobile = Contact.MobileNo,
                                                               ProspectHome = Contact.PhoneNo,
                                                               ProspectWork = Contact.Work,
                                                               ProspectEmail = Contact.EmailId,
                                                               ProspectNicNo = Contact.Nicno,
                                                               LeadNo = Contact.LeadNo,
                                                               Place = Contact.Place,
                                                               AgeAtNxtBday = Contact.Age,
                                                               LeadDate = Contact.CreationDate.ToString(),
                                                               // Dob = Contact.DateOfBirth.ToString().ToDate().ToString("dd/MM/yyyy"),
                                                               Dob = Contact.DateOfBirth.ToString(),
                                                               ProspectDaysleft = 3,
                                                               //FullName = Contact.FirstName +Contact.LastName,
                                                               FullName = _context.TblMasCommonTypes.Where(a => a.Code == Contact.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + Contact.FirstName + " " + Contact.LastName,
                                                               Address1 = objtblAddress.Address1,
                                                               Address2 = objtblAddress.Address2,
                                                               Address3 = objtblAddress.Address3,
                                                               City = objtblAddress.City,
                                                               Pincode = objtblAddress.Pincode,
                                                               District = objtblAddress.District,
                                                               Province = objtblAddress.State,
                                                               Occupation = _context.TblMasCommonTypes.Where(a => a.CommonTypesId == Contact.OccupationId).Select(b => b.Description).FirstOrDefault(),
                                                               Salary = Contact.MonthlyIncome,
                                                               Passport=Contact.PassportNo,


                                                           }).ToList();

            foreach (var obj in objLstProspectPoolDTO)
            {
                obj.Dob = obj.Dob;
                obj.LeadDate = obj.LeadDate;
            }

            return objLstProspectPoolDTO;

        }

        public List<CalculatorDTO> GetCalcRetirement(int contactId)
        {
            ProspectDTO prospectDTO = new ProspectDTO();
            List<CalculatorDTO> retirment = (from Opportunity in _context.TblOpportunity.Where(a => a.ContactId == contactId)
                                                                                         //.Where(a => a.StageId == prospectDTO.ProspectStage && a.IsDeleted != true )

                                             join Contact in _context.TblContacts//.Where(b => b.CreatedBy == userId)
                                             on Opportunity.ContactId equals Contact.ContactId
                                             join objretirementCals in _context.TblNeedRetirementCalculator
                                             on Opportunity.NeedAnalysisId equals objretirementCals.NeedAnalysisId
                                             orderby Contact.ContactId descending
                                             select new CalculatorDTO
                                             {
                                                
                                                 // ContactTypeId = c.ContactTypeId
                                                 ContactId = Contact.ContactId,
                                                 FromYear = objretirementCals.FromYear,
                                                 ToYear = objretirementCals.ToYear,
                                                 InflationRate = objretirementCals.InflationRate,
                                                 PlanNoYears = objretirementCals.PlanNoYears,
                                                 IntrestRate = objretirementCals.IntrestRate,
                                                 TotalMonthlyExpense = Convert.ToInt64( objretirementCals.TotalMonthlyExp),
                                                 EstimatedTotalMonthlyExpense = Convert.ToInt64(objretirementCals.EstMonthlyExp),
                                                 FoodExpense = (int)objretirementCals.CurrentFoodExp,
                                                 EstimatedFoodExpense = Convert.ToInt64(objretirementCals.EstFoodExp),
                                                 WaterExpense = Convert.ToInt64(objretirementCals.EstWaterExp),
                                                 EstimatedWaterExpense = Convert.ToInt64(objretirementCals.EstWaterExp),
                                                 RentExpense = Convert.ToInt64(objretirementCals.CurrentRentExp),
                                                 EstimatedRentExpense = Convert.ToInt64(objretirementCals.EstRentExp),
                                                 LeaseExpense = Convert.ToInt64(objretirementCals.CurrentLeaseExp),
                                                 EstimatedLeaseExpense = Convert.ToInt64(objretirementCals.EstLeaseExp),
                                                 TransportExpense = Convert.ToInt64(objretirementCals.CurrentTransportExp),
                                                 EstimatedTransportExpense = Convert.ToInt64(objretirementCals.EstTransportExp),
                                                 MedicineExpense = Convert.ToInt64(objretirementCals.CurrentMedExp),
                                                 EstimatedMedicineExpense = Convert.ToInt64(objretirementCals.EstMedExp),
                                                 EducationExpense = Convert.ToInt64(objretirementCals.CurrentEduExp),
                                                 EstimatedEducationExpense = Convert.ToInt64(objretirementCals.EstEduExp),
                                                 ClothesExpense = Convert.ToInt64(objretirementCals.CurrentClothesExp),
                                                 EstimatedClothesExpense = Convert.ToInt64(objretirementCals.EstClothesExp),
                                                 EntertainmentExpense = Convert.ToInt64(objretirementCals.CurrentEntertainmentExp),
                                                 EstimatedEntertainmentExpense = Convert.ToInt64(objretirementCals.EstEntertainmentExp),
                                                 CharityExpense = Convert.ToInt64(objretirementCals.CurrentCharity),
                                                 EstimatedCharityExpense = Convert.ToInt64(objretirementCals.EstCharity),
                                                 OtherExpense = Convert.ToInt64(objretirementCals.CurrentOtherExp),
                                                 EstimatedOtherExpense = Convert.ToInt64(objretirementCals.EstOtherExp),

                                                 Salary = Convert.ToInt64(objretirementCals.CurrentMonthlySalary),
                                                 CurrentEPFBalance = Convert.ToInt64(objretirementCals.CurrentEpfbalance),
                                                 EstimatedEPFBalance = Convert.ToInt64(objretirementCals.EstEpfbalance),
                                                 MonthlyAllocation20 = Convert.ToInt64(objretirementCals.CurrentMonthly20Sal),
                                                 CurrentETFBalance = Convert.ToInt64(objretirementCals.CurrentEtfbalance),
                                                 EstimatedETFBalance = Convert.ToInt64(objretirementCals.EstEtfbalance),
                                                 MonthlyAllocation3 = Convert.ToInt64(objretirementCals.CurrentMonthly3Sal),
                                                 CurrentGratuityFund = Convert.ToInt64(objretirementCals.CurrentGratuityFund),
                                                 EstimatedGratuityFund = Convert.ToInt64(objretirementCals.EstGratuityFund),
                                                 TotalRetirementFund = Convert.ToInt64(objretirementCals.TotalEstMonthlyExpFund)
                                                


                                             }).ToList();

            // var retirementData = _mapper.Map<IEnumerable<CalculatorDTO>>(retirment);
            return retirment;


        }

        public List<HealthCalDTO> GetHealthCalc(int contactId)
        {
            List<HealthCalDTO> Health = (from Opportunity in _context.TblOpportunity.Where(a => a.ContactId == contactId)
                                                 //.Where(a => a.StageId == prospectDTO.ProspectStage && a.IsDeleted != true )
                                             join Contact in _context.TblContacts//.Where(b => b.CreatedBy == userId)
                                             on Opportunity.ContactId equals Contact.ContactId
                                             join objhealthCals in _context.TblNeedHealthCalculator
                                             on Opportunity.NeedAnalysisId equals objhealthCals.NeedAnalysisId
                                             orderby Contact.ContactId descending
                                             select new HealthCalDTO
                                             {
                                             
                                                CriticalRequiremenent =Convert.ToInt64(objhealthCals.CriticalillnessReq),
                                                CriticalFund = Convert.ToInt64(objhealthCals.CriticalIllenssFund),
                                                CriticalGap = Convert.ToInt64(objhealthCals.CriticalIllnessGap),
                                                HospitalizationRequiremenent = Convert.ToInt64(objhealthCals.HospReq),
                                                HospitalizationFund = Convert.ToInt64(objhealthCals.HospFund),
                                                HospitalizationGap = Convert.ToInt64(objhealthCals.HospGap),
                                                additionalexpenseRequiremenent = Convert.ToInt64(objhealthCals.AddLossReq),
                                                additionalexpenseFund = Convert.ToInt64(objhealthCals.AddLossFund),
                                                additionalexpenseGap = Convert.ToInt64(objhealthCals.AddLossGap),
                                                objadversities = GetString(objhealthCals.HealthAdversities),
                                                objannualamount = objhealthCals.AnnualAmountHealthExp,
                                                objcoverage = objhealthCals.CoverageHealthExp,
                                                objadequacy = objhealthCals.AdequacyHealthExp,
                                                HospitalBills = objhealthCals.HospitalBills,
                                                HospitalRtrExp = objhealthCals.HospRetireExp,
                                                
                                             
                                             }).ToList();
            //HealthCalDTO healthCalDTO = new HealthCalDTO();
            //if (healthCalDTO.objadversities != null)
            //{
            //    healthCalDTO.HealthAdversities = String.Join(",", healthCalDTO.objadversities);
            //}
            //healthCalDTO.AnnualAmountHealthExp = objProspect.objNeedAnalysis.objannualamount;
            //objHealth.CoverageHealthExp = objProspect.objNeedAnalysis.objcoverage;
            //objHealth.AdequacyHealthExp = objProspect.objNeedAnalysis.objadequacy;
            //if ((objProspect.objNeedAnalysis.CriticalGap != null && objProspect.objNeedAnalysis.CriticalGap != 0) && (objProspect.objNeedAnalysis.HospitalizationGap != null && objProspect.objNeedAnalysis.HospitalizationGap != 0) && (objProspect.objNeedAnalysis.additionalexpenseGap != null && objProspect.objNeedAnalysis.additionalexpenseGap != 0))
            //{
            //    IsSuspectComplete = true;
            //}

            //objNeedAnalysis.tblNeedHealthCalculators.Add(objHealth);

            // var retirementData = _mapper.Map<IEnumerable<CalculatorDTO>>(retirment);
            return Health;

           
        }

     

    }
}
