using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyNomineeDetails
    {
        public decimal NomineeId { get; set; }
        public decimal? PolicyId { get; set; }
        public string Salutation { get; set; }
        public string NomineeName { get; set; }
        public DateTime? Dob { get; set; }
        public int? Age { get; set; }
        public int? NomineeRelation { get; set; }
        public string OtherRelation { get; set; }
        public string AppointeeName { get; set; }
        public string Nicno { get; set; }
        public string NomineeShare { get; set; }
        public DateTime? AppointeeDob { get; set; }
        public bool? IsDeleted { get; set; }
        public string NomineeSurName { get; set; }
        public string NomineeIntialName { get; set; }
        public string NomineeGender { get; set; }
        public string NomineeMartialStatus { get; set; }
        public string NomineeAddress { get; set; }
        public string NomineeMobileNo { get; set; }
        public string ClientCode { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
