using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblmasCmcommonTypes
    {
        public TblmasCmcommonTypes()
        {
            TblBankAccountsAccountTypeNavigation = new HashSet<TblBankAccounts>();
            TblBankAccountsPayeeType = new HashSet<TblBankAccounts>();
            TblClaimHistory = new HashSet<TblClaimHistory>();
            TblClaimTransactionNew = new HashSet<TblClaimTransactionNew>();
            TblClaimsClaimStatus = new HashSet<TblClaims>();
            TblClaimsLoss = new HashSet<TblClaims>();
        }

        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }

        public virtual ICollection<TblBankAccounts> TblBankAccountsAccountTypeNavigation { get; set; }
        public virtual ICollection<TblBankAccounts> TblBankAccountsPayeeType { get; set; }
        public virtual ICollection<TblClaimHistory> TblClaimHistory { get; set; }
        public virtual ICollection<TblClaimTransactionNew> TblClaimTransactionNew { get; set; }
        public virtual ICollection<TblClaims> TblClaimsClaimStatus { get; set; }
        public virtual ICollection<TblClaims> TblClaimsLoss { get; set; }
    }
}
