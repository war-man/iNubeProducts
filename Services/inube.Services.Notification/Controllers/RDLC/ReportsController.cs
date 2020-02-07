using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using inube.Services.Notification.Controllers.RDLC.RdlcService;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace inube.Services.Notification.Controllers.RDLC
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RdlcController : BaseApiController
    {
        public IReportsService _reportService;
        public RdlcController(IReportsService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public IActionResult ReportForCoveringLetter(string PolicyNo)
        {
            var response = _reportService.ReportForCoveringLetter(PolicyNo);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult ReportForAVOGIReport(string PolicyNo, string CoverNoteNo)
        {
            var response = _reportService.ReportForAVOGIReport(PolicyNo, CoverNoteNo);
            return Ok(response);
        }
    }
}