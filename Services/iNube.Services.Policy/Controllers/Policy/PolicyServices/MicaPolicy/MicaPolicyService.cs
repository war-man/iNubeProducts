﻿using AutoMapper;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Helpers;
using iNube.Services.Policy.Models;
using iNube.Services.UserManagement.Helpers;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
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
using System.Reflection;
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

        public MicaPolicyService(MICAPOContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            _emailService = emailService;
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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
                var mappedPolicy = MapAndValidatePolicy(policyDetail, productDetails, partnerDetails, policyRiskDetails, Errors);

                if (Errors.Count == 0)
                {
                    PolicyId = SavePolicyDetails(mappedPolicy, policyDetail);
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
                            CreatedDate = DateTime.Now,
                            PolicyId = PolicyId
                        };
                        _context.TblPolicyPayment.Add(policyPayment);
                        _context.SaveChanges();
                        logMsg = logMsg + ",6";
                        //Get Policymodel
                        try
                        {
                            //var policyEmailModel = GetPolicyModel(productDetails, policyUpdate, partnerDetails);
                            NotificationRequest request = new NotificationRequest();
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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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

        private PolicyDTO MapAndValidatePolicy(dynamic policyDetail, ProductDTO productDTO, PartnersDTO partnersDTO, IEnumerable<ProductRcbdetailsDTO> riskDetails, List<ErrorInfo> Errors)
        {
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
            policyDTO.CreatedBy = new Guid();
            policyDTO.CreatedDate = DateTime.Now;
            policyDTO.PolicyIssueDate = DateTime.Now;
            policyDTO.IsUploadedToIcm = 0;
            policyDTO.PremiumAmount = productDTO.PremiumAmount;
            // policyDTO.MasterPolicyNo = "ABC";//ToDo service req
            policyDTO.PolicyVersion = 1;
            policyDTO.PolicyNo = GetPolicyNumber(partnersDTO.PartnerId, productDTO.ProductId);
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

        private string GetPolicyNumber(decimal partnerId, decimal productId, string type = "PolicyNo")
        {
            //  _context = (MICAPOContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            var connectionString = _configuration.GetConnectionString("PCConnection");
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
        private decimal SavePolicyDetails(PolicyDTO mappedPolicy, dynamic policyDetail)
        {
            TblPolicy policy = _mapper.Map<TblPolicy>(mappedPolicy);
            policy.PolicyStageId = ModuleConstants.PolicyStageQuote;
            policy.PolicyStatusId = ModuleConstants.PolicyStatusInActive;


            TblPolicyDetails policyRequest = new TblPolicyDetails();
            policyRequest.PolicyRequest = policyDetail.ToString();
            policy.TblPolicyDetails.Add(policyRequest);
            _context.TblPolicy.Add(policy);
            _context.SaveChanges();

            return policy.PolicyId;
        }
        private async Task<List<ErrorInfo>> DoCDTransactionAsync(decimal productId, decimal partnerId, string policyNumber, int Amount, decimal PolicyId, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
                TblPolicyPayment policyPayment = new TblPolicyPayment()
                {
                    PaidAmount = Amount,
                    CreatedDate = DateTime.Now,
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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

            var _tblPolicy = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == policycancel.Policynumber);

            _tblPolicy.PolicyRemarks = policycancel.Remarks;
            _tblPolicy.IsActive = false;

            _context.TblPolicy.Update(_tblPolicy);

            _context.SaveChanges();



            return "policycancelled";
        }

        public async Task<dynamic> PolicyCancellation1(dynamic endoresementDto, ApiContext apiContext)
        {
         
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var policyNo = (string)endoresementDto["PolicyNumber"];
            var _tblPolicy = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == policyNo);

            // _tblPolicy.PolicyRemarks = policycancel.Remarks;
            _tblPolicy.IsActive = false;

            _context.TblPolicy.Update(_tblPolicy);

            _context.SaveChanges();



            return "policycancelled";
        }



        public async Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var _policy = from P in _context.TblPolicy.OrderByDescending(p => p.CreatedDate)
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

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));


            var cddetails = await _integrationService.GetcddataAsync(TxnId, apiContext);
            return cddetails;
        }

        public async Task<CdTransactionsResponse> ReverseCdAsync(PolicyCancelTransaction transaction, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            //List<int> lstParentId = new List<int> { 0, parentID };
            var policy_list = _context.TblPolicy.ToList();
            var policyDTOs = _mapper.Map<List<PolicyDTO>>(policy_list);
            return policyDTOs;
        }

        public async Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO policySearchby, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
            path = @"C:/Users/prasant.k/source/Workspaces/MICA/Services/iNube.Services.Policy/Models/Excel.xlsx";
            //Let use below test data for writing it to excel
            // path = Server.MapPath(C: \Users\rashmidevi.p\source\repos\MICA Services\iNube.Services.Policy\Models\excel.xml);
            List<PolicysearchDTO> policydata = new List<PolicysearchDTO>()
            {

                new PolicysearchDTO() {PartnerId ="123" , Email = "ajay@gmail.com" , EventId="123",  Insuredreference = "ajay" , MobileNumber = "2345678" , Policynumber = "123" , ProductId = "123"     }

           };


            DataTable table = (DataTable)JsonConvert.DeserializeObject(JsonConvert.SerializeObject(policydata), (typeof(DataTable)));
            FileInfo filePath = new FileInfo(path);
            using (var excelPack = new ExcelPackage(filePath))
            {
                var ws = excelPack.Workbook.Worksheets.Add("WriteTest");
                ws.Cells.LoadFromDataTable(table, true, OfficeOpenXml.Table.TableStyles.Light8);
                excelPack.Save();
            }
        }

        //To get policy data for claims for genetaring Invoice 2nd Page Pdf
        public async Task<List<PolicyDataForClaims>> GetPolicyForClaimsInvoice(BillingEventRequest EventRequet, ApiContext apiContext)
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
        public async Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest pDTO, ApiContext apiContext)
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
        public async Task<List<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext)
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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
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



        //MulticoverInsurable
        public async Task<PolicyInsurableResponse> PolicyInsurableDetails(string PolicyNumber, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            PolicyInsurableResponse insurableResponse = new PolicyInsurableResponse();
            var tblPolicy = _context.TblPolicy.Where(item => item.PolicyNo == PolicyNumber)
                  .Include(add => add.TblPolicyInsurableDetails).FirstOrDefault();
            var _policySearchDTOs = _mapper.Map<IEnumerable<PolicyInsurableDetailsDTO>>(tblPolicy.TblPolicyInsurableDetails);
            insurableResponse.policyInsurableDetails.AddRange(_policySearchDTOs);
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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            //  var id = 18;
            // var ps = await _integrationService.GetCustomerById(id, apiContext);

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
                if (partnerId.Length > 0)
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
                var mappedPolicy = MapAndValidateInsurablePolicy(policyDetail, productDetails, partnerDetails, policyRiskDetails, Errors, singleCover, "policy");
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
                    PolicyId = SavePolicyDetails(mappedPolicy, policyDetail);
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
                            CreatedDate = DateTime.Now,
                            PolicyId = PolicyId
                        };
                        _context.TblPolicyPayment.Add(policyPayment);
                        _context.SaveChanges();
                        logMsg = logMsg + ",6";
                        //Get Policymodel
                        try
                        {
                            var policyEmailModel = await GetInsuranceCertificateModel(policyDetail, productDetails, policyUpdate, mappedPolicy, partnerDetails, singleCover, apiContext);
                            NotificationRequest request = new NotificationRequest();
                            request.SendSms = true;
                            request.smsRequest = new SMSRequest()
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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            //  var id = 18;
            // var ps = await _integrationService.GetCustomerById(id, apiContext);

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
                var mappedPolicy = MapAndValidateInsurablePolicy(policyDetail, productDetails, partnerDetails, policyRiskDetails, Errors, singleCover, "policy");
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
                    PolicyId = SavePolicyDetails(mappedPolicy, policyDetail);
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
                        CreatedDate = DateTime.Now,
                        PolicyId = PolicyId
                    };
                    _context.TblPolicyPayment.Add(policyPayment);
                    _context.SaveChanges();
                    logMsg = logMsg + ",6";
                    //Get Policymodel
                    try
                    {
                        var policyEmailModel = await GetInsuranceCertificateModel(policyDetail, productDetails, policyUpdate, mappedPolicy, partnerDetails, singleCover, apiContext);
                        NotificationRequest request = new NotificationRequest();
                        request.SendSms = true;
                        request.smsRequest = new SMSRequest()
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
                    if (productInsurable == null)
                    {
                        ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"Product is not configured for InsurableItem: {InsurableItemName}.Mismatch value is given." };
                        Errors.Add(errorInfo);
                    }
                    if (premiumLevel == 52)
                    {
                        premiumAmount = (decimal)productDTO.ProductPremium.FirstOrDefault(p => p.SubLevelId == productInsurable.InsurableItemTypeId).PremiumAmount;
                    }
                    foreach (var insurableFieldData in item.Covers)
                    {
                        CoverName = insurableFieldData["CoverName"];
                        insItemCount = 0;
                        var coversDTO = productInsurable.ProductCovers.FirstOrDefault(c => c.Cover == CoverName);
                        if (coversDTO == null)
                        {
                            ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"Product is not configured for CoverItem: {CoverName}.Mismatch value is given." };
                            Errors.Add(errorInfo);
                        }
                        if (premiumLevel == 53)
                        {
                            premiumAmount = premiumAmount + (decimal)productDTO.ProductPremium.FirstOrDefault(p => p.SubLevelId == coversDTO.CoverTypeId).PremiumAmount;
                        }
                        foreach (var insurableInsurablefields in item.RiskItems)
                        {
                            policyInsurableDetailsDto = new PolicyInsurableDetailsDTO();
                            policyInsurableDetailsDto.CoverName = CoverName;
                            policyInsurableDetailsDto.InsurableItem = InsurableItemName;
                            policyInsurableDetailsDto.IdentificationNo = insurableInsurablefields["Identification Number"];
                            policyInsurableDetailsDto.Name = insurableInsurablefields["Name"];
                            policyInsurableDetailsDto.BenefitAmount = BenefitAmount;
                            policyInsurableDetailsDto.IsActive = true;
                            lstPolicyInsurableDetailsDto.Add(policyInsurableDetailsDto);
                            insItemCount++;
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
            policyDTO.PremiumAmount = totalPremiumAmount;
            return lstPolicyInsurableDetailsDto;
        }
        private PolicyDTO MapAndValidateInsurablePolicy(dynamic policyDetail, ProductDTO productDTO, PartnersDTO partnersDTO, ProductRiskDetailsDTO riskDetails, List<ErrorInfo> Errors, SingleCover singleCover, string type)
        {
            PolicyDTO policyDTO = new PolicyDTO();
            // validation of risk details
            var colName = "";

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
            policyDTO.CreatedBy = new Guid();
            policyDTO.CreatedDate = DateTime.Now;
            policyDTO.PolicyIssueDate = DateTime.Now;
            policyDTO.IsUploadedToIcm = 0;
            //policyDTO.SumInsured = productDTO.PremiumAmount;
            // policyDTO.MasterPolicyNo = "ABC";//ToDo service req
            policyDTO.PolicyVersion = 1;
            if (partnersDTO != null)
            {
                policyDTO.PolicyNo = GetPolicyNumber(partnersDTO.PartnerId, productDTO.ProductId);
                // policyDTO.Po = GetPolicyNumber(partnersDTO.PartnerId, productDTO.ProductId);
            }
            else
            {
                if (type == "Proposal")
                {
                    policyDTO.ProposalNo = GetPolicyNumber(0, productDTO.ProductId, type);
                }
                else
                {
                    policyDTO.PolicyNo = GetPolicyNumber(0, productDTO.ProductId);

                }
            }

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
            policyDTO.MasterPremium = policyDTO.PremiumAmount;//needs to fetch through rating
            policyDTO.SumInsured = policyDTO.PremiumAmount;
            return policyDTO;
        }
        private async Task<InsuranceCertificateModel> GetInsuranceCertificateModel(dynamic policyDetail, ProductDTO productDTO, TblPolicy tblpolicyDTO, PolicyDTO policyDTO, PartnersDTO partnersDTO, SingleCover singleCover, ApiContext apiContext)
        {

            InsuranceCertificateModel model = new InsuranceCertificateModel();
            var ps = await _integrationService.GetCustomerById(Convert.ToDecimal(tblpolicyDTO.CustomerId), apiContext);
            //model.cweDetails = new System.Collections.Generic.List<CweDetails>();
            model.cweproductDetails = new System.Collections.Generic.List<CweProductDetails>();
            model.Date = DateTime.Now;
            //INSURER DETAILS
            model.InsurerDetails = new InsurerDetails();
            model.InsurerDetails.ContactName = ps.CustomerName;
            model.InsurerDetails.EmailAddress = ps.CustSpocDetails.FirstOrDefault()?.EmailId;
            model.InsurerDetails.PhoneNumber = ps.PhoneNo;

            model.insurerAddress = new InsurerAddress() { AddressLine1 = ps.CustAddress.FirstOrDefault().AddressLine1, AddressLine2 = ps.CustAddress.FirstOrDefault().AddressLine2, City = "BANGLORE", State = "KARNATAKA", PinCode = "560012" };






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
            model.insuredAddress.AddressLine1 = "KR PURAM";
            model.insuredAddress.AddressLine2 = "NEAR TIN FACTORY";
            model.insuredAddress.City = "BANGLORE";
            model.insuredAddress.State = "KARNATAKA";
            model.insuredAddress.PinCode = "560002";

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



            //PremiumDetail premiumDetail = new PremiumDetail();
            //premiumDetail.PremiumLevel = "LevelId";
            //premiumDetail.Currency = "CurrenyId";
            ////premiumDetail.PremiumLevel = "Benefit";
            //// premiumDetail.Currency = "USD";
            //PremiumLevelDetail premiumLevelDetail = null;// new PremiumLevelDetail();
            //                                             // premiumLevelDetail.ParticularName = "Insurable Item1";
            //PremiumAmount premiumAmount = null;// new PremiumAmount();
            //try
            //{
            //    foreach (var item in productDTO.ProductPremium)
            //    {

            //        premiumLevelDetail = new PremiumLevelDetail();
            //        // PremiumLevelDetail premiumLevelDetail = new PremiumLevelDetail();
            //        premiumLevelDetail.ParticularName = "SublevelId";

            //        premiumAmount = new PremiumAmount();
            //        //  PremiumAmount premiumAmount = new PremiumAmount();
            //        premiumAmount.Amount = item.PremiumAmount;
            //        premiumAmount.Name = "Name";

            //        premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            //        premiumDetail.lstPremiumAmount.Add(premiumLevelDetail);

            //    }

            //    //premiumDetail.premiumLevelDetails.Add(premiumLevelDetail);
            //    model.premiumDetail = premiumDetail;

            //}
            //catch (Exception e)
            //{

            //}

            ////premiumAmount.Amount = 100;
            ////premiumAmount.Name = "Cover 1 Benefit of Rs 5000";
            //premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            //premiumAmount = new PremiumAmount();

            //premiumAmount.Amount = 50;
            //premiumAmount.Name = "Cover 2 Benefit of Rs 4000";
            //premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            //premiumDetail.lstPremiumAmount.Add(premiumLevelDetail);

            //premiumLevelDetail = new PremiumLevelDetail();
            //premiumLevelDetail.ParticularName = "Insurable Item2";
            //premiumAmount = new PremiumAmount();

            //premiumAmount.Amount = 100;
            //premiumAmount.Name = "Cover 1 Benefit of Rs 5000";
            //premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            //premiumAmount = new PremiumAmount();

            //premiumAmount.Amount = 50;
            //premiumAmount.Name = "Cover 2 Benefit of Rs 4000";
            //premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            //premiumDetail.lstPremiumAmount.Add(premiumLevelDetail);
            //model.PremiumDetail = premiumDetail;

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
                                productBenefits = coversDTO.ProductBenefits.First();
                                coveragedetails.CoverEventFactor = coversDTO.CoverEventFactor;
                                coveragedetails.MaxBenifitCriteriaAmount = Convert.ToDecimal(productBenefits.MaxBenefitAmount);
                                coveragedetails.MaxBenifitCriteriaValue = Convert.ToDecimal(productBenefits.BenefitCriteriaValue).ToString();
                                coveragedetails.BenifitCriteria = productBenefits.BenefitCriterias;
                                insurabledetails.coverages.Add(coveragedetails);

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
            model.premiumdetails.BasePremium = tblpolicyDTO.PremiumAmount.ToString();
            var GST = 0;
            model.premiumdetails.GST = GST + "%";
            model.premiumdetails.TotalPremium = (tblpolicyDTO.PremiumAmount + (tblpolicyDTO.PremiumAmount * GST / 100)).ToString();

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
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

            var leadInfoDetails = await _integrationService.GetLeadInfo(customerId, apiContext);

            return leadInfoDetails;
        }

        public async Task<IEnumerable<PolicyCountDTO>> PolicySearchDashboard(PolicySearchDashboardDTO policysearch, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
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

        public async Task<EndorsmentDTO> AddInsurableItem(dynamic insurableItemRequest, ApiContext apiContext)
        {
            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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
                        List<TblPolicyInsurableDetails> lstPolicyInsurableDetailsDto = new List<TblPolicyInsurableDetails>();

                        foreach (var item in insurableItemRequest.InsurableItem)
                        {
                            var InsurableItemName = item.InsurableName;

                            TblPolicyInsurableDetails policyInsurableDetailsDto = null;



                            foreach (var insurableInsurablefields in item.RiskItems)
                            {
                                policyInsurableDetailsDto = new TblPolicyInsurableDetails();
                                policyInsurableDetailsDto.PolicyId = policy.PolicyId;
                                policyInsurableDetailsDto.InsurableItem = InsurableItemName;
                                policyInsurableDetailsDto.IdentificationNo = insurableInsurablefields["Identification Number"];
                                policyInsurableDetailsDto.Name = insurableInsurablefields["Name"];
                                policyInsurableDetailsDto.BenefitAmount = 0;
                                policyInsurableDetailsDto.IsActive = true;
                                lstPolicyInsurableDetailsDto.Add(policyInsurableDetailsDto);
                            }

                        }

                        _context.TblPolicyInsurableDetails.AddRange(lstPolicyInsurableDetailsDto);


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

                                foreach (var insurableName in json.InsurableItem)
                                {
                                    foreach (var item in insurableItemRequest.InsurableItem)
                                    {
                                        var name1 = insurableName.InsurableName;
                                        if (name1 == "Vehicle" && item.InsurableName == "Vehicle")
                                        {
                                            foreach (var insurableName1 in json1.InsurableItem)
                                            {

                                                // var name2 = insurableName1.InsurableName;

                                                var count = insurableName.RiskItems.Count;

                                                //var additiondrivercount = json.additionalDriver + 1;
                                                // var addtionaldriver = Convert.ToInt32(additiondrivercount);
                                                if (insurableName.InsurableName == "Vehicle")
                                                {

                                                    if (count < 3)
                                                    {

                                                        if (insurableItemRequest.SI != null && insurableItemRequest.SI != "")
                                                        {
                                                            json1.si = insurableItemRequest.SI;
                                                        }
                                                        foreach (var fields in item.RiskItems)
                                                        {
                                                            try
                                                            {
                                                                //Note validation has to come vechile addition count can not be greater then 3

                                                                if (insurableName1.InsurableName == "Vehicle" && insurableName.InsurableName == "Vehicle")
                                                                {
                                                                    insurableName1.RiskItems.Add(fields);
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
                                                        return new EndorsmentDTO() { Status = BusinessStatus.InputValidationFailed, Errors = Errors, ResponseMessage = "Number of vehicle can not more than Three." };
                                                    }

                                                }
                                            }

                                        }
                                    }

                                }
                                tblPolicyDetailsdata.PolicyRequest = json1.ToString();
                                _context.TblPolicyDetails.Update(tblPolicyDetailsdata);
                                _context.SaveChanges();
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

                                                    if (insurableItemRequest.SI != null && insurableItemRequest.SI != "")
                                                    {
                                                        json1.si = insurableItemRequest.SI.ToString();
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
                                                        return new EndorsmentDTO() { ResponseMessage = "Driver updated successful" }; ;
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
                            tblPolicyDetailsdata.PolicyRequest = json1.ToString();
                            _context.TblPolicyDetails.Update(tblPolicyDetailsdata);
                            _context.SaveChanges();
                        }


                    }


                    _context.SaveChanges();
                    return new EndorsmentDTO() { Status = BusinessStatus.Updated, Id = EndorsementNo };

                }
                else
                {

                    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"No Record Found for this PolicyNumber{PolicyNo}" };
                    Errors.Add(errorInfo);
                    return new EndorsmentDTO() { Status = BusinessStatus.NotFound, Errors = Errors };

                }
            }
            catch (Exception ex) {
                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = ex.InnerException.ToString() };
                Errors.Add(errorInfo);
                return new EndorsmentDTO() { Status = BusinessStatus.NotFound, Errors = Errors };

            }
          
        }
           
        

        public async Task<EndorsmentDTO> RemoveInsurableItem(dynamic insurableItemRequest, ApiContext apiContext)
        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            EndorsmentDTO endorsmentDTO = new EndorsmentDTO();
            try
            {
                string PolicyNo = insurableItemRequest["PolicyNumber"].ToString();

                var policy = _context.TblPolicy.SingleOrDefault(x => x.PolicyNo == PolicyNo);
                if (policy != null)
                {
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

                        foreach (var item in insurableItemRequest.InsurableItem)
                        {

                            foreach (var insurableName in json.InsurableItem)
                            {
                                foreach (var insurableName1 in json1.InsurableItem)
                                {
                                    if (item.InsurableName == insurableName.InsurableName)
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
                                                    //var name = insurableName1.InsurableName;
                                                    //var name1 = insurableName1.RiskItems;
                                                    //if (item.InsurableName == insurableName1.InsurableName)
                                                    insurableName1.RiskItems = insurableName.RiskItems;
                                                    // insurableName1.Add(insurableName.RiskItems
                                                    // json1.InsurableItem = insurableName.RiskItems;
                                                }

                                            }
                                            else
                                            {



                                            }
                                        }
                                    }

                                }
                            }

                        }
                        tblPolicyDetailsdata.PolicyRequest = json1.ToString();
                        _context.TblPolicyDetails.Update(tblPolicyDetailsdata);
                        await _context.SaveChangesAsync();


                        endorsmentDTO.ResponseMessage = $"RiskItems Deleted successfully for this Policy Number{PolicyNo}";
                        return endorsmentDTO;

                        //   _context.SaveChanges();
                    }


                }

               
                return new EndorsmentDTO();
            }
            catch (Exception ex) {

                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = ex.InnerException.ToString() };
                Errors.Add(errorInfo);
                endorsmentDTO.Errors = Errors;
                return endorsmentDTO;
            }

        }


        public async Task<EndorsmentDTO> SwitchOnOff(dynamic switchOnOffRequest, ApiContext apiContext)
        {
            return new EndorsmentDTO();
        }

        //
        public async Task<decimal> GetPolicyDetailsByPolicyNo(string PolicyNO, ApiContext apiContext)
        {
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

            var policyNo = (string)modifydata["PolicyNumber"];
            var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.PolicyNo == policyNo);
            var policyId = tbl_particiant.PolicyId;
            var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
            var insurableItem = tblPolicyDetailsdata.PolicyRequest;
            dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
            dynamic json1 = JsonConvert.DeserializeObject<dynamic>(insurableItem);


            foreach (var insurableName in json.InsurableItem)
            {
                foreach (var insurableName1 in json1.InsurableItem)
                {

                    foreach (var item in modifydata.InsurableItem)
                    {

                        if (item.InsurableName == insurableName.InsurableName)
                        {

                            foreach (var fields in item.RiskItems)
                            {
                                try
                                {
                                    foreach (var jsoninsurableFields in insurableName.RiskItems)
                                    // for(var i=0;i< insurableName.RiskItems.Countf)
                                    {
                                        var InputidentificationNumber = (string)fields["Identification Number"];
                                        var TblIdentificationNo = (string)jsoninsurableFields["Identification Number"];
                                        if (InputidentificationNumber == TblIdentificationNo)
                                        {
                                            //insurableName.RiskItems = item.RiskItems;

                                            var Adddata = fields;
                                            var removeitem = jsoninsurableFields;
                                            insurableName.RiskItems.Remove(removeitem);
                                            insurableName.RiskItems.Add(Adddata);
                                         
                                        }
                                    }
                                }
                                catch (Exception e)
                                {
                                    insurableName1.RiskItems = insurableName.RiskItems;
                                }

                            }
                        }

                    }

                }
                tblPolicyDetailsdata.PolicyRequest = json1.ToString();
                _context.TblPolicyDetails.Update(tblPolicyDetailsdata);
                _context.SaveChanges();
               
            }
            return null;
        }
            

        //GetInsurableItemDetails
        public async Task<dynamic> GetInsurableItemDetails(string policyNo, string insurableItemName, ApiContext apiContext)
        {
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

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

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



        //Creating proposal 

        public async Task<ProposalResponse> CreateProposal(dynamic ProposalDetail, ApiContext apiContext)

        {

            _context = (MICAPOContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));



            List<ErrorInfo> Errors = new List<ErrorInfo>();

            SingleCover singleCover = new SingleCover();

            decimal PolicyId = 0; string policyNumber = ""; string proposalNumber = ""; decimal premiumAmount = 0;

            string logMsg = "";

            try
            {
                Errors = GetPolicyRequestValidation(ProposalDetail);
                PremiumRequestDTO premiumRequestDTO = new PremiumRequestDTO();
                premiumRequestDTO.SI = ProposalDetail["si"];
                premiumRequestDTO.StateCode = ProposalDetail["stateCode"];
                premiumRequestDTO.NoOfPC = ProposalDetail["noOfPC"];
                premiumRequestDTO.NoOfTW = ProposalDetail["noOfTW"];
                premiumRequestDTO.DriverAge = ProposalDetail["driverAge"];
                premiumRequestDTO.DriverExp = ProposalDetail["driverExp"];
                premiumRequestDTO.AdditionalDriver = ProposalDetail["additionalDriver"];
                premiumRequestDTO.BillingFrequency = ProposalDetail["billingFrequency"];


                //  var Data = ProposalDetail["CalculatePremium"];
                var paymentinfo = ProposalDetail["PaymentInfo"];
                var paymentinfoRequest = JsonConvert.DeserializeObject<List<PaymentInfo>>(paymentinfo.ToString());
                // var CalculatePremiumRequest = JsonConvert.DeserializeObject<PremiumRequestDTO>(premiumRequestDTO.ToString());
                var CalculatePremiumResponse = await _integrationService.PremiumCalCulattion(premiumRequestDTO, apiContext);

                if ((paymentinfoRequest[0].Amount - CalculatePremiumResponse.Total) <= 1 || (paymentinfoRequest[0].Amount - CalculatePremiumResponse.Total) >= -1)
                {
                    var expObj = JsonConvert.DeserializeObject<ExpandoObject>(ProposalDetail.ToString());
                    AddProperty(expObj, "PaymentInfoDeatils", CalculatePremiumResponse);
                    var tempobj = JsonConvert.SerializeObject(expObj);
                    ProposalDetail = JsonConvert.DeserializeObject<dynamic>(tempobj.ToString());
                    if (Errors.Count > 0)
                    {
                        return new ProposalResponse { Status = BusinessStatus.InputValidationFailed, Errors = Errors };
                    }
                    var productCode = ProposalDetail["Product Code"].ToString();
                    var partnerId = "";
                    if (ProposalDetail["Partner ID"] != null)

                    {
                        partnerId = ProposalDetail["Partner ID"].ToString();
                    }

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

                    //foreach (var item in productDetails.ProductInsurableItems[0].ProductCovers)

                    //{

                    //    cover = item.Cover;

                    //    coverEvent = item.CoverEvent;

                    //}

                    //cover=coverDetail.Cover; coverEvent = coverDetail.CoverEvent;

                    logMsg = "1";

                    PartnersDTO partnerDetails = null;

                    if (partnerId.Length > 0)

                    {

                        partnerDetails = await _integrationService.GetPartnerDetailAsync(partnerId, apiContext);

                        if (partnerDetails.PartnerId <= 0)

                        {

                            ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PartnerID", PropertyName = "PartnerID", ErrorMessage = $"PartnerID : {productCode} Not Found" };

                            Errors.Add(errorInfo);

                            return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };

                        }

                    }

                    logMsg = logMsg + ",2";

                    var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);

                    if (policyRiskDetails.ProductRcbDetails.Count <= 0)
                    {
                        ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "RiskDetail", PropertyName = "RiskDetail", ErrorMessage = $"RiskDetail for product : {partnerId} Not Found" };
                        Errors.Add(errorInfo);
                        return new ProposalResponse { Status = BusinessStatus.NotFound, Errors = Errors };
                    }

                    logMsg = logMsg + ",3";
                    var mappedPolicy = MapAndValidateInsurablePolicy(ProposalDetail, productDetails, partnerDetails, policyRiskDetails, Errors, singleCover, "Proposal");
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

                        //save Proposal number
                        var ProposalObj = JsonConvert.DeserializeObject<ExpandoObject>(ProposalDetail.ToString());
                        AddProperty(expObj, "ProposalNo", mappedPolicy.ProposalNo);
                        var Proposaltempobj = JsonConvert.SerializeObject(expObj);
                        ProposalDetail = JsonConvert.DeserializeObject<dynamic>(Proposaltempobj.ToString());
                        PolicyId = SavePolicyDetails(mappedPolicy, ProposalDetail);

                        logMsg = logMsg + ",4";

                        var Amount = paymentinfoRequest[0].Amount;

                        proposalNumber = mappedPolicy.ProposalNo;


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



                            master.AccountNo = policyUpdate.ProposalNo;

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

                                return new ProposalResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Account number {cdAccount} is locked" };

                            }

                            else if (transaction.Status == BusinessStatus.NotFound)

                            {

                                return new ProposalResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"Account number {cdAccount} does not exist" };

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

                                CreatedDate = DateTime.Now,

                                PolicyId = PolicyId

                            };

                            _context.TblPolicyPayment.Add(policyPayment);

                            _context.SaveChanges();

                            //  var paytmtransactionResponce = await _integrationService.DoTransactionByPayment(PolicyId, Amount, mappedPolicy.MobileNumber, apiContext);





                            return new ProposalResponse { Status = BusinessStatus.Created, Id = proposalNumber, ResponseMessage = $"Proposal created with proposal number {proposalNumber}" };

                        }



                    }

                }

                else

                {



                    return new ProposalResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Calculate Premium Amount {CalculatePremiumResponse.Total} differs with payment collected amount {paymentinfoRequest[0].Amount}" };

                }

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

        public async Task<dynamic> GetProposalDetails(string proposalNo, string Mobileno, string policyno, ApiContext apiContext)
        {
            TblPolicy tbl_particiant = null;
            if (!string.IsNullOrEmpty(proposalNo) && !string.IsNullOrEmpty(policyno))
            {
                tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.ProposalNo == proposalNo && x.PolicyNo == policyno);


            }
            else if (proposalNo != null && proposalNo != "")
            {
                tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.ProposalNo == proposalNo);

            }
            else if (Mobileno != null && Mobileno != "")
            {
                tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.MobileNumber == Mobileno);

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
           
                return json;
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

            return "Data not found";
            //tblPolicyDetailsdata.PolicyRequest = json.ToString();
            //_context.TblPolicyDetails.Update(tblPolicyDetailsdata);
            //_context.SaveChanges();

        }


        public async Task<PolicyResponse> IssuePolicy(dynamic IssuepolicyDTO, ApiContext apiContext)
        {

            string proposalNumber = "";
            var proposalNo = (string)IssuepolicyDTO["ProposalNumber"];
            var tblPolicy = _context.TblPolicy.FirstOrDefault(x => x.ProposalNo == proposalNo);
            var policyId = tblPolicy.PolicyId;
            var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
            var insurableItem = tblPolicyDetailsdata.PolicyRequest;
            dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
            tblPolicy.PolicyNo = GetPolicyNumber(0, Convert.ToDecimal(tblPolicy.ProductIdPk));
            foreach (var item in IssuepolicyDTO.InsurableItem)
            {
                foreach (var insurableName in json.InsurableItem)
                {
                    if (item.InsurableName == insurableName.InsurableName)
                    {

                        foreach (var fields in item.RiskItems)
                        {
                            foreach (var jsoninsurableFields in insurableName.RiskItems)
                            {
                                var InputidentificationNumber = (string)fields["Identification Number"];
                                var TblIdentificationNo = (string)jsoninsurableFields["Identification Number"];
                                //if (InputidentificationNumber == TblIdentificationNo)
                                //{
                                insurableName.RiskItems = item.RiskItems;
                                //}
                            }
                        }


                    }

                }

            }
            tblPolicyDetailsdata.PolicyRequest = json.ToString();
            _context.TblPolicy.Update(tblPolicy);
            _context.TblPolicyDetails.Update(tblPolicyDetailsdata);
            _context.SaveChanges();


            return new PolicyResponse { Status = BusinessStatus.Created, Id = tblPolicy.PolicyNo, ResponseMessage = $"Policy Issued for this Policy Number {tblPolicy.PolicyNo}" };

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
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            var proposalNo = (string)modifydata["ProposalNumber"];
            var tbl_particiant = _context.TblPolicy.FirstOrDefault(x => x.ProposalNo == proposalNo);
            if (tbl_particiant != null)
            {



                var policyId = tbl_particiant.PolicyId;
                var tblPolicyDetailsdata = _context.TblPolicyDetails.FirstOrDefault(x => x.PolicyId == policyId);
                var insurableItem = tblPolicyDetailsdata.PolicyRequest;
                dynamic json = JsonConvert.DeserializeObject<dynamic>(insurableItem);
                foreach (var item in modifydata.InsurableItem)
                {
                    foreach (var insurableName in json.InsurableItem)
                    {
                        if (item.InsurableName == insurableName.InsurableName)
                        {
                            foreach (var fields in item.RiskItems)
                            {
                                foreach (var jsoninsurableFields in insurableName.RiskItems)
                                {
                                    var InputidentificationNumber = (string)fields["Identification Number"];
                                    var TblIdentificationNo = (string)jsoninsurableFields["Identification Number"];
                                    if (InputidentificationNumber == TblIdentificationNo)
                                    {
                                        insurableName.RiskItems = item.RiskItems;
                                    }
                                }
                            }
                        }

                    }

                }
                tblPolicyDetailsdata.PolicyRequest = json.ToString();
                _context.TblPolicyDetails.Update(tblPolicyDetailsdata);
                _context.SaveChanges();
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
            ProposalResponse proposalResponse = new ProposalResponse();
            List<ErrorInfo> Errors = new List<ErrorInfo>();
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
                    return proposalResponse;
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
                    return proposalResponse;
                }

                //For that row isActive will be false

                //Note tested but ruturn type have to handle the return type
                if (endorsementType == "Deletion of vehicle" || endorsementType == "Deletion of driver")
                {
                    var data = await RemoveInsurableItem(endoresementDto, apiContext);

                    return null;

                    //return data;
                }

                //Tested have to handle the return type
                if (endorsementType == "Cancel Policy")
                {

                    var data = PolicyCancellation1(endoresementDto, apiContext);
                    return data;
                }

                return null;
            }

            catch (Exception ex)
            {
                ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = ex.InnerException.ToString() };
                Errors.Add(errorInfo);
                proposalResponse.Errors = Errors;
                return proposalResponse;
            }

        }
        


    }
}








