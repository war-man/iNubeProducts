using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblBillingItemDetail
    {
        public decimal BillingItemDetailId { get; set; }
        public decimal BillingItemId { get; set; }
        public int? SeqNo { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? DueDate { get; set; }
        public int? From { get; set; }
        public int? To { get; set; }
        public decimal? RatePercent { get; set; }
        public string IsActive { get; set; }

        public virtual TblBillingItem BillingItem { get; set; }
    }
}
