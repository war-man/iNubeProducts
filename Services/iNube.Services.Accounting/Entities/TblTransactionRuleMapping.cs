using System;
using System.Collections.Generic;

namespace iNube.Services.Accounting.Entities
{
    public partial class TblTransactionRuleMapping
    {
        public TblTransactionRuleMapping()
        {
            TblSubLedgerReferences = new HashSet<TblSubLedgerReferences>();
            TblTransactionConditions = new HashSet<TblTransactionConditions>();
            TblTransactionHeader = new HashSet<TblTransactionHeader>();
        }

        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<TblSubLedgerReferences> TblSubLedgerReferences { get; set; }
        public virtual ICollection<TblTransactionConditions> TblTransactionConditions { get; set; }
        public virtual ICollection<TblTransactionHeader> TblTransactionHeader { get; set; }
    }
}
