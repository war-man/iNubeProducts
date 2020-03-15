using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaimAllocationDetails
    {
        public int AllocationId { get; set; }
        public string AllocatedTo { get; set; }
        public string AllocationType { get; set; }
        public string AllocationDetails { get; set; }
        public string WorkFlowId { get; set; }
        public string StepId { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public int ClaimId { get; set; }

        public virtual TblClaims Claim { get; set; }
    }
}
