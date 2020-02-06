using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeedFinancialNeeds
    {
        public int FinancialNeedId { get; set; }
        public int? NeedAnalysisId { get; set; }
        public decimal? CurrentReq { get; set; }
        public decimal? EstimatedAmount { get; set; }
        public decimal? FundBalance { get; set; }
        public decimal? Gap { get; set; }
        public string Relationship { get; set; }
        public string Name { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
    }
}
