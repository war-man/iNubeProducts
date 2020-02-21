﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Policy.Entities.DynamicReportEntites
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

        public virtual DbSet<TblReportConfig> TblReportConfig { get; set; }
        public virtual DbSet<TblReportConfigParam> TblReportConfigParam { get; set; }
        public virtual DbSet<TblReportConfigParamDetails> TblReportConfigParamDetails { get; set; }
        public virtual DbSet<TblRpmasters> TblRpmasters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=MICADev;User ID=MICAUSER;Password=MICA*user123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<TblReportConfig>(entity =>
            {
                entity.HasKey(e => e.ReportConfigId)
                    .HasName("PK__tblRepor__A2378BB1EBB34E92");

                entity.ToTable("tblReportConfig", "RP");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Dbschema)
                    .HasColumnName("DBSchema")
                    .HasMaxLength(50);

                entity.Property(e => e.Query).HasMaxLength(100);

                entity.Property(e => e.ReportConfigName).HasMaxLength(50);
            });

            modelBuilder.Entity<TblReportConfigParam>(entity =>
            {
                entity.HasKey(e => e.ReportConfigParamId)
                    .HasName("PK__tblRepor__5802658730C2B7B0");

                entity.ToTable("tblReportConfigParam", "RP");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DataType).HasMaxLength(50);

                entity.Property(e => e.ParameterName).HasMaxLength(50);

                entity.Property(e => e.RangeType).HasMaxLength(50);
            });

            modelBuilder.Entity<TblReportConfigParamDetails>(entity =>
            {
                entity.HasKey(e => e.ParamDetailsId)
                    .HasName("PK__tblRepor__C8CBC08BE120C4F4");

                entity.ToTable("tblReportConfigParamDetails", "RP");

                entity.HasOne(d => d.ReportConfig)
                    .WithMany(p => p.TblReportConfigParamDetails)
                    .HasForeignKey(d => d.ReportConfigId)
                    .HasConstraintName("FK_tblReportConfigParamDetails_tblReportConfig");

                entity.HasOne(d => d.ReportConfigParam)
                    .WithMany(p => p.TblReportConfigParamDetails)
                    .HasForeignKey(d => d.ReportConfigParamId)
                    .HasConstraintName("FK_tblReportConfigParamDetails_tblReportConfigParam");
            });

            modelBuilder.Entity<TblRpmasters>(entity =>
            {
                entity.HasKey(e => e.MastersId)
                    .HasName("PK__tblRPMas__20D654C0BD9FD2C2");

                entity.ToTable("tblRPMasters", "RP");

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(50);
            });
        }
    }
}
