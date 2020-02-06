using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblBillingConfig
    {
        public TblBillingConfig()
        {
            TblBillingItem = new HashSet<TblBillingItem>();
        }

        public decimal BillingConfigId { get; set; }
        public decimal ContractId { get; set; }
        public DateTime? BillingStartDate { get; set; }
        public DateTime? BillingEndDate { get; set; }
        public int? CurrencyId { get; set; }
        public string Remarks { get; set; }
        public decimal? BillingAmount { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual TblContract Contract { get; set; }
        public virtual ICollection<TblBillingItem> TblBillingItem { get; set; }
    }
}
