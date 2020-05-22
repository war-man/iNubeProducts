﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService;
using iNube.Services.Dispatcher.Helpers;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace iNube.Services.Dispatcher.Controllers.Dispatcher
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class DispatcherController : BaseApiController
    {
        public IDTDispatcherService _dispatcherService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public DispatcherController(
          IDTDispatcherService dispatcherService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _dispatcherService = dispatcherService;
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
        public async Task<IActionResult> GetParameterByEvent(string DisptcherName, string Object,string Event)
        {
            var response = await _dispatcherService.GetParameterByEvent(DisptcherName, Object, Event, Context);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> DispatcherEvent(dynamic DispatcherEventObject,string EventType)
        {
            var response = await _dispatcherService.DispatcherEvent(DispatcherEventObject, EventType, Context);
            return Ok(response);
        }
    }
}