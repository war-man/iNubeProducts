using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyRelationship
    {
        public decimal PolicyRelationshipId { get; set; }
        public decimal? PolicyId { get; set; }
        public decimal? PolicyClientId { get; set; }
        public int? RelationshipId { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? ProspectId { get; set; }
        public decimal? OrganizationId { get; set; }

        public virtual TblOrganization Organization { get; set; }
        public virtual TblPolicy Policy { get; set; }
        public virtual TblPolicyClients PolicyClient { get; set; }
    }
}
