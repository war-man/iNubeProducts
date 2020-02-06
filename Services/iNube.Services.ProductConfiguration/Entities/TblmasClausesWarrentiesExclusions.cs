using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblmasClausesWarrentiesExclusions
    {
        public int Cweid { get; set; }
        public int Lobid { get; set; }
        public int CwetypeId { get; set; }
        public string TypeName { get; set; }
        public string Description { get; set; }
        public bool? IsActive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }

        public virtual TblmasProductMaster Cwetype { get; set; }
        public virtual TblmasProductMaster Level { get; set; }
        public virtual TblmasProductMaster Lob { get; set; }
        public virtual TblmasProductMaster SubLevel { get; set; }
    }
}
