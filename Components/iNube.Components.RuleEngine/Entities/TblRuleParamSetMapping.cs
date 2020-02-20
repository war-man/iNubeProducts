using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class TblRuleParamSetMapping
    {
        public decimal RuleParamSetMappingId { get; set; }
        public decimal? RuleId { get; set; }
        public decimal? ParamSetId { get; set; }

        public virtual TblParamSet ParamSet { get; set; }
        public virtual TblRules Rule { get; set; }
    }
}
