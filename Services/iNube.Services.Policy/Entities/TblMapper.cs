using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblMapper
    {
        public TblMapper()
        {
            TblMappingDetails = new HashSet<TblMappingDetails>();
        }

        public decimal MapperId { get; set; }
        public string SourceComponent { get; set; }
        public string TargetComponent { get; set; }
        public string SourceCategoryType { get; set; }
        public string TargetCategoryType { get; set; }
        public string SourceReferenceId { get; set; }
        public string TargetReferenceId { get; set; }

        public virtual ICollection<TblMappingDetails> TblMappingDetails { get; set; }
    }
}
