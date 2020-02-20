using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblVehicleDetailsData
    {
        public decimal VehicleDetailsDataId { get; set; }
        public int? VehicleId { get; set; }
        public decimal? AgeOfVehicle { get; set; }
        public decimal? SumInsured { get; set; }
        public bool? IsActive { get; set; }
    }
}
