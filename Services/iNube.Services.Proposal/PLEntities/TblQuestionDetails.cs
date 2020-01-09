using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblQuestionDetails
    {
        public decimal QuestionsId { get; set; }
        public decimal? MemberId { get; set; }
        public int? Qid { get; set; }
        public string VarcharFiled1 { get; set; }
        public DateTime? DateFiled1 { get; set; }
        public string VarcharFiled2 { get; set; }
        public DateTime? DateFiled2 { get; set; }
        public string VarcharFiled3 { get; set; }
        public string VarcharFiled4 { get; set; }
        public string VarcharFiled5 { get; set; }
        public string VarcharFiled6 { get; set; }
        public string VarcharFiled7 { get; set; }
        public string VarcharFiled8 { get; set; }
        public string VarcharFiled9 { get; set; }
        public DateTime? DateFiled3 { get; set; }
        public bool? IsDeleted { get; set; }
        public string VarcharFiled10 { get; set; }
        public string VarcharFiled11 { get; set; }
        public DateTime? DateFiled4 { get; set; }
        public string VarcharFiled12 { get; set; }
        public string PaqvarcharFiled1 { get; set; }
        public string PaqvarcharFiled2 { get; set; }
        public string PaqvarcharFiled3 { get; set; }
        public string PaqvarcharFiled4 { get; set; }
        public string PaqvarcharFiled5 { get; set; }
        public string PaqvarcharFiled6 { get; set; }
        public string PaqvarcharFiled7 { get; set; }
        public string PaqvarcharFiled8 { get; set; }
        public string PaqvarcharFiled9 { get; set; }
        public string PaqvarcharFiled10 { get; set; }
        public string PaqvarcharFiled11 { get; set; }
        public string PaqvarcharFiled12 { get; set; }
        public string PaqyearFiled1 { get; set; }
        public string PaqyearFiled2 { get; set; }
        public string PaqyearFiled3 { get; set; }
        public string PaqassetsTotal { get; set; }
        public string PaqliabilitiesTotal { get; set; }
        public string PaqassetsProperty { get; set; }
        public string PaqassetsInvestment { get; set; }
        public string PaqassetsEquities { get; set; }
        public string PaqassetsOther { get; set; }
        public string PaqliabilitiesMortgages { get; set; }
        public string PaqliabilitiesLoans { get; set; }
        public string PaqliabilitiesOthers { get; set; }

        public virtual TblPolicyMemberDetails Member { get; set; }
        public virtual TblPllifeQuestionnaires Q { get; set; }
    }
}
