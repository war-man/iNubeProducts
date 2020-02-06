using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblTopupDetails
    {
        public int Id { get; set; }
        public int LifeQqid { get; set; }
        public string TopupPolicyYear { get; set; }
        public string Amount { get; set; }

        public virtual TblLifeQq LifeQq { get; set; }
    }
}
