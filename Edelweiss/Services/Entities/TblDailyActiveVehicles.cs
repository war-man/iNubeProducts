using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblDailyActiveVehicles
    {
        public decimal ActiveId { get; set; }
        public string PolicyNumber { get; set; }
        public decimal? ActivePc { get; set; }
        public decimal? ActiveTw { get; set; }
        public decimal? TotalPremium { get; set; }
        public DateTime? TxnDate { get; set; }
        public decimal? FromTax { get; set; }
        public decimal? ToTax { get; set; }
        public decimal? BasePremium { get; set; }
    }
}
