using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Models
{
    //for Quotation 
    public class NotificationRequest
    {
        public string TemplateKey { get; set; }
        public string NotificationPayload { get; set; }
        public bool SendSms { get; set; }
        public bool SendEmail { get; set; }
        public bool IsEmailBody { get; set; }
        public bool AttachPDF { get; set; }
        public bool IsAwsS3Save { get; set; }
        public bool IsAzureBlobSave { get; set; }
        public string StorageName { get; set; }
    }
    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string PartnerEmail { get; set; }
        public bool IsAttachment { get; set; }
    }
    public class QuotationModel
    {
        public QuotationModel()
        {

        }
        public string ProposerName { get; set; }
        public string Type { get; set; }
        public string QuotationNo { get; set; }
        public DateTime? Date { get; set; }
        public EmailRequest EmailTest { get; set; }
        public decimal PaperSetFrom { get; set; }
        public decimal PaperSetTo { get; set; }
        public bool IsAwsS3Save { get; set; }
        public bool IsAzureBlobSave { get; set; }
    }

    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string Label { get; set; }
        public string name { get; set; }
        public string value { get; set; }
        public string mType { get; set; }
    }
    public class LeadResponse : ResponseStatus
    {
        public LeadDTO product { get; set; }
    }
    public partial class LeadDTO
    {
        public int ContactID { get; set; }
        public int? ContactTypeId { get; set; }
        public string ContactType { get; set; }
        public string Salutation { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string Work { get; set; }
        public string EmailID { get; set; }
        public string NICNO { get; set; }
        public string Place { get; set; }
        public string PassportNo { get; set; }
        public string LeadNo { get; set; }
        public DateTime LeadDate { get; set; }
        
        public string Currency { get; set; }
        public string Gender { get; set; }
        public decimal? MaritalStatusID { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int Age { get; set; }
        public int OccupationID { get; set; }
        public string MonthlyIncome { get; set; }
        //public int AddressID { get; set; }
        public string SpouseName { get; set; }
        public DateTime? SpouseDob { get; set; }
        public int? SpouseAge { get; set; }
        public DateTime? CreationDate { get; set; }

        public virtual AddressDTO Address { get; set; }
        public virtual opportunityDTO opportunity { get; set; }
        

    }

    public partial class AddressDTO
    {
        internal object address;
        internal object city;
        internal object district;
        internal object areaId;

        public decimal AddressId { get; set; }
        public int AddressTypeId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }
        public string Country { get; set; }
        public string District { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Status { get; set; }
        public decimal? SourceRowId { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public int? AreaId { get; set; }
    }

    public partial class LifeQqDTO
    {

        public int LifeQqid { get; set; }
        public int VersionNo { get; set; }
        public int ContactId { get; set; }
        public int? PolicyTermId { get; set; }
        public int? ProductNameId { get; set; }
        public decimal? QqSumAssured { get; set; }
        public int? PremiumPayingTermId { get; set; }
        public bool? IsActive { get; set; }
        public int? PremiumTerm { get; set; }
        public int? NeedId { get; set; }
        public string QuoteNo { get; set; }
        public int? StatusId { get; set; }
        public string PreferredTerm { get; set; }
        public DateTime? CreateDate { get; set; }
        public string AnnualPremium { get; set; }
        public string HalfyearlyPremium { get; set; }
        public string QuarterlyPremium { get; set; }
        public string Monthly { get; set; }
        public string Vat { get; set; }
        public string Cess { get; set; }
        public string PolicyFee { get; set; }
        public string Createdby { get; set; }
        public string AllocatedFrom { get; set; }
        public int PlanId { get; set; }
        public string PlanCode { get; set; }
        public int? NoOfChild { get; set; }
        public string PreferredLanguage { get; set; }
        public int? PensionPeriod { get; set; }
        public bool? SelfPay { get; set; }
        public bool? IsFamilyFloater { get; set; }
        public bool? Deductable { get; set; }
        public int? DrawDownPeriod { get; set; }
        public int? RetirementAge { get; set; }
        public int? MonthlySurvivorIncome { get; set; }
        public int? Sam { get; set; }
        public int? AnnualizePremium { get; set; }
        public string Qtype { get; set; }
        public string OnGoingProposalWithAia { get; set; }
        public string PreviousPolicyWithAia { get; set; }
        public int? NoOfOnGoingProposalWithAia { get; set; }
        public int? NoOfPreviousPolicyWithAia { get; set; }
        public byte[] ProspectSignature { get; set; }
        public string ProposerSignPath { get; set; }
        public byte[] Wpsignature { get; set; }
        public string WppsignPath { get; set; }
        public string SignType { get; set; }
        public string MaturityBenifits { get; set; }
        public string RefNo { get; set; }
        public string IsAfc { get; set; }
        public string ModalPremium { get; set; }
        public bool? IsTopUp { get; set; }
        public string SurrenderYear { get; set; }
        public bool? IsSurrender { get; set; }
        public DateTime? RiskCommencementDate { get; set; }

        public virtual LeadDTO Contact { get; set; }

    }

    public partial class QuotePoolDTO
    {
        public string ContactType { get; set; }
        public string QuoteNo { get; set; }
        public string ProposerName { get; set; }
        public string EmiratesID { get; set; }
        public DateTime? CreateDate { get; set; }
        public string LeadNo { get; set; }
    }
    public class ProspectDTO
    {
        public ProspectDTO()
        {

            ObjProspectPool = new List<ProspectPoolDTO>();
            //na
            objPreviousInsuranceList = new List<PreviousInsuranceListDTO>();
            //na
        }
        public List<ProspectPoolDTO> ObjProspectPool { get; set; }
        //na
        public string fullName { get; set; }
        public List<PreviousInsuranceListDTO> objPreviousInsuranceList { get; set; }
        //public List<ProspectPoolDTO> ObjProspectPool { get; set; }
        public int ProspectStage { get; set; }
        public int ContactID { get; set; }
        public string CreatedBy { get; set; }
        public string Type { get; set; }
        public string Email { get; set; }
        public string Work { get; set; }
        public string Home { get; set; }
        public int? AgeNextBdy { get; set; }
        public int? CurrentAge { get; set; }
        public DateTime? DateofBirth { get; set; }
        public string Occupation { get; set; }
        public string Mobile { get; set; }
        public string ClientCode { get; set; }
        public string Nationality { get; set; }
        public string EmployerName { get; set; }
        public string NIC { get; set; }
        public bool BMI_Exceed { get; set; }
        public bool NICAVAIL { get; set; }
        public string Gender { get; set; }
        public string MaritalStatus { get; set; }
        public string DisplayMaritalStatus { get; set; }
        public string AvgMonthlyIncome { get; set; }
        public string Message { get; set; }
        public string AssignedTo { get; set; }
        public string IntroducerCode { get; set; }
        public NeedAnalysisDTO NeedAnalysisDTO { get; set; }
        public string Salutation { get; set; }
        public string PassPort { get; set; }
        public string Place { get; set; }
        public string SamsLeadNumber { get; set; }
        public AddressDTO objAddress { get; set; }


        private string _name;
        public string Name
        {
            get { return _name; }
            set { _name = string.IsNullOrEmpty(value) != true ? value.Trim() : value; }
        }

        private string _lastName;
        public string LastName
        {
            get { return _lastName; }
            set
            {
                _lastName = string.IsNullOrEmpty(value) != true ? value.Trim() : value;
            }
        }
        //na
    }


    public class ProspectPoolDTO
    {
        public int? ContactId { get; set; }
      
        public int? ProspectId { get; set; }
        public string ProspectType { get; set; }
        public string ProspectName { get; set; }
        public string ProspectLastName { get; set; }
        public string ProspectMobile { get; set; }
        public string ProspectHome { get; set; }
        public string ProspectWork { get; set; }
        public string ProspectEmail { get; set; }
        public string ProspectNicNo { get; set; }
        public string LeadNo { get; set; }
        public string LeadDate { get; set; }
        public string Dob { get; set; }
        public string Place { get; set; }
        public string Salutation { get; set; }
        public int ProspectDaysleft { get; set; }
        public string FullName { get; set; }
        //Na
        public int? contactID { get; set; }
        public int? AgeAtNxtBday { get; set; }


       public string Address1 { get; set; }
         public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string Pincode { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
        public string Occupation { get; set; }
        public string Salary { get; set; }
        public string Passport { get; set; }

    }

    public partial class opportunityDTO
    {
        public int OppurtunityId { get; set; }
        public int ContactId { get; set; }
        public int? NeedAnalysisId { get; set; }
        public int StageId { get; set; }
        public bool? IsDeleted { get; set; }
        public string AllocatedFrom { get; set; }
        public string Createdby { get; set; }

    }

    // RuleEngine Execution Through the Partner 
    public class GetRuleEngineResultValildate
    {
        public int RuleName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
    }
    public class ValidateResponse
    {
        public bool Result { get; set; }
    }

    public class GetRulesWithParameters
    {
        public int RuleId { get; set; }
        public string RuleName { get; set; }
        public string ParamName { get; set; }
    }
    public class GetRulesWithParametersDropDown
    {
        public int RuleId { get; set; }
        public string RuleName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string ConditionAttributes { get; set; }
        public string ParamName { get; set; }
        public string ConditionOperator { get; set; }
        public string ConditionValue { get; set; }
    }

    public class GetRuleMappingDetails
    {

        public decimal RuleMapId { get; set; }
        public decimal? RuleId { get; set; }
        public string Param1 { get; set; }
        public string Param2 { get; set; }
        public string MasterModel { get; set; }
        public string Action { get; set; }
        public DateTime? CreatedBy { get; set; }
        public string ModelName { get; set; }

    }


    //needAnalysis
    public class CalculatorDTO
    {
        public int ContactId { get; set; }
        public int? FromYear { get; set; }
        public int? ToYear { get; set; }
        public int? InflationRate { get; set; }
        public int? PlanNoYears { get; set; }
        public int? IntrestRate { get; set; }
        public long? TotalMonthlyExpense { get; set; }
        public long? EstimatedTotalMonthlyExpense { get; set; }


        public long? FoodExpense { get; set; }
        public long? WaterExpense { get; set; }
        public long? RentExpense { get; set; }
        public long? LeaseExpense { get; set; }
        public long? TransportExpense { get; set; }
        public long? MedicineExpense { get; set; }
        public long? EducationExpense { get; set; }
        public long? ClothesExpense { get; set; }
        public long? EntertainmentExpense { get; set; }
        public long? CharityExpense { get; set; }
        public long? OtherExpense { get; set; }
        public long? EstimatedFoodExpense { get; set; }
        public long? EstimatedWaterExpense { get; set; }
        public long? EstimatedRentExpense { get; set; }
        public long? EstimatedLeaseExpense { get; set; }
        public long? EstimatedTransportExpense { get; set; }
        public long? EstimatedMedicineExpense { get; set; }
        public long? EstimatedEducationExpense { get; set; }
        public long? EstimatedClothesExpense { get; set; }
        public long? EstimatedEntertainmentExpense { get; set; }
        public long? EstimatedCharityExpense { get; set; }
        public long? EstimatedOtherExpense { get; set; }
        public long? CurrentEPFBalance { get; set; }
        public long? EstimatedEPFBalance { get; set; }
        public long? CurrentETFBalance { get; set; }
        public long? EstimatedETFBalance { get; set; }
        public long? MonthlyAllocation20 { get; set; }
        public long? MonthlyAllocation3 { get; set; }
        public long? Salary { get; set; }

        public long? CurrentGratuityFund { get; set; }
        public long? EstimatedGratuityFund { get; set; }

        public long? TotalRetirementFund { get; set; }
        public long? FundBalanceTotal { get; set; }
        public long? PerAnnumIncome { get; set; }
        public long? Exsitingotherincome { get; set; }
        public long? EstimatedAnnuallivingExpenses { get; set; }
        public long? AnnualIncomeSurplus { get; set; }
        public long? MonthlyPensionGap { get; set; }
    }
    public class EstimateDetailsDTO
    {
        public int? AnnualLivingExpense { get; set; }
        public int? AnnualVacation { get; set; }
        public int? InstalmentsApartmentsVehicles { get; set; }
        public int? LoanPayment { get; set; }
        public int? OtherPayment { get; set; }
        public int? TotalAnnualExpense { get; set; }

        public int? Food { get; set; }
        public decimal? HouseElectricityWaterRent { get; set; }
        public decimal? Clothes { get; set; }

        public decimal? Transport { get; set; }
        public decimal? FamilyEducation { get; set; }
        public decimal? HealthCare { get; set; }

        public decimal? SpecialEvents { get; set; }
        public decimal? MaidAndOtherHelpers { get; set; }
        public decimal? OtherMontly { get; set; }
        public decimal? TotalMonthlyExp { get; set; }
        public decimal? MonthlyInstallments { get; set; }

    }
    public class PrevPolicyDTO
    {
        public long? MaturityFund { get; set; }
        public string PolicyNo { get; set; }
    }
    public class AssetsAndLiabilitiesDTO
    {
        public long? SurPlusAssets { get; set; }
        public long? NetAssests { get; set; }
        public decimal? LandOrHouse { get; set; }
        public decimal? MotorVehicle { get; set; }
        public decimal? BankDeposits { get; set; }
        public decimal? Investments { get; set; }
        public long? AssetsTotal { get; set; }
        public string MotorVehicleType { get; set; }
        public decimal? FixedDeposit { get; set; }
        public decimal? Shares { get; set; }
        public decimal? Jewellery { get; set; }
        public decimal? Loans { get; set; }
        public decimal? Mortgauges { get; set; }
        public decimal? leases { get; set; }
        public decimal? Insuredleases { get; set; }
        public decimal? others { get; set; }
        public decimal? Liab_Total { get; set; }
        public decimal? LiabilityOthers { get; set; }
        public int? InsuredLiabilityOthers { get; set; }
        public long? LumpsumRequirement { get; set; }
        public int MyProperty { get; set; }

        public long? LiabilityTotal { get; set; }
        public long? InsuredLiabilityTotal { get; set; }
        public int? Bank { get; set; }
        public int? InsuredBank { get; set; }
        public int? Borrowing { get; set; }
        public int? InsuredBorrowing { get; set; }


    }


    public class FamilyIncomeDTO
    {
        public int? AnnualSalary { get; set; }
        public int? AnnualInterest { get; set; }
        public long? IncomeLumpsumRequirement { get; set; }
        public decimal? ProspectMonthlyIncome { get; set; }
        public decimal? Rent { get; set; }
        public decimal? OtherIncome { get; set; }
        public long? TotalIncome { get; set; }
        public long? TotalExpense { get; set; }
        public decimal? SpouseMonthlyIncome { get; set; }
        public decimal? HouseHoldTotal { get; set; }
        public decimal? CapitalReq { get; set; }
        public decimal? PersonalLifeInsurance { get; set; }
        public decimal? SavingsAndInvestments { get; set; }
        public decimal? TotalProtection { get; set; }
        public decimal? GapIdentified { get; set; }
        public decimal TotalDeath { get; set; }
        public decimal TotalAccidental { get; set; }
        public decimal TotalCritical { get; set; }
        public decimal TotalHospitalization { get; set; }
        public decimal RateOfInterest { get; set; }
        public List<PrevInsuranceDetailsDTO> objLstPrevInsuranceDetails { get; set; }
        public bool? IsOtherInsurance { get; set; }
        public int? NoOfJanashaktiPolicy { get; set; }
        public int? NoOfOtherPolicies { get; set; }

    }

    public class PrevInsuranceDetailsDTO
    {
        public string Company { get; set; }
        public string PolicyOrProposalNo { get; set; }
        public string Death { get; set; }
        public string Accidental { get; set; }
        public string Critical { get; set; }
        public string Hospitalization { get; set; }
        public string CurrentStatus { get; set; }
        public bool IsDeleted { get; set; }
    }


    public class NeedsDTO
    {
        public int? EduRequirement { get; set; }
        public int? EduEstimate { get; set; }
        public int? EduFundBalance { get; set; }
        public int? EduGap { get; set; }
        public int? WeddingRequirement { get; set; }
        public int? WeddingEstimate { get; set; }
        public int? WeddingFundBalance { get; set; }
        public int? WeddingGap { get; set; }
        public int? PensionRequirement { get; set; }
        public int? PensionEstimate { get; set; }
        public int? PensionFundBalance { get; set; }
        public int? PensionGap { get; set; }
        public int? PropertyRequirement { get; set; }
        public int? PropertyEstimate { get; set; }
        public int? PropertyFundBalance { get; set; }
        public int? PropertyGap { get; set; }
        public int? OtherRequirement { get; set; }
        public int? OtherEstimate { get; set; }
        public int? OtherFundBalance { get; set; }
        public int? OtherGap { get; set; }
        public long? RequirementTotal { get; set; }
        public long? EstimateTotal { get; set; }
        public long? FundBalanceTotal { get; set; }
        public long? GapTotal { get; set; }

        public int PKNeedID { get; set; }
        public string NeedName { get; set; }
        public int NeedID { get; set; } // changed string to int
        public bool IsNeedOpted { get; set; }
        public string Value { get; set; }
        public string Priority { get; set; }
        public string PlanSuggested { get; set; }
        public string ImagePath { get; set; }
    }
    public class GCEALDTO
    {
        public long? CurrRequirement { get; set; }
        public int? Term { get; set; }
        public int? MaturityAge { get; set; }
        public long? EstAmount { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class LocalStudiesDTO
    {
        public long? CurrRequirement { get; set; }
        public int? Term { get; set; }
        public int? MaturityAge { get; set; }
        public long? EstAmount { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class HigherEduDegreeDTO
    {
        public long? CurrRequirement { get; set; }
        public int? MaturityAge { get; set; }
        public int? Term { get; set; }
        public long? EstAmount { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class HigherForeignDegreeDTO
    {
        public long? CurrRequirement { get; set; }
        public int? MaturityAge { get; set; }
        public int? Term { get; set; }
        public long? EstAmount { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class WeddingDTO
    {
        public long? CurrRequirement { get; set; }
        public int? Term { get; set; }
        public long? EstAmount { get; set; }
        public int? MaturityAge { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class HouseDTO
    {
        public long? CurrRequirement { get; set; }
        public int? Term { get; set; }
        public long? EstAmount { get; set; }
        public int? MaturityAge { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class CarDTO
    {
        public long? CurrRequirement { get; set; }
        public int? Term { get; set; }
        public long? EstAmount { get; set; }
        public int? MaturityAge { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class ForeignTourDTO
    {
        public long? CurrRequirement { get; set; }
        public int? Term { get; set; }
        public long? EstAmount { get; set; }
        public int? MaturityAge { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class OthersDTO
    {
        public long? CurrRequirement { get; set; }
        public int? Term { get; set; }
        public long? EstAmount { get; set; }
        public int? MaturityAge { get; set; }
        public long? AvailableFund { get; set; }
        public long? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
    }
    public class FinancialNeedsDTO
    {
        public long? CurrReq { get; set; }
        public long? EstAmount { get; set; }
        public long? FundBalance { get; set; }
        public string Relationship { get; set; }
        public string ImagePath { get; set; }
        public string Name { get; set; }
        public long? Gap { get; set; }

    }
    public class DependantsDTO
    {
        public string Name { get; set; }
        public DateTime? DOB { get; set; }
        public int? AgeNextBirthday { get; set; }
        public string Relationship { get; set; }
    }
    public class PreviousInsuranceListDTO
    {
        public string NameOfTheComp { get; set; }
        public string PolicyNumber { get; set; }
        public string SumAssured { get; set; }
        public string AnnualPremium { get; set; }
        public string Deathbenifit { get; set; }
        public string IllNessBenifit { get; set; }
        public string PermanentDisability { get; set; }
        public string HospitalizationPerDay { get; set; }
        public string status { get; set; }
    }
    public class MasterListItemDTO
    {
        public Int32 ID { get; set; }
        public string Value { get; set; }

        public string Text { get; set; }
        public int selected { get; set; }

    }
    public class HealthCalDTO
    {
        public long? CriticalRequiremenent { get; set; }
        public long? CriticalFund { get; set; }
        public long? CriticalGap { get; set; }
        public long? HospitalizationRequiremenent { get; set; }
        public long? HospitalizationFund { get; set; }
        public long? HospitalizationGap { get; set; }
        public long? additionalexpenseRequiremenent { get; set; }
        public long? additionalexpenseFund { get; set; }
        public long? additionalexpenseGap { get; set; }
        public string[] objadversities { get; set; }
        public string objcoverage { get; set; }
        public string objadequacy { get; set; }
        public string HospitalBills { get; set; }
        public string objannualamount { get; set; }
        public string HospitalRtrExp { get; set; }
        public string HealthAdversities { get; set; }
        public string AnnualAmountHealthExp { get; set; }


        public string AvailableAnnualAmount { get; set; }
        public string Coverage { get; set; }
        public string Adequecy { get; set; }


    }
    public class NeedAnalysisDTO
    {
        public NeedAnalysisDTO()
        {
           // objSpouseDetails = new SpouseDetailsDTO();
           // objDependents = new List<DependentsDTO>();
            objFamilyIncome = new FamilyIncomeDTO();
            objCalculator = new CalculatorDTO();
            objGCEAL = new List<GCEALDTO>();
            objLocal = new List<LocalStudiesDTO>();
            objHigherEdu = new List<HigherEduDegreeDTO>();
            objHigherForeign = new List<HigherForeignDegreeDTO>();
            objWedding = new List<WeddingDTO>();
            objHouse = new List<HouseDTO>();
            objCar = new List<CarDTO>();
            objForeignTour = new List<ForeignTourDTO>();
            objOthers = new List<OthersDTO>();
            objFinancialNeeds = new List<FinancialNeedsDTO>();
            objDependants = new List<DependantsDTO>();
            objFinancialNeed = new NeedsDTO();
            objAssetsAndLiabilities = new AssetsAndLiabilitiesDTO();
            objNeeds = new List<NeedsDTO>();
            //dllChildRelatioship = new List<Common.MasterListItem>();
            dllChildName = new List<MasterListItemDTO>();
            objPrevPolicy = new List<PrevPolicyDTO>();
        }
        public List<MasterListItemDTO> dllChildName { get; set; }
        public string Stage { get; set; }
        //public List<MasterListItem> dllChildName { get; set; }
        public int? DependantCount { get; set; }
        public List<GCEALDTO> objGCEAL { get; set; }
        public List<LocalStudiesDTO> objLocal { get; set; }
        public List<HigherEduDegreeDTO> objHigherEdu { get; set; }
        public List<HigherForeignDegreeDTO> objHigherForeign { get; set; }
        public List<WeddingDTO> objWedding { get; set; }
        public List<HouseDTO> objHouse { get; set; }
        public List<CarDTO> objCar { get; set; }
        public List<ForeignTourDTO> objForeignTour { get; set; }
        public List<OthersDTO> objOthers { get; set; }
        public List<FinancialNeedsDTO> objFinancialNeeds { get; set; }
        public List<DependantsDTO> objDependants { get; set; }
     //   public FutureFinancialDTO objFutureFinancial { get; set; }
        public bool chkRetirement1 { get; set; }
        public bool chkRetirement2 { get; set; }
        public bool chkRetirement3 { get; set; }
        public bool chkRetirement4 { get; set; }
        public bool chkRetirement5 { get; set; }
        public bool chkHealth1 { get; set; }
        public bool chkHealth2 { get; set; }
        public bool chkHealth3 { get; set; }
        public bool chkHealth4 { get; set; }
        public bool chkHealth5 { get; set; }
        public bool chkProtection1 { get; set; }
        public bool chkProtection2 { get; set; }
        public bool chkProtection3 { get; set; }
        public bool chkProtection4 { get; set; }
        public bool chkProtection5 { get; set; }
        public bool chkSaving1 { get; set; }
        public bool chkSaving2 { get; set; }
        public bool chkSaving3 { get; set; }
        public bool chkSaving4 { get; set; }
        public bool chkSaving5 { get; set; }
        public bool chkconfirm { get; set; }
        public bool chkprodconfirm { get; set; }
        public bool chkEducation1 { get; set; }
        public bool chkEducation2 { get; set; }
        public bool chkEducation3 { get; set; }
        public bool chkEducation4 { get; set; }
        public bool chkEducation5 { get; set; }


        public long? Financial0 { get; set; }
        public long? Financial1 { get; set; }
        public long? Financial2 { get; set; }
        public long? Financial3 { get; set; }
        public long? Financial4 { get; set; }
        public long? Assets0 { get; set; }
        public long? Assets1 { get; set; }
        public long? Assets2 { get; set; }
        public long? Assets3 { get; set; }
        public long? Assets4 { get; set; }
        public long? Assets5 { get; set; }
        public long? Liabilityone0 { get; set; }
        public long? Liabilityone1 { get; set; }
        public long? Liabilityone2 { get; set; }
        public long? Liabilityone3 { get; set; }

        public long? Liabilitytwo0 { get; set; }
        public long? Liabilitytwo1 { get; set; }
        public long? Liabilitytwo2 { get; set; }
        public long? Liabilitytwo3 { get; set; }
        public long? Liabilitytwo4 { get; set; }
        public long? Liabilitytwo5 { get; set; }
        public long? Income0 { get; set; }
        public long? Income1 { get; set; }
        public long? Income2 { get; set; }
        public long? Income3 { get; set; }
        public long? Expense0 { get; set; }
        public long? Expense1 { get; set; }
        public long? Expense2 { get; set; }
        public long? Expense3 { get; set; }
        public long? Expense4 { get; set; }
        public long? Expense5 { get; set; }
        public long? SavingTarget { get; set; }
        public int? ProIntrestRate { get; set; }
        //public List<MasterListItem> dlladversities { get; set; }
        //public List<MasterListItem> dllcoverage { get; set; }
        //public List<MasterListItem> dllannualamount { get; set; }
        //public List<MasterListItem> dllChildRelatioship { get; set; }
        //public List<MasterListItem> dlladequacy { get; set; }
        //public List<MasterListItem> dllRelationship { get; set; }
       // public List<SaveRowDTO> objSaveRow { get; set; }
        public string[] objadversities { get; set; }
        public string adversities { get; set; }
        public string objannualamount { get; set; }
        public string objcoverage { get; set; }
        public string objadequacy { get; set; }

        public long? EduGapTotal { get; set; }
        public long? SavingGapTotal { get; set; }
        public long? SavingReqTotal { get; set; }
        public long? SavingEstTotal { get; set; }
        public long? SavingCurrentTotal { get; set; }
        public long? EduLumpSum { get; set; }
        public long? EduMaturity { get; set; }
        public long? MonthlyEduExpense { get; set; }
        public long? AnnualEduExpense { get; set; }
        public long? AnnualSaveExpense { get; set; }
        public long? MonthlySaveExpense { get; set; }
        public int? EduInflationRate { get; set; }
        public int? SavInflationRate { get; set; }
        public long? MonthlyEarning { get; set; }
        public int? YearsofEarning { get; set; }
        public long? EstimatedIncome { get; set; }
        public long? FutureFund { get; set; }
        public long? AvailableFund { get; set; }
        public long? EmergencyFund { get; set; }
        public long? CriticalRequiremenent { get; set; }
        public long? CriticalFund { get; set; }
        public long? CriticalGap { get; set; }
        public long? HospitalizationRequiremenent { get; set; }
        public long? HospitalizationFund { get; set; }
        public long? HospitalizationGap { get; set; }
        public long? additionalexpenseRequiremenent { get; set; }
        public long? additionalexpenseFund { get; set; }
        public long? additionalexpenseGap { get; set; }
        public int NeedAnalysisID { get; set; }
        public DateTime? ProspectDOB { get; set; }
      //  public SpouseDetailsDTO objSpouseDetails { get; set; }
        public CalculatorDTO objCalculator { get; set; }
      //  public List<DependentsDTO> objDependents { get; set; }
        public EstimateDetailsDTO objEstimateDetails { get; set; }
        public AssetsAndLiabilitiesDTO objAssetsAndLiabilities { get; set; }
        public FamilyIncomeDTO objFamilyIncome { get; set; }
        public List<NeedsDTO> objNeeds { get; set; }
        public NeedsDTO objFinancialNeed { get; set; }
        public string Total { get; set; }
        public string ProductSelected { get; set; }
        public string Comments { get; set; }
        public string NeedAnalysisFileAttachment { get; set; }
        public DateTime? DateOfNextMeeting { get; set; }
        public string TimeOfNextMeeting { get; set; }
        public string PurposeOfMeeting { get; set; }
        //public string PurposeOfMeeting1 { get; set; }
        public string UploadSignPath { get; set; }
        public string NotePadPath { get; set; }
        public string UploadDocPath { get; set; }
        public byte[] ProspectSign { get; set; }
        //public DateTime? CreatedDate { get; set; }
        public string SelectedProducts { get; set; }
        public string HospitalBills { get; set; }
        public string ByteArraygraph { get; set; }
        public string HospitalRtrExp { get; set; }
        public long? WealthRequirement { get; set; }
        public int? WealthRequirement2017 { get; set; }
        public long? LivingExpense { get; set; }
        public int? LivingExpense2017 { get; set; }
        public long? FinancialExpense { get; set; }
        public long? FinancialExpense2017 { get; set; }
        public long? TotalExpense { get; set; }
        public long? TotalExpense2017 { get; set; }
        public List<PrevPolicyDTO> objPrevPolicy { get; set; }
        public long? EmergencyFund1 { get; set; }
        public long? EmergencyFund2 { get; set; }
        public long? EmergencyFund3 { get; set; }
        public string Policy1 { get; set; }
        public string Policy2 { get; set; }
        public string Policy3 { get; set; }
        public long? MaturityFund1 { get; set; }
        public long? MaturityFund2 { get; set; }
        public long? MaturityFund3 { get; set; }
        public long? TotalEmergencyFund { get; set; }
        public long? TotalMaturityFund { get; set; }
        public long? EmergencyFundGap { get; set; }
        public long? MaturityFundGap { get; set; }
        public int? FNAFromYear { get; set; }
        public int? FNAToYear { get; set; }
        public int? FNAInflationRate { get; set; }
        public int? FNAPlanNoYear { get; set; }
        public int? FNAIntrestRate { get; set; }
        public int? CalculatorFromYear { get; set; }
        public int? CalculatorToYear { get; set; }
        public int? CalculatorInflationRate { get; set; }
        public int? CalculatorPlanNoYears { get; set; }
        public int? CalculatorIntrestRate { get; set; }
        public long? CriticalIllnessRequirement { get; set; }
        public long? HospitalRequirement { get; set; }
        public long? AdditionalRequirement { get; set; }
        public long? CriticalIllnessAvailable { get; set; }
        public long? HospitalAvailable { get; set; }
        public long? AdditionalAvailable { get; set; }
        public long? CriticalIllnessGap { get; set; }
        public long? HospitalGap { get; set; }
        public long? AdditionalGap { get; set; }
        public long? TotalRequirement { get; set; }
        public long? TotalAvailable { get; set; }
        public long? TotalGap { get; set; }
        public string TypeofHospitalization { get; set; }
    }
    public partial class ViewDetails
    {
        public ViewDetails()
        {
            suspect = new List<LeadDTO>();
            prospect = new List<LeadDTO>();

            quotationDtos = new List<QuotationDto>();
            proposalDtos = new List<ProposalDto>();

            policyDtos = new List<policyDto>();
           
        }

        public List<LeadDTO> suspect { get; set; }
        public List<LeadDTO> prospect { get; set; }

        public List<QuotationDto> quotationDtos { get; set; }
        public List<ProposalDto> proposalDtos { get; set; }

        public List<policyDto> policyDtos { get; set; }
       
    }
    public partial class StagContactId
    {
        public int? stagid { get; set; }
        public int? contactid { get; set; }
    }
    //Quotation
    public partial class QuotationDto
    {
        public string QuotNumber { get; set; }
        public string Name { get; set; }

        public string ContactNumner { get; set; }
        public string CityName { get; set; }
        public string MovedTo { get; set; }

        public int QuotationId { get; set; }
    }
    public partial class ProposalDto
    {
        public string ProposalNumber { get; set; }
        public string Name { get; set; }

        public string ContactNumner { get; set; }
        public string CityName { get; set; }
        public string MovedTo { get; set; }
        public int ProposalId { get; set; }
    }

    public partial class policyDto
    {
        public string PolicyNumber { get; set; }
        public int PolicyStatus { get; set; }
        public string Mode { get; set; }
        public string PremiumAmount { get; set; }
        public string ContactNumner { get; set; }
        public string CityName { get; set; }
        public string MovedTo { get; set; }
        public int PolicyId { get; set; }
    }
    //needAnalysis
    public class EmpHierarchy
    {
        public decimal ParentID { get; set; }
        public decimal PositionID { get; set; }
        public string StaffName { get; set; }
        public string Staffcode { get; set; }
        public string LevelDefinition { get; set; }
        public int LevelId { get; set; }
    }
}


