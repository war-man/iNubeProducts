using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblMasState
    {
        public int StateId { get; set; }
        public int? CountryId { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasCountry Country { get; set; }
    }
}
