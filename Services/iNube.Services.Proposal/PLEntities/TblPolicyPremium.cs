using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyPremium
    {
        public decimal PremiumId { get; set; }
        public decimal? PolicyId { get; set; }
        public decimal? BasicPremium { get; set; }
        public decimal? AnnualPremium { get; set; }
        public decimal? Cess { get; set; }
        public decimal? BasicSumInsured { get; set; }
        public decimal? Vat { get; set; }
        public decimal? PolicyFee { get; set; }
        public decimal? HalfYearlyPremium { get; set; }
        public decimal? QuaterlyPremium { get; set; }
        public decimal? MonthlyPremium { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public decimal? AdditionalPremium { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
