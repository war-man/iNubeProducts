using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Models
{
    public class ProposalModel
    {
        public partial class MasCommonTypesDto
        {
            public int CommonTypesId { get; set; }
            public string Code { get; set; }
            public string ShortDesc { get; set; }
            public string Description { get; set; }
            public string MasterType { get; set; }
            public short? IsDeleted { get; set; }
            public DateTime? EffectiveDate { get; set; }
            public bool? IsValid { get; set; }
            public string mValue { get; set; }
            public string mType { get; set; }
            public int mID { get; set; }
        }
        public partial class MasLifeQuestionnairesDto
        {
            public MasLifeQuestionnairesDto()
            {
                TblPolicyQuestionDetails = new HashSet<PolicyQuestionDetailsDto>();
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

            public virtual ICollection<PolicyQuestionDetailsDto> TblPolicyQuestionDetails { get; set; }
        }
        public partial class PolicyDto
        {
            public PolicyDto()
            {
                TblPolicyDocuments = new HashSet<PolicyDocumentsDto>();
                TblPolicyExtension = new HashSet<PolicyExtensionDto>();
                TblPolicyMemberDetails = new HashSet<PolicyMemberDetailsDto>();
                TblPolicyNomineeDetails = new HashSet<PolicyNomineeDetailsDto>();
                TblPolicyPremium = new HashSet<PolicyPremiumDto>();
                TblPolicyRelationship = new HashSet<PolicyRelationshipDto>();
                TblPolicyTopupDetails = new HashSet<PolicyTopupDetailsDto>();
            }

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
            public string PolicyTerm { get; set; }
            public string PremiumTerm { get; set; }
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

            public virtual ICollection<PolicyDocumentsDto> TblPolicyDocuments { get; set; }
            public virtual ICollection<PolicyExtensionDto> TblPolicyExtension { get; set; }
            public virtual ICollection<PolicyMemberDetailsDto> TblPolicyMemberDetails { get; set; }
            public virtual ICollection<PolicyNomineeDetailsDto> TblPolicyNomineeDetails { get; set; }
            public virtual ICollection<PolicyPremiumDto> TblPolicyPremium { get; set; }
            public virtual ICollection<PolicyRelationshipDto> TblPolicyRelationship { get; set; }
            public virtual ICollection<PolicyTopupDetailsDto> TblPolicyTopupDetails { get; set; }
        }
        public partial class PolicyClientAddressDto
        {
            public PolicyClientAddressDto()
            {
                TblPolicyClients = new HashSet<PolicyClientsDto>();
                TblPolicyMemberDetailsAdress = new HashSet<PolicyMemberDetailsDto>();
                TblPolicyMemberDetailsPermanetAddress = new HashSet<PolicyMemberDetailsDto>();
            }

            public decimal AddressId { get; set; }
            public decimal? PolicyClientId { get; set; }
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

            public virtual ICollection<PolicyClientsDto> TblPolicyClients { get; set; }
            public virtual ICollection<PolicyMemberDetailsDto> TblPolicyMemberDetailsAdress { get; set; }
            public virtual ICollection<PolicyMemberDetailsDto> TblPolicyMemberDetailsPermanetAddress { get; set; }
        }
        public partial class PolicyClientsDto
        {
            public PolicyClientsDto()
            {
                TblPolicyRelationship = new HashSet<PolicyRelationshipDto>();
            }

            public decimal PolicyClientId { get; set; }
            public int? CustomerId { get; set; }
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
            public bool? IsPermanentAddrSameasCommAddr { get; set; }
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

            public virtual PolicyClientAddressDto PermanetAddress { get; set; }
            public virtual ICollection<PolicyRelationshipDto> TblPolicyRelationship { get; set; }
        }
        public partial class PolicyDocumentsDto
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

            public virtual PolicyDto Policy { get; set; }
        }
        public partial class PolicyExtensionDto
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

            public virtual PolicyDto Policy { get; set; }
        }
        public partial class PolicyMemberAdditionalLifeStyleDetailsDto
        {
            public int AdditionalLifeStyleId { get; set; }
            public int? MemberLifeStyleId { get; set; }
            public string ItemType { get; set; }
            public string Type { get; set; }
            public string Number { get; set; }
            public string Per { get; set; }
            public string Term { get; set; }
            public bool? IsDeleted { get; set; }

            public virtual PolicyMemberLifeStyleDetailsDto MemberLifeStyle { get; set; }
        }
        public partial class PolicyMemberAddressDto
        {
            public decimal AddressId { get; set; }
            public decimal? MemberId { get; set; }
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

            public virtual PolicyMemberDetailsDto Member { get; set; }
        }
        public partial class PolicyMemberBenefitDetailsDto
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

            public virtual PolicyMemberDetailsDto Member { get; set; }
        }
        public partial class PolicyMemberClaimInfoDto
        {
            public decimal MemberClaimId { get; set; }
            public decimal MemberId { get; set; }
            public string CompanyName { get; set; }
            public string ProposalNo { get; set; }
            public string NatureOfClaim { get; set; }
            public DateTime? DateOfClaim { get; set; }
            public bool? IsDeleted { get; set; }

            public virtual PolicyMemberDetailsDto Member { get; set; }
        }
        public partial class PolicyMemberDetailsDto
        {
            public PolicyMemberDetailsDto()
            {
                TblPolicyMemberAddress = new HashSet<PolicyMemberAddressDto>();
                TblPolicyMemberBenefitDetails = new HashSet<PolicyMemberBenefitDetailsDto>();
                TblPolicyMemberClaimInfo = new HashSet<PolicyMemberClaimInfoDto>();
                TblPolicyMemberFamilyHistory = new HashSet<PolicyMemberFamilyHistoryDto>();
                TblPolicyMemberInsuranceInfo = new HashSet<PolicyMemberInsuranceInfoDto>();
                TblPolicyMemberLifeStyleDetails = new HashSet<PolicyMemberLifeStyleDetailsDto>();
                TblPolicyMemberQuestions = new HashSet<PolicyMemberQuestionsDto>();
                TblPolicyQuestionDetails = new HashSet<PolicyQuestionDetailsDto>();
            }

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
            public bool? IsPermanentAddrSameasCommAddr { get; set; }
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
            public bool? IsSameasProposerAddress { get; set; }
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

            public virtual PolicyClientAddressDto Adress { get; set; }
            public virtual PolicyClientAddressDto PermanetAddress { get; set; }
            public virtual PolicyDto Policy { get; set; }
            public virtual ICollection<PolicyMemberAddressDto> TblPolicyMemberAddress { get; set; }
            public virtual ICollection<PolicyMemberBenefitDetailsDto> TblPolicyMemberBenefitDetails { get; set; }
            public virtual ICollection<PolicyMemberClaimInfoDto> TblPolicyMemberClaimInfo { get; set; }
            public virtual ICollection<PolicyMemberFamilyHistoryDto> TblPolicyMemberFamilyHistory { get; set; }
            public virtual ICollection<PolicyMemberInsuranceInfoDto> TblPolicyMemberInsuranceInfo { get; set; }
            public virtual ICollection<PolicyMemberLifeStyleDetailsDto> TblPolicyMemberLifeStyleDetails { get; set; }
            public virtual ICollection<PolicyMemberQuestionsDto> TblPolicyMemberQuestions { get; set; }
            public virtual ICollection<PolicyQuestionDetailsDto> TblPolicyQuestionDetails { get; set; }
        }
        public partial class PolicyMemberFamilyHistoryDto
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

            public virtual PolicyMemberDetailsDto Member { get; set; }
        }
        public partial class PolicyMemberInsuranceInfoDto
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

            public virtual PolicyMemberDetailsDto Member { get; set; }
        }
        public partial class PolicyMemberLifeStyleDetailsDto
        {
            public PolicyMemberLifeStyleDetailsDto()
            {
                TblPolicyMemberAdditionalLifeStyleDetails = new HashSet<PolicyMemberAdditionalLifeStyleDetailsDto>();
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

            public virtual PolicyMemberDetailsDto Member { get; set; }
            public virtual ICollection<PolicyMemberAdditionalLifeStyleDetailsDto> TblPolicyMemberAdditionalLifeStyleDetails { get; set; }
        }
        public partial class PolicyMemberQuestionsDto
        {
            public decimal MemberQuestionId { get; set; }
            public decimal MemberId { get; set; }
            public int Qid { get; set; }
            public string ItemType { get; set; }
            public string Answer { get; set; }
            public string SubAnswer { get; set; }
            public bool? IsDeleted { get; set; }
            public string SubType { get; set; }

            public virtual PolicyMemberDetailsDto Member { get; set; }
        }
        public partial class PolicyNomineeDetailsDto
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

            public virtual PolicyDto Policy { get; set; }
        }
        public partial class PolicyPremiumDto
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

            public virtual PolicyDto Policy { get; set; }
        }
        public partial class PolicyQuestionDetailsDto
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

            public virtual PolicyMemberDetailsDto Member { get; set; }
            public virtual MasLifeQuestionnairesDto Q { get; set; }
        }
        public partial class PolicyRelationshipDto
        {
            public decimal PolicyRelationshipId { get; set; }
            public decimal? PolicyId { get; set; }
            public decimal? PolicyClientId { get; set; }
            public int? RelationshipId { get; set; }
            public Guid? CreatedBy { get; set; }
            public DateTime? CreatedDate { get; set; }
            public decimal? ProspectId { get; set; }
            public decimal? OrganizationId { get; set; }

            public virtual PolicyDto Policy { get; set; }
            public virtual PolicyClientsDto PolicyClient { get; set; }
        }
        public partial class PolicyTopupDetailsDto
        {
            public int Id { get; set; }
            public string TopupPolicyYear { get; set; }
            public string Amount { get; set; }
            public decimal? PolicyId { get; set; }

            public virtual PolicyDto Policy { get; set; }
        }


        //Proposal
        public class EmpHierarchy
        {
            public decimal ParentID { get; set; }
            public decimal PositionID { get; set; }
            public string StaffName { get; set; }
            public string Staffcode { get; set; }
            public string LevelDefinition { get; set; }
            public int LevelId { get; set; }
        }
        public partial class LeadDTO
        {
            public int ContactID { get; set; }
            public int? ContactTypeId { get; set; }
            public string ContactType { get; set; }
            public string Salutation { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string MobileNo { get; set; }
            public string PhoneNo { get; set; }
            public string Work { get; set; }
            public string EmailID { get; set; }
            public string NICNO { get; set; }
            public string Place { get; set; }
            public string PassportNo { get; set; }
            public string LeadNo { get; set; }
            public DateTime LeadDate { get; set; }

            public string Currency { get; set; }
            public string Gender { get; set; }
            public decimal? MaritalStatusID { get; set; }
            public DateTime? DateOfBirth { get; set; }
            public int Age { get; set; }
            public int OccupationID { get; set; }
            public string MonthlyIncome { get; set; }
            //public int AddressID { get; set; }
            public string SpouseName { get; set; }
            public DateTime? SpouseDob { get; set; }
            public int? SpouseAge { get; set; }
            public virtual AddressDTO Address { get; set; }
            public virtual opportunityDTO opportunity { get; set; }
        }
        public partial class opportunityDTO
        {
            public string StageID { get; set; }
            public string CreatedBy { get; set; }
        }

        public partial class AddressDTO
        {
            internal object address;
            internal object city;
            internal object district;
            internal object areaId;

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
        }


        public partial class LifeQqDTO
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

            public virtual LeadDTO Contact { get; set; }

        }

        public class PolicyOwnerDetailsDto
        {
            public string Salutation { get; set; }
            public string Fullname { get; set; }
            public string NameWithInitial { get; set; }
            public string Surname { get; set; }
            public DateTime? Dob { get; set; }
            public int? Age { get; set; }
            public string Nationality { get; set; }
            public string Mobile { get; set; }
            public string Email { get; set; }
            public string Gender { get; set; }
            public string Home { get; set; }
            public string PassportNumber { get; set; }
            public string MaritialStatus { get; set; }
            public decimal AddressId { get; set; }
            public string Address1 { get; set; }
            public string Address2 { get; set; }
            public string Address3 { get; set; }
            public string City { get; set; }
            public string Pincode { get; set; }
            public string AnnualIncome { get; set; }
            public string GivenName { get; set; }
            public string District { get; set; }
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
    }

    //Questionnarries
    public class QuestionsListDTO
    {
        public int QuestionIndex { get; set; }
        public int QuestionID { get; set; }
        public string QuestionType { get; set; }
        public string ControlType { get; set; }
        public string Gender { get; set; }
        public int MemberQuestionID { get; set; }
        public string QuestionText { get; set; }
        public string Answer { get; set; }
        public string Details { get; set; }
        public string SubType { get; set; }
        public string SubControlType { get; set; }
        public string SubQuestion { get; set; }
        public string SubAnswer { get; set; }
        public string Value { get; set; }
        public string Master { get; set; }
        //public int? ParentID { get; set; }
        public int? SequenceNo { get; set; }
        public string[] Diseases { get; set; }
        public string SelectedDiseases { get; set; }
        //public List<MasterListItem> LstDropDownvalues { get; set; }

        public List<QuestionsListDTO> LstQuestionsTypes { get; set; }

        // public List<MedicalQuestionnariesDetails> LstMedicalQuestionnariesDetails { get; set; }
        public class ProposalResponce : ResponseStatus
        {
            public Models.ProposalModel.PolicyDto plcreated { get; set; }
        }

        public partial class ProposalDto
        {
            public string ProposalNumber { get; set; }
            public string Name { get; set; }

            public string ContactNumner { get; set; }
            public string CityName { get; set; }
            public string MovedTo { get; set; }
            public int ProposalId { get; set; }
        }

        public partial class policyDto
        {
            public string PolicyNumber { get; set; }
            public int PolicyStatus { get; set; }
            public string Mode { get; set; }
            public string PremiumAmount { get; set; }
            public string ContactNumner { get; set; }
            public string CityName { get; set; }
            public string MovedTo { get; set; }
            public int PolicyId { get; set; }
        }
        

    }

    public partial class EMPDistribute
    {
        public EMPDistribute()
        {
            EMPDistributeDTO = new List<EMPDistributeDTO>();
        }
        public List<EMPDistributeDTO> EMPDistributeDTO { get; set; }
    }

    public partial class EMPDistributeDTO
    {
        public decimal PositionId { get; set; }
        public decimal PrimaryIds { get; set; }
    }
}

