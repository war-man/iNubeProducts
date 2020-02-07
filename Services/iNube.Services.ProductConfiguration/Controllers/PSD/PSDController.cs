using iNube.Services.ProductConfiguration.Controllers.PSD.PSD_Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static iNube.Services.ProductConfiguration.Models.PSDModels;

namespace iNube.Services.ProductConfiguration.Controllers.PSD
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PSDController : ControllerBase
    {
        public IPSDService _psdService;

        public PSDController(IPSDService psdService)
        {
            _psdService = psdService;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetTreeMasterData()
        //{
        //    var commonTypesDTOs = await _dMService.GetTreeMasterData();
        //   // var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
        //    return Ok(commonTypesDTOs);
        //}


        [HttpGet]
        public IActionResult GetTreeMasterData()
        {
            var Data = _psdService.GetTreeMasterData();
            return Ok(Data);
        }


        [HttpGet]
        public async Task<IActionResult> GetSavedData()
        {
            var Data = await _psdService.GetSavedData();
            return Ok(Data);
        }

        [HttpGet("{id:length(24)}", Name = "GetBook")]
        public IActionResult GetTreeMasterDataById(string id)
        {
            var DataById = _psdService.GetTreeMasterDataById(id);
            return Ok(DataById);
        }


        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, TreeMasterDTO treeMaster)
        {
            var updateData = _psdService.GetTreeMasterDataById(id);

            if (updateData == null)
            {
                return NotFound();
            }

            _psdService.Update(id, treeMaster);

            return NoContent();
        }

        //public IActionResult Create(TreeMasterDTO treeMasterDTO)
        //{
        //    _dMService.Create(treeMasterDTO);

        //    return CreatedAtRoute("GetBook", new { id = treeMasterDTO.Id.ToString() }, treeMasterDTO);
        //}

        [HttpGet]
        public async Task<IActionResult> GetMasterData(string sMasterlist)
        {
            var commonTypesDTOs = _psdService.GetMaster(sMasterlist);
            // var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            var MasterData = commonTypesDTOs.Select(x => new TreeMasterDTO
            {
                mID = x.mID,
                mValue = x.mValue,
                mType = x.mType,
                mIsRequired = x.mIsRequired

            }).ToList();
            return Ok(MasterData);

        }

        [HttpPost]
        public async Task<IActionResult> Save(dynamic PSDData)
        {

            var data =_psdService.Save(PSDData);
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMaster(string sMasterlist, bool isFilter = true)
        {
           // var commonTypesDTOs = await _psdService.GetAllMaster(sMasterlist);
            var commonTypesDTOs = await _psdService.GetAllCommonMaster(sMasterlist); 
            if (isFilter)
            {
                var masterData=commonTypesDTOs.GroupBy(c=>new { c.mType}).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterData);
            }
            return Ok(commonTypesDTOs);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAttribute(AttributeDTO AttributeData)
        {

            var attributedata =await _psdService.SaveAttribute(AttributeData);
            return Ok(attributedata);
        }
        [HttpGet]
        public async Task<IActionResult> GetAttribute()
        {

            var Attribute =await _psdService.GetAttribute();
            return Ok(Attribute);
        }

        [HttpPost]
        public async Task<IActionResult> SaveEntity(EntitiesDTO entities)
        {

           var entitydata = await _psdService.SaveEntity(entities);
            return Ok(entitydata);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAttributeTag(AttributeTagDTO entities)
        {

            var entitydata = await _psdService.SaveAttributeTag(entities);
            return Ok(entitydata);
        }

        [HttpGet]
        public IActionResult GetAttributeTag(string AttType)
        {

            var tagdata = _psdService.GetAttributeTag(AttType);
            return Ok(tagdata);
        }


        [HttpPost]
        public async Task<IActionResult> FetchEntities(EntityIDDTO EntittIDS)
        {
            var data = await _psdService.FetchEntites(EntittIDS);
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetPSDByPsdName(string PsdName)
        {

            var Attribute = await _psdService.GetPSD(PsdName);
            return Ok(Attribute);
        }
        [HttpGet]
        public IActionResult GetAttributeByName(string AttName)
        {

            var tagdata = _psdService.GetAttributeByName(AttName);
            return Ok(tagdata);
        }

        [HttpGet]
        public IActionResult GetEntityByName(string EntName)
        {

            var tagdata = _psdService.GetEntityByName(EntName);
            return Ok(tagdata);
        }

        [HttpPut]
        public IActionResult UpdateAttribute(AttributeDTO Attributelist)
        {
            var name = Attributelist.Name;
            var updateData = _psdService.GetAttributeByName(name);

            if (updateData == null)
            {
                return NotFound();
            }

            _psdService.UpdateAttribute(name, Attributelist);

            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateEntity(EntitiesDTO Entitylist)
        {
            var name = Entitylist.Name;
            var updateData = _psdService.GetEntityByName(name);

            if (updateData == null)
            {
                return NotFound();
            }

            _psdService.UpdateEntity(name, Entitylist);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetValueMapping()
        {

            var Attribute = await _psdService.GetValueMapping();
            return Ok(Attribute);
        }
    }
}

