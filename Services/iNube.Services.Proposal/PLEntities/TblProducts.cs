using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblProducts
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public int? TypeOfProductId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public bool? IsActive { get; set; }
        public decimal? MinMonthlyPremium { get; set; }
        public decimal? MinQuarterlyPremium { get; set; }
        public decimal? MinHalfYearlyPremium { get; set; }
        public decimal? MinAnnualPremium { get; set; }
        public decimal? MinBasicSumAssured { get; set; }
        public int? Priority { get; set; }
        public string MinSurrenderYear { get; set; }
        public string MinTopUpYear { get; set; }
    }
}
