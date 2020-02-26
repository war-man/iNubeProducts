using System.Linq;
using Microsoft.AspNetCore.Mvc;
using iNube.Services.Policy.RPModels;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;
using System;

namespace iNube.Services.Policy.Controllers.DynamicReports
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ReportController : BaseApiController
    {
        public IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMaster(string lMasterlist, bool isFilter = true)
        {
            var commonTypesDTOs = await _reportService.GetMaster(lMasterlist, Context);

            if (isFilter)
            {
            var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            return Ok(masterdata);
            }
            return Ok(commonTypesDTOs);
         
        }

        [HttpPost]
        public async Task<IActionResult> SaveConfigParameters([FromBody]ReportConfigDTO reportConfigDTO)
        {
            var response = await _reportService.SaveConfigParameters(reportConfigDTO, Context);
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
        public async Task<IActionResult> GetReportConfigName(string lMasterlist, bool isFilter = true)
        {
            var objectval = await _reportService.GetReportConfigName(lMasterlist, Context);
            return Ok(objectval);
        }

        [HttpGet]
        public async Task<IActionResult> GetParameters(int ReportConfigId)
        {
            var eventDetails = await _reportService.GetParameters(ReportConfigId, Context);
            return Ok(eventDetails);
        }
    }
}
