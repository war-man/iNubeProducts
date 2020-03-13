using iNube.Utility.Framework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.WrapperAPI
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class WrapperController : BaseApiController
    {
        public IWrapperService _wrapperService;

        public WrapperController(IWrapperService wrapperService)
        {
            _wrapperService = wrapperService;
        }

       //

    }
}

