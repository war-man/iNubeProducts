using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblInsurableRcbdetails
    {
        public TblInsurableRcbdetails()
        {
            TblCoverRcbdetails = new HashSet<TblCoverRcbdetails>();
            TblInsurableChildRcbdetails = new HashSet<TblInsurableChildRcbdetails>();
        }

        public int InsurableRcbdetailsId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
        public int InputId { get; set; }
        public int ProductId { get; set; }
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }

        public virtual TblmasProductMaster Input { get; set; }
        public virtual TblProducts Product { get; set; }
        public virtual ICollection<TblCoverRcbdetails> TblCoverRcbdetails { get; set; }
        public virtual ICollection<TblInsurableChildRcbdetails> TblInsurableChildRcbdetails { get; set; }
    }
}
