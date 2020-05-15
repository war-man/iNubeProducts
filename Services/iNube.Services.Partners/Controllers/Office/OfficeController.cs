using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iNube.Services.Partners.Entities;
using AutoMapper;
using iNube.Services.Partners.Controllers.Office.OfficeService;
using iNube.Services.Partners.Helpers;
using Microsoft.Extensions.Options;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;

namespace iNube.Services.Partners.Controllers.Office
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class OfficeController : BaseApiController
    {
        public IOfficeService _officeService;
        private IMapper _mapper;
       
        private readonly AppSettings _appSettings;


        public OfficeController(IOfficeService officeService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _officeService = officeService;
            _mapper = mapper;
            _appSettings = appSettings.Value;


        }
        
        [HttpPost]
        public async Task<IActionResult> CreateOffice([FromBody]OrgOfficeDTO officeDTO)

        {
            var response = await _officeService.CreateOffice(officeDTO,Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.NotFound:
                    return Ok(response);
                case BusinessStatus.Ok:
                    return Ok(response);
                default:
                    return Forbid();
            }


           // return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> GetOffice(string OfficeCode)

        {
            AVOOrgOffice _OfficeDTOs =await _officeService.GetOffice(OfficeCode, Context);
            
            return Ok(_OfficeDTOs);
        }
        [HttpGet]
        public async Task<IActionResult> SearchOffice(string OfficeCode)

        {
            var _OfficeDTOs =await _officeService.SearchOfficeData(OfficeCode, Context);

            return Ok(_OfficeDTOs);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOffice()
        {
            var isFilter = true;
            var response = await _officeService.GetAllOfficeData(Context);
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }


        //[HttpGet]
        //public async Task<IActionResult> GetAllOffice()
        //{
        //    var _OfficeDTOs =await _officeService.GetAllOfficeData(Context);
        //    var masterdata = _OfficeDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
        //    return Ok(masterdata);
        //}

    }
}
