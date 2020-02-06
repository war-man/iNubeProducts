﻿using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class TblPolicyMemberLifeStyleDetails
    {
        public TblPolicyMemberLifeStyleDetails()
        {
            TblPolicyMemberAdditionalLifeStyleDetails = new HashSet<TblPolicyMemberAdditionalLifeStyleDetails>();
        }

        public int MemberLifeStyleId { get; set; }
        public decimal MemberId { get; set; }
        public string Height { get; set; }
        public string UnitofHeight { get; set; }
        public string Weight { get; set; }
        public string UnitofWeight { get; set; }
        public bool? IsWeightSteady { get; set; }
        public bool? IsSmoker { get; set; }
        public bool? IsAlcoholic { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsNarcoticDrug { get; set; }
        public string HeightFeets { get; set; }

        public virtual TblPolicyMemberDetails Member { get; set; }
        public virtual ICollection<TblPolicyMemberAdditionalLifeStyleDetails> TblPolicyMemberAdditionalLifeStyleDetails { get; set; }
    }
}
