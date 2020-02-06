using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ClaimOtherVehicleDetailModel
    {
        public decimal OtherVehicleDetailID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<decimal> ClaimID { get; set; }
        public string VehicleNo { get; set; }
        public Nullable<int> VehicleTypeID { get; set; }
        public Nullable<int> ImpactSideID { get; set; }
        public Nullable<int> InsuranceCompanyID { get; set; }
        public string PolicyNo { get; set; }
        public string DriverName { get; set; }
        public string Remark { get; set; }
    }
}
