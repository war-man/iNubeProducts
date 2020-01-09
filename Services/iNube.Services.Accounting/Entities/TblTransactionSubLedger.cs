using System;
using System.Collections.Generic;

namespace iNube.Services.Accounting.Entities
{
    public partial class TblTransactionSubLedger
    {
        public decimal TransactionSubLedgerId { get; set; }
        public decimal TransactionHeaderId { get; set; }
        public decimal SubLedgerReferencesId { get; set; }
        public string Value { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual TblSubLedgerReferences SubLedgerReferences { get; set; }
        public virtual TblTransactionHeader TransactionHeader { get; set; }
    }
}
