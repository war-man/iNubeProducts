using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaimHistory
    {
        public int ClaimHistoryId { get; set; }
        public int ClaimId { get; set; }
        public int ClaimStatusId { get; set; }
        public int? ClaimAmount { get; set; }
        public string ClaimManagerRemarks { get; set; }
        public int? ApprovedClaimAmount { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int? LossId { get; set; }
        public DateTime? LossDateTime { get; set; }
        public string LocationOfEvent { get; set; }
        public string LossOfDescription { get; set; }
        public bool? Active { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? PolicyId { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrgId { get; set; }
        public string PolicyNo { get; set; }
        public string ClaimNumber { get; set; }

        public virtual TblClaims Claim { get; set; }
        public virtual TblmasCmcommonTypes ClaimStatus { get; set; }
    }
}
