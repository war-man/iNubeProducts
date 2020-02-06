using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace iNube.Services.Quotation.Models
{



    public partial class AVOProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public int? TypeOfProductId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public bool? IsActive { get; set; }
        public decimal? MinMonthlyPremium { get; set; }
        public decimal? MinQuarterlyPremium { get; set; }
        public decimal? MinHalfYearlyPremium { get; set; }
        public decimal? MinAnnualPremium { get; set; }
        public decimal? MinBasicSumAssured { get; set; }
        public int? Priority { get; set; }
        public string MinSurrenderYear { get; set; }
        public string MinTopUpYear { get; set; }

    }


    public class LifeQuoteDTO
    {
        public LifeQuoteDTO()
        {

              objProspect = new ProspectDTO();
              ObjQuotationPreviousInsurance = new QuotationPreviousInsuranceDTO();
        //    lstGender = new List<Common.MasterListItem>();
        //    lstOccupation = new List<Common.MasterListItem>();
              objProductDetials = new ProductDetialsDTO();
              objQuoteMemberDetails = new List<QuoteMemberDetailsDTO>();
            //    LstBenefitOverView = new List<BenifitDetails>();
            //    LstPremiumOverview = new List<BenifitDetails>();

            ////LstIllustation is Missing from the AVO Product Model 

                LstIllustation = new List<IllustationDTO>();
            //    objQuoteMemberDetails = new List<QuoteMemberDetails>();
            //    ListPlan = new List<MasterListItem>();
            //    LstPolicyTerm = new List<MasterListItem>();
            //    LstPremiumTerm = new List<MasterListItem>();
            //    lstLanguage = new List<MasterListItem>();
            //    lstPrefMode = new List<MasterListItem>();
            //    LstBenefitOverView = new List<BenifitDetails>();
            //    LstPremiumOverview = new List<BenifitDetails>();
            //    lstSumInsured = new List<MasterListItem>();
            //    objPreviousInsuranceList = new List<PreviousInsuranceList>();
            objChildDetials = new List<ChildDetailsDTO>();
            objSpouseDetials = new SpouseDetailsDTO();
        //    lstSAM = new List<MasterListItem>();
        //    Error = new Error();
        //    LstDrawDownDetails = new List<Common.DrawDownDetails>();
        }

        public string RefNo { get; set; }
        public string ServiceTraceID { get; set; }
        public QuotationPreviousInsuranceDTO ObjQuotationPreviousInsurance { get; set; }
        public bool IsForServices { get; set; }
        public int QuoteIndex { get; set; }
        public List<IllustationDTO> LstIllustation { get; set; }
        //public List<DrawDownDetails> LstDrawDownDetails { get; set; }
        public ProspectDTO objProspect { get; set; }
        public ProductDetialsDTO objProductDetials { get; set; }
        public int? Age { get; set; }
        public string QuotationType { get; set; }
        public string Cess { get; set; }
        public string PolicyFee { get; set; }
        public string VAT { get; set; }
        public string AnnualPremium { get; set; }
        public string HalfYearlyPremium { get; set; }
        public string QuaterlyPremium { get; set; }
        public string MonthlyPremium { get; set; }
        public string BasicSumInsured { get; set; }
        public string BasicPremium { get; set; }
        public int Contactid { get; set; }
        public bool IsSelfPay { get; set; }
        public bool IsSelfCovered { get; set; }
        public bool IsSpouseCovered { get; set; }
        public bool IsChildCovered { get; set; }
        public bool IsNeedsIdentified { get; set; }
        public bool IsModifyQuote { get; set; }
        public string NoofChilds { get; set; }
        public SpouseDetailsDTO objSpouseDetials { get; set; }
        public List<ChildDetailsDTO> objChildDetials { get; set; }
        public string STRHtml { get; set; }
        public string STRPremiumHtml { get; set; }
        public string STRBenefitHtml { get; set; }
        //public List<BenifitDetails> ObjBenefitDetails { get; set; }
        public string UserName { get; set; }
        public string QuoteNo { get; set; }
        public string PrevQuoteNo { get; set; }
        public string Message { get; set; }
        public int LifeQQID { get; set; }
        public List<string> ListAssured { get; set; }
        public string PanelIndex { get; set; }
        public int _memberIndex { get; set; }
        public int QuoteVersion { get; set; }
        public int TotalSumAssured { get; set; }


        public bool IsForCounterOffer { get; set; }

        //public Address objAddress { get; set; }
        public List<QuoteMemberDetailsDTO> objQuoteMemberDetails { get; set; }
        //public List<MasterListItem> ListPlan { get; set; }

        public string ProposalNo { get; set; } // CounterOfferCase
        //public List<MasterListItem> LstPolicyTerm { get; set; }
        //public List<MasterListItem> LstPremiumTerm { get; set; }
        //public List<MasterListItem> lstLanguage { get; set; }
        //public List<MasterListItem> lstPrefMode { get; set; }
        //public List<BenifitDetails> LstBenefitOverView { get; set; }
        //public List<BenifitDetails> LstPremiumOverview { get; set; }
        //public List<MasterListItem> lstSumInsured { get; set; }
        //public List<MasterListItem> lstSAM { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstGender { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstOccupation { get; set; }
        //[XmlIgnore]
        //public List<QuotionPool> ObjQuotationPool { get; set; }
        //public List<PreviousInsuranceList> objPreviousInsuranceList { get; set; }

        public byte[] ByteArray { get; set; }
        public byte[] ByteArray1 { get; set; }
        public string QuotePDFPath { get; set; }
       // public Error Error { get; set; }
        public string ProposerSignPath { get; set; }
        public string WPProposerSignPath { get; set; }
        public string Signature { get; set; }
        public byte[] ProspectSign { get; set; }
        public string WPProposerSignature { get; set; }
        public string WPProposerSigPath { get; set; }
        public byte[] WPSignature { get; set; }
        public string SignType { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? RiskCommencementDate { get; set; }

        public int ChildDeleteIndex { get; set; }
    }


    public class IllustationDTO
    {
        public int PolicyYear { get; set; }
        public int BasicPremium { get; set; }
        public int MainBenefitsPremium { get; set; }
        public int AdditionalBenefitsPremiums { get; set; }
        public int TotalPremium { get; set; }
        public long FundBalanceDiv4 { get; set; }
        public long SurrenderValueDiv4 { get; set; }
        public long DrawDownDiv4 { get; set; }
        public long PensionBoosterDiv4 { get; set; }
        public long FundBalanceDiv8 { get; set; }
        public long SurrenderValueDiv8 { get; set; }
        public long DrawDownDiv8 { get; set; }
        public long PensionBoosterDiv8 { get; set; }
        public long FundBalanceDiv12 { get; set; }
        public long SurrenderValueDiv12 { get; set; }
        public long DrawDownDiv12 { get; set; }
        public long PensionBoosterDiv12 { get; set; }
        public long FundBalanceDiv5 { get; set; }
        public long FundBalanceDiv6 { get; set; }
        public long FundBalanceDiv7 { get; set; }
        public long FundBalanceDiv9 { get; set; }
        public long FundBalanceDiv10 { get; set; }
        public long FundBalanceDiv11 { get; set; }
        public long DrawDownDiv5 { get; set; }
        public long DrawDownDiv6 { get; set; }
        public long DrawDownDiv7 { get; set; }
        public long DrawDownDiv9 { get; set; }
        public long DrawDownDiv10 { get; set; }
        public long DrawDownDiv11 { get; set; }
        public long UnAllocatedPremium { get; set; }
        public long FundBoosterDiv12 { get; set; }


    }



    public class ProductDetialsDTO
    {

        public string Plan { get; set; }
        public string Variant { get; set; }
        public string PlanCode { get; set; }
        public string PolicyTerm { get; set; }
        public string PremiumTerm { get; set; }
        public string PensionPeriod { get; set; }
        public string RetirementAge { get; set; }
        public string DrawDownPeriod { get; set; }
        public string MaturityBenefits { get; set; }
        public string PreferredLangauage { get; set; }
        public string PreferredMode { get; set; }
        public int MonthlySurvivorIncome { get; set; }
        public long BasicSumInsured { get; set; }
        public string AnnualPremium { get; set; }
        public int SAM { get; set; }
        public int APCP { get; set; }
        public bool IsFamilyFloater { get; set; }
        public bool Deductable { get; set; }
        public string IsAfc { get; set; }
        public string ModalPremium { get; set; }
    }


    public class ProspectDTO
    {
        public ProspectDTO()
        {
            objAddress = new AddressDTOs();
        }
        public string WPName { get; set; }
        public string WPCode { get; set; }
        public string WPPhone { get; set; }
        public string HdnAutOccupation { get; set; }
        //public List<PreviousInsuranceList> objPreviousInsuranceList { get; set; }
        //public Error Error { get; set; }
        public string hdnValue { get; set; }
        public string CreatedBy { get; set; }
        //public List<MasterListItem> LstType { get; set; }
        //public List<MasterListItem> LstPensionPeriod { get; set; }
        //public List<MasterListItem> LstRetirementAge { get; set; }
        //public List<MasterListItem> LstDrawDownPeriod { get; set; }
        //public List<MasterListItem> LstMaturityBenefits { get; set; }
        public string Prefix { get; set; }
        public string UserName { get; set; }
        public bool IsForServices { get; set; }
        public string Type { get; set; }
        public string Salutation { get; set; }

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

        public string Mobile { get; set; }
        public string PassPort { get; set; }
        public string Place { get; set; }
        public string Email { get; set; }
        public string Work { get; set; }
        public string Home { get; set; }
        public int? AgeNextBdy { get; set; }
        public int? CurrentAge { get; set; }
        public DateTime? DateofBirth { get; set; }
        public string Occupation { get; set; }

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
        public int ContactID { get; set; }
        public string AssignedTo { get; set; }
        public AddressDTOs objAddress { get; set; }
        //public NeedAnalysis.NeedAnalysis objNeedAnalysis { get; set; }
        //public List<NeedAnalysis.FutureFinancial> objFutureFinancial { get; set; }
        public string Upload { get; set; }

        public string Signature { get; set; }
        public string NotePad { get; set; }
        public byte[] NotePadByteArray { get; set; }
        public byte[] ByteArrayGraph { get; set; }
        public byte[] ByteArray { get; set; }
        public byte[] ByteArray1 { get; set; }
        public byte[] ByteArray2 { get; set; }
        public byte[] ByteArray3 { get; set; }
        public byte[] ByteArray4 { get; set; }
        public byte[] ByteArray5 { get; set; }
        public byte[] ByteArray6 { get; set; }
        public string ProtectionByteArraygraph { get; set; }
        public string HealthByteArraygraph { get; set; }

        //public List<SuspectPool> ObjSuspectPool { get; set; }
        //public List<ProspectPool> ObjProspectPool { get; set; }

        public bool IsConfirmedProspect { get; set; }
        public bool IsNeedAnalysisCompleted { get; set; }
        public int ProspectStage { get; set; }
        public string SendEmail { get; set; }
        public string ReasonForRemove { get; set; }

        //public List<MasterListItem> ListVariant { get; set; }
        //public List<MasterListItem> ListPlan { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstSalutation { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstOccupation { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstGender { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> MaritalStatuslist { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstRelations { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstMotorVehicle { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstDependentRelationship { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstAvgMonthlyIncome { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstCurrentStatus { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstNeedsPriority { get; set; }
        //[XmlIgnore]
        //public List<MasterListItem> lstPurposeOfMeeting { get; set; }
        public string ClientCode { get; set; }
        public string SamsLeadNumber { get; set; }
        public string IntroducerCode { get; set; }
        public string ServiceTraceID { get; set; }
        public string ErrorMessage { get; set; }
    }

    public partial class SpouseDetailsDTO
    {

        public int AgeNextBirthday { get; set; }
        public int CurrrentAge { get; set; }
        public DateTime? DOB { get; set; }
        public string SpouseName { get; set; }
        public string SpouseNIC { get; set; }
        public string Gender { get; set; }
        public string Occupation { get; set; }
        public string AssuredName { get; set; }

    }

    public class ChildDetailsDTO
    {

        public string SumAssured { get; set; }
        public string Assured { get; set; }
        public string Relationship { get; set; }
        public int AgeNextBirthday { get; set; }
        public int CurrentAge { get; set; }
        public DateTime? DateofBirth { get; set; }
        public string Gender { get; set; }
        public string Name { get; set; }


    }

    public class AddressDTOs
    {
        public AddressDTOs()
        {
            LstPincode = new List<MasterListItemDTO>();
        }
        public decimal AddressID { get; set; }
        public int AddressTypeId { get; set; }
        private string _address1;
        public string Address1
        {
            get { return _address1; }
            set { _address1 = string.IsNullOrEmpty(value) == false ? value.Trim() : value; }
        }
        private string _address2;
        public string Address2
        {
            get { return _address2; }
            set { _address2 = string.IsNullOrEmpty(value) == false ? value.Trim() : value; }
        }
        private string _address3;
        public string Address3
        {
            get { return _address3; }
            set { _address3 = string.IsNullOrEmpty(value) == false ? value.Trim() : value; }
        }
        public int? PincodeID { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Pincode { get; set; }
        public string PincodeNew { get; set; }
        public int? StateID { get; set; }
        public string Province { get; set; }
        public string ProvinceCode { get; set; }
        public string DistrictCode { get; set; }
        public string CityCode { get; set; }
        [XmlIgnore]
        public List<MasterListItemDTO> LstPincode { get; set; }
    }

    public class MasterListItemDTO
    {
        public Int32 ID { get; set; }
        public string Value { get; set; }

        public string Text { get; set; }
        public int selected { get; set; }

    }

    public class QuotationPreviousInsuranceDTO
    {
        public int? OnGoingProposalWithAIA { get; set; }
        public int? NoOfOnGoingProposalWithAIA { get; set; }
        public int? PreviousPolicyWithAIA { get; set; }
        public int? NoOfPreviousPolicyWithAIA { get; set; }
    }


    public class QuoteMemberDetailsDTO
    {
        public QuoteMemberDetailsDTO()
        {
            ObjBenefitDetails = new List<BenifitDetailsDTO>();
        }

        //public int hdnBasicSumInsured { get; set; }
        public string Assured { get; set; }
        public string Relationship { get; set; }
        public string MemberIndex { get; set; }
        public int AgeNextBirthDay { get; set; }
        public int CurrentAge { get; set; }
        public string ChildRelationship { get; set; }
        public string TabIndex { get; set; }
        public bool IsBenefitRequested { get; set; }
        public List<BenifitDetailsDTO> ObjBenefitDetails { get; set; }
        public string HospitalizationAvailability { get; set; }
        public DateTime? DateOfBirth { get; set; }

    }

    public class BenifitDetailsDTO
    {
        public BenifitDetailsDTO(string _AssuredMember)
        {
            AssuredMember = _AssuredMember;
        }
        public BenifitDetailsDTO()
        {
            //   objBenefitMemberRelationship = new List<AssuredRelation>();
            // BenefitLoadings = new List<BenefitLoading>();
        }
        public decimal MemberBenifitID { get; set; }
        public int BenefitID { get; set; }
        public string BenifitName { get; set; }
        public string AssuredMember { get; set; }
        public bool BenifitOpted { get; set; }
        public bool Mandatory { get; set; }
        public string RiderSuminsured { get; set; }
        // public List<AssuredRelation> objBenefitMemberRelationship { get; set; }
        public string RiderCode { get; set; }
        public string MinSumInsured { get; set; }
        public string MaxSumInsured { get; set; }
        public string RiderPremium { get; set; }
        public int RiderID { get; set; }
        public string RelationshipWithProspect { get; set; }
        public string CalType { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public decimal MemberBenefitDetailID { get; set; }
        public string LoadingType { get; set; }
        public string LoadingAmount { get; set; }
        public string DiscountAmount { get; set; }
        public string ExtraPremium { get; set; }
        public string LoadingBasis { get; set; }
        public string Exclusion { get; set; }
        public string ActualRiderPremium { get; set; }
        public string AnnualRiderPremium { get; set; }
        public string TotalPremium { get; set; }
        public bool IsDeleted { get; set; }
        public int RiderLoadingIndex { get; set; }
        public string MemberID { get; set; }
        public string LoadingPercentage { get; set; }
        public string LoadinPerMille { get; set; }
        public string AnnualModeLoadingAmount { get; set; }
        public string AnnualModeDiscountAmount { get; set; }
        public string AnnualModeAnnualpremium { get; set; }
        // public List<BenefitLoading> BenefitLoadings { get; set; }
    }


}



