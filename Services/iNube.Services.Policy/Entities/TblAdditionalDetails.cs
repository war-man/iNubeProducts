using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblAdditionalDetails
    {
        public decimal AdditionalDetailsId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyNumber { get; set; }
        public string CompanyEmail { get; set; }
        public decimal? CompanyUsage { get; set; }
        public string CompanyFeedback { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string PolicyNo { get; set; }
    }
}
