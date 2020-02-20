using System;
using System.Collections.Generic;

namespace iNube.Components.Workflow.Entities
{
    public partial class TblWfstage
    {
        public TblWfstage()
        {
            TblWfstageStatus = new HashSet<TblWfstageStatus>();
            TblWfstageflowNextStageNavigation = new HashSet<TblWfstageflow>();
            TblWfstageflowWfstage = new HashSet<TblWfstageflow>();
            TblWorkflow = new HashSet<TblWorkflow>();
        }

        public decimal WfstageId { get; set; }
        public decimal? WfprocessId { get; set; }
        public string StageName { get; set; }
        public string StageType { get; set; }

        public virtual TblWfprocess Wfprocess { get; set; }
        public virtual ICollection<TblWfstageStatus> TblWfstageStatus { get; set; }
        public virtual ICollection<TblWfstageflow> TblWfstageflowNextStageNavigation { get; set; }
        public virtual ICollection<TblWfstageflow> TblWfstageflowWfstage { get; set; }
        public virtual ICollection<TblWorkflow> TblWorkflow { get; set; }
    }
}
