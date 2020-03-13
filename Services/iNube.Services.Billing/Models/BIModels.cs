using iNube.Services.Billing.Entities;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace iNube.Services.Billing.Models
{

    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }

    public partial class objParamDTO
    {
        public decimal mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }

    public partial class BillingConfigDTO
    {
        public BillingConfigDTO()
        {
            TblBillingItem = new HashSet<TblBillingItem>();
        }

        public decimal BillingConfigId { get; set; }
        public decimal ContractId { get; set; }
        public DateTime? BillingStartDate { get; set; }
        public DateTime? BillingEndDate { get; set; }
        public int? CurrencyId { get; set; }
        public string Remarks { get; set; }
        public decimal? BillingAmount { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual TblContract Contract { get; set; }
        public virtual ICollection<TblBillingItem> TblBillingItem { get; set; }
    }

    public partial class BillingItemDetailDTO
    {
        public decimal BillingItemDetailId { get; set; }
        public decimal BillingItemId { get; set; }
        public int? SeqNo { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? DueDate { get; set; }
        public int? From { get; set; }
        public int? To { get; set; }
        public decimal? RatePercent { get; set; }
        //public string IsActive { get; set; }

        //public virtual BillingItemDTO BillingItem { get; set; }
    }


    public class BillingIDetailDTO
    {
        public BillingIDetailDTO()
        {
            BillingitemAdd = new List<BillingItemDetailDTO>();
        }
        public List<BillingItemDetailDTO> BillingitemAdd { get; set; }
    }

    public partial class ObjectsDTO
    {
        public int ObjectId { get; set; }
        public string ObjectName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public int? Seq { get; set; }
    }

    public partial class ContractDTO
    {
        public ContractDTO()
        {
            TblBillingConfig = new HashSet<BillingConfigDTO>();
            TblInvoiceConfig = new HashSet<InvoiceConfigDTO>();
        }
        public decimal ContractId { get; set; }
        public string ContractName { get; set; }
        public decimal? VendorId { get; set; }
        public decimal CustomerId { get; set; }
        public DateTime? ContractEffectiveDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public int? MaxCreditPeriod { get; set; }
        public decimal? MaxCreditAmountAllowed { get; set; }
        public int? GracePeriod { get; set; }
        public int? CurrencyId { get; set; }
        public string Pono { get; set; }
        public DateTime? Podate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        //   public virtual TblCustomers Customer { get; set; }
          public virtual ICollection<BillingConfigDTO> TblBillingConfig { get; set; }
        public virtual ICollection<InvoiceConfigDTO> TblInvoiceConfig { get; set; }
        // public virtual ICollection<TblContractDoc> TblContractDoc { get; set; }
    }

    public partial class BillingItemDTO
    {
        public BillingItemDTO()
        {
            TblBillingItemDetail = new HashSet<BillingItemDetailDTO>();
        }

        public decimal BillingItemId { get; set; }
        public decimal BillingConfigId { get; set; }
        public string BillingTypeDesc { get; set; }
        // public int? BillingTypeId { get; set; }
        // public int? BillingObjectId { get; set; }
        //  public int? BillingEventId { get; set; }
        public int? BillingFrequencyId { get; set; }
        public int? NoofFrequency { get; set; }
        public int? CategoryTypeId { get; set; }
        public int? ValueFactorId { get; set; }
        public int? RateCategoryId { get; set; }
        public int? RateTypeId { get; set; }
        public int? Threshold { get; set; }
        public decimal? Rate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? EventMappingId { get; set; }
        // public string IsActive { get; set; }

        // public virtual BillingConfigDTO BillingConfig { get; set; }
        public virtual ICollection<BillingItemDetailDTO> TblBillingItemDetail { get; set; }
    }

    public partial class HistoryDTO
    {
        public DateTime? ModifiedDate { get; set; }
        //public int? BillingTypeId { get; set; }
        //public string BillingType { get; set; }
        //public int? BillingObjectId { get; set; }
        //public string Details { get; set; }
        public int? CurrencyId { get; set; }
        public string CurrencyType { get; set; }
        public int? BillingFrequencyId { get; set; }
        public string BillingFrequency { get; set; }
        public DateTime? EfficitiveDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? EventMappingId { get; set; }
        public string EventMap { get; set; }
        // public DateTime? DueDate { get; set; }

    }

    public partial class BillingSearchDTO
    {
        public string CustomerName { get; set; }
        public decimal ContractId { get; set; }
        public string ContractName { get; set; }
        public DateTime? BillingStartDate { get; set; }
        public DateTime? BillingEndDate { get; set; }
        public decimal BillingConfigId { get; set; }
    }

    public class OrganizationResponse : ResponseStatus
    {
        public OrganizationDTO Organization { get; set; }
    }

    public partial class OrganizationDTO
    {
        public OrganizationDTO()
        {
            OrgAddress = new HashSet<OrgAddressDTO>();
            OrgSpocDetails = new HashSet<OrgSpocDetailsDTO>();
        }

        public decimal OrganizationId { get; set; }
        public int OrgCategoryId { get; set; }
        public int ConfigurationTypeId { get; set; }
        public int OrgTypeId { get; set; }
        public string OrgName { get; set; }
        public string CorpAddressSameAs { get; set; }
        public string MailingAddressSameAs { get; set; }
        public byte[] OrgLogo { get; set; }
        public string OrgWebsite { get; set; }
        public string OrgPhoneNo { get; set; }
        public string OrgFaxNo { get; set; }
        public int? OrgLevels { get; set; }
        public string OrgRegistrationNo { get; set; }
        public string OrgRegisteringAuthority { get; set; }
        public DateTime? OrgRegistrationDate { get; set; }
        public string OrgServiceTaxRegistrationNumber { get; set; }
        public string OrgPanno { get; set; }
        public string OrgTanno { get; set; }
        public decimal? CustomerId { get; set; }
        public decimal? ParentId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual ICollection<OrgAddressDTO> OrgAddress { get; set; }
        public virtual ICollection<OrgSpocDetailsDTO> OrgSpocDetails { get; set; }
    }
    public partial class OrgAddressDTO
    {
        public decimal OrgAddressId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string OrgAddressType { get; set; }
        public int? OrgCountryId { get; set; }
        public int? OrgStateId { get; set; }
        public int? OrgDistrictId { get; set; }
        public int? OrgCityId { get; set; }
        public string OrgAddressLine1 { get; set; }
        public string OrgAddressLine2 { get; set; }
        public string OrgAddressLine3 { get; set; }
        public int? OrgPincodeId { get; set; }
    }

    public partial class OrgSpocDetailsDTO
    {
        public decimal OrgSpocId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string SpocfirstName { get; set; }
        public string Spocmobileno { get; set; }
        public string SpocemailId { get; set; }
        public string Spocdesignation { get; set; }
        public int? SpoccountryId { get; set; }
        public int? SpocstateId { get; set; }
        public int? SpocdistrictId { get; set; }
        public int? SpoccityId { get; set; }
        public string SpocaddressLine1 { get; set; }
        public string SpocaddressLine2 { get; set; }
        public string SpocaddressLine3 { get; set; }
        public int? SpocpincodeId { get; set; }
        public string SpocMiddleName { get; set; }
        public string SpocLastName { get; set; }
        public DateTime? Spocdob { get; set; }
        public DateTime? Spocdoj { get; set; }
        public string SpocpanNo { get; set; }
        public string LandLineOffice { get; set; }
        public string LandLineResidence { get; set; }

        public string SpocUserName { get; set; }
        public int? SpocMaritalStatusId { get; set; }
        public int? SpocGenderId { get; set; }
    }

    public partial class CustomerSearchDTO
    {
        public decimal CustomerId { get; set; }
        public string CustomerName { get; set; }
        public decimal ContractId { get; set; }
        public string ContractName { get; set; }

    }

    public class CustomerResponse : ResponseStatus
    {
        public CustomersDTO customer { get; set; }
        public BusinessStatus Status { get; internal set; }
    }

    public partial class CustomersDTO
    {
        public CustomersDTO()
        {
           Contract = new HashSet<ContractDTO>();
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

        public virtual ICollection<ContractDTO> Contract { get; set; }
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
    public partial class PaymentListDTO
    {
        public PaymentListDTO()
        {
            payment = new List<PaymentDTO>();
           
        }
        public int? InvoiceId { get; set; }

        public virtual List<PaymentDTO> payment { get; set; }
    }
    public partial class PaymentHistoryDTO
    {
        public decimal PaymentId { get; set; }
        public int PaymentTypeId { get; set; }
        public string PaymentType { get; set; }
        public string BankName { get; set; }
        public string IfscCode { get; set; }
        public int? PaymentRefId { get; set; }
        public decimal? Paymentamount { get; set; }
        public DateTime? PaymentDate { get; set; }
        public DateTime? RealisedDate { get; set; }
        public int? StatusId { get; set; }
        public string Status { get; set; }     
    }
    public partial class CustomerConfigDTO
    {
        public decimal CustConfigId { get; set; }
        public decimal? CustomerId { get; set; }
        public int? TaxSetupId { get; set; }
        public int? CurrencyId { get; set; }
        public byte[] Image { get; set; }
        public string PdfTemplateName { get; set; }
        public int? ThemeId { get; set; }
        public int? EnvironmentSetupid { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string IsActive { get; set; }

       // public virtual CustomersDTO Customer { get; set; }
    }
    public partial class CustConfigImg : ResponseStatus
    {
        public decimal CustConfigId { get; set; }
        public byte[] Image { get; set; }
    }

    public class FileUploadDTO
    {
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public byte[] FileData { get; set; }
        public string ContentType { get; set; }
    }





    public partial class ContractDocDTO:ResponseStatus
    {
        public int ContractDocId { get; set; }
        public decimal ContractId { get; set; }
        public DateTime? UploadDate { get; set; }
        public string DocumentName { get; set; }
        public byte[] DocumentStr { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
    }

    

    public partial class InvoiceDTO
    {
        public InvoiceDTO()
        {
            InvoiceDetails = new HashSet<InvoiceDetailDTO>();
        }
        public decimal InvoiceId { get; set; }
        public decimal InvoiceConfigId { get; set; }
        public decimal? ContractId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public decimal? InvAmount { get; set; }
        public decimal? RevisedInvAmount { get; set; }
        public decimal? PaymentRecd { get; set; }
        public decimal? Balance { get; set; }
        public decimal? PenaltyAmount { get; set; }
        public int? DefaultDays { get; set; }
        public decimal? OtherAmount { get; set; }
        public decimal? TaxAmount { get; set; }
        public decimal? Discount { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? StatusId { get; set; }
        public int? CreatedBy { get; set; }
        public string CreatedUserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string InvoiceNo { get; set; }
        public decimal? GstPercent { get; set; }
        public DateTime? DueDate { get; set; }
        public virtual ICollection<InvoiceDetailDTO> InvoiceDetails { get; set; }
    }

    public partial class InvoiceConfigDTO
    {
        public InvoiceConfigDTO()
        {
            TblInvoice = new List<InvoiceDTO>();
        }
        public decimal InvoiceConfigId { get; set; }
        public decimal? ContractId { get; set; }
        public DateTime? InvoiceStartDate { get; set; }
        public DateTime? InvoiceEndDate { get; set; }
        public int? FrequencyId { get; set; }
        public decimal? PenaltyPercentage { get; set; }
        public int? InvoiceCreditPeriod { get; set; }
        public int? InvoiceGracePeriod { get; set; }
        public DateTime? LastCycleExecDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<InvoiceDTO> TblInvoice { get; set; }
    }

    public partial class InvoiceDetailDTO
    {
        public decimal InvoiceDetailId { get; set; }
        public decimal InvoiceId { get; set; }
        public decimal? BillingItemId { get; set; }
        public int? SeqNo { get; set; }
        public decimal? Value { get; set; }
        public int? EventMappingId { get; set; }
        public int? Eventcount { get; set; }
        public Guid? CreatedUserId { get; set; }
    }



    public partial class MasCountryDTO
    {
        public MasCountryDTO()
        {
            MasStateDTO = new HashSet<MasStateDTO>();
        }

        public int CountryId { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual ICollection<MasStateDTO> MasStateDTO { get; set; }

    }

    public partial class MasStateDTO
    {
        public MasStateDTO()
        {
            MasDistrictDTO = new HashSet<MasDistrictDTO>();
        }

        public int StateId { get; set; }
        public int? CountryId { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual MasCountryDTO Country { get; set; }
        public virtual ICollection<MasDistrictDTO> MasDistrictDTO { get; set; }
    }


    public partial class MasDistrictDTO
    {
        public MasDistrictDTO()
        {
            MasCityDTO = new HashSet<MasCityDTO>();
        }

        public int DistrictId { get; set; }
        public int? StateId { get; set; }
        public string DistrictCode { get; set; }
        public string DistrictName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual MasStateDTO State { get; set; }
        public virtual ICollection<MasCityDTO> MasCityDTO { get; set; }
    }

    public partial class MasCityDTO
    {
        public MasCityDTO()
        {
            MasPinCodeDTO = new HashSet<MasPinCodeDTO>();
        }
        public int CityId { get; set; }
        public int? DistrictId { get; set; }
        public string CityCode { get; set; }
        public string Pincode { get; set; }
        public string CityName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual MasDistrictDTO District { get; set; }
        public virtual ICollection<MasPinCodeDTO> MasPinCodeDTO { get; set; }

    }


    public partial class MasPinCodeDTO
    {
        public int PincodeId { get; set; }
        public int? CityId { get; set; }
        public string Pincode { get; set; }
        public string AreaName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }


    public partial class PaymentDTO
    {
        public decimal PaymentId { get; set; }
        public int PaymentTypeId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public DateTime? RealisedDate { get; set; }
        public int? PaymentRefId { get; set; }
        public int? InvoiceId { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string IfscCode { get; set; }
        public int? StatusId { get; set; }
        public string Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? Paymentamount { get; set; }
    }

    public partial class MasBicommonTypesDTO
    {
        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }

    public partial class InvoiceRequest
    {
        public DateTime? InvoiceStartDate { get; set; }
        public DateTime? InvoiceEndDate { get; set; }
        //public int? FrequencyId { get; set; }
        public decimal CustomerId { get; set; }
        public decimal EnvId { get; set; }
    }
    

    public class InvoiceResponse : ResponseStatus
    {
        public InvoiceConfigDTO invoice { get; set; }
    }

    public class BillingEventDetail
    {
        public int ProductCode { get; set; }
        public string ProductName { get; set; }
        public int PolicyCount { get; set; }
        public int Premium { get; set; }
        public int SumInsured { get; set; }
    }

    public class RangeValue
    {
        public int From { get; set; }
        public int To { get; set; }
        public decimal Rate { get; set; }
    }
    public partial class ProductDTO
    {
        public int ProductId { get; set; }
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
        public string LOB { get; set; }
        public string COB { get; set; }

        public virtual ICollection<ProductBenefitsDTO> ProductBenefits { get; set; }
        public virtual ICollection<ProductChannelsDTO> ProductChannels { get; set; }
        public virtual ICollection<ProductClausesWarrentiesExclusionsDTO> ProductClausesWarrentiesExclusions { get; set; }
        public virtual ICollection<ProductCoversDTO> ProductCovers { get; set; }
        public virtual ICollection<ProductInsurableItemsDTO> ProductInsurableItems { get; set; }
        public virtual ICollection<ProductRcbdetailsDTO> ProductRcbdetails { get; set; }
        public virtual ICollection<ProductPremiumDTO> ProductPremium { get; set; }
        public virtual ICollection<ddDTOs> RiskDetails { get; set; }
        public virtual ICollection<ddDTOs> ClaimDetails { get; set; }
    }

    public partial class ProductCoversDTO
    {
        public decimal CoverId { get; set; }
        public int ProductId { get; set; }
        public int CoverTypeId { get; set; }
        public string CoverDescription { get; set; }
        public bool? SingleValue { get; set; }
        public string CoverEventFactorValueFrom { get; set; }
        public string CoverEventFactorValueTo { get; set; }
        public string CoverPeriod { get; set; }
        public int MaximumBenefitAmount { get; set; }
        public int CoverEventId { get; set; }
        public int CoverEventFactorId { get; set; }
        public int CoverEventFactorValueUnitId { get; set; }
        public string Cover { get; set; }
        public string CoverEvent { get; set; }
        public string CoverEventFactor { get; set; }
        public string CoverEventFactorValue { get; set; }
    }

    public partial class ProductChannelsDTO
    {
        public decimal ChannelId { get; set; }
        public int? ProductId { get; set; }
        public int? ChannelTypeId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public double? Brokage { get; set; }

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
        public string BenefitType { get; set; }
        public string CurrencyId { get; set; }
        //public string BenefitType { get; set; }
        //public string Product { get; set; }

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
        //public string ProductName { get; set; }
    }

    public partial class ProductInsurableItemsDTO
    {
        public decimal InsurableItemId { get; set; }
        public int ProductId { get; set; }
        public int InsurableItemTypeId { get; set; }

        //public string InsurableItemType { get; set; }
        //public string ProductName { get; set; }
    }

    public class ProductRcbdetailsDTO
    {
        public decimal RcbdetailsId { get; set; }
        public int? ProductId { get; set; }
        public int InputId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
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

    }
    public partial class ddDTOs
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public bool mIsRequired { get; set; }
    }

    public partial class ContractHistoryDetails
    {
        public decimal CustomerId { get; set; }
        public decimal ContractId { get; set; }
        public string CustomerName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ContractEffectiveDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public string Currency { get; set; }
        public decimal? MaxCreditAmountAllowed { get; set; }
        public int? MaxCreditPeriod { get; set; }
        public int? GracePeriod { get; set; }
        public string Pono { get; set; }
        public DateTime? Podate { get; set; }
        public string DocumentName { get; set; }
    }
    
    public partial class DocumentDTO
    {
        public int DocumentId { get; set; }
        public string DocumentName { get; set; }
    }

    public partial class InvoiceConfigHistory
    {
        public string Frequency { get; set; }
        public int InvoiceCreditPeriod { get; set; }
        public int InvoiceGracePeriod { get; set; }
        public DateTime InvoiceStartDate { get; set; }
        public DateTime InvoiceEndDate { get; set; }
    }

    public partial class InvoiceContractSearch
    {
        public string CustomerName { get; set; }
        public int InvoiceId { get; set; }
        public int? StatusId { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime? InvoiceEffectiveDate { get; set; }
        public DateTime? InvoiceEndDate { get; set; }
    }

    public partial class InvoiceCustSearch
    {
        public string CustomerName { get; set; }
        public int InvoiceId { get; set; }
        public int? StatusId { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime? InvoiceEffectiveDate { get; set; }
        public DateTime? InvoiceEndDate { get; set; }
        public decimal OrgId { get; set; }
        public decimal EnvId { get; set; }
    }

    public partial class InvoiceSearchHistory
    {
        public decimal ContractId { get; set; }
        public string OrgName { get; set; }
        public decimal InvoiceId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public int? CreditDaysRemaining { get; set; }
        public string Currency { get; set; }
        public decimal? InvAmount { get; set; }
        public string Status { get; set; }
        public decimal? Balance { get; set; }
        public string ContractName { get; set; }
        public int? StatusId { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime? InvoiceEffectiveDate { get; set; }
        public DateTime? InvoiceEndDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? Paid { get; set; }
        public DateTime? DueDate { get; set; }
        public int? DefaultDays { get; set; }
        public decimal? PenaltyRate { get; set; }
        public decimal? PenaltyAmount { get; set; }
        public decimal? RevisedInvoiceAmount { get; set; }
        public string UserId { get; set; }
        public DateTime ModifiedDate { get; set; }
        public decimal? PenaltyCalculation { get; set; }
        public decimal? RevisedPenaltyRate { get; set; }
        public decimal? RevisedPenaltyAmount { get; set; }
        public decimal? RevisedInvoiceAmountGrid { get; set; }
        public string UserName { get; set; }
        public decimal CustId { get; set; }
    }

    public class RegenerateInvoiceHistory
    {
        public decimal InvoiceId { get; set; }
        public string InvoiceNo { get; set; }
        public decimal? PenaltyRate { get; set; }
        public decimal? PenaltyAmount { get; set; }
        public decimal? InvAmount { get; set; }
        public decimal? PenaltyCalculation { get; set; }
        public decimal? RevisedPenaltyRate { get; set; }
        public decimal? RevisedPenaltyAmount { get; set; }
        public decimal? RevisedInvoiceAmount { get; set; }
        public string UserId { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

    public partial class ModifyContract
    {
        public decimal ContractId { get; set; }
        public string ContractName { get; set; }
        public string CustomerName { get; set; }
        public DateTime? EffectiveFromDate { get; set; }
        public DateTime? EffectiveToDate { get; set; }
        public string Currency { get; set; }
        public decimal? MaxCreditAmount { get; set; }
        public int? MaxCreditPeriod { get; set; }
        public int? GracePeriod { get; set; }
        public string Pono { get; set; }
        public DateTime? Podate { get; set; }
    }

    public partial class ContractSearch
    {
        public decimal ContractId { get; set; }
        public string ContractName { get; set; }
        public DateTime EffectiveFromDate { get; set; }
        public DateTime EffectveToDate { get; set; }
    }
    public partial class InvoicePenaltyDTO
    {
        public decimal InvoicePenaltyId { get; set; }
        public decimal InvoiceId { get; set; }
        public decimal? PenaltyRate { get; set; }
        public decimal? PenaltyAmount { get; set; }
        public decimal? RevisedInvAmount { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? CreatedUserId { get; set; }
    }

    public partial class RegenerateInvoice
    {
        public DateTime ModifiedDate { get; set; }
        public Guid? UserId { get; set; }
        public decimal? PenaltyRate { get; set; }
        public decimal? PenaltyAmount { get; set; }
        public decimal? InvoiceAmount { get; set; }
        public decimal RevisedPenaltyRate { get; set; }
        public decimal RevisedPenaltyAmount { get; set; }
        public decimal RevisedInvoiceAmount { get; set; }
                               
    }

    //Invoice Model
    public class InvoiceModel
    {
        public InvoiceModel()
        {
            InvoiceItemsModel = new InvoiceItemsModel();
            Address = new Address();
            BankDetails = new BankDetails();
            TaxDetails = new TaxDetails();
            Invoices = new List<InvoiceItemsDetails>();
            BuyersAddress = new BuyersAddress();
            EmailTest = new EmailRequest();
            OneTimeLicenseCost = new OneTimeLicenseCost();
            ProductCreation = new List<ProductCreation>();
            PolicyCreation = new List<PolicyCreation>();
            ClaimIntimation = new List<ClaimIntimation>();
            InvoiceSecondPageDetails = new InvoiceSecondPageDetails();
        }

        public InvoiceItemsModel InvoiceItemsModel { get; set; }
        public Address Address { get; set; }
        public BankDetails BankDetails { get; set; }
        public TaxDetails TaxDetails { get; set; }
        public List<InvoiceItemsDetails> Invoices { get; set; }
        public BuyersAddress BuyersAddress { get; set; }
        public EmailRequest EmailTest { get; set; }
        public OneTimeLicenseCost OneTimeLicenseCost { get; set; }
        public List<ProductCreation> ProductCreation { get; set; }
        public List<PolicyCreation> PolicyCreation { get; set; }
        public List<ClaimIntimation> ClaimIntimation { get; set; }
        public InvoiceSecondPageDetails InvoiceSecondPageDetails { get; set; }
    }

    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string PartnerEmail { get; set; }
        public bool IsAttachment { get; set; }
    }

    public class InvoiceItemsModel
    {

        public string InvoiceNo { get; set; }
        public string InvoiceDate { get; set; }
        public string SuppliesrsRef { get; set; }
        //public string OthersRef { get; set; }
        public string Days { get; set; }
        public string OrderNo { get; set; }
        public string PODate { get; set; }
        public double TotalAmount { get; set; }
        public decimal? TotalTaxAmount { get; set; }
        public string AmountInWords { get; set; }
        public string TaxAmountInWords { get; set; }
        public string TermsofDelivery { get; set; }
        public double TaxAmount { get; set; }
        public string GST { get; set; }
    }

    public class Address
    {
        public decimal AddressId { get; set; }
        public string Code { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string OfficeName { get; set; }
        public string OfficeNo { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string Statecode { get; set; }
        public string UIN { get; set; }
        public string CIN { get; set; }
        public string PAN { get; set; }
    }

    public class BuyersAddress
    {
        public string Buyer { get; set; }
        public string OthersRef { get; set; }//spoc name
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string UIN { get; set; }
        public string State { get; set; }
        public string Code { get; set; }
        public string CIN { get; set; }
        public string PAN { get; set; }
        public string CustEmail { get; set; }
    }


    public class InvoiceItemsDetails
    {

        public int SlNo { get; set; }
        public int? EventCount { get; set; }
        public string ItemDescription1 { get; set; }
        public string ItemDescription2 { get; set; }
        public string ItemDescription3 { get; set; }
        public string ItemDescription4 { get; set; }
        public string HSN { get; set; }
        public string GST { get; set; }
        public string Amount { get; set; }

    }

    public class BankDetails
    {
        public string TaxAmtInWords { get; set; }
        public string BankName { get; set; }
        public string AccNo { get; set; }
        public string Branch { get; set; }
        public string IFSC { get; set; }
        public string Remarks { get; set; }
        public string Remarks1 { get; set; }
        public string Remarks2 { get; set; }
        public string CompanysPAN { get; set; }
    }

    public class TaxDetails
    {
        public string TaxableValue { get; set; }
        public string Rate { get; set; }
        public string Amount { get; set; }
        public string TotalTaxAmount { get; set; }

    }

    public class OneTimeLicenseCost
    {
        public int SlNo { get; set; }
        public string ApplicationName { get; set; }
        public string Date { get; set; }
        public decimal OneTimeAmount { get; set; }
        public decimal OneTimeSubTotal { get; set; }
    }

    public class ProductCreation
    {
        public int SlNo { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal ProductAmount { get; set; }
        public decimal ProductSubTotal { get; set; }
    }

    public class PolicyCreation
    {
        public int SlNo { get; set; }
        public string PolicyNo { get; set; }
        public string ProductName { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal PolicyAmount { get; set; }
        public decimal PolicySubTotal { get; set; }
    }

    public class ClaimIntimation
    {
        public int SlNo { get; set; }
        public string ClaimNo { get; set; }
        public string PolicyNo { get; set; }
        public string ProductName { get; set; }
        public DateTime? LossDate { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal ClaimAmount { get; set; }
        public decimal ClaimSubTotal { get; set; }

    }
    public class BilingEventDataDTO

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
            BilingEventDataDTO = new List<BilingEventDataDTO>();
            productEventDTOs = new List<ProductEventDTO>();
            policyEventDTOs = new List<PolicyEventDTO>();
            claimEventDTOs = new List<ClaimEventDTO>();
        }
        public List<BilingEventDataDTO> BilingEventDataDTO { get; set; }
        public List<ProductEventDTO> productEventDTOs { get; set; }
        public List<PolicyEventDTO> policyEventDTOs { get; set; }
        public List<ClaimEventDTO> claimEventDTOs { get; set; }
    }

    public class ProductEventDTO
    {
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public DateTime? CreatedDate { get; set; }
    }

    public class PolicyEventDTO
    {
        public string PolicyNo { get; set; }
        public string ProductName { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class ClaimEventDTO
    {
        public string ClaimNo { get; set; }
        public string PolicyNo { get; set; }
        public string ProductName { get; set; }
        public DateTime? LossDate { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public DateTime? CreatedDate { get; set; }
    }

    public class InvoiceSecondPageDetails
    {
        public string Buyer { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime Date { get; set; }
        public decimal Total { get; set; }
        public string Currency { get; set; }
    }
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
    public class BillingEventRequest
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal CustomerId { get; set; }
        public decimal EvtId { get; set; }
    }

    public class InvoiceSearch
    {
        public decimal InvoiceId { get; set; }
        public decimal ContractId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public int? CreditDaysRemaining { get; set; }
        public int? CurrencyId { get; set; }
        public int InvoiceAmount { get; set; }
        public int BalanceAmount { get; set; }
        public string Status { get; set; }


    }

    public partial class NumberingSchemeDTO
    {
        public decimal NumberingSchemeId { get; set; }
        public string Fixedcode { get; set; }
        public int Nextnumber { get; set; }
        public int Highestnumber { get; set; }
        public int Step { get; set; }
        public Guid Rowguid { get; set; }
        public string NumberingType { get; set; }
        public decimal? InvoiceId { get; set; }
    }
    // for Accounitng Customer Details
    public partial class CustomersDTOS
    {
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
    }

    //For Accouting 
    public class EventMappingModel
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public int ObjectId { get; set; }
        public string ObjectName { get; set; }
        public string Parameter { get; set; }
        public string Tablename { get; set; }
        public string Colname { get; set; }
        public string Colvalue { get; set; }
    }

    public class EventObjParamMapping
    {
        public int ObjectId { get; set; }
        public string ObjectName { get; set; }
        public decimal EventParameterId { get; set; }
        public string Parameter { get; set; }
        public string TableName { get; set; }
        public string ColName { get; set; }
        public string ColType { get; set; }

    }
    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }

    public partial class ObjectEventMappingDTO
    {
        public ObjectEventMappingDTO()
        {
            InvoiceBillingDetailDTO = new HashSet<InvoiceBillingDetailDTO>();
        }

        public int EventMappingId { get; set; }
        public int? ObjectId { get; set; }
        public int? EventId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string Description { get; set; }
        public string Tablename { get; set; }
        public string Colname { get; set; }
        public string Colvalue { get; set; }

        public virtual ICollection<InvoiceBillingDetailDTO> InvoiceBillingDetailDTO { get; set; }
    }

    public class InvoiceBillingDetailDTO
    {
        public int InvoiceBillingDetailId { get; set; }
        public int? EventMappingId { get; set; }
        public decimal? InvoiceId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? Amount { get; set; }
        public string PolicyNo { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public string ClaimNumber { get; set; }
        public DateTime? LossDatetime { get; set; }

        public virtual ObjectEventMappingDTO EventMapping { get; set; }
        public virtual InvoiceDTO Invoice { get; set; }
    }

    public class InvoiceBillingDTO
    {
        public InvoiceBillingDTO()
        {
            InvoiceBillingDetailDTO = new List<InvoiceBillingDetailDTO>();
        }
        public decimal CustomerId { get; set; }
        public decimal InvoiceId { get; set; }
        public int EventMappingId { get; set; }
        public List<InvoiceBillingDetailDTO> InvoiceBillingDetailDTO { get; set; }
    }

    public class UserNameById
    {
        //public string UserId { get; set; }
        public string UserName { get; set; }
    }

    public class CustomerProvisioningDTO
    {
        public CustomerProvisioningDTO()
        {
            customerSettings = new List<CustomerSettingsDTO>();
        }
        public decimal? CustomerId { get; set; }
        public List<CustomerSettingsDTO> customerSettings { get; set; }
    }
    public partial class CustomerSettingsDTO
    {
        //public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string Type { get; set; }
        public string Key { get; set; }
        public string KeyValue { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }


    public partial class BillingEntriesDto
    {
        public decimal BillingItemId { get; set; }
        public int? Categoty { get; set; }
        public int? ValueFactor { get; set; }
        public int? RateCategory { get; set; }
        public int? RateType { get; set; }
        public decimal? Rate { get; set; }
        public int? EventMappingId { get; set; }

        public List<BillingItemDetailDTO> BillingItemDetails { get; set; }
    }
}
