using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblAddress
    {
        public TblAddress()
        {
            TblOrganizationCorporateAddress = new HashSet<TblOrganization>();
            TblOrganizationMailingAddress = new HashSet<TblOrganization>();
            TblOrganizationRegisteredAddres = new HashSet<TblOrganization>();
        }

        public decimal OrgAddressId { get; set; }
        public decimal? OrgId { get; set; }
        public string OrgCountry { get; set; }
        public string OrgState { get; set; }
        public string OrgDistrict { get; set; }
        public string OrgCity { get; set; }
        public string OrgAddressLine1 { get; set; }
        public string OrgAddressLine2 { get; set; }
        public string OrgAddressLine3 { get; set; }
        public int? OrgPinCode { get; set; }

        public virtual TblOrganization Org { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationCorporateAddress { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationMailingAddress { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationRegisteredAddres { get; set; }
    }
}
