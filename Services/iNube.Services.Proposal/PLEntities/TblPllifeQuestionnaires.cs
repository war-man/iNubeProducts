using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPllifeQuestionnaires
    {
        public TblPllifeQuestionnaires()
        {
            TblQuestionDetails = new HashSet<TblQuestionDetails>();
        }

        public int Qid { get; set; }
        public string Qtext { get; set; }
        public string Qtype { get; set; }
        public bool? IsDeleted { get; set; }
        public string Subtype { get; set; }
        public string ControlType { get; set; }
        public string SubQuestion { get; set; }
        public string SubControlType { get; set; }
        public string Gender { get; set; }
        public string Relationship { get; set; }
        public string Value { get; set; }
        public string Plter { get; set; }
        public int? ParentId { get; set; }
        public int? SequenceNo { get; set; }
        public int? OccupationId { get; set; }
        public int? ProductId { get; set; }
        public string ResidentialStatus { get; set; }
        public bool? OccupationHazardouswork { get; set; }
        public string PaqquestionsId { get; set; }
        public string Qform { get; set; }

        public virtual ICollection<TblQuestionDetails> TblQuestionDetails { get; set; }
    }
}
