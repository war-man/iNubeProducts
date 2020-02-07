using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblParticipant
    {
        public decimal ParticipantId { get; set; }
        public decimal TreatyId { get; set; }
        public decimal ReInsurerId { get; set; }
        public decimal ReInsurerBranchId { get; set; }
        public decimal BrokerId { get; set; }
        public decimal BrokerBranchId { get; set; }
        public int? SharePercentage { get; set; }
        public int? BrokeragePercentage { get; set; }
        public int? RicommissionPercentage { get; set; }
        public int? BordereauxFreqId { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

        public virtual TblParticipantMaster Broker { get; set; }
        public virtual TblParticipantBranch BrokerBranch { get; set; }
        public virtual TblParticipantMaster ReInsurer { get; set; }
        public virtual TblParticipantBranch ReInsurerBranch { get; set; }
        public virtual TblTreaty Treaty { get; set; }
    }
}
