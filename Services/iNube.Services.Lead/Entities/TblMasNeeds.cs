using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblMasNeeds
    {
        public decimal NeedId { get; set; }
        public string NeedName { get; set; }
        public string SuggestedProductName { get; set; }
        public int? IsDeleted { get; set; }
        public string ImagePath { get; set; }
    }
}
