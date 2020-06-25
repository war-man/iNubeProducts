using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class TblRules
    {
        public TblRules()
        {
            TblRuleConditions = new HashSet<TblRuleConditions>();
            TblRuleParamSetMapping = new HashSet<TblRuleParamSetMapping>();
        }

        public decimal RuleId { get; set; }
        public string RuleName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string RuleObj { get; set; }
        public string RuleType { get; set; }

        public virtual ICollection<TblRuleConditions> TblRuleConditions { get; set; }
        public virtual ICollection<TblRuleParamSetMapping> TblRuleParamSetMapping { get; set; }
    }
}
