using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblMasCity
    {
        public int CityId { get; set; }
        public int? StateId { get; set; }
        public string CityCode { get; set; }
        public string Pincode { get; set; }
        public string CityName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
        public string Type { get; set; }

        public virtual TblMasState State { get; set; }
    }
}
