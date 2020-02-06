using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductChannels
    {
        public decimal ChannelId { get; set; }
        public int? ProductId { get; set; }
        public int? ChannelTypeId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public double? Brokage { get; set; }

        public virtual TblmasPccommonTypes ChannelType { get; set; }
        public virtual TblProducts Product { get; set; }
    }
}
