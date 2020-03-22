using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblPolicy
    {
        public TblPolicy()
        {
            TblEndorsementDetails = new HashSet<TblEndorsementDetails>();
            TblPolicyDetails = new HashSet<TblPolicyDetails>();
            TblPolicyInsurableDetails = new HashSet<TblPolicyInsurableDetails>();
            TblPolicyPayment = new HashSet<TblPolicyPayment>();
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
        public Guid CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Channel { get; set; }
        public string DocumentType { get; set; }
        public int? PolicyStatusId { get; set; }
        public int? BusinessTypeId { get; set; }
        public string QuoteNo { get; set; }
        public DateTime? QuoteDate { get; set; }
        public string ProposalNo { get; set; }
        public DateTime? ProposalDate { get; set; }
        public string CoverNoteNo { get; set; }
        public DateTime? CoverNoteIssueDate { get; set; }
        public int? PolicyStageStatusId { get; set; }
        public DateTime PolicyIssueDate { get; set; }
        public int? PolicyStageId { get; set; }
        public string MasterPolicyNo { get; set; }
        public string PolicyRemarks { get; set; }
        public string Smcode { get; set; }
        public int? Irccode { get; set; }
        public string CustomerId { get; set; }
        public int? Csoid { get; set; }
        public short IsUploadedToIcm { get; set; }
        public decimal? CorporateId { get; set; }
        public decimal? BundleId { get; set; }
        public string BundleTxnId { get; set; }
        public decimal? BundleParentId { get; set; }
        public bool? IsIrdaupdated { get; set; }
        public string Currency { get; set; }
        public string Rate { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string CoverEvent { get; set; }
        public string CoverName { get; set; }
        public bool? IsActive { get; set; }
        public string PolicyStatus { get; set; }
        public decimal? MasterPremium { get; set; }
        public decimal? PremiumAmount { get; set; }
        public string MasterType { get; set; }
        public string CdaccountNumber { get; set; }
        public DateTime? PolicyCancelDate { get; set; }
        public int? BalanceSumInsued { get; set; }

        public virtual ICollection<TblEndorsementDetails> TblEndorsementDetails { get; set; }
        public virtual ICollection<TblPolicyDetails> TblPolicyDetails { get; set; }
        public virtual ICollection<TblPolicyInsurableDetails> TblPolicyInsurableDetails { get; set; }
        public virtual ICollection<TblPolicyPayment> TblPolicyPayment { get; set; }
    }
}
