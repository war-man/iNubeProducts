using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblBankAccounts
    {
        public int BankId { get; set; }
        public string AccountHolderName { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranchAddress { get; set; }
        public string Ifsccode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ClaimId { get; set; }
        public string AccountType { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblClaims Claim { get; set; }
    }
}
