using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgOfficeMapping
    {
        public decimal OrgOfficeMappingId { get; set; }
        public decimal PrimaryOfficeId { get; set; }
        public decimal ReportingOfficeId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public string UserName { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public bool? IsValid { get; set; }

        public virtual TblOrgOffice PrimaryOffice { get; set; }
        public virtual TblOrgOffice ReportingOffice { get; set; }
    }
}
