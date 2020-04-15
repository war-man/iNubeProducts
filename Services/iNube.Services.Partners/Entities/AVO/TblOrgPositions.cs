using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgPositions
    {
        public int PositionId { get; set; }
        public int? OfiiceId { get; set; }
        public int? PositionTypeId { get; set; }
        public string PositionName { get; set; }
        public int? ReportsToId { get; set; }
        public Guid? UserId { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public bool? IsValid { get; set; }
    }
}
