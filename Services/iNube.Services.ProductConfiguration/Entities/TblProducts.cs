using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProducts
    {
        public TblProducts()
        {
            TblInsurableRcbdetails = new HashSet<TblInsurableRcbdetails>();
            TblProductChannels = new HashSet<TblProductChannels>();
            TblProductClausesWarrentiesExclusions = new HashSet<TblProductClausesWarrentiesExclusions>();
            TblProductInsurableItems = new HashSet<TblProductInsurableItems>();
            TblProductPremium = new HashSet<TblProductPremium>();
            TblProductRcbdetails = new HashSet<TblProductRcbdetails>();
        }

        public int ProductId { get; set; }
        public int? Lobid { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public DateTime? ActiveFrom { get; set; }
        public DateTime? ActiveTo { get; set; }
        public decimal? PremiumAmount { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public int? Cobid { get; set; }
        public int? ProductStatusId { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public bool? IsSingleCover { get; set; }

        public virtual TblmasProductMaster Cob { get; set; }
        public virtual TblmasProductMaster Lob { get; set; }
        public virtual TblmasPccommonTypes ProductStatus { get; set; }
        public virtual ICollection<TblInsurableRcbdetails> TblInsurableRcbdetails { get; set; }
        public virtual ICollection<TblProductChannels> TblProductChannels { get; set; }
        public virtual ICollection<TblProductClausesWarrentiesExclusions> TblProductClausesWarrentiesExclusions { get; set; }
        public virtual ICollection<TblProductInsurableItems> TblProductInsurableItems { get; set; }
        public virtual ICollection<TblProductPremium> TblProductPremium { get; set; }
        public virtual ICollection<TblProductRcbdetails> TblProductRcbdetails { get; set; }
    }
}
