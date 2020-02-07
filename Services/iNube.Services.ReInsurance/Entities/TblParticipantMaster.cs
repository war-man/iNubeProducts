using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblParticipantMaster
    {
        public TblParticipantMaster()
        {
            TblParticipantBranch = new HashSet<TblParticipantBranch>();
            TblParticipantBroker = new HashSet<TblParticipant>();
            TblParticipantReInsurer = new HashSet<TblParticipant>();
        }

        public decimal ParticipantMasterId { get; set; }
        public int? ParticipantTypeId { get; set; }
        public string ParticipantCode { get; set; }
        public string ParticipantName { get; set; }
        public string ContactNo { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? Pincode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }

        public virtual ICollection<TblParticipantBranch> TblParticipantBranch { get; set; }
        public virtual ICollection<TblParticipant> TblParticipantBroker { get; set; }
        public virtual ICollection<TblParticipant> TblParticipantReInsurer { get; set; }
    }
}
