using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblRiallocationHistory
    {
        public decimal AllocationHistoryid { get; set; }
        public decimal? AllocationId { get; set; }
        public int? MaapingId { get; set; }
        public string PolicyNo { get; set; }
        public string AllocationLevel { get; set; }
        public string ItemName { get; set; }
        public decimal? AllocationAmount { get; set; }
        public decimal? Premium { get; set; }
        public DateTime? TransectionDate { get; set; }
        public string AllocationDetails { get; set; }

        public virtual TblRiallocation Allocation { get; set; }
    }
}
