using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblCdaccountDetails
    {
        public decimal TxnId { get; set; }
        public string AccountNo { get; set; }
        public string TxnEventType { get; set; }
        public DateTime? TxnDateTime { get; set; }
        public decimal? TxnAmountBalance { get; set; }
        public decimal? TaxAmountBalance { get; set; }
        public decimal? TotalAvailableBalance { get; set; }
        public decimal? LedgerBalance { get; set; }

        public virtual TblCdaccounts AccountNoNavigation { get; set; }
    }
}
