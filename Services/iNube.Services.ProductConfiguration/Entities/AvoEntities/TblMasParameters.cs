using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities.AvoEntities
{
    public partial class TblMasParameters
    {
        public TblMasParameters()
        {
            TblProductPlanRiderParameters = new HashSet<TblProductPlanRiderParameters>();
        }

        public int ParameterId { get; set; }
        public string ParameterName { get; set; }
        public string ParameterDescription { get; set; }
        public int? ParameterDataTypeId { get; set; }
        public string ParameterMaster { get; set; }
        public string ParameterType { get; set; }

        public virtual TblMasDataType ParameterDataType { get; set; }
        public virtual ICollection<TblProductPlanRiderParameters> TblProductPlanRiderParameters { get; set; }
    }
}
