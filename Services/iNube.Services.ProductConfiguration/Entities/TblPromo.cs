using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblPromo
    {
        public int PromoId { get; set; }
        public string PromoCode1 { get; set; }
        public string PromoCode2 { get; set; }
        public string PolicyNumber { get; set; }
        public bool IsActive { get; set; }
        public bool? IsApply { get; set; }
        public string ProductCode { get; set; }
        public int? ProductId { get; set; }
    }
}
