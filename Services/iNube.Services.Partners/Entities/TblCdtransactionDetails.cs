using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblCdtransactionDetails
    {
        public decimal TxnId { get; set; }
        public decimal CdtransactionId { get; set; }
        public DateTime? TransactionDateTime { get; set; }
        public decimal? TxnAmount { get; set; }
        public decimal? TaxAmount { get; set; }
        public decimal? TotalAmount { get; set; }
        public string TxnIssuedFor { get; set; }
        public string Description { get; set; }
        public string References { get; set; }

        public virtual TblCdtransaction Cdtransaction { get; set; }
    }
}
