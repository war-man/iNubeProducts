using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblMasPlan
    {
        public int PlanId { get; set; }
        public string PlanName { get; set; }
        public string PlanDetails { get; set; }
        public bool? Status { get; set; }
        public bool? IsUcobank { get; set; }
        public int? ParentId { get; set; }
    }
}
