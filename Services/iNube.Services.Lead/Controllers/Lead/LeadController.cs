﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using iNube.Services.Lead.Controllers.Lead.LeadService;
using iNube.Services.Lead.Models;
using iNube.Services.Lead.Helpers;
using Microsoft.Extensions.Options;
using AutoMapper;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Authorization;
using iNube.Utility.Framework.Model;
using iNube.Services.Quotation.Models;

namespace iNube.Services.Lead.Controllers.Lead
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class LeadController : BaseApiController
    {
        public ILeadService _leadService;

        public LeadController(ILeadService leadService)
        {
            _leadService = leadService;


        }
        [HttpGet]

        public async Task<IActionResult> ContactPool(String type)
        {
            var contact = await _leadService.ContactPoolAsync(type, Context);
            return Ok(contact);
        }


        //[HttpGet]

        //public IActionResult GetProspectPool()
        //{
        //    var prospect = _leadService.GetProspectPool(Context);
        //    return Ok(prospect);
        //}

        [HttpGet]
        public IActionResult GetLocation(string locationType, int parentID)
        {
            var locationData = _leadService.GetLocation(locationType, parentID, Context);
            return Ok(locationData);
        }




        [HttpPost]
        public IActionResult ModifySuspect([FromBody]LeadDTO leadDTO)
        {
            var response = _leadService.ModifySuspect(leadDTO, Context);


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
        public async Task<IActionResult> SuspectPool(int incStageId)
        {
            var suspects = await _leadService.SuspectPoolAsync(incStageId, Context);
            return Ok(suspects);
        }


        [HttpPost]
        public async Task<IActionResult> SaveSuspect([FromBody]LeadDTO leadDTO)
        {
            var response = await _leadService.SaveSuspectAsync(leadDTO, Context);
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
        public IActionResult LoadSuspectInformation(int ContactID)
        {
            var suspects = _leadService.LoadSuspectInformation(ContactID, Context,"");
            return Ok(suspects);

        }

        [HttpGet]
        public IActionResult GetMaster(string lMasterlist, bool isFilter = true)
        {
            var commonTypesDTOs = _leadService.GetMaster(lMasterlist);

            if (isFilter)
            {
                var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }
            return Ok(commonTypesDTOs);
        }


        //For proposal fetch
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetLifeQqData()
        {
            var lifeQqdataDTOs = _leadService.FetchLifeQqdata();
            return Ok(lifeQqdataDTOs);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GettblConatctsData()
        {
            var lifeQqdataDTOs = _leadService.FetchTblContactsdata();
            return Ok(lifeQqdataDTOs);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> ViewDetailsByPositionId(string Positionid)
        {
            var suspects = await _leadService.ViewDetailsByPositionIdAsync(Positionid, Context);
            return Ok(suspects);

        }

        [HttpPost]
        public async Task<IActionResult> UpdateEmpProspectData(EMPDistribute eMPDistribute)
        {
            var response = await _leadService.UpdateEmpProspectData(eMPDistribute, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateEmpSuspectData(EMPDistribute eMPDistribute)
        {
            var response = await _leadService.UpdateEmpSuspectData(eMPDistribute, Context);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetSuspectInformationByNicNo(string NicNo)
        {
            var suspects = _leadService.LoadSuspectInformation(0, Context, NicNo);
            return Ok(suspects);

        }
    }
}
