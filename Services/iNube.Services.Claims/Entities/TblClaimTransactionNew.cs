using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaimTransactionNew
    {
        public int ClaimTransId { get; set; }
        public int ClaimId { get; set; }
        public int BankId { get; set; }
        public int PaymentId { get; set; }
        public int LossId { get; set; }
        public int ClaimDocId { get; set; }
        public DateTime? LossDate { get; set; }
        public DateTime? LossTime { get; set; }
        public string LocationOfEvent { get; set; }
        public string LossOfDescription { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblBank Bank { get; set; }
        public virtual TblClaims Claim { get; set; }
        public virtual TblClaimdoc ClaimDoc { get; set; }
        public virtual TblmasCmcommonTypes Loss { get; set; }
        public virtual TblPayment Payment { get; set; }
    }
}
