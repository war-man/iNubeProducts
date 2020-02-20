using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class TblParamSet
    {
        public TblParamSet()
        {
            TblParamSetDetails = new HashSet<TblParamSetDetails>();
            TblRuleParamSetMapping = new HashSet<TblRuleParamSetMapping>();
        }

        public decimal ParamSetId { get; set; }
        public string ParamSetName { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<TblParamSetDetails> TblParamSetDetails { get; set; }
        public virtual ICollection<TblRuleParamSetMapping> TblRuleParamSetMapping { get; set; }
    }
}
