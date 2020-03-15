using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Claims.Entities
{
    public partial class MICACMContext : DbContext
    {
        public MICACMContext()
        {
        }

        public MICACMContext(DbContextOptions<MICACMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblBank> TblBank { get; set; }
        public virtual DbSet<TblBankAccounts> TblBankAccounts { get; set; }
        public virtual DbSet<TblBankDocument> TblBankDocument { get; set; }
        public virtual DbSet<TblBankFile> TblBankFile { get; set; }
        public virtual DbSet<TblClaim> TblClaim { get; set; }
        public virtual DbSet<TblClaimAllocationDetails> TblClaimAllocationDetails { get; set; }
        public virtual DbSet<TblClaimDetails> TblClaimDetails { get; set; }
        public virtual DbSet<TblClaimHistory> TblClaimHistory { get; set; }
        public virtual DbSet<TblClaimInsurable> TblClaimInsurable { get; set; }
        public virtual DbSet<TblClaimTransaction> TblClaimTransaction { get; set; }
        public virtual DbSet<TblClaimTransactionNew> TblClaimTransactionNew { get; set; }
        public virtual DbSet<TblClaimdoc> TblClaimdoc { get; set; }
        public virtual DbSet<TblClaims> TblClaims { get; set; }
        public virtual DbSet<TblPayment> TblPayment { get; set; }
        public virtual DbSet<TblmasCmcommonTypes> TblmasCmcommonTypes { get; set; }

        // Unable to generate entity type for table 'CM.tblBankFileArchive'. Please see the warning messages.

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

            modelBuilder.Entity<TblBank>(entity =>
            {
                entity.HasKey(e => e.BankId);

                entity.ToTable("tblBank", "CM");

                entity.Property(e => e.AccountHolderName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AccountNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.BankBranchAddress)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BankName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Ifsccode)
                    .HasColumnName("IFSCCode")
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblBankAccounts>(entity =>
            {
                entity.HasKey(e => e.BankId);

                entity.ToTable("tblBankAccounts", "CM");

                entity.Property(e => e.AccountHolderName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AccountNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.BankBranchAddress)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BankName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Ifsccode)
                    .HasColumnName("IFSCCode")
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.HasOne(d => d.AccountTypeNavigation)
                    .WithMany(p => p.TblBankAccountsAccountTypeNavigation)
                    .HasForeignKey(d => d.AccountType)
                    .HasConstraintName("FK__tblBankAc__Accou__150615B5");

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblBankAccounts)
                    .HasForeignKey(d => d.ClaimId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblBankAccounts_tblClaims");

                entity.HasOne(d => d.PayeeType)
                    .WithMany(p => p.TblBankAccountsPayeeType)
                    .HasForeignKey(d => d.PayeeTypeId)
                    .HasConstraintName("FK__tblBankAc__Payee__15FA39EE");
            });

            modelBuilder.Entity<TblBankDocument>(entity =>
            {
                entity.HasKey(e => e.BankDocId);

                entity.ToTable("tblBankDocument", "CM");

                entity.Property(e => e.BankDocId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateTimeOfProcessing).HasColumnType("datetime");

                entity.Property(e => e.DocFileName).HasMaxLength(100);
            });

            modelBuilder.Entity<TblBankFile>(entity =>
            {
                entity.HasKey(e => e.BankFileId);

                entity.ToTable("tblBankFile", "CM");

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.BankAccountHolderName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BankAccountNumber)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BankBranchAddress)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BankDocId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.BankIfsccode)
                    .IsRequired()
                    .HasColumnName("BankIFSCCode")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BankName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ClaimNo)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ClaimStatus)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FailedReason).HasMaxLength(255);

                entity.Property(e => e.InsuredName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsuredRefNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentDate)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentStatus)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyNo)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Utrno)
                    .IsRequired()
                    .HasColumnName("UTRNo")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblClaim>(entity =>
            {
                entity.HasKey(e => e.ClaimId);

                entity.ToTable("tblClaim", "CM");

                entity.Property(e => e.ClaimId)
                    .HasColumnName("ClaimID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AreaId).HasColumnName("AreaID");

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.ClaimStatus).HasMaxLength(100);

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CreatedDateTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DistrictId).HasColumnName("DistrictID");

                entity.Property(e => e.DlauthorizedToDriveId).HasColumnName("DLAuthorizedToDriveID");

                entity.Property(e => e.DriverDob)
                    .HasColumnName("DriverDOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.DriverLicenseExpiryDateTime).HasColumnType("datetime");

                entity.Property(e => e.DriverLicenseNo)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.DriverName)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.DriverOfTheVehicleId).HasColumnName("DriverOfTheVehicleID");

                entity.Property(e => e.DriverQualificationId).HasColumnName("DriverQualificationID");

                entity.Property(e => e.Email)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.EventId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FathersName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirdateTime)
                    .HasColumnName("FIRDateTime")
                    .HasColumnType("datetime");

                entity.Property(e => e.Firno)
                    .HasColumnName("FIRNo")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FitnessValidUpTo).HasColumnType("datetime");

                entity.Property(e => e.Fnol)
                    .HasColumnName("FNOL")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IncidentDateTime).HasColumnType("datetime");

                entity.Property(e => e.IncidentLocation)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.IntimationById).HasColumnName("IntimationByID");

                entity.Property(e => e.IntimationModeId).HasColumnName("IntimationModeID");

                entity.Property(e => e.IsAnyOtherVehicleInAccident).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsAnyWitness).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsFir)
                    .HasColumnName("IsFIR")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.IsValid).HasDefaultValueSql("((1))");

                entity.Property(e => e.IsVehicleParked).HasDefaultValueSql("((0))");

                entity.Property(e => e.MobileNumber)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDateTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NameOfPoliceStation)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NatureOfGoodsCarried)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.NatureOfPermit)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PassengersCarried).HasColumnType("numeric(10, 0)");

                entity.Property(e => e.PermitValidForAreas)
                    .HasMaxLength(5000)
                    .IsUnicode(false);

                entity.Property(e => e.PermitValidUpTo).HasColumnType("datetime");

                entity.Property(e => e.PolicyDetailsId)
                    .HasColumnName("PolicyDetailsID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ProductId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PurposeOfTravelId).HasColumnName("PurposeOfTravelID");

                entity.Property(e => e.RegisteredLadenWeightKg)
                    .HasColumnName("RegisteredLadenWeight_KG")
                    .HasColumnType("numeric(10, 0)");

                entity.Property(e => e.RegisteredPassengerCarryingCapacity).HasColumnType("numeric(10, 0)");

                entity.Property(e => e.RegisteredUnLadenWeightKg)
                    .HasColumnName("RegisteredUnLadenWeight_KG")
                    .HasColumnType("numeric(10, 0)");

                entity.Property(e => e.RoadTypeId).HasColumnName("RoadTypeID");

                entity.Property(e => e.RtodetailId).HasColumnName("RTODetailID");

                entity.Property(e => e.StateId).HasColumnName("StateID");

                entity.Property(e => e.TypeOfGoodsCarried)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.TypeOfPermit)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.WeatherCondition)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.WeightOfGoodsCarriedKg)
                    .HasColumnName("WeightOfGoodsCarried_KG")
                    .HasColumnType("numeric(10, 0)");
            });

            modelBuilder.Entity<TblClaimAllocationDetails>(entity =>
            {
                entity.HasKey(e => e.AllocationId)
                    .HasName("PK__tblClaim__B3C6D64B31DF7BAE");

                entity.ToTable("tblClaimAllocationDetails", "CM");

                entity.Property(e => e.AllocatedTo).HasMaxLength(100);

                entity.Property(e => e.AllocationType).HasMaxLength(50);

                entity.Property(e => e.EmailId).HasMaxLength(200);

                entity.Property(e => e.MobileNumber).HasMaxLength(100);

                entity.Property(e => e.StepId).HasMaxLength(150);

                entity.Property(e => e.WorkFlowId).HasMaxLength(100);

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblClaimAllocationDetails)
                    .HasForeignKey(d => d.ClaimId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblClaimA__Claim__76818E95");
            });

            modelBuilder.Entity<TblClaimDetails>(entity =>
            {
                entity.HasKey(e => e.ClaimDetailsId)
                    .HasName("Pk_tblClaimDetails");

                entity.ToTable("tblClaimDetails", "CM");

                entity.Property(e => e.ClaimDetailsId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BeneficiaryName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LocationOfloss)
                    .HasColumnName("LocationOFLoss")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LossDate).HasColumnType("datetime");

                entity.Property(e => e.LossDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MobileNumber)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblClaimDetails)
                    .HasForeignKey(d => d.ClaimId)
                    .HasConstraintName("FK_tblClaimDetails_tblClaims");
            });

            modelBuilder.Entity<TblClaimHistory>(entity =>
            {
                entity.HasKey(e => e.ClaimHistoryId);

                entity.ToTable("tblClaimHistory", "CM");

                entity.Property(e => e.ClaimManagerRemarks)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ClaimNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LocationOfEvent)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LossDateTime).HasColumnType("datetime");

                entity.Property(e => e.LossOfDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OrgId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PartnerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblClaimHistory)
                    .HasForeignKey(d => d.ClaimId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblClaimHistory");

                entity.HasOne(d => d.ClaimStatus)
                    .WithMany(p => p.TblClaimHistory)
                    .HasForeignKey(d => d.ClaimStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblClaimHistory_ClaimStatusId");
            });

            modelBuilder.Entity<TblClaimInsurable>(entity =>
            {
                entity.HasKey(e => e.ClaimInsurableId)
                    .HasName("PK__tblClaim__06DF1734326BC8A3");

                entity.ToTable("tblClaimInsurable", "CM");

                entity.Property(e => e.ApprovedClaimAmounts).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.BenefitAmount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ClaimAmounts).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CoverValue)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IdentificationNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsurableItem)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TypeOfLoss)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblClaimInsurable)
                    .HasForeignKey(d => d.ClaimId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblClaimInsurable_tblClaims");
            });

            modelBuilder.Entity<TblClaimTransaction>(entity =>
            {
                entity.HasKey(e => e.TransactionId);

                entity.ToTable("tblClaimTransaction", "CM");

                entity.Property(e => e.TransactionId)
                    .HasColumnName("TransactionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccidentFactor)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AccidentFactorDescription)
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.ActionId).HasColumnName("ActionID");

                entity.Property(e => e.AdvanceAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ApprovedAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ApproximateEstimatedCost).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.CauseOfLossId).HasColumnName("CauseOfLossID");

                entity.Property(e => e.ClaimId)
                    .HasColumnName("ClaimID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ClaimServiceTypeId).HasColumnName("ClaimServiceTypeID");

                entity.Property(e => e.ClaimTypeId).HasColumnName("ClaimTypeID");

                entity.Property(e => e.CloseReasonIds)
                    .HasColumnName("CloseReasonIDs")
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDateTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.EmergencyContact)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.EmergencyEmail)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.InternalRemark).IsUnicode(false);

                entity.Property(e => e.IsBackByManager).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsInvestigatorAssign).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsReOpen).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsRead).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsRoadSideAssistance).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsServeyorAssign).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsValid).HasDefaultValueSql("((1))");

                entity.Property(e => e.IsWorkshopAssign).HasDefaultValueSql("((0))");

                entity.Property(e => e.ModifiedDateTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Occurrence)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.QueryReasonIds)
                    .HasColumnName("QueryReasonIDs")
                    .IsUnicode(false);

                entity.Property(e => e.RejectionReasonIds)
                    .HasColumnName("RejectionReasonIDs")
                    .IsUnicode(false);

                entity.Property(e => e.Remark).IsUnicode(false);

                entity.Property(e => e.ReopenReasonIds)
                    .HasColumnName("ReopenReasonIDs")
                    .IsUnicode(false);

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblClaimTransaction)
                    .HasForeignKey(d => d.ClaimId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<TblClaimTransactionNew>(entity =>
            {
                entity.HasKey(e => e.ClaimTransId);

                entity.ToTable("tblClaimTransactionNew", "CM");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LocationOfEvent)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LossDate).HasColumnType("datetime");

                entity.Property(e => e.LossOfDescription)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LossTime).HasColumnType("datetime");

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.TblClaimTransactionNew)
                    .HasForeignKey(d => d.BankId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblClaimT__BankI__025D5595");

                entity.HasOne(d => d.ClaimDoc)
                    .WithMany(p => p.TblClaimTransactionNew)
                    .HasForeignKey(d => d.ClaimDocId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblClaimT__Claim__035179CE");

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblClaimTransactionNew)
                    .HasForeignKey(d => d.ClaimId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblClaimT__Claim__55209ACA");

                entity.HasOne(d => d.Loss)
                    .WithMany(p => p.TblClaimTransactionNew)
                    .HasForeignKey(d => d.LossId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Payment)
                    .WithMany(p => p.TblClaimTransactionNew)
                    .HasForeignKey(d => d.PaymentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblClaimT__Payme__0539C240");
            });

            modelBuilder.Entity<TblClaimdoc>(entity =>
            {
                entity.HasKey(e => e.ClaimDocId)
                    .HasName("PK_tblClaimDoc");

                entity.ToTable("tblClaimdoc", "CM");

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DmsdocId)
                    .HasColumnName("DMSdocId")
                    .HasMaxLength(250);

                entity.Property(e => e.DocumentName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DocumentType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.UploadDate).HasColumnType("datetime");

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblClaimdoc)
                    .HasForeignKey(d => d.ClaimId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblClaimdoc_tblClaims");
            });

            modelBuilder.Entity<TblClaims>(entity =>
            {
                entity.HasKey(e => e.ClaimId);

                entity.ToTable("tblClaims", "CM");

                entity.Property(e => e.ClaimManagerRemarks)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ClaimNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.LocationOfEvent)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.LossDateTime).HasColumnType("datetime");

                entity.Property(e => e.LossOfDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PartnerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductIdPk).HasColumnName("Product_ID_PK");

                entity.HasOne(d => d.ClaimStatus)
                    .WithMany(p => p.TblClaimsClaimStatus)
                    .HasForeignKey(d => d.ClaimStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Loss)
                    .WithMany(p => p.TblClaimsLoss)
                    .HasForeignKey(d => d.LossId);
            });

            modelBuilder.Entity<TblPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentId)
                    .HasName("PK_Payment");

                entity.ToTable("tblPayment", "CM");

                entity.Property(e => e.ClaimNo).HasMaxLength(100);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.PaymentDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentStatus)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Utrno)
                    .HasColumnName("UTRNo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Claim)
                    .WithMany(p => p.TblPayment)
                    .HasForeignKey(d => d.ClaimId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblPayment_tblClaims");
            });

            modelBuilder.Entity<TblmasCmcommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId)
                    .HasName("PK__tblmasCM__40508372AED6FF74");

                entity.ToTable("tblmasCMCommonTypes", "CM");

                entity.Property(e => e.CommonTypeId).ValueGeneratedNever();

                entity.Property(e => e.MasterType).HasMaxLength(100);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(200);
            });
        }
    }
}
