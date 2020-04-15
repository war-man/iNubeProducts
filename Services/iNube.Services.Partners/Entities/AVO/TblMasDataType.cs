using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblMasDataType
    {
        public TblMasDataType()
        {
            TblMasParameters = new HashSet<TblMasParameters>();
        }

        public int DataTypeId { get; set; }
        public string DataTypeName { get; set; }

        public virtual ICollection<TblMasParameters> TblMasParameters { get; set; }
    }
}
