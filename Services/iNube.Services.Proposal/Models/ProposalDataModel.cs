using iNube.Services.Proposal.PLEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Proposal.Models
{

    //public partial class PoolDataDto
    //{
    //    public string ProposalNo { get; set; }
    //    public decimal FirstName { get; set; }
    //    public string Salutation { get; set; }
    //    public string Surname { get; set; }
    //    public string NIC { get; set; }
    //    public decimal Banca { get; set; }
    //    public string LeadNo { get; set; }
    //    public string ProposalStatus { get; set; }
    //    public virtual ICollection<TblPolicy> TblPolicy { get; set; }


    //}




    public partial class TblAddressDto
    {
        public TblAddressDto()
        {
            TblContacts = new HashSet<TblContactsDto>();
            TblCustomers = new HashSet<TblCustomersDto>();
            TblOrganizationCorporateAddress = new HashSet<TblOrganizationDto>();
            TblOrganizationMailingAddress = new HashSet<TblOrganizationDto>();
            TblOrganizationRegisteredAddres = new HashSet<TblOrganizationDto>();
            TblOrganizationSpocAdderss = new HashSet<TblOrganizationDto>();
            TblPolicyClientsAdress = new HashSet<TblPolicyClientsDto>();
            TblPolicyClientsPermanetAddress = new HashSet<TblPolicyClientsDto>();
            TblPolicyMemberDetailsAdress = new HashSet<TblPolicyMemberDetailsDto>();
            TblPolicyMemberDetailsPermanetAddress = new HashSet<TblPolicyMemberDetailsDto>();
        }

        public decimal AddressId { get; set; }
        public int AddressTypeId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }
        public string Country { get; set; }
        public string District { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Status { get; set; }
        public decimal? SourceRowId { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public int? AreaId { get; set; }

        public virtual ICollection<TblContactsDto> TblContacts { get; set; }
        public virtual ICollection<TblCustomersDto> TblCustomers { get; set; }
        public virtual ICollection<TblOrganizationDto> TblOrganizationCorporateAddress { get; set; }
        public virtual ICollection<TblOrganizationDto> TblOrganizationMailingAddress { get; set; }
        public virtual ICollection<TblOrganizationDto> TblOrganizationRegisteredAddres { get; set; }
        public virtual ICollection<TblOrganizationDto> TblOrganizationSpocAdderss { get; set; }
        public virtual ICollection<TblPolicyClientsDto> TblPolicyClientsAdress { get; set; }
        public virtual ICollection<TblPolicyClientsDto> TblPolicyClientsPermanetAddress { get; set; }
        public virtual ICollection<TblPolicyMemberDetailsDto> TblPolicyMemberDetailsAdress { get; set; }
        public virtual ICollection<TblPolicyMemberDetailsDto> TblPolicyMemberDetailsPermanetAddress { get; set; }
    }
    public partial class TblContactsDto
    {
        public TblContactsDto()
        {
            InverseParentContact = new HashSet<TblContactsDto>();
            TblLifeQq = new HashSet<TblLifeQqDto>();
        }

        public int ContactId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? ContactTypeId { get; set; }
        public string PhoneNo { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string Work { get; set; }
        public int? Age { get; set; }
        public int? OccupationId { get; set; }
        public string Nicno { get; set; }
        public decimal? MaritalStatusId { get; set; }
        public decimal? NationalityId { get; set; }
        public string MonthlyIncome { get; set; }
        public int? FamilyMembersCount { get; set; }
        public int? DependenceCount { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? LastUpdated { get; set; }
        public bool? IsDeleted { get; set; }
        public decimal? AddressId { get; set; }
        public int? ParentContactId { get; set; }
        public bool? Isparent { get; set; }
        public string Relationship { get; set; }
        public string Employer { get; set; }
        public string ContactType { get; set; }
        public string LeadNo { get; set; }
        public string Place { get; set; }
        public string PassportNo { get; set; }
        public string CreatedBy { get; set; }
        public string ClientCode { get; set; }
        public string SpouseName { get; set; }
        public DateTime? SpouseDob { get; set; }
        public int? SpouseAge { get; set; }
        public int? CurrentAge { get; set; }
        public int? SpouseCurrentAge { get; set; }
        public string IntroducerCode { get; set; }

        public virtual TblAddressDto Address { get; set; }
        public virtual TblContactsDto ParentContact { get; set; }
        public virtual ICollection<TblContactsDto> InverseParentContact { get; set; }
        public virtual ICollection<TblLifeQqDto> TblLifeQq { get; set; }
    }
    public partial class TblCustomersDto
    {
        public TblCustomersDto()
        {
            TblPolicyClients = new HashSet<TblPolicyClientsDto>();
        }

        public int CustomerId { get; set; }
        public decimal? AdressId { get; set; }
        public short ClientType { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string NameWithInitials { get; set; }
        public string CorporateName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string HomeNo { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string WorkNo { get; set; }
        public string AltEmailId { get; set; }
        public string Fax { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Status { get; set; }
        public string PassportNo { get; set; }
        public string PreferredName { get; set; }
        public string CustUniqueId { get; set; }
        public decimal? MaritalStatusId { get; set; }
        public decimal? NationalityId { get; set; }
        public string Oldnicno { get; set; }
        public string Newnicno { get; set; }
        public string MonthlyIncome { get; set; }
        public string CompanyName { get; set; }
        public string NatureofDuties { get; set; }
        public string Citizenship1 { get; set; }
        public string Citizenship2 { get; set; }
        public string ResidentialNationality { get; set; }
        public string ResidentialNationalityStatus { get; set; }
        public bool? OccupationHazardousWork { get; set; }
        public string PassportNumber { get; set; }
        public string DrivingLicense { get; set; }
        public string UstaxpayerId { get; set; }
        public string CountryOccupation { get; set; }

        public virtual TblAddress Adress { get; set; }
        public virtual ICollection<TblPolicyClientsDto> TblPolicyClients { get; set; }
    }
    public partial class TblLifeQqDto
    {
        public int LifeQqid { get; set; }
        public int VersionNo { get; set; }
        public int ContactId { get; set; }
        public int? PolicyTermId { get; set; }
        public int? ProductNameId { get; set; }
        public decimal? QqSumAssured { get; set; }
        public int? PremiumPayingTermId { get; set; }
        public bool? IsActive { get; set; }
        public int? PremiumTerm { get; set; }
        public int? NeedId { get; set; }
        public string QuoteNo { get; set; }
        public int? StatusId { get; set; }
        public string PreferredTerm { get; set; }
        public DateTime? CreateDate { get; set; }
        public string AnnualPremium { get; set; }
        public string HalfyearlyPremium { get; set; }
        public string QuarterlyPremium { get; set; }
        public string Monthly { get; set; }
        public string Vat { get; set; }
        public string Cess { get; set; }
        public string PolicyFee { get; set; }
        public string Createdby { get; set; }
        public string AllocatedFrom { get; set; }
        public int PlanId { get; set; }
        public string PlanCode { get; set; }
        public int? NoOfChild { get; set; }
        public string PreferredLanguage { get; set; }
        public int? PensionPeriod { get; set; }
        public bool? SelfPay { get; set; }
        public bool? IsFamilyFloater { get; set; }
        public bool? Deductable { get; set; }
        public int? DrawDownPeriod { get; set; }
        public int? RetirementAge { get; set; }
        public int? MonthlySurvivorIncome { get; set; }
        public int? Sam { get; set; }
        public int? AnnualizePremium { get; set; }
        public string Qtype { get; set; }
        public string OnGoingProposalWithAia { get; set; }
        public string PreviousPolicyWithAia { get; set; }
        public int? NoOfOnGoingProposalWithAia { get; set; }
        public int? NoOfPreviousPolicyWithAia { get; set; }
        public byte[] ProspectSignature { get; set; }
        public string ProposerSignPath { get; set; }
        public byte[] Wpsignature { get; set; }
        public string WppsignPath { get; set; }
        public string SignType { get; set; }
        public string MaturityBenifits { get; set; }
        public string RefNo { get; set; }
        public string IsAfc { get; set; }
        public string ModalPremium { get; set; }
        public bool? IsTopUp { get; set; }
        public string SurrenderYear { get; set; }
        public bool? IsSurrender { get; set; }
        public DateTime? RiskCommencementDate { get; set; }

        public virtual TblContactsDto Contact { get; set; }
    }
    public partial class TblMemberAdditionalLifeStyleDetailsDto
    {
        public int AdditionalLifeStyleId { get; set; }
        public int? MemberLifeStyleId { get; set; }
        public string ItemType { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }
        public string Per { get; set; }
        public string Term { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblMemberLifeStyleDetailsDto MemberLifeStyle { get; set; }
    }
    public partial class TblMemberLifeStyleDetailsDto
    {
        public TblMemberLifeStyleDetailsDto()
        {
            TblMemberAdditionalLifeStyleDetails = new HashSet<TblMemberAdditionalLifeStyleDetailsDto>();
        }

        public int MemberLifeStyleId { get; set; }
        public decimal MemberId { get; set; }
        public string Height { get; set; }
        public string UnitofHeight { get; set; }
        public string Weight { get; set; }
        public string UnitofWeight { get; set; }
        public bool? IsWeightSteady { get; set; }
        public bool? IsSmoker { get; set; }
        public bool? IsAlcoholic { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsNarcoticDrug { get; set; }
        public string HeightFeets { get; set; }

        public virtual TblPolicyMemberDetailsDto Member { get; set; }
        public virtual ICollection<TblMemberAdditionalLifeStyleDetailsDto> TblMemberAdditionalLifeStyleDetails { get; set; }
    }
    public partial class TblMemberQuestionsDto
    {
        public decimal MemberQuestionId { get; set; }
        public decimal MemberId { get; set; }
        public int Qid { get; set; }
        public string ItemType { get; set; }
        public string Answer { get; set; }
        public string SubAnswer { get; set; }
        public bool? IsDeleted { get; set; }
        public string SubType { get; set; }

        public virtual TblPolicyMemberDetailsDto Member { get; set; }
    }
    public partial class TblOrganizationDto
    {
        public TblOrganizationDto()
        {
            TblPolicyRelationship = new HashSet<TblPolicyRelationshipDto>();
        }

        public decimal OrganizationId { get; set; }
        public int OrgCategoryId { get; set; }
        public int ConfigurationTypeId { get; set; }
        public int? OtherConfigureId { get; set; }
        public int OrgTypeId { get; set; }
        public string OrgName { get; set; }
        public decimal? RegisteredAddresId { get; set; }
        public bool? IsRegisteredAddressSame { get; set; }
        public decimal? CorporateAddressId { get; set; }
        public int? MailingAddressReferenceId { get; set; }
        public decimal? MailingAddressId { get; set; }
        public byte[] OrgLogo { get; set; }
        public string OrgWebsite { get; set; }
        public string OrgPhoneNo { get; set; }
        public string OrgFaxNo { get; set; }
        public int? OrgLevels { get; set; }
        public string Regno { get; set; }
        public string RegAuthority { get; set; }
        public DateTime? RegDate { get; set; }
        public string RegNoSt { get; set; }
        public string Panno { get; set; }
        public string Tanno { get; set; }
        public string SpocName { get; set; }
        public decimal? SpocAdderssId { get; set; }
        public string SpocPhoneno { get; set; }
        public string SpocEmailId { get; set; }
        public string UserName { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public bool? IsValid { get; set; }
        public string Code { get; set; }
        public string Cinno { get; set; }
        public int? BankBranchId { get; set; }
        public string AccountNumber { get; set; }
        public string PayeeName { get; set; }
        public string License { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string OrgType { get; set; }
        public decimal? YearOfEstablishment { get; set; }
        public string RegistrationNo { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public decimal? MobileNo { get; set; }
        public decimal? OfficePhone1 { get; set; }
        public decimal? OfficePhone2 { get; set; }
        public string FaxNo { get; set; }
        public string Email { get; set; }
        public string CommAddressId { get; set; }
        public string RegistrationAddressId { get; set; }
        public bool? IsRegAddressSameAsCommAddress { get; set; }
        public string PartnerType { get; set; }
        public string LicenseNo { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? ContractEffectiveFrom { get; set; }
        public DateTime? ContractEffectiveTo { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CorporateCode { get; set; }
        public string ChannelCode { get; set; }
        public string SubChannelCode { get; set; }
        public string PartnerCode { get; set; }
        public string GeoUnitCode { get; set; }

        public virtual TblAddress CorporateAddress { get; set; }
        public virtual TblAddress MailingAddress { get; set; }
        public virtual TblAddress RegisteredAddres { get; set; }
        public virtual TblAddress SpocAdderss { get; set; }
        public virtual ICollection<TblPolicyRelationshipDto> TblPolicyRelationship { get; set; }
    }
    public partial class TblPlcommonTypesDto
    {
        public int mID { get; set; }
        public string Code { get; set; }
        public string ShortDesc { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public short? IsDeleted { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public bool? IsValid { get; set; }
    }
    public partial class TblPllifeQuestionnairesDto
    {
        public TblPllifeQuestionnairesDto()
        {
            TblQuestionDetails = new HashSet<TblQuestionDetailsDto>();
        }

        public int Qid { get; set; }
        public string Qtext { get; set; }
        public string Qtype { get; set; }
        public bool? IsDeleted { get; set; }
        public string Subtype { get; set; }
        public string ControlType { get; set; }
        public string SubQuestion { get; set; }
        public string SubControlType { get; set; }
        public string Gender { get; set; }
        public string Relationship { get; set; }
        public string Value { get; set; }
        public string Plter { get; set; }
        public int? ParentId { get; set; }
        public int? SequenceNo { get; set; }
        public int? OccupationId { get; set; }
        public int? ProductId { get; set; }
        public string ResidentialStatus { get; set; }
        public bool? OccupationHazardouswork { get; set; }
        public string PaqquestionsId { get; set; }
        public string Qform { get; set; }

        public virtual ICollection<TblQuestionDetailsDto> TblQuestionDetails { get; set; }
    }
    public partial class TblPolicyDto
    {
        public TblPolicyDto()
        {
            TblPolicyDocuments = new HashSet<TblPolicyDocumentsDto>();
            TblPolicyExtension = new HashSet<TblPolicyExtensionDto>();
            TblPolicyMemberDetails = new HashSet<TblPolicyMemberDetailsDto>(); //objprospect us ka
            TblPolicyFillMemberDetails = new HashSet<TblPolicyMemberDetailsDto>();
            TblPolicyNomineeDetails = new HashSet<TblPolicyNomineeDetailsDto>();
            TblPolicyRelationship = new HashSet<TblPolicyRelationshipDto>();
            TblPolicyTopupDetails = new HashSet<TblPolicyTopupDetailsDto>();
            TblProposalPremium = new HashSet<TblProposalPremiumDto>();
        }
        public string PlanCode { get; set; }
        public DateTime RiskCommencementDate { get; set; }
        public decimal PolicyId { get; set; }
        public string PolicyNo { get; set; }
        public short? PolicyVersion { get; set; }
        public int? AgentBusinessTypeId { get; set; }
        public decimal? AgentId { get; set; }
        public int? SubAgentId { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public DateTime? PolicyEndDate { get; set; }
        public TimeSpan? InceptionTime { get; set; }
        public decimal? SumInsured { get; set; }
        public int? BranchIdPk { get; set; }
        public int? ProductIdPk { get; set; }
        public string PolicyTypeId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Channel { get; set; }
        public int? PolicyStatusId { get; set; }
        public int? BusinessTypeId { get; set; }
        public string QuoteNo { get; set; }
        public string ProposalNo { get; set; }
        public int? PolicyStageStatusId { get; set; }
        public DateTime PolicyIssueDate { get; set; }
        public int? PolicyStageId { get; set; }
        public string PolicyRemarks { get; set; }
        public string Smcode { get; set; }
        public int? CustomerId { get; set; }
        public decimal? CorporateId { get; set; }
        public int? PlanId { get; set; }
        public string PlanName { get; set; }
        public string PolicyTerm { get; set; }
        public string PremiumTerm { get; set; }
        public string PaymentReceiptPrefferdBy { get; set; }
        public string TotalAnnualPremiumContribution { get; set; }
        public string PaymentFrequency { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentPaidBy { get; set; }
        public string Others { get; set; }
        public string ModeOfCommunication { get; set; }
        public byte[] Signature { get; set; }
        public string PreferredReceipt { get; set; }
        public string PreferredLanguage { get; set; }
        public bool? IsPushedToNewGen { get; set; }
        public bool? IsPushedToCore { get; set; }
        public string Createdby { get; set; }
        public string AllocatedFrom { get; set; }
        public string AllocatedTo { get; set; }
        public bool? IsAllocated { get; set; }
        public string AnnualPremium { get; set; }
        public string DepositPremium { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankBranchName { get; set; }
        public string CreditCardNo { get; set; }
        public string BankName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ProductId { get; set; }
        public string MaturityBenefits { get; set; }
        public string Years { get; set; }
        public string SmartPensionReceivingPeriod { get; set; }
        public string SmartPensionMonthlyIncome { get; set; }
        public string LeadNo { get; set; }
        public string IntroducerCode { get; set; }
        public bool Deductible { get; set; }
        public string RefNo { get; set; }
        public string IsAfc { get; set; }
        public string ModalPremium { get; set; }
        public DateTime? ProposalSubmitDate { get; set; }

        public virtual ICollection<TblPolicyDocumentsDto> TblPolicyDocuments { get; set; }
        public virtual ICollection<TblPolicyExtensionDto> TblPolicyExtension { get; set; }
        public virtual ICollection<TblPolicyMemberDetailsDto> TblPolicyMemberDetails { get; set; }
        public virtual ICollection<TblPolicyMemberDetailsDto> TblPolicyFillMemberDetails { get; set; }
        public virtual ICollection<TblPolicyNomineeDetailsDto> TblPolicyNomineeDetails { get; set; }
        public virtual ICollection<TblPolicyRelationshipDto> TblPolicyRelationship { get; set; }
        public virtual ICollection<TblPolicyTopupDetailsDto> TblPolicyTopupDetails { get; set; }
        public virtual ICollection<TblProposalPremiumDto> TblProposalPremium { get; set; }
    }
    public partial class TblPolicyClientsDto
    {
        public TblPolicyClientsDto()
        {
            TblPolicyRelationship = new HashSet<TblPolicyRelationshipDto>();
        }

        public decimal PolicyClientId { get; set; }
        public int? CustomerId { get; set; }
        public decimal? AdressId { get; set; }
        public short ClientType { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string NameWithInitials { get; set; }
        public string CorporateName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string HomeNo { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string WorkNo { get; set; }
        public string AltEmailId { get; set; }
        public string Fax { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Status { get; set; }
        public string Oldnicno { get; set; }
        public string Newnicno { get; set; }
        public string PreferredName { get; set; }
        public int? Nationality { get; set; }
        public int? MaritalStatus { get; set; }
        public int? OccupationId { get; set; }
        public bool IsPermanentAddrSameasCommAddr { get; set; }
        public decimal? PermanetAddressId { get; set; }
        public string CompanyName { get; set; }
        public string NatureOfDuties { get; set; }
        public string MonthlyIncome { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string AlteranteMobileNo { get; set; }
        public bool? IsProposerAssured { get; set; }
        public int? Age { get; set; }
        public string Citizenship1 { get; set; }
        public string Citizenship2 { get; set; }
        public string ResidentialNationality { get; set; }
        public string ResidentialNationalityStatus { get; set; }
        public bool? OccupationHazardousWork { get; set; }
        public string PassportNumber { get; set; }
        public string DrivingLicense { get; set; }
        public string UstaxpayerId { get; set; }
        public string SpecifyResidental { get; set; }
        public string SpecifyHazardousWork { get; set; }
        public bool? CitizenShip { get; set; }
        public string ContactPerson { get; set; }
        public string Designation { get; set; }
        public string BusinessRegistrationNo { get; set; }
        public string CountryOccupation { get; set; }
        public string ProposerTelepohoneNo { get; set; }
        public string ProposerEamilId { get; set; }

        public virtual TblAddress Adress { get; set; }
        public virtual TblCustomers Customer { get; set; }
        public virtual TblAddress PermanetAddress { get; set; }
        public virtual ICollection<TblPolicyRelationshipDto> TblPolicyRelationship { get; set; }
    }
    public partial class TblPolicyDocumentsDto
    {
        public decimal DocumentUploadId { get; set; }
        public decimal? PolicyId { get; set; }
        public string DocumentType { get; set; }
        public string FileName { get; set; }
        public byte[] File { get; set; }
        public string ContentType { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string FilePath { get; set; }
        public string ItemType { get; set; }
        public string MemberType { get; set; }
        public string Permission { get; set; }
        public string Remarks { get; set; }
        public string Decision { get; set; }
        public bool? IsNewDocumentAdded { get; set; }

        public virtual TblPolicyDto Policy { get; set; }
    }
    public partial class TblPolicyExtensionDto
    {
        public decimal PolicyExtensionId { get; set; }
        public decimal? PolicyId { get; set; }
        public string DoctorName { get; set; }
        public string LabName { get; set; }
        public string PaymentMadeByForDoctor { get; set; }
        public string PaymentMadeByForLab { get; set; }
        public string ReportsTobeSendTo { get; set; }
        public DateTime? ProposerDate { get; set; }
        public string ProposerPlace { get; set; }
        public string ProposerCountry { get; set; }
        public string ProposerDocumentType { get; set; }
        public bool? ProposerWealthPlanner { get; set; }
        public bool? ProposerWealthPlannerPolicy { get; set; }
        public DateTime? ProposerWealthPlannerPolicyBackDate { get; set; }
        public string ProposerWealthPlannerComments { get; set; }
        public DateTime? SpouseDate { get; set; }
        public string SpousePlace { get; set; }
        public string SpouseCountry { get; set; }
        public string SpouseDocumentType { get; set; }
        public bool? SpouseWealthPlanner { get; set; }
        public bool? SpouseWealthPlannerPolicy { get; set; }
        public DateTime? SpouseWealthPlannerPolicyBackDate { get; set; }
        public string SpouseWealthPlannerComments { get; set; }
        public string ProposalNeed { get; set; }
        public bool? Declaration { get; set; }
        public byte[] ProspectSignPath { get; set; }
        public byte[] SpouseSignPath { get; set; }

        public virtual TblPolicyDto Policy { get; set; }
    }
    public partial class TblPolicyMemberBenefitDetailsDto
    {
        public decimal MemberBenifitId { get; set; }
        public decimal MemberId { get; set; }
        public int BenifitId { get; set; }
        public string SumInsured { get; set; }
        public string Premium { get; set; }
        public string RelationShipWithProposer { get; set; }
        public string AssuredName { get; set; }
        public bool? IsDeleted { get; set; }
        public string LoadingAmount { get; set; }
        public string TotalPremium { get; set; }
        public int? LoadingPerc { get; set; }
        public int? LoadinPerMille { get; set; }

        public virtual TblPolicyMemberDetailsDto Member { get; set; }
    }

    public partial class TblPolicyMemberClaimInfoDto
    {
        public decimal MemberClaimId { get; set; }
        public decimal MemberId { get; set; }
        public string CompanyName { get; set; }
        public string ProposalNo { get; set; }
        public string NatureOfClaim { get; set; }
        public DateTime? DateOfClaim { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblPolicyMemberDetailsDto Member { get; set; }
    }
    public partial class TblPolicyMemberDetailsDto
    {
        public TblPolicyMemberDetailsDto()
        {
            TblMemberLifeStyleDetails = new HashSet<TblMemberLifeStyleDetailsDto>();
            TblMemberQuestions = new HashSet<TblMemberQuestionsDto>();
            TblPolicyMemberBenefitDetails = new HashSet<TblPolicyMemberBenefitDetailsDto>();
            TblPolicyMemberClaimInfo = new HashSet<TblPolicyMemberClaimInfoDto>();
            TblPolicyMemberFamilyHistory = new HashSet<TblPolicyMemberFamilyHistoryDto>();
            TblPolicyMemberInsuranceInfo = new HashSet<TblPolicyMemberInsuranceInfoDto>();
            TblQuestionDetails = new HashSet<TblQuestionDetailsDto>();
        }


        //extra added variables

        //Added for Hidden Variables
        public bool IsSelfCovered { get; set; }
        public bool IsSpouseCoverd { get; set; }
        public bool IsSelfIsMainLife { get; set; }
        public int NoofChilds { get; set; }
        public string AssuredName { get; set; }
        public bool? IsproposerlifeAssured { get; set; }
        public bool IsSameasProposerAddress { get; set; }

        //

        public string ContactPerson { get; set; }
        public decimal MemberId { get; set; }
        public decimal PolicyId { get; set; }
        public string Salutation { get; set; }
        public string Fullname { get; set; }
        public string NameWithInitial { get; set; }
        public string PreferredName { get; set; }
        public DateTime? Dob { get; set; }
        public int? Age { get; set; }
        public int RelationShipWithProposer { get; set; }
        public int? OccupationId { get; set; }
        public string Oldnicno { get; set; }
        public string Newnicno { get; set; }
        public string MonthlyIncome { get; set; }
        public string CompanyName { get; set; }
        public string NatureOfDuties { get; set; }
        public string Nationality { get; set; }
        public string Mobile { get; set; }
        public string Landline { get; set; }
        public string Email { get; set; }
        public int? Height { get; set; }
        public int? Weight { get; set; }
        public bool? IsDeleted { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string AlternateMobileNo { get; set; }
        public string Home { get; set; }
        public string Work { get; set; }
        public decimal? AdressId { get; set; }
        public bool IsPermanentAddrSameasCommAddr { get; set; }
        public decimal? PermanetAddressId { get; set; }
        public int? QuoteMemberid { get; set; }
        public string BasicSuminsured { get; set; }
        public string BasicPremium { get; set; }
        public string Assuredname { get; set; }
        public int? NoofJsPolicies { get; set; }
        public bool? IsOtherPolicy { get; set; }
        public int? NoofOtherPolicies { get; set; }
        public string TotalDeath { get; set; }
        public string TotalAccidental { get; set; }
        public string TotalCritical { get; set; }
        public string TotalHospitalization { get; set; }
        public string TotalHospitalizationReimbursement { get; set; }
       // public bool? IsSameasProposerAddress { get; set; }
        public string UnitOfWeight { get; set; }
        public string UnitOfHeight { get; set; }
        public string MemberPremium { get; set; }
        public bool? IsClaimExits { get; set; }
        public string Citizenship1 { get; set; }
        public string Citizenship2 { get; set; }
        public string ResidentialNationality { get; set; }
        public string ResidentialNationalityStatus { get; set; }
        public bool? OccupationHazardousWork { get; set; }
        public string PassportNumber { get; set; }
        public string DrivingLicense { get; set; }
        public string UstaxpayerId { get; set; }
        public string CountryOccupation { get; set; }
        public string AdditionalPremium { get; set; }
        public string SpecifyResidental { get; set; }
        public string SpecifyHazardousWork { get; set; }
        public bool? CitizenShip { get; set; }
        public decimal? Sar { get; set; }
        public decimal? Fal { get; set; }
        public bool? Afc { get; set; }
        public string ClientCode { get; set; }
        public string Gender { get; set; }
        public string MaritialStatus { get; set; }
        public string Sam { get; set; }
        public decimal? AnnualPremium { get; set; }
        public string Bmivalue { get; set; }
        public bool? Ocr { get; set; }
        public bool? OcrimageRecognition { get; set; }

        public virtual TblAddressDto Adress { get; set; }
        public virtual TblAddressDto PermanetAddress { get; set; }
        public virtual TblPolicyDto Policy { get; set; }
        public virtual ICollection<TblMemberLifeStyleDetailsDto> TblMemberLifeStyleDetails { get; set; }
        public virtual ICollection<TblMemberQuestionsDto> TblMemberQuestions { get; set; }
        public virtual ICollection<TblPolicyMemberBenefitDetailsDto> TblPolicyMemberBenefitDetails { get; set; }
        public virtual ICollection<TblPolicyMemberClaimInfoDto> TblPolicyMemberClaimInfo { get; set; }
        public virtual ICollection<TblPolicyMemberFamilyHistoryDto> TblPolicyMemberFamilyHistory { get; set; }
        public virtual ICollection<TblPolicyMemberInsuranceInfoDto> TblPolicyMemberInsuranceInfo { get; set; }
        public virtual ICollection<TblQuestionDetailsDto> TblQuestionDetails { get; set; }
    }
    public partial class TblPolicyMemberFamilyHistoryDto
    {
        public decimal MemberFamilyHistoryId { get; set; }
        public decimal MemberId { get; set; }
        public string RelationshipWithMember { get; set; }
        public int? PresentAge { get; set; }
        public int? AgeAtDeath { get; set; }
        public string StateofHealth { get; set; }
        public string CauseofDeath { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? AnyPerson { get; set; }
        public bool? Below60AgeDeath { get; set; }
        public string Details { get; set; }

        public virtual TblPolicyMemberDetailsDto Member { get; set; }
    }
    public partial class TblPolicyMemberInsuranceInfoDto
    {
        public decimal MemberInsuranceId { get; set; }
        public decimal MemberId { get; set; }
        public string CompanyName { get; set; }
        public string PolicyProposalNo { get; set; }
        public string TotalSiatDeath { get; set; }
        public string AccidentalBenifit { get; set; }
        public string CriticalIllnessBenifit { get; set; }
        public string HospitalizationPerDay { get; set; }
        public string CurrentStatus { get; set; }
        public bool? IsDeleted { get; set; }
        public string HospitalizationReimbursement { get; set; }

        public virtual TblPolicyMemberDetailsDto Member { get; set; }
    }
    public partial class TblPolicyNomineeDetailsDto
    {
        public decimal NomineeId { get; set; }
        public decimal? PolicyId { get; set; }
        public string Salutation { get; set; }
        public string NomineeName { get; set; }
        public DateTime? Dob { get; set; }
        public int? Age { get; set; }
        public int? NomineeRelation { get; set; }
        public string OtherRelation { get; set; }
        public string AppointeeName { get; set; }
        public string Nicno { get; set; }
        public string NomineeShare { get; set; }
        public DateTime? AppointeeDob { get; set; }
        public bool? IsDeleted { get; set; }
        public string NomineeSurName { get; set; }
        public string NomineeIntialName { get; set; }
        public string NomineeGender { get; set; }
        public string NomineeMartialStatus { get; set; }
        public string NomineeAddress { get; set; }
        public string NomineeMobileNo { get; set; }
        public string ClientCode { get; set; }

        public virtual TblPolicyDto Policy { get; set; }
    }
    public partial class TblPolicyRelationshipDto
    {
        public decimal PolicyRelationshipId { get; set; }
        public decimal? PolicyId { get; set; }
        public decimal? PolicyClientId { get; set; }
        public int? RelationshipId { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? ProspectId { get; set; }
        public decimal? OrganizationId { get; set; }

        public virtual TblOrganizationDto Organization { get; set; }
        public virtual TblPolicyDto Policy { get; set; }
        public virtual TblPolicyClientsDto PolicyClient { get; set; }
    }
    public partial class TblPolicyTopupDetailsDto
    {
        public int Id { get; set; }
        public string TopupPolicyYear { get; set; }
        public string Amount { get; set; }
        public decimal? PolicyId { get; set; }

        public virtual TblPolicyDto Policy { get; set; }
    }
    public partial class TblProposalPremiumDto
    {
        public decimal PremiumId { get; set; }
        public decimal? PolicyId { get; set; }
        public decimal? BasicPremium { get; set; }
        public decimal? AnnualPremium { get; set; }
        public decimal? Cess { get; set; }
        public decimal? BasicSumInsured { get; set; }
        public decimal? Vat { get; set; }
        public decimal? PolicyFee { get; set; }
        public decimal? HalfYearlyPremium { get; set; }
        public decimal? QuaterlyPremium { get; set; }
        public decimal? MonthlyPremium { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public decimal? AdditionalPremium { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblPolicyDto Policy { get; set; }
    }
    public partial class TblQuestionDetailsDto
    {
        public decimal QuestionsId { get; set; }
        public decimal? MemberId { get; set; }
        public int? Qid { get; set; }
        public string VarcharFiled1 { get; set; }
        public DateTime? DateFiled1 { get; set; }
        public string VarcharFiled2 { get; set; }
        public DateTime? DateFiled2 { get; set; }
        public string VarcharFiled3 { get; set; }
        public string VarcharFiled4 { get; set; }
        public string VarcharFiled5 { get; set; }
        public string VarcharFiled6 { get; set; }
        public string VarcharFiled7 { get; set; }
        public string VarcharFiled8 { get; set; }
        public string VarcharFiled9 { get; set; }
        public DateTime? DateFiled3 { get; set; }
        public bool? IsDeleted { get; set; }
        public string VarcharFiled10 { get; set; }
        public string VarcharFiled11 { get; set; }
        public DateTime? DateFiled4 { get; set; }
        public string VarcharFiled12 { get; set; }
        public string PaqvarcharFiled1 { get; set; }
        public string PaqvarcharFiled2 { get; set; }
        public string PaqvarcharFiled3 { get; set; }
        public string PaqvarcharFiled4 { get; set; }
        public string PaqvarcharFiled5 { get; set; }
        public string PaqvarcharFiled6 { get; set; }
        public string PaqvarcharFiled7 { get; set; }
        public string PaqvarcharFiled8 { get; set; }
        public string PaqvarcharFiled9 { get; set; }
        public string PaqvarcharFiled10 { get; set; }
        public string PaqvarcharFiled11 { get; set; }
        public string PaqvarcharFiled12 { get; set; }
        public string PaqyearFiled1 { get; set; }
        public string PaqyearFiled2 { get; set; }
        public string PaqyearFiled3 { get; set; }
        public string PaqassetsTotal { get; set; }
        public string PaqliabilitiesTotal { get; set; }
        public string PaqassetsProperty { get; set; }
        public string PaqassetsInvestment { get; set; }
        public string PaqassetsEquities { get; set; }
        public string PaqassetsOther { get; set; }
        public string PaqliabilitiesMortgages { get; set; }
        public string PaqliabilitiesLoans { get; set; }
        public string PaqliabilitiesOthers { get; set; }

        public virtual TblPolicyMemberDetailsDto Member { get; set; }
        public virtual TblPllifeQuestionnairesDto Q { get; set; }
    }

    public class ProposalInboxDtO
    {
        public ProposalInboxDtO()
        {
            objProposalDetails = new List<InboxDetailsDto>();
        }
        public string Message { get; set; }
        public string UserName { get; set; }
        public string QuoteNo { get; set; }
        public List<InboxDetailsDto> objProposalDetails { get; set; }
        public List<SubmittedProposalsDto> LstSubmittedProposals { get; set; }
    }
    public class EmpHierarchy
    {
        public decimal ParentID { get; set; }
        public decimal PositionID { get; set; }
        public string StaffName { get; set; }
        public string Staffcode { get; set; }
        public string LevelDefinition { get; set; }
        public int LevelId { get; set; }
    }
    public class InboxDetailsDto
    {
        public string QuoteNo { get; set; }
        public string PlanName { get; set; }
        public string PaymentFrequency { get; set; }
        public string Need { get; set; }
        public decimal PolicyID { get; set; }
        public string ProposalNo { get; set; }
        public string FirstName { get; set; }
        public string NIC { get; set; }
        public string MobileNo { get; set; }
        public string Home { get; set; }
        public string Work { get; set; }
        public string Salutation { get; set; }
        public string Surname { get; set; }
        public string LeadNo { get; set; }
        public string Banca { get; set; }
        public string PreferredLanguage { get; set; }
        public string ProductCode { get; set; }
        public string ProposalStatus { get; set; }
        public string FullName { get; set; }

        public string DaysInForCancellation { get; set; }
    }

    public class SubmittedProposalsDto
    {
        public int Index { get; set; }
        public string PropId { get; set; }
        public string ProposalNo { get; set; }
        public string QuoteNo { get; set; }
        public string Name { get; set; }
        public string NicNo { get; set; }
        public string SubmittedPropMobile { get; set; }
        public string SubmittedPropPolicyTerm { get; set; }
        public string SubmittedPropHome { get; set; }
        public string SubmittedPropWork { get; set; }
        public string SubmittedPropEmail { get; set; }
        public string Status { get; set; }
        public string SubmittedPropInforce { get; set; }
        public string Salutation { get; set; }
        public string Surname { get; set; }
        public string LeadNo { get; set; }
        public string Banca { get; set; }
        public string FullName { get; set; }
    }
    public class PandingRequirementsDto
    {
        public string ProposalNo { get; set; }
        public string QuoteNo { get; set; }
        public string FullName { get; set; }
        public string ProductName { get; set; }//this data will come from tblProducts
        public decimal? Premium { get; set; }
        public string Premiumlkr { get; set; }//(objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium)
        public string IssueDate { get; set; }//objpolicy.CreatedDate.ToString()
        //public List<SubmittedProposals> LstSubmittedProposals { get; set; }
        //public List<InboxDetails> objProposalDetails { get; set; }
        //public List<TblLifeQqDto> LstTblLifeQqDto { get; set; }
        //public List<TblOrganizationDto> LstTblOrganization { get; set; }

    }

    public class CrossCuttingConstantsDto
    {


        #region Relationships
        public const string Relationship = "PolicyRelationShip";
        public const string ProposerCode = "Proposer";
        public const string NomineeCode = "Nominee";
        public const string InsuredCode = "Insured";
        #endregion



        public const string itemTypeProduct = "Product";
        public const string itemTypeMenu = "Menu";
        public const string itemTypePayment = "Payment";
        public const string PageNameUsers = "Users";
        public const string PageNameRoles = "Roles";
        public const string AppNameAgent = "IMD";
        public const string AppNameEmployee = "Employee";
        public const string AllowedChars = "abcdefghijkmnGHJKLMNOPQRSTUVWXYZ234567opqrstuoM4jBpAw39Qoo3aSGyLiYnFqi5wYSpL2vwxyzABCDEF89@!#$&*";

        // UW Decision
        public const string UWDecisionAccepted = "184";
        public const string UWDecisionAcceptwithloading = "185";
        public const string UWDecisionDecline = "187";
        public const string UWDecisionPostPone = "1449";
        public const string UWDecisionWithDrawn = "2299";
        public const string UWDecisionReferToUW = "2298";
        public const string UWDecisionOutStandingReq = "1177";
        public const string UWDecisionCounterOffer = "186";
        public const string UWDecisionNotTaken = "1176";

        // Stage Status ID
        public const int PolicyStageStatusIssued = 194;
        public const int PolicyStageStatusDecline = 196;
        public const int PolicyStageStatusReferToUW = 193;
        public const int PolicyStageStatusOutStandingReq = 2375;
        public const int PolicyStageStatusCounterOffer = 2376;
        public const int PolicyStageStatusnotTaken = 2374;
        public const int PolicyStageStatusPending = 191;
        public const int PolicyStageStatusWithDrawn = 2491;
        public const int PolicyStageStatusPostPone = 2490;
        public const int PolicyStageStatusNotTakenUp = 2374;

    }
    public class UWInboxDto
    {
        public List<InboxDetailsDto> LstInboxDetails { get; set; }



        public string Message { get; set; }
        public string UserName { get; set; }

        public int UWPoolCount { get; set; }
        public int SubmittedProposals { get; set; }
        public int AllocationCount { get; set; }
        public int AcceptedCount { get; set; }
        public int RejectCount { get; set; }
        public int PostponeCount { get; set; }
        public int WithDrawnCount { get; set; }
        public int CounterOffer { get; set; }
        public int NotTakenCount { get; set; }
        public int ReferToSRUWCount { get; set; }
        public int OutStandingCount { get; set; }
        public List<PandingRequirementsDto> LstProposals { get; internal set; }
    }
    public class FetchProposalDataDto
    {
        public string PaymentFrequency { get; set; }
        public string QuoteNo { get; set; }
        public string ProposalNo { get; set; }
        public string PlanName { get; set; }
        public string Need { get; set; }
    }
    public class PolicyOwnerDetailsDto
    {
        public string Salutation { get; set; }
        public string NameWithInitial { get; set; }
        public string GivenName { get; set; }
        public string SurName { get; set; }
        public string EmiratesId { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? Age { get; set; }
        public string GenderID { get; set; }
        public int? MaritialStatus { get; set; }
        public int? Occupation { get; set; }
        public string AnnualIncome { get; set; }
        public string PassportNumber { get; set; }
        public string NameOfEmployee { get; set; }
        public int? Nationality { get; set; }
        public string CountryOfResidence { get; set; }
        public string AgeProof { get; set; }
        public bool? OccupationRequireHarzasousWork { get; set; }
        public string SpecifyOccupationWork { get; set; }
        public string CountryOfOccupation { get; set; }
        public string MobileNo { get; set; }
        public string Home { get; set; }
        public string OfficeNo { get; set; }
        public string Email{get;set;}
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string PostalCode { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
        public string PAddress1 { get; set; }
        public string PAddress2 { get; set; }
        public string PAddress3 { get; set; }
        public string PPostalCode { get; set; }
        public string PDistrict { get; set; }
        public string PProvince { get; set; }
    }
    //Questinoaries related models


    //public class MemberDetails
    //{

    //    public MemberDetails()
    //    {
    //        objBenifitDetails = new List<BenifitDetails>();

    //        LstQuestions = new List<QuestionsList>();
    //        objLststateofhelath = new List<QuestionsList>();
    //        objLstMedicalHistory = new List<QuestionsList>();
    //        objAdditionalQuestions = new List<QuestionsList>();
    //        objLstFamily = new List<QuestionsList>();
    //        objLstOtherInsuranceDetails = new List<QuestionsList>();
    //        Questions = new List<QuestionsList>();
    //        ObjUwDecision = new UWDecision.UWDecision();
    //        LstMedicalQuestionnariesDetails = new List<MedicalQuestionnariesDetails>();
    //        LstMedicalDoctorsQuestionnariesDetails = new List<DoctorsMedicalQuestionnariesDetails>();
    //        LstMedicalTestQuestionnariesDetails = new List<TestMedicalQuestionnariesDetails>();
    //        LstMedicalCurrentQuestionnariesDetails = new List<CurrentMedicalQuestionnariesDetails>();
    //        LstConcurrentlyProposedInsurancePAQ1Details = new List<ConcurrentlyProposedInsurancePAQ1Details>();
    //        LstExistingPolicieswithAIAlnsurancePAQ2Details = new List<ExistingPolicieswithAIAlnsurancePAQ2Details>();
    //        LstTotalAnnualIncomePAQ3Details = new List<TotalAnnualIncomePAQ3Details>();
    //        LstAssetsandLiabilitiesPAQ4Details = new List<AssetsandLiabilitiesPAQ4Details>();
    //        objLstFamilyBackground = new List<LifeAssuredFamilyBackground>();
    //        objCommunicationAddress = new Address();
    //        objPermenantAddress = new Address();
    //        objLifeStyleQuetions = new LifeStyleQADto();
    //        ClientRelations = new List<ClientRelation>();
    //        ObjTotalAnnualIncomePAQ3Details = new TotalAnnualIncomePAQ3Details();
    //        ObjAssetsandLiabilitiesPAQ4Details = new AssetsandLiabilitiesPAQ4Details();

    //        Error = new Error();
    //        Language = "E";
    //    }



    //    public Error Error { get; set; }
    //    public QuestionsList objQuestionsList { get; set; }
    //    public QuestionsList objQuestions { get; set; }
    //    public List<QuestionsList> LstQuestions { get; set; }
    //    public List<QuestionsList> LstEasyPensionQuestions { get; set; }
    //    public List<QuestionsList> objLststateofhelath { get; set; }
    //    public List<QuestionsList> objLstMedicalHistory { get; set; }
    //    public List<QuestionsList> objAdditionalQuestions { get; set; }
    //    public List<QuestionsList> objLstFamily { get; set; }
    //    public List<QuestionsList> objLstOtherInsuranceDetails { get; set; }
    //    public List<QuestionsList> Questions { get; set; }
    //    public List<QuestionsList> objLstWealthPlannerQuestions { get; set; }

    //    //Added QuestionnairesGridView List
    //    public List<MedicalQuestionnariesDetails> LstMedicalQuestionnariesDetails { get; set; }

    //    public List<DoctorsMedicalQuestionnariesDetails> LstMedicalDoctorsQuestionnariesDetails { get; set; }

    //    public List<TestMedicalQuestionnariesDetails> LstMedicalTestQuestionnariesDetails { get; set; }

    //    public List<CurrentMedicalQuestionnariesDetails> LstMedicalCurrentQuestionnariesDetails { get; set; }

    //    public List<ConcurrentlyProposedInsurancePAQ1Details> LstConcurrentlyProposedInsurancePAQ1Details { get; set; }

    //    public List<ExistingPolicieswithAIAlnsurancePAQ2Details> LstExistingPolicieswithAIAlnsurancePAQ2Details { get; set; }

    //    public List<TotalAnnualIncomePAQ3Details> LstTotalAnnualIncomePAQ3Details { get; set; }


    //    public List<AssetsandLiabilitiesPAQ4Details> LstAssetsandLiabilitiesPAQ4Details { get; set; }

    //    public AssetsandLiabilitiesPAQ4Details ObjAssetsandLiabilitiesPAQ4Details { get; set; }

    //    public TotalAnnualIncomePAQ3Details ObjTotalAnnualIncomePAQ3Details { get; set; }
    //    //Tiil here

    //    public bool IsLifeAssuredSeleted { get; set; }
    //    public bool IsOCRSeleted { get; set; }
    //    public bool IsOCRImageRecognition { get; set; }

    //    //Institution Details
    //    public string ContactPerson { get; set; }
    //    public string Designation { get; set; }
    //    public string BusinessRegistrationNo { get; set; }
    //    //Till Here


    //    //Added ClaimInfo GridView List
    //    public List<ClaimInformation> objClaimInfo { get; set; }
    //    public bool AreyouClaimedAnyPolicies { get; set; }
    //    //Tiil here
    //    //Added Proposal Details
    //    public bool CitizenShip { get; set; }
    //    public string Citizenship1 { get; set; }
    //    public string Citizenship2 { get; set; }
    //    public string SpecifyNationality { get; set; }
    //    public string SpecifyUSNationality { get; set; }
    //    public string ResidentialStatus { get; set; }
    //    public string Residential { get; set; }
    //    public bool? OccupationHazardousWork { get; set; }
    //    public string SpecifiyOccupationHazardousWork { get; set; }


    //    public string PassportNumber { get; set; }
    //    public string DrivingLicense { get; set; }
    //    public string USTaxpayerId { get; set; }
    //    public string CountryofOccupation { get; set; }
    //    public string LifeAssured { get; set; }


    //    //Till here

    //    public int Index { get; set; }
    //    public decimal MemberID { get; set; }
    //    public int QuoteMemberID { get; set; }
    //    public string RelationShipWithPropspect { get; set; }
    //    public string RelationShipWithPropspectID { get; set; }
    //    public string RelationShipWithPropspectText { get; set; }
    //    public string Salutation { get; set; }
    //    public string FullName { get; set; }
    //    public List<string> DiseasesSelected { get; set; }
    //    private string _firstName;
    //    public string FirstName
    //    {
    //        get { return _firstName; }
    //        set { _firstName = string.IsNullOrEmpty(value) != true ? value.Trim() : value; }
    //    }

    //    private string _lastName;
    //    public string LastName
    //    {
    //        get { return _lastName; }
    //        set
    //        {
    //            _lastName = string.IsNullOrEmpty(value) != true ? value.Trim() : value;
    //        }
    //    }
    //    public string MiddleName { get; set; }
    //    public DateTime? WeddingAnniversaryDate { get; set; }
    //    public string OtherMobileNo { get; set; }
    //    public string ExtraPremium { get; set; }

    //    private string _nameWithInitial;
    //    public string NameWithInitial
    //    {
    //        get { return _nameWithInitial; }
    //        set
    //        {
    //            _nameWithInitial = string.IsNullOrEmpty(value) != true ? value.Trim() : value;
    //        }
    //    }
    //    public string PrefferedName { get; set; }
    //    public DateTime? DateOfBirth { get; set; }
    //    public int? Age { get; set; }
    //    public string Gender { get; set; }
    //    public string GenderText { get; set; }
    //    public string MaritialStatus { get; set; }
    //    public string OLDNICNo { get; set; }
    //    public string NewNICNO { get; set; }
    //    public int? OccupationID { get; set; }
    //    public string OccupationCode { get; set; }
    //    public string SalutationCode { get; set; }
    //    public string CompanyName { get; set; }
    //    public string CorporateName { get; set; }
    //    public string ProposerEmailID { get; set; }
    //    public string ProposerMobileNo { get; set; }
    //    public string NameOfDuties { get; set; }
    //    public string MonthlyIncome { get; set; }
    //    public string Nationality { get; set; }
    //    public string HomeNumber { get; set; }
    //    public string WorkNumber { get; set; }
    //    public string MobileNo { get; set; }
    //    public string Email { get; set; }
    //    public string BMIValue { get; set; }
    //    public string Height { get; set; }
    //    public string Weight { get; set; }
    //    public int? INTBasicSumInsured { get; set; }
    //    public string BasicSumInsured { get; set; }
    //    public string Basicpremium { get; set; }
    //    public string Memberpremium { get; set; }
    //    public decimal _AnnualPremium { get; set; }// Previous Policy Annual Premium
    //    public decimal _CurrentproposalAnnualPremium { get; set; }
    //    public string OccuaptionClass { get; set; } // Occuaption class For UW Rules
    //    public string PreviousPolicyFlag { get; set; } //Prev Policy Flag
    //    public bool IsCommunicationAddressSameasProspect { get; set; }
    //    public Address objCommunicationAddress { get; set; }
    //    public Address objPermenantAddress { get; set; }
    //    public bool IsRegAsCommunication { get; set; }
    //    public List<BenifitDetails> objBenifitDetails { get; set; }
    //    public List<MedicalHistoryQuestions> objLstDiseaseHistory { get; set; }
    //    public MedicalHistoryQuestions objMedicalHistory { get; set; }
    //    public List<LifeAssuredFamilyBackground> objLstFamilyBackground { get; set; }
    //    public UWDecision.UWDecision ObjUwDecision { get; set; }
    //    public LifeStyleQA objLstLifeStyleQuestions { get; set; }
    //    public int NoofJsPolicies { get; set; }
    //    public bool AreyouCoveredUnderOtherPolicies { get; set; }
    //    public int NoofOtherPolicies { get; set; }
    //    public string TotalDeath { get; set; }
    //    public string TotalAccidental { get; set; }
    //    public string TotalCritical { get; set; }
    //    public string TotalHospitalization { get; set; }
    //    public string TotalHospitalizationReimbursement { get; set; }
    //    public List<LifeAssuredOtherInsurance> objLifeAssuredOtherInsurance { get; set; }


    //    //Added for Hidden Variables
    //    public bool IsSelfCovered { get; set; }
    //    public bool IsSpouseCoverd { get; set; }
    //    public bool IsSelfIsMainLife { get; set; }
    //    public int NoofChilds { get; set; }
    //    public string AssuredName { get; set; }
    //    public bool? IsproposerlifeAssured { get; set; }
    //    public bool IsSameasProposerAddress { get; set; }
    //    public LifeStyleQA objLifeStyleQuetions { get; set; }
    //    [XmlIgnore]
    //    public List<MasterListItem> lstAvgMonthlyIncome { get; set; }
    //    public List<MasterListItem> LstLoadingType { get; set; }
    //    public List<MasterListItem> LstLoadingBasis { get; set; }

    //    //[XmlIgnore]
    //    //public List<MasterListItem> lstPAQAssets { get; set; }
    //    //[XmlIgnore]
    //    //public List<MasterListItem> lstPAQLiabilities { get; set; }
    //    // Added for UW Model
    //    public bool IsUSCitizen { get; set; }
    //    public string ClientCode { get; set; }
    //    public string SAM { get; set; }


    //    public decimal SAR { get; set; }
    //    public decimal FAL { get; set; }
    //    public bool AFC { get; set; }

    //    //for IL Integration
    //    public string ProposalNo { get; set; }
    //    public int PolicyTerm { get; set; }
    //    public int PremiumTerm { get; set; }
    //    public int PensionTerm { get; set; }

    //    public bool AnyAdverseRemarks { get; set; }
    //    public string InceptionDate { get; set; }
    //    public bool Deductible { get; set; }
    //    public string MaturityBenefit { get; set; }
    //    public string LifeNum { get; set; }
    //    public List<ClientRelation> ClientRelations { get; set; }

    //    public decimal? ADDBSA { get; set; }
    //    public decimal? CIBSA { get; set; }
    //    public decimal? CIBHPSA { get; set; }
    //    public decimal? HIPSA { get; set; }
    //    public decimal? HIPHPSA { get; set; }
    //    public decimal? ASBSA { get; set; }
    //    public decimal? HECSA { get; set; }
    //    public decimal? HECHPSA { get; set; }
    //    public decimal? IPBSA { get; set; }

    //    public decimal? PrevOE { get; set; }
    //    public decimal? PrevHE { get; set; }
    //    public decimal? PrevRE { get; set; }

    //    public int MonthlySavingBenifit { get; set; }
    //    public string Language { get; set; }

    //    public int ClaimCount { get; set; }

    //    public bool IsUpdate { get; set; }
    //}
    public class ClientRelation
    {
        public string Relation { get; set; }
        public string ClientCode { get; set; }
    }






    //

    public class LifeStyleQADto
    {

        public LifeStyleQADto()
        {
            objSmokeDetails = new List<SmokeDetailsDto>();
            objAlcoholDetails = new List<AlcoholDetailsDto>();
            objNarcoticDrugDetails = new List<NarcoticDrugDetailsDto>();
        }
        public int MemberLifeStyleID { get; set; }
        public int Height { get; set; }
        public int HeightFeets { get; set; }
        public int Weight { get; set; }
        public bool SteadyWeight { get; set; }
        public string HeightUnit { get; set; }
        public string WeightUnit { get; set; }

        public bool IsSmoker { get; set; }
        public string SmokeType { get; set; }
        public string SmokeQuantity { get; set; }
        public string SmokePerDay { get; set; }
        public string SmokeDuration { get; set; }

        public bool IsAlcholic { get; set; }
        public string AlcholType { get; set; }
        public string AlcholQuantity { get; set; }
        public string AlcholPerDay { get; set; }
        public string AlcholDuration { get; set; }

        public bool IsNarcoticDrugs { get; set; }

        public List<SmokeDetailsDto> objSmokeDetails { get; set; }
        public List<AlcoholDetailsDto> objAlcoholDetails { get; set; }
        public List<NarcoticDrugDetailsDto> objNarcoticDrugDetails { get; set; }


    }
    public class SmokeDetailsDto
    {
        public int AdditionalLifeStyleID { get; set; }
        public string SmokeType { get; set; }
        public string SmokeQuantity { get; set; }
        public string SmokePerDay { get; set; }
        public string SmokeDuration { get; set; }
        public bool Isdeleted { get; set; }
    }
    public class AlcoholDetailsDto
    {
        public int AdditionalLifeStyleID { get; set; }
        public string AlcholType { get; set; }
        public string AlcholQuantity { get; set; }
        public string AlcholPerDay { get; set; }
        public string AlcholDuration { get; set; }
        public bool Isdeleted { get; set; }
    }

    public class NarcoticDrugDetailsDto
    {
        public int AdditionalLifeStyleID { get; set; }
        public string NarcoticDrugType { get; set; }
        public string NarcoticDrugQuantity { get; set; }
        public string NarcoticDrugPerDay { get; set; }
        public string NarcoticDrugDuration { get; set; }
        public bool Isdeleted { get; set; }
    }




}
