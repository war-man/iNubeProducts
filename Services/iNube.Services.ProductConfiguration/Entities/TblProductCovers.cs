using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductCovers
    {
        public TblProductCovers()
        {
            TblProductBenefits = new HashSet<TblProductBenefits>();
        }

        public decimal CoverId { get; set; }
        public int ProductId { get; set; }
        public int CoverTypeId { get; set; }
        public string CoverDescription { get; set; }
        public bool? SingleValue { get; set; }
        public string CoverEventFactorValueFrom { get; set; }
        public string CoverEventFactorValueTo { get; set; }
        public string CoverPeriod { get; set; }
        public int MaximumBenefitAmount { get; set; }
        public int? CoverEventId { get; set; }
        public int? CoverEventFactorId { get; set; }
        public int? CoverEventFactorValueUnitId { get; set; }
        public decimal? InsurableItemId { get; set; }
        public decimal? PremiumAmount { get; set; }
        public int? CurrencyId { get; set; }

        public virtual TblmasProductMaster CoverEvent { get; set; }
        public virtual TblmasProductMaster CoverEventFactor { get; set; }
        public virtual TblmasProductMaster CoverEventFactorValueUnit { get; set; }
        public virtual TblmasProductMaster CoverType { get; set; }
        public virtual TblProductInsurableItems InsurableItem { get; set; }
        public virtual ICollection<TblProductBenefits> TblProductBenefits { get; set; }
    }
}
