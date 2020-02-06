using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductClausesWarrentiesExclusions
    {
        public decimal Cweid { get; set; }
        public int? ProductId { get; set; }
        public int? CwetypeId { get; set; }
        public bool IsPrint { get; set; }
        public string TypeName { get; set; }
        public string Description { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
        public int? RefId { get; set; }

        public virtual TblmasPccommonTypes Cwetype { get; set; }
        public virtual TblProducts Product { get; set; }
    }
}
