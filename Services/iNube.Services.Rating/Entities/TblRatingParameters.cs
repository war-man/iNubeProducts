using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblRatingParameters
    {
        public decimal ParametersId { get; set; }
        public string ParameterName { get; set; }
        public string ParameterType { get; set; }
        public string ParameterMasterLink { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
