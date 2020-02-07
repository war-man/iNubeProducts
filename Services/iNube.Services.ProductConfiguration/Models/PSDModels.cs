using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace iNube.Services.ProductConfiguration.Models
{
    public class PSDModels
    {

        public class TreeMasterDTO
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string Id { get; set; }

            public string mID { get; set; }
            //[BsonElement("Name")]
            public string mValue { get; set; }
            public string mType { get; set; }
            public string mIsRequired { get; set; }
        }

        public class TreeMasterDTO1
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string id { get; set; }
            //[DataMember]


            //[BsonId]
            //[BsonRepresentation(BsonType.ObjectId)]
            //[DataMember]
            //public MongoDB.Bson.ObjectId _id { get; set; }

            public string CommonTypeID { get; set; }
            public string MasterType { get; set; }
            public string TypeCode { get; set; }
            public string Value { get; set; }
        }
        public class ValueMappingDTO
        {
            public string MappingId { get; set; }
            public string MasterType { get; set; }
        }

        public class PsdDTO
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string Id { get; set; }
            public string PsdId { get; set; }
            public string PsdName { get; set; }
            public dynamic PsdData { get; set; }
        }

        public class AttributeDTO
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string Id { get; set; }
            public string Name { get; set; }
            public string Complexity { get; set; }
            public string Storage { get; set; }
            public string ListOfValues { get; set; }
            public string Dependency { get; set; }
            public string DataType { get; set; }
            public string Default { get; set; }
            public string DisplayType { get; set; }
            public bool IsActive { get; set; }
        }

        public class EntitiesDTO
        {
            public EntitiesDTO()
            {
                AttruibuteList = new List<AttruibuteList>();
            }
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string Id { get; set; }
            public string Name { get; set; }
            public string Type { get; set; }
            public string Eicon { get; set; }
            public List<AttruibuteList> AttruibuteList { get; set; }
        }

        public class AttruibuteList
        {
            public string Name { get; set; }
            public string Complexity { get; set; }
            public string Storage { get; set; }
            public string ListOfValues { get; set; }
            public string Dependency { get; set; }
            public string DataType { get; set; }
            public string Default { get; set; }
            public string DisplayType { get; set; }
            public string DisplayName { get; set; }
            public string Order { get; set; }
            public string ValueMapping { get; set; }
            public string Validation { get; set; }
            public string Tag { get; set; }
        }

        public class AttributeTagDTO
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string Id { get; set; }
            public string Type { get; set; }
            public string Value { get; set; }

        }

        public class EntityIDDTO
        {

            public bool GetMaster { get; set; }
            public string StructuredId { get; set; }
            public List<string> UnStructuredLstId { get; set; }

        }

        public class CustomPageDTO
        {
            public CustomPageDTO()
            {
                UnStructuredData = new List<DataDTO>();
                StructuredData = new DataDTO();
            }

            public DataDTO StructuredData { get; set; }
            public List<DataDTO> UnStructuredData { get; set; }
        }


        public class CustomDataDTO
        {
            public string Type { get; set; }
            public string LabelText { get; set; }
            public bool required { get; set; }
        }



        public class PageDataDTO
        {
            public PageDataDTO()
            {
                UnStructuredData = new List<DataDTO>();
            }

            public string StructuredData { get; set; }
            public List<DataDTO> UnStructuredData { get; set; }
        }

        public class DataDTO
        {
            public DataDTO()
            {
                Data = new List<CustomDataDTO>();
            }
            public string Id { get; set; }
            public List<CustomDataDTO> Data { get; set; }
        }


    }
}
