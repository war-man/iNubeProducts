using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductRcbcoverChilddetails
    {
        public TblProductRcbcoverChilddetails()
        {
            TblCoverRcbdetails = new HashSet<TblCoverRcbdetails>();
        }

        public int RcbcoverChilddetailsId { get; set; }
        public string InputTypeName { get; set; }
        public bool? IsReqired { get; set; }
        public int? InsurableRcbchildDetailsId { get; set; }

        public virtual ICollection<TblCoverRcbdetails> TblCoverRcbdetails { get; set; }
    }
}
