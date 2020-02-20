using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Components.Workflow.Models
{
    public class WfProcessDto
    {
        public decimal WfprocessId { get; set; }
        public string Wfname { get; set; }
    }

    public class WfStageDto
    {
        public decimal WfstageId { get; set; }
        public decimal WfprocessId { get; set; }
        public string StageName { get; set; }
        public string StageType { get; set; }

        public WfProcessDto Wfprocess { get; set; }
    }

    public class WfStageFlowDto
    {
        public decimal WfstageflowId { get; set; }
        public decimal WfstageId { get; set; }
        public decimal NextStage { get; set; }

        public WfStageDto NextStageNavigation { get; set; }
        public WfStageDto Wfstage { get; set; }
    }

    public class WfStageStatusDto
    {
        public decimal WfstageStatusId { get; set; }
        public decimal WfstageId { get; set; }
        public string StatusName { get; set; }
        public string Mode { get; set; }
        public string StageState { get; set; }

        public WfStageDto Wfstage { get; set; }
    }

    public class WfStatusFlowDto
    {
        public decimal WfstatusflowId { get; set; }
        public decimal WfstageStatusId { get; set; }
        public decimal NextStatus { get; set; }

        public WfStageStatusDto NextStatusNavigation { get; set; }
        public WfStageStatusDto WfstageStatus { get; set; }
    }

    public class WorkflowDto
    {
        public decimal WorkflowId { get; set; }
        public decimal WfprocessId { get; set; }
        public decimal WfstageId { get; set; }
        public decimal WfstageStatusId { get; set; }
        public string WorkflowName { get; set; }
        public bool IsActive { get; set; }
        public string ItemType { get; set; }
        public decimal ItemReference { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime DateModified { get; set; }

        public WfProcessDto Wfprocess { get; set; }
        public WfStageDto Wfstage { get; set; }
        public WfStageStatusDto WfstageStatus { get; set; }
    }

    public class WfHistoryDto
    {
        public decimal WorkflowHistoryId { get; set; }
        public decimal WorkflowId { get; set; }
        public decimal FromStageStatus { get; set; }
        public decimal ToStageStatus { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

        public WfStageStatusDto FromStageStatusNavigation { get; set; }
        public WfStageStatusDto ToStageStatusNavigation { get; set; }
        public WorkflowDto Workflow { get; set; }
    }
  
}
