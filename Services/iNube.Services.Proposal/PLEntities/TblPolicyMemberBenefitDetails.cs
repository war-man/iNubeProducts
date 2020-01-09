using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyMemberBenefitDetails
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

        public virtual TblPolicyMemberDetails Member { get; set; }
    }
}
