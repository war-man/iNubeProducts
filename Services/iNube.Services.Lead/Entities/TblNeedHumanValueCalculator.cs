using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeedHumanValueCalculator
    {
        public int Id { get; set; }
        public int? NeedAnalysisId { get; set; }
        public decimal? MonthlyEarning { get; set; }
        public decimal? NoOfYears { get; set; }
        public decimal? IntrestRate { get; set; }
        public decimal? EstIncome { get; set; }
        public decimal? FutureAvailableFund { get; set; }
        public decimal? AvailableFund { get; set; }
        public decimal? EmergencyFundReq { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
    }
}
