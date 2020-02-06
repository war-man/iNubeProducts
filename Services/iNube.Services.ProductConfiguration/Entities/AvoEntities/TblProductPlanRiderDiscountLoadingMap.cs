using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities.AvoEntities
{
    public partial class TblProductPlanRiderDiscountLoadingMap
    {
        public int ProductPlanRiderDiscountLoadingMapId { get; set; }
        public int? ProductId { get; set; }
        public int? PlanId { get; set; }
        public int? RiderId { get; set; }
        public int? RelationId { get; set; }
        public string ChartType { get; set; }
        public string ChartCode { get; set; }
        public string RateType { get; set; }
        public bool? Mandatory { get; set; }
        public int? CalculationOrder { get; set; }
        public int? DisplayOrder { get; set; }

        public virtual TblRiders Rider { get; set; }
    }
}
