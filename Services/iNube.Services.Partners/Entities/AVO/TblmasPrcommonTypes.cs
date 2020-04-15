using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblmasPrcommonTypes
    {
        public TblmasPrcommonTypes()
        {
            TblOrganizationConfigurationType = new HashSet<TblOrganization>();
            TblOrganizationOrgCategory = new HashSet<TblOrganization>();
            TblOrganizationOrgType = new HashSet<TblOrganization>();
        }

        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }

        public virtual ICollection<TblOrganization> TblOrganizationConfigurationType { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationOrgCategory { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationOrgType { get; set; }
    }
}
