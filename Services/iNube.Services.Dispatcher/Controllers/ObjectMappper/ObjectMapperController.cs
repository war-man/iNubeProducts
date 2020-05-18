using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService;
using iNube.Services.Dispatcher.Helpers;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace iNube.Services.Dispatcher.Controllers.ObjectMapper
{
    
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ObjectMapperController : BaseApiController
    {
        public IDTObjectMapperService _objectService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ObjectMapperController(
          IDTObjectMapperService objectService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _objectService = objectService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }
        // GET: api/RatingEngine
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        [HttpPost]
        public async Task<IActionResult> DynamicMapper(dynamic inputModel, string mappingname)
        {
            var response = await _objectService.DynamicMapper(inputModel, mappingname, Context);
            return Ok(response);
        }

        //[HttpPost]
        //public async Task<IActionResult> DynamicMapperCheck([FromBody]dynamic Obj, string mapName)
        //{
        //    var response = await _objectService.DynamicMapperCheck(Obj, mapName, Context);
        //    return Ok(response);
        //}

    }
}
