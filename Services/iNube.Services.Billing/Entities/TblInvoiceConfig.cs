using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblInvoiceConfig
    {
        public TblInvoiceConfig()
        {
            TblInvoice = new HashSet<TblInvoice>();
        }

        public decimal InvoiceConfigId { get; set; }
        public decimal? ContractId { get; set; }
        public DateTime? InvoiceStartDate { get; set; }
        public DateTime? InvoiceEndDate { get; set; }
        public int? FrequencyId { get; set; }
        public decimal? PenaltyPercentage { get; set; }
        public int? InvoiceCreditPeriod { get; set; }
        public int? InvoiceGracePeriod { get; set; }
        public DateTime? LastCycleExecDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual TblContract Contract { get; set; }
        public virtual ICollection<TblInvoice> TblInvoice { get; set; }
    }
}
