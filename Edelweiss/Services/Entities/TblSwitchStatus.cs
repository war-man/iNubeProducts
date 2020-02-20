using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblSwitchStatus
    {
        public decimal SwitchId { get; set; }
        public string PolicyNo { get; set; }
        public string DriverId { get; set; }
        public bool? SwitchStatus { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
