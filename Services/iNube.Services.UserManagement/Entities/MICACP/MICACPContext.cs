using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.UserManagement.Entities.MICACP
{
    public partial class MICACPContext : DbContext
    {
        public MICACPContext()
        {
        }

        public MICACPContext(DbContextOptions<MICACPContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblCustomerEnvironment> TblCustomerEnvironment { get; set; }
        public virtual DbSet<TblCustomerSettings> TblCustomerSettings { get; set; }
        public virtual DbSet<TblCustomerUsers> TblCustomerUsers { get; set; }
        public virtual DbSet<TblmasCpcommonTypes> TblmasCpcommonTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=edelweissdb1.coow0ess1gft.ap-south-1.rds.amazonaws.com,1433;Database=iNubeCommon;User ID=admin;Password=micaadmin;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<TblCustomerEnvironment>(entity =>
            {
                entity.ToTable("tblCustomerEnvironment", "CP");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Dbconnection)
                    .HasColumnName("DBConnection")
                    .HasMaxLength(250);

                entity.Property(e => e.EnvName).HasMaxLength(250);

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.Product).HasMaxLength(250);
            });

            modelBuilder.Entity<TblCustomerSettings>(entity =>
            {
                entity.ToTable("tblCustomerSettings", "CP");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EnvId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.Key).HasMaxLength(250);

                entity.Property(e => e.KeyValue).HasMaxLength(250);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Type).HasMaxLength(250);

                entity.HasOne(d => d.Env)
                    .WithMany(p => p.TblCustomerSettings)
                    .HasForeignKey(d => d.EnvId)
                    .HasConstraintName("FK_tblCustomerSettings_tblCustomerEnvironment");
            });

            modelBuilder.Entity<TblCustomerUsers>(entity =>
            {
                entity.ToTable("tblCustomerUsers", "CP");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ContactNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.LoginProvider).HasMaxLength(250);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .HasColumnName("userId")
                    .HasMaxLength(250);

                entity.Property(e => e.UserName).HasMaxLength(250);

                entity.Property(e => e.UserType).HasMaxLength(250);
            });

            modelBuilder.Entity<TblmasCpcommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId)
                    .HasName("PK__tblmasCP__405083722D74C8DD");

                entity.ToTable("tblmasCPCommonTypes", "CP");

                entity.Property(e => e.CommonTypeId).ValueGeneratedNever();

                entity.Property(e => e.MasterType).HasMaxLength(100);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(200);
            });
        }
    }
}
