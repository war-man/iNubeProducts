using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblRiallocation
    {
        public TblRiallocation()
        {
            TblRiallocationHistory = new HashSet<TblRiallocationHistory>();
        }

        public decimal AllocationId { get; set; }
        public string AllocationLevel { get; set; }
        public int? ItemId { get; set; }
        public decimal? AllocationAmount { get; set; }
        public decimal? Premium { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public string IsApproved { get; set; }
        public Guid? ApprovedBy { get; set; }
        public int? MappingId { get; set; }
        public string AllocationDetails { get; set; }
        public string PolicyNo { get; set; }

        public virtual ICollection<TblRiallocationHistory> TblRiallocationHistory { get; set; }
    }
}
