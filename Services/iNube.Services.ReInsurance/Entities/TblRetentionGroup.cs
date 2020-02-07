using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblRetentionGroup
    {
        public TblRetentionGroup()
        {
            TblRimappingDetail = new HashSet<TblRimappingDetail>();
        }

        public decimal RetentionGroupId { get; set; }
        public string RetentionGroupName { get; set; }
        public int? Year { get; set; }
        public int? BusinessTypeId { get; set; }
        public int? RetentionLogicId { get; set; }
        public decimal? Percentage { get; set; }
        public int? Limit { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<TblRimappingDetail> TblRimappingDetail { get; set; }
    }
}
