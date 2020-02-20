using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Components.Workflow.Entities
{
    public partial class WorkflowContext : DbContext
    {
        public WorkflowContext()
        {
        }

        public WorkflowContext(DbContextOptions<WorkflowContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblWfprocess> TblWfprocess { get; set; }
        public virtual DbSet<TblWfstage> TblWfstage { get; set; }
        public virtual DbSet<TblWfstageStatus> TblWfstageStatus { get; set; }
        public virtual DbSet<TblWfstageflow> TblWfstageflow { get; set; }
        public virtual DbSet<TblWfstatusflow> TblWfstatusflow { get; set; }
        public virtual DbSet<TblWorkflow> TblWorkflow { get; set; }
        public virtual DbSet<TblWorkflowHistory> TblWorkflowHistory { get; set; }

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
            modelBuilder.HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity<TblWfprocess>(entity =>
            {
                entity.HasKey(e => e.WfprocessId);

                entity.ToTable("tblWFProcess", "WF");

                entity.Property(e => e.WfprocessId)
                    .HasColumnName("WFProcessID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Wfname).HasColumnName("WFName");
            });

            modelBuilder.Entity<TblWfstage>(entity =>
            {
                entity.HasKey(e => e.WfstageId);

                entity.ToTable("tblWFStage", "WF");

                entity.Property(e => e.WfstageId)
                    .HasColumnName("WFStageID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.StageType).HasMaxLength(50);

                entity.Property(e => e.WfprocessId)
                    .HasColumnName("WFProcessID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Wfprocess)
                    .WithMany(p => p.TblWfstage)
                    .HasForeignKey(d => d.WfprocessId)
                    .HasConstraintName("FK_tblWFStage_tblWFProcess");
            });

            modelBuilder.Entity<TblWfstageStatus>(entity =>
            {
                entity.HasKey(e => e.WfstageStatusId);

                entity.ToTable("tblWFStageStatus", "WF");

                entity.Property(e => e.WfstageStatusId)
                    .HasColumnName("WFStageStatusID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Mode).HasMaxLength(50);

                entity.Property(e => e.StageState).HasMaxLength(50);

                entity.Property(e => e.WfstageId)
                    .HasColumnName("WFStageID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Wfstage)
                    .WithMany(p => p.TblWfstageStatus)
                    .HasForeignKey(d => d.WfstageId)
                    .HasConstraintName("FK_tblWFStageStatus_tblWFStage");
            });

            modelBuilder.Entity<TblWfstageflow>(entity =>
            {
                entity.HasKey(e => e.WfstageflowId);

                entity.ToTable("tblWFStageflow", "WF");

                entity.Property(e => e.WfstageflowId)
                    .HasColumnName("WFStageflowID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.NextStage).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WfstageId)
                    .HasColumnName("WFStageID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.NextStageNavigation)
                    .WithMany(p => p.TblWfstageflowNextStageNavigation)
                    .HasForeignKey(d => d.NextStage)
                    .HasConstraintName("FK_tblWFStageflow_tblWFStage1");

                entity.HasOne(d => d.Wfstage)
                    .WithMany(p => p.TblWfstageflowWfstage)
                    .HasForeignKey(d => d.WfstageId)
                    .HasConstraintName("FK_tblWFStageflow_tblWFStage");
            });

            modelBuilder.Entity<TblWfstatusflow>(entity =>
            {
                entity.HasKey(e => e.WfstatusflowId);

                entity.ToTable("tblWFStatusflow", "WF");

                entity.Property(e => e.WfstatusflowId)
                    .HasColumnName("WFStatusflowID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.NextStatus).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WfstageStatusId)
                    .HasColumnName("WFStageStatusID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.NextStatusNavigation)
                    .WithMany(p => p.TblWfstatusflowNextStatusNavigation)
                    .HasForeignKey(d => d.NextStatus)
                    .HasConstraintName("FK_tblWFStatusflow_tblWFStageStatus1");

                entity.HasOne(d => d.WfstageStatus)
                    .WithMany(p => p.TblWfstatusflowWfstageStatus)
                    .HasForeignKey(d => d.WfstageStatusId)
                    .HasConstraintName("FK_tblWFStatusflow_tblWFStageStatus");
            });

            modelBuilder.Entity<TblWorkflow>(entity =>
            {
                entity.HasKey(e => e.WorkflowId);

                entity.ToTable("tblWorkflow", "WF");

                entity.Property(e => e.WorkflowId)
                    .HasColumnName("WorkflowID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateModified).HasColumnType("date");

                entity.Property(e => e.ItemReference).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WfprocessId)
                    .HasColumnName("WFProcessID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WfstageId)
                    .HasColumnName("WFStageID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WfstageStatusId)
                    .HasColumnName("WFStageStatusID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Wfprocess)
                    .WithMany(p => p.TblWorkflow)
                    .HasForeignKey(d => d.WfprocessId)
                    .HasConstraintName("FK_tblWorkflow_tblWFProcess");

                entity.HasOne(d => d.Wfstage)
                    .WithMany(p => p.TblWorkflow)
                    .HasForeignKey(d => d.WfstageId)
                    .HasConstraintName("FK_tblWorkflow_tblWFStage");

                entity.HasOne(d => d.WfstageStatus)
                    .WithMany(p => p.TblWorkflow)
                    .HasForeignKey(d => d.WfstageStatusId)
                    .HasConstraintName("FK_tblWorkflow_tblWFStageStatus");
            });

            modelBuilder.Entity<TblWorkflowHistory>(entity =>
            {
                entity.HasKey(e => e.WorkflowHistoryId);

                entity.ToTable("tblWorkflowHistory", "WF");

                entity.Property(e => e.WorkflowHistoryId)
                    .HasColumnName("WorkflowHistoryID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.FromStageStatus).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ToStageStatus).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WorkflowId)
                    .HasColumnName("WorkflowID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.FromStageStatusNavigation)
                    .WithMany(p => p.TblWorkflowHistoryFromStageStatusNavigation)
                    .HasForeignKey(d => d.FromStageStatus)
                    .HasConstraintName("FK_tblWorkflowHistory_tblWFStageStatus");

                entity.HasOne(d => d.ToStageStatusNavigation)
                    .WithMany(p => p.TblWorkflowHistoryToStageStatusNavigation)
                    .HasForeignKey(d => d.ToStageStatus)
                    .HasConstraintName("FK_tblWorkflowHistory_tblWFStageStatus1");

                entity.HasOne(d => d.Workflow)
                    .WithMany(p => p.TblWorkflowHistory)
                    .HasForeignKey(d => d.WorkflowId)
                    .HasConstraintName("FK_tblWorkflowHistory_tblWorkflow");
            });
        }
    }
}

