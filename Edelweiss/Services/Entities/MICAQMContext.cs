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

        public virtual DbSet<TblBatchJobDetailsLog> TblBatchJobDetailsLog { get; set; }
        public virtual DbSet<TblBatchJobLog> TblBatchJobLog { get; set; }
        public virtual DbSet<TblDailyActiveVehicles> TblDailyActiveVehicles { get; set; }
        public virtual DbSet<TblMasCity> TblMasCity { get; set; }
        public virtual DbSet<TblMasState> TblMasState { get; set; }
        public virtual DbSet<TblMonthlyBalance> TblMonthlyBalance { get; set; }
        public virtual DbSet<TblPayment> TblPayment { get; set; }
        public virtual DbSet<TblPolicyMonthlySi> TblPolicyMonthlySi { get; set; }
        public virtual DbSet<TblPolicyStatus> TblPolicyStatus { get; set; }
        public virtual DbSet<TblPremiumBookingLog> TblPremiumBookingLog { get; set; }
        public virtual DbSet<TblQuotation> TblQuotation { get; set; }
        public virtual DbSet<TblSchedule> TblSchedule { get; set; }
        public virtual DbSet<TblScheduleReport> TblScheduleReport { get; set; }
        public virtual DbSet<TblSchedulerLog> TblSchedulerLog { get; set; }
        public virtual DbSet<TblSendOtp> TblSendOtp { get; set; }
        public virtual DbSet<TblSiexception> TblSiexception { get; set; }
        public virtual DbSet<TblSwitchLog> TblSwitchLog { get; set; }
        public virtual DbSet<TblSwitchStatus> TblSwitchStatus { get; set; }
        public virtual DbSet<TblVehicleDetails> TblVehicleDetails { get; set; }
        public virtual DbSet<TblVehicleDetailsData> TblVehicleDetailsData { get; set; }

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
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<TblBatchJobDetailsLog>(entity =>
            {
                entity.HasKey(e => e.BatchDetailLogId)
                    .HasName("PK__TblBatch__BF81F62F01625E41");

                entity.ToTable("TblBatchJobDetailsLog", "QM");

                entity.Property(e => e.BatchDetailLogId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BatchLogId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TxnEndDateTime).HasColumnType("datetime");

                entity.Property(e => e.TxnStartDateTime).HasColumnType("datetime");

                entity.HasOne(d => d.BatchLog)
                    .WithMany(p => p.TblBatchJobDetailsLog)
                    .HasForeignKey(d => d.BatchLogId)
                    .HasConstraintName("FK__TblBatchJ__Batch__45A94D10");
            });

            modelBuilder.Entity<TblBatchJobLog>(entity =>
            {
                entity.HasKey(e => e.BatchLogId)
                    .HasName("PK__TblBatch__5927836E368B5FB3");

                entity.ToTable("TblBatchJobLog", "QM");

                entity.Property(e => e.BatchLogId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BatchMode)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.BatchName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.EndDateTime).HasColumnType("datetime");

                entity.Property(e => e.StartDateTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblDailyActiveVehicles>(entity =>
            {
                entity.HasKey(e => e.ActiveId)
                    .HasName("PK__tblDaily__6949E34D7D2F2453");

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

                entity.Property(e => e.BasePremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.FromTax).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ToTax).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TotalPremium).HasColumnType("numeric(18, 2)");

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

            modelBuilder.Entity<TblMonthlyBalance>(entity =>
            {
                entity.HasKey(e => e.AutoId)
                    .HasName("PK__TblMonth__6B232905D1D034C5");

                entity.ToTable("TblMonthlyBalance", "QM");

                entity.Property(e => e.AutoId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Balance).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.BalanceDate).HasColumnType("datetime");

                entity.Property(e => e.Month).HasMaxLength(15);
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

            modelBuilder.Entity<TblPolicyMonthlySi>(entity =>
            {
                entity.HasKey(e => e.ReportId)
                    .HasName("PK__TblPolic__D5BD4805588E7418");

                entity.ToTable("TblPolicyMonthlySI", "QM");

                entity.Property(e => e.Amount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.DueDate).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.GstOnPremiumChargeable).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.InsuredName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PayAmount).IsUnicode(false);

                entity.Property(e => e.PayStatus).IsUnicode(false);

                entity.Property(e => e.PayUid).IsUnicode(false);

                entity.Property(e => e.PaymentDate).HasColumnType("datetime");

                entity.Property(e => e.PerDayPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PremiumChargeable).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ReportCreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Source)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TotalAmountChargeable).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.UserCredentials)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblPolicyStatus>(entity =>
            {
                entity.ToTable("TblPolicyStatus", "QM");

                entity.Property(e => e.TxnDateTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblPremiumBookingLog>(entity =>
            {
                entity.HasKey(e => e.LogId)
                    .HasName("PK__TblPremi__5E548648443CE55B");

                entity.ToTable("TblPremiumBookingLog", "QM");

                entity.Property(e => e.BasePremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.FromTax).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ToTax).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TxnAmount).HasColumnType("numeric(18, 2)");

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
                    .HasName("PK__TblSched__9C8A5B49FA133F52");

                entity.ToTable("TblSchedule", "QM");

                entity.Property(e => e.ScheduleId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifyCount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyNo).IsRequired();

                entity.Property(e => e.VehicleRegistrationNo).IsRequired();

                entity.Property(e => e.VehicleType).IsRequired();
            });

            modelBuilder.Entity<TblScheduleReport>(entity =>
            {
                entity.HasKey(e => e.ReportId)
                    .HasName("PK__tblSched__D5BD48055E75A757");

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
                    .HasName("PK__TblSched__5E548648D8DE4672");

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

            modelBuilder.Entity<TblSiexception>(entity =>
            {
                entity.HasKey(e => e.ExceptionId)
                    .HasName("PK__TblSIExc__26981D88E44F22A6");

                entity.ToTable("TblSIException", "QM");

                entity.Property(e => e.ExceptionId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DifferenceAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PaidAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.PaymentDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentReferenceId)
                    .HasColumnName("PaymentReferenceID")
                    .IsUnicode(false);

                entity.Property(e => e.RequestAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Source).HasMaxLength(50);

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.TblSiexception)
                    .HasForeignKey(d => d.ReportId)
                    .HasConstraintName("FK__TblSIExce__Repor__3C1FE2D6");
            });

            modelBuilder.Entity<TblSwitchLog>(entity =>
            {
                entity.HasKey(e => e.LogId)
                    .HasName("PK__tblSwitc__5E5486481D77CB8B");

                entity.ToTable("tblSwitchLog", "QM");

                entity.Property(e => e.LogId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblSwitchStatus>(entity =>
            {
                entity.HasKey(e => e.SwitchId)
                    .HasName("PK__tblSwitc__829FE14517271D20");

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
                    .HasName("PK__tblVehic__152742F00C16C3DC");

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
