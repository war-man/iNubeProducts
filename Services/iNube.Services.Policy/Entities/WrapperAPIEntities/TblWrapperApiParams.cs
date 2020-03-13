using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.WrapperAPIEntities
{
    public partial class TblWrapperApiParams
    {
        public decimal WrapperParamId { get; set; }
        public decimal? WrapperApiId { get; set; }
        public string InputParameters { get; set; }
        public string OutputParameters { get; set; }

        public virtual TblWrapperApiConfig WrapperApi { get; set; }
    }
}
