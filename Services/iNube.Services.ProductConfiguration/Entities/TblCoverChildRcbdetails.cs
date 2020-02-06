using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblCoverChildRcbdetails
    {
        public int TblCoverChildRcbdetailsId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public int CoverRcbdetailsId { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }

        public virtual TblCoverRcbdetails CoverRcbdetails { get; set; }
        public virtual TblmasProductMaster Input { get; set; }
    }
}
