using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgStructure
    {
        public decimal OrgStructureId { get; set; }
        public decimal? OrganizationId { get; set; }
        public int? LevelId { get; set; }
        public string LevelDefinition { get; set; }
        public int? RepotrsToId { get; set; }
        public decimal? ParentId { get; set; }
        public string UserName { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public bool? IsValid { get; set; }
        public int? StructureTypeId { get; set; }

        public virtual TblOrganization Organization { get; set; }
    }
}
