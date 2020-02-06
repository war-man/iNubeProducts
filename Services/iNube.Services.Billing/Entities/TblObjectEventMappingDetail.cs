using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblObjectEventMappingDetail
    {
        public int EventMappingDetailId { get; set; }
        public int? EventMappingId { get; set; }
        public int? CommonTypeId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
    }
}
