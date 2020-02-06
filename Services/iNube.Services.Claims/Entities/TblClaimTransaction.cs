using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaimTransaction
    {
        public decimal TransactionId { get; set; }
        public bool? IsValid { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public DateTime? ModifiedDateTime { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string Occurrence { get; set; }
        public decimal ClaimId { get; set; }
        public int? StatusId { get; set; }
        public int ClaimTypeId { get; set; }
        public int? ClaimServiceTypeId { get; set; }
        public int? CauseOfLossId { get; set; }
        public int? ActionId { get; set; }
        public bool? IsServeyorAssign { get; set; }
        public bool? IsWorkshopAssign { get; set; }
        public bool? IsInvestigatorAssign { get; set; }
        public bool? IsBackByManager { get; set; }
        public bool? IsReOpen { get; set; }
        public bool? IsRoadSideAssistance { get; set; }
        public decimal? ApproximateEstimatedCost { get; set; }
        public string Remark { get; set; }
        public string InternalRemark { get; set; }
        public string EmergencyContact { get; set; }
        public string EmergencyEmail { get; set; }
        public string QueryReasonIds { get; set; }
        public string RejectionReasonIds { get; set; }
        public string AccidentFactor { get; set; }
        public string AccidentFactorDescription { get; set; }
        public bool? IsRead { get; set; }
        public decimal? ApprovedAmount { get; set; }
        public int? DecisionTypeid { get; set; }
        public int? SettlementTypeid { get; set; }
        public string CloseReasonIds { get; set; }
        public bool? IsPriorityClaim { get; set; }
        public string ReopenReasonIds { get; set; }
        public decimal? AdvanceAmount { get; set; }

        public virtual TblClaim Claim { get; set; }
    }
}
