﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using iNube.Services.MicaExtension_EGI.Controllers.MicaExtension_EGI.Mica_EGIService;
using iNube.Services.MicaExtension_EGI.Models;


namespace iNube.Services.MicaExtension_EGI.Controllers.MicaExtension_EGI
{

    [Route("api/[controller]/[action]")]
    [ApiController]
  //  [Authorize(AuthenticationSchemes = "Bearer")]
    public class Mica_EGIController : BaseApiController
    {

        private IMicaEGIService _quotationService;

        public Mica_EGIController(IMicaEGIService quotationService)
        {
            _quotationService = quotationService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CalculatePremium([FromBody]PremiumRequestDTO premiumParameter)
        {
            var premiumValue = await _quotationService.CalCulatePremium(premiumParameter);
            return Ok(premiumValue);
        }


        [HttpGet]
        public IActionResult GetSchedule(string VehicleRegistrationNo, string PolicyNo)
        {

            var response = _quotationService.GetSchedule(VehicleRegistrationNo,PolicyNo);
            return Ok(response);

        }

        [HttpPost]
        public IActionResult CreateUpdateSchedule(ScheduleDTO scheduleDTO)
        {
            var reponse = _quotationService.CreateSchedule(scheduleDTO);
            return Ok(reponse);
        }

        [HttpPost]
        public async Task<IActionResult> SwitchOnOFF(string VehicleNo, string PolicyNo, bool SwitchStat)
        {
            var response = await _quotationService.SwitchOnOff(VehicleNo, PolicyNo, SwitchStat);

            return Ok(response);
        }

        [HttpPost]
        public IActionResult EndorsementPremium(EndorsementPremiumDTO endorsementPremium)
        {
            var response = _quotationService.EndorsementPremium(endorsementPremium);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult ActivityReport(string PolicyNo, string Month)
        {
            var response = _quotationService.ActivityReport(PolicyNo, Month);
            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> NightScheduler()
        {
          var response = await  _quotationService.NightScheduler();

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> PremiumBooking()
        {
            var response = await _quotationService.PremiumBookingScheduler();

            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetAllVehicleSchedule(string PolicyNo)
        {
            var response = _quotationService.GetAllVehicleSchedule(PolicyNo);
            return Ok(response);
        }
    }
}