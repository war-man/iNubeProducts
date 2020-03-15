using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaims
    {
        public TblClaims()
        {
            TblBankAccounts = new HashSet<TblBankAccounts>();
            TblClaimAllocationDetails = new HashSet<TblClaimAllocationDetails>();
            TblClaimDetails = new HashSet<TblClaimDetails>();
            TblClaimHistory = new HashSet<TblClaimHistory>();
            TblClaimInsurable = new HashSet<TblClaimInsurable>();
            TblClaimTransactionNew = new HashSet<TblClaimTransactionNew>();
            TblClaimdoc = new HashSet<TblClaimdoc>();
            TblPayment = new HashSet<TblPayment>();
        }

        public int ClaimId { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimNumber { get; set; }
        public int? ClaimAmount { get; set; }
        public string ClaimManagerRemarks { get; set; }
        public int? ApprovedClaimAmount { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int? LossId { get; set; }
        public DateTime? LossDateTime { get; set; }
        public string LocationOfEvent { get; set; }
        public string LossOfDescription { get; set; }
        public decimal? PolicyId { get; set; }
        public bool? Active { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string PolicyNo { get; set; }
        public int? ProductIdPk { get; set; }
        public string ClaimFields { get; set; }

        public virtual TblmasCmcommonTypes ClaimStatus { get; set; }
        public virtual TblmasCmcommonTypes Loss { get; set; }
        public virtual ICollection<TblBankAccounts> TblBankAccounts { get; set; }
        public virtual ICollection<TblClaimAllocationDetails> TblClaimAllocationDetails { get; set; }
        public virtual ICollection<TblClaimDetails> TblClaimDetails { get; set; }
        public virtual ICollection<TblClaimHistory> TblClaimHistory { get; set; }
        public virtual ICollection<TblClaimInsurable> TblClaimInsurable { get; set; }
        public virtual ICollection<TblClaimTransactionNew> TblClaimTransactionNew { get; set; }
        public virtual ICollection<TblClaimdoc> TblClaimdoc { get; set; }
        public virtual ICollection<TblPayment> TblPayment { get; set; }
    }
}
