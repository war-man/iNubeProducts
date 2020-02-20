using System;
using System.Collections.Generic;

namespace iNube.Components.Workflow.Entities
{
    public partial class TblWorkflow
    {
        public TblWorkflow()
        {
            TblWorkflowHistory = new HashSet<TblWorkflowHistory>();
        }

        public decimal WorkflowId { get; set; }
        public decimal? WfprocessId { get; set; }
        public decimal? WfstageId { get; set; }
        public decimal? WfstageStatusId { get; set; }
        public string WorkflowName { get; set; }
        public bool? IsActive { get; set; }
        public string ItemType { get; set; }
        public decimal? ItemReference { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? DateModified { get; set; }

        public virtual TblWfprocess Wfprocess { get; set; }
        public virtual TblWfstage Wfstage { get; set; }
        public virtual TblWfstageStatus WfstageStatus { get; set; }
        public virtual ICollection<TblWorkflowHistory> TblWorkflowHistory { get; set; }
    }
}
