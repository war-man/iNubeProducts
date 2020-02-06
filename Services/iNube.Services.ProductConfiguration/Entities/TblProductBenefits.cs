using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductBenefits
    {
        public TblProductBenefits()
        {
            TblBenifitRangeDetails = new HashSet<TblBenifitRangeDetails>();
        }

        public decimal BenefitId { get; set; }
        public int? ProductId { get; set; }
        public int? BenefitTypeId { get; set; }
        public double? BenefitAmount { get; set; }
        public int? BenefitCriteria { get; set; }
        public int? BenefitCriteriaValue { get; set; }
        public int? MaxBenefitAmount { get; set; }
        public bool? SingleValue { get; set; }
        public int? CurrencyId { get; set; }
        public decimal? CoverId { get; set; }
        public decimal? PremiumAmount { get; set; }

        public virtual TblmasProductMaster BenefitType { get; set; }
        public virtual TblProductCovers Cover { get; set; }
        public virtual TblmasPccommonTypes Currency { get; set; }
        public virtual ICollection<TblBenifitRangeDetails> TblBenifitRangeDetails { get; set; }
    }
}
