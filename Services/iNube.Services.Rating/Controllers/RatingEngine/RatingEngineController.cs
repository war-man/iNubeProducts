using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iNube.Services.Rating.Controllers.RatingEngine
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingEngineController : ControllerBase
    {
        // GET: api/RatingEngine
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
