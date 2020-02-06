using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeeds
    {
        public int NeedId { get; set; }
        public int NeedAnalysisId { get; set; }
        public int IdentifiedNeed { get; set; }
        public string Value { get; set; }
        public string Priority { get; set; }
        public string PlanSuggested { get; set; }
        public int? StatusId { get; set; }
        public string NeedName { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
    }
}
