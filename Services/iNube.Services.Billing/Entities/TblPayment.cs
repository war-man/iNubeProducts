using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblPayment
    {
        public decimal PaymentId { get; set; }
        public int PaymentTypeId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public DateTime? RealisedDate { get; set; }
        public int? PaymentRefId { get; set; }
        public decimal? InvoiceId { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string IfscCode { get; set; }
        public int? StatusId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? Paymentamount { get; set; }

        public virtual TblInvoice Invoice { get; set; }
    }
}
