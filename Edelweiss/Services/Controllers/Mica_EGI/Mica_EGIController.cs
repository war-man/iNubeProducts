using System;
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
    [Authorize(AuthenticationSchemes = "Bearer")]
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
            return ServiceResponse(premiumValue);
        }
        [HttpPost]
        public async Task<IActionResult> WrapperCalculatePremium(WrapperPremiumRequestDTO premiumParameter)
        {
            var premiumValue = await _quotationService.WrapperCalculatePremium(premiumParameter);
            return ServiceResponse(premiumValue);
        }
 

        [HttpGet]
        public IActionResult GetSchedule(string VehicleRegistrationNo, string PolicyNo)
        {

            var response = _quotationService.GetSchedule(VehicleRegistrationNo,PolicyNo);
            return ServiceResponse(response);

        }

        [HttpPost]
        public IActionResult CreateUpdateSchedule(ScheduleDTO scheduleDTO)
        {
            var reponse = _quotationService.CreateSchedule(scheduleDTO);
            return ServiceResponse(reponse);
        }

        [HttpPost]
        public async Task<IActionResult> SwitchOnOff(SwitchOnOffDTO switchOnOff)
        {
            var response = await _quotationService.SwitchOnOff(switchOnOff);

            return ServiceResponse(response);
        }

        [HttpPost]
        public async Task <IActionResult> EndorsementPremium(EndorsementPremiumDTO endorsementPremium)
        {
            var response = await _quotationService.EndorsementPremium(endorsementPremium);
            return ServiceResponse(response);
        }

        [HttpGet]
        public IActionResult ActivityLog(string PolicyNo, string Month)
        {
            var response = _quotationService.ActivityReport(PolicyNo, Month);
            return ServiceResponse(response);
        }


        [HttpGet]
        public async Task<IActionResult> NightScheduler(DateTime? dateTime)
        {
          var response = await  _quotationService.NightScheduler(dateTime);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> PremiumBooking(DateTime? dateTime)
        {
            var response = await _quotationService.PremiumBookingScheduler(dateTime);

            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetAllVehicleSchedule(string PolicyNo)
        {
            var response = _quotationService.GetAllVehicleSchedule(PolicyNo);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetVehicleMaster(string lMasterlist, bool isFilter = true)
        {
            var objectval = _quotationService.GetVehicleMaster(lMasterlist);
            
            return Ok(objectval);
        }

        [HttpGet]
        public IActionResult BillingDetails(string PolicyNo, string Month)
        {
            var response = _quotationService.BillingDetails(PolicyNo, Month);
            return ServiceResponse(response);
        }
       
        [HttpGet]
        public IActionResult TaxTypeForStateCode(string stateabbreviation)
        {
            var response = _quotationService.TaxTypeForStateCode(stateabbreviation);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CDMapper(dynamic SourceObject, string TxnType)
        {
            var response = await _quotationService.CDMapper(SourceObject, TxnType);
            return Ok(response);

        }

    }
}