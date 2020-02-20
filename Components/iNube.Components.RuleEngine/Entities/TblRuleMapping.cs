using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class TblRuleMapping
    {
        public decimal RuleMapId { get; set; }
        public decimal? RuleId { get; set; }
        public string Param1 { get; set; }
        public string Param2 { get; set; }
        public string MasterModel { get; set; }
        public string Action { get; set; }
        public DateTime? CreatedBy { get; set; }
        public string ModelName { get; set; }
    }
}
