using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductRatingMapping
    {
        public int MappingId { get; set; }
        public string RateParameterName { get; set; }
        public string RiskParameterName { get; set; }
        public bool? IsActive { get; set; }
        public int? ProductId { get; set; }
        public decimal? RatingConfigId { get; set; }

        public virtual TblProducts Product { get; set; }
    }
}
