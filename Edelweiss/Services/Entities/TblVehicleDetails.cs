using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblVehicleDetails
    {
        public int VehicleId { get; set; }
        public string VehicleModel { get; set; }
        public string VehicleType { get; set; }
        public byte[] VehicleImage { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
