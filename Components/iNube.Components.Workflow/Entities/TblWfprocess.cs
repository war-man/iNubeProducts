using System;
using System.Collections.Generic;

namespace iNube.Components.Workflow.Entities
{
    public partial class TblWfprocess
    {
        public TblWfprocess()
        {
            TblWfstage = new HashSet<TblWfstage>();
            TblWorkflow = new HashSet<TblWorkflow>();
        }

        public decimal WfprocessId { get; set; }
        public string Wfname { get; set; }

        public virtual ICollection<TblWfstage> TblWfstage { get; set; }
        public virtual ICollection<TblWorkflow> TblWorkflow { get; set; }
    }
}
