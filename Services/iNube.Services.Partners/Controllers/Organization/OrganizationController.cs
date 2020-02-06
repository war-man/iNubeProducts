using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using iNube.Services.Partners.Models;
using iNube.Services.Partners.Controllers.Organization.OrganizationService;
using AutoMapper;
using iNube.Services.Partners.Helpers;
using Microsoft.Extensions.Options;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework;

namespace iNube.Services.Partners.Controllers.Organization
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrganizationController : BaseApiController
    {
        public IOrganizationService _orgService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public OrganizationController(
          IOrganizationService orgService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _orgService = orgService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        // POST: api/Partner/CreateOrganization
        [HttpPost]
        public async Task<IActionResult> CreateOrganizationAsync([FromBody] OrganizationDTO orgDTO)
        {
            try
            {
                var response = await _orgService.CreateOrganizationAsync(orgDTO,Context);
                switch (response.Status)
                {
                    case BusinessStatus.InputValidationFailed:
                        return Ok(response);
                    case BusinessStatus.Created:
                        return Ok(response);
                    case BusinessStatus.UnAuthorized:
                        return Unauthorized();
                    case BusinessStatus.PreConditionFailed:
                        return Ok(response);
                    default:
                        return Forbid();
                }
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
            //return Ok(org);
        }

        // PUT: api/Partner/ModifyOrganization
        [HttpPut]
        public async Task<IActionResult> ModifyOrganization(int OrganizationID, OrganizationDTO OrgDTO)
        {
            return Ok();
        }

        // DELETE: api/Partner/DeleteOrganization
        [HttpDelete]
        public async Task<IActionResult> DeleteOrganization(int OrganizationID)
        {
            return Ok();
        }

        // GET: api/Organization
        [HttpGet]
        public async Task<IActionResult> GetOrganization(int orgId)
        {
            var orgDTO =await _orgService.GetOrganization(orgId, Context);
            return Ok(orgDTO);
        }
        // POST: api/SearchOrg
        [HttpPost]
        public async Task<IActionResult> SearchOrg(OrgSearchDTO searchOrga)
        {
            var search =await _orgService.SearchOrganization(searchOrga, Context);
            return Ok(search);
        }

        [HttpGet]
        public async Task<IActionResult> SearchOrgById(int searchOrga)
        {
            var search =await _orgService.SearchOrganizationById(searchOrga, Context);
            return Ok(search);
        }

        // GET: api/Product/GetMasterData
        [HttpGet]
        public async Task<IActionResult> GetMasterData(string sMasterlist)
        {
            var commonTypesDTOs =await _orgService.GetMaster(sMasterlist, Context);
            var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            return Ok(masterdata);
        }

        // GET: api/Product/GetDepMasterData
        [HttpGet]
        public IActionResult GetDepMasterData(string sMasterType, int parentID)
        {
            // var commonTypesDTOs = _productService.GetMaster(sMasterlist);
            var masterdata = ""; // commonTypesDTOs.GroupBy(c => new { c.MasterType }).Select(mdata => new { mdata.Key.MasterType, mdata, });
            return Ok(masterdata);

        }

        // GET: api/Product/GetLocation
        [HttpGet]
        public async Task<IActionResult> GetLocation(string locationType, int parentID)
        {
            var locationData =await _orgService.GetLocation(locationType, parentID, Context);
            return Ok(locationData);
        }

        [HttpGet]
        public async Task<IActionResult> GetOrgByParentId(int orgid)
        {
            var response =await _orgService.GetOrgByParentId(orgid, Context);
            return Ok(response);
        }
    }
}
