using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities.AvoEntities
{
    public partial class TblProductAssumptionMap
    {
        public int ProductAssumptionMapId { get; set; }
        public int? ProductId { get; set; }
        public int? ParameterId { get; set; }
        public decimal? Frequency { get; set; }
        public decimal? Value { get; set; }
        public int? PolicyTerm { get; set; }
        public int? PremiumPayTerm { get; set; }
    }
}
