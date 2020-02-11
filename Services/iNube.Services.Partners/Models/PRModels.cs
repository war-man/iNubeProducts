﻿using iNube.Services.Partners.Entities;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
namespace iNube.Services.Partners.Models
{
    #region Location
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
        public int? lobid { get; set; }
        public int? cobid { get; set; }
        public string productCode { get; set; }
    }
   
    public partial class LocationDTO
    {
        public string locationType { get; set; }
    }
    public partial class CountryDTO : LocationDTO
    {
        public int CountryId { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class StateDTO : LocationDTO
    {
        public int StateId { get; set; }
        public int? CountryId { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class DistrictDTO : LocationDTO
    {
        public int DistrictId { get; set; }
        public int? StateId { get; set; }
        public string DistrictCode { get; set; }
        public string DistrictName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class CityDTO : LocationDTO
    {
        public int CityId { get; set; }
        public int? DistrictId { get; set; }
        public string CityCode { get; set; }
        public string Pincode { get; set; }
        public string CityName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class PinCodeDTO : LocationDTO
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

    #endregion

    public partial class PRcommonTypesDTO
    {
        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }

    #region Organization
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

    public partial class OfficeSpocDetailsDTO
    {
        public decimal OfficeSpocid { get; set; }
        public decimal? OfficeId { get; set; }
        public string Spocname { get; set; }
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
    }

    public partial class OrgSearchDTO
    {
        public decimal OrganizationId { get; set; }
        public string OrgName { get; set; }
        public string OrgWebsite { get; set; }
        public string OrgPhoneNo { get; set; }
        public string OrgRegistrationNo { get; set; }
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

    public partial class OrgOfficeDTO
    {
        public OrgOfficeDTO()
        {
            OfficeSpocDetails = new HashSet<OfficeSpocDetailsDTO>();
        }

        public decimal OrgOfficeId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string OfficeName { get; set; }
        public string OfficeCode { get; set; }
        public string OfficePhoneNo { get; set; }
        public string OfficeFaxNo { get; set; }
        public int? OfficeLevelId { get; set; }
        public decimal? OfficeReportingOfficeId { get; set; }
        public int? OfficeCountryId { get; set; }
        public int? OfficeStateId { get; set; }
        public int? OfficeDistrictId { get; set; }
        public int? OfficeCityId { get; set; }
        public string OfficeAddressLine1 { get; set; }
        public string OfficeAddressLine2 { get; set; }
        public string OfficeAddressLine3 { get; set; }
        public int? OfficePincodeId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual ICollection<OfficeSpocDetailsDTO> OfficeSpocDetails { get; set; }
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

    #endregion

    #region Partner
    public partial class PartnersDTO
    {
        public PartnersDTO()
        {
            PartnerAddress = new HashSet<PartnerAddressDTO>();
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
        public string PartnerCode { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public string PartnerType { get; set; }
        public string PartnerClass { get; set; }
        public byte[] Logo { get; set; }
        public decimal? OrganizationId { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<PartnerAddressDTO> PartnerAddress { get; set; }
    }

    public partial class PartnerDetailsDTO
    {
        public decimal PartnerId { get; set; }
        public string PartnerName { get; set; }
        public string Email { get; set; }
        public decimal? OrgId { get; set; }
    }

    public partial class PartnerAddressDTO
    {
        public decimal PartnerAddressId { get; set; }
        public decimal? PartnerId { get; set; }
        public string PartnerAddressType { get; set; }
        public int? PartnerCountryId { get; set; }
        public int? PartnerStateId { get; set; }
        public int? PartnerDistrictId { get; set; }
        public int? PartnerCityId { get; set; }
        public string PartnerAddressLine1 { get; set; }
        public string PartnerAddressLine2 { get; set; }
        public string PartnerAddressLine3 { get; set; }
        public int? PartnerPincodeId { get; set; }
    }
    public partial class PartnerSearchDTO
    {
        public decimal? PartnerId { get; set; }
        public int? PartnerTypeId { get; set; }
        public int? PartnerClassId { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Pan { get; set; }
        public string partnerCode { get; set; }
        public string partnerName { get; set; }
        public int? Status { get; set; }
    }
    #endregion

    #region Policy
    public class AssignProductDTO
    {
        public decimal AssignProductID { get; set; }
        public decimal PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public DateTime AssignDate { get; set; }
        public DateTime EffectiveFrom { get; set; }
        public DateTime EffectiveTo { get; set; }
        public bool IsActive { get; set; }
        public string CreateBy { get; set; }
        public DateTime CreateDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool IsPaymentReceived { get; set; }
        public dynamic lstProductId { get; set; }
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
        public static implicit operator PolicyAgreementDTO(TblPolicyAgreement v)
        {
            throw new NotImplementedException();
        }
    }

    public class PartnerProductDTO
    {
        public decimal? AgentId { get; set; }
        public int? ProductIdPk { get; set; }
        public decimal PartnerId { get; set; }
        public decimal mID { get; set; }
        public string mValue { get; set; }
        public string PartnerName { get; set; }
    }

    #endregion
    public class SearchProductModel
    {
        public decimal PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public bool IsActive { get; set; }
        public bool IsPaymentReceived { get; set; }
    }

    #region Account
    public class CdAccountsDTO
    {
        public CdAccountsDTO()
        {
            Cdtransactions = new HashSet<CdTransactionsDTO>();
        }

        public decimal Cdid { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public string AccountNo { get; set; }
        public decimal? InitialAmount { get; set; }
        public decimal? AvailableBalance { get; set; }
        public decimal? LedgerBalance { get; set; }
        public decimal? ThresholdValue { get; set; }
        public decimal? DropLimit { get; set; }
        public bool IsLocked { get; set; }
        public string PaymentType { get; set; }
        public string Remark { get; set; }
        public string LOB { get; set; }
        public string COB { get; set; }
        public bool? Active { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string PartnerName { get; set; }
        public string ProductName { get; set; }
        public decimal? OrganizationId { get; set; }
        public virtual ICollection<CdTransactionsDTO> Cdtransactions { get; set; }
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
        public string CreatedBy { get; set; }
        public string Description { get; set; }
        public int? CreditAccountNo { get; set; }
        public int? PaymentModeId { get; set; }
        public string PaymentRefernceId { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public string PaymentType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual CdAccountsDTO AccountNoNavigation { get; set; }
    }
    public class SearchTransactionModel
    {
        public decimal PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public bool IsActive { get; set; }
        public bool IsPaymentReceived { get; set; }
        public string AccountNo { get; set; }
        public int? PaymentModeId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string PolicyNo { get; set; }
        public string TxnType { get; set; }
    }
    public class PolicyAgreementResponse : ResponseStatus
    {
        public PolicyAgreementDTO policyAgreement { get; set; }
    }
    public class PartnerResponse : ResponseStatus
    {
        public PartnersDTO partner { get; set; }
        public BusinessStatus Status { get; internal set; }
    }
    public class ReplnishCDResponse : ResponseStatus
    {
        public ReplnishCDResponse()
        {
            cdReplnish = new List<CdTransactionsDTO>();
        }
        public List<CdTransactionsDTO> cdReplnish { get; set; }
    }

    public class CdAccountResponseDTO : CdAccountsDTO
    {
        public int SrNo { get; set; }
        public string ProductName { get; set; }
        public string PartnerName { get; set; }
        public DateTime? BalancedDate { get; set; }
        BusinessStatus Status { get; set; }
    }
    public class CdTransactionsResponseDTO : CdTransactionsDTO
    {
        public int SrNo { get; set; }
        public string PaymentType { get; set; }
        public decimal? Credit { get; set; }
        public decimal? Debit { get; set; }
        public string PolicyNumber { get; set; }
        public string ProductName { get; set; }
        public string PartnerName { get; set; }

        BusinessStatus Status { get; set; }
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
        public decimal TxnId { get; set; }
        public decimal OrgId { get; set; }
        public string Description { get; set; }
    }

    public class CDAccountResponse : ResponseStatus
    {
        public CdAccountsDTO CdAccount { get; set; }
    }

    public class CdTransactionsResponse : ResponseStatus
    {
        public CdTransactionsDTO cdTransactions { get; set; }
    }

    public class OfficeResponse : ResponseStatus
    {
        public OrgOfficeDTO office { get; set; }
    }

    #endregion

    public class UserDTO
    {
        public UserDTO()
        {
            UserDetails = new List<UserDetailsDTO>();
            UserAddress = new List<UserAddressDTO>();
        }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public byte[] PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public int? FirstTimeLogin { get; set; }

        public virtual ICollection<UserDetailsDTO> UserDetails { get; set; }
        public virtual ICollection<UserAddressDTO> UserAddress { get; set; }
    }

    public class UserResponse : ResponseStatus
    {
        public UserDTO users { get; set; }
    }

    public partial class UserDetailsDTO
    {
        public decimal NodeId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public decimal? UserParentId { get; set; }
        public bool? Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Locked { get; set; }
        public string LockedReason { get; set; }
        public DateTime? LockStartDate { get; set; }
        public DateTime? LockEndDate { get; set; }
        public bool? LockMechanism { get; set; }
        public decimal? OfficeId { get; set; }
        public string RoleId { get; set; }
        public int? SalutationId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string EmployeeNumber { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? Doj { get; set; }
        public int? GenderId { get; set; }
        public string Email { get; set; }
        public string PassportNumber { get; set; }
        public string DrivingLicenceNumber { get; set; }
        public string ContactNumber { get; set; }
        public int? UserTypeId { get; set; }
        public string PanNo { get; set; }
        public DateTime? LastLoginDateTime { get; set; }
        public bool? IsIos { get; set; }
        public bool? IsAndroid { get; set; }
        public bool? IsWindows { get; set; }
        public bool? IsPasswordChanged { get; set; }
        public string LandLineOffice { get; set; }
        public string LandLineResidence { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal? PartnerId { get; set; }
        public string BranchName { get; set; }
        public string BranchCode { get; set; }
        public string Designation { get; set; }
        public int? MaritalStatusId { get; set; }
        public byte[] ProfileImage { get; set; }
        public string PartnerName { get; set; }
    }

    public partial class UserAddressDTO
    {
        public decimal UserAddressId { get; set; }
        public string Id { get; set; }
        public string UserAddressType { get; set; }
        public int? UserCountryId { get; set; }
        public int? UserStateId { get; set; }
        public int? UserDistrictId { get; set; }
        public int? UserCityId { get; set; }
        public string UserAddressLine1 { get; set; }
        public string UserAddressLine2 { get; set; }
        public string UserAddressLine3 { get; set; }
        public int? UserPincodeId { get; set; }
    }

    public class EmailTest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

    public class ProductDTO
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
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }
        public string LOB { get; set; }
        public string COB { get; set; }
    }
    public class SearchAssignProductDTO
    {
        public decimal? PartnerId { get; set; }
        public decimal? ProductId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
    }

    //Transaction 
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

    //Accounting Transaction Response
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
    public partial class InsurableRcbdetailsDTO
    {
        public InsurableRcbdetailsDTO()
        {
            CoverRcbdetails = new HashSet<CoverRcbdetailsDTO>();
            InsurableChildRcbdetails = new HashSet<ddDTO>();
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
        public virtual ICollection<ddDTO> InsurableChildRcbdetails { get; set; }
        public virtual ICollection<InsurableChildRcbdetailsDTO> InsurableChildRcbdetail { get; set; }
    }
    public partial class CoverRcbdetailsDTO
    {
        public CoverRcbdetailsDTO()
        {
            CoverChildRcbdetails = new HashSet<ddDTO>();
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
        public virtual ICollection<ddDTO> CoverChildRcbdetails { get; set; }
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
    

    #region ProductKit
    public class PolicycancelDTO
    {
        public string EventId;
        public string Policynumber;
        public string PolicyStatusId;
        public string Remarks;

    }
    #region ProductKit-CI

    public class ClaimDataDTO
    {
        public ClaimDataDTO()
        {
            ClaimInsurable = new List<ClaimInsurableDTO>();
            TblBankAccounts = new List<BankAccountsDTO>();
        }
        public string PolicyNumber;
        public DateTime? lossDateTime;
        public string locationOfLoss;
        public int lossIntimatedBy;
        public string lossDescription;
        public int? ClaimAmount;
        public string AccHolderName;
        public string AccNumber;
        public string BankName;
        public string BankBranchAdd;
        public string IfscCode;
        public string EmailId;
        public string DocumentType;
        public string DocumentName;
        public int ClaimStatusId;
        public bool? Active;
        public decimal? PolicyId;
        public int ClaimInsurableId;
        public string InsurableItem;
        public string Name;
        public string IdentificationNo;
        public string TypeOfLoss;
        public decimal? BenefitAmount;
        public int? ClaimAmounts;
        public DateTime? CreatedDate;
        public string CreatedBy;
        public decimal? PartnerId;
        public decimal? OrganizationId;
        public string ClaimNumber;
        public List<BankAccountsDTO> TblBankAccounts;
        public List<ClaimInsurableDTO> ClaimInsurable;
    }
    public class ClaimInsurableDTO
    {
        public int ClaimInsurableId;
        public string InsurableItem;
        public string Name;
        public string IdentificationNo;
        public string CoverName;
        public decimal? BenefitAmount;
        public decimal? ClaimAmounts;
        public decimal? ApprovedClaimAmounts;
        public int ClaimId;
    }
    public class BankAccountsDTO
    {
        public int BankId;
        public string AccountHolderName;
        public string AccountNumber;
        public string BankName;
        public string BankBranchAddress;
        public string Ifsccode;
        public DateTime? CreatedDate;
        public int ClaimId;
        public string AccountType;
        public string CreatedBy;
        public string ModifiedBy;
        public DateTime? ModifiedDate;
    }
    #endregion
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

        public SMSRequest smsRequest { get; set; }
    }
    public class SMSRequest
    {
        public string APIKey { get; set; }
        public string SenderId { get; set; }
        public string Channel { get; set; }
        public string RecipientNumber { get; set; }
        public string PolicyNumber { get; set; }
        public string SMSMessage { get; set; }
    }
    public class ProductApiModel
    {
        public ProductApiModel()
        {
            numberOfApi = new List<ApiMethods>();
            methodsCalls = new List<MethodsCall>();
        }
        public string PName { get; set; }
        public List<ApiMethods> numberOfApi { get; set; }
        public List<MethodsCall> methodsCalls { get; set; }
        public bool IsAwsS3Save { get; set; }
        public EmailRequest EmailTest { get; set; }
    }
    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string PartnerEmail { get; set; }
        public bool IsAttachment { get; set; }
    }
    public class ApiMethods
    {
        public string SLNo { get; set; }
        public string methodName { get; set; }

    }
    public class MethodsCall
    {

        public MethodsCall()
        {
            //uRLLinkModels = new List<URLLinkModel>();
            urlParams = new List<UrlParams>();
            uRLLinkModels = new List<URLLinkModel>();
            dataParams = new List<DataParams>();
            Response = new List<Response>();

            methodTypeModels = new List<MethodTypeModel>();
        }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<URLLinkModel> uRLLinkModels { get; set; }
        public List<UrlParams> urlParams { get; set; }
        public List<DataParams> dataParams { get; set; }
        public List<Response> Response { get; set; }
        public SampleCallModel SampleCallModel { get; set; }
        public List<MethodTypeModel> methodTypeModels { get; set; }
        public string PolicyRequest { get; set; }
        public string PolicyType { get; set; }
    }
    public class URLLinkModel
    {
        public string TestLink { get; set; }
        public string ProductionLink { get; set; }
    }
    public class MethodTypeModel
    {
        public string Type { get; set; }
    }

    public class UrlParams
    {
        public string ParamsType { get; set; }
    }
    public class DataParams
    {
        public string Field { get; set; }
        public string DataType { get; set; }
        public string IsRequired { get; set; }
        public string Description { get; set; }
    }
    public class Response
    {
        public string ResponseType { get; set; }
        public string code { get; set; }
        public string Content { get; set; }
    }
    public class SampleCallModel
    {


        public string Email { get; set; }
        public int MobileNumber { get; set; }
        public string PartnerName { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string InsuredReference { get; set; }
        public string InsuredName { get; set; }
        public int EventID { get; set; }
        public string PolicyDuration { get; set; }
        public int RechargeAmount { get; set; }
        public DateTime PolicyStartDate { get; set; }
        public DateTime PolicyEndDate { get; set; }
        public int BusinessTypeId { get; set; }
        public int PolicyStatusId { get; set; }
        public string ProposerReference { get; set; }
        public string ProposerName { get; set; }
        public DateTime PolicyDate { get; set; }


    }
    #endregion
  
    public class PartnerUploadlogoResponse : ResponseStatus
    {
        public PartnersDTO details { get; set; }
    }
    public partial class LogoDTO
    {
        public decimal PartnerId { get; set; }
        public byte[] Document { get; set; }
        public string DocumentName { get; set; }
        public string DocumentType { get; set; }
    }
    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }

    public class AssignedProducts
    {
        public decimal? PartnerId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public int? Lobid { get; set; }
        public int? Cobid { get; set; }
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

    }

    public class PartnerNameById
    {
        public string PartnerName { get; set; }
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
            
    }
  

}

