using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblOpportunityApproval
    {
        public int OpportunityApprovalId { get; set; }
        public int? ContactId { get; set; }
        public string ClientName { get; set; }
        public string ClientCode { get; set; }
        public string Nic { get; set; }
        public string Stage { get; set; }
        public DateTime? Createddate { get; set; }
        public bool? IsActive { get; set; }
    }
}
