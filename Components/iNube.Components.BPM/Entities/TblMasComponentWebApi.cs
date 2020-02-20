using System;
using System.Collections.Generic;

namespace iNube.Components.BPM.Entities
{
    public partial class TblMasComponentWebApi
    {
        public TblMasComponentWebApi()
        {
            TblMasComponentWebApiParams = new HashSet<TblMasComponentWebApiParams>();
        }

        public decimal WebApiId { get; set; }
        public decimal? ComponentId { get; set; }
        public string WebApiName { get; set; }
        public bool? InputCheck { get; set; }
        public string InputParameterName { get; set; }
        public string InputParameterType { get; set; }
        public string OutputParameterName { get; set; }
        public string OutputParameterType { get; set; }

        public virtual TblMasComponents Component { get; set; }
        public virtual ICollection<TblMasComponentWebApiParams> TblMasComponentWebApiParams { get; set; }
    }
}
