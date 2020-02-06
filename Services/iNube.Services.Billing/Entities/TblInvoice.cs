using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblInvoice
    {
        public TblInvoice()
        {
            TblInvoiceBillingDetail = new HashSet<TblInvoiceBillingDetail>();
            TblInvoiceDetail = new HashSet<TblInvoiceDetail>();
            TblPayment = new HashSet<TblPayment>();
        }

        public decimal InvoiceId { get; set; }
        public decimal InvoiceConfigId { get; set; }
        public decimal ContractId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public decimal? InvAmount { get; set; }
        public decimal? RevisedInvAmount { get; set; }
        public decimal? PaymentRecd { get; set; }
        public decimal? Balance { get; set; }
        public decimal? PenaltyAmount { get; set; }
        public int? DefaultDays { get; set; }
        public decimal? OtherAmount { get; set; }
        public decimal? TaxAmount { get; set; }
        public decimal? Discount { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? StatusId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string InvoiceNo { get; set; }
        public decimal? GstPercent { get; set; }
        public DateTime? DueDate { get; set; }
        public string CreatedUserId { get; set; }

        public virtual TblInvoiceConfig InvoiceConfig { get; set; }
        public virtual ICollection<TblInvoiceBillingDetail> TblInvoiceBillingDetail { get; set; }
        public virtual ICollection<TblInvoiceDetail> TblInvoiceDetail { get; set; }
        public virtual ICollection<TblPayment> TblPayment { get; set; }
    }
}
