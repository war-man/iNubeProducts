using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblMappingDetails
    {
        public decimal Id { get; set; }
        public decimal? MappingDetailsId { get; set; }
        public string SourceParameter { get; set; }
        public string TargetParameter { get; set; }

        public virtual TblMapper MappingDetails { get; set; }
    }
}
