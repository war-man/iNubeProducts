using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductPremium
    {
        public decimal PremiumId { get; set; }
        public int? ProductId { get; set; }
        public int? CurrencyId { get; set; }
        public decimal? PremiumAmount { get; set; }
        public decimal? CoverId { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
        public int? RefId { get; set; }

        public virtual TblmasPccommonTypes Currency { get; set; }
        public virtual TblmasPccommonTypes Level { get; set; }
        public virtual TblProducts Product { get; set; }
    }
}
