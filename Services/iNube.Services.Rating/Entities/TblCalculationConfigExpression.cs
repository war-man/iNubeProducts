using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblCalculationConfigExpression
    {
        public decimal CalculationConfigExpressionId { get; set; }
        public decimal? CalculationConfigId { get; set; }
        public string ExpressionValue { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string ExpressionResult { get; set; }
        public int? Steps { get; set; }

        public virtual TblCalculationConfig CalculationConfig { get; set; }
    }
}
