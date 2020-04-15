using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgUserPositionMapping
    {
        public int UserPositionMappingId { get; set; }
        public int? PositionId { get; set; }
        public Guid? MappingUserId { get; set; }
        public Guid? CreatedUserId { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public bool? IsValid { get; set; }
    }
}
