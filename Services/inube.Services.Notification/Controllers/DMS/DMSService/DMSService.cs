﻿using inube.Services.Notification.Models;
using System;
using MongoDB.Driver;
using MongoDB.Bson;
using System.IO;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization;
using MongoDB.Driver.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Razor.Language;

namespace inube.Services.Notification.Controllers.DMS.DMSService
{
    public interface IDMSService
    {
        DMSResponse Documentupload(HttpRequest httpRequest, string tagName, string tagValue);
        //   List<DMSResponse> DocumentSimpleupload(ImageDTO fileUploadDTO);
        Task<List<DMSResponse>> DocumentSimpleupload(ImageDTO fileUploadDTO);
        Task<List<string>> SearchParam(string tagName, string tagvalue);
        Task<DocumentResp> DownloadFile(string id);
        Task<FileUploadDTO> DownloadFile1(string id);
        void DeleteDocument(string id);
        Task<List<DMSDTO>> AddTags(string id, string tagName, string tagvalue);
        Task<DMSDTO> DownloadView(string id);


        Task<FileUpdateDTO> UpdateDocument(FileUpdateDTO updateImageDTO);
    }
    public class DMSService1 : IDMSService
    {
        IDMSDatabaseSettings _settings;
        MongoClientSettings mngsettings = null;
        public DMSService1(IDMSDatabaseSettings settings)
        {
            _settings = settings;
            var mongo_url = MongoUrl.Create(_settings.ConnectionString);
            mngsettings = MongoClientSettings.FromUrl(mongo_url);
            mngsettings.MaxConnectionIdleTime = new TimeSpan(0, 3, 0); mngsettings.SocketTimeout = new TimeSpan(0, 3, 0);
        }
        public async Task<DocumentResp> DownloadFile(string id)
        {
            DocumentResp documentResp = new DocumentResp();
           // var client = new MongoClient(_settings.ConnectionString);
            var client = new MongoClient(mngsettings);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<DMSDTO>(_settings.CollectionName);
            DMSDTO dMSDTO = new DMSDTO();
            var item = await collection.FindSync(Builders<DMSDTO>.Filter.Eq("docId", id)).FirstOrDefaultAsync();
            if(item ==null)
            {
                documentResp.ResponseMessage = "No Recoreds found";
                return documentResp;
            }
            // documentResp.data=item.data;
            var itemstring1 = item.fileName;
            String[] strlist1 = itemstring1.Split('.', StringSplitOptions.None);
            var count1 = strlist1.Count();
            string extension = strlist1[count1 - 1];
            documentResp.fileExtension = extension;
            documentResp.data = item.data;
            return documentResp;

        }
        public async Task<FileUploadDTO> DownloadFile1(string id)
        {
           // var client = new MongoClient(_settings.ConnectionString);
            var client = new MongoClient(mngsettings);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<FileUploadDTO>(_settings.CollectionName);
            FileUploadDTO dMSDTO = new FileUploadDTO();
            var item = await collection.FindSync(Builders<FileUploadDTO>.Filter.Eq("docId", id)).FirstOrDefaultAsync();
            return item;

        }

        public async Task<DMSDTO> DownloadView(string id)
        {
            //var client = new MongoClient(_settings.ConnectionString);
            var client = new MongoClient(mngsettings);
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
                //var client = new MongoClient(_settings.ConnectionString);
                var client = new MongoClient(mngsettings);
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
                foreach (var id in dMSDTOList)
                {
                    var docid = id.docId;

#pragma warning disable CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed
                    AddTags(docid, tagName, tagValue);
#pragma warning restore CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed

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


        //public List<DMSResponse> DocumentSimpleupload(ImageDTO fileUploadDTO)
        //{
        //    var client = new MongoClient(_settings.ConnectionString);
        //    var db = ConnectionInfo()
        //    var database = client.GetDatabase(_settings.DatabaseName);
        //    DMSDTO dMSDTO = new DMSDTO();

        //    dMSDTO.docId = guid;
        //    DMSResponse dMSResponse = new DMSResponse();

        //    List<DMSResponse> dMSResponselist = new List<DMSResponse>();

        //    foreach (var images in fileUploadDTO.fileUploadDTOs)
        //    {
        //        string guid = System.Guid.NewGuid().ToString();
        //        dMSDTO.docId = guid;

        //        dMSDTO.fileName = images.FileName;

        //        dMSDTO.uploadDate = DateTime.Now;

        //        dMSDTO.contentType = images.ContentType;
        //        dMSDTO.data = images.FileData;



        //        var bsonDocument = dMSDTO.ToBsonDocument();
        //        var jsonDocument = bsonDocument.ToJson();
        //        var document = BsonSerializer.Deserialize<BsonDocument>(jsonDocument);
        //        var collection = database.GetCollection<BsonDocument>(_settings.CollectionName);
        //        collection.InsertOneAsync(document);

        //        var docid = dMSDTO.docId;
        //        var tagname = images.Tagname;
        //        var tagvalue = images.TagValue;
        //        AddTags(docid, tagname, tagvalue);
        //        dMSResponse = new DMSResponse();
        //        dMSResponse.Docid = docid;

        //        dMSResponselist.Add(dMSResponse);

        //    }

        //    var files = httpRequest.Form.Files;





        //    DMSResponse dMSResponse = new DMSResponse();
        //    dMSResponse.Docid = docid;


        //    dMSDTO.docId = guid;
        //    return dMSResponselist;
        //    return new DMSResponse { Docid = dMSDTO.docId, Status = iNube.Utility.Framework.Model.BusinessStatus.Ok };


        //}

        public async Task<List<DMSResponse>> DocumentSimpleupload(ImageDTO fileUploadDTO)
        {
           // var client = new MongoClient(_settings.ConnectionString);
            var client = new MongoClient(mngsettings);
            //var db=ConnectionInfo()
            var database = client.GetDatabase(_settings.DatabaseName);
            DMSDTO dMSDTO = new DMSDTO();
            DMSResponse dMSResponse = new DMSResponse();

            List<DMSResponse> dMSResponselist = new List<DMSResponse>();

            foreach (var images in fileUploadDTO.fileUploadDTOs)
            {
                string guid = System.Guid.NewGuid().ToString();
                if (string.IsNullOrEmpty(images.IdentificationNo))
                {
                    dMSDTO.docId = guid;
                }
                else
                {
                    dMSDTO.docId = images.IdentificationNo;
                }

                dMSDTO.fileName = images.FileName;

                dMSDTO.uploadDate = DateTime.Now;

                dMSDTO.contentType = images.ContentType;
                dMSDTO.data = images.FileData;



                var bsonDocument = dMSDTO.ToBsonDocument();
                var jsonDocument = bsonDocument.ToJson();
                var document = BsonSerializer.Deserialize<BsonDocument>(jsonDocument);
                var collection = database.GetCollection<BsonDocument>(_settings.CollectionName);
                await collection.InsertOneAsync(document);

                var docid = dMSDTO.docId;
                // var tagname = images.tagdto.;
                // var tagvalue = images.TagValue;
                foreach (var item in images.tagdto)
                {
                    var tagname = item.Tagname;
                    var tagvalue = item.TagValue;
                    await AddTags(docid, tagname, tagvalue);
                }

                dMSResponse = new DMSResponse();
                dMSResponse.Docid = docid;

                dMSResponselist.Add(dMSResponse);

            }
            return dMSResponselist;
        }


        public async Task<List<string>> SearchParam(string tagName, string tagvalue)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<DMSDTO>(_settings.CollectionName);
            DMSDTO dMSDTO = new DMSDTO();
#pragma warning disable CS0618 // Type or member is obsolete
            var totaldoc = await collection.CountAsync(new BsonDocument());
#pragma warning restore CS0618 // Type or member is obsolete
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
            collection.DeleteOne(x => x.docId == id);
        }
        public async Task<List<DMSDTO>> AddTags(string id, string tagName, string tagvalue)
        {
           // var client = new MongoClient(_settings.ConnectionString);
            var client = new MongoClient(mngsettings);
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



        public async Task<FileUpdateDTO> UpdateDocument(FileUpdateDTO updateImageDTO)
        {
            // var client = new MongoClient(_settings.ConnectionString);
            var client = new MongoClient(mngsettings);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<DMSDTO>(_settings.CollectionName);
            List<TagDTO> tagDTOs = new List<TagDTO>();
            TagDTO tagDTO = new TagDTO();
            DMSDTO dMSDTO = new DMSDTO();
            var filter = await collection.Find(x => x.docId == updateImageDTO.DocId).ToListAsync();
            var Tagcount = filter[0].tagDTOs.Count;

            var data = filter.Where(a => a.docId == updateImageDTO.DocId).FirstOrDefault();

            //data.contentType = "/png";
            var c = 0;// Tagcount++;
            var filterDefinition = Builders<DMSDTO>.Filter.Where(w => w.docId == updateImageDTO.DocId);
            var updateDefinition = Builders<DMSDTO>.Update
             .Set(d => d.contentType, updateImageDTO.ContentType).
              Set(d => d.fileName, updateImageDTO.FileName)
             .Set(d => d.length, updateImageDTO.FileData.Length)
             .Set(d => d.data, updateImageDTO.FileData)
             .Set(d => d.uploadDate, DateTime.Now)
             .Set(d => d.tagDTOs[c].tagName, updateImageDTO.tagdto[c].Tagname)
             .Set(d => d.tagDTOs[c].tagValue, updateImageDTO.tagdto[c].TagValue);
             await  collection.UpdateManyAsync(filterDefinition, updateDefinition);

            return null;
        }



    }

}

