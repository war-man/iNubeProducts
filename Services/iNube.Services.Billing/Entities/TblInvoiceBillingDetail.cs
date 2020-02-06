using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblInvoiceBillingDetail
    {
        public int InvoiceBillingDetailId { get; set; }
        public int? EventMappingId { get; set; }
        public decimal? InvoiceId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? Amount { get; set; }
        public string PolicyNo { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public string ClaimNumber { get; set; }
        public DateTime? LossDatetime { get; set; }

        public virtual TblObjectEventMapping EventMapping { get; set; }
        public virtual TblInvoice Invoice { get; set; }
    }
}
