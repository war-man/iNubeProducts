using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Billing.Entities
{
    public partial class MICABIContext : DbContext
    {
        public MICABIContext()
        {
        }

        public MICABIContext(DbContextOptions<MICABIContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblBillingConfig> TblBillingConfig { get; set; }
        public virtual DbSet<TblBillingItem> TblBillingItem { get; set; }
        public virtual DbSet<TblBillingItemDetail> TblBillingItemDetail { get; set; }
        public virtual DbSet<TblContract> TblContract { get; set; }
        public virtual DbSet<TblContractDoc> TblContractDoc { get; set; }
        public virtual DbSet<TblCustAddress> TblCustAddress { get; set; }
        public virtual DbSet<TblCustSpocDetails> TblCustSpocDetails { get; set; }
        public virtual DbSet<TblCustomerConfig> TblCustomerConfig { get; set; }
        public virtual DbSet<TblCustomers> TblCustomers { get; set; }
        public virtual DbSet<TblEvents> TblEvents { get; set; }
        public virtual DbSet<TblInvoice> TblInvoice { get; set; }
        public virtual DbSet<TblInvoiceBillingDetail> TblInvoiceBillingDetail { get; set; }
        public virtual DbSet<TblInvoiceConfig> TblInvoiceConfig { get; set; }
        public virtual DbSet<TblInvoiceDetail> TblInvoiceDetail { get; set; }
        public virtual DbSet<TblInvoicePenalty> TblInvoicePenalty { get; set; }
        public virtual DbSet<TblMasCity> TblMasCity { get; set; }
        public virtual DbSet<TblMasCountry> TblMasCountry { get; set; }
        public virtual DbSet<TblMasDistrict> TblMasDistrict { get; set; }
        public virtual DbSet<TblMasPinCode> TblMasPinCode { get; set; }
        public virtual DbSet<TblMasState> TblMasState { get; set; }
        public virtual DbSet<TblNumberingScheme> TblNumberingScheme { get; set; }
        public virtual DbSet<TblObjectEventMapping> TblObjectEventMapping { get; set; }
        public virtual DbSet<TblObjectEventMappingDetail> TblObjectEventMappingDetail { get; set; }
        public virtual DbSet<TblObjectEventParameter> TblObjectEventParameter { get; set; }
        public virtual DbSet<TblObjects> TblObjects { get; set; }
        public virtual DbSet<TblPayment> TblPayment { get; set; }
        public virtual DbSet<TblmasBicommonTypes> TblmasBicommonTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#pragma warning disable CS1030 // #warning directive
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=MICADev;User ID=MICAUSER;Password=MICA*user123;");
#pragma warning restore CS1030 // #warning directive
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<TblBillingConfig>(entity =>
            {
                entity.HasKey(e => e.BillingConfigId);

                entity.ToTable("tblBillingConfig", "BI");

                entity.Property(e => e.BillingConfigId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BillingAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.BillingEndDate).HasColumnType("datetime");

                entity.Property(e => e.BillingStartDate).HasColumnType("datetime");

                entity.Property(e => e.ContractId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Remarks).IsUnicode(false);

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.TblBillingConfig)
                    .HasForeignKey(d => d.ContractId)
                    .HasConstraintName("FK_tblBillingConfig_tblContract");
            });

            modelBuilder.Entity<TblBillingItem>(entity =>
            {
                entity.HasKey(e => e.BillingItemId)
                    .HasName("PK__tblBilli__6CB7F50250B17460");

                entity.ToTable("tblBillingItem", "BI");

                entity.Property(e => e.BillingItemId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BillingConfigId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.BillingTypeDesc).HasMaxLength(20);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Rate).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.BillingConfig)
                    .WithMany(p => p.TblBillingItem)
                    .HasForeignKey(d => d.BillingConfigId)
                    .HasConstraintName("FK_tblBillingItem_tblBillingConfig");
            });

            modelBuilder.Entity<TblBillingItemDetail>(entity =>
            {
                entity.HasKey(e => e.BillingItemDetailId);

                entity.ToTable("tblBillingItemDetail", "BI");

                entity.Property(e => e.BillingItemDetailId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.BillingItemId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.DueDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.RatePercent).HasColumnType("decimal(5, 2)");

                entity.HasOne(d => d.BillingItem)
                    .WithMany(p => p.TblBillingItemDetail)
                    .HasForeignKey(d => d.BillingItemId)
                    .HasConstraintName("FK_tblBillingItemDetail_tblBillingItem");
            });

            modelBuilder.Entity<TblContract>(entity =>
            {
                entity.HasKey(e => e.ContractId);

                entity.ToTable("tblContract", "BI");

                entity.Property(e => e.ContractId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ContractEffectiveDate).HasColumnType("datetime");

                entity.Property(e => e.ContractEndDate).HasColumnType("datetime");

                entity.Property(e => e.ContractName).HasMaxLength(100);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.MaxCreditAmountAllowed).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Podate)
                    .HasColumnName("PODate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Pono)
                    .HasColumnName("PONo")
                    .HasMaxLength(15);

                entity.Property(e => e.VendorId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblContract)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_tblContract_tblCustomers");
            });

            modelBuilder.Entity<TblContractDoc>(entity =>
            {
                entity.HasKey(e => e.ContractDocId);

                entity.ToTable("tblContractDoc", "BI");

                entity.Property(e => e.ContractDocId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ContractId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DocumentName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.DocumentStr).IsRequired();

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.UploadDate).HasColumnType("datetime");

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.TblContractDoc)
                    .HasForeignKey(d => d.ContractId)
                    .HasConstraintName("FK_tblContractDoc_tblContract");
            });

            modelBuilder.Entity<TblCustAddress>(entity =>
            {
                entity.HasKey(e => e.AddressId);

                entity.ToTable("tblCustAddress", "BI");

                entity.Property(e => e.AddressId)
                    .HasColumnName("AddressID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AddressLine1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AddressLine3)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AddressType)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.TblCustAddress)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("FK_tblCustAddress_tblMasCity");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.TblCustAddress)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_tblCustAddress_tblMasCountry");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblCustAddress)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_tblCustAddress_tblCustomers");

                entity.HasOne(d => d.District)
                    .WithMany(p => p.TblCustAddress)
                    .HasForeignKey(d => d.DistrictId)
                    .HasConstraintName("FK_tblCustAddress_tblMasDistrict");

                entity.HasOne(d => d.Pincode)
                    .WithMany(p => p.TblCustAddress)
                    .HasForeignKey(d => d.PincodeId)
                    .HasConstraintName("FK_tblCustAddress_tblMasPinCode");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.TblCustAddress)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK_tblCustAddress_tblMasState");
            });

            modelBuilder.Entity<TblCustSpocDetails>(entity =>
            {
                entity.HasKey(e => e.SpocId);

                entity.ToTable("tblCustSpocDetails", "BI");

                entity.Property(e => e.SpocId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AddressLine1)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.AddressLine3)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.BranchName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Designation)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("date");

                entity.Property(e => e.Doj)
                    .HasColumnName("DOJ")
                    .HasColumnType("date");

                entity.Property(e => e.EmailId)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LandLineOffice)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LandLineResidence)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Mobileno)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PanNo)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.TblCustSpocDetails)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("FK_tblCustSpocDetails_tblMasCity");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.TblCustSpocDetails)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_tblCustSpocDetails_tblMasCountry");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblCustSpocDetails)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_tblCustSpocDetails_tblCustomers");

                entity.HasOne(d => d.District)
                    .WithMany(p => p.TblCustSpocDetails)
                    .HasForeignKey(d => d.DistrictId)
                    .HasConstraintName("FK_tblCustSpocDetails_tblMasDistrict");

                entity.HasOne(d => d.Pincode)
                    .WithMany(p => p.TblCustSpocDetails)
                    .HasForeignKey(d => d.PincodeId)
                    .HasConstraintName("FK_tblCustSpocDetails_tblMasPinCode");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.TblCustSpocDetails)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK_tblCustSpocDetails_tblMasState");
            });

            modelBuilder.Entity<TblCustomerConfig>(entity =>
            {
                entity.HasKey(e => e.CustConfigId);

                entity.ToTable("tblCustomerConfig", "BI");

                entity.Property(e => e.CustConfigId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CustomerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PdfTemplateName).HasMaxLength(100);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblCustomerConfig)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_tblCustomerConfig_tblCustomers");
            });

            modelBuilder.Entity<TblCustomers>(entity =>
            {
                entity.HasKey(e => e.CustomerId);

                entity.ToTable("tblCustomers", "BI");

                entity.Property(e => e.CustomerId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Code)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ConfigurationTypeId).HasColumnName("ConfigurationTypeID");

                entity.Property(e => e.CorpAddressSameAs)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).HasMaxLength(450);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerName).HasMaxLength(100);

                entity.Property(e => e.FaxNo)
                    .HasColumnName("FaxNO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MailingAddressSameAs)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(450);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Panno)
                    .HasColumnName("PANno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNo)
                    .HasColumnName("PhoneNO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RegisteringAuthority)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RegistrationDate).HasColumnType("datetime");

                entity.Property(e => e.RegistrationNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ServiceTaxRegistrationNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Tanno)
                    .HasColumnName("TANno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TypeId).HasColumnName("TypeID");

                entity.Property(e => e.Website)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblEvents>(entity =>
            {
                entity.HasKey(e => e.EventId);

                entity.ToTable("tblEvents", "BI");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EventName).HasMaxLength(20);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblInvoice>(entity =>
            {
                entity.HasKey(e => e.InvoiceId);

                entity.ToTable("tblInvoice", "BI");

                entity.Property(e => e.InvoiceId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Balance).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ContractId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedUserId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Discount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.DueDate).HasColumnType("datetime");

                entity.Property(e => e.GstPercent).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.InvAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.InvoiceConfigId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InvoiceDate).HasColumnType("datetime");

                entity.Property(e => e.InvoiceNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.OtherAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.PaymentRecd).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.PenaltyAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.RevisedInvAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.TaxAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.InvoiceConfig)
                    .WithMany(p => p.TblInvoice)
                    .HasForeignKey(d => d.InvoiceConfigId)
                    .HasConstraintName("FK_tblInvoice_tblInvoiceConfig");
            });

            modelBuilder.Entity<TblInvoiceBillingDetail>(entity =>
            {
                entity.HasKey(e => e.InvoiceBillingDetailId)
                    .HasName("PK__tblInvoi__8001E49FA824FA1C");

                entity.ToTable("tblInvoiceBillingDetail", "BI");

                entity.Property(e => e.InvoiceBillingDetailId).ValueGeneratedNever();

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ClaimNumber).HasMaxLength(100);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.InsuredName).HasMaxLength(30);

                entity.Property(e => e.InsuredRefNo).HasMaxLength(30);

                entity.Property(e => e.InvoiceId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LossDatetime).HasColumnType("datetime");

                entity.Property(e => e.PolicyNo).HasMaxLength(50);

                entity.Property(e => e.ProductCode).HasMaxLength(50);

                entity.Property(e => e.ProductName).HasMaxLength(100);

                entity.HasOne(d => d.EventMapping)
                    .WithMany(p => p.TblInvoiceBillingDetail)
                    .HasForeignKey(d => d.EventMappingId)
                    .HasConstraintName("FK_tblInvoiceBillingDetail_tblObjectEventMapping");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.TblInvoiceBillingDetail)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_tblInvoiceBillingDetail_tblInvoice");
            });

            modelBuilder.Entity<TblInvoiceConfig>(entity =>
            {
                entity.HasKey(e => e.InvoiceConfigId);

                entity.ToTable("tblInvoiceConfig", "BI");

                entity.Property(e => e.InvoiceConfigId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ContractId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.InvoiceEndDate).HasColumnType("datetime");

                entity.Property(e => e.InvoiceStartDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.LastCycleExecDate).HasColumnType("datetime");

                entity.Property(e => e.PenaltyPercentage).HasColumnType("decimal(5, 2)");

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.TblInvoiceConfig)
                    .HasForeignKey(d => d.ContractId)
                    .HasConstraintName("FK_tblInvoiceConfig_tblContract");
            });

            modelBuilder.Entity<TblInvoiceDetail>(entity =>
            {
                entity.HasKey(e => e.InvoiceDetailId);

                entity.ToTable("tblInvoiceDetail", "BI");

                entity.Property(e => e.InvoiceDetailId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BillingItemId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InvoiceId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.TblInvoiceDetail)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_tblInvoiceDetail_tblInvoice");
            });

            modelBuilder.Entity<TblInvoicePenalty>(entity =>
            {
                entity.HasKey(e => e.InvoicePenaltyId);

                entity.ToTable("tblInvoicePenalty", "BI");

                entity.Property(e => e.InvoicePenaltyId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.InvoiceId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PenaltyAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.PenaltyRate).HasColumnType("decimal(5, 2)");

                entity.Property(e => e.RevisedInvAmount).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<TblMasCity>(entity =>
            {
                entity.HasKey(e => e.CityId);

                entity.ToTable("tblMasCity", "BI");

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
                    .HasConstraintName("FK_tblMasCity_tblMasDistrict1");
            });

            modelBuilder.Entity<TblMasCountry>(entity =>
            {
                entity.HasKey(e => e.CountryId);

                entity.ToTable("tblMasCountry", "BI");

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

                entity.ToTable("tblMasDistrict", "BI");

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
                    .HasConstraintName("FK_tblMasDistrict_tblMasState1");
            });

            modelBuilder.Entity<TblMasPinCode>(entity =>
            {
                entity.HasKey(e => e.PincodeId)
                    .HasName("PK_tblMasPincode");

                entity.ToTable("tblMasPinCode", "BI");

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
            });

            modelBuilder.Entity<TblMasState>(entity =>
            {
                entity.HasKey(e => e.StateId);

                entity.ToTable("tblMasState", "BI");

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
                    .HasConstraintName("FK_tblMasState_tblMasCountry1");
            });

            modelBuilder.Entity<TblNumberingScheme>(entity =>
            {
                entity.HasKey(e => e.NumberingSchemeId)
                    .HasName("Pk_tblNumberingScheme");

                entity.ToTable("tblNumberingScheme", "BI");

                entity.Property(e => e.NumberingSchemeId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Fixedcode)
                    .HasColumnName("fixedcode")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Highestnumber).HasColumnName("highestnumber");

                entity.Property(e => e.InvoiceId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Nextnumber).HasColumnName("nextnumber");

                entity.Property(e => e.NumberingType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Rowguid)
                    .HasColumnName("rowguid")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Step).HasColumnName("step");
            });

            modelBuilder.Entity<TblObjectEventMapping>(entity =>
            {
                entity.HasKey(e => e.EventMappingId)
                    .HasName("PK_tblEventMapping");

                entity.ToTable("tblObjectEventMapping", "BI");

                entity.Property(e => e.Colname)
                    .HasColumnName("colname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Colvalue)
                    .HasColumnName("colvalue")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Tablename)
                    .HasColumnName("tablename")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblObjectEventMappingDetail>(entity =>
            {
                entity.HasKey(e => e.EventMappingDetailId)
                    .HasName("PK_tblEventMappingDetail");

                entity.ToTable("tblObjectEventMappingDetail", "BI");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblObjectEventParameter>(entity =>
            {
                entity.HasKey(e => e.EventParameterId)
                    .HasName("PK__tblObjec__5E93341B565E46E3");

                entity.ToTable("tblObjectEventParameter", "BI");

                entity.Property(e => e.EventParameterId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Colname)
                    .HasColumnName("colname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Coltype)
                    .HasColumnName("coltype")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Parameter)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tablename)
                    .HasColumnName("tablename")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblObjects>(entity =>
            {
                entity.HasKey(e => e.ObjectId);

                entity.ToTable("tblObjects", "BI");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ObjectName).HasMaxLength(20);

                entity.Property(e => e.Seq).HasColumnName("seq");
            });

            modelBuilder.Entity<TblPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentId);

                entity.ToTable("tblPayment", "BI");

                entity.Property(e => e.PaymentId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BankName).HasMaxLength(50);

                entity.Property(e => e.BranchName).HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IfscCode).HasMaxLength(50);

                entity.Property(e => e.InvoiceId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PaymentDate).HasColumnType("datetime");

                entity.Property(e => e.Paymentamount)
                    .HasColumnName("paymentamount")
                    .HasColumnType("decimal(18, 2)");

                entity.Property(e => e.RealisedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.TblPayment)
                    .HasForeignKey(d => d.InvoiceId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_tblPayment_tblInvoice");
            });

            modelBuilder.Entity<TblmasBicommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId);

                entity.ToTable("tblmasBICommonTypes", "BI");

                entity.Property(e => e.CommonTypeId)
                    .HasColumnName("CommonTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(200);
            });
        }
    }
}
