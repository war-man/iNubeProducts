using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class TblPolicyMemberDetails
    {
        public TblPolicyMemberDetails()
        {
            TblPolicyMemberAddress = new HashSet<TblPolicyMemberAddress>();
            TblPolicyMemberBenefitDetails = new HashSet<TblPolicyMemberBenefitDetails>();
            TblPolicyMemberClaimInfo = new HashSet<TblPolicyMemberClaimInfo>();
            TblPolicyMemberFamilyHistory = new HashSet<TblPolicyMemberFamilyHistory>();
            TblPolicyMemberInsuranceInfo = new HashSet<TblPolicyMemberInsuranceInfo>();
            TblPolicyMemberLifeStyleDetails = new HashSet<TblPolicyMemberLifeStyleDetails>();
            TblPolicyMemberQuestions = new HashSet<TblPolicyMemberQuestions>();
            TblPolicyQuestionDetails = new HashSet<TblPolicyQuestionDetails>();
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

        public virtual TblPolicyClientAddress Adress { get; set; }
        public virtual TblPolicyClientAddress PermanetAddress { get; set; }
        public virtual TblPolicy Policy { get; set; }
        public virtual ICollection<TblPolicyMemberAddress> TblPolicyMemberAddress { get; set; }
        public virtual ICollection<TblPolicyMemberBenefitDetails> TblPolicyMemberBenefitDetails { get; set; }
        public virtual ICollection<TblPolicyMemberClaimInfo> TblPolicyMemberClaimInfo { get; set; }
        public virtual ICollection<TblPolicyMemberFamilyHistory> TblPolicyMemberFamilyHistory { get; set; }
        public virtual ICollection<TblPolicyMemberInsuranceInfo> TblPolicyMemberInsuranceInfo { get; set; }
        public virtual ICollection<TblPolicyMemberLifeStyleDetails> TblPolicyMemberLifeStyleDetails { get; set; }
        public virtual ICollection<TblPolicyMemberQuestions> TblPolicyMemberQuestions { get; set; }
        public virtual ICollection<TblPolicyQuestionDetails> TblPolicyQuestionDetails { get; set; }
    }
}
