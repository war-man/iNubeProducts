using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class MICAPCContext : DbContext
    {
        public MICAPCContext()
        {
        }

        public MICAPCContext(DbContextOptions<MICAPCContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblBenifitRangeDetails> TblBenifitRangeDetails { get; set; }
        public virtual DbSet<TblCoverChildRcbdetails> TblCoverChildRcbdetails { get; set; }
        public virtual DbSet<TblCoverRcbdetails> TblCoverRcbdetails { get; set; }
        public virtual DbSet<TblDynamicProduct> TblDynamicProduct { get; set; }
        public virtual DbSet<TblEntityAttributes> TblEntityAttributes { get; set; }
        public virtual DbSet<TblEntityDetails> TblEntityDetails { get; set; }
        public virtual DbSet<TblInsurableChildRcbdetails> TblInsurableChildRcbdetails { get; set; }
        public virtual DbSet<TblInsurableRcbdetails> TblInsurableRcbdetails { get; set; }
        public virtual DbSet<TblLeadInfo> TblLeadInfo { get; set; }
        public virtual DbSet<TblMasProductPolicyInput> TblMasProductPolicyInput { get; set; }
        public virtual DbSet<TblProductBasicConfiguration> TblProductBasicConfiguration { get; set; }
        public virtual DbSet<TblProductBenefits> TblProductBenefits { get; set; }
        public virtual DbSet<TblProductChannels> TblProductChannels { get; set; }
        public virtual DbSet<TblProductClausesWarrentiesExclusions> TblProductClausesWarrentiesExclusions { get; set; }
        public virtual DbSet<TblProductCovers> TblProductCovers { get; set; }
        public virtual DbSet<TblProductEntity> TblProductEntity { get; set; }
        public virtual DbSet<TblProductInsurableItems> TblProductInsurableItems { get; set; }
        public virtual DbSet<TblProductPremium> TblProductPremium { get; set; }
        public virtual DbSet<TblProductRatingMapping> TblProductRatingMapping { get; set; }
        public virtual DbSet<TblProductRcbdetails> TblProductRcbdetails { get; set; }
        public virtual DbSet<TblProductSwitchOnDetails> TblProductSwitchOnDetails { get; set; }
        public virtual DbSet<TblProducts> TblProducts { get; set; }
        public virtual DbSet<TblPromo> TblPromo { get; set; }
        public virtual DbSet<TblmasClausesWarrentiesExclusions> TblmasClausesWarrentiesExclusions { get; set; }
        public virtual DbSet<TblmasDynamic> TblmasDynamic { get; set; }
        public virtual DbSet<TblmasMapping> TblmasMapping { get; set; }
        public virtual DbSet<TblmasPccommonTypes> TblmasPccommonTypes { get; set; }
        public virtual DbSet<TblmasProductMaster> TblmasProductMaster { get; set; }

        // Unable to generate entity type for table 'PC.prodtemp'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=edelweissdb1.coow0ess1gft.ap-south-1.rds.amazonaws.com;Database=EdelweissTest;User ID=admin;Password=micaadmin;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<TblBenifitRangeDetails>(entity =>
            {
                entity.HasKey(e => e.BenefitRangeId)
                    .HasName("PK_tblBenifitRangeDetails");

                entity.ToTable("TblBenifitRangeDetails", "PC");

                entity.Property(e => e.BenefitRangeId)
                    .HasColumnName("BenefitRangeID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BenifitId)
                    .HasColumnName("BenifitID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PremiumAmount).HasColumnType("numeric(10, 2)");

                entity.HasOne(d => d.Benifit)
                    .WithMany(p => p.TblBenifitRangeDetails)
                    .HasForeignKey(d => d.BenifitId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblBenifitRangeDetails_tblProductBenefits");
            });

            modelBuilder.Entity<TblCoverChildRcbdetails>(entity =>
            {
                entity.ToTable("tblCoverChildRCBDetails", "PC");

                entity.Property(e => e.TblCoverChildRcbdetailsId).HasColumnName("tblCoverChildRCBDetailsID");

                entity.Property(e => e.CoverRcbdetailsId).HasColumnName("CoverRCBdetailsID");

                entity.Property(e => e.InputId).HasColumnName("InputID");

                entity.Property(e => e.InputType).HasMaxLength(50);

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.SubLevelId).HasColumnName("SubLevelID");

                entity.HasOne(d => d.CoverRcbdetails)
                    .WithMany(p => p.TblCoverChildRcbdetails)
                    .HasForeignKey(d => d.CoverRcbdetailsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblCoverChildRCBDetails_tblCoverRCBDetails");

                entity.HasOne(d => d.Input)
                    .WithMany(p => p.TblCoverChildRcbdetails)
                    .HasForeignKey(d => d.InputId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblCoverChildRCBDetails_tblmasProductMaster");
            });

            modelBuilder.Entity<TblCoverRcbdetails>(entity =>
            {
                entity.HasKey(e => e.CoverRcbdetailsId);

                entity.ToTable("tblCoverRCBDetails", "PC");

                entity.Property(e => e.CoverRcbdetailsId).HasColumnName("CoverRCBdetailsID");

                entity.Property(e => e.InputId).HasColumnName("InputID");

                entity.Property(e => e.InputType).HasMaxLength(50);

                entity.Property(e => e.InsurableRcbdetailsId).HasColumnName("InsurableRCBdetailsID");

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.SubLevelId).HasColumnName("SubLevelID");

                entity.HasOne(d => d.Input)
                    .WithMany(p => p.TblCoverRcbdetails)
                    .HasForeignKey(d => d.InputId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblCoverRCBDetails_tblmasProductMaster");

                entity.HasOne(d => d.InsurableRcbdetails)
                    .WithMany(p => p.TblCoverRcbdetails)
                    .HasForeignKey(d => d.InsurableRcbdetailsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblCoverRCBDetails_tblInsurableRCBDetails");
            });

            modelBuilder.Entity<TblDynamicProduct>(entity =>
            {
                entity.ToTable("tblDynamicProduct", "PC");

                entity.Property(e => e.Id).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Checked).HasMaxLength(250);

                entity.Property(e => e.ComponentType).HasMaxLength(250);

                entity.Property(e => e.FilterName).HasMaxLength(250);

                entity.Property(e => e.LabelText).HasMaxLength(250);

                entity.Property(e => e.ListObject).HasMaxLength(250);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.Type).HasMaxLength(250);

                entity.Property(e => e.Value).HasMaxLength(250);
            });

            modelBuilder.Entity<TblEntityAttributes>(entity =>
            {
                entity.ToTable("tblEntityAttributes", "PC");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Checked).HasMaxLength(250);

                entity.Property(e => e.EntityId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EntityLevel).HasMaxLength(50);

                entity.Property(e => e.FieldType).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FilterName).HasMaxLength(250);

                entity.Property(e => e.LabelText).HasMaxLength(250);

                entity.Property(e => e.ListObject).HasMaxLength(250);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.Parameter).HasMaxLength(250);

                entity.Property(e => e.Parameter1).HasMaxLength(250);

                entity.Property(e => e.ParentId).HasMaxLength(40);

                entity.Property(e => e.Value).HasMaxLength(250);

                entity.HasOne(d => d.Entity)
                    .WithMany(p => p.TblEntityAttributes)
                    .HasForeignKey(d => d.EntityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblEntityAttributes_tblEntityDetails");

                entity.HasOne(d => d.FieldTypeNavigation)
                    .WithMany(p => p.TblEntityAttributes)
                    .HasForeignKey(d => d.FieldType)
                    .HasConstraintName("FK_tblEntityAttributes_tblmasDynamic");
            });

            modelBuilder.Entity<TblEntityDetails>(entity =>
            {
                entity.HasKey(e => e.EntityId);

                entity.ToTable("tblEntityDetails", "PC");

                entity.Property(e => e.EntityId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedBy).HasMaxLength(250);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.EnitityName).HasMaxLength(250);

                entity.Property(e => e.EntityLevel).HasMaxLength(50);

                entity.Property(e => e.ParentId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Type).HasMaxLength(250);
            });

            modelBuilder.Entity<TblInsurableChildRcbdetails>(entity =>
            {
                entity.HasKey(e => e.InsurableChildRcbdetailsId);

                entity.ToTable("tblInsurableChildRCBDetails", "PC");

                entity.Property(e => e.InsurableChildRcbdetailsId).HasColumnName("InsurableChildRCBdetailsID");

                entity.Property(e => e.InputId).HasColumnName("InputID");

                entity.Property(e => e.InputType).HasMaxLength(50);

                entity.Property(e => e.InsurableRcbdetailsId).HasColumnName("InsurableRCBdetailsID");

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.SubLevelId).HasColumnName("SubLevelID");

                entity.HasOne(d => d.Input)
                    .WithMany(p => p.TblInsurableChildRcbdetails)
                    .HasForeignKey(d => d.InputId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblInsurableChildRCBDetails_tblmasProductMaster");

                entity.HasOne(d => d.InsurableRcbdetails)
                    .WithMany(p => p.TblInsurableChildRcbdetails)
                    .HasForeignKey(d => d.InsurableRcbdetailsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblInsurableChildRCBDetails_tblInsurableRCBDetails");
            });

            modelBuilder.Entity<TblInsurableRcbdetails>(entity =>
            {
                entity.HasKey(e => e.InsurableRcbdetailsId);

                entity.ToTable("tblInsurableRCBDetails", "PC");

                entity.Property(e => e.InsurableRcbdetailsId).HasColumnName("InsurableRCBdetailsID");

                entity.Property(e => e.InputId).HasColumnName("InputID");

                entity.Property(e => e.InputType).HasMaxLength(50);

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.SubLevelId).HasColumnName("SubLevelID");

                entity.HasOne(d => d.Input)
                    .WithMany(p => p.TblInsurableRcbdetails)
                    .HasForeignKey(d => d.InputId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblInsurableRCBDetails_tblmasProductMaster");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblInsurableRcbdetails)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblInsurableRCBDetails_tblProducts");
            });

            modelBuilder.Entity<TblLeadInfo>(entity =>
            {
                entity.ToTable("TblLeadInfo", "PC");

                entity.Property(e => e.EmailId)
                    .HasColumnName("EmailID")
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(255);

                entity.Property(e => e.IsPayment).HasDefaultValueSql("('FALSE')");

                entity.Property(e => e.MobileNumber).HasMaxLength(50);

                entity.Property(e => e.ProductCode).HasMaxLength(250);

                entity.Property(e => e.Smsstatus).HasColumnName("SMSstatus");
            });

            modelBuilder.Entity<TblMasProductPolicyInput>(entity =>
            {
                entity.HasKey(e => e.ProductPolicyInputId)
                    .HasName("PK_tblMassProductPolicyInput");

                entity.ToTable("tblMasProductPolicyInput", "PC");

                entity.Property(e => e.ProductPolicyInputId).ValueGeneratedNever();

                entity.Property(e => e.PolicyInputValue).HasMaxLength(200);
            });

            modelBuilder.Entity<TblProductBasicConfiguration>(entity =>
            {
                entity.HasKey(e => e.ProductBasicConfigurationId);

                entity.ToTable("tblProductBasicConfiguration", "PC");

                entity.Property(e => e.ProductBasicConfigurationId)
                    .HasColumnName("ProductBasicConfigurationID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.InputId).HasColumnName("InputID");

                entity.Property(e => e.InputType).HasMaxLength(50);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Input)
                    .WithMany(p => p.TblProductBasicConfiguration)
                    .HasForeignKey(d => d.InputId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblProductBasicConfiguration_tblmasProductMaster");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductBasicConfiguration)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductBasicConfiguration_tblProducts");
            });

            modelBuilder.Entity<TblProductBenefits>(entity =>
            {
                entity.HasKey(e => e.BenefitId);

                entity.ToTable("tblProductBenefits", "PC");

                entity.Property(e => e.BenefitId)
                    .HasColumnName("BenefitID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BenefitTypeId).HasColumnName("BenefitTypeID");

                entity.Property(e => e.CoverId)
                    .HasColumnName("CoverID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrencyId).HasColumnName("CurrencyID");

                entity.Property(e => e.PremiumAmount).HasColumnType("numeric(10, 2)");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.BenefitType)
                    .WithMany(p => p.TblProductBenefits)
                    .HasForeignKey(d => d.BenefitTypeId)
                    .HasConstraintName("FK_blProductBenefits_tblmasProductMaster");

                entity.HasOne(d => d.Cover)
                    .WithMany(p => p.TblProductBenefits)
                    .HasForeignKey(d => d.CoverId)
                    .HasConstraintName("FK_tblProductBenefits_tblProductCovers");

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.TblProductBenefits)
                    .HasForeignKey(d => d.CurrencyId)
                    .HasConstraintName("FK_tblProductBenefits_tblmasPCCommonTypes");
            });

            modelBuilder.Entity<TblProductChannels>(entity =>
            {
                entity.HasKey(e => e.ChannelId);

                entity.ToTable("tblProductChannels", "PC");

                entity.Property(e => e.ChannelId)
                    .HasColumnName("ChannelID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ChannelTypeId).HasColumnName("ChannelTypeID");

                entity.Property(e => e.EffectiveFrom).HasColumnType("datetime");

                entity.Property(e => e.EffectiveTo).HasColumnType("datetime");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.ChannelType)
                    .WithMany(p => p.TblProductChannels)
                    .HasForeignKey(d => d.ChannelTypeId)
                    .HasConstraintName("FK_tblProductChannels_tblmasPCCommonTypes");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductChannels)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductChannels_tblProducts");
            });

            modelBuilder.Entity<TblProductClausesWarrentiesExclusions>(entity =>
            {
                entity.HasKey(e => e.Cweid);

                entity.ToTable("tblProductClausesWarrentiesExclusions", "PC");

                entity.HasIndex(e => new { e.CwetypeId, e.IsPrint, e.TypeName, e.Description, e.LevelId, e.SubLevelId, e.RefId, e.ProductId })
                    .HasName("missing_index_375_374");

                entity.Property(e => e.Cweid)
                    .HasColumnName("CWEID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CwetypeId).HasColumnName("CWETypeID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.RefId).HasColumnName("RefID");

                entity.Property(e => e.SubLevelId).HasColumnName("SubLevelID");

                entity.Property(e => e.TypeName)
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                entity.HasOne(d => d.Cwetype)
                    .WithMany(p => p.TblProductClausesWarrentiesExclusions)
                    .HasForeignKey(d => d.CwetypeId)
                    .HasConstraintName("FK_tblProductClausesWarrentiesExclusions_tblmasPCCommonTypes");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductClausesWarrentiesExclusions)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductClausesWarrentiesExclusions_tblProducts");
            });

            modelBuilder.Entity<TblProductCovers>(entity =>
            {
                entity.HasKey(e => e.CoverId);

                entity.ToTable("tblProductCovers", "PC");

                entity.Property(e => e.CoverId)
                    .HasColumnName("CoverID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CoverDescription)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.CoverEventFactorValueFrom).HasMaxLength(50);

                entity.Property(e => e.CoverEventFactorValueTo).HasMaxLength(50);

                entity.Property(e => e.CoverPeriod).HasMaxLength(50);

                entity.Property(e => e.CoverTypeId).HasColumnName("CoverTypeID");

                entity.Property(e => e.CurrencyId).HasColumnName("CurrencyID");

                entity.Property(e => e.InsurableItemId)
                    .HasColumnName("InsurableItemID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PremiumAmount).HasColumnType("numeric(10, 2)");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.CoverEventFactor)
                    .WithMany(p => p.TblProductCoversCoverEventFactor)
                    .HasForeignKey(d => d.CoverEventFactorId);

                entity.HasOne(d => d.CoverEventFactorValueUnit)
                    .WithMany(p => p.TblProductCoversCoverEventFactorValueUnit)
                    .HasForeignKey(d => d.CoverEventFactorValueUnitId);

                entity.HasOne(d => d.CoverEvent)
                    .WithMany(p => p.TblProductCoversCoverEvent)
                    .HasForeignKey(d => d.CoverEventId);

                entity.HasOne(d => d.CoverType)
                    .WithMany(p => p.TblProductCoversCoverType)
                    .HasForeignKey(d => d.CoverTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblProductCovers_tblmasProductMaster");

                entity.HasOne(d => d.InsurableItem)
                    .WithMany(p => p.TblProductCovers)
                    .HasForeignKey(d => d.InsurableItemId)
                    .HasConstraintName("FK_tblProductCovers_tblProductInsurableItems");
            });

            modelBuilder.Entity<TblProductEntity>(entity =>
            {
                entity.HasKey(e => e.MasterId)
                    .HasName("PK_MasterID");

                entity.ToTable("tblProductEntity", "PC");

                entity.Property(e => e.MasterId).HasColumnName("MasterID");

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.Parameter).HasMaxLength(200);

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.UserInputType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<TblProductInsurableItems>(entity =>
            {
                entity.HasKey(e => e.InsurableItemId);

                entity.ToTable("tblProductInsurableItems", "PC");

                entity.Property(e => e.InsurableItemId)
                    .HasColumnName("InsurableItemID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.InsurableItemTypeId).HasColumnName("InsurableItemTypeID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.InsurableCategory)
                    .WithMany(p => p.TblProductInsurableItemsInsurableCategory)
                    .HasForeignKey(d => d.InsurableCategoryId)
                    .HasConstraintName("FK_tblProductInsurableCategory_tblmasProductMaster");

                entity.HasOne(d => d.InsurableItemType)
                    .WithMany(p => p.TblProductInsurableItemsInsurableItemType)
                    .HasForeignKey(d => d.InsurableItemTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblProductInsurableItems_tblmasProductMaster");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductInsurableItems)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblProductInsurableItems_tblProducts");
            });

            modelBuilder.Entity<TblProductPremium>(entity =>
            {
                entity.HasKey(e => e.PremiumId);

                entity.ToTable("tblProductPremium", "PC");

                entity.Property(e => e.PremiumId)
                    .HasColumnName("PremiumID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CoverId)
                    .HasColumnName("CoverID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CurrencyId).HasColumnName("CurrencyID");

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.PremiumAmount).HasColumnType("numeric(10, 2)");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.RatingId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RefId).HasColumnName("RefID");

                entity.Property(e => e.SubLevelId).HasColumnName("SubLevelID");

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.TblProductPremiumCurrency)
                    .HasForeignKey(d => d.CurrencyId)
                    .HasConstraintName("FK_tblProductPremium_tblmasPCCommonTypes");

                entity.HasOne(d => d.Level)
                    .WithMany(p => p.TblProductPremiumLevel)
                    .HasForeignKey(d => d.LevelId)
                    .HasConstraintName("FK_tblProductPremiumLevel_tblmasPCCommonTypes");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductPremium)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductPremium_tblProducts");
            });

            modelBuilder.Entity<TblProductRatingMapping>(entity =>
            {
                entity.HasKey(e => e.MappingId);

                entity.ToTable("tblProductRatingMapping", "PC");

                entity.Property(e => e.MappingId).HasColumnName("MappingID");

                entity.Property(e => e.RateParameterName).HasMaxLength(50);

                entity.Property(e => e.RatingConfigId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RiskParameterName).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductRatingMapping)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductRatingMapping_tblProducts");
            });

            modelBuilder.Entity<TblProductRcbdetails>(entity =>
            {
                entity.HasKey(e => e.RcbdetailsId);

                entity.ToTable("tblProductRCBdetails", "PC");

                entity.HasIndex(e => e.ProductId)
                    .HasName("missing_index_210_209");

                entity.HasIndex(e => new { e.ProductId, e.InputType, e.IsReqired })
                    .HasName("missing_index_212_211");

                entity.HasIndex(e => new { e.InputType, e.IsReqired, e.InputId, e.LevelId, e.SubLevelId, e.RefId, e.ProductId })
                    .HasName("missing_index_221_220");

                entity.Property(e => e.RcbdetailsId)
                    .HasColumnName("RCBdetailsID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.InputId).HasColumnName("InputID");

                entity.Property(e => e.InputType).HasMaxLength(50);

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.RefId).HasColumnName("RefID");

                entity.Property(e => e.SubLevelId).HasColumnName("SubLevelID");

                entity.HasOne(d => d.Input)
                    .WithMany(p => p.TblProductRcbdetailsInput)
                    .HasForeignKey(d => d.InputId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblProductRCBdetails_tblmasProductMaster");

                entity.HasOne(d => d.Level)
                    .WithMany(p => p.TblProductRcbdetailsLevel)
                    .HasForeignKey(d => d.LevelId)
                    .HasConstraintName("FK_tblProductRCBdetailsLevel_tblmasProductMaster");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductRcbdetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductRCBdetails_tblProducts");
            });

            modelBuilder.Entity<TblProductSwitchOnDetails>(entity =>
            {
                entity.HasKey(e => e.SwitchOnId);

                entity.ToTable("tblProductSwitchOnDetails", "PC");

                entity.Property(e => e.SwitchOnId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.InputId).HasColumnName("InputID");

                entity.Property(e => e.InputType).HasMaxLength(50);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Input)
                    .WithMany(p => p.TblProductSwitchOnDetails)
                    .HasForeignKey(d => d.InputId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblProductSwitchOnDetails_tblmasProductMaster");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductSwitchOnDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductSwitchOnDetails_tblProducts");
            });

            modelBuilder.Entity<TblProducts>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.ToTable("tblProducts", "PC");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.ActiveFrom).HasColumnType("datetime");

                entity.Property(e => e.ActiveTo).HasColumnType("datetime");

                entity.Property(e => e.Cobid).HasColumnName("COBID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Lobid).HasColumnName("LOBID");

                entity.Property(e => e.ModifyDate).HasColumnType("datetime");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PartnerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PremiumAmount).HasColumnType("numeric(10, 2)");

                entity.Property(e => e.ProductCode).HasMaxLength(50);

                entity.Property(e => e.ProductName).HasMaxLength(200);

                entity.Property(e => e.ProductStatusId).HasColumnName("ProductStatusID");

                entity.HasOne(d => d.Cob)
                    .WithMany(p => p.TblProductsCob)
                    .HasForeignKey(d => d.Cobid)
                    .HasConstraintName("FK_tblProducts_tblmasProductMaster_cobid");

                entity.HasOne(d => d.Lob)
                    .WithMany(p => p.TblProductsLob)
                    .HasForeignKey(d => d.Lobid)
                    .HasConstraintName("FK_tblProducts_tblmasProductMaster_lobid");

                entity.HasOne(d => d.ProductStatus)
                    .WithMany(p => p.TblProducts)
                    .HasForeignKey(d => d.ProductStatusId)
                    .HasConstraintName("FK_tblProducts_tblmasPCCommonTypes_statusid");
            });

            modelBuilder.Entity<TblPromo>(entity =>
            {
                entity.HasKey(e => e.PromoId);

                entity.ToTable("tblPromo", "PC");

                entity.Property(e => e.PromoId).HasColumnName("PromoID");

                entity.Property(e => e.PolicyNumber).HasMaxLength(50);

                entity.Property(e => e.ProductCode).HasMaxLength(250);

                entity.Property(e => e.PromoCode1)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PromoCode2).HasMaxLength(50);
            });

            modelBuilder.Entity<TblmasClausesWarrentiesExclusions>(entity =>
            {
                entity.HasKey(e => e.Cweid);

                entity.ToTable("tblmasClausesWarrentiesExclusions", "PC");

                entity.Property(e => e.Cweid).HasColumnName("CWEID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CwetypeId).HasColumnName("CWETypeID");

                entity.Property(e => e.LevelId).HasColumnName("LevelID");

                entity.Property(e => e.Lobid).HasColumnName("LOBID");

                entity.Property(e => e.ModifyDate).HasColumnType("datetime");

                entity.Property(e => e.SubLevelId).HasColumnName("SubLevelID");

                entity.Property(e => e.TypeName).IsRequired();

                entity.HasOne(d => d.Cwetype)
                    .WithMany(p => p.TblmasClausesWarrentiesExclusionsCwetype)
                    .HasForeignKey(d => d.CwetypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblmasClausesWarrentiesExclusions_tblmasProductMaster1");

                entity.HasOne(d => d.Level)
                    .WithMany(p => p.TblmasClausesWarrentiesExclusionsLevel)
                    .HasForeignKey(d => d.LevelId)
                    .HasConstraintName("FK_tblmasClausesWarrentiesExclusionsLevel_tblmasProductMaster");

                entity.HasOne(d => d.Lob)
                    .WithMany(p => p.TblmasClausesWarrentiesExclusionsLob)
                    .HasForeignKey(d => d.Lobid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblmasClausesWarrentiesExclusions_tblmasProductMaster");

                entity.HasOne(d => d.SubLevel)
                    .WithMany(p => p.TblmasClausesWarrentiesExclusionsSubLevel)
                    .HasForeignKey(d => d.SubLevelId)
                    .HasConstraintName("FK_tblmasClausesWarrentiesExclusionsSubLevel_tblmasProductMaster");
            });

            modelBuilder.Entity<TblmasDynamic>(entity =>
            {
                entity.ToTable("tblmasDynamic", "PC");

                entity.Property(e => e.Id).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.FieldType).HasMaxLength(250);

                entity.Property(e => e.Value).HasMaxLength(50);
            });

            modelBuilder.Entity<TblmasMapping>(entity =>
            {
                entity.HasKey(e => e.MappingId);

                entity.ToTable("tblmasMapping", "PC");

                entity.Property(e => e.MappingId).HasColumnName("MappingID");

                entity.Property(e => e.RateName).HasMaxLength(50);

                entity.Property(e => e.RatingId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RiskName).HasMaxLength(50);
            });

            modelBuilder.Entity<TblmasPccommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId);

                entity.ToTable("tblmasPCCommonTypes", "PC");

                entity.Property(e => e.CommonTypeId)
                    .HasColumnName("CommonTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<TblmasProductMaster>(entity =>
            {
                entity.HasKey(e => e.ProductMasterId)
                    .HasName("PK_ProductMasterID");

                entity.ToTable("tblmasProductMaster", "PC");

                entity.Property(e => e.ProductMasterId).HasColumnName("ProductMasterID");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.UserInputType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Value).HasMaxLength(200);
            });
        }
    }
}
