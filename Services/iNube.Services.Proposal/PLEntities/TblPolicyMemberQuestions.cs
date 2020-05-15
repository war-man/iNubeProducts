using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyMemberQuestions
    {
        public decimal MemberQuestionId { get; set; }
        public decimal MemberId { get; set; }
        public int Qid { get; set; }
        public string ItemType { get; set; }
        public string Answer { get; set; }
        public string SubAnswer { get; set; }
        public bool? IsDeleted { get; set; }
        public string SubType { get; set; }

        public virtual TblPolicyMemberDetails Member { get; set; }
    }
}
