using AutoMapper;
using iNube.Services.Claims.Controllers.ClaimManagement.IntegrationServices;
using iNube.Services.Claims.Entities;
using iNube.Services.Claims.Entities.CNEntities;
using iNube.Services.Claims.Helpers;
using iNube.Services.Claims.Models;
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
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
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
        private MICACNContext _CNContext;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public DbHelper dbHelper;
        public MicaClaimManagementService(MICACMContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            _emailService = emailService;
            dbHelper = new DbHelper(new IntegrationService(configuration)); ;
        }

        //Accountig Transaction
        //Fetching Properties
        private static PropertyInfo[] GetProperties(object obj)
        {
            return obj.GetType().GetProperties();
        }
        public async Task<String> AccountMapPayment(ApiContext apiContext, object claimData)
        {
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
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

                string dateTime = DateTimeNow.ToString();
                string createddate = Convert.ToDateTime(dateTime).ToString("yyyy-MM-dd h:mm tt");
                DateTime date = DateTime.ParseExact(createddate, "yyyy-MM-dd h:mm tt", CultureInfo.InvariantCulture);
                //Storing All Transaction Header Value
                foreach (var accountMap in accountMapDetailsList)
                {
                    var accountproperties = GetProperties(claimData);
                    if (accountMap.Object == "Claim" && accountMap.Event == "Payment")
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
                        var accountproperties = GetProperties(claimData);
                        if (accountMapCd.Object == "Claim" && accountMapCd.Event == "Payment")
                        {
                            TransactionDto transactionDto = new TransactionDto();
                            foreach (var actnProp in accountproperties)
                            {
                                if (claimData.GetType().GetProperty("Currency") != null)
                                {
                                    var currency = claimData.GetType().GetProperty("Currency").GetValue(claimData, null);
                                    transactionDto.Currency = Convert.ToString(currency);
                                }
                                else
                                {
                                    transactionDto.Currency = "INR";
                                }
                                var Amount = claimData.GetType().GetProperty("Amount").GetValue(claimData, null);
                                transactionDto.TypeOfTransaction = accountMap.TypeofTransaction;
                                if (accountMap.TypeofTransaction == "Credit")
                                {

                                    transactionDto.Amount = Convert.ToDecimal(Amount);

                                }
                                if (accountMap.TypeofTransaction == "Debit")
                                {

                                    transactionDto.Amount = Convert.ToDecimal(Amount);

                                }
                                //transactionDto.Amount = (decimal)sumInsured;
                                transactionDto.Description = accountMap.Description;
                                transactionDto.IsActive = "Y";

                                transactionDto.CreatedDate = accountMap.CreatedDate;
                                transactionDto.RuleName = accountMapCd.RuleName;
                                transactionDto.Object = accountMapCd.Object;
                                transactionDto.Event = accountMapCd.Event;
                                transactionDto.AccountType = accountMap.AccountType;
                                transactionDto.Value = accountMap.Value;
                                transactionDto.AccountCode = accountMap.AccountCode;
                                //Addition of Partner Id and Product Id
                                //Addition of Partner Id and Product Id
                                if (claimData.GetType().GetProperty("PartnerId") != null)
                                {
                                    var partnerId = claimData.GetType().GetProperty("PartnerId").GetValue(claimData, null);
                                    transactionDto.PartnerId = Convert.ToDecimal(partnerId);
                                }
                                else
                                {
                                    transactionDto.PartnerId = apiContext.PartnerId;
                                }

                                if (claimData.GetType().GetProperty("OrgId") != null)
                                {
                                    var partnerId = claimData.GetType().GetProperty("OrgId").GetValue(claimData, null);
                                    transactionDto.OrganizationId = Convert.ToDecimal(partnerId);
                                }
                                else
                                {
                                    transactionDto.OrganizationId = apiContext.OrgId;
                                }
                                if (claimData.GetType().GetProperty("ProductId") != null)
                                {
                                    var productId = claimData.GetType().GetProperty("ProductId").GetValue(claimData, null);
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
                        var accountproperties = GetProperties(claimData);
                        if (accountMapSl.Object == "Claim" && accountMapSl.Event == "Payment")
                        {
                            foreach (var actnProp in accountproperties)
                            {
                                transSubLedger.SubLedgerReferencesId = accountMap.SubLedgerReferencesId;
                                if (accountMap.LedgerObject == "Policy")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "Amount")
                                    {
                                        ledgerColName = "Amount";
                                    }
                                    if (ledgerColName == "Policy Number")
                                    {
                                        ledgerColName = "PolicyNo";
                                    }
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                if (accountMap.LedgerObject == "Product")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                if (accountMap.LedgerObject == "Claim")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "Policy Number")
                                    {
                                        ledgerColName = "PolicyNo";
                                    }
                                    if (ledgerColName == "Claim Number")
                                    {
                                        ledgerColName = "ClaimNo";
                                    }
                                    if (ledgerColName == "Insured Ref")
                                    {
                                        ledgerColName = "InsuredRefNo";
                                    }
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
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

        public async Task<String> AccountMapIntimation(ApiContext apiContext, object claimData)
        {
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
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

                string dateTime = DateTimeNow.ToString();
                string createddate = Convert.ToDateTime(dateTime).ToString("yyyy-MM-dd h:mm tt");
                DateTime date = DateTime.ParseExact(createddate, "yyyy-MM-dd h:mm tt", CultureInfo.InvariantCulture);
                //Storing All Transaction Header Value
                foreach (var accountMap in accountMapDetailsList)
                {
                    var accountproperties = GetProperties(claimData);
                    if (accountMap.Object == "Claim" && accountMap.Event == "Intimation")
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
                        var accountproperties = GetProperties(claimData);
                        if (accountMapCd.Object == "Claim" && accountMapCd.Event == "Intimation")
                        {
                            TransactionDto transactionDto = new TransactionDto();
                            foreach (var actnProp in accountproperties)
                            {
                                if (claimData.GetType().GetProperty("Currency") != null)
                                {
                                    var currency = claimData.GetType().GetProperty("Currency").GetValue(claimData, null);
                                    transactionDto.Currency = Convert.ToString(currency);
                                }
                                else
                                {
                                    transactionDto.Currency = "INR";
                                }
                                var Amount = claimData.GetType().GetProperty("ClaimAmount").GetValue(claimData, null);
                                transactionDto.TypeOfTransaction = accountMap.TypeofTransaction;
                                if (accountMap.TypeofTransaction == "Credit")
                                {

                                    transactionDto.Amount = Convert.ToDecimal(Amount);

                                }
                                if (accountMap.TypeofTransaction == "Debit")
                                {

                                    transactionDto.Amount = Convert.ToDecimal(Amount);

                                }
                                //transactionDto.Amount = (decimal)sumInsured;
                                transactionDto.Description = accountMap.Description;
                                transactionDto.IsActive = "Y";

                                transactionDto.CreatedDate = accountMap.CreatedDate;
                                transactionDto.RuleName = accountMapCd.RuleName;
                                transactionDto.Object = accountMapCd.Object;
                                transactionDto.Event = accountMapCd.Event;
                                transactionDto.AccountType = accountMap.AccountType;
                                transactionDto.Value = accountMap.Value;
                                transactionDto.AccountCode = accountMap.AccountCode;
                                //Addition of Partner Id and Product Id
                                //Addition of Partner Id and Product Id
                                if (claimData.GetType().GetProperty("PartnerId") != null)
                                {
                                    var partnerId = claimData.GetType().GetProperty("PartnerId").GetValue(claimData, null);
                                    transactionDto.PartnerId = Convert.ToDecimal(partnerId);
                                }
                                else
                                {
                                    transactionDto.PartnerId = apiContext.PartnerId;
                                }

                                if (claimData.GetType().GetProperty("OrganizationId") != null)
                                {
                                    var orgId = claimData.GetType().GetProperty("OrganizationId").GetValue(claimData, null);
                                    transactionDto.OrganizationId = Convert.ToDecimal(orgId);
                                }
                                else
                                {
                                    transactionDto.OrganizationId = apiContext.OrgId;
                                }
                                if (claimData.GetType().GetProperty("ProductId") != null)
                                {
                                    var productId = claimData.GetType().GetProperty("ProductId").GetValue(claimData, null);
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
                        var accountproperties = GetProperties(claimData);
                        if (accountMapSl.Object == "Claim" && accountMapSl.Event == "Intimation")
                        {
                            foreach (var actnProp in accountproperties)
                            {
                                transSubLedger.SubLedgerReferencesId = accountMap.SubLedgerReferencesId;
                                if (accountMap.LedgerObject == "Policy")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "Amount")
                                    {
                                        ledgerColName = "ClaimAmount";
                                    }
                                    if (ledgerColName == "Policy Number")
                                    {
                                        ledgerColName = "PolicyNumber";
                                    }
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                if (accountMap.LedgerObject == "Product")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                if (accountMap.LedgerObject == "Claim")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "Policy Number")
                                    {
                                        ledgerColName = "PolicyNumber";
                                    }
                                    if (ledgerColName == "Claim Number")
                                    {
                                        ledgerColName = "ClaimNumber";
                                    }
                                    if (ledgerColName == "Insured Ref")
                                    {
                                        ledgerColName = "IdentificationNo";
                                    }
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
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

        public async Task<String> AccountMapApproval(ApiContext apiContext, object claimData)
        {
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
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

                string dateTime = DateTimeNow.ToString();
                string createddate = Convert.ToDateTime(dateTime).ToString("yyyy-MM-dd h:mm tt");
                DateTime date = DateTime.ParseExact(createddate, "yyyy-MM-dd h:mm tt", CultureInfo.InvariantCulture);
                //Storing All Transaction Header Value
                foreach (var accountMap in accountMapDetailsList)
                {
                    var accountproperties = GetProperties(claimData);
                    if (accountMap.Object == "Claim" && accountMap.Event == "Approval")
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
                        var accountproperties = GetProperties(claimData);
                        if (accountMapCd.Object == "Claim" && accountMapCd.Event == "Approval")
                        {
                            TransactionDto transactionDto = new TransactionDto();
                            foreach (var actnProp in accountproperties)
                            {
                                if (claimData.GetType().GetProperty("Currency") != null)
                                {
                                    var currency = claimData.GetType().GetProperty("Currency").GetValue(claimData, null);
                                    transactionDto.Currency = Convert.ToString(currency);
                                }
                                else
                                {
                                    transactionDto.Currency = "INR";
                                }
                                var Amount = claimData.GetType().GetProperty("ApprovedClaimAmount").GetValue(claimData, null);
                                transactionDto.TypeOfTransaction = accountMap.TypeofTransaction;
                                if (accountMap.TypeofTransaction == "Credit")
                                {

                                    transactionDto.Amount = Convert.ToDecimal(Amount);

                                }
                                if (accountMap.TypeofTransaction == "Debit")
                                {

                                    transactionDto.Amount = Convert.ToDecimal(Amount);

                                }
                                //transactionDto.Amount = (decimal)sumInsured;
                                transactionDto.Description = accountMap.Description;
                                transactionDto.IsActive = "Y";

                                transactionDto.CreatedDate = accountMap.CreatedDate;
                                transactionDto.RuleName = accountMapCd.RuleName;
                                transactionDto.Object = accountMapCd.Object;
                                transactionDto.Event = accountMapCd.Event;
                                transactionDto.AccountType = accountMap.AccountType;
                                transactionDto.Value = accountMap.Value;
                                transactionDto.AccountCode = accountMap.AccountCode;
                                //Addition of Partner Id and Product Id
                                //Addition of Partner Id and Product Id
                                if (claimData.GetType().GetProperty("PartnerId") != null)
                                {
                                    var partnerId = claimData.GetType().GetProperty("PartnerId").GetValue(claimData, null);
                                    transactionDto.PartnerId = Convert.ToDecimal(partnerId);
                                }
                                else
                                {
                                    transactionDto.PartnerId = apiContext.PartnerId;
                                }

                                if (claimData.GetType().GetProperty("OrganizationId") != null)
                                {
                                    var partnerId = claimData.GetType().GetProperty("OrganizationId").GetValue(claimData, null);
                                    transactionDto.OrganizationId = Convert.ToDecimal(partnerId);
                                }
                                else
                                {
                                    transactionDto.OrganizationId = apiContext.OrgId;
                                }
                                if (claimData.GetType().GetProperty("ProductId") != null)
                                {
                                    var productId = claimData.GetType().GetProperty("ProductId").GetValue(claimData, null);
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
                        var accountproperties = GetProperties(claimData);
                        if (accountMapSl.Object == "Claim" && accountMapSl.Event == "Approval")
                        {
                            foreach (var actnProp in accountproperties)
                            {
                                transSubLedger.SubLedgerReferencesId = accountMap.SubLedgerReferencesId;
                                if (accountMap.LedgerObject == "Policy")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "Amount")
                                    {
                                        ledgerColName = "ApprovedClaimAmount";
                                    }
                                    if (ledgerColName == "Policy Number")
                                    {
                                        ledgerColName = "PolicyNumber";
                                    }
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                if (accountMap.LedgerObject == "Product")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
                                        transSubLedger.Value = Convert.ToString(ledgerColValue);
                                    }
                                }
                                if (accountMap.LedgerObject == "Claim")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "Policy Number")
                                    {
                                        ledgerColName = "PolicyNumber";
                                    }
                                    if (ledgerColName == "Claim Number")
                                    {
                                        ledgerColName = "ClaimNumber";
                                    }
                                    if (ledgerColName == "Insured Ref")
                                    {
                                        ledgerColName = "InsuredName";
                                    }
                                    if (claimData.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = claimData.GetType().GetProperty(ledgerColName).GetValue(claimData, null);
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


        public async Task<ClaimResponse> CreateClaimAsync(dynamic claimDetail, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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

        private string GetClaimNumber(decimal partnerId, decimal productId, string type = "ClaimNumber")
        {
            //  _context = (MICAPOContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            var connectionString = _configuration.GetConnectionString("PCConnection");
            int nextNumber = 0; string claimNumber = "";
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
            claimNumber = "C" + nextNumber.ToString();
            return claimNumber;
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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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

        public async Task<ClaimResponses> ClaimIntimate(ClaimDataDTO claims, ApiContext apiContext)
        {

            List<ClaimInsurableDTO> claimInsurableDTO = new List<ClaimInsurableDTO>();
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var policyDetails = await _integrationService.GetPolicyByNumber(claims.PolicyNumber, apiContext);
            if (policyDetails.PolicyId <= 0)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PolicyNumber", PropertyName = "PolicyNumber", ErrorMessage = $"PolicyNumber : {claims.PolicyNumber} Already Exist" };

                ClaimResponses claimsDTO = new ClaimResponses();

                claimsDTO.Errors.Add(errorInfo);
                return new ClaimResponses { Status = BusinessStatus.NotFound, Errors = claimsDTO.Errors };
            }

            claims.OrganizationId = Convert.ToDecimal(policyDetails.CustomerId);
            claims.ProductIdPk = policyDetails.ProductIdPk;

            UpdateClaimData(claims, apiContext);



            var _tblclaims = _mapper.Map<TblClaims>(claims);
            _context.TblClaims.Add(_tblclaims);
            _context.SaveChanges();

            var claimid = _tblclaims.ClaimId;
            var StrStateId = claims.AdditionalDetails["Vehicle Location State"].ToString();
            int StateId = Convert.ToInt32(StrStateId);
            var statecode = await GetStateAbbrevation(StateId, apiContext);
            AllocDTO alloc = new AllocDTO();
            alloc.State = statecode;
            string EventId = "1";
            var allocationdata = await _integrationService.CheckRuleSets(EventId, alloc, apiContext);
            var allocationdetails = JsonConvert.SerializeObject(allocationdata);
            // var allocdata = JsonConvert.DeserializeObject<dynamic>(json);
            TblClaimAllocationDetails _claimAllocationDetailsDTO = new TblClaimAllocationDetails();

            foreach (var item in allocationdata)
            {
                _claimAllocationDetailsDTO = new TblClaimAllocationDetails();
                _claimAllocationDetailsDTO.AllocatedTo = item["Claim Manager"];
                _claimAllocationDetailsDTO.EmailId = item["Mail Id"];
                _claimAllocationDetailsDTO.MobileNumber = item["Contact Number"];
                _claimAllocationDetailsDTO.AllocationType = "Individual";
                _claimAllocationDetailsDTO.ClaimId = claimid;
                _claimAllocationDetailsDTO.AllocationDetails = allocationdetails;
                _context.TblClaimAllocationDetails.Add(_claimAllocationDetailsDTO);
                _context.SaveChanges();
            }

            var _claimsDTOs = _mapper.Map<ClaimResponses>(_tblclaims);
            _claimsDTOs.Status = BusinessStatus.Created;
            _claimsDTOs.ResponseMessage = "record created..";


            EmailTest emailTest = new EmailTest();
            emailTest.To = policyDetails.Email;
            emailTest.Subject = "Claim successfully registered";
            emailTest.Message = "Claim Number: " + claims.ClaimNumber + " successfully registered against policy No: " + claims.PolicyNumber + " \n Your Claim will be processed in accordance with the Policy terms and Conditions. \n \n Assuring the best of services always. \n \nRegards, \nTeam MICA";

            // New changes 
            SendEmailAsync(emailTest);


            EmailTest manangerEmail = new EmailTest();
            manangerEmail.To = "rashmidevi.p@inubesolutions.com";
            // manangerEmail.Subject = "";
            manangerEmail.Message = " Dear Sir/Madam " + " \n Vehicle Number " + "(KA 36 AR 0522)" + " has met with accident on " + claims.CreatedDate + " at location " + claims.AdditionalDetails["Vehicle Location"] + " . " + " A Claim is registered with Claim Number " + claims.ClaimNumber + " and allocated to you for futher process. " + " \n Thanks ";
            SendEmailAsync(manangerEmail);

            //Models.SMSRequest request = new Models.SMSRequest();
            //request.RecipientNumber = "8197521528";
            //request.SMSMessage = "Hi rashmi";
            //SendSMS(request);

            //Accouting Transaction 
            var account = AccountMapIntimation(apiContext, claims);

            return _claimsDTOs;

        }

        private void SendSMS(Models.SMSRequest SMSDTO)
        {

            SMSDTO.APIKey = "6nnnnyhH4ECKDFC5n59Keg";
            SMSDTO.SenderId = "SMSTST";
            SMSDTO.Channel = "2";

            var SMSAPI = "https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=6nnnnyhH4ECKDFC5n59Keg&senderid=SMSTST&channel=2&DCS=0&flashsms=0&number=91" + SMSDTO.RecipientNumber + "&text=" + SMSDTO.SMSMessage;

            var client = new WebClient();
            var content = client.DownloadString(SMSAPI);
        }

        private async Task<ClaimDataDTO> UpdateClaimData(ClaimDataDTO claims, ApiContext apiContext)
        {

            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);

            var ClaimNumber = GetClaimNumber(0, Convert.ToDecimal(claims.ProductIdPk));
            ClaimsDTO _claims = new ClaimsDTO();

            claims.ClaimStatusId = 33;
            claims.ClaimNumber = ClaimNumber;
            claims.CreatedDate = DateTimeNow;
            claims.CreatedBy = apiContext.UserId;
            claims.PartnerId = apiContext.PartnerId;
            claims.OrganizationId = apiContext.OrgId;
            _claims.LossId = claims.lossIntimatedBy;
            _claims.LocationOfEvent = claims.locationOfLoss;
            _claims.LossOfDescription = claims.lossDescription;
            _claims.PolicyNo = claims.PolicyNumber;
            _claims.ProductIdPk = claims.ProductIdPk;
            dynamic json = JsonConvert.SerializeObject(claims.AdditionalDetails);
            _claims.ClaimFields = json;


            return claims;
        }

        private async Task<string> GetStateAbbrevation(int StateId, ApiContext apiContext)
        {
            _CNContext = (MICACNContext)(await DbManager.GetNewContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var statevalue = _CNContext.TblMasState.SingleOrDefault(x => x.StateId == StateId).StateAbbreviation;
            string statevalue1 = statevalue.Trim();
            return statevalue;
        }

        public async Task<ClaimDTOGWP> GetClaimGWP(ClaimDTOGWP claimgwp, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTO>> GetMaster(string sMasterlist, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
                        ClaimPolicyNumber.Add(i.ToString(), Policyno.FirstOrDefault().Value);
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
                        var policy = policyDetails.FirstOrDefault(p => p.PolicyId == item.PolicyId);
                        finance.PolicyNo = policy.PolicyNo;
                        finance.InsuredName = policy.CoverNoteNo;
                        finance.InsuredRefNo = policy.CustomerId;
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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
                        ClaimPolicyNumber.Add(i.ToString(), Policyno.FirstOrDefault().Value);
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
                        var policy = policyDetails.FirstOrDefault(p => p.PolicyId == item.PolicyId);
                        finance.PolicyNo = policy.PolicyNo;
                        finance.InsuredName = policy.CoverNoteNo;
                        finance.InsuredRefNo = policy.CustomerId;
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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
                        ClaimPolicyNumber.Add(i.ToString(), Policyno.FirstOrDefault().Value);
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
                        var policy = policyDetails.FirstOrDefault(p => p.PolicyId == item.PolicyId);
                        finance.PolicyNo = policy.PolicyNo;
                        finance.InsuredName = policy.CoverNoteNo;
                        finance.InsuredRefNo = policy.CustomerId;
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

            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
            var ClaimApproval = _context.TblClaims.SingleOrDefault(x => x.ClaimNumber == claimsDTO.ClaimNumber);
            var Insurable = _context.TblClaimInsurable.Where(x => x.ClaimId == claimsDTO.ClaimId).ToList();
            EmailTest emailTest = new EmailTest();
            TblClaimHistory claimsHistory = new TblClaimHistory();
            List<ClaimdocDTO> _claimdoc = new List<ClaimdocDTO>();

            var oldstatusId = ClaimApproval.ClaimStatusId;
            // Get Clone 
            //  var hisClaimApproval= Clone.ClaimApproval.

            TblClaims claimsprocess = _mapper.Map<TblClaims>(ClaimApproval);

            claimsprocess.ModifiedBy = apiContext.UserId;
            claimsprocess.ModifiedDate = DateTimeNow;
            claimsprocess.ClaimStatusId = claimsDTO.ClaimStatusId;
            claimsprocess.ClaimManagerRemarks = claimsDTO.ClaimManagerRemarks;
            claimsprocess.ApprovedClaimAmount = claimsDTO.ApprovedClaimAmount;




            foreach (var item in claimsDTO.DataModelDTO)
            {
                TblBankAccounts _bankAccounts = new TblBankAccounts();
                _bankAccounts.AccountHolderName = item["Account Holder Name"];
                _bankAccounts.AccountNumber = item["Account No."];
                _bankAccounts.ClaimId = ClaimApproval.ClaimId;
                _bankAccounts.BankBranchAddress = item["Bank Branch Address"];
                _bankAccounts.BankName = item["Bank Name"];
                _bankAccounts.Ifsccode = item["IFSC Code"];
                _bankAccounts.AccountType = item["Account Type"];
                _bankAccounts.AmountPaid = item["Amount Paid"];
                _bankAccounts.DataOfPayment = item["Date Of Payment"];
                _bankAccounts.PayeeType = item.type;
                _context.TblBankAccounts.Add(_bankAccounts);
            }

            if (claimsprocess.ClaimStatusId == 9)
            {
                emailTest.To = claimsDTO.EmailId;
                emailTest.Subject = "Claim successfully approved";
                emailTest.Message = "Claim Number: " + claimsprocess.ClaimNumber + " successfully approved. \n Your Claim has been approved, by the Claims Manager. \n The Approved Claims will be settled as per the policy terms and conditions.\n Assuring the best of services always. \n \nRegards, \nTeam MICA";

            }
            else if (claimsprocess.ClaimStatusId == 11)
            {
                emailTest.To = claimsDTO.EmailId;
                emailTest.Subject = "Claim Rejected";
                emailTest.Message = "Claim Number: " + claimsprocess.ClaimNumber + " has been rejected. \n Your Claim has been rejected, by the Claims Manager. \n We regret to inform you that your claim has been Rejected by the claims manager.\n Assuring the best of services always. \n \nRegards, \nTeam MICA";
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

            foreach (var item in claimsDTO.Alldoc)
            {
                TblClaimdoc Claimdoc = new TblClaimdoc();

                Claimdoc.DmsdocId = item.DocumentID;
                Claimdoc.DocumentName = item.FileName;
                Claimdoc.DocumentType = item.DocumentType;
                Claimdoc.ClaimId = claimsDTO.ClaimId;
                _context.TblClaimdoc.Add(Claimdoc);
                _context.SaveChanges();

            }

            //adding new record to tblhistory on updating claimstatus of existing claim from tblclaims
            claimsHistory.ClaimId = ClaimApproval.ClaimId;
            //claimsHistory.ClaimStatusId = claimsDTO.ClaimStatusId;
            claimsHistory.ClaimStatusId = oldstatusId;
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

            var amount = (decimal)claimsprocess.ApprovedClaimAmount;

            var _claimprocess = _mapper.Map<ClaimProcessDTO>(claimsprocess);

            //Balance Sum Insured
            if (claimsprocess.ClaimStatusId == 38)
            {
                var balanceSumInsured = await _integrationService.UpdatePolicyBalanceSumInsuredAsync(claimsprocess.PolicyNo, amount, apiContext);
            }

            //Accouting Transaction 
            var account = AccountMapApproval(apiContext, claimsDTO);
            return _claimprocess;

        }

        public async Task<ClaimDocUpload> UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //var claimdetails = _context.TblClaimdoc.SingleOrDefault(x => x.ClaimId == ClaimId);

            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
            var claimdata = _context.TblClaimdoc.Select(a => a.ClaimId == claimdoc.ClaimId);
            TblClaimdoc claimdocDTO = new TblClaimdoc();
            if (claimdata == null)
            {
                claimdocDTO.Document = claimdoc.Document;
                claimdocDTO.DocumentName = claimdoc.DocumentName;
                claimdocDTO.ClaimId = claimdoc.ClaimId;
                claimdocDTO.CreatedDate = claimdoc.CreatedDate;
                claimdocDTO.CreatedBy = apiContext.UserId;
                claimdocDTO.DmsdocId = claimdoc.DmsdocId;
                var _claimDoc = _mapper.Map<TblClaimdoc>(claimdocDTO);
                _context.TblClaimdoc.Add(_claimDoc);
            }
            else
            {
                claimdocDTO.Document = claimdoc.Document;
                claimdocDTO.DocumentName = claimdoc.DocumentName;
                claimdocDTO.ClaimId = claimdoc.ClaimId;
                claimdocDTO.ModifiedBy = apiContext.UserId;
                claimdocDTO.ModifiedDate = DateTimeNow;
                //claimdetails.ProfileImage = fileBytes;
                claimdocDTO.DmsdocId = claimdoc.DmsdocId;
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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var data = _context.TblClaimdoc.FirstOrDefault(x => x.ClaimId == ClaimId);
            ClaimdocDTO user = new ClaimdocDTO();
            // //  user.UserId = "9d99d324-3f83-4429-b531-571ce10cd20c";

            //ClaimdocDTO claimdoc= _mapper.Map<ClaimdocDTO>(user);
            //// var claimdoc = _context.TblClaimdoc.SingleOrDefault(x => x.ClaimId == ClaimId);

            byte[] imagebytes = new byte[data.Document.Length];



            imagebytes = data.Document;

            return imagebytes;
        }

        public async Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest cDTO, ApiContext apiContext)
        {
            try
            {
                _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, cDTO.EvtId.ToString(), _configuration));

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
                    List<Models.BillingEventDataDTO> BillingResult = new List<Models.BillingEventDataDTO>();
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

        public async Task<IEnumerable<Models.BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest cDTO, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, cDTO.EvtId.ToString(), _configuration));

            List<Models.BillingEventDataDTO> Claimlist = new List<Models.BillingEventDataDTO>();
            Models.BillingEventDataDTO ClaimEvent = new Models.BillingEventDataDTO();

            if (cDTO.FromDate != null && cDTO.ToDate != null)
            {
                ClaimEvent.Count = _context.TblClaims.Where(ac => ac.OrganizationId == cDTO.CustomerId && ac.CreatedDate.Value.Date >= cDTO.FromDate.Date && ac.CreatedDate.Value.Date <= cDTO.ToDate.Date).Count();
                Claimlist.Add(ClaimEvent);
            }
            return Claimlist;
        }

        public async Task<List<object>> ClaimDetailsAsync(decimal ClaimId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            _CNContext = (MICACNContext)(await DbManager.GetNewContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var DATA = _context.TblClaims.SingleOrDefault(x => x.ClaimId == ClaimId);
            List<object> FullfinalData = new List<object>();
            try
            {
                var bank = _context.TblBankAccounts.FirstOrDefault(x => x.ClaimId == ClaimId);

                var insurable = _context.TblClaimInsurable.Where(x => x.ClaimId == ClaimId).ToList();

                var tblClaim = _context.TblClaims.Where(item => item.ClaimId == ClaimId)
                      .Include(add => add.TblClaimInsurable).FirstOrDefault();
                var _claimInsurableDTOs = _mapper.Map<IEnumerable<ClaimInsurableDTO>>(tblClaim.TblClaimInsurable);

                var doc = _context.TblClaimdoc.Where(x => x.ClaimId == ClaimId);
                var status = (from a in _context.TblClaims.Where(x => x.ClaimId == ClaimId)
                              join c in _context.TblmasCmcommonTypes on a.ClaimStatusId equals c.CommonTypeId
                              select c).FirstOrDefault();

                var acctype = (from a in _context.TblBankAccounts.Where(x => x.ClaimId == ClaimId)
                               join b in _context.TblmasCmcommonTypes on a.AccountType equals b.CommonTypeId
                               select b).FirstOrDefault();



                Dictionary<object, object> finaldata = new Dictionary<object, object>();

                List<object> finalData = new List<object>();



                finaldata.Add("Loss Date", DATA.LossDateTime);
                finaldata.Add("Location Of Event", DATA.LocationOfEvent);
                finaldata.Add("Loss Description", DATA.LossOfDescription);
                finaldata.Add("Total Claim Amount", DATA.ClaimAmount);
                //finaldata.Add("Account Holder Name", bank.AccountHolderName);
                //finaldata.Add("Account Number", bank.AccountNumber);
                //finaldata.Add("Account Type", acctype.Value);
                //finaldata.Add("Bank Name", bank.BankName);
                //finaldata.Add("IFSC Code", bank.Ifsccode);
                //finaldata.Add("Bank Address", bank.BankBranchAddress);


                if (!string.IsNullOrEmpty(DATA.ClaimFields))
                {
                    var json = JsonConvert.DeserializeObject<dynamic>(DATA.ClaimFields);

                    var state = json["Vehicle Location State"];

                    var stateid = (int)state.Value;

                    var statevalue = _CNContext.TblMasState.SingleOrDefault(x => x.StateId == stateid).StateName;

                    finaldata.Add("Vehicle Location", json["Vehicle Location"]);
                    finaldata.Add("Vehicle Location State", statevalue);
                    finaldata.Add("Driver Name", json["Driver Name"]);
                    finaldata.Add("Self-Survey Required", json["Self-Survey Required"]);
                }


                foreach (var item in finaldata)
                {
                    List<object> data = new List<object>();

                    data.Add(item.Key);
                    data.Add(item.Value);

                    finalData.Add(data);

                }

                var insurabledata = _claimInsurableDTOs.ToList();

                for (int i = 0; i < insurabledata.Count(); i++)
                {
                    List<Dictionary<string, string>> dict1 = new List<Dictionary<string, string>>();
                    if (!string.IsNullOrEmpty(insurabledata[i].CoverValue))
                    {
                        var T = JsonConvert.DeserializeObject<dynamic>(insurabledata[i].CoverValue);
                        var m = JsonConvert.SerializeObject(T);

                        var json = JsonConvert.SerializeObject(insurabledata[i].CoverValue);
                        var dictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(m);


                        foreach (KeyValuePair<string, string> each in dictionary)
                        {
                            var dict = new Dictionary<string, string>();
                            dict.Add("Header", each.Key);
                            dict.Add("Details", each.Value);
                            dict1.Add(dict);

                        }

                        insurabledata[i].coverDynamic = dict1;
                    }
                    else
                    {
                        insurabledata[i].coverDynamic = dict1;
                    }

                }

                //insurableResponse.policyInsurableDetails.AddRange(data);


                FullfinalData.Add(finalData);
                FullfinalData.Add(insurabledata.ToList());
                //return FullfinalData;
            }
            catch (Exception ex)
            {

            }
            return FullfinalData;

        }

        public async Task<List<object>> PaymentDetailsAsync(decimal ClaimId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            _CNContext = (MICACNContext)(await DbManager.GetNewContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var DATA = _context.TblClaims.SingleOrDefault(x => x.ClaimId == ClaimId);

            // var bank = _context.TblBankAccounts.SingleOrDefault(x => x.ClaimId == ClaimId);

            var insurable = _context.TblClaimInsurable.Where(x => x.ClaimId == ClaimId).ToList();

            var tblClaim = _context.TblClaims.Where(item => item.ClaimId == ClaimId)
                      .Include(add => add.TblClaimInsurable).FirstOrDefault();
            var _claimInsurableDTOs = _mapper.Map<IEnumerable<ClaimInsurableDTO>>(tblClaim.TblClaimInsurable);

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
            finaldata.Add("Total Claim Amount", DATA.ClaimAmount);
            finaldata.Add("Total Approved Amount", DATA.ApprovedClaimAmount);
            //finaldata.Add("Account Holder Name", bank.AccountHolderName);
            //finaldata.Add("Account Number", bank.AccountNumber);
            //finaldata.Add("Bank Name", bank.BankName);
            //finaldata.Add("Bank IFSC", bank.Ifsccode);

            //finaldata.Add("Bank Branch Address", bank.BankBranchAddress);

            finaldata.Add("Claim Status", status.Value);
            finaldata.Add("Claim Manager Remarks", DATA.ClaimManagerRemarks);

            if (!string.IsNullOrEmpty(DATA.ClaimFields))
            {
                var json = JsonConvert.DeserializeObject<dynamic>(DATA.ClaimFields);

                var state = json["Vehicle Location State"];

                var stateid = (int)state.Value;

                var statevalue = _CNContext.TblMasState.SingleOrDefault(x => x.StateId == stateid).StateName;

                finaldata.Add("Vehicle Location", json["Vehicle Location"]);
                finaldata.Add("Vehicle Location State", statevalue);
                finaldata.Add("Driver Name", json["Driver Name"]);
                finaldata.Add("Self-Survey Required", json["Self-Survey Required"]);
            }


            foreach (var item in finaldata)
            {
                List<object> data = new List<object>();

                data.Add(item.Key);
                data.Add(item.Value);

                finalData.Add(data);

            }

            var insurabledata = _claimInsurableDTOs.ToList();

            for (int i = 0; i < insurabledata.Count(); i++)
            {
                List<Dictionary<string, string>> dict1 = new List<Dictionary<string, string>>();
                if (!string.IsNullOrEmpty(insurabledata[i].CoverValue))
                {
                    var T = JsonConvert.DeserializeObject<dynamic>(insurabledata[i].CoverValue);
                    var m = JsonConvert.SerializeObject(T);

                    var json = JsonConvert.SerializeObject(insurabledata[i].CoverValue);
                    var dictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(m);


                    foreach (KeyValuePair<string, string> each in dictionary)
                    {
                        var dict = new Dictionary<string, string>();
                        dict.Add("Header", each.Key);
                        dict.Add("Details", each.Value);
                        dict1.Add(dict);

                    }

                    insurabledata[i].coverDynamic = dict1;
                }
                else
                {
                    insurabledata[i].coverDynamic = dict1;
                }

            }

            FullfinalData.Add(finalData);
            FullfinalData.Add(insurabledata.ToList());

            return FullfinalData;

        }



        public async Task<List<object>> ClaimStatusAsync(decimal ClaimId, decimal statusId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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

        public async Task<ClaimSearchResponseDTO> SearchClaim(SearchClaimDTO searchclaim, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var _claims = _context.TblClaims.OrderByDescending(p => p.CreatedDate).Select(x => x);
            var _policydata = await _integrationService.GetPolicyByNumber(searchclaim.PolicyNo, apiContext);

            if (apiContext.PartnerId > 0 && apiContext.OrgId > 0)
            {
                _claims = _claims.Where(pr => pr.PartnerId == apiContext.PartnerId && pr.OrganizationId == apiContext.OrgId);
            }
            else if (apiContext.OrgId > 0)
            {
                _claims = _claims.Where(pr => pr.OrganizationId == apiContext.OrgId);
            }

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

            if (!string.IsNullOrEmpty(searchclaim.PolicyNo))
            {
                _claims = _claims.Where(x => x.PolicyNo == _policydata.PolicyNo);
            }

            if (!string.IsNullOrEmpty(searchclaim.InsuredReference))
            {
                var policyIdDetails = policyDetails.Select(p => p.PolicyNo);
                _claims = _claims.Where(x => policyIdDetails.Contains(x.PolicyNo));
            }

            if (!string.IsNullOrEmpty(searchclaim.InsuredMobileNo))
            {
                var policyIdDetails = policyDetails.Select(p => p.PolicyNo);
                _claims = _claims.Where(x => policyIdDetails.Contains(x.PolicyNo));

            }

            if (!string.IsNullOrEmpty(searchclaim.InsuredEmail))
            {
                var policyIdDetails = policyDetails.Select(p => p.PolicyNo);
                _claims = _claims.Where(x => policyIdDetails.Contains(x.PolicyNo));
            }

            if (searchclaim.EventDate != null)
            {
                var policyIdDetails = policyDetails.Select(p => p.PolicyNo);
                _claims = _claims.Where(x => policyIdDetails.Contains(x.PolicyNo));
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

            var _ClaimSearchData = _mapper.Map<List<SearchDTO>>(_claims);

            List<SearchDTO> claimlist = new List<SearchDTO>();
            foreach (var item in _ClaimSearchData)
            {
                try
                {
                    var pk = policyDetails.Where(s => s.PolicyNo == item.PolicyNo).ToList();
                    var data = (from a in _context.TblClaims.Where(x => x.ClaimId == item.ClaimId)
                                join c in _context.TblmasCmcommonTypes on a.ClaimStatusId equals c.CommonTypeId
                                select c).FirstOrDefault();

                    var insurabledata = _context.TblClaimInsurable.FirstOrDefault(x => x.ClaimId == item.ClaimId);

                    var covervalue = JsonConvert.DeserializeObject<dynamic>(insurabledata.CoverValue);

                    item.ClaimStatus = data.Value;
                    item.PolicyNo = pk[0].PolicyNo;
                    item.InsuredReference = pk[0].CustomerId;
                    item.InsuredName = pk[0].CoverNoteNo;
                    // item.CoverEvent = pk[0].CoverEvent;
                    item.CoverValue = covervalue;
                    item.TypeOfLoss = insurabledata.TypeOfLoss;
                    item.EventDate = pk[0].CreatedDate;
                    item.InsuredEmail = pk[0].Email;
                    item.InsuredMobileNo = pk[0].MobileNumber;
                    item.ProductIdPk = pk[0].ProductIdPk;



                }
                catch (Exception ex)
                {

                }
            }

            var _claimsearchDTOs = new ClaimSearchResponseDTO();
            if (_ClaimSearchData.Count > 0)
            {
                _claimsearchDTOs.ClaimSearch.AddRange(_ClaimSearchData);
                _claimsearchDTOs.Status = BusinessStatus.Ok;
            }
            else
            {
                _claimsearchDTOs.Status = BusinessStatus.Error;
                _claimsearchDTOs.ResponseMessage = "No record found";
            }
            return _claimsearchDTOs;


        }

        public async Task<IEnumerable<SearchDTO>> SearchClaimByUserid(SearchClaimDTO searchclaim, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var _claims = (from a in _context.TblClaims.OrderByDescending(p => p.CreatedDate)
                           join b in _context.TblClaimAllocationDetails on a.ClaimId equals b.ClaimId
                           where b.EmailId == apiContext.Email
                           select a);

            //var _claims = _context.TblClaims.OrderByDescending(p => p.CreatedDate).Select(x => x);
            //var alloc = _context.TblClaimAllocationDetails.Select(a => a);

            var _policydata = await _integrationService.GetPolicyByNumber(searchclaim.PolicyNo, apiContext);

            if (apiContext.PartnerId > 0 && apiContext.OrgId > 0)
            {
                _claims = _claims.Where(pr => pr.PartnerId == apiContext.PartnerId && pr.OrganizationId == apiContext.OrgId);
            }
            else if (apiContext.OrgId > 0)
            {
                _claims = _claims.Where(pr => pr.OrganizationId == apiContext.OrgId);
            }

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
            if (searchclaim.ClaimStatusId > 0)
            {
                _claims = _claims.Where(p => p.ClaimStatusId == searchclaim.ClaimStatusId);
            }

            if (searchclaim.ClaimStatusId == 0)
            {
                int[] lstOthers = { 34, 35, 36, 37 };
                _claims = _claims.Where(p => lstOthers.Contains(p.ClaimStatusId));
            }

            var _ClaimSearchData = _mapper.Map<List<SearchDTO>>(_claims);

            List<SearchDTO> claimlist = new List<SearchDTO>();
            foreach (var item in _ClaimSearchData)
            {
                try
                {
                    var pk = policyDetails.Where(s => s.PolicyNo == item.PolicyNo).ToList();
                    var data = (from a in _context.TblClaims.Where(x => x.ClaimId == item.ClaimId)
                                join c in _context.TblmasCmcommonTypes on a.ClaimStatusId equals c.CommonTypeId
                                select c).FirstOrDefault();

                    var data1 = _context.TblClaimInsurable.SingleOrDefault(x => x.ClaimId == item.ClaimId);

                    item.ClaimStatus = data.Value;
                    item.PolicyNo = pk[0].PolicyNo;
                    item.InsuredReference = pk[0].CustomerId;
                    item.InsuredName = pk[0].CoverNoteNo;
                    // item.CoverEvent = pk[0].CoverEvent;
                    item.TypeOfLoss = data1.TypeOfLoss;
                    item.EventDate = pk[0].CreatedDate;
                    item.InsuredEmail = pk[0].Email;
                    item.InsuredMobileNo = pk[0].MobileNumber;

                }
                catch (Exception ex)
                {

                }
            }

            return _ClaimSearchData;
        }

        public async Task<ClaimsDTO> ModifyActive(ClaimsActive claims, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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
                var statusId = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.CommonTypeId == item.ClaimStatusId);
                claimResponseDTO.ClaimprevStatus = statusId.Value;
                claimResponseDTO.AccountHolderName = _context.TblBankAccounts.FirstOrDefault(x => x.ClaimId == item.ClaimId).AccountHolderName;

                ListReport.Add(claimResponseDTO);
            }
            foreach (var item in _historydata)
            {
                var statusId = _context.TblmasCmcommonTypes.SingleOrDefault(x => x.CommonTypeId == item.ClaimStatusId);
                //claimResponseDTO.ClaimId = itemh.ClaimId;
                //claimResponseDTO.ClaimcurrStatus = statusId.Value;
                claimResponseDTO = new ClaimResponseDTO();
                claimResponseDTO.ClaimId = item.ClaimId;
                claimResponseDTO.ClaimNumber = item.ClaimNumber;
                claimResponseDTO.lossDateTime = item.LossDateTime;
                claimResponseDTO.CreatedDate = item.CreatedDate;
                claimResponseDTO.PolicyNo = item.PolicyNo;
                var statusid = _context.TblClaims.SingleOrDefault(x => x.ClaimId == item.ClaimId).ClaimStatusId;
                claimResponseDTO.ClaimcurrStatus = claimStaus.FirstOrDefault(x => x.CommonTypeId == statusid).Value;
                claimResponseDTO.ClaimprevStatus = statusId.Value;
                //claimStaus.FirstOrDefault(x => x.CommonTypeId == item.ClaimStatusId).Value;
                claimResponseDTO.AccountHolderName = _context.TblBankAccounts.FirstOrDefault(x => x.ClaimId == item.ClaimId).AccountHolderName;
                ListReport.Add(claimResponseDTO);
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
        public async Task<IEnumerable<ClaimdocDTO>> DocumentView(decimal ClaimId, bool isDoc, bool isPolicy, ApiContext apiContext)

        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            List<ClaimdocDTO> claimdocs = new List<ClaimdocDTO>();
            var tblClaimDoc = _context.TblClaimdoc.Where(s => s.ClaimId == ClaimId).ToList();
            if (tblClaimDoc != null)
            {
                if (isPolicy)
                {
                    var tblClaim = _context.TblClaims.FirstOrDefault(s => s.ClaimId == ClaimId);
                    var polDocs = await _integrationService.GetPolicyDocuments(tblClaim.PolicyNo, apiContext);
                    claimdocs.AddRange(polDocs);
                }
                var claimDocDTO = _mapper.Map<List<ClaimdocDTO>>(tblClaimDoc);
                if (!isDoc)
                {
                    foreach (var item in claimDocDTO)
                    {
                        item.Document = null;
                    }
                }
                claimdocs.AddRange(claimDocDTO);
            }
            return claimdocs;
        }

        public async Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            //int result = GetActiveResult();
            //if (result == 1)
            //{
            var files = httpRequest.Form.Files;
            //var docId = GetActiveResult(file.Name); HttpRequest
            DataTable dt = new DataTable();
            decimal bankDocId = 0;
            foreach (var file in files)
            {
                var filename = file.Name;
                var tblbankdoc = await GetDocumentId(file.Name, apiContext);
                bankDocId = tblbankdoc.BankDocId;

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
                                        if (worksheet.Cells[row, 15].Value.ToString().Contains("/"))
                                        {
                                            dr["PaymentDate"] = worksheet.Cells[row, 15].Value.ToString();
                                        }
                                        else
                                        {
                                            long dateNum = long.Parse(worksheet.Cells[row, 15].Value.ToString());
                                            DateTime result = DateTime.FromOADate(dateNum);
                                            var CultInfo = CultureInfo.CreateSpecificCulture("en-US");
                                            var st = result.ToString("dd/MM/yyyy", CultInfo);
                                            dr["PaymentDate"] = st;
                                        }

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
                        return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please check the values and re-enter" };
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
                    object claimData = await TransactionData(bankDocId, apiContext);
                    var account = AccountMapPayment(apiContext, claimData);
                }
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please check the values and re-enter" };
                //return DemoResponse<List<BankFileDTO>>.GetResult(-1, error);
            }
            return new DocumentResponse { Status = BusinessStatus.Ok, ResponseMessage = $"Document uploaded successfully!" };
            //return DemoResponse<List<BankFileDTO>>.GetResult(0, "OK", list);
            //}
            //return DemoResponse<List<BankFileDTO>>.GetResult(2, "Data still processing");
        }

        private async Task<Object> TransactionData(decimal docId, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var data = _context.TblBankFile.Where(a => a.PaymentStatus == "Settled" && a.BankDocId == docId).ToList();
            AccountCheckDTO objCheck = new AccountCheckDTO();
            var resultdata = _mapper.Map<List<AccountDTO>>(data);
            foreach (var item in resultdata)
            {
                objCheck.PolicyNo = item.PolicyNo;
                objCheck.ClaimNo = item.ClaimNo;
                objCheck.ClaimStatus = item.ClaimStatus;
                objCheck.InsuredName = item.InsuredName;
                objCheck.InsuredRefNo = item.InsuredRefNo;
                objCheck.Amount = item.Amount;
                objCheck.Utrno = item.Utrno;
                objCheck.PaymentStatus = item.PaymentStatus;
                objCheck.PaymentDate = item.PaymentDate;
            }
            return objCheck;
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
        public async Task<decimal> GetBalanceSumInsured(string policyNo, ApiContext apiContext)
        {

            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // var policyDetails = await _integrationService.GetPolicyByNumber(policyNo, apiContext);

            var TotalAmount = _context.TblClaims.Where(s => s.PolicyNo == policyNo && s.ClaimStatusId == 22).Sum(p => p.ApprovedClaimAmount);
            var amount = (decimal)TotalAmount;
            var PolicySumInsured = await _integrationService.UpdatePolicySumInsuredAsync(policyNo, amount, apiContext);

            return PolicySumInsured;
        }

        public async Task<ClaimCounts> GetClaimCount(ApiContext apiContext)
        {

            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var _claims = (from a in _context.TblClaims.OrderByDescending(p => p.CreatedDate)
                           join b in _context.TblClaimAllocationDetails on a.ClaimId equals b.ClaimId
                           where b.EmailId == apiContext.Email
                           select a);

            if (apiContext.PartnerId > 0 && apiContext.OrgId > 0)
            {
                _claims = _claims.Where(pr => pr.PartnerId == apiContext.PartnerId && pr.OrganizationId == apiContext.OrgId);
            }
            else if (apiContext.OrgId > 0)
            {
                _claims = _claims.Where(pr => pr.OrganizationId == apiContext.OrgId);
            }

            var _ClaimSearchData = _mapper.Map<List<SearchDTO>>(_claims);

            ClaimCounts counts = new ClaimCounts();

            counts.Intimated = _ClaimSearchData.Where(g => g.ClaimStatusId == 33).Count();
            counts.Approved = _ClaimSearchData.Where(g => g.ClaimStatusId == 9).Count();
            counts.Document = _ClaimSearchData.Where(g => g.ClaimStatusId == 17).Count();
            counts.Rejected = _ClaimSearchData.Where(g => g.ClaimStatusId == 34).Count();
            counts.Rejected = counts.Rejected + _ClaimSearchData.Where(g => g.ClaimStatusId == 35).Count();
            counts.Rejected = counts.Rejected + _ClaimSearchData.Where(g => g.ClaimStatusId == 36).Count();
            counts.Rejected = counts.Rejected + _ClaimSearchData.Where(g => g.ClaimStatusId == 37).Count();
            counts.Setteled = _ClaimSearchData.Where(g => g.ClaimStatusId == 38).Count();

            return counts;
        }

        // Get State Master from Common Masters
        public async Task<IEnumerable<commonddDTO>> GetMasterForVehicleLocation(string lMasterlist, ApiContext apiContext)
        {
            _CNContext = (MICACNContext)(await DbManager.GetNewContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<commonddDTO> ddDTOs;
            ddDTOs = _CNContext.TblMasState
             .Select(s => new commonddDTO
             {
                 mID = s.StateId,
                 mValue = s.StateName,
                 mType = lMasterlist,
             });
            return ddDTOs;
        }

        public async Task<BankAccountsDTO> SearchClaimBankDetails(int claimid, ApiContext apiContext)
        {
            _context = (MICACMContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var data = _context.TblBankAccounts.FirstOrDefault(x => x.ClaimId == claimid);

            var response = _mapper.Map<BankAccountsDTO>(data);
            return response;
        }
    }
}