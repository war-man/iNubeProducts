using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblParameterSetDetails
    {
        public decimal ParameterSetDetailsId { get; set; }
        public decimal? ParameterSetId { get; set; }
        public decimal? ParametersId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string RangeType { get; set; }

        public virtual TblParameterSet ParameterSet { get; set; }
    }
}
