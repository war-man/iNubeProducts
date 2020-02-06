using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ClaimWitnessDetailModel
    {
        public decimal WitnessDetailID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<decimal> ClaimID { get; set; }
        public string Name { get; set; }
        public Nullable<int> Age { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }
        public string Remark { get; set; }
    }
}
