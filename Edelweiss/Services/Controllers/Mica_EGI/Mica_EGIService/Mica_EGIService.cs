using AutoMapper;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.MicaExtension_EGI.Models;
using MicaExtension_EGI.Entities;
using iNube.Services.MicaExtension_EGI.Helpers;
using Microsoft.Extensions.Options;
using System.Net;
using iNube.Services.Controllers.EGI.IntegrationServices;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using System.Globalization;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using iNube.Services.Billing.Helpers;
using OfficeOpenXml;
using iNube.Utility.Framework.LogPrivider.LogService;

namespace iNube.Services.MicaExtension_EGI.Controllers.MicaExtension_EGI.Mica_EGIService
{
    public interface IMicaEGIService
    {
        Task<GetScheduleResponse> GetSchedule(string VehicleRegistrationNo, string PolicyNo, ApiContext context);
        Task<ScheduleResponseDTO> CreateSchedule(ScheduleDTO scheduleDTO, ApiContext context);
        Task<PremiumReturnDto> CalCulatePremium(PremiumRequestDTO premiumdata, ApiContext context);
        Task<bool> NightScheduler(DateTime? dateTime, ApiContext context);
        Task<bool> PremiumBookingScheduler(DateTime? dateTime, ApiContext context);
        Task<SwitchOnOffResponse> SwitchOnOff(SwitchOnOffDTO switchOnOff, ApiContext context);
        Task<ActivityResponse> ActivityReport(string PolicyNo, string Month, ApiContext context);

        Task<dynamic> EndorsementPremium(EndorsementPremiumDTO endorsementPremium, dynamic PolicyObject, string CallType, ApiContext context);

        Task<AllScheduleResponse> GetAllVehicleSchedule(string PolicyNo, ApiContext context);
        Task<List<ddDTO>> GetVehicleMaster(string lMasterlist, ApiContext context);
        Task<BillingResponse> BillingDetails(string PolicyNo, int Month, int Year, ApiContext context);
        Task<WrapperPremiumReturnDto> WrapperCalculatePremium(WrapperPremiumRequestDTO premiumdata, ApiContext context);
        Task<TaxTypeDTO> TaxTypeForStateCode(string stateabbreviation, ApiContext context);

        //CD Method
        Task<dynamic> CDMapper(string TxnType, dynamic SourceObject, ApiContext context);

        //Rule Engine 
        Task<List<RuleEngineResponse>> RuleMapper(string TxnType, dynamic SourceObject, ApiContext context);

        //Policy Cancellation Method
        Task<PolicyCancelReturnDto> PolicyCancellationCalculator(string PolicyNumber, dynamic PolicyObject, ApiContext context);

        //Claims needs Activity of Vehicle
        Task<ResponseVehicleActivity> GetVehicleActivity(VehicleActivityDTO vehicleActivity, ApiContext context);
        //refurnd Details
        Task<PolicyCancelResponse> GetRefundDetails(PolicyCancelRequest policyRequest, ApiContext context);

        //Policy Cancellation Status Update
        Task<PolicyStatusResponseDTO> PolicyStatusUpdate(PolicyStatusDTO policyStatus, ApiContext context);

        //MonthlySIScheduler
        Task<bool> MonthlySIScheduler(DateTime? dateTime, ApiContext context);

        Task<MonthlySIUploadDTO> MonthlySIUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext context);

        Task<List<CityMasDTO>> SmartCityMaster(string searchString,ApiContext context);
        Task<decimal> GetSIFromMakeModel(decimal VehicleId, ApiContext context);
        Task<CityMasDTO> GetStateCode(string CityName,ApiContext context);
        Task<ResponseStatus> VehicleStatusUpdate(VehicleStatusDTO vehicleStatus, ApiContext context);
        Task<ResponseStatus> MonthlySIPayment(MonthlySIDTO monthlySIDTO, ApiContext context);

    }

    public class MicaEGIService : IMicaEGIService
    {
        private MICAQMContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly IEmailService _emailService;
        private IIntegrationService _integrationService;
        private IConfiguration _configuration;


        public MicaEGIService(IConfiguration configuration, IIntegrationService integrationService, IMapper mapper, MICAQMContext context, IOptions<AppSettings> appSettings, IEmailService emailService)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
            _emailService = emailService;
            _integrationService = integrationService;
            _configuration = configuration;
        }


        public async Task<GetScheduleResponse> GetSchedule(string VehicleRegistrationNo, string PolicyNo, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            GetScheduleResponse response = new GetScheduleResponse();

            var Check = CheckPolicyStatus(PolicyNo);


            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentTimeHour = IndianTime.Hour;
            var CurrentDay = IndianTime.DayOfWeek.ToString();


            if (!String.IsNullOrEmpty(VehicleRegistrationNo) && !String.IsNullOrEmpty(PolicyNo))
            {

                if (Check == true)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "Policy is Cancelled";
                    response.Status = BusinessStatus.Ok;
                    errorInfo.ErrorMessage = "Trasactions are not allowed.Policy is Cancelled";
                    errorInfo.ErrorCode = "ExtCUS";
                    errorInfo.PropertyName = "PolicyCancelled";
                    response.Errors.Add(errorInfo);
                    return response;
                }

                var checkdata = _context.TblSchedule.Any(x => x.VehicleRegistrationNo == VehicleRegistrationNo && x.PolicyNo == PolicyNo);

                if (checkdata)
                {

                    var scheduledata = _context.TblSchedule.FirstOrDefault(x => x.VehicleRegistrationNo == VehicleRegistrationNo && x.PolicyNo == PolicyNo);

                    response.GetSchedule.PolicyNo = PolicyNo;
                    response.GetSchedule.VehicleRegistrationNo = VehicleRegistrationNo;
                    response.GetSchedule.VehicleType = scheduledata.VehicleType;
                    response.GetSchedule.Mon = scheduledata.Mon;
                    response.GetSchedule.Tue = scheduledata.Tue;
                    response.GetSchedule.Wed = scheduledata.Wed;
                    response.GetSchedule.Thu = scheduledata.Thu;
                    response.GetSchedule.Fri = scheduledata.Fri;
                    response.GetSchedule.Sat = scheduledata.Sat;
                    response.GetSchedule.Sun = scheduledata.Sun;

                    var checkstatus = _context.TblSwitchLog.LastOrDefault(x => x.PolicyNo == PolicyNo
                                                                  && x.VehicleNumber == VehicleRegistrationNo
                                                                  && x.CreatedDate.Value.Date == IndianTime.Date);


                    if (checkstatus != null)
                    {
                        response.GetSchedule.SwitchStatus = checkstatus.SwitchStatus;

                        if (CurrentTimeHour < Convert.ToDecimal(_configuration["Scheduler_Validation:TimeInHours"]))
                        {
                            response.GetSchedule.SwitchEnabled = true;
                        }
                        else
                        {
                            if (checkstatus.SwitchStatus == true)
                            {
                                response.GetSchedule.SwitchEnabled = false;
                            }
                            else
                            {
                                response.GetSchedule.SwitchEnabled = true;
                            }

                        }
                    }
                    else
                    {
                        bool? CurrentDayStat = false;

                        switch (CurrentDay)
                        {
                            case "Monday":
                                CurrentDayStat = scheduledata.Mon;
                                break;

                            case "Tuesday":
                                CurrentDayStat = scheduledata.Tue;
                                break;


                            case "Wednesday":
                                CurrentDayStat = scheduledata.Wed;
                                break;


                            case "Thursday":
                                CurrentDayStat = scheduledata.Thu;
                                break;


                            case "Friday":
                                CurrentDayStat = scheduledata.Fri;
                                break;


                            case "Saturday":
                                CurrentDayStat = scheduledata.Sat;
                                break;



                            case "Sunday":
                                CurrentDayStat = scheduledata.Sun;
                                break;


                                // default: break;
                        }



                        response.GetSchedule.SwitchStatus = CurrentDayStat;
                        response.GetSchedule.SwitchEnabled = false;
                    }

                    response.Status = BusinessStatus.Ok;

                    return response;

                }
                else
                {
                    //Return No Records Found 
                    response.GetSchedule = null;
                    ErrorInfo errorInfo = new ErrorInfo();
                    response.ResponseMessage = "No Records Found";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "No records found in the Schedule table for the sent input";
                    errorInfo.ErrorCode = "GEN001";
                    errorInfo.PropertyName = "NoRecords";
                    response.Errors.Add(errorInfo);
                    return response;

                }


            }
            else
            {
                //Return Wrong NUll DATA 
                response.GetSchedule = null;

                ErrorInfo errorInfo = new ErrorInfo();

                response.ResponseMessage = "Null/Empty Inputs";
                response.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Either Policy Number or Vehicle Number is Null";
                errorInfo.ErrorCode = "GEN002";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;

            }

        }

        public async Task<ScheduleResponseDTO> CreateSchedule(ScheduleDTO scheduleDTO, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            ScheduleResponseDTO response = new ScheduleResponseDTO();

            var Check = CheckPolicyStatus(scheduleDTO.PolicyNo);

            if (Check == true)
            {
                ErrorInfo errorInfo = new ErrorInfo();

                response.ResponseMessage = "Policy is Cancelled";
                response.Status = BusinessStatus.Ok;
                errorInfo.ErrorMessage = "Trasactions are not allowed.Policy is Cancelled";
                errorInfo.ErrorCode = "ExtCUS";
                errorInfo.PropertyName = "PolicyCancelled";
                response.Errors.Add(errorInfo);
                return response;
            }

            if (String.IsNullOrEmpty(scheduleDTO.PolicyNo))
            {
                ErrorInfo errorInfo = new ErrorInfo();
                response.ResponseMessage = "Null/Empty Inputs";
                response.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "PolicyNumber is Empty";
                errorInfo.ErrorCode = "GEN001";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;

            }
            else if (String.IsNullOrEmpty(scheduleDTO.VehicleRegistrationNo))
            {
                ErrorInfo errorInfo = new ErrorInfo();
                response.ResponseMessage = "Null/Empty Inputs";
                response.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Vehicle Number is Empty";
                errorInfo.ErrorCode = "GEN001";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;
            }


            if (scheduleDTO.VehicleType == "PC" || scheduleDTO.VehicleType == "TW")
            {
                var mapData = _mapper.Map<TblSchedule>(scheduleDTO);

                var carCheck = _context.TblSchedule.Any(x => x.VehicleRegistrationNo == mapData.VehicleRegistrationNo && x.PolicyNo == mapData.PolicyNo);

                if (carCheck == false)
                {
                    DateTime indianTime = System.DateTime.UtcNow.AddMinutes(330);
                    mapData.CreatedDate = indianTime;
                    mapData.ModifyCount = 0;
                    mapData.ModifiedDate = indianTime;
                    mapData.IsActive = true;

                    _context.TblSchedule.Add(mapData);

                    TblSwitchLog tblSwitchLog = new TblSwitchLog();

                    tblSwitchLog.PolicyNo = mapData.PolicyNo;
                    tblSwitchLog.VehicleNumber = mapData.VehicleRegistrationNo;
                    tblSwitchLog.SwitchStatus = false;
                    tblSwitchLog.CreatedDate = indianTime;
                    tblSwitchLog.SwitchType = "Auto";

                    _context.TblSwitchLog.Add(tblSwitchLog);
                    response.ResponseMessage = "Schedule Created Successfully";
                    response.Status = BusinessStatus.Created;
                }
                else
                {
                    var tblschedule = _context.TblSchedule.SingleOrDefault(x => x.VehicleRegistrationNo == mapData.VehicleRegistrationNo && x.PolicyNo == mapData.PolicyNo);

                    tblschedule.Mon = mapData.Mon;
                    tblschedule.Tue = mapData.Tue;
                    tblschedule.Wed = mapData.Wed;
                    tblschedule.Thu = mapData.Thu;
                    tblschedule.Fri = mapData.Fri;
                    tblschedule.Sat = mapData.Sat;
                    tblschedule.Sun = mapData.Sun;
                    //tblschedule.VehicleType = mapData.VehicleType;
                    //tblschedule.PolicyNo = mapData.PolicyNo;
                    //tblschedule.VehicleRegistrationNo = mapData.VehicleRegistrationNo;

                    tblschedule.ModifyCount += 1;

                    DateTime indianTime = System.DateTime.UtcNow.AddMinutes(330);

                    tblschedule.ModifiedDate = indianTime;
                    _context.TblSchedule.Update(tblschedule);
                    response.ResponseMessage = "Schedule Updated Successfully";
                    response.Status = BusinessStatus.Updated;
                }
                _context.SaveChanges();

                response.ScheduleDTO = scheduleDTO;
                return response;
            }
            else
            {
                ErrorInfo errorInfo = new ErrorInfo();

                response.ResponseMessage = "Null/Empty Inputs";
                response.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Vehicle Type Should be either PC [Private Car] or TW [Two Wheeler]";
                errorInfo.ErrorCode = "ExtCUS001";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;
            }
        }

        public async Task<PremiumReturnDto> CalCulatePremium(PremiumRequestDTO premiumdata, ApiContext context)
        {
             _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));
            PremiumReturnDto response = new PremiumReturnDto();
            if (premiumdata.NoOfPC > 0)
            {
                if (premiumdata.DriverAge >= 18 && premiumdata.DriverAge <= 75)
                {
                    if (premiumdata.DriverExp <= (premiumdata.DriverAge - 18))
                    {
                        if (premiumdata.BillingFrequency == "" || premiumdata.BillingFrequency == "Monthly" || premiumdata.BillingFrequency == "Yearly")
                        {
                            SchedulerPremiumDTO prem = new SchedulerPremiumDTO();
                            prem.dictionary_rule.SI = premiumdata.SI.ToString();
                            prem.dictionary_rule.NOOFPC = premiumdata.NoOfPC.ToString();
                            prem.dictionary_rule.NOOFTW = premiumdata.NoOfTW.ToString();


                            prem.dictionary_rate.AVFACTORPC_PC_NOOFPC = premiumdata.NoOfPC.ToString();
                            prem.dictionary_rate.AVFACTORTW_TW_NOOFPC = premiumdata.NoOfPC.ToString();
                            prem.dictionary_rate.AVFACTORTW_TW_NOOFTW = premiumdata.NoOfTW.ToString();
                            prem.dictionary_rate.PDAGERT_PAge = premiumdata.DriverAge.ToString();
                            prem.dictionary_rate.DEXPRT_Exp = premiumdata.DriverExp.ToString();
                            prem.dictionary_rate.ADDRVRT_DRV = premiumdata.AdditionalDriver.ToString();




                            TaxTypeDTO taxType = new TaxTypeDTO();
                            taxType = await TaxTypeForStateCode(premiumdata.StateCode, context);

                            prem.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                            prem.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

                            var Data = await _integrationService.CalCulateRatingPremium(prem,context);
                            List<CalculationResult> val = null;
                            if (Data != null)
                            {
                                try
                                {
                                    val = JsonConvert.DeserializeObject<List<CalculationResult>>(Data.ToString());
                                }
                                catch (Exception e)
                                {
                                    ErrorInfo errorInfo = new ErrorInfo();

                                    response.ResponseMessage = "Deserialization Failed";
                                    response.Status = BusinessStatus.PreConditionFailed;
                                    errorInfo.ErrorMessage = "Mica Calculate Premium Failed";
                                    errorInfo.ErrorCode = "ExtCP";
                                    errorInfo.PropertyName = "MicaRating";
                                    response.Errors.Add(errorInfo);
                                    return response;
                                }


                            }
                            else
                            {
                                ErrorInfo errorInfo = new ErrorInfo();

                                response.ResponseMessage = "No response from rating";
                                response.Status = BusinessStatus.PreConditionFailed;
                                errorInfo.ErrorMessage = "Mica Calculate Premium Failed";
                                errorInfo.ErrorCode = "ExtCP";
                                errorInfo.PropertyName = "MicaRating";
                                response.Errors.Add(errorInfo);
                                return response;


                            }

                            if (val != null)
                            {
                                var Ftperday = 0.00;
                                var fire = val.FirstOrDefault(x => x.Entity == "FTPM").EValue;
                                var theft = val.FirstOrDefault(x => x.Entity == "ADPMPD").EValue;
                                Ftperday = Ftperday + Convert.ToDouble(fire) + Convert.ToDouble(theft);

                                var Ft30days = Ftperday * 30;
                                var Ft60days = Ftperday * 60;

                                var Ft365days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FT365").EValue);
                                var Ad60days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60DAYS").EValue);
                                var Ad365days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365DAYS").EValue);
                                var ad60fttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60FTAXAMT").EValue);
                                var ad60ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60TTAXAMT").EValue);

                                var ad365ftax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365FTAXAMT").EValue);
                                var ad365ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365TTAXAMT").EValue);
                                var ad30days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30DAYS").EValue);
                                var ad30ftax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30FTAXAMT").EValue);
                                var ad30ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30TTAXAMT").EValue);

                                var ftfttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTFTAXAMT").EValue);
                                var ftttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTTTAXAMT").EValue);

                                var monthlyGST = ad60fttax + ad60ttax + ftfttax + ftttax;
                                var yearlyGST = ad365ftax + ad365ttax + ftfttax + ftttax;


                                PremiumReturnDto returnobj = new PremiumReturnDto();
                                returnobj.PerDayPremium = Math.Round(Convert.ToDecimal(Ftperday), 2);
                                returnobj.FireTheft = Math.Round(Convert.ToDecimal(Ft365days), 2);
                                if (premiumdata.BillingFrequency == "Monthly")
                                {
                                    returnobj.ADPremium = Math.Round(Convert.ToDecimal(Ad60days), 2);
                                    returnobj.GST = Math.Round(Convert.ToDecimal(monthlyGST), 2);
                                    returnobj.MonthlyPremium = Math.Round((ad30days + Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax)), 2);
                                }
                                else if (premiumdata.BillingFrequency == "Yearly")
                                {
                                    returnobj.ADPremium = Math.Round(Convert.ToDecimal(Ad365days), 2);
                                    returnobj.GST = Math.Round(Convert.ToDecimal(yearlyGST), 2);
                                }
                                returnobj.Total = Math.Round((returnobj.FireTheft + returnobj.ADPremium + returnobj.GST), 2);

                                returnobj.FinalAmount = Math.Round(returnobj.Total);
                                returnobj.Status = BusinessStatus.Ok;
                                return returnobj;
                            }
                            else
                            {
                                ErrorInfo errorInfo = new ErrorInfo();

                                response.ResponseMessage = "Null/Empty Inputs";
                                response.Status = BusinessStatus.PreConditionFailed;
                                errorInfo.ErrorMessage = "Calculate Premium Failed";
                                errorInfo.ErrorCode = "ExtCP005";
                                errorInfo.PropertyName = "MandatoryfieldsMissing";
                                response.Errors.Add(errorInfo);
                                return response;
                            }
                        }
                        else
                        {
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "Null/Empty Inputs";
                            response.Status = BusinessStatus.PreConditionFailed;
                            errorInfo.ErrorMessage = "Billing Frequency Should be either Monthly or Yearly";
                            errorInfo.ErrorCode = "ExtCP004";
                            errorInfo.PropertyName = "MandatoryfieldsMissing";
                            response.Errors.Add(errorInfo);
                            return response;
                        }
                    }
                    else
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        response.ResponseMessage = "Null/Empty Inputs";
                        response.Status = BusinessStatus.PreConditionFailed;
                        errorInfo.ErrorMessage = "Driver Experience should be less than or equal to his age – 18";
                        errorInfo.ErrorCode = "ExtCP003";
                        errorInfo.PropertyName = "MandatoryfieldsMissing";
                        response.Errors.Add(errorInfo);
                        return response;
                    }
                }
                else
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "Null/Empty Inputs";
                    response.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Driver age should be between 18 and 75.";
                    errorInfo.ErrorCode = "ExtCP002";
                    errorInfo.PropertyName = "MandatoryfieldsMissing";
                    response.Errors.Add(errorInfo);
                    return response;
                }
            }
            else
            {
                ErrorInfo errorInfo = new ErrorInfo();

                response.ResponseMessage = "Null/Empty Inputs";
                response.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Minimum One PC should be their.";
                errorInfo.ErrorCode = "ExtCP001";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;
            }
        }

        public async Task<WrapperPremiumReturnDto> WrapperCalculatePremium(WrapperPremiumRequestDTO premiumdata, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            WrapperPremiumReturnDto returnobj = new WrapperPremiumReturnDto();
            if (premiumdata.NoOfPC != 0)
            {
                if (premiumdata.DriverAge >= 18 && premiumdata.DriverAge <= 75)
                {
                    if (premiumdata.DriverExp <= (premiumdata.DriverAge - 18))
                    {
                        SchedulerPremiumDTO prem = new SchedulerPremiumDTO();


                        prem.dictionary_rule.SI = "";
                        prem.dictionary_rule.NOOFPC = premiumdata.NoOfPC.ToString();
                        prem.dictionary_rule.NOOFTW = premiumdata.NoOfTW.ToString();


                        prem.dictionary_rate.AVFACTORPC_PC_NOOFPC = premiumdata.NoOfPC.ToString();
                        prem.dictionary_rate.AVFACTORTW_TW_NOOFPC = premiumdata.NoOfPC.ToString();
                        prem.dictionary_rate.AVFACTORTW_TW_NOOFTW = premiumdata.NoOfTW.ToString();
                        prem.dictionary_rate.PDAGERT_PAge = premiumdata.DriverAge.ToString();
                        prem.dictionary_rate.DEXPRT_Exp = premiumdata.DriverExp.ToString();
                        prem.dictionary_rate.ADDRVRT_DRV = "0";

                        prem.dictionary_rate.FSTTAX_TAXTYPE = "";
                        prem.dictionary_rate.TSTTAX_TAXTYPE = "";

                        var Data = await _integrationService.WrapperCalculateRatingPremium(prem,context);

                        List<CalculationResult> val = new List<CalculationResult>();

                        try
                        {
                            val = JsonConvert.DeserializeObject<List<CalculationResult>>(Data.ToString());
                        }
                        catch(Exception Ex)
                        {
                            ErrorInfo errorInfo = new ErrorInfo();

                            returnobj.ResponseMessage = "Deserialization Failed";
                            returnobj.Status = BusinessStatus.PreConditionFailed;
                            errorInfo.ErrorMessage = "Mica Calculate Premium Failed";
                            errorInfo.ErrorCode = "ExtWrapperCP";
                            errorInfo.PropertyName = "MicaRating";
                            returnobj.Errors.Add(errorInfo);
                            return returnobj;
                        }

                        if (val != null)
                        {

                            var fire = val.FirstOrDefault(x => x.Entity == "FTPM").EValue;
                            var driver1Ad = val.FirstOrDefault(x => x.Entity == "DRIVER1_ADPMPD").EValue;
                            var driver1totalpm = val.FirstOrDefault(x => x.Entity == "DRIVER1_TOTALPMPD").EValue;
                            var driver2Ad = val.FirstOrDefault(x => x.Entity == "DRIVER2_ADPMPD").EValue;
                            var driver2totalpm = val.FirstOrDefault(x => x.Entity == "DRIVER2_TOTALPMPD").EValue;
                            var driver3Ad = val.FirstOrDefault(x => x.Entity == "DRIVER3_ADPMPD").EValue;
                            var driver3totalpm = val.FirstOrDefault(x => x.Entity == "DRIVER3_TOTALPMPD").EValue;


                            returnobj.FTPM = Math.Round(Convert.ToDecimal(fire), 2);

                            returnobj.driverList.driver1.D1ADPM = Math.Round(Convert.ToDecimal(driver1Ad), 2);
                            returnobj.driverList.driver1.D1TotalPM = Math.Round(Convert.ToDecimal(driver1totalpm), 2);

                            returnobj.driverList.driver2.D2ADPM = Math.Round(Convert.ToDecimal(driver2Ad), 2);
                            returnobj.driverList.driver2.D2TotalPM = Math.Round(Convert.ToDecimal(driver2totalpm), 2);

                            returnobj.driverList.driver3.D3ADPM = Math.Round(Convert.ToDecimal(driver3Ad), 2);
                            returnobj.driverList.driver3.D3TotalPM = Math.Round(Convert.ToDecimal(driver3totalpm), 2);

                            returnobj.Status = BusinessStatus.Ok;

                            return returnobj;



                        }
                        else
                        {

                            ErrorInfo errorInfo = new ErrorInfo();

                            returnobj.ResponseMessage = "Null/Empty Inputs";
                            returnobj.Status = BusinessStatus.PreConditionFailed;
                            errorInfo.ErrorMessage = "Calculate Premium Failed";
                            errorInfo.ErrorCode = "ExtCP005";
                            errorInfo.PropertyName = "MandatoryfieldsMissing";
                            returnobj.Errors.Add(errorInfo);
                            return returnobj;
                        }
                    }
                    else
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        returnobj.ResponseMessage = "Null/Empty Inputs";
                        returnobj.Status = BusinessStatus.PreConditionFailed;
                        errorInfo.ErrorMessage = "Driver Experience should be less than or equal to his age – 18";
                        errorInfo.ErrorCode = "ExtWCP003";
                        errorInfo.PropertyName = "MandatoryfieldsMissing";
                        returnobj.Errors.Add(errorInfo);
                        return returnobj;
                    }
                }
                else
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    returnobj.ResponseMessage = "Null/Empty Inputs";
                    returnobj.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Driver age should be between 18 and 75.";
                    errorInfo.ErrorCode = "ExtWCP002";
                    errorInfo.PropertyName = "MandatoryfieldsMissing";
                    returnobj.Errors.Add(errorInfo);
                    return returnobj;
                }
            }
            else
            {
                ErrorInfo errorInfo = new ErrorInfo();

                returnobj.ResponseMessage = "Null/Empty Inputs";
                returnobj.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Minimum One PC should be their.";
                errorInfo.ErrorCode = "ExtWCP001";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                returnobj.Errors.Add(errorInfo);
                return returnobj;
            }

        }

        public async Task<TaxTypeDTO> TaxTypeForStateCode(string stateabbreviation, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            var statedata = _context.TblMasState.SingleOrDefault(c => c.StateAbbreviation == stateabbreviation);

            TaxTypeDTO taxType = new TaxTypeDTO();

            switch (statedata.StateType)
            {
                case "UnionTerritory":
                    taxType.FSTTAX_TAXTYPE = "CGST";
                    taxType.TSTTAX_TAXTYPE = "UGST";
                    break;

                case "State":
                    if (statedata.StateId != 21 && statedata.StateName != "MAHARASHTRA")
                    {
                        taxType.FSTTAX_TAXTYPE = "CGST";
                        taxType.TSTTAX_TAXTYPE = "SGST";
                        break;
                    }
                    else
                    {
                        taxType.FSTTAX_TAXTYPE = "IGST";
                        taxType.TSTTAX_TAXTYPE = "NA";
                        break;
                    }


                default:
                    taxType.FSTTAX_TAXTYPE = "IGST";
                    taxType.TSTTAX_TAXTYPE = "NA";
                    break;
            }

            return taxType;

        }

        public taxDto TaxCalculation(int cityid)
        {
            var values = _context.TblMasCity.SingleOrDefault(x => x.CityId == cityid).StateId;

            var statedata = _context.TblMasState.SingleOrDefault(c => c.StateId == values);
            taxDto tax = new taxDto();
            switch (statedata.StateType.ToString())
            {
                case "UnionTerritory":
                    tax.CGST = 9;
                    tax.UGST = 9;
                    break;


                case "State":
                    if (statedata.StateId != 21 && statedata.StateName != "MAHARASHTRA")
                    {
                        tax.CGST = 9;
                        tax.SGST = 9;
                    }
                    else
                    {
                        tax.IGST = 18;
                    }
                    break;

                default: break;
            }

            return tax;

        }

        private TaxTypeDTO TaxType(int CityID)
        {

            var StateId = _context.TblMasCity.SingleOrDefault(x => x.CityId == CityID).StateId;

            var statedata = _context.TblMasState.SingleOrDefault(c => c.StateId == StateId);

            TaxTypeDTO taxType = new TaxTypeDTO();

            switch (statedata.StateType)
            {
                case "UnionTerritory":
                    taxType.FSTTAX_TAXTYPE = "CGST";
                    taxType.TSTTAX_TAXTYPE = "UGST";
                    break;

                case "State":
                    if (statedata.StateId != 21 && statedata.StateName != "MAHARASHTRA")
                    {
                        taxType.FSTTAX_TAXTYPE = "CGST";
                        taxType.TSTTAX_TAXTYPE = "SGST";
                        break;
                    }
                    else
                    {
                        taxType.FSTTAX_TAXTYPE = "IGST";
                        taxType.TSTTAX_TAXTYPE = "NA";
                        break;
                    }


                default:
                    taxType.FSTTAX_TAXTYPE = "IGST";
                    taxType.TSTTAX_TAXTYPE = "NA";
                    break;
            }

            return taxType;

        }

        public async Task<SwitchOnOffResponse> SwitchOnOff(SwitchOnOffDTO switchOnOff, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            string VehicleRegistrationNo = switchOnOff.VehicleRegistrationNo;
            string PolicyNo = switchOnOff.PolicyNo;
            bool SwitchStatus = switchOnOff.SwitchState;

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentDay = IndianTime.DayOfWeek.ToString();
            var CurrentTimeHour = IndianTime.Hour;
                     

            TblSwitchLog checkLog = new TblSwitchLog();
            TblSchedule ScheduleData = new TblSchedule();
            SwitchOnOffResponse SuccessResponse = new SwitchOnOffResponse();

            if (!String.IsNullOrEmpty(VehicleRegistrationNo) && !String.IsNullOrEmpty(PolicyNo) && SwitchStatus == true)
            {
                var Check = CheckPolicyStatus(switchOnOff.PolicyNo);
                if (Check == true)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    SuccessResponse.ResponseMessage = "Policy is Cancelled";
                    SuccessResponse.Status = BusinessStatus.Ok;
                    errorInfo.ErrorMessage = "Trasactions are not allowed.Policy is Cancelled";
                    errorInfo.ErrorCode = "ExtCUS";
                    errorInfo.PropertyName = "PolicyCancelled";
                    SuccessResponse.Errors.Add(errorInfo);
                    return SuccessResponse;
                }

                bool verifydata = false;

                var verifyPolicy = _context.TblSchedule.Any(x => x.PolicyNo == PolicyNo);

                if (verifyPolicy)
                {
                    var verifyVehicle = _context.TblSchedule.Any(x => x.VehicleRegistrationNo == VehicleRegistrationNo);

                    if (verifyVehicle)
                    {
                        verifydata = _context.TblSchedule.Any(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo);
                    }
                    else
                    {
                        //Return Wrong DATA No Records Found for this Vehicle Number
                        SwitchOnOffResponse response = new SwitchOnOffResponse();

                        ErrorInfo errorInfo = new ErrorInfo();

                        response.ResponseMessage = "No Records Found for the Sent Inputs";
                        response.Status = BusinessStatus.NotFound;
                        errorInfo.ErrorMessage = "No Records Found for this Vehicle Number: " + VehicleRegistrationNo + " in Schedule";
                        errorInfo.ErrorCode = "ExtSWT002";
                        errorInfo.PropertyName = "Vehicle Number";
                        response.Errors.Add(errorInfo);
                        return response;
                    }
                }
                else
                {
                    //Return Wrong DATA Not Records Found for this Policy Number
                    SwitchOnOffResponse response = new SwitchOnOffResponse();

                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "No Records Found for the Sent Inputs";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "Not Records Found for this Policy Number: " + PolicyNo + " in Schedule";
                    errorInfo.ErrorCode = "ExtSWT001";
                    errorInfo.PropertyName = "Policy Number";
                    response.Errors.Add(errorInfo);
                    return response;
                }

                if (verifydata)
                {
                    checkLog = _context.TblSwitchLog.LastOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleNumber == VehicleRegistrationNo && x.CreatedDate.Value.Date == IndianTime.Date);
                    ScheduleData = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo);

                }
                else
                {
                    //Return Wrong DATA No Records for Policy Number & Vehicle Number
                    SwitchOnOffResponse response = new SwitchOnOffResponse();
                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "No Records Found for the Sent Inputs";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "No Records Found for this Policy Number: " + PolicyNo + " & Vehicle Number: " + VehicleRegistrationNo + " in Schedule";
                    errorInfo.ErrorCode = "ExtSWT003";
                    errorInfo.PropertyName = "Policy Number & Vehicle Number";
                    response.Errors.Add(errorInfo);

                    return response;
                }

                if (CurrentTimeHour < Convert.ToDecimal(_configuration["Scheduler_Validation:TimeInHours"]))
                {

                    if (checkLog != null)
                    {
                        if (checkLog.SwitchStatus == false)
                        {
                            TblSwitchLog tblSwitchlog = new TblSwitchLog();

                            tblSwitchlog.PolicyNo = PolicyNo;
                            tblSwitchlog.VehicleNumber = VehicleRegistrationNo;
                            tblSwitchlog.SwitchStatus = true;
                            tblSwitchlog.CreatedDate = IndianTime;
                            tblSwitchlog.SwitchType = "Manual";
                            _context.TblSwitchLog.Add(tblSwitchlog);

                            if (ScheduleData.VehicleType == "PC")
                            {
                                var DailyData = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == PolicyNo && x.TxnDate.Value.Date == IndianTime.Date);

                                if (DailyData != null)
                                {
                                    DailyData.ActivePc = DailyData.ActivePc + 1;
                                    _context.TblDailyActiveVehicles.Update(DailyData);
                                }
                                else
                                {
                                    TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();

                                    tblDailyActive.PolicyNumber = PolicyNo;
                                    tblDailyActive.ActivePc = 1;
                                    tblDailyActive.ActiveTw = 0;
                                    tblDailyActive.TotalPremium = 0;
                                    tblDailyActive.TxnDate = IndianTime;
                                    tblDailyActive.FromTax = 0;
                                    tblDailyActive.ToTax = 0;
                                    tblDailyActive.BasePremium = 0;

                                    _context.TblDailyActiveVehicles.Add(tblDailyActive);
                                }

                            }
                            else if (ScheduleData.VehicleType == "TW")
                            {
                                var DailyData = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == PolicyNo && x.TxnDate.Value.Date == IndianTime.Date);

                                if (DailyData != null)
                                {
                                    DailyData.ActiveTw = DailyData.ActiveTw + 1;
                                    _context.TblDailyActiveVehicles.Update(DailyData);
                                }
                                else
                                {
                                    TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();

                                    tblDailyActive.PolicyNumber = PolicyNo;
                                    tblDailyActive.ActivePc = 0;
                                    tblDailyActive.ActiveTw = 1;
                                    tblDailyActive.TotalPremium = 0;
                                    tblDailyActive.TxnDate = IndianTime;
                                    tblDailyActive.FromTax = 0;
                                    tblDailyActive.ToTax = 0;
                                    tblDailyActive.BasePremium = 0;

                                    _context.TblDailyActiveVehicles.Add(tblDailyActive);

                                }

                            }



                            _context.SaveChanges();
                        }
                        else if (checkLog.SwitchStatus == true)
                        {
                            ///Throw Error
                            ///Switch ALREADY ON
                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "The Switch is Already AUTO ON";
                            response.Status = BusinessStatus.Ok;
                            errorInfo.ErrorMessage = "The Vehicle Number:  " + VehicleRegistrationNo + "  is already Auto ON Due to Schedule";
                            errorInfo.ErrorCode = "ExtSWT010";
                            errorInfo.PropertyName = "AUTOSwitchON";
                            response.Errors.Add(errorInfo);

                            return response;

                        }
                    }
                    else
                    {
                        bool? CurrentDayStat = false;

                        switch (CurrentDay)
                        {
                            case "Monday":
                                CurrentDayStat = ScheduleData.Mon;
                                break;

                            case "Tuesday":
                                CurrentDayStat = ScheduleData.Tue;
                                break;


                            case "Wednesday":
                                CurrentDayStat = ScheduleData.Wed;
                                break;


                            case "Thursday":
                                CurrentDayStat = ScheduleData.Thu;
                                break;


                            case "Friday":
                                CurrentDayStat = ScheduleData.Fri;
                                break;


                            case "Saturday":
                                CurrentDayStat = ScheduleData.Sat;
                                break;



                            case "Sunday":
                                CurrentDayStat = ScheduleData.Sun;
                                break;


                                // default: break;
                        }

                        if (CurrentDayStat == false)
                        {
                            TblSwitchLog tblSwitchlog = new TblSwitchLog();

                            tblSwitchlog.PolicyNo = PolicyNo;
                            tblSwitchlog.VehicleNumber = VehicleRegistrationNo;
                            tblSwitchlog.SwitchStatus = true;
                            tblSwitchlog.CreatedDate = IndianTime;
                            tblSwitchlog.SwitchType = "Manual";

                            _context.TblSwitchLog.Add(tblSwitchlog);

                            if (ScheduleData.VehicleType == "PC")
                            {
                                var DailyData = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == PolicyNo && x.TxnDate.Value.Date == IndianTime.Date);

                                if (DailyData != null)
                                {
                                    DailyData.ActivePc = DailyData.ActivePc + 1;
                                    _context.TblDailyActiveVehicles.Update(DailyData);
                                }
                                else
                                {
                                    TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();

                                    tblDailyActive.PolicyNumber = PolicyNo;
                                    tblDailyActive.ActivePc = 1;
                                    tblDailyActive.ActiveTw = 0;
                                    tblDailyActive.TotalPremium = 0;
                                    tblDailyActive.TxnDate = IndianTime;
                                    tblDailyActive.FromTax = 0;
                                    tblDailyActive.ToTax = 0;
                                    tblDailyActive.BasePremium = 0;

                                    _context.TblDailyActiveVehicles.Add(tblDailyActive);
                                }

                            }
                            else if (ScheduleData.VehicleType == "TW")
                            {
                                var DailyData = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == PolicyNo && x.TxnDate.Value.Date == IndianTime.Date);

                                if (DailyData != null)
                                {
                                    DailyData.ActiveTw = DailyData.ActiveTw + 1;
                                    _context.TblDailyActiveVehicles.Update(DailyData);
                                }
                                else
                                {
                                    TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();

                                    tblDailyActive.PolicyNumber = PolicyNo;
                                    tblDailyActive.ActivePc = 0;
                                    tblDailyActive.ActiveTw = 1;
                                    tblDailyActive.TotalPremium = 0;
                                    tblDailyActive.TxnDate = IndianTime;
                                    tblDailyActive.FromTax = 0;
                                    tblDailyActive.ToTax = 0;
                                    tblDailyActive.BasePremium = 0;

                                    _context.TblDailyActiveVehicles.Add(tblDailyActive);

                                }

                            }

                            _context.SaveChanges();
                        }
                        else
                        {
                            ///Throw Error
                            ///Switch ALREADY ON
                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "The Switch is Already On";
                            response.Status = BusinessStatus.Ok;
                            errorInfo.ErrorMessage = "The Vehicle Number: " + VehicleRegistrationNo + " is already ON";
                            errorInfo.ErrorCode = "ExtSWT004";
                            errorInfo.PropertyName = "Already SwitchON";
                            response.Errors.Add(errorInfo);

                            return response;
                        }

                    }


                }
                else
                {
                    if (checkLog != null)
                    {
                        if (checkLog.SwitchStatus == false)
                        {
                            TblSwitchLog tblSwitchlog = new TblSwitchLog();

                            tblSwitchlog.PolicyNo = PolicyNo;
                            tblSwitchlog.VehicleNumber = VehicleRegistrationNo;
                            tblSwitchlog.SwitchStatus = true;
                            tblSwitchlog.CreatedDate = IndianTime;
                            tblSwitchlog.SwitchType = "Manual";
                            _context.TblSwitchLog.Add(tblSwitchlog);
                            _context.SaveChanges();
                        }
                        else
                        {
                            ///Throw Error
                            ///Switch ALREADY ON
                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "The Switch is Already AUTO ON";
                            response.Status = BusinessStatus.Ok;
                            errorInfo.ErrorMessage = "The Vehicle Number:  " + VehicleRegistrationNo + "  is already Auto ON Due to Schedule";
                            errorInfo.ErrorCode = "ExtSWT010";
                            errorInfo.PropertyName = "AUTOSwitchON";
                            response.Errors.Add(errorInfo);

                            return response;

                        }
                    }
                    else
                    {
                        bool? CurrentDayStat = false;

                        switch (CurrentDay)
                        {
                            case "Monday":
                                CurrentDayStat = ScheduleData.Mon;
                                break;

                            case "Tuesday":
                                CurrentDayStat = ScheduleData.Tue;
                                break;


                            case "Wednesday":
                                CurrentDayStat = ScheduleData.Wed;
                                break;


                            case "Thursday":
                                CurrentDayStat = ScheduleData.Thu;
                                break;


                            case "Friday":
                                CurrentDayStat = ScheduleData.Fri;
                                break;


                            case "Saturday":
                                CurrentDayStat = ScheduleData.Sat;
                                break;



                            case "Sunday":
                                CurrentDayStat = ScheduleData.Sun;
                                break;


                                // default: break;
                        }

                        if (CurrentDayStat == false)
                        {
                            TblSwitchLog tblSwitchlog = new TblSwitchLog();

                            tblSwitchlog.PolicyNo = PolicyNo;
                            tblSwitchlog.VehicleNumber = VehicleRegistrationNo;
                            tblSwitchlog.SwitchStatus = true;
                            tblSwitchlog.CreatedDate = IndianTime;
                            tblSwitchlog.SwitchType = "Manual";
                            _context.TblSwitchLog.Add(tblSwitchlog);
                            _context.SaveChanges();
                        }
                        else
                        {
                            ///Throw Error
                            ///Switch ALREADY ON
                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "The Switch is Already On";
                            response.Status = BusinessStatus.Ok;
                            errorInfo.ErrorMessage = "The Vehicle Number: " + VehicleRegistrationNo + " is already ON";
                            errorInfo.ErrorCode = "ExtSWT004";
                            errorInfo.PropertyName = "Already SwitchON";
                            response.Errors.Add(errorInfo);

                            return response;
                        }

                    }

                    var activeVehicleStat = _context.TblDailyActiveVehicles.FirstOrDefault(x => x.TxnDate.Value.Date == IndianTime.Date &&
                                                                                           x.PolicyNumber == PolicyNo);


                    decimal? ActivePCCount = 0;
                    decimal? ActiveTWCount = 0;

                    if (activeVehicleStat != null)
                    {
                        ActivePCCount = activeVehicleStat.ActivePc;
                        ActiveTWCount = activeVehicleStat.ActiveTw;
                    }




                    if (ScheduleData.VehicleType == "TW")
                    {
                        ActiveTWCount += 1;
                        if (activeVehicleStat != null)
                        {
                            activeVehicleStat.ActiveTw += 1;
                        }
                    }
                    else if (ScheduleData.VehicleType == "PC")
                    {
                        ActivePCCount += 1;
                        if (activeVehicleStat != null)
                        {
                            activeVehicleStat.ActivePc += 1;
                        }
                    }

                    ////Insert New Active Vehicle in Daily Active Table if Previous No Active Vehicle was their in It
                    ///
                    if (activeVehicleStat == null)
                    {
                        if (ActivePCCount > 0 || ActiveTWCount > 0)
                        {
                            TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();
                            tblDailyActive.ActivePc = ActivePCCount;
                            tblDailyActive.ActiveTw = ActiveTWCount;
                            tblDailyActive.PolicyNumber = PolicyNo;
                            tblDailyActive.TotalPremium = 0;
                            tblDailyActive.FromTax = 0;
                            tblDailyActive.ToTax = 0;
                            tblDailyActive.BasePremium = 0;
                            tblDailyActive.TxnDate = IndianTime;

                            _context.TblDailyActiveVehicles.Add(tblDailyActive);
                            _context.SaveChanges();
                        }
                    }


                    //Call the Policy Service to Get Policy Details.
                    //An Integration Call to  be Made and Recive the Data as this Model PolicyPremiumDetailsDTO

                    var PolicyData = await _integrationService.InternalGetPolicyDetailsByNumber(PolicyNo, context);

                    PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();
                    var BillingFrequency = "";
                    var AccountNumber = "";


                    if (PolicyData != null)
                    {
                        detailsDTO.SumInsured = PolicyData["si"];
                        detailsDTO.NoOfPC = PolicyData["noOfPC"];
                        detailsDTO.NoOfTW = PolicyData["noOfTW"];
                        detailsDTO.PD_Age = PolicyData["driverAge"];
                        detailsDTO.PD_DriveExperince = PolicyData["driverExp"];
                        detailsDTO.AdditionalDriver = PolicyData["additionalDriver"];
                        detailsDTO.StateCode = PolicyData["stateCode"];
                        BillingFrequency = PolicyData["billingFrequency"];
                        AccountNumber = PolicyData["CDAccountNumber"];
                    }


                    //CalculatePremiumObject
                    SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

                    //RuleObject
                    premiumDTO.dictionary_rule.SI = detailsDTO.SumInsured.ToString(); //Verify
                    premiumDTO.dictionary_rule.NOOFPC = detailsDTO.NoOfPC.ToString();
                    premiumDTO.dictionary_rule.NOOFTW = detailsDTO.NoOfTW.ToString();


                    //RateObject

                    premiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince.ToString();
                    premiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age.ToString();
                    premiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver.ToString(); //Verify
                    premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = ActivePCCount.ToString();
                    premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = ActivePCCount.ToString();
                    premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = ActiveTWCount.ToString();

                    var taxType = await TaxTypeForStateCode(detailsDTO.StateCode, context);


                    premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE; //Call TaxType //Verify
                    premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE; //Call TaxType //Verify


                    //Call CalculatePremium Policy Module MICA
                    var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, context);

                    List<CalculationResult> DeserilizedPremiumData = new List<CalculationResult>();

                    CDDTO CdModel = new CDDTO();

                    ExtCDDTO ExtCdModel = new ExtCDDTO();
                    MicaCDDTO micaCDDTO = new MicaCDDTO();
                    CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();
                    CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
                    CDPremiumDTO CdPremiumDTO = new CDPremiumDTO();
                    decimal ADPERDAY = 0;
                    decimal ADFROMTAXPERDAY = 0;
                    decimal ADTOTAXPERDAY = 0;

                    try
                    {

                        if (CalPremiumResponse != null)
                        {
                            DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());
                        }
                    }
                    catch (Exception ex)
                    {
                        TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = PolicyNo;
                        bookingLog.TxnAmount = 0;
                        bookingLog.BasePremium = 0;
                        bookingLog.FromTax = 0;
                        bookingLog.ToTax = 0;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnDetails = "Transaction Failed while Calculating Premium";
                        bookingLog.TxnStatus = false;
                        _context.TblPremiumBookingLog.Add(bookingLog);
                        _context.SaveChanges();

                        SwitchOnOffResponse response = new SwitchOnOffResponse();
                        ErrorInfo errorInfo = new ErrorInfo();

                        response.ResponseMessage = "Calculate Premium Method Failed";
                        response.Id = bookingLog.LogId.ToString();//Log Id is Sent to Verify 
                        response.Status = BusinessStatus.Error;
                        errorInfo.ErrorMessage = "The Vehicle Number" + VehicleRegistrationNo + "Premium not Calculated Yet Check Log";
                        errorInfo.ErrorCode = "ExtSWT008";
                        errorInfo.PropertyName = "PremiumFail";
                        response.Errors.Add(errorInfo);

                        return response;
                    }

                    if (DeserilizedPremiumData.Count() > 0)
                    {

                        //ADPMPD IS THE PER DAY AD RATE CONFIG IN RATING CONFIG MODULE
                        ADPERDAY = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "ADPMPD").EValue);

                        EndorsementCalDTO endorsementCal = new EndorsementCalDTO();

                        //Rule
                        endorsementCal.dictionary_rule.FT = "0";
                        endorsementCal.dictionary_rule.FTDAYS = "0";
                        endorsementCal.dictionary_rule.AD = ADPERDAY.ToString();
                        endorsementCal.dictionary_rule.ADDAYS = "1";
                        //Rate
                        endorsementCal.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                        endorsementCal.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

                        //TO GET AD PERDAY - FROM TAX AND TO TAX Because its not coming from rating Module
                        var callEndoCalculator = await EndorsementCalculator(endorsementCal,context);

                        if (callEndoCalculator.Count > 0)
                        {
                            ADFROMTAXPERDAY = Convert.ToDecimal(callEndoCalculator.FirstOrDefault(x => x.Entity == "ADFTTAX").EValue);
                            ADTOTAXPERDAY = Convert.ToDecimal(callEndoCalculator.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue);
                        }
                        else
                        {
                            TblPremiumBookingLog tblPremium = new TblPremiumBookingLog();
                            tblPremium.PolicyNo = PolicyNo;
                            tblPremium.TxnAmount = 0;
                            tblPremium.BasePremium = 0;
                            tblPremium.FromTax = 0;
                            tblPremium.ToTax = 0;
                            tblPremium.TxnDateTime = IndianTime;
                            tblPremium.TxnDetails = "Transaction Failed while Calculating Premium";
                            tblPremium.TxnStatus = false;
                            _context.TblPremiumBookingLog.Add(tblPremium);
                            _context.SaveChanges();

                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "Calculate Premium Method Failed";
                            response.Id = tblPremium.LogId.ToString();//Log Id is Sent to Verify 
                            response.Status = BusinessStatus.Error;
                            errorInfo.ErrorMessage = "The Vehicle Number" + VehicleRegistrationNo + "Premium not Calculated Yet Check Log";
                            errorInfo.ErrorCode = "ExtSWT008";
                            errorInfo.PropertyName = "PremiumFail";
                            response.Errors.Add(errorInfo);

                            return response;
                        }

                        var NewPremium = ADPERDAY + ADFROMTAXPERDAY + ADTOTAXPERDAY;

                        TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = PolicyNo;
                        bookingLog.TxnAmount = NewPremium;
                        bookingLog.BasePremium = ADPERDAY;
                        bookingLog.FromTax = ADFROMTAXPERDAY;
                        bookingLog.ToTax = ADTOTAXPERDAY;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnDetails = "Revised Total Premium for Policy - " + PolicyNo;
                        bookingLog.TxnStatus = true;

                        _context.TblPremiumBookingLog.Add(bookingLog);
                        _context.SaveChanges();



                        //Internal Private Method to get Old Premium Amount.
                        var OldPremium = CheckPremiumUpdate(PolicyNo);

                        var NewBasePremium = Convert.ToDecimal(ADPERDAY - OldPremium.BasePremium);
                        var NewFromTax = Convert.ToDecimal(ADFROMTAXPERDAY - OldPremium.FromTax);
                        var NewToTax = Convert.ToDecimal(ADTOTAXPERDAY - OldPremium.ToTax);
                        var NewTotalPremium = Convert.ToDecimal(NewPremium - OldPremium.TotalPremium);

                        var FinalPremium = NewTotalPremium;

                        taxAmountDTO.TaxAmount = NewFromTax + NewToTax;
                        taxTypeDTO.Type = taxType.FSTTAX_TAXTYPE;
                        taxTypeDTO.TaxAmount = ADFROMTAXPERDAY;
                        taxAmountDTO.Tax.Add(taxTypeDTO);

                        taxTypeDTO = new CDTaxTypeDTO();
                        taxTypeDTO.Type = taxType.TSTTAX_TAXTYPE;
                        taxTypeDTO.TaxAmount = NewToTax;
                        taxAmountDTO.Tax.Add(taxTypeDTO);

                        CdPremiumDTO.TaxAmount = taxAmountDTO;
                        CdPremiumDTO.Type = "AD";
                        CdPremiumDTO.TxnAmount = NewBasePremium;
                        CdPremiumDTO.TotalAmount = NewBasePremium + taxAmountDTO.TaxAmount;

                        micaCDDTO.PremiumDTO.Add(CdPremiumDTO);
                        micaCDDTO.TxnType = "Debit";
                        micaCDDTO.Type = "SwitchOnOff";
                        micaCDDTO.TxnAmount = NewBasePremium;
                        micaCDDTO.TaxAmount = taxAmountDTO.TaxAmount;
                        micaCDDTO.TotalAmount = micaCDDTO.TxnAmount + micaCDDTO.TaxAmount;

                        ExtCdModel.micaCDDTO.Add(micaCDDTO);
                        ExtCdModel.AccountNo = AccountNumber;
                        ExtCdModel.Description = "Switch On - Revised Premium for Policy - " + PolicyNo;
                        ExtCdModel.Frequency = BillingFrequency;

                        //CdModel.AccountNo = PolicyNo;
                        //CdModel.TxnAmount = Convert.ToDecimal(FinalPremium);
                        //CdModel.TxnType = "Debit";//HarCoded
                        //CdModel.PaymentId = Convert.ToDecimal(_configuration["CdModel:PaymentId"]); //HarCoded as Per Ashish Sir
                        //CdModel.Description = "Revised Premium for Policy - " + PolicyNo;


                        //var CallMicaCd = await _integrationService.GenerateCDTransaction(CdModel, apiContext);

                        var CallMicaCd = await _integrationService.MasterCDACC(ExtCdModel, context);



                        if (CallMicaCd != null)
                        {
                            //bookingLog = new TblPremiumBookingLog();
                            //bookingLog.PolicyNo = PolicyNo;

                            bookingLog.TxnAmount = FinalPremium;
                            bookingLog.BasePremium = NewBasePremium;
                            bookingLog.FromTax = NewFromTax;
                            bookingLog.ToTax = NewToTax;
                            bookingLog.TxnDateTime = IndianTime;
                            bookingLog.TxnDetails = "Revised Premium - CD Transaction Successfully Updated in MICA";
                            bookingLog.TxnStatus = true;
                            _context.TblPremiumBookingLog.Update(bookingLog);



                            var tblDailyActive = _context.TblDailyActiveVehicles.FirstOrDefault(x => x.TxnDate.Value.Date == IndianTime.Date &&
                                                                                                x.PolicyNumber == PolicyNo);

                            tblDailyActive.TotalPremium = NewPremium;
                            tblDailyActive.BasePremium = ADPERDAY;
                            tblDailyActive.FromTax = ADFROMTAXPERDAY;
                            tblDailyActive.ToTax = ADTOTAXPERDAY;

                            if (activeVehicleStat != null)
                            {
                                //Update Number of Active Vehicle is Daily Active Table
                                tblDailyActive.ActivePc = activeVehicleStat.ActivePc;
                                tblDailyActive.ActiveTw = activeVehicleStat.ActiveTw;

                            }


                            _context.TblDailyActiveVehicles.Update(tblDailyActive);

                            _context.SaveChanges();



                        }
                        else
                        {
                            //bookingLog = new TblPremiumBookingLog();
                            //bookingLog.PolicyNo = PolicyNo;

                            bookingLog.TxnAmount = NewPremium;
                            bookingLog.BasePremium = ADPERDAY;
                            bookingLog.FromTax = ADFROMTAXPERDAY;
                            bookingLog.ToTax = ADTOTAXPERDAY;
                            bookingLog.TxnDateTime = IndianTime;
                            bookingLog.TxnDetails = "Revised Premium - Transaction Failed while Updating CD Balance MICA";
                            bookingLog.TxnStatus = false;
                            _context.TblPremiumBookingLog.Update(bookingLog);
                            _context.SaveChanges();

                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "MICA CD Balance Update Method Failed";
                            response.Id = bookingLog.LogId.ToString();//Log Id is Sent to Verify 
                            response.Status = BusinessStatus.Error;
                            errorInfo.ErrorMessage = "The Vehicle Number: " + VehicleRegistrationNo + " CD Balance not Updated Yet Check Log";
                            errorInfo.ErrorCode = "ExtSWT009";
                            errorInfo.PropertyName = "CDUpdateFail";
                            response.Errors.Add(errorInfo);

                            return response;
                        }


                    }
                    else
                    {
                        TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = PolicyNo;
                        bookingLog.TxnAmount = 0;
                        bookingLog.BasePremium = 0;
                        bookingLog.FromTax = 0;
                        bookingLog.ToTax = 0;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnDetails = "Transaction Failed while Calculating Premium";
                        bookingLog.TxnStatus = false;
                        _context.TblPremiumBookingLog.Add(bookingLog);
                        _context.SaveChanges();

                        SwitchOnOffResponse response = new SwitchOnOffResponse();
                        ErrorInfo errorInfo = new ErrorInfo();

                        response.ResponseMessage = "Calculate Premium Method Failed";
                        response.Id = bookingLog.LogId.ToString();//Log Id is Sent to Verify 
                        response.Status = BusinessStatus.Error;
                        errorInfo.ErrorMessage = "The Vehicle Number" + VehicleRegistrationNo + "Premium not Calculated Yet Check Log";
                        errorInfo.ErrorCode = "ExtSWT008";
                        errorInfo.PropertyName = "PremiumFail";
                        response.Errors.Add(errorInfo);

                        return response;

                    }

                }


                SuccessResponse.ResponseMessage = "Successfully Switch ON";
                SuccessResponse.Status = BusinessStatus.Updated;

            }
            else if (!String.IsNullOrEmpty(VehicleRegistrationNo) && !String.IsNullOrEmpty(PolicyNo) && SwitchStatus == false)
            {
                var Check = CheckPolicyStatus(switchOnOff.PolicyNo);
                if (Check == true)
                {
                    SwitchOnOffResponse response = new SwitchOnOffResponse();
                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "Policy is Cancelled";
                    response.Status = BusinessStatus.Ok;
                    errorInfo.ErrorMessage = "Trasactions are not allowed.Policy is Cancelled";
                    errorInfo.ErrorCode = "ExtCUS";
                    errorInfo.PropertyName = "PolicyCancelled";
                    response.Errors.Add(errorInfo);
                    return response;
                }

                bool verifydata = false;

                var verifyPolicy = _context.TblSchedule.Any(x => x.PolicyNo == PolicyNo);

                if (verifyPolicy)
                {
                    var verifyVehicle = _context.TblSchedule.Any(x => x.VehicleRegistrationNo == VehicleRegistrationNo);

                    if (verifyVehicle)
                    {
                        verifydata = _context.TblSchedule.Any(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo);
                    }
                    else
                    {
                        //Return Wrong DATA
                        SwitchOnOffResponse response = new SwitchOnOffResponse();

                        ErrorInfo errorInfo = new ErrorInfo();

                        response.ResponseMessage = "No Records Found for the Sent Inputs";
                        response.Status = BusinessStatus.NotFound;
                        errorInfo.ErrorMessage = "No Records Found for this Vehicle Number: " + VehicleRegistrationNo + "  in Schedule";
                        errorInfo.ErrorCode = "ExtSWT002";
                        errorInfo.PropertyName = "Vehicle Number";
                        response.Errors.Add(errorInfo);

                        return response;
                    }
                }
                else
                {
                    //Return Wrong DATA
                    SwitchOnOffResponse response = new SwitchOnOffResponse();

                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "No Records Found for the Sent Inputs";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "No Records Found for this Policy Number: " + PolicyNo + " in Schedule";
                    errorInfo.ErrorCode = "ExtSWT001";
                    errorInfo.PropertyName = "Policy Number";
                    response.Errors.Add(errorInfo);
                    return response;
                }


                if (verifydata)
                {
                    checkLog = _context.TblSwitchLog.LastOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleNumber == VehicleRegistrationNo && x.CreatedDate.Value.Date == IndianTime.Date);
                    ScheduleData = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo);

                }
                else
                {
                    //Return Wrong DATA
                    SwitchOnOffResponse response = new SwitchOnOffResponse();
                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "No Records Found for the Sent Inputs";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "No Records Found for this Policy Number: " + PolicyNo + " & Vehicle Number: " + VehicleRegistrationNo + "  in Schedule";
                    errorInfo.ErrorCode = "ExtSWT003";
                    errorInfo.PropertyName = "Policy Number & Vehicle Number";
                    response.Errors.Add(errorInfo);

                    return response;
                }

                if (CurrentTimeHour < Convert.ToDecimal(_configuration["Scheduler_Validation:TimeInHours"]))
                {

                    if (checkLog != null)
                    {
                        if (checkLog.SwitchStatus == true && checkLog.SwitchType == "Auto")
                        {
                            TblSwitchLog tblSwitchlog = new TblSwitchLog();

                            tblSwitchlog.PolicyNo = PolicyNo;
                            tblSwitchlog.VehicleNumber = VehicleRegistrationNo;
                            tblSwitchlog.SwitchStatus = false;
                            tblSwitchlog.CreatedDate = IndianTime;
                            tblSwitchlog.SwitchType = "Manual";

                            _context.TblSwitchLog.Add(tblSwitchlog);

                            if (ScheduleData.VehicleType == "PC")
                            {
                                var DailyData = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == PolicyNo && x.TxnDate.Value.Date == IndianTime.Date);

                                if (DailyData != null)
                                {
                                    DailyData.ActivePc = DailyData.ActivePc - 1;
                                    _context.TblDailyActiveVehicles.Update(DailyData);
                                }
                                else
                                {
                                    //TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();

                                    //tblDailyActive.PolicyNumber = PolicyNo;
                                    //tblDailyActive.ActivePc = 0;
                                    //tblDailyActive.ActiveTw = 0;
                                    //tblDailyActive.TotalPremium = 0;
                                    //tblDailyActive.TxnDate = IndianTime;
                                    //tblDailyActive.FromTax = 0;
                                    //tblDailyActive.ToTax = 0;
                                    //tblDailyActive.BasePremium = 0;

                                    //_context.TblDailyActiveVehicles.Add(tblDailyActive);
                                }

                            }
                            else if (ScheduleData.VehicleType == "TW")
                            {
                                var DailyData = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == PolicyNo && x.TxnDate.Value.Date == IndianTime.Date);

                                if (DailyData != null)
                                {
                                    DailyData.ActiveTw = DailyData.ActiveTw - 1;
                                    _context.TblDailyActiveVehicles.Update(DailyData);
                                }
                                else
                                {
                                    //TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();

                                    //tblDailyActive.PolicyNumber = PolicyNo;
                                    //tblDailyActive.ActivePc = 0;
                                    //tblDailyActive.ActiveTw = 0;
                                    //tblDailyActive.TotalPremium = 0;
                                    //tblDailyActive.TxnDate = IndianTime;
                                    //tblDailyActive.FromTax = 0;
                                    //tblDailyActive.ToTax = 0;
                                    //tblDailyActive.BasePremium = 0;

                                    //_context.TblDailyActiveVehicles.Add(tblDailyActive);

                                }

                            }


                            _context.SaveChanges();
                        }
                        else
                        {
                            //Return Error for Manually Switched On Before
                            //Already Manual On its Cannot be SwitchedOFF for that Day
                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "Manual Switch is On Already";
                            response.Status = BusinessStatus.Ok;
                            errorInfo.ErrorMessage = "Vehicle Number: " + VehicleRegistrationNo + " is already On for the Day cannot be turned OFF";
                            errorInfo.ErrorCode = "ExtSWT005";
                            errorInfo.PropertyName = "ManualOFF";
                            response.Errors.Add(errorInfo);

                            return response;

                        }
                    }
                    else
                    {
                        bool? CurrentDayStat = false;

                        switch (CurrentDay)
                        {
                            case "Monday":
                                CurrentDayStat = ScheduleData.Mon;
                                break;

                            case "Tuesday":
                                CurrentDayStat = ScheduleData.Tue;
                                break;


                            case "Wednesday":
                                CurrentDayStat = ScheduleData.Wed;
                                break;


                            case "Thursday":
                                CurrentDayStat = ScheduleData.Thu;
                                break;


                            case "Friday":
                                CurrentDayStat = ScheduleData.Fri;
                                break;


                            case "Saturday":
                                CurrentDayStat = ScheduleData.Sat;
                                break;



                            case "Sunday":
                                CurrentDayStat = ScheduleData.Sun;
                                break;

                        }

                        if (CurrentDayStat == true)
                        {
                            TblSwitchLog tblSwitchlog = new TblSwitchLog();

                            tblSwitchlog.PolicyNo = PolicyNo;
                            tblSwitchlog.VehicleNumber = VehicleRegistrationNo;
                            tblSwitchlog.SwitchStatus = false;
                            tblSwitchlog.CreatedDate = IndianTime;
                            tblSwitchlog.SwitchType = "Manual";


                            _context.TblSwitchLog.Add(tblSwitchlog);

                            if (ScheduleData.VehicleType == "PC")
                            {
                                var DailyData = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == PolicyNo && x.TxnDate.Value.Date == IndianTime.Date);

                                if(DailyData != null)
                                {
                                    DailyData.ActivePc = DailyData.ActivePc - 1;
                                    _context.TblDailyActiveVehicles.Update(DailyData);
                                }
                                else
                                {
                                    //TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();

                                    //tblDailyActive.PolicyNumber = PolicyNo;
                                    //tblDailyActive.ActivePc = 0;
                                    //tblDailyActive.ActiveTw = 0;
                                    //tblDailyActive.TotalPremium = 0;
                                    //tblDailyActive.TxnDate = IndianTime;
                                    //tblDailyActive.FromTax = 0;
                                    //tblDailyActive.ToTax = 0;
                                    //tblDailyActive.BasePremium = 0;

                                    //_context.TblDailyActiveVehicles.Add(tblDailyActive);
                                }

                            }
                            else if (ScheduleData.VehicleType == "TW")
                            {
                                var DailyData = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == PolicyNo && x.TxnDate.Value.Date == IndianTime.Date);

                                if (DailyData != null)
                                {
                                    DailyData.ActiveTw = DailyData.ActiveTw - 1;
                                    _context.TblDailyActiveVehicles.Update(DailyData);
                                }
                                else
                                {
                                    //TblDailyActiveVehicles tblDailyActive = new TblDailyActiveVehicles();

                                    //tblDailyActive.PolicyNumber = PolicyNo;
                                    //tblDailyActive.ActivePc = 0;
                                    //tblDailyActive.ActiveTw = 0;
                                    //tblDailyActive.TotalPremium = 0;
                                    //tblDailyActive.TxnDate = IndianTime;
                                    //tblDailyActive.FromTax = 0;
                                    //tblDailyActive.ToTax = 0;
                                    //tblDailyActive.BasePremium = 0;

                                    //_context.TblDailyActiveVehicles.Add(tblDailyActive);

                                }

                            }


                            _context.SaveChanges();
                        }
                        else
                        {
                            ///Throw Error
                            ///Switch ALREADY OFF
                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "The Switch is Already On";
                            response.Status = BusinessStatus.Ok;
                            errorInfo.ErrorMessage = "The Vehicle Number: " + VehicleRegistrationNo + " is already OFF";
                            errorInfo.ErrorCode = "ExtSWT006";
                            errorInfo.PropertyName = "Already SwitchOFF";
                            response.Errors.Add(errorInfo);

                            return response;
                        }

                    }

                }
                else
                {

                    //return Switch OFF Not Possible
                    SwitchOnOffResponse response = new SwitchOnOffResponse();
                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "The Switch Cannot be Off for the Day as Premium is Charged";
                    response.Status = BusinessStatus.Ok;
                    errorInfo.ErrorMessage = "The Vehicle Number: " + VehicleRegistrationNo + " Cannot be Switched OFF Now";
                    errorInfo.ErrorCode = "ExtSWT007";
                    errorInfo.PropertyName = "NoSwitchOff";
                    response.Errors.Add(errorInfo);

                    return response;

                }

                SuccessResponse.ResponseMessage = "Successfully Switch OFF";
                SuccessResponse.Status = BusinessStatus.Updated;

            }

            return SuccessResponse;
        }


        public async Task<bool> NightScheduler(DateTime? dateTime, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            DateTime? IndianTime = null;

            IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            var CurrentDay = IndianTime.Value.DayOfWeek.ToString();
            var CurrentTimeHour = IndianTime.Value.Hour;

            if (dateTime != null)
            {
                IndianTime = dateTime;
                CurrentDay = dateTime.Value.DayOfWeek.ToString();
                CurrentTimeHour = dateTime.Value.Hour;
            }


            TblSwitchLog switchLog = new TblSwitchLog();
            TblDailyActiveVehicles dailyActiveVehicles = new TblDailyActiveVehicles();

            var ActivePC = 0;
            var ActiveTW = 0;

            string ProductCode = _configuration["Mica_ApiContext:ProductCode"].ToString();
           

            var PolicyDetails = await _integrationService.GetPolicyList(ProductCode, context);


            if (PolicyDetails == null || PolicyDetails.Count == 0)
            {
                return false;
            }

            var PolicyNumberList = PolicyDetails.Select(x => x.PolicyNumber).ToList();

            PolicyNumberList.Distinct();

            foreach (var policy in PolicyNumberList)
            {
                ActivePC = 0;
                ActiveTW = 0;

                var ScheduleData = _context.TblSchedule.Where(x => x.PolicyNo == policy && x.IsActive == true).ToList();

                bool? CurrentDayStat = false;

                foreach (var schedule in ScheduleData)
                {

                    switch (CurrentDay)
                    {
                        case "Monday":
                            CurrentDayStat = schedule.Mon;
                            break;

                        case "Tuesday":
                            CurrentDayStat = schedule.Tue;
                            break;


                        case "Wednesday":
                            CurrentDayStat = schedule.Wed;
                            break;


                        case "Thursday":
                            CurrentDayStat = schedule.Thu;
                            break;


                        case "Friday":
                            CurrentDayStat = schedule.Fri;
                            break;


                        case "Saturday":
                            CurrentDayStat = schedule.Sat;
                            break;



                        case "Sunday":
                            CurrentDayStat = schedule.Sun;
                            break;

                    }

                    if (CurrentDayStat == true)
                    {
                        switchLog = new TblSwitchLog();
                        switchLog.PolicyNo = policy;
                        switchLog.VehicleNumber = schedule.VehicleRegistrationNo;
                        switchLog.SwitchStatus = true;
                        switchLog.SwitchType = "Auto";
                        switchLog.CreatedDate = IndianTime;

                        _context.TblSwitchLog.Add(switchLog);
                        _context.SaveChanges();


                        if (schedule.VehicleType == "PC")
                        {
                            ActivePC += 1;
                        }
                        else if (schedule.VehicleType == "TW")
                        {
                            ActiveTW += 1;
                        }

                    }
                    else if (CurrentDayStat == false)
                    {
                        switchLog = new TblSwitchLog();
                        switchLog.PolicyNo = policy;
                        switchLog.VehicleNumber = schedule.VehicleRegistrationNo;
                        switchLog.SwitchStatus = false;
                        switchLog.SwitchType = "Auto";
                        switchLog.CreatedDate = IndianTime;

                        _context.TblSwitchLog.Add(switchLog);
                        _context.SaveChanges();
                    }
                }

                if (ActivePC > 0 || ActiveTW > 0)
                {

                    var checkactivity = _context.TblDailyActiveVehicles.Any(x => x.PolicyNumber == policy && x.TxnDate == IndianTime.Value.Date);

                    if (checkactivity == true)
                    {
                        var activitydata = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == policy && x.TxnDate == IndianTime.Value.Date);

                        activitydata.ActivePc = ActivePC;
                        activitydata.ActiveTw = ActiveTW;
                        activitydata.TxnDate = IndianTime;
                        activitydata.BasePremium = 0;
                        activitydata.FromTax = 0;
                        activitydata.ToTax = 0;
                        activitydata.TotalPremium = 0;

                        _context.TblDailyActiveVehicles.Update(activitydata);
                        _context.SaveChanges();

                    }
                    else if (checkactivity == false)
                    {

                        dailyActiveVehicles = new TblDailyActiveVehicles();

                        dailyActiveVehicles.PolicyNumber = policy;
                        dailyActiveVehicles.ActivePc = ActivePC;
                        dailyActiveVehicles.ActiveTw = ActiveTW;
                        dailyActiveVehicles.TxnDate = IndianTime;
                        dailyActiveVehicles.BasePremium = 0;
                        dailyActiveVehicles.FromTax = 0;
                        dailyActiveVehicles.ToTax = 0;
                        dailyActiveVehicles.TotalPremium = 0;

                        _context.TblDailyActiveVehicles.Add(dailyActiveVehicles);
                        _context.SaveChanges();

                    }
                }
            }

            return true;

        }

        public async Task<bool> PremiumBookingScheduler(DateTime? dateTime, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            DateTime? IndianTime = null;
            IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentDay = IndianTime.Value.DayOfWeek.ToString();
            var CurrentTimeHour = IndianTime.Value.Hour;
            var CurrentDate = IndianTime.Value.Date;


            if (dateTime != null)
            {
                IndianTime = dateTime;
                CurrentDay = dateTime.Value.DayOfWeek.ToString();
                CurrentTimeHour = dateTime.Value.Hour;
                CurrentDate = dateTime.Value.Date;
            }


            string ProductCode = _configuration["Mica_ApiContext:ProductCode"].ToString();
          
            TblSwitchLog switchLog = new TblSwitchLog();
            TblSchedule ScheduleData = new TblSchedule();
            TblSchedulerLog schedulerLog = new TblSchedulerLog();
            TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();
            TblDailyActiveVehicles dailyActiveVehicles = new TblDailyActiveVehicles();
            TblScheduleReport scheduleReport = new TblScheduleReport();


            var PolicyNumberList = _context.TblDailyActiveVehicles.Where(x => x.TxnDate.Value.Date == CurrentDate).Select(x => x.PolicyNumber).Distinct().ToList();

            if(PolicyNumberList.Count < 0)
            {
                return false;
            }

            scheduleReport.ScheduleStartDate = IndianTime;
            scheduleReport.SuccessCount = 0;
            scheduleReport.FailCount = 0;
            scheduleReport.IsActive = true;

            var tblreport = _context.TblScheduleReport.Add(scheduleReport);
            _context.SaveChanges();


            var ReportID = scheduleReport.ReportId;

           
            foreach (var policy in PolicyNumberList)
            {

                var checkPolicyCancel = CheckPolicyStatus(policy);

                if(checkPolicyCancel == true)
                {
                    continue;
                }


                schedulerLog = new TblSchedulerLog();              

                schedulerLog.SchedulerDateTime = IndianTime;
                schedulerLog.SchedulerStatus = "Running";

                _context.TblSchedulerLog.Add(schedulerLog);
                _context.SaveChanges();

                var BillingFrequency = "";
                var AccountNumber = "";
                
                List<DeletionHandleDTO> VehicleListPolicy = new List<DeletionHandleDTO>();

                //Call the Policy Service to Get Policy Details.
                //An Integration Call to  be Made and Recive the Data as this Model PolicyPremiumDetailsDTO
                var PolicyData = await _integrationService.InternalGetPolicyDetailsByNumber(policy, context);


                PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();
                try
                {
                    if (PolicyData != null)
                    {

                        detailsDTO.SumInsured = PolicyData["si"];
                        detailsDTO.NoOfPC = PolicyData["noOfPC"];
                        detailsDTO.NoOfTW = PolicyData["noOfTW"];
                        detailsDTO.PD_Age = PolicyData["driverAge"];
                        detailsDTO.PD_DriveExperince = PolicyData["driverExp"];
                        detailsDTO.AdditionalDriver = PolicyData["additionalDriver"];
                        detailsDTO.StateCode = PolicyData["stateCode"];
                        BillingFrequency = PolicyData["billingFrequency"];
                        AccountNumber = PolicyData["CDAccountNumber"];

                        var VehicleRiskItem = PolicyData["InsurableItem"][1]["RiskItems"];

                        foreach (var item in VehicleRiskItem)
                        {
                            DeletionHandleDTO deletionHandle = new DeletionHandleDTO();

                                deletionHandle.VehicleNumber = item["Vehicle Number"];                         
                                deletionHandle.VehicleType = item["Vehicle Type"];
                         
                            if(!String.IsNullOrEmpty(deletionHandle.VehicleNumber) && !String.IsNullOrEmpty(deletionHandle.VehicleType))
                            {
                                VehicleListPolicy.Add(deletionHandle);
                            }
                        }

                        var scheduledata = _context.TblSchedule.Where(x=>x.PolicyNo == policy).ToList();
                                               
                        if (VehicleListPolicy.Count != scheduledata.Count())
                        {
                            var makeVehicleInactive = VehicleInactive(VehicleListPolicy, scheduledata);
                        }

                    }

                }
                catch (Exception ex)
                {
                    schedulerLog.SchedulerStatus = policy + " - No Record Found for this Policy Number";
                    _context.TblSchedulerLog.Update(schedulerLog);

                    var report = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

                    report.FailCount += 1;
                    _context.TblScheduleReport.Update(report);
                    _context.SaveChanges();
                    continue;
                }


                var getDailyStat = _context.TblDailyActiveVehicles.LastOrDefault(x => x.TxnDate.Value.Date == CurrentDate && x.PolicyNumber == policy);

                if(getDailyStat == null)
                {
                    continue;
                }

                var ActivePCCount = getDailyStat.ActivePc;
                var ActiveTWCount = getDailyStat.ActiveTw;



                //CalculatePremiumObject
                SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

                //RuleObject
                premiumDTO.dictionary_rule.SI = detailsDTO.SumInsured.ToString(); //Verify
                premiumDTO.dictionary_rule.NOOFPC = detailsDTO.NoOfPC.ToString();
                premiumDTO.dictionary_rule.NOOFTW = detailsDTO.NoOfTW.ToString();


                //RateObject

                premiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince.ToString();
                premiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age.ToString();
                premiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver.ToString(); //Verify
                premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = ActivePCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = ActivePCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = ActiveTWCount.ToString();


                var taxType = await TaxTypeForStateCode(detailsDTO.StateCode, context);

                premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE; //Call TaxType //Verify
                premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE; //Call TaxType //Verify


                //Call CalculatePremium Policy Module MICA
                var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, context);

                List<CalculationResult> DeserilizedPremiumData = new List<CalculationResult>();
                CDDTO CdModel = new CDDTO();
                ExtCDDTO ExtCdModel = new ExtCDDTO();
                MicaCDDTO micaCDDTO = new MicaCDDTO();
                CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();
                CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
                CDPremiumDTO CdPremiumDTO = new CDPremiumDTO();
                decimal ADPERDAY = 0;
                decimal ADFROMTAXPERDAY = 0;
                decimal ADTOTAXPERDAY = 0;

                if (CalPremiumResponse != null)
                {
                    try
                    {
                        DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());

                    }
                    catch (Exception Ex)
                    {
                        DeserilizedPremiumData = null;

                        bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = policy;
                        bookingLog.TxnAmount = 0;
                        bookingLog.BasePremium = 0;
                        bookingLog.FromTax = 0;
                        bookingLog.ToTax = 0;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnDetails = "Auto Schedule Transaction Failed while Calculating Premium";
                        bookingLog.TxnStatus = false;
                        _context.TblPremiumBookingLog.Add(bookingLog);


                        schedulerLog.SchedulerStatus = "Deserialized Failed - Calculate Premium Failed";
                        schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                        _context.TblSchedulerLog.Update(schedulerLog);

                        var report = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

                        report.FailCount += 1;

                        _context.TblScheduleReport.Update(report);

                        _context.SaveChanges();

                        continue;
                    }
                }



                if (DeserilizedPremiumData.Count() > 0)
                {
                    //ADPMPD IS THE PER DAY AD RATE CONFIG IN RATING CONFIG MODULE
                    ADPERDAY = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "ADPMPD").EValue);


                    EndorsementCalDTO endorsementCal = new EndorsementCalDTO();

                    //Rule
                    endorsementCal.dictionary_rule.FT = "0";
                    endorsementCal.dictionary_rule.FTDAYS = "0";
                    endorsementCal.dictionary_rule.AD = ADPERDAY.ToString();
                    endorsementCal.dictionary_rule.ADDAYS = "1";
                    //Rate
                    endorsementCal.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                    endorsementCal.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

                    //TO GET AD PERDAY - FROM TAX AND TO TAX Because its not coming from rating Module
                    var callEndoCalculator = await EndorsementCalculator(endorsementCal,context);

                    if (callEndoCalculator.Count > 0)
                    {
                        ADFROMTAXPERDAY = Convert.ToDecimal(callEndoCalculator.FirstOrDefault(x => x.Entity == "ADFTTAX").EValue);
                        ADTOTAXPERDAY = Convert.ToDecimal(callEndoCalculator.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue);
                    }
                    else
                    {
                        DeserilizedPremiumData = null;

                        bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = policy;
                        bookingLog.TxnAmount = 0;
                        bookingLog.BasePremium = 0;
                        bookingLog.FromTax = 0;
                        bookingLog.ToTax = 0;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnDetails = "Auto Schedule Transaction Failed while Endorsement - Calculating Premium";
                        bookingLog.TxnStatus = false;
                        _context.TblPremiumBookingLog.Add(bookingLog);


                        schedulerLog.SchedulerStatus = "Deserialized Failed - Endorsement Premium Failed";
                        schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                        _context.TblSchedulerLog.Update(schedulerLog);

                        var report = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

                        report.FailCount += 1;

                        _context.TblScheduleReport.Update(report);

                        _context.SaveChanges();

                        continue;
                    }

                    var Premium = ADPERDAY + ADFROMTAXPERDAY + ADTOTAXPERDAY;

                    schedulerLog.SchedulerStatus = "Calculate Premium Success";
                    schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                    _context.TblSchedulerLog.Update(schedulerLog);

                    _context.SaveChanges();

                    taxAmountDTO.TaxAmount = ADFROMTAXPERDAY + ADTOTAXPERDAY;
                    taxTypeDTO.Type = taxType.FSTTAX_TAXTYPE;
                    taxTypeDTO.TaxAmount = ADFROMTAXPERDAY;
                    taxAmountDTO.Tax.Add(taxTypeDTO);

                    taxTypeDTO = new CDTaxTypeDTO();
                    taxTypeDTO.Type = taxType.TSTTAX_TAXTYPE;
                    taxTypeDTO.TaxAmount = ADTOTAXPERDAY;
                    taxAmountDTO.Tax.Add(taxTypeDTO);

                    CdPremiumDTO.TaxAmount = taxAmountDTO;
                    CdPremiumDTO.Type = "AD";
                    CdPremiumDTO.TxnAmount = ADPERDAY;
                    CdPremiumDTO.TotalAmount = ADPERDAY + taxAmountDTO.TaxAmount;

                    micaCDDTO.PremiumDTO.Add(CdPremiumDTO);
                    micaCDDTO.TxnType = "Debit";
                    micaCDDTO.Type = "PremiumBooking";
                    micaCDDTO.TxnAmount = ADPERDAY;
                    micaCDDTO.TaxAmount = taxAmountDTO.TaxAmount;
                    micaCDDTO.TotalAmount = micaCDDTO.TxnAmount + micaCDDTO.TaxAmount;

                    ExtCdModel.micaCDDTO.Add(micaCDDTO);
                    ExtCdModel.AccountNo = AccountNumber;
                    ExtCdModel.Description = "Auto Schedule Premium for Policy - " + policy;
                    ExtCdModel.Frequency = BillingFrequency;

                    var CallMicaCd = await _integrationService.MasterCDACC(ExtCdModel, context);


                    if (CallMicaCd != null)
                    {
                        bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = policy;
                        bookingLog.TxnAmount = Premium;
                        bookingLog.BasePremium = ADPERDAY;
                        bookingLog.FromTax = ADFROMTAXPERDAY;
                        bookingLog.ToTax = ADTOTAXPERDAY;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnStatus = true;
                        bookingLog.TxnDetails = "Auto Schedule Premium for Policy - " + policy;

                        _context.TblPremiumBookingLog.Add(bookingLog);


                        getDailyStat.TotalPremium = Premium;
                        getDailyStat.BasePremium = ADPERDAY;
                        getDailyStat.FromTax = ADFROMTAXPERDAY;
                        getDailyStat.ToTax = ADTOTAXPERDAY;

                        //var tblDailyActive = _context.TblDailyActiveVehicles.FirstOrDefault(x => x.TxnDate == IndianTime &&
                        //                                                                    x.PolicyNumber == policy);

                        //  tblDailyActive.Premium = Premium;

                        _context.TblDailyActiveVehicles.Update(getDailyStat);

                        schedulerLog.SchedulerStatus = "CD Update Success";
                        schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                        _context.TblSchedulerLog.Update(schedulerLog);

                        var report = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

                        report.SuccessCount += 1;

                        _context.TblScheduleReport.Update(report);
                        _context.SaveChanges();

                    }
                    else
                    {
                        bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = policy;
                        bookingLog.TxnAmount = Premium;
                        bookingLog.BasePremium = ADPERDAY;
                        bookingLog.FromTax = ADFROMTAXPERDAY;
                        bookingLog.ToTax = ADTOTAXPERDAY;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnStatus = false;
                        bookingLog.TxnDetails = "Auto Schedule - Transaction Failed while Updating CD Balance MICA";

                        _context.TblPremiumBookingLog.Add(bookingLog);

                        schedulerLog.SchedulerStatus = "CD Update Failed";
                        schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                        _context.TblSchedulerLog.Update(schedulerLog);

                        var report = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

                        report.FailCount += 1;

                        _context.TblScheduleReport.Update(report);

                        _context.SaveChanges();
                    }


                }
                else
                {
                    bookingLog = new TblPremiumBookingLog();

                    bookingLog.PolicyNo = policy;
                    bookingLog.TxnAmount = 0;
                    bookingLog.BasePremium = 0;
                    bookingLog.FromTax = 0;
                    bookingLog.ToTax = 0;
                    bookingLog.TxnDateTime = IndianTime;
                    bookingLog.TxnStatus = false;
                    bookingLog.TxnDetails = "Auto Schedule Transaction Failed while Calculating Premium";

                    _context.TblPremiumBookingLog.Add(bookingLog);


                    schedulerLog.SchedulerStatus = "Calculate Premium Failed";
                    schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                    _context.TblSchedulerLog.Update(schedulerLog);

                    var report = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

                    report.FailCount += 1;

                    _context.TblScheduleReport.Update(report);

                    _context.SaveChanges();

                    continue;

                }

            }

            var Endreport = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

            Endreport.ScheduleEndDate = System.DateTime.UtcNow.AddMinutes(330);
            Endreport.IsActive = false;

            _context.TblScheduleReport.Update(Endreport);
            _context.SaveChanges();

            return true;
        }

        private TblDailyActiveVehicles CheckPremiumUpdate(string PolicyNo)
        {
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            TblDailyActiveVehicles tblDailyActive = null;

            var checkPremium = _context.TblDailyActiveVehicles.FirstOrDefault(x => x.TxnDate.Value.Date == IndianTime.Date && x.PolicyNumber == PolicyNo);

            if (checkPremium != null)
            {
                tblDailyActive = checkPremium;
            }

            return tblDailyActive;
        }

        public async Task<ActivityResponse> ActivityReport(string PolicyNo, string Month, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            var getMonthNumber = 0;
            ActivityResponse response = new ActivityResponse();
            ErrorInfo errorInfo = new ErrorInfo();

            if (!String.IsNullOrEmpty(PolicyNo) && !String.IsNullOrEmpty(Month))
            {
                try
                {
                    getMonthNumber = DateTime.ParseExact(Month, "MMMM", CultureInfo.CurrentCulture).Month;
                }
                catch
                {
                    response.ResponseMessage = "NO Such Month";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "No Such Month Name: " + Month;
                    errorInfo.ErrorCode = "GEN001";
                    errorInfo.PropertyName = "NoRecords";
                    response.Errors.Add(errorInfo);
                    return response;
                }

                var checkPolicyNo = _context.TblSwitchLog.Any(x => x.PolicyNo == PolicyNo);

                if (checkPolicyNo)
                {
                    var logData = _context.TblSwitchLog.Where(x => x.PolicyNo == PolicyNo && x.CreatedDate.Value.Month == getMonthNumber)
                                                    .Select(x => new ActivityDTO
                                                    {
                                                        DateTime = x.CreatedDate,
                                                        VehicleNo = x.VehicleNumber,
                                                        SwitchState = x.SwitchStatus.ToString(),
                                                        SwitchType = x.SwitchType
                        
                            }).ToList();

                   // var filter = logData.Where(x => x.DateTime.Value.Date == (Convert.ToDateTime(2020 - 04 - 01).Date)).Select(c => c);
                    if (logData.Count > 0)
                    {
                        response.ActivityDTO = logData;
                        response.Status = BusinessStatus.Ok;
                        return response;
                    }
                    else
                    {
                        response.ResponseMessage = "NO Records found for this Month";
                        response.Status = BusinessStatus.PreConditionFailed;
                        errorInfo.ErrorMessage = "For " + Month + " Month No Records for this Policy Number: " + PolicyNo;
                        errorInfo.ErrorCode = "GEN001";
                        errorInfo.PropertyName = "NoRecords";
                        response.Errors.Add(errorInfo);
                        response.Status = BusinessStatus.Error;
                        return response;
                    }

                }
                else
                {
                    response.ResponseMessage = "NO Records found";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "No Records for this Policy Number: " + PolicyNo;
                    errorInfo.ErrorCode = "GEN001";
                    errorInfo.PropertyName = "NoRecords";
                    response.Errors.Add(errorInfo);
                    return response;
                }

            }
            else
            {
                response.ResponseMessage = "Null/Empty Inputs";
                response.Status = BusinessStatus.NotFound;
                errorInfo.ErrorMessage = "Either Policy Number or Month is Null";
                errorInfo.ErrorCode = "GEN002";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;
            }

        }
         
        public async Task<AllScheduleResponse> GetAllVehicleSchedule(string PolicyNo, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            AllScheduleResponse response = new AllScheduleResponse();

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentTimeHour = IndianTime.Hour;

            var data = _context.TblSchedule.Where(x => x.PolicyNo == PolicyNo).ToList();

            foreach (var scheduledata in data)
            {
                GetScheduleDTO getSchedule = new GetScheduleDTO();

                var checkstatus = _context.TblSwitchLog.LastOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleNumber == scheduledata.VehicleRegistrationNo
                                                                    && x.CreatedDate.Value.Date == IndianTime.Date);


                getSchedule.PolicyNo = PolicyNo;
                getSchedule.VehicleRegistrationNo = scheduledata.VehicleRegistrationNo;
                getSchedule.Mon = scheduledata.Mon;
                getSchedule.Tue = scheduledata.Mon;
                getSchedule.Wed = scheduledata.Wed;
                getSchedule.Thu = scheduledata.Thu;
                getSchedule.Fri = scheduledata.Fri;
                getSchedule.Sat = scheduledata.Sat;
                getSchedule.Sun = scheduledata.Sun;
                getSchedule.VehicleType = scheduledata.VehicleType;
                getSchedule.SwitchStatus = checkstatus.SwitchStatus;

                if (CurrentTimeHour < Convert.ToDecimal(_configuration["Scheduler_Validation:TimeInHours"]))
                {
                    getSchedule.SwitchEnabled = true;
                }
                else
                {
                    getSchedule.SwitchEnabled = false;
                }

                response.GetSchedule.Add(getSchedule);

            }

            return response;

        }

        public async Task<List<ddDTO>> GetVehicleMaster(string lMasterlist, ApiContext context)
        {
            LoggerManager logger = new LoggerManager(_configuration);
            logger.LogRequest("GetVehicleMaster", "GetVehicleMaster", "Testing", "1", context);

            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            logger.LogRequest("GetVehicleMaster", "GetVehicleMaster", "Testing", "4 - After Get Context Call Final", context);


            List<ddDTO> obj;

            obj = _context.TblVehicleDetails.Select(x => new ddDTO { mID = x.VehicleId, mValue = x.VehicleModel, mType = x.VehicleType }).ToList();

            return obj;
        }

        public async Task<BillingResponse> BillingDetails(string PolicyNo, int Month, int Year, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            var CurrentMonth = IndianTime.Month;
            var CurrentDate = IndianTime.Date;

            var connectionString = _configuration["ConnectionStrings:Mica_EGIConnection"];


            var getMonthNumber = 0;
            BillingResponse response = new BillingResponse();
            ErrorInfo errorInfo = new ErrorInfo();

            if (!String.IsNullOrEmpty(PolicyNo) && Month > 0 && Month <= 12 && Year > 0)
            {
                
                getMonthNumber = Month;              

                BillingDTO billingDTO = new BillingDTO();
                CDAccountRequest accountRequest = new CDAccountRequest();
                CDAccountDTO CdDailyDTO = new CDAccountDTO();
                DateTime PolicyStartDate;

                dynamic PolicyData = await _integrationService.InternalGetPolicyDetailsByNumber(PolicyNo, context);

                if (PolicyData != null)
                {
                    try
                    {
                        accountRequest.TxnEventType = "AD";
                        accountRequest.accountnumber = PolicyData["CDAccountNumber"].ToString();
                        PolicyStartDate = Convert.ToDateTime(PolicyData["Policy Start Date"]);


                        if(PolicyStartDate.Month == Month && PolicyStartDate.Year == Year)
                        {
                            accountRequest.FromDate = PolicyStartDate.Date;
                            accountRequest.ToDate = CurrentDate;
                        }
                        else
                        {
                            var PolicyDay = PolicyStartDate.Day;
                            DateTime FromDate = new DateTime(Year, Month, PolicyDay, 0, 0, 0);
                            var FinalFromDate = FromDate.AddMonths(-1);

                            DateTime ToDate = new DateTime(Year, Month, PolicyDay, 0, 0, 0);
                            var FinalToDate = ToDate.AddDays(-1);

                            accountRequest.FromDate = FinalFromDate;
                            accountRequest.ToDate = FinalToDate;
                        }



                    }
                    catch (Exception Ex)
                    {
                        accountRequest.accountnumber = "";
                        PolicyStartDate = DateTime.MinValue;
                    }
                }
                else
                {
                    response.ResponseMessage = "Policy Record Not Found";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "No Records for this Policy Number - " + PolicyNo;
                    errorInfo.ErrorCode = "GEN003";
                    errorInfo.PropertyName = "NotFound";
                    response.Errors.Add(errorInfo);
                    return response;
                }

                //Integration Call for Balance 
                CdDailyDTO = await _integrationService.GetAccountDetails(accountRequest, context);


                if (CdDailyDTO.Status == BusinessStatus.Ok)
                {
                    billingDTO.OpeningBalance = CdDailyDTO.OpeningBalance;
                    billingDTO.ClosingBalance = CdDailyDTO.ClosingBalance;
                    billingDTO.BillingDetails = CdDailyDTO.AccountDetails;
                }
                else
                {
                    billingDTO.OpeningBalance = 0;
                    billingDTO.ClosingBalance = 0;
                    billingDTO.BillingDetails = new List<AccountDetails>();
                }

                response.BillingDTO = billingDTO;
                response.Status = BusinessStatus.Ok;
                return response;

            }
            else
            {
                response.ResponseMessage = "Null/Empty Inputs";
                response.Status = BusinessStatus.NotFound;
                errorInfo.ErrorMessage = "Either Policy Number or Month or Year is Null";
                errorInfo.ErrorCode = "GEN002";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;
            }



        }


        public async Task<dynamic> CDMapper(string TxnType, dynamic SourceObject, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));         

            List<CalculationResult> DeserilizedPremiumData = new List<CalculationResult>();
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            List<MicaCDDTO> FinalDto = new List<MicaCDDTO>();
            string PolicyNumber = "";
            var SumInsured = "";
            int NoOfPC = 0;
            int NoOfTW = 0;
            string BillingFrequency = "";

            ///<summary>
            ///<param name="SourceObject"></param>
            ///Dynamic Source Object for Endoresement is sent from MICA 
            ///It will be a list [{PolicyObject},{EndoresementObject}]
            ///So Due to this SourceObject[0]==PolicyObject and Source[1]==Endoresement Object
            ///</summary>


            if (TxnType == "EndorsementAdd")
            {
                //Ashish Sir
                //var modelSerialize = JsonConvert.DeserializeObject<dynamic>(SourceObject);
                // var DriverRiskItem = PolicyItem["Data"]["InsurableItem"][0]["RiskItems"];

                var EndorsmentItem = SourceObject[1];
                var EndorsmentDataItem = EndorsmentItem["Data"];
                var VehicleRiskItem = EndorsmentItem["Data"]["InsurableItem"][0]["RiskItems"];

                //dynamic EndoData = PolicyItem.FirstOrDefault(x=>x.Type == "Endorsement").Data;
                //dynamic InsureItem = EndoData["InsurableItem"];
                //dynamic RiskItems = null;                

                //foreach (var item in InsureItem)
                //{
                //    if(item["InsurableName"] == "Vehicle")
                //    {
                //        RiskItems = item["RiskItems"];
                //    }
                //}

                if (VehicleRiskItem != null)
                {
                    foreach (var item in VehicleRiskItem)
                    {
                        if (item["Vehicle Type"] == "PC")
                        {
                            NoOfPC += 1;
                        }
                        else if (item["Vehicle Type"] == "TW")
                        {
                            NoOfTW += 1;
                        }
                    }
                }

                var PolicyObject = SourceObject[0];
                var PolicyData = PolicyObject["Data"];

                SumInsured = PolicyData["si"];


                var EndoresementSI = EndorsmentDataItem["si"];

                if (EndoresementSI != null)
                {
                    SumInsured = EndoresementSI;
                }

                PolicyNumber = EndorsmentItem["Data"]["PolicyNumber"];
                BillingFrequency = PolicyData["billingFrequency"].ToString();

                EndorsementPremiumDTO endorsementDto = new EndorsementPremiumDTO();

                endorsementDto.PolicyNo = PolicyNumber;
                endorsementDto.SI = Convert.ToInt32(SumInsured);
                endorsementDto.PcCount = NoOfPC;
                endorsementDto.TwCount = NoOfTW;
                endorsementDto.TypeOfEndorsement = "Addition";
                endorsementDto.EndorsementEffectiveDate = IndianTime;

                var CallNewEndo = await EndorsementPremium(endorsementDto, PolicyData, "CDUpdate", context);

                DeserilizedPremiumData = CallNewEndo;

                if (DeserilizedPremiumData.Count > 0)
                {
                    var CallEndoMap = EndoADFT(DeserilizedPremiumData, "Addition");
                    return CallEndoMap;
                }

                return FinalDto;

            }
            else if (TxnType == "EndorsementDel")
            {
                //Ashish Sir
                var EndorsmentItem = SourceObject[1];
                var EndorsmentDataItem = EndorsmentItem["Data"];
                var VehicleRiskItem = EndorsmentItem["Data"]["InsurableItem"][0]["RiskItems"];

                if (VehicleRiskItem != null)
                {
                    foreach (var item in VehicleRiskItem)
                    {
                        if (item["Vehicle Type"] == "PC")
                        {
                            NoOfPC += 1;
                        }
                        else if (item["Vehicle Type"] == "TW")
                        {
                            NoOfTW += 1;
                        }
                    }
                }

                var PolicyObject = SourceObject[0];
                var PolicyData = PolicyObject["Data"];
                SumInsured = PolicyData["si"];

                var EndoresementSI = EndorsmentDataItem["si"];

                if (EndoresementSI != null)
                {
                    SumInsured = EndoresementSI;
                }

                PolicyNumber = EndorsmentItem["Data"]["PolicyNumber"];
                BillingFrequency = PolicyData["billingFrequency"].ToString();
                //var CheckSI = SourceObject["si"].ToString();
                //if (CheckSI == null)
                //    SumInsured = SourceObject["Policy:si"];


                EndorsementPremiumDTO endorsementDto = new EndorsementPremiumDTO();

                endorsementDto.PolicyNo = PolicyNumber;
                endorsementDto.SI = Convert.ToInt32(SumInsured);
                endorsementDto.PcCount = NoOfPC;
                endorsementDto.TwCount = NoOfTW;
                endorsementDto.TypeOfEndorsement = "Deletion";
                endorsementDto.EndorsementEffectiveDate = IndianTime;

                var CallNewEndo = await EndorsementPremium(endorsementDto, PolicyData, "CDUpdate", context);

                DeserilizedPremiumData = CallNewEndo;

                //var CDData = await _integrationService.InternalGetPolicyDetailsByNumber(PolicyNumber, apiContext);

                //var CdaccountNumber = (string)CDData["CDAccountNumber"];


                //if (CdaccountNumber != null)
                //{
                //    CDBalanceDTO FtAccountdetails = await _integrationService.GetCDAccountDetails(CdaccountNumber, "FT", apiContext);
                //    CDBalanceDTO accountdetails = await _integrationService.GetCDAccountDetails(CdaccountNumber, "AD", apiContext);
                //    var ADPremium = Convert.ToDecimal(accountdetails.TxnAmountBalance + FtAccountdetails.TxnAmountBalance);
                //    var GST = Convert.ToDecimal(accountdetails.TaxAmountBalance + FtAccountdetails.TaxAmountBalance);
                //    var Total = ADPremium + GST;

                //    CalculationResult calculation = new CalculationResult();

                //    calculation.Entity = "ADPremium";
                //    calculation.EValue = ADPremium.ToString();
                //    DeserilizedPremiumData.Add(calculation);

                //    calculation = new CalculationResult();

                //    calculation.Entity = "ADGST";
                //    calculation.EValue = GST.ToString();
                //    DeserilizedPremiumData.Add(calculation);

                //}



                if (DeserilizedPremiumData.Count > 0)
                {
                    var CallEndoMap = EndoADFT(DeserilizedPremiumData, "Deletion");
                    return CallEndoMap;
                }

                return FinalDto;

            }
            else if (TxnType == "PolicyCancellation")
            {
                MicaCDDTO MICACDModel = new MicaCDDTO();

                PolicyCancelReturnDto CallCancleCalculator = await PolicyCancellationCalculator(null, SourceObject,context);

                PolicyNumber = (string)SourceObject["PolicyNumber"];

                //var CDData = await _integrationService.InternalGetPolicyDetailsByNumber(PolicyNumber, apiContext);

                var CdaccountNumber = (string)SourceObject["CDAccountNumber"];


                if (CdaccountNumber != null)
                {
                    CDBalanceDTO FtAccountdetails = await _integrationService.GetCDAccountDetails(CdaccountNumber, "FT", context);
                    CDBalanceDTO accountdetails = await _integrationService.GetCDAccountDetails(CdaccountNumber, "AD", context);
                    var ADPremium = Convert.ToDecimal(accountdetails.TxnAmountBalance + FtAccountdetails.TxnAmountBalance);
                    var GST = Convert.ToDecimal(accountdetails.TaxAmountBalance + FtAccountdetails.TaxAmountBalance);
                    var Total = ADPremium + GST;

                    //CD AD Object Form 
                    CDPremiumDTO ADPremiumDTO = new CDPremiumDTO();
                    CDTaxAmountDTO ADtaxAmountDTO = new CDTaxAmountDTO();
                    CDTaxTypeDTO ADtaxTypeDTO = new CDTaxTypeDTO();
                    decimal TotalTax = 0;


                    //AD TAX
                    //From State 
                    ADtaxTypeDTO.Type = CallCancleCalculator.FromTaxType;
                    ADtaxTypeDTO.TaxAmount = GST;

                    TotalTax = ADtaxTypeDTO.TaxAmount;

                    //ARRAY
                    ADtaxAmountDTO.Tax.Add(ADtaxTypeDTO);

                    ADtaxTypeDTO = new CDTaxTypeDTO();

                    //TO State
                    ADtaxTypeDTO.Type = CallCancleCalculator.ToTaxType;
                    ADtaxTypeDTO.TaxAmount = 0;

                    TotalTax += ADtaxTypeDTO.TaxAmount;


                    ADtaxAmountDTO.TaxAmount = TotalTax;
                    ADtaxAmountDTO.Tax.Add(ADtaxTypeDTO);


                    //AD
                    ADPremiumDTO.Type = "AD";
                    ADPremiumDTO.TxnAmount = ADPremium;
                    ADPremiumDTO.TotalAmount = ADPremiumDTO.TxnAmount + TotalTax;
                    ADPremiumDTO.TaxAmount = ADtaxAmountDTO;




                    MICACDModel.PremiumDTO.Add(ADPremiumDTO);
                    MICACDModel.Type = "PolicyCancellation";
                    MICACDModel.TxnType = "Balance";
                    MICACDModel.FtPerDay = CallCancleCalculator.FtPerDay;
                    MICACDModel.AdPerDay = CallCancleCalculator.AdPerDay;
                    MICACDModel.TxnAmount = ADPremiumDTO.TxnAmount;
                    MICACDModel.TaxAmount = ADtaxAmountDTO.TaxAmount;
                    MICACDModel.TotalAmount = MICACDModel.TxnAmount + MICACDModel.TaxAmount;
                    FinalDto.Add(MICACDModel);


                }


                var FTModel = PolicyCancelFT(CallCancleCalculator);

                MICACDModel = new MicaCDDTO();
                MICACDModel.PremiumDTO.Add(FTModel);
                MICACDModel.Type = "PolicyCancellation";
                MICACDModel.TxnType = "Credit";
                MICACDModel.FtPerDay = CallCancleCalculator.FtPerDay;
                MICACDModel.AdPerDay = CallCancleCalculator.AdPerDay;
                MICACDModel.TxnAmount = CallCancleCalculator.FireTheft * (-1);
                MICACDModel.TaxAmount = CallCancleCalculator.FTFromTax * (-1) + CallCancleCalculator.FTToTax * (-1);
                MICACDModel.TotalAmount = MICACDModel.TxnAmount + MICACDModel.TaxAmount;

                FinalDto.Add(MICACDModel);
                return FinalDto;


            }
            else
            {
                ///<summary>
                ///This is Used for CreateProposal and IssuePolicy
                ///Only One Object is recived in <paramref name="SourceObject"/>
                /// </summary>
                SumInsured = SourceObject["si"];
                BillingFrequency = SourceObject["billingFrequency"].ToString();

            }


            //CalculatePremiumObject
            SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

            //RuleObject
            premiumDTO.dictionary_rule.SI = SumInsured.ToString();//Verify
            premiumDTO.dictionary_rule.NOOFPC = SourceObject["noOfPC"];
            premiumDTO.dictionary_rule.NOOFTW = SourceObject["noOfTW"];


            //RateObject

            premiumDTO.dictionary_rate.DEXPRT_Exp = SourceObject["driverExp"];
            premiumDTO.dictionary_rate.PDAGERT_PAge = SourceObject["driverAge"];
            premiumDTO.dictionary_rate.ADDRVRT_DRV = SourceObject["additionalDriver"];
            premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = SourceObject["noOfPC"];
            premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = SourceObject["noOfPC"];
            premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = SourceObject["noOfTW"];


            var taxType = await TaxTypeForStateCode(SourceObject["stateCode"].ToString(), context);

            premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE; //Call From State TaxType 
            premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE; //Call To State TaxType 


            //Call CalculatePremium Rating Module MICA
            var CalPremiumResponse = await _integrationService.RatingPremium(premiumDTO, context);



            MicaCDDTO CdModel = new MicaCDDTO();
            CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
            CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();

            if (CalPremiumResponse != null)
            {
                try
                {
                    DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());

                }
                catch (Exception Ex)
                {
                    throw Ex;
                }
            }



            if (DeserilizedPremiumData.Count() > 0)
            {
                //Accidental Damage [AD] - 365DAYS
                var Ad365days = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "AD365DAYS").EValue);

                //Accidental Damage [AD] - 60DAYS
                var Ad60days = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "AD60DAYS").EValue);

                //FireTheft [FT] - 365Days 
                var Ft365days = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "FT365").EValue);

                //FT-PerDay [Without Tax] [Rating Module]
                var FtPerDay = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "FTPM").EValue);

                //AD-PerDay [Without Tax] [Rating Module]
                var AdPerDay = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "ADPMPD").EValue);


                decimal FinalTaxTotal = 0;

                CDPremiumDTO FTPremium = new CDPremiumDTO();

                CDPremiumDTO ADPremium = new CDPremiumDTO();

                if (BillingFrequency == "Monthly")
                {
                    switch (TxnType)
                    {
                        case "Proposal":
                            ADPremium = ADMonthly(DeserilizedPremiumData, taxType);
                            FTPremium = FTYearly(DeserilizedPremiumData, taxType);
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount + ADPremium.TaxAmount.TaxAmount;
                            //AD & FD CREDIT
                            CdModel.PremiumDTO.Add(ADPremium);
                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "Proposal";
                            CdModel.TxnType = "Credit";
                            CdModel.FtPerDay = FtPerDay;
                            CdModel.AdPerDay = AdPerDay;
                            CdModel.TxnAmount = Ad60days + Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;

                            FinalDto.Add(CdModel);

                            return FinalDto;

                        case "Policy":
                            FTPremium = FTYearly(DeserilizedPremiumData, taxType);
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount;
                            //FT DEBIT
                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "Policy";
                            CdModel.TxnType = "Debit";
                            CdModel.FtPerDay = FtPerDay;
                            CdModel.AdPerDay = AdPerDay;
                            CdModel.TxnAmount = Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                            FinalDto.Add(CdModel);
                            return FinalDto;

                        //This Method is for Policy Bazaar API - Billing Frequency Monthly
                        case "PolicyCreation":
                            ADPremium = ADMonthly(DeserilizedPremiumData, taxType);
                            FTPremium = FTYearly(DeserilizedPremiumData, taxType);
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount + ADPremium.TaxAmount.TaxAmount;
                            //AD & FD CREDIT
                            CdModel.PremiumDTO.Add(ADPremium);
                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "PolicyCreation";
                            CdModel.TxnType = "Credit";
                            CdModel.FtPerDay = FtPerDay;
                            CdModel.AdPerDay = AdPerDay;
                            CdModel.TxnAmount = Ad60days + Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;

                            //FT & AD CREDIT OBJECT
                            FinalDto.Add(CdModel);

                            CdModel = new MicaCDDTO();

                            //ONLY FT TAX TOTAL SO AGAIN UPDATING
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount;

                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "PolicyCreation";
                            CdModel.TxnType = "Debit";
                            CdModel.FtPerDay = FtPerDay;
                            CdModel.AdPerDay = AdPerDay;
                            CdModel.TxnAmount = Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                            
                            //FT DEBIT OBJECT
                            FinalDto.Add(CdModel);

                            return FinalDto;


                    }

                }
                else if (BillingFrequency == "Yearly")
                {
                    switch (TxnType)
                    {
                        case "Proposal":
                            ADPremium = ADYearly(DeserilizedPremiumData, taxType);
                            FTPremium = FTYearly(DeserilizedPremiumData, taxType);
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount + ADPremium.TaxAmount.TaxAmount;
                            //AD & FD CREDIT
                            CdModel.PremiumDTO.Add(ADPremium);
                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "Proposal";
                            CdModel.TxnType = "Credit";
                            CdModel.FtPerDay = FtPerDay;
                            CdModel.AdPerDay = AdPerDay;
                            CdModel.TxnAmount = Ad365days + Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                            FinalDto.Add(CdModel);
                            return FinalDto;


                        case "Policy":
                            FTPremium = FTYearly(DeserilizedPremiumData, taxType);
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount;
                            //FT DEBIT
                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "Policy";
                            CdModel.TxnType = "Debit";
                            CdModel.FtPerDay = FtPerDay;
                            CdModel.AdPerDay = AdPerDay;
                            CdModel.TxnAmount = Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                            FinalDto.Add(CdModel);
                            return FinalDto;



                        //This Method is for Policy Bazaar API - Billing Frequency Monthly
                        case "PolicyCreation":
                            ADPremium = ADYearly(DeserilizedPremiumData, taxType);
                            FTPremium = FTYearly(DeserilizedPremiumData, taxType);
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount + ADPremium.TaxAmount.TaxAmount;
                            //AD & FD CREDIT
                            CdModel.PremiumDTO.Add(ADPremium);
                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "PolicyCreation";
                            CdModel.TxnType = "Credit";
                            CdModel.FtPerDay = FtPerDay;
                            CdModel.AdPerDay = AdPerDay;
                            CdModel.TxnAmount = Ad365days + Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;

                            //FT & AD CREDIT OBJECT
                            FinalDto.Add(CdModel);

                            CdModel = new MicaCDDTO();

                            //ONLY FT TAX TOTAL SO AGAIN UPDATING
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount;

                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "PolicyCreation";
                            CdModel.TxnType = "Debit";
                            CdModel.FtPerDay = FtPerDay;
                            CdModel.AdPerDay = AdPerDay;
                            CdModel.TxnAmount = Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;

                            //FT DEBIT OBJECT
                            FinalDto.Add(CdModel);

                            return FinalDto;



                    }

                }

            }

            return false;
        }

        private CDPremiumDTO ADMonthly(List<CalculationResult> RatingObject, TaxTypeDTO taxType)
        {
            CDPremiumDTO ADMonthlyObj = new CDPremiumDTO();
            CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
            CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();

            //Accidental Damage [AD] - 60DAYS
            var Ad60days = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "AD60DAYS").EValue);
            var ad60fttax = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "AD60FTAXAMT").EValue);
            var ad60ttax = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "AD60TTAXAMT").EValue);


            decimal TotalTax = 0;
            //AD TAX
            //From State 
            taxTypeDTO.Type = taxType.FSTTAX_TAXTYPE;
            taxTypeDTO.TaxAmount = ad60fttax;

            TotalTax = taxTypeDTO.TaxAmount;

            //ARRAY
            taxAmountDTO.Tax.Add(taxTypeDTO);

            taxTypeDTO = new CDTaxTypeDTO();

            //TO State
            taxTypeDTO.Type = taxType.TSTTAX_TAXTYPE;
            taxTypeDTO.TaxAmount = ad60ttax;

            TotalTax += taxTypeDTO.TaxAmount;


            taxAmountDTO.TaxAmount = TotalTax;
            taxAmountDTO.Tax.Add(taxTypeDTO);


            //AD
            ADMonthlyObj.Type = "AD";
            ADMonthlyObj.TxnAmount = Ad60days;
            ADMonthlyObj.TotalAmount = Ad60days + TotalTax;
            ADMonthlyObj.TaxAmount = taxAmountDTO;

            return ADMonthlyObj;

        }

        private CDPremiumDTO ADYearly(List<CalculationResult> RatingObject, TaxTypeDTO taxType)
        {
            CDPremiumDTO ADYearlyObj = new CDPremiumDTO();
            CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
            CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();

            //Accidental Damage [AD] - 365DAYS
            var Ad365days = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "AD365DAYS").EValue);
            var ad365ftax = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "AD365FTAXAMT").EValue);
            var ad365ttax = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "AD365TTAXAMT").EValue);

            decimal TotalTax = 0;
            //AD TAX
            //From State 
            taxTypeDTO.Type = taxType.FSTTAX_TAXTYPE;
            taxTypeDTO.TaxAmount = ad365ftax;

            TotalTax = taxTypeDTO.TaxAmount;

            //ARRAY
            taxAmountDTO.Tax.Add(taxTypeDTO);

            taxTypeDTO = new CDTaxTypeDTO();

            //TO State
            taxTypeDTO.Type = taxType.TSTTAX_TAXTYPE;
            taxTypeDTO.TaxAmount = ad365ttax;

            TotalTax += taxTypeDTO.TaxAmount;


            taxAmountDTO.TaxAmount = TotalTax;
            taxAmountDTO.Tax.Add(taxTypeDTO);

            //AD 365Days
            ADYearlyObj.Type = "AD";
            ADYearlyObj.TxnAmount = Ad365days;
            ADYearlyObj.TotalAmount = Ad365days + TotalTax;
            ADYearlyObj.TaxAmount = taxAmountDTO;
            return ADYearlyObj;
        }

        private CDPremiumDTO FTYearly(List<CalculationResult> RatingObject, TaxTypeDTO taxType)
        {
            CDPremiumDTO FTYearlyObj = new CDPremiumDTO();
            CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
            CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();

            //FireTheft [FT] - 365Days 
            var Ft365days = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "FT365").EValue);
            var ftfttax = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "FTFTAXAMT").EValue);
            var ftttax = Convert.ToDecimal(RatingObject.FirstOrDefault(x => x.Entity == "FTTTAXAMT").EValue);

            decimal TotalTax = 0;
            //AD TAX
            //From State 
            taxTypeDTO.Type = taxType.FSTTAX_TAXTYPE;
            taxTypeDTO.TaxAmount = ftfttax;

            TotalTax = taxTypeDTO.TaxAmount;

            //ARRAY
            taxAmountDTO.Tax.Add(taxTypeDTO);

            taxTypeDTO = new CDTaxTypeDTO();

            //TO State
            taxTypeDTO.Type = taxType.TSTTAX_TAXTYPE;
            taxTypeDTO.TaxAmount = ftttax;

            TotalTax += taxTypeDTO.TaxAmount;


            taxAmountDTO.TaxAmount = TotalTax;
            taxAmountDTO.Tax.Add(taxTypeDTO);

            //FT 365Days
            FTYearlyObj.Type = "FT";
            FTYearlyObj.TxnAmount = Ft365days;
            FTYearlyObj.TotalAmount = Ft365days + TotalTax;
            FTYearlyObj.TaxAmount = taxAmountDTO;
            return FTYearlyObj;
        }

        private CDPremiumDTO PolicyCancelFT(PolicyCancelReturnDto policyCancel)
        {
            CDPremiumDTO FTYearlyObj = new CDPremiumDTO();
            CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
            CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();


            decimal TotalTax = 0;
            //AD TAX
            //From State 
            taxTypeDTO.Type = policyCancel.FromTaxType;
            taxTypeDTO.TaxAmount = policyCancel.FTFromTax * (-1);

            TotalTax = taxTypeDTO.TaxAmount;

            //ARRAY
            taxAmountDTO.Tax.Add(taxTypeDTO);

            taxTypeDTO = new CDTaxTypeDTO();

            //TO State
            taxTypeDTO.Type = policyCancel.ToTaxType;
            taxTypeDTO.TaxAmount = policyCancel.FTToTax * (-1);

            TotalTax += taxTypeDTO.TaxAmount;


            taxAmountDTO.TaxAmount = TotalTax;
            taxAmountDTO.Tax.Add(taxTypeDTO);

            //FT 365Days
            FTYearlyObj.Type = "FT";
            FTYearlyObj.TxnAmount = policyCancel.FireTheft * (-1);
            FTYearlyObj.TotalAmount = FTYearlyObj.TxnAmount + TotalTax;
            FTYearlyObj.TaxAmount = taxAmountDTO;
            return FTYearlyObj;
        }


        private List<MicaCDDTO> EndoADFT(List<CalculationResult> EndoRatingObject, string TxnType)
        {
            List<MicaCDDTO> FinalDto = new List<MicaCDDTO>();
            MicaCDDTO CdModel = new MicaCDDTO();
            CDPremiumDTO ADPremiumDTO = new CDPremiumDTO();
            CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
            CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();

            if (TxnType == "Addition")
            {
                decimal TotalTax = 0;
                //AD TAX
                //From State 
                taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "FSTTAX_TAXTYPE").EValue;
                taxTypeDTO.TaxAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADFTTAX").EValue);

                TotalTax = taxTypeDTO.TaxAmount;

                //ARRAY
                taxAmountDTO.Tax.Add(taxTypeDTO);

                taxTypeDTO = new CDTaxTypeDTO();

                //TO State
                taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "TSTTAX_TAXTYPE").EValue;
                taxTypeDTO.TaxAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue);

                TotalTax += taxTypeDTO.TaxAmount;


                taxAmountDTO.TaxAmount = TotalTax;
                taxAmountDTO.Tax.Add(taxTypeDTO);


                //AD
                ADPremiumDTO.Type = "AD";
                ADPremiumDTO.TxnAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADPREM").EValue);
                ADPremiumDTO.TotalAmount = ADPremiumDTO.TxnAmount + TotalTax;
                ADPremiumDTO.TaxAmount = taxAmountDTO;


                //FT Objects
                taxTypeDTO = new CDTaxTypeDTO();
                TotalTax = 0;
                CDPremiumDTO FTPremiumDTO = new CDPremiumDTO();
                taxAmountDTO = new CDTaxAmountDTO();
                //FT TAX
                //From State 
                taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "FSTTAX_TAXTYPE").EValue;
                taxTypeDTO.TaxAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "FTFMTAX").EValue);

                TotalTax = taxTypeDTO.TaxAmount;

                //ARRAY
                taxAmountDTO.Tax.Add(taxTypeDTO);

                taxTypeDTO = new CDTaxTypeDTO();

                //TO State
                taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "TSTTAX_TAXTYPE").EValue;
                taxTypeDTO.TaxAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "FTTSTAX").EValue);

                TotalTax += taxTypeDTO.TaxAmount;


                taxAmountDTO.TaxAmount = TotalTax;
                taxAmountDTO.Tax.Add(taxTypeDTO);


                //FT
                FTPremiumDTO.Type = "FT";
                FTPremiumDTO.TxnAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "FTPREM").EValue);
                FTPremiumDTO.TotalAmount = FTPremiumDTO.TxnAmount + TotalTax;
                FTPremiumDTO.TaxAmount = taxAmountDTO;


                //ADPremium = ADMonthly(DeserilizedPremiumData, taxType);
                //FTPremium = FTYearly(DeserilizedPremiumData, taxType);
                var FinalTaxTotal = ADPremiumDTO.TaxAmount.TaxAmount + FTPremiumDTO.TaxAmount.TaxAmount;

                //FT-PerDay [Without Tax] [Rating Module]
                var FtPerDay = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "DifferentialFTPerDay").EValue);

                //AD-PerDay [Without Tax] [Rating Module]
                var AdPerDay = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "DifferentialADPerDay").EValue);

                //Cumulative FT-PerDay [Without Tax] [Rating Module] -- NEW PREMIUM FROM ENDORSEMENT 
                var CumFtPerDay = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "NewFTPerDay").EValue);


                //Cumulative AD-PerDay [Without Tax] [Rating Module] -- NEW PREMIUM FROM ENDORSEMENT 
                var CumAdPerDay = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "NewADPerDay").EValue);


                ////AD & FT Credit Object

                CdModel.PremiumDTO.Add(ADPremiumDTO);
                CdModel.PremiumDTO.Add(FTPremiumDTO);
                CdModel.Type = "EndorsementAdd";
                CdModel.TxnType = "Credit";
                CdModel.FtPerDay = FtPerDay;
                CdModel.AdPerDay = AdPerDay;
                CdModel.CumFtPerDay = CumFtPerDay;
                CdModel.CumAdPerDay = CumAdPerDay;
                CdModel.TxnAmount = ADPremiumDTO.TxnAmount + FTPremiumDTO.TxnAmount;
                CdModel.TaxAmount = FinalTaxTotal;
                CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                FinalDto.Add(CdModel);

                //FT-DebitObject
                CdModel = new MicaCDDTO();
                CdModel.PremiumDTO.Add(FTPremiumDTO);
                CdModel.Type = "EndorsementAdd";
                CdModel.TxnType = "Debit";
                CdModel.FtPerDay = FtPerDay;
                CdModel.AdPerDay = AdPerDay;
                CdModel.CumFtPerDay = CumFtPerDay;
                CdModel.CumAdPerDay = CumAdPerDay;
                CdModel.TxnAmount = FTPremiumDTO.TxnAmount;
                CdModel.TaxAmount = FTPremiumDTO.TaxAmount.TaxAmount;
                CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                FinalDto.Add(CdModel);
            }

            if (TxnType == "Deletion")
            {

                //FT-PerDay [Without Tax] [Rating Module]
                var FtPerDay = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "DifferentialFTPerDay").EValue);

                //AD-PerDay [Without Tax] [Rating Module]
                var AdPerDay = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "DifferentialADPerDay").EValue);


                //Cumulative FT-PerDay [Without Tax] [Rating Module] -- NEW PREMIUM FROM ENDORSEMENT 
                var CumFtPerDay = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "NewFTPerDay").EValue);


                //Cumulative FT-PerDay [Without Tax] [Rating Module] -- NEW PREMIUM FROM ENDORSEMENT 
                var CumAdPerDay = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "NewADPerDay").EValue);



                decimal TotalTax = 0;

                //AD TAX
                //From State 
                taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "FSTTAX_TAXTYPE").EValue;
                taxTypeDTO.TaxAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADFTTAX").EValue);

                TotalTax = taxTypeDTO.TaxAmount;

                //ARRAY
                taxAmountDTO.Tax.Add(taxTypeDTO);

                taxTypeDTO = new CDTaxTypeDTO();

                //TO State
                taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "TSTTAX_TAXTYPE").EValue;
                taxTypeDTO.TaxAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue);

                TotalTax += taxTypeDTO.TaxAmount;


                taxAmountDTO.TaxAmount = TotalTax;
                taxAmountDTO.Tax.Add(taxTypeDTO);


                //AD
                ADPremiumDTO.Type = "AD";
                ADPremiumDTO.TxnAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADPREM").EValue);
                ADPremiumDTO.TotalAmount = ADPremiumDTO.TxnAmount + TotalTax;
                ADPremiumDTO.TaxAmount = taxAmountDTO;




                CdModel.PremiumDTO.Add(ADPremiumDTO);
                CdModel.Type = "EndorsementDel";
                CdModel.TxnType = "Balance";
                CdModel.FtPerDay = FtPerDay;
                CdModel.AdPerDay = AdPerDay;
                CdModel.CumFtPerDay = CumFtPerDay;
                CdModel.CumAdPerDay = CumAdPerDay;
                CdModel.TxnAmount = ADPremiumDTO.TxnAmount;
                CdModel.TaxAmount = taxAmountDTO.TaxAmount;
                CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                FinalDto.Add(CdModel);


                TotalTax = 0;

                //FT Objects
                taxTypeDTO = new CDTaxTypeDTO();
                CDPremiumDTO FTPremiumDTO = new CDPremiumDTO();
                taxAmountDTO = new CDTaxAmountDTO();
                //FT TAX
                //From State 
                taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "FSTTAX_TAXTYPE").EValue;
                taxTypeDTO.TaxAmount = (Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "FTFMTAX").EValue)) * (-1);

                TotalTax = taxTypeDTO.TaxAmount;

                //ARRAY
                taxAmountDTO.Tax.Add(taxTypeDTO);

                taxTypeDTO = new CDTaxTypeDTO();

                //TO State
                taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "TSTTAX_TAXTYPE").EValue;
                taxTypeDTO.TaxAmount = (Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "FTTSTAX").EValue)) * (-1);

                TotalTax += taxTypeDTO.TaxAmount;


                taxAmountDTO.TaxAmount = TotalTax;
                taxAmountDTO.Tax.Add(taxTypeDTO);


                //FT
                FTPremiumDTO.Type = "FT";
                FTPremiumDTO.TxnAmount = (Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "FTPREM").EValue)) * (-1);
                FTPremiumDTO.TotalAmount = FTPremiumDTO.TxnAmount + TotalTax;
                FTPremiumDTO.TaxAmount = taxAmountDTO;

                var FinalTaxTotal = FTPremiumDTO.TaxAmount.TaxAmount;


                //AD - Dummy Entry for Balance

                //FT and AD - REFUND CREDIT Object
                CdModel = new MicaCDDTO();
                CdModel.PremiumDTO.Add(FTPremiumDTO);
                CdModel.Type = "EndorsementDel";
                CdModel.TxnType = "Credit";
                CdModel.FtPerDay = FtPerDay;
                CdModel.AdPerDay = AdPerDay;
                CdModel.CumFtPerDay = CumFtPerDay;
                CdModel.CumAdPerDay = CumAdPerDay;
                CdModel.TxnAmount = FTPremiumDTO.TxnAmount;
                CdModel.TaxAmount = FinalTaxTotal;
                CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                FinalDto.Add(CdModel);

                return FinalDto;
            }



            return FinalDto;

        }

        public async Task<List<RuleEngineResponse>> RuleMapper (string TxnType, dynamic SourceObject, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));
                       
            var Currentdate = System.DateTime.UtcNow.AddMinutes(330);

            int successcount = 0;
            int failcount = 0;

            //  RuleThreeDTO ruleThreeDTO = new RuleThreeDTO();

            switch (TxnType)
            {
                case "Proposal":
                    RuleOneDTO ruleOneDTO = new RuleOneDTO();
                    ruleOneDTO.RuleName = "30016";//RuleId Give by Dinkar
                    ruleOneDTO.DriverAge = SourceObject["driverAge"];
                    ruleOneDTO.NoofVehicles = Convert.ToString(Convert.ToInt32(SourceObject["noOfPC"]) + Convert.ToInt32(SourceObject["noOfTW"]));
                    ruleOneDTO.NoofDrivers = Convert.ToString(Convert.ToInt32(SourceObject["additionalDriver"]) + 1);

                    dynamic RuleEngine;

                    List<RuleEngineResponse> engineResponses;
                    try
                    {
                        RuleEngine = await _integrationService.RuleEngine(ruleOneDTO, context);
                        engineResponses = JsonConvert.DeserializeObject<List<RuleEngineResponse>>(RuleEngine.ToString());

                        // bool res = IntegrationValidation(engineResponses, "List", "ValidatorName");

                        RuleEngineResponse resobj = new RuleEngineResponse();
                        if (SourceObject["driverExp"] < 1)
                        {

                            resobj.ValidatorName = "driverExp";
                            resobj.Outcome = "Fail";
                            resobj.Message = "Driver Experience is less than one year";
                            resobj.Code = "EXP001";
                            engineResponses.FirstOrDefault(x => x.ValidatorName == "Final Result").Outcome = "Fail";
                        }
                        else
                        {

                            resobj.ValidatorName = "driverExp";
                            resobj.Outcome = "Success";
                            resobj.Message = "Validation done for driver experiance greater than one year";
                            resobj.Code = "EXP002";

                        }
                        engineResponses.Add(resobj);
                        RuleEngineResponse resobj1 = new RuleEngineResponse();
                        if (Convert.ToInt32(SourceObject["driverExp"]) > Convert.ToInt32(SourceObject["driverAge"]) - 18)
                        {
                            resobj1.ValidatorName = "driverExp";
                            resobj1.Outcome = "Fail";
                            resobj1.Message = "Driver Experience is greater than driver age -18";
                            resobj1.Code = "EXP003";
                            engineResponses.FirstOrDefault(x => x.ValidatorName == "Final Result").Outcome = "Fail";
                        }
                        else
                        {
                            resobj1.ValidatorName = "driverExp";
                            resobj1.Outcome = "Success";
                            resobj1.Message = "Validation done for driver experiance";
                            resobj1.Code = "EXP004";

                        }
                        engineResponses.Add(resobj1);
                        RuleEngineResponse resobj2 = new RuleEngineResponse();
                        DateTime Startdate = Convert.ToDateTime(SourceObject["Policy Start Date"]);
                        if (Startdate >= Currentdate)
                        {
                            resobj2.ValidatorName = "Policy Start Date";
                            resobj2.Outcome = "Fail";
                            resobj2.Message = "Policy Start Date is greater than current date";
                            resobj2.Code = "EXP005";
                            engineResponses.FirstOrDefault(x => x.ValidatorName == "Final Result").Outcome = "Fail";
                        }
                        else
                        {
                            resobj2.ValidatorName = "Policy Start Date";
                            resobj2.Outcome = "Success";
                            resobj2.Message = "Validation done for Policy Start Date";
                            resobj2.Code = "EXP006";

                        }
                        engineResponses.Add(resobj2);
                    }
                    catch (Exception Ex)
                    {
                        throw Ex;
                    }

                    return engineResponses;


                case "Policy":
                    //RuleThreeDTO ruleThreeDTO = new RuleThreeDTO();
                    //ruleThreeDTO.RuleName = "30021";
                    //ruleThreeDTO.DriverDocumentPage = SourceObject[""];
                    //ruleThreeDTO.RCCopy = SourceObject[""];
                    //ruleThreeDTO.DriverLicence = SourceObject[""];
                    //ruleThreeDTO.UnderBodyImage = SourceObject[""];
                    //ruleThreeDTO.WindScreenGlassImage = SourceObject[""];


                    //  dynamic RuleEngine;

                    List<RuleEngineResponse> engineResponse = new List<RuleEngineResponse>();
                    try
                    {
                        // RuleEngine = await _integrationService.RuleEngine(ruleTwoDTO, context);
                        // engineResponses = JsonConvert.DeserializeObject<List<RuleEngineResponse>>(RuleEngine.ToString());


                        DateTime Startdate = Convert.ToDateTime(SourceObject["Policy Start Date"]);
                        DateTime Enddate = Convert.ToDateTime(SourceObject["Policy End Date"]);
                        //int successcount = 0;
                        //int failcount = 0;

                        if (Enddate > Startdate)
                        {
                            RuleEngineResponse resobj = new RuleEngineResponse();
                            resobj.ValidatorName = "Policy Start Date";
                            resobj.Outcome = "Success";
                            resobj.Message = "Validation done for Policy Start Date";
                            resobj.Code = "EXPO001";

                            engineResponse.Add(resobj);
                            successcount++;
                        }
                        else
                        {
                            RuleEngineResponse resobj = new RuleEngineResponse();
                            resobj.ValidatorName = "Policy Start Date";
                            resobj.Outcome = "Fail";
                            resobj.Message = "Start date is greater than End date";
                            resobj.Code = "EXPO002";
                            engineResponse.Add(resobj);
                            failcount++;
                        }
                        if (Startdate.Date >= Currentdate.Date)
                        {
                            RuleEngineResponse resobj = new RuleEngineResponse();
                            resobj.ValidatorName = "Policy Start Date";
                            resobj.Outcome = "Success";
                            resobj.Message = "Validation done for Policy Start Date";
                            resobj.Code = "EXPO003";

                            engineResponse.Add(resobj);
                            successcount++;
                        }
                        else
                        {
                            RuleEngineResponse resobj = new RuleEngineResponse();
                            resobj.ValidatorName = "Policy Start Date";
                            resobj.Outcome = "Fail";
                            resobj.Message = "Start date is not greater then current date";
                            resobj.Code = "EXPO004";
                            engineResponse.Add(resobj);
                            failcount++;
                        }

                        if (Startdate.Date <= (Currentdate.Date.AddDays(30)))
                        {
                            RuleEngineResponse resobj = new RuleEngineResponse();
                            resobj.ValidatorName = "Policy Start Date";
                            resobj.Outcome = "Success";
                            resobj.Message = "Validation done for Policy Start Date";
                            resobj.Code = "EXPO005";

                            engineResponse.Add(resobj);
                            successcount++;
                        }
                        else
                        {
                            RuleEngineResponse resobj = new RuleEngineResponse();
                            resobj.ValidatorName = "Policy Start Date";
                            resobj.Outcome = "Fail";
                            resobj.Message = "Start date is not within one month";
                            resobj.Code = "EXPO006";
                            engineResponse.Add(resobj);
                            failcount++;
                        }


                        if (Enddate.Date == Startdate.Date.AddDays(364))
                        {
                            RuleEngineResponse res1obj = new RuleEngineResponse();
                            res1obj.ValidatorName = "Policy End Date";
                            res1obj.Outcome = "Success";
                            res1obj.Message = "Validation done for Policy End Date";
                            res1obj.Code = "EXPO007";

                            engineResponse.Add(res1obj);
                            successcount++;
                        }
                        else
                        {
                            RuleEngineResponse res1obj = new RuleEngineResponse();
                            res1obj.ValidatorName = "Policy End Date";
                            res1obj.Outcome = "Fail";
                            res1obj.Message = "End date is not equal to 364 days from Start date";
                            res1obj.Code = "EXPO008";

                            engineResponse.Add(res1obj);
                            failcount++;
                        }
                        var Endtime = Enddate.ToString("HH:mm");
                        string tm = "23:59";
                        if (Endtime == tm)
                        {
                            RuleEngineResponse res3obj = new RuleEngineResponse();
                            res3obj.ValidatorName = "Policy End Time";
                            res3obj.Outcome = "Success";
                            res3obj.Message = "Validation done for Policy End Date";
                            res3obj.Code = "EXPO009";

                            engineResponse.Add(res3obj);
                            successcount++;
                        }
                        else
                        {
                            RuleEngineResponse res3obj = new RuleEngineResponse();
                            res3obj.ValidatorName = "Policy End Time";
                            res3obj.Outcome = "Fail";
                            res3obj.Message = "Policy End time is not valid";
                            res3obj.Code = "EXPO010";

                            engineResponse.Add(res3obj);
                            failcount++;
                        }

                        if (failcount > 0)
                        {
                            RuleEngineResponse res4obj = new RuleEngineResponse();
                            res4obj.ValidatorName = "Final Result";
                            res4obj.Outcome = "Fail";
                            res4obj.Message = "One or More conditions failed";
                            res4obj.Code = "EXPO011";
                            engineResponse.Add(res4obj);
                        }
                        else
                        {
                            RuleEngineResponse res4obj = new RuleEngineResponse();
                            res4obj.ValidatorName = "Final Result";
                            res4obj.Outcome = "Success";
                            res4obj.Message = "Conditions Successful";
                            res4obj.Code = "EXPO012";
                            engineResponse.Add(res4obj);

                        }
                    }
                    catch (Exception Ex)
                    {
                        throw Ex;
                    }

                    return engineResponse;


                //PolicyBazaar Related Validation            
                case "PolicyCreation":
                  return  GenericMapper(SourceObject);            

               // case "EndorsementAdd":
             
            //    case "EndorsementDel":


                //   return CdModel;



                //case "SwitchOnOff":

                //    return CdModel;

                //case "Schedule":

                //    return CdModel;

                case "Claim":

                    var claiminsurable = SourceObject["ClaimInsurable"];
                    var policyno = SourceObject["PolicyNumber"].ToString();
                  //  var lossdatetime = SourceObject["lossDateTime"].ToString();

                    DateTime lossdatetime = Convert.ToDateTime(SourceObject["lossDateTime"]);
                    //var month = lossdatetime.Month;
                    var month = lossdatetime.ToString("MMMM");
                    List<RuleEngineResponse> engineResponse3 = new List<RuleEngineResponse>();
                    //int successcount = 0;
                    //int failcount = 0;

                    try
                    {
                       if(claiminsurable.Count > 1)
                        {
                            RuleEngineResponse res4obj = new RuleEngineResponse();
                            res4obj.ValidatorName = "Claim Insurable";
                            res4obj.Outcome = "Fail";
                            res4obj.Message = "Claim Intimation cannot be done for more than one cover at a time";
                            res4obj.Code = "EXPO011";
                            engineResponse3.Add(res4obj);
                            failcount++;
                        }
                        else
                        {
                            RuleEngineResponse res4obj = new RuleEngineResponse();
                            res4obj.ValidatorName = "Claim Insurable";
                            res4obj.Outcome = "Success";
                            res4obj.Message = "Claim Intimation successful";
                            res4obj.Code = "EXPO012";
                            engineResponse3.Add(res4obj);
                            successcount++;


                        }
                       for(int i=0; i < claiminsurable.Count; i++) { 
                       if(claiminsurable[i].coverName == "Accidental Damage") {
                        ActivityResponse status = ActivityReport(policyno, month,context);
                                if(status.ActivityDTO.Count > 0)
                                {                
                                    var filter = status.ActivityDTO.Where(x => x.DateTime.Value.Date == lossdatetime.Date).LastOrDefault();
                                    
                                   
                                        if (filter.SwitchState == "0")
                                        {
                                            RuleEngineResponse res4obj = new RuleEngineResponse();
                                            res4obj.ValidatorName = "Claim Vehicle Status";
                                            res4obj.Outcome = "Fail";
                                            res4obj.Message = "Claim cannot be intimated as the Vehicle Status is switched off";
                                            res4obj.Code = "EXPO011";
                                            engineResponse3.Add(res4obj);
                                            failcount++;
                                        }
                                      
                                        else
                                        {
                                            RuleEngineResponse res4obj = new RuleEngineResponse();
                                            res4obj.ValidatorName = "Claim Vehicle Status";
                                            res4obj.Outcome = "Success";
                                            res4obj.Message = "Claim Intimation successful";
                                            res4obj.Code = "EXPO012";
                                            engineResponse3.Add(res4obj);
                                            successcount++;

                                        }
                                    }
                              
                                else
                                {
                                    RuleEngineResponse res4obj = new RuleEngineResponse();
                                    res4obj.ValidatorName = "Claim Vehicle Activity";
                                    res4obj.Outcome = "Fail";
                                    res4obj.Message = "No records found in activity log";
                                    res4obj.Code = "EXPO012";
                                    engineResponse3.Add(res4obj);
                                    failcount++;
                                }
                            }
                        }
                        if (failcount > 0)
                        {
                            RuleEngineResponse res4obj = new RuleEngineResponse();
                            res4obj.ValidatorName = "Final Result";
                            res4obj.Outcome = "Fail";
                            res4obj.Message = "One or More conditions failed";
                            res4obj.Code = "EXPO011";
                            engineResponse3.Add(res4obj);
                        }
                        else
                        {
                            RuleEngineResponse res4obj = new RuleEngineResponse();
                            res4obj.ValidatorName = "Final Result";
                            res4obj.Outcome = "Success";
                            res4obj.Message = "Conditions Successful";
                            res4obj.Code = "EXPO012";
                            engineResponse3.Add(res4obj);

                        }
                    }
                    catch (Exception Ex)
                    {
                        throw Ex;
                    }

                    return engineResponse3;
            }

            return new List<RuleEngineResponse>();

        }


        public async Task<dynamic> EndorsementPremium(EndorsementPremiumDTO endorsementPremium, dynamic PolicyObject, string callType, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            var CurrentDate = IndianTime.Date;           

            PremiumReturnDto DifferentialPremium = new PremiumReturnDto();

            if (String.IsNullOrEmpty(endorsementPremium.PolicyNo))
            {
                ErrorInfo errorInfo = new ErrorInfo();

                DifferentialPremium.ResponseMessage = "Mandatory Fields missing";
                DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Policy Number is Missing";
                errorInfo.ErrorCode = "GEN002";
                errorInfo.PropertyName = "MandatoryFieldsMissing";
                DifferentialPremium.Errors.Add(errorInfo);
                return DifferentialPremium;

            }
            else if(endorsementPremium.SI <= 0)
            {
                ErrorInfo errorInfo = new ErrorInfo();

                DifferentialPremium.ResponseMessage = "SumInsured Cannot be negative or zero";
                DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "SumInsured Cannot be negative or zero";
                errorInfo.ErrorCode = "ExtEP005";
                errorInfo.PropertyName = "SumInsured";
                DifferentialPremium.Errors.Add(errorInfo);
                return DifferentialPremium;
            }
            else if (endorsementPremium.PcCount < 0)
            {
                ErrorInfo errorInfo = new ErrorInfo();

                DifferentialPremium.ResponseMessage = "Private Car Count Cannot be negative";
                DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "PC Count Cannot be negative";
                errorInfo.ErrorCode = "ExtEP001";
                errorInfo.PropertyName = "PCCountVerify";
                DifferentialPremium.Errors.Add(errorInfo);
                return DifferentialPremium;

            }
            else if (endorsementPremium.TwCount < 0)
            {
                ErrorInfo errorInfo = new ErrorInfo();

                DifferentialPremium.ResponseMessage = "Two Wheeler Count Cannot be negative";
                DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Two Wheeler Count Cannot be negative";
                errorInfo.ErrorCode = "ExtEP004";
                errorInfo.PropertyName = "TWCountVerify";
                DifferentialPremium.Errors.Add(errorInfo);
                return DifferentialPremium;

            }


            if (endorsementPremium.TypeOfEndorsement == "Addition")
            {
                dynamic PolicyData = null;

                if (PolicyObject == null)
                {
                    //Get the Policy Details by PolicyNumber
                    //In response from Policy
                    PolicyData = await _integrationService.GetPolicyDetails(endorsementPremium.PolicyNo, context);
                }
                else
                {
                    PolicyData = PolicyObject;
                }

                PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();

                var BillingFrequency = "";
                DateTime PolicyStartDate;
                DateTime PolicyEndDate;
                double RemainingDays = 0;

                if (PolicyData != null)
                {
                    try
                    {
                        detailsDTO.SumInsured = PolicyData["si"];
                        detailsDTO.NoOfPC = PolicyData["noOfPC"];
                        detailsDTO.NoOfTW = PolicyData["noOfTW"];
                        detailsDTO.PD_Age = PolicyData["driverAge"];
                        detailsDTO.PD_DriveExperince = PolicyData["driverExp"];
                        detailsDTO.AdditionalDriver = PolicyData["additionalDriver"];
                        detailsDTO.StateCode = PolicyData["stateCode"];
                        BillingFrequency = PolicyData["billingFrequency"];
                        PolicyStartDate = Convert.ToDateTime(PolicyData["Policy Start Date"]);
                        PolicyEndDate = Convert.ToDateTime(PolicyData["Policy End Date"]);
                        
                        if (PolicyStartDate.Date > CurrentDate.Date)
                        {
                            //Adding 1 because it should give in between days.
                            RemainingDays = (PolicyEndDate.Date - PolicyStartDate.Date).TotalDays + 1;
                        }
                        else
                        {
                            //Adding 1 because it should give in between days.
                            RemainingDays = (PolicyEndDate.Date - CurrentDate.Date).TotalDays + 1;
                        }
                    }
                    catch (Exception Ex)
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        DifferentialPremium.ResponseMessage = "Policy Data Not Parsed";
                        DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                        errorInfo.ErrorMessage = "Policy Data Not Parsed";
                        errorInfo.ErrorCode = "ExtEP";
                        errorInfo.PropertyName = "CheckPolicyObject";
                        DifferentialPremium.Errors.Add(errorInfo);
                        return DifferentialPremium;
                    }
                }

                TaxTypeDTO taxType = new TaxTypeDTO();
                taxType = await TaxTypeForStateCode(detailsDTO.StateCode, context);

                string NoADDays = "";
                string NoFTDays = RemainingDays.ToString();

                if (BillingFrequency == "Monthly")
                {
                    if (RemainingDays < 60)
                    {
                        NoADDays = NoFTDays;
                    }
                    else
                    {
                        NoADDays = "60";
                    }
                }
                else if (BillingFrequency == "Yearly")
                {
                    NoADDays = NoFTDays;
                }
                EndoRateDTO endoRate = new EndoRateDTO
                {
                    FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE,
                    TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE
                };




                //CalculatePremiumObject as of Endorsement
                SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

                //RuleObject
                premiumDTO.dictionary_rule.SI = endorsementPremium.SI.ToString();
                premiumDTO.dictionary_rule.NOOFPC = (detailsDTO.NoOfPC + endorsementPremium.PcCount).ToString();
                premiumDTO.dictionary_rule.NOOFTW = (detailsDTO.NoOfTW + endorsementPremium.TwCount).ToString();


                int TotalPCCount = detailsDTO.NoOfPC + endorsementPremium.PcCount;
                int TotalTWCount = detailsDTO.NoOfTW + endorsementPremium.TwCount;

                if (TotalPCCount > 4 || TotalPCCount == 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    DifferentialPremium.ResponseMessage = "Private Car Count Cannot be Zero or Greater than 3";
                    DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Private Car Count Cannot be Zero or Greater than 3";
                    errorInfo.ErrorCode = "ExtEP005";
                    errorInfo.PropertyName = "PCCountVerify";
                    DifferentialPremium.Errors.Add(errorInfo);
                    return DifferentialPremium;

                }
                else if (TotalTWCount > 4)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    DifferentialPremium.ResponseMessage = "Two Wheeler Count Cannot be Greater than 3";
                    DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Two Wheeler Count Cannot be Greater than 3";
                    errorInfo.ErrorCode = "ExtEP006";
                    errorInfo.PropertyName = "TWCountVerify";
                    DifferentialPremium.Errors.Add(errorInfo);
                    return DifferentialPremium;

                }


                //RateObject

                premiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince.ToString();
                premiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age.ToString();
                premiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver.ToString();
                premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = TotalPCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = TotalPCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = TotalTWCount.ToString();


                premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;





                //Call CalculatePremium for with Endorsment Data MICA
                var NewPremiumData = await NewInternalCalculatePremium(premiumDTO, BillingFrequency,context);


                if (NewPremiumData == null)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    DifferentialPremium.ResponseMessage = "Calculate Premium Failed";
                    DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Calculate Premium Failed";
                    errorInfo.ErrorCode = "ExtEP003";
                    errorInfo.PropertyName = "PremiumFailed";
                    DifferentialPremium.Errors.Add(errorInfo);
                    return DifferentialPremium;

                }



                //CalculatePremiumObject for Getting Old Premium Rate
                SchedulerPremiumDTO oldPremiumDTO = new SchedulerPremiumDTO();

                //RuleObject
                oldPremiumDTO.dictionary_rule.SI = detailsDTO.SumInsured.ToString();
                oldPremiumDTO.dictionary_rule.NOOFPC = detailsDTO.NoOfPC.ToString();
                oldPremiumDTO.dictionary_rule.NOOFTW = detailsDTO.NoOfTW.ToString();


                //RateObject
                oldPremiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince.ToString();
                oldPremiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age.ToString();
                oldPremiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver.ToString();
                oldPremiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = detailsDTO.NoOfPC.ToString();
                oldPremiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = detailsDTO.NoOfPC.ToString();
                oldPremiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = detailsDTO.NoOfTW.ToString();


                oldPremiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                oldPremiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;


                //Call CalculatePremium for with Endorsment Data MICA
                var OldPremiumData = await NewInternalCalculatePremium(oldPremiumDTO, BillingFrequency,context);



                if (NewPremiumData.Total > 0 && OldPremiumData.Total > 0)
                {

                    var DifferentialFireTheft = NewPremiumData.FtPerDay - OldPremiumData.FtPerDay;
                    var DifferentialADPremium = NewPremiumData.AdPerDay - OldPremiumData.AdPerDay;

                    EndoRuleDTO endoRule = new EndoRuleDTO
                    {
                        AD = DifferentialADPremium.ToString(),
                        FT = DifferentialFireTheft.ToString(),
                        ADDAYS = NoADDays,
                        FTDAYS = NoFTDays
                    };

                    EndorsementCalDTO endorsementCal = new EndorsementCalDTO();

                    endorsementCal.dictionary_rule = endoRule;
                    endorsementCal.dictionary_rate = endoRate;

                    var CallEndorsmentCalculator = await EndorsementCalculator(endorsementCal,context);

                    if (callType == "CDUpdate")
                    {
                        ///<summary>
                        ///This is Used for CD Mapper Method 
                        /// for giving the CD Mapping Entries
                        /// </summary>

                        CalculationResult calculation = new CalculationResult();

                        calculation.Entity = "DifferentialFTPerDay";
                        calculation.EValue = DifferentialFireTheft.ToString();
                        CallEndorsmentCalculator.Add(calculation);

                        calculation = new CalculationResult();
                        calculation.Entity = "DifferentialADPerDay";
                        calculation.EValue = DifferentialADPremium.ToString();
                        CallEndorsmentCalculator.Add(calculation);

                        calculation = new CalculationResult();
                        calculation.Entity = "NewFTPerDay";
                        calculation.EValue = NewPremiumData.FtPerDay.ToString();
                        CallEndorsmentCalculator.Add(calculation);

                        calculation = new CalculationResult();
                        calculation.Entity = "NewADPerDay";
                        calculation.EValue = NewPremiumData.AdPerDay.ToString();
                        CallEndorsmentCalculator.Add(calculation);


                        return CallEndorsmentCalculator;
                    }
                    else
                    {
                        if (CallEndorsmentCalculator.Count > 0)
                        {
                            DifferentialPremium.PerDayPremium = Math.Round((NewPremiumData.PerDayPremium - OldPremiumData.PerDayPremium), 2);
                            DifferentialPremium.FireTheft = Math.Round(Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTPREM").EValue), 2);
                            DifferentialPremium.ADPremium = Math.Round(Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "ADPREM").EValue), 2);

                            var GSTTotal = Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "ADFTTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTFMTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTTSTAX").EValue);

                            DifferentialPremium.GST = Math.Round(GSTTotal, 2);

                            DifferentialPremium.MonthlyPremium = Math.Round((NewPremiumData.MonthlyPremium - OldPremiumData.MonthlyPremium), 2);
                            DifferentialPremium.Total = Math.Round((DifferentialPremium.FireTheft + DifferentialPremium.ADPremium + GSTTotal), 2);
                            DifferentialPremium.FinalAmount = Math.Round(DifferentialPremium.Total);
                        }
                        else
                        {
                            ErrorInfo errorInfo = new ErrorInfo();

                            DifferentialPremium.ResponseMessage = "MICA Endorsement Calculation Failed";
                            DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                            errorInfo.ErrorMessage = "Endorsement Calculation Failed";
                            errorInfo.ErrorCode = "ExtEP";
                            errorInfo.PropertyName = "CalculationFailed";
                            DifferentialPremium.Errors.Add(errorInfo);
                            return DifferentialPremium;
                        }

                    }

                    DifferentialPremium.Status = BusinessStatus.Ok;
                    return DifferentialPremium;
                }
            }
            if (endorsementPremium.TypeOfEndorsement == "Deletion")
            {

                dynamic PolicyData = null;

                if (PolicyObject == null)
                {
                    //Get the Policy Details by PolicyNumber
                    //In response from Policy
                    PolicyData = await _integrationService.GetPolicyDetails(endorsementPremium.PolicyNo, context);
                }
                else
                {
                    PolicyData = PolicyObject;
                }


                PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();

                var BillingFrequency = "";
                DateTime PolicyStartDate;
                DateTime PolicyEndDate;
                double RemainingDays = 0;


                if (PolicyData != null)
                {

                    try
                    {
                        detailsDTO.SumInsured = PolicyData["si"];
                        detailsDTO.NoOfPC = PolicyData["noOfPC"];
                        detailsDTO.NoOfTW = PolicyData["noOfTW"];
                        detailsDTO.PD_Age = PolicyData["driverAge"];
                        detailsDTO.PD_DriveExperince = PolicyData["driverExp"];
                        detailsDTO.AdditionalDriver = PolicyData["additionalDriver"];
                        detailsDTO.StateCode = PolicyData["stateCode"];
                        BillingFrequency = PolicyData["billingFrequency"];
                        PolicyStartDate = Convert.ToDateTime(PolicyData["Policy Start Date"]);
                        PolicyEndDate = Convert.ToDateTime(PolicyData["Policy End Date"]);

                        if (PolicyStartDate.Date > CurrentDate.Date)
                        {
                            RemainingDays = (PolicyEndDate.Date - PolicyStartDate.Date).TotalDays + 1; 
                        }
                        else
                        {
                            RemainingDays = (PolicyEndDate.Date - CurrentDate.Date).TotalDays;
                        }                      

                    }
                    catch (Exception Ex)
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        DifferentialPremium.ResponseMessage = "Policy Data Not Parsed";
                        DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                        errorInfo.ErrorMessage = "Policy Data Not Parsed";
                        errorInfo.ErrorCode = "ExtEP";
                        errorInfo.PropertyName = "CheckPolicyObject";
                        DifferentialPremium.Errors.Add(errorInfo);
                        return DifferentialPremium;
                    }
                }


                TaxTypeDTO taxType = new TaxTypeDTO();
                taxType = await TaxTypeForStateCode(detailsDTO.StateCode, context);

                string NoADDays = "";
                string NoFTDays = RemainingDays.ToString();

                if (BillingFrequency == "Monthly")
                {
                    if (RemainingDays < 60)
                    {
                        NoADDays = NoFTDays;
                    }
                    else
                    {
                        NoADDays = "60";
                    }
                }
                else if (BillingFrequency == "Yearly")
                {
                    NoADDays = NoFTDays;
                }
                EndoRateDTO endoRate = new EndoRateDTO
                {
                    FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE,
                    TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE
                };


                //CalculatePremiumObject as of Endorsement
                SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();




                //RuleObject
                premiumDTO.dictionary_rule.SI = endorsementPremium.SI.ToString();
                premiumDTO.dictionary_rule.NOOFPC = (detailsDTO.NoOfPC - endorsementPremium.PcCount).ToString();
                premiumDTO.dictionary_rule.NOOFTW = (detailsDTO.NoOfTW - endorsementPremium.TwCount).ToString();




                int TotalPCCount = detailsDTO.NoOfPC - endorsementPremium.PcCount;
                int TotalTWCount = detailsDTO.NoOfTW - endorsementPremium.TwCount;

                if (TotalPCCount > 4 || TotalPCCount == 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    DifferentialPremium.ResponseMessage = "Private Car Count Cannot be Zero or Greater than 3";
                    DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Private Car Count Cannot be Zero or Greater than 3";
                    errorInfo.ErrorCode = "ExtEP005";
                    errorInfo.PropertyName = "PCCountVerify";
                    DifferentialPremium.Errors.Add(errorInfo);
                    return DifferentialPremium;

                }
                else if (TotalTWCount > 4 || TotalTWCount < 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    DifferentialPremium.ResponseMessage = "Two Wheeler Count Cannot  Negative or be Greater than 3";
                    DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Two Wheeler Count Cannot be Negative or Greater than 3";
                    errorInfo.ErrorCode = "ExtEP006";
                    errorInfo.PropertyName = "TWCountVerify";
                    DifferentialPremium.Errors.Add(errorInfo);
                    return DifferentialPremium;

                }

                //RateObject

                premiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince.ToString();
                premiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age.ToString();
                premiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver.ToString();
                premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = TotalPCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = TotalPCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = TotalTWCount.ToString();


                premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

                //Call CalculatePremium for with Endorsment Data MICA
                var NewPremiumData = await NewInternalCalculatePremium(premiumDTO, BillingFrequency,context);


                if (NewPremiumData == null)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    DifferentialPremium.ResponseMessage = "Calculate Premium Failed";
                    DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Calculate Premium Failed";
                    errorInfo.ErrorCode = "ExtEP003";
                    errorInfo.PropertyName = "PremiumFailed";
                    DifferentialPremium.Errors.Add(errorInfo);
                    return DifferentialPremium;

                }



                //CalculatePremiumObject for Getting Old Premium Rate
                SchedulerPremiumDTO oldPremiumDTO = new SchedulerPremiumDTO();

                //RuleObject
                oldPremiumDTO.dictionary_rule.SI = detailsDTO.SumInsured.ToString();
                oldPremiumDTO.dictionary_rule.NOOFPC = detailsDTO.NoOfPC.ToString();
                oldPremiumDTO.dictionary_rule.NOOFTW = detailsDTO.NoOfTW.ToString();


                //RateObject
                oldPremiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince.ToString();
                oldPremiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age.ToString();
                oldPremiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver.ToString();
                oldPremiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = detailsDTO.NoOfPC.ToString();
                oldPremiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = detailsDTO.NoOfPC.ToString();
                oldPremiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = detailsDTO.NoOfTW.ToString();


                oldPremiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                oldPremiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;


                //Call CalculatePremium for with Endorsment Data MICA
                var OldPremiumData = await NewInternalCalculatePremium(oldPremiumDTO, BillingFrequency,context);



                if (NewPremiumData.Total > 0 && OldPremiumData.Total > 0)
                {
                    var DifferentialFireTheft = NewPremiumData.FtPerDay - OldPremiumData.FtPerDay;

                    //Before
                    //var DifferentialADPremium = NewPremiumData.AdPerDay - OldPremiumData.AdPerDay;

                    //After
                    //Because the Difference is not relevant in this vehicle deletion case - ravi sir 
                    var DifferentialADPremium = 0;

                    EndoRuleDTO endoRule = new EndoRuleDTO
                    {
                        AD = DifferentialADPremium.ToString(),
                        FT = DifferentialFireTheft.ToString(),
                        ADDAYS = NoADDays,
                        FTDAYS = NoFTDays
                    };

                    EndorsementCalDTO endorsementCal = new EndorsementCalDTO();

                    endorsementCal.dictionary_rule = endoRule;
                    endorsementCal.dictionary_rate = endoRate;

                    var CallEndorsmentCalculator = await EndorsementCalculator(endorsementCal,context);

                    if (callType == "CDUpdate")
                    {
                        ///<summary>
                        ///This is Used for CD Mapper Method 
                        /// for giving the CD Mapping Entries
                        /// </summary>

                        CalculationResult calculation = new CalculationResult();

                        calculation.Entity = "DifferentialFTPerDay";
                        calculation.EValue = DifferentialFireTheft.ToString();
                        CallEndorsmentCalculator.Add(calculation);

                        calculation = new CalculationResult();
                        calculation.Entity = "DifferentialADPerDay";
                        calculation.EValue = DifferentialADPremium.ToString();
                        CallEndorsmentCalculator.Add(calculation);

                        calculation = new CalculationResult();
                        calculation.Entity = "NewFTPerDay";
                        calculation.EValue = NewPremiumData.FtPerDay.ToString();
                        CallEndorsmentCalculator.Add(calculation);

                        calculation = new CalculationResult();
                        calculation.Entity = "NewADPerDay";
                        calculation.EValue = NewPremiumData.AdPerDay.ToString();
                        CallEndorsmentCalculator.Add(calculation);


                        return CallEndorsmentCalculator;
                    }
                    else
                    {
                        if (CallEndorsmentCalculator.Count > 0)
                        {
                            DifferentialPremium.PerDayPremium = Math.Round(NewPremiumData.PerDayPremium, 2);
                            DifferentialPremium.FireTheft = Math.Round(Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTPREM").EValue), 2);
                            DifferentialPremium.ADPremium = Math.Round(Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "ADPREM").EValue), 2);

                            var GSTTotal = Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "ADFTTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTFMTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTTSTAX").EValue);

                            DifferentialPremium.GST = Math.Round(GSTTotal, 2);

                            DifferentialPremium.MonthlyPremium = Math.Round(NewPremiumData.MonthlyPremium, 2);
                            DifferentialPremium.Total = Math.Round((DifferentialPremium.FireTheft + DifferentialPremium.ADPremium + GSTTotal), 2);
                            DifferentialPremium.FinalAmount = Math.Round(DifferentialPremium.Total);

                        }

                        //var CDData = await _integrationService.InternalGetPolicyDetailsByNumber(endorsementPremium.PolicyNo, apiContext);

                        //var CdaccountNumber = (string)CDData["CDAccountNumber"];


                        //if (CdaccountNumber != null)
                        //{
                        //    CDBalanceDTO FtAccountdetails = await _integrationService.GetCDAccountDetails(CdaccountNumber, "FT", apiContext);
                        //    CDBalanceDTO accountdetails = await _integrationService.GetCDAccountDetails(CdaccountNumber, "AD", apiContext);
                        //    DifferentialPremium.ADPremium = Convert.ToDecimal(accountdetails.TxnAmountBalance + FtAccountdetails.TxnAmountBalance)*(-1);
                        //    DifferentialPremium.GST += Convert.ToDecimal(accountdetails.TaxAmountBalance + FtAccountdetails.TaxAmountBalance) * (-1);
                        //    DifferentialPremium.Total = Math.Round((DifferentialPremium.FireTheft + DifferentialPremium.ADPremium + DifferentialPremium.GST), 2);
                        //    DifferentialPremium.FinalAmount = Math.Round(DifferentialPremium.Total);
                        //}

                    }

                    DifferentialPremium.Status = BusinessStatus.Ok;
                    return DifferentialPremium;
                }
            }
            else
            {
                ErrorInfo errorInfo = new ErrorInfo();

                DifferentialPremium.ResponseMessage = "Type of Endorsement Cannot be Different";
                DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Either Addition or Deletion";
                errorInfo.ErrorCode = "ExtEP002";
                errorInfo.PropertyName = "TypeOfEndorsement";
                DifferentialPremium.Errors.Add(errorInfo);
                return DifferentialPremium;
            }

            return DifferentialPremium;

        }


        private async Task<EndoPremiumReturnDto> NewInternalCalculatePremium(SchedulerPremiumDTO premiumDTO, string BillingFrequency,ApiContext context)
        {
            EndoPremiumReturnDto returnobj = new EndoPremiumReturnDto();

            //Call CalculatePremium Policy Module MICA
            var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, context);

            List<CalculationResult> val = new List<CalculationResult>();
            CDDTO CdModel = new CDDTO();

            if (CalPremiumResponse != null)
            {
                val = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());
            }


            if (val.Count() > 0)
            {


                var Ftperday = 0.00;
                //FT-PerDay [Without Tax] [Rating Module]
                var fire = val.FirstOrDefault(x => x.Entity == "FTPM").EValue;
                //AD-PerDay [Without Tax] [Rating Module]
                var AD = val.FirstOrDefault(x => x.Entity == "ADPMPD").EValue;
                Ftperday = Ftperday + Convert.ToDouble(fire) + Convert.ToDouble(AD);

                var Ft30days = Ftperday * 30;
                var Ft60days = Ftperday * 60;

                var Ft365days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FT365").EValue);
                var Ad60days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60DAYS").EValue);
                var Ad365days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365DAYS").EValue);
                var ad60fttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60FTAXAMT").EValue);
                var ad60ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60TTAXAMT").EValue);

                var ad365ftax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365FTAXAMT").EValue);
                var ad365ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365TTAXAMT").EValue);

                var ad30days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30DAYS").EValue);
                var ad30ftax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30FTAXAMT").EValue);
                var ad30ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30TTAXAMT").EValue);

                var ftfttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTFTAXAMT").EValue);
                var ftttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTTTAXAMT").EValue);

                var monthlyGST = ad60fttax + ad60ttax + ftfttax + ftttax;
                var yearlyGST = ad365ftax + ad365ttax + ftfttax + ftttax;


                returnobj.FtPerDay = Convert.ToDecimal(fire);
                returnobj.AdPerDay = Convert.ToDecimal(AD);
                returnobj.PerDayPremium = Convert.ToDecimal(Ftperday);
                returnobj.FireTheft = Convert.ToDecimal(Ft365days);

                if (BillingFrequency == "Monthly")
                {
                    returnobj.ADPremium = Convert.ToDecimal(Ad60days);
                    returnobj.GST = Convert.ToDecimal(monthlyGST);
                    returnobj.MonthlyPremium = ad30days + Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax);
                }
                else if (BillingFrequency == "Yearly")
                {
                    returnobj.ADPremium = Convert.ToDecimal(Ad365days);
                    returnobj.GST = Convert.ToDecimal(yearlyGST);
                }
                returnobj.Total = returnobj.FireTheft + returnobj.ADPremium + returnobj.GST;

                returnobj.FinalAmount = Math.Round(returnobj.Total);
                returnobj.Status = BusinessStatus.Ok;
                return returnobj;

            }

            return returnobj;
        }


        private async Task<List<CalculationResult>> EndorsementCalculator(EndorsementCalDTO endorsementCal,ApiContext context)
        {         
            var CallEndrosmentRating = await _integrationService.EndorsementCalculator(endorsementCal, context);

            List<CalculationResult> RatingResponnse = new List<CalculationResult>();

            try
            {
                if (CallEndrosmentRating != null)
                {
                    RatingResponnse = JsonConvert.DeserializeObject<List<CalculationResult>>(CallEndrosmentRating.ToString());
                }

            }
            catch (Exception Ex)
            {
                return new List<CalculationResult>();
            }


            return RatingResponnse;
        }


        public async Task<PolicyCancelReturnDto> PolicyCancellationCalculator(string PolicyNumber, dynamic PolicyObject, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            var CurrentDate = IndianTime.Date;

            PolicyCancelReturnDto cancelReturnDto = new PolicyCancelReturnDto();
                               

            dynamic PolicyData = null;

            if (PolicyObject == null)
            {
                //Get the Policy Details by PolicyNumber
                //In response from Policy
                PolicyData = await _integrationService.InternalGetPolicyDetailsByNumber(PolicyNumber, context);
            }
            else
            {
                PolicyData = PolicyObject;
            }
            SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

            var StateCode = "";
            DateTime PolicyStartDate;
            DateTime PolicyEndDate;
            double RemainingDays = 0;
            var BillingFrequency = "";

            if (PolicyData != null)
            {
                try
                {
                    premiumDTO.dictionary_rule.SI = PolicyData["si"].ToString();
                    premiumDTO.dictionary_rule.NOOFPC = PolicyData["noOfPC"].ToString();
                    premiumDTO.dictionary_rule.NOOFTW = PolicyData["noOfTW"].ToString();

                    premiumDTO.dictionary_rate.PDAGERT_PAge = PolicyData["driverAge"].ToString();
                    premiumDTO.dictionary_rate.DEXPRT_Exp = PolicyData["driverExp"].ToString();
                    premiumDTO.dictionary_rate.ADDRVRT_DRV = PolicyData["additionalDriver"].ToString();
                    premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = PolicyData["noOfPC"].ToString();
                    premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = PolicyData["noOfPC"].ToString();
                    premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = PolicyData["noOfTW"].ToString();

                    StateCode = PolicyData["stateCode"];

                    TaxTypeDTO taxType = new TaxTypeDTO();
                    taxType = await TaxTypeForStateCode(StateCode, context);

                    premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                    premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

                    BillingFrequency = PolicyData["billingFrequency"];
                    PolicyStartDate = Convert.ToDateTime(PolicyData["Policy Start Date"]);
                    PolicyEndDate = Convert.ToDateTime(PolicyData["Policy End Date"]);

                    if (PolicyStartDate.Date > CurrentDate.Date)
                    {
                        RemainingDays = (PolicyEndDate.Date - PolicyStartDate.Date).TotalDays + 1;
                    }
                    else
                    {
                        RemainingDays = (PolicyEndDate.Date - CurrentDate.Date).TotalDays;
                    }                  

                }
                catch (Exception Ex)
                {
                    ErrorInfo errorInfo = new ErrorInfo();

                    cancelReturnDto.ResponseMessage = "Policy Data Not Parsed";
                    cancelReturnDto.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "Policy Data Not Parsed";
                    errorInfo.ErrorCode = "ExtEP";
                    errorInfo.PropertyName = "CheckPolicyObject";
                    cancelReturnDto.Errors.Add(errorInfo);
                    return cancelReturnDto;
                }
            }



            EndorsementCalDTO endorsementCalDTO = new EndorsementCalDTO();

            var CallRatingCalculator = await NewInternalCalculatePremium(premiumDTO, BillingFrequency,context);


            endorsementCalDTO.dictionary_rate.FSTTAX_TAXTYPE = premiumDTO.dictionary_rate.FSTTAX_TAXTYPE;
            endorsementCalDTO.dictionary_rate.TSTTAX_TAXTYPE = premiumDTO.dictionary_rate.TSTTAX_TAXTYPE;


            endorsementCalDTO.dictionary_rule.FT = CallRatingCalculator.FtPerDay.ToString();
            endorsementCalDTO.dictionary_rule.FTDAYS = RemainingDays.ToString(); //Get from Policy Object
            endorsementCalDTO.dictionary_rule.AD = "0";
            endorsementCalDTO.dictionary_rule.ADDAYS = "0";

            cancelReturnDto.FtPerDay = CallRatingCalculator.FtPerDay;
            cancelReturnDto.AdPerDay = CallRatingCalculator.AdPerDay;


            var CallEndoCalculator = await EndorsementCalculator(endorsementCalDTO,context);

            cancelReturnDto.FromTaxType = premiumDTO.dictionary_rate.FSTTAX_TAXTYPE;
            cancelReturnDto.ToTaxType = premiumDTO.dictionary_rate.TSTTAX_TAXTYPE;
            cancelReturnDto.FireTheft = Math.Round(Convert.ToDecimal(CallEndoCalculator.FirstOrDefault(x => x.Entity == "FTPREM").EValue) * (-1), 2);
            cancelReturnDto.FTFromTax = Math.Round(Convert.ToDecimal(CallEndoCalculator.FirstOrDefault(x => x.Entity == "FTFMTAX").EValue) * (-1), 2);
            cancelReturnDto.FTToTax = Math.Round(Convert.ToDecimal(CallEndoCalculator.FirstOrDefault(x => x.Entity == "FTTSTAX").EValue) * (-1), 2);
            cancelReturnDto.Total = cancelReturnDto.FireTheft + cancelReturnDto.FTFromTax + cancelReturnDto.FTToTax;
            cancelReturnDto.FinalTotal = Math.Round(cancelReturnDto.Total);

            cancelReturnDto.Status = BusinessStatus.Ok;

            return cancelReturnDto;



        }


        public async Task<ResponseVehicleActivity> GetVehicleActivity(VehicleActivityDTO vehicleActivity, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            ResponseVehicleActivity response = new ResponseVehicleActivity();

            var checkPolicyNo = _context.TblSwitchLog.Any(x => x.PolicyNo == vehicleActivity.PolicyNumber);
            VehicleActivity vehicle = null;
            if (checkPolicyNo)
            {
                DateTime clmDate = DateTime.Now;
                //check for claim--
                if (!string.IsNullOrEmpty(vehicleActivity.ClaimNumber))
                {
                    var claim = await _integrationService.GetClaimByNumber(vehicleActivity.ClaimNumber, context);
                    if (claim != null)
                    {
                        clmDate = (DateTime)claim.CreatedDate;
                        if (claim.PolicyNumber != vehicleActivity.PolicyNumber)
                        {
                            ErrorInfo errorInfo = new ErrorInfo();
                            response.ResponseMessage = $"Mismatch between data requested --PolicyNumber {vehicleActivity.PolicyNumber} and Claim PolicyNumber {claim.PolicyNumber} are different!!";
                            response.Status = BusinessStatus.PreConditionFailed;
                            errorInfo.ErrorMessage = "No Records for this Policy Number: " + vehicleActivity.PolicyNumber;
                            errorInfo.ErrorCode = "GEN001";
                            errorInfo.PropertyName = "NoRecords";
                            response.Errors.Add(errorInfo);
                            return response;
                        }
                    }
                }
                foreach (var VehicleNumber in vehicleActivity.VehicleNumbers)
                {
                    var logData = _context.TblSwitchLog.Where(x => x.PolicyNo == vehicleActivity.PolicyNumber && x.VehicleNumber == VehicleNumber && x.CreatedDate <= clmDate)
                                                 .Select(x => new VehActivityDTO
                                                 {
                                                     DateTime = x.CreatedDate,
                                                     // VehicleNo = x.VehicleNumber,Status
                                                     // SwitchState = x.SwitchStatus.ToString(),
                                                     TriggerSwitch = x.SwitchType,
                                                     Activity = Convert.ToBoolean(x.SwitchStatus) ? "Switch On" : "Switch Off",
                                                     Status = Convert.ToBoolean(x.SwitchStatus) ? "Active" : "Inactive"
                                                 }).ToList();

                    if (logData.Count > 0)
                    {
                        vehicle = new VehicleActivity();
                        vehicle.VehicleNumber = VehicleNumber;
                        vehicle.activityDTOs.AddRange(logData);
                        response.VehicleData.Add(vehicle);

                    }

                }
                response.PolicyNumber = vehicleActivity.PolicyNumber;
                response.Status = BusinessStatus.Ok;
                response.ResponseMessage = "Success";
                return response;

            }
            else
            {
                ErrorInfo errorInfo = new ErrorInfo();
                response.ResponseMessage = "NO Records found";
                response.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "No Records for this Policy Number: " + vehicleActivity.PolicyNumber;
                errorInfo.ErrorCode = "GEN001";
                errorInfo.PropertyName = "NoRecords";
                response.Errors.Add(errorInfo);
                return response;
            }

        }


        public async Task<PolicyCancelResponse> GetRefundDetails(PolicyCancelRequest policyRequest, ApiContext apicontext)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(apicontext.ProductType, apicontext.ServerType, _configuration));

            GlobalVariables GlobalVariables = new GlobalVariables();
            PolicyCancelResponse policyCancelResponse = new PolicyCancelResponse();
            bool applicationcancel =true ;
            if (!string.IsNullOrEmpty(policyRequest.PolicyNumber))
            {
                applicationcancel = false;
            }
            else {
                applicationcancel = true;
            }

            if (!string.IsNullOrEmpty(policyRequest.PolicyNumber))
            {
                GlobalVariables.PolicyData = await _integrationService.InternalGetPolicyDetailsByNumber(policyRequest.PolicyNumber, apicontext);

                PolicyCancelReturnDto canceldetails = await PolicyCancellationCalculator(policyRequest.PolicyNumber, null, apicontext);
                policyCancelResponse.FTPremium = (-1) * canceldetails.Total;
            }
            else if (!string.IsNullOrEmpty(policyRequest.ProposalNumber)) {
                GlobalVariables.PolicyData = await _integrationService.InternalGetProposalDetailsByNumber(policyRequest.ProposalNumber, apicontext);
                policyCancelResponse.FTPremium = 0;
            }
            // var tblPolicy = _context.TblPolicy.Where(p => p.PolicyNo == policyRequest.PolicyNumber).FirstOrDefault();
            GlobalVariables.CdaccountNumber = (string)GlobalVariables.PolicyData["CDAccountNumber"];
            GlobalVariables.PolicyEndDate = (DateTime)GlobalVariables.PolicyData["Policy End Date"];
            GlobalVariables.PolicyStartDate = (DateTime)GlobalVariables.PolicyData["Policy Start Date"];
            GlobalVariables.BillingFrequency = (string)GlobalVariables.PolicyData["billingFrequency"];
           

          

            if (!string.IsNullOrEmpty(GlobalVariables.CdaccountNumber))
            {
                CDBalanceDTO FTaccountdetails = await _integrationService.GetCDAccountDetails(GlobalVariables.CdaccountNumber, "FT", apicontext);
                CDBalanceDTO accountdetails = await _integrationService.GetCDAccountDetails(GlobalVariables.CdaccountNumber, "AD", apicontext);
                if (applicationcancel) {
                    policyCancelResponse.FTPremium = FTaccountdetails.TotalAvailableBalance;
                    policyCancelResponse.ADPremium = accountdetails.TotalAvailableBalance;
                }
                else
                {
                    policyCancelResponse.ADPremium = accountdetails.TotalAvailableBalance + FTaccountdetails.TotalAvailableBalance;
                }
            }
            if (applicationcancel)
            {
                policyCancelResponse.NoofDayRemaining = 365;
            }
            else
            {
                if (GlobalVariables.PolicyStartDate.Date > policyRequest.EffectiveDate.Value.Date)
                {
                    policyCancelResponse.NoofDayRemaining = (GlobalVariables.PolicyEndDate.Date - GlobalVariables.PolicyStartDate.Date).TotalDays + 1;
                }
                else
                {
                    policyCancelResponse.NoofDayRemaining = (GlobalVariables.PolicyEndDate.Date - policyRequest.EffectiveDate.Value.Date).TotalDays;
                }


            }
            policyCancelResponse.TotalPremium = policyCancelResponse.FTPremium + policyCancelResponse.ADPremium;

            var connectionString = _configuration["ConnectionStrings:Mica_EGIConnection"];

            var switchQuery = "select count(distinct Cast(CreatedDate as Date)),PolicyNo from[QM].[tblSwitchLog] where SwitchStatus = 1 and PolicyNo ='" + policyRequest.PolicyNumber + "'group by Month(CreatedDate) , PolicyNo";


            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    //TBLSWITCHLOG
                    SqlCommand Switchcommand = new SqlCommand(switchQuery, connection);
                    DataSet Switchds = new DataSet();
                    SqlDataAdapter switchadapter = new SqlDataAdapter(Switchcommand);
                    switchadapter.Fill(Switchds, "Query1");

                    var Result = Switchds.Tables[0];
                    var Days = (Result.Rows.Count > 0) ? Result.Rows[0].ItemArray[0] : 0;

                    //Total Usage Shown
                    var usedays = Convert.ToInt32(Days);
                    // No. of days for AD
                    if (GlobalVariables.BillingFrequency == "Monthly")
                        policyCancelResponse.NoofUnusedDays = 60 - usedays;
                    else
                        policyCancelResponse.NoofUnusedDays = 365 - usedays;

                }
            }
            catch (Exception ex)
            {

            }
            return policyCancelResponse;
        }

        public async Task<PolicyStatusResponseDTO> PolicyStatusUpdate(PolicyStatusDTO policyStatus, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            PolicyStatusResponseDTO responseDTO = new PolicyStatusResponseDTO();
            if (!String.IsNullOrEmpty(policyStatus.PolicyNumber) && policyStatus.PolicyStatus != null)
            {
                var tblstatus = _mapper.Map<TblPolicyStatus>(policyStatus);
                _context.TblPolicyStatus.Add(tblstatus);
                _context.SaveChanges();

                responseDTO.PolicyStatus = policyStatus;
                responseDTO.Status = BusinessStatus.Created;
                responseDTO.MessageKey = "Success";
                responseDTO.ResponseMessage = "Success";
            }
            else
            {
                responseDTO.Status = BusinessStatus.PreConditionFailed;
                responseDTO.MessageKey = "Policy Number or Status is Null";
                responseDTO.ResponseMessage = "Fail-PreConditionFailed";
            }

            return responseDTO;
        }

        private bool CheckPolicyStatus(string PolicyNo)
        {
            if (!String.IsNullOrEmpty(PolicyNo))
            {
                var check = _context.TblPolicyStatus.Any(x => x.PolicyNumber == PolicyNo);
                return check;
            }
            return false;
        }

        public async Task<bool> MonthlySIScheduler(DateTime? dateTime, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            DateTime? CurrentIndianTime = null;

            CurrentIndianTime = System.DateTime.UtcNow.AddMinutes(330);
            DateTime CurrentDate = CurrentIndianTime.Value.Date;


            if (dateTime != null)
            {
                CurrentIndianTime = dateTime;
                CurrentDate = dateTime.Value.Date;
            }

            string ProductCode = _configuration["Mica_ApiContext:ProductCode"].ToString();     
            DateTime PolicyStartDate, NextMonth, CDFromDate, CDToDate;

            //Step-1:Get All Active Policy's 
            var PolicyDetails = await _integrationService.GetPolicyList(ProductCode, context);


            if (PolicyDetails == null || PolicyDetails.Count == 0)
            {
                return false;
            }

            var PolicyNumberList = PolicyDetails.Select(x => x.PolicyNumber).ToList();          

            PolicyNumberList.Distinct();

            //Step-2:Start the Loop Based On Policy Number
            foreach (var policy in PolicyNumberList)
            {
                var checkPolicyCancel = CheckPolicyStatus(policy);

                if (checkPolicyCancel == true)
                {
                    continue;
                }

                var BillingFrequency = PolicyDetails.FirstOrDefault(x => x.PolicyNumber == policy).BillingFrequency;


                if (BillingFrequency != "Monthly")
                {
                    continue;
                }

                TblPolicyMonthlySi monthlySiDTO = new TblPolicyMonthlySi();

                try
                {

                    PolicyStartDate = Convert.ToDateTime(PolicyDetails.FirstOrDefault(x => x.PolicyNumber == policy).PolicyStartDate);

                    var checkLastBilling = _context.TblPolicyMonthlySi.LastOrDefault(x => x.PolicyNo == policy);

                    //Policy Has Started and has no billing transaction yet
                    if (checkLastBilling == null)
                    {
                        CDFromDate = PolicyStartDate;
                        NextMonth = PolicyStartDate.AddMonths(1);
                        monthlySiDTO.DueDate = NextMonth;
                        monthlySiDTO.ReportCreatedDate = monthlySiDTO.DueDate.Value.AddDays(-2);
                        CDToDate = monthlySiDTO.ReportCreatedDate.Value.AddDays(-1);
                    }
                    else
                    {
                        //Billing Details Exsists for this Policy Transaction 
                        DateTime LastMonthDueDate = checkLastBilling.DueDate.Value.Date;
                        CDFromDate = checkLastBilling.ReportCreatedDate.Value.Date;
                        monthlySiDTO.DueDate = LastMonthDueDate.AddMonths(1);
                        monthlySiDTO.ReportCreatedDate = checkLastBilling.ReportCreatedDate.Value.AddMonths(1);
                        CDToDate = monthlySiDTO.ReportCreatedDate.Value.Date.AddDays(-1);
                    }

                    if (monthlySiDTO.ReportCreatedDate.Value.Date != CurrentDate.Date)
                    {
                        //Report Date is not matching with the current 
                        //date so move to next policy.
                        continue;
                    }
                    else
                    {
                        //This Policy Number has the Reporting Date today
                        //so Insert the Monthly SI billing details.

                        CDDetailsRequestDTO detailsRequestDTO = new CDDetailsRequestDTO
                        {
                            PolicyNumber = policy,
                            FromDate = CDFromDate,
                            ToDate = CDToDate,
                        };

                        //Step-3 Get Entire Policy Details
                        var CDDetails = await _integrationService.GetCDMapperDetails(detailsRequestDTO, context);

                        int DaysChargeable = TotalUsage(policy, CDFromDate, CDToDate);

                        if (CDDetails.Count() > 0 && DaysChargeable > 0)
                        {

                            decimal ADRatePerDay = 0;

                            var CheckEndorsement = CDDetails.Any(x => x.Action == "Addition of vehicle" || x.Action == "Deletion of vehicle");

                            dynamic LatestAction = JsonConvert.DeserializeObject(CDDetails.Select(x => x).OrderByDescending(x => x.EndorsementEffectivedate).FirstOrDefault().UpdatedResponse);

                            dynamic PolicyData = JsonConvert.DeserializeObject(CDDetails.FirstOrDefault(x => x.Action == "Issue Policy").UpdatedResponse);

                            var Source = PolicyData["Source"];

                            if (Source != null)
                            {
                                monthlySiDTO.Source = Source;
                            }

                            string StateCode = PolicyData["stateCode"];
                            TaxTypeDTO TaxType = await TaxTypeForStateCode(StateCode, context);

                            monthlySiDTO.PolicyNo = policy;
                            //PolicyData
                            monthlySiDTO.PolicyStatus = PolicyData["PolicyStatus"];
                            monthlySiDTO.InsuredName = PolicyData["Name"];
                            monthlySiDTO.Phone = PolicyData["Mobile Number"];
                            monthlySiDTO.AuthPayUid = PolicyData["PaymentInfo"][0]["RefrenceNumber"];

                            //Total Usage Method
                            monthlySiDTO.NumberOfDaysChargeable = DaysChargeable;

                            if (CheckEndorsement)
                            {
                                var CumAdPerDay = LatestAction["PremiumDetails"][0]["CumAdPerDay"];
                                if (CumAdPerDay != null)
                                    ADRatePerDay = CumAdPerDay;
                                else
                                    ADRatePerDay = 0;
                            }
                            else
                            {
                                var AdPerDay = LatestAction["PremiumDetails"][0]["AdPerDay"];
                                if (AdPerDay != null)
                                    ADRatePerDay = Convert.ToDecimal(AdPerDay.ToString());
                                else
                                    ADRatePerDay = 0;
                            }

                            //AdPerDay
                            monthlySiDTO.PerDayPremium = ADRatePerDay;

                            EndorsementCalDTO endorsementCalDTO = new EndorsementCalDTO();
                            //Rate
                            endorsementCalDTO.dictionary_rate.FSTTAX_TAXTYPE = TaxType.FSTTAX_TAXTYPE;
                            endorsementCalDTO.dictionary_rate.TSTTAX_TAXTYPE = TaxType.TSTTAX_TAXTYPE;

                            //Rule
                            endorsementCalDTO.dictionary_rule.AD = monthlySiDTO.PerDayPremium.ToString();
                            endorsementCalDTO.dictionary_rule.ADDAYS = DaysChargeable.ToString();
                            endorsementCalDTO.dictionary_rule.FT = "0";
                            endorsementCalDTO.dictionary_rule.FTDAYS = "0";



                            var CalculatePremium = await EndorsementCalculator(endorsementCalDTO,context);

                            if (CalculatePremium.Count > 0)
                            {
                                monthlySiDTO.PremiumChargeable = Convert.ToDecimal(CalculatePremium.FirstOrDefault(x => x.Entity == "ADPREM").EValue);

                                monthlySiDTO.GstOnPremiumChargeable = Convert.ToDecimal(CalculatePremium.FirstOrDefault(x => x.Entity == "ADFTTAX").EValue) + Convert.ToDecimal(CalculatePremium.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue);

                                monthlySiDTO.TotalAmountChargeable = Convert.ToDecimal(monthlySiDTO.PremiumChargeable + monthlySiDTO.GstOnPremiumChargeable);

                                monthlySiDTO.Amount = monthlySiDTO.TotalAmountChargeable;

                                
                                Guid guid = Guid.NewGuid();
                                monthlySiDTO.Txnid = guid.ToString();

                                var MicaCDDTO = ADMonthlySI(CalculatePremium);


                                ExtCDDTO ExtCdModel = new ExtCDDTO();
                                ExtCdModel.micaCDDTO.Add(MicaCDDTO);
                                ExtCdModel.AccountNo = Convert.ToString(PolicyDetails.FirstOrDefault(x => x.PolicyNumber == policy).CDAccountNumber);
                                ExtCdModel.Description = "Monthly SI for Policy - " + policy;
                                ExtCdModel.Frequency = BillingFrequency;

                                monthlySiDTO.PremiumDetails = JsonConvert.SerializeObject(ExtCdModel);

                                _context.TblPolicyMonthlySi.Add(monthlySiDTO);
                                _context.SaveChanges();

                            }
                            else
                            {
                                continue;
                            }




                        }
                        else
                        {
                            continue;
                        }

                    }

                }
                catch (Exception ex)
                {
                    continue;
                }
            }

            return true;

        }

        private int TotalUsage(string PolicyNo, DateTime FromDate, DateTime ToDate)
        {
            var connectionString = _configuration["ConnectionStrings:Mica_EGIConnection"];

            var checkswitchLog = _context.TblSwitchLog.Any(x => x.PolicyNo == PolicyNo);


            if (checkswitchLog)
            {
                var switchQuery = "select count(distinct Cast(CreatedDate as Date)),Month(CreatedDate),PolicyNo from [QM].[tblSwitchLog] where SwitchStatus = 1 and PolicyNo ='" + PolicyNo + "'and Cast(CreatedDate as Date) BETWEEN '" + FromDate.Date.ToString("MM/dd/yyyy") + "' and '" + ToDate.Date.ToString("MM/dd/yyyy") + "' group by Month(CreatedDate) , PolicyNo";

                try
                {
                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        connection.Open();

                        //TBLSWITCHLOG
                        SqlCommand Switchcommand = new SqlCommand(switchQuery, connection);
                        DataSet Switchds = new DataSet();
                        SqlDataAdapter switchadapter = new SqlDataAdapter(Switchcommand);
                        switchadapter.Fill(Switchds, "Query1");

                        var Result = Switchds.Tables[0];
                        var Days = Result.Rows[0].ItemArray[0];

                        //Total Usage Shown
                        int TotalUsage = Convert.ToInt32(Days);
                        return TotalUsage;

                    }
                }
                catch (Exception ex)
                {
                    return 0;
                }

            }
            else
            {
                return 0;
            }
        }


        private MicaCDDTO ADMonthlySI(List<CalculationResult> EndoRatingObject)
        {
            MicaCDDTO CdModel = new MicaCDDTO();
            CDPremiumDTO ADPremiumDTO = new CDPremiumDTO();
            CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
            CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();
            decimal TotalTax = 0;
            //AD TAX
            //From State 
            taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "FSTTAX_TAXTYPE").EValue;
            taxTypeDTO.TaxAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADFTTAX").EValue);

            TotalTax = taxTypeDTO.TaxAmount;

            //ARRAY
            taxAmountDTO.Tax.Add(taxTypeDTO);

            taxTypeDTO = new CDTaxTypeDTO();

            //TO State
            taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x => x.Entity == "TSTTAX_TAXTYPE").EValue;
            taxTypeDTO.TaxAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue);

            TotalTax += taxTypeDTO.TaxAmount;


            taxAmountDTO.TaxAmount = TotalTax;
            taxAmountDTO.Tax.Add(taxTypeDTO);


            //AD
            ADPremiumDTO.Type = "AD";
            ADPremiumDTO.TxnAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADPREM").EValue);
            ADPremiumDTO.TotalAmount = ADPremiumDTO.TxnAmount + TotalTax;
            ADPremiumDTO.TaxAmount = taxAmountDTO;


            ////AD Credit Object

            CdModel.PremiumDTO.Add(ADPremiumDTO);
            CdModel.Type = "MonthlySIScheduler";
            CdModel.TxnType = "Credit";
            CdModel.TxnAmount = ADPremiumDTO.TxnAmount;
            CdModel.TaxAmount = TotalTax;
            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;

            return CdModel;

        }

        public async Task<MonthlySIUploadDTO> MonthlySIUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));


            string filePath = "";
            int step1 = 0;
            try
            {

                var files = httpRequest.Form.Files;
                //var docId = GetActiveResult(file.Name); HttpRequest
                DataTable dt = new DataTable();
                List<ErrorInfo> Errors = new List<ErrorInfo>();


                foreach (var file in files)
                {
                    step1++;
                    var filename = ContentDispositionHeaderValue
                                        .Parse(file.ContentDisposition)
                                        .FileName
                                        .Trim('"');

                    if (file == null || file.Length <= 0)
                    {
                        return new MonthlySIUploadDTO { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                    }
                    var path = Path.Combine("", filename);
                    filePath = Path.GetFullPath(path);
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }

                    step1++;

                    var fileExt = Path.GetExtension(file.FileName);

                    if (fileExt == ".CSV" || fileExt == ".csv")
                    {
                        step1++;

                        var CheckPolicyBazaar = FindIndex(filePath, "policy Bazaar Monthly SI Amount");
                      
                        if(CheckPolicyBazaar != 0)
                        {
                            var CsvResponse = await CSVUpload(filePath, context);
                            return CsvResponse;
                        }

                        var res = await ConvertCSVtoDataTable(filePath, context);
                        return res;
                    }
                    else
                    {
                        MonthlySIUploadDTO uploadDTO = new MonthlySIUploadDTO();

                        if (fileExt.Equals(".xlsx", StringComparison.OrdinalIgnoreCase) || fileExt.Equals(".csv", StringComparison.OrdinalIgnoreCase))
                        {     

                            //defining Global Variables
                            var errorflag = false;
                                                                                                                   
                            var sheetNameValue = "";
                            using (var stream = new MemoryStream())
                            {
                                await file.CopyToAsync(stream, cancellationToken);
                                try
                                {
                                    using (var package = new ExcelPackage(stream))
                                    {
                                        foreach (var sheetName1 in package.Workbook.Worksheets)
                                        {
                                            sheetNameValue = sheetName1.Name;
                                        }
                                        ExcelWorksheet worksheet = package.Workbook.Worksheets[sheetNameValue];
                                                                              
                                        // EPPlusHelper.GetColumnByName()
                                        int TxnidIndex = worksheet.GetColumnByName("txn Id");
                                        int payUidindex = worksheet.GetColumnByName("pay Uid");
                                        int payAmountIndex = worksheet.GetColumnByName("pay Amount");
                                        int payStatusIndex = worksheet.GetColumnByName("pay status");
                                        int paymentDateIndex = worksheet.GetColumnByName("payment Date");

                                        if (worksheet != null)
                                        {
                                            var rowCount = worksheet.Dimension.Rows;
                                            for (int row = 2; row <= rowCount; row++)
                                            {

                                                var txnid = "";
                                                var payUid = "";
                                                var payAmount = "";
                                                var payStatus = "";
                                                var PropertyName = "";                                               
                                                DateTime? paymentDate = new DateTime(2020, 1, 1, 01, 01, 01);


                                                if (worksheet.Cells[row, TxnidIndex].Text.ToString().Trim() != null)
                                                {
                                                    txnid = worksheet.Cells[row, TxnidIndex].Text.ToString().Trim();
                                                }
                                                if (worksheet.Cells[row, payUidindex].Text.ToString().Trim() != null)
                                                {
                                                    payUid = worksheet.Cells[row, payUidindex].Text.ToString().Trim();
                                                }

                                                if (worksheet.Cells[row, payAmountIndex].Text.ToString().Trim() != null)
                                                {
                                                    payAmount = worksheet.Cells[row, payAmountIndex].Text.ToString().Trim();
                                                }
                                                if (worksheet.Cells[row, payStatusIndex].Text.ToString().Trim() != null)
                                                {
                                                    payStatus = worksheet.Cells[row, payStatusIndex].Text.ToString().Trim();
                                                }
                                                if (worksheet.Cells[row, paymentDateIndex].Text.ToString().Trim() != null)
                                                {
                                                    paymentDate = EPPlusHelper.ValidateDate(worksheet.Cells[row, paymentDateIndex].Text.ToString());
                                                }


                                                if (String.IsNullOrEmpty(txnid))
                                                {

                                                    ErrorInfo errorInfo = new ErrorInfo();

                                                    errorInfo.ErrorMessage = "Txn Id Missing";
                                                    errorInfo.ErrorCode = "MSI001";
                                                    errorInfo.PropertyName = Convert.ToString(row); //Row Number
                                                    uploadDTO.Errors.Add(errorInfo);
                                                    errorflag = true;
                                                    PropertyName = Convert.ToString(row);

                                                }
                                                else
                                                {
                                                    PropertyName = txnid;
                                                }

                                                if (String.IsNullOrEmpty(payUid))
                                                {
                                                    ErrorInfo errorInfo = new ErrorInfo();

                                                    errorInfo.ErrorMessage = "Pay Uid Missing";
                                                    errorInfo.ErrorCode = "MSI002";
                                                    errorInfo.PropertyName = PropertyName;
                                                    uploadDTO.Errors.Add(errorInfo);
                                                    errorflag = true;
                                                }



                                                if (String.IsNullOrEmpty(payAmount))
                                                {
                                                    ErrorInfo errorInfo = new ErrorInfo();

                                                    errorInfo.ErrorMessage = "Pay Amount Missing";
                                                    errorInfo.ErrorCode = "MSI003";
                                                    errorInfo.PropertyName = PropertyName;
                                                    uploadDTO.Errors.Add(errorInfo);
                                                    errorflag = true;
                                                }

                                                if (String.IsNullOrEmpty(payStatus))
                                                {
                                                    ErrorInfo errorInfo = new ErrorInfo();

                                                    errorInfo.ErrorMessage = "Pay Status Missing";
                                                    errorInfo.ErrorCode = "MSI004";
                                                    errorInfo.PropertyName = PropertyName;
                                                    uploadDTO.Errors.Add(errorInfo);
                                                    errorflag = true;
                                                }

                                                if (payStatus != "Successful")
                                                {
                                                    ErrorInfo errorInfo = new ErrorInfo();

                                                    errorInfo.ErrorMessage = "Pay Status Not Sucessful";
                                                    errorInfo.ErrorCode = "MSI005";
                                                    errorInfo.PropertyName = PropertyName;
                                                    uploadDTO.Errors.Add(errorInfo);
                                                    errorflag = true;
                                                }

                                                if (paymentDate == null)
                                                {
                                                    ErrorInfo errorInfo = new ErrorInfo();

                                                    errorInfo.ErrorMessage = "Payment Date Missing / Not Proper";
                                                    errorInfo.ErrorCode = "MSI006";
                                                    errorInfo.PropertyName = PropertyName;
                                                    uploadDTO.Errors.Add(errorInfo);
                                                    errorflag = true;
                                                }


                                                var checkTxnid = _context.TblPolicyMonthlySi.Any(x => x.Txnid == txnid);

                                                if (checkTxnid == false)
                                                {
                                                    ErrorInfo errorInfo = new ErrorInfo();

                                                    errorInfo.ErrorMessage = "No Such TxnId";
                                                    errorInfo.ErrorCode = "MSI007";
                                                    errorInfo.PropertyName = PropertyName;
                                                    uploadDTO.Errors.Add(errorInfo);
                                                    errorflag = true;
                                                }

                                                if (checkTxnid == true)
                                                {
                                                    //This Helps to Find out data is saved previously or not
                                                    var checkData = _context.TblPolicyMonthlySi.LastOrDefault(x => x.Txnid == txnid);

                                                    if (!String.IsNullOrEmpty(checkData.PayUid))
                                                    {
                                                        ErrorInfo errorInfo = new ErrorInfo();
                                                        errorInfo.ErrorMessage = "Data is Already Updated for this Txn Id Duplicate Record";
                                                        errorInfo.ErrorCode = "MSI008";
                                                        errorInfo.PropertyName = PropertyName;
                                                        uploadDTO.Errors.Add(errorInfo);
                                                        errorflag = true;
                                                    }

                                                    if (!String.IsNullOrEmpty(payAmount))
                                                    {
                                                        if (Convert.ToDecimal(payAmount) < checkData.TotalAmountChargeable)
                                                        {

                                                            ErrorInfo errorInfo = new ErrorInfo();

                                                            errorInfo.ErrorMessage = "Pay Amount is Less Than the Billed Amount";
                                                            errorInfo.ErrorCode = "MSI009";
                                                            errorInfo.PropertyName = PropertyName;
                                                            uploadDTO.Errors.Add(errorInfo);
                                                            errorflag = true;
                                                        }
                                                    }

                                                }



                                                if (errorflag == false)
                                                {
                                                    var TblData = _context.TblPolicyMonthlySi.LastOrDefault(x => x.Txnid == txnid);
                                                                                                        
                                                    var CdDTO = JsonConvert.DeserializeObject<ExtCDDTO>(TblData.PremiumDetails);

                                                    var CallMicaCd = await _integrationService.MasterCDACC(CdDTO, context);

                                                    if (CallMicaCd != null)
                                                    {

                                                        TblData.PayUid = payUid;
                                                        TblData.PayAmount = payAmount;
                                                        TblData.PayStatus = payStatus;
                                                        TblData.PaymentDate = paymentDate;

                                                        _context.TblPolicyMonthlySi.Update(TblData);
                                                        _context.SaveChanges();

                                                    }
                                                    else
                                                    {
                                                        ErrorInfo errorInfo = new ErrorInfo();

                                                        errorInfo.ErrorMessage = "Technical Failure Try Again";
                                                        errorInfo.ErrorCode = "MSI010";
                                                        errorInfo.PropertyName = PropertyName;
                                                        uploadDTO.Errors.Add(errorInfo);
                                                        errorflag = true;
                                                    }


                                                }

                                                //Re-Setting Error Flag for Next Record Checking                                        
                                                errorflag = false;

                                            }

                                            if (uploadDTO.Errors.Count > 0)
                                            {
                                                uploadDTO.ResponseMessage = "Document Uploaded for Sucess One & Failed Transactions Are in Errors";
                                                uploadDTO.Status = BusinessStatus.Ok;
                                                return uploadDTO;
                                            }
                                            else
                                            {
                                                uploadDTO.ResponseMessage = $"Document Uploaded Successfully";
                                                uploadDTO.Status = BusinessStatus.Ok;
                                                return uploadDTO;
                                            }
                                        }
                                        
                                        }

                                }                               
                                catch (Exception ex)
                                {
                                    var error = ex.ToString();
                                    return new MonthlySIUploadDTO { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter", MessageKey = step1.ToString() };
                                }
                            }
                        }
                        else
                        {
                            return new MonthlySIUploadDTO { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx/csv file" };
                        }
                    }


                }
                if (Errors.Count > 0)
                {
                    return new MonthlySIUploadDTO { Status = BusinessStatus.Ok, Errors = Errors, ResponseMessage = $" {dt.Rows.Count }Document uploaded succefully with {Errors.Count} records having issues" };
                }
                else
                {
                    return new MonthlySIUploadDTO { Status = BusinessStatus.Ok, ResponseMessage = $"Document uploaded succefully!" };
                }
            }
            catch (Exception ex)
            {
                return new MonthlySIUploadDTO { Status = BusinessStatus.Error, ResponseMessage = $"Document upload error!" + ex.ToString(), MessageKey = step1.ToString() + " " + filePath };
            }
        }

        private async Task<MonthlySIUploadDTO> ConvertCSVtoDataTable(string strFilePath,ApiContext context)
        {

            MonthlySIUploadDTO uploadDTO = new MonthlySIUploadDTO();

            int logx = 0;

            StreamReader sr = null;
            try
            {
                sr = new StreamReader(strFilePath);
                string[] headers = sr.ReadLine().Split(',');
                DataTable dt = new DataTable();
                foreach (string header in headers)
                {
                    dt.Columns.Add(header);
                }
                logx++;

                //finding index of every column
                var TxnidIndex = FindIndex(strFilePath, "txn Id");
                var payUidindex = FindIndex(strFilePath, "pay Uid");
                var payAmountIndex = FindIndex(strFilePath, "pay Amount");
                var payStatusIndex = FindIndex(strFilePath, "pay status");
                var paymentDateIndex = FindIndex(strFilePath, "payment Date");

                logx++;

                var CheckPolicyBazaar = FindIndex(strFilePath, "policy Bazaar Monthly SI Amount");


                while (!sr.EndOfStream)
                {
                    string[] rows = Regex.Split(sr.ReadLine(), ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
                    DataRow dr = dt.NewRow();

                    for (int i = 0; i < headers.Length; i++)
                    {
                        dr[i] = rows[i];
                    }
                    dt.Rows.Add(dr);
                }

                var count = dt.Rows.Count;

                var errorflag = false;            


                for (var i = 0; i < count; i++)
                {
                    var txnid = dt.Rows[i][TxnidIndex].ToString().Replace("\"", "").Trim();
                    var payUid = dt.Rows[i][payUidindex].ToString().Replace("\"", "").Trim();
                    var payAmount = dt.Rows[i][payAmountIndex].ToString().Replace("\"", "").Trim();
                    var payStatus = dt.Rows[i][payStatusIndex].ToString().Replace("\"", "").Trim();

                    //EPPlusHelper - For Validation Of Date in Excel
                    var paymentDate = EPPlusHelper.ValidateDate(dt.Rows[i][paymentDateIndex].ToString().Replace("\"", "").Trim());

                    var PropertyName = "";

                    if(String.IsNullOrEmpty(txnid))
                    {
                        
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Txn Id Missing";
                        errorInfo.ErrorCode = "MSI001";
                        errorInfo.PropertyName = Convert.ToString(i+1); //Row Number
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                        PropertyName = Convert.ToString(i + 1);
                    }
                    else
                    {
                        PropertyName = txnid;
                    }

                    if (String.IsNullOrEmpty(payUid))
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Pay Uid Missing";
                        errorInfo.ErrorCode = "MSI002";
                        errorInfo.PropertyName = PropertyName; 
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;                        
                    }



                    if (String.IsNullOrEmpty(payAmount))
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Pay Amount Missing";
                        errorInfo.ErrorCode = "MSI003";
                        errorInfo.PropertyName = PropertyName;
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;                       
                    }
                   
                    if (String.IsNullOrEmpty(payStatus))
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Pay Status Missing";
                        errorInfo.ErrorCode = "MSI004";
                        errorInfo.PropertyName = PropertyName; 
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;                  
                    }

                    if (payStatus != "Successful")
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Pay Status is Not Sucessful";
                        errorInfo.ErrorCode = "MSI005";
                        errorInfo.PropertyName = PropertyName; 
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;                       
                    }
                    if (paymentDate == null)
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Payment Date Missing / Not Proper";
                        errorInfo.ErrorCode = "MSI006";
                        errorInfo.PropertyName = PropertyName;
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                    }
                                       
                    var checkTxnid = _context.TblPolicyMonthlySi.Any(x=>x.Txnid == txnid);

                    if (checkTxnid == false)
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "No Such TxnId";
                        errorInfo.ErrorCode = "MSI007";
                        errorInfo.PropertyName = PropertyName; 
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;                       
                    }

                    if (checkTxnid == true)
                    {
                        //This Helps to Find out data is saved previously or not
                        var checkData = _context.TblPolicyMonthlySi.LastOrDefault(x => x.Txnid == txnid);

                        if (!String.IsNullOrEmpty(checkData.PayUid))
                        {
                            ErrorInfo errorInfo = new ErrorInfo();
                            errorInfo.ErrorMessage = "Data is Already Updated for this Txn Id Duplicate Record";
                            errorInfo.ErrorCode = "MSI008";
                            errorInfo.PropertyName = PropertyName;
                            uploadDTO.Errors.Add(errorInfo);
                            errorflag = true;
                        }

                        if (!String.IsNullOrEmpty(payAmount))
                        {
                            if (Convert.ToDecimal(payAmount) < checkData.TotalAmountChargeable)
                            {

                                ErrorInfo errorInfo = new ErrorInfo();

                                errorInfo.ErrorMessage = "Pay Amount is Less Than the Billed Amount";
                                errorInfo.ErrorCode = "MSI009";
                                errorInfo.PropertyName = PropertyName;
                                uploadDTO.Errors.Add(errorInfo);
                                errorflag = true;
                            }
                        }

                    }



                    if (errorflag == false)
                    {
                        var TblData = _context.TblPolicyMonthlySi.LastOrDefault(x => x.Txnid == txnid);

                        var CdDTO = JsonConvert.DeserializeObject<ExtCDDTO>(TblData.PremiumDetails);

                        var CallMicaCd = await _integrationService.MasterCDACC(CdDTO, context);

                        if (CallMicaCd != null)
                        {
                            TblData.PayUid = payUid;
                            TblData.PayAmount = payAmount;
                            TblData.PayStatus = payStatus;
                            TblData.PaymentDate = paymentDate;

                            _context.TblPolicyMonthlySi.Update(TblData);
                            _context.SaveChanges();

                        }
                        else
                        {
                            ErrorInfo errorInfo = new ErrorInfo();

                            errorInfo.ErrorMessage = "Technical Failure Try Again";
                            errorInfo.ErrorCode = "MSI010";
                            errorInfo.PropertyName = PropertyName;
                            uploadDTO.Errors.Add(errorInfo);
                            errorflag = true;
                        }
                      
                    }
                   
                    //Re-Setting Error Flag for Next Record Checking                                        
                    errorflag = false;

                }



                if (uploadDTO.Errors.Count > 0)
                {
                    uploadDTO.ResponseMessage = "Document Uploaded for Sucess One & Failed Transactions Are in Errors";
                    uploadDTO.Status = BusinessStatus.Ok;
                    return uploadDTO;
                }
                else
                {
                    return new MonthlySIUploadDTO { Status = BusinessStatus.Ok, ResponseMessage = $"Document Uploaded Successfully" };
                }


            }
            catch (Exception ex)
            {
                logx++;
                return new MonthlySIUploadDTO { Status = BusinessStatus.Error, ResponseMessage = $"Document uploaded with following Erros " + ex.ToString(), MessageKey = logx.ToString() };
            }
            finally
            {
                sr.Dispose();
            }
        }

        public int FindIndex(string filepath, string columnName)
        {
            // string filepath = @"C:\Users\brajesh.kumar\Desktop\test11.csv";
            var lines = File.ReadLines(filepath);

            var lineIdx = 0;
            var colIdx = 0;

            foreach (var line in lines)
            {
                lineIdx++;
                foreach (var column in line.Split(','))
                { // split cols here
                    colIdx++;
                    if (column.Contains(columnName))
                    {
                        return colIdx - 1;
                    }
                }
                colIdx = 0; // reset col index
            }
            return colIdx;
        }

        public async Task<List<CityMasDTO>> SmartCityMaster(string searchString,ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));


            var CityData = _context.TblMasCity.Where(x => x.CityName.StartsWith(searchString))
                                                  .Select(x => new CityMasDTO
                                                  {
                                                      StateCode = "",
                                                      CityName = x.CityName,
                                                      CityId = x.CityId

                                                  }).ToList();
            return CityData;

        }

        public async Task<CityMasDTO> GetStateCode(string CityName,ApiContext context)
        {

            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            var StateID = _context.TblMasCity.FirstOrDefault(x => x.CityName == CityName).StateId;

            CityMasDTO masDTO = new CityMasDTO();
            masDTO.CityName = CityName;
            if (StateID > 0)
            {
                var StateCode = _context.TblMasState.SingleOrDefault(x => x.StateId == StateID).StateAbbreviation;
                masDTO.StateCode = StateCode;

                return masDTO;
            }

            return masDTO;

        }


        public async Task<decimal> GetSIFromMakeModel(decimal VehicleId, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));


            try
            {
                var SI = Convert.ToDecimal(_context.TblVehicleDetailsData.SingleOrDefault(x => x.VehicleId == VehicleId).SumInsured);
                return SI;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private bool VehicleInactive(List<DeletionHandleDTO> PolicyVehicleLst , List<TblSchedule> ScheduleData)
        {
           
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentDate = IndianTime.Date;


            foreach (var item in ScheduleData)
            {

                var verifyVehicle = PolicyVehicleLst.Any(x=>x.VehicleNumber == item.VehicleRegistrationNo);

                if(verifyVehicle == false)
                {
                    var getdata = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == item.PolicyNo && x.VehicleRegistrationNo == item.VehicleRegistrationNo);
                    
                    if (getdata != null)
                    {
                        if (getdata.IsActive == false)
                        {
                            continue;
                        }

                        getdata.IsActive = false;
                        _context.TblSchedule.Update(getdata);
                    }
                    else
                    {
                        continue;
                    }

                    var checkSwitchlog = _context.TblSwitchLog.LastOrDefault(x=>x.PolicyNo == item.PolicyNo && x.VehicleNumber == item.VehicleRegistrationNo && x.CreatedDate.Value.Date == CurrentDate && x.SwitchStatus == true);
                    
                    if (checkSwitchlog != null)
                    {
                       var getdailydata = _context.TblDailyActiveVehicles.LastOrDefault(x => x.PolicyNumber == item.PolicyNo && x.TxnDate.Value.Date == CurrentDate);
                        if (getdailydata != null)
                        {
                            if (item.VehicleType == "PC")
                            {
                                getdailydata.ActivePc = getdailydata.ActivePc - 1;
                            }
                            else if (item.VehicleType == "TW")
                            {
                                getdailydata.ActiveTw = getdailydata.ActiveTw - 1;
                            }
                            _context.TblDailyActiveVehicles.Update(getdailydata);

                        }
                    }
                    _context.SaveChanges();

                }
                
            }

            return true;
        }

        public async Task<ResponseStatus> VehicleStatusUpdate(VehicleStatusDTO vehicleStatus, ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));


            var getdata = _context.TblSchedule.FirstOrDefault(x=>x.PolicyNo == vehicleStatus.PolicyNumber && x.VehicleRegistrationNo == vehicleStatus.VehicleNumber);

            if(getdata != null)
            {
                getdata.IsActive = vehicleStatus.Status;
                _context.TblSchedule.Update(getdata);
                _context.SaveChanges();               
                return new ResponseStatus { Status = BusinessStatus.Ok, MessageKey = "Vehicle Status is Updated" };
            }
            else
            {
                return new ResponseStatus { Status = BusinessStatus.NotFound, MessageKey = "No Such Record Found for sent inputs" };
            }


        }

        public async Task<ResponseStatus> MonthlySIPayment(MonthlySIDTO monthlySIDTO,ApiContext context)
        {
            _context = (MICAQMContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType, _configuration));

            ResponseStatus response = new ResponseStatus();
            ErrorInfo errorInfo = new ErrorInfo();

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            if (String.IsNullOrEmpty(monthlySIDTO.PolicyNumber))
            {
                response.ResponseMessage = "Policy Number Missing";
                response.Id = monthlySIDTO.PolicyNumber;
                response.Status = BusinessStatus.InputValidationFailed;
                errorInfo.ErrorMessage = "Mandatory Field Missing";
                errorInfo.ErrorCode = "MSI003";
                errorInfo.PropertyName = "PolicyNumber";
                response.Errors.Add(errorInfo);

                return response;
            }

            if (String.IsNullOrEmpty(monthlySIDTO.PaymentReferenceId))
            {
                response.ResponseMessage = "Payment Refrence Id Missing";
                response.Id = monthlySIDTO.PaymentReferenceId;
                response.Status = BusinessStatus.InputValidationFailed;
                errorInfo.ErrorMessage = "Mandatory Field Missing";
                errorInfo.ErrorCode = "MSI004";
                errorInfo.PropertyName = "PaymentReferenceId";
                response.Errors.Add(errorInfo);

                return response;
            }

            var MonthlySIData = _context.TblPolicyMonthlySi.FirstOrDefault(x=>x.PolicyNo == monthlySIDTO.PolicyNumber && x.DueDate.Value.Month == monthlySIDTO.Month && x.DueDate.Value.Year == monthlySIDTO.Year);

            if(MonthlySIData != null)
            {
                
                if(MonthlySIData.PayUid != null)
                {
                    response.ResponseMessage = "Payment Details is Already Updated";
                    response.Id = monthlySIDTO.PolicyNumber;
                    response.Status = BusinessStatus.Error;
                    errorInfo.ErrorMessage = "Data Cannot be Modified";
                    errorInfo.ErrorCode = "MSI005";
                    errorInfo.PropertyName = "MonthlySI";
                    response.Errors.Add(errorInfo);

                    return response;
                }


                var DifferenceAmount = monthlySIDTO.PaidAmount - MonthlySIData.TotalAmountChargeable;

                if (DifferenceAmount >= -1)
                {                 

                    var CdDTO = JsonConvert.DeserializeObject<ExtCDDTO>(MonthlySIData.PremiumDetails);

                    var CallMicaCd = await _integrationService.MasterCDACC(CdDTO, context);

                    if (CallMicaCd != null)
                    {
                        MonthlySIData.PayUid = monthlySIDTO.PaymentReferenceId.ToString();
                        MonthlySIData.PayAmount = monthlySIDTO.PaidAmount.ToString();
                        MonthlySIData.PaymentDate = monthlySIDTO.PaymentDate;
                        MonthlySIData.PayStatus = "Successful";

                        response.ResponseMessage = "Monthly SI Successfully Updated";
                        response.Status = BusinessStatus.Updated;

                        _context.TblPolicyMonthlySi.Update(MonthlySIData);
                    }
                    else
                    {
                        response.ResponseMessage = "MICA Updation Failed";
                        response.Id = monthlySIDTO.PolicyNumber;
                        response.Status = BusinessStatus.Error;
                        errorInfo.ErrorMessage = "Updation Failed";
                        errorInfo.ErrorCode = "MSI006";
                        errorInfo.PropertyName = "Update Failed";
                        response.Errors.Add(errorInfo);
                    }

                }
                else
                {
                    response.ResponseMessage = "Amount paid doesn’t match with calculated premium in MICA";
                    response.Id = monthlySIDTO.PolicyNumber;
                    response.Status = BusinessStatus.Error;
                    errorInfo.ErrorMessage = "Premium Miss Match";
                    errorInfo.ErrorCode = "MSI001";
                    errorInfo.PropertyName = "Amount";
                    response.Errors.Add(errorInfo);

                    TblSiexception SiException = new TblSiexception();

                    SiException.ReportId = MonthlySIData.ReportId;
                    SiException.RequestObject = JsonConvert.SerializeObject(monthlySIDTO); ;
                    SiException.RequestAmount = monthlySIDTO.PaidAmount;
                    SiException.DifferenceAmount = DifferenceAmount * (-1);
                    SiException.Status = true;
                    SiException.CreatedDate = IndianTime;
                    SiException.Source = MonthlySIData.Source;

                    _context.TblSiexception.Add(SiException);

                }

                _context.SaveChanges();

            }
            else
            {
                response.ResponseMessage = "Invalid Policy Number";
                response.Id = monthlySIDTO.PolicyNumber;       
                response.Status = BusinessStatus.NotFound;
                errorInfo.ErrorMessage = "Policy Number Not Found";
                errorInfo.ErrorCode = "MSI002";
                errorInfo.PropertyName = "PolicyNumber";
                response.Errors.Add(errorInfo);
            }

            return response;
        }

        private List<RuleEngineResponse> GenericMapper(dynamic SourceObject)
        {          
            int successcount = 0;
            int failcount = 0;
            var DriverRiskItem = SourceObject["InsurableItem"][0]["RiskItems"];
            var VehicleRiskItem = SourceObject["InsurableItem"][1]["RiskItems"];
            var NoOfVehicles = Convert.ToInt32(SourceObject["noOfPC"]) + Convert.ToInt32(SourceObject["noOfTW"]);

            List<RuleEngineResponse> engineResponse = new List<RuleEngineResponse>();
            try
            {
                foreach (var item in DriverRiskItem)
                {
                    var driverExp = item["Driving Experience"];
                    if (driverExp >= 1)
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "Driving Experience";
                        resobj.Outcome = "Success";
                        resobj.Message = "Validation done for driver experience cannot be less than one year";
                        resobj.Code = "GEPO001";
                        engineResponse.Add(resobj);
                        successcount++;

                    }
                    else
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "Driving Experience";
                        resobj.Outcome = "Fail";
                        resobj.Message = "Driver Experience cannot be less than one year";
                        resobj.Code = "GEPO001";
                        engineResponse.Add(resobj);
                        failcount++;

                    }
                }

                if (Convert.ToInt32(SourceObject["driverExp"]) > Convert.ToInt32(SourceObject["driverAge"]) - 18)
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "driverExp";
                    resobj.Outcome = "Fail";
                    resobj.Message = "Years of driving experience cannot be greater than the difference in current age and 18";
                    resobj.Code = "GEPO002";
                    engineResponse.Add(resobj);
                    failcount++;
                }
                else
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "driverExp";
                    resobj.Outcome = "Success";
                    resobj.Message = "Validation done for driver experience";
                    resobj.Code = "GEPO002";
                    engineResponse.Add(resobj);
                    successcount++;
                }
                if (SourceObject["noOfPC"] == 1)
                {
                    if (SourceObject["si"] <= 2000000)
                    {

                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "SI";
                        resobj.Outcome = "Success";
                        resobj.Message = "Validation done for sum insured";
                        resobj.Code = "GEPO008";
                        engineResponse.Add(resobj);
                        successcount++;
                    }
                    else
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "SI";
                        resobj.Outcome = "Fail";
                        resobj.Message = "Sum Insured is exceeding the limit defined";
                        resobj.Code = "GEPO008";
                        engineResponse.Add(resobj);
                        failcount++;
                    }
                }
                else if (SourceObject["noOfPC"] == 2)
                {
                    if (SourceObject["si"] <= 4000000)
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "SI";
                        resobj.Outcome = "Success";
                        resobj.Message = "Validation done for sum insured";
                        resobj.Code = "GEPO008";
                        engineResponse.Add(resobj);
                        successcount++;
                    }
                    else
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "SI";
                        resobj.Outcome = "Fail";
                        resobj.Message = "Sum Insured is exceeding the limit defined";
                        resobj.Code = "GEPO008";
                        engineResponse.Add(resobj);
                        failcount++;
                    }

                }
                else if (SourceObject["noOfPC"] == 3)
                {
                    if (SourceObject["si"] <= 6000000)
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "SI";
                        resobj.Outcome = "Success";
                        resobj.Message = "Validation done for sum insured";
                        resobj.Code = "GEPO008";
                        engineResponse.Add(resobj);
                        successcount++;
                    }
                    else
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "SI";
                        resobj.Outcome = "Fail";
                        resobj.Message = "Sum Insured is exceeding the limit defined";
                        resobj.Code = "GEPO008";
                        engineResponse.Add(resobj);
                        failcount++;
                    }

                }

                if (NoOfVehicles > 0 && NoOfVehicles <= 3)
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "noOfVehicles";
                    resobj.Outcome = "Success";
                    resobj.Message = "Validation done for number of vehicles is exceeding the limit defined";
                    resobj.Code = "GEPO009";
                    engineResponse.Add(resobj);
                    successcount++;

                }
                else
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "noOfVehicles";
                    resobj.Outcome = "Fail";
                    resobj.Message = "Number of vehicles is exceeding the limit defined";
                    resobj.Code = "GEPO009";
                    engineResponse.Add(resobj);
                    failcount++;
                }

                if (SourceObject["noOfPC"] > 0 && SourceObject["noOfPC"] >= 1)
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "noOfPC";
                    resobj.Outcome = "Success";
                    resobj.Message = "Validation done for minimum one PC required";
                    resobj.Code = "GEPO010";
                    engineResponse.Add(resobj);
                    successcount++;

                }
                else
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "noOfPC";
                    resobj.Outcome = "Fail";
                    resobj.Message = "Minimum One PC required";
                    resobj.Code = "GEPO010";
                    engineResponse.Add(resobj);
                    failcount++;
                    //engineResponse.FirstOrDefault(x => x.ValidatorName == "Final Result").Outcome = "Fail";

                }
                if (SourceObject["additionalDriver"] > 0 && SourceObject["additionalDriver"] <= 2)
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "additionalDriver";
                    resobj.Outcome = "Success";
                    resobj.Message = "Validation done for number of additional drivers cannot be more than 2";
                    resobj.Code = "GEPO011";
                    engineResponse.Add(resobj);
                    successcount++;
                }
                else
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "additionalDriver";
                    resobj.Outcome = "Fail";
                    resobj.Message = "Number of additional drivers cannot be more than 2";
                    resobj.Code = "GEPO011";
                    engineResponse.Add(resobj);
                    failcount++;
                }
                if (SourceObject["billingFrequency"] == "Monthly" || SourceObject["billingFrequency"] == "Yearly")
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "billingFrequency";
                    resobj.Outcome = "Success";
                    resobj.Message = "Validation done for billing frequency can either be monthly/yearly";
                    resobj.Code = "GEPO012";
                    engineResponse.Add(resobj);
                    successcount++;

                }
                else
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "billingFrequency";
                    resobj.Outcome = "Fail";
                    resobj.Message = "Billing Frequency can either be Monthly/Yearly";
                    resobj.Code = "GEPO012";
                    engineResponse.Add(resobj);
                    failcount++;
                    //engineResponse.FirstOrDefault(x => x.ValidatorName == "Final Result").Outcome = "Fail";

                }
                if (SourceObject["driverAge"] >= 18)
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "driverAge";
                    resobj.Outcome = "Success";
                    resobj.Message = "Validation done for age of driver cannot be less than 18 years";
                    resobj.Code = "GEPO014";
                    engineResponse.Add(resobj);
                    successcount++;

                }
                else
                {
                    RuleEngineResponse resobj = new RuleEngineResponse();
                    resobj.ValidatorName = "driverAge";
                    resobj.Outcome = "Fail";
                    resobj.Message = "Age of driver cannot be less than 18 years";
                    resobj.Code = "GEPO014";
                    engineResponse.Add(resobj);
                    failcount++;
                    //engineResponse.FirstOrDefault(x => x.ValidatorName == "Final Result").Outcome = "Fail";

                }
                foreach (var item in VehicleRiskItem)
                {
                    var vehicleType = item["Vehicle Type"];
                    if (vehicleType == "PC" || vehicleType == "TW")
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "Vehicle Type";
                        resobj.Outcome = "Success";
                        resobj.Message = "Validation done for vehicle type mismatch";
                        resobj.Code = "GEPO015";
                        engineResponse.Add(resobj);
                        successcount++;

                    }
                    else
                    {
                        RuleEngineResponse resobj = new RuleEngineResponse();
                        resobj.ValidatorName = "Vehicle Type";
                        resobj.Outcome = "Fail";
                        resobj.Message = "Vehicle type mismatch";
                        resobj.Code = "GEPO015";
                        engineResponse.Add(resobj);
                        failcount++;

                    }
                }


                if (failcount > 0)
                {
                    RuleEngineResponse res4obj = new RuleEngineResponse();
                    res4obj.ValidatorName = "Final Result";
                    res4obj.Outcome = "Fail";
                    res4obj.Message = "One or More conditions failed";
                    res4obj.Code = "GEPO016";
                    engineResponse.Add(res4obj);
                }
                else
                {
                    RuleEngineResponse res4obj = new RuleEngineResponse();
                    res4obj.ValidatorName = "Final Result";
                    res4obj.Outcome = "Success";
                    res4obj.Message = "Conditions Successful";
                    res4obj.Code = "GEPO017";
                    engineResponse.Add(res4obj);

                }


            }
            catch
            {
                return new List<RuleEngineResponse>();
            }

           return engineResponse;
          
        }

        private async Task<MonthlySIUploadDTO> CSVUpload (string strFilePath, ApiContext context)
        {

            MonthlySIUploadDTO uploadDTO = new MonthlySIUploadDTO();

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);


            int logx = 0;

            StreamReader sr = null;
            try
            {
                sr = new StreamReader(strFilePath);
                string[] headers = sr.ReadLine().Split(',');
                DataTable dt = new DataTable();
                foreach (string header in headers)
                {
                    dt.Columns.Add(header);
                }
                logx++;

                //finding index of every column
                var TxnidIndex = FindIndex(strFilePath, "mica Txn ID");
                var payUidindex = FindIndex(strFilePath, "payment Reference ID");
                var payAmountIndex = FindIndex(strFilePath, "paid Amount");
                var payStatusIndex = FindIndex(strFilePath, "payment Status");
                var paymentDateIndex = FindIndex(strFilePath, "payment Date");
                logx++;

                while (!sr.EndOfStream)
                {
                    string[] rows = Regex.Split(sr.ReadLine(), ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
                    DataRow dr = dt.NewRow();

                    for (int i = 0; i < headers.Length; i++)
                    {
                        dr[i] = rows[i];
                    }
                    dt.Rows.Add(dr);
                }

                var count = dt.Rows.Count;

                var errorflag = false;


                for (var i = 0; i < count; i++)
                {
                    var txnid = dt.Rows[i][TxnidIndex].ToString().Replace("\"", "").Trim();
                    var payUid = dt.Rows[i][payUidindex].ToString().Replace("\"", "").Trim();
                    var payAmount = dt.Rows[i][payAmountIndex].ToString().Replace("\"", "").Trim();
                    var payStatus = dt.Rows[i][payStatusIndex].ToString().Replace("\"", "").Trim();

                    //EPPlusHelper - For Validation Of Date in Excel
                    var paymentDate = EPPlusHelper.ValidateDate(dt.Rows[i][paymentDateIndex].ToString().Replace("\"", "").Trim());

                    var PropertyName = "";

                    if (String.IsNullOrEmpty(txnid))
                    {

                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Txn Id Missing";
                        errorInfo.ErrorCode = "MSI001";
                        errorInfo.PropertyName = Convert.ToString(i + 1); //Row Number
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                        PropertyName = Convert.ToString(i + 1);
                    }
                    else
                    {
                        PropertyName = txnid;
                    }

                    if (String.IsNullOrEmpty(payUid))
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Payment Reference ID Missing";
                        errorInfo.ErrorCode = "MSI002";
                        errorInfo.PropertyName = PropertyName;
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                    }



                    if (String.IsNullOrEmpty(payAmount))
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Paid Amount Missing";
                        errorInfo.ErrorCode = "MSI003";
                        errorInfo.PropertyName = PropertyName;
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                    }

                    if (String.IsNullOrEmpty(payStatus))
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Payment Status Missing";
                        errorInfo.ErrorCode = "MSI004";
                        errorInfo.PropertyName = PropertyName;
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                    }

                    if (payStatus != "Successful")
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Payment Status is Not Sucessful";
                        errorInfo.ErrorCode = "MSI005";
                        errorInfo.PropertyName = PropertyName;
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                    }
                    if (paymentDate == null)
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "Payment Date Missing / Not Proper";
                        errorInfo.ErrorCode = "MSI006";
                        errorInfo.PropertyName = PropertyName;
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                    }

                    var checkTxnid = _context.TblPolicyMonthlySi.Any(x => x.Txnid == txnid);

                    if (checkTxnid == false)
                    {
                        ErrorInfo errorInfo = new ErrorInfo();

                        errorInfo.ErrorMessage = "No Such TxnId";
                        errorInfo.ErrorCode = "MSI007";
                        errorInfo.PropertyName = PropertyName;
                        uploadDTO.Errors.Add(errorInfo);
                        errorflag = true;
                    }

                    if (checkTxnid == true)
                    {
                        //This Helps to Find out data is saved previously or not
                        var checkData = _context.TblPolicyMonthlySi.LastOrDefault(x => x.Txnid == txnid);

                        if (!String.IsNullOrEmpty(checkData.PayUid))
                        {
                            ErrorInfo errorInfo = new ErrorInfo();
                            errorInfo.ErrorMessage = "Data is Already Updated for this Txn Id Duplicate Record";
                            errorInfo.ErrorCode = "MSI008";
                            errorInfo.PropertyName = PropertyName;
                            uploadDTO.Errors.Add(errorInfo);
                            errorflag = true;
                        }

                        if (!String.IsNullOrEmpty(payAmount))
                        {
                            if (Convert.ToDecimal(payAmount) < checkData.TotalAmountChargeable)
                            {

                                ErrorInfo errorInfo = new ErrorInfo();

                                errorInfo.ErrorMessage = "Paid Amount is Less Than the Billed Amount";
                                errorInfo.ErrorCode = "MSI009";
                                errorInfo.PropertyName = PropertyName;
                                uploadDTO.Errors.Add(errorInfo);
                                errorflag = true;
                            }
                        }

                    }



                    if (errorflag == false)
                    {
                        var TblData = _context.TblPolicyMonthlySi.LastOrDefault(x => x.Txnid == txnid);

                        var CdDTO = JsonConvert.DeserializeObject<ExtCDDTO>(TblData.PremiumDetails);

                        var CallMicaCd = await _integrationService.MasterCDACC(CdDTO, context);

                        if (CallMicaCd != null)
                        {
                            TblData.PayUid = payUid;
                            TblData.PayAmount = payAmount;
                            TblData.PayStatus = payStatus;
                            TblData.PaymentDate = paymentDate;

                            _context.TblPolicyMonthlySi.Update(TblData);

                            var ExceptionData = _context.TblSiexception.FirstOrDefault(x => x.ReportId == TblData.ReportId);

                            if (ExceptionData != null)
                            {
                                ExceptionData.Status = false;
                                ExceptionData.ModifiedDate = IndianTime;
                                _context.TblSiexception.Update(ExceptionData);
                            }

                            _context.SaveChanges();

                        }
                        else
                        {
                            ErrorInfo errorInfo = new ErrorInfo();

                            errorInfo.ErrorMessage = "Technical Failure Try Again";
                            errorInfo.ErrorCode = "MSI010";
                            errorInfo.PropertyName = PropertyName;
                            uploadDTO.Errors.Add(errorInfo);
                            errorflag = true;
                        }

                    }

                    //Re-Setting Error Flag for Next Record Checking                                        
                    errorflag = false;

                }



                if (uploadDTO.Errors.Count > 0)
                {
                    uploadDTO.ResponseMessage = "Document Uploaded for Sucess One & Failed Transactions Are in Errors";
                    uploadDTO.Status = BusinessStatus.Ok;
                    return uploadDTO;
                }
                else
                {
                    return new MonthlySIUploadDTO { Status = BusinessStatus.Ok, ResponseMessage = $"Document Uploaded Successfully" };
                }


            }
            catch (Exception ex)
            {
                logx++;
                return new MonthlySIUploadDTO { Status = BusinessStatus.Error, ResponseMessage = $"Document uploaded with following Erros " + ex.ToString(), MessageKey = logx.ToString() };
            }
            finally
            {
                sr.Dispose();
            }
        }
        
    }
}

