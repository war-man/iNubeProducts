using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblDailyCdtransaction
    {
        public decimal TxnId { get; set; }
        public string AccountNo { get; set; }
        public string TxnEventType { get; set; }
        public DateTime? TransactionDateTime { get; set; }
        public decimal? AvailableBalance { get; set; }
        public decimal? LedgerBalance { get; set; }
        public string Frequency { get; set; }
        public string References { get; set; }

        public virtual TblCdaccounts AccountNoNavigation { get; set; }
    }
}
