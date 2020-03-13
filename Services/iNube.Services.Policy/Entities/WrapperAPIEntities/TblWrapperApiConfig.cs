using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.WrapperAPIEntities
{
    public partial class TblWrapperApiConfig
    {
        public TblWrapperApiConfig()
        {
            TblWrapperApiParams = new HashSet<TblWrapperApiParams>();
        }

        public decimal WrapperApiId { get; set; }
        public string WrapperApiName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<TblWrapperApiParams> TblWrapperApiParams { get; set; }
    }
}

