using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblDiscountLoadingChart
    {
        public int DiscountLoadingChartId { get; set; }
        public string ChartCode { get; set; }
        public int? Frequency { get; set; }
        public int? AgeFrom { get; set; }
        public int? AgeTo { get; set; }
        public decimal? SumAssureFrom { get; set; }
        public decimal? SumAssuredTo { get; set; }
        public int? LivesFrom { get; set; }
        public int? LivesTo { get; set; }
        public decimal? Value { get; set; }
        public bool? WithDeductible { get; set; }
        public bool? WithFamilyFloater { get; set; }
    }
}
