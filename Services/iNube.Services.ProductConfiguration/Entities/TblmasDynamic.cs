using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblmasDynamic
    {
        public TblmasDynamic()
        {
            TblDynamicEntity = new HashSet<TblDynamicEntity>();
        }

        public decimal Id { get; set; }
        public string FieldType { get; set; }
        public string Value { get; set; }

        public virtual ICollection<TblDynamicEntity> TblDynamicEntity { get; set; }
    }
}
