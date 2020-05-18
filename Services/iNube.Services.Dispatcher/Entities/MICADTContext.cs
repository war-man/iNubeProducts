using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Dispatcher.Entities
{
    public partial class MICADTContext : DbContext
    {
        public MICADTContext()
        {
        }

        public MICADTContext(DbContextOptions<MICADTContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblDispatcher> TblDispatcher { get; set; }
        public virtual DbSet<TblDispatcherTask> TblDispatcherTask { get; set; }
        public virtual DbSet<TblMapper> TblMapper { get; set; }
        public virtual DbSet<TblMapperDetails> TblMapperDetails { get; set; }

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

            modelBuilder.Entity<TblDispatcher>(entity =>
            {
                entity.HasKey(e => e.DispatcherId);

                entity.ToTable("tblDispatcher", "DT");

                entity.Property(e => e.DispatcherId)
                    .HasColumnName("DispatcherID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DispatcherTaskName).IsUnicode(false);

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.InputObject).IsUnicode(false);

                entity.Property(e => e.OutputObject).IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblDispatcherTask>(entity =>
            {
                entity.HasKey(e => e.DispatcherTaskId);

                entity.ToTable("tblDispatcherTask", "DT");

                entity.Property(e => e.DispatcherTaskId)
                    .HasColumnName("DispatcherTaskID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Api).IsUnicode(false);

                entity.Property(e => e.DispatcherId)
                    .HasColumnName("DispatcherID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InputObject).IsUnicode(false);

                entity.Property(e => e.InputTypeObject)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OutputObject).IsUnicode(false);

                entity.Property(e => e.OutputTypeObject)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResponseMsg).IsUnicode(false);

                entity.HasOne(d => d.Dispatcher)
                    .WithMany(p => p.TblDispatcherTask)
                    .HasForeignKey(d => d.DispatcherId)
                    .HasConstraintName("FK_tblDispatchertblDispatcherTask");
            });

            modelBuilder.Entity<TblMapper>(entity =>
            {
                entity.HasKey(e => e.MapperId);

                entity.ToTable("tblMapper", "DT");

                entity.Property(e => e.MapperId)
                    .HasColumnName("MapperID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.MapperName).IsUnicode(false);

                entity.Property(e => e.SourceComponent).IsUnicode(false);

                entity.Property(e => e.TargetComponent).IsUnicode(false);
            });

            modelBuilder.Entity<TblMapperDetails>(entity =>
            {
                entity.HasKey(e => e.MapperDetailsId);

                entity.ToTable("tblMapperDetails", "DT");

                entity.Property(e => e.MapperDetailsId)
                    .HasColumnName("MapperDetailsID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.MapperId)
                    .HasColumnName("MapperID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SourceParameter).IsUnicode(false);

                entity.Property(e => e.TargetParameter).IsUnicode(false);

                entity.Property(e => e.TargetParameterPath).IsUnicode(false);

                entity.HasOne(d => d.Mapper)
                    .WithMany(p => p.TblMapperDetails)
                    .HasForeignKey(d => d.MapperId)
                    .HasConstraintName("FK_tblMappertblMapperDetails");
            });
        }
    }
}
