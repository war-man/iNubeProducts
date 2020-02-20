using System;
using System.Collections.Generic;

namespace iNube.Components.BPM.Entities
{
    public partial class TblMasBpmtaskParams
    {
        public decimal TaskParameterId { get; set; }
        public decimal? TaskId { get; set; }
        public string ParameterName { get; set; }
        public string ParameterType { get; set; }
        public decimal? ParameterOrder { get; set; }

        public virtual TblMasBpmtasks Task { get; set; }
    }
}
