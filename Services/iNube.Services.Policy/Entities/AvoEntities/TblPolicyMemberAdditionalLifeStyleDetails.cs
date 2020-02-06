using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class TblPolicyMemberAdditionalLifeStyleDetails
    {
        public int AdditionalLifeStyleId { get; set; }
        public int? MemberLifeStyleId { get; set; }
        public string ItemType { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }
        public string Per { get; set; }
        public string Term { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblPolicyMemberLifeStyleDetails MemberLifeStyle { get; set; }
    }
}
