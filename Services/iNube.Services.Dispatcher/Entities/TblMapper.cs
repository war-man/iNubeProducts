using System;
using System.Collections.Generic;

namespace iNube.Services.Dispatcher.Entities
{
    public partial class TblMapper
    {
        public TblMapper()
        {
            TblMapperDetails = new HashSet<TblMapperDetails>();
        }

        public decimal MapperId { get; set; }
        public string MapperName { get; set; }
        public string SourceComponent { get; set; }
        public string TargetComponent { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<TblMapperDetails> TblMapperDetails { get; set; }
    }
}
