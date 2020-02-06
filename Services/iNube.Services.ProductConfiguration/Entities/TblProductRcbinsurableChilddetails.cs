using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductRcbinsurableChilddetails
    {
        public int RcbinsurableChilddetailsId { get; set; }
        public string InputTypeName { get; set; }
        public bool? IsReqired { get; set; }
        public int? ProductId { get; set; }

        public virtual TblProducts Product { get; set; }
    }
}
