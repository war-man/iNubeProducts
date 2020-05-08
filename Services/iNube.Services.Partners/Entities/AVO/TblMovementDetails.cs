using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblMovementDetails
    {
        public decimal MovementDetailsId { get; set; }
        public decimal? MovementId { get; set; }
        public int? MovementFormId { get; set; }
        public int? MovementSubFormId { get; set; }
        public decimal? MovingId { get; set; }
        public decimal? MovedTo { get; set; }
        public decimal? Status { get; set; }

        public virtual TblMovements Movement { get; set; }
    }
}
