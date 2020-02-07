using inube.Services.Notification.Models;
using System;
using MongoDB.Driver;
using MongoDB.Bson;
using System.IO;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization;
using MongoDB.Driver.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace inube.Services.Notification.Controllers.DMS.DMSService
{
    public interface IDMSService
    {
        DMSResponse Documentupload(HttpRequest httpRequest, string tagName, string tagValue);
        DMSResponse DocumentSimpleupload(FileUploadDTO fileUploadDTO);
        Task<List<string>> SearchParam(string tagName, string tagvalue);
        Task<DMSDTO> DownloadFile(string id);
        void DeleteDocument(string id);
        Task<List<DMSDTO>> AddTags(string id, string tagName, string tagvalue);
        Task<DMSDTO> DownloadView(string id);
    }
    public class DMSService1: IDMSService
    {
        IDMSDatabaseSettings _settings;
        public DMSService1(IDMSDatabaseSettings settings)
        {
            _settings = settings;
        }
        public async Task<DMSDTO> DownloadFile(string id)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<DMSDTO>(_settings.CollectionName);
            DMSDTO dMSDTO = new DMSDTO();
            var item = await collection.FindSync(Builders<DMSDTO>.Filter.Eq("docId", id)).FirstOrDefaultAsync();
            return item;

        }

        public async Task<DMSDTO> DownloadView(string id)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<DMSDTO>(_settings.CollectionName);
            DMSDTO dMSDTO = new DMSDTO();
            var item = await collection.FindSync(Builders<DMSDTO>.Filter.Eq("docId", id)).FirstOrDefaultAsync();
            return item;

        }

        public DMSResponse Documentupload(HttpRequest httpRequest, string tagName, string tagValue)
        {
            


            if (httpRequest.Form.Files != null)
            {
                var client = new MongoClient(_settings.ConnectionString);
                //var db=ConnectionInfo()
                var database = client.GetDatabase(_settings.DatabaseName);
                DMSDTO dMSDTO = new DMSDTO();
                List<DMSDTO> dMSDTOList = new List<DMSDTO>();
                var files = httpRequest.Form.Files;
                if (tagName == null)
                {
                    tagName = "EnterProvideTagName";
                }
                if (tagValue == null)
                {
                    tagValue = "ProvideTagValue";
                }

                foreach (var file in files)
                {
                  
                    dMSDTO = new DMSDTO();
                    string guid = System.Guid.NewGuid().ToString();
                    dMSDTO.docId = guid;
                    dMSDTO.fileName = file.Name;
                    var Filename = file.Name.Split('.');
                    dMSDTO.contentType = Filename[1];
                    dMSDTO.length += file.Length;
                    dMSDTO.uploadDate = DateTime.Now;
                    var fileBasepath = Path.GetTempPath();
                    string filePath = fileBasepath + "" + dMSDTO.fileName;

                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                        fs.Close();
                        byte[] bytes = System.IO.File.ReadAllBytes(filePath);
                        dMSDTO.data = bytes;
                    }
                    dMSDTOList.Add(dMSDTO);
                    var bsonDocument = dMSDTO.ToBsonDocument();
                    var jsonDocument = bsonDocument.ToJson();
                    var document = BsonSerializer.Deserialize<BsonDocument>(jsonDocument);
                    var collection = database.GetCollection<BsonDocument>(_settings.CollectionName);
                    collection.InsertOneAsync(document);
                   

                    //return dMSDTO;



                }
                foreach(var id in dMSDTOList)
                {
                    var docid = id.docId;

                    AddTags(docid, tagName, tagValue);

                }
                return new DMSResponse { dMSDTOs = dMSDTOList, Docid = dMSDTO.docId, fileName = dMSDTO.fileName, Status = iNube.Utility.Framework.Model.BusinessStatus.Ok };

            }
            return null;
            //var bsonDocument = dMSDTOList.ToBsonDocument();
            //var jsonDocument = bsonDocument.ToJson();
            //var document = BsonSerializer.Deserialize<BsonDocument>(jsonDocument);
            //var collection = database.GetCollection<BsonDocument>(_settings.CollectionName);
            //collection.InsertOneAsync(document);
            ////return dMSDTO;
            //return new DMSResponse { Docid = dMSDTO.docId, fileName = dMSDTO.fileName, Status = iNube.Utility.Framework.Model.BusinessStatus.Ok };


        }


        public DMSResponse DocumentSimpleupload(FileUploadDTO fileUploadDTO)
        {
            var client = new MongoClient(_settings.ConnectionString);
            //var db=ConnectionInfo()
            var database = client.GetDatabase(_settings.DatabaseName);
            DMSDTO dMSDTO = new DMSDTO();
            string guid = System.Guid.NewGuid().ToString();
            dMSDTO.docId = guid;
           // var files = httpRequest.Form.Files;
           

                dMSDTO.fileName = fileUploadDTO.FileName;
              
                dMSDTO.uploadDate = DateTime.Now;
           
                dMSDTO.contentType = fileUploadDTO.ContentType;
                dMSDTO.data = fileUploadDTO.FileData;



            var bsonDocument = dMSDTO.ToBsonDocument();
            var jsonDocument = bsonDocument.ToJson();
            var document = BsonSerializer.Deserialize<BsonDocument>(jsonDocument);
            var collection = database.GetCollection<BsonDocument>(_settings.CollectionName);
            collection.InsertOneAsync(document);
            // dMSDTO.docId =guid;
            //return dMSDTO.docId;
            return new DMSResponse { Docid = dMSDTO.docId , Status=iNube.Utility.Framework.Model.BusinessStatus.Ok};


        }

        public async Task<List<string>> SearchParam(string tagName, string tagvalue)
        {
                var client = new MongoClient(_settings.ConnectionString);
                var database = client.GetDatabase(_settings.DatabaseName);
                var collection = database.GetCollection<DMSDTO>(_settings.CollectionName);
                DMSDTO dMSDTO = new DMSDTO();
                var totaldoc = await collection.CountAsync(new BsonDocument());               
                List<string> documetId = new List<string>();
                var filter = Builders<DMSDTO>.Filter.ElemMatch(x => x.tagDTOs, x => x.tagName == tagName) & Builders<DMSDTO>.Filter.ElemMatch(x => x.tagDTOs, x => x.tagValue == tagvalue);
                var res = await collection.Find(filter).ToListAsync();
                foreach (var i in res)
                {
                    documetId.Add(i.docId);
                }
                return documetId;
           
        }
        public void DeleteDocument(string id)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<DMSDTO>(_settings.CollectionName);
            collection.DeleteOne(x=>x.docId == id);
        }
        public async Task<List<DMSDTO>> AddTags(string id, string tagName, string tagvalue)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<DMSDTO>(_settings.CollectionName);
            List<TagDTO> tagDTOs = new List<TagDTO>();
            TagDTO tagDTO = new TagDTO();
            DMSDTO dMSDTO = new DMSDTO();
            var filter = await collection.Find(x => x.docId == id).ToListAsync();
            var Tagcount = filter[0].tagDTOs.Count;
            var c = Tagcount++;
            var filterDefinition = Builders<DMSDTO>.Filter.Where(w => w.docId == id);
            var updateDefinition = Builders<DMSDTO>.Update
             .Set(d => d.tagDTOs[c].tagName, tagName).Set(d => d.tagDTOs[c].tagValue, tagvalue);
            collection.UpdateMany(filterDefinition, updateDefinition);
            return filter;
        }

    }
}
