using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblPayment
    {
        public decimal PaymentId { get; set; }
        public decimal? QuotationId { get; set; }
        public string TransactionReferenceNumber { get; set; }
        public string PaymentGatewayResponse { get; set; }
        public bool? PaymentStatus { get; set; }
        public decimal? PaymentAmount { get; set; }
        public DateTime? CreatedDateTime { get; set; }
    }
}
