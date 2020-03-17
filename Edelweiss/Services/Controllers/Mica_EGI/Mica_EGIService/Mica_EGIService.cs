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

namespace iNube.Services.MicaExtension_EGI.Controllers.MicaExtension_EGI.Mica_EGIService
{
    public interface IMicaEGIService
    {
        GetScheduleResponse GetSchedule(string VehicleRegistrationNo, string PolicyNo);
        ScheduleResponseDTO CreateSchedule(ScheduleDTO scheduleDTO);
        Task<PremiumReturnDto> CalCulatePremium(PremiumRequestDTO premiumdata);
        Task<bool> NightScheduler(DateTime? dateTime);
        Task<bool> PremiumBookingScheduler(DateTime? dateTime);
        Task<SwitchOnOffResponse> SwitchOnOff(SwitchOnOffDTO switchOnOff);
        ActivityResponse ActivityReport(string PolicyNo, string Month);

        Task<PremiumReturnDto> EndorsementPremium(EndorsementPremiumDTO endorsementPremium);

        Task<dynamic> NewEndorsementPremium(EndorsementPremiumDTO endorsementPremium, dynamic PolicyObject, string CallType);

        AllScheduleResponse GetAllVehicleSchedule(string PolicyNo);
        List<ddDTO> GetVehicleMaster(string lMasterlist);
        BillingResponse BillingDetails(string PolicyNo, string Month);
        Task<WrapperPremiumReturnDto> WrapperCalculatePremium(WrapperPremiumRequestDTO premiumdata);
        TaxTypeDTO TaxTypeForStateCode(string stateabbreviation);

        //CD Method
        Task<dynamic> CDMapper(string TxnType,dynamic SourceObject);

        //Rule Engine 
        Task<List<RuleEngineResponse>> RuleMapper(string TxnType, dynamic SourceObject);

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


        public GetScheduleResponse GetSchedule(string VehicleRegistrationNo, string PolicyNo)
        {
            GetScheduleResponse response = new GetScheduleResponse();
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentTimeHour = IndianTime.Hour;
            var CurrentDay = IndianTime.DayOfWeek.ToString();


            if (!String.IsNullOrEmpty(VehicleRegistrationNo) && !String.IsNullOrEmpty(PolicyNo))
            {
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

                    if (checkstatus == null)
                    {
                        //response.GetSchedule.SwitchStatus = false;
                        switch (CurrentDay)
                        {
                            case "Monday":
                                response.GetSchedule.SwitchStatus = scheduledata.Mon;
                                break;

                            case "Tuesday":
                                response.GetSchedule.SwitchStatus = scheduledata.Tue;
                                break;


                            case "Wednesday":
                                response.GetSchedule.SwitchStatus = scheduledata.Wed;
                                break;


                            case "Thursday":
                                response.GetSchedule.SwitchStatus = scheduledata.Thu;
                                break;


                            case "Friday":
                                response.GetSchedule.SwitchStatus = scheduledata.Fri;
                                break;


                            case "Saturday":
                                response.GetSchedule.SwitchStatus = scheduledata.Sat;
                                break;



                            case "Sunday":
                                response.GetSchedule.SwitchStatus = scheduledata.Sun;
                                break;
                                                                                              
                        }

                    }
                    else
                    {

                        response.GetSchedule.SwitchStatus = checkstatus.SwitchStatus;
                    }

                    if (CurrentTimeHour < Convert.ToDecimal(_configuration["Scheduler_Validation:TimeInHours"]))
                    {
                        response.GetSchedule.SwitchEnabled = true;
                    }
                    else
                    {
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

        public ScheduleResponseDTO CreateSchedule(ScheduleDTO scheduleDTO)
        {
            ScheduleResponseDTO response = new ScheduleResponseDTO();

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

                var carCheck = _context.TblSchedule.Any(x => x.VehicleRegistrationNo == mapData.VehicleRegistrationNo);

                if (carCheck == false)
                {
                    DateTime indianTime = System.DateTime.UtcNow.AddMinutes(330);
                    mapData.CreatedDate = indianTime;
                    mapData.ModifyCount = 0;
                    mapData.ModifiedDate = indianTime;
                    mapData.IsActive = true;

                    _context.TblSchedule.Add(mapData);
                }
                else
                {
                    var tblschedule = _context.TblSchedule.SingleOrDefault(x => x.VehicleRegistrationNo == mapData.VehicleRegistrationNo);

                    tblschedule.Mon = mapData.Mon;
                    tblschedule.Tue = mapData.Tue;
                    tblschedule.Wed = mapData.Wed;
                    tblschedule.Thu = mapData.Thu;
                    tblschedule.Fri = mapData.Fri;
                    tblschedule.Sat = mapData.Sat;
                    tblschedule.Sun = mapData.Sun;
                    tblschedule.PolicyNo = mapData.PolicyNo;
                    tblschedule.VehicleRegistrationNo = mapData.VehicleRegistrationNo;


                    tblschedule.ModifyCount += 1;

                    DateTime indianTime = System.DateTime.UtcNow.AddMinutes(330);

                    tblschedule.ModifiedDate = indianTime;
                    _context.TblSchedule.Update(tblschedule);
                }
                _context.SaveChanges();

                response.ScheduleDTO = scheduleDTO;
                response.Status = BusinessStatus.Ok;

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

        public async Task<PremiumReturnDto> CalCulatePremium(PremiumRequestDTO premiumdata)
        {
            // _context = (MICAQMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
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
                            taxType = TaxTypeForStateCode(premiumdata.StateCode);

                            prem.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
                            prem.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

                            var Data = await _integrationService.CalCulateRatingPremium(prem);
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
                                returnobj.PerDayPremium = Convert.ToDecimal(Ftperday);
                                returnobj.FireTheft = Convert.ToDecimal(Ft365days);
                                if (premiumdata.BillingFrequency == "Monthly")
                                {
                                    returnobj.ADPremium = Convert.ToDecimal(Ad60days);
                                    returnobj.GST = Convert.ToDecimal(monthlyGST);
                                    returnobj.MonthlyPremium = ad30days + Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax);
                                }
                                else if (premiumdata.BillingFrequency == "Yearly")
                                {
                                    returnobj.ADPremium = Convert.ToDecimal(Ad365days);
                                    returnobj.GST = Convert.ToDecimal(yearlyGST);
                                }
                                returnobj.Total = returnobj.FireTheft + returnobj.ADPremium + returnobj.GST;

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

        public async Task<WrapperPremiumReturnDto> WrapperCalculatePremium(WrapperPremiumRequestDTO premiumdata)
        {
            // _context = (MICAQMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
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

                        var Data = await _integrationService.WrapperCalculateRatingPremium(prem);

                        List<CalculationResult> val = JsonConvert.DeserializeObject<List<CalculationResult>>(Data.ToString());
                        if (val != null)
                        {

                            var fire = val.FirstOrDefault(x => x.Entity == "FTPM").EValue;
                            var driver1Ad = val.FirstOrDefault(x => x.Entity == "DRIVER1_ADPMPD").EValue;
                            var driver1totalpm = val.FirstOrDefault(x => x.Entity == "DRIVER1_TOTALPMPD").EValue;
                            var driver2Ad = val.FirstOrDefault(x => x.Entity == "DRIVER2_ADPMPD").EValue;
                            var driver2totalpm = val.FirstOrDefault(x => x.Entity == "DRIVER2_TOTALPMPD").EValue;
                            var driver3Ad = val.FirstOrDefault(x => x.Entity == "DRIVER3_ADPMPD").EValue;
                            var driver3totalpm = val.FirstOrDefault(x => x.Entity == "DRIVER3_TOTALPMPD").EValue;


                            returnobj.FTPM = Convert.ToDecimal(fire);

                            returnobj.driverList.driver1.D1ADPM = Convert.ToDecimal(driver1Ad);
                            returnobj.driverList.driver1.D1TotalPM = Convert.ToDecimal(driver1totalpm);

                            returnobj.driverList.driver2.D2ADPM = Convert.ToDecimal(driver2Ad);
                            returnobj.driverList.driver2.D2TotalPM = Convert.ToDecimal(driver2totalpm);

                            returnobj.driverList.driver3.D3ADPM = Convert.ToDecimal(driver3Ad);
                            returnobj.driverList.driver3.D3TotalPM = Convert.ToDecimal(driver3totalpm);

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
        public TaxTypeDTO TaxTypeForStateCode(string stateabbreviation)
        {

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

        public async Task<SwitchOnOffResponse> SwitchOnOff(SwitchOnOffDTO switchOnOff)
        {


            string VehicleRegistrationNo = switchOnOff.VehicleRegistrationNo;
            string PolicyNo = switchOnOff.PolicyNo;
            bool SwitchStatus = switchOnOff.SwitchState;

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentDay = IndianTime.DayOfWeek.ToString();
            var CurrentTimeHour = IndianTime.Hour;

            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);


            TblSwitchLog checkLog = new TblSwitchLog();
            TblSchedule ScheduleData = new TblSchedule();
            SwitchOnOffResponse SuccessResponse = new SwitchOnOffResponse();

            if (!String.IsNullOrEmpty(VehicleRegistrationNo) && !String.IsNullOrEmpty(PolicyNo) && SwitchStatus == true)
            {

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
                    checkLog = _context.TblSwitchLog.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleNumber == VehicleRegistrationNo && x.CreatedDate.Value.Date == IndianTime.Date);
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
                            _context.SaveChanges();
                        }
                    }
                    else
                    {
                        bool? CurrentDayStat = false;

                        switch (CurrentDay)
                        {
                            case "Monday":
                                CurrentDayStat = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo).Mon;
                                break;

                            case "Tuesday":
                                CurrentDayStat = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo).Tue;
                                break;


                            case "Wednesday":
                                CurrentDayStat = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo).Wed;
                                break;


                            case "Thursday":
                                CurrentDayStat = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo).Thu;
                                break;


                            case "Friday":
                                CurrentDayStat = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo).Fri;
                                break;


                            case "Saturday":
                                CurrentDayStat = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo).Sat;
                                break;



                            case "Sunday":
                                CurrentDayStat = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo).Sun;
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
                            response.Status = BusinessStatus.PreConditionFailed;
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
                            response.Status = BusinessStatus.PreConditionFailed;
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
                            response.Status = BusinessStatus.PreConditionFailed;
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





                    //Call the Policy Service to Get Policy Details.
                    //An Integration Call to  be Made and Recive the Data as this Model PolicyPremiumDetailsDTO

                    var PolicyData = await _integrationService.InternalGetPolicyDetailsByNumber(PolicyNo, apiContext);

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

                    var taxType = TaxTypeForStateCode(detailsDTO.StateCode);


                    premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE; //Call TaxType //Verify
                    premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE; //Call TaxType //Verify


                    //Call CalculatePremium Policy Module MICA
                    var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, apiContext);

                    List<CalculationResult> DeserilizedPremiumData = new List<CalculationResult>();

                    CDDTO CdModel = new CDDTO();

                    ExtCDDTO ExtCdModel = new ExtCDDTO();
                    MicaCDDTO micaCDDTO = new MicaCDDTO();
                    CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();
                    CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
                    CDPremiumDTO CdPremiumDTO = new CDPremiumDTO();

                 

                    if (CalPremiumResponse != null)
                    {
                        DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());
                    }


                    if (DeserilizedPremiumData.Count() > 0)
                    {

                        var TOTALPMPD = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPD").EValue);

                        var TOTALPMPDFTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDFTTAX").EValue);

                        var TOTALPMPDTTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDTTTAX").EValue);

                        var NewPremium = TOTALPMPD + TOTALPMPDFTTAX + TOTALPMPDTTTAX;                        
                        
                        TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = PolicyNo;
                        bookingLog.TxnAmount = NewPremium;
                        bookingLog.BasePremium = TOTALPMPD;
                        bookingLog.FromTax = TOTALPMPDFTTAX;
                        bookingLog.ToTax = TOTALPMPDTTTAX;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnDetails = "Revised Total Premium for Policy - " + PolicyNo;

                        _context.TblPremiumBookingLog.Add(bookingLog);
                        _context.SaveChanges();



                        //Internal Private Method to get Old Premium Amount.
                        var OldPremium = CheckPremiumUpdate(PolicyNo);

                        var NewBasePremium = TOTALPMPD - OldPremium.BasePremium;
                        var NewFromTax = TOTALPMPDFTTAX - OldPremium.FromTax;
                        var NewToTax = TOTALPMPDTTTAX - OldPremium.ToTax;
                        var NewTotalPremium = NewPremium - OldPremium.TotalPremium;

                        var FinalPremium = NewTotalPremium;

                        taxAmountDTO.TaxAmount = TOTALPMPDFTTAX + TOTALPMPDTTTAX;
                        taxTypeDTO.Type = taxType.FSTTAX_TAXTYPE;
                        taxTypeDTO.TaxAmount = TOTALPMPDFTTAX;
                        taxAmountDTO.Tax.Add(taxTypeDTO);

                        taxTypeDTO = new CDTaxTypeDTO();
                        taxTypeDTO.Type = taxType.TSTTAX_TAXTYPE;
                        taxTypeDTO.TaxAmount = TOTALPMPDTTTAX;
                        taxAmountDTO.Tax.Add(taxTypeDTO);

                        CdPremiumDTO.TaxAmount = taxAmountDTO;
                        CdPremiumDTO.Type = "AD";
                        CdPremiumDTO.TxnAmount = TOTALPMPD;
                        CdPremiumDTO.TotalAmount = TOTALPMPD + taxAmountDTO.TaxAmount;

                        micaCDDTO.PremiumDTO.Add(CdPremiumDTO);
                        micaCDDTO.TxnType = "Debit";
                        micaCDDTO.Type = "SwitchOnOff";
                        micaCDDTO.TxnAmount = TOTALPMPD;
                        micaCDDTO.TaxAmount = TOTALPMPD + taxAmountDTO.TaxAmount;
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

                        var CallMicaCd = await _integrationService.MasterCDACC(ExtCdModel, apiContext);



                        if (CallMicaCd != null)
                        {
                            bookingLog = new TblPremiumBookingLog();

                            bookingLog.PolicyNo = PolicyNo;
                            bookingLog.TxnAmount = FinalPremium;
                            bookingLog.BasePremium = NewBasePremium;
                            bookingLog.FromTax = NewFromTax;
                            bookingLog.ToTax = NewToTax;
                            bookingLog.TxnDateTime = IndianTime;
                            bookingLog.TxnDetails = "Revised Premium - CD Transaction Successfully Updated in MICA";

                            _context.TblPremiumBookingLog.Add(bookingLog);



                            var tblDailyActive = _context.TblDailyActiveVehicles.FirstOrDefault(x => x.TxnDate.Value.Date == IndianTime.Date &&
                                                                                                x.PolicyNumber == PolicyNo);

                            tblDailyActive.TotalPremium= NewPremium;
                            tblDailyActive.BasePremium = TOTALPMPD;
                            tblDailyActive.FromTax = TOTALPMPDFTTAX;
                            tblDailyActive.ToTax = TOTALPMPDFTTAX;

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
                            bookingLog = new TblPremiumBookingLog();

                            bookingLog.PolicyNo = PolicyNo;
                            bookingLog.TxnAmount = FinalPremium;
                            bookingLog.BasePremium = NewBasePremium;
                            bookingLog.FromTax = NewFromTax;
                            bookingLog.ToTax = NewToTax;
                            bookingLog.TxnDateTime = IndianTime;
                            bookingLog.TxnDetails = "Revised Premium - Transaction Failed while Updating CD Balance MICA";

                            _context.TblPremiumBookingLog.Add(bookingLog);
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
                    checkLog = _context.TblSwitchLog.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleNumber == VehicleRegistrationNo && x.CreatedDate.Value.Date == IndianTime.Date);
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

                            _context.TblSwitchLog.Add(tblSwitchlog);
                            _context.SaveChanges();
                        }
                        else
                        {
                            //Return Error for Manually Switched On Before
                            //Already Manual On its Cannot be SwitchedOFF for that Day
                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "Manual Switch is On Already";
                            response.Status = BusinessStatus.InputValidationFailed;
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

                            _context.TblSwitchLog.Add(tblSwitchlog);
                            _context.SaveChanges();
                        }
                        else
                        {
                            ///Throw Error
                            ///Switch ALREADY OFF
                            SwitchOnOffResponse response = new SwitchOnOffResponse();
                            ErrorInfo errorInfo = new ErrorInfo();

                            response.ResponseMessage = "The Switch is Already On";
                            response.Status = BusinessStatus.PreConditionFailed;
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
                    response.Status = BusinessStatus.PreConditionFailed;
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


        public async Task<bool> NightScheduler(DateTime? dateTime)
        {
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
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);

            var PolicyDetails = await _integrationService.GetPolicyList(ProductCode, apiContext);


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

        public async Task<bool> PremiumBookingScheduler(DateTime? dateTime)
        {
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
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);


            TblSwitchLog switchLog = new TblSwitchLog();
            TblSchedule ScheduleData = new TblSchedule();
            TblSchedulerLog schedulerLog = new TblSchedulerLog();
            TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();
            TblDailyActiveVehicles dailyActiveVehicles = new TblDailyActiveVehicles();
            TblScheduleReport scheduleReport = new TblScheduleReport();

            scheduleReport.ScheduleStartDate = IndianTime;
            scheduleReport.SuccessCount = 0;
            scheduleReport.FailCount = 0;
            scheduleReport.IsActive = true;

            var tblreport = _context.TblScheduleReport.Add(scheduleReport);
            _context.SaveChanges();


            var ReportID = scheduleReport.ReportId;

            var PolicyNumberList = _context.TblDailyActiveVehicles.Where(x => x.TxnDate.Value.Date == CurrentDate).Select(x => x.PolicyNumber).Distinct().ToList();

            foreach (var policy in PolicyNumberList)
            {

                schedulerLog = new TblSchedulerLog();


                var getDailyStat = _context.TblDailyActiveVehicles.LastOrDefault(x => x.TxnDate.Value.Date == CurrentDate && x.PolicyNumber == policy);

                var ActivePCCount = getDailyStat.ActivePc;
                var ActiveTWCount = getDailyStat.ActiveTw;


                schedulerLog.SchedulerDateTime = IndianTime;
                schedulerLog.SchedulerStatus = "Running";

                _context.TblSchedulerLog.Add(schedulerLog);
                _context.SaveChanges();

                var BillingFrequency = "";
                var AccountNumber = "";


                //Call the Policy Service to Get Policy Details.
                //An Integration Call to  be Made and Recive the Data as this Model PolicyPremiumDetailsDTO
                var PolicyData = await _integrationService.InternalGetPolicyDetailsByNumber(policy, apiContext);
                              

                PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();

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
                else
                {
                    schedulerLog.SchedulerStatus = policy + " - No Record Found for this Policy Number";
                    _context.TblSchedulerLog.Update(schedulerLog);

                    var report = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

                    report.FailCount += 1;
                    _context.TblScheduleReport.Update(report);
                    _context.SaveChanges();
                    continue;
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


                var taxType = TaxTypeForStateCode(detailsDTO.StateCode);

                premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE; //Call TaxType //Verify
                premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE; //Call TaxType //Verify


                //Call CalculatePremium Policy Module MICA
                var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, apiContext);

                List<CalculationResult> DeserilizedPremiumData = new List<CalculationResult>();
                CDDTO CdModel = new CDDTO();
                ExtCDDTO ExtCdModel = new ExtCDDTO();
                MicaCDDTO micaCDDTO = new MicaCDDTO();
                CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();
                CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
                CDPremiumDTO CdPremiumDTO = new CDPremiumDTO();

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

                    var TOTALPMPD = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPD").EValue);

                    var TOTALPMPDFTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDFTTAX").EValue);

                    var TOTALPMPDTTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDTTTAX").EValue);

                    var Premium = TOTALPMPD + TOTALPMPDFTTAX + TOTALPMPDTTTAX;
                                        
                    schedulerLog.SchedulerStatus = "Calculate Premium Success";
                    schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                    _context.TblSchedulerLog.Update(schedulerLog);

                    _context.SaveChanges();
                                      
                    taxAmountDTO.TaxAmount = TOTALPMPDFTTAX + TOTALPMPDTTTAX;
                    taxTypeDTO.Type = taxType.FSTTAX_TAXTYPE;
                    taxTypeDTO.TaxAmount = TOTALPMPDFTTAX;
                    taxAmountDTO.Tax.Add(taxTypeDTO);

                    taxTypeDTO = new CDTaxTypeDTO();
                    taxTypeDTO.Type = taxType.TSTTAX_TAXTYPE;
                    taxTypeDTO.TaxAmount = TOTALPMPDTTTAX;
                    taxAmountDTO.Tax.Add(taxTypeDTO);

                    CdPremiumDTO.TaxAmount = taxAmountDTO;
                    CdPremiumDTO.Type = "AD";
                    CdPremiumDTO.TxnAmount = TOTALPMPD;
                    CdPremiumDTO.TotalAmount = TOTALPMPD + taxAmountDTO.TaxAmount;

                    micaCDDTO.PremiumDTO.Add(CdPremiumDTO);
                    micaCDDTO.TxnType = "Debit";
                    micaCDDTO.Type = "PremiumBooking";
                    micaCDDTO.TxnAmount = TOTALPMPD;
                    micaCDDTO.TaxAmount = TOTALPMPD + taxAmountDTO.TaxAmount;
                    micaCDDTO.TotalAmount = micaCDDTO.TxnAmount + micaCDDTO.TaxAmount;

                    ExtCdModel.micaCDDTO.Add(micaCDDTO);
                    ExtCdModel.AccountNo = AccountNumber;
                    ExtCdModel.Description = "Auto Schedule Premium for Policy - " + policy;
                    ExtCdModel.Frequency = BillingFrequency;

                    var CallMicaCd = await _integrationService.MasterCDACC(ExtCdModel, apiContext);


                    if (CallMicaCd != null)
                    {
                        bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = policy;
                        bookingLog.TxnAmount = Premium;
                        bookingLog.BasePremium = TOTALPMPD;
                        bookingLog.FromTax = TOTALPMPDFTTAX;
                        bookingLog.ToTax = TOTALPMPDTTTAX;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnStatus = true;
                        bookingLog.TxnDetails = "Auto Schedule Premium for Policy - " + policy;

                        _context.TblPremiumBookingLog.Add(bookingLog);


                        getDailyStat.TotalPremium = Premium;
                        getDailyStat.BasePremium = TOTALPMPD;
                        getDailyStat.FromTax = TOTALPMPDFTTAX;
                        getDailyStat.ToTax = TOTALPMPDTTTAX;

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
                        bookingLog.BasePremium = TOTALPMPD;
                        bookingLog.FromTax = TOTALPMPDFTTAX;
                        bookingLog.ToTax = TOTALPMPDTTTAX;
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

                }

            }

            var Endreport = _context.TblScheduleReport.FirstOrDefault(x => x.ReportId == ReportID);

            Endreport.ScheduleEndDate = System.DateTime.UtcNow.AddMinutes(330);

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

        public ActivityResponse ActivityReport(string PolicyNo, string Month)
        {
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
                    response.Status = BusinessStatus.PreConditionFailed;
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
                    response.Status = BusinessStatus.PreConditionFailed;
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
                response.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Either Policy Number or Month is Null";
                errorInfo.ErrorCode = "GEN002";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;
            }

        }

        public async Task<PremiumReturnDto> EndorsementPremium(EndorsementPremiumDTO endorsementPremium)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);

            PremiumReturnDto DifferentialPremium = new PremiumReturnDto();

            if (String.IsNullOrEmpty(endorsementPremium.PolicyNo) && String.IsNullOrEmpty(endorsementPremium.SI))
            {
                ErrorInfo errorInfo = new ErrorInfo();

                DifferentialPremium.ResponseMessage = "Mandatory Fields missing";
                DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Policy Number or SumInsured is Missing";
                errorInfo.ErrorCode = "GEN002";
                errorInfo.PropertyName = "MandatoryFieldsMissing";
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
                //Get the Policy Details by PolicyNumber
                //In response from Policy
                var PolicyData = await _integrationService.GetPolicyDetails(endorsementPremium.PolicyNo, apiContext);

                PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();

                if (PolicyData != null)
                {

                    detailsDTO.SumInsured = PolicyData["si"];
                    detailsDTO.NoOfPC = PolicyData["noOfPC"];
                    detailsDTO.NoOfTW = PolicyData["noOfTW"];
                    detailsDTO.PD_Age = PolicyData["driverAge"];
                    detailsDTO.PD_DriveExperince = PolicyData["driverExp"];
                    detailsDTO.AdditionalDriver = PolicyData["additionalDriver"];
                    detailsDTO.StateCode = PolicyData["stateCode"];
                }


                TaxTypeDTO taxType = new TaxTypeDTO();
                taxType = TaxTypeForStateCode(detailsDTO.StateCode);



                //CalculatePremiumObject as of Endorsement
                SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

                //RuleObject
                premiumDTO.dictionary_rule.SI = endorsementPremium.SI;
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
                var NewPremiumData = await InternalCalculatePremium(premiumDTO);


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
                var OldPremiumData = await InternalCalculatePremium(oldPremiumDTO);



                if (NewPremiumData.Total > 0 && OldPremiumData.Total > 0)
                {
                    DifferentialPremium.PerDayPremium = NewPremiumData.PerDayPremium - OldPremiumData.PerDayPremium;
                    DifferentialPremium.FireTheft = NewPremiumData.FireTheft - OldPremiumData.FireTheft;
                    DifferentialPremium.ADPremium = NewPremiumData.ADPremium - OldPremiumData.ADPremium;
                    DifferentialPremium.GST = NewPremiumData.GST - OldPremiumData.GST;
                    DifferentialPremium.MonthlyPremium = NewPremiumData.MonthlyPremium - OldPremiumData.MonthlyPremium;
                    DifferentialPremium.Total = NewPremiumData.Total - OldPremiumData.Total;
                    DifferentialPremium.FinalAmount = NewPremiumData.FinalAmount - OldPremiumData.FinalAmount;


                    DifferentialPremium.Status = BusinessStatus.Ok;
                    return DifferentialPremium;
                }
            }
            if (endorsementPremium.TypeOfEndorsement == "Deletion")
            {

                //Get the Policy Details by PolicyNumber
                //In response from Policy
                var PolicyData = await _integrationService.GetPolicyDetails(endorsementPremium.PolicyNo, apiContext);

                PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();

                if (PolicyData != null)
                {

                    detailsDTO.SumInsured = PolicyData["si"];
                    detailsDTO.NoOfPC = PolicyData["noOfPC"];
                    detailsDTO.NoOfTW = PolicyData["noOfTW"];
                    detailsDTO.PD_Age = PolicyData["driverAge"];
                    detailsDTO.PD_DriveExperince = PolicyData["driverExp"];
                    detailsDTO.AdditionalDriver = PolicyData["additionalDriver"];
                    detailsDTO.StateCode = PolicyData["stateCode"];
                }


                TaxTypeDTO taxType = new TaxTypeDTO();
                taxType = TaxTypeForStateCode(detailsDTO.StateCode);



                //CalculatePremiumObject as of Endorsement
                SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();




                //RuleObject
                premiumDTO.dictionary_rule.SI = endorsementPremium.SI;
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
                var NewPremiumData = await InternalCalculatePremium(premiumDTO);


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
                var OldPremiumData = await InternalCalculatePremium(oldPremiumDTO);



                if (NewPremiumData.Total > 0 && OldPremiumData.Total > 0)
                {
                    DifferentialPremium.PerDayPremium = NewPremiumData.PerDayPremium - OldPremiumData.PerDayPremium;
                    DifferentialPremium.FireTheft = NewPremiumData.FireTheft - OldPremiumData.FireTheft;
                    DifferentialPremium.ADPremium = NewPremiumData.ADPremium - OldPremiumData.ADPremium;
                    DifferentialPremium.GST = NewPremiumData.GST - OldPremiumData.GST;
                    DifferentialPremium.MonthlyPremium = NewPremiumData.MonthlyPremium - OldPremiumData.MonthlyPremium;
                    DifferentialPremium.Total = NewPremiumData.Total - OldPremiumData.Total;
                    DifferentialPremium.FinalAmount = NewPremiumData.FinalAmount - OldPremiumData.FinalAmount;


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


        private async Task<PremiumReturnDto> InternalCalculatePremium(SchedulerPremiumDTO premiumDTO)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);


            PremiumReturnDto returnobj = new PremiumReturnDto();

            //Call CalculatePremium Policy Module MICA
            var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, apiContext);

            List<CalculationResult> val = new List<CalculationResult>();
            CDDTO CdModel = new CDDTO();

            if (CalPremiumResponse != null)
            {
                val = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());
            }


            if (val.Count() > 0)
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

                returnobj.PerDayPremium = Convert.ToDecimal(Ftperday);
                returnobj.FireTheft = Convert.ToDecimal(Ft365days);
                returnobj.ADPremium = Convert.ToDecimal(Ad60days);
                returnobj.GST = Convert.ToDecimal(monthlyGST);
                returnobj.MonthlyPremium = ad30days + Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax);
                returnobj.Total = returnobj.FireTheft + returnobj.ADPremium + returnobj.GST;
                returnobj.FinalAmount = Math.Round(returnobj.FireTheft + returnobj.ADPremium + returnobj.GST);

            }

            return returnobj;
        }

        public AllScheduleResponse GetAllVehicleSchedule(string PolicyNo)
        {
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

        public List<ddDTO> GetVehicleMaster(string lMasterlist)
        {

            List<ddDTO> obj;

            obj = _context.TblVehicleDetails.Select(x => new ddDTO { mID = x.VehicleId, mValue = x.VehicleModel, mType = x.VehicleType }).ToList();

            return obj;
        }

        public BillingResponse BillingDetails(string PolicyNo, string Month)
        {
            var getMonthNumber = 0;
            BillingResponse response = new BillingResponse();
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
                    response.Status = BusinessStatus.PreConditionFailed;
                    errorInfo.ErrorMessage = "No Such Month Name: " + Month;
                    errorInfo.ErrorCode = "GEN001";
                    errorInfo.PropertyName = "NoRecords";
                    response.Errors.Add(errorInfo);
                    return response;
                }

                var checkPolicyNo = _context.TblMonthlyBalance.Any(x => x.PolicyNumber == PolicyNo);

                if (checkPolicyNo)
                {
                    var billData = _context.TblMonthlyBalance.SingleOrDefault(x => x.PolicyNumber == PolicyNo && x.BalanceDate.Value.Month == getMonthNumber);

                    if (billData != null)
                    {
                        var mapData = _mapper.Map<BillingDTO>(billData);
                        response.BillingDTO = mapData;
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
                    response.Status = BusinessStatus.PreConditionFailed;
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
                response.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Either Policy Number or Month is Null";
                errorInfo.ErrorCode = "GEN002";
                errorInfo.PropertyName = "MandatoryfieldsMissing";
                response.Errors.Add(errorInfo);
                return response;
            }



        }


        public async Task<dynamic> CDMapper(string TxnType,dynamic SourceObject)
        {

            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);

            List<CalculationResult> DeserilizedPremiumData = new List<CalculationResult>();
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            List<MicaCDDTO> FinalDto = new List<MicaCDDTO>();
            string PolicyNumber = "";
            var SumInsured = "";
            int NoOfPC = 0;
            int NoOfTW = 0;
            string BillingFrequency = "";

            //List<EndoAddDTO> Deserilize = JsonConvert.DeserializeObject<List<EndoAddDTO>>(SourceObject.ToSting());

            if (TxnType == "EndorementAdd")
            {   
                //Ashish Sir
                //var modelSerialize = JsonConvert.DeserializeObject<dynamic>(SourceObject);
                // var DriverRiskItem = PolicyItem["Data"]["InsurableItem"][0]["RiskItems"];
                var EndorsmentItem = SourceObject[1];
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

                if(VehicleRiskItem != null)
                {
                    foreach(var item in VehicleRiskItem)
                    {
                        if (item["Vehicle Type"]=="PC")
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
                PolicyNumber = EndorsmentItem["Data"]["PolicyNumber"];
                BillingFrequency = PolicyData["billingFrequency"].ToString();
                //var CheckSI = SourceObject["si"].ToString();
                //if (CheckSI == null)
                //    SumInsured = SourceObject["Policy:si"];

              
                EndorsementPremiumDTO endorsementDto = new EndorsementPremiumDTO();

                endorsementDto.PolicyNo = PolicyNumber;
                endorsementDto.SI = SumInsured.ToString();
                endorsementDto.PcCount = NoOfPC;
                endorsementDto.TwCount = NoOfTW;
                endorsementDto.TypeOfEndorsement = "Addition";
                endorsementDto.EndorsementEffectiveDate = IndianTime;

                var CallNewEndo = await NewEndorsementPremium(endorsementDto, PolicyData, "CDUpdate");


                try
                {
                    //  DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CallNewEndo);

                    DeserilizedPremiumData = CallNewEndo;
                }
                catch (Exception Ex)
                {
                    throw Ex;
                }
                if (DeserilizedPremiumData.Count > 0)
                {
                    var CallEndoMap = EndoADFT(DeserilizedPremiumData,"Addition");
                    return CallEndoMap;
                }

                return FinalDto;

            }
            else if (TxnType == "EndorementDel")
            {
                //Ashish Sir
                var EndorsmentItem = SourceObject[1];
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
                PolicyNumber = EndorsmentItem["Data"]["PolicyNumber"];
                BillingFrequency = PolicyData["billingFrequency"].ToString();
                //var CheckSI = SourceObject["si"].ToString();
                //if (CheckSI == null)
                //    SumInsured = SourceObject["Policy:si"];


                EndorsementPremiumDTO endorsementDto = new EndorsementPremiumDTO();

                endorsementDto.PolicyNo = PolicyNumber;
                endorsementDto.SI = SumInsured.ToString();
                endorsementDto.PcCount = NoOfPC;
                endorsementDto.TwCount = NoOfTW;
                endorsementDto.TypeOfEndorsement = "Deletion";
                endorsementDto.EndorsementEffectiveDate = IndianTime;

                var CallNewEndo = await NewEndorsementPremium(endorsementDto, PolicyData, "CDUpdate");


                try
                {
                    //  DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CallNewEndo);

                    DeserilizedPremiumData = CallNewEndo;
                }
                catch (Exception Ex)
                {
                    throw Ex;
                }
                if (DeserilizedPremiumData.Count > 0)
                {
                    var CallEndoMap = EndoADFT(DeserilizedPremiumData,"Deletion");
                    return CallEndoMap;
                }

                return FinalDto;

            }
            else
            {              
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
            premiumDTO.dictionary_rate.ADDRVRT_DRV = SourceObject["additionalDriver"]; //Verify
            premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = SourceObject["noOfPC"];
            premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = SourceObject["noOfPC"];
            premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = SourceObject["noOfTW"];


            var taxType = TaxTypeForStateCode(SourceObject["stateCode"].ToString());

            premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE; //Call TaxType //Verify
            premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE; //Call TaxType //Verify


            //Call CalculatePremium Policy Module MICA
            var CalPremiumResponse = await _integrationService.RatingPremium(premiumDTO, apiContext);

         

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
                            CdModel.TxnAmount = Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;

                            FinalDto.Add(CdModel);

                            return FinalDto;                                                   
                       
                        case "SwitchOnOff":
                           CdModel.Type = "";
                            CdModel.TxnType = "";
                            return CdModel;

                        case "Schedule":
                            CdModel.Type = "";
                            CdModel.TxnType = "";
                            return CdModel;
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
                            CdModel.TxnAmount = Ad365days + Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;

                            return CdModel;


                        case "Policy":
                            FTPremium = FTYearly(DeserilizedPremiumData, taxType);
                            FinalTaxTotal = FTPremium.TaxAmount.TaxAmount;
                            //FT DEBIT
                            CdModel.PremiumDTO.Add(FTPremium);
                            CdModel.Type = "Policy";
                            CdModel.TxnType = "Debit";
                            CdModel.TxnAmount = Ft365days;
                            CdModel.TaxAmount = FinalTaxTotal;
                            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                            return CdModel;


                        case "EndorementAdd":

                            break;


                        case "EndorementDel":

                            break;

                        case "SwitchOnOff":

                            break;

                        case "Schedule":

                            break;
                    }





                }

            }

            return false;
        }
        
        private CDPremiumDTO ADMonthly(List<CalculationResult> RatingObject,TaxTypeDTO taxType)
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

        private List<MicaCDDTO> EndoADFT(List<CalculationResult> EndoRatingObject,string TxnType)
        {
            List<MicaCDDTO> FinalDto = new List<MicaCDDTO>();
            MicaCDDTO CdModel = new MicaCDDTO();
            CDPremiumDTO ADPremiumDTO = new CDPremiumDTO();
            CDTaxAmountDTO taxAmountDTO = new CDTaxAmountDTO();
            CDTaxTypeDTO taxTypeDTO = new CDTaxTypeDTO();
            
            decimal TotalTax = 0;
            //AD TAX
            //From State 
            taxTypeDTO.Type = EndoRatingObject.FirstOrDefault(x=>x.Entity== "FSTTAX_TAXTYPE").EValue;
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
            ADPremiumDTO.TxnAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue);
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


            //FT
            FTPremiumDTO.Type = "FT";
            FTPremiumDTO.TxnAmount = Convert.ToDecimal(EndoRatingObject.FirstOrDefault(x => x.Entity == "ADTSTAX").EValue);
            FTPremiumDTO.TotalAmount = FTPremiumDTO.TxnAmount + TotalTax;
            FTPremiumDTO.TaxAmount = taxAmountDTO;

            
            //ADPremium = ADMonthly(DeserilizedPremiumData, taxType);
            //FTPremium = FTYearly(DeserilizedPremiumData, taxType);
             var FinalTaxTotal = ADPremiumDTO.TaxAmount.TaxAmount + FTPremiumDTO.TaxAmount.TaxAmount;

            ////AD & FT Credit Object
            
            CdModel.PremiumDTO.Add(ADPremiumDTO);
            CdModel.PremiumDTO.Add(FTPremiumDTO);
            CdModel.Type = "EndorementAdd";
            CdModel.TxnType = "Credit";
            CdModel.TxnAmount = ADPremiumDTO.TotalAmount + FTPremiumDTO.TotalAmount;
            CdModel.TaxAmount = FinalTaxTotal;
            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
            FinalDto.Add(CdModel);

            //FT-DebitObject
            CdModel = new MicaCDDTO();
            CdModel.PremiumDTO.Add(FTPremiumDTO);
            CdModel.Type = "EndorementAdd";
            CdModel.TxnType = "Debit";
            CdModel.TxnAmount = FTPremiumDTO.TotalAmount;
            CdModel.TaxAmount = FTPremiumDTO.TaxAmount.TaxAmount;
            CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
            FinalDto.Add(CdModel);

            if (TxnType == "Deletion")
            {
                //FT-DebitObject
                CdModel = new MicaCDDTO();
                CdModel.PremiumDTO.Add(FTPremiumDTO);
                CdModel.Type = "EndorementAdd";
                CdModel.TxnType = "Debit";
                CdModel.TxnAmount = FTPremiumDTO.TotalAmount;
                CdModel.TaxAmount = FTPremiumDTO.TaxAmount.TaxAmount;
                CdModel.TotalAmount = CdModel.TxnAmount + CdModel.TaxAmount;
                FinalDto.Add(CdModel);

                return FinalDto;
            }

                return FinalDto;

        }

        public async Task<List<RuleEngineResponse>> RuleMapper(string TxnType, dynamic SourceObject)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);


            var Currentdate = System.DateTime.UtcNow.AddMinutes(330);


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
                        RuleEngine = await _integrationService.RuleEngine(ruleOneDTO, apiContext);
                        engineResponses = JsonConvert.DeserializeObject<List<RuleEngineResponse>>(RuleEngine.ToString());



                        RuleEngineResponse resobj = new RuleEngineResponse();
                        if (SourceObject["driverExp"] < 1 && SourceObject["driverExp"] > SourceObject["driverAge"])
                        {

                            resobj.ValidatorName = "driverExp";
                            resobj.Outcome = "Fail";
                            resobj.Message = "Invalid";
                            resobj.Code = "EXP001";
                            engineResponses.FirstOrDefault(x => x.ValidatorName == "Final Result").Outcome = "Fail";
                        }
                        else
                        {

                            resobj.ValidatorName = "driverExp";
                            resobj.Outcome = "Success";
                            resobj.Message = "Validation done for driver experiance";
                            resobj.Code = "EXP002";

                        }
                        engineResponses.Add(resobj);
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
                        // RuleEngine = await _integrationService.RuleEngine(ruleTwoDTO, apiContext);
                        // engineResponses = JsonConvert.DeserializeObject<List<RuleEngineResponse>>(RuleEngine.ToString());


                        DateTime Startdate = Convert.ToDateTime(SourceObject["Policy Start Date"]);
                        DateTime Enddate = Convert.ToDateTime(SourceObject["Policy End Date"]);
                        int successcount = 0;
                        int failcount = 0;

                        if (Enddate > Startdate)
                        {
                            if (Startdate >= Currentdate || Startdate <= (Currentdate.AddDays(30)))
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
                                resobj.Message = "Start date is not within one month";
                                resobj.Code = "EXPO002";
                                engineResponse.Add(resobj);
                                failcount++;
                            }
                        }
                        else
                        {
                            RuleEngineResponse resobj = new RuleEngineResponse();
                            resobj.ValidatorName = "Policy Start Date";
                            resobj.Outcome = "Fail";
                            resobj.Message = "Start date is less than End date";
                            resobj.Code = "EXPO003";
                            engineResponse.Add(resobj);
                            failcount++;
                        }

                        if (Enddate == Startdate.AddDays(364))
                        {
                            RuleEngineResponse res1obj = new RuleEngineResponse();
                            res1obj.ValidatorName = "Policy End Date";
                            res1obj.Outcome = "Success";
                            res1obj.Message = "Validation done for Policy End Date";
                            res1obj.Code = "EXPO004";

                            engineResponse.Add(res1obj);
                            successcount++;
                        }
                        else
                        {
                            RuleEngineResponse res1obj = new RuleEngineResponse();
                            res1obj.ValidatorName = "Policy End Date";
                            res1obj.Outcome = "Fail";
                            res1obj.Message = "End date is not equal to 364 days from Start date";
                            res1obj.Code = "EXPO005";

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
                            res3obj.Code = "EXPO006";

                            engineResponse.Add(res3obj);
                            successcount++;
                        }
                        else
                        {
                            RuleEngineResponse res3obj = new RuleEngineResponse();
                            res3obj.ValidatorName = "Policy End Time";
                            res3obj.Outcome = "Fail";
                            res3obj.Message = "Policy End time is not valid";
                            res3obj.Code = "EXPO007";

                            engineResponse.Add(res3obj);
                            failcount++;
                        }

                        if (failcount > 0)
                        {
                            RuleEngineResponse res4obj = new RuleEngineResponse();
                            res4obj.ValidatorName = "Final Result";
                            res4obj.Outcome = "Fail";
                            res4obj.Message = "One or More conditions failed";
                            res4obj.Code = "EXPO008";
                            engineResponse.Add(res4obj);
                        }
                        else
                        {
                            RuleEngineResponse res4obj = new RuleEngineResponse();
                            res4obj.ValidatorName = "Final Result";
                            res4obj.Outcome = "Success";
                            res4obj.Message = "Conditions Successful";
                            res4obj.Code = "EXPO009";
                            engineResponse.Add(res4obj);

                        }
                    }
                    catch (Exception Ex)
                    {
                        throw Ex;
                    }

                    return engineResponse;

                    //case "EndorementAdd":


                    //    return RuleEngine;

                    //case "EndorementDel":


                    //    return CdModel;

                    //case "SwitchOnOff":

                    //    return CdModel;

                    //case "Schedule":

                    //    return CdModel;
            }

            return new List<RuleEngineResponse>();

        }


        public async Task<dynamic> NewEndorsementPremium(EndorsementPremiumDTO endorsementPremium, dynamic PolicyObject, string callType)
        {
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            var CurrentDate = IndianTime.Date;


            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);

            PremiumReturnDto DifferentialPremium = new PremiumReturnDto();

            if (String.IsNullOrEmpty(endorsementPremium.PolicyNo) && String.IsNullOrEmpty(endorsementPremium.SI))
            {
                ErrorInfo errorInfo = new ErrorInfo();

                DifferentialPremium.ResponseMessage = "Mandatory Fields missing";
                DifferentialPremium.Status = BusinessStatus.PreConditionFailed;
                errorInfo.ErrorMessage = "Policy Number or SumInsured is Missing";
                errorInfo.ErrorCode = "GEN002";
                errorInfo.PropertyName = "MandatoryFieldsMissing";
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
                    PolicyData = await _integrationService.GetPolicyDetails(endorsementPremium.PolicyNo, apiContext);
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
                        RemainingDays = (PolicyEndDate - CurrentDate).TotalDays;

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
                taxType = TaxTypeForStateCode(detailsDTO.StateCode);

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
                premiumDTO.dictionary_rule.SI = endorsementPremium.SI;
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
                var NewPremiumData = await NewInternalCalculatePremium(premiumDTO, BillingFrequency);


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
                var OldPremiumData = await NewInternalCalculatePremium(oldPremiumDTO, BillingFrequency);



                if (NewPremiumData.Total > 0 && OldPremiumData.Total > 0)
                {

                    var DifferentialFireTheft = NewPremiumData.FireTheft - OldPremiumData.FireTheft;
                    var DifferentialADPremium = NewPremiumData.ADPremium - OldPremiumData.ADPremium;

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

                    var CallEndorsmentCalculator = await EndorsementCalculator(endorsementCal);

                    if (callType == "CDUpdate")
                    {
                        return CallEndorsmentCalculator;
                    }
                    else
                    {
                        if (CallEndorsmentCalculator.Count > 0)
                        {
                            DifferentialPremium.PerDayPremium = NewPremiumData.PerDayPremium - OldPremiumData.PerDayPremium;
                            DifferentialPremium.FireTheft = Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTPREM").EValue);
                            DifferentialPremium.ADPremium = Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "ADPREM").EValue);

                            var GSTTotal = Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "TSTTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FSTTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTFMTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTTSTAX").EValue);

                            DifferentialPremium.GST = GSTTotal;

                            DifferentialPremium.MonthlyPremium = NewPremiumData.MonthlyPremium - OldPremiumData.MonthlyPremium;
                            DifferentialPremium.Total = DifferentialPremium.FireTheft + DifferentialPremium.ADPremium + GSTTotal;
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
                    PolicyData = await _integrationService.GetPolicyDetails(endorsementPremium.PolicyNo, apiContext);
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
                        RemainingDays = (PolicyEndDate - CurrentDate).TotalDays;

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
                taxType = TaxTypeForStateCode(detailsDTO.StateCode);

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
                premiumDTO.dictionary_rule.SI = endorsementPremium.SI;
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
                var NewPremiumData = await NewInternalCalculatePremium(premiumDTO, BillingFrequency);


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
                var OldPremiumData = await NewInternalCalculatePremium(oldPremiumDTO, BillingFrequency);



                if (NewPremiumData.Total > 0 && OldPremiumData.Total > 0)
                {
                    var DifferentialFireTheft = NewPremiumData.FireTheft - OldPremiumData.FireTheft;
                    var DifferentialADPremium = NewPremiumData.ADPremium - OldPremiumData.ADPremium;

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

                    var CallEndorsmentCalculator = await EndorsementCalculator(endorsementCal);

                    if (callType == "CDUpdate")
                    {
                        return CallEndorsmentCalculator;
                    }
                    else
                    {
                        if (CallEndorsmentCalculator.Count > 0)
                        {
                            DifferentialPremium.PerDayPremium = NewPremiumData.PerDayPremium - OldPremiumData.PerDayPremium;
                            DifferentialPremium.FireTheft = Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTPREM").EValue);
                            DifferentialPremium.ADPremium = Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "ADPREM").EValue);

                            var GSTTotal = Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "TSTTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FSTTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTFMTAX").EValue) + Convert.ToDecimal(CallEndorsmentCalculator.FirstOrDefault(x => x.Entity == "FTTSTAX").EValue);

                            DifferentialPremium.GST = GSTTotal;

                            DifferentialPremium.MonthlyPremium = NewPremiumData.MonthlyPremium - OldPremiumData.MonthlyPremium;
                            DifferentialPremium.Total = DifferentialPremium.FireTheft + DifferentialPremium.ADPremium + GSTTotal;
                            DifferentialPremium.FinalAmount = Math.Round(DifferentialPremium.Total);

                        }
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


        private async Task<PremiumReturnDto> NewInternalCalculatePremium(SchedulerPremiumDTO premiumDTO, string BillingFrequency)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);


            PremiumReturnDto returnobj = new PremiumReturnDto();

            //Call CalculatePremium Policy Module MICA
            var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, apiContext);

            List<CalculationResult> val = new List<CalculationResult>();
            CDDTO CdModel = new CDDTO();

            if (CalPremiumResponse != null)
            {
                val = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());
            }


            if (val.Count() > 0)
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
                var ad30ftax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30FTAXAMT").EValue);
                var ad30ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30TTAXAMT").EValue);

                var ftfttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTFTAXAMT").EValue);
                var ftttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTTTAXAMT").EValue);

                var monthlyGST = ad60fttax + ad60ttax + ftfttax + ftttax;
                var yearlyGST = ad365ftax + ad365ttax + ftfttax + ftttax;

                returnobj.PerDayPremium = Convert.ToDecimal(Ftperday);
                returnobj.FireTheft = Convert.ToDecimal(Ft365days);
                if (BillingFrequency == "Monthly")
                {
                    returnobj.ADPremium = Convert.ToDecimal(Ad60days);
                    returnobj.GST = Convert.ToDecimal(monthlyGST);
                    returnobj.MonthlyPremium = Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax);
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

                //returnobj.PerDayPremium = Convert.ToDecimal(Ftperday);
                //returnobj.FireTheft = Convert.ToDecimal(Ft365days);
                //returnobj.ADPremium = Convert.ToDecimal(Ad60days);
                //returnobj.GST = Convert.ToDecimal(monthlyGST);
                //returnobj.MonthlyPremium = Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax);
                //returnobj.Total = returnobj.FireTheft + returnobj.ADPremium + returnobj.GST;
                //returnobj.FinalAmount = Math.Round(returnobj.FireTheft + returnobj.ADPremium + returnobj.GST);

            }

            return returnobj;
        }
                  

        private async Task<List<CalculationResult>> EndorsementCalculator(EndorsementCalDTO endorsementCal)
        {

            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);

            var CallEndrosmentRating = await _integrationService.EndorsementCalculator(endorsementCal,apiContext);

            List<CalculationResult> RatingResponnse = new List<CalculationResult>();
          
            try
            {
                if (CallEndrosmentRating != null)
                {
                    RatingResponnse = JsonConvert.DeserializeObject<List<CalculationResult>>(CallEndrosmentRating.ToString());
                }

            }
            catch(Exception Ex)
            {
                return new List<CalculationResult>();
            }


            return RatingResponnse;
        }

    }
}

