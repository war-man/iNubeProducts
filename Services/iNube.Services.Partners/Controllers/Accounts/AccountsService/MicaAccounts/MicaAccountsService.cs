using AutoMapper;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.UserManagement.Helpers;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Accounts.AccountsService
{

    public class MicaAccountsService : IAccountsProductService
    {
        private MICAPRContext _context;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private readonly IEmailService _emailService;
        public MicaAccountsService(MICAPRContext context, IMapper mapper, IIntegrationService integrationService, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _emailService = emailService;
        }
        public async Task<CDAccountResponse> CreateCdAccountAsync(CdAccountsDTO cdAccountsDTO, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var Errors = new List<ErrorInfo>();
            //Check for product assign 
            var cdAccountNumber = GetAccountNumber(cdAccountsDTO.ProductId, cdAccountsDTO.PartnerId);
            var cdaccount = _context.TblCdaccounts.FirstOrDefault(p => p.AccountNo == cdAccountNumber);
            if (cdaccount != null)
            {
                //For Translation
                List<string> lstErrParameters = new List<string>();
                lstErrParameters.Add(cdAccountNumber);
                Errors.Add(new ErrorInfo { ErrorCode = "CdAccount", ErrorMessage = $"CD Account {cdAccountNumber} already exist" });
                return new CDAccountResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"", Errors = Errors , MessageKey = "AccountExists", MessageValue = lstErrParameters };
            }
            var productAssign = _context.TblPolicyAgreement.FirstOrDefault(p => p.PolicyNo == cdAccountNumber);
            if (productAssign != null && cdaccount==null)
            {
                cdAccountsDTO.OrganizationId = apiContext.OrgId;
                cdAccountsDTO.AccountNo = cdAccountNumber;
                cdAccountsDTO.InitialAmount = 0;
                cdAccountsDTO.AvailableBalance = 0;
                cdAccountsDTO.LedgerBalance = 0;
                cdAccountsDTO.CreatedBy = apiContext.UserId;
                cdAccountsDTO.CreatedDate = DateTime.Now;
                var account = _mapper.Map<TblCdaccounts>(cdAccountsDTO);
                _context.TblCdaccounts.Add(account);
                _context.SaveChanges();
                cdAccountsDTO.Cdid = account.Cdid;

                //For Translation
                List<string> lstParameters = new List<string>();
                lstParameters.Add(cdAccountNumber);
                lstParameters.Add(cdAccountsDTO.PartnerName);
                lstParameters.Add(cdAccountsDTO.ProductName);
                return new CDAccountResponse { Status = BusinessStatus.Created, ResponseMessage = $"CD Account No {cdAccountNumber} created successfully for Partner {cdAccountsDTO.PartnerName} and Product  {cdAccountsDTO.ProductName}" ,MessageKey="AccountCreated",MessageValue=lstParameters};
            }
            //var Errors = new List<ErrorInfo>();
            //For Translation
            List<string> lstErrorParameters = new List<string>();
            lstErrorParameters.Add(cdAccountNumber);
            Errors.Add(new ErrorInfo { ErrorCode = "CdAccount", ErrorMessage = $"CDAccount {cdAccountNumber} already exist!"});
            return new CDAccountResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"", Errors = Errors ,MessageKey="AccountExists",MessageValue= lstErrorParameters };
        }

        //FOR ACCOUNTING TRANSACTION
        //Fetching Properties
        //Fetching Properties
        private static PropertyInfo[] GetProperties(object obj)
        {
            return obj.GetType().GetProperties();
        }
        public async Task<String> AccountMap(ApiContext apiContext, object cdTransactions)
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
                string createddate = Convert.ToDateTime(dateTime).ToString("yyyy-MM-dd h:mm tt");
                DateTime date = DateTime.ParseExact(createddate, "yyyy-MM-dd h:mm tt", CultureInfo.InvariantCulture);
                //Storing All Transaction Header Value
                foreach (var accountMap in accountMapDetailsList)
                {
                    var accountproperties = GetProperties(cdTransactions);
                    if (accountMap.Object == "CD" && accountMap.Event == "Replenished")
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
                        var accountproperties = GetProperties(cdTransactions);
                        if (accountMapCd.Object == "CD" && accountMapCd.Event == "Replenished")
                        {
                            TransactionDto transactionDto = new TransactionDto();
                            foreach (var actnProp in accountproperties)
                            {
                                var Amount = cdTransactions.GetType().GetProperty("TxnAmount").GetValue(cdTransactions, null);
                                transactionDto.TypeOfTransaction = accountMap.TypeofTransaction;
                                if (accountMap.TypeofTransaction == "Credit")
                                {
                                    if (accountMap.AccountName == "PremiumHoldingAccount" || accountMap.AccountName == "Premium Holding Account")
                                    {
                                        transactionDto.Amount = (decimal)Amount;
                                    }
                                    else
                                    {
                                        transactionDto.Amount = (decimal)Amount;
                                    }
                                }
                                if (accountMap.TypeofTransaction == "Debit")
                                {
                                    if (accountMap.AccountName == "CashDepositAccount" || accountMap.AccountName == "Cash Deposit Account")
                                    {
                                        transactionDto.Amount = (decimal)Amount;
                                    }
                                    else
                                    {
                                        transactionDto.Amount = (decimal)Amount;
                                    }
                                }
                                //transactionDto.Amount = (decimal)Amount;
                                transactionDto.Description = accountMap.Description;
                                transactionDto.IsActive = "Y";
                                if (cdTransactions.GetType().GetProperty("Currency") != null)
                                {
                                    var currency = cdTransactions.GetType().GetProperty("Currency").GetValue(cdTransactions, null);
                                    transactionDto.Currency = currency.ToString();
                                }
                                else
                                {
                                    transactionDto.Currency = "INR";
                                }
                                transactionDto.CreatedDate = accountMap.CreatedDate;
                                transactionDto.RuleName = accountMapCd.RuleName;
                                transactionDto.Object = accountMapCd.Object;
                                transactionDto.Event = accountMapCd.Event;
                                transactionDto.AccountType = accountMap.AccountType;
                                transactionDto.Value = accountMap.Value;
                                transactionDto.AccountCode = accountMap.AccountCode;
                                //Addition of Partner Id and Product Id
                                if (cdTransactions.GetType().GetProperty("PartnerId") != null)
                                {
                                    var partnerId = cdTransactions.GetType().GetProperty("PartnerId").GetValue(cdTransactions, null);
                                    transactionDto.PartnerId = (decimal)partnerId;
                                }
                                else
                                {
                                    transactionDto.PartnerId = apiContext.PartnerId;
                                }
                                
                                if (cdTransactions.GetType().GetProperty("OrgId") != null)
                                {
                                    var partnerId = cdTransactions.GetType().GetProperty("OrgId").GetValue(cdTransactions, null);
                                    transactionDto.OrganizationId = (decimal)partnerId;
                                }
                                else
                                {
                                    transactionDto.OrganizationId = apiContext.OrgId;
                                }
                                if (cdTransactions.GetType().GetProperty("ProductId") != null)
                                {
                                    var productId = cdTransactions.GetType().GetProperty("ProductId").GetValue(cdTransactions, null);
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
                        var accountproperties = GetProperties(cdTransactions);
                        if (accountMapSl.Object == "CD" && accountMapSl.Event == "Replenished")
                        {
                            foreach (var actnProp in accountproperties)
                            {
                                transSubLedger.SubLedgerReferencesId = accountMap.SubLedgerReferencesId;
                                if(accountMap.LedgerObject == "CD")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "PartnerCode")
                                    {
                                        ledgerColName = "PartnerId";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductId";
                                    }
                                    if (ledgerColName == "ReceiptNumber")
                                    {
                                        ledgerColName = "PaymentRefernceId";
                                    }
                                    if (cdTransactions.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = cdTransactions.GetType().GetProperty(ledgerColName).GetValue(cdTransactions, null);
                                        transSubLedger.Value = ledgerColValue.ToString();
                                    }
                                }
                                if (accountMap.LedgerObject == "Policy")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "PartnerCode")
                                    {
                                        ledgerColName = "PartnerId";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductId";
                                    }
                                    
                                    if (cdTransactions.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = cdTransactions.GetType().GetProperty(ledgerColName).GetValue(cdTransactions, null);
                                        transSubLedger.Value = ledgerColValue.ToString();
                                    }
                                }
                                if (accountMap.LedgerObject == "Product")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "PartnerCode")
                                    {
                                        ledgerColName = "PartnerId";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductId";
                                    }
                                    if (cdTransactions.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = cdTransactions.GetType().GetProperty(ledgerColName).GetValue(cdTransactions, null);
                                        transSubLedger.Value = ledgerColValue.ToString();
                                    }
                                }
                                if (accountMap.LedgerObject == "Claim")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "PartnerCode")
                                    {
                                        ledgerColName = "PartnerId";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductId";
                                    }
                                    if (cdTransactions.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = cdTransactions.GetType().GetProperty(ledgerColName).GetValue(cdTransactions, null);
                                        transSubLedger.Value = ledgerColValue.ToString();
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

        //For Reverse Transaction 
        public async Task<String> AccountReverseMap(ApiContext apiContext, object cdTransactions)
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
                string createddate = Convert.ToDateTime(dateTime).ToString("yyyy-MM-dd h:mm tt");
                DateTime date = DateTime.ParseExact(createddate, "yyyy-MM-dd h:mm tt", CultureInfo.InvariantCulture);
                //Storing All Transaction Header Value
                foreach (var accountMap in accountMapDetailsList)
                {
                    var accountproperties = GetProperties(cdTransactions);
                    if (accountMap.Object == "CD" && accountMap.Event == "Replenished")
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
                        var accountproperties = GetProperties(cdTransactions);
                        if (accountMapCd.Object == "CD" && accountMapCd.Event == "Replenished")
                        {
                            TransactionDto transactionDto = new TransactionDto();
                            foreach (var actnProp in accountproperties)
                            {
                                var Amount = cdTransactions.GetType().GetProperty("TxnAmount").GetValue(cdTransactions, null);
                                transactionDto.TypeOfTransaction = accountMap.TypeofTransaction;
                                if (accountMap.TypeofTransaction == "Debit") 
                                {
                                    if (accountMap.AccountName == "PremiumHoldingAccount" || accountMap.AccountName == "Premium Holding Account")
                                    {
                                        transactionDto.Amount = (decimal)Amount;
                                    }
                                    else
                                    {
                                        transactionDto.Amount = (decimal)Amount;
                                    }
                                }
                                if (accountMap.TypeofTransaction == "Credit")
                                {
                                    if (accountMap.AccountName == "CashDepositAccount" || accountMap.AccountName == "Cash Deposit Account")
                                    {
                                        transactionDto.Amount = (decimal)Amount;
                                    }
                                    else
                                    {
                                        transactionDto.Amount = (decimal)Amount;
                                    }
                                }
                                //transactionDto.Amount = (decimal)Amount;
                                transactionDto.Description = accountMap.Description;
                                transactionDto.IsActive = "Y";
                                if (cdTransactions.GetType().GetProperty("Currency") != null)
                                {
                                    var currency = cdTransactions.GetType().GetProperty("Currency").GetValue(cdTransactions, null);
                                    transactionDto.Currency = currency.ToString();
                                }
                                else
                                {
                                    transactionDto.Currency = "INR";
                                }
                                transactionDto.CreatedDate = accountMap.CreatedDate;
                                transactionDto.RuleName = accountMapCd.RuleName;
                                transactionDto.Object = accountMapCd.Object;
                                transactionDto.Event = accountMapCd.Event;
                                transactionDto.AccountType = accountMap.AccountType;
                                transactionDto.Value = accountMap.Value;
                                transactionDto.AccountCode = accountMap.AccountCode;
                                //Addition of Partner Id and Product Id
                                if (cdTransactions.GetType().GetProperty("PartnerId") != null)
                                {
                                    var partnerId = cdTransactions.GetType().GetProperty("PartnerId").GetValue(cdTransactions, null);
                                    transactionDto.PartnerId = (decimal)partnerId;
                                }
                                else
                                {
                                    transactionDto.PartnerId = apiContext.PartnerId;
                                }

                                if (cdTransactions.GetType().GetProperty("OrgId") != null)
                                {
                                    var partnerId = cdTransactions.GetType().GetProperty("OrgId").GetValue(cdTransactions, null);
                                    transactionDto.OrganizationId = (decimal)partnerId;
                                }
                                else
                                {
                                    transactionDto.OrganizationId = apiContext.OrgId;
                                }
                                if (cdTransactions.GetType().GetProperty("ProductId") != null)
                                {
                                    var productId = cdTransactions.GetType().GetProperty("ProductId").GetValue(cdTransactions, null);
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
                        var accountproperties = GetProperties(cdTransactions);
                        if (accountMapSl.Object == "CD" && accountMapSl.Event == "Replenished")
                        {
                            foreach (var actnProp in accountproperties)
                            {
                                transSubLedger.SubLedgerReferencesId = accountMap.SubLedgerReferencesId;
                                if (accountMap.LedgerObject == "CD")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "PartnerCode")
                                    {
                                        ledgerColName = "PartnerId";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductId";
                                    }
                                    if (ledgerColName == "ReceiptNumber")
                                    {
                                        ledgerColName = "PaymentRefernceId";
                                    }
                                    if (cdTransactions.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = cdTransactions.GetType().GetProperty(ledgerColName).GetValue(cdTransactions, null);
                                        transSubLedger.Value = ledgerColValue.ToString();
                                    }
                                }
                                if (accountMap.LedgerObject == "Policy")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "PartnerCode")
                                    {
                                        ledgerColName = "PartnerId";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductId";
                                    }
                                    if (ledgerColName == "ReceiptNumber")
                                    {
                                        ledgerColName = "PaymentRefernceId";
                                    }
                                    if (cdTransactions.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = cdTransactions.GetType().GetProperty(ledgerColName).GetValue(cdTransactions, null);
                                        transSubLedger.Value = ledgerColValue.ToString();
                                    }
                                }
                                if (accountMap.LedgerObject == "Product")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "PartnerCode")
                                    {
                                        ledgerColName = "PartnerId";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductId";
                                    }
                                    if (ledgerColName == "ReceiptNumber")
                                    {
                                        ledgerColName = "PaymentRefernceId";
                                    }
                                    if (cdTransactions.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = cdTransactions.GetType().GetProperty(ledgerColName).GetValue(cdTransactions, null);
                                        transSubLedger.Value = ledgerColValue.ToString();
                                    }
                                }
                                if (accountMap.LedgerObject == "Claim")
                                {
                                    var ledgerColName = accountMap.LedgerColName;
                                    if (ledgerColName == "PartnerCode")
                                    {
                                        ledgerColName = "PartnerId";
                                    }
                                    if (ledgerColName == "ProductCode")
                                    {
                                        ledgerColName = "ProductId";
                                    }
                                    if (ledgerColName == "ReceiptNumber")
                                    {
                                        ledgerColName = "PaymentRefernceId";
                                    }
                                    if (cdTransactions.GetType().GetProperty(ledgerColName) != null)
                                    {
                                        var ledgerColValue = cdTransactions.GetType().GetProperty(ledgerColName).GetValue(cdTransactions, null);
                                        transSubLedger.Value = ledgerColValue.ToString();
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



        public async Task<ReplnishCDResponse> ReplnishCDTransaction(CdTransactionsDTO cdTransactions, ApiContext apiContext)
        {
            //Accounting

            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //First Check for A/C exist 
            if (string.IsNullOrEmpty(cdTransactions.AccountNo))
            {
                cdTransactions.AccountNo = GetAccountNumber(cdTransactions.ProductId, cdTransactions.PartnerId);
            }
            var cdAccount = _context.TblCdaccounts.FirstOrDefault(ac => ac.AccountNo == cdTransactions.AccountNo);
            if (cdAccount != null)
            {
                var PaymentMode = _context.TblmasPrcommonTypes.FirstOrDefault(p => p.CommonTypeId == cdTransactions.PaymentModeId).Value;
                var availableAmount = cdAccount.AvailableBalance != null ? cdAccount.AvailableBalance : 0;
                var ledgerBalance = cdAccount.LedgerBalance != null ? cdAccount.LedgerBalance : 0;
                cdTransactions.CreatedBy = apiContext.UserId;
                cdTransactions.InitialAmount = availableAmount;
                cdTransactions.AvailableAmount = availableAmount + cdTransactions.TxnAmount;
                cdTransactions.LedgerBalance = ledgerBalance;
                // cdTransactions.TransactionDate = Convert.ToDateTime(DateTime.Now.ToString("dd/mm/yyyy"));
                cdTransactions.TransactionDate = DateTime.Now;
               
                cdTransactions.Description = $"CD Replenish- {cdTransactions.TxnAmount}";

                if (cdAccount.InitialAmount == 0)
                {
                    //Initial Setup
                    cdAccount.InitialAmount = cdTransactions.TxnAmount;
                    cdAccount.Remark = "Initial Setup-" + cdAccount.InitialAmount;
                    cdTransactions.Description = "Initial Amount-" + cdAccount.InitialAmount;
                }
                var accountTransaction = _mapper.Map<TblCdtransactions>(cdTransactions);
                accountTransaction.TxnType = "Credit";
                accountTransaction.CreatedDate = DateTime.Now;
                _context.TblCdtransactions.Add(accountTransaction);
                cdAccount.LedgerBalance = ledgerBalance + cdTransactions.TxnAmount;
                cdAccount.AvailableBalance = availableAmount + cdTransactions.TxnAmount;
                if (cdAccount.IsLocked)
                {
                    var lockAmt = (cdAccount.InitialAmount * cdAccount.DropLimit / 100);
                    if (cdAccount.AvailableBalance > lockAmt)
                    {
                        cdAccount.IsLocked = false;
                    }
                }
                _context.SaveChanges();
                cdTransactions.TxnId = accountTransaction.TxnId;
                cdTransactions.PaymentType = PaymentMode;
                cdTransactions.TxnType = accountTransaction.TxnType = "Credit";
                List<CdTransactionsDTO> cdReplnish = new List<CdTransactionsDTO>();
                cdReplnish.Add(cdTransactions);
                
                //ACCOUNTING TRANSACTION CALLING
                var account = AccountMap(apiContext, cdTransactions);

                //For Translation
                List<string> lstParameters = new List<string>();
                lstParameters.Add(cdTransactions.TxnAmount.ToString());

                return new ReplnishCDResponse { Status = BusinessStatus.Created, cdReplnish = cdReplnish, Id = cdTransactions.TxnId.ToString(), ResponseMessage = $"CD Replenishment for {cdTransactions.TxnAmount} is done successfully!",MessageKey="CDReplenish", MessageValue=lstParameters };
            }
            List<string> listParameters = new List<string>();
            listParameters.Add(cdTransactions.AccountNo);
            return new ReplnishCDResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"No records found having account number {cdTransactions.AccountNo} " ,MessageKey="NoRecordsAcc", MessageValue= listParameters };
        }

        public async Task<CdAccountsDTO> GetCDAccountById(decimal Cdid, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var cdAccount = _context.TblCdaccounts.Find(Cdid);
            if (cdAccount != null)
            {
                var accountTransaction = _mapper.Map<CdAccountsDTO>(cdAccount);
                return accountTransaction;
            }
            return null;
        }

        public async Task<CdTransactionsDTO> GetCDTransactionById(decimal Cdid, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var cdAccount = _context.TblCdtransactions.Find(Cdid);
            if (cdAccount != null)
            {
                var accountTransaction = _mapper.Map<CdTransactionsDTO>(cdAccount);
                return accountTransaction;
            }
            return null;
        }

        public async Task<CdTransactionsResponse> ReverseCDTransaction(PolicyBookingTransaction reverseCdAccount, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            //Check for the transaction record
            TblCdtransactions cdTransaction;
            if (reverseCdAccount.PaymentId > 0)
            {
                cdTransaction = _context.TblCdtransactions.FirstOrDefault(t => t.PaymentId == reverseCdAccount.PaymentId);
            }
            else if (reverseCdAccount.TxnId > 0)
            {
                cdTransaction = _context.TblCdtransactions.Find(reverseCdAccount.TxnId);
            }
            else
            {
                cdTransaction = _context.TblCdtransactions.FirstOrDefault(t => t.Description.Contains(reverseCdAccount.PolicyNo));
            }
            if (cdTransaction != null)
            {
                var amount = cdTransaction.TxnAmount;

                var cdAccount = _context.TblCdaccounts.FirstOrDefault(ac => ac.AccountNo == reverseCdAccount.AccountNo);
                var availableAmount = cdAccount.AvailableBalance != null ? cdAccount.AvailableBalance : 0;
                var ledgerBalance = cdAccount.LedgerBalance != null ? cdAccount.LedgerBalance : 0;

                cdAccount.AvailableBalance = cdAccount.AvailableBalance + cdTransaction.TxnAmount;
                cdAccount.LedgerBalance = cdAccount.LedgerBalance + cdTransaction.TxnAmount;
                // cdTransaction.TxnAmount = 0;
                //ToDo did we need to maintain any status here for transaction
                var reverseTransactions = new TblCdtransactions();
                reverseTransactions.AccountNo = cdAccount.AccountNo;
                reverseTransactions.CreatedBy = apiContext.UserId;
                reverseTransactions.CreatedDate = DateTime.Now;
                reverseTransactions.ModifiedDate = DateTime.Now;
                reverseTransactions.ModifiedBy = apiContext.UserId;
                reverseTransactions.TxnAmount = (decimal)amount;
                reverseTransactions.InitialAmount = availableAmount;
                reverseTransactions.AvailableAmount = availableAmount + amount;
                reverseTransactions.LedgerBalance = ledgerBalance + amount;
                reverseTransactions.TransactionDate = DateTime.Now;
                // reverseTransactions.TransactionDate = Convert.ToDateTime(DateTime.Now.ToString("dd/mm/yyyy"));
                reverseTransactions.TxnType = "Credit";
                // reverseTransactions.CreditAccountNo = cdTransaction.TxnId;
                if (string.IsNullOrEmpty(reverseTransactions.Description))
                {
                    reverseTransactions.Description = $"Payment Reverse- {reverseTransactions.TxnAmount} for TxnId- {cdTransaction.TxnId}";
                }
                _context.TblCdtransactions.Add(reverseTransactions);
                _context.SaveChanges();
                var accountTransaction = _mapper.Map<CdTransactionsDTO>(reverseTransactions);
                //ACCOUNTING TRANSACTION CALLING
                var account = AccountReverseMap(apiContext, reverseCdAccount);
                return new CdTransactionsResponse { Status = BusinessStatus.Created, cdTransactions = accountTransaction, Id = accountTransaction.TxnId.ToString(), ResponseMessage = $"CD Reverse- {reverseTransactions.TxnAmount} done successfully!!" };
            }
            return new CdTransactionsResponse { Status = BusinessStatus.NotFound, ResponseMessage = $" No records found having account number {reverseCdAccount.AccountNo} " };
        }
        public async Task<CdTransactionsResponse> GenerateCDTransaction(PolicyBookingTransaction policyBooking, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            //Check for the transaction record
            if (string.IsNullOrEmpty(policyBooking.AccountNo))
            {
                policyBooking.AccountNo = GetAccountNumber(policyBooking.ProductId, policyBooking.PartnerId);
            }
            var cdAccount = _context.TblCdaccounts.FirstOrDefault(ac => ac.AccountNo == policyBooking.AccountNo);
            if (cdAccount != null)
            {
                if (!cdAccount.IsLocked)
                {
                    var lockAmt = (cdAccount.InitialAmount * cdAccount.DropLimit / 100);

                    if (cdAccount.AvailableBalance < lockAmt)
                    {
                        cdAccount.IsLocked = true;
                    }
                    else if (cdAccount.AvailableBalance < policyBooking.TxnAmount)
                    {
                        return new CdTransactionsResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Account number {policyBooking.AccountNo} has insufficent balance" };
                    }
                    else if (cdAccount.AvailableBalance <= (lockAmt + policyBooking.TxnAmount))
                    {
                        cdAccount.IsLocked = true;
                    }

                }
                else
                {
                    return new CdTransactionsResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = $"Account number {policyBooking.AccountNo} is locked" };
                }
                var cdTransaction = new TblCdtransactions();
                var availableAmount = cdAccount.AvailableBalance != null ? cdAccount.AvailableBalance : 0;
                var ledgerBalance = cdAccount.LedgerBalance != null ? cdAccount.LedgerBalance : 0;
                cdTransaction.AccountNo = cdAccount.AccountNo;
                cdTransaction.AvailableAmount = availableAmount - policyBooking.TxnAmount;

                if (string.IsNullOrEmpty(policyBooking.Description))
                {
                    if (cdAccount.IsLocked)
                    {
                        cdTransaction.Description = $"Account locked for Policy Booking- {policyBooking.PolicyNo}";
                    }
                    else
                    {
                        cdTransaction.Description = $"Policy Booking- {policyBooking.PolicyNo}";
                    }
                }
                else
                {
                    cdTransaction.Description = policyBooking.Description;
                }
                cdTransaction.InitialAmount = availableAmount;
                cdTransaction.LedgerBalance = ledgerBalance;
                // cdTransaction.TransactionDate = Convert.ToDateTime(DateTime.Now.ToString("dd/mm/yyyy"));
                cdTransaction.TransactionDate = DateTime.Now;
                cdTransaction.TxnAmount = policyBooking.TxnAmount;
                cdTransaction.TxnType = "Debit";
                cdTransaction.CreatedBy = apiContext.UserId;
                cdTransaction.CreatedDate = DateTime.Now;
                cdTransaction.ModifiedBy = apiContext.UserId;
                cdTransaction.ModifiedDate = DateTime.Now;
                cdAccount.AvailableBalance = availableAmount - cdTransaction.TxnAmount;
                cdAccount.LedgerBalance = ledgerBalance - cdTransaction.TxnAmount;
                _context.TblCdtransactions.Add(cdTransaction);
                _context.SaveChanges();
                var accountTransaction = _mapper.Map<CdTransactionsDTO>(cdTransaction);
                accountTransaction.AccountNoNavigation = null;
                //AccountTranawsaction
                //var account = AccountMap(apiContext, policyBooking);
                return new CdTransactionsResponse { Status = BusinessStatus.Created, cdTransactions = accountTransaction, Id = accountTransaction.TxnId.ToString(), ResponseMessage = $" Transaction done for account number {accountTransaction.AccountNo} " };
            }
            return new CdTransactionsResponse { Status = BusinessStatus.NotFound, ResponseMessage = $" No records found having account number {policyBooking.AccountNo} " };
        }
        public async Task<CdTransactionsResponse> UpdateCDTransaction(PolicyBookingTransaction policyBooking, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            //Check for the transaction record
            var cdTransaction = _context.TblCdtransactions.FirstOrDefault(t => t.AccountNo == policyBooking.AccountNo);
            if (cdTransaction != null)
            {
                cdTransaction.PaymentId = policyBooking.PaymentId;
                _context.SaveChanges();
                var accountTransaction = _mapper.Map<CdTransactionsDTO>(cdTransaction);
                return new CdTransactionsResponse { Status = BusinessStatus.Updated, cdTransactions = accountTransaction, Id = accountTransaction.TxnId.ToString(), ResponseMessage = $" Transaction updated having account number {accountTransaction.AccountNo} " };
            }
            //AccountTranawsaction
            //var account = AccountMap(apiContext, policyBooking);
            return new CdTransactionsResponse { Status = BusinessStatus.NotFound, ResponseMessage = $" No records found having account number {policyBooking.AccountNo} " };

        }
        public async Task<IEnumerable<CdAccountResponseDTO>> SearchCdAccountAsync(SearchTransactionModel searchCDModel, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var productList = await _integrationService.GetProductMasterAsync(apiContext);
            try
            {
                if (string.IsNullOrEmpty(searchCDModel.AccountNo))
                {
                    searchCDModel.AccountNo = GetAccountNumber(searchCDModel.ProductId, searchCDModel.PartnerId);
                }
                var accountsearch = from cd in _context.TblCdaccounts
                                    join pr in _context.TblPartners on cd.PartnerId equals pr.PartnerId
                                    where cd.PartnerId == searchCDModel.PartnerId && cd.AccountNo == searchCDModel.AccountNo
                                    select new CdAccountResponseDTO
                                    {
                                        PartnerId = cd.PartnerId,
                                        AccountNo = cd.AccountNo,
                                        ProductId = productList.FirstOrDefault(p => p.mID == GetProdcutIdFromAcccountNumber(cd.AccountNo)).mID,
                                        ProductName = productList.FirstOrDefault(p => p.mID == GetProdcutIdFromAcccountNumber(cd.AccountNo)).mValue,
                                        PartnerName = pr.PartnerName,
                                        InitialAmount = cd.InitialAmount,
                                        ThresholdValue = cd.ThresholdValue,
                                        DropLimit = cd.DropLimit,
                                        Cdid = cd.Cdid,
                                        AvailableBalance = cd.AvailableBalance
                                    };
                if (searchCDModel.FromDate != null && searchCDModel.ToDate != null)
                {
                    accountsearch = accountsearch.Where(ac => ac.CreatedDate >= searchCDModel.FromDate && ac.CreatedDate <= searchCDModel.ToDate);
                }
                return accountsearch.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<CdTransactionsResponseDTO>> SearchCdAccountTransactionAsync(SearchTransactionModel searchTransactionModel, ApiContext apiContext)
        {

            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var productList = await _integrationService.GetProductMasterAsync(apiContext);
            if (string.IsNullOrEmpty(searchTransactionModel.AccountNo))
            {
                searchTransactionModel.AccountNo = GetAccountNumber(searchTransactionModel.ProductId, searchTransactionModel.PartnerId);
            }
            var accountsearch = from tr in _context.TblCdtransactions
                                join cd in _context.TblCdaccounts on tr.AccountNo equals cd.AccountNo
                                join pr in _context.TblPartners on cd.PartnerId equals pr.PartnerId
                                // join ms in _context.TblmasPrcommonTypes on tr.PaymentModeId equals ms.CommonTypeId
                                where cd.PartnerId == searchTransactionModel.PartnerId && cd.AccountNo == searchTransactionModel.AccountNo
                                select new CdTransactionsResponseDTO
                                {
                                    PartnerId = cd.PartnerId,
                                    AccountNo = cd.AccountNo,
                                    ProductId = productList.FirstOrDefault(p => p.mID == GetProdcutIdFromAcccountNumber(cd.AccountNo)).mID,
                                    ProductName = productList.FirstOrDefault(p => p.mID == GetProdcutIdFromAcccountNumber(cd.AccountNo)).mValue,
                                    PartnerName = pr.PartnerName,
                                    InitialAmount = tr.InitialAmount,
                                    TxnType = tr.TxnType,
                                    TransactionDate = tr.TransactionDate,
                                    TxnAmount = tr.TxnAmount,
                                    LedgerBalance = tr.LedgerBalance,
                                    Description = tr.Description,
                                    TxnId = tr.TxnId,
                                    AvailableAmount = tr.AvailableAmount
                                };
            if (searchTransactionModel.FromDate != null && searchTransactionModel.ToDate != null)
            {
                var from = searchTransactionModel.FromDate;
                var to = searchTransactionModel.ToDate;
                accountsearch = accountsearch.Where(ac => ac.TransactionDate.Value.Date >= searchTransactionModel.FromDate.Value.Date && ac.TransactionDate.Value.Date <= searchTransactionModel.ToDate.Value.Date);
            }
            return accountsearch.ToList();
        }

        private string GetAccountNumber(decimal ProductId, decimal? PartnerId)
        {
            return string.Concat(ProductId.ToString().PadLeft(5, '0'), "/" + PartnerId.ToString().PadLeft(5, '0'));
        }
        private int GetProdcutIdFromAcccountNumber(string accountNo)
        {
            return Convert.ToInt16(accountNo.Split("/")[0]);
        }

        public async Task<bool> SendEmailAsync(string emailId, string name)
        {
            try
            {
                EmailTest emailTest = new EmailTest();
                emailTest.To = emailId;
                emailTest.Subject = "MICA CD account replenish";
                emailTest.Message = $"Dear {name},\n" + "      " + "\n" + "We are so excited that you are now part of the MICA family! We take great pride in our Partner,\n community and clients.  As your Independent Partner-platform we offer a variety of choices \n and aim to provide exceptional service with every encounter. we offer a choice of multiple insurance \n carriers, coverages, price, and more.. \n You may login to our website using your MICA User ID created under this Partner ID you may\n access our product and service offerings, Insurance carrier information and more." + "\nThanks & Regards:\n" + "      " + "Team MICA";

                await _emailService.SendEmail(emailTest.To, emailTest.Subject, emailTest.Message);
            }
            catch (Exception ex)
            {
                throw;
            }
            return true;
        }

        public async Task<List<object>> GetAccountFilter(int Cdid, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var AccountNo = from A in _context.TblCdaccounts.Where(x => x.Cdid == Cdid)
                            select A.AccountNo;

            List<object> Piechartdata = new List<object>();
            List<object> Header = new List<object>();

            List<object> Available = new List<object>();
            List<object> Utilized = new List<object>();

            Header.Add("Available Balance");
            Header.Add("Utilized Balance");
            Piechartdata.Add(Header);

            foreach (var item in AccountNo)
            {
                IQueryable<TblCdtransactions> cdtbldata;


                if (apiContext.OrgId > 0 && apiContext.PartnerId > 0)
                {
                    cdtbldata = _context.TblCdtransactions.Where(x => x.AccountNo == item);
                }
                else if (apiContext.OrgId > 0)
                {
                    cdtbldata = _context.TblCdtransactions.Where(x => x.AccountNo == item);

                }
                else
                {
                    cdtbldata = _context.TblCdtransactions.Where(x => x.AccountNo == item);
                }


                    //AvailableBalance
                    var credit = cdtbldata.Where(x => x.TxnType == "Credit" && x.AccountNo == item);
                var creditsum = credit.Select(x => x.TxnAmount).Sum();

                //UtilizedBalance
                var debit = cdtbldata.Where(x => x.TxnType == "Debit" && x.AccountNo == item);
                var debitsum = debit.Select(x => x.TxnAmount).Sum();

                //TotalBalance
                var TotalBalance = creditsum + debitsum;

                //AvailableBalance
                var AvailableBalance = creditsum - debitsum;

                var UtilizedCD = debitsum;
                // var AvailableCD = AvailableBalance / TotalBalance;

                Available.Add("Available Balance");
                Available.Add(AvailableBalance);
                Utilized.Add("Utilized Balance");
                Utilized.Add(UtilizedCD);

                Piechartdata.Add(Available);
                Piechartdata.Add(Utilized);
            }
            return Piechartdata;
        }

        public async Task<Dictionary<int, string>> GetProductNameAsync(int partnerid, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //var PartnerData = _context.TblAssignProduct.Where(x => x.PatnerId == partnerid);
            var PartnerData = _context.TblCdaccounts.Where(x => x.PartnerId == partnerid);
            var AccountNo = PartnerData.Select(x => x.AccountNo);

            List<int> Productid = new List<int>();

            foreach (var i in AccountNo)
            {
                string[][] str = new string[1][];
                str[0] = (i.Split("/"));
                int prodid = Int32.Parse(str[0][0].ToString());
                Productid.Add(prodid);
            }

            //var Productid = PartnerData.Select(x => x.ProductId);

            List<string> ProductName = new List<string>();
            Dictionary<int, string> ProductData = new Dictionary<int, string>();

            foreach (var item in Productid)
            {
                int ProductId = Int32.Parse(item.ToString());
                var productDetails = await _integrationService.GetProductNameAsync(ProductId, apiContext);

                ProductName.Add(productDetails.ProductName);
                ProductData.Add(ProductId, productDetails.ProductName);
            }
            return ProductData;
        }



        public async Task<List<ddDTO>> GetCdAccountMasterAsync(bool isProduct, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            if (isProduct)
            {
                return await GetProductName(apiContext);
            }

            if (apiContext.OrgId > 0 && apiContext.PartnerId > 0)
            {
                var tblcddata = _context.TblCdaccounts.Where(X => X.AvailableBalance > 0 && X.PartnerId == apiContext.PartnerId && X.OrganizationId == apiContext.OrgId).OrderByDescending(x => x.AccountNo);

                List<ddDTO> CdAccountno = new List<ddDTO>();
                foreach (var item in tblcddata)
                {
                    int CDid = Int32.Parse(item.Cdid.ToString());

                    ddDTO AccountList = new ddDTO();
                    AccountList.mID = CDid;
                    AccountList.mValue = item.AccountNo;
                    CdAccountno.Add(AccountList);
                }
                return CdAccountno;

            }
            else if (apiContext.OrgId > 0) {

                var tblcddata = _context.TblCdaccounts.Where(X => X.AvailableBalance > 0  && X.OrganizationId == apiContext.OrgId).OrderByDescending(x => x.AccountNo);

                List<ddDTO> CdAccountno = new List<ddDTO>();
                foreach (var item in tblcddata)
                {
                    int CDid = Int32.Parse(item.Cdid.ToString());

                    ddDTO AccountList = new ddDTO();
                    AccountList.mID = CDid;
                    AccountList.mValue = item.AccountNo;
                    CdAccountno.Add(AccountList);
                }
                return CdAccountno;



            }
            else
            {
                var tblcddata = _context.TblCdaccounts.Where(X => X.AvailableBalance > 0).OrderByDescending(x => x.AccountNo);

                List<ddDTO> CdAccountno = new List<ddDTO>();
                foreach (var item in tblcddata)
                {
                    int CDid = Int32.Parse(item.Cdid.ToString());

                    ddDTO AccountList = new ddDTO();
                    AccountList.mID = CDid;
                    AccountList.mValue = item.AccountNo;
                    CdAccountno.Add(AccountList);
                }
                return CdAccountno;


            }


        }

        public async Task<List<ddDTO>> GetProductName(ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            IQueryable<TblCdaccounts> tblcddata;

            if (apiContext.OrgId > 0 && apiContext.PartnerId > 0)
            {
                tblcddata = _context.TblCdaccounts.Where(x=>x.PartnerId == apiContext.PartnerId && x.OrganizationId == x.OrganizationId).OrderByDescending(x => x.AccountNo);
            }
            else if (apiContext.OrgId > 0)
            {
                tblcddata = _context.TblCdaccounts.Where(x=>x.OrganizationId==apiContext.OrgId).OrderByDescending(x => x.AccountNo );
                
            }
            else
            {
                tblcddata = _context.TblCdaccounts.OrderByDescending(x => x.AccountNo);
            }


            var AccountNo = tblcddata.Select(x => x.AccountNo);

            List<int> Productid = new List<int>();
            List<ddDTO> ProductDetails = new List<ddDTO>();
            var productDetails = await _integrationService.GetProductMasterAsync(apiContext);

            foreach (var item in tblcddata)
            {
                // string[][] str = new string[1000][];
                var prodid = Int32.Parse(item.AccountNo.Split("/")[0]);
                //int prodid = Int32.Parse(str[0][0].ToString());
                //Productid.Add(prodid);

                var productName = productDetails.FirstOrDefault(x => x.mID == prodid).mValue;
                ddDTO ProductData = new ddDTO();
                ProductData.mID = (int)item.Cdid;
                ProductData.mValue = productName + " " + item.AccountNo;
                ProductDetails.Add(ProductData);
            }
            return ProductDetails;
        }

        public static List<List<object>> Split(List<object> collection, int size)
        {
            var chunks = new List<List<object>>();
            var chunkCount = collection.Count() / size;

            if (collection.Count % size > 0)
                chunkCount++;

            for (var i = 0; i < chunkCount; i++)
                chunks.Add(collection.Skip(i * size).Take(size).ToList());

            return chunks;
        }


        private async Task<MasterCDDTO> MasterCD(MasterCDDTO masterCDDTO, ApiContext apiContext)
        {
            var cdAccountsDTO = masterCDDTO;

            var cdTransactionDTO = masterCDDTO.CdTransactionsDTO;


            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var Errors = new List<ErrorInfo>();

            //Step-1:Create CD:

            var cdaccount = _context.TblCdaccounts.FirstOrDefault(p => p.AccountNo == cdAccountsDTO.AccountNo);


            if (cdaccount == null)
            {

                TblCdaccounts account = new TblCdaccounts();

                account.AccountNo = cdAccountsDTO.AccountNo;
                account.OrganizationId = apiContext.OrgId;
                account.InitialAmount = 0;
                account.AvailableBalance = 0;
                account.LedgerBalance = 0;
                account.CreatedBy = apiContext.UserId;
                account.CreatedDate = DateTime.Now;
                account.ThresholdValue = 0;
                account.DropLimit = 0;
                account.Remark = "Intial Setup" + account.InitialAmount;
                account.Active = true;

                _context.TblCdaccounts.Add(account);
                _context.SaveChanges();


                /// Step - 2  //CD ReplishMent

                foreach (var item in masterCDDTO.CdTransactionsDTO)
                {
                    if (item.TxnType == "Credit")
                    {

                        CdTransactionsDTO transactionsDTO = new CdTransactionsDTO();

                        transactionsDTO.AccountNo = cdAccountsDTO.AccountNo;
                        transactionsDTO.TxnType = item.TxnType;
                        transactionsDTO.TxnAmount = item.Amount;
                        transactionsDTO.PaymentRefernceId = item.PaymentReferenceNo;
                        transactionsDTO.PaymentModeId = 19;

                        var response = await ReplnishCDTransaction(transactionsDTO, apiContext);
                        
                    }
                    else if(item.TxnType == "Debit")
                    {
                        PolicyBookingTransaction policyBooking = new PolicyBookingTransaction();

                        policyBooking.ProductId = item.ProductId;
                        policyBooking.AccountNo = cdAccountsDTO.AccountNo;
                        policyBooking.PolicyNo = cdAccountsDTO.AccountNo;
                        policyBooking.TxnAmount = item.Amount;
                        policyBooking.PaymentId = Convert.ToDecimal(item.PaymentReferenceNo);

                        var response = await GenerateCDTransaction(policyBooking, apiContext);
                    }

                    
                }
                

            }

            masterCDDTO.Status = BusinessStatus.Created;

            return masterCDDTO;
        }

        public async Task<MasterCDDTO> MasterPolicyCD(MasterCDDTO masterCDDTO,ApiContext apiContext)
        {
            var response = await MasterCD(masterCDDTO,apiContext);

            return response;
        }
                     
    }
}
