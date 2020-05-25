using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblRecruitment
    {
        public decimal RecruitmentId { get; set; }
        public string RecruitmentNo { get; set; }
        public string Name { get; set; }
        public string Channel { get; set; }
        public string SubChannel { get; set; }
        public string Designation { get; set; }
        public bool? IsContract { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
