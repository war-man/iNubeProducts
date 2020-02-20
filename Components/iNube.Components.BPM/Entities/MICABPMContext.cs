using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Components.BPM.Entities
{
    public partial class MICABPMContext : DbContext
    {
        public MICABPMContext()
        {
        }

        public MICABPMContext(DbContextOptions<MICABPMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblMasBpmtaskParams> TblMasBpmtaskParams { get; set; }
        public virtual DbSet<TblMasBpmtasks> TblMasBpmtasks { get; set; }
        public virtual DbSet<TblMasComponentWebApi> TblMasComponentWebApi { get; set; }
        public virtual DbSet<TblMasComponentWebApiParams> TblMasComponentWebApiParams { get; set; }
        public virtual DbSet<TblMasComponents> TblMasComponents { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=MICADev;User Id=MICAUSER; Password=MICA*user123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<TblMasBpmtaskParams>(entity =>
            {
                entity.HasKey(e => e.TaskParameterId);

                entity.ToTable("tblMasBPMTaskParams", "BPM");

                entity.Property(e => e.TaskParameterId)
                    .HasColumnName("TaskParameterID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ParameterOrder).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TaskId)
                    .HasColumnName("TaskID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TblMasBpmtaskParams)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_tblMasBPMTaskParams_tblMasBPMTasks");
            });

            modelBuilder.Entity<TblMasBpmtasks>(entity =>
            {
                entity.HasKey(e => e.TaskId);

                entity.ToTable("tblMasBPMTasks", "BPM");

                entity.Property(e => e.TaskId)
                    .HasColumnName("TaskID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.InputParameterName).HasColumnName("[InputParameterName");
            });

            modelBuilder.Entity<TblMasComponentWebApi>(entity =>
            {
                entity.HasKey(e => e.WebApiId);

                entity.ToTable("tblMasComponentWebApi", "BPM");

                entity.Property(e => e.WebApiId)
                    .HasColumnName("WebApiID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ComponentId)
                    .HasColumnName("ComponentID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Component)
                    .WithMany(p => p.TblMasComponentWebApi)
                    .HasForeignKey(d => d.ComponentId)
                    .HasConstraintName("FK_tblMasComponentWebApi_tblMasComponents");
            });

            modelBuilder.Entity<TblMasComponentWebApiParams>(entity =>
            {
                entity.HasKey(e => e.WebApiParamId);

                entity.ToTable("tblMasComponentWebApiParams", "BPM");

                entity.Property(e => e.WebApiParamId)
                    .HasColumnName("WebApiParamID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ParameterOrder).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WebApiId)
                    .HasColumnName("WebApiID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.WebApi)
                    .WithMany(p => p.TblMasComponentWebApiParams)
                    .HasForeignKey(d => d.WebApiId)
                    .HasConstraintName("FK_tblMasComponentWebApiParams_tblMasComponentWebApi");
            });

            modelBuilder.Entity<TblMasComponents>(entity =>
            {
                entity.HasKey(e => e.ComponentId);

                entity.ToTable("tblMasComponents", "BPM");

                entity.Property(e => e.ComponentId)
                    .HasColumnName("ComponentID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();
            });
        }
    }
}
