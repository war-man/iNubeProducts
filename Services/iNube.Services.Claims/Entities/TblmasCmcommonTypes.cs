using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblmasCmcommonTypes
    {
        public TblmasCmcommonTypes()
        {
            TblBankAccountsAccountTypeNavigation = new HashSet<TblBankAccounts>();
            TblBankAccountsPayeeTypeNavigation = new HashSet<TblBankAccounts>();
            TblClaimHistory = new HashSet<TblClaimHistory>();
            TblClaimPaymentsAccountTypeNavigation = new HashSet<TblClaimPayments>();
            TblClaimPaymentsPayeeTypeNavigation = new HashSet<TblClaimPayments>();
            TblClaimTransactionNew = new HashSet<TblClaimTransactionNew>();
            TblClaimsClaimStatus = new HashSet<TblClaims>();
            TblClaimsLoss = new HashSet<TblClaims>();
        }

        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }

        public virtual ICollection<TblBankAccounts> TblBankAccountsAccountTypeNavigation { get; set; }
        public virtual ICollection<TblBankAccounts> TblBankAccountsPayeeTypeNavigation { get; set; }
        public virtual ICollection<TblClaimHistory> TblClaimHistory { get; set; }
        public virtual ICollection<TblClaimPayments> TblClaimPaymentsAccountTypeNavigation { get; set; }
        public virtual ICollection<TblClaimPayments> TblClaimPaymentsPayeeTypeNavigation { get; set; }
        public virtual ICollection<TblClaimTransactionNew> TblClaimTransactionNew { get; set; }
        public virtual ICollection<TblClaims> TblClaimsClaimStatus { get; set; }
        public virtual ICollection<TblClaims> TblClaimsLoss { get; set; }
    }
}
