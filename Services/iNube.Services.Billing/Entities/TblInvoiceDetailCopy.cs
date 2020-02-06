using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblInvoiceDetailCopy
    {
        public decimal InvoiceDetailId { get; set; }
        public decimal InvoiceId { get; set; }
        public decimal? BillingItemId { get; set; }
        public int? SeqNo { get; set; }
        public decimal? Value { get; set; }
        public int? EventMappingId { get; set; }
        public int? Eventcount { get; set; }
    }
}
