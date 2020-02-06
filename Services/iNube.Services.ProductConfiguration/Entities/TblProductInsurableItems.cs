using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductInsurableItems
    {
        public TblProductInsurableItems()
        {
            TblProductCovers = new HashSet<TblProductCovers>();
        }

        public decimal InsurableItemId { get; set; }
        public int ProductId { get; set; }
        public int InsurableItemTypeId { get; set; }
        public int? InsurableCategoryId { get; set; }
        public bool? IsSingle { get; set; }

        public virtual TblmasProductMaster InsurableCategory { get; set; }
        public virtual TblmasProductMaster InsurableItemType { get; set; }
        public virtual TblProducts Product { get; set; }
        public virtual ICollection<TblProductCovers> TblProductCovers { get; set; }
    }
}
