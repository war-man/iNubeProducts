using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class ProposalContext : DbContext
    {
        public ProposalContext()
        {
        }

        public ProposalContext(DbContextOptions<ProposalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblMasCommonTypes> TblMasCommonTypes { get; set; }
        public virtual DbSet<TblMasLifeQuestionnaires> TblMasLifeQuestionnaires { get; set; }
        public virtual DbSet<TblPolicy> TblPolicy { get; set; }
        public virtual DbSet<TblPolicyClientAddress> TblPolicyClientAddress { get; set; }
        public virtual DbSet<TblPolicyClients> TblPolicyClients { get; set; }
        public virtual DbSet<TblPolicyDocuments> TblPolicyDocuments { get; set; }
        public virtual DbSet<TblPolicyExtension> TblPolicyExtension { get; set; }
        public virtual DbSet<TblPolicyMemberAdditionalLifeStyleDetails> TblPolicyMemberAdditionalLifeStyleDetails { get; set; }
        public virtual DbSet<TblPolicyMemberAddress> TblPolicyMemberAddress { get; set; }
        public virtual DbSet<TblPolicyMemberBenefitDetails> TblPolicyMemberBenefitDetails { get; set; }
        public virtual DbSet<TblPolicyMemberClaimInfo> TblPolicyMemberClaimInfo { get; set; }
        public virtual DbSet<TblPolicyMemberDetails> TblPolicyMemberDetails { get; set; }
        public virtual DbSet<TblPolicyMemberFamilyHistory> TblPolicyMemberFamilyHistory { get; set; }
        public virtual DbSet<TblPolicyMemberInsuranceInfo> TblPolicyMemberInsuranceInfo { get; set; }
        public virtual DbSet<TblPolicyMemberLifeStyleDetails> TblPolicyMemberLifeStyleDetails { get; set; }
        public virtual DbSet<TblPolicyMemberQuestions> TblPolicyMemberQuestions { get; set; }
        public virtual DbSet<TblPolicyNomineeDetails> TblPolicyNomineeDetails { get; set; }
        public virtual DbSet<TblPolicyPremium> TblPolicyPremium { get; set; }
        public virtual DbSet<TblPolicyQuestionDetails> TblPolicyQuestionDetails { get; set; }
        public virtual DbSet<TblPolicyRelationship> TblPolicyRelationship { get; set; }
        public virtual DbSet<TblPolicyTopupDetails> TblPolicyTopupDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=AVOLifeP2;User ID=AVOLifeUserP2;Password=AVOLife*User123;Trusted_Connection=False;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<TblMasCommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypesId)
                    .HasName("PK_tblPLCommonTypes");

                entity.ToTable("tblMasCommonTypes", "PL");

                entity.Property(e => e.CommonTypesId)
                    .HasColumnName("CommonTypesID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EffectiveDate).HasColumnType("datetime");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.MasterType)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ShortDesc)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblMasLifeQuestionnaires>(entity =>
            {
                entity.HasKey(e => e.Qid)
                    .HasName("PK__tblPLLif__CAB1462B50B6064F");

                entity.ToTable("tblMasLifeQuestionnaires", "PL");

                entity.Property(e => e.Qid).HasColumnName("QId");

                entity.Property(e => e.ControlType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.OccupationId).HasColumnName("OccupationID");

                entity.Property(e => e.PaqquestionsId)
                    .HasColumnName("PAQQuestionsID")
                    .HasMaxLength(20);

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.Property(e => e.Plter)
                    .HasColumnName("PLter")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.Qform)
                    .HasColumnName("QForm")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Qtext)
                    .HasColumnName("QText")
                    .IsUnicode(false);

                entity.Property(e => e.Qtype)
                    .HasColumnName("QType")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Relationship)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ResidentialStatus)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.SubControlType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SubQuestion).IsUnicode(false);

                entity.Property(e => e.Subtype)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Value)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblPolicy>(entity =>
            {
                entity.HasKey(e => e.PolicyId);

                entity.ToTable("tblPolicy", "PL");

                entity.HasIndex(e => new { e.PolicyVersion, e.QuoteNo })
                    .HasName("CT_tblPolicy_policyversion_Quoteno")
                    .IsUnique();

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AgentBusinessTypeId).HasColumnName("AgentBusinessTypeID");

                entity.Property(e => e.AgentId)
                    .HasColumnName("AgentID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AllocatedFrom)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AllocatedTo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AnnualPremium).HasMaxLength(30);

                entity.Property(e => e.BankAccountNumber).HasMaxLength(30);

                entity.Property(e => e.BankBranchName).HasMaxLength(30);

                entity.Property(e => e.BankName).HasMaxLength(30);

                entity.Property(e => e.BranchIdPk).HasColumnName("Branch_ID_PK");

                entity.Property(e => e.Channel)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CorporateId)
                    .HasColumnName("CorporateID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Createdby)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CreditCardNo).HasMaxLength(30);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.DepositPremium).HasMaxLength(30);

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IntroducerCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.IsAfc)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LeadNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MaturityBenefits).HasMaxLength(20);

                entity.Property(e => e.ModalPremium)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModeOfCommunication)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Others)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentFrequency)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentMethod)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentPaidBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PlanId).HasColumnName("PlanID");

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

                entity.Property(e => e.PolicyTerm)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyTypeId)
                    .HasColumnName("PolicyTypeID")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PreferredLanguage)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PreferredReceipt)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PremiumTerm)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.ProductIdPk).HasColumnName("Product_ID_PK");

                entity.Property(e => e.ProposalNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProposalSubmitDate).HasColumnType("datetime");

                entity.Property(e => e.QuoteNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RefNo)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.SmartPensionMonthlyIncome).HasMaxLength(20);

                entity.Property(e => e.SmartPensionReceivingPeriod).HasMaxLength(20);

                entity.Property(e => e.Smcode)
                    .HasColumnName("SMCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SubAgentId).HasColumnName("SubAgentID");

                entity.Property(e => e.SumInsured).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Years).HasMaxLength(20);
            });

            modelBuilder.Entity<TblPolicyClientAddress>(entity =>
            {
                entity.HasKey(e => e.AddressId)
                    .HasName("PK_tblProposer");

                entity.ToTable("tblPolicyClientAddress", "PL");

                entity.Property(e => e.AddressId)
                    .HasColumnName("AddressID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Address1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Address2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Address3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AddressTypeId).HasDefaultValueSql("((1))");

                entity.Property(e => e.AreaId).HasColumnName("AreaID");

                entity.Property(e => e.City)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.District)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DistrictId).HasColumnName("DistrictID");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyClientId)
                    .HasColumnName("PolicyClientID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SourceRowId)
                    .HasColumnName("SourceRowID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.State)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StateId).HasColumnName("StateID");
            });

            modelBuilder.Entity<TblPolicyClients>(entity =>
            {
                entity.HasKey(e => e.PolicyClientId);

                entity.ToTable("tblPolicyClients", "PL");

                entity.Property(e => e.PolicyClientId)
                    .HasColumnName("PolicyClientID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AltEmailId)
                    .HasColumnName("AltEmailID")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AlteranteMobileNo)
                    .HasColumnName("AlteranteMobileNO")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessRegistrationNo)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Citizenship1)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Citizenship2)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ContactPerson)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CorporateName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CountryOccupation)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.Designation)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.DrivingLicense)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmailId)
                    .HasColumnName("EmailID")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Fax)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.HandledBy)
                    .HasColumnName("handledBy")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.HomeNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MobileNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MonthlyIncome)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NameWithInitials)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NatureOfDuties)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Newnicno)
                    .HasColumnName("NEWNICNo")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OccupationId).HasColumnName("OccupationID");

                entity.Property(e => e.Oldnicno)
                    .HasColumnName("OLDNICNo")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PassportNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PermanetAddressId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PreferredName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProposerEamilId)
                    .HasColumnName("ProposerEamilID")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ProposerTelepohoneNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ResidentialNationality)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResidentialNationalityStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpecifyHazardousWork).HasMaxLength(20);

                entity.Property(e => e.SpecifyResidental).HasMaxLength(20);

                entity.Property(e => e.Title)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UstaxpayerId)
                    .HasColumnName("USTaxpayerId")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WorkNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.PermanetAddress)
                    .WithMany(p => p.TblPolicyClients)
                    .HasForeignKey(d => d.PermanetAddressId)
                    .HasConstraintName("fk_AddressId_Pk_tblAddress");
            });

            modelBuilder.Entity<TblPolicyDocuments>(entity =>
            {
                entity.HasKey(e => e.DocumentUploadId)
                    .HasName("DocumentUploadID");

                entity.ToTable("tblPolicyDocuments", "PL");

                entity.Property(e => e.DocumentUploadId)
                    .HasColumnName("DocumentUploadID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.ContentType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Decision)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.DocumentType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FileName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.FilePath).IsUnicode(false);

                entity.Property(e => e.IsNewDocumentAdded).HasColumnName("isNewDocumentAdded");

                entity.Property(e => e.ItemType)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.MemberType)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Permission)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Remarks)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyDocuments)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK_tblPolicyDocuments_tblPolicy");
            });

            modelBuilder.Entity<TblPolicyExtension>(entity =>
            {
                entity.HasKey(e => e.PolicyExtensionId)
                    .HasName("PK__tblPolic__0940B2270E180F15");

                entity.ToTable("tblPolicyExtension", "PL");

                entity.Property(e => e.PolicyExtensionId)
                    .HasColumnName("PolicyExtensionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DoctorName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.LabName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentMadeByForDoctor)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentMadeByForLab)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ProposalNeed).HasMaxLength(10);

                entity.Property(e => e.ProposerCountry).HasMaxLength(30);

                entity.Property(e => e.ProposerDate).HasColumnType("datetime");

                entity.Property(e => e.ProposerDocumentType).HasMaxLength(30);

                entity.Property(e => e.ProposerPlace).HasMaxLength(30);

                entity.Property(e => e.ProposerWealthPlannerComments).HasMaxLength(30);

                entity.Property(e => e.ProposerWealthPlannerPolicyBackDate).HasColumnType("datetime");

                entity.Property(e => e.ProspectSignPath).HasMaxLength(1);

                entity.Property(e => e.ReportsTobeSendTo)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseCountry).HasMaxLength(30);

                entity.Property(e => e.SpouseDate).HasColumnType("datetime");

                entity.Property(e => e.SpouseDocumentType).HasMaxLength(30);

                entity.Property(e => e.SpousePlace).HasMaxLength(30);

                entity.Property(e => e.SpouseSignPath).HasMaxLength(1);

                entity.Property(e => e.SpouseWealthPlannerComments).HasMaxLength(30);

                entity.Property(e => e.SpouseWealthPlannerPolicyBackDate).HasColumnType("datetime");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyExtension)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK_tblpolicyextension_tblPolicy");
            });

            modelBuilder.Entity<TblPolicyMemberAdditionalLifeStyleDetails>(entity =>
            {
                entity.HasKey(e => e.AdditionalLifeStyleId)
                    .HasName("PK_tblMemberAdditionalLifeStyleDetails");

                entity.ToTable("tblPolicyMemberAdditionalLifeStyleDetails", "PL");

                entity.Property(e => e.AdditionalLifeStyleId).HasColumnName("AdditionalLifeStyleID");

                entity.Property(e => e.ItemType)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.MemberLifeStyleId).HasColumnName("MemberLifeStyleID");

                entity.Property(e => e.Number)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Per)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Term)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.MemberLifeStyle)
                    .WithMany(p => p.TblPolicyMemberAdditionalLifeStyleDetails)
                    .HasForeignKey(d => d.MemberLifeStyleId)
                    .HasConstraintName("FK_tblMemberAdditionalLifeStyleDetails_tblMemberLifeStyleDetails");
            });

            modelBuilder.Entity<TblPolicyMemberAddress>(entity =>
            {
                entity.HasKey(e => e.AddressId);

                entity.ToTable("tblPolicyMemberAddress", "PL");

                entity.Property(e => e.AddressId)
                    .HasColumnName("AddressID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Address1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Address2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Address3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AddressTypeId).HasDefaultValueSql("((1))");

                entity.Property(e => e.AreaId).HasColumnName("AreaID");

                entity.Property(e => e.City)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.District)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DistrictId).HasColumnName("DistrictID");

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.SourceRowId)
                    .HasColumnName("SourceRowID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.State)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StateId).HasColumnName("StateID");

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblPolicyMemberAddress)
                    .HasForeignKey(d => d.MemberId)
                    .HasConstraintName("FK_tblPolicyMemberAddress_tblPolicyMemberDetails");
            });

            modelBuilder.Entity<TblPolicyMemberBenefitDetails>(entity =>
            {
                entity.HasKey(e => e.MemberBenifitId)
                    .HasName("PK_tblPolicyMemberbenifit");

                entity.ToTable("tblPolicyMemberBenefitDetails", "PL");

                entity.Property(e => e.MemberBenifitId)
                    .HasColumnName("MemberBenifitID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AssuredName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.BenifitId).HasColumnName("BenifitID");

                entity.Property(e => e.LoadingAmount)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Premium)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.RelationShipWithProposer)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.SumInsured)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.TotalPremium)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblPolicyMemberBenefitDetails)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblPolicy__Membe__247D636F");
            });

            modelBuilder.Entity<TblPolicyMemberClaimInfo>(entity =>
            {
                entity.HasKey(e => e.MemberClaimId)
                    .HasName("PK__tblPolicyMemberClaim__DED6FAC5351DDF8C");

                entity.ToTable("tblPolicyMemberClaimInfo", "PL");

                entity.Property(e => e.MemberClaimId)
                    .HasColumnName("MemberClaimID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CompanyName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.DateOfClaim).HasColumnType("datetime");

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NatureOfClaim)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ProposalNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblPolicyMemberClaimInfo)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblPolicy__Membe__21A0F6C4");
            });

            modelBuilder.Entity<TblPolicyMemberDetails>(entity =>
            {
                entity.HasKey(e => e.MemberId)
                    .HasName("PK__tblPolicMember__DED6FAC5351DDF8C");

                entity.ToTable("tblPolicyMemberDetails", "PL");

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AdditionalPremium)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AdressId)
                    .HasColumnName("AdressID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Afc).HasColumnName("AFC");

                entity.Property(e => e.AlternateMobileNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AnnualPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Assuredname)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.BasicPremium)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.BasicSuminsured)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Bmivalue)
                    .HasColumnName("BMIValue")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Citizenship1)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Citizenship2)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ClientCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CountryOccupation)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.DrivingLicense)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Fal)
                    .HasColumnName("FAL")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Fullname)
                    .HasColumnName("FULLName")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Home)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Landline)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MaritialStatus)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.MemberPremium)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Mobile)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MonthlyIncome)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NameWithInitial)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nationality)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NatureOfDuties)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Newnicno)
                    .HasColumnName("NEWNICNO")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.OccupationId).HasColumnName("OccupationID");

                entity.Property(e => e.Ocr).HasColumnName("OCR");

                entity.Property(e => e.OcrimageRecognition).HasColumnName("OCRImageRecognition");

                entity.Property(e => e.Oldnicno)
                    .HasColumnName("OLDNICNO")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PassportNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PermanetAddressId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PreferredName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResidentialNationality)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResidentialNationalityStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Salutation)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Sam)
                    .HasColumnName("SAM")
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Sar)
                    .HasColumnName("SAR")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.SpecifyHazardousWork).HasMaxLength(20);

                entity.Property(e => e.SpecifyResidental).HasMaxLength(20);

                entity.Property(e => e.TotalAccidental)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalCritical)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalDeath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalHospitalization)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalHospitalizationReimbursement)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UnitOfHeight)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UnitOfWeight)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UstaxpayerId)
                    .HasColumnName("USTaxpayerId")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Weight).HasColumnName("weight");

                entity.Property(e => e.Work)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Adress)
                    .WithMany(p => p.TblPolicyMemberDetailsAdress)
                    .HasForeignKey(d => d.AdressId)
                    .HasConstraintName("FK_tblPolicyMemberDetails_tblAdress");

                entity.HasOne(d => d.PermanetAddress)
                    .WithMany(p => p.TblPolicyMemberDetailsPermanetAddress)
                    .HasForeignKey(d => d.PermanetAddressId)
                    .HasConstraintName("fk_tblPolicyMemberDetails_Pemanent_tblAddress");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyMemberDetails)
                    .HasForeignKey(d => d.PolicyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblPolicy__Polic__7E57BA87");
            });

            modelBuilder.Entity<TblPolicyMemberFamilyHistory>(entity =>
            {
                entity.HasKey(e => e.MemberFamilyHistoryId)
                    .HasName("PK__tblPolicyMemberFamilyHistory__DED6FAC5351DDF8C");

                entity.ToTable("tblPolicyMemberFamilyHistory", "PL");

                entity.Property(e => e.MemberFamilyHistoryId)
                    .HasColumnName("MemberFamilyHistoryID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Below60AgeDeath).HasColumnName("Below_60_Age_Death");

                entity.Property(e => e.CauseofDeath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Details).IsUnicode(false);

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RelationshipWithMember)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StateofHealth)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblPolicyMemberFamilyHistory)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblPolicy__Membe__0BB1B5A5");
            });

            modelBuilder.Entity<TblPolicyMemberInsuranceInfo>(entity =>
            {
                entity.HasKey(e => e.MemberInsuranceId)
                    .HasName("PK__tblPolicyMemberInsurance__DED6FAC5351DDF8C");

                entity.ToTable("tblPolicyMemberInsuranceInfo", "PL");

                entity.Property(e => e.MemberInsuranceId)
                    .HasColumnName("MemberInsuranceID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccidentalBenifit)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CompanyName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.CriticalIllnessBenifit)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CurrentStatus)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.HospitalizationPerDay)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.HospitalizationReimbursement)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyProposalNo)
                    .HasColumnName("Policy/ProposalNo")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalSiatDeath)
                    .HasColumnName("TotalSIAtDeath")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblPolicyMemberInsuranceInfo)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblPolicy__Membe__1EC48A19");
            });

            modelBuilder.Entity<TblPolicyMemberLifeStyleDetails>(entity =>
            {
                entity.HasKey(e => e.MemberLifeStyleId)
                    .HasName("PK_tblMemberLifeStyleDetails");

                entity.ToTable("tblPolicyMemberLifeStyleDetails", "PL");

                entity.Property(e => e.MemberLifeStyleId).HasColumnName("MemberLifeStyleID");

                entity.Property(e => e.Height)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.HeightFeets)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.UnitofHeight)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.UnitofWeight)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Weight)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblPolicyMemberLifeStyleDetails)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblMember__Membe__031C6FA4");
            });

            modelBuilder.Entity<TblPolicyMemberQuestions>(entity =>
            {
                entity.HasKey(e => e.MemberQuestionId)
                    .HasName("PK_tblMemberQuestions");

                entity.ToTable("tblPolicyMemberQuestions", "PL");

                entity.Property(e => e.MemberQuestionId)
                    .HasColumnName("MemberQuestionID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Answer)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.ItemType)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Qid).HasColumnName("QID");

                entity.Property(e => e.SubAnswer)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.SubType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblPolicyMemberQuestions)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblMember__Membe__08D548FA");
            });

            modelBuilder.Entity<TblPolicyNomineeDetails>(entity =>
            {
                entity.HasKey(e => e.NomineeId)
                    .HasName("PK__tblPolic__40B5EA3645D6979E");

                entity.ToTable("tblPolicyNomineeDetails", "PL");

                entity.Property(e => e.NomineeId)
                    .HasColumnName("NomineeID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AppointeeDob)
                    .HasColumnName("AppointeeDOB")
                    .HasColumnType("date");

                entity.Property(e => e.AppointeeName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ClientCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.Nicno)
                    .HasColumnName("NICNo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NomineeAddress)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.NomineeGender)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NomineeIntialName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NomineeMartialStatus)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NomineeMobileNo)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NomineeName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NomineeShare)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NomineeSurName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.OtherRelation)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Salutation)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyNomineeDetails)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK__tblPolicy__Polic__47BEE010");
            });

            modelBuilder.Entity<TblPolicyPremium>(entity =>
            {
                entity.HasKey(e => e.PremiumId)
                    .HasName("PK_tblProposalPremium");

                entity.ToTable("tblPolicyPremium", "PL");

                entity.Property(e => e.PremiumId)
                    .HasColumnName("PremiumID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AdditionalPremium).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.AnnualPremium).HasColumnType("numeric(18, 4)");

                entity.Property(e => e.BasicPremium).HasColumnType("numeric(18, 4)");

                entity.Property(e => e.BasicSumInsured).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Cess).HasColumnType("numeric(18, 4)");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.HalfYearlyPremium).HasColumnType("numeric(18, 4)");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.MonthlyPremium).HasColumnType("numeric(18, 4)");

                entity.Property(e => e.PolicyFee).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.QuaterlyPremium).HasColumnType("numeric(18, 4)");

                entity.Property(e => e.Vat)
                    .HasColumnName("VAT")
                    .HasColumnType("numeric(18, 4)");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyPremium)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK_tblProposalPremium_tblPolicy_PolicyID");
            });

            modelBuilder.Entity<TblPolicyQuestionDetails>(entity =>
            {
                entity.HasKey(e => e.QuestionsId)
                    .HasName("PK__tblQuest__877DE89BF9DF32CE");

                entity.ToTable("tblPolicyQuestionDetails", "PL");

                entity.Property(e => e.QuestionsId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DateFiled1).HasColumnType("datetime");

                entity.Property(e => e.DateFiled2).HasColumnType("datetime");

                entity.Property(e => e.DateFiled3).HasColumnType("datetime");

                entity.Property(e => e.DateFiled4).HasColumnType("datetime");

                entity.Property(e => e.MemberId)
                    .HasColumnName("MemberID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PaqassetsEquities)
                    .HasColumnName("PAQAssetsEquities")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqassetsInvestment)
                    .HasColumnName("PAQAssetsInvestment")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqassetsOther)
                    .HasColumnName("PAQAssetsOther")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqassetsProperty)
                    .HasColumnName("PAQAssetsProperty")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqassetsTotal)
                    .HasColumnName("PAQAssetsTotal")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqliabilitiesLoans)
                    .HasColumnName("PAQLiabilitiesLoans")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqliabilitiesMortgages)
                    .HasColumnName("PAQLiabilitiesMortgages")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqliabilitiesOthers)
                    .HasColumnName("PAQLiabilitiesOthers")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqliabilitiesTotal)
                    .HasColumnName("PAQLiabilitiesTotal")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PaqvarcharFiled1)
                    .HasColumnName("PAQvarcharFiled1")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled10)
                    .HasColumnName("PAQvarcharFiled10")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled11)
                    .HasColumnName("PAQvarcharFiled11")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled12)
                    .HasColumnName("PAQvarcharFiled12")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled2)
                    .HasColumnName("PAQvarcharFiled2")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled3)
                    .HasColumnName("PAQvarcharFiled3")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled4)
                    .HasColumnName("PAQvarcharFiled4")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled5)
                    .HasColumnName("PAQvarcharFiled5")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled6)
                    .HasColumnName("PAQvarcharFiled6")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled7)
                    .HasColumnName("PAQvarcharFiled7")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled8)
                    .HasColumnName("PAQvarcharFiled8")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqvarcharFiled9)
                    .HasColumnName("PAQvarcharFiled9")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqyearFiled1)
                    .HasColumnName("PAQYearFiled1")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqyearFiled2)
                    .HasColumnName("PAQYearFiled2")
                    .HasMaxLength(20);

                entity.Property(e => e.PaqyearFiled3)
                    .HasColumnName("PAQYearFiled3")
                    .HasMaxLength(20);

                entity.Property(e => e.Qid).HasColumnName("QID");

                entity.Property(e => e.VarcharFiled1)
                    .HasColumnName("varcharFiled1")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled10)
                    .HasColumnName("varcharFiled10")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled11)
                    .HasColumnName("varcharFiled11")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled12)
                    .HasColumnName("varcharFiled12")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled2)
                    .HasColumnName("varcharFiled2")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled3)
                    .HasColumnName("varcharFiled3")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled4)
                    .HasColumnName("varcharFiled4")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled5)
                    .HasColumnName("varcharFiled5")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled6)
                    .HasColumnName("varcharFiled6")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled7)
                    .HasColumnName("varcharFiled7")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled8)
                    .HasColumnName("varcharFiled8")
                    .HasMaxLength(50);

                entity.Property(e => e.VarcharFiled9)
                    .HasColumnName("varcharFiled9")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.TblPolicyQuestionDetails)
                    .HasForeignKey(d => d.MemberId)
                    .HasConstraintName("FK__tblQuesti__Membe__19FFD4FC");

                entity.HasOne(d => d.Q)
                    .WithMany(p => p.TblPolicyQuestionDetails)
                    .HasForeignKey(d => d.Qid)
                    .HasConstraintName("FK__tblQuestion__QID__1AF3F935");
            });

            modelBuilder.Entity<TblPolicyRelationship>(entity =>
            {
                entity.HasKey(e => e.PolicyRelationshipId);

                entity.ToTable("tblPolicyRelationship", "PL");

                entity.Property(e => e.PolicyRelationshipId)
                    .HasColumnName("PolicyRelationshipID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyClientId)
                    .HasColumnName("PolicyClientID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PolicyId)
                    .HasColumnName("PolicyID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ProspectId)
                    .HasColumnName("ProspectID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RelationshipId).HasColumnName("RelationshipID");

                entity.HasOne(d => d.PolicyClient)
                    .WithMany(p => p.TblPolicyRelationship)
                    .HasForeignKey(d => d.PolicyClientId)
                    .HasConstraintName("FK_tblPolicyRelationship_tblPolicyClients");

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyRelationship)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK_tblPolicyRelationship_tblPolicy");
            });

            modelBuilder.Entity<TblPolicyTopupDetails>(entity =>
            {
                entity.ToTable("tblPolicyTopupDetails", "PL");

                entity.Property(e => e.Amount)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TopupPolicyYear)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.TblPolicyTopupDetails)
                    .HasForeignKey(d => d.PolicyId)
                    .HasConstraintName("FK__tblPolicy__Polic__379037E3");
            });
        }
    }
}
