using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyMemberInsuranceInfo
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

        public virtual TblPolicyMemberDetails Member { get; set; }
    }
}
