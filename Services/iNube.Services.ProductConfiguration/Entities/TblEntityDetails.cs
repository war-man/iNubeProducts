using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblEntityDetails
    {
        public TblEntityDetails()
        {
            TblEntityAttributes = new HashSet<TblEntityAttributes>();
        }

        public decimal EntityId { get; set; }
        public string EnitityName { get; set; }
        public string EntityLevel { get; set; }
        public decimal? ParentId { get; set; }
        public string Type { get; set; }
        public string Relationship { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<TblEntityAttributes> TblEntityAttributes { get; set; }
    }
}
