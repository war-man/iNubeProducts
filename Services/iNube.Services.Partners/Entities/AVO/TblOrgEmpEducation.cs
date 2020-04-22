using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgEmpEducation
    {
        public decimal EmpEducationId { get; set; }
        public decimal? OrgEmpId { get; set; }
        public string Certification { get; set; }
        public string Year { get; set; }
        public string GradeOrPercentage { get; set; }

        public virtual TblOrgEmployee OrgEmp { get; set; }
    }
}
