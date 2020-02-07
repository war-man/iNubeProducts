using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblmasMapping
    {
        public int MappingId { get; set; }
        public string RateName { get; set; }
        public string RiskName { get; set; }
        public bool? IsActive { get; set; }
        public int? ProductId { get; set; }
        public decimal? RatingId { get; set; }
    }
}
