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
        public int? AccountType { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? PayeeTypeId { get; set; }
        public string PayeeType { get; set; }
        public decimal? AmountPaid { get; set; }
        public DateTime? DataOfPayment { get; set; }

        public virtual TblmasCmcommonTypes AccountTypeNavigation { get; set; }
        public virtual TblClaims Claim { get; set; }
        public virtual TblmasCmcommonTypes PayeeTypeNavigation { get; set; }
    }
}
