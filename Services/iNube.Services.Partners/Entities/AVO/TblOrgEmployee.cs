using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgEmployee
    {
        public decimal OrgEmpId { get; set; }
        public string StaffCode { get; set; }
        public string StaffName { get; set; }
        public decimal? PositionId { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public decimal? StaffTypeId { get; set; }
        public string Function { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string Smcode { get; set; }
        public string Imdcode { get; set; }
        public string StaffStatus { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblOrgPositions Position { get; set; }
    }
}
