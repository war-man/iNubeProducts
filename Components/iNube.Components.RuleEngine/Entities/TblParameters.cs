using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class TblParameters
    {
        public TblParameters()
        {
            TblParamSetDetails = new HashSet<TblParamSetDetails>();
        }

        public decimal ParamId { get; set; }
        public string ParamName { get; set; }
        public string ParamType { get; set; }
        public string ParamMasterLink { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<TblParamSetDetails> TblParamSetDetails { get; set; }
    }
}
