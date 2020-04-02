using AutoMapper;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Helpers;
using iNube.Services.Policy.Models;
using iNube.Services.UserManagement.Helpers;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.Policy.PolicyServices
{

    public class MicaPolicyService : IPolicyProductService
    {
        public IIntegrationService _integrationService;
        private MICAPOContext _context;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public DbHelper dbHelper;
    
        public MicaPolicyService(MICAPOContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            _emailService = emailService;
            dbHelper = new DbHelper(new IntegrationService(configuration));
           
        }

        //Fetching Properties
        private static PropertyInfo[] GetProperties(object obj)
        {
            return obj.GetType().GetProperties();
        }
        public async Task<String> AccountMap(ApiContext apiContext, object policyDetail, object productDetails, object partnerDetails)
        {
            // FOR ACCOUNT MAPPING TRANSACTION
            //var status = AccountingTransactionResponse(apiContext);
            //TO Get the Details of PolicyUpdate as Status
            try
            {
                var Responce = "";
                //var accountMapList = await _integrationService.GetAccountMapAsync(apiContext);
                var accountMapDetailsList = await _integrationService.GetAccountMapDetailsAsync(apiContext);
                TransactionHeaderDto transactionHeaderObj = new TransactionHeaderDto();
                List<TransactionDto> transactiondtObj = new List<TransactionDto>();
                List<TransactionSubLedgerDto> transactionLedgerObj = new List<TransactionSubLedgerDto>();

                string dateTime = DateTime.Now.ToString();
                string createddate = Convert.ToDateTime(dateTime).ToString("yyyy-MM-dd hh:mm tt");
                DateTime date = DateTime.ParseExact(createddate, "yyyy-MM-dd hh:mm tt", CultureInfo.InvariantCulture);
                //Storing All Transaction Header Value
                foreach (var accountMap in accountMapDetailsList)
                {
                    var accountproperties = GetProperties(policyDetail);
                    if (accountMap.Object == "Policy" && accountMap.Event == "Creation")
                    {
                        if (transactionHeaderObj.TransactionRuleMappingId != accountMap.TransactionRuleMappingId)
                        {
                            transactionHeaderObj.TransactionRuleMappingId = accountMap.TransactionRuleMappingId;
                            transactionHeaderObj.RuleName = accountMap.RuleName;
                            transactionHeaderObj.IsActive = "Y";
                            transactionHeaderObj.CreatedDate = date;
                        }
                    }
                }
                //Storing all TransactionConditions Value
                foreach (var accountMapCd in accountMapDetailsList)
                {
                    foreach (var accountMap in accountMapCd.TransactionConditions)
                    {
                        var accountproperties = GetProperties(policyDetail);
                        if (accountMapCd.Object == "Policy" && accountMapCd.Event == "Creation")
                        {
                            TransactionDto transactionDto = new TransactionDto();
                            foreach (var actnProp in accountproperties)
                            {
                                var currency = policyDetail.GetType().GetProperty("Currency").GetValue(policyDetail, null);
                                var sumInsured = policyDetail.GetType().GetProperty("PremiumAmount").GetValue(policyDetail, null);
                                transactionDto.TypeOfTransaction = accountMap.TypeofTransaction;
                                if (accountMap.TypeofTransaction == "Credit")
                                {
                                    if (accountMap.AccountName == "PremiumHoldingAccount" || accountMap.AccountName == "Premium Holding Account")
                                    {
                                        transactionDto.Amount = Convert.ToDecimal(sumInsured);
                                    }
                                    else
                                    {
                                        transactionDto.Amount = Convert.ToDecimal(sumInsured);
                                    }
                                }
                                if (accountMap.TypeofTransaction == "Debit")
                                {
                                    if (accountMap.AccountName == "CashDepositAccount" || accountMap.AccountName == "Cash Deposit Account")
                                    {
                                        transactionDto.Amount = Convert.ToDecimal(sumInsured);
                                    }
                                    else
                                    {
                                        transactionDto.Amount = Convert.ToDecimal(sumInsured);
                                    }
                                }
                                //transactionDto.Amount = (decimal)sumInsured;
                                transactionDto.Description = accountMap.Description;
                                transactionDto.IsActive = "Y";
                                if (currency == null)
                                {
                                    transactionDto.Currency = "INR";
                                }
                                else
                                {
                                    transactionDto.Currency = Convert.ToString(currency);
                                }
                                transactionDto.CreatedDate = accountMap.CreatedDate;
                                transactionDto.RuleName = accountMapCd.RuleName;
                                transactionDto.Object = accountMapCd.Object;
                                transactionDto.Event = accountMapCd.Event;
                                transactionDto.AccountType = accountMap.AccountType;
                                transactionDto.Value = accountMap.Value;
                                transactionDto.AccountCode = accountMap.AccountCode;
                                //Addition of Partner Id and Product Id
                                if (productDetails.GetType().GetProperty("PartnerId") != null && partnerDetails != null)
                                {
                                    var partnerId = partnerDetails.GetType().GetProperty("PartnerId").GetValue(partnerDetails, null);
                                    transactionDto.PartnerId = Convert.ToDecimal(partnerId);
                                }
                                else
                                {
                                    transactionDto.PartnerId = apiContext.PartnerId;
                                }
                                if (productDetails.GetType().GetProperty("OrganizationId") != null)
                                {
                                    var orgId = productDetails.GetType().GetProperty("OrganizationId").GetValue(productDetails, null);
                                    transactionDto.OrganizationId = Convert.ToDecimal(orgId);
                                }
                                else
                                {
                                    transactionDto.OrganizationId = apiContext.OrgId;
                                }
                                if (productDetails.GetType().GetProperty("ProductId") != null)
                                {
                                    var productId = productDetails.GetType().GetProperty("ProductId").GetValue(productDetails, null);
                                    transactionDto.ProductId = Convert.ToDecimal(productId);
                                }
                                else
                                {
                                    transactionDto.ProductId = 0;
                                }
                            }
                            transactiondtObj.Add(transactionDto);
                        }
                    }
                }
                transactionHeaderObj.Transaction.AddRange(transactiondtObj);
                //Storing Ledger Value 
                foreach (var accountMapSl in accountMapDetailsList)
                {
                    foreach (var accountMap in accountMapSl.SubLedgerReferences)
                    {
                        TransactionSubLedgerDto transSubLedger = new TransactionSubLedgerDto();
                        var accountproperties = GetProperties(policyDetail);
                        if (accountMapSl.Object == "Policy" && accountMapSl.Event == "Creation")
                        {
                            foreach (var actnProp in accountproperties)
                            {
                                transSubLedger.SubLedgerReferencesId = accountMap.SubLedgerReferencesId;
                                if (accountMap.LedgerObject == "Policy")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "Amount")
                                    {
                                        ledgerColName = "PremiumAmount";
                                    }
                                    if (ledgerColName == "PolicyNumber")
                                    {
                                        ledgerColName = "PolicyNo";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductCode";
                                        if (productDetails.GetType().GetProperty(ledgerColName) != null)
                                        {
                                            var ledgerColValue = productDetails.GetType().GetProperty(ledgerColName).GetValue(productDetails, null);
                                            transSubLedger.Value = Convert.ToString(ledgerColValue);
                                        }
                                    }
                                    if (ledgerColName == "LOB")
                                    {
                                        ledgerColName = "LOB1";
                                        if (productDetails.GetType().GetProperty(ledgerColName) != null)
                                        {
                                            var ledgerColValue = productDetails.GetType().GetProperty(ledgerColName).GetValue(productDetails, null);
                                            transSubLedger.Value = Convert.ToString(ledgerColValue);
                                        }
                                    }
                                    if (policyDetail.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = policyDetail.GetType().GetProperty(ledgerColName).GetValue(policyDetail, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                if (accountMap.LedgerObject == "Product")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (productDetails.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = productDetails.GetType().GetProperty(ledgerColName).GetValue(productDetails, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                if (accountMap.LedgerObject == "Claim")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (policyDetail.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = policyDetail.GetType().GetProperty(ledgerColName).GetValue(policyDetail, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                transSubLedger.IsActive = "Y";
                            }
                            transactionLedgerObj.Add(transSubLedger);
                        }
                    }
                }
                transactionHeaderObj.TransactionSubLedger.AddRange(transactionLedgerObj);

                var Sendtransaction = await _integrationService.CreateTranasactionAsync(transactionHeaderObj, apiContext);
                Responce = Sendtransaction.Status.ToString();


                return Responce;
            }
            catch (Exception ex)
            {

            }
            return null;
        }


        public async Task<PolicyResponse> CreatePolicy(dynamic policyDetail, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            List<ErrorInfo> Errors = new List<ErrorInfo>();

            decimal PolicyId = 0; string policyNumber = ""; decimal premiumAmount = 0;
            string logMsg = "";
            try
            {
                Errors = GetPolicyRequestValidation(policyDetail);
                if (Errors.Count > 0)
                {
                    return new PolicyResponse { Status = BusinessStatus.InputValidationFailed, Errors = Errors };
                }
                var productId = policyDetail["ProductID"].ToString();
                var partnerId = policyDetail["PartnerID"].ToString();

                var productDetails = await _integrationService.GetProductDetailAsync(productId, apiContext);
                if (productDetails.ProductId <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "ProductId", PropertyName = "ProductId", ErrorMessage = $"ProdcutId : {productId} Not Found" };
                    Errors.Add(errorInfo);
                    return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }
                string cover = "", coverEvent = "", productName = "";
                productName = productDetails.ProductName;
                foreach (var item in productDetails.ProductInsurableItems[0].ProductCovers)
                {
                    cover = item.Cover;
                    coverEvent = item.CoverEvent;
                }
                //cover=coverDetail.Cover; coverEvent = coverDetail.CoverEvent;
                logMsg = "1";
                var partnerDetails = await _integrationService.GetPartnerDetailAsync(partnerId, apiContext);
                if (partnerDetails.PartnerId <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PartnerID", PropertyName = "PartnerID", ErrorMessage = $"PartnerID : {productId} Not Found" };
                    Errors.Add(errorInfo);
                    return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }
                logMsg = logMsg + ",2";
                var policyRiskDetails = await _integrationService.GetRiskPolicyDetailAsync(productId, apiContext);
                if (policyRiskDetails.Count <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "RiskDetail", PropertyName = "RiskDetail", ErrorMessage = $"RiskDetail for product : {partnerId} Not Found" };
                    Errors.Add(errorInfo);
                    return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }
                logMsg = logMsg + ",3";
                var mappedPolicy = MapAndValidatePolicy(policyDetail, productDetails, partnerDetails, policyRiskDetails, Errors, apiContext, "PolicyNo");

                if (Errors.Count == 0)
                {
                  
                   DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

                    PolicyId = SavePolicyDetails(mappedPolicy, policyDetail, DatetimeNow);
                    logMsg = logMsg + ",4";
                    var Amount = productDetails.PremiumAmount;
                    policyNumber = mappedPolicy.PolicyNo;

                    var cdAccount = string.Concat(productId.ToString().PadLeft(5, '0'), "/" + partnerId.ToString().PadLeft(5, '0'));
                    PolicyBookingTransaction policyBookingTransaction = new PolicyBookingTransaction() { PartnerId = Convert.ToDecimal(partnerId), ProductId = Convert.ToDecimal(productId), AccountNo = cdAccount, PolicyNo = policyNumber, TxnAmount = Amount };
                    var transaction = await _integrationService.DoTransaction(policyBookingTransaction, apiContext);
                    logMsg = logMsg + ",5";
                    if (transaction.Status == BusinessStatus.Created)
                    {
                        TblPolicy policyUpdate = _context.TblPolicy.Find(PolicyId);
                        policyUpdate.PolicyStageId = ModuleConstants.PolicyStagePolicy;
                        policyUpdate.PolicyStatusId = ModuleConstants.PolicyStatusActive;
                        policyUpdate.PolicyStatus = ModuleConstants.PolicyStatus;
                        policyUpdate.BundleTxnId = transaction.cdTransactions.TxnId.ToString();
                        policyUpdate.IsActive = true;
                        // Add payment table 
                        TblPolicyPayment policyPayment = new TblPolicyPayment()
                        {
                            PaidAmount = Amount,
                            CreatedDate = DatetimeNow,
                            PolicyId = PolicyId
                        };
                        _context.TblPolicyPayment.Add(policyPayment);
                        _context.SaveChanges();
                        logMsg = logMsg + ",6";
                        //Get Policymodel
                        try
                        {
                            //var policyEmailModel = GetPolicyModel(productDetails, policyUpdate, partnerDetails);
                            Models.NotificationRequest request = new Models.NotificationRequest();
                            request.TemplateKey = "PolicyIssue";
                            request.AttachPDF = true;
                            //request.NotificationPayload = JsonConvert.SerializeObject(policyEmailModel);
                            request.SendEmail = true;
                            var notificationResponse = await _integrationService.SendNotificationAsync(request, apiContext);
                        }
                        catch (Exception ex)
                        {

                            var msgr = ex.ToString();
                        }

                        // await SendNotificationAsync(policyNumber, partnerDetails.Email, policyUpdate.Email, policyUpdate.MobileNumber,cover,coverEvent,productName);
                        return new PolicyResponse { Status = BusinessStatus.Created, Id = policyNumber, ResponseMessage = $"Policy created with policy number {policyNumber}" };
                    }
                    else if (transaction.Status == BusinessStatus.PreConditionFailed)
                    {
                        return new PolicyResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Account number {cdAccount} is locked" };
                    }
                    Errors.AddRange(transaction.Errors);
                }
            }
            catch (Exception ex)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = ex.Message, ErrorCode = logMsg };
                Errors.Add(errorInfo);
            }
            return new PolicyResponse { Status = BusinessStatus.Error, Errors = Errors };
        }
        public async Task<bool> SendEmailAsync(EmailRequest emailTest)
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
        public async Task<PolicyDTO> ModifyPolicy(string policyNumber, PolicyDTO policyDetail, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var tbl_Policy = _context.TblPolicy.Find(policyDetail.PolicyId);

                if (tbl_Policy == null)
                    throw new AppException("Policy not found");
                //Update the Policy here
                tbl_Policy.PolicyRemarks = policyDetail.PolicyRemarks;

                _context.TblPolicy.Update(tbl_Policy);
                _context.SaveChanges();
                var policyDTO = _mapper.Map<PolicyDTO>(tbl_Policy);
                return policyDTO;
            }
            catch (Exception ex)
            {


            }
            return null;
        }

        public async Task<IEnumerable<ddDTOs>> GetMaster(string sMasterlist, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            IEnumerable<ddDTOs> ddDTOs = new List<ddDTOs>();
            // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ddDTOs = _context.TblmasPocommonTypes.AsNoTracking()
               .Select(c => new ddDTOs
               {
                   mID = c.CommonTypeId,
                   mValue = c.Value,
                   mType = c.MasterType
               });
            return ddDTOs;
        }

        private async Task<PolicyDTO> MapAndValidatePolicy(dynamic policyDetail, ProductDTO productDTO, PartnersDTO partnersDTO, IEnumerable<ProductRcbdetailsDTO> riskDetails, List<ErrorInfo> Errors, ApiContext apiContext, string type)
        {
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            PolicyDTO policyDTO = new PolicyDTO();
            // validation of risk details
            var colName = "";
            foreach (var item in riskDetails)
            {
                var riskvalue = policyDetail[item.InputType];
                if (riskvalue != null)
                {
                    colName = GetColumnName(item.InputType);
                    if (!string.IsNullOrEmpty(colName))
                    {
                        PropertyInfo piInstance = policyDTO.GetType().GetProperty(colName);
                        if (piInstance != null)
                        {
                            if (piInstance.PropertyType == typeof(DateTime) || piInstance.PropertyType == typeof(DateTime?))
                            {
                                DateTime date;
                                DateTime.TryParse(riskvalue.ToString(), out date);
                                piInstance.SetValue(policyDTO, date);
                            }
                            else if (piInstance.PropertyType == typeof(int) || piInstance.PropertyType == typeof(int?))
                            {
                                piInstance.SetValue(policyDTO, (int)riskvalue);
                            }
                            else if (piInstance.PropertyType == typeof(decimal) || piInstance.PropertyType == typeof(decimal?))
                            {
                                piInstance.SetValue(policyDTO, (decimal)riskvalue);
                            }
                            else if (piInstance.PropertyType == typeof(string))
                            {
                                piInstance.SetValue(policyDTO, riskvalue.ToString());
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
            //if(policyDTO.AgentId == null || policyDTO.CustomerId == null || policyDTO.MasterPolicyNo == null || policyDTO.ProductIdPk == null)
            //{
            //    return null;
            //}
            // some other calculated value

           DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);



            policyDTO.CreatedBy = new Guid();
            policyDTO.CreatedDate = DatetimeNow;
            policyDTO.PolicyIssueDate = DatetimeNow;
            policyDTO.IsUploadedToIcm = 0;
            policyDTO.PremiumAmount = productDTO.PremiumAmount;
            // policyDTO.MasterPolicyNo = "ABC";//ToDo service req
            policyDTO.PolicyVersion = 1;
            policyDTO.PolicyNo = await GetPolicyNumberAsync(partnersDTO.PartnerId, productDTO.ProductId, apiContext, type);
            // policyDTO.CoverEvent = productDTO.ProductInsurableItems.FirstOrDefault().ProductCovers.FirstOrDefault().CoverEvent;
            // policyDTO.CoverName = productDTO.ProductInsurableItems.FirstOrDefault().ProductCovers.FirstOrDefault().Cover;

            return policyDTO;
        }

        private string GetColumnName(string column)
        {
            var lstColumn = GettblPolicyColumn();
            string colName;
            if (lstColumn.TryGetValue(column, out colName))
            {
                return colName;
            }
            return "";
        }

        private static Dictionary<string, string> GettblPolicyColumn()
        {
            Dictionary<string, string> dicColumns = new Dictionary<string, string>();
            dicColumns.Add("Partner ID", "AgentId");
            //dicColumns.Add("Identification Number", "CustomerId");
            dicColumns.Add("Event ID", "PolicyTypeId");
            dicColumns.Add("ProductID", "ProductIdPk");
            dicColumns.Add("Policy Start Date", "PolicyStartDate");
            dicColumns.Add("Policy End Date", "PolicyEndDate");
            dicColumns.Add("Name", "CoverNoteNo");
            // dicColumns.Add("Proposer name", "PolicyTypeID");
            dicColumns.Add("PolicyStatusID", "PolicyStatusId");
            dicColumns.Add("Mobile Number", "MobileNumber");
            dicColumns.Add("Email ID", "Email");
            return dicColumns;
        }
        //private string GetPolicyNumber(decimal partnerId, decimal productId, string type = "PolicyNo")
        //{
        //    //  _context = (MICAPOContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

        //    var connectionString = _configuration.GetConnectionString("PCConnection");
        //    int nextNumber = 0; string policNumber = "";
        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        SqlCommand command = new SqlCommand("[PO].[usp_GetNextNumber_New]", connection);
        //        command.CommandType = CommandType.StoredProcedure;
        //        command.Parameters.AddWithValue("@Numberingtype", type);
        //        command.Parameters.AddWithValue("@PartnerId", partnerId);
        //        command.Parameters.AddWithValue("@ProductId", productId);
        //        command.Parameters.Add("@NextNo", SqlDbType.Int);
        //        command.Parameters["@NextNo"].Direction = ParameterDirection.Output;
        //        command.CommandTimeout = 3600;
        //        command.ExecuteNonQuery();
        //        nextNumber = (int)command.Parameters["@NextNo"].Value;
        //        connection.Close();
        //    }
        //    policNumber = nextNumber.ToString();
        //    return policNumber;
        //}

        private async Task<string> GetPolicyNumberAsync(decimal partnerId, decimal productId, ApiContext apiContext, string type = "PolicyNo")
        {
            //  _context = (MICAPOContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            // var connectionString = _configuration.GetConnectionString("PCConnection");
            var dbConnectionString = await _integrationService.GetEnvironmentConnection(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
            var connectionString = dbConnectionString.Dbconnection;
            int nextNumber = 0; string policNumber = "";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("[PO].[usp_GetNextNumber_New]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Numberingtype", type);
                command.Parameters.AddWithValue("@PartnerId", partnerId);
                command.Parameters.AddWithValue("@ProductId", productId);
                command.Parameters.Add("@NextNo", SqlDbType.Int);
                command.Parameters["@NextNo"].Direction = ParameterDirection.Output;
                command.CommandTimeout = 3600;
                command.ExecuteNonQuery();
                nextNumber = (int)command.Parameters["@NextNo"].Value;
                connection.Close();
            }

            policNumber = nextNumber.ToString();

            //var nextNumber = 0;
            //var policNumber = "";
            //Random r = new Random();
            //if (type == "Proposal")
            //{
            //     nextNumber = r.Next(10000, 999999);

            //}
            //if (type == "Policy")
            //{
            //    nextNumber = r.Next(75000, 999999);
            //    policNumber = nextNumber.ToString();

            //}

            return policNumber;
        }
        private async Task SendNotificationAsync(string policyNumber, string partnerEmail, string customerEmail, string customerNumber, string cover, string coverEvent, string productName)
        {
            //partner email
            //EmailTest emailTest = new EmailTest() { Message = $"Dear Partner,\n One Insurance Policy transaction has been successful.\nYour Policy No {policyNumber} is generated for - {productName} \n  Regards,\n Team MICA ", Subject = $"Insured coverage of Cover {cover} for Cover event {coverEvent} under Policy No.{policyNumber}", To = partnerEmail };
            //await SendEmailAsync(emailTest);
            //UserEmail
            if (!string.IsNullOrEmpty(customerEmail))
            {
                EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Your Insurance Policy transaction has been successful.\n\n Your Policy No {policyNumber} is generated for - {productName} , find the Policy \n schedule document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insured coverage of Cover {cover} for Cover event {coverEvent} under Policy No.{policyNumber}", To = partnerEmail };
                await SendEmailAsync(emailTest);
            }
        }
        private List<ErrorInfo> GetPolicyRequestValidation(dynamic policyDetail)
        {
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            if (policyDetail["Product Code"] == null)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "Product Code", PropertyName = "Product Code", ErrorMessage = "Product Code cannot be null" };
                Errors.Add(errorInfo);
            }
            //if (policyDetail["Partner ID"] == null)
            //{
            //    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "Partner ID", PropertyName = "Partner ID", ErrorMessage = "Partner ID cannot be null" };
            //    Errors.Add(errorInfo);
            //}
            return Errors;
        }
        private decimal SavePolicyDetails(PolicyDTO mappedPolicy, dynamic policyDetail,DateTime dateTime)
        {
            mappedPolicy.PolicyIssueDate = dateTime;

            TblPolicy policy = _mapper.Map<TblPolicy>(mappedPolicy);



            TblPolicyDetails policyRequest = new TblPolicyDetails();
            policyRequest.PolicyRequest = policyDetail.ToString();
            policy.TblPolicyDetails.Add(policyRequest);
            _context.TblPolicy.Add(policy);
            var action = "Create Proposal";

            try
            {
                EndorsementDetailsDTO tblEndorsementDetails = new EndorsementDetailsDTO();
                tblEndorsementDetails.EnddorsementRequest = policyDetail.ToString();
                tblEndorsementDetails.IsPremiumRegister = true;
                tblEndorsementDetails.PolicyId = policy.PolicyId;
                tblEndorsementDetails.Action = action;
                tblEndorsementDetails.EndorsementEffectivedate = dateTime;
                tblEndorsementDetails.UpdatedResponse = policyDetail.ToString();
                TblEndorsementDetails tblEndorsement_mapper = _mapper.Map<TblEndorsementDetails>(tblEndorsementDetails);

                _context.TblEndorsementDetails.Add(tblEndorsement_mapper);
                _context.SaveChanges();
            }
            catch (Exception e)
            {

            }

            return policy.PolicyId;
        }
        private async Task<List<ErrorInfo>> DoCDTransactionAsync(decimal productId, decimal partnerId, string policyNumber, int Amount, decimal PolicyId, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            List<ErrorInfo> Errors = new List<ErrorInfo>();
            var cdAccount = string.Concat(productId.ToString().PadLeft(5, '0'), "/" + partnerId.ToString().PadLeft(5, '0'));
            PolicyBookingTransaction policyBookingTransaction = new PolicyBookingTransaction() { PartnerId = Convert.ToDecimal(partnerId), ProductId = Convert.ToDecimal(productId), AccountNo = cdAccount, PolicyNo = policyNumber, TxnAmount = Amount };
            var transaction = await _integrationService.DoTransaction(policyBookingTransaction, apiContext);

            if (transaction.Status == BusinessStatus.Created)
            {
                TblPolicy policyUpdate = _context.TblPolicy.Find(PolicyId);
                policyUpdate.PolicyStageId = ModuleConstants.PolicyStagePolicy;
                policyUpdate.PolicyStatusId = ModuleConstants.PolicyStatusActive;
                policyUpdate.BundleTxnId = transaction.cdTransactions.TxnId.ToString();
                // Add payment table 
              DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

                TblPolicyPayment policyPayment = new TblPolicyPayment()
                {
                    PaidAmount = Amount,
                    CreatedDate = DatetimeNow,
                    PolicyId = PolicyId
                };
                _context.TblPolicyPayment.Add(policyPayment);
                _context.SaveChanges();

                return Errors;
            }
            Errors.AddRange(transaction.Errors);
            return Errors;
        }

        public async Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tblPolicy = _context.TblPolicy.Find(policyId);
            if (tblPolicy != null)
            {
                var policyDTO = _mapper.Map<PolicyDTO>(tblPolicy);
                return policyDTO;
            }
            return null;
        }

        public async Task<PolicyDTO> GetPolicyByNumber(string policyNumber, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tblPolicy = _context.TblPolicy.Where(p => p.PolicyNo == policyNumber).FirstOrDefault();
            if (tblPolicy != null)
            {
                var policyDTO = _mapper.Map<PolicyDTO>(tblPolicy);
                return policyDTO;
            }
            return null;
        }

        public async Task<object> GetPolicyDetailsByNumber(string policyNumber, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tblPolicy = _context.TblPolicy.Where(p => p.PolicyNo == policyNumber).FirstOrDefault();
            if (tblPolicy != null)
            {
                var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == tblPolicy.PolicyId);
                var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                var json = JsonConvert.DeserializeObject<object>(insurableItem);
                return json;
            }
            return null;
        }


        private PolicyModel GetPolicyModel(ProductDTO productDTO, TblPolicy policyDTO, PartnersDTO partnersDTO)
        {
            PolicyModel model = new PolicyModel();
            model.Date = DateTime.Now;

            model.PolicyNumber = policyDTO.PolicyNo;
            //organization
            model.organization = new Organization();
            model.organization.ContactName = "Inube";
            model.organization.PhoneNumber = "9742745384";
            model.organization.EmailAddress = "iNube.MICA@inubesolutions.com";
            model.organization.Address = "JP NAGAR";

            //customer
            model.customer = new Customer();
            model.customer.ContactName = policyDTO.CoverNoteNo;
            model.customer.PhoneNumber = policyDTO.MobileNumber;
            model.customer.EmailAddress = policyDTO.Email;
            model.customer.Address = "";

            //policydetails
            model.policyDetails = new PolicyDetails();
            model.policyDetails.PolicyNumber = policyDTO.PolicyNo;
            model.policyDetails.PolicyStartDate = policyDTO.PolicyStartDate?.ToShortDateString();
            model.policyDetails.PolicyEndDate = policyDTO.PolicyEndDate?.ToShortDateString();
            model.policyDetails.ProductName = productDTO.ProductName;
            model.policyDetails.PartnerName = partnersDTO.PartnerName;


            //Product Model
            model.productsModel = new ProductsModel();

            //CoverageDetails 
            CoverageDetails coverageDetails = new CoverageDetails();
            var cover = productDTO.ProductInsurableItems.FirstOrDefault().ProductCovers.FirstOrDefault();
            coverageDetails.CoverName = cover.Cover;
            coverageDetails.CoverEvent = cover.CoverEvent;
            //coverageDetails.CoverEventFactor = cover.CoverEventFactor;
            //coverageDetails.CoverEventFactorValue = cover.CoverEventFactorValue;
            coverageDetails.From = cover.CoverEventFactorValueFrom;
            coverageDetails.To = cover.CoverEventFactorValueTo;
            model.productsModel.coverages.Add(coverageDetails);

            //benifits
            Benifits benifits = new Benifits();
            var benefit = cover.ProductBenefits.FirstOrDefault();
            //benifits.BenifitCriteria = benefit.BenefitType;
            benifits.BenifitCriteriaValue = benefit.BenefitCriteriaValue?.ToString();
            benifits.From = "1";
            benifits.To = "10.4";
            benifits.Amount = "20,000";
            // benifits.Amount = benefit.BenefitAmount.ToString();
            if (benefit.BenifitRangeDetails.Count > 0)
            {
                benifits.BenifitRangeDetails.AddRange(benefit.BenifitRangeDetails);
            }
            model.productsModel.benifits.Add(benifits);

            model.productsModel.premium.Add(new PremiumDetails { BasePremium = productDTO.PremiumAmount.ToString(), GST = 0.ToString(), TotalPremium = productDTO.PremiumAmount.ToString() });

            //CWE
            //model.productsModel.CWEdetails = new string[];
            int i = 0;
            foreach (var item in productDTO.ProductClausesWarrentiesExclusions.Where(c => c.IsPrint))
            {
                model.productsModel.CWEdetails.Add(item.Description);
                i++;
            }
            EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Your Insurance Policy transaction has been successful.\n\n Your Policy No {model.PolicyNumber} is generated for - {model.policyDetails.ProductName} , find the Policy \n schedule document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insured coverage of Cover {model.productsModel.coverages[0].CoverName} for Cover event {model.productsModel.coverages[0].CoverEvent} under Policy No.{model.PolicyNumber}", To = policyDTO.Email, PartnerEmail = partnersDTO.Email, IsAttachment = true };
            model.EmailTest = emailTest;
            return model;
        }



        public async Task<IEnumerable<PolicyDTO>> GetPolicyByEventId(string eventId, string policyNumber, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tblPolicy = _context.TblPolicy.Where(item => item.PolicyTypeId == eventId && item.PolicyNo == policyNumber).ToList();

            if (tblPolicy != null)
            {
                var policyDTO = _mapper.Map<IEnumerable<PolicyDTO>>(tblPolicy);
                return policyDTO;
            }
            return null;
        }

        public async Task<string> PolicyCancellation(PolicycancelDTO policycancel, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var _tblPolicy = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == policycancel.Policynumber);

            _tblPolicy.PolicyRemarks = policycancel.Remarks;
            _tblPolicy.IsActive = false;

            _context.TblPolicy.Update(_tblPolicy);

            _context.SaveChanges();



            return "policycancelled";
        }

        public async Task<dynamic> PolicyCancellation1(dynamic endoresementDto, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var policyNo = (string)endoresementDto["PolicyNumber"];
            string EndorsementNo = "";
            var _tblPolicy = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == policyNo);
            EndorsementNo = _tblPolicy.PolicyNo + "" + "_" + (_tblPolicy.PolicyVersion).ToString();

            // _tblPolicy.PolicyRemarks = policycancel.Remarks;
            _tblPolicy.IsActive = false;

            _context.TblPolicy.Update(_tblPolicy);

            _context.SaveChanges();



            return "Policy cancelled Successfully for this " + policyNo + "With Endoresement Number" + EndorsementNo;
        }



        public async Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var _policy = from P in _context.TblPolicy.OrderByDescending(p => p.CreatedDate).Where(s=>s.IsActive==true && s.PolicyNo!= null)
                          select P;
            if (apiContext.PartnerId > 0 && apiContext.OrgId > 0)
            {
                _policy = _policy.Where(pr => pr.AgentId == apiContext.PartnerId && pr.CustomerId == apiContext.OrgId.ToString());
            }
            else if (apiContext.OrgId > 0)
            {
                _policy = _policy.Where(pr => pr.CustomerId == apiContext.OrgId.ToString());
            }

            // var _policy = _context.TblPolicy.OrderByDescending(x => x.CreatedDate).Select(x => x);

            if (!string.IsNullOrEmpty(policysearch.Policynumber))
            {
                _policy = _policy.Where(P => P.PolicyNo.Contains(policysearch.Policynumber));
                // _products = $"pr.ProductCode.Contains({productSearchDTO.ProductCode})";
            }
            if (!string.IsNullOrEmpty(policysearch.ProductId))
            {
                int id = Int32.Parse(policysearch.ProductId);
                _policy = _policy.Where(P => P.ProductIdPk.Equals(id));
            }
            if (!string.IsNullOrEmpty(policysearch.PartnerId))
            {
                decimal id = Int32.Parse(policysearch.PartnerId);
                _policy = _policy.Where(P => P.AgentId.Equals(id));
            }
            if (!string.IsNullOrEmpty(policysearch.EventId))
            {
                _policy = _policy.Where(P => P.PolicyTypeId.Contains(policysearch.EventId));
            }

            if (!string.IsNullOrEmpty(policysearch.Insuredreference))
            {
                _policy = _policy.Where(P => P.CustomerId.Contains(policysearch.Insuredreference));
            }
            if (!string.IsNullOrEmpty(policysearch.MobileNumber))
            {
                _policy = _policy.Where(P => P.MobileNumber.Contains(policysearch.MobileNumber));
            }
            if (!string.IsNullOrEmpty(policysearch.Email))
            {
                _policy = _policy.Where(P => P.Email.Contains(policysearch.Email));
            }
            if (policysearch.EventDate != null && policysearch.EventDate != DateTime.MinValue)
            {
                _policy = _policy.Where(P => P.CreatedDate.Date == policysearch.EventDate);
            }
            var _policySearchDTOs = _mapper.Map<IEnumerable<PolicyDTO>>(_policy);

            return _policySearchDTOs;

        }

        public async Task<CdTransactionsResponse> CancelPolicy(PolicycancelDTO policycancelDTO, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            //var _tblPolicy = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == policycancelDTO.Policynumber);

            //_tblPolicy.PolicyRemarks = policycancelDTO.Remarks;

            //_context.TblPolicy.Update(_tblPolicy);

            //_context.SaveChanges();

            var policydata = from A in _context.TblPolicy.Where(x => x.PolicyNo == policycancelDTO.Policynumber)
                             select A;
            var _tblPolicy = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policycancelDTO.Policynumber);
            PolicyCancelTransaction policyBooking = new PolicyCancelTransaction();


            int partnerid = (int)_tblPolicy.AgentId;

            decimal productid = (decimal)_tblPolicy.ProductIdPk;

            policyBooking.PartnerId = partnerid;
            policyBooking.ProductId = productid;
            policyBooking.PolicyNo = policycancelDTO.Policynumber;
            policyBooking.TxnId = _tblPolicy.BundleTxnId;


            // var Cddata = await GetcddataAsync(Txnid);
            var cdAccountNo = string.Concat(productid.ToString().PadLeft(5, '0'), "/" + partnerid.ToString().PadLeft(5, '0'));
            policyBooking.AccountNo = cdAccountNo;

            var ReverseCD = await ReverseCdAsync(policyBooking, apiContext);

            return ReverseCD;
        }


        public async Task<CdTransactionsDTO> GetcddataAsync(int TxnId, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));


            var cddetails = await _integrationService.GetcddataAsync(TxnId, apiContext);
            return cddetails;
        }

        public async Task<CdTransactionsResponse> ReverseCdAsync(PolicyCancelTransaction transaction, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var data = await _integrationService.ReverseCdAsync(transaction, apiContext);
            return data.FirstOrDefault();
        }

        public class ChartData
        {
            public int ProductId { get; set; }
            public int PolicyMonth { get; set; }
            public int PolicyCount { get; set; }
        }



        public async Task<List<ddDTOs>> PolicyDashboardMaster(ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var PolicyYear = _context.TblPolicy.Select(x => x.CreatedDate.Year).Distinct().ToList();

            List<ddDTOs> FinalPolicyData = new List<ddDTOs>();


            foreach (var item in PolicyYear)
            {
                ddDTOs PolicyData = new ddDTOs();
                PolicyData.mID = item;
                PolicyData.mValue = item.ToString();

                FinalPolicyData.Add(PolicyData);
            }

            return FinalPolicyData;

        }

        public async Task<List<object>> GetGrossWrittenPremium(int productId, string productname, int Year, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            List<object> ProductDetails = new List<object>();
            List<object> FinalMonthData = new List<object>();
            List<object> FinalBarData = new List<object>();


            if (productId != 0 && !string.IsNullOrEmpty(productname))
            {
                var Validate = (await GetProductIdAsync(productId, productname, apiContext));
                if (productId == Validate.ProductId)
                {
                    ProductDetails.Add(productId);
                    ProductDetails.Add(productname);
                }
                else
                {
                    ProductDetails.Add("product id and product Name do not match");
                    return (ProductDetails);
                }
            }
            if (productId == 0 && !string.IsNullOrEmpty(productname))
            {
                var prodid = (await GetProductIdAsync(productId, productname, apiContext));
                int id = Int32.Parse(prodid.ProductId.ToString());

                ProductDetails.Add(id);
                ProductDetails.Add(productname);

            }
            if (productId != 0 && productname == null)
            {
                ProductDetails.Add(productId);
                var prodname = (await GetProductIdAsync(productId, productname, apiContext));
                var name = prodname.ProductName;
                ProductDetails.Add(name);

            }
            if (productId == 0 && productname == null)
            {
                List<ChartData> PolicyStackData = new List<ChartData>();
                if (apiContext.OrgId > 0 && apiContext.PartnerId > 0)
                {
                    if (Year != 0)
                    {
                        PolicyStackData = _context.TblPolicy.Where(w => w.CreatedDate.Year == Year && w.AgentId == apiContext.PartnerId && w.CustomerId == apiContext.OrgId.ToString())
                       .GroupBy(gp => new { ProductId = gp.ProductIdPk, Month = gp.CreatedDate.Month })
                       .Select(x => new ChartData { ProductId = (int)x.Key.ProductId, PolicyMonth = x.Key.Month, PolicyCount = x.Count() }).ToList();

                    }
                    else
                    {
                        PolicyStackData = _context.TblPolicy.Where(w => w.CreatedDate.Year == DateTime.Now.Year && w.AgentId == apiContext.PartnerId && w.CustomerId == apiContext.OrgId.ToString())
                       .GroupBy(gp => new { ProductId = gp.ProductIdPk, Month = gp.CreatedDate.Month })
                       .Select(x => new ChartData { ProductId = (int)x.Key.ProductId, PolicyMonth = x.Key.Month, PolicyCount = x.Count() }).ToList();

                    }

                }
                else if (apiContext.OrgId > 0)
                {
                    if (Year != 0)
                    {
                        PolicyStackData = _context.TblPolicy.Where(w => w.CreatedDate.Year == Year && w.CustomerId == apiContext.OrgId.ToString())
                       .GroupBy(gp => new { ProductId = gp.ProductIdPk, Month = gp.CreatedDate.Month })
                       .Select(x => new ChartData { ProductId = (int)x.Key.ProductId, PolicyMonth = x.Key.Month, PolicyCount = x.Count() }).ToList();

                    }
                    else
                    {
                        PolicyStackData = _context.TblPolicy.Where(w => w.CreatedDate.Year == DateTime.Now.Year && w.CustomerId == apiContext.OrgId.ToString())
                       .GroupBy(gp => new { ProductId = gp.ProductIdPk, Month = gp.CreatedDate.Month })
                       .Select(x => new ChartData { ProductId = (int)x.Key.ProductId, PolicyMonth = x.Key.Month, PolicyCount = x.Count() }).ToList();

                    }

                }
                else
                {

                    if (Year != 0)
                    {
                        PolicyStackData = _context.TblPolicy.Where(w => w.CreatedDate.Year == Year)
                       .GroupBy(gp => new { ProductId = gp.ProductIdPk, Month = gp.CreatedDate.Month })
                       .Select(x => new ChartData { ProductId = (int)x.Key.ProductId, PolicyMonth = x.Key.Month, PolicyCount = x.Count() }).ToList();

                    }
                    else
                    {
                        PolicyStackData = _context.TblPolicy.Where(w => w.CreatedDate.Year == DateTime.Now.Year)
                       .GroupBy(gp => new { ProductId = gp.ProductIdPk, Month = gp.CreatedDate.Month })
                       .Select(x => new ChartData { ProductId = (int)x.Key.ProductId, PolicyMonth = x.Key.Month, PolicyCount = x.Count() }).ToList();

                    }

                }
                var ProductDetail = (await GetProductName(apiContext));

                List<object> listHeader = new List<object>();
                listHeader.Add("Year/Month");

                List<int> ProductIds = new List<int>();
                List<string> ProductName = new List<string>();
                List<int> Month = new List<int>();

                var ProductList = PolicyStackData.Select(x => x.ProductId).ToList().Distinct();

                ProductIds.AddRange(ProductList);

                foreach (var productdetails in ProductDetail.Reverse())
                {
                    if (ProductIds.Contains(productdetails.Key))
                    {
                        listHeader.Add(productdetails.Value);
                    }
                }

                Month.AddRange(PolicyStackData.Select(x => x.PolicyMonth).ToList().Distinct());

                FinalMonthData.Add(listHeader);

                Month.Sort();

                foreach (int i in Month)
                {
                    List<object> list = new List<object>();
                    list.Add(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i));

                    foreach (int j in ProductIds)
                    {
                        var policyMonthData = PolicyStackData.FirstOrDefault(m => m.ProductId == j && m.PolicyMonth == i);
                        if (policyMonthData != null)
                        {
                            //list.Add(j);
                            list.Add(policyMonthData.PolicyCount);
                        }
                        else
                        {
                            list.Add(0);
                        }
                    }
                    FinalMonthData.Add(list);
                }
            }
            FinalBarData.Add(ProductDetails);

            List<string> Header = new List<string>();

            Header.Add("Year/Month");
            Header.Add("Premium");
            Header.Add("PolicyCount");

            FinalBarData.Add(Header);

            if (productId != 0 || ProductDetails.Count() != 0)
            {
                var BarData = from A in _context.TblPolicy.Where(e => (e.ProductIdPk == productId) || (e.ProductIdPk == (int)ProductDetails.First()))
                              group A by new
                              {

                                  A.CreatedDate.Year,
                                  A.CreatedDate.Month
                              }
                                 into g
                              select new
                              {
                                  Month = g.Select(n => n.CreatedDate.Month).First(),
                                  TotalAmount = g.Sum(n => n.PremiumAmount),
                                  Policycount = g.Count()
                              };
                foreach (var item in BarData)
                {
                    List<object> Bargraphdata = new List<object>();

                    Bargraphdata.Add(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(item.Month));
                    Bargraphdata.Add(item.TotalAmount);
                    Bargraphdata.Add(item.Policycount);

                    FinalBarData.Add(Bargraphdata);
                }
            }
            List<object> ReturnData = new List<object>();

            if (productId == 0 && productname == null)
            {
                ReturnData = FinalMonthData;
            }
            else
            {
                ReturnData = FinalBarData;
            }
            return ReturnData;
        }


        //Get CDBalanceBYPolicyNO
        //public async Task<CdTransactionsDTO> GetCdBalanceBYPolicyAsync(int txnid, ApiContext apiContext)
        //{


        //}





        public async Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //List<int> lstParentId = new List<int> { 0, parentID };
            var policy_list = _context.TblPolicy.ToList();
            var policyDTOs = _mapper.Map<List<PolicyDTO>>(policy_list);
            return policyDTOs;
        }

        public async Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO policySearchby, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var policy_list = _context.TblPolicy.Select(s => s);
            List<decimal> list = new List<decimal>();

            if (policySearchby.ProductId != null)
            {
                list = policy_list.Where(a => a.ProductIdPk == policySearchby.ProductId).Select(x => x.PolicyId).ToList();
            }
            if (policySearchby.PartnerId != null)
            {
                list = policy_list.Where(a => a.AgentId == policySearchby.PartnerId).Select(x => x.PolicyId).ToList();
            }
            if (policySearchby.PartnerId != null && policySearchby.ProductId != null)
            {
                list = policy_list.Where(a => a.ProductIdPk == policySearchby.ProductId && a.AgentId == policySearchby.PartnerId).Select(x => x.PolicyId).ToList();
            }
            if (policySearchby.PartnerId == null && policySearchby.ProductId == null)
            {
                list = policy_list.Select(s => s.PolicyId).ToList();
            }
            return list;
        }

        public async Task<Dictionary<int, string>> GetProductName(ApiContext apiContext)
        {
            var productDetails = await _integrationService.GetProductMasterAsync(apiContext);

            var ProductId = productDetails.Select(x => x.mID);
            var ProductName = productDetails.Select(x => x.mValue);

            Dictionary<int, string> ProductDetails = new Dictionary<int, string>();

            List<int> productid = new List<int>();

            List<string> productname = new List<string>();

            foreach (int id in ProductId)
            {
                productid.Add(id);
            }

            foreach (string name in ProductName)
            {
                productname.Add(name);
            }

            for (int i = 0; i < productid.Count(); i++)
            {
                ProductDetails.Add(productid[i], productname[i]);
                // continue;
            }

            return ProductDetails;

        }




        public async Task<ProductDTO> GetProductIdAsync(int id, string productname, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            Dictionary<int, string> ProductDetails = new Dictionary<int, string>();

            ProductSearchDTO ProductDto = new ProductSearchDTO();

            if (productname == null && id != 0)
            {
                ProductDto.ProductId = id;
            }
            if (id == 0 && !string.IsNullOrWhiteSpace(productname))
            {
                ProductDto.ProductName = productname;
            }
            if (id != 0 && !string.IsNullOrWhiteSpace(productname))
            {
                ProductDto.ProductId = id;
                ProductDto.ProductName = productname;
            }

            var productDetails = await _integrationService.GetProductIdAsync(ProductDto, apiContext);
            if (productDetails.Count() == 0)
            {
                ProductDTO prod = new ProductDTO();
                return prod;
            }
            else
            {

                ProductDTO product = new ProductDTO();

                List<int> Pid = new List<int>();

                List<string> name = new List<string>();

                foreach (var Id in productDetails)
                {
                    Pid.Add(Id.ProductId);
                }

                foreach (var Pname in productDetails)
                {
                    name.Add(Pname.ProductName);
                }

                for (int i = 0; i < Pid.Count(); i++)
                {
                    ProductDetails.Add(Pid[i], name[i]);
                    // continue;
                }

                if (ProductDto.ProductId != 0 && string.IsNullOrEmpty(ProductDto.ProductName))
                {
                    //Dictionary<int, string> Productname = new Dictionary<int, string>();

                    var Productname = ProductDetails.Where(x => x.Key == ProductDto.ProductId).Select(x => x.Value);
                    foreach (var item in Productname)
                    {
                        product.ProductName = item;
                    }


                }

                if (ProductDto.ProductId == 0 && !string.IsNullOrEmpty(ProductDto.ProductName))
                {

                    var Productname = ProductDetails.Where(x => x.Value == ProductDto.ProductName).Select(x => x.Key);
                    foreach (var item in Productname)
                    {
                        product.ProductId = item;
                    }


                }

                return product;
            }

        }

        public async Task<List<object>> DownloadPolicy(int ProductId, int PartnerId, ApiContext apiContext)
        {
            var data = await _integrationService.GetRiskPolicyDetailAsync(ProductId.ToString(), apiContext);


            List<object> finaldata = new List<object>();

            foreach (var item in data)
            {
                finaldata.Add(item.InputType);

            }
            //return data;
            return finaldata;

        }


        public void WriteToExcel(string path)
        {
            // path = @"C:/Users/prasant.k/source/Workspaces/MICA/Services/iNube.Services.Policy/Models/Excel.xlsx";
            // //Let use below test data for writing it to excel
            // // path = Server.MapPath(C: \Users\rashmidevi.p\source\repos\MICA Services\iNube.Services.Policy\Models\excel.xml);
            // List<PolicysearchDTO> policydata = new List<PolicysearchDTO>()
            // {

            //     new PolicysearchDTO() {PartnerId ="123" , Email = "ajay@gmail.com" , EventId="123",  Insuredreference = "ajay" , MobileNumber = "2345678" , Policynumber = "123" , ProductId = "123"     }

            //};


            // DataTable table = (DataTable)JsonConvert.DeserializeObject(JsonConvert.SerializeObject(policydata), (typeof(DataTable)));
            // FileInfo filePath = new FileInfo(path);
            // using (var excelPack = new ExcelPackage(filePath))
            // {
            //     var ws = excelPack.Workbook.Worksheets.Add("WriteTest");
            //     ws.Cells.LoadFromDataTable(table, true, OfficeOpenXml.Table.TableStyles.Light8);
            //     excelPack.Save();
            // }
        }

        //To get policy data for claims for genetaring Invoice 2nd Page Pdf
        public async Task<List<PolicyDataForClaims>> GetPolicyForClaimsInvoice(Models.BillingEventRequest EventRequet, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, EventRequet.EvtId.ToString(), _configuration));
            PolicyDataForClaims policyData = new PolicyDataForClaims();
            if (EventRequet.FromDate != null && EventRequet.ToDate != null)
            {
                var ProductData = await GetProductName(apiContext);
                var data = from tblPolicy in _context.TblPolicy.Where(tblPolicy => tblPolicy.CustomerId == EventRequet.CustomerId.ToString() && tblPolicy.CreatedDate.Date >= EventRequet.FromDate.Date && tblPolicy.CreatedDate.Date <= EventRequet.ToDate.Date)
                           select new PolicyDataForClaims
                           {
                               PolicyId = tblPolicy.PolicyId,
                               PolicyNo = tblPolicy.PolicyNo,
                               ProductName = ProductData.SingleOrDefault(x => x.Key == tblPolicy.ProductIdPk).Value,
                               InsuredName = tblPolicy.CoverNoteNo,
                               InsuredRefNo = tblPolicy.CustomerId
                           };
                var _data = _mapper.Map<List<PolicyDataForClaims>>(data);
                return _data;
            }
            return null;
        }
        //For invoice generation-- displaying line item details in email pdf(2nd page)
        public async Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest pDTO, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, pDTO.EvtId.ToString(), _configuration));
            BillingEventResponseDTO BillingData = new BillingEventResponseDTO();
            if (pDTO.FromDate != null && pDTO.ToDate != null)
            {
                var ProductData = await GetProductName(apiContext);
                var Billingresult = (from tblPolicy in _context.TblPolicy.Where(tblPolicy => tblPolicy.CustomerId == pDTO.CustomerId.ToString() && tblPolicy.CreatedDate.Date >= pDTO.FromDate.Date && tblPolicy.CreatedDate.Date <= pDTO.ToDate.Date)
                                     select new PolicyEventDTO
                                     {
                                         PolicyNo = tblPolicy.PolicyNo,
                                         //ProductId = tblPolicy.ProductIdPk,
                                         ProductName = ProductData.SingleOrDefault(x => x.Key == tblPolicy.ProductIdPk).Value,
                                         InsuredName = tblPolicy.CoverNoteNo,
                                         InsuredRefNo = tblPolicy.CustomerId,
                                         CreatedDate = tblPolicy.CreatedDate
                                     });

                List<BillingEventDataDTO> BillingResult = new List<BillingEventDataDTO>();
                BillingData.policyEventDTOs.AddRange(Billingresult);
            }

            BillingData.billingEventDataDTOs = await BillingEventData(pDTO, apiContext);
            return BillingData;
        }

        //For invoice generation-- getting policy count
        public async Task<List<BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest pDTO, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, pDTO.EvtId.ToString(), _configuration));
            try
            {
                ProductSearchDTO productSearchDTO = new ProductSearchDTO();
                productSearchDTO.EnvId = pDTO.EvtId;
                var productDetailsearch = await _integrationService.GetProductIdAsync(productSearchDTO, apiContext);

                List<BillingEventDataDTO> PolicyBilingDTO = new List<BillingEventDataDTO>();


                var policydatacount = from p in _context.TblPolicy.Where(ac => ac.CustomerId == Convert.ToInt32(pDTO.CustomerId).ToString() && ac.CreatedDate.Date >= pDTO.FromDate.Date && ac.CreatedDate.Date <= pDTO.ToDate.Date)
                                      group p by p.ProductIdPk into g
                                      select new BillingEventDataDTO { Count = g.Count(), SumInsured = (decimal)g.Max(s => (s.PremiumAmount != null) ? s.PremiumAmount : 0), ProductId = g.Key };


                List<ProductDTO> list = new List<ProductDTO>();
                List<BillingEventDataDTO> policylist = new List<BillingEventDataDTO>();
                policylist.AddRange(policydatacount.ToList());
                foreach (var i in policylist)
                {
                    list = productDetailsearch.Where(P => P.ProductId == i.ProductId).ToList();

                    if (list != null)
                    {
                        //i.ProductName = list[0].ProductName;
                        //i.ProductCode = list[0].ProductCode;

                    }
                }
                return policylist;
            }
            catch (Exception ex)
            {

            }
            return null;


        }


        //To get Policy Data 
        public async Task<List<object>> PolicyDetails(decimal PolicyId, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //var DATA = _context.TblPolicyDetails.Where(x => x.PolicyId == PolicyId).Select(x => x.PolicyRequest).ToList();

            //JObject json = JObject.Parse(DATA[0]);

            //// Dictionary<object, object> finaldata = new Dictionary<object, object>();
            //List<object> finaldata = new List<object>();
            //foreach (var item in json)
            //{
            //    List<object> data = new List<object>();
            //    data.Add(item.Key);
            //    data.Add(item.Value);

            //    finaldata.Add(data);

            //}

            //return finaldata;


            var DATA = _context.TblPolicy.SingleOrDefault(x => x.PolicyId == PolicyId);

            // JObject json = JObject.Parse(DATA.ToString());

            //var SDate = DATA.PolicyStartDate?.ToShortDateString();
            //var EDate = DATA.PolicyEndDate?.ToShortDateString();
            //var eventdate = DATA.CreatedDate.ToShortDateString();

            Dictionary<object, object> finaldata = new Dictionary<object, object>();
            //List<object> finaldata = new List<object>();
            List<object> FullfinalData = new List<object>();


            finaldata.Add("Insured Ref No", DATA.CustomerId);
            finaldata.Add("Insured Name", DATA.CoverNoteNo);
            finaldata.Add("Insured Mobile No", DATA.MobileNumber);
            finaldata.Add("Insured Email", DATA.Email);
            finaldata.Add("Event Date", DATA.CreatedDate);
            finaldata.Add("Cover Event", DATA.CoverEvent);
            finaldata.Add("Policy Start Date", DATA.PolicyStartDate);
            finaldata.Add("Policy End Date", DATA.PolicyEndDate);
            foreach (var item in finaldata)
            {
                List<object> data = new List<object>();

                data.Add(item.Key);
                data.Add(item.Value);

                FullfinalData.Add(data);

            }

            return FullfinalData;


        }

        public async Task<List<object>> SearchPolicyDetailsByNumber(string PolicyNumber, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var DATA = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == PolicyNumber);

            Dictionary<object, object> finaldata = new Dictionary<object, object>();
            List<object> FullfinalData = new List<object>();

            finaldata.Add("Insured Ref No", DATA.CustomerId);
            finaldata.Add("Insured Name", DATA.CoverNoteNo);
            finaldata.Add("Insured Mobile No", DATA.MobileNumber);
            finaldata.Add("Insured Email", DATA.Email);
            finaldata.Add("Event Date", DATA.CreatedDate);
            finaldata.Add("Cover Event", DATA.CoverEvent);
            finaldata.Add("Policy Start Date", DATA.PolicyStartDate);
            finaldata.Add("Policy End Date", DATA.PolicyEndDate);
            finaldata.Add("Total Sum Insured", DATA.SumInsured);
            finaldata.Add("Balance Sum Insured", DATA.BalanceSumInsued);
            foreach (var item in finaldata)
            {
                List<object> data = new List<object>();
                data.Add(item.Key);
                data.Add(item.Value);
                FullfinalData.Add(data);
            }
            return FullfinalData;
        }



        //MulticoverInsurable
        public async Task<PolicyInsurableResponse> PolicyInsurableDetails(string PolicyNumber, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            PolicyInsurableResponse insurableResponse = new PolicyInsurableResponse();
            var tblPolicy = _context.TblPolicy.Where(item => item.PolicyNo == PolicyNumber)
                  .Include(add => add.TblPolicyInsurableDetails).FirstOrDefault();
            var _policySearchDTOs = _mapper.Map<IEnumerable<PolicyInsurableDetailsDTO>>(tblPolicy.TblPolicyInsurableDetails);

            var data = _policySearchDTOs.ToList();

            for (int i = 0; i < data.Count(); i++)
            {
                List<Dictionary<string, string>> dict1 = new List<Dictionary<string, string>>();
                if (!string.IsNullOrEmpty(data[i].CoverValue))
                {
                    var T = JsonConvert.DeserializeObject<dynamic>(data[i].CoverValue);
                    var m = JsonConvert.SerializeObject(T);

                    var json = JsonConvert.SerializeObject(data[i].CoverValue);
                    var dictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(m);


                    foreach (KeyValuePair<string, string> each in dictionary)
                    {
                        var dict = new Dictionary<string, string>();
                        dict.Add("Header", each.Key);
                        dict.Add("Details", each.Value);
                        dict1.Add(dict);

                    }
                    data[i].coverDynamic = dict1;
                }
                else
                {
                    data[i].coverDynamic = dict1;
                }
            }

            insurableResponse.policyInsurableDetails.AddRange(data);

            //insurableResponse.policyInsurableDetails.AddRange(_policySearchDTOs);
            List<ddDTOs> lstInsurable = new List<ddDTOs>();
            var insNames = _policySearchDTOs.Select(p => p.InsurableItem).Distinct();
            ddDTOs insItem = null;
            var count = 0;
            foreach (var item in insNames)
            {
                insItem = new ddDTOs();
                insItem.mID = ++count;
                insItem.mValue = item;
                lstInsurable.Add(insItem);
            }
            insurableResponse.InsurableItems.AddRange(lstInsurable);
            return insurableResponse;
        }


        public async Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //  var id = 18;
            // var ps = await _integrationService.GetCustomerById(id, apiContext);
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            List<ErrorInfo> Errors = new List<ErrorInfo>();
            SingleCover singleCover = new SingleCover();
            decimal PolicyId = 0; string policyNumber = ""; decimal premiumAmount = 0;
            string logMsg = "";
            try
            {
                Errors = GetPolicyRequestValidation(policyDetail);
                if (Errors.Count > 0)
                {
                    return new PolicyResponse { Status = BusinessStatus.InputValidationFailed, Errors = Errors };
                }
                var productCode = policyDetail["Product Code"].ToString();
                var partnerId = "";
                if (policyDetail["Partner ID"] != null)
                {
                    partnerId = policyDetail["Partner ID"].ToString();
                }
                var productDetails = await _integrationService.GetProductDetailByCodeAsync(productCode, apiContext);
                if (productDetails.ProductId <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "ProductCode", PropertyName = "Product Code", ErrorMessage = $"ProdcutCode : {productCode} Not Found" };
                    Errors.Add(errorInfo);
                    return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }
                var productId = productDetails.ProductId.ToString();
                string cover = "", coverEvent = "", productName = "";
                productName = productDetails.ProductName;
                //foreach (var item in productDetails.ProductInsurableItems[0].ProductCovers)
                //{
                //    cover = item.Cover;
                //    coverEvent = item.CoverEvent;
                //}
                //cover=coverDetail.Cover; coverEvent = coverDetail.CoverEvent;
                logMsg = "1";
                PartnersDTO partnerDetails = null;
                if (partnerId.Length > 0 && partnerId != "0")
                {
                    partnerDetails = await _integrationService.GetPartnerDetailAsync(partnerId, apiContext);
                    if (partnerDetails.PartnerId <= 0)
                    {
                        ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PartnerID", PropertyName = "PartnerID", ErrorMessage = $"PartnerID : {productCode} Not Found" };
                        Errors.Add(errorInfo);
                        return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                    }
                }
                logMsg = logMsg + ",2";
                var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
                if (policyRiskDetails.ProductRcbDetails.Count <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "RiskDetail", PropertyName = "RiskDetail", ErrorMessage = $"RiskDetail for product : {partnerId} Not Found" };
                    Errors.Add(errorInfo);
                    return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }
                logMsg = logMsg + ",3";
                var mappedPolicy = await MapAndValidateInsurablePolicyAsync(policyDetail, productDetails, partnerDetails, policyRiskDetails, Errors, singleCover, "PolicyNo", apiContext);
                if (Errors.Count == 0)
                {

                    if (partnerDetails != null)
                    {
                        if (partnerDetails.OrganizationId > 0)
                        {
                            mappedPolicy.CustomerId = Convert.ToInt32(partnerDetails.OrganizationId).ToString();
                        }
                    }
                    else
                    {
                        mappedPolicy.CustomerId = Convert.ToInt32(productDetails.OrganizationId).ToString();
                    }
                   DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

                    PolicyId = SavePolicyDetails(mappedPolicy, policyDetail, DatetimeNow);
                    logMsg = logMsg + ",4";
                    var Amount = mappedPolicy.PremiumAmount;
                    policyNumber = mappedPolicy.PolicyNo;
                    var cdAccount = string.Concat(productId.ToString().PadLeft(5, '0'), "/" + partnerId.ToString().PadLeft(5, '0'));
                    //Adding Properties OrgId for Accounting Transaction 
                    var pID = apiContext.PartnerId;
                    if (partnerDetails != null && partnerDetails.GetType().GetProperty("OrganizationId") != null)
                    {
                        pID = (decimal)partnerDetails.GetType().GetProperty("OrganizationId").GetValue(partnerDetails, null);
                    }
                    TblPolicy policyUpdate = _context.TblPolicy.Find(PolicyId);
                    BusinessStatus businessStatus = 0;
                    if (partnerDetails == null)
                    {
                        MasterCDDTO master = new MasterCDDTO();
                        MasterCdTransactionsDTO transactionsDTO = new MasterCdTransactionsDTO();

                        transactionsDTO.ProductId = Convert.ToDecimal(productId);
                        transactionsDTO.Amount = Amount;
                        transactionsDTO.TxnType = "Credit";

                        master.AccountNo = policyUpdate.PolicyNo;
                        master.CdTransactionsDTO.Add(transactionsDTO);

                        transactionsDTO = new MasterCdTransactionsDTO();

                        transactionsDTO.ProductId = Convert.ToDecimal(productId);
                        transactionsDTO.Amount = Amount - 1;
                        transactionsDTO.TxnType = "Debit";
                        master.CdTransactionsDTO.Add(transactionsDTO);


                        var transaction = await _integrationService.CreateMasterCD(master, apiContext);
                        businessStatus = transaction.Status;
                    }
                    else
                    {
                        PolicyBookingTransaction policyBookingTransaction = new PolicyBookingTransaction() { PartnerId = Convert.ToDecimal(partnerId), ProductId = Convert.ToDecimal(productId), AccountNo = cdAccount, PolicyNo = policyNumber, TxnAmount = Amount, OrgId = pID };
                        var transaction = await _integrationService.DoTransaction(policyBookingTransaction, apiContext);
                        policyUpdate.BundleTxnId = transaction.cdTransactions.TxnId.ToString();
                        businessStatus = transaction.Status;
                        if (transaction.Status == BusinessStatus.PreConditionFailed)
                        {
                            return new PolicyResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Account number {cdAccount} is locked" };
                        }
                        else if (transaction.Status == BusinessStatus.NotFound)
                        {
                            return new PolicyResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"Account number {cdAccount} does not exist" };
                        }
                        Errors.AddRange(transaction.Errors);
                    }
                    logMsg = logMsg + ",5";
                    if (businessStatus == BusinessStatus.Created)
                    {

                        policyUpdate.PolicyStageId = ModuleConstants.PolicyStagePolicy;
                        policyUpdate.PolicyStatusId = ModuleConstants.PolicyStatusActive;
                        policyUpdate.PolicyStatus = ModuleConstants.PolicyStatus;

                        policyUpdate.IsActive = true;
                        // Add payment table 
                        TblPolicyPayment policyPayment = new TblPolicyPayment()
                        {
                            PaidAmount = Amount,
                            CreatedDate = DatetimeNow,
                            PolicyId = PolicyId
                        };
                        _context.TblPolicyPayment.Add(policyPayment);
                        _context.SaveChanges();
                        logMsg = logMsg + ",6";
                        //Get Policymodel
                        try
                        {
                            var policyEmailModel = await GetInsuranceCertificateModel(policyDetail, productDetails, policyUpdate, mappedPolicy, partnerDetails, singleCover, apiContext);
                            Models.NotificationRequest request = new Models.NotificationRequest();
                            request.SendSms = true;
                            request.smsRequest = new Models.SMSRequest()
                            {
                                PolicyNumber = policyNumber,
                                RecipientNumber = policyUpdate.MobileNumber,
                                SMSMessage = "Dear Customer, Your Insurance Policy transaction has been successful. Your Policy No " + policyNumber + " is generated and  for Claims Intimation use this link: http://micav0002.azurewebsites.net/pages/claim/" + policyNumber,
                            };
                            request.TemplateKey = "InsuranceCertificate";
                            request.AttachPDF = true;
                            request.NotificationPayload = JsonConvert.SerializeObject(policyEmailModel);
                            request.SendEmail = true;
                            //ACCOUNTING TRANSACTION CALLING
                            //var account = AccountMap(apiContext, policyUpdate);
                            var notificationResponse = await _integrationService.SendMultiCoverNotificationAsync(request, apiContext);
                        }

                        catch (Exception ex)
                        {

                            var msgr = ex.ToString();
                        }
                        //Adding of Accounting Transaction Part
                        var account = AccountMap(apiContext, policyUpdate, productDetails, partnerDetails);
                        // await SendNotificationAsync(policyNumber, partnerDetails.Email, policyUpdate.Email, policyUpdate.MobileNumber,cover,coverEvent,productName);
                        return new PolicyResponse { Status = BusinessStatus.Created, Id = policyNumber, ResponseMessage = $"Policy created with policy number {policyNumber}" };
                    }

                }
            }
            catch (Exception ex)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = ex.Message, ErrorCode = logMsg };
                Errors.Add(errorInfo);
            }
            return new PolicyResponse { Status = BusinessStatus.Error, Errors = Errors };
        }
        public async Task<PolicyResponse> CreatePolicyWithPayment(dynamic policyDetail, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //  var id = 18;
            // var ps = await _integrationService.GetCustomerById(id, apiContext);
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            List<ErrorInfo> Errors = new List<ErrorInfo>();
            SingleCover singleCover = new SingleCover();
            decimal PolicyId = 0; string policyNumber = ""; decimal premiumAmount = 0;
            string logMsg = "";
            try
            {
                //Errors = GetPolicyRequestValidation(policyDetail);
                //if (Errors.Count > 0)
                //{
                //    return new PolicyResponse { Status = BusinessStatus.InputValidationFailed, Errors = Errors };
                //}
                var productCode = policyDetail["Product Code"].ToString();
                var partnerId = policyDetail["Partner ID"].ToString();
                var productDetails = await _integrationService.GetProductDetailByCodeAsync(productCode, apiContext);
                if (productDetails.ProductId <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "ProductCode", PropertyName = "Product Code", ErrorMessage = $"ProdcutId : {productCode} Not Found" };
                    Errors.Add(errorInfo);
                    return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }
                var productId = productDetails.ProductId.ToString();
                string cover = "", coverEvent = "", productName = "";
                productName = productDetails.ProductName;
                //foreach (var item in productDetails.ProductInsurableItems[0].ProductCovers)
                //{
                //    cover = item.Cover;
                //    coverEvent = item.CoverEvent;
                //}
                //cover=coverDetail.Cover; coverEvent = coverDetail.CoverEvent;
                logMsg = "1";
                PartnersDTO partnerDetails = null;
                if (Convert.ToInt64(partnerId) > 0)
                {
                    partnerDetails = await _integrationService.GetPartnerDetailAsync(partnerId, apiContext);
                    if (partnerDetails.PartnerId <= 0)
                    {
                        ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PartnerID", PropertyName = "PartnerID", ErrorMessage = $"PartnerID : {partnerId} Not Found" };
                        Errors.Add(errorInfo);
                        return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                    }
                }
                logMsg = logMsg + ",2";
                var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
                if (policyRiskDetails.ProductRcbDetails.Count <= 0)
                {
                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "RiskDetail", PropertyName = "RiskDetail", ErrorMessage = $"RiskDetail for product : {partnerId} Not Found" };
                    Errors.Add(errorInfo);
                    return new PolicyResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                }
                logMsg = logMsg + ",3";
                var mappedPolicy = await MapAndValidateInsurablePolicyAsync(policyDetail, productDetails, partnerDetails, policyRiskDetails, Errors, singleCover, "PolicyNo", apiContext);
                if (Errors.Count == 0)
                {

                    if (partnerDetails != null && partnerDetails.OrganizationId > 0)
                    {
                        mappedPolicy.CustomerId = Convert.ToInt32(partnerDetails.OrganizationId).ToString();
                    }
                    else
                    {
                        mappedPolicy.CustomerId = Convert.ToInt32(productDetails.OrganizationId).ToString();
                    }
                   DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

                    PolicyId = SavePolicyDetails(mappedPolicy, policyDetail, DatetimeNow);
                    logMsg = logMsg + ",4";
                    var Amount = mappedPolicy.PremiumAmount;
                    policyNumber = mappedPolicy.PolicyNo;

                    //paytm implementation
                    var paytmtransactionResponce = await _integrationService.DoTransactionByPayment(PolicyId, Amount, mappedPolicy.MobileNumber, apiContext);
                    //var cdAccount = string.Concat(productId.ToString().PadLeft(5, '0'), "/" + partnerId.ToString().PadLeft(5, '0'));
                    //Adding Properties OrgId for Accounting Transaction 
                    //var pID = apiContext.PartnerId;
                    //if (partnerDetails.GetType().GetProperty("OrganizationId") != null)
                    //{
                    //    pID = partnerDetails.GetType().GetProperty("OrganizationId").GetValue(partnerDetails, null);
                    //}
                    // PolicyBookingTransaction policyBookingTransaction = new PolicyBookingTransaction() { PartnerId = Convert.ToDecimal(partnerId), ProductId = Convert.ToDecimal(productId), AccountNo = cdAccount, PolicyNo = policyNumber, TxnAmount = Amount, OrgId = pID };
                    //var transaction = await _integrationService.DoTransaction(policyBookingTransaction, apiContext);
                    logMsg = logMsg + ",5";
                    //if (transaction.Status == BusinessStatus.Created)
                    //{
                    TblPolicy policyUpdate = _context.TblPolicy.Find(PolicyId);
                    policyUpdate.PolicyStageId = ModuleConstants.PolicyStagePolicy;
                    policyUpdate.PolicyStatusId = ModuleConstants.PolicyStatusActive;
                    policyUpdate.PolicyStatus = ModuleConstants.PolicyStatus;
                    // policyUpdate.BundleTxnId = transaction.cdTransactions.TxnId.ToString();
                    policyUpdate.IsActive = true;
                    // Add payment table 
                    TblPolicyPayment policyPayment = new TblPolicyPayment()
                    {
                        PaidAmount = Amount,
                        CreatedDate = DatetimeNow,
                        PolicyId = PolicyId
                    };
                    _context.TblPolicyPayment.Add(policyPayment);
                    _context.SaveChanges();
                    logMsg = logMsg + ",6";
                    //Get Policymodel
                    try
                    {
                        var policyEmailModel = await GetInsuranceCertificateModel(policyDetail, productDetails, policyUpdate, mappedPolicy, partnerDetails, singleCover, apiContext);
                        Models.NotificationRequest request = new Models.NotificationRequest();
                        request.SendSms = true;
                        request.smsRequest = new Models.SMSRequest()
                        {
                            PolicyNumber = policyNumber,
                            RecipientNumber = policyUpdate.MobileNumber,
                            SMSMessage = "Dear Customer, Your Insurance Policy transaction has been successful. Your Policy No " + policyNumber + " is generated and  for Claims Intimation use this link: http://micav0002.azurewebsites.net/pages/claim/" + policyNumber,
                        };
                        request.TemplateKey = "InsuranceCertificate";
                        request.AttachPDF = true;
                        request.NotificationPayload = JsonConvert.SerializeObject(policyEmailModel);
                        request.SendEmail = true;
                        //ACCOUNTING TRANSACTION CALLING
                        //var account = AccountMap(apiContext, policyUpdate);
                        var notificationResponse = await _integrationService.SendMultiCoverNotificationAsync(request, apiContext);
                    }

                    catch (Exception ex)
                    {

                        var msgr = ex.ToString();
                    }
                    //Adding of Accounting Transaction Part
                    var account = AccountMap(apiContext, policyUpdate, productDetails, partnerDetails);
                    // await SendNotificationAsync(policyNumber, partnerDetails.Email, policyUpdate.Email, policyUpdate.MobileNumber,cover,coverEvent,productName);
                    return new PolicyResponse { Status = BusinessStatus.Created, Id = policyNumber, policy = paytmtransactionResponce, ResponseMessage = $"Policy created with policy number {policyNumber}" };


                    // }
                    //else if (transaction.Status == BusinessStatus.PreConditionFailed)
                    //{
                    //    return new PolicyResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Account number {cdAccount} is locked" };
                    //}
                    //else if (transaction.Status == BusinessStatus.NotFound)
                    //{
                    //    return new PolicyResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"Account number {cdAccount} does not exist" };
                    //}
                    //Errors.AddRange(transaction.Errors);
                }
            }
            catch (Exception ex)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = ex.Message, ErrorCode = logMsg };
                Errors.Add(errorInfo);
            }
            return new PolicyResponse { Status = BusinessStatus.Error, Errors = Errors };
        }


        public List<PolicyInsurableDetailsDTO> GetMultiCover(dynamic policyDetail, ProductDTO productDTO, PolicyDTO policyDTO, SingleCover singleCover, List<ErrorInfo> Errors)
        {
            List<PolicyInsurableDetailsDTO> lstPolicyInsurableDetailsDto = new List<PolicyInsurableDetailsDTO>();
            PolicyInsurableDetailsDTO policyInsurableDetailsDto = null;



            var InsurableItemName = "";
            var CoverName = "";
            var BenefitAmount = 0;
            decimal totalPremiumAmount = 0;
            // get premium level
            var premiumLevel = productDTO.ProductPremium.FirstOrDefault().LevelId;
            if (productDTO.ProductInsurableItems.Count > 0)
            {
                var InsurableItem = productDTO.ProductInsurableItems.FirstOrDefault();
                if (InsurableItem != null)
                {
                    InsurableItemName = InsurableItem.InsurableItem;
                    singleCover.InsurableItem = InsurableItem.InsurableItem;
                    singleCover.IdentificationNumber = policyDetail["Identification Number"];
                    singleCover.Name = policyDTO.CoverNoteNo;
                    var CoverItem = InsurableItem.ProductCovers.FirstOrDefault();
                    if (CoverItem != null)
                    {
                        CoverName = CoverItem.Cover;
                        singleCover.Cover = CoverName;
                        singleCover.CoverEventFactor = CoverItem.CoverEventFactor;
                        var BenefitItem = CoverItem.ProductBenefits.FirstOrDefault();
                        if (BenefitItem != null)
                        {
                            singleCover.BenefitCriteria = BenefitItem.BenefitCriterias;
                            if (BenefitItem.MaxBenefitAmount != null && BenefitItem.MaxBenefitAmount > 0)
                            {
                                BenefitAmount = (int)BenefitItem.MaxBenefitAmount;
                                singleCover.MaxBenefitValue = BenefitAmount;
                            }
                            else
                            {
                                BenefitAmount = (int)BenefitItem.BenefitCriteriaValue;
                                singleCover.MaxBenefitCriteriaValue = BenefitAmount;
                            }
                        }
                    }
                }
            }
            if (policyDetail.InsurableItem != null && policyDetail.InsurableItem.Count > 0)
            {
                var insItemCount = 0;
                decimal premiumAmount = 0;
                foreach (var item in policyDetail.InsurableItem)
                {
                    InsurableItemName = item.InsurableName;
                    premiumAmount = 0;

                    var productInsurable = productDTO.ProductInsurableItems.FirstOrDefault(p => p.InsurableItem == InsurableItemName);
                    if (productInsurable == null && !string.IsNullOrEmpty(InsurableItemName))
                    {
                        ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"Product is not configured for InsurableItem: {InsurableItemName}.Mismatch value is given." };
                        Errors.Add(errorInfo);
                    }

                    if (premiumLevel == 52)
                    {
                        premiumAmount = (decimal)productDTO.ProductPremium.FirstOrDefault(p => p.SubLevelId == productInsurable.InsurableItemTypeId).PremiumAmount;
                    }
                    if (item.Covers.Count > 0)
                    {
                        foreach (var insurableFieldData in item.Covers)
                        {
                            CoverName = insurableFieldData["CoverName"];
                            insItemCount = 0;
                            var coversDTO = productInsurable.ProductCovers.FirstOrDefault(c => c.Cover == CoverName);
                            if (coversDTO == null && !string.IsNullOrEmpty(CoverName))
                            {
                                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"Product is not configured for CoverItem: {CoverName}.Mismatch value is given." };
                                Errors.Add(errorInfo);
                            }
                            else
                            {
                                if (coversDTO != null)
                                {
                                    if (premiumLevel == 53)
                                    {
                                        //premiumAmount = premiumAmount + (decimal)productDTO.ProductPremium.FirstOrDefault(p => p.SubLevelId == coversDTO.CoverTypeId).PremiumAmount;
                                        var prodpremium = productDTO.ProductPremium.FirstOrDefault(p => p.SubLevelId == coversDTO.CoverTypeId);
                                        if (prodpremium != null)
                                        {
                                            premiumAmount = premiumAmount + (decimal)prodpremium.PremiumAmount;
                                        }

                                    }
                                    foreach (var insurableInsurablefields in item.RiskItems)
                                    {
                                        dynamic polFields = new ExpandoObject();
                                        foreach (var insItem in insurableInsurablefields)
                                        {
                                            // insItem.ToString()
                                            if (insItem.Name == "Identification Number" || insItem.Name == "Name" || insItem.Name == "Documents")
                                            {

                                            }
                                            else
                                            {
                                                AddProperty(polFields, insItem.Name, insurableInsurablefields[insItem.Name].ToString());
                                            }

                                        }
                                        policyInsurableDetailsDto = new PolicyInsurableDetailsDTO();
                                        policyInsurableDetailsDto.CoverName = CoverName;
                                        policyInsurableDetailsDto.InsurableItem = InsurableItemName;
                                        policyInsurableDetailsDto.IdentificationNo = insurableInsurablefields["Identification Number"];
                                        policyInsurableDetailsDto.Name = insurableInsurablefields["Name"];
                                        policyInsurableDetailsDto.BenefitAmount = BenefitAmount;
                                        policyInsurableDetailsDto.CoverValue = JsonConvert.SerializeObject(polFields);
                                        policyInsurableDetailsDto.IsActive = true;
                                        lstPolicyInsurableDetailsDto.Add(policyInsurableDetailsDto);
                                        insItemCount++;
                                    }
                                }
                            }
                        }
                    }
                    else
                    {

                        foreach (var insurableFieldData in productInsurable.ProductCovers)
                        {
                            CoverName = insurableFieldData.Cover;
                            insItemCount = 0;
                            //var coversDTO = productInsurable.ProductCovers.FirstOrDefault(c => c.Cover == CoverName);
                            //if (coversDTO == null && !string.IsNullOrEmpty(CoverName))
                            //{
                            //    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"Product is not configured for CoverItem: {CoverName}.Mismatch value is given." };
                            //    Errors.Add(errorInfo);
                            //}
                            if (premiumLevel == 53)
                            {
                                premiumAmount = premiumAmount + (decimal)productDTO.ProductPremium.FirstOrDefault(p => p.SubLevelId == insurableFieldData.CoverTypeId).PremiumAmount;
                            }
                            foreach (var insurableInsurablefields in item.RiskItems)
                            {
                                dynamic polFields = new ExpandoObject();
                                foreach (var insItem in insurableInsurablefields)
                                {
                                    if (insItem.Name == "Identification Number" || insItem.Name == "Name" || insItem.Name == "Documents")
                                    {

                                    }
                                    else
                                    {
                                        AddProperty(polFields, insItem.Name, insurableInsurablefields[insItem.Name].ToString());
                                    }

                                }
                                policyInsurableDetailsDto = new PolicyInsurableDetailsDTO();
                                policyInsurableDetailsDto.CoverName = CoverName;
                                policyInsurableDetailsDto.InsurableItem = InsurableItemName;
                                policyInsurableDetailsDto.IdentificationNo = insurableInsurablefields["Identification Number"];
                                if (insurableInsurablefields["Name"] != null)
                                {
                                    policyInsurableDetailsDto.Name = insurableInsurablefields["Name"];
                                }
                                else
                                {
                                    //if(insurableInsurablefields.First.Name== "Identification Number")
                                    //{

                                    //}
                                }
                                policyInsurableDetailsDto.CoverValue = JsonConvert.SerializeObject(polFields);
                                policyInsurableDetailsDto.BenefitAmount = BenefitAmount;
                                policyInsurableDetailsDto.IsActive = true;
                                lstPolicyInsurableDetailsDto.Add(policyInsurableDetailsDto);
                                insItemCount++;
                            }
                        }
                    }
                    if ((bool)productInsurable.IsSingle && insItemCount > 1)
                    {
                        ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = $"Error it is single Cover" };
                        Errors.Add(errorInfo);
                    }
                    //premium
                    totalPremiumAmount = totalPremiumAmount + (premiumAmount * insItemCount);
                }
            }
            else
            {
                policyInsurableDetailsDto = new PolicyInsurableDetailsDTO();
                policyInsurableDetailsDto.CoverName = CoverName;
                policyInsurableDetailsDto.InsurableItem = InsurableItemName;
                policyInsurableDetailsDto.IdentificationNo = policyDTO.CustomerId;
                policyInsurableDetailsDto.Name = policyDTO.CoverNoteNo;
                policyInsurableDetailsDto.BenefitAmount = BenefitAmount;
                policyInsurableDetailsDto.IsActive = true;
                lstPolicyInsurableDetailsDto.Add(policyInsurableDetailsDto);
            }
            if (premiumLevel == 51 && productDTO.ProductPremium.FirstOrDefault().PremiumAmount != null)
            {
                totalPremiumAmount = (decimal)productDTO.ProductPremium.FirstOrDefault().PremiumAmount;
            }
            if (totalPremiumAmount > 0)
            {
                policyDTO.PremiumAmount = totalPremiumAmount;
            }
            else
            {
                totalPremiumAmount = (decimal)productDTO.ProductPremium.Sum(p => p.PremiumAmount);
                policyDTO.PremiumAmount = totalPremiumAmount;
            }
            return lstPolicyInsurableDetailsDto;
        }
        private async Task<PolicyDTO> MapAndValidateInsurablePolicyAsync(dynamic policyDetail, ProductDTO productDTO, PartnersDTO partnersDTO, ProductRiskDetailsDTO riskDetails, List<ErrorInfo> Errors, SingleCover singleCover, string type, ApiContext apiContext)
        {
            PolicyDTO policyDTO = new PolicyDTO();
            // validation of risk details
            var colName = "";
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            foreach (var item in riskDetails.ProductRcbDetails)
            {
                var riskvalue = policyDetail[item.InputType];
                colName = policyDetail[item.InputType];
                if (riskvalue != null)
                {
                    colName = GetColumnName(item.InputType);
                    if (!string.IsNullOrEmpty(colName))
                    {
                        PropertyInfo piInstance = policyDTO.GetType().GetProperty(colName);
                        if (piInstance != null)
                        {
                            if (piInstance.PropertyType == typeof(DateTime) || piInstance.PropertyType == typeof(DateTime?))
                            {
                                DateTime date;
                                DateTime.TryParse(riskvalue.ToString(), out date);
                                piInstance.SetValue(policyDTO, date);
                            }
                            else if (piInstance.PropertyType == typeof(int) || piInstance.PropertyType == typeof(int?))
                            {
                                piInstance.SetValue(policyDTO, (int)riskvalue);
                            }
                            else if (piInstance.PropertyType == typeof(decimal) || piInstance.PropertyType == typeof(decimal?))
                            {
                                piInstance.SetValue(policyDTO, (decimal)riskvalue);
                            }
                            else if (piInstance.PropertyType == typeof(string))
                            {
                                piInstance.SetValue(policyDTO, riskvalue.ToString());
                            }
                        }
                    }
                }
                if (Convert.ToBoolean(item.IsReqired) && riskvalue == null)
                {
                    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"For Policy creation {item.InputType} value is required" };
                    Errors.Add(errorInfo);
                }
            }
            //if(policyDTO.AgentId == null || policyDTO.CustomerId == null || policyDTO.MasterPolicyNo == null || policyDTO.ProductIdPk == null)
            //{
            //    return null;
            //}
            // some other calculated value
            if (policyDetail["Email ID"] != null)
            {
                policyDTO.Email = policyDetail["Email ID"].ToString();
            }
            if (policyDetail["Mobile Number"] != null)
            {
                policyDTO.MobileNumber = policyDetail["Mobile Number"].ToString();
            }
           DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

            policyDTO.CreatedBy = new Guid();
            policyDTO.CreatedDate = DatetimeNow;
            //policyDTO.PolicyIssueDate = DateTime.Now;
            policyDTO.IsUploadedToIcm = 0;
            //policyDTO.SumInsured = productDTO.PremiumAmount;
            // policyDTO.MasterPolicyNo = "ABC";//ToDo service req


            if (type == "ProposalNo")
            {
                policyDTO.ProposalNo = await GetPolicyNumberAsync(0, productDTO.ProductId, apiContext, type);
                policyDTO.ProposalDate = DatetimeNow;
                policyDTO.PolicyStageId = ModuleConstants.PolicyStageProposal;
                policyDTO.PolicyStatusId = ModuleConstants.PolicyStatusInActive;
            }
            else
            {
                if (partnersDTO != null)
                {
                    policyDTO.PolicyNo = await GetPolicyNumberAsync(partnersDTO.PartnerId, productDTO.ProductId, apiContext, type);
                    // policyDTO.Po = GetPolicyNumber(partnersDTO.PartnerId, productDTO.ProductId);
                    policyDTO.PolicyStageId = ModuleConstants.PolicyStageQuote;
                    policyDTO.PolicyStatusId = ModuleConstants.PolicyStatusInActive;
                }
                else
                {
                    policyDTO.PolicyNo = await GetPolicyNumberAsync(0, productDTO.ProductId, apiContext, type);

                }
                policyDTO.PolicyIssueDate = DatetimeNow;

            }
            policyDTO.PolicyVersion = 1;
            policyDTO.PolicyInsurableDetails.AddRange(GetMultiCover(policyDetail, productDTO, policyDTO, singleCover, Errors));
            if (productDTO.ProductInsurableItems.FirstOrDefault().ProductCovers.Count > 0)
            {
                policyDTO.CoverEvent = productDTO.ProductInsurableItems.FirstOrDefault().ProductCovers.FirstOrDefault().CoverEvent;
            }
            // policyDTO.CoverName = productDTO.ProductInsurableItems.FirstOrDefault().ProductCovers.FirstOrDefault().Cover;
            policyDTO.ProductIdPk = productDTO.ProductId;
            if (productDTO.IsMasterPolicy == true)
            {
                policyDTO.MasterPolicyNo = policyDTO.PolicyNo;
            }


            if (policyDetail["permiumamount"] != null)
            {
                policyDTO.PremiumAmount = Convert.ToDecimal(policyDetail["permiumamount"]);
            }
            policyDTO.MasterPremium = policyDTO.PremiumAmount;//needs to fetch through rating
                                                              // policyDTO.SumInsured = policyDTO.PremiumAmount;
            return policyDTO;
        }
        private async Task<InsuranceCertificateModel> GetInsuranceCertificateModel(dynamic policyDetail, ProductDTO productDTO, TblPolicy tblpolicyDTO, PolicyDTO policyDTO, PartnersDTO partnersDTO, SingleCover singleCover, ApiContext apiContext)
        {
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;
           DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);


            InsuranceCertificateModel model = new InsuranceCertificateModel();
            var ps = await _integrationService.GetCustomerById(Convert.ToDecimal(tblpolicyDTO.CustomerId), apiContext);
            //model.cweDetails = new System.Collections.Generic.List<CweDetails>();
            model.cweproductDetails = new System.Collections.Generic.List<CweProductDetails>();
            model.Date = DatetimeNow;
            //INSURER DETAILS
            model.InsurerDetails = new InsurerDetails();
            model.InsurerDetails.ContactName = ps.CustomerName;
            model.InsurerDetails.EmailAddress = ps.CustSpocDetails.FirstOrDefault()?.EmailId;
            model.InsurerDetails.PhoneNumber = ps.PhoneNo;

            if (ps != null && ps.CustAddress.Count > 0)
            {
                model.insurerAddress = new InsurerAddress() { AddressLine1 = ps.CustAddress.FirstOrDefault().AddressLine1, AddressLine2 = ps.CustAddress.FirstOrDefault().AddressLine2, City = "BANGLORE", State = "KARNATAKA", PinCode = "560012" };
            }

            //OFFICE ADDRESS
            model.officeAddress = new OfficeAddress();
            model.officeAddress.CompanyName = "iNube Software Solutions Pvt Ltd.";
            model.officeAddress.AddressLine1 = "JP NAGAR";
            model.officeAddress.AddressLine2 = "ABOVE AXIS BANK";
            model.officeAddress.City = "BANGLORE";
            model.officeAddress.State = "KARNATAKA";
            model.officeAddress.PinCode = "560002";


            //INSURER ADDRESS


            //INSURED DETAILS
            model.insuredDetails = new InsuredDetails();
            if (policyDTO.PolicyInsurableDetails != null && policyDTO.PolicyInsurableDetails.Count > 0)
            {
                model.insuredDetails.InsuredContactName = policyDTO.PolicyInsurableDetails.First().Name;
            }
            else
            {
                model.insuredDetails.InsuredContactName = policyDTO.CoverNoteNo;
            }
            model.insuredDetails.InsuredEmailAddress = policyDTO.Email;
            model.insuredDetails.InsuredPhoneNumber = policyDTO.MobileNumber;


            //INSURED ADDRESS

            model.insuredAddress = new InsuredAddress();
            //model.insuredAddress.AddressLine1 = "KR PURAM";
            //model.insuredAddress.AddressLine2 = "NEAR TIN FACTORY";
            //model.insuredAddress.City = "BANGLORE";
            //model.insuredAddress.State = "KARNATAKA";
            //model.insuredAddress.PinCode = "560002";

            ////PremiumItemRelated Details
            ///

            PremiumDetail premiumDetail = new PremiumDetail();

            //premiumDetail.PremiumLevel = ;
            // premiumDetail.Currency = "CurrenyId";
            //premiumDetail.PremiumLevel = "Benefit";
            // premiumDetail.Currency = "USD";
            PremiumLevelDetail premiumLevelDetail = null;
            // new PremiumLevelDetail();
            // premiumLevelDetail.ParticularName = "Insurable Item1";
            PremiumAmount premiumAmount = null;// new PremiumAmount();
            try
            {
                foreach (var item in productDTO.ProductPremium)
                {

                    premiumLevelDetail = new PremiumLevelDetail();
                    // PremiumLevelDetail premiumLevelDetail = new PremiumLevelDetail();

                    premiumDetail.PremiumLevel = item.LevelName;
                    premiumDetail.Currency = item.CurrencyName;
                    if (item.LevelId == 53 || item.LevelId == 54)
                    {
                        premiumLevelDetail.ParticularName = item.LevelName;
                    }


                    premiumAmount = new PremiumAmount();
                    //  PremiumAmount premiumAmount = new PremiumAmount();
                    premiumAmount.Amount = item.PremiumAmount;
                    premiumAmount.Name = item.SubLevelName;

                    premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
                    premiumDetail.lstPremiumAmount.Add(premiumLevelDetail);
                    if (item.LevelId == 51)
                    {
                        premiumAmount.Name = productDTO.ProductName;
                    }
                }

                //premiumDetail.premiumLevelDetails.Add(premiumLevelDetail);
                model.premiumDetail = premiumDetail;

            }
            catch (Exception e)
            {

            }

            //policy details
            model.policyDeatils = new Policydetails();
            if (partnersDTO != null)
            {
                model.policyDeatils.PartnerName = partnersDTO.PartnerName;
            }
            model.policyDeatils.PolicyStartDate = policyDTO.PolicyStartDate.ToString();
            model.policyDeatils.PolicyEndDate = policyDTO.PolicyEndDate.ToString();
            model.policyDeatils.ProductName = productDTO.ProductName;
            model.policyDeatils.PolicyNumber = policyDTO.PolicyNo;
            model.policyDeatils.CoverEvent = policyDTO.CoverEvent;

            //INSURABLE ITEMS DETAILS
            List<Insurabledetails> lstInsurabledetails = new List<Insurabledetails>();
            Coveragedetails coveragedetails = null;
            Insurabledetails insurabledetails = null;
            InsurableItemsDetails insurableItemsDetails = null;



            ProductCoversDTO coversDTO = null;
            ProductInsurableItemsDTO productInsurable = null;
            ProductBenefitsDTO productBenefits = null;
            if (policyDetail.InsurableItem != null && policyDetail.InsurableItem.Count > 0)
            {
                foreach (var item in policyDetail.InsurableItem)
                {
                    if (!string.IsNullOrEmpty(Convert.ToString(item.InsurableName)))
                    {
                        insurabledetails = new Insurabledetails();
                        insurabledetails.InsurableItem = item.InsurableName;
                        insurableItemsDetails = new InsurableItemsDetails();
                        // insurableItemsDetails.Name = item.Name;
                        // insurableItemsDetails.IdentificationNumber=item.

                        productInsurable = productDTO.ProductInsurableItems.FirstOrDefault(p => p.InsurableItem == insurabledetails.InsurableItem);
                        //lstInsurabledetails.Add(insurabledetails);
                        if (item.Covers != null && productInsurable != null)
                        {
                            foreach (var insurableFieldData in item.Covers)
                            {
                                coveragedetails = new Coveragedetails();
                                coveragedetails.CoverName = insurableFieldData["CoverName"];
                                coversDTO = productInsurable.ProductCovers.FirstOrDefault(c => c.Cover == coveragedetails.CoverName);
                                if (coversDTO != null)
                                {
                                    productBenefits = coversDTO.ProductBenefits.First();
                                    if (productBenefits != null)
                                    {
                                        coveragedetails.CoverEventFactor = coversDTO.CoverEventFactor;
                                        coveragedetails.MaxBenifitCriteriaAmount = Convert.ToDecimal(productBenefits.MaxBenefitAmount);
                                        coveragedetails.MaxBenifitCriteriaValue = Convert.ToDecimal(productBenefits.BenefitCriteriaValue).ToString();
                                        coveragedetails.BenifitCriteria = productBenefits.BenefitCriterias;
                                        insurabledetails.coverages.Add(coveragedetails);
                                    }
                                }

                            }
                        }
                        if (item.RiskItems != null)
                        {
                            foreach (var insurableInsurablefields in item.RiskItems)
                            {
                                insurableItemsDetails = new InsurableItemsDetails();
                                insurableItemsDetails.Name = insurableInsurablefields["Name"];
                                insurableItemsDetails.IdentificationNumber = insurableInsurablefields["Identification Number"];
                                insurabledetails.lstInsurableItemsDetails.Add(insurableItemsDetails);
                            }
                            insurabledetails.NumberOfItems = insurabledetails.lstInsurableItemsDetails.Count;
                        }

                        model.insurableItemsdetails.Add(insurabledetails);
                    }
                }
            }
            else
            {
                //Single Cover
                insurabledetails = new Insurabledetails();
                insurabledetails.InsurableItem = singleCover.InsurableItem;
                insurabledetails.NumberOfItems = 1;
                coveragedetails = new Coveragedetails();
                coveragedetails.CoverName = singleCover.Cover;
                coveragedetails.CoverEventFactor = singleCover.CoverEventFactor;
                coveragedetails.MaxBenifitCriteriaAmount = singleCover.MaxBenefitValue;
                coveragedetails.MaxBenifitCriteriaValue = singleCover.MaxBenefitCriteriaValue.ToString();
                coveragedetails.BenifitCriteria = singleCover.BenefitCriteria;
                insurabledetails.coverages.Add(coveragedetails);

                insurableItemsDetails = new InsurableItemsDetails();
                insurableItemsDetails.Name = singleCover.Name;
                insurableItemsDetails.IdentificationNumber = singleCover.IdentificationNumber;
                insurabledetails.lstInsurableItemsDetails.Add(insurableItemsDetails);
                model.insurableItemsdetails.Add(insurabledetails);
            }
            //PREMIUM DETAILS
            model.premiumdetails = new Premiumdetails();
            var basepremium = Math.Round(Convert.ToDecimal(tblpolicyDTO.PremiumAmount * 100 / 118), 2);
            model.premiumdetails.BasePremium = basepremium.ToString();
            var GST = 18;
            // model.premiumdetails.GST = GST + "%";
            //model.premiumdetails.TotalPremium = (tblpolicyDTO.PremiumAmount + (tblpolicyDTO.PremiumAmount * GST / 100)).ToString();
            model.premiumdetails.TotalPremium = Math.Round(Convert.ToDecimal(tblpolicyDTO.PremiumAmount), 2).ToString();
            model.premiumdetails.GST = Math.Round(Convert.ToDecimal(tblpolicyDTO.PremiumAmount - basepremium), 2).ToString();
            //CWE
            CweDetails cweDetails = new CweDetails();
            CweProductDetails cweProductDetails = new CweProductDetails();
            CWEInsurableItems cWEInsurableItems = new CWEInsurableItems();
            CoverListDetails coverListDetails = new CoverListDetails();
            if (productDTO.ProductClausesWarrentiesExclusions != null)
            {
                foreach (var item in productDTO.ProductClausesWarrentiesExclusions)
                {
                    if (item.LevelId == 52)//52 Insurable
                    {
                        cweProductDetails = new CweProductDetails { Type = item.Cwetypes, Description = item.Description };
                        cWEInsurableItems.InsurableItemName = "Person";
                        cWEInsurableItems.cweInsurableDetails.Add(cweProductDetails);
                    }
                    else if (item.LevelId == 53)//53 Cover
                    {
                        cweProductDetails = new CweProductDetails { Type = item.Cwetypes, Description = item.Description };
                        coverListDetails.cweCoverDetails.Add(cweProductDetails);
                    }
                    //else if (item.LevelId == 53)//53 Benefit
                    //{
                    //    cweProductDetails = new CweProductDetails { Type = item.Cwetypes, Description = item.Description };
                    //    coverListDetails.cweCoverDetails.Add(cweProductDetails);
                    //}
                    else//51
                    {
                        cweProductDetails = new CweProductDetails { Type = item.Cwetypes, Description = item.Description };
                        cweDetails.cweProductDetails.Add(cweProductDetails);
                    }
                }
            }
            if (coverListDetails.cweCoverDetails.Count > 0)
            {
                cWEInsurableItems.cwecoverListDetails.Add(coverListDetails);
                cweDetails.cweinsurableItems.Add(cWEInsurableItems);
            }
            // coverListDetails.cwebenfitDetails.Add(cWEBenfitDetails);
            model.cweDetails = cweDetails;
            EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Insurance Certificate  has been sent successfully\n\n , find the document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insurance Certificate", To = policyDTO.Email, PartnerEmail = partnersDTO != null ? partnersDTO.Email : "", IsAttachment = true };
            model.EmailTest = emailTest;

            return model;
        }

        //MulticoverInsurable
        public async Task<LeadInfoDTO> CustomerPolicy(int customerId, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var leadInfoDetails = await _integrationService.GetLeadInfo(customerId, apiContext);

            return leadInfoDetails;
        }

        public async Task<IEnumerable<PolicyCountDTO>> PolicySearchDashboard(PolicySearchDashboardDTO policysearch, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {
                ProductSearchDTO productSearchDTO = new ProductSearchDTO();
                var ProductData = await GetProductName(apiContext);
                var PartnerData = await _integrationService.GetPartnerDetails(apiContext);
                //var productDetailsearch = await _integrationService.GetProductIdAsync(productSearchDTO, apiContext);

                if (policysearch.PartnerId > 0 && policysearch.ProductId > 0)
                {
                    var prodData = from tblPolicy in _context.TblPolicy.Where(tblPolicy => tblPolicy.AgentId == policysearch.PartnerId && tblPolicy.ProductIdPk == policysearch.ProductId)

                                   group tblPolicy by new
                                   {
                                       tblPolicy.ProductIdPk,
                                       tblPolicy.AgentId
                                   } into g
                                   select new PolicyCountDTO { Count = g.Count(), PartnerId = g.Key.AgentId, ProductId = g.Key.ProductIdPk };

                    List<PartnerDetailsDTO> partners = new List<PartnerDetailsDTO>();
                    // List<ProductDTO> products = new List<ProductDTO>();
                    List<PolicyCountDTO> policyCounts = new List<PolicyCountDTO>();

                    policyCounts.AddRange(prodData.ToList());

                    foreach (var i in policyCounts)
                    {
                        partners = PartnerData.Where(p => p.PartnerId == (decimal)i.PartnerId).ToList();
                        var productname = ProductData.SingleOrDefault(P => P.Key == i.ProductId).Value;
                        if (partners != null && productname != null)
                        {
                            i.PartnerName = partners[0].PartnerName;
                            i.ProductName = productname;
                        }
                    }
                    return policyCounts;
                }

                else if (policysearch.PartnerId > 0)
                { //Search only with partner
                    var partData = from tblPolicy in _context.TblPolicy.Where(tblPolicy => tblPolicy.AgentId == policysearch.PartnerId)

                                   group tblPolicy by new
                                   {
                                       tblPolicy.AgentId,
                                   } into g
                                   select new PolicyCountDTO { Count = g.Count(), PartnerId = g.Key.AgentId };

                    List<PartnerDetailsDTO> partners = new List<PartnerDetailsDTO>();
                    List<PolicyCountDTO> policyCounts = new List<PolicyCountDTO>();

                    policyCounts.AddRange(partData.ToList());

                    foreach (var i in policyCounts)
                    {
                        partners = PartnerData.Where(p => p.PartnerId == (decimal)i.PartnerId).ToList();
                        if (partners != null)
                        {
                            i.PartnerName = partners[0].PartnerName;
                        }
                    }
                    return policyCounts;
                }

                else if (policysearch.ProductId > 0)
                {//Product search
                    var prodData = from tblPolicy in _context.TblPolicy.Where(tblPolicy => tblPolicy.ProductIdPk == policysearch.ProductId)

                                   group tblPolicy by new
                                   {
                                       tblPolicy.ProductIdPk,
                                   } into g
                                   select new PolicyCountDTO { Count = g.Count(), ProductId = g.Key.ProductIdPk };

                    List<PolicyCountDTO> policyCounts = new List<PolicyCountDTO>();
                    policyCounts.AddRange(prodData.ToList());

                    foreach (var i in policyCounts)
                    {
                        var productname = ProductData.SingleOrDefault(P => P.Key == i.ProductId).Value;
                        if (productname != null)
                        {
                            i.ProductName = productname;
                        }
                    }
                    return policyCounts;
                }

                else//Search without parameters
                {
                    var prodData = from tblPolicy in _context.TblPolicy.Where(tblPolicy => tblPolicy.AgentId == apiContext.PartnerId)

                                   group tblPolicy by new
                                   {
                                       tblPolicy.ProductIdPk,
                                   } into g
                                   select new PolicyCountDTO { Count = g.Count(), ProductId = g.Key.ProductIdPk };

                    List<PolicyCountDTO> policyCounts = new List<PolicyCountDTO>();
                    policyCounts.AddRange(prodData.ToList());

                    foreach (var i in policyCounts)
                    {
                        var productname = ProductData.SingleOrDefault(P => P.Key == i.ProductId).Value;
                        if (productname != null)
                        {
                            i.ProductName = productname;
                        }
                    }
                    return policyCounts;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }








        private async Task<EndorsmentDTO> InternalCallPolicyInsurableDetails(dynamic policyDetail, string PolicyNo, ApiContext apiContext)
        {
            System.Type Datatype;
            var policy = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == PolicyNo);
            var InsurableItemName = "";
            var CoverName = "";
            var BenefitAmount = 0;
            decimal totalPremiumAmount = 0;
            var productDTO = await _integrationService.GetProductDetailByIdAsync(policy.ProductIdPk.ToString(), apiContext);
            List<TblPolicyInsurableDetails> lstPolicyInsurableDetailsDto = new List<TblPolicyInsurableDetails>();
            TblPolicyInsurableDetails policyInsurableDetailsDto = null;
            // List<TblPolicyInsurableDetails> policyInsurableDetailsList = new List<TblPolicyInsurableDetails>();
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            try
            {
                if (productDTO.ProductInsurableItems.Count > 0)
                {
                    //List<PolicyInsurableDetailsDTO> lstPolicyInsurableDetailsDto = new List<PolicyInsurableDetailsDTO>();
                    // get premium level
                    var premiumLevel = productDTO.ProductPremium.FirstOrDefault().LevelId;

                    if (productDTO.ProductInsurableItems.Count > 0)
                    {

                        if (policyDetail.InsurableItem != null && policyDetail.InsurableItem.Count > 0)
                        {
                            var insItemCount = 0;
                            decimal premiumAmount = 0;
                            foreach (var item in policyDetail.InsurableItem)
                            {
                                InsurableItemName = item.InsurableName;
                                premiumAmount = 0;

                                var productInsurable = productDTO.ProductInsurableItems.FirstOrDefault(p => p.InsurableItem == InsurableItemName);
                                if (productInsurable == null && !string.IsNullOrEmpty(InsurableItemName))
                                {
                                    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"Product is not configured for InsurableItem: {InsurableItemName}.Mismatch value is given." };
                                    Errors.Add(errorInfo);
                                }

                                if (premiumLevel == 52)
                                {
                                    premiumAmount = (decimal)productDTO.ProductPremium.FirstOrDefault(p => p.SubLevelId == productInsurable.InsurableItemTypeId).PremiumAmount;
                                }
                                foreach (var insurableFieldData in productInsurable.ProductCovers)
                                {
                                    CoverName = insurableFieldData.Cover;
                                    insItemCount = 0;
                                    //var coversDTO = productInsurable.ProductCovers.FirstOrDefault(c => c.Cover == CoverName);
                                    //if (coversDTO == null && !string.IsNullOrEmpty(CoverName))
                                    //{
                                    //    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"Product is not configured for CoverItem: {CoverName}.Mismatch value is given." };
                                    //    Errors.Add(errorInfo);
                                    //}
                                    if (premiumLevel == 53)
                                    {
                                        premiumAmount = premiumAmount + (decimal)productDTO.ProductPremium.FirstOrDefault(p => p.SubLevelId == insurableFieldData.CoverTypeId).PremiumAmount;
                                    }
                                    foreach (var insurableInsurablefields in item.RiskItems)
                                    {
                                        dynamic polFields = new ExpandoObject();
                                        foreach (var insItem in insurableInsurablefields)
                                        {
                                            if (insItem.Name == "Identification Number" || insItem.Name == "Name" || insItem.Name == "Documents")
                                            {

                                            }
                                            else
                                            {
                                                AddProperty(polFields, insItem.Name, insurableInsurablefields[insItem.Name].ToString());

                                            }

                                        }
                                        policyInsurableDetailsDto = new TblPolicyInsurableDetails();
                                        policyInsurableDetailsDto.CoverName = CoverName;
                                        policyInsurableDetailsDto.InsurableItem = InsurableItemName;
                                        policyInsurableDetailsDto.PolicyId = policy.PolicyId;
                                        policyInsurableDetailsDto.IdentificationNo = insurableInsurablefields["Identification Number"];
                                        if (insurableInsurablefields["Name"] != null)
                                        {
                                            policyInsurableDetailsDto.Name = insurableInsurablefields["Name"];
                                        }
                                        else
                                        {
                                            //if(insurableInsurablefields.First.Name== "Identification Number")
                                            //{

                                            //}
                                        }
                                        policyInsurableDetailsDto.CoverValue = JsonConvert.SerializeObject(polFields);
                                        policyInsurableDetailsDto.BenefitAmount = BenefitAmount;
                                        policyInsurableDetailsDto.IsActive = true;
                                        lstPolicyInsurableDetailsDto.Add(policyInsurableDetailsDto);
                                        insItemCount++;
                                    }
                                }
                            }

                            _context.TblPolicyInsurableDetails.AddRange(lstPolicyInsurableDetailsDto);
                            _context.SaveChanges();
                        }
                    }

                    return new EndorsmentDTO() { Status = BusinessStatus.Created, ResponseMessage = "Save Successfully" };

                }
                else
                {
                    //need to handle error
                    return new EndorsmentDTO() { Status = BusinessStatus.NotFound, ResponseMessage = $"No Record Found for this productCode {productDTO.ProductCode}" };

                }
            }
            catch (Exception ex)
            {
                return new EndorsmentDTO { Status = BusinessStatus.Error, ResponseMessage = ex.InnerException.ToString() };
            }
        }




        public async Task<EndorsmentDTO> AddInsurableItem(dynamic insurableItemRequest, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;
           DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);


            List<ErrorInfo> Errors = new List<ErrorInfo>();

            string PolicyNo = insurableItemRequest["PolicyNumber"].ToString();
            if (PolicyNo == "")
            {
                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"PolicyNumber can not be empty" };
                Errors.Add(errorInfo);
                return new EndorsmentDTO() { Status = BusinessStatus.InputValidationFailed, Errors = Errors };

            }

            try
            {
                string EndorsementNo = "";
                var policy = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == PolicyNo);
                if (policy != null)
                {
                    policy.PolicyVersion++;
                    EndorsementNo = policy.PolicyNo + "" + "_" + (policy.PolicyVersion).ToString();

                    if (insurableItemRequest.InsurableItem != null && insurableItemRequest.InsurableItem.Count > 0)
                    {

                        var lstPolicyInsurableDetailsDto = await InternalCallPolicyInsurableDetails(insurableItemRequest, PolicyNo, apiContext);



                        var EndorsmentType = (string)insurableItemRequest["EndorsementType"];

                        if (EndorsmentType == "Addition of vehicle")
                        {

                            var policyNo = (string)insurableItemRequest["PolicyNumber"];
                            var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policyNo);
                            var policyId = tbl_particiant.PolicyId;
                            var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);

                            if (tblPolicyDetailsdata != null)
                            {
                                var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                                dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
                                dynamic json1 = JsonConvert.DeserializeObject<dynamic>(insurableItem);

                                if (insurableItemRequest["si"] != null)
                                {

                                    json1["Balance SumInsured"] = Convert.ToInt64(json1["Balance SumInsured"]) + Convert.ToInt64(insurableItemRequest["si"]) - Convert.ToInt64(json1["si"]);

                                    tbl_particiant.BalanceSumInsued = Convert.ToInt32(json1["Balance SumInsured"]);

                                }

                                ////Step2:Validate of Request Object
                                List<CDMapper> cDMappers = new List<CDMapper>();
                                CDMapper cD = new CDMapper();
                                cD.Type = "Policy";
                                cD.Data = json;
                                cDMappers.Add(cD);
                                cD = new CDMapper();
                                cD.Type = "Endorsement";
                                cD.Data = insurableItemRequest;
                                cDMappers.Add(cD);


                                var res = await _integrationService.RuleMapper(cDMappers, "EndorsementAdd", apiContext);

                                var seriaizeListofres = JsonConvert.SerializeObject(res);
                                List<ErrorDetailsData> Listofres = JsonConvert.DeserializeObject<List<ErrorDetailsData>>(seriaizeListofres.ToString());

                                var checkerrorlog = Listofres.FirstOrDefault(p => p.ValidatorName == "Final Result" && p.Outcome == "Fail");

                                if (Listofres != null)
                                {
                                    foreach (var item in Listofres)
                                    {

                                        if (item.Outcome == "Fail" && item.ValidatorName != "Final Result")
                                        {

                                            ErrorInfo errorInfo = new ErrorInfo { ErrorCode = item.Code, ErrorMessage = item.Message };
                                            Errors.Add(errorInfo);

                                        }

                                    }
                                    if (Errors.Count > 0)
                                    {
                                        return new EndorsmentDTO { Status = BusinessStatus.Error, Errors = Errors };
                                    }
                                }

                                //step:3 Call CD mapper


                                var CDmap = await _integrationService.CDMapperList(cDMappers, "EndorsementAdd", apiContext);
                                if (CDmap.Count > 0)
                                {
                                    var CalculatePremiumResponse = CDmap.FirstOrDefault(s => s.TotalAmount > 0 &&s.TxnType=="Credit");

                                    //Step3:Check Premium vs Payment Amount
                                    var paymentinfo = insurableItemRequest["PaymentInfo"];
                                    if (paymentinfo != null)
                                    {
                                        var paymentinfoRequest = JsonConvert.DeserializeObject<List<PaymentInfo>>(paymentinfo.ToString());
                                        var paymentdiff = (paymentinfoRequest[0].Amount - CalculatePremiumResponse.TotalAmount);
                                        if (paymentdiff <= 1 && paymentdiff >= -1)
                                        {

                                            MicaCD micaCD = new MicaCD();
                                            micaCD.AccountNo = policy.CdaccountNumber;
                                            micaCD.micaCDDTO = CDmap;
                                            micaCD.Description = "Endorsement-Addition-" + EndorsementNo;






                                            foreach (var insurableName in json.InsurableItem)
                                            {
                                                foreach (var item in insurableItemRequest.InsurableItem)
                                                {
                                                    var name1 = insurableName.InsurableName;
                                                    if (name1 == "Vehicle" && item.InsurableName == "Vehicle")
                                                    {
                                                        foreach (var insurableName1 in json1.InsurableItem)
                                                        {
                                                            var count = insurableName.RiskItems.Count;
                                                            if (insurableName.InsurableName == "Vehicle")
                                                            {
                                                                if (count < 3)
                                                                {
                                                                    if (insurableItemRequest["si"] != null && Convert.ToInt64(insurableItemRequest["si"]) > 0)
                                                                    {
                                                                        json1.si = insurableItemRequest.si;
                                                                    }
                                                                    foreach (var fields in item.RiskItems)
                                                                    {
                                                                        try
                                                                        {
                                                                            //Note validation has to come vechile addition count can not be greater then 3

                                                                            if (insurableName1.InsurableName == "Vehicle" && insurableName.InsurableName == "Vehicle")
                                                                            {
                                                                                insurableName1.RiskItems.Add(fields);
                                                                                insurableName1.RiskCount = insurableName1.RiskItems.Count;
                                                                                if (fields["Vehicle Type"] == "PC")
                                                                                {
                                                                                    json1.noOfPC = (Convert.ToInt32(json1.noOfPC) + 1).ToString();
                                                                                }
                                                                                if (fields["Vehicle Type"] == "TW")
                                                                                {
                                                                                    json1.noOfTW = (Convert.ToInt32(json1.noOfTW) + 1).ToString();

                                                                                }
                                                                                //insurableName1.RiskItems = insurableName.RiskItems;
                                                                            }
                                                                        }
                                                                        catch (Exception e)
                                                                        {
                                                                        }

                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    ErrorInfo errorInfo = new ErrorInfo() { ErrorCode = "", ErrorMessage = "Vehicle can not be added" };

                                                                    Errors.Add(errorInfo);
                                                                    return new EndorsmentDTO() { Status = BusinessStatus.InputValidationFailed, Errors = Errors };
                                                                }

                                                            }
                                                        }

                                                    }
                                                }

                                            }




                                            var expObj = JsonConvert.DeserializeObject<ExpandoObject>(json1.ToString());
                                          //  AddProperty(expObj, "PremiumDetails", CDmap);
                                            expObj.PaymentInfo = paymentinfo;
                                            expObj.PremiumDetails = CDmap;
                                             var tempobj = JsonConvert.SerializeObject(expObj);
                                            json1 = JsonConvert.DeserializeObject<dynamic>(tempobj.ToString());

                                            tblPolicyDetailsdata.PolicyRequest = json1.ToString();
                                            _context.TblPolicyDetails.Update(tblPolicyDetailsdata);


                                            //Endorsement Details data saving for the addition of vehicle

                                            //  PolicyEndoresemenet policyEndoresemenet=new 

                                            EndorsementDetailsDTO endorsementDetailsDTO = new EndorsementDetailsDTO();
                                            endorsementDetailsDTO.Action = EndorsmentType;
                                            endorsementDetailsDTO.EndorsementNo = EndorsementNo;
                                            endorsementDetailsDTO.IsPremiumRegister = true;
                                            endorsementDetailsDTO.UpdatedResponse = json1.ToString();
                                            endorsementDetailsDTO.EndorsementEffectivedate = DatetimeNow;
                                            endorsementDetailsDTO.EnddorsementRequest = insurableItemRequest.ToString();
                                            endorsementDetailsDTO.PolicyId = policy.PolicyId;

                                            TblEndorsementDetails tblEndorsement_mapper = _mapper.Map<TblEndorsementDetails>(endorsementDetailsDTO);

                                            _context.TblEndorsementDetails.Add(tblEndorsement_mapper);
                                            _context.TblPolicy.Update(policy);
                                            _context.SaveChanges();


                                            //Step5:CD Transaction for the policy
                                            var transaction = await _integrationService.CreateMasterCDAccount(micaCD, apiContext);
                                            BusinessStatus businessStatus = 0;
                                            businessStatus = transaction.Status;

                                            if (businessStatus == BusinessStatus.Created)
                                            {
                                                //Status for Txn
                                            }
                                            else
                                            {

                                                return new EndorsmentDTO { Status = BusinessStatus.Error, Id = policy.PolicyNo, ResponseMessage = $"Transaction Failed for this Policy Number {policy.PolicyNo}" };

                                            }




                                            return new EndorsmentDTO() { Status = BusinessStatus.Updated, Id = EndorsementNo, ResponseMessage = $"Vehicle Added Successfully With this Endorsement Number {EndorsementNo} " };

                                        }
                                        else
                                        {
                                            return new EndorsmentDTO { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Calculate Premium Amount {CalculatePremiumResponse.TotalAmount} differs with payment collected amount {paymentinfoRequest[0].Amount}" };

                                        }
                                    }
                                    else
                                    {
                                        return new EndorsmentDTO { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Payment information is required for Endorsement" };

                                    }
                                }
                                else
                                {
                                    return new EndorsmentDTO { Status = BusinessStatus.InputValidationFailed, Id = policy.PolicyNo, ResponseMessage = $"Policy Request is not valid" };


                                }



                            }
                            else
                            {
                                ErrorInfo errorInfo = new ErrorInfo() { ErrorCode = "", ErrorMessage = "No record found for this policy Number" };

                                Errors.Add(errorInfo);
                                return new EndorsmentDTO() { Status = BusinessStatus.InputValidationFailed, Errors = Errors };
                            }
                        }
                        //Add Driver

                        if (EndorsmentType == "Addition of driver")
                        {

                            var policyNo = (string)insurableItemRequest["PolicyNumber"];
                            var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policyNo);
                            var policyId = tbl_particiant.PolicyId;
                            var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
                            var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                            dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
                            dynamic json1 = JsonConvert.DeserializeObject<dynamic>(insurableItem);



                            //Step2:Validate of Request Object
                            List<CDMapper> cDMappers = new List<CDMapper>();
                            CDMapper cD = new CDMapper();
                            cD.Type = "Policy";
                            cD.Data = json;
                            cDMappers.Add(cD);
                            cD = new CDMapper();
                            cD.Type = "Endorsement";
                            cD.Data = insurableItemRequest;
                            cDMappers.Add(cD);


                            var res = await _integrationService.RuleMapper(cDMappers, "EndorsementAdd", apiContext);

                            var seriaizeListofres = JsonConvert.SerializeObject(res);
                            List<ErrorDetailsData> Listofres = JsonConvert.DeserializeObject<List<ErrorDetailsData>>(seriaizeListofres.ToString());

                            var checkerrorlog = Listofres.FirstOrDefault(p => p.ValidatorName == "Final Result" && p.Outcome == "Fail");

                            if (Listofres != null)
                            {
                                foreach (var item in Listofres)
                                {

                                    if (item.Outcome == "Fail" && item.ValidatorName != "Final Result")
                                    {

                                        ErrorInfo errorInfo = new ErrorInfo { ErrorCode = item.Code, ErrorMessage = item.Message };
                                        Errors.Add(errorInfo);

                                    }

                                }
                                if (Errors.Count > 0)
                                {
                                    return new EndorsmentDTO { Status = BusinessStatus.Error, Errors = Errors };
                                }
                            }

                            //step:3 Call CD mapper
                            var CDmap = await _integrationService.CDMapperList(cDMappers, "EndorsementAdd", apiContext);
                            if (CDmap.Count > 0)
                            {

                                var CalculatePremiumResponse = CDmap.FirstOrDefault(s => s.TotalAmount > 0);

                                //Step3:Check Premium vs Payment Amount
                                var paymentinfo = insurableItemRequest["PaymentInfo"];
                                if (paymentinfo != null)
                                {
                                    var paymentinfoRequest = JsonConvert.DeserializeObject<List<PaymentInfo>>(paymentinfo.ToString());

                                    if ((paymentinfoRequest[0].Amount - CalculatePremiumResponse.TotalAmount) <= 1 || (paymentinfoRequest[0].Amount - CalculatePremiumResponse.TotalAmount) >= -1)
                                    {



                                        MicaCD micaCD = new MicaCD();
                                        micaCD.AccountNo = policy.CdaccountNumber;
                                        micaCD.micaCDDTO = CDmap;
                                        micaCD.Description = "Endorsement-Addition-" + EndorsementNo;


                                        if (insurableItemRequest["si"] != null)
                                        {

                                            json1["Balance SumInsured"] = Convert.ToInt64(json1["Balance SumInsured"]) + Convert.ToInt64(insurableItemRequest["si"]) - Convert.ToInt64(json1["si"]);


                                        }


                                        tbl_particiant.BalanceSumInsued = Convert.ToInt32(json1["Balance SumInsured"]);




                                        foreach (var insurableName in json.InsurableItem)
                                        {
                                            foreach (var item in insurableItemRequest.InsurableItem)
                                            {
                                                var name1 = insurableName.InsurableName;
                                                if (name1 == "Driver" && item.InsurableName == "Driver")
                                                {
                                                    foreach (var insurableName1 in json1.InsurableItem)
                                                    {

                                                        // var name2 = insurableName1.InsurableName;

                                                        var count = insurableName.RiskItems.Count;

                                                        //var additiondrivercount = json.additionalDriver + 1;
                                                        // var addtionaldriver = Convert.ToInt32(additiondrivercount);
                                                        if (insurableName.InsurableName == "Driver")
                                                        {

                                                            if (count < 3)
                                                            {

                                                                if (insurableItemRequest["si"] != null && Convert.ToInt64(insurableItemRequest["si"]) > 0)
                                                                {
                                                                    json1.si = insurableItemRequest.si;
                                                                }
                                                                foreach (var fields in item.RiskItems)
                                                                {
                                                                    try
                                                                    {
                                                                        //Note validation has to come vechile addition count can not be greater then 3

                                                                        if (insurableName1.InsurableName == "Driver" && insurableName.InsurableName == "Driver")
                                                                        {
                                                                            insurableName1.RiskItems.Add(fields);
                                                                            //insurableName1.RiskItems = insurableName.RiskItems;
                                                                            insurableName1.RiskCount = insurableName1.RiskItems.Count;

                                                                        }
                                                                    }
                                                                    catch (Exception e)
                                                                    {
                                                                    }

                                                                }
                                                            }
                                                            else
                                                            {
                                                                var data = await ModifyInsurabableItem(insurableItemRequest, apiContext);
                                                                if (data != null)
                                                                {
                                                                    return new EndorsmentDTO() { Status = BusinessStatus.Updated, ResponseMessage = "Driver updated successful" }; ;
                                                                }
                                                                ErrorInfo errorInfo = new ErrorInfo() { ErrorCode = "", ErrorMessage = "Driver can not be added" };
                                                                Errors.Add(errorInfo);
                                                                return new EndorsmentDTO() { Status = BusinessStatus.InputValidationFailed, Errors = Errors, ResponseMessage = "Number of Driver can not be changed." };
                                                            }

                                                        }
                                                    }

                                                }
                                            }

                                        }

                                        var expObj = JsonConvert.DeserializeObject<ExpandoObject>(json1.ToString());
                                        expObj.PremiumDetails = CDmap;
                                        // AddProperty(expObj, "PremiumDetails", CalculatePremiumResponse);
                                        var tempobj = JsonConvert.SerializeObject(expObj);
                                        json1 = JsonConvert.DeserializeObject<dynamic>(tempobj.ToString());

                                        tblPolicyDetailsdata.PolicyRequest = json1.ToString();
                                        _context.TblPolicyDetails.Update(tblPolicyDetailsdata);

                                        //endorsement details saveing 


                                        EndorsementDetailsDTO endorsementDetailsDTO = new EndorsementDetailsDTO();
                                        endorsementDetailsDTO.Action = EndorsmentType;
                                        endorsementDetailsDTO.EndorsementNo = EndorsementNo;
                                        endorsementDetailsDTO.EndorsementEffectivedate = DatetimeNow;
                                        endorsementDetailsDTO.EnddorsementRequest = insurableItemRequest.ToString();
                                        TblEndorsementDetails tblEndorsement_mapper = _mapper.Map<TblEndorsementDetails>(endorsementDetailsDTO);
                                        _context.TblEndorsementDetails.Add(tblEndorsement_mapper);
                                        _context.TblPolicy.Update(policy);
                                        _context.SaveChanges();


                                        //Step5:CD Transaction for the policy
                                        var transaction = await _integrationService.CreateMasterCDAccount(micaCD, apiContext);
                                        BusinessStatus businessStatus = 0;
                                        businessStatus = transaction.Status;

                                        if (businessStatus == BusinessStatus.Created)
                                        {
                                            //Status for Txn

                                        }
                                        else
                                        {

                                            return new EndorsmentDTO { Status = BusinessStatus.Error, Id = policy.PolicyNo, ResponseMessage = $"CD Transaction Failed for this Policy Number {policy.PolicyNo}" };

                                        }




                                        return new EndorsmentDTO() { Status = BusinessStatus.Updated, Id = EndorsementNo, ResponseMessage = "Driver Added Successfully" };
                                    }
                                    else
                                    {
                                        return new EndorsmentDTO { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Calculate Premium Amount {CalculatePremiumResponse.TotalAmount} differs with payment collected amount {paymentinfoRequest[0].Amount}" };

                                    }
                                }
                                else
                                {
                                    return new EndorsmentDTO { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Payment information is required for Endorsement" };

                                }
                            }
                            else
                            {
                                return new EndorsmentDTO { Status = BusinessStatus.InputValidationFailed, Id = policy.PolicyNo, ResponseMessage = $"Policy Request is not valid for CD Transaction" };


                            }
                        }


                    }




                    // _context.SaveChanges();
                    return new EndorsmentDTO() { Status = BusinessStatus.NothingModified, Id = EndorsementNo, ResponseMessage = "Nothing is Modified" };

                }
                else
                {

                    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"No Record Found for this PolicyNumber{PolicyNo}" };
                    Errors.Add(errorInfo);
                    return new EndorsmentDTO() { Status = BusinessStatus.NotFound, Errors = Errors };

                }
            }

            catch (Exception ex)
            {
                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = ex.InnerException.ToString() };
                Errors.Add(errorInfo);
                return new EndorsmentDTO() { Status = BusinessStatus.NotFound, Errors = Errors };

            }

        }

        public async Task<EndorsmentDTO> RemoveInsurableItem(dynamic insurableItemRequest, ApiContext apiContext)
        {

            //_context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;
           DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

            List<ErrorInfo> Errors = new List<ErrorInfo>();
            string PolicyNo = insurableItemRequest["PolicyNumber"].ToString();
            string endoresementtype = insurableItemRequest["EndorsementType"];
            if (PolicyNo == "")
            {
                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"PolicyNumber can not be empty" };
                Errors.Add(errorInfo);
                return new EndorsmentDTO() { Status = BusinessStatus.InputValidationFailed, Errors = Errors };

            }




            string EndorsementNo = "";
            var policy = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == PolicyNo);
            if (policy != null)
            {
                policy.PolicyVersion++;
                EndorsementNo = policy.PolicyNo + "" + "_" + (policy.PolicyVersion).ToString();
                if (insurableItemRequest.InsurableItem != null && insurableItemRequest.InsurableItem.Count > 0)
                {

                    foreach (var item in insurableItemRequest.InsurableItem)
                    {


                        foreach (var insurableInsurablefields in item.RiskItems)
                        {

                            string IdentificationNo = insurableInsurablefields["Identification Number"].ToString();

                            var verify = _context.TblPolicyInsurableDetails.Where(x => x.IdentificationNo == IdentificationNo && x.PolicyId == policy.PolicyId);

                            foreach (var insureditem in verify)
                            {
                                insureditem.IsActive = false;

                            }

                        }

                    }




                    var policyNo = (string)insurableItemRequest["PolicyNumber"];
                    var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policyNo);
                    var policyId = tbl_particiant.PolicyId;
                    var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
                    var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                    dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
                    dynamic json1 = JsonConvert.DeserializeObject<dynamic>(insurableItem);

                    if (insurableItemRequest["si"] != null)
                    {

                        json1["Balance SumInsured"] = Convert.ToInt64(json1["Balance SumInsured"]) + Convert.ToInt64(insurableItemRequest["si"]) - Convert.ToInt64(json1["si"]);


                    }
                    tbl_particiant.BalanceSumInsued = Convert.ToInt32(json1["Balance SumInsured"]);

                    //Step2:Validate of Request Object
                    List<CDMapper> cDMappers = new List<CDMapper>();
                    CDMapper cD = new CDMapper();
                    cD.Type = "Policy";
                    cD.Data = json;
                    cDMappers.Add(cD);
                    cD = new CDMapper();
                    cD.Type = "Endorsement";
                    cD.Data = insurableItemRequest;
                    cDMappers.Add(cD);


                    var res = await _integrationService.RuleMapper(cDMappers, "EndorsementDel", apiContext);

                    var seriaizeListofres = JsonConvert.SerializeObject(res);
                    List<ErrorDetailsData> Listofres = JsonConvert.DeserializeObject<List<ErrorDetailsData>>(seriaizeListofres.ToString());
                    var seriaizeListofres1 = JsonConvert.SerializeObject(cDMappers);

                    var checkerrorlog = Listofres.FirstOrDefault(p => p.ValidatorName == "Final Result" && p.Outcome == "Fail");

                    if (Listofres != null)
                    {
                        foreach (var item in Listofres)
                        {

                            if (item.Outcome == "Fail" && item.ValidatorName != "Final Result")
                            {

                                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = item.Code, ErrorMessage = item.Message };
                                Errors.Add(errorInfo);

                            }

                        }
                        if (Errors.Count > 0)
                        {
                            return new EndorsmentDTO { Status = BusinessStatus.Error, Errors = Errors };
                        }
                    }

                    //step:3 Call CD mapper
                    var CDmap = await _integrationService.CDMapperList(cDMappers, "EndorsementDel", apiContext);
                    MicaCD micaCD = new MicaCD();

                    if (CDmap.Count > 0)
                    {
                       
                        micaCD.AccountNo = policy.CdaccountNumber;
                        micaCD.micaCDDTO = CDmap;
                        micaCD.Description = "Endorsement-Deletion-" + EndorsementNo;

                    }


                       // var CalculatePremiumResponse = CDmap.FirstOrDefault(s => s.TotalAmount > 0);


                        foreach (var item in insurableItemRequest.InsurableItem)
                        {

                            foreach (var insurableName in json.InsurableItem)
                            {
                                foreach (var insurableName1 in json1.InsurableItem)
                                {
                                    if (item.InsurableName == "Vehicle" && insurableName.InsurableName == "Vehicle" && insurableName1.InsurableName == "Vehicle")
                                    {
                                        foreach (var fields in item.RiskItems)
                                        {
                                            if (insurableName.RiskItems.Count > 0)
                                            {
                                                try
                                                {
                                                    foreach (var jsoninsurableFields in insurableName.RiskItems)
                                                    {

                                                        var InputidentificationNumber = (string)fields["Identification Number"];
                                                        var TblIdentificationNo = (string)jsoninsurableFields["Identification Number"];
                                                        if (InputidentificationNumber == TblIdentificationNo)
                                                        {
                                                            var removeitem = jsoninsurableFields;
                                                            insurableName.RiskItems.Remove(removeitem);

                                                        }
                                                    }

                                                }
                                                catch (Exception e)
                                                {

                                                    insurableName1.RiskItems = insurableName.RiskItems;
                                                    if (insurableName1.InsurableName == "Vehicle")
                                                    {
                                                        insurableName1.RiskCount = insurableName1.RiskItems.Count;
                                                        if (fields["Vehicle Type"] == "PC")
                                                        {
                                                            json1.noOfPC = (Convert.ToInt32(json1.noOfPC) - 1).ToString();
                                                        }
                                                        if (fields["Vehicle Type"] == "TW")
                                                        {
                                                            json1.noOfTW = (Convert.ToInt32(json1.noOfTW) - 1).ToString();

                                                        }
                                                    }
                                                }

                                            }
                                        }
                                    }

                                }
                            }

                        }

                    if (CDmap.Count > 0)
                    {
                        var expObj = JsonConvert.DeserializeObject<ExpandoObject>(json1.ToString());

                        expObj.PremiumDetails = CDmap;
                        // AddProperty(expObj, "PremiumDetails", CalculatePremiumResponse);
                        var tempobj = JsonConvert.SerializeObject(expObj);
                        json1 = JsonConvert.DeserializeObject<dynamic>(tempobj.ToString());
                    }

                        tblPolicyDetailsdata.PolicyRequest = json1.ToString();
                        var x1 = _context.TblPolicyDetails.Update(tblPolicyDetailsdata);

                        EndorsementDetailsDTO endorsementDetailsDTO = new EndorsementDetailsDTO();
                        endorsementDetailsDTO.Action = endoresementtype;
                        endorsementDetailsDTO.EndorsementNo = EndorsementNo;
                        endorsementDetailsDTO.EndorsementEffectivedate = DatetimeNow;
                        endorsementDetailsDTO.EnddorsementRequest = insurableItemRequest.ToString();
                        endorsementDetailsDTO.IsPremiumRegister = true;
                        endorsementDetailsDTO.UpdatedResponse = json1.ToString();
                        //policyId
                        endorsementDetailsDTO.PolicyId = policyId;
                        TblEndorsementDetails tblEndorsement_mapper1 = _mapper.Map<TblEndorsementDetails>(endorsementDetailsDTO);
                        _context.TblEndorsementDetails.Add(tblEndorsement_mapper1);
                        _context.TblPolicy.Update(policy);


                        var x2 = await _context.SaveChangesAsync();

                    //Step5:CD Transaction for the policy
                    if (micaCD.micaCDDTO.Count > 0)
                    {
                        var transaction = await _integrationService.CreateMasterCDAccount(micaCD, apiContext);
                        BusinessStatus businessStatus = 0;
                        businessStatus = transaction.Status;

                        if (businessStatus == BusinessStatus.Created)
                        {
                            //Status for Txn

                        }
                        else
                        {

                            return new EndorsmentDTO { Status = BusinessStatus.Error, Id = policy.PolicyNo, ResponseMessage = $"CD Transaction Failed for this Policy Number {policy.PolicyNo}" };

                        }
                    }

                        if (x2 > 0)
                        {
                            return new EndorsmentDTO() { Status = BusinessStatus.Ok, ResponseMessage = "Deleted Successfully" };
                        }
                        else
                        {
                            return new EndorsmentDTO() { Status = BusinessStatus.Error, ResponseMessage = "Somthing went wrong while deleting" };
                        }
                    //}
                    //else
                    //{
                    //    return new EndorsmentDTO { Status = BusinessStatus.InputValidationFailed, Id = policy.PolicyNo, ResponseMessage = $"Policy Request is not valid for CD Transaction" };


                    //}
                }


            }



            else
            {
                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"No records found for this policyNumber {PolicyNo}" };
                Errors.Add(errorInfo);
                return new EndorsmentDTO() { Status = BusinessStatus.NotFound, Errors = Errors };

            }
            //EndorsementDetailsDTO tblEndorsementDetails = new EndorsementDetailsDTO();
            //tblEndorsementDetails.EnddorsementRequest = insurableItemRequest.ToString();

            //TblEndorsementDetails tblEndorsement_mapper = _mapper.Map<TblEndorsementDetails>(tblEndorsementDetails);

            //_context.TblEndorsementDetails.Add(tblEndorsement_mapper);
            //_context.SaveChanges();

            return new EndorsmentDTO();


        }
        public async Task<EndorsmentDTO> SwitchOnOff(dynamic switchOnOffRequest, ApiContext apiContext)
        {
            return new EndorsmentDTO();
        }

        //
        public async Task<decimal> GetPolicyDetailsByPolicyNo(string PolicyNO, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tblpolicydata = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == PolicyNO);
            if (tblpolicydata != null)
            {
                var tblpolicy = _mapper.Map<PolicyDTO>(tblpolicydata);

                var decima = Decimal.Parse(tblpolicy.BundleTxnId);
                int val1 = Decimal.ToInt32(decima);
                var CDBalanceData = await _integrationService.GetcddataAsync(val1, apiContext);
                return (decimal)CDBalanceData.AvailableAmount;
            }
            return 0;
        }

        //GetMasterPolicy

        public async Task<List<PolicyDetails>> GetAllPolicy(string productCode, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var productDetails = await _integrationService.GetProductDetailByCodeAsync(productCode, apiContext);
            if (productDetails != null)
            {
                var policydata = _context.TblPolicy.Where(x => (x.IsActive == true && x.ProductIdPk == productDetails.ProductId && x.PolicyNo != null)).
                    Select(s => new PolicyDetails
                    {

                        PolicyNumber = s.PolicyNo,
                        SumInsured = s.SumInsured,
                        PolicyStartDate = s.PolicyStartDate.ToString(),
                        PolicyEndDate = s.PolicyEndDate.ToString(),
                        PremiumAmount = s.PremiumAmount

                    }
                    )
                    .ToList();

                return policydata;



            }
            return null;
        }

        //UpdateInsurableItem

        public async Task<PolicyDTO> ModifyInsurabableItem(dynamic modifydata, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;
            DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

            var policyNo = (string)modifydata["PolicyNumber"];
            var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policyNo);
            var policyId = tbl_particiant.PolicyId;
            var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            var type = "Update Proposal";

            var tblPolicy = ModifyUpdateInsurabableItem(modifydata, type, tbl_particiant, tblPolicyDetailsdata,DatetimeNow, Errors, apiContext);
            return _mapper.Map<PolicyDTO>(tblPolicy);
        }

        private async Task<TblPolicy> ModifyUpdateInsurabableItem(dynamic modifydata, string type, TblPolicy tblPolicy, TblPolicyDetails tblPolicyDetails,DateTime DatetimeNow, List<ErrorInfo> Errors, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var policyNo = (string)modifydata["PolicyNumber"];
            var policyId = tblPolicy.PolicyId;
            var insurableItem = tblPolicyDetails.PolicyRequest;
            dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
            dynamic json1 = JsonConvert.DeserializeObject<dynamic>(insurableItem);

            int rowIndex = 0;
            int riskCount = 0;
            //int riskCount = 0;
            foreach (var item in modifydata.InsurableItem)
            {
                rowIndex = 0;
                foreach (var insurableName in json.InsurableItem)
                {
                    if (item.InsurableName == insurableName.InsurableName)
                    {
                        break;
                    }
                    rowIndex++;
                }
                var oldInsItem = json1["InsurableItem"][rowIndex];///get thd data name
                riskCount = Convert.ToInt16(oldInsItem["RiskCount"]);
                var riskIndex = 0;
                foreach (var fields in item.RiskItems)
                {
                    try
                    {

                        foreach (var risk in oldInsItem.RiskItems)
                        {
                            if (fields["Identification Number"] == risk["Identification Number"])
                            {
                                break;
                            }
                            riskIndex++;
                        }
                        var Adddata = fields;
                        if (oldInsItem["RiskItems"].Count > riskIndex)
                        {
                            var jsoninsurableFields = oldInsItem["RiskItems"][riskIndex];//identification numbefr
                            var InputidentificationNumber = (string)fields["Identification Number"];
                            var TblIdentificationNo = (string)jsoninsurableFields["Identification Number"];

                            if (InputidentificationNumber == TblIdentificationNo)
                            {
                                var removeitem = jsoninsurableFields;
                                oldInsItem.RiskItems.Remove(removeitem);
                                oldInsItem.RiskItems.Add(Adddata);
                            }
                            else
                            {
                                if (oldInsItem.RiskItems.Count < riskCount)
                                {
                                    oldInsItem.RiskItems.Add(Adddata);
                                }
                                else
                                {
                                    // Error needs to throw
                                }
                            }
                        }
                        else
                        {
                            if (oldInsItem.RiskItems.Count < riskCount)
                            {
                                oldInsItem.RiskItems.Add(Adddata);
                            }
                            else
                            {
                                ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = "RiskItems data is mismatch", ErrorCode = "RiskCount" };
                                Errors.Add(errorInfo);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = ex.Message, ErrorCode = "" };
                        Errors.Add(errorInfo);
                    }
                }
            }
            if (Errors.Count > 0)
            {
                return null;
            }
            _context.TblPolicy.Update(tblPolicy);
            tblPolicyDetails.PolicyRequest = json1.ToString();
            _context.TblPolicyDetails.Update(tblPolicyDetails);

            //Saving data into tblEndorsementDetails table
            try
            {
                EndorsementDetailsDTO endorsementDetailsDTO = new EndorsementDetailsDTO();
                endorsementDetailsDTO.Action = type;
                if (type == "Update Proposal")
                {
                  
                    endorsementDetailsDTO.IsPremiumRegister = false;
                    endorsementDetailsDTO.EndorsementEffectivedate = DatetimeNow;
                }
                if (type == "Issue Policy")
                {

                    endorsementDetailsDTO.IsPremiumRegister = true;
                    endorsementDetailsDTO.EndorsementEffectivedate = DatetimeNow;
                }
               

               
                endorsementDetailsDTO.EnddorsementRequest = modifydata.ToString();
                endorsementDetailsDTO.UpdatedResponse = json1.ToString();
                //policyId
                endorsementDetailsDTO.PolicyId = policyId;


                TblEndorsementDetails tblEndorsement_mapper = _mapper.Map<TblEndorsementDetails>(endorsementDetailsDTO);

                _context.TblEndorsementDetails.Add(tblEndorsement_mapper);

                foreach (var item in modifydata.InsurableItem)
                {

                    foreach (var Data in item.RiskItems)
                    {
                        var id = (string)Data["Identification Number"];
                        var insurabledetails = _context.TblPolicyInsurableDetails.Where(s => s.IdentificationNo == id && s.PolicyId == policyId).ToList();
                        if (insurabledetails.Count() > 0)
                        {

                            //dynamic polFields = new ExpandoObject();

                            foreach (var temp in insurabledetails)
                            {
                                dynamic polFields = JsonConvert.DeserializeObject<ExpandoObject>(temp.CoverValue);


                                if (id == temp.IdentificationNo)
                                {
                                    foreach (var insItem in Data)
                                    {
                                        if (insItem.Name == "Documents" || insItem.Name == "Identification Number" || insItem.Name == "Name")
                                        {

                                        }
                                        else
                                        {

                                            AddProperty(polFields, insItem.Name, Data[insItem.Name].ToString());
                                        }




                                    }
                                    temp.CoverValue = JsonConvert.SerializeObject(polFields);
                                }
                            }
                            _context.TblPolicyInsurableDetails.UpdateRange(insurabledetails);
                        }
                    }
                }



                _context.SaveChanges();
            }
            catch (Exception e)
            {

            }

            return tblPolicy;
        }

        //GetInsurableItemDetails
        public async Task<dynamic> GetInsurableItemDetails(string policyNo, string insurableItemName, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policyNo);
            var policyId = tbl_particiant.PolicyId;
            var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
            var insurableItem = tblPolicyDetailsdata.PolicyRequest;
            dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);

            if (tbl_particiant != null)
            {
                foreach (var insurableName in json.InsurableItem)
                {
                    if (insurableName.InsurableName == insurableItemName)
                    {


                        return insurableName.RiskItems;


                    }
                    else
                    {
                        return null;
                    }

                }
            }


            //tblPolicyDetailsdata.PolicyRequest = json.ToString();
            //_context.TblPolicyDetails.Update(tblPolicyDetailsdata);
            //_context.SaveChanges();
            return null;
        }


        /*CalCulate Premium*/

        public async Task<object> CalCulatePremium(DynamicData premiumParameter, ApiContext apiContext)
        {


            var Data = await _integrationService.CalCulateRatingPremium(premiumParameter, apiContext);


            return Data;
        }

        public async Task<decimal> UpdateSumInsured(string PolicyNumber, decimal amount, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var policydetails = _context.TblPolicy.FirstOrDefault(s => s.PolicyNo == PolicyNumber);
            if (policydetails != null)
            {
                policydetails.SumInsured = policydetails.SumInsured - amount;
                _context.Update(policydetails);
                _context.SaveChanges();
                return (decimal)policydetails.SumInsured;
            }
            return 0;

        }

        public async Task<PolicyResponse> UpdateBalanceSumInsured(string PolicyNumber, decimal amount, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var policydetails = _context.TblPolicy.FirstOrDefault(s => s.PolicyNo == PolicyNumber);
            if (policydetails != null)
            {

                var policy = _context.TblPolicyDetails.FirstOrDefault(s => s.PolicyId == policydetails.PolicyId);
                var dynamicPolicyrequest = JsonConvert.DeserializeObject<dynamic>(policy.PolicyRequest.ToString());
                var expObj = JsonConvert.DeserializeObject<ExpandoObject>(policy.PolicyRequest.ToString());

                if (dynamicPolicyrequest["Balance SumInsured"] == null)
                {
                    if (policydetails.SumInsured >= amount)
                    {
                        var SumInsuredamount = policydetails.SumInsured - amount;
                        AddProperty(expObj, "Balance SumInsured", SumInsuredamount);
                        var tempobj = JsonConvert.SerializeObject(expObj);
                        var json = JsonConvert.DeserializeObject<dynamic>(tempobj.ToString());
                        policy.PolicyRequest = json.ToString();
                    }
                    else
                    {
                        return new PolicyResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Claim Amount {amount} cannot be more from SumInsured Amount {policydetails.SumInsured}" };

                    }
                }
                else if (dynamicPolicyrequest["Balance SumInsured"] != null)
                {
                    if (dynamicPolicyrequest["Balance SumInsured"] >= amount)
                    {
                        dynamicPolicyrequest["Balance SumInsured"] = dynamicPolicyrequest["Balance SumInsured"] - amount;
                        policy.PolicyRequest = dynamicPolicyrequest.ToString();
                        policydetails.BalanceSumInsued = policydetails.BalanceSumInsued - Convert.ToInt32(amount);
                    }
                    else
                    {
                        return new PolicyResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Claim Amount {amount} cannot be more from Balance SumInsured Amount {dynamicPolicyrequest["Balance SumInsured"]}" };

                    }
                }



                _context.TblPolicy.Update(policydetails);
                _context.TblPolicyDetails.Update(policy);
                _context.SaveChanges();
                return new PolicyResponse { Status = BusinessStatus.Updated, ResponseMessage = $"balance SumInsured Updated for this policy number {PolicyNumber}" };

            }
            return new PolicyResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"No Record Found for this policy number {PolicyNumber}" };


        }



        //Creating proposal 

        public async Task<ProposalResponse> CreateProposal(dynamic ProposalDetail, ApiContext apiContext)

        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));


            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone= UserDateTime.KeyValue;

            List<ErrorInfo> Errors = new List<ErrorInfo>();

            SingleCover singleCover = new SingleCover();

            decimal PolicyId = 0; string policyNumber = ""; string proposalNumber = ""; decimal premiumAmount = 0;

            string logMsg = "";

            try
            {

                //Step1:Validate of Request Object



                //var res = await _integrationService.RuleMapper(ProposalDetail, "Proposal", apiContext);
                //if (res!=null)
                //{
                //    var seriaizeListofres = JsonConvert.SerializeObject(res);
                //    List<ErrorDetailsData> Listofres = JsonConvert.DeserializeObject<List<ErrorDetailsData>>(seriaizeListofres.ToString());


                //    var checkerrorlog = Listofres.FirstOrDefault(p => p.ValidatorName == "Final Result" && p.Outcome == "Fail");
                //    if (Listofres != null)
                //    {
                //        foreach (var item in Listofres)
                //        {

                //            if (item.Outcome == "Fail" && item.ValidatorName != "Final Result")
                //            {

                //                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = item.Code, ErrorMessage = item.Message, PropertyName = item.ValidatorName };
                //                Errors.Add(errorInfo);

                //            }

                //        }
                //        if (Errors.Count > 0)
                //        {
                //            return new ProposalResponse { Status = BusinessStatus.Error, Errors = Errors };
                //        }

                //Step2:Premium  calculation 



                Errors = GetPolicyRequestValidation(ProposalDetail);
                //PremiumRequestDTO premiumRequestDTO = new PremiumRequestDTO();
                //premiumRequestDTO.SI = ProposalDetail["si"];
                //premiumRequestDTO.StateCode = ProposalDetail["stateCode"];
                //premiumRequestDTO.NoOfPC = ProposalDetail["noOfPC"];
                //premiumRequestDTO.NoOfTW = ProposalDetail["noOfTW"];
                //premiumRequestDTO.DriverAge = ProposalDetail["driverAge"];
                //premiumRequestDTO.DriverExp = ProposalDetail["driverExp"];
                //premiumRequestDTO.AdditionalDriver = ProposalDetail["additionalDriver"];
                //premiumRequestDTO.BillingFrequency = ProposalDetail["billingFrequency"];



                // var CalculatePremiumResponse = await PremiumCalCulation(premiumRequestDTO, apiContext);
                List<MicaCDDTO> CDmap = await _integrationService.CDMapper(ProposalDetail, "Proposal", apiContext);
                if (CDmap.Count() > 0)
                {
                    var CalculatePremiumResponse = CDmap.FirstOrDefault(s => s.TotalAmount > 0);

                    //Step3:Check Premium vs Payment Amount
                    var paymentinfo = ProposalDetail["PaymentInfo"];
                    if (paymentinfo != null)
                    {
                        var paymentinfoRequest = JsonConvert.DeserializeObject<List<PaymentInfo>>(paymentinfo.ToString());

                        if ((paymentinfoRequest[0].Amount - CalculatePremiumResponse.TotalAmount) <= 1 && (paymentinfoRequest[0].Amount - CalculatePremiumResponse.TotalAmount) >= -1)
                        {
                            var expObj = JsonConvert.DeserializeObject<ExpandoObject>(ProposalDetail.ToString());

                            if (Errors.Count > 0)
                            {
                                return new ProposalResponse { Status = BusinessStatus.InputValidationFailed, Errors = Errors };
                            }
                            var productCode = ProposalDetail["Product Code"].ToString();


                            var productDetails = await _integrationService.GetProductDetailByCodeAsync(productCode, apiContext);

                            if (productDetails.ProductId <= 0)
                            {
                                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "ProductCode", PropertyName = "Product Code", ErrorMessage = $"ProdcutCode : {productCode} Not Found" };
                                Errors.Add(errorInfo);
                                return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                            }
                            var productId = productDetails.ProductId.ToString();

                            string cover = "", coverEvent = "", productName = "";

                            productName = productDetails.ProductName;


                            logMsg = "1";
                            logMsg = logMsg + ",2";

                            var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
                            /*Partner Section*/
                            var partnerId = "";
                            if (ProposalDetail["Partner ID"] != null)

                            {
                                partnerId = ProposalDetail["Partner ID"].ToString();
                            }
                            PartnersDTO partnerDetails = null;
                            // partnerDetails = await _integrationService.GetPartnerDetailAsync(partnerId, apiContext);
                            //if (partnerDetails != null)
                            //{
                            //    if (partnerDetails.PartnerId <= 0)

                            //    {

                            //        ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PartnerID", PropertyName = "PartnerID", ErrorMessage = $"PartnerID : {productCode} Not Found" };

                            //        Errors.Add(errorInfo);

                            //        return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };

                            //    }
                            //}
                            if (policyRiskDetails.ProductRcbDetails.Count <= 0)
                            {
                                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "RiskDetail", PropertyName = "RiskDetail", ErrorMessage = $"RiskDetail for product : {partnerId} Not Found" };
                                Errors.Add(errorInfo);
                                return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                            }

                            //Step4:Genrate Proposal Number
                            logMsg = logMsg + ",3";
                            var mappedPolicy = await MapAndValidateInsurablePolicyAsync(ProposalDetail, productDetails, partnerDetails, policyRiskDetails, Errors, singleCover, "ProposalNo", apiContext);
                            if (ProposalDetail["si"] != null)
                            {
                                mappedPolicy.SumInsured = Convert.ToDecimal(ProposalDetail["si"]);
                                mappedPolicy.BalanceSumInsued = Convert.ToInt32(ProposalDetail["si"]);
                            }
                            if (Errors.Count == 0)
                            {
                                if (partnerDetails != null)
                                {
                                    if (partnerDetails.OrganizationId > 0)
                                    {
                                        mappedPolicy.CustomerId = Convert.ToInt32(productDetails.OrganizationId).ToString();
                                    }

                                }
                                else
                                {
                                    mappedPolicy.CustomerId = Convert.ToInt32(productDetails.OrganizationId).ToString();
                                }


                                var ProposalObj = JsonConvert.DeserializeObject<ExpandoObject>(ProposalDetail.ToString());
                                AddProperty(expObj, "ProposalNumber", mappedPolicy.ProposalNo);
                                AddProperty(expObj, "Balance SumInsured", ProposalDetail["si"]);
                                AddProperty(expObj, "No. of Claim", 0);
                                AddProperty(expObj, "PolicyStatus", "InActive");

                                var Proposaltempobj = JsonConvert.SerializeObject(expObj);
                                ProposalDetail = JsonConvert.DeserializeObject<dynamic>(Proposaltempobj.ToString());



                                //Step5:Create CD account Number 
                                proposalNumber = mappedPolicy.ProposalNo;
                                Random random = new Random();
                                var rnd = random.Next(10000, 99999);
                                var CdaccountNumber = proposalNumber + "/" + rnd;
                                mappedPolicy.CdaccountNumber = CdaccountNumber;



                                //Step6:Based on the Product Type update CDAccountNumber in Policy table


                                //Step7:Add payment section Inside Proposal Json
                                logMsg = logMsg + ",4";

                                AddProperty(expObj, "PremiumDetails", CDmap);
                                var tempobj = JsonConvert.SerializeObject(expObj);
                                ProposalDetail = JsonConvert.DeserializeObject<dynamic>(tempobj.ToString());

                                //Step8:Save Proposal in all relevant table

                                DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);



                                PolicyId = SavePolicyDetails(mappedPolicy, ProposalDetail, DatetimeNow);

                                //Step9:Post CD Account entries 

                                BusinessStatus businessStatus = 0;
                                //if (productDetails.IsMasterPolicy == true)
                                //{
                                //Calling CD mapping API


                                // List<MicaCDDTO> CDmap = await _integrationService.CDMapper(ProposalDetail, "Proposal", apiContext);
                                MicaCD micaCD = new MicaCD();
                                micaCD.AccountNo = CdaccountNumber;
                                micaCD.micaCDDTO = CDmap;
                                micaCD.Description = "Proposal Created-" + mappedPolicy.ProposalNo;
                                micaCD.micaCDDTO = CDmap;



                                //Create CD Account 
                                var TxnResponse = await _integrationService.CDAccountCreation(CdaccountNumber, apiContext);

                                if (TxnResponse.Status == BusinessStatus.Created)
                                {
                                    // CD Txn 
                                    var transaction = await _integrationService.CreateMasterCDAccount(micaCD, apiContext);

                                    businessStatus = transaction.Status;

                                    TblPolicy policyUpdate = _context.TblPolicy.Find(PolicyId);
                                    var Amount = paymentinfoRequest[0].Amount;

                                    /*partner Id*/
                                    var pID = apiContext.PartnerId;

                                    if (partnerDetails != null && partnerDetails.GetType().GetProperty("OrganizationId") != null)

                                    {

                                        pID = (decimal)partnerDetails.GetType().GetProperty("OrganizationId").GetValue(partnerDetails, null);

                                    }


                                    if (businessStatus == BusinessStatus.Created)

                                    {


                                        policyUpdate.PolicyStageId = ModuleConstants.PolicyStageProposal;
                                        policyUpdate.PolicyStatusId = ModuleConstants.PolicyStatusInActive;
                                        policyUpdate.PolicyStatus = ModuleConstants.ProposalStatus;
                                        policyUpdate.PolicyStageStatusId = ModuleConstants.PolicyStageProposalCreated;

                                        policyUpdate.IsActive = true;

                                        // Add payment table
                                   
                                        TblPolicyPayment policyPayment = new TblPolicyPayment()

                                        {

                                            PaidAmount = Amount,

                                            CreatedDate = DatetimeNow,

                                            PolicyId = PolicyId

                                        };

                                        _context.TblPolicyPayment.Add(policyPayment);

                                        _context.SaveChanges();

                                        //  var paytmtransactionResponce = await _integrationService.DoTransactionByPayment(PolicyId, Amount, mappedPolicy.MobileNumber, apiContext);


                                        return new ProposalResponse { Status = BusinessStatus.Created, Id = proposalNumber, ResponseMessage = $"Proposal created with proposal number {proposalNumber}" };

                                    }
                                    else
                                    {

                                        return new ProposalResponse { Status = BusinessStatus.Error, ResponseMessage = $"CD Transaction failed for this accountnumber {CdaccountNumber}" };

                                    }
                                }
                                else
                                {

                                    return new ProposalResponse { Status = BusinessStatus.Error, ResponseMessage = $"Account creation failed for this accountnumber {CdaccountNumber}" };
                                }


                            }
                            //}
                            //step10:Push Proposal creation event to dispatcher






                        }

                        else

                        {



                            return new ProposalResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Calculate Premium Amount {CalculatePremiumResponse.TotalAmount} differs with payment collected amount {paymentinfoRequest[0].Amount}" };

                        }

                    }
                    else
                    {

                        return new ProposalResponse { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Payment information is required for Proposal Creation" };

                    }
                }

                // }
                //}
                //else
                //{
                //    return new ProposalResponse { Status = BusinessStatus.Error, Errors = Errors, ResponseMessage = "Input Validation failed" };

                //}


            }

            catch (Exception ex)

            {

                ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = ex.Message, ErrorCode = logMsg };

                Errors.Add(errorInfo);

            }

            return new ProposalResponse { Status = BusinessStatus.Error, Errors = Errors };



        }


        //Get Risk details By Policy Number not tested data is not present in database.
        public async Task<List<PolicyPremiumDetailsDTO>> GetRiskItemByPolicyNo(string PolicyNO, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            PolicyPremiumDetailsDTO policyPremiumDetailsDTO = new PolicyPremiumDetailsDTO();
            PolicyDetails policydetail = new PolicyDetails();
            var data = "";
            var tblpolicydata = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == PolicyNO);
            if (tblpolicydata != null)
            {
                var tblpolicy = _mapper.Map<PolicyDTO>(tblpolicydata);
                var policyId = tblpolicy.PolicyId;
                var policydetails = _context.TblPolicyDetails.SingleOrDefault(p => p.PolicyId == policyId).PolicyRequest;
                var json = JsonConvert.DeserializeObject<dynamic>(policydetails);
                return json.CalculatePremium;
            }
            else { return null; }

        }

        //Get Proposal By proposal No

        public async Task<PolicyProposalResponse> GetProposalDetails(string proposalNo, string Mobileno, string policyno, ApiContext apiContext)
        {
            PolicyProposalResponse policyResponse = new PolicyProposalResponse();
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            TblPolicy tbl_particiant = null;
            if (!string.IsNullOrEmpty(proposalNo) && !string.IsNullOrEmpty(policyno))
            {
                tbl_particiant = _context.TblPolicy.LastOrDefault(x => x.ProposalNo == proposalNo && x.PolicyNo == policyno);


            }
            else if (proposalNo != null && proposalNo != "")
            {
                tbl_particiant = _context.TblPolicy.LastOrDefault(x => x.ProposalNo == proposalNo);

            }
            else if (Mobileno != null && Mobileno != "")
            {
                tbl_particiant = _context.TblPolicy.LastOrDefault(x => x.MobileNumber == Mobileno);

            }

            else if (policyno != null && policyno != "")
            {
                tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policyno);

            }
            if (tbl_particiant != null)
            {
                var policyId = tbl_particiant.PolicyId;
                var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);


                var insurableItem = tblPolicyDetailsdata.PolicyRequest;


                var ProposalObj = JsonConvert.DeserializeObject<ExpandoObject>(insurableItem.ToString());
                AddProperty(ProposalObj, "PolicyNumber", tbl_particiant.PolicyNo);
                var Proposaltempobj = JsonConvert.SerializeObject(ProposalObj);
                dynamic json = JsonConvert.DeserializeObject<dynamic>(Proposaltempobj.ToString());
                policyResponse.ProposalPolicyDetail = json;
                return new PolicyProposalResponse { Status = BusinessStatus.Ok, ProposalPolicyDetail = json };

            }
            //List<dynamic> fields = new List<dynamic>();
            //// List<dynamic> fields1 = new List<dynamic>();
            //RiskField insurableField = new RiskField();

            //if (tbl_particiant != null)
            //{
            //    foreach (var insurableName in json.InsurableItem)
            //    {
            //        insurableField = new RiskField();
            //        insurableField.insurableName = insurableName.InsurableName;
            //        insurableField.Riskfields = insurableName.RiskItems;
            //        fields.Add(insurableField);
            //    }
            //    return fields;
            //}
            //else
            //{
            //    return null;
            //}
            return new PolicyProposalResponse { Status = BusinessStatus.NotFound, ProposalPolicyDetail = null, ResponseMessage = "Data not found" };

            //return "Data not found";
            //tblPolicyDetailsdata.PolicyRequest = json.ToString();
            //_context.TblPolicyDetails.Update(tblPolicyDetailsdata);
            //_context.SaveChanges();

        }


        public async Task<PolicyResponse> IssuePolicy(dynamic IssuepolicyDTO, ApiContext apiContext)
        {
            //Step1:Validate of Request Object
            try
            {
                _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
                CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
                dbHelper._TimeZone = UserDateTime.KeyValue;

                DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
                List<ErrorInfo> Errors = new List<ErrorInfo>();
               var PolicyObj = JsonConvert.DeserializeObject<ExpandoObject>(IssuepolicyDTO.ToString());
             


                var PolicyStartDate = Convert.ToDateTime(IssuepolicyDTO["StartDate"]);

                if (PolicyStartDate > DateTime.Now)
                {
                    System.TimeSpan Stateduration = new System.TimeSpan(0, 0, 00, 00);
                    DateTime startdateTime = Convert.ToDateTime(PolicyStartDate).Date;
                    PolicyStartDate = startdateTime.Add(Stateduration);
                    

                }
                else
                {
                    //  System.TimeSpan Stateduration = DateTime.Now.TimeOfDay;
                    //DateTime startdateTime = Convert.ToDateTime(PolicyStartDate).Date;
                    //PolicyStartDate = startdateTime.Add(Stateduration);
                 

                    PolicyStartDate = DatetimeNow;
                }
                System.TimeSpan duration = new System.TimeSpan(364, 23, 59, 59);
                DateTime dateTime = Convert.ToDateTime(PolicyStartDate).Date;

                var PolicyEndDate = dateTime.Add(duration);


                AddProperty(PolicyObj, "Policy Start Date", PolicyStartDate);
                AddProperty(PolicyObj, "Policy End Date", PolicyEndDate);


                var policytempobj = JsonConvert.SerializeObject(PolicyObj);
                IssuepolicyDTO = JsonConvert.DeserializeObject<dynamic>(policytempobj.ToString());


                var res = await _integrationService.RuleMapper(IssuepolicyDTO, "Policy", apiContext);

                var seriaizeListofres = JsonConvert.SerializeObject(res);
                List<ErrorDetailsData> Listofres = JsonConvert.DeserializeObject<List<ErrorDetailsData>>(seriaizeListofres.ToString());
                if (Listofres.Count() > 0)
                {


                    var checkerrorlog = Listofres.FirstOrDefault(p => p.ValidatorName == "Final Result" && p.Outcome == "Fail");
                    if (Listofres != null)
                    {
                        foreach (var item in Listofres)
                        {

                            if (item.Outcome == "Fail" && item.ValidatorName != "Final Result")
                            {

                                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = item.Code, ErrorMessage = item.Message, PropertyName = item.ValidatorName };
                                Errors.Add(errorInfo);

                            }

                        }
                        if (Errors.Count > 0)
                        {
                            return new PolicyResponse { Status = BusinessStatus.Error, Errors = Errors };
                        }

                    }
                    //Step2: Check Policy Exist for this Proposal Number 

                    string proposalNumber = "";
                    if (IssuepolicyDTO["ProposalNumber"] != null)
                    {
                        string proposalNo = (string)IssuepolicyDTO["ProposalNumber"];

                        var tblPolicy = _context.TblPolicy.FirstOrDefault(x => x.ProposalNo == proposalNo);

                        //step:3 update the insurable fileds
                        if (tblPolicy != null)
                        {
                            if (tblPolicy.PolicyStageId == ModuleConstants.PolicyStageProposal)
                            {

                                var policyId = tblPolicy.PolicyId;
                                var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);

                                //Step:4 Calling CD mapping API

                                var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                                dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
                                dynamic jsonObj = JsonConvert.DeserializeObject<dynamic>(insurableItem);
                                List<MicaCDDTO> CDmap = await _integrationService.CDMapper(json, "Policy", apiContext);

                                tblPolicy.PolicyNo = await GetPolicyNumberAsync(0, Convert.ToDecimal(tblPolicy.ProductIdPk), apiContext, "PolicyNo");
                                var type = "Issue Policy";

                                if (CDmap.Count > 0)
                                {
                                    MicaCD micaCD = new MicaCD();
                                    micaCD.AccountNo = tblPolicy.CdaccountNumber;
                                    micaCD.micaCDDTO = CDmap;
                                    micaCD.Description = "Policy Issue-" + tblPolicy.PolicyNo;
                                    BusinessStatus businessStatus = 0;


                                    //Step5:CD Transaction for the policy
                                    var transaction = await _integrationService.CreateMasterCDAccount(micaCD, apiContext);

                                    // var CalculatePremiumResponse = CDmap.FirstOrDefault(s => s.TotalAmount > 0);
                                    if (CDmap.Count>0) {
                                    var expObj = JsonConvert.DeserializeObject<ExpandoObject>(json.ToString());
                                    var premium = JsonConvert.DeserializeObject <List<MicaCDDTO>>(jsonObj.PremiumDetails.ToString());
                                        //expObj.PremiumDetails = CDmap;
                                        AddProperty(expObj, "Policy Start Date", PolicyStartDate);
                                        AddProperty(expObj, "Policy End Date", PolicyEndDate);
                                        AddProperty(expObj, "PolicyStatus", "Active");

                                        expObj.PremiumDetails.AddRange(CDmap);
                                    var tempobj = JsonConvert.SerializeObject(expObj);
                                    json = JsonConvert.DeserializeObject<dynamic>(tempobj.ToString());
                                    tblPolicyDetailsdata.PolicyRequest = json.ToString();
                                }

                            


                                var tblPolicy1 = await ModifyUpdateInsurabableItem(IssuepolicyDTO, type, tblPolicy, tblPolicyDetailsdata,DatetimeNow, Errors, apiContext);
                                if (tblPolicy1 == null && Errors.Count > 0)
                                {
                                    return new PolicyResponse { Status = BusinessStatus.Error, Errors = Errors, ResponseMessage = $"RiskItem Count is mismatch" };
                                }





                              
                                    businessStatus = transaction.Status;
                                    if (businessStatus == BusinessStatus.Created)
                                    {
                                        //Status for Txn
                                        TblPolicy policyUpdate = _context.TblPolicy.Find(tblPolicy.PolicyId);


                                        //policyUpdate.PolicyStatus = ModuleConstants.ProposalStatus;
                                        policyUpdate.PolicyStageStatusId = ModuleConstants.PolicyStageQuoteCreated;
                                        policyUpdate.PolicyStageId = ModuleConstants.PolicyStagePolicy;
                                        policyUpdate.PolicyStatusId = ModuleConstants.PolicyStatusActive;


                                        policyUpdate.IsActive = true;
                                        //string[] Separate = (policyUpdate.PolicyStartDate.ToString()).Split(' ');
                                        //string desiredDate = Separate[1];

                                        //string[] SeparateTime = (desiredDate.ToString()).Split(':');
                                        //var hour = Convert.ToInt32(SeparateTime[0]);
                                        //var minute= Convert.ToInt32(SeparateTime[1]);
                                        //var second = Convert.ToInt32(SeparateTime[2];



                                        policyUpdate.PolicyStatus = ModuleConstants.PolicyStatus;

                                        policyUpdate.PolicyStartDate = PolicyStartDate;
                                        //System.TimeSpan duration = new System.TimeSpan(364, 23, 59, 59);
                                        //DateTime dateTime = Convert.ToDateTime(policyUpdate.PolicyStartDate).Date;

                                        //policyUpdate.PolicyEndDate = dateTime.Add(duration);
                                        policyUpdate.PolicyEndDate = PolicyEndDate;


                                        _context.SaveChanges();

                                    }
                                    else
                                    {

                                        return new PolicyResponse { Status = BusinessStatus.Error, Id = tblPolicy.ProposalNo, ResponseMessage = $"CD Transaction Failed for this Proposal Number {tblPolicy.ProposalNo}" };

                                    }
                                    return new PolicyResponse { Status = BusinessStatus.Created, Id = tblPolicy.PolicyNo, ResponseMessage = $"Policy Number {tblPolicy.PolicyNo} Issued for this Proposal Number {tblPolicy.ProposalNo} Successfully" };
                                }
                                else
                                {
                                    return new PolicyResponse { Status = BusinessStatus.InputValidationFailed, Id = tblPolicy.PolicyNo, ResponseMessage = $"Policy Request is not valid for CD Transaction" };


                                }
                            }
                            else
                            {
                                return new PolicyResponse { Status = BusinessStatus.InputValidationFailed, Id = tblPolicy.PolicyNo, ResponseMessage = $"Policy is already issued for this Proposal Number{tblPolicy.ProposalNo}" };

                            }
                        }
                        else
                        {
                            return new PolicyResponse { Status = BusinessStatus.Error, Id = tblPolicy.ProposalNo, ResponseMessage = $"No Record Found for this Proposal Number {tblPolicy.ProposalNo}" };


                        }

                    }

                    else
                    {
                        return new PolicyResponse { Status = BusinessStatus.Error, ResponseMessage = $"Proposal Number cannot be empty" };


                    }
                }

                else
                {
                    return new PolicyResponse { Status = BusinessStatus.Error, Errors = Errors, ResponseMessage = "Input Validation failed" };

                }
            }
            catch (Exception e)
            {
                return new PolicyResponse { Status = BusinessStatus.Error, ResponseMessage = e.InnerException.ToString() };


            }


        }


        public void AddProperty(ExpandoObject expando, string propertyName, object propertyValue)

        {

            // ExpandoObject supports IDictionary so we can extend it like this

            var expandoDict = expando as IDictionary<string, object>;

            if (expandoDict.ContainsKey(propertyName))

                expandoDict[propertyName] = propertyValue;

            else

                expandoDict.Add(propertyName, propertyValue);

        }




        public async Task<ProposalResponse> UpdateProposal(dynamic modifydata, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

            List<ErrorInfo> Errors = new List<ErrorInfo>();
            var proposalNo = (string)modifydata["ProposalNumber"];
            var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.ProposalNo == proposalNo);
            if (tbl_particiant != null)
            {



                var policyId = tbl_particiant.PolicyId;
                var type = "Update Proposal";
                var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
                var tblPolicy1 = ModifyUpdateInsurabableItem(modifydata, type, tbl_particiant, tblPolicyDetailsdata,DatetimeNow, Errors, apiContext);
                if (tblPolicy1 == null && Errors.Count > 0)
                {
                    return new ProposalResponse { Status = BusinessStatus.Error, Errors = Errors, ResponseMessage = $"RiskItem Count is mismatch" };
                }
                //var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                //dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
                //dynamic json1 = JsonConvert.DeserializeObject<dynamic>(insurableItem);


                //foreach (var insurableName in json.InsurableItem)
                //{
                //    foreach (var insurableName1 in json1.InsurableItem)
                //    {
                //        foreach (var item in modifydata.InsurableItem)
                //        {

                //            if (item.InsurableName == insurableName1.InsurableName)
                //            {
                //                foreach (var fields in item.RiskItems)
                //                {
                //                    try
                //                    {
                //                        foreach (var jsoninsurableFields in insurableName.RiskItems)
                //                        {
                //                            var InputidentificationNumber = (string)fields["Identification Number"];
                //                            var TblIdentificationNo = (string)jsoninsurableFields["Identification Number"];
                //                            if (InputidentificationNumber == TblIdentificationNo)
                //                            {
                //                                var Adddata = fields;
                //                                var removeitem = jsoninsurableFields;
                //                                insurableName.RiskItems.Remove(removeitem);
                //                                insurableName.RiskItems.Add(Adddata);

                //                            }
                //                        }
                //                    }
                //                    catch (Exception e)
                //                    {

                //                        insurableName1.RiskItems = insurableName.RiskItems;
                //                    }
                //                }
                //            }

                //        }

                //    }
                //}
                //tblPolicyDetailsdata.PolicyRequest = json1.ToString();
                //_context.TblPolicyDetails.Update(tblPolicyDetailsdata);
                //_context.SaveChanges();
            }
            else
            {

                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "ProposalNumber", PropertyName = "ProposalNumber", ErrorMessage = $"No Records found for this Proposal Number {proposalNo}" };
                Errors.Add(errorInfo);
                return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };

            }

            return new ProposalResponse { Status = BusinessStatus.Updated, Id = proposalNo, ResponseMessage = $"RiskItem Updated for this Proposal Number { proposalNo }" };

        }

        //Get Proposa By MobNumber

        public async Task<InsurableField> GetProposalByMobileNo(string MobNo, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.MobileNumber == MobNo);

            var policyId = tbl_particiant.PolicyId;
            var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
            var insurableItem = tblPolicyDetailsdata.PolicyRequest;
            dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);

            List<RiskField> fields = new List<RiskField>();
            // List<dynamic> fields1 = new List<dynamic>();
            RiskField RiskFields = null;
            InsurableField insurableField = new InsurableField();

            insurableField.ProposalNumber = tbl_particiant.ProposalNo;

            var temp = 0;
            if (tbl_particiant != null)
            {
                foreach (var insurableName in json.InsurableItem)
                {

                    RiskFields = new RiskField();
                    RiskFields.insurableName = insurableName.InsurableName;

                    if (RiskFields.insurableName == "Driver")
                    {


                        temp = temp + 1;
                    }

                    RiskFields.Riskfields = insurableName.InsurableFields;
                    fields.Add(RiskFields);
                }
                insurableField.DriverCount = temp;
                insurableField.RiskFields = fields;
                return insurableField;
            }
            else
            {
                return null;
            }


            //tblPolicyDetailsdata.PolicyRequest = json.ToString();
            //_context.TblPolicyDetails.Update(tblPolicyDetailsdata);
            //_context.SaveChanges();

        }



        //PolicyEndorsement

        public async Task<ProposalResponse> PolicyEndoresemenet(dynamic endoresementDto, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;


            ProposalResponse proposalResponse = new ProposalResponse();
            List<ErrorInfo> Errors = new List<ErrorInfo>();

            string PolicyNo = endoresementDto["PolicyNumber"].ToString();
            if (PolicyNo == "")
            {
                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"PolicyNumber can not be empty" };
                Errors.Add(errorInfo);
                return new ProposalResponse() { Status = BusinessStatus.InputValidationFailed, Errors = Errors };

            }

            try
            {
                string endorsementType = endoresementDto["EndorsementType"].ToString();

                if (endorsementType == "")
                {

                    ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PO001", PropertyName = "EndorsementType", ErrorMessage = "EndorsementType can not be empty" };
                    Errors.Add(errorInfo);
                    return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };


                }
                string EndorsementNo = "";

                //Addition of vehicle


                if (endorsementType == "Addition of vehicle")
                {





                    //Add insurable item and updating json of Polic Request 
                    var data = await AddInsurableItem(endoresementDto, apiContext);

                    //Updating json of policyRequest

                    proposalResponse.Status = data.Status;
                    proposalResponse.Errors.AddRange(data.Errors);
                    proposalResponse.ResponseMessage = data.ResponseMessage;
                    proposalResponse.Id = data.Id;
                    //return proposalResponse;
                    return new ProposalResponse { Status = BusinessStatus.Updated, Id = proposalResponse.Id, ResponseMessage = proposalResponse.ResponseMessage };

                }


                if (endorsementType == "Addition of driver")
                {
                    //Add insurable item and updating json of Polic Request 
                    var data = await AddInsurableItem(endoresementDto, apiContext);

                    //Updating json of policyRequest

                    proposalResponse.Status = data.Status;
                    proposalResponse.Errors.AddRange(data.Errors);
                    proposalResponse.ResponseMessage = data.ResponseMessage;
                    proposalResponse.Id = data.Id;
                    //return proposalResponse;
                    return new ProposalResponse { Status = BusinessStatus.Updated, Id = proposalResponse.Id, ResponseMessage = proposalResponse.ResponseMessage };

                }

                //For that row isActive will be false

                //Note tested but ruturn type have to handle the return type
                if (endorsementType == "Deletion of vehicle" || endorsementType == "Deletion of driver")
                {
                    var data = await RemoveInsurableItem(endoresementDto, apiContext);

                    return new ProposalResponse { Status = BusinessStatus.Deleted, ResponseMessage = data.ResponseMessage };

                    //return data;
                }

                //Tested have to handle the return type
                if (endorsementType == "Policy Cancellation")
                {
                    //STEP:1-GET POLICY DETAILS
                    var policyNo = (string)endoresementDto["PolicyNumber"];
                    var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policyNo);
                    tbl_particiant.PolicyVersion++;

                    EndorsementNo = tbl_particiant.PolicyNo + "" + "_" + (tbl_particiant.PolicyVersion).ToString();
                    if (tbl_particiant != null)
                    {
                        //STEP:2-CHECK POLICY IS ACTIVE OR NOT
                        if (tbl_particiant.IsActive == true)
                        {
                            var policyId = tbl_particiant.PolicyId;
                            var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);

                            if (tblPolicyDetailsdata != null)
                            {

                                var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                                dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);

                                //STEP:3-CALL EXTENSTION METHOD FOR VALIDATION
                                //List<CDMapper> cDMappers = new List<CDMapper>();
                                //CDMapper cD = new CDMapper();
                                //cD.Type = "PolicyCancellation";
                                //cD.Data = json;
                                //cDMappers.Add(cD);
                                //cD = new CDMapper();
                                //cD.Type = "Endorsement";
                                //cD.Data = endoresementDto;
                                //cDMappers.Add(cD);


                                var res = await _integrationService.RuleMapper(json, "PolicyCancellation", apiContext);


                                //STEP:3-CALL EXTENSTION METHOD FOR CD MAPPER

                                if (res != null)
                                {
                                    var seriaizeListofres = JsonConvert.SerializeObject(res);
                                    List<ErrorDetailsData> Listofres = JsonConvert.DeserializeObject<List<ErrorDetailsData>>(seriaizeListofres.ToString());

                                    var checkerrorlog = Listofres.FirstOrDefault(p => p.ValidatorName == "Final Result" && p.Outcome == "Fail");


                                    foreach (var item in Listofres)
                                    {

                                        if (item.Outcome == "Fail" && item.ValidatorName != "Final Result")
                                        {

                                            ErrorInfo errorInfo = new ErrorInfo { ErrorCode = item.Code, ErrorMessage = item.Message };
                                            Errors.Add(errorInfo);

                                        }

                                    }
                                    if (Errors.Count > 0)
                                    {
                                        return new ProposalResponse { Status = BusinessStatus.Error, Errors = Errors };
                                    }
                                }

                                var endObj = JsonConvert.DeserializeObject<ExpandoObject>(json.ToString());
                                AddProperty(endObj, "PolicyNumber", tbl_particiant.PolicyNo);
                                AddProperty(endObj, "CDAccountNumber", tbl_particiant.CdaccountNumber);

                                var exptempobj = JsonConvert.SerializeObject(endObj);
                                json = JsonConvert.DeserializeObject<dynamic>(exptempobj.ToString());



                                //step:3 Call CD mapper
                                var CDmap = await _integrationService.CDMapperList(json, "PolicyCancellation", apiContext);
                                if (CDmap.Count > 0)
                                {

                                    MicaCD micaCD = new MicaCD();
                                    micaCD.AccountNo = tbl_particiant.CdaccountNumber;
                                    micaCD.micaCDDTO = CDmap;
                                    micaCD.Description = "Endorsement-Cancellation-" + EndorsementNo;

                                    //Replace Premium details
                                    var expObj = JsonConvert.DeserializeObject<ExpandoObject>(json.ToString());
                                    expObj.PremiumDetails = CDmap;
                                    AddProperty(expObj, "PolicyStatus", "Cancel");
                                    var tempobj = JsonConvert.SerializeObject(expObj);
                                    json = JsonConvert.DeserializeObject<dynamic>(tempobj.ToString());

                                    //Step5:CD Transaction for the policy
                                    var transaction = await _integrationService.CreateMasterCDAccount(micaCD, apiContext);
                                    BusinessStatus businessStatus = 0;
                                    businessStatus = transaction.Status;


                                    tblPolicyDetailsdata.PolicyRequest= json.ToString();
                                    _context.TblPolicyDetails.Update(tblPolicyDetailsdata);

                                    if (businessStatus == BusinessStatus.Created)
                                    {

                                        // _tblPolicy.PolicyRemarks = policycancel.Remarks;

                                    }
                                    //Endrosment
                                    DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);



                                    string EndorsmentType = "Cancel Policy";
                                    EndorsementDetailsDTO endorsementDetailsDTO = new EndorsementDetailsDTO();
                                    endorsementDetailsDTO.Action = EndorsmentType;
                                    endorsementDetailsDTO.EndorsementNo = EndorsementNo;
                                    endorsementDetailsDTO.IsPremiumRegister = true;
                                    endorsementDetailsDTO.UpdatedResponse = json.ToString();
                                    endorsementDetailsDTO.EndorsementEffectivedate = DatetimeNow;
                                    endorsementDetailsDTO.EnddorsementRequest = endoresementDto.ToString();
                                    endorsementDetailsDTO.PolicyId = policyId;

                                    TblEndorsementDetails tblEndorsement_mapper = _mapper.Map<TblEndorsementDetails>(endorsementDetailsDTO);

                                    _context.TblEndorsementDetails.Add(tblEndorsement_mapper);
                                  
                                 

                                    tbl_particiant.IsActive = false;
                                    tbl_particiant.PolicyStatus = ModuleConstants.PolicyCancelStatus;
                                    tbl_particiant.PolicyStatusId = ModuleConstants.PolicyStatusCancelled;
                                    tbl_particiant.PolicyStageId = ModuleConstants.PolicyStagePolicy;
                                    tbl_particiant.PolicyStageStatusId = ModuleConstants.EndorsementStageCancelled;
                                    tbl_particiant.PolicyCancelDate = DatetimeNow;
                                    _context.TblPolicy.Update(tbl_particiant);



                                    //Refund Txn
                                    PolicyCancelRequest policyCancelRequest = new PolicyCancelRequest();
                                    policyCancelRequest.EffectiveDate = DatetimeNow;
                                    policyCancelRequest.CancelRequestDate = DatetimeNow;
                                    policyCancelRequest.PolicyNumber = tbl_particiant.PolicyNo;
                                    PolicyCancelResponse RefundDetails = await _integrationService.GetRefundDetails(policyCancelRequest,apiContext);


                                    PolicyRefund policyRefund = new PolicyRefund();
                                    policyRefund.EndorsementEffectivedate = DatetimeNow;
                                    policyRefund.TxnDate = DatetimeNow;
                                    policyRefund.TotalRefundAmount = RefundDetails.TotalPremium;
                                    policyRefund.EndorsementNumber = EndorsementNo;
                                    policyRefund.UpdatedResponse = json.ToString();
                                    policyRefund.PolicyId = policyId;

                                    TblPolicyRefund tblpolicyRefund_mapper = _mapper.Map<TblPolicyRefund>(policyRefund);

                                    _context.TblPolicyRefund.Add(tblpolicyRefund_mapper);




                                    _context.SaveChanges();

                                    return new ProposalResponse { Status = BusinessStatus.Updated, ResponseMessage = $"Policy Number {tbl_particiant.PolicyNo} is cancelled with effect from {DatetimeNow} Refund Amount Rs.{RefundDetails.TotalPremium}(inclusive of GST on Refund Premium) will be credited to Customer's Account"};

                                }
                                else
                                {
                                    //CD mapper error
                                }
                            }
                            else
                            {
                                //Policy record not found
                            }
                        }
                        else if (tbl_particiant.IsActive == false)
                        {
                            return new ProposalResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Policy Number {tbl_particiant.PolicyNo} is already Cancelled" };

                        }
                    }
                    else
                    {
                        //No record found for Policynumber
                    }
                }

                return new ProposalResponse { Status = BusinessStatus.NotFound };
            }

            catch (Exception ex)
            {
                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = ex.InnerException.ToString() };
                Errors.Add(errorInfo);
                proposalResponse.Errors = Errors;
                return proposalResponse;
            }

        }


        public async Task<List<EndorsementResponse>> GetEndoresementDetails(EndorsementSearch endorsementSearch, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
           var policydetails= _context.TblPolicy.FirstOrDefault(s => s.PolicyNo == endorsementSearch.PolicyNumber);
            if (endorsementSearch.FromDate == null) {

                endorsementSearch.FromDate = policydetails.PolicyStartDate;
            }
            if (endorsementSearch.ToDate == null) {

                CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
                dbHelper._TimeZone = UserDateTime.KeyValue;

                DateTime DatetimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);


                endorsementSearch.ToDate = DatetimeNow;
            }

            List<EndorsementResponse> endorsementResponse= _context.TblEndorsementDetails.Where(s => s.EndorsementEffectivedate.Value.Date >= endorsementSearch.FromDate.Value.Date && s.EndorsementEffectivedate.Value.Date <= endorsementSearch.ToDate.Value.Date && s.PolicyId== policydetails.PolicyId).Select(p=>new EndorsementResponse { EndorsementEffectivedate=p.EndorsementEffectivedate,UpdatedResponse=p.UpdatedResponse,EndorsementNo=p.EndorsementNo}).ToList();


            return endorsementResponse;
        }


            public async Task<Dictionary<dynamic, dynamic>> DynamicMapper(dynamic inputModel, string mappingname, ApiContext apiContext)
        {
            var riskparmeters = await _integrationService.GetMappingParams(mappingname, apiContext);
            List<dynamic> targetdto = new List<dynamic>();
            List<dynamic> Sourcedto = new List<dynamic>();

            //Dictionary_rule dictionary_Rule = new Dictionary_rule();
            Dictionary<dynamic, dynamic> dic = new Dictionary<dynamic, dynamic>();

            foreach (var item in riskparmeters)
            {

                var itemstring1 = item.sourceParameter.ToString();
                String[] strlist1 = itemstring1.Split('.',
                StringSplitOptions.None);

                var count1 = strlist1.Count();
                Sourcedto.Add(strlist1[count1 - 1]);
            }
            Sourcedto.Distinct();
            for (var i = 0; i < Sourcedto.Count; i++)
            {
                //var value = inputModel[i].Value;

                //var someObject;
                var propertyName = Sourcedto[i].ToString();
                var propertyValue = inputModel[propertyName];

                //= inputModel.GetType().GetProperty(propertyName).GetValue(mappedto, null);
                if (propertyValue != null && propertyValue != "")
                {
                    dic.Add(targetdto[i], propertyValue);
                    // dynamic person = new ExpandoObject();
                    // person.targetdto[i] = propertyValue;
                    //dic.Add("dictionary_rule", person);

                    //person.propertyName = propertyValue;
                    // var myObject = new object();
                    // myObject.AddProperty(targetdto[i], propertyValue);


                }
                //var type = propertyValue.typeOf();
                // var type = propertyValue.GetType();
                // GetProperty(propertyValue);
                // var c=GetType(propertyValue);
                // var c=propertyValue.PropertyType.Name;
                // DynamicMapper(mappedto[i], mappingname, apiContext);
            }
            var index = 0;
            var DynamicMapperObj = new ExpandoObject();
            foreach (var item in riskparmeters)
            {


                //dictionary_rate.DEXPRT_Exp
                var itemstring = item.targetParameter.ToString();
                String[] strlist = itemstring.Split('.',
                StringSplitOptions.None);

                var count = strlist.Count();
                if (count == 2)
                {
                    // var temp = ;
                    AddProperty(DynamicMapperObj, strlist[count - 1], dic[count - 1].Value);


                }
                else
                {
                    //ExpandoObject exObj=new ExpandoObject();

                    foreach (var temp in strlist)
                    {




                    }

                    AddProperty(DynamicMapperObj, itemstring, dic[count - 1].Value);

                }


                targetdto.Add(strlist[count - 1]);

                //dictionary_rate.DEXPRT_Exp

                index++;
                // object[] objects = Sourcedto.ConvertAll<object>(c => (object)c).ToArray();
            }


            return dic;

            // JsonConvert.DeserializeObject<dynamic>(scontract.ToString());
        }
        //public async Task<PremiumReturnDto> PremiumCalCulation(PremiumRequestDTO premiumdata, ApiContext apiContext)
        //{
        //    // _context = (MICAQMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
        //    PremiumReturnDto response = new PremiumReturnDto();
        //    if (premiumdata.NoOfPC != 0)
        //    {
        //        if (premiumdata.DriverAge >= 18 && premiumdata.DriverAge <= 75)
        //        {
        //            if (premiumdata.DriverExp <= (premiumdata.DriverAge - 18))
        //            {
        //                if (premiumdata.BillingFrequency == "" || premiumdata.BillingFrequency == "Monthly" || premiumdata.BillingFrequency == "Yearly")
        //                {
        //                    DynamicData prem = new DynamicData();
        //                    prem.dictionary_rule.SI = premiumdata.SI.ToString();
        //                    prem.dictionary_rule.NOOFPC = premiumdata.NoOfPC.ToString();
        //                    prem.dictionary_rule.NOOFTW = premiumdata.NoOfTW.ToString();


        //                    prem.dictionary_rate.AVFACTORPC_PC_NOOFPC = premiumdata.NoOfPC.ToString();
        //                    prem.dictionary_rate.AVFACTORTW_TW_NOOFPC = premiumdata.NoOfPC.ToString();
        //                    prem.dictionary_rate.AVFACTORTW_TW_NOOFTW = premiumdata.NoOfTW.ToString();
        //                    prem.dictionary_rate.PDAGERT_PAge = premiumdata.DriverAge.ToString();
        //                    prem.dictionary_rate.DEXPRT_Exp = premiumdata.DriverExp.ToString();
        //                    prem.dictionary_rate.ADDRVRT_DRV = premiumdata.AdditionalDriver.ToString();




        //                    TaxTypeDTO taxType = new TaxTypeDTO();
        //                    taxType = await _integrationService.TaxTypeForStateCode(premiumdata.StateCode, apiContext);

        //                    prem.dictionary_rate.FSTTAX_TAXTYPE = taxType.FSTTAX_TAXTYPE;
        //                    prem.dictionary_rate.TSTTAX_TAXTYPE = taxType.TSTTAX_TAXTYPE;

        //                    var Data = await CalCulatePremium(prem, apiContext);

        //                    List<CalculationResult> val = JsonConvert.DeserializeObject<List<CalculationResult>>(Data.ToString());
        //                    if (val != null)
        //                    {
        //                        var Ftperday = 0.00;
        //                        var fire = val.FirstOrDefault(x => x.Entity == "FTPM").EValue;
        //                        var theft = val.FirstOrDefault(x => x.Entity == "ADPMPD").EValue;
        //                        Ftperday = Ftperday + Convert.ToDouble(fire) + Convert.ToDouble(theft);

        //                        var Ft30days = Ftperday * 30;
        //                        var Ft60days = Ftperday * 60;

        //                        var Ft365days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FT365").EValue);
        //                        var Ad60days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60DAYS").EValue);
        //                        var Ad365days = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365DAYS").EValue);
        //                        var ad60fttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60FTAXAMT").EValue);
        //                        var ad60ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD60TTAXAMT").EValue);

        //                        var ad365ftax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365FTAXAMT").EValue);
        //                        var ad365ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD365TTAXAMT").EValue);
        //                        var ad30ftax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30FTAXAMT").EValue);
        //                        var ad30ttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "AD30TTAXAMT").EValue);

        //                        var ftfttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTFTAXAMT").EValue);
        //                        var ftttax = Convert.ToDecimal(val.FirstOrDefault(x => x.Entity == "FTTTAXAMT").EValue);

        //                        var monthlyGST = ad60fttax + ad60ttax + ftfttax + ftfttax;
        //                        var yearlyGST = ad365ftax + ad365ttax + ftfttax + ftfttax;


        //                        PremiumReturnDto returnobj = new PremiumReturnDto();

        //                        returnobj.FTTax = Convert.ToDecimal(ftfttax + ftfttax);
        //                        returnobj.ADTax = Convert.ToDecimal(ad60fttax);
        //                        returnobj.PerDayPremium = Convert.ToDecimal(Ftperday);
        //                        returnobj.FireTheft = Convert.ToDecimal(Ft365days);
        //                        returnobj.TotalFTAmount = returnobj.FTTax + returnobj.FireTheft;
        //                        if (premiumdata.BillingFrequency == "Monthly")
        //                        {
        //                            returnobj.ADPremium = Convert.ToDecimal(Ad60days);
        //                            returnobj.GST = Convert.ToDecimal(monthlyGST);
        //                            returnobj.MonthlyPremium = Convert.ToDecimal(ad30ftax) + Convert.ToDecimal(ad30ttax);
        //                        }
        //                        else if (premiumdata.BillingFrequency == "Yearly")
        //                        {
        //                            returnobj.ADPremium = Convert.ToDecimal(Ad365days);
        //                            returnobj.GST = Convert.ToDecimal(yearlyGST);
        //                        }
        //                        returnobj.Total = returnobj.FireTheft + returnobj.ADPremium + returnobj.GST;
        //                        returnobj.TotalADAmount = returnobj.ADTax + returnobj.ADPremium;

        //                        returnobj.FinalAmount = Math.Round(returnobj.Total);
        //                        returnobj.Status = BusinessStatus.Ok;
        //                        return returnobj;
        //                    }
        //                    else
        //                    {
        //                        ErrorInfo errorInfo = new ErrorInfo();

        //                        response.ResponseMessage = "Null/Empty Inputs";
        //                        response.Status = BusinessStatus.PreConditionFailed;
        //                        errorInfo.ErrorMessage = "Calculate Premium Failed";
        //                        errorInfo.ErrorCode = "ExtCP005";
        //                        errorInfo.PropertyName = "MandatoryfieldsMissing";
        //                        response.Errors.Add(errorInfo);
        //                        return response;
        //                    }
        //                }
        //                else
        //                {
        //                    ErrorInfo errorInfo = new ErrorInfo();

        //                    response.ResponseMessage = "Null/Empty Inputs";
        //                    response.Status = BusinessStatus.PreConditionFailed;
        //                    errorInfo.ErrorMessage = "Billing Frequency Should be either Monthly or Yearly";
        //                    errorInfo.ErrorCode = "ExtCP004";
        //                    errorInfo.PropertyName = "MandatoryfieldsMissing";
        //                    response.Errors.Add(errorInfo);
        //                    return response;
        //                }
        //            }
        //            else
        //            {
        //                ErrorInfo errorInfo = new ErrorInfo();

        //                response.ResponseMessage = "Null/Empty Inputs";
        //                response.Status = BusinessStatus.PreConditionFailed;
        //                errorInfo.ErrorMessage = "Driver Experience should be less than or equal to his age – 18";
        //                errorInfo.ErrorCode = "ExtCP003";
        //                errorInfo.PropertyName = "MandatoryfieldsMissing";
        //                response.Errors.Add(errorInfo);
        //                return response;
        //            }
        //        }
        //        else
        //        {
        //            ErrorInfo errorInfo = new ErrorInfo();

        //            response.ResponseMessage = "Null/Empty Inputs";
        //            response.Status = BusinessStatus.PreConditionFailed;
        //            errorInfo.ErrorMessage = "Driver age should be between 18 and 75.";
        //            errorInfo.ErrorCode = "ExtCP002";
        //            errorInfo.PropertyName = "MandatoryfieldsMissing";
        //            response.Errors.Add(errorInfo);
        //            return response;
        //        }
        //    }
        //    else
        //    {
        //        ErrorInfo errorInfo = new ErrorInfo();

        //        response.ResponseMessage = "Null/Empty Inputs";
        //        response.Status = BusinessStatus.PreConditionFailed;
        //        errorInfo.ErrorMessage = "Minimum One PC should be their.";
        //        errorInfo.ErrorCode = "ExtCP001";
        //        errorInfo.PropertyName = "MandatoryfieldsMissing";
        //        response.Errors.Add(errorInfo);
        //        return response;
        //    }
        //}







        public async Task<dynamic> ProposalValidation(dynamic proposalDto, ApiContext apiContext)
        {
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            ErrorInfo Errorsobj = new ErrorInfo();
            try
            {
                foreach (var item in proposalDto.InsurableItem)
                {
                    if (item.InsurableName == "Driver")
                    {
                        foreach (var riskitem in item.RiskItems)
                        {
                            if (riskitem.Age < 18)
                            {
                                Errorsobj.ErrorMessage = "driver age can not be less then 18";
                                Errors.Add(Errorsobj);
                            }
                            var experience = (int)riskitem["Driving Experience"];
                            var Age = (int)riskitem.Age - 1;
                            if (experience < 1 && experience < Age)
                            {
                                Errorsobj.ErrorMessage = "driver experience can not be less then one or can not be more then his age";
                                Errors.Add(Errorsobj);
                            }
                            if (item.RiskItems.Count < 1)
                            {
                                Errorsobj.ErrorMessage = "driver can not be less then one";
                                Errors.Add(Errorsobj);
                            }

                        }
                        return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                    }
                    else
                    {
                        return null;
                    }
                    //ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PO001", PropertyName = "EndorsementType", ErrorMessage = "EndorsementType can not be empty" };
                    //Errors.Add(errorInfo);
                    //return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };


                }
            }
            catch (Exception e)
            {

            }
            return new ProposalResponse { Status = BusinessStatus.NotFound };

        }

        public async Task<dynamic> InternalGetPolicyDetailsByNumber(string policyNumber, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tblPolicy = _context.TblPolicy.Where(p => p.PolicyNo == policyNumber).FirstOrDefault();
            if (tblPolicy != null)
            {
                var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == tblPolicy.PolicyId);
                var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                var json1 = JsonConvert.DeserializeObject<ExpandoObject>(insurableItem);
                AddProperty(json1, "CDAccountNumber", tblPolicy.CdaccountNumber);
                var json = JsonConvert.SerializeObject(json1);

                var json2 = JsonConvert.DeserializeObject<object>(json);

                return json2;
            }
            return null;

        }
        public async Task<DailyDTO> GetDailyAccountDetails(string policyNumber, int month, int year, string TxnEventType, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            if (policyNumber != "" && month > 0 && year > 0 && TxnEventType != "")
            {
                var policydetails = _context.TblPolicy.FirstOrDefault(s => s.PolicyNo == policyNumber);
                if (policydetails != null)
                {
                    var accountnumber = policydetails.CdaccountNumber;
                    if (accountnumber != "")
                    {
                        var AccDetails = await _integrationService.GetDailyTransaction(accountnumber, month, year, TxnEventType, apiContext);
                        return AccDetails;
                    }
                    else
                    {
                        return new DailyDTO { Status = BusinessStatus.NotFound, ResponseMessage = $"CD Account not Found for this PolicyNumber {policyNumber}" };

                    }
                }
                else
                {
                    return new DailyDTO { Status = BusinessStatus.NotFound, ResponseMessage = $"No record Found for this PolicyNumber {policyNumber}" };

                }

            }
            else
            {
                return new DailyDTO { Status = BusinessStatus.NotFound, ResponseMessage = "Policy Number or Month or Year or TxnEventType Cannot be empty" };
            }



        }

        //To get policy data by policy number
        public async Task<List<object>> PolicyDetailsByNumber(string PolicyNumber, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var DATA = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == PolicyNumber);

            Dictionary<object, object> finaldata = new Dictionary<object, object>();
            List<object> FullfinalData = new List<object>();

            finaldata.Add("Insured Ref No", DATA.CustomerId);
            finaldata.Add("Insured Name", DATA.CoverNoteNo);
            finaldata.Add("Insured Mobile No", DATA.MobileNumber);
            finaldata.Add("Insured Email", DATA.Email);
            finaldata.Add("Event Date", DATA.CreatedDate);
            finaldata.Add("Cover Event", DATA.CoverEvent);
            finaldata.Add("Policy Start Date", DATA.PolicyStartDate);
            finaldata.Add("Policy End Date", DATA.PolicyEndDate);
            finaldata.Add("Total Sum Insured", DATA.SumInsured);
            finaldata.Add("Balance SumInsured", DATA.BalanceSumInsued);
            foreach (var item in finaldata)
            {
                List<object> data = new List<object>();
                data.Add(item.Key);
                data.Add(item.Value);
                FullfinalData.Add(data);
            }
            return FullfinalData;
        }

        public async Task<List<UploadDocument>> GetPolicyDocumentsByNumber(string policyNumber, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            List<UploadDocument> lstDocuments = new List<UploadDocument>();
            UploadDocument doc = null;
            var tblPolicy = _context.TblPolicy.Where(p => p.PolicyNo == policyNumber).FirstOrDefault();
            if (tblPolicy != null)
            {
                var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == tblPolicy.PolicyId);
                var policyRequest = tblPolicyDetailsdata.PolicyRequest;
                dynamic insList = JsonConvert.DeserializeObject<dynamic>(policyRequest);
                foreach (var insurableItem in insList.InsurableItem)
                {
                    foreach (var fields in insurableItem.RiskItems)
                    {

                        foreach (var insItem in fields)
                        {
                            // insItem.ToString()
                            if (insItem.Name == "Documents")
                            {

                                foreach (var docItems in fields[insItem.Name])
                                {
                                    doc = new UploadDocument();
                                    foreach (var docItem in docItems)
                                    {
                                        if (docItem.Name == "FileName")
                                        {
                                            doc.DocumentName = docItem.Value;
                                        }
                                        if (docItem.Name == "DocumentID" || docItem.Name == "DocumentId")
                                        {
                                            doc.DmsdocId = docItem.Value;
                                        }
                                        if (docItem.Name == "DocumentType")
                                        {
                                            doc.DocumentType = docItem.Value;
                                        }
                                        if (docItem.Name == "VehicleView" || docItem.Name == "View")
                                        {
                                            doc.DocumentView = docItem.Value;
                                        }
                                    }
                                    lstDocuments.Add(doc);
                                }

                            }

                        }
                    }
                }
            }
            return lstDocuments;
        }
        public async Task<FileUploadResponse> RefundUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            string filePath = "";
           int step1 = 0;
            try
            {
                CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
                dbHelper._TimeZone = UserDateTime.KeyValue;
                
                var files = httpRequest.Form.Files;
                //var docId = GetActiveResult(file.Name); HttpRequest
                DataTable dt = new DataTable();
                List<ErrorInfo> Errors = new List<ErrorInfo>();
                _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
                foreach (var file in files)
                {
                    step1++;
                    var filename = ContentDispositionHeaderValue
                                        .Parse(file.ContentDisposition)
                                        .FileName
                                        .Trim('"');
                    // filename = "\\UploadFiles\\" + filename;
                    // var  size += file.Length;
                    // var fileBasepath = System.IO.Directory.GetCurrentDirectory() + "";
                    //string filePath = fileBasepath + "" + filename;
                    if (file == null || file.Length <= 0)
                    {
                        return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                    }
                    var path = Path.Combine("", filename);
                    filePath = Path.GetFullPath(path);
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        //BinaryReader reader = new BinaryReader(fs);
                        //stringVal = reader.ReadString();
                        //sb.Append(stringVal);
                        fs.Flush();
                    }

                    step1++;


                    // var filename = file.Name;

                    var fileExt = Path.GetExtension(file.FileName);

                    if (fileExt == ".CSV" || fileExt == ".csv")
                    {
                        step1++;
                        // string filepath = @"C:\Users\brajesh.kumar\Desktop\test1111.csv";
                        var res = await ConvertCSVtoDataTable(filePath, apiContext);
                        return res;
                    }
                    else
                    {
                        //var tblbankdoc = await GetDocumentId(file.Name, apiContext);
                       
                        if (fileExt.Equals(".xlsx", StringComparison.OrdinalIgnoreCase) || fileExt.Equals(".csv", StringComparison.OrdinalIgnoreCase))
                        {
                            bool sms = true;
                            bool email = true;
                            //dt.Columns.Add("BankFileId", typeof(int));
                            // dt.Columns.Add("Id", typeof(string));
                            dt.Columns.Add("EndorsementNumber", typeof(string));
                            dt.Columns.Add("EndorsementEffectivedate", typeof(DateTime));
                            dt.Columns.Add("TxnDate", typeof(DateTime));
                            dt.Columns.Add("TotalRefundAmount", typeof(decimal));
                            dt.Columns.Add("PaymentGatewayReferenceId", typeof(string));
                            dt.Columns.Add("AmountPaid", typeof(decimal));
                            dt.Columns.Add("DateOfPayment", typeof(DateTime));
                            dt.Columns.Add("PolicyId", typeof(decimal));
                            dt.Columns.Add("PaymentStatus", typeof(string));
                            dt.Columns.Add("UpdatedResponse", typeof(string));
                            using (var stream = new MemoryStream())
                            {
                                await file.CopyToAsync(stream, cancellationToken);
                                try
                                {
                                    using (var package = new ExcelPackage(stream))
                                    {
                                        ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                                        // EPPlusHelper.GetColumnByName()
                                        int endrsId = worksheet.GetColumnByName("endorsement Number");
                                        int refundId = worksheet.GetColumnByName("total Refund Amount");
                                        int endrEffDtId = worksheet.GetColumnByName("endorsement Effective Date");
                                        int pmtRefId = worksheet.GetColumnByName("payment Gateway Reference Id");
                                        int amtId = worksheet.GetColumnByName("amount Paid");
                                        int dtPmtId = worksheet.GetColumnByName("date Of Payment");
                                        int pmtStatId = worksheet.GetColumnByName("payment Status");
                                        if (worksheet != null)
                                        {
                                            var rowCount = worksheet.Dimension.Rows;
                                            for (int row = 2; row <= rowCount; row++)
                                            {
                                                var endrsNum = "";
                                                if (worksheet.Cells[row, endrsId].Value != null)
                                                {
                                                    endrsNum = worksheet.Cells[row, endrsId].Value.ToString().Trim();
                                                }
                                                if (endrsNum == "")
                                                {
                                                    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"EndorsementNumber can not be empty for row {row}" };
                                                    Errors.Add(errorInfo);
                                                }
                                                else
                                                {
                                                    var EndorsementDetails = _context.TblEndorsementDetails.FirstOrDefault(et => et.EndorsementNo == endrsNum);
                                                    if (EndorsementDetails == null)
                                                    {
                                                        ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"EndorsementNumber {endrsNum} does not exist for row {row} " };
                                                        Errors.Add(errorInfo);
                                                    }
                                                    else
                                                    {
                                                        DataRow dr = dt.NewRow();
                                                        dr["EndorsementNumber"] = endrsNum;
                                                        if (worksheet.Cells[row, endrEffDtId].Value != null)
                                                        {
                                                            dr["EndorsementEffectivedate"] = Convert.ToDateTime(worksheet.Cells[row, endrEffDtId].Value.ToString().Trim());
                                                        }

                                                        dr["TxnDate"] = DateTime.Now;

                                                        if (worksheet.Cells[row, refundId].Value != null)
                                                        {
                                                            dr["TotalRefundAmount"] = Convert.ToDecimal(worksheet.Cells[row, refundId].Value);
                                                        }
                                                        if (worksheet.Cells[row, pmtRefId].Value != null)
                                                        {
                                                            dr["PaymentGatewayReferenceId"] = worksheet.Cells[row, pmtRefId].Value.ToString().Trim();
                                                        }
                                                        if (worksheet.Cells[row, amtId].Value != null)
                                                        {
                                                            dr["AmountPaid"] = Convert.ToDecimal(worksheet.Cells[row, amtId].Value);
                                                        }
                                                        if (worksheet.Cells[row, dtPmtId].Value != null)
                                                        {
                                                            dr["DateOfPayment"] = Convert.ToDateTime(worksheet.Cells[row, dtPmtId].Value.ToString().Trim());
                                                        }
                                                        if (worksheet.Cells[row, pmtStatId].Value != null)
                                                        {
                                                            dr["PaymentStatus"] = worksheet.Cells[row, pmtStatId].Value.ToString().Trim();
                                                        }
                                                        dr["PolicyId"] = EndorsementDetails.PolicyId;
                                                        dr["UpdatedResponse"] = EndorsementDetails.UpdatedResponse;

                                                        dt.Rows.Add(dr);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                catch (Exception ex)
                                {
                                    var error = ex.ToString();
                                    return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter", MessageKey = step1.ToString() };
                                }
                            }
                        }
                        else
                        {
                            return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx/csv file" };
                        }
                    }


                    try
                    {
                        // add list to db ..
                        // here just read and return
                        var envResponse = await _integrationService.GetEnvironmentConnection(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
                        //string connetionString = "Data Source=inubepeg.database.windows.net;Initial Catalog=MICADev;User Id=MICAUSER;Password=MICA*user123";
                        using (var bulkCopy = new SqlBulkCopy(envResponse.Dbconnection, SqlBulkCopyOptions.KeepIdentity))
                        {
                            // my DataTable column names match my SQL Column names, so I simply made this loop. However if your column names don't match, just pass in which datatable name matches the SQL column name in Column Mappings
                            foreach (DataColumn col in dt.Columns)
                            {
                                bulkCopy.ColumnMappings.Add(col.ColumnName, col.ColumnName);
                            }
                            bulkCopy.BulkCopyTimeout = 600;
                            bulkCopy.DestinationTableName = "[PO].[tblPolicyRefund]";
                            bulkCopy.WriteToServer(dt);
                        }
                    }
                    catch (Exception ex)
                    {
                        var error = ex.ToString();
                        return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                        //return DemoResponse<List<BankFileDTO>>.GetResult(-1, error);
                    }
                   
                }
                if (Errors.Count > 0)
                {
                    return new FileUploadResponse { Status = BusinessStatus.Ok, Errors = Errors, ResponseMessage = $" {dt.Rows.Count }Document uploaded succefully with {Errors.Count} records having issues" };
                }
                else
                {
                    return new FileUploadResponse { Status = BusinessStatus.Ok, ResponseMessage = $"Document uploaded succefully!" };
                }
            }
            catch (Exception ex)
            {
                return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Document upload error!"+ex.ToString() , MessageKey = step1.ToString()+" "+ filePath };
            }
        }

        public async Task<FileUploadResponse> ConvertCSVtoDataTable(string strFilePath,ApiContext apiContext)
        {
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            int logx = 0;
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
                var endorsementindex = FindIndex(strFilePath, "endorsement Number");
                var EndorsementEffectivedateIndex = FindIndex(strFilePath, "endorsement Effective Date");

                //need to put current date time
                // var TxnDateIndex = FindIndex("endorsement Effective Date");
                var TotalRefundAmountIndex = FindIndex(strFilePath, "total Refund Amount");
                var PaymentGatewayReferenceIdIndex = FindIndex(strFilePath, "payment Gateway Reference Id");
                var AmountPaidIndex = FindIndex(strFilePath, "amount Paid");
                var DateOfPaymentIndex = FindIndex(strFilePath, "date Of Payment");
                var PaymentStatusIndex = FindIndex(strFilePath, "payment Status");
                logx++;

                while (!sr.EndOfStream)
                {
                    string[] rows = Regex.Split(sr.ReadLine(), ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
                    DataRow dr = dt.NewRow();

                    for (int i = 0; i < headers.Length; i++)
                    {
                        dr[i] = rows[i];

                        //dr1[i] = dt.Rows[i+1]["endorsement Number"];
                    }
                    dt.Rows.Add(dr);
                }
                // var c = dt.Rows[0][2];
                var count = dt.Rows.Count;


                var endrsNum = "";
                var updatedResponse = "";
                DateTime endorsementeffectivedate = Convert.ToDateTime("1/1/1754 12:00:00");
                DateTime txndate = Convert.ToDateTime("1/1/1754 12:00:00");
                var paymentstatus = "";
                DateTime dateofpayment = Convert.ToDateTime("1/1/1754 12:00:00");
                decimal totalRefundAmount = 0;
                decimal ammountpaid = 0;
                var paymentrefId = "";

                for (var i = 0; i < count; i++)
                {
                    // var s = dt.Rows[i][10].ToString().Trim();
                    endrsNum = "";
                    var s0 = dt.Rows[i][endorsementindex].ToString().Trim();
                    if (string.IsNullOrEmpty(s0))
                    {
                            ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"EndorsementNumber can not be empty for row {i + 1}" };
                            Errors.Add(errorInfo);
                    }
                    else
                    {
                        endrsNum = s0.Replace("\"", "");
                        var s = dt.Rows[i][EndorsementEffectivedateIndex].ToString().Trim();

                        if (s != null || s != "")
                        {
                            if (s == "\"\"")
                            {
                                s = Convert.ToDateTime("1/1/1754 12:00:00").ToString();
                            }
                            else
                            {
                                endorsementeffectivedate = Convert.ToDateTime(s.Replace("\"", ""));
                            }

                        }
                        txndate = DateTime.Now;

                        var s1 = dt.Rows[i][TotalRefundAmountIndex].ToString().Trim();
                        if (s1 != null || s1 != "")
                        {
                            if (s1 == "\"\"")
                            {
                                totalRefundAmount = 0;
                            }
                            else
                            {

                                totalRefundAmount = Convert.ToDecimal(s1.Replace("\"", ""));
                            }
                        }
                        var s2 = dt.Rows[i][PaymentGatewayReferenceIdIndex].ToString().Trim();
                        if (s2 != null || s2 != "")
                        {
                            if (s2 == "\"\"")
                            {
                                s1 = "0.0";
                            }
                            else
                            {
                                paymentrefId = s2.Replace("\"", "");
                            }
                        }
                        var s3 = dt.Rows[i][AmountPaidIndex].ToString().Trim();
                        if (s3 != null || s3 != "")
                        {
                            if (s3 == "\"\"")
                            {
                                s3 = "0.0";
                            }
                            else
                            {
                                ammountpaid = Convert.ToDecimal(s3.Replace("\"", ""));
                            }
                        }
                        var s4 = dt.Rows[i][PaymentStatusIndex].ToString().Trim();
                        if (s4 != null || s4 != "")
                        {
                            if (s4 == "\"\"")
                            {
                                s4 = "Pending";
                            }
                            else
                            {
                                paymentstatus = s4.Replace("\"", "");
                            }
                        }

                        var s5 = dt.Rows[i][DateOfPaymentIndex].ToString().Trim();
                        if (s5 != null || s5 != "")
                        {
                            if (s5 == "\"\"")
                            {
                                s5 = Convert.ToDateTime("1/1/1754 12:00:00").ToString();
                            }
                            else
                            {
                                dateofpayment = Convert.ToDateTime(s5.Replace("\"", ""));
                            }

                        }
                        logx++;
                        var PolicyRefundDetails = _context.TblPolicyRefund.FirstOrDefault(et => et.EndorsementNumber == endrsNum);
                        if (PolicyRefundDetails == null)
                        {
                            ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"EndorsementNumber does not exist for row {i + 1} in database", ErrorCode = logx.ToString() };
                            Errors.Add(errorInfo);
                        }
                        else
                        {

                            //updating the details from csv to table
                            // PolicyRefundDetails.EndorsementEffectivedate = endorsementeffectivedate;
                            // PolicyRefundDetails.TotalRefundAmount = totalRefundAmount;
                            PolicyRefundDetails.TxnDate = txndate;
                            PolicyRefundDetails.PaymentGatewayReferenceId = paymentrefId;
                            PolicyRefundDetails.PaymentStatus = paymentstatus;
                            PolicyRefundDetails.AmountPaid = ammountpaid;
                            PolicyRefundDetails.DateOfPayment = dateofpayment;


                            _context.TblPolicyRefund.Update(PolicyRefundDetails);
                            _context.SaveChanges();
                        }
                    }
                }
                if (Errors.Count > 0)
                {
                    return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Document Uploaded with following Erros", Errors = Errors };
                }
                else
                {
                    return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Document Uploaded Successfully" };
                }
            }
            catch (Exception ex)
            {
                logx++;
                return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Document uploaded with following Erros " + ex.ToString(), MessageKey = logx.ToString() };
            }
            finally {
                sr.Dispose();
            }
        }
    
    public int FindIndex(string filepath,string columnName)
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
                        return colIdx-1;
                    }
                }
                colIdx = 0; // reset col index
            }
            return colIdx;
        }
    }



    }








