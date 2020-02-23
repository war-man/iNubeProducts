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
        Task<bool> NightScheduler();
        Task<bool> PremiumBookingScheduler();
        Task<SwitchOnOffResponse> SwitchOnOff(string VehicleRegistrationNo, string PolicyNo, bool SwitchStatus);
        ActivityResponse ActivityReport(string PolicyNo, string Month);
        Task<PremiumReturnDto> EndorsementPremium(EndorsementPremiumDTO endorsementPremium);

        AllScheduleResponse GetAllVehicleSchedule(string PolicyNo);
        List<ddDTO> GetVehicleMaster(string lMasterlist);
    }

    public class MicaEGIService : IMicaEGIService
    {
        private MICAQMContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly IEmailService _emailService;
        private IIntegrationService _integrationService;
        private IConfiguration _configuration;


        public MicaEGIService(IConfiguration configuration,IIntegrationService integrationService, IMapper mapper, MICAQMContext context, IOptions<AppSettings> appSettings, IEmailService emailService)
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


            if (!String.IsNullOrEmpty(VehicleRegistrationNo) && !String.IsNullOrEmpty(PolicyNo))
            {
                var checkdata = _context.TblSchedule.Any(x => x.VehicleRegistrationNo == VehicleRegistrationNo && x.PolicyNo == PolicyNo);

                if(checkdata)
                {

                    var scheduledata = _context.TblSchedule.FirstOrDefault(x=>x.VehicleRegistrationNo == VehicleRegistrationNo && x.PolicyNo == PolicyNo);
                    
                    response.GetSchedule.PolicyNo = PolicyNo;
                    response.GetSchedule.VehicleRegistrationNo = VehicleRegistrationNo;
                    response.GetSchedule.VehicleType = scheduledata.VehicleType;
                    response.GetSchedule.Mon = scheduledata.Mon;
                    response.GetSchedule.Tue = scheduledata.Mon; 
                    response.GetSchedule.Wed = scheduledata.Wed;
                    response.GetSchedule.Thu = scheduledata.Thu;
                    response.GetSchedule.Fri = scheduledata.Fri;
                    response.GetSchedule.Sat = scheduledata.Sat;
                    response.GetSchedule.Sun = scheduledata.Sun;

                    var checkstatus = _context.TblSwitchLog.LastOrDefault(x=>x.PolicyNo == PolicyNo 
                                                                  && x.VehicleNumber == VehicleRegistrationNo
                                                                  && x.CreatedDate.Value.Date == IndianTime.Date);

                    if (checkstatus == null)
                    {
                        response.GetSchedule.SwitchStatus = false;
                    }
                    else
                    {

                        response.GetSchedule.SwitchStatus = checkstatus.SwitchStatus;
                    }

                    if(CurrentTimeHour < Convert.ToDecimal(_configuration["Scheduler_Validation:TimeInHours"]))
                    {
                        response.GetSchedule.SwitchEnabled = true ;
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

            }else if(String.IsNullOrEmpty(scheduleDTO.VehicleRegistrationNo))
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
                    tblschedule.Fri = mapData.Wed;
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
            if (premiumdata.NoOfPC != 0) {
                if (premiumdata.DriverAge >= 18 && premiumdata.DriverAge <= 75) { 
                    if(premiumdata.AdditionalDriver <= (premiumdata.DriverAge - 18)) {
                        if (premiumdata.BillingFrequency == "" || premiumdata.BillingFrequency == "Monthly" || premiumdata.BillingFrequency == "Yearly") { 
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

            List<CalculationResult> val = JsonConvert.DeserializeObject<List<CalculationResult>>(Data.ToString());
                            if(val != null) { 
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

            var monthlyGST = ad60fttax + ad60ttax + ftfttax + ftfttax;
            var yearlyGST = ad365ftax + ad365ttax + ftfttax + ftfttax;


            PremiumReturnDto returnobj = new PremiumReturnDto();
            returnobj.PerDayPremium = Math.Round(Convert.ToDecimal(Ftperday));
            returnobj.FireTheft = Math.Round(Convert.ToDecimal(Ft365days));
            if (premiumdata.BillingFrequency == "Monthly")
            {
                returnobj.ADPremium = Math.Round(Convert.ToDecimal(Ad60days));
                returnobj.GST = Math.Round(Convert.ToDecimal(monthlyGST));
                returnobj.MonthlyPremium = Math.Round(Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax));
            }
            else if (premiumdata.BillingFrequency == "Yearly")
            {
                returnobj.ADPremium = Math.Round(Convert.ToDecimal(Ad365days));
                returnobj.GST = Math.Round(Convert.ToDecimal(yearlyGST));
            }
            returnobj.Total = Math.Round(returnobj.FireTheft + returnobj.ADPremium + returnobj.GST);

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

        private TaxTypeDTO TaxTypeForStateCode(string stateabbreviation)
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
        
        public async Task<SwitchOnOffResponse> SwitchOnOff(string VehicleRegistrationNo, string PolicyNo, bool SwitchStatus)
        {

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

                if(verifyPolicy)
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
                    errorInfo.ErrorMessage = "Not Records Found for this Policy Number: " + PolicyNo +" in Schedule";
                    errorInfo.ErrorCode = "ExtSWT001";
                    errorInfo.PropertyName = "Policy Number";
                    response.Errors.Add(errorInfo);
                    return response;
                }          

                if (verifydata)
                {
                    checkLog = _context.TblSwitchLog.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleNumber == VehicleRegistrationNo);
                    ScheduleData = _context.TblSchedule.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleRegistrationNo == VehicleRegistrationNo);

                }
                else
                {
                    //Return Wrong DATA No Records for Policy Number & Vehicle Number
                    SwitchOnOffResponse response = new SwitchOnOffResponse();
                    ErrorInfo errorInfo = new ErrorInfo();

                    response.ResponseMessage = "No Records Found for the Sent Inputs";
                    response.Status = BusinessStatus.NotFound;
                    errorInfo.ErrorMessage = "No Records Found for this Policy Number: " + PolicyNo + " & Vehicle Number: "+ VehicleRegistrationNo  +" in Schedule";
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
                    var ActivePCCount = activeVehicleStat.ActivePc;
                    var ActiveTWCount = activeVehicleStat.ActiveTw;


                    if (ScheduleData.VehicleType == "TW")
                    {
                        ActiveTWCount += 1;
                        activeVehicleStat.ActivePc += 1;
                    }
                    else if (ScheduleData.VehicleType == "PC")
                    {
                        ActivePCCount += 1;
                        activeVehicleStat.ActiveTw += 1;
                    }

                    ////Update Number of Active Vehicle is Daily Active Table
                    //_context.TblDailyActiveVehicles.Update(activeVehicleStat);


                    //Call the Policy Service to Get Policy Details.
                    //An Integration Call to  be Made and Recive the Data as this Model PolicyPremiumDetailsDTO

                    var PolicyData = await _integrationService.GetPolicyDetails(PolicyNo, apiContext);

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

                    if (CalPremiumResponse != null)
                    {
                        DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());
                    }


                    if (DeserilizedPremiumData.Count() > 0)
                    {

                        var TOTALPMPD = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPD").EValue);

                        var TOTALPMPDFTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDFTTAX").EValue);

                        var TOTALPMPDTTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDTTTAX").EValue);

                        var NewPremium = Math.Round(TOTALPMPD + TOTALPMPDFTTAX + TOTALPMPDTTTAX);

                        TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = PolicyNo;
                        bookingLog.TxnAmount = NewPremium;
                        bookingLog.TxnDateTime = IndianTime;
                        bookingLog.TxnDetails = "Revised Total Premium for Policy - " + PolicyNo;

                        _context.TblPremiumBookingLog.Add(bookingLog);
                        _context.SaveChanges();



                        //Internal Private Method to get Old Premium Amount.
                        var OldPremium = CheckPremiumUpdate(PolicyNo);

                        var FinalPremium = NewPremium - OldPremium;

                        CdModel.AccountNo = PolicyNo;
                        CdModel.TxnAmount = Convert.ToDecimal(FinalPremium);
                        CdModel.TxnType = "Debit";//HarCoded
                        CdModel.PaymentId = Convert.ToDecimal(_configuration["CdModel:PaymentId"]); //HarCoded as Per Ashish Sir
                        CdModel.Description = "Revised Premium for Policy - " + PolicyNo;


                        var CallMicaCd = await _integrationService.GenerateCDTransaction(CdModel, apiContext);



                        if (CallMicaCd != null)
                        {
                            bookingLog = new TblPremiumBookingLog();

                            bookingLog.PolicyNo = PolicyNo;
                            bookingLog.TxnAmount = FinalPremium;
                            bookingLog.TxnDateTime = IndianTime;
                            bookingLog.TxnDetails = "Revised Premium - CD Transaction Successfully Updated in MICA";

                            _context.TblPremiumBookingLog.Add(bookingLog);

                      

                            var tblDailyActive = _context.TblDailyActiveVehicles.FirstOrDefault(x => x.TxnDate.Value.Date == IndianTime.Date &&
                                                                                                x.PolicyNumber == PolicyNo);

                            tblDailyActive.Premium = NewPremium;
                            //Update Number of Active Vehicle is Daily Active Table
                            tblDailyActive.ActivePc = activeVehicleStat.ActivePc;
                            tblDailyActive.ActiveTw = activeVehicleStat.ActiveTw;

                            _context.TblDailyActiveVehicles.Update(tblDailyActive);

                            _context.SaveChanges();



                        }
                        else
                        {
                            bookingLog = new TblPremiumBookingLog();

                            bookingLog.PolicyNo = PolicyNo;
                            bookingLog.TxnAmount = NewPremium;
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
                    checkLog = _context.TblSwitchLog.FirstOrDefault(x => x.PolicyNo == PolicyNo && x.VehicleNumber == VehicleRegistrationNo);
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
                        }else
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

        
        public async Task<bool> NightScheduler()
        {
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentDay = IndianTime.DayOfWeek.ToString();
            var CurrentTimeHour = IndianTime.Hour;

            TblSwitchLog switchLog = new TblSwitchLog();
            TblDailyActiveVehicles dailyActiveVehicles = new TblDailyActiveVehicles();

            var ActivePC = 0;
            var ActiveTW = 0;

            string ProductCode =_configuration["Mica_ApiContext:ProductCode"].ToString();
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);

            var PolicyDetails = await _integrationService.GetPolicyList(ProductCode, apiContext);

            var PolicyNumberList = PolicyDetails.Select(x => x.PolicyNumber).ToList();

            //PolicyNumberList.Add("0418/0408/0866/00/000");
            PolicyNumberList.Distinct();

            foreach (var policy in PolicyNumberList)
            {
                ActivePC = 0;
                ActiveTW = 0;

                var ScheduleData = _context.TblSchedule.Where(x=>x.PolicyNo == policy && x.IsActive==true).ToList();
                                
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
                    else if(CurrentDayStat == false)
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

                    dailyActiveVehicles = new TblDailyActiveVehicles();

                    dailyActiveVehicles.PolicyNumber = policy;
                    dailyActiveVehicles.ActivePc = ActivePC;
                    dailyActiveVehicles.ActiveTw = ActiveTW;
                    dailyActiveVehicles.TxnDate = IndianTime;
                    dailyActiveVehicles.Premium = 0;

                    _context.TblDailyActiveVehicles.Add(dailyActiveVehicles);
                    _context.SaveChanges();
                }
            }

            return true;

        }

        public async Task<bool> PremiumBookingScheduler()
        {
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentDay = IndianTime.DayOfWeek.ToString();
            var CurrentTimeHour = IndianTime.Hour;
            var CurrentDate = IndianTime.Date;
            
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
          
            var PolicyNumberList = _context.TblDailyActiveVehicles.Where(x => x.TxnDate.Value.Date == CurrentDate).Select(x=>x.PolicyNumber).Distinct().ToList();

            foreach (var policy in PolicyNumberList)
            {

                var getDailyStat = _context.TblDailyActiveVehicles.LastOrDefault(x=>x.TxnDate.Value.Date == CurrentDate && x.PolicyNumber == policy);

                var ActivePCCount = getDailyStat.ActivePc;
                var ActiveTWCount = getDailyStat.ActiveTw;

                schedulerLog.SchedulerDateTime = IndianTime;
                schedulerLog.SchedulerStatus = "Running";
               
                _context.TblSchedulerLog.Add(schedulerLog);
                _context.SaveChanges();



                //Call the Policy Service to Get Policy Details.
                //An Integration Call to  be Made and Recive the Data as this Model PolicyPremiumDetailsDTO
                var PolicyData = await _integrationService.GetPolicyDetails(policy,apiContext);
                                                          
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

                if (CalPremiumResponse != null)
                {
                    DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());
                }


                if (DeserilizedPremiumData.Count() > 0)
                {

                    var TOTALPMPD = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPD").EValue);

                    var TOTALPMPDFTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDFTTAX").EValue);

                    var TOTALPMPDTTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDTTTAX").EValue);

                    var Premium = Math.Round(TOTALPMPD + TOTALPMPDFTTAX + TOTALPMPDTTTAX);

                    bookingLog = new TblPremiumBookingLog();

                    bookingLog.PolicyNo = policy;
                    bookingLog.TxnAmount = Premium;
                    bookingLog.TxnDateTime = IndianTime;
                    bookingLog.TxnDetails = "Auto Schedule Premium for Policy - " + policy;

                    _context.TblPremiumBookingLog.Add(bookingLog);

                    schedulerLog.SchedulerStatus = "Calculate Premium Success";
                    schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                    _context.TblSchedulerLog.Update(schedulerLog);

                    _context.SaveChanges();

                    CdModel.AccountNo = policy;
                    CdModel.TxnAmount = Convert.ToDecimal(Premium);
                    CdModel.TxnType = "Debit";//HarCoded
                    CdModel.PaymentId = Convert.ToDecimal(_configuration["CdModel:PaymentId"]); //HarCoded as Per Ashish Sir
                    CdModel.Description = "Auto Schedule Premium for Policy - " + policy;


                    var CallMicaCd = await _integrationService.GenerateCDTransaction(CdModel, apiContext);



                    if (CallMicaCd != null)
                    {

                        getDailyStat.Premium = Premium;

                        //var tblDailyActive = _context.TblDailyActiveVehicles.FirstOrDefault(x => x.TxnDate == IndianTime &&
                        //                                                                    x.PolicyNumber == policy);

                      //  tblDailyActive.Premium = Premium;

                        _context.TblDailyActiveVehicles.Update(getDailyStat);

                        schedulerLog.SchedulerStatus = "CD Update Success";
                        schedulerLog.SchedulerEndDateTime = System.DateTime.UtcNow.AddMinutes(330);
                        _context.TblSchedulerLog.Update(schedulerLog);

                        var report = _context.TblScheduleReport.FirstOrDefault(x=>x.ReportId == ReportID);

                        report.SuccessCount += 1;

                        _context.TblScheduleReport.Update(report);
                        _context.SaveChanges();

                    }
                    else
                    {
                        bookingLog = new TblPremiumBookingLog();

                        bookingLog.PolicyNo = policy;
                        bookingLog.TxnAmount = Premium;
                        bookingLog.TxnDateTime = IndianTime;
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
                    bookingLog.TxnDateTime = IndianTime;
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
               
        private decimal? CheckPremiumUpdate(string PolicyNo)
        {
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
                       
            var checkPremium = _context.TblDailyActiveVehicles.FirstOrDefault(x=>x.TxnDate.Value.Date == IndianTime.Date && x.PolicyNumber == PolicyNo);

            var PremiumAmount = checkPremium.Premium;

            return PremiumAmount;
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


            var taxType = TaxTypeForStateCode(detailsDTO.StateCode);



            //CalculatePremiumObject as of Endorsement
            SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

            //RuleObject
            premiumDTO.dictionary_rule.SI = endorsementPremium.SI;
            premiumDTO.dictionary_rule.NOOFPC = endorsementPremium.PcCount.ToString();
            premiumDTO.dictionary_rule.NOOFTW = endorsementPremium.TwCount.ToString();


            //RateObject

            premiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince.ToString();
            premiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age.ToString();
            premiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver.ToString();
            premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = endorsementPremium.PcCount.ToString();
            premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = endorsementPremium.PcCount.ToString();
            premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = endorsementPremium.TwCount.ToString();


            premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
            premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

            //Call CalculatePremium for with Endorsment Data MICA
            var NewPremiumData = await InternalCalculatePremium(premiumDTO);



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

            PremiumReturnDto DifferentialPremium = new PremiumReturnDto();

            if (NewPremiumData.Total > 0 && OldPremiumData.Total > 0)
            {
                DifferentialPremium.PerDayPremium = NewPremiumData.PerDayPremium - OldPremiumData.PerDayPremium;
                DifferentialPremium.FireTheft = NewPremiumData.FireTheft - OldPremiumData.FireTheft;
                DifferentialPremium.ADPremium = NewPremiumData.ADPremium - OldPremiumData.ADPremium;
                DifferentialPremium.GST = NewPremiumData.GST - OldPremiumData.GST;
                DifferentialPremium.MonthlyPremium = NewPremiumData.MonthlyPremium - OldPremiumData.MonthlyPremium;
                DifferentialPremium.Total = NewPremiumData.Total - OldPremiumData.Total;

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
                var ad30ftax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30FTAXAMT").EValue);
                var ad30ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30TTAXAMT").EValue);

                var ftfttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTFTAXAMT").EValue);
                var ftttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTTTAXAMT").EValue);

                var monthlyGST = ad60fttax + ad60ttax + ftfttax + ftfttax;
                var yearlyGST = ad365ftax + ad365ttax + ftfttax + ftfttax;

                returnobj.PerDayPremium = Math.Round(Convert.ToDecimal(Ftperday));
                returnobj.FireTheft = Math.Round(Convert.ToDecimal(Ft365days));
                returnobj.ADPremium = Math.Round(Convert.ToDecimal(Ad60days));
                returnobj.GST = Math.Round(Convert.ToDecimal(monthlyGST));
                returnobj.MonthlyPremium = Math.Round(Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax));
                returnobj.Total = Math.Round(returnobj.FireTheft + returnobj.ADPremium + returnobj.GST);

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

    }
}

