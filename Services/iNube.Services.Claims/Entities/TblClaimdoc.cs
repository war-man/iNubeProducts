using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaimdoc
    {
        public TblClaimdoc()
        {
            TblClaimTransactionNew = new HashSet<TblClaimTransactionNew>();
        }

        public int ClaimDocId { get; set; }
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public byte[] Document { get; set; }
        public DateTime? UploadDate { get; set; }
        public int ClaimId { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblClaims Claim { get; set; }
        public virtual ICollection<TblClaimTransactionNew> TblClaimTransactionNew { get; set; }
    }
}
