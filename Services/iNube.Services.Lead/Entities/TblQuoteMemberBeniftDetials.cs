using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblQuoteMemberBeniftDetials
    {
        public int MemberBenifitId { get; set; }
        public int MemberId { get; set; }
        public int BenifitId { get; set; }
        public string SumInsured { get; set; }
        public string Premium { get; set; }
        public decimal ActualPremium { get; set; }
        public decimal AnnualRiderPremium { get; set; }
        public decimal LoadingAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public int? LoadingPercentage { get; set; }
        public int? LoadinPerMille { get; set; }
        public decimal? AnnualModePremium { get; set; }
        public decimal? AnnualDiscountAmount { get; set; }
        public decimal? AnnualLoadingAmount { get; set; }

        public virtual TblQuoteMemberDetials Member { get; set; }
    }
}
