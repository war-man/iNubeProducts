using System;
using System.Collections.Generic;

namespace iNube.Services.Dispatcher.Entities
{
    public partial class TblMapperDetails
    {
        public decimal MapperDetailsId { get; set; }
        public decimal? MapperId { get; set; }
        public string SourceParameter { get; set; }
        public string TargetParameter { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string TargetParameterPath { get; set; }

        public virtual TblMapper Mapper { get; set; }
    }
}
