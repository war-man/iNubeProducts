using System;
using System.Collections.Generic;

namespace iNube.Services.Accounting.Entities
{
    public partial class TblTransactionHeader
    {
        public TblTransactionHeader()
        {
            TblTransaction = new HashSet<TblTransaction>();
            TblTransactionSubLedger = new HashSet<TblTransactionSubLedger>();
        }

        public decimal TransactionHeaderId { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual TblTransactionRuleMapping TransactionRuleMapping { get; set; }
        public virtual ICollection<TblTransaction> TblTransaction { get; set; }
        public virtual ICollection<TblTransactionSubLedger> TblTransactionSubLedger { get; set; }
    }
}
