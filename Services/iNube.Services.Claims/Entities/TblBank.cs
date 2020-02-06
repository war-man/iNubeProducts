using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblBank
    {
        public TblBank()
        {
            TblClaimTransactionNew = new HashSet<TblClaimTransactionNew>();
        }

        public int BankId { get; set; }
        public string AccountHolderName { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranchAddress { get; set; }
        public string Ifsccode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual ICollection<TblClaimTransactionNew> TblClaimTransactionNew { get; set; }
    }
}
