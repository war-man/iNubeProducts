using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblOpportunityHistory
    {
        public int OpportunityHistoryId { get; set; }
        public int? OpportunityId { get; set; }
        public int? StageId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual TblOpportunity Opportunity { get; set; }
    }
}
