using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ClaimDocumentModel
    {
        public ClaimDocumentModel()
        {

        }

        public decimal DocumentID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<decimal> TrasactionID { get; set; }
        public Nullable<int> ClaimDocumentID { get; set; }
        public string DocumentIndex { get; set; }
        public string DocumentPath { get; set; }
        public Nullable<int> DocumentTypeID { get; set; }
        public Nullable<bool> IsOriginalVerified { get; set; }
        public Nullable<int> DocumentReviewStatusID { get; set; }

        public string UploadedBy { get; set; }
        public string UploadedAt { get; set; }
        public string ScruthinizedBy { get; set; }
        public string ScruthinizedAt { get; set; }
        public string DocumentName { get; set; }
        public string Remark { get; set; }

        public string DocumentType { get; set; }
        public string OriginalVerified { get; set; }
        public string DocumentDescription { get; set; }
        public string Notes { get; set; }
        public string username { get; set; }

    }

}
