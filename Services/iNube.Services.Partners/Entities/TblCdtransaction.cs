using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblCdtransaction
    {
        public TblCdtransaction()
        {
            TblCdtransactionDetails = new HashSet<TblCdtransactionDetails>();
        }

        public decimal TxnId { get; set; }
        public DateTime? TxnDateTime { get; set; }
        public string AccountNo { get; set; }
        public string Description { get; set; }
        public string TxnType { get; set; }
        public decimal? InitialBalance { get; set; }
        public decimal? TxnAmount { get; set; }
        public decimal? TaxAmount { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal? FinalBalance { get; set; }

        public virtual TblCdaccounts AccountNoNavigation { get; set; }
        public virtual ICollection<TblCdtransactionDetails> TblCdtransactionDetails { get; set; }
    }
}
