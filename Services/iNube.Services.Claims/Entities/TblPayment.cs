using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblPayment
    {
        public TblPayment()
        {
            TblClaimTransactionNew = new HashSet<TblClaimTransactionNew>();
        }

        public int PaymentId { get; set; }
        public string PaymentStatus { get; set; }
        public string Utrno { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int ClaimId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public decimal? PaymentAmount { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ClaimNo { get; set; }

        public virtual TblClaims Claim { get; set; }
        public virtual ICollection<TblClaimTransactionNew> TblClaimTransactionNew { get; set; }
    }
}
