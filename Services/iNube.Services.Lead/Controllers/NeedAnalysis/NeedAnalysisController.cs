using iNube.Services.Lead.Models;
using iNube.Services.NeedAnalysis.Controllers.NeedAnalysis.NeedAnalysisServices;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.NeedAnalysis.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NeedAnalysisController : BaseApiController
    {
        public INeedAnalysisService _NeedAnalysisService;



        public NeedAnalysisController(INeedAnalysisService NeedAnalysisService)
        {
            _NeedAnalysisService = NeedAnalysisService;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetMaster(string lMasterlist, bool isFilter = true)
        //{

        //    var response = await _NeedAnalysisService.GetMaster(lMasterlist);

        //    return Ok(response);
        //}
        [HttpGet]
        public IActionResult GetMasterData(string lMasterlist, bool isFilter = true)
        {
            var commonTypesDTOs = _NeedAnalysisService.GetMasterData(lMasterlist);

            if (isFilter)
            {
                var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }
            return Ok(commonTypesDTOs);
        }
        [HttpGet]
        public IActionResult GetMaster(string lMasterlist, bool isFilter = true)
        {
            var commonTypesDTOs = _NeedAnalysisService.GetMaster(lMasterlist);

            if (isFilter)
            {
                var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }
            return Ok(commonTypesDTOs);
        }

        [HttpGet]
        public IActionResult GetProspectPool()
        {
            var PersonalInfo = _NeedAnalysisService.GetProspectPool(Context);
            return Ok(PersonalInfo);
        }

        [HttpGet]
        public IActionResult LoadPersonalInformation(int ContactID)
        {
            var PersonalInfo = _NeedAnalysisService.LoadPersonalInformation(ContactID);
            return Ok(PersonalInfo);
        }
        [HttpGet]
        public IActionResult GetCalcRetirement(int contactId)
        {
            var retirementInfo = _NeedAnalysisService.GetCalcRetirement(contactId);
            return Ok(retirementInfo);
        }
        [HttpGet]
        public IActionResult GetHealthCalc(int contactId)
        {
            var healthInfo = _NeedAnalysisService.GetHealthCalc(contactId);
            return Ok(healthInfo);
        }
      
    }

}
