using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblSwitchLog
    {
        public decimal LogId { get; set; }
        public string PolicyNo { get; set; }
        public string VehicleNumber { get; set; }
        public bool? SwitchStatus { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string SwitchType { get; set; }
    }
}
