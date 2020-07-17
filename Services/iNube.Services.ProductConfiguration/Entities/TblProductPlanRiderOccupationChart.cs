using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductPlanRiderOccupationChart
    {
        public int ProductPlanRiderOccupationChartId { get; set; }
        public string Type { get; set; }
        public int? ProductPlanRiderId { get; set; }
        public decimal? OccupationId { get; set; }
        public decimal? Value { get; set; }
    }
}
