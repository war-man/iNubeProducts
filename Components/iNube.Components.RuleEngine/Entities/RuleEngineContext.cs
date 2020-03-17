using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class RuleEngineContext : DbContext
    {
        public RuleEngineContext()
        {
        }

        public RuleEngineContext(DbContextOptions<RuleEngineContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblCountryMaster> TblCountryMaster { get; set; }
        public virtual DbSet<TblParamSet> TblParamSet { get; set; }
        public virtual DbSet<TblParamSetDetails> TblParamSetDetails { get; set; }
        public virtual DbSet<TblParameters> TblParameters { get; set; }
        public virtual DbSet<TblRuleConditionValues> TblRuleConditionValues { get; set; }
        public virtual DbSet<TblRuleConditions> TblRuleConditions { get; set; }
        public virtual DbSet<TblRuleMapping> TblRuleMapping { get; set; }
        public virtual DbSet<TblRuleParamSetMapping> TblRuleParamSetMapping { get; set; }
        public virtual DbSet<TblRules> TblRules { get; set; }
        public virtual DbSet<TblVehTypeMaster> TblVehTypeMaster { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=MICADev;User ID=MICAUSER;Password=MICA*user123;Trusted_Connection=False;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<TblCountryMaster>(entity =>
            {
                entity.ToTable("tblCountryMaster", "re");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CountryName).HasColumnName("countryName");
            });

            modelBuilder.Entity<TblParamSet>(entity =>
            {
                entity.HasKey(e => e.ParamSetId);

                entity.ToTable("tblParamSet", "re");

                entity.Property(e => e.ParamSetId)
                    .HasColumnName("ParamSetID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ParamSetName).IsUnicode(false);
            });

            modelBuilder.Entity<TblParamSetDetails>(entity =>
            {
                entity.HasKey(e => e.ParamSetDetailsId);

                entity.ToTable("tblParamSetDetails", "re");

                entity.Property(e => e.ParamSetDetailsId)
                    .HasColumnName("ParamSetDetailsID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ParamId)
                    .HasColumnName("ParamID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ParamSetId)
                    .HasColumnName("ParamSetID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Param)
                    .WithMany(p => p.TblParamSetDetails)
                    .HasForeignKey(d => d.ParamId)
                    .HasConstraintName("FK_tblParamSetDetails_tblParameters");

                entity.HasOne(d => d.ParamSet)
                    .WithMany(p => p.TblParamSetDetails)
                    .HasForeignKey(d => d.ParamSetId)
                    .HasConstraintName("FK_tblParamSetDetails_tblParamSet");
            });

            modelBuilder.Entity<TblParameters>(entity =>
            {
                entity.HasKey(e => e.ParamId);

                entity.ToTable("tblParameters", "re");

                entity.Property(e => e.ParamId)
                    .HasColumnName("ParamID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ParamMasterLink)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ParamName).IsUnicode(false);

                entity.Property(e => e.ParamType)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblRuleConditionValues>(entity =>
            {
                entity.HasKey(e => e.RuleConditionValueId);

                entity.ToTable("tblRuleConditionValues", "re");

                entity.Property(e => e.RuleConditionValueId)
                    .HasColumnName("RuleConditionValueID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ConditionValue)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RuleConditionId)
                    .HasColumnName("RuleConditionID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.RuleCondition)
                    .WithMany(p => p.TblRuleConditionValues)
                    .HasForeignKey(d => d.RuleConditionId)
                    .HasConstraintName("FK_tblRuleConditionValues_tblRuleConditions");
            });

            modelBuilder.Entity<TblRuleConditions>(entity =>
            {
                entity.HasKey(e => e.RuleConditionId);

                entity.ToTable("tblRuleConditions", "re");

                entity.Property(e => e.RuleConditionId)
                    .HasColumnName("RuleConditionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ColumnName)
                    .HasColumnName("columnName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ConditionAttribute).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ConditionLogicalOperator)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ConditionOperator)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ConditionValueFrom)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ConditionValueTo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Dobconditions)
                    .HasColumnName("DOBConditions")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FailureCode).IsUnicode(false);

                entity.Property(e => e.FailureMsg).IsUnicode(false);

                entity.Property(e => e.FromDate).HasColumnType("date");

                entity.Property(e => e.RuleId)
                    .HasColumnName("RuleID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SuccessCode).IsUnicode(false);

                entity.Property(e => e.SuccessMsg).IsUnicode(false);

                entity.Property(e => e.TableName)
                    .HasColumnName("tableName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ToDate).HasColumnType("date");

                entity.Property(e => e.ValidatorName).IsUnicode(false);

                entity.HasOne(d => d.Rule)
                    .WithMany(p => p.TblRuleConditions)
                    .HasForeignKey(d => d.RuleId)
                    .HasConstraintName("FK_tblRuleConditions_tblParamSetDetails");
            });

            modelBuilder.Entity<TblRuleMapping>(entity =>
            {
                entity.HasKey(e => e.RuleMapId);

                entity.ToTable("tblRuleMapping", "re");

                entity.Property(e => e.RuleMapId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Action)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).HasColumnType("datetime");

                entity.Property(e => e.MasterModel)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModelName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Param1)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Param2)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RuleId).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<TblRuleParamSetMapping>(entity =>
            {
                entity.HasKey(e => e.RuleParamSetMappingId);

                entity.ToTable("tblRuleParamSetMapping", "re");

                entity.Property(e => e.RuleParamSetMappingId)
                    .HasColumnName("RuleParamSetMappingID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ParamSetId)
                    .HasColumnName("ParamSetID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RuleId)
                    .HasColumnName("RuleID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.ParamSet)
                    .WithMany(p => p.TblRuleParamSetMapping)
                    .HasForeignKey(d => d.ParamSetId)
                    .HasConstraintName("FK_tblRuleParamSetMapping_tblParamSet");

                entity.HasOne(d => d.Rule)
                    .WithMany(p => p.TblRuleParamSetMapping)
                    .HasForeignKey(d => d.RuleId)
                    .HasConstraintName("FK_tblRuleParamSetMapping_tblRules");
            });

            modelBuilder.Entity<TblRules>(entity =>
            {
                entity.HasKey(e => e.RuleId);

                entity.ToTable("tblRules", "re");

                entity.Property(e => e.RuleId)
                    .HasColumnName("RuleID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.RuleName).IsUnicode(false);

                entity.Property(e => e.RuleObj).IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblVehTypeMaster>(entity =>
            {
                entity.ToTable("tblVehTypeMaster", "re");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.VehType).HasMaxLength(50);
            });
        }
    }
}
