using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Policy.Entities.DynamicGraphEntities
{
    public partial class MICADBContext : DbContext
    {
        public MICADBContext()
        {
        }

        public MICADBContext(DbContextOptions<MICADBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblDashboardConfig> TblDashboardConfig { get; set; }
        public virtual DbSet<TblDashboardConfigParam> TblDashboardConfigParam { get; set; }
        public virtual DbSet<TblDbmasters> TblDbmasters { get; set; }

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

            modelBuilder.Entity<TblDashboardConfig>(entity =>
            {
                entity.HasKey(e => e.DashboardConfigId)
                    .HasName("PK__tblDashb__930EEA7A50EF09F8");

                entity.ToTable("tblDashboardConfig", "DB");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DashboardConfigName).HasMaxLength(50);

                entity.Property(e => e.Dbschema)
                    .HasColumnName("DBSchema")
                    .HasMaxLength(50);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblDashboardConfigParam>(entity =>
            {
                entity.HasKey(e => e.DashboardConfigParamId)
                    .HasName("PK__tblDashb__B6C4EFFB184A5DE8");

                entity.ToTable("tblDashboardConfigParam", "DB");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DataType).HasMaxLength(50);

                entity.Property(e => e.ParameterName).HasMaxLength(50);

                entity.Property(e => e.RangeType).HasMaxLength(50);

                entity.HasOne(d => d.DashboardConfig)
                    .WithMany(p => p.TblDashboardConfigParam)
                    .HasForeignKey(d => d.DashboardConfigId)
                    .HasConstraintName("FK_tblDashboardConfigParam_tblDashboardConfig");
            });

            modelBuilder.Entity<TblDbmasters>(entity =>
            {
                entity.HasKey(e => e.MastersId)
                    .HasName("PK__tblDBMas__20D654C010AEDD6E");

                entity.ToTable("tblDBMasters", "DB");

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(50);
            });
        }
    }
}
