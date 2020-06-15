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
using System.Collections.Generic;
using System.Data;
using iNube.Services.DynamicGraph.model;

namespace iNube.Services.Policy.Controllers.DynamicGraph
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GraphController : BaseApiController
    {
        public IGraphService _graphService;

        public GraphController(IGraphService graphService)
        {
            _graphService = graphService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMaster(string lMasterlist, bool isFilter = true)
        {
            var commonTypesDTOs = await _graphService.GetMaster(lMasterlist, Context);

            if (isFilter)
            {
                var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }
            return Ok(commonTypesDTOs);

        }

        [HttpPost]
        public async Task<IActionResult> SaveConfigParameters([FromBody]DashboardConfigDTO dashboardConfigDTO)
        {
            var response = await _graphService.SaveConfigParameters(dashboardConfigDTO, Context);
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
        public async Task<IActionResult> GetDashboardConfigName(string lMasterlist, bool isFilter = true)
        {
            var objectval = await _graphService.GetGraphConfigName(lMasterlist, Context);
            return Ok(objectval);
        }

        [HttpGet]
        public async Task<IActionResult> GetParameters(int ReportConfigId)
        {
            var eventDetails = await _graphService.GetParameters(ReportConfigId, Context);
            return Ok(eventDetails);
        }

        [HttpGet]
        public async Task<IActionResult> GetQueryById(int ReportConfigId)
        {
            var Qdetails = await _graphService.GetQueryById(ReportConfigId, Context);
            return Ok(Qdetails);
        }

        [HttpPost]
        public async Task<IActionResult> QueryExecution([FromBody]QueryDTOs queryDTO)
        {
            //List<Params> ParamList = new List<Params>() ;
            //Params p1 = new Params() { ParameterName = "ClaimId", ParameterValue = "335" };
            //ParamList.Add(p1);
            //p1 = new Params() { ParameterName = "Name", ParameterValue = "Ashish" };
            //ParamList.Add(p1);
            var query = await _graphService.QueryExecution(queryDTO, Context);
            return Ok(query);
        }

        [HttpGet]
        public async Task<IActionResult> GetReportNameForPermissions()
        {
            var objectval = await _graphService.GetGraphNameForPermissions(Context);
            return Ok(objectval);
        }

        [HttpGet]
        public async Task<IActionResult> GetParameterDetails(int ReportConfigId)
        {
            var eventDetails = await _graphService.GetParameterDetails(ReportConfigId, Context);
            return Ok(eventDetails);
        }

        [HttpDelete]
        public IActionResult DeleteParameter(int ReportConfigParamId)
        {
            _graphService.DeleteParameter(ReportConfigParamId, Context);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGraph(int ReportConfigId, DashboardConfigDTO reportConfigDTO)
        {
            reportConfigDTO.DashboardConfigId = ReportConfigId;
            await _graphService.UpdateDashboard(reportConfigDTO, Context);
            return Ok();

        }
    }
}
