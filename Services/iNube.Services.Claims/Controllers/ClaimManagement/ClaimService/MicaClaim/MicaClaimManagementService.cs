using AutoMapper;
using iNube.Services.Claims.Controllers.ClaimManagement.IntegrationServices;
using iNube.Services.Claims.Entities;
using iNube.Services.Claims.Helpers;
using iNube.Services.Claims.Models;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using static iNube.Services.Claims.Models.BankAccountsDTO;

namespace iNube.Services.Claims.Controllers.ClaimManagement.ClaimService.MicaProduct
{
    public class MicaClaimManagementService : IClaimProductService
    {
        public IIntegrationService _integrationService;
        private MICACMContext _context;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public MicaClaimManagementService(MICACMContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<ClaimResponse> CreateClaimAsync(dynamic claimDetail, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            List<ErrorInfo> Errors = new List<ErrorInfo>();

            decimal PolicyId = 0; string claimNumber = ""; decimal premiumAmount = 0;
            try
            {
                Errors = GetClaimRequestValidation(claimDetail);
                if (Errors.Count > 0)
                {
                    return new ClaimResponse { Status = BusinessStatus.InputValidationFailed, Errors = Errors };
                }
                var productId = claimDetail["ProductID"].ToString();
                var partnerId = claimDetail["PartnerID"].ToString();
                var policyNumber = claimDetail["PolicyNumber"].ToString();

                var policyDetails = await _integrationService.GetPolicyByNumber(policyNumber, apiContext);
                if (policyDetails.PolicyId <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PolicyNumber", PropertyName = "PolicyNumber", ErrorMessage = $"PolicyNumber : {policyNumber} Not Found" };
                    Errors.Add(errorInfo);
                    return new ClaimResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }

                var claimRiskDetails = await _integrationService.GetProductClaimsDetailsAsync(productId, apiContext);
                if (claimRiskDetails.Count <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "ClaimDetail", PropertyName = "ClaimDetail", ErrorMessage = $"ClaimDetail for product : {productId} Not Found" };
                    Errors.Add(errorInfo);
                    return new ClaimResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }

                var mappedClaim = MapAndValidateClaim(claimDetail, claimRiskDetails, Errors, policyDetails.PolicyId);

                if (Errors.Count == 0)
                {
                    mappedClaim.Fnol = GetFNolNumber(partnerId, productId, policyNumber);

                    PolicyId = SaveClaimDetails(mappedClaim, claimDetail);
                    await SendNotificationAsync(mappedClaim.Fnol, policyDetails.PolicyNo, "", mappedClaim.Email, mappedClaim.MobileNumber);
                    return new ClaimResponse { Status = BusinessStatus.Created, Id = mappedClaim.Fnol, ResponseMessage = $"Claim created with claim number {mappedClaim.Fnol} for policy {policyNumber}" };
                }
            }
            catch (Exception ex)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = ex.Message };
                Errors.Add(errorInfo);
            }
            return new ClaimResponse { Status = BusinessStatus.Error, Errors = Errors };
        }

        private List<ErrorInfo> GetClaimRequestValidation(dynamic claimDetail)
        {
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            if (claimDetail["ProductID"] == null)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "ProductId", PropertyName = "ProductId", ErrorMessage = "ProdcutId cannot be null" };
                Errors.Add(errorInfo);
            }
            if (claimDetail["PartnerID"] == null)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PartnerID", PropertyName = "PartnerID", ErrorMessage = "PartnerID cannot be null" };
                Errors.Add(errorInfo);
            }
            if (claimDetail["PolicyNumber"] == null)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PolicyNumber", PropertyName = "PolicyNumber", ErrorMessage = "PolicyNumber cannot be null" };
                Errors.Add(errorInfo);
            }
            return Errors;
        }

        private ClaimDTO MapAndValidateClaim(dynamic policyDetail, IEnumerable<ProductRcbdetailsDTO> claimsDetails, List<ErrorInfo> Errors, decimal PolicyId)
        {
            ClaimDTO claimDTO = new ClaimDTO();

            var claimTransactionModel = new ClaimTransactionDTO();
            // validation of risk details
            var colName = "";
            foreach (var item in claimsDetails)
            {
                var riskvalue = policyDetail[item.InputType];
                if (riskvalue != null)
                {
                    colName = GetColumnName(item.InputType);
                    if (!string.IsNullOrEmpty(colName))
                    {
                        PropertyInfo piInstance = claimDTO.GetType().GetProperty(colName);
                        if (piInstance != null)
                        {
                            if (piInstance.PropertyType == typeof(DateTime) || piInstance.PropertyType == typeof(DateTime?))
                            {
                                DateTime date;
                                DateTime.TryParse(riskvalue.ToString(), out date);
                                piInstance.SetValue(claimDTO, date);
                            }
                            else if (piInstance.PropertyType == typeof(int) || piInstance.PropertyType == typeof(int?))
                            {
                                piInstance.SetValue(claimDTO, (int)riskvalue);
                            }
                            else if (piInstance.PropertyType == typeof(decimal) || piInstance.PropertyType == typeof(decimal?))
                            {
                                piInstance.SetValue(claimDTO, (decimal)riskvalue);
                            }
                            else if (piInstance.PropertyType == typeof(string))
                            {
                                piInstance.SetValue(claimDTO, riskvalue.ToString());
                            }
                        }
                    }
                }
                if (Convert.ToBoolean(item.IsReqired) && riskvalue == null)
                {
                    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"For Policy creation {colName} value is required" };
                    Errors.Add(errorInfo);
                }
            }
            // some other calculated value
            //claimDTO.CreatedBy = apiContext.UserId;
            claimDTO.CreatedDateTime = DateTime.Now;
            claimDTO.PolicyDetailsId = PolicyId;

            return claimDTO;
        }

        private string GetFNolNumber(string partnerId, string productId, string PolicyNumber)
        {
            var connectionString = _configuration.GetConnectionString("PCConnection");
            int nextNumber = 0; string fnolNumber = "";
            nextNumber = new Random().Next();
            fnolNumber = productId.PadLeft(4, '0') + "/" + Convert.ToInt16(partnerId).ToString().PadLeft(4, '0') + "/" + nextNumber.ToString().PadLeft(4, '0') + "/00/111";
            return fnolNumber;
        }

        private string GetColumnName(string column)
        {
            var lstColumn = GettblClaimColumn();
            string colName;
            if (lstColumn.TryGetValue(column, out colName))
            {
                return colName;
            }
            return "";
        }

        private static Dictionary<string, string> GettblClaimColumn()
        {
            Dictionary<string, string> dicColumns = new Dictionary<string, string>();
            dicColumns.Add("PartnerID", "PartnerId");
            dicColumns.Add("Insured reference", "CustomerId");
            dicColumns.Add("Event ID", "EventId");
            dicColumns.Add("ProductID", "ProductId");
            dicColumns.Add("IncidentDateTime", "Event Date/Time");
            dicColumns.Add("MobileNumber", "MobileNumber");
            dicColumns.Add("Email", "Email");
            return dicColumns;
        }

        private decimal SaveClaimDetails(ClaimDTO mappedClaim, dynamic claimDetail)
        {
            TblClaim claim = _mapper.Map<TblClaim>(mappedClaim);
            //claim.PolicyStageId = ModuleConstants.PolicyStageQuote;
            //claim.PolicyStatusId = ModuleConstants.PolicyStatusInActive;


            TblClaimDetails claimRequest = new TblClaimDetails();
            claimRequest.ClaimRequest = claimDetail.ToString();
            //claim.TblClaimDetails.Add(claimRequest);
            _context.TblClaim.Add(claim);

            _context.SaveChanges();

            return claim.ClaimId;
        }

        private async Task SendNotificationAsync(string claimNumber, string policyNumber, string partnerEmail, string customerEmail, string customerNumber)
        {
            //partner email
            EmailTest emailTest = new EmailTest() { Message = $"Claim created with claim number {claimNumber}", Subject = $"Claim registered for  Policy No.{policyNumber}", To = partnerEmail };
            if (!string.IsNullOrEmpty(partnerEmail))
            {
                await SendEmailAsync(emailTest);
            }
            //UserEmail
            if (!string.IsNullOrEmpty(customerEmail))
            {
                emailTest = new EmailTest() { Message = $"Claim created with claim number {claimNumber}", Subject = $"Insured coverage of Cover for Cover event under Policy No.{policyNumber}", To = customerEmail };
                await SendEmailAsync(emailTest);
            }
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

        public async Task<ClaimDTO> GetClaimById(decimal claimId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var tblClaim = _context.TblClaim.Find(claimId);
            if (tblClaim != null)
            {
                var claimDTO = _mapper.Map<ClaimDTO>(tblClaim);
                return claimDTO;
            }
            return null;
        }

        public async Task<ClaimDTO> GetClaimByNumber(string claimNumber, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var tblClaim = _context.TblClaim.Where(p => p.Fnol == claimNumber).FirstOrDefault();
            if (tblClaim != null)
            {
                var claimDTO = _mapper.Map<ClaimDTO>(tblClaim);
                return claimDTO;
            }
            return null;
        }

        public async Task<IEnumerable<ClaimDTO>> GetSearchClaims(ClaimSearchDTO claimSearch, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var _tblclaims = _context.TblClaim.OrderByDescending(p => p.CreatedDateTime).Select(x => x);

            //  var claims= _context.TblClaim.Where(item => item.PartnerId == claimSearch.PartnerId).ToList();
            if (claimSearch.ClaimId > 0)
            {
                _tblclaims = _tblclaims.Where(p => p.ClaimId == claimSearch.ClaimId);
            }
            if (!string.IsNullOrEmpty(claimSearch.Email))
            {
                //var claim = claims.Where(p => p.Email==claimSearch.Email);
                //return claim;

                _tblclaims = _tblclaims.Where(p => p.Email.Contains(claimSearch.Email));
            }
            if (claimSearch.PartnerId > 0)
            {
                _tblclaims = _tblclaims.Where(p => p.PartnerId == claimSearch.PartnerId);
            }
            if (claimSearch.ProductId > 0)
            {
                _tblclaims = _tblclaims.Where(p => p.ProductId == claimSearch.ProductId);
            }
            if (!string.IsNullOrEmpty(claimSearch.MobileNumber))
            {
                _tblclaims = _tblclaims.Where(p => p.MobileNumber.Contains(claimSearch.MobileNumber));
            }
            if (!string.IsNullOrEmpty(claimSearch.EventId))
            {
                _tblclaims = _tblclaims.Where(p => p.EventId.Contains(claimSearch.EventId));
            }
            if (!string.IsNullOrEmpty(claimSearch.ClaimNo))
            {
                _tblclaims = _tblclaims.Where(p => p.Fnol.Contains(claimSearch.ClaimNo));
            }

            //if (Claimlist != null)
            //{
            //    var claimDTO = _mapper.Map<IEnumerable<ClaimDTO>>(Claimlist);
            //    return claimDTO;
            //}
            var ClaimDTO = _mapper.Map<IEnumerable<ClaimDTO>>(_tblclaims);
            return ClaimDTO;
        }

        public async Task<ClaimsDTO> ClaimIntimate(ClaimDataDTO claims, ApiContext apiContext)
        {
            List<ClaimInsurableDTO> claimInsurableDTO = new List<ClaimInsurableDTO>();
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var policyDetails = await _integrationService.GetPolicyByNumber(claims.PolicyNumber, apiContext);
            if (policyDetails.PolicyId <= 0)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PolicyNumber", PropertyName = "PolicyNumber", ErrorMessage = $"PolicyNumber : {claims.PolicyNumber} Already Exist" };

                ClaimsDTO claimsDTO = new ClaimsDTO();

                claimsDTO.Errors.Add(errorInfo);
                return new ClaimsDTO { Status = BusinessStatus.NotFound, Errors = claimsDTO.Errors };
            }

            UpdateClaimData(claims, apiContext);

            claims.OrganizationId = Convert.ToDecimal(policyDetails.CustomerId);

            var _tblclaims = _mapper.Map<TblClaims>(claims);
            _context.TblClaims.Add(_tblclaims);
            _context.SaveChanges();

            var _claimsDTOs = _mapper.Map<ClaimsDTO>(_tblclaims);
            _claimsDTOs.Status = BusinessStatus.Created;
            _claimsDTOs.ResponseMessage = "record created..";


            EmailTest emailTest = new EmailTest();
            emailTest.To = claims.EmailId;
            emailTest.Subject = "Claim successfully registered";
            emailTest.Message = "Claim Number: " + claims.ClaimNumber + " successfully registered against policy No: " + claims.PolicyNumber + " \n Your Claim will be processed in accordance with the Policy terms and Conditions. \n \n Assuring the best of services always. \n \nRegards, \nTeam MICA";

            // New changes 
            SendEmailAsync(emailTest);

            return _claimsDTOs;
        }

        private async Task<ClaimDataDTO> UpdateClaimData(ClaimDataDTO claims, ApiContext apiContext)
        {
            var partnerId = claims.PolicyNumber.Split('/')[1];

            var productId = claims.PolicyNumber.Split('/')[0];

            var ClaimNumber = GetFNolNumber(partnerId, productId, claims.PolicyNumber);
            ClaimsDTO _claims = new ClaimsDTO();

            claims.ClaimStatusId = 16;
            claims.ClaimNumber = ClaimNumber;
            claims.CreatedDate = DateTime.Now;
            claims.CreatedBy = apiContext.UserId;
            claims.PartnerId = apiContext.PartnerId;
            claims.OrganizationId = apiContext.OrgId;
            _claims.LossId = claims.lossIntimatedBy;
            _claims.LocationOfEvent = claims.locationOfLoss;
            _claims.LossOfDescription = claims.lossDescription;
            _claims.PolicyNo = claims.PolicyNumber;

            BankAccountsDTO _bankAccounts = new BankAccountsDTO();
            TblClaimdoc _claimdoc = new TblClaimdoc();
            ClaimsHistoryDTO _claimsHistory = new ClaimsHistoryDTO();

            // ClaimsDTO _claims = new ClaimsDTO();

            //inserting data to tblbankaccounts
            _bankAccounts.AccountHolderName = claims.AccHolderName;
            _bankAccounts.AccountNumber = claims.AccNumber;
            // _bankAccounts.ClaimId = Claimid;
            _bankAccounts.BankBranchAddress = claims.BankBranchAdd;
            _bankAccounts.BankName = claims.BankName;
            _bankAccounts.Ifsccode = claims.IfscCode;
            _bankAccounts.CreatedDate = DateTime.Now;

            //inserting data to tblclaimhistory
            // _claimsHistory.ClaimId = Claimid;
            _claimsHistory.ClaimStatusId = claims.ClaimStatusId;
            _claimsHistory.ClaimAmount = claims.ClaimAmount;
            // _claimsHistory.ClaimManagerRemarks = claims.ClaimManagerRemarks;
            // _claimsHistory.ApprovedClaimAmount = claims.ClaimAmount;// claims.ApprovedClaimAmount;
            _claimsHistory.CreatedBy = apiContext.UserId;
            _claimsHistory.CreatedDate = DateTime.Now;
            _claimsHistory.LossId = claims.lossIntimatedBy;
            _claimsHistory.LossDateTime = claims.lossDateTime;
            _claimsHistory.LocationOfEvent = claims.locationOfLoss;
            _claimsHistory.LossOfDescription = claims.lossDescription;
            _claimsHistory.Active = true;
            // claims.TblBankAccounts.

            claims.TblBankAccounts.Add(_bankAccounts);

            // claims.ClaimsHistory.Add(_claimsHistory);
            return claims;
        }

        public async Task<ClaimDTOGWP> GetClaimGWP(ClaimDTOGWP claimgwp, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTO>> GetMaster(string sMasterlist, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ddDTO> ddDTOs = new List<ddDTO>();
            if (sMasterlist == "Claim Intimated By")
            {
                ddDTOs = _context.TblmasCmcommonTypes.Where(p => p.MasterType == sMasterlist)
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
                return ddDTOs;
            }

            else if (sMasterlist == "Document Name")
            {
                ddDTOs = _context.TblmasCmcommonTypes.Where(p => p.MasterType == sMasterlist)
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
                return ddDTOs;
            }

            else if (sMasterlist == "Claims Decision")
            {
                ddDTOs = _context.TblmasCmcommonTypes.Where(p => p.MasterType == sMasterlist)
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
                return ddDTOs;
            }

            else if (sMasterlist == "Insurable Item")
            {
                ddDTOs = _context.TblmasCmcommonTypes.Where(p => p.MasterType == sMasterlist)
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
                return ddDTOs;
            }

            ddDTOs = _context.TblmasCmcommonTypes
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
            return ddDTOs;
        }

        public async Task<List<FinanceProcessDTO>> GetFinanceBankDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            List<FinanceProcessDTO> Listfinance = new List<FinanceProcessDTO>();

            try
            {
                var claimList = _context.TblClaims.Where(x => x.Active == true);

                var policyDetails = await _integrationService.GetPolicyDetails(apiContext);

                var PolicyNumberData = policyDetails.OrderByDescending(x => x.PolicyId);

                Dictionary<decimal, string> PolicyDetails = new Dictionary<decimal, string>();

                foreach (var item in PolicyNumberData)
                {
                    PolicyDetails.Add(item.PolicyId, item.PolicyNo);
                }

                var ClaimPolicyid = claimList.Where(x => x.PolicyId != null).Select(x => x.PolicyId).ToList();

                Dictionary<string, string> ClaimPolicyNumber = new Dictionary<string, string>();

                foreach (var i in ClaimPolicyid)
                {
                    var Policyno = PolicyDetails.Where(x => x.Key == i);
                    var check = ClaimPolicyNumber.Where(x => x.Key == i.ToString()).Any();
                    if (!check)
                    {
                        ClaimPolicyNumber.Add(i.ToString(), Policyno.First().Value);
                    }
                }

                var ApprovedStatusID = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.Value == "Approved");

                //(ClaimsData)Selects claims Which Are Approved so Common TypeID=9

                var ClaimsData = _context.TblClaims.OrderByDescending(x => x.ClaimId).Include(x => x.ClaimStatus).Where(x => x.ClaimStatus.CommonTypeId == ApprovedStatusID.CommonTypeId && x.Active == true)
                                                    .Select(x => new ClaimStatusDTO
                                                    {
                                                        ClaimId = x.ClaimId,
                                                        ClaimNumber = x.ClaimNumber,
                                                        ClaimStatus = x.ClaimStatus.Value,
                                                        PolicyId = x.PolicyId
                                                    });

                Dictionary<decimal, string> ClaimStatus = new Dictionary<decimal, string>();

                foreach (var item in ClaimsData)
                {
                    ClaimStatus.Add(item.ClaimId, item.ClaimNumber);
                }

                var FinanceData = _context.TblBankAccounts.Select(x => x);
                var PaymentData = _context.TblBankFile.Select(x => x);


                List<TblBankAccounts> FinalFinanceData = new List<TblBankAccounts>();

                foreach (var item in ClaimsData)
                {
                    var claimstatusvalue = item.ClaimStatus;

                    var ApprovedClaimData = claimList.Where(x => x.ClaimId == item.ClaimId).ToList();
                    var ApprovedFinanceData = FinanceData.Where(x => x.ClaimId == item.ClaimId).ToList();
                    var ApprovedPaymentData = PaymentData.Select(x => x).ToList();
                    if (financeRequest.FromDate != null && financeRequest.ToDate != null)
                    {
                        //ApprovedPaymentData = PaymentData.Where(x => x.ClaimNo == item.ClaimNumber && x.PaymentDate >= financeRequest.FromDate && x.PaymentDate <= financeRequest.ToDate).ToList();
                        ApprovedPaymentData = PaymentData.Where(x => x.ClaimNo == item.ClaimNumber).ToList();
                    }
                    if (financeRequest.FromDate == null && financeRequest.ToDate == null)
                    {
                        ApprovedPaymentData = PaymentData.Where(x => x.ClaimNo == item.ClaimNumber).ToList();
                    }

                    FinanceProcessDTO finance = new FinanceProcessDTO();

                    //for (int i = ClaimsData.Count(); i != 0; i--)
                    //{
                    foreach (var itemi in ApprovedFinanceData)
                    {
                        var policyno = ClaimPolicyNumber.Values;

                        finance.PolicyNo = ClaimPolicyNumber[item.PolicyId.ToString()];
                        finance.ClaimNo = ClaimStatus[item.ClaimId];
                        finance.ClaimStatus = claimstatusvalue;
                        finance.BankAccountHolderName = itemi.AccountHolderName;
                        finance.BankName = itemi.BankName;
                        finance.BankBranchAddress = itemi.BankBranchAddress;
                        finance.BankIfsccode = itemi.Ifsccode;
                        finance.BankAccountNumber = itemi.AccountNumber;
                    }

                    foreach (var data in ApprovedClaimData)
                    {
                        finance.Amount = Convert.ToDecimal(data.ApprovedClaimAmount);
                        finance.ClaimId = data.ClaimId;
                        finance.ModifiedDate = data.ModifiedDate;
                    }

                    foreach (var itemj in ApprovedPaymentData)
                    {
                        finance.PaymentStatus = itemj.PaymentStatus;
                        finance.Utrno = itemj.Utrno.ToString();
                        string strDate = itemj.PaymentDate;
                        string[] dateString = strDate.Split('/');
                        DateTime dateTimevalue = Convert.ToDateTime(dateString[2] + "-" + dateString[1] + "-" + dateString[0]);
                        //DateTime datetimevalue = DateTime.FromOADate(Convert.ToDouble(itemj.PaymentDate));
                        DateTime? date = dateTimevalue;
                        if (date != null)
                        {
                            DateTime newSelectedDate = date.Value;
                            finance.PaymentDate = newSelectedDate;
                        }
                        else
                        {
                            DateTime? MyNullableDate = null;
                            finance.PaymentDate = MyNullableDate;
                        }
                    }
                    //}
                    Listfinance.Add(finance);
                }

                if (FinanceData.Count() == 0 && PaymentData.Count() == 0)
                {
                    var applist = Listfinance.Where(x => x.PaymentStatus != "Duplicate").ToList();
                    var _applist = _mapper.Map<List<FinanceProcessDTO>>(applist);
                    return _applist;
                }
                else
                {
                    var list = Listfinance.Select(x => x).ToList();
                    if (financeRequest.FromDate == null && financeRequest.ToDate == null)
                    {
                        list = Listfinance.Where(x => x.PaymentStatus != "Duplicate").ToList();
                    }
                    if (financeRequest.FromDate != null && financeRequest.ToDate != null)
                    {
                        list = Listfinance.Where(x => x.PaymentStatus != "Duplicate" && x.ModifiedDate >= financeRequest.FromDate && x.ModifiedDate <= financeRequest.ToDate).ToList();
                    }
                    var _list = _mapper.Map<List<FinanceProcessDTO>>(list);
                    return _list;
                }
            }
            catch (Exception ex)
            {

            }
            var approvedlist = Listfinance.Where(x => x.PaymentStatus != "Duplicate").ToList();
            var _approvedlist = _mapper.Map<List<FinanceProcessDTO>>(approvedlist);
            return _approvedlist;
        }

        public async Task<List<FinanceProcessDTO>> GetSettledFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            List<FinanceProcessDTO> Listfinance = new List<FinanceProcessDTO>();
            try
            {
                var claimList = _context.TblClaims.Where(x => x.Active == true);

                var policyDetails = await _integrationService.GetPolicyDetails(apiContext);

                var PolicyNumberData = policyDetails.OrderByDescending(x => x.PolicyId);

                Dictionary<decimal, string> PolicyDetails = new Dictionary<decimal, string>();

                foreach (var item in PolicyNumberData)
                {
                    PolicyDetails.Add(item.PolicyId, item.PolicyNo);
                }

                var ClaimPolicyid = claimList.Where(x => x.PolicyId != null).Select(x => x.PolicyId).ToList();

                Dictionary<string, string> ClaimPolicyNumber = new Dictionary<string, string>();

                foreach (var i in ClaimPolicyid)
                {
                    var Policyno = PolicyDetails.Where(x => x.Key == i);

                    var check = ClaimPolicyNumber.Where(x => x.Key == i.ToString()).Any();
                    if (!check)
                    {
                        ClaimPolicyNumber.Add(i.ToString(), Policyno.First().Value);
                    }
                }

                var SettledStatusID = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.Value == financeRequest.Value);

                //(ClaimsData)Selects claims Which Are Approved so Common TypeID=9

                var ClaimsData = _context.TblClaims.OrderByDescending(x => x.ClaimId).Include(x => x.ClaimStatus).Where(x => x.ClaimStatus.CommonTypeId == SettledStatusID.CommonTypeId && x.Active == true)
                                                    .Select(x => new ClaimStatusDTO
                                                    {
                                                        ClaimId = x.ClaimId,
                                                        ClaimNumber = x.ClaimNumber,
                                                        ClaimStatus = x.ClaimStatus.Value,
                                                        PolicyId = x.PolicyId,

                                                    });

                //var ClaimsData = _context.TblPayment.OrderByDescending(x => x.ClaimId).Where(x => x.PaymentStatus == value);

                Dictionary<decimal, string> ClaimStatus = new Dictionary<decimal, string>();

                foreach (var item in ClaimsData)
                {
                    ClaimStatus.Add(item.ClaimId, item.ClaimNumber);
                }

                var FinanceData = _context.TblBankAccounts.Select(x => x);
                var PaymentData = _context.TblPayment.Select(x => x);


                List<TblBankAccounts> FinalFinanceData = new List<TblBankAccounts>();

                //Collecting the finance and Payment data where Claim is Approved 
                foreach (var item in ClaimsData)
                {
                    var claimstatusvalue = item.ClaimStatus;
                    var ApprovedFinanceData = FinanceData.Where(x => x.ClaimId == item.ClaimId).ToList();
                    var ApprovedClaimData = claimList.Where(x => x.ClaimId == item.ClaimId).ToList();
                    var ApprovedPaymentData = PaymentData.Select(x => x).ToList();
                    if (financeRequest.FromDate != null && financeRequest.ToDate != null)
                    {
                        ApprovedPaymentData = PaymentData.Where(x => x.ClaimId == item.ClaimId && x.PaymentDate >= financeRequest.FromDate && x.PaymentDate <= financeRequest.ToDate).ToList();
                    }
                    if (financeRequest.FromDate == null && financeRequest.ToDate == null)
                    {
                        ApprovedPaymentData = PaymentData.Where(x => x.ClaimId == item.ClaimId).ToList();
                    }

                    FinanceProcessDTO finance = new FinanceProcessDTO();

                    //for (int i = ClaimsData.Count(); i != 0; i--)
                    //{
                    foreach (var itemi in ApprovedFinanceData)
                    {
                        var policyno = ClaimPolicyNumber.Values;

                        finance.PolicyNo = ClaimPolicyNumber[item.PolicyId.ToString()];
                        finance.ClaimNo = ClaimStatus[item.ClaimId];
                        finance.ClaimStatus = claimstatusvalue;
                        finance.BankAccountHolderName = itemi.AccountHolderName;
                        finance.BankName = itemi.BankName;
                        finance.BankBranchAddress = itemi.BankBranchAddress;
                        finance.BankIfsccode = itemi.Ifsccode;
                        finance.BankAccountNumber = itemi.AccountNumber;
                    }

                    foreach (var data in ApprovedClaimData)
                    {
                        finance.Amount = Convert.ToDecimal(data.ApprovedClaimAmount);
                        finance.ClaimId = data.ClaimId;
                    }

                    foreach (var itemj in ApprovedPaymentData)
                    {
                        finance.PaymentStatus = itemj.PaymentStatus;
                        finance.Utrno = itemj.Utrno.ToString();
                        DateTime? date = itemj.PaymentDate;
                        if (date != null)
                        {
                            DateTime newSelectedDate = date.Value;
                            finance.PaymentDate = newSelectedDate;
                        }
                        else
                        {
                            DateTime? MyNullableDate = null;
                            finance.PaymentDate = MyNullableDate;
                        }
                    }
                    //}
                    Listfinance.Add(finance);
                }


                if (FinanceData.Count() == 0 && PaymentData.Count() == 0)
                {
                    var setlist = Listfinance.Where(x => x.PaymentStatus == "Success" && x.PaymentDate >= financeRequest.FromDate && x.PaymentDate <= financeRequest.ToDate).ToList();
                    var _setlist = _mapper.Map<List<FinanceProcessDTO>>(setlist);
                    return _setlist;
                }
                else
                {
                    var list = Listfinance.Select(x => x).ToList();
                    if (financeRequest.FromDate == null && financeRequest.ToDate == null)
                    {
                        list = Listfinance.Where(x => x.PaymentStatus == "Success").ToList();
                    }
                    if (financeRequest.FromDate != null && financeRequest.ToDate != null)
                    {
                        list = Listfinance.Where(x => x.PaymentStatus == "Success" && x.PaymentDate >= financeRequest.FromDate && x.PaymentDate <= financeRequest.ToDate).ToList();
                    }
                    var _list = _mapper.Map<List<FinanceProcessDTO>>(list);
                    return _list;
                }
            }
            catch (Exception ex)
            {

            }
            var Settledlist = Listfinance.Select(x => x).ToList();
            if (financeRequest.FromDate == null && financeRequest.ToDate == null)
            {
                Settledlist = Listfinance.Where(x => x.PaymentStatus == "Success").ToList();
            }
            if (financeRequest.FromDate != null && financeRequest.ToDate != null)
            {
                Settledlist = Listfinance.Where(x => x.PaymentStatus == "Success" && x.PaymentDate >= financeRequest.FromDate && x.PaymentDate <= financeRequest.ToDate).ToList();
            }
            var _settledlist = _mapper.Map<List<FinanceProcessDTO>>(Settledlist);
            return _settledlist;
        }

        public async Task<List<FinanceProcessDTO>> GetPaymentFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            List<FinanceProcessDTO> Listfinance = new List<FinanceProcessDTO>();
            try
            {
                var claimList = _context.TblClaims.Where(x => x.Active == true);

                var policyDetails = await _integrationService.GetPolicyDetails(apiContext);

                var PolicyNumberData = policyDetails.OrderByDescending(x => x.PolicyId);

                Dictionary<decimal, string> PolicyDetails = new Dictionary<decimal, string>();

                foreach (var item in PolicyNumberData)
                {
                    PolicyDetails.Add(item.PolicyId, item.PolicyNo);
                }

                var ClaimPolicyid = claimList.Where(x => x.PolicyId != null).Select(x => x.PolicyId).ToList();

                Dictionary<string, string> ClaimPolicyNumber = new Dictionary<string, string>();

                foreach (var i in ClaimPolicyid)
                {
                    var Policyno = PolicyDetails.Where(x => x.Key == i);

                    var check = ClaimPolicyNumber.Where(x => x.Key == i.ToString()).Any();
                    if (!check)
                    {
                        ClaimPolicyNumber.Add(i.ToString(), Policyno.First().Value);
                    }
                }

                var PaymentStatusID = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.Value == "Approved");

                //(ClaimsData)Selects claims Which Are Approved so Common TypeID=9

                var ClaimsData = _context.TblClaims.OrderByDescending(x => x.ClaimId).Include(x => x.ClaimStatus).Where(x => x.ClaimStatus.CommonTypeId == PaymentStatusID.CommonTypeId && x.Active == true)
                                                    .Select(x => new ClaimStatusDTO
                                                    {
                                                        ClaimId = x.ClaimId,
                                                        ClaimNumber = x.ClaimNumber,
                                                        ClaimStatus = x.ClaimStatus.Value,
                                                        PolicyId = x.PolicyId
                                                    });

                //var ClaimsData = _context.TblPayment.OrderByDescending(x => x.ClaimId).Where(x => x.PaymentStatus == value);

                Dictionary<decimal, string> ClaimStatus = new Dictionary<decimal, string>();

                foreach (var item in ClaimsData)
                {
                    ClaimStatus.Add(item.ClaimId, item.ClaimNumber);
                }

                var FinanceData = _context.TblBankAccounts.Select(x => x);
                var PaymentData = _context.TblBankFile.Select(x => x);


                List<TblBankAccounts> FinalFinanceData = new List<TblBankAccounts>();

                //Collecting the finance and Payment data where Claim is Approved 
                foreach (var item in ClaimsData)
                {
                    var claimstatusvalue = item.ClaimStatus;
                    var ApprovedFinanceData = FinanceData.Where(x => x.ClaimId == item.ClaimId).ToList();
                    var ApprovedClaimData = claimList.Where(x => x.ClaimId == item.ClaimId).ToList();
                    var ApprovedPaymentData = PaymentData.Where(x => x.ClaimNo == item.ClaimNumber).ToList();

                    FinanceProcessDTO finance = new FinanceProcessDTO();
                    //for (int i = ClaimsData.Count(); i != 0; i--)
                    //{
                    foreach (var itemi in ApprovedFinanceData)
                    {
                        var policyno = ClaimPolicyNumber.Values;

                        finance.PolicyNo = ClaimPolicyNumber[item.PolicyId.ToString()];
                        finance.ClaimNo = ClaimStatus[item.ClaimId];
                        finance.ClaimStatus = claimstatusvalue;
                        finance.BankAccountHolderName = itemi.AccountHolderName;
                        finance.BankName = itemi.BankName;
                        finance.BankBranchAddress = itemi.BankBranchAddress;
                        finance.BankIfsccode = itemi.Ifsccode;
                        finance.BankAccountNumber = itemi.AccountNumber;
                    }

                    foreach (var data in ApprovedClaimData)
                    {
                        finance.Amount = Convert.ToDecimal(data.ApprovedClaimAmount);
                        finance.ClaimId = data.ClaimId;
                    }

                    foreach (var itemj in ApprovedPaymentData)
                    {
                        finance.PaymentStatus = itemj.PaymentStatus;
                        finance.Utrno = itemj.Utrno.ToString();
                        string strDate = itemj.PaymentDate;
                        string[] dateString = strDate.Split('/');
                        DateTime dateTimevalue = Convert.ToDateTime(dateString[2] + "-" + dateString[1] + "-" + dateString[0]);
                        //DateTime datetimevalue = DateTime.FromOADate(Convert.ToDouble(itemj.PaymentDate));
                        DateTime? date = dateTimevalue;
                        if (date != null)
                        {
                            DateTime newSelectedDate = date.Value;
                            finance.PaymentDate = newSelectedDate;
                        }
                        else
                        {
                            DateTime? MyNullableDate = null;
                            finance.PaymentDate = MyNullableDate;
                        }
                    }
                    //}
                    Listfinance.Add(finance);
                }

                if (FinanceData.Count() == 0 && PaymentData.Count() == 0)
                {
                    var paylist = Listfinance.Where(x => x.PaymentStatus == financeRequest.Value).ToList();
                    var _paylist = _mapper.Map<List<FinanceProcessDTO>>(paylist);
                    return _paylist;
                }
                else
                {
                    var list = Listfinance.Select(x => x).ToList();
                    if (financeRequest.FromDate == null && financeRequest.ToDate == null)
                    {
                        list = Listfinance.Where(x => x.PaymentStatus == financeRequest.Value).ToList();
                    }
                    if (financeRequest.FromDate != null && financeRequest.ToDate != null)
                    {
                        list = Listfinance.Where(x => x.PaymentStatus == financeRequest.Value && x.PaymentDate >= financeRequest.FromDate && x.PaymentDate <= financeRequest.ToDate).ToList();
                    }
                    var _list = _mapper.Map<List<FinanceProcessDTO>>(list);
                    return _list;
                }
            }
            catch (Exception ex)
            {

            }
            var Paymentlist = Listfinance.Select(x => x).ToList();

            if (financeRequest.FromDate == null && financeRequest.ToDate == null)
            {
                Paymentlist = Listfinance.Where(x => x.PaymentStatus == financeRequest.Value).ToList();
            }
            if (financeRequest.FromDate != null && financeRequest.ToDate != null)
            {
                Paymentlist = Listfinance.Where(x => x.PaymentStatus == financeRequest.Value && x.PaymentDate >= financeRequest.FromDate && x.PaymentDate <= financeRequest.ToDate).ToList();
            }
            var _paymentlist = _mapper.Map<List<FinanceProcessDTO>>(Paymentlist);
            return _paymentlist;
        }

        public async Task<BankDocumentDTO> GetDocumentId(string filename, ApiContext apiContext)
        {
            TblBankDocument bankDocument = new TblBankDocument();

            bankDocument.DocFileName = filename;

            _context.TblBankDocument.Add(bankDocument);
            _context.SaveChanges();

            var result = _mapper.Map<BankDocumentDTO>(bankDocument);
            return result;
        }


        public async Task<ClaimProcessDTO> ClaimProcess(ClaimProcessDTO claimsDTO, ApiContext apiContext)
        {

            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var ClaimApproval = _context.TblClaims.SingleOrDefault(x => x.ClaimNumber == claimsDTO.ClaimNumber);
            var Insurable = _context.TblClaimInsurable.Where(x => x.ClaimId == claimsDTO.ClaimId).ToList();
            EmailTest emailTest = new EmailTest();
            TblClaimHistory claimsHistory = new TblClaimHistory();
            // Get Clone 
            //  var hisClaimApproval= Clone.ClaimApproval.

            TblClaims claimsprocess = _mapper.Map<TblClaims>(ClaimApproval);
            claimsprocess.ModifiedBy = apiContext.UserId;
            claimsprocess.ModifiedDate = DateTime.Now;
            claimsprocess.ClaimStatusId = claimsDTO.ClaimStatusId;
            claimsprocess.ClaimManagerRemarks = claimsDTO.ClaimManagerRemarks;
            claimsprocess.ApprovedClaimAmount = claimsDTO.ApprovedClaimAmount;
            if (claimsprocess.ClaimStatusId == 9)
            {
                emailTest.To = claimsDTO.EmailId;
                emailTest.Subject = "Claim successfully approved";
                emailTest.Message = "Claim Number: " + claimsprocess.ClaimNumber + " successfully approved against policy No: " + claimsDTO.PolicyNumber + "Insured:" + claimsDTO.InsuredName + " \n Your Claim has been approved, by the Claims Manager. \n The Approved Claims will be settled as per the policy terms and conditions.\n Assuring the best of services always. \n \nRegards, \nTeam MICA";

            }
            else if (claimsprocess.ClaimStatusId == 11)
            {
                emailTest.To = claimsDTO.EmailId;
                emailTest.Subject = "Claim Rejected";
                emailTest.Message = "Claim Number: " + claimsprocess.ClaimNumber + " has been rejected against policy No: " + claimsDTO.PolicyNumber + "Insured:" + claimsDTO.InsuredName + " \n Your Claim has been rejected, by the Claims Manager. \n We regret to inform you that your claim has been Rejected by the claims manager.\n Assuring the best of services always. \n \nRegards, \nTeam MICA";
            }

            _context.TblClaims.Update(claimsprocess);
            _context.SaveChanges();
            SendEmailAsync(emailTest);
            foreach (var item in Insurable)
            {
                // item.ApprovedClaimAmounts = claimsDTO.ApprovedClaimAmounts ;
                item.ApprovedClaimAmounts = claimsDTO.ClaimInsurable.FirstOrDefault(x => x.ClaimInsurableId == item.ClaimInsurableId).ApprovedClaimAmounts;
                _context.TblClaimInsurable.Update(item);
            }
            //adding new record to tblhistory on updating claimstatus of existing claim from tblclaims
            claimsHistory.ClaimId = ClaimApproval.ClaimId;
            claimsHistory.ClaimStatusId = claimsDTO.ClaimStatusId;
            claimsHistory.ClaimAmount = ClaimApproval.ClaimAmount;
            claimsHistory.ClaimManagerRemarks = claimsDTO.ClaimManagerRemarks;
            claimsHistory.ApprovedClaimAmount = claimsDTO.ApprovedClaimAmount;
            claimsHistory.CreatedBy = ClaimApproval.CreatedBy;
            claimsHistory.CreatedDate = ClaimApproval.CreatedDate;
            claimsHistory.LossId = ClaimApproval.LossId;
            claimsHistory.LossDateTime = ClaimApproval.LossDateTime;
            claimsHistory.LocationOfEvent = ClaimApproval.LocationOfEvent;
            claimsHistory.LossOfDescription = ClaimApproval.LossOfDescription;
            claimsHistory.PolicyId = ClaimApproval.PolicyId;
            claimsHistory.OrgId = apiContext.OrgId;
            claimsHistory.PartnerId = apiContext.PartnerId;
            claimsHistory.PolicyNo = ClaimApproval.PolicyNo;
            claimsHistory.ClaimNumber = ClaimApproval.ClaimNumber;
            claimsHistory.ModifiedBy = ClaimApproval.ModifiedBy;
            claimsHistory.ModifiedDate = ClaimApproval.ModifiedDate;

            claimsHistory.Active = true;

            _context.TblClaimHistory.Add(claimsHistory);
            _context.SaveChanges();

            var _claimprocess = _mapper.Map<ClaimProcessDTO>(claimsprocess);
            return _claimprocess;

        }

        public async Task<ClaimDocUpload> UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //var claimdetails = _context.TblClaimdoc.SingleOrDefault(x => x.ClaimId == ClaimId);

            var claimdata = _context.TblClaimdoc.Select(a => a.ClaimId == claimdoc.ClaimId);
            TblClaimdoc claimdocDTO = new TblClaimdoc();
            if (claimdata == null)
            {
                claimdocDTO.Document = claimdoc.Document;
                claimdocDTO.DocumentName = claimdoc.DocumentName;
                claimdocDTO.ClaimId = claimdoc.ClaimId;
                claimdocDTO.CreatedDate = claimdoc.CreatedDate;
                claimdocDTO.CreatedBy = apiContext.UserId;
                var _claimDoc = _mapper.Map<TblClaimdoc>(claimdocDTO);
                _context.TblClaimdoc.Add(_claimDoc);
            }
            else
            {
                claimdocDTO.Document = claimdoc.Document;
                claimdocDTO.DocumentName = claimdoc.DocumentName;
                claimdocDTO.ClaimId = claimdoc.ClaimId;
                claimdocDTO.ModifiedBy = apiContext.UserId;
                claimdocDTO.ModifiedDate = DateTime.Now;
                //claimdetails.ProfileImage = fileBytes;
                var _claimDoc = _mapper.Map<TblClaimdoc>(claimdocDTO);
                _context.TblClaimdoc.Update(_claimDoc);
            }

            _context.SaveChanges();
            var _upload = _mapper.Map<ClaimdocDTO>(claimdocDTO);
            return new ClaimDocUpload { Status = BusinessStatus.Created, claimdocDTO = _upload, ResponseMessage = $"Document uploaded Successfully!" };
            // return "Üpload SuccessFul";
        }


        public async Task<byte[]> ImageData(int ClaimId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var data = _context.TblClaimdoc.FirstOrDefault(x => x.ClaimId == ClaimId);
            ClaimdocDTO user = new ClaimdocDTO();
            // //  user.UserId = "9d99d324-3f83-4429-b531-571ce10cd20c";

            //ClaimdocDTO claimdoc= _mapper.Map<ClaimdocDTO>(user);
            //// var claimdoc = _context.TblClaimdoc.SingleOrDefault(x => x.ClaimId == ClaimId);

            byte[] imagebytes = new byte[data.Document.Length];



            imagebytes = data.Document;

            return imagebytes;
        }

        public async Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest cDTO, ApiContext apiContext)
        {
            try
            {
                _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, cDTO.EvtId.ToString()));

                BillingEventResponseDTO BillingData = new BillingEventResponseDTO();

                if (cDTO.FromDate != null && cDTO.ToDate != null)
                {
                    var policyData = await _integrationService.GetPolicyForClaimsInvoice(cDTO, apiContext);
                    // var _policyData = _mapper.Map<PolicyDataForClaims>(policyData);

                    var Billingresult = (from tblClaims in _context.TblClaims.Where(tblClaims => tblClaims.OrganizationId == cDTO.CustomerId && tblClaims.CreatedDate.Value.Date <= cDTO.FromDate.Date && tblClaims.CreatedDate.Value.Date <= cDTO.ToDate.Date)
                                         select new ClaimEventDTO
                                         {
                                             ClaimNo = tblClaims.ClaimNumber,
                                             PolicyNo = policyData.FirstOrDefault(P => P.PolicyId == tblClaims.PolicyId).PolicyNo,
                                             ProductName = policyData.FirstOrDefault(P => P.PolicyId == tblClaims.PolicyId).ProductName,
                                             LossDate = tblClaims.LossDateTime,
                                             InsuredName = policyData.FirstOrDefault(P => P.PolicyId == tblClaims.PolicyId).InsuredName,
                                             InsuredRefNo = policyData.FirstOrDefault(P => P.PolicyId == tblClaims.PolicyId).InsuredRefNo,
                                             CreatedDate = tblClaims.CreatedDate

                                         });
                    List<BillingEventDataDTO> BillingResult = new List<BillingEventDataDTO>();
                    BillingData.claimEventDTOs.AddRange(Billingresult);
                }
                BillingData.billingEventDataDTOs = (await BillingEventData(cDTO, apiContext)).ToList();
                return BillingData;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<BillingEventDataDTO>> BillingEventData(BillingEventRequest cDTO, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, cDTO.EvtId.ToString()));

            BillingEventDataDTO ClaimEvent = new BillingEventDataDTO();

            ClaimEvent.Count = _context.TblClaims.Where(ac => ac.OrganizationId == cDTO.CustomerId && ac.CreatedDate.Value.Date <= cDTO.FromDate.Date && ac.CreatedDate.Value.Date <= cDTO.ToDate.Date).Count();

            List<BillingEventDataDTO> Claimlist = new List<BillingEventDataDTO>();
            Claimlist.Add(ClaimEvent);

            return Claimlist;
        }

        public async Task<List<object>> ClaimDetailsAsync(decimal ClaimId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var DATA = _context.TblClaims.SingleOrDefault(x => x.ClaimId == ClaimId);

            var bank = _context.TblBankAccounts.SingleOrDefault(x => x.ClaimId == ClaimId);

            var insurable = _context.TblClaimInsurable.Where(x => x.ClaimId == ClaimId).ToList();

            var doc = _context.TblClaimdoc.Where(x => x.ClaimId == ClaimId);
            var status = (from a in _context.TblClaims.Where(x => x.ClaimId == ClaimId)
                          join c in _context.TblmasCmcommonTypes on a.ClaimStatusId equals c.CommonTypeId
                          select c).FirstOrDefault();



            Dictionary<object, object> finaldata = new Dictionary<object, object>();

            List<object> finalData = new List<object>();

            List<object> FullfinalData = new List<object>();

            finaldata.Add("Loss Date", DATA.LossDateTime);
            finaldata.Add("Location Of Event", DATA.LocationOfEvent);
            finaldata.Add("Loss Description", DATA.LossOfDescription);
            //finaldata.Add("Created Date", DATA.CreatedDate);
            // finaldata.Add("Claim Status", status.Value);
            finaldata.Add("Total Claim Amount", DATA.ClaimAmount);
            finaldata.Add("Account Holder Name", bank.AccountHolderName);
            finaldata.Add("Account Number", bank.AccountNumber);
            finaldata.Add("Bank Name", bank.BankName);
            finaldata.Add("IFSC Code", bank.Ifsccode);
            finaldata.Add("Bank Address", bank.BankBranchAddress);



            foreach (var item in finaldata)
            {
                List<object> data = new List<object>();

                data.Add(item.Key);
                data.Add(item.Value);

                finalData.Add(data);

            }

            FullfinalData.Add(finalData);
            FullfinalData.Add(insurable);

            return FullfinalData;

        }

        public async Task<List<object>> PaymentDetailsAsync(decimal ClaimId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var payment = _context.TblPayment.SingleOrDefault(x => x.ClaimId == ClaimId);

            var status = (from a in _context.TblClaims.Where(x => x.ClaimId == ClaimId)
                          join c in _context.TblmasCmcommonTypes on a.ClaimStatusId equals c.CommonTypeId
                          select c).FirstOrDefault();

            Dictionary<object, object> finaldata = new Dictionary<object, object>();

            List<object> FullfinalData = new List<object>();

            finaldata.Add("UTR No", payment.Utrno);
            finaldata.Add("Created Date", payment.CreatedDate);
            finaldata.Add("Payment Status", payment.PaymentStatus);
            finaldata.Add("Payment Date", payment.PaymentDate);
            finaldata.Add("Payment Amount", payment.PaymentAmount);

            foreach (var item in finaldata)
            {
                List<object> data = new List<object>();

                data.Add(item.Key);
                data.Add(item.Value);

                FullfinalData.Add(data);

            }

            return FullfinalData;

        }

        public async Task<List<object>> ClaimEnquiryAsync(decimal ClaimId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var DATA = _context.TblClaims.SingleOrDefault(x => x.ClaimId == ClaimId);

            var bank = _context.TblBankAccounts.SingleOrDefault(x => x.ClaimId == ClaimId);

            var insurable = _context.TblClaimInsurable.Where(x => x.ClaimId == ClaimId).ToList();

            var doc = _context.TblClaimdoc.Where(x => x.ClaimId == ClaimId);
            var status = (from a in _context.TblClaims.Where(x => x.ClaimId == ClaimId)
                          join c in _context.TblmasCmcommonTypes on a.ClaimStatusId equals c.CommonTypeId
                          select c).FirstOrDefault();

            Dictionary<object, object> finaldata = new Dictionary<object, object>();

            List<object> finalData = new List<object>();

            List<object> FullfinalData = new List<object>();

            finaldata.Add("Loss Date", DATA.LossDateTime);
            finaldata.Add("Location Of Event", DATA.LocationOfEvent);
            finaldata.Add("Loss Description", DATA.LossOfDescription);
            // finaldata.Add("Created Date", DATA.CreatedDate);

            finaldata.Add("Total Claim Amount", DATA.ClaimAmount);
            finaldata.Add("Total Approved Amount", DATA.ApprovedClaimAmount);
            finaldata.Add("Account Holder Name", bank.AccountHolderName);
            finaldata.Add("Account Number", bank.AccountNumber);
            finaldata.Add("Bank Name", bank.BankName);
            finaldata.Add("Bank IFSC", bank.Ifsccode);

            finaldata.Add("Bank Branch Address", bank.BankBranchAddress);

            finaldata.Add("Claim Status", status.Value);
            finaldata.Add("Claim Manager Remarks", DATA.ClaimManagerRemarks);

            foreach (var item in finaldata)
            {
                List<object> data = new List<object>();

                data.Add(item.Key);
                data.Add(item.Value);

                finalData.Add(data);

            }

            FullfinalData.Add(finalData);
            FullfinalData.Add(insurable);

            return FullfinalData;

        }

        public async Task<List<object>> BankDetailsAsync(decimal ClaimId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var bank = _context.TblBankAccounts.SingleOrDefault(x => x.ClaimId == ClaimId);

            // JObject json = JObject.Parse(DATA.ToString());

            Dictionary<object, object> finaldata = new Dictionary<object, object>();
            //List<object> finaldata = new List<object>();
            List<object> FullfinalData = new List<object>();
            finaldata.Add("Bank Name", bank.BankName);
            finaldata.Add("Bank Branch Address", bank.BankBranchAddress);
            finaldata.Add("Account Holder Name", bank.AccountHolderName);
            finaldata.Add("Account Number", bank.AccountNumber);
            finaldata.Add("Bank Ifsccode", bank.Ifsccode);

            foreach (var item in finaldata)
            {
                List<object> data = new List<object>();

                data.Add(item.Key);
                data.Add(item.Value);

                FullfinalData.Add(data);
            }
            return FullfinalData;
        }

        public async Task<List<object>> ClaimStatusAsync(decimal ClaimId, decimal statusId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var DATA = _context.TblClaimTransaction.Where(x => x.ClaimId == ClaimId && x.StatusId == statusId).Select(x => new { x.ApprovedAmount, x.Remark }).ToList();

            // JObject json = JObject.Parse(DATA.ToString());

            // Dictionary<object, object> finaldata = new Dictionary<object, object>();
            List<object> finaldata = new List<object>(DATA);
            //foreach (var item in DATA)
            //{
            //    List<object> data = new List<object>();
            //    data.Add(item.Key);
            //    data.Add(item.Value);

            //    finaldata.Add(data);

            //}

            return finaldata;

        }

        private string ClaimBankSave(ClaimsDTO claims)
        {
            //var policydata = await _integrationService.GetPolicyByNumberAsync(claims.PolicyNumber);

            var ClaimId = _context.TblClaims.Where(x => x.ClaimNumber == claims.ClaimNumber).Select(x => x.ClaimId);


            BankAccountsDTO BankDTO = new BankAccountsDTO();

            BankDTO.AccountHolderName = claims.TblBankAccounts.First().AccountHolderName;
            BankDTO.AccountNumber = claims.TblBankAccounts.First().AccountNumber;
            BankDTO.BankName = claims.TblBankAccounts.First().BankName;
            BankDTO.BankBranchAddress = claims.TblBankAccounts.First().BankBranchAddress;
            BankDTO.Ifsccode = claims.TblBankAccounts.First().Ifsccode;
            //BankDTO.CreatedBy = apiContext.UserId;
            BankDTO.CreatedDate = DateTime.Now;
            BankDTO.ClaimId = Int32.Parse(ClaimId.ToString());

            var BankData = _mapper.Map<TblBankAccounts>(BankDTO);

            _context.TblBankAccounts.Add(BankData);
            _context.SaveChanges();

            return "Sucess";
        }

        public async Task<IEnumerable<SearchDTO>> SearchClaim(SearchClaimDTO searchclaim, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var _claims = _context.TblClaims.OrderByDescending(p => p.CreatedDate).Select(x => x);
            var _policydata = await _integrationService.GetPolicyByNumber(searchclaim.PolicyNo, apiContext);

            SearchDTO policyId = new SearchDTO();

            policyId.InsuredReference = searchclaim.InsuredReference;
            policyId.PolicyNo = searchclaim.PolicyNo;
            policyId.InsuredMobileNo = searchclaim.InsuredMobileNo;
            policyId.InsuredEmail = searchclaim.InsuredEmail;


            PolicysearchDTO sdto = new PolicysearchDTO();
            sdto.Policynumber = searchclaim.PolicyNo;
            sdto.Insuredreference = searchclaim.InsuredReference;
            sdto.MobileNumber = searchclaim.InsuredMobileNo;
            sdto.Email = searchclaim.InsuredEmail;
            var policyDetails = await _integrationService.PolicySearch(sdto, apiContext);

           // var _policy = await _integrationService.GetPolicyDetails(apiContext);

            if (!string.IsNullOrEmpty(searchclaim.PolicyNo))
            {
                _claims = _claims.Where(x => x.PolicyId == _policydata.PolicyId);
            }

            if (!string.IsNullOrEmpty(searchclaim.InsuredReference))
            {
                //var policyID = policyDetails.FirstOrDefault(x => x.CustomerId == searchclaim.InsuredReference).PolicyId;
                //_claims = _claims.Where(x => x.PolicyId == policyID);
                var policyIdDetails = policyDetails.Select(p => p.PolicyId);
                _claims = _claims.Where(x => policyIdDetails.Contains((decimal)x.PolicyId));


            }

            if (!string.IsNullOrEmpty(searchclaim.InsuredMobileNo))
            {
                //var policyID = policyDetails.FirstOrDefault(x => x.MobileNumber == searchclaim.InsuredMobileNo).PolicyId;
                //_claims = _claims.Where(x => x.PolicyId == policyID);
                var policyIdDetails = policyDetails.Select(p => p.PolicyId);
                _claims = _claims.Where(x => policyIdDetails.Contains((decimal)x.PolicyId));

            }

            if (!string.IsNullOrEmpty(searchclaim.InsuredEmail))
            {
                //var policyID = policyDetails.FirstOrDefault(x => x.Email == searchclaim.InsuredEmail).PolicyId;
                //_claims = _claims.Where(x => x.PolicyId == policyID);
                var policyIdDetails = policyDetails.Select(p => p.PolicyId);
                _claims = _claims.Where(x => policyIdDetails.Contains((decimal)x.PolicyId));
            }

            if (searchclaim.EventDate != null)
            {
                //var policyID = policyDetails.FirstOrDefault(x => x.CreatedDate.Equals(searchclaim.EventDate)).PolicyId;
                //_claims = _claims.Where(x => x.PolicyId == policyID);
                var policyIdDetails = policyDetails.Select(p => p.PolicyId);
                _claims = _claims.Where(x => policyIdDetails.Contains((decimal)x.PolicyId));
            }

            if (searchclaim.lossDateTime != null)
            {
                _claims = _claims.Where(x => x.LossDateTime == searchclaim.lossDateTime);
            }

            if (searchclaim.ClaimStatusId > 0)
            {
                _claims = _claims.Where(p => p.ClaimStatusId == searchclaim.ClaimStatusId);
            }

            if (!string.IsNullOrEmpty(searchclaim.ClaimNumber))
            {
                _claims = _claims.Where(p => p.ClaimNumber.Contains(searchclaim.ClaimNumber));
            }

            //  var _ClaimSearchData = _mapper.Map<SearchDTO>(_claims.OrderByDescending(p => p.CreatedDate).Select(x => x).FirstOrDefault());

            var _ClaimSearchData = _mapper.Map<List<SearchDTO>>(_claims);

            List<SearchDTO> claimlist = new List<SearchDTO>();
            foreach (var item in _ClaimSearchData)
            {
                try
                {
                    var pk = policyDetails.Where(s => s.PolicyId == item.PolicyId).ToList();
                    var data = (from a in _context.TblClaims.Where(x => x.ClaimId == item.ClaimId)
                                join c in _context.TblmasCmcommonTypes on a.ClaimStatusId equals c.CommonTypeId
                                select c).FirstOrDefault();

                    item.ClaimStatus = data.Value;
                    item.PolicyNo = pk[0].PolicyNo;
                    item.InsuredReference = pk[0].CustomerId;
                    item.InsuredName = pk[0].CoverNoteNo;
                    item.CoverEvent = pk[0].CoverEvent;
                    item.CoverName = pk[0].CoverName;
                    item.EventDate = pk[0].CreatedDate;
                    item.InsuredEmail = pk[0].Email;
                    item.InsuredMobileNo = pk[0].MobileNumber;

                }
                catch (Exception ex) { }
            }

            return _ClaimSearchData;
        }

        public async Task<ClaimsDTO> ModifyActive(ClaimsActive claims, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            ClaimsDTO claimsDTO = new ClaimsDTO();
            foreach (var item in claims.ClaimNumber)
            {
                var claimsactive = _context.TblClaims.FirstOrDefault(x => x.ClaimNumber == Convert.ToString(item));
                claimsactive.Active = false;
                _context.Update(claimsactive);
            }
            _context.SaveChanges();
            var _claims = _mapper.Map<ClaimsDTO>(claimsDTO);
            return _claims;
        }

        public async Task<List<object>> GetClaimsByProductPartner(PolicySearchbyPidDTO policySearchby, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            int totalcount;
            int totalapprovedcount;
            int totalsettledcount;
            int totalrejectcount;
            int totalincompletecount;
            int? totalamount = 0;
            int? approvedamount = 0;
            int? settledamount = 0;
            int? rejectamount = 0;
            int? incompleteamount = 0;

            List<object> FinalApproved = new List<object>();
            List<object> FinalSettled = new List<object>();
            List<object> FinalReject = new List<object>();
            List<object> FinalAmount = new List<object>();
            List<object> FinalIncomplete = new List<object>();

            List<object> CHeader = new List<object>();
            List<object> AHeader = new List<object>();

            List<object> Claimdetails = new List<object>();
            List<object> RegisteredCount = new List<object>();
            List<object> ApprovedCount = new List<object>();
            List<object> SettledCount = new List<object>();
            List<object> RejectedCount = new List<object>();
            List<object> IncompleteCount = new List<object>();

            List<object> Count = new List<object>();
            List<object> Amount = new List<object>();

            var policyDetails = await _integrationService.GetPolicyByDetails(policySearchby, apiContext);

            var lstPolicy = policyDetails.ToList().Select(p => p).ToList();

            var claimdata = _context.TblClaims.Select(x => x).Where(c => lstPolicy.Contains((decimal)c.PolicyId)).ToList();
            //var claimdata = _context.TblClaims.Select(x => x).ToList();

            List<ClaimDashboard> claimsdata = new List<ClaimDashboard>();

            var ApprovedStatusID = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.Value == "Approved");


            IQueryable<ClaimStatusDTO> ClaimsData;


            if (apiContext.OrgId > 0 && apiContext.PartnerId > 0)
            {

                ClaimsData = _context.TblClaims.Include(x => x.ClaimStatus).Where(x => x.OrganizationId == apiContext.OrgId && x.PartnerId == apiContext.PartnerId && x.ClaimStatus.CommonTypeId == ApprovedStatusID.CommonTypeId && lstPolicy.Contains((decimal)x.PolicyId)).OrderByDescending(x => x.ClaimId)
                                                .Select(x => new ClaimStatusDTO
                                                {
                                                    ClaimId = x.ClaimId,
                                                    ClaimAmount = x.ClaimAmount,
                                                    ClaimStatus = x.ClaimStatus.Value,
                                                });
            }
            else if (apiContext.OrgId > 0)
            {
                ClaimsData = _context.TblClaims.Include(x => x.ClaimStatus).Where(x => x.OrganizationId == apiContext.OrgId && x.ClaimStatus.CommonTypeId == ApprovedStatusID.CommonTypeId && lstPolicy.Contains((decimal)x.PolicyId)).OrderByDescending(x => x.ClaimId)
                                .Select(x => new ClaimStatusDTO
                                {
                                    ClaimId = x.ClaimId,
                                    ClaimAmount = x.ClaimAmount,
                                    ClaimStatus = x.ClaimStatus.Value,
                                });


            }
            else
            {
                ClaimsData = _context.TblClaims.Include(x => x.ClaimStatus).Where(x => x.ClaimStatus.CommonTypeId == ApprovedStatusID.CommonTypeId && lstPolicy.Contains((decimal)x.PolicyId)).OrderByDescending(x => x.ClaimId)
                                .Select(x => new ClaimStatusDTO
                                {
                                    ClaimId = x.ClaimId,
                                    ClaimAmount = x.ClaimAmount,
                                    ClaimStatus = x.ClaimStatus.Value,
                                });

            }


            var PaymentData = _context.TblPayment.Select(x => x);

            Dictionary<decimal, string> ClaimStatus = new Dictionary<decimal, string>();

            foreach (var item in ClaimsData)
            {
                ClaimStatus.Add(item.ClaimId, item.ClaimNumber);
            }

            foreach (var item in ClaimsData)
            {
                var claimstatusvalue = item.ClaimStatus;

                var ClaimData = claimdata.Where(x => x.ClaimId == item.ClaimId).ToList();
                var ApprovedPaymentData = PaymentData.Where(x => x.ClaimId == item.ClaimId).ToList();

                ClaimDashboard claim = new ClaimDashboard();

                foreach (var itemi in ClaimData)
                {
                    claim.ClaimId = itemi.ClaimId;
                    claim.ClaimAmount = itemi.ClaimAmount;
                }

                foreach (var itemj in ApprovedPaymentData)
                {
                    claim.PaymentStatus = itemj.PaymentStatus;
                }
                claimsdata.Add(claim);
            }

            var RejectedStatusID = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.Value == "Rejected");
            var IntimateStatusID = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.Value == "Intimated");
            var IncompleteStatusID = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.Value == "Incomplete");

            var amount = claimdata.Where(x => x.ClaimAmount != null).ToList();

            var approved = claimdata.Where(x => x.ClaimStatusId == ApprovedStatusID.CommonTypeId).ToList();
            var intimate = claimdata.Where(x => x.ClaimStatusId == IntimateStatusID.CommonTypeId).ToList();
            var settled = claimsdata.Where(x => x.PaymentStatus == "Settled").ToList();
            var reject = claimdata.Where(x => x.ClaimStatusId == RejectedStatusID.CommonTypeId).ToList();
            var incomplete = claimdata.Where(x => x.ClaimStatusId == IncompleteStatusID.CommonTypeId).ToList();

            CHeader.Add("Claim Count");
            CHeader.Add("Count");

            Count.Add(CHeader);

            AHeader.Add("Claim Amount");
            AHeader.Add("Count");

            Amount.Add(AHeader);

            List<object> Finallist = new List<object>();

            foreach (var item in approved)
            {
                approvedamount = approvedamount + item.ClaimAmount;
            }
            totalapprovedcount = approved.Count();

            FinalApproved.Add("Approved amount= Rs." + approvedamount);
            FinalApproved.Add(approvedamount);

            ApprovedCount.Add("Approved");
            ApprovedCount.Add(totalapprovedcount);

            foreach (var item in settled)
            {
                settledamount = settledamount + item.ClaimAmount;
            }
            totalsettledcount = settled.Count();

            FinalSettled.Add("Settled Amount: Rs." + settledamount);
            FinalSettled.Add(settledamount);

            SettledCount.Add("Settled");
            SettledCount.Add(totalsettledcount);

            foreach (var item in reject)
            {
                rejectamount = rejectamount + item.ClaimAmount;
            }
            totalrejectcount = reject.Count();

            FinalReject.Add("Rejected Amount: Rs." + rejectamount);
            FinalReject.Add(rejectamount);

            RejectedCount.Add("Rejected");
            RejectedCount.Add(totalrejectcount);

            foreach (var item in incomplete)
            {
                incompleteamount = incompleteamount + item.ClaimAmount;
            }

            totalincompletecount = incomplete.Count();

            FinalIncomplete.Add("Incomplete Amount: Rs." + incompleteamount);
            FinalIncomplete.Add(incompleteamount);

            IncompleteCount.Add("Incompleted");
            IncompleteCount.Add(totalincompletecount);

            foreach (var item in intimate)
            {
                totalamount = totalamount + item.ClaimAmount;
            }
            totalcount = intimate.Count();

            FinalAmount.Add("Intimated Amount: Rs." + totalamount);
            FinalAmount.Add(totalamount);

            RegisteredCount.Add("Intimated");
            RegisteredCount.Add(totalcount);

            List<object> Finalclaimdata = new List<object>();

            Count.Add(RegisteredCount);
            Count.Add(ApprovedCount);
            Count.Add(SettledCount);
            Count.Add(RejectedCount);
            Count.Add(IncompleteCount);

            Amount.Add(FinalAmount);
            Amount.Add(FinalApproved);
            Amount.Add(FinalSettled);
            Amount.Add(FinalReject);
            Amount.Add(FinalIncomplete);

            if (totalcount == 0 && totalapprovedcount == 0 &&
             totalsettledcount == 0 && totalrejectcount == 0 &&
             totalincompletecount == 0 && totalamount == 0 &&
             approvedamount == 0 && settledamount == 0 &&
             rejectamount == 0 && incompleteamount == 0)
            {
                int count = 0;
                int camount = 0;
                Finalclaimdata.Add(count);
                Finalclaimdata.Add(camount);

                return Finalclaimdata;
            }
            else
            {
                Finalclaimdata.Add(Count);
                Finalclaimdata.Add(Amount);
            }

            return Finalclaimdata;
        }

        public async Task<List<ClaimResponseDTO>> ClaimsReport(ClaimsRequest claimsRequest, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var _claimsdata = _context.TblClaims.OrderByDescending(x => x.CreatedDate).Select(x => x).ToList();

            var _historydata = _context.TblClaimHistory.OrderByDescending(x => x.CreatedDate).Select(x => x).ToList();

            var _bankdata = _context.TblBankAccounts.Select(x => x).ToList();

            var status = _context.TblmasCmcommonTypes.Select(x => x).ToList();

            List<ClaimResponseDTO> ListReport = new List<ClaimResponseDTO>();

            var _policy = await _integrationService.GetPolicyDetails(apiContext);

            


            // var statusid = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.CommonTypeId == claimsRequest.ClaimStatusId);

            //var filteredpolicy = _policy.Where(x => x.ProductIdPk == claimsRequest.ProductID);

            // var list = ListReport.Where(x => x.ClaimStatusId != 0).ToList();
            if (claimsRequest.ClaimStatusId > 0)
            {
                _claimsdata = _claimsdata.Where(x => x.ClaimStatusId == claimsRequest.ClaimStatusId).ToList();
                _historydata = _historydata.Where(x => x.ClaimStatusId == claimsRequest.ClaimStatusId).ToList();
            }
            if (claimsRequest.ClaimFromDate != null && claimsRequest.ClaimToDate != null)
            {
                _claimsdata = _claimsdata.Where(x => x.CreatedDate >= claimsRequest.ClaimFromDate && x.CreatedDate <= claimsRequest.ClaimToDate).ToList();
                _historydata = _historydata.Where(x => x.CreatedDate >= claimsRequest.ClaimFromDate && x.CreatedDate <= claimsRequest.ClaimToDate).ToList();
            }

            if (claimsRequest.lossDateTime != null)
            {
                _claimsdata = _claimsdata.Where(x => x.LossDateTime.Equals(claimsRequest.lossDateTime)).ToList();
                _historydata = _historydata.Where(x => x.LossDateTime.Equals(claimsRequest.lossDateTime)).ToList();
                // _claims = _claims.Where(x => x.LossDateTime.Equals(searchclaim.lossDateTime));
            }
            if (claimsRequest.PartnerId > 0)
            {
                PolicysearchDTO policysearchdto = new PolicysearchDTO();
                policysearchdto.PartnerId = claimsRequest.PartnerId.ToString();
                var policyDetails = await _integrationService.PolicySearch(policysearchdto, apiContext);
                var policyIdDetails = policyDetails.Select(p => p.PolicyId).ToList();
                _claimsdata = _claimsdata.Where(x => policyIdDetails.Contains((decimal)x.PolicyId)).ToList();
                _historydata = _historydata.Where(x => policyIdDetails.Contains((decimal)x.PolicyId)).ToList();

            }
            if (claimsRequest.ProductId > 0)
            {
                PolicysearchDTO policysearchdto = new PolicysearchDTO();
                policysearchdto.ProductId = claimsRequest.ProductId.ToString();
                var policyDetails = await _integrationService.PolicySearch(policysearchdto, apiContext);
                var policyIdDetails = policyDetails.Select(p => p.PolicyId).ToList();
                _claimsdata = _claimsdata.Where(x => policyIdDetails.Contains((decimal)x.PolicyId)).ToList();
                _historydata = _historydata.Where(x => policyIdDetails.Contains((decimal)x.PolicyId)).ToList();
            }


            var _claims = _claimsdata.Select(x => x.ClaimId);
            var _claimsHistorydata = _context.TblClaims.Where(c => _claims.Contains(c.ClaimId)).Select(x => x).ToList();

            var _history = _historydata.Select(x => x.ClaimId);
            var _historyClaimdata = _context.TblClaimHistory.Where(c => _history.Contains(c.ClaimId)).Select(x => x).ToList();

            


            ClaimResponseDTO claimResponseDTO = null;

            var StatusId = status.Select(x => x.CommonTypeId);
            var StatusName = status.Select(x => x.Value);
            Dictionary<int, string> statusdata = new Dictionary<int, string>();
            //  List<int>  = new List<int>();
            List<string> productname = new List<string>();
            var claimStaus = _context.TblmasCmcommonTypes.Select(x => new { x.CommonTypeId, x.Value });
            foreach (var item in _claimsdata)
            {

                claimResponseDTO = new ClaimResponseDTO();
                claimResponseDTO.ClaimId = item.ClaimId;
                claimResponseDTO.ClaimNumber = item.ClaimNumber;
                claimResponseDTO.lossDateTime = item.LossDateTime;
                claimResponseDTO.CreatedDate = item.CreatedDate;
                claimResponseDTO.PolicyNo = item.PolicyNo;
                claimResponseDTO.ClaimcurrStatus = claimStaus.FirstOrDefault(x => x.CommonTypeId == item.ClaimStatusId).Value;
                claimResponseDTO.AccountHolderName = _context.TblBankAccounts.FirstOrDefault(x => x.ClaimId == item.ClaimId).AccountHolderName;

                ListReport.Add(claimResponseDTO);
            }
            foreach (var item in _historydata)
            {
                // var statusId = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.CommonTypeId == itemh.ClaimStatusId);
                //claimResponseDTO.ClaimId = itemh.ClaimId;
                //claimResponseDTO.ClaimcurrStatus = statusId.Value;
                claimResponseDTO = new ClaimResponseDTO();
                claimResponseDTO.ClaimId = item.ClaimId;
                claimResponseDTO.ClaimNumber = item.ClaimNumber;
                claimResponseDTO.lossDateTime = item.LossDateTime;
                claimResponseDTO.CreatedDate = item.CreatedDate;
                claimResponseDTO.PolicyNo = item.PolicyNo;
                //var statusId = _context.TblClaims.FirstOrDefault(x => x.ClaimId == item.ClaimId).ClaimStatusId;
                claimResponseDTO.ClaimcurrStatus = claimStaus.FirstOrDefault(x => x.CommonTypeId == item.ClaimStatusId).Value;
                //claimResponseDTO.AccountHolderName = _context.TblBankAccounts.FirstOrDefault(x => x.ClaimId == item.ClaimId).AccountHolderName;
                //  ListReport.Add(claimResponseDTO);
            }


            //foreach(var itemb in bankdata)
            //{
            //    claimResponseDTO = new ClaimResponseDTO();
            //    claimResponseDTO.AccountHolderName = itemb.AccountHolderName;
            //    ListReport.Add(claimResponseDTO);
            //}

            //foreach (var itemp in _policy)
            //{
            //    claimResponseDTO = new ClaimResponseDTO();
            //    claimResponseDTO.PolicyId = itemp.PolicyId;
            //    claimResponseDTO.PolicyNo = itemp.PolicyNo;
            //    ListReport.Add(claimResponseDTO);
            //}



            var _list = _mapper.Map<List<ClaimResponseDTO>>(ListReport);

            return _list;
        }

        //view the uploaded document
        public async Task<IEnumerable<ClaimdocDTO>> DocumentView(decimal ClaimId, bool isDoc, ApiContext apiContext)

        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tblClaimDoc = _context.TblClaimdoc.Where(s => s.ClaimId == ClaimId).ToList();
            if (tblClaimDoc != null)
            {
                var claimDocDTO = _mapper.Map<IEnumerable<ClaimdocDTO>>(tblClaimDoc);
                if (!isDoc)
                {
                    foreach (var item in claimDocDTO)
                    {
                        item.Document = null;
                    }
                }
                return claimDocDTO;
            }
            return null;
        }

        public async Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            //int result = GetActiveResult();
            //if (result == 1)
            //{
            var files = httpRequest.Form.Files;
            //var docId = GetActiveResult(file.Name); HttpRequest
            DataTable dt = new DataTable();
            foreach (var file in files)
            {
                var filename = file.Name;
                var tblbankdoc = await GetDocumentId(file.Name, apiContext);

                if (file == null || file.Length <= 0)
                {
                    return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                }
                if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx file" };
                }

                //dt.Columns.Add("BankFileId", typeof(int));
                dt.Columns.Add("PolicyNo", typeof(string));
                dt.Columns.Add("ClaimNo", typeof(string));
                dt.Columns.Add("ClaimStatus", typeof(string));
                dt.Columns.Add("InsuredName", typeof(string));
                dt.Columns.Add("InsuredRefNo", typeof(string));
                dt.Columns.Add("BankAccountHolderName", typeof(string));
                dt.Columns.Add("BankName", typeof(string));
                dt.Columns.Add("BankAccountNumber", typeof(string));
                dt.Columns.Add("BankBranchAddress", typeof(string));
                dt.Columns.Add("BankIFSCCode", typeof(string));
                dt.Columns.Add("Amount", typeof(string));
                dt.Columns.Add("UTRNo", typeof(string));
                dt.Columns.Add("PaymentStatus", typeof(string));
                dt.Columns.Add("PaymentDate", typeof(string));
                dt.Columns.Add("Active", typeof(int));
                dt.Columns.Add("CreatedBy", typeof(string));
                dt.Columns.Add("BankDocId", typeof(string));

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream, cancellationToken);
                    try
                    {
                        using (var package = new ExcelPackage(stream))
                        {
                            ExcelWorksheet worksheet = package.Workbook.Worksheets["Claim"];
                            if (worksheet != null)
                            {
                                var rowCount = worksheet.Dimension.Rows;

                                for (int row = 2; row <= rowCount; row++)
                                {
                                    DataRow dr = dt.NewRow();
                                    //dr["BankFileId"] = int.Parse(worksheet.Cells[row, 1].Value.ToString().Trim());
                                    dr["PolicyNo"] = worksheet.Cells[row, 2].Value.ToString().Trim();
                                    dr["ClaimNo"] = worksheet.Cells[row, 3].Value.ToString().Trim();
                                    dr["ClaimStatus"] = worksheet.Cells[row, 4].Value.ToString().Trim();
                                    dr["InsuredName"] = worksheet.Cells[row, 5].Value.ToString().Trim();
                                    dr["InsuredRefNo"] = worksheet.Cells[row, 6].Value.ToString().Trim();
                                    dr["BankAccountHolderName"] = worksheet.Cells[row, 7].Value.ToString().Trim();
                                    dr["BankName"] = worksheet.Cells[row, 8].Value.ToString().Trim();
                                    dr["BankAccountNumber"] = worksheet.Cells[row, 9].Value.ToString().Trim();
                                    dr["BankBranchAddress"] = worksheet.Cells[row, 10].Value.ToString().Trim();
                                    dr["BankIFSCCode"] = worksheet.Cells[row, 11].Value.ToString().Trim();
                                    dr["Amount"] = Convert.ToDecimal(worksheet.Cells[row, 12].Value.ToString().Trim());
                                    if (!string.IsNullOrEmpty(worksheet.Cells[row, 13].Value.ToString().Trim()) || worksheet.Cells[row, 13].Value.ToString().Trim() == null)
                                    {
                                        dr["UTRNo"] = worksheet.Cells[row, 13].Value.ToString().Trim();
                                    }
                                    if (!string.IsNullOrEmpty(worksheet.Cells[row, 14].Value.ToString().Trim()) || worksheet.Cells[row, 14].Value.ToString().Trim() == null)
                                    {
                                        dr["PaymentStatus"] = worksheet.Cells[row, 14].Value.ToString().Trim();
                                    }
                                    if (!string.IsNullOrEmpty(worksheet.Cells[row, 15].Value.ToString()) || worksheet.Cells[row, 15].Value.ToString() == null)
                                    {
                                        //DateTime date = DateTime.FromOADate(Convert.ToDouble(worksheet.Cells[row, 15].Value));
                                        //DateTime date = Convert.ToDateTime(Convert.ToDouble(worksheet.Cells[row, 15].Value.ToString()));
                                        dr["PaymentDate"] = worksheet.Cells[row, 15].Value;
                                    }
                                    dr["Active"] = worksheet.Cells[row, 16].Value;
                                    dr["CreatedBy"] = worksheet.Cells[row, 17].Value.ToString().Trim();
                                    dr["BankDocId"] = tblbankdoc.BankDocId;

                                    dt.Rows.Add(dr);
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        var error = ex.ToString();
                        return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                    }
                }
            }
            try
            {
                // add list to db ..
                // here just read and return
                string connetionString = await _integrationService.GetEnvironmentConnectionforDoc(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
                using (var bulkCopy = new SqlBulkCopy(connetionString, SqlBulkCopyOptions.KeepIdentity))
                {
                    // my DataTable column names match my SQL Column names, so I simply made this loop. However if your column names don't match, just pass in which datatable name matches the SQL column name in Column Mappings
                    foreach (DataColumn col in dt.Columns)
                    {
                        bulkCopy.ColumnMappings.Add(col.ColumnName, col.ColumnName);
                    }
                    bulkCopy.BulkCopyTimeout = 600;
                    bulkCopy.DestinationTableName = "[CM].[tblBankFile]";
                    bulkCopy.WriteToServer(dt);
                    await UpdateBankfileAsync(apiContext);
                }
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                //return DemoResponse<List<BankFileDTO>>.GetResult(-1, error);
            }
            return new DocumentResponse { Status = BusinessStatus.Ok, ResponseMessage = $"Document uploaded succefully!" };
            //return DemoResponse<List<BankFileDTO>>.GetResult(0, "OK", list);
            //}
            //return DemoResponse<List<BankFileDTO>>.GetResult(2, "Data still processing");
        }

        private async Task<int> UpdateBankfileAsync(ApiContext apiContext)
        {
            //  _context = (MICAPOContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            int res = 0;
            var connectionString = await _integrationService.GetEnvironmentConnectionforDoc(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("CM.usp_ClaimsFinanceProcesNew", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.CommandTimeout = 3600;
                res = command.ExecuteNonQuery();
                connection.Close();
            }
            return res;
        }
    }
}