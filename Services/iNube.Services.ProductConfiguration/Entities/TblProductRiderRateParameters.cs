using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductRiderRateParameters
    {
        public int ProductRiderRateParameterId { get; set; }
        public int? ProductId { get; set; }
        public int? RiderId { get; set; }
        public int? ParameterId { get; set; }
        public int? Frequency { get; set; }
        public int? SumInsuredFrom { get; set; }
        public int? SumInsuredTo { get; set; }
        public decimal? Value { get; set; }
        public string RelationShip { get; set; }
        public decimal? Samfactor { get; set; }
    }
}
