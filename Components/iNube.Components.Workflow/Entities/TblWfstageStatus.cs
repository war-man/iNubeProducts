using System;
using System.Collections.Generic;

namespace iNube.Components.Workflow.Entities
{
    public partial class TblWfstageStatus
    {
        public TblWfstageStatus()
        {
            TblWfstatusflowNextStatusNavigation = new HashSet<TblWfstatusflow>();
            TblWfstatusflowWfstageStatus = new HashSet<TblWfstatusflow>();
            TblWorkflow = new HashSet<TblWorkflow>();
            TblWorkflowHistoryFromStageStatusNavigation = new HashSet<TblWorkflowHistory>();
            TblWorkflowHistoryToStageStatusNavigation = new HashSet<TblWorkflowHistory>();
        }

        public decimal WfstageStatusId { get; set; }
        public decimal? WfstageId { get; set; }
        public string StatusName { get; set; }
        public string Mode { get; set; }
        public string StageState { get; set; }

        public virtual TblWfstage Wfstage { get; set; }
        public virtual ICollection<TblWfstatusflow> TblWfstatusflowNextStatusNavigation { get; set; }
        public virtual ICollection<TblWfstatusflow> TblWfstatusflowWfstageStatus { get; set; }
        public virtual ICollection<TblWorkflow> TblWorkflow { get; set; }
        public virtual ICollection<TblWorkflowHistory> TblWorkflowHistoryFromStageStatusNavigation { get; set; }
        public virtual ICollection<TblWorkflowHistory> TblWorkflowHistoryToStageStatusNavigation { get; set; }
    }
}
