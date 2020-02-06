using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblPreviousInsurenceInfo
    {
        public decimal PrevInsuranceId { get; set; }
        public int NeedAnalysisId { get; set; }
        public string CompanyName { get; set; }
        public string PolicyProposalNo { get; set; }
        public string TotalSiatDeath { get; set; }
        public string AccidentalBenifit { get; set; }
        public string CriticalIllnessBenifit { get; set; }
        public string HospitalizationPerDay { get; set; }
        public string CurrentStatus { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
    }
}
