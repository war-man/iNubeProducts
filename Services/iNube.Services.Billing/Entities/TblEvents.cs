using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblEvents
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
    }
}
