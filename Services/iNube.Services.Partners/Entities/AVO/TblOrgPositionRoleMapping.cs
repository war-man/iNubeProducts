using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgPositionRoleMapping
    {
        public decimal PositionRoleMappingId { get; set; }
        public int? PositionId { get; set; }
        public int? RoleId { get; set; }
        public Guid? UserId { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public bool? IsValid { get; set; }
    }
}
