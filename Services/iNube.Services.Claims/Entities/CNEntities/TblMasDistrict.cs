﻿using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities.CNEntities
{
    public partial class TblMasDistrict
    {
        public TblMasDistrict()
        {
            TblMasCity = new HashSet<TblMasCity>();
        }

        public int DistrictId { get; set; }
        public int? StateId { get; set; }
        public string DistrictCode { get; set; }
        public string DistrictName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasState State { get; set; }
        public virtual ICollection<TblMasCity> TblMasCity { get; set; }
    }
}
