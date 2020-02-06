using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class TblPolicyMemberClaimInfo
    {
        public decimal MemberClaimId { get; set; }
        public decimal MemberId { get; set; }
        public string CompanyName { get; set; }
        public string ProposalNo { get; set; }
        public string NatureOfClaim { get; set; }
        public DateTime? DateOfClaim { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblPolicyMemberDetails Member { get; set; }
    }
}
