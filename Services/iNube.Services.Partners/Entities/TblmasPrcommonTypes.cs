using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblmasPrcommonTypes
    {
        public TblmasPrcommonTypes()
        {
            TblOrganizationConfigurationType = new HashSet<TblOrganization>();
            TblOrganizationOrgCategory = new HashSet<TblOrganization>();
            TblOrganizationOrgType = new HashSet<TblOrganization>();
            TblPartnersPartnerClass = new HashSet<TblPartners>();
            TblPartnersPartnerType = new HashSet<TblPartners>();
            TblPartnersSalutation = new HashSet<TblPartners>();
        }

        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }

        public virtual ICollection<TblOrganization> TblOrganizationConfigurationType { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationOrgCategory { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationOrgType { get; set; }
        public virtual ICollection<TblPartners> TblPartnersPartnerClass { get; set; }
        public virtual ICollection<TblPartners> TblPartnersPartnerType { get; set; }
        public virtual ICollection<TblPartners> TblPartnersSalutation { get; set; }
    }
}
