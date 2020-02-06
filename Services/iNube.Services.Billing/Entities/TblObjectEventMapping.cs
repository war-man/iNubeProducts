using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblObjectEventMapping
    {
        public TblObjectEventMapping()
        {
            TblInvoiceBillingDetail = new HashSet<TblInvoiceBillingDetail>();
        }

        public int EventMappingId { get; set; }
        public int? ObjectId { get; set; }
        public int? EventId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string Description { get; set; }
        public string Tablename { get; set; }
        public string Colname { get; set; }
        public string Colvalue { get; set; }

        public virtual ICollection<TblInvoiceBillingDetail> TblInvoiceBillingDetail { get; set; }
    }
}
