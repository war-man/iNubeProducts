using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblQuoteMemberDetials
    {
        public TblQuoteMemberDetials()
        {
            TblQuoteMemberBeniftDetials = new HashSet<TblQuoteMemberBeniftDetials>();
        }

        public int MemberId { get; set; }
        public int LifeQqid { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? Age { get; set; }
        public int? OccupationId { get; set; }
        public string Relationship { get; set; }
        public string AssuredName { get; set; }
        public int? BasicSuminsured { get; set; }
        public string BasicPremium { get; set; }
        public string MemberPremium { get; set; }
        public bool? IsDeleted { get; set; }
        public string Nicno { get; set; }
        public string CreatedBy { get; set; }
        public int? CurrentAge { get; set; }

        public virtual TblLifeQq LifeQq { get; set; }
        public virtual ICollection<TblQuoteMemberBeniftDetials> TblQuoteMemberBeniftDetials { get; set; }
    }
}
