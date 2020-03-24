using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Policy.Entities.DynamicReportEntities
{
    public partial class MICARPContext : DbContext
    {
        public MICARPContext()
        {
        }

        public MICARPContext(DbContextOptions<MICARPContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblDynamicConfig> TblDynamicConfig { get; set; }
        public virtual DbSet<TblDynamicPermissions> TblDynamicPermissions { get; set; }
        public virtual DbSet<TblReportConfig> TblReportConfig { get; set; }
        public virtual DbSet<TblReportConfigParam> TblReportConfigParam { get; set; }
        public virtual DbSet<TblRpmasters> TblRpmasters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=edelweissdb1.coow0ess1gft.ap-south-1.rds.amazonaws.com,1433;Database=EdelweissTest;User ID=admin;Password=micaadmin;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<TblDynamicConfig>(entity =>
            {
                entity.HasKey(e => e.ConfigId)
                    .HasName("PK__tblDynam__C3BC335C78A6F2BA");

                entity.ToTable("tblDynamicConfig", "RP");

                entity.Property(e => e.ConfigId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ItemDescription).HasMaxLength(50);

                entity.Property(e => e.ItemType).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<TblDynamicPermissions>(entity =>
            {
                entity.HasKey(e => e.DynamicPermissionId)
                    .HasName("PK__tblDynam__9E6E40FABEE8C431");

                entity.ToTable("tblDynamicPermissions", "RP");

                entity.Property(e => e.DynamicPermissionId)
                    .HasColumnName("DynamicPermissionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DynamicId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.DynamicName).HasMaxLength(50);

                entity.Property(e => e.DynamicType).HasMaxLength(50);

                entity.Property(e => e.Roleid).HasMaxLength(450);

                entity.Property(e => e.Userid).HasMaxLength(450);

                entity.Property(e => e.UserorRole)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblReportConfig>(entity =>
            {
                entity.HasKey(e => e.ReportConfigId)
                    .HasName("PK__tblRepor__A2378BB1ABC7C71D");

                entity.ToTable("tblReportConfig", "RP");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Dbschema)
                    .HasColumnName("DBSchema")
                    .HasMaxLength(50);

                entity.Property(e => e.ReportConfigName).HasMaxLength(50);
            });

            modelBuilder.Entity<TblReportConfigParam>(entity =>
            {
                entity.HasKey(e => e.ReportConfigParamId)
                    .HasName("PK__tblRepor__58026587F24CAC37");

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
                    .HasName("PK__tblRPMas__20D654C0B5596729");

                entity.ToTable("tblRPMasters", "RP");

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(50);
            });
        }
    }
}
