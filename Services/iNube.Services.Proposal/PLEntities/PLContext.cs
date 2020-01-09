using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class PLContext : DbContext
    {
        public PLContext()
        {
        }

        public PLContext(DbContextOptions<PLContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TbPlasLdcommonTypes> TbPlasLdcommonTypes { get; set; }
        public virtual DbSet<TblAddress> TblAddress { get; set; }
        public virtual DbSet<TblContacts> TblContacts { get; set; }
        public virtual DbSet<TblCustomers> TblCustomers { get; set; }
        public virtual DbSet<TblLifeQq> TblLifeQq { get; set; }
        public virtual DbSet<TblMemberAdditionalLifeStyleDetails> TblMemberAdditionalLifeStyleDetails { get; set; }
        public virtual DbSet<TblMemberLifeStyleDetails> TblMemberLifeStyleDetails { get; set; }
        public virtual DbSet<TblMemberQuestions> TblMemberQuestions { get; set; }
        public virtual DbSet<TblOrganization> TblOrganization { get; set; }
        public virtual DbSet<TblPlcommonTypes> TblPlcommonTypes { get; set; }
        public virtual DbSet<TblPllifeQuestionnaires> TblPllifeQuestionnaires { get; set; }
        public virtual DbSet<TblPolicy> TblPolicy { get; set; }
        public virtual DbSet<TblPolicyClients> TblPolicyClients { get; set; }
        public virtual DbSet<TblPolicyDocuments> TblPolicyDocuments { get; set; }
        public virtual DbSet<TblPolicyExtension> TblPolicyExtension { get; set; }
        public virtual DbSet<TblPolicyMemberBenefitDetails> TblPolicyMemberBenefitDetails { get; set; }
        public virtual DbSet<TblPolicyMemberClaimInfo> TblPolicyMemberClaimInfo { get; set; }
        public virtual DbSet<TblPolicyMemberDetails> TblPolicyMemberDetails { get; set; }
        public virtual DbSet<TblPolicyMemberFamilyHistory> TblPolicyMemberFamilyHistory { get; set; }
        public virtual DbSet<TblPolicyMemberInsuranceInfo> TblPolicyMemberInsuranceInfo { get; set; }
        public virtual DbSet<TblPolicyNomineeDetails> TblPolicyNomineeDetails { get; set; }
        public virtual DbSet<TblPolicyRelationship> TblPolicyRelationship { get; set; }
        public virtual DbSet<TblPolicyTopupDetails> TblPolicyTopupDetails { get; set; }
        public virtual DbSet<TblProducts> TblProducts { get; set; }
        public virtual DbSet<TblProposalPremium> TblProposalPremium { get; set; }
        public virtual DbSet<TblQuestionDetails> TblQuestionDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=AVOLifeP2;User ID=AVOLifeUserP2; Password=AVOLife*User123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<TbPlasLdcommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypeId);

                entity.ToTable("tbPLasLDCommonTypes", "PL");

                entity.Property(e => e.CommonTypeId)
                    .HasColumnName("CommonTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.MasterType).HasMaxLength(50);

                entity.Property(e => e.TypeCode).HasMaxLength(50);

                entity.Property(e => e.Value).HasMaxLength(200);
            });

            modelBuilder.Entity<TblAddress>(entity =>
            {
                entity.HasKey(e => e.AddressId)
                    .HasName("PK_tblProposer");

                entity.ToTable("tblAddress", "PL");

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

                entity.Property(e => e.SourceRowId)
                    .HasColumnName("SourceRowID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.State)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StateId).HasColumnName("StateID");
            });

            modelBuilder.Entity<TblContacts>(entity =>
            {
                entity.HasKey(e => e.ContactId);

                entity.ToTable("tblContacts", "PL");

                entity.Property(e => e.ContactId).HasColumnName("ContactID");

                entity.Property(e => e.AddressId)
                    .HasColumnName("AddressID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ClientCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ContactType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ContactTypeId).HasColumnName("ContactTypeID");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.EmailId)
                    .HasColumnName("EmailID")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Employer)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.IntroducerCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.LastUpdated).HasColumnType("datetime");

                entity.Property(e => e.LeadNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MaritalStatusId)
                    .HasColumnName("MaritalStatusID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.MobileNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MonthlyIncome)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NationalityId)
                    .HasColumnName("NationalityID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Nicno)
                    .HasColumnName("NICNO")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OccupationId).HasColumnName("OccupationID");

                entity.Property(e => e.ParentContactId).HasColumnName("ParentContactID");

                entity.Property(e => e.PassportNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Place)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Relationship)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseDob)
                    .HasColumnName("SpouseDOB")
                    .HasColumnType("date");

                entity.Property(e => e.SpouseName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Work)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.TblContacts)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("FK__tblContac__Addre__25A691D2");

                entity.HasOne(d => d.ParentContact)
                    .WithMany(p => p.InverseParentContact)
                    .HasForeignKey(d => d.ParentContactId)
                    .HasConstraintName("FK__tblContac__Paren__2A6B46EF");
            });

            modelBuilder.Entity<TblCustomers>(entity =>
            {
                entity.HasKey(e => e.CustomerId)
                    .HasName("PK_tblClient");

                entity.ToTable("tblCustomers", "PL");

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.AdressId)
                    .HasColumnName("AdressID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.AltEmailId)
                    .HasColumnName("AltEmailID")
                    .HasMaxLength(255)
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

                entity.Property(e => e.CorporateName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CountryOccupation)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustUniqueId)
                    .HasColumnName("CustUniqueID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

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

                entity.Property(e => e.FullName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.HomeNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MaritalStatusId)
                    .HasColumnName("MaritalStatusID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MobileNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MonthlyIncome)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NameWithInitials)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NationalityId)
                    .HasColumnName("NationalityID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NatureofDuties)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Newnicno)
                    .HasColumnName("NEWNICNO")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Oldnicno)
                    .HasColumnName("OLDNICNO")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PassportNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PassportNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PreferredName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResidentialNationality)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResidentialNationalityStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

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

                entity.HasOne(d => d.Adress)
                    .WithMany(p => p.TblCustomers)
                    .HasForeignKey(d => d.AdressId)
                    .HasConstraintName("FK_tblCustomers_Adress");
            });

            modelBuilder.Entity<TblLifeQq>(entity =>
            {
                entity.HasKey(e => e.LifeQqid);

                entity.ToTable("tblLifeQQ", "PL");

                entity.Property(e => e.LifeQqid).HasColumnName("LifeQQID");

                entity.Property(e => e.AllocatedFrom)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AnnualPremium)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Cess)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ContactId).HasColumnName("ContactID");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Createdby)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.HalfyearlyPremium)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.IsAfc)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MaturityBenifits)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModalPremium)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Monthly)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.NeedId).HasColumnName("NeedID");

                entity.Property(e => e.NoOfOnGoingProposalWithAia).HasColumnName("NoOfOnGoingProposalWithAIA");

                entity.Property(e => e.NoOfPreviousPolicyWithAia).HasColumnName("NoOfPreviousPolicyWithAIA");

                entity.Property(e => e.OnGoingProposalWithAia)
                    .HasColumnName("OnGoingProposalWithAIA")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.PlanCode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyFee)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyTermId).HasColumnName("PolicyTermID");

                entity.Property(e => e.PreferredLanguage)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PreferredTerm)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PremiumPayingTermId).HasColumnName("PremiumPayingTermID");

                entity.Property(e => e.PreviousPolicyWithAia)
                    .HasColumnName("PreviousPolicyWithAIA")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.ProductNameId).HasColumnName("ProductNameID");

                entity.Property(e => e.ProposerSignPath)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.QqSumAssured)
                    .HasColumnName("QQ_SumAssured")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Qtype)
                    .HasColumnName("QType")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.QuarterlyPremium)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.QuoteNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RefNo)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.RiskCommencementDate).HasColumnType("datetime");

                entity.Property(e => e.Sam).HasColumnName("SAM");

                entity.Property(e => e.SignType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.Property(e => e.SurrenderYear)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Vat)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.WppsignPath)
                    .HasColumnName("WPPSignPath")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Wpsignature).HasColumnName("WPSignature");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.TblLifeQq)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblLifeQQ__ContactID");
            });

            modelBuilder.Entity<TblMemberAdditionalLifeStyleDetails>(entity =>
            {
                entity.HasKey(e => e.AdditionalLifeStyleId);

                entity.ToTable("tblMemberAdditionalLifeStyleDetails", "PL");

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
                    .WithMany(p => p.TblMemberAdditionalLifeStyleDetails)
                    .HasForeignKey(d => d.MemberLifeStyleId)
                    .HasConstraintName("FK_tblMemberAdditionalLifeStyleDetails_tblMemberLifeStyleDetails");
            });

            modelBuilder.Entity<TblMemberLifeStyleDetails>(entity =>
            {
                entity.HasKey(e => e.MemberLifeStyleId);

                entity.ToTable("tblMemberLifeStyleDetails", "PL");

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
                    .WithMany(p => p.TblMemberLifeStyleDetails)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblMember__Membe__031C6FA4");
            });

            modelBuilder.Entity<TblMemberQuestions>(entity =>
            {
                entity.HasKey(e => e.MemberQuestionId);

                entity.ToTable("tblMemberQuestions", "PL");

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
                    .WithMany(p => p.TblMemberQuestions)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tblMember__Membe__08D548FA");
            });

            modelBuilder.Entity<TblOrganization>(entity =>
            {
                entity.HasKey(e => e.OrganizationId)
                    .HasName("PK__tblOrgan__CADB0B722D9CB955");

                entity.ToTable("tblOrganization", "PL");

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountNumber)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.BankBranchId).HasColumnName("BankBranchID");

                entity.Property(e => e.ChannelCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Cinno)
                    .HasColumnName("CINNo")
                    .IsUnicode(false);

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CommAddressId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ConfigurationTypeId).HasColumnName("ConfigurationTypeID");

                entity.Property(e => e.ContractEffectiveFrom).HasColumnType("datetime");

                entity.Property(e => e.ContractEffectiveTo).HasColumnType("datetime");

                entity.Property(e => e.CorporateAddressId)
                    .HasColumnName("CorporateAddressID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CorporateCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");

                entity.Property(e => e.EffectiveFrom).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ExpiryDate).HasColumnType("datetime");

                entity.Property(e => e.FaxNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.GeoUnitCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IssueDate).HasColumnType("datetime");

                entity.Property(e => e.LastName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.License)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LicenseNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MailingAddressId)
                    .HasColumnName("MailingAddressID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.MailingAddressReferenceId).HasColumnName("MailingAddressReferenceID");

                entity.Property(e => e.MobileNo).HasColumnType("numeric(15, 0)");

                entity.Property(e => e.OfficePhone1).HasColumnType("numeric(15, 0)");

                entity.Property(e => e.OfficePhone2).HasColumnType("numeric(15, 0)");

                entity.Property(e => e.OrgCategoryId).HasColumnName("Org_CategoryID");

                entity.Property(e => e.OrgFaxNo)
                    .HasColumnName("Org_FaxNO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgLevels).HasColumnName("Org_Levels");

                entity.Property(e => e.OrgLogo).HasColumnName("Org_Logo");

                entity.Property(e => e.OrgName)
                    .HasColumnName("Org_Name")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OrgPhoneNo)
                    .HasColumnName("Org_PhoneNO")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrgType)
                    .HasColumnName("Org_Type")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrgTypeId).HasColumnName("Org_TypeID");

                entity.Property(e => e.OrgWebsite)
                    .HasColumnName("Org_Website")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.OtherConfigureId).HasColumnName("OtherConfigureID");

                entity.Property(e => e.Panno)
                    .HasColumnName("PANno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PartnerType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PayeeName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.RegAuthority)
                    .HasColumnName("Reg_Authority")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RegDate)
                    .HasColumnName("Reg_Date")
                    .HasColumnType("datetime");

                entity.Property(e => e.RegNoSt)
                    .HasColumnName("Reg_no_st")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RegisteredAddresId)
                    .HasColumnName("RegisteredAddresID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RegistrationAddressId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.RegistrationNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Regno)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocAdderssId)
                    .HasColumnName("SPOC_AdderssID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpocEmailId)
                    .HasColumnName("SPOC_EmailId")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocName)
                    .HasColumnName("SPOC_Name")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SpocPhoneno)
                    .HasColumnName("SPOC_Phoneno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SubChannelCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tanno)
                    .HasColumnName("TANno")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.YearOfEstablishment).HasColumnType("numeric(20, 0)");

                entity.HasOne(d => d.CorporateAddress)
                    .WithMany(p => p.TblOrganizationCorporateAddress)
                    .HasForeignKey(d => d.CorporateAddressId)
                    .HasConstraintName("FK_tblOrganization_tblAddress");

                entity.HasOne(d => d.MailingAddress)
                    .WithMany(p => p.TblOrganizationMailingAddress)
                    .HasForeignKey(d => d.MailingAddressId)
                    .HasConstraintName("FK_tblOrganization_tblAddress1");

                entity.HasOne(d => d.RegisteredAddres)
                    .WithMany(p => p.TblOrganizationRegisteredAddres)
                    .HasForeignKey(d => d.RegisteredAddresId)
                    .HasConstraintName("FK_tblOrganization_tblAddress2");

                entity.HasOne(d => d.SpocAdderss)
                    .WithMany(p => p.TblOrganizationSpocAdderss)
                    .HasForeignKey(d => d.SpocAdderssId)
                    .HasConstraintName("FK__tblOrgani__SPOC___3414ACBA");
            });

            modelBuilder.Entity<TblPlcommonTypes>(entity =>
            {
                entity.HasKey(e => e.CommonTypesId);

                entity.ToTable("tblPLCommonTypes", "PL");

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

            modelBuilder.Entity<TblPllifeQuestionnaires>(entity =>
            {
                entity.HasKey(e => e.Qid)
                    .HasName("PK__tblPLLif__CAB1462B50B6064F");

                entity.ToTable("tblPLLifeQuestionnaires", "PL");

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

            modelBuilder.Entity<TblPolicyClients>(entity =>
            {
                entity.HasKey(e => e.PolicyClientId);

                entity.ToTable("tblPolicyClients", "PL");

                entity.Property(e => e.PolicyClientId)
                    .HasColumnName("PolicyClientID")
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AdressId)
                    .HasColumnName("AdressID")
                    .HasColumnType("numeric(18, 0)");

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

                entity.HasOne(d => d.Adress)
                    .WithMany(p => p.TblPolicyClientsAdress)
                    .HasForeignKey(d => d.AdressId)
                    .HasConstraintName("FK_tblPolicyClients_tblAdress");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblPolicyClients)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_tblPolicyClients_tblCustomers");

                entity.HasOne(d => d.PermanetAddress)
                    .WithMany(p => p.TblPolicyClientsPermanetAddress)
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

                entity.HasOne(d => d.Organization)
                    .WithMany(p => p.TblPolicyRelationship)
                    .HasForeignKey(d => d.OrganizationId);

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

            modelBuilder.Entity<TblProducts>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("pk_tblProducts");

                entity.ToTable("tblProducts", "PL");

                entity.Property(e => e.ProductId).ValueGeneratedNever();

                entity.Property(e => e.EffectiveFrom).HasColumnType("date");

                entity.Property(e => e.EffectiveTo).HasColumnType("date");

                entity.Property(e => e.MinAnnualPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinBasicSumAssured).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinHalfYearlyPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinMonthlyPremium)
                    .HasColumnName("MinMOnthlyPremium")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinQuarterlyPremium).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.MinSurrenderYear)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MinTopUpYear)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblProposalPremium>(entity =>
            {
                entity.HasKey(e => e.PremiumId);

                entity.ToTable("tblProposalPremium", "PL");

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
                    .WithMany(p => p.TblProposalPremium)
                    .HasForeignKey(d => d.PolicyId);
            });

            modelBuilder.Entity<TblQuestionDetails>(entity =>
            {
                entity.HasKey(e => e.QuestionsId)
                    .HasName("PK__tblQuest__877DE89BF9DF32CE");

                entity.ToTable("tblQuestionDetails", "PL");

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
                    .WithMany(p => p.TblQuestionDetails)
                    .HasForeignKey(d => d.MemberId)
                    .HasConstraintName("FK__tblQuesti__Membe__19FFD4FC");

                entity.HasOne(d => d.Q)
                    .WithMany(p => p.TblQuestionDetails)
                    .HasForeignKey(d => d.Qid)
                    .HasConstraintName("FK__tblQuestion__QID__1AF3F935");
            });
        }
    }
}
