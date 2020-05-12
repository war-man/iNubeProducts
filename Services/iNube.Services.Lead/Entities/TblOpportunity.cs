using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblOpportunity
    {
        public TblOpportunity()
        {
            TblOpportunityHistory = new HashSet<TblOpportunityHistory>();
        }

        public int OppurtunityId { get; set; }
        public int ContactId { get; set; }
        public int? NeedAnalysisId { get; set; }
        public int StageId { get; set; }
        public bool? IsDeleted { get; set; }
        public string AllocatedFrom { get; set; }
        public string Createdby { get; set; }
        public string HandledBy { get; set; }

        public virtual TblContacts Contact { get; set; }
        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
        public virtual ICollection<TblOpportunityHistory> TblOpportunityHistory { get; set; }
    }
}
