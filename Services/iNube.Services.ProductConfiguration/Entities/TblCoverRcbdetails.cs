using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblCoverRcbdetails
    {
        public TblCoverRcbdetails()
        {
            TblCoverChildRcbdetails = new HashSet<TblCoverChildRcbdetails>();
        }

        public int CoverRcbdetailsId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public int InsurableRcbdetailsId { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }

        public virtual TblmasProductMaster Input { get; set; }
        public virtual TblInsurableRcbdetails InsurableRcbdetails { get; set; }
        public virtual ICollection<TblCoverChildRcbdetails> TblCoverChildRcbdetails { get; set; }
    }
}
