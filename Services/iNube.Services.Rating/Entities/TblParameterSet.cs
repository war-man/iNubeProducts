using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblParameterSet
    {
        public TblParameterSet()
        {
            TblParameterSetDetails = new HashSet<TblParameterSetDetails>();
        }

        public decimal ParameterSetId { get; set; }
        public string ParameterSetName { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<TblParameterSetDetails> TblParameterSetDetails { get; set; }
    }
}
