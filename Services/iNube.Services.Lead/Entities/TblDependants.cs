using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblDependants
    {
        public int DependantId { get; set; }
        public int? ContactId { get; set; }
        public string DependantName { get; set; }
        public DateTime? DependantDob { get; set; }
        public int? DependantAge { get; set; }
        public string DependantRelation { get; set; }

        public virtual TblContacts Contact { get; set; }
    }
}
