using System.Linq;
using Microsoft.AspNetCore.Mvc;
using iNube.Services.Policy.Models;
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
    }
}
