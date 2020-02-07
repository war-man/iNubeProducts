using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblRating
    {
        public TblRating()
        {
            TblRatingRules = new HashSet<TblRatingRules>();
        }

        public decimal RatingId { get; set; }
        public string RateObj { get; set; }
        public string RateName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Rate { get; set; }
        public string RateType { get; set; }
        public bool? IsParameter { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<TblRatingRules> TblRatingRules { get; set; }
    }
}
