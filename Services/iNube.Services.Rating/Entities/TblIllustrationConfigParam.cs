using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblIllustrationConfigParam
    {
        public decimal IllustrationConfigParamId { get; set; }
        public decimal? IllustrationConfigId { get; set; }
        public string IllustrationConfigParamName { get; set; }
        public string Type { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual TblIllustrationConfig IllustrationConfig { get; set; }
    }
}
