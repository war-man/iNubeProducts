using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblBillingItem
    {
        public TblBillingItem()
        {
            TblBillingItemDetail = new HashSet<TblBillingItemDetail>();
        }

        public decimal BillingItemId { get; set; }
        public decimal BillingConfigId { get; set; }
        public string BillingTypeDesc { get; set; }
        public int? BillingFrequencyId { get; set; }
        public int? NoofFrequency { get; set; }
        public int? CategoryTypeId { get; set; }
        public int? ValueFactorId { get; set; }
        public int? RateCategoryId { get; set; }
        public int? RateTypeId { get; set; }
        public int? Threshold { get; set; }
        public decimal? Rate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public int? EventMappingId { get; set; }

        public virtual TblBillingConfig BillingConfig { get; set; }
        public virtual ICollection<TblBillingItemDetail> TblBillingItemDetail { get; set; }
    }
}
