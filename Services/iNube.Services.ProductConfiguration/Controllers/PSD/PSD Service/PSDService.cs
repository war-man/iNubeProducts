using iNube.Services.ProductConfiguration.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static iNube.Services.ProductConfiguration.Models.PSDModels;

namespace iNube.Services.ProductConfiguration.Controllers.PSD.PSD_Service
{
    public interface IPSDService
    {
        List<TreeMasterDTO> GetTreeMasterData();
        TreeMasterDTO GetTreeMasterDataById(string id);
        void Update(string id, TreeMasterDTO treeMaster);
        IEnumerable<TreeMasterDTO> GetMaster(string sMasterlist);
        Task<IEnumerable> Save(dynamic PSDData);
        Task<List<BsonDocument>> GetSavedData();
        Task<IEnumerable<TreeMasterDTO>> GetAllMaster(string sMasterlist);
         Task<IEnumerable> SaveAttribute (AttributeDTO AttributeData);
        //Task<IEnumerable<AttributeDTO>> GetAttribute();
        Task<List<AttributeDTO>> GetAttribute();
        Task<IEnumerable> SaveEntity(EntitiesDTO entities);
        Task<IEnumerable> SaveAttributeTag(AttributeTagDTO Tags);
        IEnumerable<AttributeTagDTO> GetAttributeTag(string AttType);
        //Task<object> FetchEntites(string EntityId);
        IEnumerable<AttributeDTO> GetAttributeByName(string AttName);
        IEnumerable<EntitiesDTO> GetEntityByName(string EntName);
        void UpdateAttribute(string name, AttributeDTO Attributelist);
        void UpdateEntity(string name, EntitiesDTO Entitylist);

        Task<IEnumerable<TreeMasterDTO>> GetAllCommonMaster(string sMasterlist);
        Task<IEnumerable<PsdDTO>> GetPSD(string PsdName);
        Task<object> FetchEntites(EntityIDDTO EntityIDS);

        Task<List<TreeMasterDTO>> GetValueMapping();
    }

    public class PSDService : IPSDService
    {
        IPSDDataBaseSetting _settings;
        private readonly IMongoCollection<TreeMasterDTO> _tree;
        public PSDService(IPSDDataBaseSetting settings)
        {
            _settings = settings;

        }

        public List<TreeMasterDTO> GetTreeMasterData()
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<TreeMasterDTO>(_settings.CollectionName);
            var data = collection.Find(tree => true).ToList();
            return data;

        }


        public async Task<List<BsonDocument>> GetSavedData()
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<BsonDocument>(_settings.CollectionName);
            //  var data =await collection.Find(tree => true);
            var list = await collection.Find(new BsonDocument()).ToListAsync();

            return list;

        }



        public TreeMasterDTO GetTreeMasterDataById(string id)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<TreeMasterDTO>(_settings.CollectionName);

            if (id != "")
            {
                var _collection = collection.Find<TreeMasterDTO>(tree => tree.Id == id).FirstOrDefault();
                return _collection;
            }

            return null;
        }

        public void Update(string id, TreeMasterDTO treeMaster)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<TreeMasterDTO>("Master");
            collection.ReplaceOne(tree => tree.Id == id, treeMaster);

        }

        public IEnumerable<TreeMasterDTO> GetMaster(string sMasterlist)
        {
            // _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var Mastercollection = database.GetCollection<TreeMasterDTO>("Master");

            IEnumerable<TreeMasterDTO> treeDTOs = new List<TreeMasterDTO>();
            // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            treeDTOs = Mastercollection.Find<TreeMasterDTO>(tree => tree.mType == sMasterlist).ToList();

            return treeDTOs;
        }

        public async Task<IEnumerable> Save(dynamic PSDData)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);

            Guid UniqueID = Guid.NewGuid();

            PsdDTO FinalDTO = new PsdDTO();

            FinalDTO.PsdId = UniqueID.ToString();
           
           
            var collection = database.GetCollection<PsdDTO>(_settings.CollectionName);
            var document = Newtonsoft.Json.JsonConvert.SerializeObject(PSDData);

            FinalDTO.PsdData = document;
            try
            {
                dynamic psdFirst = (Newtonsoft.Json.Linq.JContainer)((Newtonsoft.Json.Linq.JContainer)PSDData).First;
                Newtonsoft.Json.Linq.JToken jsonToken;
                bool psdName = ((Newtonsoft.Json.Linq.JObject)psdFirst).TryGetValue("PsdName",out  jsonToken);
                if(psdName)
                {
                    FinalDTO.PsdName = jsonToken.ToString();
                }
            }
            catch (Exception ex)
            {

                
            }
//var ress = 1;
           // FinalDTO.PsdName = PSDData.FirstOrDefault()[;

            var data = collection.InsertOneAsync(FinalDTO);
            return data.ToJson();
        }

        public async Task<IEnumerable<TreeMasterDTO>> GetAllMaster(string sMasterlist)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var Mastercollection = database.GetCollection<TreeMasterDTO>("Master");

            IEnumerable<TreeMasterDTO> treeDTOs = new List<TreeMasterDTO>();
            if (sMasterlist == null)
            {
                treeDTOs =await Mastercollection.Find(Builders<TreeMasterDTO>.Filter.Empty).ToListAsync();
            }
            else {
                treeDTOs =await  Mastercollection.Find<TreeMasterDTO>(tree => tree.mType == sMasterlist).ToListAsync();
            }
            return treeDTOs;
        }

        public async Task<IEnumerable> SaveAttribute (AttributeDTO AttributeData)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);

            var collection = database.GetCollection<AttributeDTO>("Attributes");
           var data = collection.InsertOneAsync(AttributeData).ToJson();
           return data;
        }

       
        public async Task<List<AttributeDTO>> GetAttribute()
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<AttributeDTO>("Attributes");
            var data =await collection.Find(tree => true).ToListAsync();
            //var data = await collection.Find(new AttributeDTO()).ToListAsync();
            return data;
        }

        public async Task<IEnumerable> SaveEntity(EntitiesDTO entities)
        {
           
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);

            var collection = database.GetCollection<EntitiesDTO>("Entities");

            List<AttributeTagDTO> tag = await GetAllAttributeTag();
            try
            {
                var count = 0;
                foreach (var i in entities.AttruibuteList)
                {
                    var tagval = tag.Find(x => x.Type == entities.AttruibuteList[count].DisplayType).Value;
                    var tagLen = tagval.Length;
                    string text = " labelText=" + '"' + entities.AttruibuteList[count].DisplayName + '"' + " ";
                    string result = tagval.Insert(tagLen - 2, text);
                    entities.AttruibuteList[count].Tag = result;
                    count++;
                }
            }
            catch(Exception e)
            {

            }
            var document = Newtonsoft.Json.JsonConvert.SerializeObject(entities);
            var data = collection.InsertOneAsync(entities);
            return data.ToJson();
        }

        public async Task<IEnumerable> SaveAttributeTag(AttributeTagDTO Tags)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);

            var collection = database.GetCollection<AttributeTagDTO>("AttributeTags");
           // var document = Newtonsoft.Json.JsonConvert.SerializeObject(Tags);
            var data = collection.InsertOneAsync(Tags).ToJson();
            return data;
        }

        public IEnumerable<AttributeTagDTO> GetAttributeTag(string AttType)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var Attributecollection = database.GetCollection<AttributeTagDTO>("AttributeTags");

            IEnumerable<AttributeTagDTO> tagDTOs = new List<AttributeTagDTO>();
            tagDTOs = Attributecollection.Find<AttributeTagDTO>(tree => tree.Type == AttType).ToList();
            return tagDTOs;
        }


        public async Task<object> FetchEntites(EntityIDDTO EntityIDS)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<EntitiesDTO>("Entities");

            if (EntityIDS.GetMaster == true)
            {
                var Entdata = await collection.Find(x => true).Project(u => new { u.Id, u.Name, u.Type }).ToListAsync();
                return Entdata;
            }
            else
            {
                CustomPageDTO FinalPageData = new CustomPageDTO();

                if (EntityIDS.StructuredId != null && EntityIDS.UnStructuredLstId != null)
                {

                    // var Master = await collection.Find<EntitiesDTO>(x => x.Id == EntityIDS.StructuredId).Project(u => new { u.AttruibuteList }).ToListAsync();

                    var Master = await collection.Find<EntitiesDTO>(x => true).ToListAsync();

                    var StructuredData = Master.SingleOrDefault(x => x.Id == EntityIDS.StructuredId).AttruibuteList;

                    DataDTO Strdata = new DataDTO();
                    Strdata.Id = EntityIDS.StructuredId;

                    foreach (var item in StructuredData)
                    {
                        CustomDataDTO pageData = new CustomDataDTO();
                        pageData.Type = item.DisplayType;
                        pageData.LabelText = item.DisplayName;

                        Strdata.Data.Add(pageData);
                    }
                    FinalPageData.StructuredData = Strdata;


                    foreach (var item in EntityIDS.UnStructuredLstId)
                    {
                        var UnStructuredData = Master.SingleOrDefault(x => x.Id == item).AttruibuteList;

                        DataDTO Undata = new DataDTO();
                        Undata.Id = item;

                        foreach (var Attr in UnStructuredData)
                        {
                            CustomDataDTO pageData = new CustomDataDTO();
                            pageData.Type = Attr.DisplayType;
                            pageData.LabelText = Attr.DisplayName;

                            Undata.Data.Add(pageData);

                        }

                        FinalPageData.UnStructuredData.Add(Undata);

                    }

                                       
                }
                return FinalPageData;

            }

        }
        public async Task<List<AttributeTagDTO>> GetAllAttributeTag()
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var Attributecollection = database.GetCollection<AttributeTagDTO>("AttributeTags");


            var tagDTOs = await Attributecollection.Find(tree => true).ToListAsync();
            return tagDTOs;

        }
        public async Task<IEnumerable<PsdDTO>> GetPSD(string PsdName)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<PsdDTO>("PSD");
           // var data = await collection.Find<PsdDTO>(x=> x.PsdName == PsdName).ToListAsync();
           
            //IEnumerable<PsdDTO> data = new List<PsdDTO>();
            
            if (PsdName == null)
            {
               var data = await collection.Find(Builders<PsdDTO>.Filter.Empty).ToListAsync();
                foreach (var item in data)
                {
                    var DeseriablePSDData = Newtonsoft.Json.JsonConvert.DeserializeObject(item.PsdData.ToString());

                    item.PsdData = DeseriablePSDData;
                }
                return data;
            }
            else
            {
              var  data = await collection.Find<PsdDTO>(tree => tree.PsdName == PsdName).ToListAsync();
                var DeseriablePSDData = Newtonsoft.Json.JsonConvert.DeserializeObject(data[0].PsdData.ToString());

                data[0].PsdData = DeseriablePSDData;
                return data;
            }

        }
       
        public IEnumerable<AttributeDTO> GetAttributeByName(string AttName)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var Attributecollection = database.GetCollection<AttributeDTO>("Attributes");

            IEnumerable<AttributeDTO> tagDTOs = new List<AttributeDTO>();
            tagDTOs = Attributecollection.Find<AttributeDTO>(tree => tree.Name == AttName).ToList();
            return tagDTOs;
        }

        public IEnumerable<EntitiesDTO> GetEntityByName(string EntName)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var Attributecollection = database.GetCollection<EntitiesDTO>("Entities");

            IEnumerable<EntitiesDTO> tagDTOs = new List<EntitiesDTO>();
            tagDTOs = Attributecollection.Find<EntitiesDTO>(tree => tree.Name == EntName).ToList();
            return tagDTOs;
        }

        public void UpdateAttribute(string name, AttributeDTO Attributelist)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<AttributeDTO>("Attributes");
            collection.ReplaceOne(tree => tree.Name == name, Attributelist);

        }

        public void UpdateEntity(string name, EntitiesDTO Entitylist)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var collection = database.GetCollection<EntitiesDTO>("Entities");
            collection.ReplaceOne(tree => tree.Name == name, Entitylist);

        }


        public async Task<IEnumerable<TreeMasterDTO>> GetAllCommonMaster(string sMasterlist)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var Mastercollection = database.GetCollection<TreeMasterDTO1>("CommonMasters");
           
            TreeMasterDTO treeDTOs = new TreeMasterDTO();
            
            List<TreeMasterDTO1> treeMasterDTO = new List<TreeMasterDTO1>();

            treeMasterDTO = await Mastercollection.Find(x => true).ToListAsync();
           
            List<TreeMasterDTO> treeDTOsL = new List<TreeMasterDTO>();
            List<TreeMasterDTO> treeDTOsL1 = new List<TreeMasterDTO>();

            foreach (var item in treeMasterDTO)
                {
                treeDTOs = new TreeMasterDTO();
                treeDTOs.mID = item.CommonTypeID;

                treeDTOs.mType = item.MasterType;

                treeDTOs.mValue = item.Value;
               
                treeDTOsL1.Add(treeDTOs);

            }
               
                return treeDTOsL1;
        }


        public async Task<List<TreeMasterDTO>> GetValueMapping()
        {

            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            var Attributecollection = database.GetCollection<TreeMasterDTO1>("CommonMasters");

            List<TreeMasterDTO1> tagDTOs = new List<TreeMasterDTO1>();
            tagDTOs = await Attributecollection.Find(tree => true).ToListAsync();

            TreeMasterDTO treeDTOs = new TreeMasterDTO();
            List<TreeMasterDTO> treeDTOsL1 = new List<TreeMasterDTO>();
            foreach (var item in tagDTOs)
            {
                treeDTOs = new TreeMasterDTO();
                treeDTOs.mID = item.MasterType;

                treeDTOs.mValue = item.MasterType;
                treeDTOsL1.Add(treeDTOs);

            }
            //IEnumerable<TreeMasterDTO> TreeLIst = treeDTOsL1.Distinct();
            //treeDTOsL1 = TreeLIst.ToList();
            //treeDTOsL1.Distinct();
            // treeDTOsL1.GroupBy(x => x.mID).Select(group => group.First());
            // var distinctList = treeDTOsL1.DistinctBy().ToList();

            IEnumerable<TreeMasterDTO> treeDTOsL2 = treeDTOsL1.GroupBy(x => x.mID).Select(o => o.FirstOrDefault());
            treeDTOsL1 = treeDTOsL2.ToList();
            return treeDTOsL1;
        }
    }
}

