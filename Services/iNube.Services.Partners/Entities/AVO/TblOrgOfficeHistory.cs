using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgOfficeHistory
    {
        public decimal OrgOfficeHistoryId { get; set; }
        public decimal OrgOfficeId { get; set; }
        public string OfficeCode { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTill { get; set; }
        public int? ChangeTypeId { get; set; }
        public string ChangedOfficeCode { get; set; }
        public string UserName { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public bool? IsValid { get; set; }
    }
}
