using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Rating.Entities
{
    public partial class MICARTContext : DbContext
    {
        public MICARTContext()
        {
        }

        public MICARTContext(DbContextOptions<MICARTContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblCalculationConfig> TblCalculationConfig { get; set; }
        public virtual DbSet<TblCalculationConfigExpression> TblCalculationConfigExpression { get; set; }
        public virtual DbSet<TblCalculationConfigParam> TblCalculationConfigParam { get; set; }
        public virtual DbSet<TblCalculationHeader> TblCalculationHeader { get; set; }
        public virtual DbSet<TblCalculationResult> TblCalculationResult { get; set; }
        public virtual DbSet<TblParameterSet> TblParameterSet { get; set; }
        public virtual DbSet<TblParameterSetDetails> TblParameterSetDetails { get; set; }
        public virtual DbSet<TblRating> TblRating { get; set; }
        public virtual DbSet<TblRatingParameters> TblRatingParameters { get; set; }
        public virtual DbSet<TblRatingRuleConditions> TblRatingRuleConditions { get; set; }
        public virtual DbSet<TblRatingRules> TblRatingRules { get; set; }

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

            modelBuilder.Entity<TblCalculationConfig>(entity =>
            {
                entity.HasKey(e => e.CalculationConfigId);

                entity.ToTable("tblCalculationConfig", "RT");

                entity.Property(e => e.CalculationConfigId)
                    .HasColumnName("CalculationConfigID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CalculationConfigName).IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblCalculationConfigExpression>(entity =>
            {
                entity.HasKey(e => e.CalculationConfigExpressionId)
                    .HasName("PK_CalculationConfigExpression");

                entity.ToTable("tblCalculationConfigExpression", "RT");

                entity.Property(e => e.CalculationConfigExpressionId)
                    .HasColumnName("CalculationConfigExpressionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CalculationConfigId)
                    .HasColumnName("CalculationConfigID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ExpressionResult).IsUnicode(false);

                entity.Property(e => e.ExpressionValue).IsUnicode(false);

                entity.HasOne(d => d.CalculationConfig)
                    .WithMany(p => p.TblCalculationConfigExpression)
                    .HasForeignKey(d => d.CalculationConfigId)
                    .HasConstraintName("FK_tblCalculationConfigtblCalculationConfigExpression");
            });

            modelBuilder.Entity<TblCalculationConfigParam>(entity =>
            {
                entity.HasKey(e => e.CalculationConfigParamId);

                entity.ToTable("tblCalculationConfigParam", "RT");

                entity.Property(e => e.CalculationConfigParamId)
                    .HasColumnName("CalculationConfigParamID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CalculationConfigId)
                    .HasColumnName("CalculationConfigID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CalculationConfigParamName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CalculationConfig)
                    .WithMany(p => p.TblCalculationConfigParam)
                    .HasForeignKey(d => d.CalculationConfigId)
                    .HasConstraintName("FK_tblCalculationConfigtblCalculationConfigParam");
            });

            modelBuilder.Entity<TblCalculationHeader>(entity =>
            {
                entity.HasKey(e => e.CalculationHeaderId);

                entity.ToTable("tblCalculationHeader", "RT");

                entity.Property(e => e.CalculationHeaderId)
                    .HasColumnName("CalculationHeaderID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CalculationHeaderName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblCalculationResult>(entity =>
            {
                entity.HasKey(e => e.CalculationResultId);

                entity.ToTable("tblCalculationResult", "RT");

                entity.Property(e => e.CalculationResultId)
                    .HasColumnName("CalculationResultID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CalculationHeaderId)
                    .HasColumnName("CalculationHeaderID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CalculationResultName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CalculationResultValue).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.CalculationHeader)
                    .WithMany(p => p.TblCalculationResult)
                    .HasForeignKey(d => d.CalculationHeaderId)
                    .HasConstraintName("FK_tblCalculationHeader_tblCalculationResult");
            });

            modelBuilder.Entity<TblParameterSet>(entity =>
            {
                entity.HasKey(e => e.ParameterSetId);

                entity.ToTable("tblParameterSet", "RT");

                entity.Property(e => e.ParameterSetId)
                    .HasColumnName("ParameterSetID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ParameterSetName).IsUnicode(false);
            });

            modelBuilder.Entity<TblParameterSetDetails>(entity =>
            {
                entity.HasKey(e => e.ParameterSetDetailsId);

                entity.ToTable("tblParameterSetDetails", "RT");

                entity.Property(e => e.ParameterSetDetailsId)
                    .HasColumnName("ParameterSetDetailsID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ParameterSetId)
                    .HasColumnName("ParameterSetID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ParametersId)
                    .HasColumnName("ParametersID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RangeType)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.ParameterSet)
                    .WithMany(p => p.TblParameterSetDetails)
                    .HasForeignKey(d => d.ParameterSetId)
                    .HasConstraintName("FK_tblParameterSettblParameterSetDetails");
            });

            modelBuilder.Entity<TblRating>(entity =>
            {
                entity.HasKey(e => e.RatingId);

                entity.ToTable("tblRating", "RT");

                entity.Property(e => e.RatingId)
                    .HasColumnName("RatingID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.Rate).IsUnicode(false);

                entity.Property(e => e.RateName).IsUnicode(false);

                entity.Property(e => e.RateObj).IsUnicode(false);

                entity.Property(e => e.RateType).IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblRatingParameters>(entity =>
            {
                entity.HasKey(e => e.ParametersId);

                entity.ToTable("tblRatingParameters", "RT");

                entity.Property(e => e.ParametersId)
                    .HasColumnName("ParametersID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ParameterMasterLink)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ParameterName).IsUnicode(false);

                entity.Property(e => e.ParameterType)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblRatingRuleConditions>(entity =>
            {
                entity.HasKey(e => e.RatingRuleConditionId);

                entity.ToTable("tblRatingRuleConditions", "RT");

                entity.Property(e => e.RatingRuleConditionId)
                    .HasColumnName("RatingRuleConditionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ConditionValueFrom)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ConditionValueTo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.FromDate).HasColumnType("date");

                entity.Property(e => e.RatingParameters).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RatingRuleId)
                    .HasColumnName("RatingRuleID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ToDate).HasColumnType("date");

                entity.HasOne(d => d.RatingRule)
                    .WithMany(p => p.TblRatingRuleConditions)
                    .HasForeignKey(d => d.RatingRuleId)
                    .HasConstraintName("FK_tblRatingRulestblRatingRuleConditions");
            });

            modelBuilder.Entity<TblRatingRules>(entity =>
            {
                entity.HasKey(e => e.RatingRuleId);

                entity.ToTable("tblRatingRules", "RT");

                entity.Property(e => e.RatingRuleId)
                    .HasColumnName("RatingRuleID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.Rate).IsUnicode(false);

                entity.Property(e => e.RatingId)
                    .HasColumnName("RatingID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Rating)
                    .WithMany(p => p.TblRatingRules)
                    .HasForeignKey(d => d.RatingId)
                    .HasConstraintName("FK_tblRatingtblRatingRules");
            });
        }
    }
}
