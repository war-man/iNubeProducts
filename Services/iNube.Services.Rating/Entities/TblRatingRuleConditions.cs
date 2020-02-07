using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblRatingRuleConditions
    {
        public decimal RatingRuleConditionId { get; set; }
        public decimal? RatingRuleId { get; set; }
        public decimal? RatingParameters { get; set; }
        public string ConditionValueFrom { get; set; }
        public string ConditionValueTo { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual TblRatingRules RatingRule { get; set; }
    }
}
