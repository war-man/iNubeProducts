using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Lead.Entities
{
    public partial class AVOLMContext : DbContext
    {
        public AVOLMContext()
        {
        }

        public AVOLMContext(DbContextOptions<AVOLMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAddress> TblAddress { get; set; }
        public virtual DbSet<TblContacts> TblContacts { get; set; }
        public virtual DbSet<TblDependants> TblDependants { get; set; }
        public virtual DbSet<TblLifeNeedAnalysis> TblLifeNeedAnalysis { get; set; }
        public virtual DbSet<TblLifeQq> TblLifeQq { get; set; }
        public virtual DbSet<TblMasCity> TblMasCity { get; set; }
        public virtual DbSet<TblMasCommonTypes> TblMasCommonTypes { get; set; }
        public virtual DbSet<TblMasCountry> TblMasCountry { get; set; }
        public virtual DbSet<TblMasDistrict> TblMasDistrict { get; set; }
        public virtual DbSet<TblMasLifeOccupations> TblMasLifeOccupations { get; set; }
        public virtual DbSet<TblMasNeeds> TblMasNeeds { get; set; }
        public virtual DbSet<TblMasPinCode> TblMasPinCode { get; set; }
        public virtual DbSet<TblMasState> TblMasState { get; set; }
        public virtual DbSet<TblNeedEduForeign> TblNeedEduForeign { get; set; }
        public virtual DbSet<TblNeedEduGceal> TblNeedEduGceal { get; set; }
        public virtual DbSet<TblNeedEduHigher> TblNeedEduHigher { get; set; }
        public virtual DbSet<TblNeedEduLocal> TblNeedEduLocal { get; set; }
        public virtual DbSet<TblNeedEducationCalculator> TblNeedEducationCalculator { get; set; }
        public virtual DbSet<TblNeedFinancialNeeds> TblNeedFinancialNeeds { get; set; }
        public virtual DbSet<TblNeedHealthCalculator> TblNeedHealthCalculator { get; set; }
        public virtual DbSet<TblNeedHumanValueCalculator> TblNeedHumanValueCalculator { get; set; }
        public virtual DbSet<TblNeedRetirementCalculator> TblNeedRetirementCalculator { get; set; }
        public virtual DbSet<TblNeedSaveCar> TblNeedSaveCar { get; set; }
        public virtual DbSet<TblNeedSaveHouse> TblNeedSaveHouse { get; set; }
        public virtual DbSet<TblNeedSaveOthers> TblNeedSaveOthers { get; set; }
        public virtual DbSet<TblNeedSaveTour> TblNeedSaveTour { get; set; }
        public virtual DbSet<TblNeedSaveWedding> TblNeedSaveWedding { get; set; }
        public virtual DbSet<TblNeedSavingCalculator> TblNeedSavingCalculator { get; set; }
        public virtual DbSet<TblNeeds> TblNeeds { get; set; }
        public virtual DbSet<TblNumberingScheme> TblNumberingScheme { get; set; }
        public virtual DbSet<TblOpportunity> TblOpportunity { get; set; }
        public virtual DbSet<TblOpportunityApproval> TblOpportunityApproval { get; set; }
        public virtual DbSet<TblOpportunityHistory> TblOpportunityHistory { get; set; }
        public virtual DbSet<TblPrevPolicy> TblPrevPolicy { get; set; }
        public virtual DbSet<TblPreviousInsurenceInfo> TblPreviousInsurenceInfo { get; set; }
        public virtual DbSet<TblProspect> TblProspect { get; set; }
        public virtual DbSet<TblQuoteIllustration> TblQuoteIllustration { get; set; }
        public virtual DbSet<TblQuoteMemberBeniftDetials> TblQuoteMemberBeniftDetials { get; set; }
        public virtual DbSet<TblQuoteMemberDetials> TblQuoteMemberDetials { get; set; }
        public virtual DbSet<TblSuspect> TblSuspect { get; set; }
        public virtual DbSet<TblTopupDetails> TblTopupDetails { get; set; }
        public virtual DbSet<TblmasLdcommonTypes> TblmasLdcommonTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#pragma warning disable CS1030 // #warning directive
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=AVOLifeP2;User ID=AVOLifeUserP2;Password=AVOLife*User123;Trusted_Connection=False;");
#pragma warning restore CS1030 // #warning directive
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<TblAddress>(entity =>
            {
                entity.HasKey(e => e.AddressId)
                    .HasName("PK_tblProposer");

                entity.ToTable("tblAddress", "LM");

                entity.Property(e => e.AddressId)
                    .HasColumnName("AddressID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Address1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Address2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Address3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AddressTypeId).HasDefaultValueSql("((1))");

                entity.Property(e => e.AreaId).HasColumnName("AreaID");

                entity.Property(e => e.City)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.District)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DistrictId).HasColumnName("DistrictID");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.SourceRowId)
                    .HasColumnName("SourceRowID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.State)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StateId).HasColumnName("StateID");
            });

            modelBuilder.Entity<TblContacts>(entity =>
            {
                entity.HasKey(e => e.ContactId);

                entity.ToTable("tblContacts", "LM");

                entity.Property(e => e.ContactId).HasColumnName("ContactID");

                entity.Property(e => e.AddressId)
                    .HasColumnName("AddressID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ClientCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ContactType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ContactTypeId).HasColumnName("ContactTypeID");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.Currency)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.EmailId)
                    .HasColumnName("EmailID")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Employer)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IntroducerCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdated).HasColumnType("datetime");

                entity.Property(e => e.LeadNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MaritalStatusId)
                    .HasColumnName("MaritalStatusID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.MobileNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MonthlyIncome)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NationalityId)
                    .HasColumnName("NationalityID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Nicno)
                    .HasColumnName("NICNO")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OccupationId).HasColumnName("OccupationID");

                entity.Property(e => e.ParentContactId).HasColumnName("ParentContactID");

                entity.Property(e => e.PassportNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Place)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Relationship)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Salutation)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseDob)
                    .HasColumnName("SpouseDOB")
                    .HasColumnType("date");

                entity.Property(e => e.SpouseName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Work)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.TblContacts)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("FK__tblContac__Addre__44952D46");

                entity.HasOne(d => d.ParentContact)
                    .WithMany(p => p.InverseParentContact)
                    .HasForeignKey(d => d.ParentContactId)
                    .HasConstraintName("FK__tblContac__Paren__4959E263");
            });

            modelBuilder.Entity<TblDependants>(entity =>
            {
                entity.HasKey(e => e.DependantId)
                    .HasName("PK__tblDepen__78AE7AD7D9D948A8");

                entity.ToTable("tblDependants", "LM");

                entity.Property(e => e.DependantId).HasColumnName("DependantID");

                entity.Property(e => e.ContactId).HasColumnName("ContactID");

                entity.Property(e => e.DependantDob)
                    .HasColumnName("DependantDOB")
                    .HasColumnType("date");

                entity.Property(e => e.DependantName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.DependantRelation)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.TblDependants)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK__tblDepend__Conta__0682EC34");
            });

            modelBuilder.Entity<TblLifeNeedAnalysis>(entity =>
            {
                entity.HasKey(e => e.NeedAnalysisId)
                    .HasName("PK_tblNeedAnalysis");

                entity.ToTable("tblLifeNeedAnalysis", "LM");

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.Property(e => e.AddExpFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AddExpGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AddExpReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AnnualExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AnnualExpenses)
                    .HasColumnName("Annual_Expenses")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.AnnualVacation).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AssetsInvestments)
                    .HasColumnName("Assets_investments")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BankAssets)
                    .HasColumnName("Bank_Assets")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.CapitalMonthlyExp1)
                    .HasColumnName("Capital_Monthly_Exp_1")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.CapitalMonthlyExp2)
                    .HasColumnName("Capital_Monthly_Exp_2")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ChkEdu1).HasColumnName("chkEdu1");

                entity.Property(e => e.ChkEdu2).HasColumnName("chkEdu2");

                entity.Property(e => e.ChkEdu3).HasColumnName("chkEdu3");

                entity.Property(e => e.ChkEdu4).HasColumnName("chkEdu4");

                entity.Property(e => e.ChkEdu5).HasColumnName("chkEdu5");

                entity.Property(e => e.ChkEdu6).HasColumnName("chkEdu6");

                entity.Property(e => e.ChkHealth1).HasColumnName("chkHealth1");

                entity.Property(e => e.ChkHealth2).HasColumnName("chkHealth2");

                entity.Property(e => e.ChkHealth3).HasColumnName("chkHealth3");

                entity.Property(e => e.ChkHealth4).HasColumnName("chkHealth4");

                entity.Property(e => e.ChkHealth5).HasColumnName("chkHealth5");

                entity.Property(e => e.ChkHealth6).HasColumnName("chkHealth6");

                entity.Property(e => e.ChkProtection1).HasColumnName("chkProtection1");

                entity.Property(e => e.ChkProtection2).HasColumnName("chkProtection2");

                entity.Property(e => e.ChkProtection3).HasColumnName("chkProtection3");

                entity.Property(e => e.ChkProtection4).HasColumnName("chkProtection4");

                entity.Property(e => e.ChkProtection5).HasColumnName("chkProtection5");

                entity.Property(e => e.ChkProtection6).HasColumnName("chkProtection6");

                entity.Property(e => e.ChkRetire1).HasColumnName("chkRetire1");

                entity.Property(e => e.ChkRetire2).HasColumnName("chkRetire2");

                entity.Property(e => e.ChkRetire3).HasColumnName("chkRetire3");

                entity.Property(e => e.ChkRetire4).HasColumnName("chkRetire4");

                entity.Property(e => e.ChkRetire5).HasColumnName("chkRetire5");

                entity.Property(e => e.ChkRetire6).HasColumnName("chkRetire6");

                entity.Property(e => e.ChkSaving1).HasColumnName("chkSaving1");

                entity.Property(e => e.ChkSaving2).HasColumnName("chkSaving2");

                entity.Property(e => e.ChkSaving3).HasColumnName("chkSaving3");

                entity.Property(e => e.ChkSaving4).HasColumnName("chkSaving4");

                entity.Property(e => e.ChkSaving5).HasColumnName("chkSaving5");

                entity.Property(e => e.ChkSaving6).HasColumnName("chkSaving6");

                entity.Property(e => e.Chkconfirm).HasColumnName("chkconfirm");

                entity.Property(e => e.Chkprodconfirm).HasColumnName("chkprodconfirm");

                entity.Property(e => e.Clothes).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ContactId).HasColumnName("ContactID");

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.CreditCard).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CriticalIllnessFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CriticalIllnessGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CriticalIllnessReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.DateNextMeeting)
                    .HasColumnName("Date_NextMeeting")
                    .HasColumnType("date");

                entity.Property(e => e.DreamReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EduOfChild)
                    .HasColumnName("Edu_of_Child")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.EmergencyPolicy1).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EmergencyPolicy2).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EmergencyPolicy3).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EmergencyTotal2).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ExpensesAnnualInsurance)
                    .HasColumnName("Expenses_Annual_Insurance")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ExpensesAnnualTravel)
                    .HasColumnName("Expenses_Annual_Travel")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.FamilyHealthCare)
                    .HasColumnName("Family_HealthCare")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.FinancialCurrReqTotal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FinancialEstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FinancialFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FinancialGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FixedDeposit).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FromYear).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Gap1).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap2).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.GapIdentified)
                    .HasColumnName("Gap_Identified")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.GsprotectionAddSareq)
                    .HasColumnName("GSProtection_Add_SAreq")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.GsprotectionAvgIncome)
                    .HasColumnName("GSProtection_AvgIncome")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.GsprotectionCapAssetsTa)
                    .HasColumnName("GSProtection_CapAssets_TA")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.GsprotectionCapLiabilitiesTl)
                    .HasColumnName("GSProtection_CapLiabilities_TL")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.GsprotectionCrtAnnualCash)
                    .HasColumnName("GSProtection_CrtAnnualCash")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.GsprotectionLifestyle)
                    .HasColumnName("GSProtection_lifestyle")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.GsprotectionSumAssuredSa)
                    .HasColumnName("GSProtection_SumAssured_SA")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.HospitalizationFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.HospitalizationGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.HospitalizationReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.HouseElecWaterPhone)
                    .HasColumnName("House_Elec_Water_Phone")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.HouseHoldMonthly)
                    .HasColumnName("HouseHold_Monthly")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.IncomeReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InflationRate).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Installment).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InsuredCreditCard).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InsuredLease).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InsuredLoan).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InsuredOtherLiability).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InsuredTotalLiability).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Intrest).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Jewellery).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LandAssets)
                    .HasColumnName("Land_Assets")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Lease).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LeasesLb)
                    .HasColumnName("Leases_LB")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LifeInsurance)
                    .HasColumnName("Life_Insurance")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Loan).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LoanExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LoanLb)
                    .HasColumnName("Loan_LB")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LongTermChlidrenEdu)
                    .HasColumnName("LongTerm_ChlidrenEdu")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LongTermDaughterMrg)
                    .HasColumnName("LongTerm_DaughterMrg")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LongTermHouse)
                    .HasColumnName("LongTerm_House")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LtNeedAnnualExpn)
                    .HasColumnName("LT_Need_AnnualExpn")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LumpSumReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LumpSumReqExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaidAndOthers).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MaturityDreamReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityPolicy1).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityPolicy2).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityPolicy3).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityTotal2).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityTotalReq1).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MonthlyExpenditure)
                    .HasColumnName("Monthly_Expenditure")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MonthlyInstallments)
                    .HasColumnName("Monthly_Installments")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MortgagesLb)
                    .HasColumnName("Mortgages_LB")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MotorAssets)
                    .HasColumnName("Motor_Assets")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MotorVehicleType)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NeedAnalysispath).IsUnicode(false);

                entity.Property(e => e.NeedsAgeRetirement)
                    .HasColumnName("Needs_Age_Retirement")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.NeedsMonthlyRetirement)
                    .HasColumnName("Needs_Monthly_Retirement")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.NeedsYearRetirement)
                    .HasColumnName("Needs_Year_Retirement")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.NetAssets).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NotePadPath).IsUnicode(false);

                entity.Property(e => e.OtherAssets).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OtherExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OtherIncome).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OtherLiability).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OtherMonthly)
                    .HasColumnName("Other_Monthly")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.OtherSavings).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.OthersLb)
                    .HasColumnName("Others_LB")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.PlanNoOfYears).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.ProductSelected)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductsSelected)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.ProspectMonthly)
                    .HasColumnName("Prospect_Monthly")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.PurposeOfMeeting)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.RateOfInterest).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Rent).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RtdGsneedsAnnualExpn)
                    .HasColumnName("RtdGSNeeds_AnnualExpn")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.RtdGsneedsAnnualMonthly)
                    .HasColumnName("RtdGSNeeds_AnnualMonthly")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.RtdGsneedsAnnualSavings)
                    .HasColumnName("RtdGSNeeds_AnnualSavings")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.RtdGsneedsCrtLifeStyle)
                    .HasColumnName("RtdGSNeeds_CrtLifeStyle")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.RtdGsneedsExpnAftrRtd)
                    .HasColumnName("RtdGSNeeds_ExpnAftr_Rtd")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.RtdGsneedsExtAssetsRtd)
                    .HasColumnName("RtdGSNeeds_ExtAssets_Rtd")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Salary).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Shares).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpecialEvents).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.SpouseMonthly)
                    .HasColumnName("Spouse_Monthly")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.SurplusExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TimeNextMeeting).HasColumnName("Time_NextMeeting");

                entity.Property(e => e.ToYear).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.TotalAssets)
                    .HasColumnName("Total_Assets")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TotalAssets1)
                    .HasColumnName("TotalAssets")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalIncome).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalLb)
                    .HasColumnName("Total_LB")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TotalLiability).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalMonthly)
                    .HasColumnName("Total_Monthly")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TotalNeedValue).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalReq1).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Transport).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.UploadSignPath).IsUnicode(false);

                entity.Property(e => e.VehExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Vehicle).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WealthReq).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.TblLifeNeedAnalysis)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblLifeNeedAnalysis_tblContacts");
            });

            modelBuilder.Entity<TblLifeQq>(entity =>
            {
                entity.HasKey(e => e.LifeQqid);

                entity.ToTable("tblLifeQQ", "LM");

                entity.Property(e => e.LifeQqid).HasColumnName("LifeQQID");

                entity.Property(e => e.AllocatedFrom)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AnnualPremium)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Cess)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ContactId).HasColumnName("ContactID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Createdby)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.HalfyearlyPremium)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IsAfc)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MaturityBenifits)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModalPremium)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Monthly)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.NeedId).HasColumnName("NeedID");

                entity.Property(e => e.NoOfOnGoingProposalWithAia).HasColumnName("NoOfOnGoingProposalWithAIA");

                entity.Property(e => e.NoOfPreviousPolicyWithAia).HasColumnName("NoOfPreviousPolicyWithAIA");

                entity.Property(e => e.OnGoingProposalWithAia)
                    .HasColumnName("OnGoingProposalWithAIA")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.PlanCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyFee)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyTermId).HasColumnName("PolicyTermID");

                entity.Property(e => e.PreferredLanguage)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PreferredTerm)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PremiumPayingTermId).HasColumnName("PremiumPayingTermID");

                entity.Property(e => e.PreviousPolicyWithAia)
                    .HasColumnName("PreviousPolicyWithAIA")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.ProductNameId).HasColumnName("ProductNameID");

                entity.Property(e => e.ProposerSignPath)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.QqSumAssured)
                    .HasColumnName("QQ_SumAssured")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Qtype)
                    .HasColumnName("QType")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.QuarterlyPremium)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.QuoteNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RefNo)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.RiskCommencementDate).HasColumnType("datetime");

                entity.Property(e => e.Sam).HasColumnName("SAM");

                entity.Property(e => e.SignType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.Property(e => e.SurrenderYear)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Vat)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.WppsignPath)
                    .HasColumnName("WPPSignPath")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Wpsignature).HasColumnName("WPSignature");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.TblLifeQq)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblLifeQQ__ContactID");
            });

            modelBuilder.Entity<TblMasCity>(entity =>
            {
                entity.HasKey(e => e.CityId);

                entity.ToTable("tblMasCity", "LM");

                entity.Property(e => e.CityId)
                    .HasColumnName("CityID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CityCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CityName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.DistrictId).HasColumnName("DistrictID");

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.District)
                    .WithMany(p => p.TblMasCity)
                    .HasForeignKey(d => d.DistrictId)
                    .HasConstraintName("FK_tblMasCity_tblMasDistrict");
            });

            modelBuilder.Entity<TblMasCommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypesId);

                entity.ToTable("tblMasCommonTypes", "LM");

                entity.Property(e => e.CommonTypesId)
                    .HasColumnName("CommonTypesID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EffectiveDate).HasColumnType("datetime");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.MasterType)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ShortDesc)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblMasCountry>(entity =>
            {
                entity.HasKey(e => e.CountryId);

                entity.ToTable("tblMasCountry", "LM");

                entity.Property(e => e.CountryId)
                    .HasColumnName("CountryID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CountryCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CountryName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblMasDistrict>(entity =>
            {
                entity.HasKey(e => e.DistrictId);

                entity.ToTable("tblMasDistrict", "LM");

                entity.Property(e => e.DistrictId)
                    .HasColumnName("DistrictID")
                    .ValueGeneratedNever();

                entity.Property(e => e.DistrictCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DistrictName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.StateId).HasColumnName("StateID");
            });

            modelBuilder.Entity<TblMasLifeOccupations>(entity =>
            {
                entity.ToTable("tblMasLifeOccupations", "LM");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ClassType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EffectiveFromDate).HasColumnType("datetime");

                entity.Property(e => e.EffectiveTodate).HasColumnType("datetime");

                entity.Property(e => e.EmploymentType)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OccupationCode)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Rate).HasColumnType("numeric(18, 4)");

                entity.Property(e => e.SinglishDesc).HasMaxLength(300);

                entity.Property(e => e.SinhalaDesc).HasMaxLength(300);

                entity.Property(e => e.TamilDesc).HasMaxLength(300);

                entity.Property(e => e.TanglishDesc).HasMaxLength(300);
            });

            modelBuilder.Entity<TblMasNeeds>(entity =>
            {
                entity.HasKey(e => e.NeedId)
                    .HasName("PK__tblMasNe__CEDBFBB88071FBBC");

                entity.ToTable("tblMasNeeds", "LM");

                entity.Property(e => e.NeedId)
                    .HasColumnName("NeedID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ImagePath).HasMaxLength(1000);

                entity.Property(e => e.NeedName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SuggestedProductName).IsUnicode(false);
            });

            modelBuilder.Entity<TblMasPinCode>(entity =>
            {
                entity.HasKey(e => e.PincodeId)
                    .HasName("PK_tblMasPincode");

                entity.ToTable("tblMasPinCode", "LM");

                entity.Property(e => e.PincodeId)
                    .HasColumnName("PincodeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AreaName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.TblMasPinCode)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("FK_tblMasPincode_tblMasCity");
            });

            modelBuilder.Entity<TblMasState>(entity =>
            {
                entity.HasKey(e => e.StateId);

                entity.ToTable("tblMasState", "LM");

                entity.Property(e => e.StateId)
                    .HasColumnName("StateID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.StateCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StateName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.TblMasState)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_tblMasState_tblMasCountry");
            });

            modelBuilder.Entity<TblNeedEduForeign>(entity =>
            {
                entity.HasKey(e => e.ForeignId)
                    .HasName("PK__tblNeedE__2528DA0D2640FF7A");

                entity.ToTable("tblNeedEduForeign", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EduCalcId).HasColumnName("EduCalcID");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.EduCalc)
                    .WithMany(p => p.TblNeedEduForeign)
                    .HasForeignKey(d => d.EduCalcId)
                    .HasConstraintName("FK__tblNeedEd__EduCa__49E3F248");
            });

            modelBuilder.Entity<TblNeedEduGceal>(entity =>
            {
                entity.HasKey(e => e.Gcealid)
                    .HasName("PK__tblNeedE__D693560091CCB219");

                entity.ToTable("tblNeedEduGCEAL", "LM");

                entity.Property(e => e.Gcealid).HasColumnName("GCEALId");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EduCalcId).HasColumnName("EduCalcID");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.EduCalc)
                    .WithMany(p => p.TblNeedEduGceal)
                    .HasForeignKey(d => d.EduCalcId)
                    .HasConstraintName("FK__tblNeedEd__EduCa__4707859D");
            });

            modelBuilder.Entity<TblNeedEduHigher>(entity =>
            {
                entity.HasKey(e => e.HigherId)
                    .HasName("PK__tblNeedE__FEDF85E43A45F965");

                entity.ToTable("tblNeedEduHigher", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EduCalcId).HasColumnName("EduCalcID");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.EduCalc)
                    .WithMany(p => p.TblNeedEduHigher)
                    .HasForeignKey(d => d.EduCalcId)
                    .HasConstraintName("FK__tblNeedEd__EduCa__4CC05EF3");
            });

            modelBuilder.Entity<TblNeedEduLocal>(entity =>
            {
                entity.HasKey(e => e.LocalId)
                    .HasName("PK__tblNeedE__499359BB52957202");

                entity.ToTable("tblNeedEduLocal", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EduCalcId).HasColumnName("EduCalcID");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.EduCalc)
                    .WithMany(p => p.TblNeedEduLocal)
                    .HasForeignKey(d => d.EduCalcId)
                    .HasConstraintName("FK__tblNeedEd__EduCa__4F9CCB9E");
            });

            modelBuilder.Entity<TblNeedEducationCalculator>(entity =>
            {
                entity.ToTable("tblNeedEducationCalculator", "LM");

                entity.Property(e => e.AnnualEduExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EduGapTotal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EduMaturityValue).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LumpSum).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MonthlyEduExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblNeedEducationCalculator)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .HasConstraintName("FK__tblNeedEd__NeedA__442B18F2");
            });

            modelBuilder.Entity<TblNeedFinancialNeeds>(entity =>
            {
                entity.HasKey(e => e.FinancialNeedId)
                    .HasName("PK__tblNeedF__258AAE9FFCDD86BE");

                entity.ToTable("tblNeedFinancialNeeds", "LM");

                entity.Property(e => e.FinancialNeedId).HasColumnName("FinancialNeedID");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstimatedAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FundBalance).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Name)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblNeedFinancialNeeds)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .HasConstraintName("FK__tblNeedFi__NeedA__33F4B129");
            });

            modelBuilder.Entity<TblNeedHealthCalculator>(entity =>
            {
                entity.ToTable("tblNeedHealthCalculator", "LM");

                entity.Property(e => e.AddLossFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AddLossGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AddLossReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AdequacyHealthExp)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AnnualAmountHealthExp)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CoverageHealthExp)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CriticalIllenssFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CriticalIllnessGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CriticalillnessReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.HealthAdversities)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.HospFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.HospGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.HospReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.HospRetireExp)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.HospitalBills)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblNeedHealthCalculator)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .HasConstraintName("FK__tblNeedHe__NeedA__414EAC47");
            });

            modelBuilder.Entity<TblNeedHumanValueCalculator>(entity =>
            {
                entity.ToTable("tblNeedHumanValueCalculator", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EmergencyFundReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstIncome).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FutureAvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.IntrestRate).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.MonthlyEarning).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.Property(e => e.NoOfYears).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblNeedHumanValueCalculator)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .HasConstraintName("FK__tblNeedHu__NeedA__70FDBF69");
            });

            modelBuilder.Entity<TblNeedRetirementCalculator>(entity =>
            {
                entity.ToTable("tblNeedRetirementCalculator", "LM");

                entity.Property(e => e.ChildEduFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ChildWeddingFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentCharity).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentClothesExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentEduExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentEntertainmentExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentEpfbalance)
                    .HasColumnName("CurrentEPFBalance")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentEtfbalance)
                    .HasColumnName("CurrentETFBalance")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentFoodExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentGratuityFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentLeaseExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentMedExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentMonthly20Sal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentMonthly3Sal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentMonthlySalary).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentOtherExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentRentExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentTransportExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentWaterExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstAnnualLivExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstCharity).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstClothesExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstEduExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstEntertainmentExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstEpfbalance)
                    .HasColumnName("EstEPFBalance")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstEtfbalance)
                    .HasColumnName("EstETFBalance")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstFoodExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstGratuityFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstLeaseExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstMedExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstMonthlyExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstOtherExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstRentExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstTransportExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstWaterExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ExistingOthIncome).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FundBalance).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LoanFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.Property(e => e.OtherFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PensionGap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PerAnnIncomeIntrest).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalAnnualExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalEstMonthlyExpFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TotalMonthlyExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.VehicleFund).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblNeedRetirementCalculator)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .HasConstraintName("FK__tblNeedRe__NeedA__3E723F9C");
            });

            modelBuilder.Entity<TblNeedSaveCar>(entity =>
            {
                entity.HasKey(e => e.CarId)
                    .HasName("PK__tblNeedS__68A0342E7935FAD2");

                entity.ToTable("tblNeedSaveCar", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.SaveCalcId).HasColumnName("SaveCalcID");

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.SaveCalc)
                    .WithMany(p => p.TblNeedSaveCar)
                    .HasForeignKey(d => d.SaveCalcId)
                    .HasConstraintName("FK__tblNeedSa__SaveC__5CF6C6BC");
            });

            modelBuilder.Entity<TblNeedSaveHouse>(entity =>
            {
                entity.HasKey(e => e.HouseId)
                    .HasName("PK__tblNeedS__085D128F51613083");

                entity.ToTable("tblNeedSaveHouse", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.SaveCalcId).HasColumnName("SaveCalcID");

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.SaveCalc)
                    .WithMany(p => p.TblNeedSaveHouse)
                    .HasForeignKey(d => d.SaveCalcId)
                    .HasConstraintName("FK__tblNeedSa__SaveC__5FD33367");
            });

            modelBuilder.Entity<TblNeedSaveOthers>(entity =>
            {
                entity.HasKey(e => e.OthersId)
                    .HasName("PK__tblNeedS__A5788B1B64E545F5");

                entity.ToTable("tblNeedSaveOthers", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.SaveCalcId).HasColumnName("SaveCalcID");

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.SaveCalc)
                    .WithMany(p => p.TblNeedSaveOthers)
                    .HasForeignKey(d => d.SaveCalcId)
                    .HasConstraintName("FK__tblNeedSa__SaveC__6774552F");
            });

            modelBuilder.Entity<TblNeedSaveTour>(entity =>
            {
                entity.HasKey(e => e.TourId)
                    .HasName("PK__tblNeedS__604CEA30E93DFC19");

                entity.ToTable("tblNeedSaveTour", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.SaveCalcId).HasColumnName("SaveCalcID");

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.SaveCalc)
                    .WithMany(p => p.TblNeedSaveTour)
                    .HasForeignKey(d => d.SaveCalcId)
                    .HasConstraintName("FK__tblNeedSa__SaveC__6B44E613");
            });

            modelBuilder.Entity<TblNeedSaveWedding>(entity =>
            {
                entity.HasKey(e => e.WeddingId)
                    .HasName("PK__tblNeedS__68028BB3432E85EF");

                entity.ToTable("tblNeedSaveWedding", "LM");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrentReq).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Gap).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MaturityAge).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.SaveCalcId).HasColumnName("SaveCalcID");

                entity.Property(e => e.Term).HasColumnType("numeric(12, 0)");

                entity.HasOne(d => d.SaveCalc)
                    .WithMany(p => p.TblNeedSaveWedding)
                    .HasForeignKey(d => d.SaveCalcId)
                    .HasConstraintName("FK__tblNeedSa__SaveC__6E2152BE");
            });

            modelBuilder.Entity<TblNeedSavingCalculator>(entity =>
            {
                entity.ToTable("tblNeedSavingCalculator", "LM");

                entity.Property(e => e.AnnualSavingExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AvailableFund).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrReqTotal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EstAmountTotal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.GapTotal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MonthlySaveExp).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblNeedSavingCalculator)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .HasConstraintName("FK__tblNeedSa__NeedA__52793849");
            });

            modelBuilder.Entity<TblNeeds>(entity =>
            {
                entity.HasKey(e => e.NeedId);

                entity.ToTable("tblNeeds", "LM");

                entity.Property(e => e.NeedId).HasColumnName("NeedID");

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.Property(e => e.NeedName).IsUnicode(false);

                entity.Property(e => e.PlanSuggested).IsUnicode(false);

                entity.Property(e => e.Priority)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.Property(e => e.Value)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblNeeds)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblNeeds_tblNeedAnalysis");
            });

            modelBuilder.Entity<TblNumberingScheme>(entity =>
            {
                entity.HasKey(e => e.NumberingSchemeId)
                    .HasName("Pk_tblNumberingScheme");

                entity.ToTable("tblNumberingScheme", "LM");

                entity.Property(e => e.NumberingSchemeId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Fixedcode)
                    .HasColumnName("fixedcode")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Highestnumber).HasColumnName("highestnumber");

                entity.Property(e => e.Nextnumber).HasColumnName("nextnumber");

                entity.Property(e => e.NumberingType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Rowguid)
                    .HasColumnName("rowguid")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Step).HasColumnName("step");
            });

            modelBuilder.Entity<TblOpportunity>(entity =>
            {
                entity.HasKey(e => e.OppurtunityId);

                entity.ToTable("tblOpportunity", "LM");

                entity.Property(e => e.OppurtunityId).HasColumnName("OppurtunityID");

                entity.Property(e => e.AllocatedFrom)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ContactId).HasColumnName("ContactID");

                entity.Property(e => e.Createdby)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.Property(e => e.StageId).HasColumnName("StageID");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.TblOpportunity)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOpportunity_tblContacts");

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblOpportunity)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .HasConstraintName("fk_NeedAnalysis");
            });

            modelBuilder.Entity<TblOpportunityApproval>(entity =>
            {
                entity.HasKey(e => e.OpportunityApprovalId)
                    .HasName("PK__tblOppor__8CC861BD0C5282BE");

                entity.ToTable("tblOpportunityApproval", "LM");

                entity.Property(e => e.ClientCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ClientName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Createddate).HasColumnType("datetime");

                entity.Property(e => e.Nic)
                    .HasColumnName("NIC")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Stage)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblOpportunityHistory>(entity =>
            {
                entity.HasKey(e => e.OpportunityHistoryId)
                    .HasName("PK__tblOppor__EF6E90A3E101650C");

                entity.ToTable("tblOpportunityHistory", "LM");

                entity.Property(e => e.OpportunityHistoryId).HasColumnName("OpportunityHistoryID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.OpportunityId).HasColumnName("OpportunityID");

                entity.Property(e => e.StageId).HasColumnName("StageID");

                entity.HasOne(d => d.Opportunity)
                    .WithMany(p => p.TblOpportunityHistory)
                    .HasForeignKey(d => d.OpportunityId)
                    .HasConstraintName("FK__tblOpport__Oppor__226010D3");
            });

            modelBuilder.Entity<TblPrevPolicy>(entity =>
            {
                entity.HasKey(e => e.PolicyId)
                    .HasName("PK__tblPrevP__2E1339442F0C6FA4");

                entity.ToTable("tblPrevPolicy", "LM");

                entity.Property(e => e.PolicyId).HasColumnName("PolicyID");

                entity.Property(e => e.MaturityFund).HasColumnType("numeric(12, 0)");

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.Property(e => e.PolicyNumber)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblPrevPolicy)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .HasConstraintName("FK__tblPrevPo__NeedA__73DA2C14");
            });

            modelBuilder.Entity<TblPreviousInsurenceInfo>(entity =>
            {
                entity.HasKey(e => e.PrevInsuranceId)
                    .HasName("PK__tblPreviousInsurenceInfo__DED6FAC5351DDF8C");

                entity.ToTable("tblPreviousInsurenceInfo", "LM");

                entity.Property(e => e.PrevInsuranceId)
                    .HasColumnName("PrevInsuranceID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccidentalBenifit)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CriticalIllnessBenifit)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CurrentStatus)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.HospitalizationPerDay)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NeedAnalysisId).HasColumnName("NeedAnalysisID");

                entity.Property(e => e.PolicyProposalNo)
                    .HasColumnName("Policy/ProposalNo")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalSiatDeath)
                    .HasColumnName("TotalSIAtDeath")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.NeedAnalysis)
                    .WithMany(p => p.TblPreviousInsurenceInfo)
                    .HasForeignKey(d => d.NeedAnalysisId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblPrevio__NeedA__1EF99443");
            });

            modelBuilder.Entity<TblProspect>(entity =>
            {
                entity.HasKey(e => e.ProspectId);

                entity.ToTable("tblProspect", "LM");

                entity.Property(e => e.ProspectId)
                    .HasColumnName("ProspectID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Age).HasColumnType("numeric(10, 0)");

                entity.Property(e => e.AgentCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AgentType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AltMobileNo).HasColumnType("numeric(15, 0)");

                entity.Property(e => e.ApplicationDate).HasColumnType("datetime");

                entity.Property(e => e.ApplicationNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AppointmentDate).HasColumnType("datetime");

                entity.Property(e => e.ApprovalStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CommAddressId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DesignationId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("date");

                entity.Property(e => e.EmailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.GradeId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IndustryExperience).HasColumnType("numeric(9, 2)");

                entity.Property(e => e.InterviewCount).HasColumnType("numeric(15, 0)");

                entity.Property(e => e.InterviewScheduleDate).HasColumnType("date");

                entity.Property(e => e.InterviewScheduleTime).HasColumnType("datetime");

                entity.Property(e => e.IsNicclearnceOver).HasColumnName("isNICClearnceOver");

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MaritalStatus).HasColumnType("numeric(10, 0)");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MobileNo).HasColumnType("numeric(15, 0)");

                entity.Property(e => e.Nationality)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NeedforIncome)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nic)
                    .HasColumnName("NIC")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficePhNo).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OldAgentCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OthersforIncome)
                    .HasColumnName("othersforIncome")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PermAddressId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PositionId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PreviousInsurerName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Profession)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ProspectCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ReceivedFrom)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.RecruitmentType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResidencePhNo).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SalesExperience).HasColumnType("numeric(9, 2)");

                entity.Property(e => e.Sliino)
                    .HasColumnName("SLIINo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SliinoExpiryDate)
                    .HasColumnName("SLIINoExpiryDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.SpecifyProfession)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StatusId).HasColumnType("numeric(15, 0)");

                entity.Property(e => e.SubStatusId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CommAddress)
                    .WithMany(p => p.TblProspectCommAddress)
                    .HasForeignKey(d => d.CommAddressId);

                entity.HasOne(d => d.PermAddress)
                    .WithMany(p => p.TblProspectPermAddress)
                    .HasForeignKey(d => d.PermAddressId);
            });

            modelBuilder.Entity<TblQuoteIllustration>(entity =>
            {
                entity.ToTable("tblQuoteIllustration", "LM");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.InvestmentAcbalance)
                    .HasColumnName("InvestmentACBalance")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.InvestmentAcbalance10)
                    .HasColumnName("InvestmentACBalance10")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.InvestmentAcbalance11)
                    .HasColumnName("InvestmentACBalance11")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.InvestmentAcbalance12)
                    .HasColumnName("InvestmentACBalance12")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.InvestmentAcbalance5)
                    .HasColumnName("InvestmentACBalance5")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.InvestmentAcbalance6)
                    .HasColumnName("InvestmentACBalance6")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.InvestmentAcbalance7)
                    .HasColumnName("InvestmentACBalance7")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.InvestmentAcbalance8)
                    .HasColumnName("InvestmentACBalance8")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.InvestmentAcbalance9)
                    .HasColumnName("InvestmentACBalance9")
                    .HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown10).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown11).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown12).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown4).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown5).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown6).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown7).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown8).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.MonthlyDrawDown9).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.PensionBoosterDiv12).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PensionBoosterDiv4).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PensionBoosterDiv8).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.QuoteNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SurrenderValue12).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.SurrenderValue4).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.SurrenderValue8).HasColumnType("numeric(18, 5)");

                entity.Property(e => e.UnAllocatedPremium).HasColumnType("numeric(18, 5)");
            });

            modelBuilder.Entity<TblQuoteMemberBeniftDetials>(entity =>
            {
                entity.HasKey(e => e.MemberBenifitId)
                    .HasName("PK_tblQuoteMemberbenifit");

                entity.ToTable("tblQuoteMemberBeniftDetials", "LM");

                entity.Property(e => e.MemberBenifitId).HasColumnName("MemberBenifitID");

                entity.Property(e => e.ActualPremium).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AnnualDiscountAmount).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.AnnualLoadingAmount).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.AnnualModePremium).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.AnnualRiderPremium).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.BenifitId).HasColumnName("BenifitID");

                entity.Property(e => e.DiscountAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LoadingAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MemberId).HasColumnName("MemberID");

                entity.Property(e => e.Premium)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.SumInsured)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblQuoteMemberBeniftDetials)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblQuoteM__Membe__59E54FE7");
            });

            modelBuilder.Entity<TblQuoteMemberDetials>(entity =>
            {
                entity.HasKey(e => e.MemberId)
                    .HasName("PK_tblQuoteMembers");

                entity.ToTable("tblQuoteMemberDetials", "LM");

                entity.Property(e => e.MemberId).HasColumnName("MemberID");

                entity.Property(e => e.AssuredName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BasicPremium)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.LifeQqid).HasColumnName("LifeQQID");

                entity.Property(e => e.MemberPremium)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Nicno)
                    .HasColumnName("NICNO")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OccupationId).HasColumnName("OccupationID");

                entity.Property(e => e.Relationship)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.LifeQq)
                    .WithMany(p => p.TblQuoteMemberDetials)
                    .HasForeignKey(d => d.LifeQqid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblQuoteM__LifeQ__5BCD9859");
            });

            modelBuilder.Entity<TblSuspect>(entity =>
            {
                entity.HasKey(e => e.SuspectId);

                entity.ToTable("tblSuspect", "LM");

                entity.Property(e => e.SuspectId)
                    .HasColumnName("SuspectID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EmailId)
                    .HasColumnName("EmailID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MobileNo).HasColumnType("numeric(15, 0)");

                entity.Property(e => e.ProspectId)
                    .HasColumnName("ProspectID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Status).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SuspectCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Prospect)
                    .WithMany(p => p.TblSuspect)
                    .HasForeignKey(d => d.ProspectId)
                    .HasConstraintName("FK_tblSuspects_tblProspect_ProspectID");
            });

            modelBuilder.Entity<TblTopupDetails>(entity =>
            {
                entity.ToTable("tblTopupDetails", "LM");

                entity.Property(e => e.Amount)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.LifeQqid).HasColumnName("LifeQQID");

                entity.Property(e => e.TopupPolicyYear)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.LifeQq)
                    .WithMany(p => p.TblTopupDetails)
                    .HasForeignKey(d => d.LifeQqid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblTopupD__LifeQ__5CC1BC92");
            });

            modelBuilder.Entity<TblmasLdcommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId);

                entity.ToTable("tblmasLDCommonTypes", "LM");

                entity.Property(e => e.CommonTypeId)
                    .HasColumnName("CommonTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(200);
            });
        }
    }
}
