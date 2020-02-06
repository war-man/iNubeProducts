using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities.AvoEntities
{
    public partial class TblRiders
    {
        public TblRiders()
        {
            TblProductPlanRiderDiscountLoadingMap = new HashSet<TblProductPlanRiderDiscountLoadingMap>();
            TblProductPlanRiders = new HashSet<TblProductPlanRiders>();
            TblProductRiders = new HashSet<TblProductRiders>();
        }

        public int RiderId { get; set; }
        public string RiderName { get; set; }
        public string RiderCode { get; set; }
        public int? TypeOfProductId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public bool? IsActive { get; set; }
        public string ImagePath { get; set; }

        public virtual ICollection<TblProductPlanRiderDiscountLoadingMap> TblProductPlanRiderDiscountLoadingMap { get; set; }
        public virtual ICollection<TblProductPlanRiders> TblProductPlanRiders { get; set; }
        public virtual ICollection<TblProductRiders> TblProductRiders { get; set; }
    }
}
