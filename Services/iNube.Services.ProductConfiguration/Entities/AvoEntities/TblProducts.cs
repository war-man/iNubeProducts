using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities.AvoEntities
{
    public partial class TblProducts
    {
        public TblProducts()
        {
            TblProductPlan = new HashSet<TblProductPlan>();
            TblProductPlanRiders = new HashSet<TblProductPlanRiders>();
            TblProductRiders = new HashSet<TblProductRiders>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public int? TypeOfProductId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public bool? IsActive { get; set; }
        public decimal? MinMonthlyPremium { get; set; }
        public decimal? MinQuarterlyPremium { get; set; }
        public decimal? MinHalfYearlyPremium { get; set; }
        public decimal? MinAnnualPremium { get; set; }
        public decimal? MinBasicSumAssured { get; set; }
        public int? Priority { get; set; }
        public string MinSurrenderYear { get; set; }
        public string MinTopUpYear { get; set; }

        public virtual ICollection<TblProductPlan> TblProductPlan { get; set; }
        public virtual ICollection<TblProductPlanRiders> TblProductPlanRiders { get; set; }
        public virtual ICollection<TblProductRiders> TblProductRiders { get; set; }
    }
}
