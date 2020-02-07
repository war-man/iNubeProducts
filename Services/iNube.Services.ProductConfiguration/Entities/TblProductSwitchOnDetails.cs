using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductSwitchOnDetails
    {
        public decimal SwitchOnId { get; set; }
        public int? ProductId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }

        public virtual TblmasProductMaster Input { get; set; }
        public virtual TblProducts Product { get; set; }
    }
}
