using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Policy.Entities.AVO.DynamicReportEntities
{
    public partial class AVORPContext : DbContext
    {
        public AVORPContext()
        {
        }

        public AVORPContext(DbContextOptions<AVORPContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblReportConfig> TblReportConfig { get; set; }
        public virtual DbSet<TblReportConfigParam> TblReportConfigParam { get; set; }
        public virtual DbSet<TblRpmasters> TblRpmasters { get; set; }

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

            modelBuilder.Entity<TblReportConfig>(entity =>
            {
                entity.HasKey(e => e.ReportConfigId)
                    .HasName("PK__tblRepor__A2378BB1C4303581");

                entity.ToTable("tblReportConfig", "RP");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Dbschema)
                    .HasColumnName("DBSchema")
                    .HasMaxLength(50);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ReportConfigName).HasMaxLength(50);
            });

            modelBuilder.Entity<TblReportConfigParam>(entity =>
            {
                entity.HasKey(e => e.ReportConfigParamId)
                    .HasName("PK__tblRepor__58026587D7BC3806");

                entity.ToTable("tblReportConfigParam", "RP");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DataType).HasMaxLength(50);

                entity.Property(e => e.ParameterName).HasMaxLength(50);

                entity.Property(e => e.RangeType).HasMaxLength(50);

                entity.HasOne(d => d.ReportConfig)
                    .WithMany(p => p.TblReportConfigParam)
                    .HasForeignKey(d => d.ReportConfigId)
                    .HasConstraintName("FK_tblReportConfigParam_tblReportConfig");
            });

            modelBuilder.Entity<TblRpmasters>(entity =>
            {
                entity.HasKey(e => e.MastersId)
                    .HasName("PK__tblRPMas__20D654C0317F6E42");

                entity.ToTable("tblRPMasters", "RP");

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(50);
            });
        }
    }
}
