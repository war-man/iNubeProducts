using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblLeadInfo
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public int? PartnerId { get; set; }
        public bool? Smsstatus { get; set; }
        public bool? Emailstatus { get; set; }
        public string ProductCode { get; set; }
        public int? ProductId { get; set; }
    }
}
