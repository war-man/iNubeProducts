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

namespace iNube.Services.MicaExtension_EGI.Controllers.MicaExtension_EGI.Mica_EGIService
{
    public interface IMicaEGIService
    {
        Task<QuotationDTO> CreateQuotation(QuotationDTO quotationDTO);
        Task<QuotationDTO> UpdateQuotation(QuotationDTO quotationDTO);
        Task<IEnumerable<QuotationDTO>> GetQuotation();
        Task<QuotationDTO> GetQuotationbyMobileNo(string mobileNo);
        List<ScheduleDTO> GetSchedule();
        ScheduleDTO CreateSchedule(ScheduleDTO scheduleDTO);
        Task<VehicleDetailsDTO> GetVehicleDetails(int VehicleId, ApiContext apiContext);
        decimal GetSIFromMakeModel(decimal VehicleId, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetVehicleMaster(string lMasterlist, ApiContext apiContext);
        ScheduleStatusDTO ScheduleStatus(string VehicleRegstrationNo, string PolicyNo);
        Task<SendOtpResponse> SendOTP(SendOtp sendOtp);
        Task<SendOtpResponse> ResetOTP(SendOtp sendOtp);
        Task<VerifyOTPResponse> VerifyingOTP(VerifyOTP otp);
        Task<IEnumerable<ddDTO>> GetCityMaster(string lMasterlist);
        Task<PremiumReturnDto> CalCulatePremium(PremiumRequestDTO premiumdata);
        Task<Object> HandleAdditionalVehicles(string PolicyNumber, string VehicleRegistrationNo);
        Task<Object> HandleAdditionalDriver(string PolicyNumber, string DriverName);
        Task<PolicyResponse> CreatePolicy(PolicyDTO policyDTO);
        Task<bool> DailyScheduler();
        Task<bool> OldSwitchOnOff(string VehicleRegistrationNo, string PolicyNo, bool SwitchStatus);
        List<CityMasDTO> SmartCityMaster(string searchString);
        List<ddDTO> SmartVehicleMaster(string searchString);
        CityMasDTO GetStateCode(string CityName);

        Task<bool> NightScheduler();
        Task<bool> PremiumBookingScheduler();
        Task<SwitchOnOffResponse> SwitchOnOff(string VehicleRegistrationNo, string PolicyNo, bool SwitchStatus);
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




        public async Task<QuotationDTO> CreateQuotation(QuotationDTO quotationDTO)
        {

            ///Integration Call for Premium Calculation Pending


            var dto = _mapper.Map<TblQuotation>(quotationDTO);
            _context.TblQuotation.Add(dto);
            _context.SaveChanges();
            var acntDTO = _mapper.Map<QuotationDTO>(dto);
            return acntDTO;

        }

        public async Task<QuotationDTO> UpdateQuotation(QuotationDTO quotationDTO)
        {

            var dto = _mapper.Map<TblQuotation>(quotationDTO);
            // var getdata = _context.TblQuotation.SingleOrDefault(x => x.Id == dto.Id);

            _context.TblQuotation.Update(dto);
            _context.SaveChanges();

            var acntDTO = _mapper.Map<QuotationDTO>(dto);
            return acntDTO;

        }
        public async Task<IEnumerable<QuotationDTO>> GetQuotation()
        {

            var dto = _context.TblQuotation.SingleOrDefault();
            var quotedata = _mapper.Map<IEnumerable<QuotationDTO>>(dto);

            return quotedata;
        }
        public async Task<QuotationDTO> GetQuotationbyMobileNo(string mobileNo)
        {

            var dto = _context.TblQuotation.Where(x => x.Mobileno == mobileNo).SingleOrDefault();
            var quotedata = _mapper.Map<QuotationDTO>(dto);

            return quotedata;
        }

        public List<ScheduleDTO> GetSchedule()
        {
            var scheduledata = _context.TblSchedule.Where(x => x.IsActive == true).ToList();

            var response = _mapper.Map<List<ScheduleDTO>>(scheduledata);

            return response;

        }

        public ScheduleDTO CreateSchedule(ScheduleDTO scheduleDTO)
        {

            var mapData = _mapper.Map<TblSchedule>(scheduleDTO);

            var carCheck = _context.TblSchedule.Any(x => x.VehicleRegistrationNo == mapData.VehicleRegistrationNo);

            if (carCheck == false)
            {
                //  TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                //DateTime indianTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);

                DateTime indianTime = System.DateTime.UtcNow.AddMinutes(330);


                mapData.CreatedDate = indianTime;

                _context.TblSchedule.Add(mapData);
            }
            else
            {
                var tblschedule = _context.TblSchedule.SingleOrDefault(x => x.VehicleRegistrationNo == mapData.VehicleRegistrationNo);

                tblschedule.CreatedDate = mapData.CreatedDate;
                tblschedule.Mon = mapData.Mon;
                tblschedule.Tue = mapData.Tue;
                tblschedule.Fri = mapData.Wed;
                tblschedule.Thu = mapData.Thu;
                tblschedule.Fri = mapData.Fri;
                tblschedule.Sat = mapData.Sat;
                tblschedule.Sun = mapData.Sun;
                tblschedule.PolicyNo = mapData.PolicyNo;
                tblschedule.VehicleRegistrationNo = mapData.VehicleRegistrationNo;
                tblschedule.RepeatWeek = mapData.RepeatWeek;
                tblschedule.VehicleMasId = mapData.VehicleMasId;


                tblschedule.ModifyCount += 1;

                DateTime indianTime = System.DateTime.UtcNow.AddMinutes(330);

                tblschedule.ModifiedDate = indianTime;
                _context.TblSchedule.Update(tblschedule);
            }
            _context.SaveChanges();
            return scheduleDTO;

        }


        public ScheduleStatusDTO ScheduleStatus(string VehicleRegstrationNo, string PolicyNo)
        {
            try
            {


                if (VehicleRegstrationNo != null)
                {
                    var scheduleresponse = _context.TblSchedule.SingleOrDefault(x => x.VehicleRegistrationNo == VehicleRegstrationNo);

                    var masterreponse = _context.TblVehicleDetails.SingleOrDefault(x => x.VehicleId == scheduleresponse.VehicleMasId);

                    ScheduleStatusDTO statusDTO = new ScheduleStatusDTO();

                    var mapSchedule = _mapper.Map<ScheduleDTO>(scheduleresponse);


                    // TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                    //DateTime indianTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);

                    DateTime indianTime = System.DateTime.UtcNow.AddMinutes(330);

                    var indianhour = indianTime.Hour;

                    if (indianhour < 9)
                    {
                        statusDTO.SwitchEnabled = true;
                    }
                    else
                    {
                        statusDTO.SwitchEnabled = false;
                    }

                    statusDTO.scheduleDTO = mapSchedule;
                    statusDTO.CarModel = masterreponse.VehicleModel;
                    statusDTO.CarImageBytes = masterreponse.VehicleImage;

                    return statusDTO;

                }

                if (PolicyNo != null)
                {
                    var scheduleresponse = _context.TblSchedule.SingleOrDefault(x => x.PolicyNo == PolicyNo);

                    var masterreponse = _context.TblVehicleDetails.SingleOrDefault(x => x.VehicleId == scheduleresponse.VehicleMasId);

                    ScheduleStatusDTO statusDTO = new ScheduleStatusDTO();

                    var mapSchedule = _mapper.Map<ScheduleDTO>(scheduleresponse);

                    statusDTO.scheduleDTO = mapSchedule;
                    statusDTO.CarModel = masterreponse.VehicleModel;
                    statusDTO.CarImageBytes = masterreponse.VehicleImage;


                    return statusDTO;

                }

                return new ScheduleStatusDTO();
            }
            catch (Exception ex)
            {

                return new ScheduleStatusDTO() { Status = BusinessStatus.Error, ResponseMessage = ex.Message };
            }
        }

        public async Task<VehicleDetailsDTO> GetVehicleDetails(int VehicleId, ApiContext apiContext)
        {
            // _context = (MICAQMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var vehData = _context.TblVehicleDetails.SingleOrDefault(x => x.VehicleId == VehicleId);

                var _vehData = _mapper.Map<VehicleDetailsDTO>(vehData);
                return _vehData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public decimal GetSIFromMakeModel(decimal VehicleId, ApiContext apiContext)
        {
            try
            {
                var SI = Convert.ToDecimal(_context.TblVehicleDetailsData.SingleOrDefault(x => x.VehicleId == VehicleId).SumInsured);
                // var _SI = _mapper.Map<VehicleDetailsDTO>(SI);
                return SI;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ddDTO>> GetVehicleMaster(string lMasterlist, ApiContext apiContext)
        {
            IEnumerable<ddDTO> obj;
            obj = from pr in _context.TblVehicleDetails.OrderByDescending(p => p.CreatedDate)
                  select new ddDTO
                  {
                      mID = pr.VehicleId,
                      mValue = pr.VehicleModel,
                      mType = lMasterlist,

                  };
            return obj;
        }

        public async Task<bool> SendEmailAsync(EmailTest emailTest)
        {
            try
            {
                await _emailService.SendEmail(emailTest.To, emailTest.Subject, emailTest.Message);
            }
            catch (Exception ex)
            {

                throw;
            }
            return true;
        }

        public async Task<SendOtpResponse> SendOTP(SendOtp sendOtp)
        {
            try
            {
                //var Phno = _context.TblQuotation.SingleOrDefault(p => p.Mobileno == sendOtp.ContactNumber);
                //var email=_context.TblQuotation.Where(p=>p.m)
                if (!string.IsNullOrEmpty(sendOtp.Email))
                {
                    EmailTest emailTest = new EmailTest();
                    Random random = new Random();
                    int otp = random.Next(100001, 999999);
                    var chkotp = _context.TblSendOtp.Where(a => a.Email == sendOtp.Email);
                    if (chkotp != null)
                    {
                        foreach (var item in chkotp)
                        {
                            _context.TblSendOtp.Remove(item);
                        }
                    }
                    sendOtp.ContactNumber = "";
                    sendOtp.Email = sendOtp.Email;
                    sendOtp.Otp = otp.ToString();
                    TblSendOtp _otp = _mapper.Map<TblSendOtp>(sendOtp);
                    _context.TblSendOtp.Add(_otp);
                    _context.SaveChanges();
                    emailTest.To = sendOtp.Email;
                    emailTest.Subject = "OTP ";
                    emailTest.Message = "Dear User,\n" + "      " + "\n" + "      Your requested OTP is: " + otp + "      " + "\n" + "\nThanks & Regards:\n" + "      " + "MICA Team";
                    await SendEmailAsync(emailTest);
                    return new SendOtpResponse { Status = BusinessStatus.Ok, sendOtp = sendOtp, ResponseMessage = $"OTP sent successfully!" };
                }
                else if (!string.IsNullOrEmpty(sendOtp.ContactNumber))
                {
                    Random random = new Random();
                    int otp = random.Next(100001, 999999);
                    var chkotp = _context.TblSendOtp.Where(a => a.ContactNumber == sendOtp.ContactNumber);
                    if (chkotp != null)
                    {
                        foreach (var item in chkotp)
                        {
                            _context.TblSendOtp.Remove(item);
                        }
                    }
                    sendOtp.Email = "";
                    sendOtp.ContactNumber = sendOtp.ContactNumber;
                    sendOtp.Otp = otp.ToString();
                    TblSendOtp _otp = _mapper.Map<TblSendOtp>(sendOtp);
                    _context.TblSendOtp.Add(_otp);
                    _context.SaveChanges();
                    SMSRequest SMSDTO = new SMSRequest();

                    SMSDTO.APIKey = "6nnnnyhH4ECKDFC5n59Keg";
                    SMSDTO.SenderId = "SMSTST";
                    SMSDTO.Channel = "2";
                    SMSDTO.RecipientNumber = sendOtp.ContactNumber;
                    SMSDTO.SMSMessage = "Dear User,\n" + "      " + "\n" + "Your requested OTP is: " + otp + "      " + "\n" + "\nThanks & Regards:\n" + "      " + "MICA Team";

                    //SMS API
                    var SMSAPI = "https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=6nnnnyhH4ECKDFC5n59Keg&senderid=SMSTST&channel=2&DCS=0&flashsms=0&number=91" + SMSDTO.RecipientNumber + "&text=" + SMSDTO.SMSMessage;

                    var client = new WebClient();
                    var content = client.DownloadString(SMSAPI);
                    return new SendOtpResponse { Status = BusinessStatus.Ok, sendOtp = sendOtp, ResponseMessage = $"OTP sent successfully!" };
                }
                return new SendOtpResponse { Status = BusinessStatus.Error, sendOtp = sendOtp, ResponseMessage = $"Please enter registered Number" };
            }
            catch (Exception ex)
            {
                return new SendOtpResponse() { ResponseMessage = ex.Message, Status = BusinessStatus.Error };
            }
        }

        public async Task<VerifyOTPResponse> VerifyingOTP(VerifyOTP onetp)
        {
            try
            {
                if (!string.IsNullOrEmpty(onetp.Email))
                {
                    var otp = _context.TblSendOtp.SingleOrDefault(x => x.Email == onetp.Email);
                    if (otp != null)
                    {
                        if (otp.Otp == onetp.Otp)
                        {
                            _context.TblSendOtp.Remove(otp);
                            _context.SaveChanges();
                            return new VerifyOTPResponse { Status = BusinessStatus.Ok, ResponseMessage = $"OTP verified successfully!" }; ;
                        }
                    }
                    else
                    {
                        return new VerifyOTPResponse { Status = BusinessStatus.Error, ResponseMessage = $"Please enter your registered E-Mail ID" }; ;
                    }
                }
                else if (!string.IsNullOrEmpty(onetp.ContactNumber))
                {
                    var otp = _context.TblSendOtp.SingleOrDefault(x => x.ContactNumber == onetp.ContactNumber);
                    if (otp != null)
                    {
                        if (otp.Otp == onetp.Otp)
                        {
                            _context.TblSendOtp.Remove(otp);
                            _context.SaveChanges();
                            return new VerifyOTPResponse { Status = BusinessStatus.Ok, ResponseMessage = $"OTP verified successfully!" }; ;
                        }
                    }
                    else
                    {
                        return new VerifyOTPResponse { Status = BusinessStatus.Error, ResponseMessage = $"Please enter your registered Contact Number" }; ;
                    }
                }
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                return new VerifyOTPResponse { Status = BusinessStatus.Error, ResponseMessage = $"error" }; ;
            }
            return new VerifyOTPResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"Please enter valid OTP" }; ;
        }

        public async Task<SendOtpResponse> ResetOTP(SendOtp sendOtp)
        {
            try
            {
                //var Phno = _context.TblQuotation.SingleOrDefault(p => p.Mobileno == sendOtp.ContactNumber);
                if (!string.IsNullOrEmpty(sendOtp.Email))
                {
                    EmailTest emailTest = new EmailTest();
                    Random random = new Random();
                    int otp = random.Next(100001, 999999);
                    var chkotp = _context.TblSendOtp.Where(a => a.Email == sendOtp.Email);
                    if (chkotp != null)
                    {
                        foreach (var item in chkotp)
                        {
                            _context.TblSendOtp.Remove(item);
                        }
                    }
                    sendOtp.ContactNumber = "";
                    sendOtp.Email = sendOtp.Email;
                    sendOtp.Otp = otp.ToString();
                    TblSendOtp _otp = _mapper.Map<TblSendOtp>(sendOtp);
                    _context.TblSendOtp.Add(_otp);
                    _context.SaveChanges();
                    emailTest.To = sendOtp.Email;
                    emailTest.Subject = "OTP ";
                    emailTest.Message = "Dear User,\n" + "      " + "\n" + "      Your requested OTP is: " + otp + "      " + "\n" + "\nThanks & Regards:\n" + "      " + "MICA Team";
                    await SendEmailAsync(emailTest);
                    return new SendOtpResponse { Status = BusinessStatus.Ok, sendOtp = sendOtp, ResponseMessage = $"OTP sent successfully!" };
                }
                else if (!string.IsNullOrEmpty(sendOtp.ContactNumber))
                {
                    Random random = new Random();
                    int otp = random.Next(100001, 999999);
                    var chkotp = _context.TblSendOtp.Where(a => a.Email == sendOtp.Email);
                    if (chkotp != null)
                    {
                        foreach (var item in chkotp)
                        {
                            _context.TblSendOtp.Remove(item);
                        }
                    }
                    sendOtp.Email = "";
                    sendOtp.ContactNumber = sendOtp.ContactNumber;
                    sendOtp.Otp = otp.ToString();
                    TblSendOtp _otp = _mapper.Map<TblSendOtp>(sendOtp);
                    _context.TblSendOtp.Add(_otp);
                    _context.SaveChanges();
                    SMSRequest SMSDTO = new SMSRequest();

                    SMSDTO.APIKey = "6nnnnyhH4ECKDFC5n59Keg";
                    SMSDTO.SenderId = "SMSTST";
                    SMSDTO.Channel = "2";
                    SMSDTO.RecipientNumber = sendOtp.ContactNumber;
                    SMSDTO.SMSMessage = "Dear User,\n" + "      " + "\n" + "Your requested OTP is: " + otp + "      " + "\n" + "\nThanks & Regards:\n" + "      " + "MICA Team";

                    //SMS API
                    var SMSAPI = "https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=6nnnnyhH4ECKDFC5n59Keg&senderid=SMSTST&channel=2&DCS=0&flashsms=0&number=91" + SMSDTO.RecipientNumber + "&text=" + SMSDTO.SMSMessage;

                    var client = new WebClient();
                    var content = client.DownloadString(SMSAPI);
                    return new SendOtpResponse { Status = BusinessStatus.Ok, sendOtp = sendOtp, ResponseMessage = $"OTP sent successfully!" };
                }
                return new SendOtpResponse { Status = BusinessStatus.Error, sendOtp = sendOtp, ResponseMessage = $"Please enter your registered Contact Number" };
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<IEnumerable<ddDTO>> GetCityMaster(string lMasterlist)
        {
            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblMasCity
                        .Select(c => new ddDTO
                        {
                            mID = c.CityId,
                            mValue = c.CityName,
                            mType = lMasterlist
                        });
            return ddDTOs;
        }

        //public async Task<PremiumReturn> CalCulatePremium(PremiumDTO premiumdata)
        //{
        //    // _context = (MICAQMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

        //    TaxTypeDTO taxType = new TaxTypeDTO();
        //    taxType = TaxType(premiumdata.CityId);

        //    premiumdata.premiumObj.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
        //    premiumdata.premiumObj.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

        //    var Data = await _integrationService.CalCulateRatingPremium(premiumdata.premiumObj);

        //    List<CalculationResult> val = JsonConvert.DeserializeObject<List<CalculationResult>>(Data.ToString());

        //    //var part1TotalAmount = 0.00;
        //    var Ftperday = 0.00;
        //    decimal TotalAmount = 0;
        //    var fire = val.FirstOrDefault(x => x.Entity == "FTPM").EValue;
        //    var theft = val.FirstOrDefault(x => x.Entity == "ADPMPD").EValue;
        //    Ftperday = Ftperday + Convert.ToDouble(fire) + Convert.ToDouble(theft);

        //    var Ft30days = Ftperday * 30;
        //    var Ft60days = Ftperday * 60;


        //    var Ft365days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FT365").EValue);
        //    var Ad60days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60DAYS").EValue);
        //    var Ad365days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365DAYS").EValue);
        //    var ad60fttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60FTAXAMT").EValue);
        //    var ad60ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60TTAXAMT").EValue);
        //    var ftfttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTFTAXAMT").EValue);
        //    var ftttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTTTAXAMT").EValue);

        //    var GST = ad60fttax + ad60ttax + ftfttax + ftfttax;

        //    TotalAmount = Ft365days + Ad60days + GST;


        //    //taxDto tax = new taxDto();
        //    //  tax = TaxCalculation(premiumdata.CityId);

        //    PremiumReturn returnobj = new PremiumReturn();
        //    returnobj.FTPerDay = Math.Round(Convert.ToDecimal(Ftperday));
        //    returnobj.FT30Day = Math.Round(Convert.ToDecimal(Ft30days));
        //    returnobj.FT60Day = Math.Round(Convert.ToDecimal(Ft60days));
        //    returnobj.AD60Days = Math.Round(Convert.ToDecimal(Ad60days));
        //    returnobj.AD365Days = Math.Round(Convert.ToDecimal(Ad365days));
        //    returnobj.FState = taxType.FSTTAX_TAXTYPE;
        //    returnobj.TState = taxType.TSTTAX_TAXTYPE;
        //    returnobj.FStateValue = Math.Round(Convert.ToDecimal(ad60fttax));
        //    returnobj.TStateValue = Math.Round(Convert.ToDecimal(ad60ttax));
        //    returnobj.TotalPremium = Math.Round(Convert.ToDecimal(TotalAmount));

        //    //  part1TotalAmount = part1TotalAmount + Convert.ToDouble(tax.CGST)+ Convert.ToDouble(tax.SGST)+ Convert.ToDouble(tax.IGST) + Convert.ToDouble(tax.UGST);
        //    //  int val = Math.Round(part1TotalAmount);
        //    return returnobj;
        //}

        public async Task<PremiumReturnDto> CalCulatePremium(PremiumRequestDTO premiumdata)
        {
            // _context = (MICAQMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            SchedulerPremiumDTO prem = new SchedulerPremiumDTO();
            prem.dictionary_rule.SI = premiumdata.SI;
            prem.dictionary_rule.NOOFPC = premiumdata.NoOfPC;
            prem.dictionary_rule.NOOFTW = premiumdata.NoOfTW;


            prem.dictionary_rate.AVFACTORPC_PC_NOOFPC = premiumdata.NoOfPC;
            prem.dictionary_rate.AVFACTORTW_TW_NOOFPC = premiumdata.NoOfPC; ;
            prem.dictionary_rate.AVFACTORTW_TW_NOOFTW = premiumdata.NoOfTW;
            prem.dictionary_rate.PDAGERT_PAge = premiumdata.DriverAge;
            prem.dictionary_rate.DEXPRT_Exp = premiumdata.DriverExp;
            prem.dictionary_rate.ADDRVRT_DRV = premiumdata.AdditionalDriver;


            //DynamicData dy = new DynamicData();
            //dy.dictionary_rule.SI = premiumdata.SI;
            //dy.dictionary_rule.NOOFPC = premiumdata.NoOfPC;
            //dy.dictionary_rule.NOOFTW = premiumdata.NoOfTW;
            //dy.dictionary_rate.PDAGERT_PAge = premiumdata.DriverAge;
            //dy.dictionary_rate.DEXPRT_Exp = premiumdata.DriverExp;
            //dy.dictionary_rate.ADDRVRT_DRV = premiumdata.AdditionalDriver;

            TaxTypeDTO taxType = new TaxTypeDTO();
            taxType = TaxTypeForStateCode(premiumdata.StateCode);

            prem.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
            prem.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

            var Data = await _integrationService.CalCulateRatingPremium(prem);

            List<CalculationResult> val = JsonConvert.DeserializeObject<List<CalculationResult>>(Data.ToString());

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
            returnobj.FireTheft365 = Math.Round(Convert.ToDecimal(Ft365days));
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
            returnobj.Total = Math.Round(returnobj.FireTheft365 + returnobj.ADPremium + returnobj.GST);

            return returnobj;
        }

        private TaxTypeDTO TaxTypeForStateCode(String stateabbreviation)
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

        public async Task<Object> HandleAdditionalVehicles(string PolicyNumber, string VehicleRegistrationNo)
        {

            MasterPolicyDTO masterPolicyDTO = new MasterPolicyDTO();

            MasterInsurableDTO masterInsurable = new MasterInsurableDTO();

            InsurableFieldsDTO fieldsDTO = new InsurableFieldsDTO();

            fieldsDTO.IdentificationNumber = VehicleRegistrationNo;
            fieldsDTO.Name = "";

            masterInsurable.InsurableFields.Add(fieldsDTO);
            masterInsurable.InsurableName = "Vehicle";


            masterPolicyDTO.PolicyNumber = PolicyNumber;
            masterPolicyDTO.InsurableItem.Add(masterInsurable);


            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = 277;
            apiContext.UserId = "a95d03cd-df18-4756-a577-3412b6817dd0";
            apiContext.Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg";
            apiContext.ServerType = "1";
            apiContext.IsAuthenticated = true;


            var MasterPolicyAdd = await _integrationService.AddInsurableItem(masterPolicyDTO, apiContext);

            return MasterPolicyAdd;
        }

        public async Task<Object> HandleAdditionalDriver(string PolicyNumber, string DriverName)
        {

            MasterPolicyDTO masterPolicyDTO = new MasterPolicyDTO();

            MasterInsurableDTO masterInsurable = new MasterInsurableDTO();

            InsurableFieldsDTO fieldsDTO = new InsurableFieldsDTO();

            fieldsDTO.IdentificationNumber = "";
            fieldsDTO.Name = DriverName;

            masterInsurable.InsurableFields.Add(fieldsDTO);
            masterInsurable.InsurableName = "Driver";


            masterPolicyDTO.PolicyNumber = PolicyNumber;
            masterPolicyDTO.InsurableItem.Add(masterInsurable);


            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = 277;
            apiContext.UserId = "a95d03cd-df18-4756-a577-3412b6817dd0";
            apiContext.Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg";
            apiContext.ServerType = "1";
            apiContext.IsAuthenticated = true;


            var MasterPolicyAdd = await _integrationService.AddInsurableItem(masterPolicyDTO, apiContext);

            return MasterPolicyAdd;


        }

        public async Task<PolicyResponse> CreatePolicy(PolicyDTO policyDTO)
        {
            var quotemobileno = _context.TblQuotation.Any(x => x.Mobileno == policyDTO.QuotationDTO.Mobileno);
            QuotationDTO quote = new QuotationDTO();
            if (quotemobileno == false)
            {
                quote = await CreateQuotation(policyDTO.QuotationDTO);

            }


            //QuotationDTO quotationDTO = new QuotationDTO();
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = 277;
            apiContext.UserId = "a95d03cd-df18-4756-a577-3412b6817dd0";
            apiContext.Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg";
            apiContext.ServerType = "1";
            apiContext.IsAuthenticated = true;

            PolicyResponse MicaPolicy = await _integrationService.CreateMultiCoverPolicy(policyDTO.PolicyObj, apiContext);

            if (MicaPolicy.Status == BusinessStatus.Created)
            {

                quote.PolicyNumber = MicaPolicy.Id;
                var updatequote = await UpdateQuotation(quote);

                return new PolicyResponse { Status = BusinessStatus.Created, ResponseMessage = "Policy Created Successfully! /n" };
            }

            else
            {
                return new PolicyResponse { Status = BusinessStatus.Error };
            }

        }


        public async Task<bool> DailyScheduler()
        {
            //Fetch List of Active PolicyNumbers from MICA POLICY Service
            List<String> ListofPolicyNumbers = new List<string>();

            string ProductCode = "6271";
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = 277;
            apiContext.UserId = "a95d03cd-df18-4756-a577-3412b6817dd0";
            apiContext.Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg";
            apiContext.ServerType = "1";
            apiContext.IsAuthenticated = true;

            var PolicyDetails = await _integrationService.GetPolicyList(ProductCode, apiContext);

            var PolicyNumberList = PolicyDetails.Select(x => x.PolicyNumber).ToList();

            PolicyNumberList.Add("9783/1234/0001");

            DateTime CurrentDate = System.DateTime.UtcNow.AddMinutes(330);

            //var CurrentDayName = CurrentDate.DayOfWeek.ToString();

            var CurrentDay = CurrentDate.DayOfWeek.ToString();

            int ActivePCCount = 0;
            int ActiveTWCount = 0;


            decimal ScheduleId = 0;

            TblQuotation QuotationData = new TblQuotation();



            foreach (var policy in PolicyNumberList)
            {
                var ScheduleData = _context.TblSchedule.Where(x => x.PolicyNo == policy);
                QuotationData = _context.TblQuotation.FirstOrDefault(x => x.PolicyNumber == policy);

                switch (CurrentDay)
                {
                    case "Monday":
                        var MondayScheduleData = ScheduleData.Where(x => x.Mon == true);
                        ActivePCCount = MondayScheduleData.Count(x => x.VehicleType == "PC");
                        ActiveTWCount = MondayScheduleData.Count(x => x.VehicleType == "TW");
                        ScheduleId = MondayScheduleData.FirstOrDefault().ScheduleId;
                        break;

                    case "Tuesday":
                        var TuesdayScheduleData = ScheduleData.Where(x => x.Tue == true);
                        ActivePCCount = TuesdayScheduleData.Count(x => x.VehicleType == "PC");
                        ActiveTWCount = TuesdayScheduleData.Count(x => x.VehicleType == "TW");
                        ScheduleId = TuesdayScheduleData.FirstOrDefault().ScheduleId;
                        break;

                    case "Wednesday":
                        var WednesdayScheduleData = ScheduleData.Where(x => x.Wed == true);
                        ActivePCCount = WednesdayScheduleData.Count(x => x.VehicleType == "PC");
                        ActiveTWCount = WednesdayScheduleData.Count(x => x.VehicleType == "TW");
                        ScheduleId = WednesdayScheduleData.FirstOrDefault().ScheduleId;
                        break;

                    case "Thursday":
                        var ThursdayScheduleData = ScheduleData.Where(x => x.Thu == true);
                        ActivePCCount = ThursdayScheduleData.Count(x => x.VehicleType == "PC");
                        ActiveTWCount = ThursdayScheduleData.Count(x => x.VehicleType == "TW");
                        ScheduleId = ThursdayScheduleData.FirstOrDefault().ScheduleId;
                        break;

                    case "Friday":
                        var FridayScheduleData = ScheduleData.Where(x => x.Fri == true);
                        ActivePCCount = FridayScheduleData.Count(x => x.VehicleType == "PC");
                        ActiveTWCount = FridayScheduleData.Count(x => x.VehicleType == "TW");
                        ScheduleId = FridayScheduleData.FirstOrDefault().ScheduleId;
                        break;


                    case "Saturday":
                        var SaturdayScheduleData = ScheduleData.Where(x => x.Sat == true);
                        ActivePCCount = SaturdayScheduleData.Count(x => x.VehicleType == "PC");
                        ActiveTWCount = SaturdayScheduleData.Count(x => x.VehicleType == "TW");
                        ScheduleId = SaturdayScheduleData.FirstOrDefault().ScheduleId;
                        break;


                    case "Sunday":
                        var SundayScheduleData = ScheduleData.Where(x => x.Sun == true);
                        ActivePCCount = SundayScheduleData.Count(x => x.VehicleType == "PC");
                        ActiveTWCount = SundayScheduleData.Count(x => x.VehicleType == "TW");
                        ScheduleId = SundayScheduleData.FirstOrDefault().ScheduleId;
                        break;

                    default: break;
                }


                //CalculatePremiumObject
                SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

                //RuleObject
                premiumDTO.dictionary_rule.SI = QuotationData.SumInsured; //Verify
                premiumDTO.dictionary_rule.NOOFPC = ScheduleData.Count(x => x.VehicleType == "PC").ToString();
                premiumDTO.dictionary_rule.NOOFTW = ScheduleData.Count(y => y.VehicleType == "TW").ToString();


                //RateObject

                premiumDTO.dictionary_rate.DEXPRT_Exp = QuotationData.Experience.ToString();
                premiumDTO.dictionary_rate.PDAGERT_PAge = QuotationData.Age.ToString();
                premiumDTO.dictionary_rate.ADDRVRT_DRV = QuotationData.NumberOfDrivers.ToString(); //Verify
                premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = ActivePCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = ActivePCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = ActiveTWCount.ToString();

                //Call TaxType Private Method then Update the Taxtype

                var reponseTaxType = TaxType(Convert.ToInt32(QuotationData.City));

                premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = reponseTaxType.FSTTAX_TAXTYPE; //Call TaxType //Verify
                premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = reponseTaxType.TSTTAX_TAXTYPE; //Call TaxType //Verify




                ///ScheduleLog Entries as per ScheduleID
                TblSchedulerLog schedulerLog = new TblSchedulerLog();

                schedulerLog.ScheduleId = ScheduleId;
                schedulerLog.SchedulerDateTime = DateTime.Now;
                schedulerLog.SchedulerStatus = "Running";

                _context.TblSchedulerLog.Add(schedulerLog);
                _context.SaveChanges();

                //Call CalculatePremium Policy Module MICA
                var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, apiContext);

                List<CalculationResult> DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());

                CDDTO CdModel = new CDDTO();

                if (DeserilizedPremiumData.Count() > 0)
                {

                    var TOTALPMPD = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPD").EValue);

                    var TOTALPMPDFTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDFTTAX").EValue);

                    var TOTALPMPDTTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDTTTAX").EValue);



                    CdModel.AccountNo = policy;
                    CdModel.TxnAmount = Math.Round(TOTALPMPD + TOTALPMPDFTTAX + TOTALPMPDTTTAX);
                    CdModel.TxnType = "Debit";//HarCoded
                    CdModel.PaymentId = 19; //HarCoded as Per Ashish Sir
                    CdModel.Description = "Auto Schedule Premium";

                    TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                    bookingLog.PolicyNo = policy;
                    bookingLog.TxnAmount = CdModel.TxnAmount;
                    bookingLog.TxnDateTime = CurrentDate;
                    bookingLog.TxnDetails = CdModel.Description;

                    _context.TblPremiumBookingLog.Add(bookingLog);
                    _context.SaveChanges();
                }
                else
                {

                    var UpdateSchedule = _context.TblSchedulerLog.FirstOrDefault(x => x.ScheduleId == schedulerLog.ScheduleId);

                    UpdateSchedule.SchedulerStatus = "Rating Failed";
                    UpdateSchedule.SucessStat = false;

                    _context.TblSchedulerLog.Update(UpdateSchedule);
                    _context.SaveChanges();

                }


                var CallMicaCd = await _integrationService.GenerateCDTransaction(CdModel, apiContext);

                if (CallMicaCd != null)
                {
                    return true;
                }
                else
                {
                    var UpdateSchedule = _context.TblSchedulerLog.FirstOrDefault(x => x.ScheduleId == schedulerLog.ScheduleId);

                    UpdateSchedule.SchedulerStatus = "CD Transaction Failed";
                    UpdateSchedule.SucessStat = false;

                    _context.TblSchedulerLog.Update(UpdateSchedule);
                    _context.SaveChanges();
                }




            }


            return false;

        }

        //All Fields are Mandatory
        public async Task<bool> OldSwitchOnOff(string VehicleRegistrationNo, string PolicyNo, bool SwitchStatus)
        {

            List<TblSchedule> ScheduleData = new List<TblSchedule>();

            TblQuotation QuotationData = new TblQuotation();

            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);
            var CurrentDay = IndianTime.DayOfWeek.ToString();
            var CurrentTimeHour = IndianTime.Hour;

            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = 277;
            apiContext.UserId = "a95d03cd-df18-4756-a577-3412b6817dd0";
            apiContext.Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg";
            apiContext.ServerType = "1";
            apiContext.IsAuthenticated = true;

            if (!String.IsNullOrEmpty(VehicleRegistrationNo) && !String.IsNullOrEmpty(PolicyNo) && SwitchStatus != false)
            {

                var scheduleDTO = _context.TblSchedule.FirstOrDefault(s => s.VehicleRegistrationNo == VehicleRegistrationNo);


                switch (CurrentDay)
                {
                    case "Monday":
                        scheduleDTO.Mon = true;
                        break;
                    case "Tuesday":
                        scheduleDTO.Tue = true;
                        break;

                    case "Wednesday":
                        scheduleDTO.Wed = true;
                        break;

                    case "Thursday":
                        scheduleDTO.Thu = true;
                        break;

                    case "Friday":
                        scheduleDTO.Fri = true;
                        break;

                    case "Saturday":
                        scheduleDTO.Sat = true;
                        break;

                    case "Sunday":
                        scheduleDTO.Sun = true;
                        break;

                }

                var MapData = _mapper.Map<ScheduleDTO>(scheduleDTO);

                //UPDATE THE CAR STATUS AS ACTIVE
                var callCreateSchdule = CreateSchedule(MapData);


                ScheduleData = _context.TblSchedule.Where(x => x.PolicyNo == PolicyNo).ToList();
                QuotationData = _context.TblQuotation.FirstOrDefault(x => x.PolicyNumber == PolicyNo);

            }
            else if (!String.IsNullOrEmpty(VehicleRegistrationNo) && !String.IsNullOrEmpty(PolicyNo) && SwitchStatus == false)
            {

                if (CurrentTimeHour < 9)
                {
                    var scheduleDTO = _context.TblSchedule.FirstOrDefault(s => s.VehicleRegistrationNo == VehicleRegistrationNo);


                    switch (CurrentDay)
                    {
                        case "Monday":
                            scheduleDTO.Mon = false;
                            break;
                        case "Tuesday":
                            scheduleDTO.Tue = false;
                            break;

                        case "Wednesday":
                            scheduleDTO.Wed = false;
                            break;

                        case "Thursday":
                            scheduleDTO.Thu = false;
                            break;

                        case "Friday":
                            scheduleDTO.Fri = false;
                            break;

                        case "Saturday":
                            scheduleDTO.Sat = false;
                            break;

                        case "Sunday":
                            scheduleDTO.Sun = false;
                            break;

                    }

                    var MapData = _mapper.Map<ScheduleDTO>(scheduleDTO);

                    //UPDATE THE CAR STATUS AS NOTACTIVE
                    var callCreateSchdule = CreateSchedule(MapData);


                    ScheduleData = _context.TblSchedule.Where(x => x.PolicyNo == PolicyNo).ToList();
                    QuotationData = _context.TblQuotation.FirstOrDefault(x => x.PolicyNumber == PolicyNo);


                }
                else
                {
                    //return Switch OFF Not Possible
                }


            }

            int ActivePCCount = 0;
            int ActiveTWCount = 0;


            decimal ScheduleId = 0;

            switch (CurrentDay)
            {
                case "Monday":
                    var MondayScheduleData = ScheduleData.Where(x => x.Mon == true);
                    ActivePCCount = MondayScheduleData.Count(x => x.VehicleType == "PC");
                    ActiveTWCount = MondayScheduleData.Count(x => x.VehicleType == "TW");
                    ScheduleId = MondayScheduleData.FirstOrDefault().ScheduleId;
                    break;

                case "Tuesday":
                    var TuesdayScheduleData = ScheduleData.Where(x => x.Tue == true);
                    ActivePCCount = TuesdayScheduleData.Count(x => x.VehicleType == "PC");
                    ActiveTWCount = TuesdayScheduleData.Count(x => x.VehicleType == "TW");
                    ScheduleId = TuesdayScheduleData.FirstOrDefault().ScheduleId;
                    break;

                case "Wednesday":
                    var WednesdayScheduleData = ScheduleData.Where(x => x.Wed == true);
                    ActivePCCount = WednesdayScheduleData.Count(x => x.VehicleType == "PC");
                    ActiveTWCount = WednesdayScheduleData.Count(x => x.VehicleType == "TW");
                    ScheduleId = WednesdayScheduleData.FirstOrDefault().ScheduleId;
                    break;

                case "Thursday":
                    var ThursdayScheduleData = ScheduleData.Where(x => x.Thu == true);
                    ActivePCCount = ThursdayScheduleData.Count(x => x.VehicleType == "PC");
                    ActiveTWCount = ThursdayScheduleData.Count(x => x.VehicleType == "TW");
                    ScheduleId = ThursdayScheduleData.FirstOrDefault().ScheduleId;
                    break;

                case "Friday":
                    var FridayScheduleData = ScheduleData.Where(x => x.Fri == true);
                    ActivePCCount = FridayScheduleData.Count(x => x.VehicleType == "PC");
                    ActiveTWCount = FridayScheduleData.Count(x => x.VehicleType == "TW");
                    ScheduleId = FridayScheduleData.FirstOrDefault().ScheduleId;
                    break;


                case "Saturday":
                    var SaturdayScheduleData = ScheduleData.Where(x => x.Sat == true);
                    ActivePCCount = SaturdayScheduleData.Count(x => x.VehicleType == "PC");
                    ActiveTWCount = SaturdayScheduleData.Count(x => x.VehicleType == "TW");
                    ScheduleId = SaturdayScheduleData.FirstOrDefault().ScheduleId;
                    break;


                case "Sunday":
                    var SundayScheduleData = ScheduleData.Where(x => x.Sun == true);
                    ActivePCCount = SundayScheduleData.Count(x => x.VehicleType == "PC");
                    ActiveTWCount = SundayScheduleData.Count(x => x.VehicleType == "TW");
                    ScheduleId = SundayScheduleData.FirstOrDefault().ScheduleId;
                    break;

                default: break;
            }


            //CalculatePremiumObject
            SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

            //RuleObject
            premiumDTO.dictionary_rule.SI = QuotationData.SumInsured; //Verify
            premiumDTO.dictionary_rule.NOOFPC = ScheduleData.Count(x => x.VehicleType == "PC").ToString();
            premiumDTO.dictionary_rule.NOOFTW = ScheduleData.Count(y => y.VehicleType == "TW").ToString();


            //RateObject

            premiumDTO.dictionary_rate.DEXPRT_Exp = QuotationData.Experience.ToString();
            premiumDTO.dictionary_rate.PDAGERT_PAge = QuotationData.Age.ToString();
            premiumDTO.dictionary_rate.ADDRVRT_DRV = QuotationData.NumberOfDrivers.ToString(); //Verify
            premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = ActivePCCount.ToString();
            premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = ActivePCCount.ToString();
            premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = ActiveTWCount.ToString();

            //Call TaxType Private Method then Update the Taxtype

            var reponseTaxType = TaxType(Convert.ToInt32(QuotationData.City));

            premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = reponseTaxType.FSTTAX_TAXTYPE; //Call TaxType //Verify
            premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = reponseTaxType.TSTTAX_TAXTYPE; //Call TaxType //Verify


            //Call CalculatePremium Policy Module MICA
            var CalPremiumResponse = await _integrationService.CalculatePremium(premiumDTO, apiContext);

            List<CalculationResult> DeserilizedPremiumData = JsonConvert.DeserializeObject<List<CalculationResult>>(CalPremiumResponse.ToString());

            CDDTO CdModel = new CDDTO();

            if (DeserilizedPremiumData.Count() > 0)
            {

                var TOTALPMPD = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPD").EValue);

                var TOTALPMPDFTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDFTTAX").EValue);

                var TOTALPMPDTTTAX = Convert.ToDecimal(DeserilizedPremiumData.FirstOrDefault(x => x.Entity == "TOTALPMPDTTTAX").EValue);



                CdModel.AccountNo = PolicyNo;
                CdModel.TxnAmount = Math.Round(TOTALPMPD + TOTALPMPDFTTAX + TOTALPMPDTTTAX);
                CdModel.TxnType = "Debit";//HarCoded
                CdModel.PaymentId = 19; //HarCoded as Per Ashish Sir
                CdModel.Description = "Auto Schedule Premium";

                TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                bookingLog.PolicyNo = PolicyNo;
                bookingLog.TxnAmount = CdModel.TxnAmount;
                bookingLog.TxnDateTime = IndianTime;
                bookingLog.TxnDetails = "Calculate Premium Success";

                _context.TblPremiumBookingLog.Add(bookingLog);
                _context.SaveChanges();
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

            }


            var CallMicaCd = await _integrationService.GenerateCDTransaction(CdModel, apiContext);

            if (CallMicaCd != null)
            {
                TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                bookingLog.PolicyNo = PolicyNo;
                bookingLog.TxnAmount = CdModel.TxnAmount;
                bookingLog.TxnDateTime = IndianTime;
                bookingLog.TxnDetails = "CD Transaction Successfully Updated in MICA";

                _context.TblPremiumBookingLog.Add(bookingLog);
                _context.SaveChanges();
                return true;
            }
            else
            {
                TblPremiumBookingLog bookingLog = new TblPremiumBookingLog();

                bookingLog.PolicyNo = PolicyNo;
                bookingLog.TxnAmount = CdModel.TxnAmount;
                bookingLog.TxnDateTime = IndianTime;
                bookingLog.TxnDetails = "Transaction Failed while Updating CD Balance MICA";

                _context.TblPremiumBookingLog.Add(bookingLog);
                _context.SaveChanges();
            }

            return true;

        }

        public List<CityMasDTO> SmartCityMaster(string searchString)
        {
            var CityData = _context.TblMasCity.Where(x => x.CityName.StartsWith(searchString))
                                                  .Select(x => new CityMasDTO
                                                  {
                                                      StateCode = "",
                                                      CityName = x.CityName,
                                                      CityId = x.CityId

                                                  }).ToList();
            return CityData;

        }

        public List<ddDTO> SmartVehicleMaster(string searchString)
        {
            var VehicleData = _context.TblVehicleDetails.Where(x => x.VehicleModel.StartsWith(searchString))
                                                        .Select(x => new ddDTO { mID = x.VehicleId, mValue = x.VehicleModel }).ToList();

            return VehicleData;

        }

        public CityMasDTO GetStateCode(string CityName)
        {
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
                        errorInfo.ErrorCode = "Ext002";
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
                    errorInfo.ErrorCode = "Ext001";
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
                    errorInfo.ErrorCode = "Ext003";
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
                            errorInfo.ErrorCode = "Ext004";
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
                            errorInfo.ErrorCode = "Ext011";
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
                            errorInfo.ErrorCode = "Ext004";
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
                    PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();



                    //CalculatePremiumObject
                    SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

                    //RuleObject
                    premiumDTO.dictionary_rule.SI = detailsDTO.SumInsured; //Verify
                    premiumDTO.dictionary_rule.NOOFPC = detailsDTO.NoOfPC;
                    premiumDTO.dictionary_rule.NOOFTW = detailsDTO.NoOfTW;


                    //RateObject

                    premiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince;
                    premiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age;
                    premiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver; //Verify
                    premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = ActivePCCount.ToString();
                    premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = ActivePCCount.ToString();
                    premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = ActiveTWCount.ToString();


                    premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = detailsDTO.FromStateTax; //Call TaxType //Verify
                    premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = detailsDTO.ToStateTax; //Call TaxType //Verify


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
                            errorInfo.ErrorCode = "Ext011";
                            errorInfo.PropertyName = "PremiumFail";
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
                        errorInfo.ErrorCode = "Ext010";
                        errorInfo.PropertyName = "PremiumFail";
                        response.Errors.Add(errorInfo);

                        return response;

                    }

                }


                SuccessResponse.ResponseMessage = "Successfully Switch OFF";
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
                        errorInfo.ErrorCode = "Ext002";
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
                    errorInfo.ErrorCode = "Ext001";
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
                    errorInfo.ErrorCode = "Ext003";
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
                            errorInfo.ErrorCode = "Ext005";
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
                            errorInfo.ErrorCode = "Ext006";
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
                    errorInfo.ErrorCode = "Ext007";
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

            PolicyNumberList.Add("9783/1234/0001");

            foreach (var policy in PolicyNumberList)
            {
                var ScheduleData = _context.TblSchedule.Where(x=>x.PolicyNo == policy).ToList();
                                
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
                    }

                    if(schedule.VehicleType == "PC")
                    {
                        ActivePC += 1;
                    }
                    else if(schedule.VehicleType == "TW")
                    {
                        ActiveTW += 1;
                    }
                 
                }


                dailyActiveVehicles = new TblDailyActiveVehicles();

                dailyActiveVehicles.PolicyNumber = policy;
                dailyActiveVehicles.ActivePc = ActivePC;
                dailyActiveVehicles.ActiveTw = ActiveTW;
                dailyActiveVehicles.TxnDate = IndianTime;
                dailyActiveVehicles.Premium = 0;

                _context.TblDailyActiveVehicles.Add(dailyActiveVehicles);
                _context.SaveChanges();
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

                var getDailyStat = _context.TblDailyActiveVehicles.FirstOrDefault(x=>x.TxnDate.Value.Date == CurrentDate && x.PolicyNumber == policy);

                var ActivePCCount = getDailyStat.ActivePc;
                var ActiveTWCount = getDailyStat.ActiveTw;

                schedulerLog.SchedulerDateTime = IndianTime;
                schedulerLog.SchedulerStatus = "Running";
               
                _context.TblSchedulerLog.Add(schedulerLog);
                _context.SaveChanges();

                

                //Call the Policy Service to Get Policy Details.
                //An Integration Call to  be Made and Recive the Data as this Model PolicyPremiumDetailsDTO
                PolicyPremiumDetailsDTO detailsDTO = new PolicyPremiumDetailsDTO();



                //CalculatePremiumObject
                SchedulerPremiumDTO premiumDTO = new SchedulerPremiumDTO();

                //RuleObject
                premiumDTO.dictionary_rule.SI = detailsDTO.SumInsured; //Verify
                premiumDTO.dictionary_rule.NOOFPC = detailsDTO.NoOfPC;
                premiumDTO.dictionary_rule.NOOFTW = detailsDTO.NoOfTW;


                //RateObject

                premiumDTO.dictionary_rate.DEXPRT_Exp = detailsDTO.PD_DriveExperince;
                premiumDTO.dictionary_rate.PDAGERT_PAge = detailsDTO.PD_Age;
                premiumDTO.dictionary_rate.ADDRVRT_DRV = detailsDTO.AdditionalDriver; //Verify
                premiumDTO.dictionary_rate.AVFACTORPC_PC_NOOFPC = ActivePCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFPC = ActivePCCount.ToString();
                premiumDTO.dictionary_rate.AVFACTORTW_TW_NOOFTW = ActiveTWCount.ToString();


                premiumDTO.dictionary_rate.FSTTAX_TAXTYPE = detailsDTO.FromStateTax; //Call TaxType //Verify
                premiumDTO.dictionary_rate.TSTTAX_TAXTYPE = detailsDTO.ToStateTax; //Call TaxType //Verify


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

       

        private int CheckSwichOffLog(string PolicyNo, string VehicleNo)
        {
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            //Check any Other Vehicle is Switched Off for that Policy OverRiding the Schedule
            var checkLog = _context.TblSwitchLog.Where(x => x.PolicyNo == PolicyNo && x.VehicleNumber == VehicleNo && x.CreatedDate.Value.Date == IndianTime.Date).ToList();

            int SwitchOffCount = 0;

            foreach (var item in checkLog)
            {
                if (item.SwitchStatus == false)
                {
                    SwitchOffCount += 1;
                }

            }

            return SwitchOffCount;

        }

        private decimal? CheckPremiumUpdate(string PolicyNo)
        {
            DateTime IndianTime = System.DateTime.UtcNow.AddMinutes(330);

            //Get the Premium that is alreday Charged by Scheduler for that policy on current date.
            //var checkPremium = _context.TblPremiumBookingLog.FirstOrDefault(x => x.PolicyNo == PolicyNo &&
            //                                                                x.TxnDateTime == IndianTime &&
            //                                                                x.TxnDetails == "Auto Schedule Premium");

            var checkPremium = _context.TblDailyActiveVehicles.FirstOrDefault(x=>x.TxnDate.Value.Date == IndianTime.Date && x.PolicyNumber == PolicyNo);

            var PremiumAmount = checkPremium.Premium;

            return PremiumAmount;
        }


    }
}

