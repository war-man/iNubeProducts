using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblRiderRateChart
    {
        public int RiderRateChartId { get; set; }
        public string Type { get; set; }
        public int? Age { get; set; }
        public int? Term { get; set; }
        public decimal? Rate { get; set; }
        public string Product { get; set; }
        public int? SumAssured { get; set; }
        public string RelationType { get; set; }
        public string Gender { get; set; }
        public bool? WithFloater { get; set; }
        public bool? Smoker { get; set; }
    }
}
