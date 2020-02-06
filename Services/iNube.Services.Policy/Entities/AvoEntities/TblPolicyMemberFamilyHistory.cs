using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class TblPolicyMemberFamilyHistory
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

        public virtual TblPolicyMemberDetails Member { get; set; }
    }
}
