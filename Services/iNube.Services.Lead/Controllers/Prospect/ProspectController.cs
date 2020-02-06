using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using INube.Services.Prospect.Controllers.Prospect.ProspectService;
using iNube.Services.Lead.Models;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Authorization;H:\INube2.0 august 5\Services\iNube.Services.Lead\Controllers\Prospect\ProspectController.cs

namespace INube.Services.Prospect.Controllers.Prospect
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    
    public class ProspectController : BaseApiController
    {
        public IProspectService _ProspectService;

        public ProspectController(IProspectService ProspectService)
        {
            _ProspectService = ProspectService;
        }

      
        [HttpGet]
       
        public IActionResult GetProspectPool()
        {
            var prospect = _ProspectService.GetProspectPool(Context);
            return Ok(prospect);
        }

   
    }
}
