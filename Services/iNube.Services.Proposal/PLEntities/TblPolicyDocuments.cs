using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblPolicyDocuments
    {
        public decimal DocumentUploadId { get; set; }
        public decimal? PolicyId { get; set; }
        public string DocumentType { get; set; }
        public string FileName { get; set; }
        public byte[] File { get; set; }
        public string ContentType { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string FilePath { get; set; }
        public string ItemType { get; set; }
        public string MemberType { get; set; }
        public string Permission { get; set; }
        public string Remarks { get; set; }
        public string Decision { get; set; }
        public bool? IsNewDocumentAdded { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
