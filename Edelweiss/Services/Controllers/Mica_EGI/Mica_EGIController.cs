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
using System.Threading;

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
            var premiumValue = await _quotationService.CalCulatePremium(premiumParameter, Context);
            return ServiceResponse(premiumValue);
        }
        [HttpPost]
        public async Task<IActionResult> WrapperCalculatePremium(WrapperPremiumRequestDTO premiumParameter)
        {
            var premiumValue = await _quotationService.WrapperCalculatePremium(premiumParameter, Context);
            return ServiceResponse(premiumValue);
        }


        [HttpGet]
        public async Task<IActionResult> GetSchedule(string VehicleRegistrationNo, string PolicyNo)
        {

            var response = await _quotationService.GetSchedule(VehicleRegistrationNo, PolicyNo, Context);
            return ServiceResponse(response);

        }

        [HttpPost]
        public async Task<IActionResult> CreateUpdateSchedule(ScheduleDTO scheduleDTO)
        {
            var reponse =await _quotationService.CreateSchedule(scheduleDTO, Context);
            return ServiceResponse(reponse);
        }

        [HttpPost]
        public async Task<IActionResult> SwitchOnOff(SwitchOnOffDTO switchOnOff)
        {
            var response = await _quotationService.SwitchOnOff(switchOnOff, Context);

            return ServiceResponse(response);
        }
     
        [HttpGet]
        public async Task<IActionResult> ActivityLog(string PolicyNo, string Month,string Year)
        {
            var response =await _quotationService.ActivityReport(PolicyNo, Month, Context);
            return ServiceResponse(response);
        }


        [HttpGet]
        public async Task<IActionResult> NightScheduler(DateTime? dateTime)
        {
            var response = await _quotationService.NightScheduler(dateTime, Context);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> PremiumBooking(DateTime? dateTime)
        {
            var response = await _quotationService.PremiumBookingScheduler(dateTime, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicleSchedule(string PolicyNo)
        {
            var response =await _quotationService.GetAllVehicleSchedule(PolicyNo, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicleMaster(string lMasterlist, bool isFilter = true)
        {
            var objectval =await _quotationService.GetVehicleMaster(lMasterlist, Context);

            return Ok(objectval);
        }

        [HttpGet]
        public async Task<IActionResult> BillingDetails(string PolicyNo, int Month,int Year)
        {
            var response = await _quotationService.BillingDetails(PolicyNo, Month,Year, Context);
            return ServiceResponse(response);
        }

        [HttpGet]
        public async Task<IActionResult> TaxTypeForStateCode(string stateabbreviation)
        {
            var response =await _quotationService.TaxTypeForStateCode(stateabbreviation, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CDMapper(string TxnType, dynamic SourceObject)
        {
            var response = await _quotationService.CDMapper(TxnType, SourceObject, Context);
            return Ok(response);

        }

      
        [HttpPost]
        public async Task<IActionResult> RuleMapper(string TxnType, dynamic SourceObject)
        {
            var response = await _quotationService.RuleMapper(TxnType, SourceObject, Context);
            return Ok(response);

        }

        [HttpPost]
        public async Task<IActionResult> EndorsementPremium(EndorsementPremiumDTO endorsementPremium)
        {
            var response = await _quotationService.EndorsementPremium(endorsementPremium, null, "EndorsementPremium", Context);
            return ServiceResponse(response);
        }

        [HttpGet]
        public async Task<IActionResult> PolicyCancellationCalculator(string PolicyNo)
        {
            var response = await _quotationService.PolicyCancellationCalculator(PolicyNo,null, Context);
            return ServiceResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> GetVehicleActivity(VehicleActivityDTO vehicleActivity)
        {
            var response = await _quotationService.GetVehicleActivity(vehicleActivity,Context);
            return ServiceResponse(response);

        }
        [HttpPost]
        public async Task<IActionResult> GetRefundDetails(PolicyCancelRequest policyRequest)
        {
            var searchPolicyDetails = await _quotationService.GetRefundDetails(policyRequest, Context);
            return Ok(searchPolicyDetails);
        }

        [HttpPost]
        public async Task<IActionResult> PolicyStatusUpdate(PolicyStatusDTO policyStatus)
        {
            var response =await _quotationService.PolicyStatusUpdate(policyStatus, Context);
            return ServiceResponse(response);
        }

        [HttpGet]
        public async Task<IActionResult> MonthlySIScheduler(DateTime? dateTime)
        {
            var response = await _quotationService.MonthlySIScheduler(dateTime, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MonthlySIUpload(CancellationToken cancellationToken)
        {
            var response = await _quotationService.MonthlySIUpload(Request, cancellationToken, Context);
            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> SmartCityMaster(string searchString)
        {
            var cityDTOs = await _quotationService.SmartCityMaster(searchString,Context);

            return Ok(cityDTOs);
        }


        [HttpGet]
        public async Task<IActionResult> GetSIFromMakeModel(decimal VehicleId)
        {
            var data = await _quotationService.GetSIFromMakeModel(VehicleId, Context);
            return Ok(data);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetStateCode(string CityName)
        {
            var response = await _quotationService.GetStateCode(CityName,Context);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> VehicleStatusUpdate(VehicleStatusDTO vehicleStatus)
        {
            var response = await _quotationService.VehicleStatusUpdate(vehicleStatus, Context);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> MonthlySIPayment(MonthlySIDTO monthlySIDTO)
        {
            var response = await _quotationService.MonthlySIPayment(monthlySIDTO, Context);
            return ServiceResponse(response);
        }
        [HttpPost]
        public async Task<IActionResult> GetPolicyExceptionDetails(dynamic SourceObject)
        {
            var response = await _quotationService.GetPolicyExceptionDetails(SourceObject, Context);
            return Ok(response);

        }

        [HttpGet]
        public async Task<IActionResult> CoverStatusScheduler ()
        {
            var response = await _quotationService.CoverStatusScheduler(Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> RenewalScheduler()
        {
            var response = await _quotationService.RenewalScheduler(Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> BalanceAlertScheduler()
        {
            var response = await _quotationService.BalanceAlertScheduler(Context);
            return Ok(response);
        }

        [HttpGet]
        public  async Task<IActionResult> TotalUsage(string PolicyNo, DateTime FromDate, DateTime ToDate)
        {
            var response = await _quotationService.TotalUsage(PolicyNo, FromDate, ToDate,Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> RetryPremiumBooking(DateTime? dateTime,List<string> PolicyNoList)
        {
            var response = await _quotationService.RetryPremiumBookingScheduler(dateTime,PolicyNoList,Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> NewGetSchedule(string VehicleRegistrationNo, string PolicyNo)
        {

            var response = await _quotationService.NewGetSchedule(VehicleRegistrationNo, PolicyNo,"Normal",Context);
            return ServiceResponse(response);

        }

        [HttpPost]
        public async Task<IActionResult> NewSwitchOnOff(SwitchOnOffDTO switchOnOff)
        {
            var response = await _quotationService.NewSwitchOnOff(switchOnOff, Context);

            return ServiceResponse(response);
        }
    }
}