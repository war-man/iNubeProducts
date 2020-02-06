using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblObjectEventParameter
    {
        public decimal EventParameterId { get; set; }
        public string Parameter { get; set; }
        public string Tablename { get; set; }
        public string Colname { get; set; }
        public string Coltype { get; set; }
        public int? ObjectId { get; set; }
    }
}
