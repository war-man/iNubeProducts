using System;
using System.Collections.Generic;

namespace iNube.Components.BPM.Entities
{
    public partial class TblMasComponents
    {
        public TblMasComponents()
        {
            TblMasComponentWebApi = new HashSet<TblMasComponentWebApi>();
        }

        public decimal ComponentId { get; set; }
        public string ComponentName { get; set; }
        public string ComponentService { get; set; }

        public virtual ICollection<TblMasComponentWebApi> TblMasComponentWebApi { get; set; }
    }
}
