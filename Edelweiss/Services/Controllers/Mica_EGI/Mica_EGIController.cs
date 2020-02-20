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
    // [Authorize(AuthenticationSchemes = "Bearer")]
    public class Mica_EGIController : BaseApiController
    {

        private IMicaEGIService _quotationService;



        public Mica_EGIController(IMicaEGIService quotationService)
        {

            _quotationService = quotationService;
        }


        [HttpPost]
        public async Task<IActionResult> CreateQuotation(QuotationDTO quotationDTO)
        {
            var data = await _quotationService.CreateQuotation(quotationDTO);
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateQuotation(QuotationDTO quotationDTO)
        {
            var data = await _quotationService.UpdateQuotation(quotationDTO);
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetQuotation()
        {
            var data = await _quotationService.GetQuotation();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetQuotationbyMobileNo(string mobileNo)
        {
            var data = await _quotationService.GetQuotationbyMobileNo(mobileNo);
            return Ok(data);
        }
        [HttpGet]
        public IActionResult GetSchedule()
        {

            var response = _quotationService.GetSchedule();
            return Ok(response);

        }

        [HttpPost]
        public IActionResult CreateSchedule(ScheduleDTO scheduleDTO)
        {
            var reponse = _quotationService.CreateSchedule(scheduleDTO);
            return Ok(reponse);
        }

        [HttpGet]
        public IActionResult ScheduleStatus(string VehicleRegstrationNo, string PolicyNo)
        {
            var response = _quotationService.ScheduleStatus(VehicleRegstrationNo, PolicyNo);
            return Ok(response);
        }

        [HttpGet]

        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetVehicleDetails(int VehicleId)
        {
            var objectval = await _quotationService.GetVehicleDetails(VehicleId, Context);
            return Ok(objectval);
        }

        [HttpGet]
        public IActionResult GetSIFromMakeModel(decimal VehicleId)
        {
            var data = _quotationService.GetSIFromMakeModel(VehicleId, Context);
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicleMaster(string lMasterlist, bool isFilter = true)
        {
            var objectval = await _quotationService.GetVehicleMaster(lMasterlist, Context);

            //if (isFilter)
            //{
            //    var masterdata = objectval.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            //    return Ok(masterdata);
            //}

            return Ok(objectval);
        }

        [HttpPost]
        public async Task<IActionResult> SendOTP(SendOtp sendOtp)
        {
            var response = await _quotationService.SendOTP(sendOtp);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyingOTP(VerifyOTP verifyOTP)
        {
            var response = await _quotationService.VerifyingOTP(verifyOTP);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> ResetOTP(SendOtp sendOtp)
        {
            var response = await _quotationService.ResetOTP(sendOtp);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetCityMaster(string lMasterlist, bool isFilter = true)
        {
            var cityDTOs = await _quotationService.GetCityMaster(lMasterlist);

            //if (isFilter)
            //{
            //    var masterdata = cityDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            //    return Ok(masterdata);
            //}
            return Ok(cityDTOs);
        }

        [HttpPost]
        public async Task<IActionResult> CalCulatePremium([FromBody]PremiumRequestDTO premiumParameter)
        {
            var premiumValue = await _quotationService.CalCulatePremium(premiumParameter);
            return Ok(premiumValue);
        }

        [HttpPost]
        public async Task<IActionResult> HandleAdditionalVehicles(string PolicyNumber, string VehicleRegistrationNo)
        {
            var response = _quotationService.HandleAdditionalVehicles(PolicyNumber, VehicleRegistrationNo);
            return Ok(response);
        }


        [HttpPost]
        public async Task<IActionResult> HandleAdditionalDriver(string PolicyNumber, string DriverName)
        {
            var response = _quotationService.HandleAdditionalVehicles(PolicyNumber, DriverName);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePolicy(PolicyDTO policyDTO)
        {
            var response = await _quotationService.CreatePolicy(policyDTO);
            return Ok(response);
        }
                
        [HttpGet]
        public async Task<bool> DailyScheduler()
        {
            var response = await _quotationService.DailyScheduler();
            return response;
        }


        [HttpGet]
        public async Task<bool> OLDSwitchOnOff(string VehicleRegistrationNo, string PolicyNo, bool SwitchStatus)
        {
            var response = await _quotationService.OldSwitchOnOff(VehicleRegistrationNo, PolicyNo, SwitchStatus);
            return response;
        }


        [HttpGet]
        public IActionResult SmartCityMaster(string searchString)
        {
            var cityDTOs = _quotationService.SmartCityMaster(searchString);
                       
            return Ok(cityDTOs);
        }


        [HttpGet]
        public IActionResult SmartVehicleMaster(string searchString)
        {
            var cityDTOs = _quotationService.SmartVehicleMaster(searchString);

            return Ok(cityDTOs);
        }

        [HttpGet]
        public IActionResult GetStateCode(string CityName)
        {
            var response = _quotationService.GetStateCode(CityName);
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
        public async Task<IActionResult> SwitchOnOFF(string VehicleNo ,string PolicyNo, bool SwitchStat)
        {
            var response = await _quotationService.SwitchOnOff(VehicleNo, PolicyNo, SwitchStat);

            return Ok(response);
        }


    }
}