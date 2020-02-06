using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblmasPccommonTypes
    {
        public TblmasPccommonTypes()
        {
            TblProductBenefits = new HashSet<TblProductBenefits>();
            TblProductChannels = new HashSet<TblProductChannels>();
            TblProductClausesWarrentiesExclusions = new HashSet<TblProductClausesWarrentiesExclusions>();
            TblProductPremiumCurrency = new HashSet<TblProductPremium>();
            TblProductPremiumLevel = new HashSet<TblProductPremium>();
            TblProducts = new HashSet<TblProducts>();
        }

        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }

        public virtual ICollection<TblProductBenefits> TblProductBenefits { get; set; }
        public virtual ICollection<TblProductChannels> TblProductChannels { get; set; }
        public virtual ICollection<TblProductClausesWarrentiesExclusions> TblProductClausesWarrentiesExclusions { get; set; }
        public virtual ICollection<TblProductPremium> TblProductPremiumCurrency { get; set; }
        public virtual ICollection<TblProductPremium> TblProductPremiumLevel { get; set; }
        public virtual ICollection<TblProducts> TblProducts { get; set; }
    }
}
