using System;
using System.Collections.Generic;

namespace iNube.Components.BPM.Entities
{
    public partial class TblMasBpmtasks
    {
        public TblMasBpmtasks()
        {
            TblMasBpmtaskParams = new HashSet<TblMasBpmtaskParams>();
        }

        public decimal TaskId { get; set; }
        public string TaskName { get; set; }
        public string Type { get; set; }
        public string ClassName { get; set; }
        public string AssemblyPath { get; set; }
        public bool? InputCheck { get; set; }
        public string InputParameterName { get; set; }
        public string InputParameterType { get; set; }
        public string OutputParameterName { get; set; }
        public string OutputParameterType { get; set; }

        public virtual ICollection<TblMasBpmtaskParams> TblMasBpmtaskParams { get; set; }
    }
}
