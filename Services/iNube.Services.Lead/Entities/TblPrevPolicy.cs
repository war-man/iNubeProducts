using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblPrevPolicy
    {
        public int PolicyId { get; set; }
        public int? NeedAnalysisId { get; set; }
        public string PolicyNumber { get; set; }
        public decimal? MaturityFund { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
    }
}
