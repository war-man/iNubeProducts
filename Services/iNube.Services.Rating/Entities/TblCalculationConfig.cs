using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblCalculationConfig
    {
        public TblCalculationConfig()
        {
            TblCalculationConfigExpression = new HashSet<TblCalculationConfigExpression>();
            TblCalculationConfigParam = new HashSet<TblCalculationConfigParam>();
        }

        public decimal CalculationConfigId { get; set; }
        public string CalculationConfigName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<TblCalculationConfigExpression> TblCalculationConfigExpression { get; set; }
        public virtual ICollection<TblCalculationConfigParam> TblCalculationConfigParam { get; set; }
    }
}
