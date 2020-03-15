using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblPremiumBookingLog
    {
        public int LogId { get; set; }
        public string PolicyNo { get; set; }
        public decimal? TxnAmount { get; set; }
        public DateTime? TxnDateTime { get; set; }
        public string TxnDetails { get; set; }
        public decimal? FromTax { get; set; }
        public decimal? ToTax { get; set; }
        public decimal? BasePremium { get; set; }
        public bool? TxnStatus { get; set; }
    }
}
