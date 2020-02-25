using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Components.RuleEngine.Entities.AllocationEntities
{
    public partial class MICAALContext : DbContext
    {
        public MICAALContext()
        {
        }

        public MICAALContext(DbContextOptions<MICAALContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAllocation> TblAllocation { get; set; }
        public virtual DbSet<TblAllocationRuleConditions> TblAllocationRuleConditions { get; set; }
        public virtual DbSet<TblAllocationRules> TblAllocationRules { get; set; }

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
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<TblAllocation>(entity =>
            {
                entity.HasKey(e => e.AllocationId);

                entity.ToTable("tblAllocation", "AL");

                entity.Property(e => e.AllocationId)
                    .HasColumnName("AllocationID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AllocationName).IsUnicode(false);

                entity.Property(e => e.AllocationObj).IsUnicode(false);
            });

            modelBuilder.Entity<TblAllocationRuleConditions>(entity =>
            {
                entity.HasKey(e => e.AllocationRuleConditionId);

                entity.ToTable("tblAllocationRuleConditions", "AL");

                entity.Property(e => e.AllocationRuleConditionId)
                    .HasColumnName("AllocationRuleConditionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AllocationRuleId)
                    .HasColumnName("AllocationRuleID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Output)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.AllocationRule)
                    .WithMany(p => p.TblAllocationRuleConditions)
                    .HasForeignKey(d => d.AllocationRuleId)
                    .HasConstraintName("FK_tblRatingRulestblRatingRuleConditions");
            });

            modelBuilder.Entity<TblAllocationRules>(entity =>
            {
                entity.HasKey(e => e.AllocationRuleId);

                entity.ToTable("tblAllocationRules", "AL");

                entity.Property(e => e.AllocationRuleId)
                    .HasColumnName("AllocationRuleID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AllocationId)
                    .HasColumnName("AllocationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Input).IsUnicode(false);

                entity.Property(e => e.IsMulti).IsUnicode(false);

                entity.Property(e => e.Output).IsUnicode(false);

                entity.HasOne(d => d.Allocation)
                    .WithMany(p => p.TblAllocationRules)
                    .HasForeignKey(d => d.AllocationId)
                    .HasConstraintName("FK_tblAllocationRules");
            });
        }
    }
}
