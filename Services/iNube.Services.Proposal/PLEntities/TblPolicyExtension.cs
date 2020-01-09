using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyExtension
    {
        public decimal PolicyExtensionId { get; set; }
        public decimal? PolicyId { get; set; }
        public string DoctorName { get; set; }
        public string LabName { get; set; }
        public string PaymentMadeByForDoctor { get; set; }
        public string PaymentMadeByForLab { get; set; }
        public string ReportsTobeSendTo { get; set; }
        public DateTime? ProposerDate { get; set; }
        public string ProposerPlace { get; set; }
        public string ProposerCountry { get; set; }
        public string ProposerDocumentType { get; set; }
        public bool? ProposerWealthPlanner { get; set; }
        public bool? ProposerWealthPlannerPolicy { get; set; }
        public DateTime? ProposerWealthPlannerPolicyBackDate { get; set; }
        public string ProposerWealthPlannerComments { get; set; }
        public DateTime? SpouseDate { get; set; }
        public string SpousePlace { get; set; }
        public string SpouseCountry { get; set; }
        public string SpouseDocumentType { get; set; }
        public bool? SpouseWealthPlanner { get; set; }
        public bool? SpouseWealthPlannerPolicy { get; set; }
        public DateTime? SpouseWealthPlannerPolicyBackDate { get; set; }
        public string SpouseWealthPlannerComments { get; set; }
        public string ProposalNeed { get; set; }
        public bool? Declaration { get; set; }
        public byte[] ProspectSignPath { get; set; }
        public byte[] SpouseSignPath { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
