using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblRatingRules
    {
        public TblRatingRules()
        {
            TblRatingRuleConditions = new HashSet<TblRatingRuleConditions>();
        }

        public decimal RatingRuleId { get; set; }
        public DateTime? EndDate { get; set; }
        public string Rate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public decimal? RatingId { get; set; }

        public virtual TblRating Rating { get; set; }
        public virtual ICollection<TblRatingRuleConditions> TblRatingRuleConditions { get; set; }
    }
}
