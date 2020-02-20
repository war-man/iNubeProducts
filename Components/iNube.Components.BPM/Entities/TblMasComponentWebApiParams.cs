using System;
using System.Collections.Generic;

namespace iNube.Components.BPM.Entities
{
    public partial class TblMasComponentWebApiParams
    {
        public decimal WebApiParamId { get; set; }
        public decimal? WebApiId { get; set; }
        public string ParameterName { get; set; }
        public string ParameterType { get; set; }
        public decimal? ParameterOrder { get; set; }

        public virtual TblMasComponentWebApi WebApi { get; set; }
    }
}
