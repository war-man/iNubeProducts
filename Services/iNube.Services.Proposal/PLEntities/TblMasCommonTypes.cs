using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblMasCommonTypes
    {
        public int CommonTypesId { get; set; }
        public string Code { get; set; }
        public string ShortDesc { get; set; }
        public string Description { get; set; }
        public string MasterType { get; set; }
        public short? IsDeleted { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public bool? IsValid { get; set; }
    }
}
