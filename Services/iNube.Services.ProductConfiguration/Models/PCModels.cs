using System.Collections.Generic;
using iNube.Utility.Framework.Model;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace iNube.Services.ProductConfiguration.Models
{
    //public partial class ddDTO
    //{
    //    public int mID { get; set; }
    //    public string mValue { get; set; }
    //    public string mType { get; set; }
    //}
    public partial class MasDTO
    {
        public decimal mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }
    public partial class MappingDto
    {
        public int MappingId { get; set; }
        public string RateName { get; set; }
        public string RiskName { get; set; }
        public bool? IsActive { get; set; }
    }
    public partial class MappingListDto
    {
        public MappingListDto()
        {
            mapping = new List<MappingDto>();

        }
        public virtual List<MappingDto> mapping { get; set; }
    }

    public partial class MapQuoteDTO
    {
        public MapQuoteDTO()
        {
            objProductDetials = new ProductDetialsDTO();
            objQuoteMemberDetails = new List<QuoteMemberDetailsDTO>();
            objProspect = new ProspectDTO();
            objSpouseDetials = new SpouseDetailsDTO();
            objChildDetials = new List<ChildDetailsDTO>();
            LstIllustation = new List<IllustationDTO>();

        }

        public string RefNo { get; set; }
        public string ServiceTraceID { get; set; }
        // public QuotationPreviousInsurance ObjQuotationPreviousInsurance { get; set; }
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

        //public string ProposalNo { get; set; } // CounterOfferCase
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
        //public Error Error { get; set; }
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


    public partial class ProductDetialsDTO
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

    public class DocumentResponse : ResponseStatus
    {
        public List<LeadInfo> bankFile { get; set; }
    }
    public partial class LeadInfo
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public int? ProductId { get; set; }
        public int? PartnerId { get; set; }
        public bool? IsPayment { get; set; }
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



    public class ProspectDTO
    {
        public ProspectDTO()
        {

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
        //public Address objAddress { get; set; }
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


    public class MasterListItemDTO
    {
        public Int32 ID { get; set; }
        public string Value { get; set; }
        public string Text { get; set; }
        public int selected { get; set; }

    }


    public class ProductMastersDTO
    {

        public string ProductName { get; set; }
        public string PlanCode { get; set; }
        public int ProductID { get; set; }

        public List<MasterListItemDTO> LstPolicyTerm { get; set; }
        public List<MasterListItemDTO> LstPremiumTerm { get; set; }

    }



    public partial class ddDTOs
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public bool mIsRequired { get; set; }
        public string planCode { get; set; }
        public string lob { get; set; }
        public string cob { get; set; }
        public bool disable { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
        public string productCode { get; set; }
        public int? Lobid { get; set; }
        public int? Cobid { get; set; }
        public bool? UniqueCode { get; set; }
    }

    public partial class EntityDTOs
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string name { get; set; }
        public string mType { get; set; }
        public bool mIsRequired { get; set; }
        public int? level { get; set; }
        public int? parentId { get; set; }
        public string parameter { get; set; }
        public bool disable { get; set; }
        public bool active { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }
    }

    public partial class MasterEntityDTO
    {
        public int MasterId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
        public int? ParentId { get; set; }
        public int? Level { get; set; }
        public string Parameter { get; set; }
        public bool IsDisable { get; set; }
        public bool IsActive { get; set; }
        public int? SortOrder { get; set; }
        public string UserInputType { get; set; }
    }

    public class MasterDataResponse : ResponseStatus
    {
        public MasterDataDTO master { get; set; }
    }

    public partial class MasterDataDTO
    {
        public int ProductMasterId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
        public int ParentId { get; set; }
        public bool IsDisable { get; set; }
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        public string UserInputType { get; set; }
    }
    public partial class ProductDTO
    {
        public ProductDTO()
        {
            InsurableRcbdetails = new List<InsurableRcbdetailsDTO>();
            ProductSwitchOnDetails = new List<ProductSwitchOnDetailsDTO>();
            ProductBasicConfiguration = new List<ProductBasicConfigurationDTO>();
        }
        public int ProductId { get; set; }
        public decimal RateingId { get; set; }
        public int? Lobid { get; set; }
        public int? Cobid { get; set; }
        public int? ProductStatusId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public DateTime? ActiveFrom { get; set; }
        public DateTime? ActiveTo { get; set; }
        public decimal? PremiumAmount { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }
        public string LOB1 { get; set; }
        public string COB1 { get; set; }
        public int mID { get; set; }
        public string mValue { get; set; }
        public bool? IsSingleCover { get; set; }
        public bool? IsMasterPolicy { get; set; }
        public int? ProductTypeId { get; set; }

        public virtual List<InsurableRcbdetailsDTO> InsurableRcbdetails { get; set; }
        //public virtual ICollection<ProductBenefitsDTO> ProductBenefits { get; set; }
        public virtual ICollection<ProductChannelsDTO> ProductChannels { get; set; }
        public virtual ICollection<ProductClausesWarrentiesExclusionsDTO> ProductClausesWarrentiesExclusions { get; set; }
        // public virtual ICollection<ProductCoversDTO> ProductCovers { get; set; }
        public virtual ICollection<ProductInsurableItemsDTO> ProductInsurableItems { get; set; }
        public virtual ICollection<ProductRcbdetailsDTO> ProductRcbdetails { get; set; }
        //public virtual ICollection<ProductPremiumDTO> ProductPremium { get; set; }
        public virtual ICollection<ProductPremiumDTO> ProductPremium { get; set; }
        public virtual ICollection<ddDTOs> RiskDetails { get; set; }
        public virtual ICollection<ddDTOs> ClaimDetails { get; set; }
        public virtual ICollection<ddDTOs> ProductBasicConfigurationDetails { get; set; }
        public virtual ICollection<ddDTOs> ProductSwitchOnProperty { get; set; }
        public virtual ICollection<ProductSwitchOnDetailsDTO> ProductSwitchOnDetails { get; set; }
        public virtual ICollection<ProductRatingMapping> CalculateConfig { get; set; }
        public virtual ICollection<ProductBasicConfigurationDTO> ProductBasicConfiguration { get; set; }
    }

    public partial class ProductBasicConfigurationDTO
    {
        public decimal ProductBasicConfigurationId { get; set; }
        public int? ProductId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public bool? mIsRequired { get; set; }
        public string mValue { get; set; }
        public string selectedValue { get; set; }
        public int mID { get; set; }
        public bool? disable { get; set; }
    }
    public partial class ProductRatingMapping
    {
        public int MappingId { get; set; }
        public string RateParameterName { get; set; }
        public string RiskParameterName { get; set; }
        public bool? IsActive { get; set; }
        public int? ProductId { get; set; }
        public decimal? RatingConfigId { get; set; }


    }


    public class ProductResponse : ResponseStatus
    {
        public ProductDTO product { get; set; }
    }
    public partial class ProductCoversDTO
    {
        //public ProductCoversDTO()
        //{
        //    TblProductBenefits = new HashSet<ProductBenefitsDTO>();
        //    TblProductPremium = new HashSet<ProductPremiumDTO>();
        //}
        public decimal CoverId { get; set; }
        public int ProductId { get; set; }
        public int CoverTypeId { get; set; }
        public string CoverDescription { get; set; }
        public bool? SingleValue { get; set; }
        public string CoverEventFactorValueFrom { get; set; }
        public string CoverEventFactorValueTo { get; set; }
        public string CoverPeriod { get; set; }
        public int MaximumBenefitAmount { get; set; }
        public int? CoverEventId { get; set; }
        public int? CoverEventFactorId { get; set; }
        public int? CoverEventFactorValueUnitId { get; set; }
        public string Cover { get; set; }
        public string CoverEvent { get; set; }
        public string CoverEventFactorUnit { get; set; }
        public decimal? InsurableItemId { get; set; }
        public string CoverEventFactor { get; set; }
        public virtual ICollection<ProductBenefitsDTO> ProductBenefits { get; set; }



    }
    public partial class ProductSwitchOnDetailsDTO
    {
        public int mID { get; set; }
        public decimal SwitchOnId { get; set; }
        public int? ProductId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public bool? mIsRequired { get; set; }
        public string mValue { get; set; }
        public bool? disable { get; set; }
    }

    public partial class ProductChannelsDTO
    {
        public decimal ChannelId { get; set; }
        public int? ProductId { get; set; }
        public int? ChannelTypeId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public double? Brokage { get; set; }
        public string ChannelName { get; set; }

        //public virtual string ChannelType { get; set; }
        //public virtual string ProductName { get; set; }
    }

    public partial class ProductBenefitsDTO
    {
        public decimal BenefitId { get; set; }
        public int? ProductId { get; set; }
        public int? BenefitTypeId { get; set; }
        public double? BenefitAmount { get; set; }
        public int? BenefitCriteria { get; set; }
        public int? BenefitCriteriaValue { get; set; }
        public int? MaxBenefitAmount { get; set; }
        public bool? SingleValue { get; set; }
        public string CurrencyId { get; set; }
        public string BenefitCriterias { get; set; }
        //public string BenefitType { get; set; }
        //public string Product { get; set; }
        public decimal? CoverId { get; set; }
        public decimal? PremiumAmount { get; set; }

        public virtual ICollection<BenifitRangeDetails> BenifitRangeDetails { get; set; }
    }

    public partial class ProductClausesWarrentiesExclusionsDTO
    {
        public decimal Cweid { get; set; }
        public int? ProductId { get; set; }
        public int? CwetypeId { get; set; }
        public string TypeName { get; set; }
        public string Description { get; set; }
        public bool IsPrint { get; set; }
        public string Label { get; set; }
        public string Cwetypes { get; set; }
        public bool Checked { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
        public string LevelName { get; set; }
        public string SubLevelName { get; set; }
        public int? RefId { get; set; }
    }

    public partial class ProductInsurableItemsDTO
    {
        //public ProductInsurableItemsDTO()
        //{
        //    TblProductCovers = new HashSet<ProductCoversDTO>();
        //}

        public decimal InsurableItemId { get; set; }
        public int ProductId { get; set; }
        public int InsurableItemTypeId { get; set; }
        public int? InsurableCategoryId { get; set; }
        public bool? IsSingle { get; set; }
        public string InsurableItem { get; set; }
        public string InsurableCategory { get; set; }
        public virtual ProductMasterDTO InsurableItemType { get; set; }

        public virtual ICollection<ProductCoversDTO> ProductCovers { get; set; }
    }

    public partial class ProductRcbdetailsDTO
    {
        public decimal RcbdetailsId { get; set; }
        public int? ProductId { get; set; }
        public int InputId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public string UserInputType { get; set; }
        public bool? disable { get; set; }
        public int mID { get; set; }
        public bool? mIsRequired { get; set; }
        public string mValue { get; set; }
        //public string Product { get; set; }
        //public string ProductPolicyInput { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
    }

    public partial class InsurableRcbdetailsDTO
    {
        public InsurableRcbdetailsDTO()
        {
            CoverRcbdetails = new HashSet<CoverRcbdetailsDTO>();
            InsurableChildRcbdetails = new HashSet<ddDTOs>();
            InsurableChildRcbdetail = new HashSet<InsurableChildRcbdetailsDTO>();
        }

        public int InsurableRcbdetailsId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public int ProductId { get; set; }
        public string UserInputType { get; set; }
        public bool? disable { get; set; }
        public bool? mIsRequired { get; set; }
        public string mValue { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }



        public virtual ICollection<CoverRcbdetailsDTO> CoverRcbdetails { get; set; }
        public virtual ICollection<ddDTOs> InsurableChildRcbdetails { get; set; }
        public virtual ICollection<InsurableChildRcbdetailsDTO> InsurableChildRcbdetail { get; set; }
    }
    public partial class CoverRcbdetailsDTO
    {
        public CoverRcbdetailsDTO()
        {
            CoverChildRcbdetails = new HashSet<ddDTOs>();
            CoverChildRcbdetail = new HashSet<CoverChildRcbdetailsDTO>();
        }

        public int CoverRcbdetailsId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public int InsurableRcbdetailsId { get; set; }
        public string UserInputType { get; set; }
        public bool? disable { get; set; }
        public bool? mIsRequired { get; set; }
        public string mValue { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }

        // public virtual InsurableRcbdetailsDTO InsurableRcbdetails { get; set; }
        public virtual ICollection<CoverChildRcbdetailsDTO> CoverChildRcbdetail { get; set; }
        public virtual ICollection<ddDTOs> CoverChildRcbdetails { get; set; }
    }
    public partial class InsurableChildRcbdetailsDTO
    {
        public int InsurableChildRcbdetailsId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public int InsurableRcbdetailsId { get; set; }
        public string UserInputType { get; set; }
        public bool? disable { get; set; }
        public bool? mIsRequired { get; set; }
        public string mValue { get; set; }
        public int? mID { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
        public bool? UniqueCode { get; set; }
        // public virtual InsurableRcbdetailsDTO InsurableRcbdetails { get; set; }
    }
    public partial class CoverChildRcbdetailsDTO
    {
        public int TblCoverChildRcbdetailsId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public int CoverRcbdetailsId { get; set; }
        public string UserInputType { get; set; }
        public bool? disable { get; set; }
        public bool? mIsRequired { get; set; }
        public string mValue { get; set; }
        public int? mID { get; set; }
        //  public virtual CoverRcbdetailsDTO CoverRcbdetails { get; set; }

    }


    public partial class CommonTypesDTO
    {
        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }
    public partial class ProductSearchDTO
    {
        public int ProductId { get; set; }
        public int? Lobid { get; set; }
        public int? Cobid { get; set; }
        public int? ProductStatusId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public DateTime? ActiveFrom { get; set; }
        public DateTime? ActiveTo { get; set; }
        public int? PremiumAmount { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortOn { get; set; }
        public string SortDirection { get; set; }
        public Decimal? PartnerId { get; set; }
        public decimal EnvId { get; set; }

    }
    public partial class masClausesWarrentiesExclusionsDTO
    {
        public int CWEID { get; set; }
        public int LOBID { get; set; }
        public int CWETypeID { get; set; }
        public string TypeName { get; set; }
        public string Description { get; set; }
        public string IsActive { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public int ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string Label { get; set; }
    }
    public partial class ProductMasterDTO
    {
        public int ProductMasterID { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
        public int ParentID { get; set; }
        public int CreatedBy { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean IsDisable { get; set; }
    }
    public partial class BenifitRangeDetails
    {
        public decimal BenefitRangeId { get; set; }
        public decimal BenifitId { get; set; }
        public double FromValue { get; set; }
        public double ToValue { get; set; }
        public double BenefitAmount { get; set; }
        public decimal? PremiumAmount { get; set; }
    }
    public partial class ProductPremiumDTO
    {
        public decimal PremiumId { get; set; }
        public int? ProductId { get; set; }
        public int? CurrencyId { get; set; }
        public decimal? PremiumAmount { get; set; }
        public decimal? CoverId { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
        public string LevelName { get; set; }
        public string SubLevelName { get; set; }
        public string CurrencyName { get; set; }
        public string Description { get; set; }
        public int? RefId { get; set; }

    }

    /// <summary>
    /// for invoice generation
    /// </summary>
    public class BillingEventDataDTO
    {
        public int Count { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public decimal SumInsured { get; set; }
        public int? ProductId { get; set; }
        public decimal Premium { get; set; }
    }

    public class BillingEventResponseDTO
    {
        public BillingEventResponseDTO()
        {
            billingEventDataDTOs = new List<BillingEventDataDTO>();
            productEventDTOs = new List<ProductEventDTO>();
        }
        public List<BillingEventDataDTO> billingEventDataDTOs { get; set; }
        public List<ProductEventDTO> productEventDTOs { get; set; }
    }
    public class ProductEventDTO
    {
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class BillingEventRequest
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal CustomerId { get; set; }
        public decimal EvtId { get; set; }
    }

    public class ProductRiskDetailsDTO
    {
        public ProductRiskDetailsDTO()
        {
            ProductRcbDetails = new List<ProductRcbdetailsDTO>();
            ProductRcbInsurableDetails = new List<InsurableRcbdetailsDTO>();
        }
        public List<ProductRcbdetailsDTO> ProductRcbDetails { get; set; }
        public List<InsurableRcbdetailsDTO> ProductRcbInsurableDetails { get; set; }
    }

    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }
    public partial class LeadInfoDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public string ProductCode { get; set; }
        public int? ProductId { get; set; }
        public int? PartnerId { get; set; }
        public bool? Smsstatus { get; set; }
        public bool? Emailstatus { get; set; }
        public bool? IsPayment { get; set; }
    }

    public class SMSRequest
    {
        public string APIKey { get; set; }
        public string SenderId { get; set; }
        public string Channel { get; set; }
        public string RecipientNumber { get; set; }
        public string SMSMessage { get; set; }
    }

    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

    public partial class AssignProductList
    {
        public string mValue { get; set; }
        public List<ddDTO> mData { get; set; }

    }


    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public bool mIsRequired { get; set; }
        public string lob { get; set; }
        public string cob { get; set; }
        public bool disable { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }
    }

    public partial class LGIList
    {
        public string RefrenceNumber { get; set; }
        public string CoverName { get; set; }
        public decimal CoverID { get; set; }
        public string ProductCode { get; set; }
        public string CoverRange { get; set; }
        public decimal? PremiumAmount { get; set; }
        public double FromValue { get; set; }
        public double ToValue { get; set; }

    }
    public partial class LGIDTO
    {
        public LGIDTO()
        {
            CoverListValue = new List<CoverListValue>();
        }
        public string RefrenceNumber { get; set; }
        public string CoverName { get; set; }
        public decimal CoverID { get; set; }
        public string ProductCode { get; set; }
        public string CoverRange { get; set; }
        public List<CoverListValue> CoverListValue { get; set; }
    }
    public partial class CoverListValue
    {
        public string CoverName { get; set; }
        public double CoverValue { get; set; }
        public decimal? BenefitValue { get; set; }

    }

    public partial class PromoDTO
    {
        public string PromoCode1 { get; set; }
        public string PromoCode2 { get; set; }
    }
    public partial class CustomerSettingsDTO
    {
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string Type { get; set; }
        public string Key { get; set; }
        public string KeyValue { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? EnvId { get; set; }
    }

    public partial class DynamicProduct
    {
        public decimal Id { get; set; }
        public string ComponentType { get; set; }
        public string LabelText { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string FilterName { get; set; }
        public string ListObject { get; set; }
        public bool? Required { get; set; }
        public bool? FutureDate { get; set; }
        public bool? Checked { get; set; }
        public string Type { get; set; }
    }

}
