using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblSuspect
    {
        public decimal SuspectId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public decimal? MobileNo { get; set; }
        public string EmailId { get; set; }
        public decimal? ProspectId { get; set; }
        public string SuspectCode { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public decimal? Status { get; set; }
        public bool? IsSelected { get; set; }

        public virtual TblProspect Prospect { get; set; }
    }
}
