using System;
using System.Collections.Generic;

namespace iNube.Services.Rating.Entities
{
    public partial class TblIllustrationConfig
    {
        public TblIllustrationConfig()
        {
            TblIllustrationConfigParam = new HashSet<TblIllustrationConfigParam>();
            TblIllustrationMapping = new HashSet<TblIllustrationMapping>();
        }

        public decimal IllustrationConfigId { get; set; }
        public string IllustrationConfigName { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<TblIllustrationConfigParam> TblIllustrationConfigParam { get; set; }
        public virtual ICollection<TblIllustrationMapping> TblIllustrationMapping { get; set; }
    }
}
