using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblEndorsementDetails
    {
        public decimal EndorsementId { get; set; }
        public string EndorsementNo { get; set; }
        public string Action { get; set; }
        public string EnddorsementRequest { get; set; }
        public DateTime? EndorsementEffectivedate { get; set; }
        public decimal? PremiumAmount { get; set; }
        public decimal? Gst { get; set; }
        public decimal? TotalPremiumAmount { get; set; }
        public decimal? AmountBalanced { get; set; }
        public string PaymentGatewayReferenceId { get; set; }
        public DateTime? DateOfPayment { get; set; }
    }
}
