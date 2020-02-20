using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class TblParamSetDetails
    {
        public decimal ParamSetDetailsId { get; set; }
        public decimal? ParamSetId { get; set; }
        public decimal? ParamId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual TblParameters Param { get; set; }
        public virtual TblParamSet ParamSet { get; set; }
    }
}
