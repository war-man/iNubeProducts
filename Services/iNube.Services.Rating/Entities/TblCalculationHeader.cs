using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblCalculationHeader
    {
        public TblCalculationHeader()
        {
            TblCalculationResult = new HashSet<TblCalculationResult>();
        }

        public decimal CalculationHeaderId { get; set; }
        public string CalculationHeaderName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<TblCalculationResult> TblCalculationResult { get; set; }
    }
}
