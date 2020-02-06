using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeedHealthCalculator
    {
        public int Id { get; set; }
        public int? NeedAnalysisId { get; set; }
        public string HospitalBills { get; set; }
        public string HospRetireExp { get; set; }
        public string HealthAdversities { get; set; }
        public string AnnualAmountHealthExp { get; set; }
        public string CoverageHealthExp { get; set; }
        public string AdequacyHealthExp { get; set; }
        public decimal? CriticalillnessReq { get; set; }
        public decimal? CriticalIllenssFund { get; set; }
        public decimal? CriticalIllnessGap { get; set; }
        public decimal? HospReq { get; set; }
        public decimal? HospFund { get; set; }
        public decimal? HospGap { get; set; }
        public decimal? AddLossReq { get; set; }
        public decimal? AddLossFund { get; set; }
        public decimal? AddLossGap { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
    }
}
