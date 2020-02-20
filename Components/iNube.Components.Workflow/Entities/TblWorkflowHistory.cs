using System;
using System.Collections.Generic;

namespace iNube.Components.Workflow.Entities
{
    public partial class TblWorkflowHistory
    {
        public decimal WorkflowHistoryId { get; set; }
        public decimal? WorkflowId { get; set; }
        public decimal? FromStageStatus { get; set; }
        public decimal? ToStageStatus { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblWfstageStatus FromStageStatusNavigation { get; set; }
        public virtual TblWfstageStatus ToStageStatusNavigation { get; set; }
        public virtual TblWorkflow Workflow { get; set; }
    }
}
