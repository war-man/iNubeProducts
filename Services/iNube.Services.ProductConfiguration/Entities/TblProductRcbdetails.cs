using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductRcbdetails
    {
        public decimal RcbdetailsId { get; set; }
        public int? ProductId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
        public int? RefId { get; set; }

        public virtual TblmasProductMaster Input { get; set; }
        public virtual TblmasProductMaster Level { get; set; }
        public virtual TblProducts Product { get; set; }
    }
}
