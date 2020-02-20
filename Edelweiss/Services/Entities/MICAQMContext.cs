using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MicaExtension_EGI.Entities
{
    public partial class MICAQMContext : DbContext
    {
        public MICAQMContext()
        {
        }

        public MICAQMContext(DbContextOptions<MICAQMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblDailyActiveVehicles> TblDailyActiveVehicles { get; set; }
        public virtual DbSet<TblMasCity> TblMasCity { get; set; }
        public virtual DbSet<TblMasState> TblMasState { get; set; }
        public virtual DbSet<TblPayment> TblPayment { get; set; }
        public virtual DbSet<TblPremiumBookingLog> TblPremiumBookingLog { get; set; }
        public virtual DbSet<TblQuotation> TblQuotation { get; set; }
        public virtual DbSet<TblSchedule> TblSchedule { get; set; }
        public virtual DbSet<TblScheduleReport> TblScheduleReport { get; set; }
        public virtual DbSet<TblSchedulerLog> TblSchedulerLog { get; set; }
        public virtual DbSet<TblSendOtp> TblSendOtp { get; set; }
        public virtual DbSet<TblSwitchLog> TblSwitchLog { get; set; }
        public virtual DbSet<TblSwitchStatus> TblSwitchStatus { get; set; }
        public virtual DbSet<TblVehicleDetails> TblVehicleDetails { get; set; }
        public virtual DbSet<TblVehicleDetailsData> TblVehicleDetailsData { get; set; }

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

            modelBuilder.Entity<TblDailyActiveVehicles>(entity =>
            {
                entity.HasKey(e => e.ActiveId)
                    .HasName("PK__tblDaily__6949E34D248510D8");

                entity.ToTable("tblDailyActiveVehicles", "QM");

                entity.Property(e => e.ActiveId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ActivePc)
                    .HasColumnName("ActivePC")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ActiveTw)
                    .HasColumnName("ActiveTW")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Premium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TxnDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblMasCity>(entity =>
            {
                entity.HasKey(e => e.CityId)
                    .HasName("PK_tblMasCity_2");

                entity.ToTable("tblMasCity", "QM");

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.CityCode).HasMaxLength(50);

                entity.Property(e => e.CityName).HasMaxLength(50);

                entity.Property(e => e.ExternalRefCode).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(50);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Pincode).HasMaxLength(50);

                entity.Property(e => e.StateId).HasColumnName("StateID");

                entity.Property(e => e.Type).HasMaxLength(50);

                entity.HasOne(d => d.State)
                    .WithMany(p => p.TblMasCity)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK_tblMasCity_tblMasState");
            });

            modelBuilder.Entity<TblMasState>(entity =>
            {
                entity.HasKey(e => e.StateId)
                    .HasName("PK_tblMasState_2");

                entity.ToTable("tblMasState", "QM");

                entity.Property(e => e.StateId)
                    .HasColumnName("StateID")
                    .ValueGeneratedNever();

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.StateAbbreviation).HasMaxLength(50);

                entity.Property(e => e.StateCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StateName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.StateType).HasMaxLength(50);
            });

            modelBuilder.Entity<TblPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentId);

                entity.ToTable("tblPayment", "QM");

                entity.Property(e => e.PaymentId)
                    .HasColumnName("PaymentID")
                    .HasColumnType("decimal(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.PaymentAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.QuotationId)
                    .HasColumnName("QuotationID")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TransactionReferenceNumber).HasMaxLength(50);
            });

            modelBuilder.Entity<TblPremiumBookingLog>(entity =>
            {
                entity.HasKey(e => e.LogId)
                    .HasName("PK__TblPremi__5E548648C3174030");

                entity.ToTable("TblPremiumBookingLog", "QM");

                entity.Property(e => e.TxnAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TxnDateTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblQuotation>(entity =>
            {
                entity.HasKey(e => e.QuoteId);

                entity.ToTable("tblQuotation", "QM");

                entity.Property(e => e.QuoteId)
                    .HasColumnName("QuoteID")
                    .HasColumnType("decimal(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Age).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.Experience).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Frequency)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Mobileno)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NumberOfDrivers).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NumberOfVehicle).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Premium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.PrimaryDriverName).HasMaxLength(50);

                entity.Property(e => e.QuotationNumber)
                    .IsUnicode(false)
                    .HasComputedColumnSql("('Q'+CONVERT([varchar](max),[QuoteID]))");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.SumInsured).HasMaxLength(50);

                entity.Property(e => e.VehicleAge)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.VehicleMakeModelId)
                    .HasColumnName("VehicleMakeModelID")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TblSchedule>(entity =>
            {
                entity.HasKey(e => e.ScheduleId)
                    .HasName("PK__TblSched__9C8A5B49393445C7");

                entity.ToTable("TblSchedule", "QM");

                entity.Property(e => e.ScheduleId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifyCount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.VehicleMasId).HasColumnName("VehicleMasID");

                entity.Property(e => e.VehicleType)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.HasOne(d => d.VehicleMas)
                    .WithMany(p => p.TblSchedule)
                    .HasForeignKey(d => d.VehicleMasId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblSchedule_tblVehicleDetails");
            });

            modelBuilder.Entity<TblScheduleReport>(entity =>
            {
                entity.HasKey(e => e.ReportId)
                    .HasName("PK__tblSched__D5BD48059CBE32DE");

                entity.ToTable("tblScheduleReport", "QM");

                entity.Property(e => e.ReportId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.FailCount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ScheduleEndDate).HasColumnType("datetime");

                entity.Property(e => e.ScheduleStartDate).HasColumnType("datetime");

                entity.Property(e => e.SuccessCount).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<TblSchedulerLog>(entity =>
            {
                entity.HasKey(e => e.LogId)
                    .HasName("PK__TblSched__5E5486481147DB3B");

                entity.ToTable("TblSchedulerLog", "QM");

                entity.Property(e => e.ScheduleId)
                    .HasColumnName("ScheduleID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SchedulerDateTime).HasColumnType("datetime");

                entity.Property(e => e.SchedulerEndDateTime).HasColumnType("datetime");

                entity.Property(e => e.SchedulerStatus).HasMaxLength(100);

                entity.HasOne(d => d.Schedule)
                    .WithMany(p => p.TblSchedulerLog)
                    .HasForeignKey(d => d.ScheduleId)
                    .HasConstraintName("FK_tblSchedulerLog_tblSchedule");
            });

            modelBuilder.Entity<TblSendOtp>(entity =>
            {
                entity.ToTable("tblSendOTP", "QM");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ContactNumber).HasMaxLength(20);

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.Otp)
                    .HasColumnName("OTP")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TblSwitchLog>(entity =>
            {
                entity.HasKey(e => e.LogId)
                    .HasName("PK__tblSwitc__5E548648AE93CB49");

                entity.ToTable("tblSwitchLog", "QM");

                entity.Property(e => e.LogId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblSwitchStatus>(entity =>
            {
                entity.HasKey(e => e.SwitchId)
                    .HasName("PK__tblSwitc__829FE145B6BC0A1D");

                entity.ToTable("tblSwitchStatus", "QM");

                entity.Property(e => e.SwitchId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblVehicleDetails>(entity =>
            {
                entity.HasKey(e => e.VehicleId)
                    .HasName("PK_tblVehicleDetails_1");

                entity.ToTable("tblVehicleDetails", "QM");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.VehicleImage).HasColumnType("image");

                entity.Property(e => e.VehicleModel)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.VehicleType)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblVehicleDetailsData>(entity =>
            {
                entity.HasKey(e => e.VehicleDetailsDataId)
                    .HasName("PK__VehicleD__152742F0AF903CB6");

                entity.ToTable("tblVehicleDetailsData", "QM");

                entity.Property(e => e.VehicleDetailsDataId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AgeOfVehicle).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.SumInsured).HasColumnType("decimal(18, 0)");
            });
        }
    }
}
