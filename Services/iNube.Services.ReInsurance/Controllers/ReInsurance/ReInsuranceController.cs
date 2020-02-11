﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using iNube.Services.ReInsurance.Controllers.ReInsurance.IntegrationServices;
using iNube.Services.ReInsurance.Controllers.ReInsurance.ReInsuranceService;
using iNube.Services.ReInsurance.Helpers;
using iNube.Services.ReInsurance.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace iNube.Services.ReInsurance.Controllers.ReInsurance
{
    //[Route("api/[controller]")]
    //[ApiController]
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ReInsuranceController : BaseApiController
    {
        public IReInsuranceService _reInsuranceService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
      //  private IIntegrationService _integrationService;


        public ReInsuranceController(
            IReInsuranceService reInsuranceService,
            IMapper mapper,
            
            IOptions<AppSettings> appSettings)
        {
            _reInsuranceService = reInsuranceService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            //_integrationService = integrationService;
        }


        [AllowAnonymous]

        [HttpGet]

        public IActionResult MastertypeData()

        {
            var isFilter = true;
            var response = _reInsuranceService.MastertypeData();
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }


        //RetentionGroupMaster for RI Screen

        [AllowAnonymous]

        [HttpGet]

        public IActionResult RetentionGroup()

        {
            var isFilter = true;
            var response = _reInsuranceService.RetentionGroup();
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }


        //TreatyCode
        [AllowAnonymous]

        [HttpGet]

        public IActionResult TreatyName()

        {
            var isFilter = true;
            var response = _reInsuranceService.TreatyName();
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }


        //TratyCode
        [AllowAnonymous]

        [HttpGet]

        public IActionResult TreatyCode(decimal treatyId)

        {
            var isFilter = true;
            var response = _reInsuranceService.TreatyCode(treatyId);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }



        //  AddParticipant in Treaty Screen
        //TratyCode
        [AllowAnonymous]

        [HttpGet]
        public IActionResult Reinsurer()

        {
            var isFilter = true;
            var response = _reInsuranceService.Reinsurer();
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }
        //In Add Participnat master data for broker
        //TratyCode
        [AllowAnonymous]

        [HttpGet]
        public IActionResult Broker()

        {
            var isFilter = true;
            var response = _reInsuranceService.Broker();
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }


        //public IActionResult Broker()

        //{
        //    var isFilter = true;
        //    var response = _reInsuranceService.RetentionGroup();
        //    if (isFilter)
        //    {
        //        var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
        //        return Ok(masterdata);
        //    }

        //    return Ok(response);
        //}
        //Get master data of Product

        //[AllowAnonymous]

        //[HttpGet]

        //public async Task<IActionResult> GetProductMasterAsync()

        //{
        //    var isFilter = true;
        //    var response = await _integrationService.GetProductMasterAsync(Context);
        //    if (isFilter)
        //    {
        //        var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
        //        return Ok(masterdata);
        //    }

        //    return Ok(response);
        //}


        //GetmasterYear data

        [AllowAnonymous]

        [HttpGet]

        public IActionResult MasterYearData()

        {
            var isFilter = true;
            var response = _reInsuranceService.MasterYearData();
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }

        // GET loction
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetLocation(string locationType, int parentID)
        {
            var locationData = await _reInsuranceService.GetLocation(locationType, parentID);
            return Ok(locationData);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SaveParticipentData([FromBody] TblParticipantMasterDto participantMasterDto)
        {


           
                // save 
               var response= await _reInsuranceService.SaveParticipentData(participantMasterDto);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }


        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SearchParticipant(TblParticipantMasterDto tblParticipantMasterDto)
        {
            var search = await _reInsuranceService.SearchParticipant(tblParticipantMasterDto);
            return Ok(search);
        }
        [AllowAnonymous]
        [HttpDelete]
        public async Task<IActionResult> DeleteParticipant(decimal participantMasterId)
        {
           var response= await _reInsuranceService.DeleteParticipant(participantMasterId);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }
        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> ModifyParticipant(decimal ParticipantMasterId, TblParticipantMasterDto tblParticipantMasterDto)
        {
            tblParticipantMasterDto.ParticipantMasterId = ParticipantMasterId;
            await _reInsuranceService.ModifyParticipant(tblParticipantMasterDto);
            return Ok();
        }

        //get participant by ID

     

        //Retention Controller
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SaveRetentionData(TblRetentionGroupDto tblRetentionGroupDto)
        {


            
                // save 
            var response= await _reInsuranceService.SaveRetentionData(tblRetentionGroupDto);

            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }


        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SearchRetention(TblRetentionGroupDto tblRetentionGroupDto)
        {
            var search = await _reInsuranceService.SearchRetention(tblRetentionGroupDto);
            return Ok(search);
        }
        //Delete Retention

        [AllowAnonymous]
        [HttpDelete]
        public async Task<IActionResult> DeleteRetention(decimal retentionGroupId)
        {
           var response=await _reInsuranceService.DeleteRetention(retentionGroupId);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        //ModifyRetention

        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> ModifyfRetention(decimal retentionGID, TblRetentionGroupDto tblRetentionGroupDto)
        {
            tblRetentionGroupDto.RetentionGroupId = retentionGID;
            await _reInsuranceService.ModifyfRetention(tblRetentionGroupDto);
            return Ok();
        }

        //Treaty 
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SaveTreatyData([FromBody]TblTreatyDto tblTreatyDto)
        {
            
                // save 
            var response= await _reInsuranceService.SaveTreatyData(tblTreatyDto);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }


        }

        //search Treaty
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SearchTreaty(TblTreatyDto tblTreatyDto)
        {
            var search = await _reInsuranceService.SearchTreaty(tblTreatyDto);
            return Ok(search);
        }
        //delete trety
        [AllowAnonymous]
        [HttpDelete]
        public async Task<IActionResult> DeleteTeaty(decimal tratyId)
        {
           var response= await _reInsuranceService.DeleteTeaty(tratyId);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        //ModifyTreaty 

        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> ModifyfTraty(decimal treatyId, TblTreatyDto tblTreatyDto)
        {
            tblTreatyDto.TreatyId = treatyId;
            await _reInsuranceService.ModifyfTraty(tblTreatyDto);
            return Ok();
        }


        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> ModifyRImapping(decimal rimappingId, TblRimappingDto tblTreatyDto)
        {
            tblTreatyDto.RimappingId = rimappingId;
            await _reInsuranceService.ModifyRImapping(tblTreatyDto);
            return Ok();
        }

        //AddTreatyParticipant(TblParticipantDto tblParticipantDto)

        [AllowAnonymous]
        [HttpPost]
        public IActionResult AddTreatyParticipant(TblParticipantDto tblParticipantDto)
        {


            try
            {
                // save 
                _reInsuranceService.AddTreatyParticipant(tblParticipantDto);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //RI mapping

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SaveRIMapping(TblRimappingDto tblRimappingDto)
        {

            var response = await _reInsuranceService.SaveRIMapping(tblRimappingDto);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }



        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetDescriptionRIGrid(decimal treatyid)
        {
            var accountCoaMappingDtos = await _reInsuranceService.GetDescriptionRIGrid(treatyid,Context);
            return Ok(accountCoaMappingDtos);
        }

        //Participnat Name for the Add participant
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetName(decimal participantMasterId)
        {
            var accountCoaMappingDtos = await _reInsuranceService.GetName(participantMasterId, Context);
            return Ok(accountCoaMappingDtos);
        }

        [AllowAnonymous]

        [HttpGet]

        public IActionResult GetBrachCode(decimal participantMasterId)

        {
            var isFilter = true;
            var response = _reInsuranceService.GetBrachCode(participantMasterId);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }

        //getTreatyType

        //[AllowAnonymous]
        //[HttpGet]
        //public async Task<IActionResult> GetTreatyTypeRIGrid(string treatycode)
        //{
        //    var accountCoaMappingDtos = await _reInsuranceService.GetDescriptionRIGrid(treatycode, Context);
        //    return Ok(accountCoaMappingDtos);
        //}

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SearchRImapping(TblRimappingDto tblRimappingDto)
        {
            var search = await _reInsuranceService.SearchRImapping(tblRimappingDto);
            return Ok(search);
        }

        [AllowAnonymous]
        [HttpDelete]
        public async Task<IActionResult> DeleteRiMapping(decimal RimappingId)
        {
           var response=await _reInsuranceService.DeleteRiMapping(RimappingId);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        //get by for modification
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetRetentionGroupById(decimal retentionGroupId)
        {
            var response = await _reInsuranceService.GetRetentionGroupById(retentionGroupId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetTreatyById(decimal treatyId)
        {
            var response = await _reInsuranceService.GetTreatyById(treatyId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetParticipantBYId(decimal participantmasterID)
        {
            var response = await _reInsuranceService.GetParticipantBYId(participantmasterID, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetRImappingBYId(decimal RImappingById)
        {
            var response = await _reInsuranceService.GetRImappingBYId(RImappingById, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }


    }
}