using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblRimappingDetail
    {
        public decimal RimappingDetailId { get; set; }
        public decimal RimappingId { get; set; }
        public decimal? RetentionGroupId { get; set; }
        public decimal? TreatyGroupId { get; set; }
        public int? SequenceNo { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public int? RimappingTypeId { get; set; }

        public virtual TblRetentionGroup RetentionGroup { get; set; }
        public virtual TblRimapping Rimapping { get; set; }
        public virtual TblTreatyGroup TreatyGroup { get; set; }
    }
}
