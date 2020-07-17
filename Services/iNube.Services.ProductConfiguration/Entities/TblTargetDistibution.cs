using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblTargetDistibution
    {
        public decimal TargetDistributionId { get; set; }
        public decimal? Months { get; set; }
        public decimal? Year1 { get; set; }
        public decimal? Year2 { get; set; }
        public decimal? Year3 { get; set; }
        public decimal? Year4 { get; set; }
        public decimal? Year5 { get; set; }
    }
}
