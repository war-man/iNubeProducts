using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblCalculationConfigParam
    {
        public decimal CalculationConfigParamId { get; set; }
        public decimal? CalculationConfigId { get; set; }
        public string CalculationConfigParamName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string Type { get; set; }

        public virtual TblCalculationConfig CalculationConfig { get; set; }
    }
}
