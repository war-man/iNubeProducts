using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Models
{

    public class ShowErrorInfoDetails
    {
        public string paymentGatewayRefrenceid { get; set; }
        //public string ErrorDescription { get; set; }
        public int ErroRowNo { get; set; }
        public string EndorsementNo { get; set; }
        public string PaymentStatus { get; set; }
        public decimal Ammountpaid { get; set; }
        public decimal TotalRefundAmount { get; set; }
        public DateTime? DateofPayment { get; set; }
        public DateTime? EndorsementEffectiveDate{get;set;}
        public List<Dictionary<string, string>> ErrorDescription { get; set; }

    }
    public class ShowReportErrorInfoDetails
    {
      
        public int ErroRowNo { get; set; }
        public string TxnID { get; set; }
     
        public string PaymentReferenceId { get; set; }
        public string PaymentStatus { get; set; }
        public decimal AmountPaid { get; set; }
        public DateTime? DateofPayment { get; set; }
       
        public List<Dictionary<string, string>> ErrorDescription { get; set; }

    }
    public partial class ddDTOs
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public bool mIsRequired { get; set; }
    }
    public partial class LeadInfoDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public string ProductCode { get; set; }
        public int ProductId { get; set; }
        public int PartnerId { get; set; }
        public bool IsPayment { get; set; }
        public bool Smsstatus { get; set; }
        public bool Emailstatus { get; set; }        
    }

    public partial class EndorsementDetailsDTO
    {
        public decimal EndorsementId { get; set; }
        public string EndorsementNo { get; set; }
        public string Action { get; set; }
        public string EnddorsementRequest { get; set; }
        public DateTime? EndorsementEffectivedate { get; set; }
        public decimal? PremiumAmount { get; set; }
        public decimal? Gst { get; set; }
        public decimal? TotalPremiumAmount { get; set; }
        public decimal? AmountBalanced { get; set; }
        public string PaymentGatewayReferenceId { get; set; }
        public DateTime? DateOfPayment { get; set; }
        public decimal? PolicyId { get; set; }
        public bool? IsPremiumRegister { get; set; }
        public string UpdatedResponse { get; set; }

        public virtual PolicyDTO Policy { get; set; }
    }

    public class PolicyPremiumDetailsDTO
    {
        public string SumInsured { get; set; }
        public string PD_Age { get; set; }
        public string PD_DriveExperince { get; set; }
        public string PD_NoOfTW { get; set; }
        public string PD_NoOfPC { get; set; }
        public string AdditionalDriver { get; set; }
        public string FromStateTax { get; set; }
        public string ToStateTax { get; set; }
    }


    public partial class PolicyDTO
    {
        public PolicyDTO()
        {
            EndorsementDetails = new HashSet<EndorsementDetailsDTO>();
            PolicyInsurableDetails = new List<PolicyInsurableDetailsDTO>();
        }
        public decimal PolicyId { get; set; }
        public string PolicyNo { get; set; }
        public short? PolicyVersion { get; set; }
        public int? AgentBusinessTypeId { get; set; }
        public decimal? AgentId { get; set; }
        public int? SubAgentId { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public DateTime? PolicyEndDate { get; set; }
        public TimeSpan? InceptionTime { get; set; }
        public decimal? SumInsured { get; set; }
        public int? BranchIdPk { get; set; }
        public int? ProductIdPk { get; set; }
        public string PolicyTypeId { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Channel { get; set; }
        public string DocumentType { get; set; }
        public int? PolicyStatusId { get; set; }
        public int? BusinessTypeId { get; set; }
        public string QuoteNo { get; set; }
        public DateTime? QuoteDate { get; set; }
        public string ProposalNo { get; set; }
        public DateTime? ProposalDate { get; set; }
        public string CoverNoteNo { get; set; }
        public DateTime? CoverNoteIssueDate { get; set; }
        public int? PolicyStageStatusId { get; set; }
        public DateTime PolicyIssueDate { get; set; }
        public int? PolicyStageId { get; set; }
        public string MasterPolicyNo { get; set; }
        public string PolicyRemarks { get; set; }
        public string Smcode { get; set; }
        public int? Irccode { get; set; }
        public string CustomerId { get; set; }
        public int? Csoid { get; set; }
        public short IsUploadedToIcm { get; set; }
        public string PolicyStatus { get; set; }

        public decimal? CorporateId { get; set; }
        public decimal? BundleId { get; set; }
        public string BundleTxnId { get; set; }
        public decimal? BundleParentId { get; set; }
        public bool? IsIrdaupdated { get; set; }
        public string Currency { get; set; }
        public string Rate { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string CoverEvent { get; set; }
        public string CoverName { get; set; }
        public decimal? MasterPremium { get; set; }
        public decimal? PremiumAmount { get; set; }
        public string CdaccountNumber { get; set; }
        public string MasterType { get; set; }
        public int? BalanceSumInsued { get; set; }
        public DateTime? PolicyCancelDate { get; set; }
        public string InsuredName { get; set; }


        public List<PolicyInsurableDetailsDTO> PolicyInsurableDetails { get; set; }
        public virtual ICollection<EndorsementDetailsDTO> EndorsementDetails { get; set; }
    }



    public partial class PartnersDTO
    {
        public PartnersDTO()
        {
            // TblPartnerAddress = new HashSet<PartnerAddressDTO>();
        }

        public decimal PartnerId { get; set; }
        public int? PartnerTypeId { get; set; }
        public int? PartnerClassId { get; set; }
        public int? SalutationId { get; set; }
        public string PartnerName { get; set; }
        public string Fax { get; set; }
        public string Telephone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Pan { get; set; }
        public string Website { get; set; }
        public bool? Gst { get; set; }
        public string Gstnumber { get; set; }
        public string Pannumber { get; set; }
        public string Cinnumber { get; set; }
        public decimal? OrganizationId { get; set; }

        // public virtual ICollection<PartnerAddressDTO> TblPartnerAddress { get; set; }
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
        public decimal RatingId { get; set; }
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
        public string CoverEventFactor { get; set; }
        public string CoverEventFactorUnit { get; set; }
        public virtual ICollection<ProductBenefitsDTO> ProductBenefits { get; set; }



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
        //public string BenefitType { get; set; }
        //public string Product { get; set; }
        public decimal? CoverId { get; set; }
        public string BenefitCriterias { get; set; }
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
        //public string ProductName { get; set; }
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
        public bool? mIsRequired { get; set; }
        public string mValue { get; set; }
        //public string Product { get; set; }
        //public string ProductPolicyInput { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
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

        //  public virtual CoverRcbdetailsDTO CoverRcbdetails { get; set; }

    }
    public class PolicySearchbyPidDTO
    {
        public decimal? PartnerId { get; set; }
        public int? ProductId { get; set; }
    }

    public partial class BenifitRangeDetails
    {
        public decimal BenefitRangeId { get; set; }
        public decimal BenifitId { get; set; }
        public double FromValue { get; set; }
        public double ToValue { get; set; }
        public double BenefitAmount { get; set; }
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
        public decimal RatingId { get; set; }
    }
    public class PolicyBookingTransaction
    {
        public decimal PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public string AccountNo { get; set; }
        public string PolicyNo { get; set; }
        public string TxnType { get; set; }
        public decimal TxnAmount { get; set; }
        public decimal PaymentId { get; set; }
        public bool IsRefund { get; set; }
        public decimal OrgId { get; set; }
    }
    public class CdTransactionsResponse : ResponseStatus
    {
        public CdTransactionsDTO cdTransactions { get; set; }
    }
    public class PolicyResponse : ResponseStatus
    {
        public PolicyResponse()
        {
            policy = new Dictionary<string, string>();
        }
        public Dictionary<string, string> policy { get; set; }
    }
   
    public class PolicyProposalResponse : ResponseStatus
    {
        public dynamic ProposalPolicyDetail { get; set; }
    }

    public class ProposalResponse : ResponseStatus
    {
        public Dictionary<string, string> proposal { get; set; }
    }
    public class CdTransactionsDTO
    {
        public decimal TxnId { get; set; }
        public string AccountNo { get; set; }
        public decimal? PaymentId { get; set; }
        public string TxnType { get; set; }
        public DateTime? TransactionDate { get; set; }
        public decimal? TxnAmount { get; set; }
        public decimal? InitialAmount { get; set; }
        public decimal? AvailableAmount { get; set; }
        public decimal? LedgerBalance { get; set; }
        public Guid? CreatedBy { get; set; }
        public string Description { get; set; }
        public int? CreditAccountNo { get; set; }
        public int? PaymentModeId { get; set; }
        public string PaymentRefernceId { get; set; }

    }

    public class SingleCover
    {
        public string IdentificationNumber { get; set; }
        public string Name { get; set; }
        public string InsurableItem { get; set; }

        public string Cover { get; set; }
        public string CoverEventFactor { get; set; }
        public string BenefitCriteria { get; set; }
        public int MaxBenefitValue { get; set; }
        public int MaxBenefitCriteriaValue { get; set; }
    }
    #region PolicyNotificationRequestModel
    public class NotificationRequest
    {
        public string TemplateKey { get; set; }
        public string NotificationPayload { get; set; }
        public bool SendSms { get; set; }
        public bool SendEmail { get; set; }
        public bool AttachPDF { get; set; }
        public SMSRequest smsRequest { get; set; }
    }

    public class PolicyModel
    {
        public Organization organization { get; set; }
        public Customer customer { get; set; }
        public PolicyDetails policyDetails { get; set; }
        public ProductsModel productsModel { get; set; }
        public DateTime? Date { get; set; }
        public EmailRequest EmailTest { get; set; }
        public string PolicyNumber { get; set; }

    }
    public class Organization
    {
        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public string Address { get; set; }
    }
    public class Customer
    {
        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public string Address { get; set; }
    }
    public class PolicyDetails
    {
        public string PolicyNumber { get; set; }
        public string PolicyStartDate { get; set; }
        public string PartnerName { get; set; }
        public string PolicyEndDate { get; set; }
        public string ProductName { get; set; }
        public decimal? PremiumAmount { get; set; }
        public decimal? SumInsured { get; set; }
        public string BillingFrequency { get; set; }
        public string CDAccountNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Source { get; set; }
    }
    public class ProductsModel
    {
        public ProductsModel()
        {
            coverages = new List<CoverageDetails>();
            benifits = new List<Benifits>();
            premium = new List<PremiumDetails>();
            CWEdetails = new List<string>();
        }
        public List<CoverageDetails> coverages { get; set; }
        public List<Benifits> benifits { get; set; }
        public List<PremiumDetails> premium { get; set; }
        public List<string> CWEdetails { get; set; }
    }
    public class CoverageDetails
    {
        public string CoverName { get; set; }
        public string CoverEvent { get; set; }
        public string PartnerName { get; set; }
        public string CoverEventFactorValue { get; set; }
        public string CoverEventFactor { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        //public string Amount { get; set; }
    }
    public class Benifits
    {
        public Benifits()
        {
            BenifitRangeDetails = new List<BenifitRangeDetails>();
        }
        public string BenifitCriteria { get; set; }
        public string BenifitCriteriaValue { get; set; }
        //public string BenifitAmount { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Amount { get; set; }
        public List<BenifitRangeDetails> BenifitRangeDetails { get; set; }
    }
    public class PremiumDetails
    {
        //public string PremiumSummary { get; set; }
        public string BasePremium { get; set; }
        public string GST { get; set; }
        public string TotalPremium { get; set; }
    }

    #endregion


    public class policyGWPDTO
    {
        public policyGWPDTO()
        {
            Issuedate = new List<int>();
            IssueMonth = new List<int>();
        }
        public decimal PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public decimal Count { get; set; }
        public decimal? SumGPA { get; set; }
        public List<int> Issuedate { get; set; }
        public List<int> IssueMonth { get; set; }

    }

    public class Graphdata
    {
        public string Month { get; set; }
        public decimal? Amount { get; set; }
        public int count { get; set; }

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
        public decimal EnvId { get; set; }

    }
    public class PolicycancelDTO
    {
        public string EventId;
        public string Policynumber;
        public string PolicyStatusId;
        public string Remarks;

    }
    public class PolicysearchDTO
    {
        public bool Flag;
        public string Proposalnumber;
        public string Policynumber;
        public string EventId;
        public string ProductId;
        public string PartnerId;
        public string MobileNumber;
        public string Email;
        public string Insuredreference;
        public DateTime? EventDate;
    }

    public class PolicyCancelTransaction
    {
        public decimal PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public string AccountNo { get; set; }
        public string PolicyNo { get; set; }
        public string TxnType { get; set; }
        public decimal TxnAmount { get; set; }
        public decimal PaymentId { get; set; }
        public bool IsRefund { get; set; }
        public string TxnId { get; set; }
    }
    public class PolicyDates
    {
        public DateTime PolicyStartDate { get; set; }
        public DateTime PolicyEndDate { get; set; }
    }
    public class PolicyDataForClaims
    {
        public decimal PolicyId { get; set; }
        public string PolicyNo { get; set; }
        public string ProductName { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
    }
    public class BillingEventRequest
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal CustomerId { get; set; }
        public decimal EvtId { get; set; }
    }

    //public class BillingEventDataDTO
    //{
    //    public int Count { get; set; }
    //    public string ProductCode { get; set; }
    //    public string ProductName { get; set; }
    //    public decimal SumInsured { get; set; }
    //    public int? ProductId { get; set; }
    //    public decimal Premium { get; set; }
    //}
    public class BillingEventResponseDTO
    {
        public BillingEventResponseDTO()
        {
            billingEventDataDTOs = new List<BillingEventDataDTO>();
            policyEventDTOs = new List<PolicyEventDTO>();
        }
        public List<BillingEventDataDTO> billingEventDataDTOs { get; set; }
        public List<PolicyEventDTO> policyEventDTOs { get; set; }
    }
    public class PolicyEventDTO
    {
        public string PolicyNo { get; set; }
        //public int? ProductId { get; set; }
        public string ProductName { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public DateTime CreatedDate { get; set; }

    }
    public class AccountMapDetailsDto
    {
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string TypeofTransaction { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public string SubLedgerReference { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string LedgerObject { get; set; }
        public string LedgerColName { get; set; }
        public string TableName { get; set; }
        public decimal SubLedgerReferencesId { get; set; }
    }


    //public class SendTransactionDto
    //{
    //    public decimal TransactionId { get; set; }
    //    public string TypeOfTransaction { get; set; }
    //    public decimal? Amount { get; set; }
    //    public string Description { get; set; }
    //    public DateTime? CreatedDate { get; set; }
    //    public string IsActive { get; set; }
    //    public string RuleName { get; set; }
    //    public string Object { get; set; }
    //    public string Event { get; set; }
    //    public string AccountType { get; set; }
    //    public string Value { get; set; }
    //    public int? AccountCode { get; set; }
    //    public string Currency { get; set; }
    //}
    //For Response Data
    public class TransactionRuleMappingDto
    {
        public TransactionRuleMappingDto()
        {
            TransactionConditions = new HashSet<TransactionConditionsDto>();
            SubLedgerReferences = new HashSet<SubLedgerReferencesDto>();
        }

        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<TransactionConditionsDto> TransactionConditions { get; set; }
        public virtual ICollection<SubLedgerReferencesDto> SubLedgerReferences { get; set; }
    }
    public class TransactionConditionsDto
    {
        public decimal TransactionConditionsId { get; set; }
        public string TypeofTransaction { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public string SubLedgerReference { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
    }

    public class SubLedgerReferencesDto
    {
        public decimal SubLedgerReferencesId { get; set; }
        public string LedgerObject { get; set; }
        public string LedgerColName { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string TableName { get; set; }

    }

    // Sending Transaction Data to One Shot In Accouting Transaction 
    public class TransactionHeaderDto
    {
        public TransactionHeaderDto()
        {
            Transaction = new List<TransactionDto>();
            TransactionSubLedger = new List<TransactionSubLedgerDto>();
        }

        public decimal TransactionHeaderId { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual List<TransactionDto> Transaction { get; set; }
        public virtual List<TransactionSubLedgerDto> TransactionSubLedger { get; set; }
    }
    public class TransactionDto
    {
        public decimal TransactionId { get; set; }
        public string TypeOfTransaction { get; set; }
        public decimal? Amount { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public int? AccountCode { get; set; }
        public string Currency { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal? ContractId { get; set; }
        public decimal? TransactionHeaderId { get; set; }
        public decimal? ProductId { get; set; }
    }
    public class TransactionSubLedgerDto
    {
        public decimal TransactionSubLedgerId { get; set; }
        public decimal TransactionHeaderId { get; set; }
        public decimal SubLedgerReferencesId { get; set; }
        public string Value { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
    }
    public class TransactionsResponse : ResponseStatus
    {
        public TransactionHeaderDto Transactions { get; set; }
    }

    public class PolicyInsurableResponse : ResponseStatus
    {
        public PolicyInsurableResponse()
        {
            policyInsurableDetails = new List<PolicyInsurableDetailsDTO>();
            InsurableItems = new List<ddDTOs>();
        }
        public List<ddDTOs> InsurableItems { get; set; }
        public List<PolicyInsurableDetailsDTO> policyInsurableDetails { get; set; }
    }
    public class PolicyInsurableDetailsDTO
    {
        public decimal InsurableId { get; set; }
        public string InsurableItem { get; set; }
        public string Name { get; set; }
        public string IdentificationNo { get; set; }
        public string CoverName { get; set; }
        public string CoverValue { get; set; }
        public decimal PolicyId { get; set; }
        public decimal? BenefitAmount { get; set; }
        public bool? IsActive { get; set; }

        public List<Dictionary<string, string>> coverDynamic { get; set; }
    }

    #region MultiCover
    public class InsuranceCertificateModel
    {
        public InsuranceCertificateModel()
        {
            cweDetails = new CweDetails();
            cweproductDetails = new List<CweProductDetails>();
            insurableItems = new List<CWEInsurableItems>();
            coverListDetails = new List<CoverListDetails>();
            cWEBenfitDetails = new List<CWEBenfitDetails>();
            insurableItemsdetails = new List<Insurabledetails>();
            premiumDetail = new PremiumDetail();


        }

        public DateTime? Date { get; set; }
        public PremiumDetail premiumDetail { get; set; }
        public InsurerDetails InsurerDetails { get; set; }
        public InsuredDetails insuredDetails { get; set; }
        public InsurerAddress insurerAddress { get; set; }
        public InsuredAddress insuredAddress { get; set; }
        public Policydetails policyDeatils { get; set; }
        public List<Insurabledetails> insurableItemsdetails { get; set; }
        public Premiumdetails premiumdetails { get; set; }
        public OfficeAddress officeAddress { get; set; }


        //cwe
        public List<CWEInsurableItems> insurableItems { get; set; }
        public CweDetails cweDetails { get; set; }
        public List<CweProductDetails> cweproductDetails { get; set; }
        public List<CoverListDetails> coverListDetails { get; set; }
        public List<CWEBenfitDetails> cWEBenfitDetails { get; set; }
        public bool IsAwsS3Save { get; set; }
        public EmailRequest EmailTest { get; set; }
    }
    public class InsurerDetails
    {
        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
    }
    public class InsuredDetails
    {
        public string InsuredContactName { get; set; }
        public string InsuredPhoneNumber { get; set; }
        public string InsuredEmailAddress { get; set; }
    }
    public class OfficeAddress
    {
        public string CompanyName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }

    }
    public class InsurerAddress
    {
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }

    }
    public class InsuredAddress
    {
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }

    }
    public class Policydetails
    {
        public string PolicyNumber { get; set; }
        public string ProductName { get; set; }
        public string PolicyStartDate { get; set; }
        public string PolicyEndDate { get; set; }
        public string PartnerName { get; set; }
        public string CoverEvent { get; set; }
    }
    public class Insurabledetails
    {
        public Insurabledetails()
        {
            coverages = new List<Coveragedetails>();
            lstInsurableItemsDetails = new List<InsurableItemsDetails>();
        }
        public string InsurableItem { get; set; }
        public int NumberOfItems { get; set; }
        //public List<string> Name { get; set; }
        public List<Coveragedetails> coverages { get; set; }
        public List<InsurableItemsDetails> lstInsurableItemsDetails { get; set; }
    }
    public class Coveragedetails
    {
        public Coveragedetails()
        {
            BenifitRangeDetails = new List<BenifitRangeDetails>();
        }
        public string CoverName { get; set; }
        public string CoverEventFactor { get; set; }
        public string CoverEventtFactorValue { get; set; }
        public string BenifitCriteria { get; set; }
        public string MaxBenifitCriteriaValue { get; set; }
        public decimal MaxBenifitCriteriaAmount { get; set; }
        public bool IsMaxBenefitAmount { get; set; }
        public string CoverValue { get; set; }
        public bool IsBenefitRange { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public List<BenifitRangeDetails> BenifitRangeDetails { get; set; }
    }
    public class InsurableItemsDetails
    {
        public string Name { get; set; }
        public string IdentificationNumber { get; set; }
    }
    public class Premiumdetails
    {
        public string BasePremium { get; set; }
        public string GST { get; set; }
        public string TotalPremium { get; set; }
    }

    //CWE
    public class CweDetails
    {
        public CweDetails()
        {
            cweProductDetails = new List<CweProductDetails>();
            cweinsurableItems = new List<CWEInsurableItems>();

        }
        public string cweType { get; set; }
        public List<CweProductDetails> cweProductDetails { get; set; }
        public List<CWEInsurableItems> cweinsurableItems { get; set; }
    }
    public class CWEInsurableItems
    {
        public CWEInsurableItems()
        {
            cweInsurableDetails = new List<CweProductDetails>();
            cwecoverListDetails = new List<CoverListDetails>();
        }
        public string InsurableItemName { get; set; }
        public List<CweProductDetails> cweInsurableDetails { get; set; }
        public List<CoverListDetails> cwecoverListDetails { get; set; }
    }
    public class CweProductDetails
    {
        public string Type { get; set; }
        public string Description { get; set; }
    }
    public class CoverListDetails
    {
        public CoverListDetails()
        {
            cwebenfitDetails = new List<CWEBenfitDetails>();
            cweCoverDetails = new List<CweProductDetails>();
        }

        public string CoverName { get; set; }
        public List<CweProductDetails> cweCoverDetails { get; set; }
        public List<CWEBenfitDetails> cwebenfitDetails { get; set; }

    }
    public class CWEBenfitDetails
    {
        public CWEBenfitDetails()
        {
            cweBenefitDetails = new List<CweProductDetails>();
        }
        public List<CweProductDetails> cweBenefitDetails { get; set; }
    }
    public class PremiumDetail
    {
        public PremiumDetail()
        {
            lstPremiumAmount = new List<PremiumLevelDetail>();
        }
        public string PremiumLevel { get; set; }
        public string Currency { get; set; }
        public List<PremiumLevelDetail> lstPremiumAmount { get; set; }
    }
    public class PremiumLevelDetail
    {
        public PremiumLevelDetail()
        {
            lstPremiumAmount = new List<PremiumAmount>();
        }
        public string ParticularName { get; set; }
        public List<PremiumAmount> lstPremiumAmount { get; set; }
    }
    public class PremiumAmount
    {
        public string Name { get; set; }
        public decimal? Amount { get; set; }
    }
    #endregion

    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }

    public partial class CustomersDTO
    {
        public CustomersDTO()
        {
            // Contract = new HashSet<ContractDTO>();
            CustAddress = new HashSet<CustAddressDTO>();
            CustSpocDetails = new HashSet<CustSpocDetailsDTO>();
        }

        public decimal CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int CategoryId { get; set; }
        public int ConfigurationTypeId { get; set; }
        public int TypeId { get; set; }
        public string CorpAddressSameAs { get; set; }
        public string MailingAddressSameAs { get; set; }
        public byte[] Logo { get; set; }
        public string Website { get; set; }
        public string PhoneNo { get; set; }
        public string FaxNo { get; set; }
        public int? Levels { get; set; }
        public string RegistrationNo { get; set; }
        public string RegisteringAuthority { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string ServiceTaxRegistrationNumber { get; set; }
        public string Panno { get; set; }
        public string Tanno { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Code { get; set; }

        // public virtual ICollection<ContractDTO> Contract { get; set; }
        public virtual ICollection<CustAddressDTO> CustAddress { get; set; }
        public virtual ICollection<CustSpocDetailsDTO> CustSpocDetails { get; set; }
    }

    public partial class CustAddressDTO
    {
        public decimal AddressId { get; set; }
        public decimal? CustomerId { get; set; }
        public string AddressType { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int? PincodeId { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        //public virtual MasCityDTO City { get; set; }
        //public virtual MasCountryDTO Country { get; set; }
        ////public virtual TblCustomers Customer { get; set; }
        //public virtual MasDistrictDTO District { get; set; }
        //public virtual MasPinCodeDTO Pincode { get; set; }
        //public virtual MasPinCodeDTO State { get; set; }
    }

    public partial class CustSpocDetailsDTO
    {
        public decimal SpocId { get; set; }
        public decimal? CustomerId { get; set; }
        public string FirstName { get; set; }
        public string Mobileno { get; set; }
        public string EmailId { get; set; }
        public string Designation { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int? PincodeId { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? Doj { get; set; }
        public string PanNo { get; set; }
        public string LandLineOffice { get; set; }
        public string LandLineResidence { get; set; }
        public string UserName { get; set; }
        public int? MaritalStatusId { get; set; }
        public int? GenderId { get; set; }
        public string BranchName { get; set; }
        public int? BrachCode { get; set; }

        // public virtual MasCityDTO City { get; set; }
        // public virtual MasCountryDTO Country { get; set; }
        //// public virtual TblCustomers Customer { get; set; }
        // public virtual MasDistrictDTO District { get; set; }
        // public virtual MasPinCodeDTO Pincode { get; set; }
        // public virtual MasStateDTO State { get; set; }
    }
    public class PolicySearchDashboardDTO
    {
        public decimal? PartnerId { get; set; }
        public int? ProductId { get; set; }
    }

    public class PolicyCountDTO
    {
        public int Count { get; set; }
        public string ProductName { get; set; }
        public string PartnerName { get; set; }
        public decimal? PartnerId { get; set; }
        public int? ProductId { get; set; }
    }

    public partial class PartnerDetailsDTO
    {
        public decimal PartnerId { get; set; }
        public string PartnerName { get; set; }
        public string Email { get; set; }
    }
    public partial class EndorsmentDTO : ResponseStatus
    {
        public string PolicyNo { get; set; }

    }


    public class MasterCDDTO
    {

        public MasterCDDTO()
        {
            CdTransactionsDTO = new List<MasterCdTransactionsDTO>();

        }
        public string AccountNo { get; set; }
        public List<MasterCdTransactionsDTO> CdTransactionsDTO { get; set; }
        public BusinessStatus Status { get; set; }

    }
    public class MasterCdTransactionsDTO
    {
        public decimal ProductId { get; set; }
        public string TxnType { get; set; }
        public decimal Amount { get; set; }
        public string PaymentReferenceNo { get; set; }
        public Dictionary<string, decimal> RatingConfig { get; set; }

    }
    public class DynamicData
    {
        public DynamicData()
        {
            dictionary_rule = new RuleDTO();
            dictionary_rate = new RateDTO();
        }

        public dynamic dictionary_rule { get; set; }
        public dynamic dictionary_rate { get; set; }
    }
    public class RuleDTO
    {
        public string SI { get; set; }
        public string NOOFTW { get; set; }
        public string NOOFPC { get; set; }
    }

    public class RateDTO
    {
        public string DEXPRT_Exp { get; set; }
        public string PDAGERT_PAge { get; set; }
        public string ADDRVRT_DRV { get; set; }
        public string AVFACTORPC_PC_NOOFPC { get; set; }
        public string AVFACTORTW_TW_NOOFPC { get; set; }
        public string AVFACTORTW_TW_NOOFTW { get; set; }
        public string FSTTAX_TAXTYPE { get; set; }
        public string TSTTAX_TAXTYPE { get; set; }

    }

    public class CalculationResult
    {
        public string Entity { get; set; }
        public string EValue { get; set; }
    }

    public class RiskField
    {
        public string insurableName { get; set; }
        public dynamic Riskfields { get; set; }

    }
    public class InsurableField
    {
        public InsurableField()
        {
            RiskFields = new List<RiskField>();

        }
        public int DriverCount { get; set; }
        public string StartDate { get; set; }
        public string ProposalNumber { get; set; }
        public List<RiskField> RiskFields { get; set; }
    }
    public class PaymentInfo

    {

        public string RefrenceNumber { get; set; }

        public decimal Amount { get; set; }



    }
    //public partial class PremiumReturnDto

    //{

    //    public decimal PerDayPremium { get; set; }

    //    public decimal FireTheft365 { get; set; }

    //    public decimal ADPremium { get; set; }

    //    public decimal GST { get; set; }

    //    public decimal Total { get; set; }

    //    public decimal MonthlyPremium { get; set; }

    //}


    public partial class PremiumRequestDTO
    {
        public string StateCode { get; set; }
        public int SI { get; set; }
        public int NoOfPC { get; set; }
        public int NoOfTW { get; set; }
        public int DriverAge { get; set; }
        public int DriverExp { get; set; }
        public int AdditionalDriver { get; set; }
        public string BillingFrequency { get; set; }
    }
    public partial class PremiumReturnDto : ResponseStatus
    {
        public decimal PerDayPremium { get; set; }
        public decimal FireTheft { get; set; }
        public decimal ADPremium { get; set; }
        public decimal GST { get; set; }
        public decimal Total { get; set; }
        public decimal MonthlyPremium { get; set; }
        public decimal FinalAmount { get; set; }


        public decimal FTTax { get; set; }
        public decimal ADTax { get; set; }
        public decimal TotalFTAmount { get; set; }
        public decimal TotalADAmount { get; set; }

    }

    public class CdTransactionsMasterDTO
    {
        public decimal ProductId { get; set; }
        public string TxnType { get; set; }
        public string Type { get; set; }
        public string AccountNo { get; set; }
        public string Frequency { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalGSTAmount { get; set; }
        public Dictionary<string, TxnParameterDTO> PremiumDetails { get; set; }


    }
    public class TxnParameterDTO
    {

        public decimal Amount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Total { get; set; }

    }

    public class TaxTypeDTO
    {
        public string FSTTAX_TAXTYPE { get; set; }
        public string TSTTAX_TAXTYPE { get; set; }
    }


    public class CDTaxTypeDTO
    {
        public string Type { get; set; }
        public decimal TaxAmount { get; set; }
    }

    public class CDTaxAmountDTO
    {
        public CDTaxAmountDTO()
        {
            Tax = new List<CDTaxTypeDTO>();
        }

        public decimal TaxAmount { get; set; }
        public List<CDTaxTypeDTO> Tax { get; set; }
    }

    public class CDPremiumDTO
    {
        public CDPremiumDTO()
        {
            TaxAmount = new CDTaxAmountDTO();
        }

        public string Type { get; set; }
        public decimal TxnAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public CDTaxAmountDTO TaxAmount { get; set; }
    }

    public class MicaCDDTO
    {
        public MicaCDDTO()
        {
            PremiumDTO = new List<CDPremiumDTO>();
        }

        public string TxnType { get; set; }
        public string Type { get; set; }
        public string AccountNo { get; set; }
        public decimal FtPerDay { get; set; }
        public decimal AdPerDay { get; set; }
        public decimal CumFtPerDay { get; set; }
        public decimal CumAdPerDay { get; set; }
        public decimal TxnAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public List<CDPremiumDTO> PremiumDTO { get; set; }

    }

    public class ErrorDetailsData
    {
        public string ValidatorName { get; set; }
        public string Outcome { get; set; }
        public string Message { get; set; }
        public string Code { get; set; }
    }
    public class MicaCD
    {
        public string Description { get; set; }
        public string Frequency { get; set; }
        public string AccountNo { get; set; }
        public DateTime? UserDateTime { get; set; }
        public List<MicaCDDTO> micaCDDTO { get; set; }
    }
    public class CDMapper
    {
        public string Type { get; set; }
        public dynamic Data { get; set; }
    }
    public class DailyDTO : ResponseStatus
    {
        public string AccountNo { get; set; }
        public decimal? AvailableAmount { get; set; }
        public string TxnEventType { get; set; }
        public CdTransactionsMasterDTO cdTransactionsMasterDTO { get; set; }

    }

    public class UploadDocument
    {
        public string DmsdocId { get; set; }
        public string DocumentView { get; set; }
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
    }
   
    public class PolicyCancelResponse
    {
        public double NoofDayRemaining { get; set; }
        public double NoofUnusedDays { get; set; }
        public decimal? FTPremium { get; set; }
        public decimal? ADPremium { get; set; }
        public decimal? TotalPremium { get; set; }

    }

    public partial class PolicyCancelReturnDto : ResponseStatus
    {
        public decimal FireTheft { get; set; }
        public decimal FTFromTax { get; set; }
        public decimal FTToTax { get; set; }
        public decimal Total { get; set; }
        public decimal FinalTotal { get; set; }
        public string FromTaxType { get; set; }
        public string ToTaxType { get; set; }

    }
    public class CDBalanceDTO : ResponseStatus
    {
        public string AccountNo { get; set; }
        public string TxnEventType { get; set; }
        public DateTime? TxnDateTime { get; set; }
        public decimal? TxnAmountBalance { get; set; }
        public decimal? TaxAmountBalance { get; set; }
        public decimal? TotalAvailableBalance { get; set; }



    }
    public class PolicyRefund
    {
        public decimal RefundId { get; set; }
        public string EndorsementNumber { get; set; }
        public DateTime? EndorsementEffectivedate { get; set; }
        public DateTime? TxnDate { get; set; }
        public decimal? TotalRefundAmount { get; set; }
        public string PaymentGatewayReferenceId { get; set; }
        public decimal? AmountPaid { get; set; }
        public DateTime? DateOfPayment { get; set; }
        public decimal? PolicyId { get; set; }
        public string PaymentStatus { get; set; }
        public string UpdatedResponse { get; set; }
    }
    public class PolicyCancelRequest
    {
        public string ProposalNumber { get; set; }
        public string PolicyNumber { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public DateTime? CancelRequestDate { get; set; }
    }
    public class FileUploadResponse : ResponseStatus
    {
        public FileUploadResponse()
        {
            ErrorDetails = new HashSet<ShowErrorInfoDetails>();
        }
        public virtual ICollection<ShowErrorInfoDetails> ErrorDetails { get; set; }
    }
    public class ReportFileUploadResponse : ResponseStatus
    {
        public ReportFileUploadResponse()
        {
            ErrorDetails = new HashSet<ShowReportErrorInfoDetails>();
        }
        public virtual ICollection<ShowReportErrorInfoDetails> ErrorDetails { get; set; }
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
    public class EndorsementResponse
    {
        public string EndorsementNo { get; set; }
        public DateTime? EndorsementEffectivedate { get; set; }
        public string Action { get; set; }
        public string UpdatedResponse { get; set; }
    }
    public class EndorsementSearch
    {
        public string PolicyNumber { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
    public class PolicyStatusDTO
    {
        public int Id { get; set; }
        public string PolicyNumber { get; set; }
        public int? PolicyStatus { get; set; }
        public DateTime? TxnDateTime { get; set; }

    }
    public class PolicyStatusResponseDTO : ResponseStatus
    {
        public PolicyStatusResponseDTO()
        {
            PolicyStatus = new PolicyStatusDTO();
        }
        public PolicyStatusDTO PolicyStatus { get; set; }
    }

    public class CancelScheduleDTO
    {
        public string ProposalNumber { get; set; }
        public DateTime CreatedDate { get; set; }
        public string MobileNumber { get; set; }
    }

    public class ProposalCancelDTO
    {
        public string ProposalNumber { get; set; }
        public string Remarks { get; set; }
    }

    public class SMSRequest
    {
        public string APIKey { get; set; }
        public string SenderId { get; set; }
        public string Channel { get; set; }
        public string RecipientNumber { get; set; }
        public string PolicyNumber { get; set; }
        public string SMSMessage { get; set; }
        public string DCS { get; set; }
        public bool FlashSMS { get; set; }
        public string CountryCode { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Short { get; set; }
        public string[] RecipientList { get; set; }
    }


    public class EmailRequest
    {
        public EmailRequest()
        {
            Attachments = new List<EmailAttachment>();
            mailTo = new List<string>();
            mailCc = new List<string>();
            mailBcc = new List<string>();
        }
        public string To { get; set; }
        public List<string> mailTo { get; set; }
        public List<string> mailCc { get; set; }
        public List<string> mailBcc { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string PartnerEmail { get; set; }
        public bool IsAttachment { get; set; }
        public List<EmailAttachment> Attachments { get; set; }
    }
    public class EmailAttachment
    {
        public string FileName { get; set; }
        public byte[] FileData { get; set; }
    }
    public partial class VehicleStatusDTO
    {
        public string PolicyNumber { get; set; }
        public string VehicleNumber { get; set; }
        public bool Status { get; set; }
    }

    public class PolicyAgreementResponse : ResponseStatus
    {
        public PolicyAgreementDTO policyAgreement { get; set; }
        public EditAssignProductDTO editAssign { get; set; }
    }
    public partial class PolicyAgreementDTO
    {
        public decimal PolicyId { get; set; }
        public string PolicyNo { get; set; }
        public short? PolicyVersion { get; set; }
        public int? AgentBusinessTypeId { get; set; }
        public decimal? AgentId { get; set; }
        public int? SubAgentId { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public DateTime? PolicyEndDate { get; set; }
        public TimeSpan? InceptionTime { get; set; }
        public decimal? SumInsured { get; set; }
        public int? BranchIdPk { get; set; }
        public int? ProductIdPk { get; set; }
        public string PolicyTypeId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Channel { get; set; }
        public string DocumentType { get; set; }
        public int? PolicyStatusId { get; set; }
        public int? BusinessTypeId { get; set; }
        public string QuoteNo { get; set; }
        public DateTime? QuoteDate { get; set; }
        public string ProposalNo { get; set; }
        public DateTime? ProposalDate { get; set; }
        public string CoverNoteNo { get; set; }
        public DateTime? CoverNoteIssueDate { get; set; }
        public int? PolicyStageStatusId { get; set; }
        public DateTime PolicyIssueDate { get; set; }
        public int? PolicyStageId { get; set; }
        public string MasterPolicyNo { get; set; }
        public string PolicyRemarks { get; set; }
        public string Smcode { get; set; }
        public int? Irccode { get; set; }
        public int? CustomerId { get; set; }
        public int? Csoid { get; set; }
        public short IsUploadedToIcm { get; set; }
        public decimal? CorporateId { get; set; }
        public decimal? BundleId { get; set; }
        public string BundleTxnId { get; set; }
        public decimal? BundleParentId { get; set; }
        public bool? IsIrdaupdated { get; set; }
        public string Currency { get; set; }
        public string Rate { get; set; }
        public string PartnerName { get; set; }
        public string ProductName { get; set; }
      
    }
    public class EditAssignProductDTO
    {
        public decimal PolicyId { get; set; }
        public DateTime? PolicyEndDate { get; set; }
        public decimal? AgentId { get; set; }
    }
    public partial class PolicyExceptionDTO
    {
        public decimal ExceptionId { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public string PolicyNumber { get; set; }
        public int? NoofPcs { get; set; }
        public int? NoofTws { get; set; }
        public int? PrimaryDriverAge { get; set; }
        public int? PrimaryDriverExperience { get; set; }
        public int? NoofAddnlDrivers { get; set; }
        public decimal? SumInsured { get; set; }
        public string Frequency { get; set; }
        public decimal? Fttotal { get; set; }
        public decimal? Adtotal { get; set; }
        public decimal? TotalPremium { get; set; }
        public decimal? PbtotalPremium { get; set; }
        public string TxnId { get; set; }
        public string PaymentReferenceId { get; set; }
        public decimal? PaidAmount { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string PaymentStatus { get; set; }
        public string RequestObject { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? Status { get; set; }
        public decimal? DifferenceAmount { get; set; }
    }
    public class UpdateCardDetails
    {
        public string PolicyNumber { get; set; }
        public string MobileNumber { get; set; }
        public string RefrenceNumber { get; set; }
    }
    public partial class PolicyDetailsDTOResponse : ResponseStatus
    {
        public dynamic PolicyDetails { get; set; }
    }
}


