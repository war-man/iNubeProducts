using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyTopupDetails
    {
        public int Id { get; set; }
        public string TopupPolicyYear { get; set; }
        public string Amount { get; set; }
        public decimal? PolicyId { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
