using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblMasState
    {
        public TblMasState()
        {
            TblMasCity = new HashSet<TblMasCity>();
        }

        public int StateId { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
        public string StateAbbreviation { get; set; }
        public string StateType { get; set; }

        public virtual ICollection<TblMasCity> TblMasCity { get; set; }
    }
}
