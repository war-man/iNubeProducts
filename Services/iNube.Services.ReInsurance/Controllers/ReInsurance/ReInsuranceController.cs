using System;
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


       

        [HttpGet]

        public async Task<IActionResult> MastertypeData()

        {
            var isFilter = true;
            var response =await  _reInsuranceService.MastertypeData(Context);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }


        //RetentionGroupMaster for RI Screen

       

        [HttpGet]

        public async Task<IActionResult> RetentionGroup()

        {
            var isFilter = true;
            var response =await _reInsuranceService.RetentionGroup(Context);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }


        //TreatyCode
       

        [HttpGet]

        public async Task<IActionResult> TreatyName()

        {
            var isFilter = true;
            var response =await  _reInsuranceService.TreatyName(Context);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }


        //TratyCode
     

        [HttpGet]

        public async Task<IActionResult> TreatyCode(decimal treatyId)

        {
            var isFilter = true;
            var response =await _reInsuranceService.TreatyCode(treatyId,Context);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }



        //  AddParticipant in Treaty Screen
        //TratyCode
        

        [HttpGet]
        public async Task<IActionResult> Reinsurer()

        {
            var isFilter = true;
            var response = await _reInsuranceService.Reinsurer(Context);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }
        //In Add Participnat master data for broker
        //TratyCode
       

        [HttpGet]
        public async Task<IActionResult> Broker()

        {
            var isFilter = true;
            var response = await _reInsuranceService.Broker(Context);
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

       

        [HttpGet]

        public async Task<IActionResult> MasterYearData()

        {
            var isFilter = true;
            var response = await _reInsuranceService.MasterYearData(Context);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }

        // GET loction
       
        [HttpGet]
        public async Task<IActionResult> GetLocation(string locationType, int parentID)
        {
            var locationData = await _reInsuranceService.GetLocation(locationType, parentID,Context);
            return Ok(locationData);
        }

       
        [HttpPost]
        public async Task<IActionResult> SaveParticipentData([FromBody] TblParticipantMasterDto participantMasterDto)
        {


           
                // save 
               var response= await _reInsuranceService.SaveParticipentData(participantMasterDto,Context);
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

       
        [HttpPost]
        public async Task<IActionResult> SearchParticipant(TblParticipantMasterDto tblParticipantMasterDto)
        {
            var search = await _reInsuranceService.SearchParticipant(tblParticipantMasterDto,Context);
            return Ok(search);
        }
       
        [HttpDelete]
        public async Task<IActionResult> DeleteParticipant(decimal participantMasterId)
        {
           var response= await _reInsuranceService.DeleteParticipant(participantMasterId,Context);
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
       
        [HttpPut]
        public async Task<IActionResult> ModifyParticipant(decimal ParticipantMasterId, TblParticipantMasterDto tblParticipantMasterDto)
        {
            tblParticipantMasterDto.ParticipantMasterId = ParticipantMasterId;
           var res=await _reInsuranceService.ModifyParticipant(tblParticipantMasterDto,Context);
            return Ok(res);
        }

        //get participant by ID

     

        //Retention Controller
        
        [HttpPost]
        public async Task<IActionResult> SaveRetentionData(TblRetentionGroupDto tblRetentionGroupDto)
        {


            
                // save 
            var response= await _reInsuranceService.SaveRetentionData(tblRetentionGroupDto,Context);

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

       
        [HttpPost]
        public async Task<IActionResult> SearchRetention(TblRetentionGroupDto tblRetentionGroupDto)
        {
            var search = await _reInsuranceService.SearchRetention(tblRetentionGroupDto,Context);
            return Ok(search);
        }
        //Delete Retention

        
        [HttpDelete]
        public async Task<IActionResult> DeleteRetention(decimal retentionGroupId)
        {
           var response=await _reInsuranceService.DeleteRetention(retentionGroupId,Context);
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

       
        [HttpPut]
        public async Task<IActionResult> ModifyfRetention(decimal retentionGID, TblRetentionGroupDto tblRetentionGroupDto)
        {
            tblRetentionGroupDto.RetentionGroupId = retentionGID;
            var res=await _reInsuranceService.ModifyfRetention(tblRetentionGroupDto,Context);
            return Ok(res);
        }

        //Treaty 
       
        [HttpPost]
        public async Task<IActionResult> SaveTreatyData([FromBody]TblTreatyDto tblTreatyDto)
        {
            
                // save 
            var response= await _reInsuranceService.SaveTreatyData(tblTreatyDto,Context);
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
       
        [HttpPost]
        public async Task<IActionResult> SearchTreaty(TblTreatyDto tblTreatyDto)
        {
            var search = await _reInsuranceService.SearchTreaty(tblTreatyDto,Context);
            return Ok(search);
        }
        //delete trety
      
        [HttpDelete]
        public async Task<IActionResult> DeleteTeaty(decimal tratyId)
        {
           var response= await _reInsuranceService.DeleteTeaty(tratyId,Context);
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

      
        [HttpPut]
        public async Task<IActionResult> ModifyfTraty(decimal treatyId, TblTreatyDto tblTreatyDto)
        {
            tblTreatyDto.TreatyId = treatyId;
           var res= await _reInsuranceService.ModifyfTraty(tblTreatyDto,Context);
            return Ok(res);
        }


       
        [HttpPut]
        public async Task<IActionResult> ModifyRImapping(decimal rimappingId, TblRimappingDto tblTreatyDto)
        {
            tblTreatyDto.RimappingId = rimappingId;
           var res= await _reInsuranceService.ModifyRImapping(tblTreatyDto,Context);
            return Ok(res);
        }

        //AddTreatyParticipant(TblParticipantDto tblParticipantDto)

       
        [HttpPost]
        public async Task<IActionResult>  AddTreatyParticipant(TblParticipantDto tblParticipantDto)
        {


            try
            {
                // save 
                _reInsuranceService.AddTreatyParticipant(tblParticipantDto,Context);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //RI mapping

       
        [HttpPost]
        public async Task<IActionResult> SaveRIMapping(TblRimappingDto1 tblRimappingDto)
        {

            var response = await _reInsuranceService.SaveRIMapping(tblRimappingDto,Context);
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

       

        [HttpGet]

        public async Task<IActionResult> GetBrachCode(decimal participantMasterId)

        {
            var isFilter = true;
            var response = await _reInsuranceService.GetBrachCode(participantMasterId,Context);
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

       
        [HttpPost]
        public async Task<IActionResult> SearchRImapping(TblRimappingDto tblRimappingDto)
        {
            var search = await _reInsuranceService.SearchRImapping(tblRimappingDto,Context);
            return Ok(search);
        }

       
        [HttpDelete]
        public async Task<IActionResult> DeleteRiMapping(decimal RimappingId)
        {
           var response=await _reInsuranceService.DeleteRiMapping(RimappingId,Context);
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
        [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllocationByPolicyNo(string PolicyNo)
        {
            var response = await _reInsuranceService.GetAllocationByPolicyNo(PolicyNo, Context);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> ModifyReAllocation(decimal MappingId, RiallocationDto riallocationDto)
        {
            riallocationDto.MappingId = Convert.ToInt32(MappingId);
            await _reInsuranceService.ModifyReAllocation(riallocationDto, Context);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Calulationddata(CalulationDto calulationDto)
        {
            var search = await _reInsuranceService.Calulationddata(calulationDto, Context);
            return Ok(search);
        }

        [HttpGet]
        public async Task<IActionResult> GetParticipantNameByCode(string participantcode)
        {
            var response = await _reInsuranceService.GetParticipantNameByCode(participantcode, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> RIValidations(string codeName,string type)
        {
            var response = await _reInsuranceService.TreatyCodeAndGroupValidation(codeName, type, Context);
            return Ok(response);
           
        }


        //GetGridData of GridMapping By TreatyGroupId

        [HttpGet]
        public async Task<IActionResult> mappingGridByTGId(int RiMappingId)
        {
            var response = await _reInsuranceService.mappingGridByTGId(RiMappingId, Context);
            return Ok(response);

        }

    }
}