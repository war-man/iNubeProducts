using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeedRetirementCalculator
    {
        public int Id { get; set; }
        public int? NeedAnalysisId { get; set; }
        public int? FromYear { get; set; }
        public int? ToYear { get; set; }
        public int? InflationRate { get; set; }
        public int? PlanNoYears { get; set; }
        public int? IntrestRate { get; set; }
        public decimal? TotalMonthlyExp { get; set; }
        public decimal? EstMonthlyExp { get; set; }
        public decimal? CurrentFoodExp { get; set; }
        public decimal? CurrentWaterExp { get; set; }
        public decimal? CurrentRentExp { get; set; }
        public decimal? CurrentLeaseExp { get; set; }
        public decimal? CurrentTransportExp { get; set; }
        public decimal? CurrentMedExp { get; set; }
        public decimal? CurrentEduExp { get; set; }
        public decimal? CurrentClothesExp { get; set; }
        public decimal? CurrentEntertainmentExp { get; set; }
        public decimal? CurrentCharity { get; set; }
        public decimal? CurrentOtherExp { get; set; }
        public decimal? EstFoodExp { get; set; }
        public decimal? EstWaterExp { get; set; }
        public decimal? EstRentExp { get; set; }
        public decimal? EstLeaseExp { get; set; }
        public decimal? EstTransportExp { get; set; }
        public decimal? EstMedExp { get; set; }
        public decimal? EstEduExp { get; set; }
        public decimal? EstClothesExp { get; set; }
        public decimal? EstEntertainmentExp { get; set; }
        public decimal? EstCharity { get; set; }
        public decimal? EstOtherExp { get; set; }
        public decimal? CurrentMonthlySalary { get; set; }
        public decimal? CurrentEpfbalance { get; set; }
        public decimal? EstEpfbalance { get; set; }
        public decimal? CurrentMonthly20Sal { get; set; }
        public decimal? CurrentEtfbalance { get; set; }
        public decimal? EstEtfbalance { get; set; }
        public decimal? CurrentMonthly3Sal { get; set; }
        public decimal? CurrentGratuityFund { get; set; }
        public decimal? EstGratuityFund { get; set; }
        public decimal? TotalEstMonthlyExpFund { get; set; }
        public decimal? ChildEduFund { get; set; }
        public decimal? ChildWeddingFund { get; set; }
        public decimal? VehicleFund { get; set; }
        public decimal? LoanFund { get; set; }
        public decimal? OtherFund { get; set; }
        public decimal? FundBalance { get; set; }
        public decimal? PerAnnIncomeIntrest { get; set; }
        public decimal? EstAnnualLivExp { get; set; }
        public decimal? TotalAnnualExp { get; set; }
        public decimal? ExistingOthIncome { get; set; }
        public decimal? PensionGap { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
    }
}
