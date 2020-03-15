using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities.CNEntities
{
    public partial class TblMasPinCode
    {
        public int PincodeId { get; set; }
        public int? CityId { get; set; }
        public string Pincode { get; set; }
        public string AreaName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasCity City { get; set; }
    }
}
