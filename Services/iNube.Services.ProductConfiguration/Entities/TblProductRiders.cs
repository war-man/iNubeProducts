using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductRiders
    {
        public int ProductRiderId { get; set; }
        public int? ProductId { get; set; }
        public int? RiderId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public bool? IsActive { get; set; }
        public int? RelationId { get; set; }

        public virtual TblAvoproducts Product { get; set; }
        public virtual TblRiders Rider { get; set; }
    }
}
