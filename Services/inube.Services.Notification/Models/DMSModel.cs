using iNube.Utility.Framework.Model;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inube.Services.Notification.Models
{
    [BsonIgnoreExtraElements]
    public class DMSDTO 
    {
        public DMSDTO()
        {
            tagDTOs = new List<TagDTO>();
        }
      
        public string docId { get; set; }
        public string fileName { get; set; }
        public long length { get; set; }
        public string contentType { get; set; }
        public byte[] data { get; set; }
        public DateTime uploadDate { get; set; }
        public List<TagDTO> tagDTOs { get; set; }
    }
    public class TagDTO
    {
        public string tagName { get; set; }
        public string tagValue { get; set; }
    }
    public class DMSResponse : ResponseStatus
    {
        public DMSResponse()
        {
            dMSDTOs = new List<DMSDTO>();
        }
        public string Docid { get; set; }
        public string fileName { get; set; }
        public List<DMSDTO> dMSDTOs { get; set; }

    }

}
