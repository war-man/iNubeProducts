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
        public decimal? Premium { get; set; }
        public DateTime? TxnDate { get; set; }
    }
}
