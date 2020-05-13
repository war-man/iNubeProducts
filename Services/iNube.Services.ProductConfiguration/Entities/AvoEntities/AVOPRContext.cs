using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.ProductConfiguration.Entities.AvoEntities
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

        public virtual DbSet<TblDiscountLoadingChart> TblDiscountLoadingChart { get; set; }
        public virtual DbSet<TblMasCommonTypes> TblMasCommonTypes { get; set; }
        public virtual DbSet<TblMasDataType> TblMasDataType { get; set; }
        public virtual DbSet<TblMasParameters> TblMasParameters { get; set; }
        public virtual DbSet<TblMasPlan> TblMasPlan { get; set; }
        public virtual DbSet<TblProductAllocationRate> TblProductAllocationRate { get; set; }
        public virtual DbSet<TblProductAssumptionMap> TblProductAssumptionMap { get; set; }
        public virtual DbSet<TblProductPlan> TblProductPlan { get; set; }
        public virtual DbSet<TblProductPlanRiderDiscountLoadingMap> TblProductPlanRiderDiscountLoadingMap { get; set; }
        public virtual DbSet<TblProductPlanRiderParameters> TblProductPlanRiderParameters { get; set; }
        public virtual DbSet<TblProductPlanRiders> TblProductPlanRiders { get; set; }
        public virtual DbSet<TblProductPolicyTerm> TblProductPolicyTerm { get; set; }
        public virtual DbSet<TblProductRiders> TblProductRiders { get; set; }
        public virtual DbSet<TblProductSam> TblProductSam { get; set; }
        public virtual DbSet<TblProducts> TblProducts { get; set; }
        public virtual DbSet<TblRiderRate> TblRiderRate { get; set; }
        public virtual DbSet<TblRiders> TblRiders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#pragma warning disable CS1030 // #warning directive
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=AVOLifeP2;User ID=AVOLifeUserP2;Password=AVOLife*User123;");
#pragma warning restore CS1030 // #warning directive
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

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
        }
    }
}
