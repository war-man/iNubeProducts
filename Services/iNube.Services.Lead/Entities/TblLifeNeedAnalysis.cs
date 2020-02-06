using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblLifeNeedAnalysis
    {
        public TblLifeNeedAnalysis()
        {
            TblNeedEducationCalculator = new HashSet<TblNeedEducationCalculator>();
            TblNeedFinancialNeeds = new HashSet<TblNeedFinancialNeeds>();
            TblNeedHealthCalculator = new HashSet<TblNeedHealthCalculator>();
            TblNeedHumanValueCalculator = new HashSet<TblNeedHumanValueCalculator>();
            TblNeedRetirementCalculator = new HashSet<TblNeedRetirementCalculator>();
            TblNeedSavingCalculator = new HashSet<TblNeedSavingCalculator>();
            TblNeeds = new HashSet<TblNeeds>();
            TblOpportunity = new HashSet<TblOpportunity>();
            TblPrevPolicy = new HashSet<TblPrevPolicy>();
            TblPreviousInsurenceInfo = new HashSet<TblPreviousInsurenceInfo>();
        }

        public int NeedAnalysisId { get; set; }
        public int ContactId { get; set; }
        public int? Food { get; set; }
        public decimal? HouseElecWaterPhone { get; set; }
        public decimal? Clothes { get; set; }
        public decimal? Transport { get; set; }
        public decimal? FamilyHealthCare { get; set; }
        public decimal? EduOfChild { get; set; }
        public decimal? SpecialEvents { get; set; }
        public decimal? MaidAndOthers { get; set; }
        public decimal? OtherMonthly { get; set; }
        public decimal? TotalMonthly { get; set; }
        public decimal? MonthlyInstallments { get; set; }
        public decimal? LandAssets { get; set; }
        public decimal? MotorAssets { get; set; }
        public decimal? BankAssets { get; set; }
        public decimal? TotalAssets { get; set; }
        public decimal? LoanLb { get; set; }
        public decimal? MortgagesLb { get; set; }
        public decimal? LeasesLb { get; set; }
        public decimal? OthersLb { get; set; }
        public decimal? TotalLb { get; set; }
        public decimal? ProspectMonthly { get; set; }
        public decimal? SpouseMonthly { get; set; }
        public decimal? HouseHoldMonthly { get; set; }
        public decimal? MonthlyExpenditure { get; set; }
        public decimal? RateOfInterest { get; set; }
        public decimal? CapitalMonthlyExp1 { get; set; }
        public decimal? LifeInsurance { get; set; }
        public decimal? OtherSavings { get; set; }
        public decimal? CapitalMonthlyExp2 { get; set; }
        public decimal? GapIdentified { get; set; }
        public decimal? ExpensesAnnualTravel { get; set; }
        public decimal? ExpensesAnnualInsurance { get; set; }
        public decimal? AnnualExpenses { get; set; }
        public decimal? NeedsAgeRetirement { get; set; }
        public decimal? NeedsMonthlyRetirement { get; set; }
        public decimal? NeedsYearRetirement { get; set; }
        public decimal? LongTermChlidrenEdu { get; set; }
        public decimal? LongTermDaughterMrg { get; set; }
        public decimal? LongTermHouse { get; set; }
        public decimal? LtNeedAnnualExpn { get; set; }
        public decimal? GsprotectionCrtAnnualCash { get; set; }
        public decimal? GsprotectionAvgIncome { get; set; }
        public decimal? GsprotectionLifestyle { get; set; }
        public decimal? GsprotectionCapLiabilitiesTl { get; set; }
        public decimal? GsprotectionCapAssetsTa { get; set; }
        public decimal? GsprotectionSumAssuredSa { get; set; }
        public decimal? GsprotectionAddSareq { get; set; }
        public decimal? RtdGsneedsAnnualExpn { get; set; }
        public decimal? RtdGsneedsExpnAftrRtd { get; set; }
        public decimal? RtdGsneedsExtAssetsRtd { get; set; }
        public decimal? RtdGsneedsCrtLifeStyle { get; set; }
        public decimal? RtdGsneedsAnnualSavings { get; set; }
        public decimal? RtdGsneedsAnnualMonthly { get; set; }
        public bool? IsActive { get; set; }
        public string AssetsInvestments { get; set; }
        public decimal? TotalNeedValue { get; set; }
        public string ProductSelected { get; set; }
        public DateTime? DateNextMeeting { get; set; }
        public TimeSpan? TimeNextMeeting { get; set; }
        public string PurposeOfMeeting { get; set; }
        public string UploadSignPath { get; set; }
        public byte[] ProspectSign { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ProductsSelected { get; set; }
        public string MotorVehicleType { get; set; }
        public bool? IsCoveredUnderOtherPolicy { get; set; }
        public int? NoOfJanashaktiPolicies { get; set; }
        public int? NoOfOtherPolicies { get; set; }
        public string NeedAnalysispath { get; set; }
        public decimal? FromYear { get; set; }
        public decimal? ToYear { get; set; }
        public decimal? InflationRate { get; set; }
        public decimal? PlanNoOfYears { get; set; }
        public decimal? FixedDeposit { get; set; }
        public decimal? Shares { get; set; }
        public decimal? Vehicle { get; set; }
        public decimal? Jewellery { get; set; }
        public decimal? OtherAssets { get; set; }
        public decimal? TotalAssets1 { get; set; }
        public decimal? Loan { get; set; }
        public decimal? InsuredLoan { get; set; }
        public decimal? CreditCard { get; set; }
        public decimal? InsuredCreditCard { get; set; }
        public decimal? Lease { get; set; }
        public decimal? InsuredLease { get; set; }
        public decimal? OtherLiability { get; set; }
        public decimal? InsuredOtherLiability { get; set; }
        public decimal? NetAssets { get; set; }
        public decimal? LumpSumReq { get; set; }
        public decimal? Salary { get; set; }
        public decimal? Intrest { get; set; }
        public decimal? Rent { get; set; }
        public decimal? OtherIncome { get; set; }
        public decimal? TotalIncome { get; set; }
        public decimal? AnnualExp { get; set; }
        public decimal? AnnualVacation { get; set; }
        public decimal? Installment { get; set; }
        public decimal? VehExp { get; set; }
        public decimal? LoanExp { get; set; }
        public decimal? OtherExp { get; set; }
        public decimal? TotalExp { get; set; }
        public decimal? LumpSumReqExp { get; set; }
        public decimal? SurplusExp { get; set; }
        public decimal? CriticalIllnessReq { get; set; }
        public decimal? CriticalIllnessFund { get; set; }
        public decimal? CriticalIllnessGap { get; set; }
        public decimal? HospitalizationReq { get; set; }
        public decimal? HospitalizationFund { get; set; }
        public decimal? HospitalizationGap { get; set; }
        public decimal? TotalReq { get; set; }
        public decimal? TotalFund { get; set; }
        public decimal? TotalGap { get; set; }
        public decimal? AddExpReq { get; set; }
        public decimal? AddExpFund { get; set; }
        public decimal? AddExpGap { get; set; }
        public decimal? WealthReq { get; set; }
        public decimal? IncomeReq { get; set; }
        public decimal? DreamReq { get; set; }
        public decimal? MaturityDreamReq { get; set; }
        public decimal? TotalReq1 { get; set; }
        public decimal? MaturityTotalReq1 { get; set; }
        public decimal? EmergencyPolicy1 { get; set; }
        public decimal? EmergencyPolicy2 { get; set; }
        public decimal? EmergencyPolicy3 { get; set; }
        public decimal? MaturityPolicy1 { get; set; }
        public decimal? MaturityPolicy2 { get; set; }
        public decimal? MaturityPolicy3 { get; set; }
        public decimal? EmergencyTotal2 { get; set; }
        public decimal? MaturityTotal2 { get; set; }
        public decimal? Gap1 { get; set; }
        public decimal? Gap2 { get; set; }
        public bool? ChkProtection1 { get; set; }
        public bool? ChkProtection2 { get; set; }
        public bool? ChkProtection3 { get; set; }
        public bool? ChkProtection4 { get; set; }
        public bool? ChkProtection5 { get; set; }
        public bool? ChkProtection6 { get; set; }
        public bool? ChkEdu1 { get; set; }
        public bool? ChkEdu2 { get; set; }
        public bool? ChkEdu3 { get; set; }
        public bool? ChkEdu4 { get; set; }
        public bool? ChkEdu5 { get; set; }
        public bool? ChkEdu6 { get; set; }
        public bool? ChkSaving1 { get; set; }
        public bool? ChkSaving2 { get; set; }
        public bool? ChkSaving3 { get; set; }
        public bool? ChkSaving4 { get; set; }
        public bool? ChkSaving5 { get; set; }
        public bool? ChkSaving6 { get; set; }
        public bool? ChkRetire1 { get; set; }
        public bool? ChkRetire2 { get; set; }
        public bool? ChkRetire3 { get; set; }
        public bool? ChkRetire4 { get; set; }
        public bool? ChkRetire5 { get; set; }
        public bool? ChkRetire6 { get; set; }
        public bool? ChkHealth1 { get; set; }
        public bool? ChkHealth2 { get; set; }
        public bool? ChkHealth3 { get; set; }
        public bool? ChkHealth4 { get; set; }
        public bool? ChkHealth5 { get; set; }
        public bool? ChkHealth6 { get; set; }
        public decimal? TotalLiability { get; set; }
        public decimal? InsuredTotalLiability { get; set; }
        public decimal? FinancialCurrReqTotal { get; set; }
        public decimal? FinancialEstAmount { get; set; }
        public decimal? FinancialFund { get; set; }
        public decimal? FinancialGap { get; set; }
        public bool? Chkconfirm { get; set; }
        public string NotePadPath { get; set; }
        public bool? Chkprodconfirm { get; set; }

        public virtual TblContacts Contact { get; set; }
        public virtual ICollection<TblNeedEducationCalculator> TblNeedEducationCalculator { get; set; }
        public virtual ICollection<TblNeedFinancialNeeds> TblNeedFinancialNeeds { get; set; }
        public virtual ICollection<TblNeedHealthCalculator> TblNeedHealthCalculator { get; set; }
        public virtual ICollection<TblNeedHumanValueCalculator> TblNeedHumanValueCalculator { get; set; }
        public virtual ICollection<TblNeedRetirementCalculator> TblNeedRetirementCalculator { get; set; }
        public virtual ICollection<TblNeedSavingCalculator> TblNeedSavingCalculator { get; set; }
        public virtual ICollection<TblNeeds> TblNeeds { get; set; }
        public virtual ICollection<TblOpportunity> TblOpportunity { get; set; }
        public virtual ICollection<TblPrevPolicy> TblPrevPolicy { get; set; }
        public virtual ICollection<TblPreviousInsurenceInfo> TblPreviousInsurenceInfo { get; set; }
    }
}
