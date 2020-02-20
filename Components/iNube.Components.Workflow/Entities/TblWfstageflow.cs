using System;
using System.Collections.Generic;

namespace iNube.Components.Workflow.Entities
{
    public partial class TblWfstageflow
    {
        public decimal WfstageflowId { get; set; }
        public decimal? WfstageId { get; set; }
        public decimal? NextStage { get; set; }

        public virtual TblWfstage NextStageNavigation { get; set; }
        public virtual TblWfstage Wfstage { get; set; }
    }
}
