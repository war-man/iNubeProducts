using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblIllustrationMapping
    {
        public decimal IllustrationMappingId { get; set; }
        public decimal? IllustrationConfigId { get; set; }
        public string IllustrationInputParam { get; set; }
        public string IllustrationOutputParam { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual TblIllustrationConfig IllustrationConfig { get; set; }
    }
}
