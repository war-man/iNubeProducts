using System;
using System.Collections.Generic;

namespace iNube.Services.Accounting.Entities
{
    public partial class TblSubLedgerReferences
    {
        public TblSubLedgerReferences()
        {
            TblTransactionSubLedger = new HashSet<TblTransactionSubLedger>();
        }

        public decimal SubLedgerReferencesId { get; set; }
        public string LedgerObject { get; set; }
        public string LedgerColName { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string TableName { get; set; }

        public virtual TblTransactionRuleMapping TransactionRuleMapping { get; set; }
        public virtual ICollection<TblTransactionSubLedger> TblTransactionSubLedger { get; set; }
    }
}
