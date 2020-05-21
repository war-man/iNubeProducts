using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgStandards
    {
        public decimal OrgStandardId { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal? DesignationId { get; set; }
        public decimal? Level { get; set; }
        public decimal? ProgramId { get; set; }
        public decimal? StandardType { get; set; }
        public string MappingDetails { get; set; }
    }
}
