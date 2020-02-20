using System;
using System.Collections.Generic;

namespace iNube.Components.Workflow.Entities
{
    public partial class TblWfstatusflow
    {
        public decimal WfstatusflowId { get; set; }
        public decimal? WfstageStatusId { get; set; }
        public decimal? NextStatus { get; set; }

        public virtual TblWfstageStatus NextStatusNavigation { get; set; }
        public virtual TblWfstageStatus WfstageStatus { get; set; }
    }
}
