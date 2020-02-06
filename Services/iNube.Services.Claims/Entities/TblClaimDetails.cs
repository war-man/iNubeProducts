using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaimDetails
    {
        public decimal ClaimDetailsId { get; set; }
        public string ClaimRequest { get; set; }
        public DateTime? LossDate { get; set; }
        public string LocationOfloss { get; set; }
        public string LossDescription { get; set; }
        public string MobileNumber { get; set; }
        public string BeneficiaryName { get; set; }
        public int? ClaimId { get; set; }
        public Guid? CreatedBy { get; set; }

        public virtual TblClaims Claim { get; set; }
    }
}
