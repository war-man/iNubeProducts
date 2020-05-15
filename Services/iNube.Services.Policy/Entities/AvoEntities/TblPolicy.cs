using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class TblPolicy
    {
        public TblPolicy()
        {
            TblPolicyDocuments = new HashSet<TblPolicyDocuments>();
            TblPolicyExtension = new HashSet<TblPolicyExtension>();
            TblPolicyMemberDetails = new HashSet<TblPolicyMemberDetails>();
            TblPolicyNomineeDetails = new HashSet<TblPolicyNomineeDetails>();
            TblPolicyPremium = new HashSet<TblPolicyPremium>();
            TblPolicyRelationship = new HashSet<TblPolicyRelationship>();
            TblPolicyTopupDetails = new HashSet<TblPolicyTopupDetails>();
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
        public string HandledBy { get; set; }

        public virtual ICollection<TblPolicyDocuments> TblPolicyDocuments { get; set; }
        public virtual ICollection<TblPolicyExtension> TblPolicyExtension { get; set; }
        public virtual ICollection<TblPolicyMemberDetails> TblPolicyMemberDetails { get; set; }
        public virtual ICollection<TblPolicyNomineeDetails> TblPolicyNomineeDetails { get; set; }
        public virtual ICollection<TblPolicyPremium> TblPolicyPremium { get; set; }
        public virtual ICollection<TblPolicyRelationship> TblPolicyRelationship { get; set; }
        public virtual ICollection<TblPolicyTopupDetails> TblPolicyTopupDetails { get; set; }
    }
}
