using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblCdtransactions
    {
        public decimal TxnId { get; set; }
        public string AccountNo { get; set; }
        public decimal? PaymentId { get; set; }
        public string TxnType { get; set; }
        public DateTime? TransactionDate { get; set; }
        public decimal? TxnAmount { get; set; }
        public decimal? InitialAmount { get; set; }
        public decimal? AvailableAmount { get; set; }
        public decimal? LedgerBalance { get; set; }
        public string CreatedBy { get; set; }
        public string Description { get; set; }
        public int? CreditAccountNo { get; set; }
        public int? PaymentModeId { get; set; }
        public string PaymentRefernceId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblCdaccounts AccountNoNavigation { get; set; }
    }
}
