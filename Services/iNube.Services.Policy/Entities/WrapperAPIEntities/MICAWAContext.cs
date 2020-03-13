using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Policy.Entities.WrapperAPIEntities
{
    public partial class MICAWAContext : DbContext
    {
        public MICAWAContext()
        {
        }



        public MICAWAContext(DbContextOptions<MICAWAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblWrapperApiConfig> TblWrapperApiConfig { get; set; }
        public virtual DbSet<TblWrapperApiParams> TblWrapperApiParams { get; set; }

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

            modelBuilder.Entity<TblWrapperApiConfig>(entity =>
            {
                entity.HasKey(e => e.WrapperApiId)
                    .HasName("PK__tblWrapp__7E46E6C073CB2F95");

                entity.ToTable("tblWrapperApiConfig", "WA");

                entity.Property(e => e.WrapperApiId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.WrapperApiName).HasMaxLength(100);
            });

            modelBuilder.Entity<TblWrapperApiParams>(entity =>
            {
                entity.HasKey(e => e.WrapperParamId)
                    .HasName("PK__tblWrapp__5DDF2D82A413782D");

                entity.ToTable("tblWrapperApiParams", "WA");

                entity.Property(e => e.WrapperParamId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.InputParameters).HasMaxLength(100);

                entity.Property(e => e.OutputParameters).HasMaxLength(100);

                entity.Property(e => e.WrapperApiId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.WrapperApi)
                    .WithMany(p => p.TblWrapperApiParams)
                    .HasForeignKey(d => d.WrapperApiId)
                    .HasConstraintName("FK_tblWrapperApiParams_tblWrapperApiConfig");
            });
        }
    }
}

