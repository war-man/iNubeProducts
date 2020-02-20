using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblQuotation
    {
        public decimal QuoteId { get; set; }
        public string QuotationNumber { get; set; }
        public string PrimaryDriverName { get; set; }
        public string Mobileno { get; set; }
        public decimal? Age { get; set; }
        public decimal? Experience { get; set; }
        public string VehicleAge { get; set; }
        public int? City { get; set; }
        public string VehicleMakeModelId { get; set; }
        public string PolicyNumber { get; set; }
        public string SumInsured { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public decimal? NumberOfDrivers { get; set; }
        public decimal? NumberOfVehicle { get; set; }
        public decimal? Premium { get; set; }
        public string Frequency { get; set; }
        public DateTime? StartDate { get; set; }
    }
}
