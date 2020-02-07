using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class MICARIContext : DbContext
    {
        public MICARIContext()
        {
        }

        public MICARIContext(DbContextOptions<MICARIContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblArrangement> TblArrangement { get; set; }
        public virtual DbSet<TblMasCity> TblMasCity { get; set; }
        public virtual DbSet<TblMasCountry> TblMasCountry { get; set; }
        public virtual DbSet<TblMasDistrict> TblMasDistrict { get; set; }
        public virtual DbSet<TblMasPinCode> TblMasPinCode { get; set; }
        public virtual DbSet<TblMasRicommonTypes> TblMasRicommonTypes { get; set; }
        public virtual DbSet<TblMasState> TblMasState { get; set; }
        public virtual DbSet<TblMasYear> TblMasYear { get; set; }
        public virtual DbSet<TblParticipant> TblParticipant { get; set; }
        public virtual DbSet<TblParticipantBranch> TblParticipantBranch { get; set; }
        public virtual DbSet<TblParticipantMaster> TblParticipantMaster { get; set; }
        public virtual DbSet<TblRetentionGroup> TblRetentionGroup { get; set; }
        public virtual DbSet<TblRimapping> TblRimapping { get; set; }
        public virtual DbSet<TblRimappingDetail> TblRimappingDetail { get; set; }
        public virtual DbSet<TblTreaty> TblTreaty { get; set; }
        public virtual DbSet<TblTreatyGroup> TblTreatyGroup { get; set; }

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

            modelBuilder.Entity<TblArrangement>(entity =>
            {
                entity.HasKey(e => e.ArrangementId);

                entity.ToTable("TblArrangement", "RI");

                entity.Property(e => e.ArrangementId)
                    .HasColumnName("ArrangementID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AllocationBasisId).HasColumnName("AllocationBasisID");

                entity.Property(e => e.AllocationLogicId).HasColumnName("AllocationLogicID");

                entity.Property(e => e.AllocationOnId).HasColumnName("AllocationOnID");

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Cla)
                    .HasColumnName("CLA")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.HigherOrLowerId).HasColumnName("HigherOrLowerID");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Pla)
                    .HasColumnName("PLA")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TreatyGroupId)
                    .HasColumnName("TreatyGroupID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.TreatyGroup)
                    .WithMany(p => p.TblArrangement)
                    .HasForeignKey(d => d.TreatyGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TreatyGroupArrangement");
            });

            modelBuilder.Entity<TblMasCity>(entity =>
            {
                entity.HasKey(e => e.CityId)
                    .HasName("PK_tblMasCity_1");

                entity.ToTable("tblMasCity", "RI");

                entity.Property(e => e.CityId)
                    .HasColumnName("CityID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CityCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CityName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.DistrictId).HasColumnName("DistrictID");

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.District)
                    .WithMany(p => p.TblMasCity)
                    .HasForeignKey(d => d.DistrictId)
                    .HasConstraintName("FK_tblMasCity_tblMasDistrict");
            });

            modelBuilder.Entity<TblMasCountry>(entity =>
            {
                entity.HasKey(e => e.CountryId)
                    .HasName("PK_tblMasCountry_1");

                entity.ToTable("tblMasCountry", "RI");

                entity.Property(e => e.CountryId)
                    .HasColumnName("CountryID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CountryCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CountryName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblMasDistrict>(entity =>
            {
                entity.HasKey(e => e.DistrictId)
                    .HasName("PK_tblMasDistrict_1");

                entity.ToTable("tblMasDistrict", "RI");

                entity.Property(e => e.DistrictId)
                    .HasColumnName("DistrictID")
                    .ValueGeneratedNever();

                entity.Property(e => e.DistrictCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DistrictName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.StateId).HasColumnName("StateID");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.TblMasDistrict)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK_tblMasDistrict_tblMasState");
            });

            modelBuilder.Entity<TblMasPinCode>(entity =>
            {
                entity.HasKey(e => e.PincodeId)
                    .HasName("PK_tblMasPinCode_1");

                entity.ToTable("tblMasPinCode", "RI");

                entity.Property(e => e.PincodeId)
                    .HasColumnName("PincodeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AreaName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.TblMasPinCode)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("FK_tblMasPinCode_tblMasCity");
            });

            modelBuilder.Entity<TblMasRicommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId);

                entity.ToTable("TblMasRICommonTypes", "RI");

                entity.Property(e => e.CommonTypeId)
                    .HasColumnName("CommonTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<TblMasState>(entity =>
            {
                entity.HasKey(e => e.StateId)
                    .HasName("PK_tblMasState_1");

                entity.ToTable("tblMasState", "RI");

                entity.Property(e => e.StateId)
                    .HasColumnName("StateID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.ExternalRefCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.StateCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StateName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.TblMasState)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_tblMasState_tblMasCountry");
            });

            modelBuilder.Entity<TblMasYear>(entity =>
            {
                entity.HasKey(e => e.YearId);

                entity.ToTable("tblMasYear", "RI");

                entity.Property(e => e.YearId)
                    .HasColumnName("YearID")
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<TblParticipant>(entity =>
            {
                entity.HasKey(e => e.ParticipantId);

                entity.ToTable("TblParticipant", "RI");

                entity.Property(e => e.ParticipantId)
                    .HasColumnName("ParticipantID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BordereauxFreqId).HasColumnName("BordereauxFreqID");

                entity.Property(e => e.BrokerBranchId)
                    .HasColumnName("BrokerBranchID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.BrokerId)
                    .HasColumnName("BrokerID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ReInsurerBranchId)
                    .HasColumnName("ReInsurerBranchID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ReInsurerId)
                    .HasColumnName("ReInsurerID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RicommissionPercentage).HasColumnName("RICommissionPercentage");

                entity.Property(e => e.TreatyId)
                    .HasColumnName("TreatyID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.BrokerBranch)
                    .WithMany(p => p.TblParticipantBrokerBranch)
                    .HasForeignKey(d => d.BrokerBranchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BrokerBranch");

                entity.HasOne(d => d.Broker)
                    .WithMany(p => p.TblParticipantBroker)
                    .HasForeignKey(d => d.BrokerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParticipantBroker");

                entity.HasOne(d => d.ReInsurerBranch)
                    .WithMany(p => p.TblParticipantReInsurerBranch)
                    .HasForeignKey(d => d.ReInsurerBranchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ReInsurerBranch");

                entity.HasOne(d => d.ReInsurer)
                    .WithMany(p => p.TblParticipantReInsurer)
                    .HasForeignKey(d => d.ReInsurerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParticipantReInsurer");

                entity.HasOne(d => d.Treaty)
                    .WithMany(p => p.TblParticipant)
                    .HasForeignKey(d => d.TreatyId)
                    .HasConstraintName("FK_TreatyID");
            });

            modelBuilder.Entity<TblParticipantBranch>(entity =>
            {
                entity.HasKey(e => e.BranchId);

                entity.ToTable("TblParticipantBranch", "RI");

                entity.Property(e => e.BranchId)
                    .HasColumnName("BranchID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BranchCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.BranchName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BranchSpocemailId)
                    .HasColumnName("BranchSPOCEmailID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ParticipantMasterId)
                    .HasColumnName("ParticipantMasterID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.ParticipantMaster)
                    .WithMany(p => p.TblParticipantBranch)
                    .HasForeignKey(d => d.ParticipantMasterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParticipantBranch");
            });

            modelBuilder.Entity<TblParticipantMaster>(entity =>
            {
                entity.HasKey(e => e.ParticipantMasterId);

                entity.ToTable("TblParticipantMaster", "RI");

                entity.Property(e => e.ParticipantMasterId)
                    .HasColumnName("ParticipantMasterID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Address1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Address2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Address3)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.ContactNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DistrictId).HasColumnName("DistrictID");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ParticipantCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ParticipantName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ParticipantTypeId).HasColumnName("ParticipantTypeID");

                entity.Property(e => e.StateId).HasColumnName("StateID");
            });

            modelBuilder.Entity<TblRetentionGroup>(entity =>
            {
                entity.HasKey(e => e.RetentionGroupId);

                entity.ToTable("TblRetentionGroup", "RI");

                entity.Property(e => e.RetentionGroupId)
                    .HasColumnName("RetentionGroupID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BusinessTypeId).HasColumnName("BusinessTypeID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EffectiveFrom).HasColumnType("datetime");

                entity.Property(e => e.EffectiveTo).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Percentage).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.RetentionGroupName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RetentionLogicId).HasColumnName("RetentionLogicID");
            });

            modelBuilder.Entity<TblRimapping>(entity =>
            {
                entity.HasKey(e => e.RimappingId);

                entity.ToTable("TblRIMapping", "RI");

                entity.Property(e => e.RimappingId)
                    .HasColumnName("RIMappingID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Level)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.LobProductCover)
                    .HasColumnName("LOB/Product/Cover")
                    .HasMaxLength(100);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblRimappingDetail>(entity =>
            {
                entity.HasKey(e => e.RimappingDetailId);

                entity.ToTable("TblRIMappingDetail", "RI");

                entity.Property(e => e.RimappingDetailId)
                    .HasColumnName("RIMappingDetailID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.RetentionGroupId)
                    .HasColumnName("RetentionGroupID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RimappingId)
                    .HasColumnName("RIMappingID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RimappingTypeId).HasColumnName("RIMappingTypeID");

                entity.Property(e => e.TreatyGroupId)
                    .HasColumnName("TreatyGroupID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.RetentionGroup)
                    .WithMany(p => p.TblRimappingDetail)
                    .HasForeignKey(d => d.RetentionGroupId)
                    .HasConstraintName("FK_RetentionGroup");

                entity.HasOne(d => d.Rimapping)
                    .WithMany(p => p.TblRimappingDetail)
                    .HasForeignKey(d => d.RimappingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RIMappingDetail");

                entity.HasOne(d => d.TreatyGroup)
                    .WithMany(p => p.TblRimappingDetail)
                    .HasForeignKey(d => d.TreatyGroupId)
                    .HasConstraintName("FK_RIMappingDetail_TreatyGroup");
            });

            modelBuilder.Entity<TblTreaty>(entity =>
            {
                entity.HasKey(e => e.TreatyId);

                entity.ToTable("TblTreaty", "RI");

                entity.Property(e => e.TreatyId)
                    .HasColumnName("TreatyID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountingToId).HasColumnName("AccountingToID");

                entity.Property(e => e.BorderauxFreqId).HasColumnName("BorderauxFreqID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CurrencyId).HasColumnName("CurrencyID");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.IsApproved)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Remarks).IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.Property(e => e.TreatyBasisId).HasColumnName("TreatyBasisID");

                entity.Property(e => e.TreatyCategoryId).HasColumnName("TreatyCategoryID");

                entity.Property(e => e.TreatyCode)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.TreatyDescription)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.TreatyTypeId).HasColumnName("TreatyTypeID");

                entity.Property(e => e.TreatyYearId).HasColumnName("TreatyYearID");
            });

            modelBuilder.Entity<TblTreatyGroup>(entity =>
            {
                entity.HasKey(e => e.TreatyGroupId);

                entity.ToTable("TblTreatyGroup", "RI");

                entity.Property(e => e.TreatyGroupId)
                    .HasColumnName("TreatyGroupID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BusinessTypeId).HasColumnName("BusinessTypeID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.TreatyGroupName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TreatyId)
                    .HasColumnName("TreatyID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Treaty)
                    .WithMany(p => p.TblTreatyGroup)
                    .HasForeignKey(d => d.TreatyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TreatyGroup");
            });
        }
    }
}
