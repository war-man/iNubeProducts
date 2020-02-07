using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblParticipantBranch
    {
        public TblParticipantBranch()
        {
            TblParticipantBrokerBranch = new HashSet<TblParticipant>();
            TblParticipantReInsurerBranch = new HashSet<TblParticipant>();
        }

        public decimal BranchId { get; set; }
        public decimal ParticipantMasterId { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public string BranchSpocemailId { get; set; }

        public virtual TblParticipantMaster ParticipantMaster { get; set; }
        public virtual ICollection<TblParticipant> TblParticipantBrokerBranch { get; set; }
        public virtual ICollection<TblParticipant> TblParticipantReInsurerBranch { get; set; }
    }
}
