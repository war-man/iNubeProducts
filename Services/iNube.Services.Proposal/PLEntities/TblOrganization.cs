using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblOrganization
    {
        public TblOrganization()
        {
            TblPolicyRelationship = new HashSet<TblPolicyRelationship>();
        }

        public decimal OrganizationId { get; set; }
        public int OrgCategoryId { get; set; }
        public int ConfigurationTypeId { get; set; }
        public int? OtherConfigureId { get; set; }
        public int OrgTypeId { get; set; }
        public string OrgName { get; set; }
        public decimal? RegisteredAddresId { get; set; }
        public bool? IsRegisteredAddressSame { get; set; }
        public decimal? CorporateAddressId { get; set; }
        public int? MailingAddressReferenceId { get; set; }
        public decimal? MailingAddressId { get; set; }
        public byte[] OrgLogo { get; set; }
        public string OrgWebsite { get; set; }
        public string OrgPhoneNo { get; set; }
        public string OrgFaxNo { get; set; }
        public int? OrgLevels { get; set; }
        public string Regno { get; set; }
        public string RegAuthority { get; set; }
        public DateTime? RegDate { get; set; }
        public string RegNoSt { get; set; }
        public string Panno { get; set; }
        public string Tanno { get; set; }
        public string SpocName { get; set; }
        public decimal? SpocAdderssId { get; set; }
        public string SpocPhoneno { get; set; }
        public string SpocEmailId { get; set; }
        public string UserName { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public bool? IsValid { get; set; }
        public string Code { get; set; }
        public string Cinno { get; set; }
        public int? BankBranchId { get; set; }
        public string AccountNumber { get; set; }
        public string PayeeName { get; set; }
        public string License { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string OrgType { get; set; }
        public decimal? YearOfEstablishment { get; set; }
        public string RegistrationNo { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public decimal? MobileNo { get; set; }
        public decimal? OfficePhone1 { get; set; }
        public decimal? OfficePhone2 { get; set; }
        public string FaxNo { get; set; }
        public string Email { get; set; }
        public string CommAddressId { get; set; }
        public string RegistrationAddressId { get; set; }
        public bool? IsRegAddressSameAsCommAddress { get; set; }
        public string PartnerType { get; set; }
        public string LicenseNo { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? ContractEffectiveFrom { get; set; }
        public DateTime? ContractEffectiveTo { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CorporateCode { get; set; }
        public string ChannelCode { get; set; }
        public string SubChannelCode { get; set; }
        public string PartnerCode { get; set; }
        public string GeoUnitCode { get; set; }

        public virtual TblAddress CorporateAddress { get; set; }
        public virtual TblAddress MailingAddress { get; set; }
        public virtual TblAddress RegisteredAddres { get; set; }
        public virtual TblAddress SpocAdderss { get; set; }
        public virtual ICollection<TblPolicyRelationship> TblPolicyRelationship { get; set; }
    }
}
