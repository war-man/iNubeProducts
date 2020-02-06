using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaimsHistory
    {
        public int ClaimsHistoryId { get; set; }
        public int ClaimId { get; set; }
        public int ClaimStatusId { get; set; }
        public int? ClaimAmount { get; set; }
        public string Remarks { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblClaims Claim { get; set; }
        public virtual TblmasCmcommonTypes ClaimStatus { get; set; }
    }
}
