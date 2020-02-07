using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblCalculationResult
    {
        public decimal CalculationResultId { get; set; }
        public decimal? CalculationHeaderId { get; set; }
        public string CalculationResultName { get; set; }
        public decimal? CalculationResultValue { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual TblCalculationHeader CalculationHeader { get; set; }
    }
}
