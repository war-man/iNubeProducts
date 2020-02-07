﻿using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblMasState
    {
        public TblMasState()
        {
            TblMasDistrict = new HashSet<TblMasDistrict>();
        }

        public int StateId { get; set; }
        public int? CountryId { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasCountry Country { get; set; }
        public virtual ICollection<TblMasDistrict> TblMasDistrict { get; set; }
    }
}
