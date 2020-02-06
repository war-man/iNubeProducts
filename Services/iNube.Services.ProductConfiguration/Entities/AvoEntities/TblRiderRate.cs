using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities.AvoEntities
{
    public partial class TblRiderRate
    {
        public int RateId { get; set; }
        public int RiderId { get; set; }
        public bool? IsDeleted { get; set; }
        public string Factor { get; set; }
        public string Rate { get; set; }
        public decimal? MaxValue { get; set; }
        public string RateType { get; set; }
    }
}
