using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrganization
    {
        public TblOrganization()
        {
            TblOrgAddress = new HashSet<TblOrgAddress>();
            TblOrgOffice = new HashSet<TblOrgOffice>();
            TblOrgSpocDetails = new HashSet<TblOrgSpocDetails>();
            TblOrgStructure = new HashSet<TblOrgStructure>();
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
        public string OrganizationCode { get; set; }
        public bool? IsActive { get; set; }
        public decimal? CustomerId { get; set; }
        public decimal? ParentId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblmasPrcommonTypes ConfigurationType { get; set; }
        public virtual TblmasPrcommonTypes OrgCategory { get; set; }
        public virtual TblmasPrcommonTypes OrgType { get; set; }
        public virtual ICollection<TblOrgAddress> TblOrgAddress { get; set; }
        public virtual ICollection<TblOrgOffice> TblOrgOffice { get; set; }
        public virtual ICollection<TblOrgSpocDetails> TblOrgSpocDetails { get; set; }
        public virtual ICollection<TblOrgStructure> TblOrgStructure { get; set; }
    }
}
