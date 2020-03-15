using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaimInsurable
    {
        public int ClaimInsurableId { get; set; }
        public string InsurableItem { get; set; }
        public string Name { get; set; }
        public string IdentificationNo { get; set; }
        public string TypeOfLoss { get; set; }
        public decimal? BenefitAmount { get; set; }
        public decimal? ClaimAmounts { get; set; }
        public decimal? ApprovedClaimAmounts { get; set; }
        public int ClaimId { get; set; }
        public string CoverValue { get; set; }

        public virtual TblClaims Claim { get; set; }
    }
}
