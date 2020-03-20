using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Policy.Entities
{
    public partial class MICAPOContext : DbContext
    {
        public MICAPOContext()
        {
        }

        public MICAPOContext(DbContextOptions<MICAPOContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAdditionalDetails> TblAdditionalDetails { get; set; }
        public virtual DbSet<TblEndorsementDetails> TblEndorsementDetails { get; set; }
        public virtual DbSet<TblNumberingScheme> TblNumberingScheme { get; set; }
        public virtual DbSet<TblPolicy> TblPolicy { get; set; }
        public virtual DbSet<TblPolicyDetails> TblPolicyDetails { get; set; }
        public virtual DbSet<TblPolicyInsurableDetails> TblPolicyInsurableDetails { get; set; }
        public virtual DbSet<TblPolicyPayment> TblPolicyPayment { get; set; }
        public virtual DbSet<TblmasPocommonTypes> TblmasPocommonTypes { get; set; }

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
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<TblAdditionalDetails>(entity =>
            {
                entity.HasKey(e => e.AdditionalDetailsId)
                    .HasName("PK_tblFeedback");

                entity.ToTable("tblAdditionalDetails", "PO");

                entity.Property(e => e.AdditionalDetailsId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CompanyAddress).IsUnicode(false);

                entity.Property(e => e.CompanyEmail)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyFeedback).IsUnicode(false);

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyNumber)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyUsage).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.PolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblEndorsementDetails>(entity =>
            {
                entity.HasKey(e => e.EndorsementId);

                entity.ToTable("tblEndorsementDetails", "PO");

                entity.Property(e => e.EndorsementId)
                    .HasColumnName("EndorsementID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Action)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AmountBalanced).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.DateOfPayment).HasColumnType("datetime");

                entity.Property(e => e.EndorsementEffectivedate).HasColumnType("datetime");

                entity.Property(e => e.EndorsementNo).HasMaxLength(50);

                entity.Property(e => e.Gst)
                    .HasColumnName("GST")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.PaymentGatewayReferenceId)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PremiumAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TotalPremiumAmount).HasColumnType("numeric(18, 2)");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblEndorsementDetails)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK_tblEndorsementDetails_tblPolicy");
            });

            modelBuilder.Entity<TblNumberingScheme>(entity =>
            {
                entity.HasKey(e => e.NumberingSchemeId)
                    .HasName("Pk_tblNumberingScheme");

                entity.ToTable("tblNumberingScheme", "PO");

                entity.HasIndex(e => e.NumberingType)
                    .HasName("IX_tblNumberingScheme");

                entity.Property(e => e.NumberingSchemeId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Fixedcode)
                    .HasColumnName("fixedcode")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Highestnumber).HasColumnName("highestnumber");

                entity.Property(e => e.Nextnumber).HasColumnName("nextnumber");

                entity.Property(e => e.NumberingType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ProductId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Rowguid)
                    .HasColumnName("rowguid")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Step).HasColumnName("step");
            });

            modelBuilder.Entity<TblPolicy>(entity =>
            {
                entity.HasKey(e => e.PolicyId);

                entity.ToTable("tblPolicy", "PO");

                entity.HasIndex(e => e.ProductIdPk)
                    .HasName("missing_index_77_76");

                entity.HasIndex(e => new { e.CreatedDate, e.ProductIdPk, e.CustomerId })
                    .HasName("nci_wi_tblPolicy_D653896E6374389F7AD7E5A8DA6A7039");

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

                entity.Property(e => e.CdaccountNumber)
                    .HasColumnName("CDAccountNumber")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Channel)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CorporateId)
                    .HasColumnName("CorporateID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CoverEvent).HasMaxLength(100);

                entity.Property(e => e.CoverName).HasMaxLength(100);

                entity.Property(e => e.CoverNoteIssueDate).HasColumnType("datetime");

                entity.Property(e => e.CoverNoteNo)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Csoid).HasColumnName("CSOID");

                entity.Property(e => e.Currency)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerId)
                    .HasColumnName("CustomerID")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.DocumentType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Irccode).HasColumnName("IRCCode");

                entity.Property(e => e.IsIrdaupdated).HasColumnName("IsIRDAUpdated");

                entity.Property(e => e.IsUploadedToIcm).HasColumnName("IsUploadedToICM");

                entity.Property(e => e.MasterPolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MasterPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MasterType)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.MobileNumber)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyEndDate).HasColumnType("datetime");

                entity.Property(e => e.PolicyIssueDate).HasColumnType("datetime");

                entity.Property(e => e.PolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyRemarks).IsUnicode(false);

                entity.Property(e => e.PolicyStageId).HasColumnName("PolicyStageID");

                entity.Property(e => e.PolicyStageStatusId).HasColumnName("PolicyStageStatusID");

                entity.Property(e => e.PolicyStartDate).HasColumnType("datetime");

                entity.Property(e => e.PolicyStatus)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyStatusId).HasColumnName("PolicyStatusID");

                entity.Property(e => e.PolicyTypeId)
                    .HasColumnName("PolicyTypeID")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PremiumAmount).HasColumnType("numeric(18, 2)");

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

            modelBuilder.Entity<TblPolicyDetails>(entity =>
            {
                entity.HasKey(e => e.PolicyDetailsId)
                    .HasName("Pk_tblPolicyDetails");

                entity.ToTable("tblPolicyDetails", "PO");

                entity.Property(e => e.PolicyDetailsId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.PolicyId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyDetails)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK_tblPolicyDetails_tblPolicy");
            });

            modelBuilder.Entity<TblPolicyInsurableDetails>(entity =>
            {
                entity.HasKey(e => e.InsurableId);

                entity.ToTable("tblPolicyInsurableDetails", "PO");

                entity.Property(e => e.InsurableId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BenefitAmount).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.CoverName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CoverValue).IsUnicode(false);

                entity.Property(e => e.IdentificationNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsurableItem)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyInsurableDetails)
                    .HasForeignKey(d => d.PolicyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblPolicyInsurableDetails_tblPolicy");
            });

            modelBuilder.Entity<TblPolicyPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentId)
                    .HasName("PK__tblPolic__9B556A58B030E9AB");

                entity.ToTable("tblPolicyPayment", "PO");

                entity.Property(e => e.PaymentId)
                    .HasColumnName("PaymentID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.PaidAmount).HasColumnType("numeric(18, 4)");

                entity.Property(e => e.PolicyId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasColumnName("STATUS")
                    .IsUnicode(false);

                entity.Property(e => e.TxnType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyPayment)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK_tblPolicyPayment_tblPolicy");
            });

            modelBuilder.Entity<TblmasPocommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId);

                entity.ToTable("tblmasPOCommonTypes", "PO");

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
