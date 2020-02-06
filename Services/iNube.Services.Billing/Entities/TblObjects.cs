using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblObjects
    {
        public int ObjectId { get; set; }
        public string ObjectName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public int? Seq { get; set; }
    }
}
