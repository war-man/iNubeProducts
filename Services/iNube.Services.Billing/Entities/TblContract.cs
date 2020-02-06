using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblContract
    {
        public TblContract()
        {
            TblBillingConfig = new HashSet<TblBillingConfig>();
            TblContractDoc = new HashSet<TblContractDoc>();
            TblInvoiceConfig = new HashSet<TblInvoiceConfig>();
        }

        public decimal ContractId { get; set; }
        public string ContractName { get; set; }
        public decimal? VendorId { get; set; }
        public decimal? CustomerId { get; set; }
        public DateTime? ContractEffectiveDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public int? MaxCreditPeriod { get; set; }
        public decimal? MaxCreditAmountAllowed { get; set; }
        public int? GracePeriod { get; set; }
        public int? CurrencyId { get; set; }
        public string Pono { get; set; }
        public DateTime? Podate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual TblCustomers Customer { get; set; }
        public virtual ICollection<TblBillingConfig> TblBillingConfig { get; set; }
        public virtual ICollection<TblContractDoc> TblContractDoc { get; set; }
        public virtual ICollection<TblInvoiceConfig> TblInvoiceConfig { get; set; }
    }
}
