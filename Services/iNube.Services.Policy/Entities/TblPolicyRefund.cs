using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblPolicyRefund
    {
        public decimal RefundId { get; set; }
        public string EndorsementNumber { get; set; }
        public DateTime? EndorsementEffectivedate { get; set; }
        public DateTime? TxnDate { get; set; }
        public decimal? TotalRefundAmount { get; set; }
        public string PaymentGatewayReferenceId { get; set; }
        public decimal? AmountPaid { get; set; }
        public DateTime? DateOfPayment { get; set; }
        public decimal? PolicyId { get; set; }
        public string PaymentStatus { get; set; }
        public string UpdatedResponse { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
