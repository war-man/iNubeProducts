using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Partners.Entities
{
    public partial class MICAPRContext : DbContext
    {
        public MICAPRContext()
        {
        }

        public MICAPRContext(DbContextOptions<MICAPRContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAssignProduct> TblAssignProduct { get; set; }
        public virtual DbSet<TblCdaccounts> TblCdaccounts { get; set; }
        public virtual DbSet<TblCdtransactions> TblCdtransactions { get; set; }
        public virtual DbSet<TblMasCity> TblMasCity { get; set; }
        public virtual DbSet<TblMasCountry> TblMasCountry { get; set; }
        public virtual DbSet<TblMasDistrict> TblMasDistrict { get; set; }
        public virtual DbSet<TblMasPinCode> TblMasPinCode { get; set; }
        public virtual DbSet<TblMasState> TblMasState { get; set; }
        public virtual DbSet<TblOfficeSpocDetails> TblOfficeSpocDetails { get; set; }
        public virtual DbSet<TblOrgAddress> TblOrgAddress { get; set; }
        public virtual DbSet<TblOrgOffice> TblOrgOffice { get; set; }
        public virtual DbSet<TblOrgSpocDetails> TblOrgSpocDetails { get; set; }
        public virtual DbSet<TblOrganization> TblOrganization { get; set; }
        public virtual DbSet<TblPartnerAddress> TblPartnerAddress { get; set; }
        public virtual DbSet<TblPartners> TblPartners { get; set; }
        public virtual DbSet<TblPolicyAgreement> TblPolicyAgreement { get; set; }
        public virtual DbSet<TblmasPrcommonTypes> TblmasPrcommonTypes { get; set; }
        public virtual DbSet<TempChannelDetails> TempChannelDetails { get; set; }

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
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<TblAssignProduct>(entity =>
            {
                entity.HasKey(e => e.AssignProductId)
                    .HasName("PK_AssignProduct");

                entity.ToTable("tblAssignProduct", "PR");

                entity.Property(e => e.AssignProductId)
                    .HasColumnName("AssignProductID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AssignDate).HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.EffectiveFrom).HasColumnType("datetime");

                entity.Property(e => e.EffectiveTo).HasColumnType("datetime");

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PatnerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ProductId).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<TblCdaccounts>(entity =>
            {
                entity.HasKey(e => e.Cdid);

                entity.ToTable("tblCDAccounts", "PR");

                entity.HasIndex(e => e.AccountNo)
                    .HasName("IX_tblCDTAccounts")
                    .IsUnique();

                entity.Property(e => e.Cdid)
                    .HasColumnName("CDID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountNo)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.AvailableBalance).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DropLimit).HasColumnType("numeric(4, 2)");

                entity.Property(e => e.InitialAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LedgerBalance).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PartnerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PaymentType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Remark).IsUnicode(false);

                entity.Property(e => e.ThresholdValue).HasColumnType("numeric(4, 2)");
            });

            modelBuilder.Entity<TblCdtransactions>(entity =>
            {
                entity.HasKey(e => e.TxnId);

                entity.ToTable("tblCDTransactions", "PR");

                entity.Property(e => e.TxnId)
                    .HasColumnName("TxnID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountNo)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.AvailableAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.InitialAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LedgerBalance).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentId)
                    .HasColumnName("PaymentID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PaymentRefernceId)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TransactionDate).HasColumnType("datetime");

                entity.Property(e => e.TxnAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TxnType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.AccountNoNavigation)
                    .WithMany(p => p.TblCdtransactions)
                    .HasPrincipalKey(p => p.AccountNo)
                    .HasForeignKey(d => d.AccountNo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblCDTransactions_tblCDAccounts");
            });

            modelBuilder.Entity<TblMasCity>(entity =>
            {
                entity.HasKey(e => e.CityId);

                entity.ToTable("tblMasCity", "PR");

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
                entity.HasKey(e => e.CountryId);

                entity.ToTable("tblMasCountry", "PR");

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
                entity.HasKey(e => e.DistrictId);

                entity.ToTable("tblMasDistrict", "PR");

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
                    .HasName("PK_tblMasPincode");

                entity.ToTable("tblMasPinCode", "PR");

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
                    .HasConstraintName("FK_tblMasPincode_tblMasCity");
            });

            modelBuilder.Entity<TblMasState>(entity =>
            {
                entity.HasKey(e => e.StateId);

                entity.ToTable("tblMasState", "PR");

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

            modelBuilder.Entity<TblOfficeSpocDetails>(entity =>
            {
                entity.HasKey(e => e.OfficeSpocid);

                entity.ToTable("tblOfficeSpocDetails", "PR");

                entity.Property(e => e.OfficeSpocid)
                    .HasColumnName("OfficeSPOCID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.OfficeId)
                    .HasColumnName("OfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpocaddressLine1)
                    .HasColumnName("SPOCAddressLine1")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine2)
                    .HasColumnName("SPOCAddressLine2")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine3)
                    .HasColumnName("SPOCAddressLine3")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpoccityId).HasColumnName("SPOCCityId");

                entity.Property(e => e.SpoccountryId).HasColumnName("SPOCCountryId");

                entity.Property(e => e.Spocdesignation)
                    .HasColumnName("SPOCDesignation")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocdistrictId).HasColumnName("SPOCDistrictId");

                entity.Property(e => e.SpocemailId)
                    .HasColumnName("SPOCEmailId")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Spocmobileno)
                    .HasColumnName("SPOCMobileno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Spocname)
                    .HasColumnName("SPOCName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocpincodeId).HasColumnName("SPOCPincodeId");

                entity.Property(e => e.SpocstateId).HasColumnName("SPOCStateId");

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.OfficeId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblOrgOffice");

                entity.HasOne(d => d.Spoccity)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpoccityId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasCity");

                entity.HasOne(d => d.Spoccountry)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpoccountryId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasCountry");

                entity.HasOne(d => d.Spocdistrict)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpocdistrictId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasDistrict");

                entity.HasOne(d => d.Spocpincode)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpocpincodeId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasPinCode");

                entity.HasOne(d => d.Spocstate)
                    .WithMany(p => p.TblOfficeSpocDetails)
                    .HasForeignKey(d => d.SpocstateId)
                    .HasConstraintName("FK_tblOfficeSpocDetails_tblMasState");
            });

            modelBuilder.Entity<TblOrgAddress>(entity =>
            {
                entity.HasKey(e => e.OrgAddressId);

                entity.ToTable("tblOrgAddress", "PR");

                entity.Property(e => e.OrgAddressId)
                    .HasColumnName("OrgAddressID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.OrgAddressLine1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgAddressLine2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgAddressLine3)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgAddressType)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.OrgCity)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgCityId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasCity");

                entity.HasOne(d => d.OrgCountry)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgCountryId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasCountry");

                entity.HasOne(d => d.OrgDistrict)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgDistrictId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasDistrict");

                entity.HasOne(d => d.OrgPincode)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgPincodeId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasPinCode");

                entity.HasOne(d => d.OrgState)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrgStateId)
                    .HasConstraintName("FK_tblOrgAddress_tblMasState");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblOrgAddress)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_tblOrgAddress_tblOrganization");
            });

            modelBuilder.Entity<TblOrgOffice>(entity =>
            {
                entity.HasKey(e => e.OrgOfficeId);

                entity.ToTable("tblOrgOffice", "PR");

                entity.Property(e => e.OrgOfficeId)
                    .HasColumnName("OrgOfficeID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OfficeAddressLine1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeAddressLine2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeAddressLine3)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeFaxNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeLevelId).HasColumnName("OfficeLevelID");

                entity.Property(e => e.OfficeName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficePhoneNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OfficeReportingOfficeId)
                    .HasColumnName("OfficeReportingOfficeID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.OfficeCity)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficeCityId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasCity");

                entity.HasOne(d => d.OfficeCountry)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficeCountryId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasCountry");

                entity.HasOne(d => d.OfficeDistrict)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficeDistrictId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasDistrict");

                entity.HasOne(d => d.OfficePincode)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficePincodeId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasPinCode");

                entity.HasOne(d => d.OfficeReportingOffice)
                    .WithMany(p => p.InverseOfficeReportingOffice)
                    .HasForeignKey(d => d.OfficeReportingOfficeId)
                    .HasConstraintName("FK_tblOrgOffice_tblOrgOffice");

                entity.HasOne(d => d.OfficeState)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OfficeStateId)
                    .HasConstraintName("FK_tblOrgOffice_tblMasState");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblOrgOffice)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_tblOrgOffice_tblOrganization");
            });

            modelBuilder.Entity<TblOrgSpocDetails>(entity =>
            {
                entity.HasKey(e => e.OrgSpocId)
                    .HasName("PK_tblSpocDetails");

                entity.ToTable("tblOrgSpocDetails", "PR");

                entity.Property(e => e.OrgSpocId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.LandLineOffice)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LandLineResidence)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpocBranchName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocLastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocMiddleName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocUserName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine1)
                    .HasColumnName("SPOCAddressLine1")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine2)
                    .HasColumnName("SPOCAddressLine2")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpocaddressLine3)
                    .HasColumnName("SPOCAddressLine3")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpoccityId).HasColumnName("SPOCCityId");

                entity.Property(e => e.SpoccountryId).HasColumnName("SPOCCountryId");

                entity.Property(e => e.Spocdesignation)
                    .HasColumnName("SPOCDesignation")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocdistrictId).HasColumnName("SPOCDistrictId");

                entity.Property(e => e.Spocdob)
                    .HasColumnName("SPOCDOB")
                    .HasColumnType("date");

                entity.Property(e => e.Spocdoj)
                    .HasColumnName("SPOCDOJ")
                    .HasColumnType("date");

                entity.Property(e => e.SpocemailId)
                    .HasColumnName("SPOCEmailId")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocfirstName)
                    .HasColumnName("SPOCFirstName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Spocmobileno)
                    .HasColumnName("SPOCMobileno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocpanNo)
                    .HasColumnName("SPOCPanNo")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.SpocpincodeId).HasColumnName("SPOCPincodeId");

                entity.Property(e => e.SpocstateId).HasColumnName("SPOCStateId");

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.OrganizationId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblOrganization");

                entity.HasOne(d => d.Spoccity)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpoccityId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasCity");

                entity.HasOne(d => d.Spoccountry)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpoccountryId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasCountry");

                entity.HasOne(d => d.Spocdistrict)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpocdistrictId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasDistrict");

                entity.HasOne(d => d.Spocpincode)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpocpincodeId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasPinCode");

                entity.HasOne(d => d.Spocstate)
                    .WithMany(p => p.TblOrgSpocDetails)
                    .HasForeignKey(d => d.SpocstateId)
                    .HasConstraintName("FK_tblOrgSpocDetails_tblMasState");
            });

            modelBuilder.Entity<TblOrganization>(entity =>
            {
                entity.HasKey(e => e.OrganizationId);

                entity.ToTable("tblOrganization", "PR");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ConfigurationTypeId).HasColumnName("ConfigurationTypeID");

                entity.Property(e => e.CorpAddressSameAs)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MailingAddressSameAs)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.OrgCategoryId).HasColumnName("OrgCategoryID");

                entity.Property(e => e.OrgFaxNo)
                    .HasColumnName("OrgFaxNO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OrgPanno)
                    .HasColumnName("OrgPANno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgPhoneNo)
                    .HasColumnName("OrgPhoneNO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgRegisteringAuthority)
                    .HasColumnName("Org_RegisteringAuthority")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgRegistrationDate).HasColumnType("datetime");

                entity.Property(e => e.OrgRegistrationNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgServiceTaxRegistrationNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgTanno)
                    .HasColumnName("OrgTANno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgTypeId).HasColumnName("OrgTypeID");

                entity.Property(e => e.OrgWebsite)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ParentId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.ConfigurationType)
                    .WithMany(p => p.TblOrganizationConfigurationType)
                    .HasForeignKey(d => d.ConfigurationTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrganization_tblmasPRCommonTypes_Config");

                entity.HasOne(d => d.OrgCategory)
                    .WithMany(p => p.TblOrganizationOrgCategory)
                    .HasForeignKey(d => d.OrgCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrganization_tblmasPRCommonTypes");

                entity.HasOne(d => d.OrgType)
                    .WithMany(p => p.TblOrganizationOrgType)
                    .HasForeignKey(d => d.OrgTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblOrganization_tblmasPRCommonTypes_TypeID");
            });

            modelBuilder.Entity<TblPartnerAddress>(entity =>
            {
                entity.HasKey(e => e.PartnerAddressId);

                entity.ToTable("tblPartnerAddress", "PR");

                entity.Property(e => e.PartnerAddressId)
                    .HasColumnName("PartnerAddressID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.PartnerAddressLine1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerAddressLine2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerAddressLine3)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerAddressType)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.PartnerCity)
                    .WithMany(p => p.TblPartnerAddress)
                    .HasForeignKey(d => d.PartnerCityId)
                    .HasConstraintName("FK_tblPartnerAddress_tblMasCity");

                entity.HasOne(d => d.PartnerCountry)
                    .WithMany(p => p.TblPartnerAddress)
                    .HasForeignKey(d => d.PartnerCountryId)
                    .HasConstraintName("FK_tblPartnerAddress_tblMasCountry");

                entity.HasOne(d => d.PartnerDistrict)
                    .WithMany(p => p.TblPartnerAddress)
                    .HasForeignKey(d => d.PartnerDistrictId)
                    .HasConstraintName("FK_tblPartnerAddress_tblMasDistrict");

                entity.HasOne(d => d.Partner)
                    .WithMany(p => p.TblPartnerAddress)
                    .HasForeignKey(d => d.PartnerId)
                    .HasConstraintName("FK_tblPartnerAddress_tblPartners");

                entity.HasOne(d => d.PartnerPincode)
                    .WithMany(p => p.TblPartnerAddress)
                    .HasForeignKey(d => d.PartnerPincodeId)
                    .HasConstraintName("FK_tblPartnerAddress_tblMasPinCode");

                entity.HasOne(d => d.PartnerState)
                    .WithMany(p => p.TblPartnerAddress)
                    .HasForeignKey(d => d.PartnerStateId)
                    .HasConstraintName("FK_tblPartnerAddress_tblMasState");
            });

            modelBuilder.Entity<TblPartners>(entity =>
            {
                entity.HasKey(e => e.PartnerId);

                entity.ToTable("tblPartners", "PR");

                entity.Property(e => e.PartnerId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Cinnumber)
                    .HasColumnName("CINNumber")
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Fax).HasMaxLength(50);

                entity.Property(e => e.Gst).HasColumnName("GST");

                entity.Property(e => e.Gstnumber)
                    .HasColumnName("GSTNumber")
                    .HasMaxLength(50);

                entity.Property(e => e.Mobile).HasMaxLength(50);

                entity.Property(e => e.ModifyBy).HasMaxLength(450);

                entity.Property(e => e.ModifyDate).HasColumnType("datetime");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Pan)
                    .HasColumnName("PAN")
                    .HasMaxLength(50);

                entity.Property(e => e.Pannumber)
                    .HasColumnName("PANNumber")
                    .HasMaxLength(50);

                entity.Property(e => e.PartnerCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerName).HasMaxLength(50);

                entity.Property(e => e.Telephone).HasMaxLength(50);

                entity.Property(e => e.Website).HasMaxLength(50);

                entity.HasOne(d => d.PartnerClass)
                    .WithMany(p => p.TblPartnersPartnerClass)
                    .HasForeignKey(d => d.PartnerClassId)
                    .HasConstraintName("FK_tblPartners_tblmasPRCommonTypes_ClassId");

                entity.HasOne(d => d.PartnerType)
                    .WithMany(p => p.TblPartnersPartnerType)
                    .HasForeignKey(d => d.PartnerTypeId)
                    .HasConstraintName("FK_tblPartners_tblmasPRCommonTypes_TypeId");

                entity.HasOne(d => d.Salutation)
                    .WithMany(p => p.TblPartnersSalutation)
                    .HasForeignKey(d => d.SalutationId)
                    .HasConstraintName("FK_tblPartners_tblmasPRCommonTypes_Salutation");
            });

            modelBuilder.Entity<TblPolicyAgreement>(entity =>
            {
                entity.HasKey(e => e.PolicyId)
                    .HasName("PK_tblPolicy");

                entity.ToTable("tblPolicyAgreement", "PR");

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AgentBusinessTypeId).HasColumnName("AgentBusinessTypeID");

                entity.Property(e => e.AgentId)
                    .HasColumnName("AgentID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.BranchIdPk).HasColumnName("Branch_ID_PK");

                entity.Property(e => e.BundleId)
                    .HasColumnName("BundleID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.BundleParentId)
                    .HasColumnName("BundleParentID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.BundleTxnId)
                    .HasColumnName("BundleTxnID")
                    .IsUnicode(false);

                entity.Property(e => e.Channel)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CorporateId)
                    .HasColumnName("CorporateID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CoverNoteIssueDate).HasColumnType("datetime");

                entity.Property(e => e.CoverNoteNo)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Csoid).HasColumnName("CSOID");

                entity.Property(e => e.Currency)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.DocumentType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Irccode).HasColumnName("IRCCode");

                entity.Property(e => e.IsIrdaupdated).HasColumnName("IsIRDAUpdated");

                entity.Property(e => e.IsUploadedToIcm).HasColumnName("IsUploadedToICM");

                entity.Property(e => e.MasterPolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyEndDate).HasColumnType("datetime");

                entity.Property(e => e.PolicyIssueDate).HasColumnType("datetime");

                entity.Property(e => e.PolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyRemarks).IsUnicode(false);

                entity.Property(e => e.PolicyStageId).HasColumnName("PolicyStageID");

                entity.Property(e => e.PolicyStageStatusId).HasColumnName("PolicyStageStatusID");

                entity.Property(e => e.PolicyStartDate).HasColumnType("datetime");

                entity.Property(e => e.PolicyStatusId).HasColumnName("PolicyStatusID");

                entity.Property(e => e.PolicyTypeId)
                    .HasColumnName("PolicyTypeID")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ProductIdPk).HasColumnName("Product_ID_PK");

                entity.Property(e => e.ProposalDate).HasColumnType("datetime");

                entity.Property(e => e.ProposalNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.QuoteDate).HasColumnType("datetime");

                entity.Property(e => e.QuoteNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rate)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Smcode)
                    .HasColumnName("SMCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SubAgentId).HasColumnName("SubAgentID");

                entity.Property(e => e.SumInsured).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<TblmasPrcommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId);

                entity.ToTable("tblmasPRCommonTypes", "PR");

                entity.Property(e => e.CommonTypeId)
                    .HasColumnName("CommonTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<TempChannelDetails>(entity =>
            {
                entity.ToTable("tempChannelDetails", "PR");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AddressLine1).HasMaxLength(100);

                entity.Property(e => e.AddressLine2).HasMaxLength(100);

                entity.Property(e => e.AddressLine3).HasMaxLength(100);

                entity.Property(e => e.ChannelType).HasMaxLength(100);

                entity.Property(e => e.City).HasMaxLength(100);

                entity.Property(e => e.Code).HasMaxLength(100);

                entity.Property(e => e.Country).HasMaxLength(100);

                entity.Property(e => e.District).HasMaxLength(100);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName).HasMaxLength(100);

                entity.Property(e => e.LastName).HasMaxLength(100);

                entity.Property(e => e.Message).HasMaxLength(50);

                entity.Property(e => e.State).HasMaxLength(100);

                entity.Property(e => e.Status).HasMaxLength(50);
            });
        }
    }
}
