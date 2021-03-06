﻿using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities.CNEntities
{
    public partial class TblMasCity
    {
        public TblMasCity()
        {
            TblMasPinCode = new HashSet<TblMasPinCode>();
        }

        public int CityId { get; set; }
        public int? DistrictId { get; set; }
        public string CityCode { get; set; }
        public string Pincode { get; set; }
        public string CityName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasDistrict District { get; set; }
        public virtual ICollection<TblMasPinCode> TblMasPinCode { get; set; }
    }
}
