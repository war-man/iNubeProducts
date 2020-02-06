using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblmasProductMaster
    {
        public TblmasProductMaster()
        {
            TblCoverChildRcbdetails = new HashSet<TblCoverChildRcbdetails>();
            TblCoverRcbdetails = new HashSet<TblCoverRcbdetails>();
            TblInsurableChildRcbdetails = new HashSet<TblInsurableChildRcbdetails>();
            TblInsurableRcbdetails = new HashSet<TblInsurableRcbdetails>();
            TblProductBenefits = new HashSet<TblProductBenefits>();
            TblProductCoversCoverEvent = new HashSet<TblProductCovers>();
            TblProductCoversCoverEventFactor = new HashSet<TblProductCovers>();
            TblProductCoversCoverEventFactorValueUnit = new HashSet<TblProductCovers>();
            TblProductCoversCoverType = new HashSet<TblProductCovers>();
            TblProductInsurableItemsInsurableCategory = new HashSet<TblProductInsurableItems>();
            TblProductInsurableItemsInsurableItemType = new HashSet<TblProductInsurableItems>();
            TblProductRcbdetailsInput = new HashSet<TblProductRcbdetails>();
            TblProductRcbdetailsLevel = new HashSet<TblProductRcbdetails>();
            TblProductsCob = new HashSet<TblProducts>();
            TblProductsLob = new HashSet<TblProducts>();
            TblmasClausesWarrentiesExclusionsCwetype = new HashSet<TblmasClausesWarrentiesExclusions>();
            TblmasClausesWarrentiesExclusionsLevel = new HashSet<TblmasClausesWarrentiesExclusions>();
            TblmasClausesWarrentiesExclusionsLob = new HashSet<TblmasClausesWarrentiesExclusions>();
            TblmasClausesWarrentiesExclusionsSubLevel = new HashSet<TblmasClausesWarrentiesExclusions>();
        }

        public int ProductMasterId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
        public int? ParentId { get; set; }
        public bool IsDisable { get; set; }
        public bool IsActive { get; set; }
        public int? SortOrder { get; set; }
        public string UserInputType { get; set; }
        public string Description { get; set; }

        public virtual ICollection<TblCoverChildRcbdetails> TblCoverChildRcbdetails { get; set; }
        public virtual ICollection<TblCoverRcbdetails> TblCoverRcbdetails { get; set; }
        public virtual ICollection<TblInsurableChildRcbdetails> TblInsurableChildRcbdetails { get; set; }
        public virtual ICollection<TblInsurableRcbdetails> TblInsurableRcbdetails { get; set; }
        public virtual ICollection<TblProductBenefits> TblProductBenefits { get; set; }
        public virtual ICollection<TblProductCovers> TblProductCoversCoverEvent { get; set; }
        public virtual ICollection<TblProductCovers> TblProductCoversCoverEventFactor { get; set; }
        public virtual ICollection<TblProductCovers> TblProductCoversCoverEventFactorValueUnit { get; set; }
        public virtual ICollection<TblProductCovers> TblProductCoversCoverType { get; set; }
        public virtual ICollection<TblProductInsurableItems> TblProductInsurableItemsInsurableCategory { get; set; }
        public virtual ICollection<TblProductInsurableItems> TblProductInsurableItemsInsurableItemType { get; set; }
        public virtual ICollection<TblProductRcbdetails> TblProductRcbdetailsInput { get; set; }
        public virtual ICollection<TblProductRcbdetails> TblProductRcbdetailsLevel { get; set; }
        public virtual ICollection<TblProducts> TblProductsCob { get; set; }
        public virtual ICollection<TblProducts> TblProductsLob { get; set; }
        public virtual ICollection<TblmasClausesWarrentiesExclusions> TblmasClausesWarrentiesExclusionsCwetype { get; set; }
        public virtual ICollection<TblmasClausesWarrentiesExclusions> TblmasClausesWarrentiesExclusionsLevel { get; set; }
        public virtual ICollection<TblmasClausesWarrentiesExclusions> TblmasClausesWarrentiesExclusionsLob { get; set; }
        public virtual ICollection<TblmasClausesWarrentiesExclusions> TblmasClausesWarrentiesExclusionsSubLevel { get; set; }
    }
}
