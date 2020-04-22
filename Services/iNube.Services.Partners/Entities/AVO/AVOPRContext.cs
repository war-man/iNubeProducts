using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class AVOPRContext : DbContext
    {
        public AVOPRContext()
        {
        }

        public AVOPRContext(DbContextOptions<AVOPRContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAllocationRate> TblAllocationRate { get; set; }
        public virtual DbSet<TblDiscountLoadingChart> TblDiscountLoadingChart { get; set; }
        public virtual DbSet<TblMasCity> TblMasCity { get; set; }
        public virtual DbSet<TblMasCommonTypes> TblMasCommonTypes { get; set; }
        public virtual DbSet<TblMasCountry> TblMasCountry { get; set; }
        public virtual DbSet<TblMasDataType> TblMasDataType { get; set; }
        public virtual DbSet<TblMasDistrict> TblMasDistrict { get; set; }
        public virtual DbSet<TblMasParameters> TblMasParameters { get; set; }
        public virtual DbSet<TblMasPinCode> TblMasPinCode { get; set; }
        public virtual DbSet<TblMasPlan> TblMasPlan { get; set; }
        public virtual DbSet<TblMasState> TblMasState { get; set; }
        public virtual DbSet<TblMovements> TblMovements { get; set; }
        public virtual DbSet<TblOfficeSpocDetails> TblOfficeSpocDetails { get; set; }
        public virtual DbSet<TblOrgAddress> TblOrgAddress { get; set; }
        public virtual DbSet<TblOrgEmpAddress> TblOrgEmpAddress { get; set; }
        public virtual DbSet<TblOrgEmpEducation> TblOrgEmpEducation { get; set; }
        public virtual DbSet<TblOrgEmployee> TblOrgEmployee { get; set; }
        public virtual DbSet<TblOrgOffice> TblOrgOffice { get; set; }
        public virtual DbSet<TblOrgOfficeHistory> TblOrgOfficeHistory { get; set; }
        public virtual DbSet<TblOrgOfficeMapping> TblOrgOfficeMapping { get; set; }
        public virtual DbSet<TblOrgPositionRoleMapping> TblOrgPositionRoleMapping { get; set; }
        public virtual DbSet<TblOrgPositions> TblOrgPositions { get; set; }
        public virtual DbSet<TblOrgSpocDetails> TblOrgSpocDetails { get; set; }
        public virtual DbSet<TblOrgStructure> TblOrgStructure { get; set; }
        public virtual DbSet<TblOrgUserPositionMapping> TblOrgUserPositionMapping { get; set; }
        public virtual DbSet<TblOrganization> TblOrganization { get; set; }
        public virtual DbSet<TblProductAllocationRate> TblProductAllocationRate { get; set; }
        public virtual DbSet<TblProductAssumptionMap> TblProductAssumptionMap { get; set; }
        public virtual DbSet<TblProductPlan> TblProductPlan { get; set; }
        public virtual DbSet<TblProductPlanRiderDiscountLoadingMap> TblProductPlanRiderDiscountLoadingMap { get; set; }
        public virtual DbSet<TblProductPlanRiderOccupationChart> TblProductPlanRiderOccupationChart { get; set; }
        public virtual DbSet<TblProductPlanRiderParameters> TblProductPlanRiderParameters { get; set; }
        public virtual DbSet<TblProductPlanRiders> TblProductPlanRiders { get; set; }
        public virtual DbSet<TblProductPolicyTerm> TblProductPolicyTerm { get; set; }
        public virtual DbSet<TblProductRiderRateParameters> TblProductRiderRateParameters { get; set; }
        public virtual DbSet<TblProductRiders> TblProductRiders { get; set; }
        public virtual DbSet<TblProductSam> TblProductSam { get; set; }
        public virtual DbSet<TblProducts> TblProducts { get; set; }
        public virtual DbSet<TblRiderRate> TblRiderRate { get; set; }
        public virtual DbSet<TblRiderRateChart> TblRiderRateChart { get; set; }
        public virtual DbSet<TblRiders> TblRiders { get; set; }
        public virtual DbSet<TblmasPrcommonTypes> TblmasPrcommonTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=AVOLifeP2;User ID=AVOLifeUserP2;Password=AVOLife*User123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<TblAllocationRate>(entity =>
            {
                entity.HasKey(e => e.AllocationRateId)
                    .HasName("pk_tblAllocationRate");

                entity.ToTable("tblAllocationRate", "PR");

                entity.Property(e => e.Product)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblDiscountLoadingChart>(entity =>
            {
                entity.HasKey(e => e.DiscountLoadingChartId)
                    .HasName("pk_tblDiscountLoadingChart");

                entity.ToTable("tblDiscountLoadingChart", "PR");

                entity.Property(e => e.ChartCode)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.SumAssureFrom).HasColumnType("numeric(20, 8)");

                entity.Property(e => e.SumAssuredTo).HasColumnType("numeric(20, 8)");

                entity.Property(e => e.Value).HasColumnType("numeric(18, 6)");
            });

            modelBuilder.Entity<TblMasCity>(entity =>
            {
                entity.HasKey(e => e.CityId);

                entity.ToTable("tblMasCity", "PR");

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

                entity.ToTable("tblMasCommonTypes", "PR");

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

                entity.ToTable("tblMasCountry", "PR");

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

            modelBuilder.Entity<TblMasDataType>(entity =>
            {
                entity.HasKey(e => e.DataTypeId)
                    .HasName("pk_tblMasDataType");

                entity.ToTable("tblMasDataType", "PR");

                entity.Property(e => e.DataTypeId).ValueGeneratedNever();

                entity.Property(e => e.DataTypeName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblMasDistrict>(entity =>
            {
                entity.HasKey(e => e.DistrictId);

                entity.ToTable("tblMasDistrict", "PR");

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

                entity.HasOne(d => d.State)
                    .WithMany(p => p.TblMasDistrict)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK_tblMasDistrict_tblMasState");
            });

            modelBuilder.Entity<TblMasParameters>(entity =>
            {
                entity.HasKey(e => e.ParameterId)
                    .HasName("pk_tblMasParameters");

                entity.ToTable("tblMasParameters", "PR");

                entity.Property(e => e.ParameterId).ValueGeneratedNever();

                entity.Property(e => e.ParameterDescription)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ParameterMaster)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ParameterName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ParameterType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ParameterDataType)
                    .WithMany(p => p.TblMasParameters)
                    .HasForeignKey(d => d.ParameterDataTypeId)
                    .HasConstraintName("fk_tblMasParameter_tblMasDataType_ParameterDataTypeId");
            });

            modelBuilder.Entity<TblMasPinCode>(entity =>
            {
                entity.HasKey(e => e.PincodeId)
                    .HasName("PK_tblMasPincode");

                entity.ToTable("tblMasPinCode", "PR");

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

            modelBuilder.Entity<TblMasPlan>(entity =>
            {
                entity.HasKey(e => e.PlanId);

                entity.ToTable("tblMasPlan", "PR");

                entity.Property(e => e.PlanId)
                    .HasColumnName("PlanID")
                    .ValueGeneratedNever();

                entity.Property(e => e.IsUcobank).HasColumnName("IsUCOBank");

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.Property(e => e.PlanDetails)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.PlanName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblMasState>(entity =>
            {
                entity.HasKey(e => e.StateId);

                entity.ToTable("tblMasState", "PR");

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

            modelBuilder.Entity<TblMovements>(entity =>
            {
                entity.HasKey(e => e.MovementId);

                entity.ToTable("tblMovements", "PR");

                entity.Property(e => e.MovementId)
                    .HasColumnName("MovementID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CurrentPositionId)
                    .HasColumnName("CurrentPositionID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.MovementStatusId)
                    .HasColumnName("MovementStatusID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MovementTypeId).HasColumnName("MovementTypeID");

                entity.Property(e => e.NewPositionId)
                    .HasColumnName("NewPositionID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OrgEmpId)
                    .HasColumnName("OrgEmpID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RecommendedByid)
                    .HasColumnName("RecommendedBYID")
                    .HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<TblOfficeSpocDetails>(entity =>
            {
                entity.HasKey(e => e.OfficeSpocid);

                entity.ToTable("tblOfficeSpocDetails", "PR");

                entity.Property(e => e.OfficeSpocid)
                    .HasColumnName("OfficeSPOCID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.OfficeId)
                    .HasColumnName("OfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpocaddressLine1)
                    .HasColumnName("SPOCAddressLine1")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine2)
                    .HasColumnName("SPOCAddressLine2")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine3)
                    .HasColumnName("SPOCAddressLine3")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpoccityId).HasColumnName("SPOCCityId");

                entity.Property(e => e.SpoccountryId).HasColumnName("SPOCCountryId");

                entity.Property(e => e.Spocdesignation)
                    .HasColumnName("SPOCDesignation")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocdistrictId).HasColumnName("SPOCDistrictId");

                entity.Property(e => e.SpocemailId)
                    .HasColumnName("SPOCEmailId")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Spocmobileno)
                    .HasColumnName("SPOCMobileno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Spocname)
                    .HasColumnName("SPOCName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocpincodeId).HasColumnName("SPOCPincodeId");

                entity.Property(e => e.SpocstateId).HasColumnName("SPOCStateId");

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.OfficeId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblOrgOffice");

                entity.HasOne(d => d.Spoccity)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpoccityId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasCity");

                entity.HasOne(d => d.Spoccountry)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpoccountryId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasCountry");

                entity.HasOne(d => d.Spocdistrict)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpocdistrictId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasDistrict");

                entity.HasOne(d => d.Spocpincode)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpocpincodeId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasPinCode");

                entity.HasOne(d => d.Spocstate)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpocstateId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasState");
            });

            modelBuilder.Entity<TblOrgAddress>(entity =>
            {
                entity.HasKey(e => e.OrgAddressId);

                entity.ToTable("tblOrgAddress", "PR");

                entity.Property(e => e.OrgAddressId)
                    .HasColumnName("OrgAddressID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.OrgAddressLine1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgAddressLine2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgAddressLine3)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgAddressType)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.OrgCity)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgCityId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasCity");

                entity.HasOne(d => d.OrgCountry)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgCountryId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasCountry");

                entity.HasOne(d => d.OrgDistrict)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgDistrictId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasDistrict");

                entity.HasOne(d => d.OrgPincode)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgPincodeId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasPinCode");

                entity.HasOne(d => d.OrgState)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgStateId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasState");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_tblOrgAddress_tblOrganization");
            });

            modelBuilder.Entity<TblOrgEmpAddress>(entity =>
            {
                entity.HasKey(e => e.EmpAddressId);

                entity.ToTable("tblOrgEmpAddress", "PR");

                entity.Property(e => e.EmpAddressId)
                    .HasColumnName("EmpAddressID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.EmpAddressLine1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.EmpAddressLine2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.EmpAddressLine3)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.EmpAddressType)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.OrgEmpId)
                    .HasColumnName("OrgEmpID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.EmpCity)
                    .WithMany(p => p.TblOrgEmpAddress)
                    .HasForeignKey(d => d.EmpCityId)
                    .HasConstraintName("FK_tblOrgEmpAddress_tblMasCity");

                entity.HasOne(d => d.EmpCountry)
                    .WithMany(p => p.TblOrgEmpAddress)
                    .HasForeignKey(d => d.EmpCountryId)
                    .HasConstraintName("FK_tblOrgEmpAddress_tblMasCountry");

                entity.HasOne(d => d.EmpDistrict)
                    .WithMany(p => p.TblOrgEmpAddress)
                    .HasForeignKey(d => d.EmpDistrictId)
                    .HasConstraintName("FK_tblOrgEmpAddress_tblMasDistrict");

                entity.HasOne(d => d.EmpPincode)
                    .WithMany(p => p.TblOrgEmpAddress)
                    .HasForeignKey(d => d.EmpPincodeId)
                    .HasConstraintName("FK_tblOrgEmpAddress_tblMasPinCode");

                entity.HasOne(d => d.EmpState)
                    .WithMany(p => p.TblOrgEmpAddress)
                    .HasForeignKey(d => d.EmpStateId)
                    .HasConstraintName("FK_tblOrgEmpAddress_tblMasState");

                entity.HasOne(d => d.OrgEmp)
                    .WithMany(p => p.TblOrgEmpAddress)
                    .HasForeignKey(d => d.OrgEmpId)
                    .HasConstraintName("FK_tblOrgEmpAddress_tblOrgEmployee");
            });

            modelBuilder.Entity<TblOrgEmpEducation>(entity =>
            {
                entity.HasKey(e => e.EmpEducationId);

                entity.ToTable("tblOrgEmpEducation", "PR");

                entity.Property(e => e.EmpEducationId)
                    .HasColumnName("EmpEducationID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Certification)
                    .HasMaxLength(450)
                    .IsUnicode(false);

                entity.Property(e => e.GradeOrPercentage)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OrgEmpId)
                    .HasColumnName("OrgEmpID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Year)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.OrgEmp)
                    .WithMany(p => p.TblOrgEmpEducation)
                    .HasForeignKey(d => d.OrgEmpId)
                    .HasConstraintName("FK_tblOrgEmpEducation_tblOrgEmployee");
            });

            modelBuilder.Entity<TblOrgEmployee>(entity =>
            {
                entity.HasKey(e => e.OrgEmpId);

                entity.ToTable("tblOrgEmployee", "PR");

                entity.HasIndex(e => e.StaffCode)
                    .HasName("IX_tblOrgEmployee")
                    .IsUnique();

                entity.Property(e => e.OrgEmpId)
                    .HasColumnName("OrgEmpID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountNumber).HasMaxLength(50);

                entity.Property(e => e.AppointmentDate).HasColumnType("datetime");

                entity.Property(e => e.BankName).HasMaxLength(50);

                entity.Property(e => e.BranchName).HasMaxLength(50);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DateOfJoining).HasColumnType("datetime");

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .HasColumnName("EMail")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.Function)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Imdcode)
                    .HasColumnName("IMDCode")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.MiddleName).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber1).HasMaxLength(20);

                entity.Property(e => e.PositionId)
                    .HasColumnName("PositionID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Smcode)
                    .HasColumnName("SMCode")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StaffCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StaffName)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.StaffStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StaffTypeId)
                    .HasColumnName("StaffTypeID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Position)
                    .WithMany(p => p.TblOrgEmployee)
                    .HasForeignKey(d => d.PositionId)
                    .HasConstraintName("FK_tblOrgEmployee_tblOrgPositions");
            });

            modelBuilder.Entity<TblOrgOffice>(entity =>
            {
                entity.HasKey(e => e.OrgOfficeId);

                entity.ToTable("tblOrgOffice", "PR");

                entity.Property(e => e.OrgOfficeId)
                    .HasColumnName("OrgOfficeID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OfficeAddressLine1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeAddressLine2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeAddressLine3)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeFaxNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeLevelId).HasColumnName("OfficeLevelID");

                entity.Property(e => e.OfficeName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficePhoneNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeReportingOfficeId)
                    .HasColumnName("OfficeReportingOfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.OfficeCity)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficeCityId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasCity");

                entity.HasOne(d => d.OfficeCountry)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficeCountryId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasCountry");

                entity.HasOne(d => d.OfficeDistrict)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficeDistrictId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasDistrict");

                entity.HasOne(d => d.OfficePincode)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficePincodeId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasPinCode");

                entity.HasOne(d => d.OfficeReportingOffice)
                    .WithMany(p => p.InverseOfficeReportingOffice)
                    .HasForeignKey(d => d.OfficeReportingOfficeId)
                    .HasConstraintName("FK_tblOrgOffice_tblOrgOffice");

                entity.HasOne(d => d.OfficeState)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficeStateId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasState");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_tblOrgOffice_tblOrganization");
            });

            modelBuilder.Entity<TblOrgOfficeHistory>(entity =>
            {
                entity.HasKey(e => e.OrgOfficeHistoryId)
                    .HasName("PK__tblOrgOf__D72FDB1020D7BB14");

                entity.ToTable("tblOrgOfficeHistory", "PR");

                entity.Property(e => e.OrgOfficeHistoryId)
                    .HasColumnName("OrgOfficeHistoryID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ChangeTypeId).HasColumnName("ChangeTypeID");

                entity.Property(e => e.ChangedOfficeCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.EffectiveFrom).HasColumnType("datetime");

                entity.Property(e => e.EffectiveTill).HasColumnType("datetime");

                entity.Property(e => e.OfficeCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgOfficeId)
                    .HasColumnName("OrgOfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.UserName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblOrgOfficeMapping>(entity =>
            {
                entity.HasKey(e => e.OrgOfficeMappingId)
                    .HasName("PK__tblOrgOf__3E77AD630B668BB2");

                entity.ToTable("tblOrgOfficeMapping", "PR");

                entity.Property(e => e.OrgOfficeMappingId)
                    .HasColumnName("OrgOfficeMappingID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.EffectiveFrom).HasColumnType("datetime");

                entity.Property(e => e.EffectiveTo)
                    .HasColumnName("EffectiveTO")
                    .HasColumnType("datetime");

                entity.Property(e => e.PrimaryOfficeId)
                    .HasColumnName("PrimaryOfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ReportingOfficeId)
                    .HasColumnName("ReportingOfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.UserName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.PrimaryOffice)
                    .WithMany(p => p.TblOrgOfficeMappingPrimaryOffice)
                    .HasForeignKey(d => d.PrimaryOfficeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrgOfficeMapping_tblOrgOffice");

                entity.HasOne(d => d.ReportingOffice)
                    .WithMany(p => p.TblOrgOfficeMappingReportingOffice)
                    .HasForeignKey(d => d.ReportingOfficeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrgOfficeMapping_tblOrgOffice1");
            });

            modelBuilder.Entity<TblOrgPositionRoleMapping>(entity =>
            {
                entity.HasKey(e => e.PositionRoleMappingId);

                entity.ToTable("tblOrgPositionRoleMapping", "PR");

                entity.Property(e => e.PositionRoleMappingId)
                    .HasColumnName("PositionRoleMappingID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.PositionId).HasColumnName("PositionID");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<TblOrgPositions>(entity =>
            {
                entity.HasKey(e => e.PositionId);

                entity.ToTable("tblOrgPositions", "PR");

                entity.Property(e => e.PositionId)
                    .HasColumnName("PositionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DesignationId)
                    .HasColumnName("DesignationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OfficeId)
                    .HasColumnName("OfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ParentId)
                    .HasColumnName("ParentID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ParentLineId)
                    .HasColumnName("ParentLineID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PositionName)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.RepOfficeId)
                    .HasColumnName("RepOfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RepOrgId)
                    .HasColumnName("RepOrgID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ReportingId)
                    .HasColumnName("ReportingID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ReportingLineId)
                    .HasColumnName("ReportingLineID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Designation)
                    .WithMany(p => p.TblOrgPositions)
                    .HasForeignKey(d => d.DesignationId)
                    .HasConstraintName("FK_tblOrgPositions_tblOrgStructure");

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.TblOrgPositionsOffice)
                    .HasForeignKey(d => d.OfficeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrgPositions_tblOrgOffice");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblOrgPositionsOrganization)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_tblOrgPositions_tblOrganization");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK_tblOrgPositions_tblOrgPositions1");

                entity.HasOne(d => d.ParentLine)
                    .WithMany(p => p.InverseParentLine)
                    .HasForeignKey(d => d.ParentLineId)
                    .HasConstraintName("FK_tblOrgPositions_tblOrgPositions");

                entity.HasOne(d => d.RepOffice)
                    .WithMany(p => p.TblOrgPositionsRepOffice)
                    .HasForeignKey(d => d.RepOfficeId)
                    .HasConstraintName("FK_tblOrgPositions_tblOrgOffice1");

                entity.HasOne(d => d.RepOrg)
                    .WithMany(p => p.TblOrgPositionsRepOrg)
                    .HasForeignKey(d => d.RepOrgId)
                    .HasConstraintName("FK_tblOrgPositions_tblOrganization1");

                entity.HasOne(d => d.Reporting)
                    .WithMany(p => p.InverseReporting)
                    .HasForeignKey(d => d.ReportingId)
                    .HasConstraintName("FK_tblOrgPositions_tblOrgPositions2");

                entity.HasOne(d => d.ReportingLine)
                    .WithMany(p => p.InverseReportingLine)
                    .HasForeignKey(d => d.ReportingLineId)
                    .HasConstraintName("FK_tblOrgPositions_tblOrgPositions3");
            });

            modelBuilder.Entity<TblOrgSpocDetails>(entity =>
            {
                entity.HasKey(e => e.OrgSpocId)
                    .HasName("PK_tblSpocDetails");

                entity.ToTable("tblOrgSpocDetails", "PR");

                entity.Property(e => e.OrgSpocId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.LandLineOffice)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LandLineResidence)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpocBranchName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocLastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocMiddleName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocUserName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine1)
                    .HasColumnName("SPOCAddressLine1")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine2)
                    .HasColumnName("SPOCAddressLine2")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine3)
                    .HasColumnName("SPOCAddressLine3")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpoccityId).HasColumnName("SPOCCityId");

                entity.Property(e => e.SpoccountryId).HasColumnName("SPOCCountryId");

                entity.Property(e => e.Spocdesignation)
                    .HasColumnName("SPOCDesignation")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocdistrictId).HasColumnName("SPOCDistrictId");

                entity.Property(e => e.Spocdob)
                    .HasColumnName("SPOCDOB")
                    .HasColumnType("date");

                entity.Property(e => e.Spocdoj)
                    .HasColumnName("SPOCDOJ")
                    .HasColumnType("date");

                entity.Property(e => e.SpocemailId)
                    .HasColumnName("SPOCEmailId")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocfirstName)
                    .HasColumnName("SPOCFirstName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Spocmobileno)
                    .HasColumnName("SPOCMobileno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocpanNo)
                    .HasColumnName("SPOCPanNo")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.SpocpincodeId).HasColumnName("SPOCPincodeId");

                entity.Property(e => e.SpocstateId).HasColumnName("SPOCStateId");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblOrganization");

                entity.HasOne(d => d.Spoccity)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpoccityId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasCity");

                entity.HasOne(d => d.Spoccountry)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpoccountryId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasCountry");

                entity.HasOne(d => d.Spocdistrict)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpocdistrictId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasDistrict");

                entity.HasOne(d => d.Spocpincode)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpocpincodeId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasPinCode");

                entity.HasOne(d => d.Spocstate)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpocstateId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasState");
            });

            modelBuilder.Entity<TblOrgStructure>(entity =>
            {
                entity.HasKey(e => e.OrgStructureId)
                    .HasName("PK__tblOrgSt__D2E7C87E3BEAD8AC");

                entity.ToTable("tblOrgStructure", "PR");

                entity.Property(e => e.OrgStructureId)
                    .HasColumnName("OrgStructureID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.LevelDefinition)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ParentId)
                    .HasColumnName("ParentID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RepotrsToId).HasColumnName("RepotrsToID");

                entity.Property(e => e.StructureTypeId).HasColumnName("StructureTypeID");

                entity.Property(e => e.UserName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblOrgStructure)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_tblOrgStructure_tblOrganization");
            });

            modelBuilder.Entity<TblOrgUserPositionMapping>(entity =>
            {
                entity.HasKey(e => e.UserPositionMappingId);

                entity.ToTable("tblOrgUserPositionMapping", "PR");

                entity.Property(e => e.UserPositionMappingId).HasColumnName("UserPositionMappingID");

                entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.CreatedUserId).HasColumnName("CreatedUserID");

                entity.Property(e => e.MappingUserId).HasColumnName("MappingUserID");

                entity.Property(e => e.PositionId).HasColumnName("PositionID");
            });

            modelBuilder.Entity<TblOrganization>(entity =>
            {
                entity.HasKey(e => e.OrganizationId);

                entity.ToTable("tblOrganization", "PR");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ConfigurationTypeId).HasColumnName("ConfigurationTypeID");

                entity.Property(e => e.CorpAddressSameAs)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MailingAddressSameAs)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OrgCategoryId).HasColumnName("OrgCategoryID");

                entity.Property(e => e.OrgFaxNo)
                    .HasColumnName("OrgFaxNO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OrgPanno)
                    .HasColumnName("OrgPANno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgPhoneNo)
                    .HasColumnName("OrgPhoneNO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgRegisteringAuthority)
                    .HasColumnName("Org_RegisteringAuthority")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgRegistrationDate).HasColumnType("datetime");

                entity.Property(e => e.OrgRegistrationNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgServiceTaxRegistrationNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgTanno)
                    .HasColumnName("OrgTANno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgTypeId).HasColumnName("OrgTypeID");

                entity.Property(e => e.OrgWebsite)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ParentId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.ConfigurationType)
                    .WithMany(p => p.TblOrganizationConfigurationType)
                    .HasForeignKey(d => d.ConfigurationTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrganization_tblmasPRCommonTypes_Config");

                entity.HasOne(d => d.OrgCategory)
                    .WithMany(p => p.TblOrganizationOrgCategory)
                    .HasForeignKey(d => d.OrgCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrganization_tblmasPRCommonTypes");

                entity.HasOne(d => d.OrgType)
                    .WithMany(p => p.TblOrganizationOrgType)
                    .HasForeignKey(d => d.OrgTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrganization_tblmasPRCommonTypes_TypeID");
            });

            modelBuilder.Entity<TblProductAllocationRate>(entity =>
            {
                entity.HasKey(e => e.AllocationRateId)
                    .HasName("pk_tblProductAllocationRate");

                entity.ToTable("tblProductAllocationRate", "PR");

                entity.Property(e => e.Product)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblProductAssumptionMap>(entity =>
            {
                entity.HasKey(e => e.ProductAssumptionMapId)
                    .HasName("pk_tblProductAssumptionMap");

                entity.ToTable("tblProductAssumptionMap", "PR");

                entity.Property(e => e.ProductAssumptionMapId).ValueGeneratedNever();

                entity.Property(e => e.Frequency).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Value).HasColumnType("numeric(18, 14)");
            });

            modelBuilder.Entity<TblProductPlan>(entity =>
            {
                entity.HasKey(e => e.PlanId)
                    .HasName("pk_tblProductPlan");

                entity.ToTable("tblProductPlan", "PR");

                entity.Property(e => e.PlanId).ValueGeneratedNever();

                entity.Property(e => e.PlanCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.PlanDescriprion)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.RefPlanCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductPlan)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("fk_tblProductPlan_tblProducts");
            });

            modelBuilder.Entity<TblProductPlanRiderDiscountLoadingMap>(entity =>
            {
                entity.HasKey(e => e.ProductPlanRiderDiscountLoadingMapId)
                    .HasName("pk_tblProductPlanRiderRateChartMap");

                entity.ToTable("tblProductPlanRiderDiscountLoadingMap", "PR");

                entity.Property(e => e.ChartCode)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ChartType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.RateType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Rider)
                    .WithMany(p => p.TblProductPlanRiderDiscountLoadingMap)
                    .HasForeignKey(d => d.RiderId)
                    .HasConstraintName("fk_tblProductPlanRiderDiscountLoadingMap_tblProductRiders_RiderId");
            });

            modelBuilder.Entity<TblProductPlanRiderOccupationChart>(entity =>
            {
                entity.HasKey(e => e.ProductPlanRiderOccupationChartId)
                    .HasName("pk_tblProductPlanRiderOccupationChart");

                entity.ToTable("tblProductPlanRiderOccupationChart", "PR");

                entity.Property(e => e.OccupationId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Type)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Value).HasColumnType("numeric(18, 5)");
            });

            modelBuilder.Entity<TblProductPlanRiderParameters>(entity =>
            {
                entity.HasKey(e => e.PlanRiderParameterId)
                    .HasName("pk_tblProductPlanRiderParameter");

                entity.ToTable("tblProductPlanRiderParameters", "PR");

                entity.Property(e => e.PlanRiderParameterId).ValueGeneratedNever();

                entity.Property(e => e.ApplyOn)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ApplyOnTo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ListValue)
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.MaxRateType).HasMaxLength(10);

                entity.Property(e => e.MaxVal)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MinRateType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MinVal)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumericValueFrom).HasColumnType("numeric(18, 3)");

                entity.Property(e => e.NumericValueTo).HasColumnType("numeric(18, 3)");

                entity.Property(e => e.StringValueFrom)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.StringValueTo)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.HasOne(d => d.Parameter)
                    .WithMany(p => p.TblProductPlanRiderParameters)
                    .HasForeignKey(d => d.ParameterId)
                    .HasConstraintName("fk_tblProductPlanRiderParameters_tblMasParameters_ParameterId");

                entity.HasOne(d => d.ProductPlanRider)
                    .WithMany(p => p.TblProductPlanRiderParameters)
                    .HasForeignKey(d => d.ProductPlanRiderId)
                    .HasConstraintName("fk_tblProductPlanRiderParameters_tblProductPlanRider_ProductPlanRiderId");
            });

            modelBuilder.Entity<TblProductPlanRiders>(entity =>
            {
                entity.HasKey(e => e.ProductPlanRiderId)
                    .HasName("pk_tblProductPlanRider");

                entity.ToTable("tblProductPlanRiders", "PR");

                entity.Property(e => e.ProductPlanRiderId).ValueGeneratedNever();

                entity.Property(e => e.CalType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.EffectiveFrom).HasColumnType("date");

                entity.Property(e => e.EffectiveTo).HasColumnType("date");

                entity.Property(e => e.IllustrationChart)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.MaxSumAssured).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MinSumAssured).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RateCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.RateType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.RefOldRiderCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RefRiderCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RelationId).HasColumnName("RelationID");

                entity.Property(e => e.ReportDisplayName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductPlanRiders)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("fk_tblProductPlanRider_tblProduct_ProductId");

                entity.HasOne(d => d.Rider)
                    .WithMany(p => p.TblProductPlanRiders)
                    .HasForeignKey(d => d.RiderId)
                    .HasConstraintName("fk_tblPrductPlanRiders_tblRider_RiderId");
            });

            modelBuilder.Entity<TblProductPolicyTerm>(entity =>
            {
                entity.HasKey(e => e.PolicyTermId)
                    .HasName("pk_PolicyTermID");

                entity.ToTable("tblProductPolicyTerm", "PR");

                entity.Property(e => e.PolicyTermId)
                    .HasColumnName("PolicyTermID")
                    .ValueGeneratedNever();

                entity.Property(e => e.PlanId).HasColumnName("PlanID");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.TblProductPolicyTerm)
                    .HasForeignKey(d => d.PlanId)
                    .HasConstraintName("fk_tblProductPolicyTermtblProductPlan");
            });

            modelBuilder.Entity<TblProductRiderRateParameters>(entity =>
            {
                entity.HasKey(e => e.ProductRiderRateParameterId)
                    .HasName("pk_tblProductRiderRateParameters");

                entity.ToTable("tblProductRiderRateParameters", "PR");

                entity.Property(e => e.RelationShip)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Samfactor)
                    .HasColumnName("SAMFactor")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Value).HasColumnType("numeric(18, 10)");
            });

            modelBuilder.Entity<TblProductRiders>(entity =>
            {
                entity.HasKey(e => e.ProductRiderId)
                    .HasName("pk_tblProductRiderMap");

                entity.ToTable("tblProductRiders", "PR");

                entity.Property(e => e.ProductRiderId).ValueGeneratedNever();

                entity.Property(e => e.EffectiveFrom).HasColumnType("date");

                entity.Property(e => e.EffectiveTo).HasColumnType("date");

                entity.Property(e => e.RelationId).HasColumnName("RelationID");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductRiders)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("fk_tblProductRiderMap_tblProduct_ProductId");

                entity.HasOne(d => d.Rider)
                    .WithMany(p => p.TblProductRiders)
                    .HasForeignKey(d => d.RiderId)
                    .HasConstraintName("fk_tblPrductRiderMap_tblRider_RiderId");
            });

            modelBuilder.Entity<TblProductSam>(entity =>
            {
                entity.HasKey(e => e.SamId)
                    .HasName("pk_SamID");

                entity.ToTable("tblProductSAM", "PR");

                entity.Property(e => e.SamId).HasColumnName("SamID");

                entity.Property(e => e.MinSam).HasColumnName("MinSAM");

                entity.Property(e => e.MixSam).HasColumnName("MixSAM");
            });

            modelBuilder.Entity<TblProducts>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("pk_tblProducts");

                entity.ToTable("tblProducts", "PR");

                entity.Property(e => e.ProductId).ValueGeneratedNever();

                entity.Property(e => e.EffectiveFrom).HasColumnType("date");

                entity.Property(e => e.EffectiveTo).HasColumnType("date");

                entity.Property(e => e.MinAnnualPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinBasicSumAssured).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinHalfYearlyPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinMonthlyPremium)
                    .HasColumnName("MinMOnthlyPremium")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinQuarterlyPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinSurrenderYear)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MinTopUpYear)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblRiderRate>(entity =>
            {
                entity.HasKey(e => e.RateId)
                    .HasName("PK_RiderRate");

                entity.ToTable("tblRiderRate", "PR");

                entity.Property(e => e.RateId).HasColumnName("RateID");

                entity.Property(e => e.Factor)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MaxValue).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Rate)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RateType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RiderId).HasColumnName("RiderID");
            });

            modelBuilder.Entity<TblRiderRateChart>(entity =>
            {
                entity.HasKey(e => e.RiderRateChartId)
                    .HasName("pk_tblRiderRateChart");

                entity.ToTable("tblRiderRateChart", "PR");

                entity.HasIndex(e => new { e.Rate, e.Product, e.RelationType, e.Smoker, e.Type, e.Age, e.Term, e.SumAssured, e.Gender, e.WithFloater })
                    .HasName("IX_tblRiderRateChart_Type_Age_Term_SumAssured_Gender_WithFloater");

                entity.Property(e => e.Gender)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Product)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Rate).HasColumnType("numeric(20, 10)");

                entity.Property(e => e.RelationType)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblRiders>(entity =>
            {
                entity.HasKey(e => e.RiderId)
                    .HasName("pk_tblRiders");

                entity.ToTable("tblRiders", "PR");

                entity.Property(e => e.RiderId).ValueGeneratedNever();

                entity.Property(e => e.EffectiveFrom).HasColumnType("date");

                entity.Property(e => e.EffectiveTo).HasColumnType("date");

                entity.Property(e => e.ImagePath).HasMaxLength(1000);

                entity.Property(e => e.RiderCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RiderName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblmasPrcommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId);

                entity.ToTable("tblmasPRCommonTypes", "PR");

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
