using AutoMapper;
using iNube.Services.Accounting.Entities;
using iNube.Services.Accounting.Helpers;
using iNube.Services.Accounting.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService.MicaAccounting
{
    public class MicaAccountConfigService : IAccountingConfigService
    {
        private MICAACContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly Func<string, IAccountingConfigService> _accountsService;

        public MicaAccountConfigService(Func<string, IAccountingConfigService> accountsService, IMapper mapper, MICAACContext context,
            IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
            _accountsService = accountsService;
        }

        public async Task<AccountResponce> CreateAccounts(CoaaccountsDto coaacountsdto, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var dto = _mapper.Map<TblCoaaccounts>(coaacountsdto);
                _context.TblCoaaccounts.Add(dto);
                _context.SaveChanges();
                var acntDTO = _mapper.Map<CoaaccountsDto>(dto);
                return new AccountResponce { Status = BusinessStatus.Created, ResponseMessage = $"Account successfully created! \n Account Name: {acntDTO.AccountName}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }


        //Delete CoaMapping
        public async void DeleteCoaMapping(decimal AccountMappingId, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var delete_caoMap = _context.TblCoaaccountMapping.Find(AccountMappingId);
            if (delete_caoMap != null)
            {
                _context.TblCoaaccountMapping.Remove(delete_caoMap);
                _context.SaveChanges();
            }
        }

        public async Task<CoaMapResponse> CreateCoaMapping(CoaaccountMappingDto coamappingdto, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var dto = _mapper.Map<TblCoaaccountMapping>(coamappingdto);
                _context.TblCoaaccountMapping.Add(dto);
                _context.SaveChanges();
                var caomapDTO = _mapper.Map<CoaaccountMappingDto>(dto);

                //Getting Response Message as Account Name
                var nameDto = _context.TblCoaaccounts.FirstOrDefault(id => id.AccountId == caomapDTO.AccountId);
                var actDto = _mapper.Map<CoaMapMsgDto>(nameDto);

                return new CoaMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"Mapping Succesfully Done for MICA Account Name: {actDto.AccountName} and Account Code: {caomapDTO.MicaAccountCode}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        public async Task<TransactionMapResponse> CreateTransactionMap(TransactionRuleMappingDto transactionmappingdto, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var dto = _mapper.Map<TblTransactionRuleMapping>(transactionmappingdto);
                _context.TblTransactionRuleMapping.Add(dto);
                _context.SaveChanges();
                var transMapDto = _mapper.Map<TransactionRuleMappingDto>(dto);
                return new TransactionMapResponse { Status = BusinessStatus.Created, ResponseMessage = $"Journal Entry Create Succesfully For:{transMapDto.RuleName}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //public TransactionResponse CreateTransaction(TransactionDto transactionDto)
        //{
        //    try
        //    {
        //        var dto = _mapper.Map<TblTransaction>(transactionDto);
        //        _context.TblTransaction.Add(dto);
        //        _context.SaveChanges();
        //        var tranasactionDto = _mapper.Map<TransactionDto>(dto);
        //        return new TransactionResponse { Status = BusinessStatus.Created, ResponseMessage = $"Transaction Succesfully Done for " };
        //    }
        //    catch (Exception ex)
        //    {

        //    }
        //    return null;
        //}

        public async Task<TransactionResponse> CreateTransaction(TransactionHeaderDto transactionDto, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var dto = _mapper.Map<TblTransactionHeader>(transactionDto);
                _context.TblTransactionHeader.Add(dto);
                _context.SaveChanges();
                var tranasactionDto = _mapper.Map<TransactionHeaderDto>(dto);
                return new TransactionResponse { Status = BusinessStatus.Created, ResponseMessage = $"Transaction Succesfully Done for " };
            }
            catch (Exception ex)
            {

            }
            return null;
        }


        public async Task<CoaaccountsDto> GetAccountById(decimal accountId, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tblAccount = _context.TblCoaaccounts.Find(accountId);
            if (tblAccount != null)
            {
                var accountDTO = _mapper.Map<CoaaccountsDto>(tblAccount);
                return accountDTO;
            }
            return null;
        }

        //Get TransactionMapping By ID
        public async Task<CoaaccountMappingDto> GetCOAMappingById(decimal accountMappingId, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tblAccount = _context.TblCoaaccountMapping.Find(accountMappingId);
            if (tblAccount != null)
            {
                var accountDTO = _mapper.Map<CoaaccountMappingDto>(tblAccount);
                return accountDTO;
            }
            return null;
        }

        //Returning Directly Model
        public async Task<IEnumerable<TransactionRuleMappingDto>> GetTransaction(ApiContext apiContext)
        {
             _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tblAccount = _context.TblTransactionRuleMapping.OrderBy(item => item.CreatedDate).Include(add => add.TblTransactionConditions).Include(add => add.TblSubLedgerReferences);
           
            var coaDTO = _mapper.Map<IList<TransactionRuleMappingDto>>(tblAccount);
            foreach(var ac in coaDTO)
            {
                foreach(var acCdn in ac.TransactionConditions)
                {
                    var account = _context.TblCoaaccounts.Where(item => item.AccountCode == acCdn.AccountCode);
                    foreach(var acName in account)
                    {
                        acCdn.AccountName = acName.AccountName;
                    }
                }
            }
            return coaDTO;
        }


        public async Task<IEnumerable<AccountTypeDto>> GetAccountType(ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var account_list = _context.TblAccountType.ToList();
                IEnumerable<AccountTypeDto> accountDTOS;
                accountDTOS = account_list.Select(c => new AccountTypeDto
                {
                    AccountTypeId = c.AccountTypeId,
                    AccountType = c.AccountType,
                    FromRange = c.FromRange,
                    ToRange = c.ToRange,
                });
                return accountDTOS;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        public async Task<IEnumerable<SubLedgerReferencesDto>> GetSubLedgerType(ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var account_list = _context.TblSubLedgerReferences.ToList();
                IEnumerable<SubLedgerReferencesDto> subLedgerDTOS;
                subLedgerDTOS = account_list.Select(c => new SubLedgerReferencesDto
                {
                    LedgerObject = c.LedgerObject,
                    LedgerColName = c.LedgerColName,
                    TransactionRuleMappingId = c.TransactionRuleMappingId,
                    SubLedgerReferencesId = c.SubLedgerReferencesId,
                });
                return subLedgerDTOS;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //public IEnumerable<TransactionRuleMappingDto> GetMappingDetails()
        //{
        //    try
        //    {
        //        var mappingList = _context.TblTransactionRuleMapping.ToList();
        //        IEnumerable<TransactionRuleMappingDto> transmappingdto;
        //        transmappingdto = mappingList.Select(c => new TransactionRuleMappingDto
        //        {
        //            TransactionRuleMappingId = c.TransactionRuleMappingId,
        //            RuleName = c.RuleName,
        //            Object = c.Object,
        //            Event = c.Event,
        //            CreatedDate = c.CreatedDate,
        //            IsActive = c.IsActive,
        //        });
        //        return transmappingdto;
        //    }
        //    catch (Exception ex)
        //    {
        //    }
        //    return null;
        //}

        public async Task<IEnumerable<TransactionRuleMappingConditionsDto>> GetTransactionRuleMappingCondition(ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var transactionConditionList = from tblMappin in _context.TblTransactionRuleMapping
                                           join tblConditions in _context.TblTransactionConditions on tblMappin.TransactionRuleMappingId equals tblConditions.TransactionRuleMappingId
                                           join tblSubLedger in _context.TblSubLedgerReferences on tblMappin.TransactionRuleMappingId equals tblSubLedger.TransactionRuleMappingId
                                           join tblAccount in _context.TblCoaaccounts on tblConditions.AccountCode equals tblAccount.AccountCode

                                           select new TransactionRuleMappingConditionsDto
                                           {
                                               TransactionRuleMappingId = tblMappin.TransactionRuleMappingId,
                                               RuleName = tblMappin.RuleName,
                                               Object = tblMappin.Object,
                                               Event = tblMappin.Event,
                                               TypeofTransaction = tblConditions.TypeofTransaction,
                                               AccountCode = tblConditions.AccountCode,
                                               AccountName = tblAccount.AccountName,
                                               AccountType = tblConditions.AccountType,
                                               Value = tblConditions.Value,
                                               Description = tblConditions.Description,
                                               SubLedgerReference = tblConditions.SubLedgerReference,
                                               CreatedDate = tblConditions.CreatedDate,
                                               IsActive = tblConditions.IsActive,
                                               LedgerObject = tblSubLedger.LedgerObject,
                                               LedgerColName = tblSubLedger.LedgerColName,
                                               TableName = tblSubLedger.TableName,
                                               SubLedgerReferencesId = tblSubLedger.SubLedgerReferencesId

                                           };
            var transactionMapConditionList = _mapper.Map<IEnumerable<TransactionRuleMappingConditionsDto>>(transactionConditionList);
            return transactionMapConditionList;
        }

        public async Task<IEnumerable<TransactionDto>> GetTransactionDetails(ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var transactionList = _context.TblTransaction.ToList();
                IEnumerable<TransactionDto> transaction;
                transaction = transactionList.Select(c => new TransactionDto
                {
                    TransactionId = c.TransactionId,
                    TypeOfTransaction = c.TypeOfTransaction,
                    Amount = c.Amount,
                    Currency = c.Currency,
                    Description = c.Description,
                    CreatedDate = c.CreatedDate,
                    IsActive = c.IsActive,
                    RuleName = c.RuleName,
                    Object = c.Object,
                    Event = c.Event,
                    AccountType = c.AccountType,
                    Value = c.Value,
                    AccountCode = c.AccountCode,
                });
                return transaction;
            }
            catch (Exception ex)
            {
            }
            return null;
        }

        //CoaMapping Details for Export to Excel Part
        public async Task<IEnumerable<CoaAccountMappingDto>> GetCoaMappingDetails(ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var coaMapppingDto = from tblCoaMappping in _context.TblCoaaccountMapping
                                     join tblCoaAccounts in _context.TblCoaaccounts on (decimal)tblCoaMappping.AccountId equals tblCoaAccounts.AccountId
                                     select new CoaAccountMappingDto
                                     {
                                         MicaAccountType = tblCoaMappping.AccountType,
                                         MicaAccountCode = tblCoaAccounts.AccountCode,
                                         MicaAccountName = tblCoaAccounts.AccountName,
                                         CustomerName = tblCoaMappping.Name,
                                         CustomerAcCode = tblCoaMappping.RefAccountCode,
                                         CustomerAcName = tblCoaMappping.CustomerId.ToString(),
                                         CustomerAcDescription = tblCoaMappping.Description
                                     };
                var coaMappingDetails = _mapper.Map<IEnumerable<CoaAccountMappingDto>>(coaMapppingDto);
                return coaMappingDetails;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //Get the Journal Entry Confriguation Grid
        public async Task<IEnumerable<JournalEntryConfriguationDto>> GetJournalEnntryDetails(ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var journalDtos = from tblTransactionRuleCondition in _context.TblTransactionConditions
                                  join tblTransactionRuleMapping in _context.TblTransactionRuleMapping on tblTransactionRuleCondition.TransactionRuleMappingId equals tblTransactionRuleMapping.TransactionRuleMappingId
                                  join tblaccountType in _context.TblAccountType on tblTransactionRuleCondition.AccountType equals tblaccountType.AccountType
                                  select new JournalEntryConfriguationDto
                                  {
                                      TransactionRuleMappingId = tblTransactionRuleMapping.TransactionRuleMappingId,
                                      RuleName = tblTransactionRuleMapping.RuleName,
                                      Object = tblTransactionRuleMapping.Object,
                                      Event = tblTransactionRuleMapping.Event,
                                      TypeofTransaction = tblTransactionRuleCondition.TypeofTransaction,
                                      AccountCode = tblTransactionRuleCondition.AccountCode,
                                      AccountName = tblTransactionRuleCondition.AccountName,
                                      AccountType = tblaccountType.AccountType,
                                      Value = tblTransactionRuleCondition.Value,
                                      Description = tblTransactionRuleCondition.Description,
                                  };
                var journalList = _mapper.Map<IEnumerable<JournalEntryConfriguationDto>>(journalDtos);
                return journalList;
            }
            catch (Exception ex)
            {
            }
            return null;
        }
        // Getting details with AccountName and Id
        public async Task<IEnumerable<AccountDetailsDto>> GetAccountDetails(ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var accountDTOS = from tblaccount in _context.TblCoaaccounts
                                  join tblaccountType in _context.TblAccountType on tblaccount.AccountTypeId equals tblaccountType.AccountTypeId
                                  select new AccountDetailsDto
                                  {
                                      AccountId = tblaccount.AccountId,
                                      AccountTypeId = tblaccount.AccountTypeId,
                                      AccountName = tblaccount.AccountName,
                                      AccountCode = tblaccount.AccountCode,
                                      AccountDesc = tblaccount.AccountDesc,
                                      AccountType = tblaccountType.AccountType,
                                      CreatedDate = tblaccount.CreatedDate,
                                  };
                var accountList = _mapper.Map<IEnumerable<AccountDetailsDto>>(accountDTOS);
                return accountList;

            }
            catch (Exception ex)
            {

            }
            return null;
        }



        //public IEnumerable<CoaaccountsDto> SearchAccount(AccountSearchDto accountSearchDto)
        //{
        //    var _accounts = from act in _context.TblCoaaccounts.OrderByDescending(a => a.CreatedDate)
        //                    select act;

        //    if (accountSearchDto.AccountCode != null)
        //    {
        //        _accounts = _accounts.Where(acnt => acnt.AccountCode == accountSearchDto.AccountCode);
        //    }
        //    if (!string.IsNullOrEmpty(accountSearchDto.AccountName))
        //    {
        //        _accounts = _accounts.Where(acnt => acnt.AccountName == accountSearchDto.AccountName);
        //    }
        //    if ((accountSearchDto.AccountTypeId) != null)
        //    {
        //        _accounts = _accounts.Where(acnt => acnt.AccountTypeId == accountSearchDto.AccountTypeId);
        //    }
        //    if(!string.IsNullOrEmpty(accountSearchDto.AccountDesc))
        //    {
        //        _accounts = _accounts.Where(acnt => acnt.AccountDesc == accountSearchDto.AccountDesc);
        //    }

        //    var _accountDtos = _mapper.Map<IEnumerable<CoaaccountsDto>>(_accounts);

        //    return _accountDtos;
        //}

        public async Task<IEnumerable<CoaaccountsSearchDto>> SearchAccount(AccountSearchDetailsDto accountSearchDto, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var _accounts = from act in _context.TblCoaaccounts.OrderByDescending(a => a.CreatedDate)
                            join actType in _context.TblAccountType on act.AccountTypeId equals actType.AccountTypeId
                            select new AccountSearchDetailsDto
                            {
                                AccountId = act.AccountId,
                                AccountTypeId = act.AccountTypeId,
                                AccountCode = act.AccountCode,
                                AccountName = act.AccountName,
                                AccountDesc = act.AccountDesc,
                                CreatedBy = act.CreatedBy,
                                CreatedDate = act.CreatedDate,
                                ModifiedDate = act.ModifiedDate,
                                ModifiedBy = act.ModifiedBy,
                                IsActive = act.IsActive,
                                AccountType = actType.AccountType,
                            };

            if (accountSearchDto.AccountCode != null)
            {
                _accounts = _accounts.Where(acnt => acnt.AccountCode == accountSearchDto.AccountCode);
            }
            if (!string.IsNullOrEmpty(accountSearchDto.AccountName))
            {
                _accounts = _accounts.Where(acnt => acnt.AccountName == accountSearchDto.AccountName);
            }
            if (!string.IsNullOrEmpty(accountSearchDto.AccountType))
            {
                _accounts = _accounts.Where(acnt => acnt.AccountType == accountSearchDto.AccountType);
            }
            if (!string.IsNullOrEmpty(accountSearchDto.AccountDesc))
            {
                _accounts = _accounts.Where(acnt => acnt.AccountDesc == accountSearchDto.AccountDesc);
            }

            var _accountDtos = _mapper.Map<IEnumerable<CoaaccountsSearchDto>>(_accounts);

            return _accountDtos;
        }

        //Searching of CoaMapping
        public async Task<IEnumerable<CoaMappingSearchDto>> SearchCOAMapping(CoaMappingSearchDto coaMappingSearch, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var _coaMapping = from coaMap in _context.TblCoaaccountMapping.OrderByDescending(a => a.CreatedDate)
                              join actName in _context.TblCoaaccounts on (decimal)coaMap.AccountId equals actName.AccountId
                              select new CoaMappingSearchDto
                              {
                                  AccountMappingId = coaMap.AccountMappingId,
                                  AccountId = coaMap.AccountId,
                                  AccountName = actName.AccountName,
                                  RefAccountCode = coaMap.RefAccountCode,
                                  Name = coaMap.Name,
                                  CustomerId = coaMap.CustomerId,
                                  Description = coaMap.Description,
                                  AccountType = coaMap.AccountType,
                                  MicaAccountCode = coaMap.MicaAccountCode
                              };

            if (coaMappingSearch.CustomerId != null)
            {
                _coaMapping = _coaMapping.Where(acnt => acnt.CustomerId == coaMappingSearch.CustomerId);
                var _coaMapDtos = _mapper.Map<IEnumerable<CoaMappingSearchDto>>(_coaMapping);
                return _coaMapDtos;
            }
            else
            {
                return null;
            }
        }



        public async Task<IEnumerable<TransactionDto>> SearchTransaction(TransactionSearchDto searchTransaction, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var _transaction = from trans in _context.TblTransaction.OrderByDescending(a => a.CreatedDate)
                               select trans;
            if (searchTransaction.CreatedDate != null)
            {
                _transaction = _transaction.Where(trans => trans.CreatedDate == searchTransaction.CreatedDate);
            }
            var _transactionDtos = _mapper.Map<IEnumerable<TransactionDto>>(_transaction);
            return _transactionDtos;
        }

        //Fetching Transaction Data
        public async Task<IEnumerable<TransactionAccountSearchDto>> SearchTransactionAccount(TransactionSearchAccountDto transactionAccountSearchDto, DateTime fromDate, DateTime toDate, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            if (fromDate != null && toDate != null)
            {
                var accounts = from transHeader in _context.TblTransactionHeader.OrderBy(a => a.CreatedDate)
                               join trasCondition in _context.TblTransaction on transHeader.TransactionHeaderId equals trasCondition.TransactionHeaderId
                               join actName in _context.TblCoaaccounts on trasCondition.AccountCode equals actName.AccountCode
                               select new TransactionSearchAccountDto
                               {
                                   TransactionHeaderId = transHeader.TransactionHeaderId,
                                   TransactionRuleMappingId = transHeader.TransactionRuleMappingId,
                                   RuleName = transHeader.RuleName,
                                   CreatedDate = transHeader.CreatedDate.Value.Date,
                                   CreatedDateTime = transHeader.CreatedDate,
                                   TransactionId = trasCondition.TransactionId,
                                   TypeOfTransaction = trasCondition.TypeOfTransaction,
                                   Amount = trasCondition.Amount,
                                   Description = "",
                                   ReferenceDescription = trasCondition.Description,
                                   Currency = trasCondition.Currency,
                                   IsActive = trasCondition.IsActive,
                                   Object = trasCondition.Object,
                                   Event = trasCondition.Event,
                                   AccountType = trasCondition.AccountType,
                                   Value = trasCondition.Value,
                                   AccountCode = trasCondition.AccountCode,
                                   AccountName = actName.AccountName,
                                   CustomerAcCode=0,
                                   CustomerAcName="",
                                   OrgId = trasCondition.OrganizationId,
                                   PartnerId = trasCondition.PartnerId
                               };
                if (transactionAccountSearchDto.AccountCode != null)
                {
                    accounts = accounts.Where(acnt => acnt.AccountCode == transactionAccountSearchDto.AccountCode);
                }

                if (!string.IsNullOrEmpty(transactionAccountSearchDto.AccountType))
                {
                    accounts = accounts.Where(acnt => acnt.AccountType == transactionAccountSearchDto.AccountType);
                }

                if (transactionAccountSearchDto.OrgId != null)
                {
                    accounts = accounts.Where(acnt => acnt.OrgId == transactionAccountSearchDto.OrgId);
                }

                if (transactionAccountSearchDto.PartnerId != null)
                {
                    accounts = accounts.Where(acnt => acnt.PartnerId == transactionAccountSearchDto.PartnerId);
                }


                accounts = accounts.Where(trans => trans.CreatedDate >= fromDate.Date && trans.CreatedDate <= toDate.Date);
                var _accounts = accounts.ToList();
                var subledger = from subLedger in _context.TblTransactionSubLedger
                                join LedgerReferences in _context.TblSubLedgerReferences on subLedger.SubLedgerReferencesId equals LedgerReferences.SubLedgerReferencesId
                                select new
                                {
                                    SubLedgerReferenceId = subLedger.SubLedgerReferencesId,
                                    SubLedgerReferenceName = LedgerReferences.LedgerColName,
                                    LedgerValue = subLedger.Value,
                                    TransactionHeadersId = subLedger.TransactionHeaderId
                                };
                

                var temp = "";
                var temp1 = "";
                Dictionary<string, string> dict = new Dictionary<string, string>();
                foreach (var act in _accounts)
                {
                    foreach (var ledger in subledger)
                    {
                        if (ledger.TransactionHeadersId == act.TransactionHeaderId)
                        {
                            if (!dict.ContainsKey(ledger.SubLedgerReferenceName))
                            {
                                dict.Add(ledger.SubLedgerReferenceName, ledger.LedgerValue);
                            }
                            
                        }
                    }
                    foreach (var dic in dict)
                    {
                        temp = dic.Key + "=" + dic.Value;
                        temp1 = temp + "/" + temp1;
                    }
                    act.Description = temp1;
                    temp1 = "";
                    temp = "";
                    dict.Clear();
                }
                //Addition of Customer ACCOde and Name
                var coaMappingData = from tblCOA in _context.TblCoaaccountMapping
                                     select new
                                     {
                                         CustomerAcCode = tblCOA.RefAccountCode,
                                         CustomerAcName = tblCOA.Name,
                                         MicaAccountCode = tblCOA.MicaAccountCode
                                     };
                foreach(var aCustomer in _accounts)
                {
                    foreach(var coaMap in coaMappingData)
                    {
                        if (aCustomer.AccountCode == Int32.Parse(coaMap.MicaAccountCode))
                        {
                            aCustomer.CustomerAcCode = coaMap.CustomerAcCode;
                            aCustomer.CustomerAcName = coaMap.CustomerAcName;
                        }
                    }
                }

                var _accountDtos = _mapper.Map<IEnumerable<TransactionAccountSearchDto>>(_accounts);

                return _accountDtos;
            }
            return null;
        }

        public async Task<IEnumerable<TransactionDto>> SearchTransactionD(DateTime fromDate, DateTime toDate, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var _transaction = from trans in _context.TblTransaction.OrderByDescending(a => a.CreatedDate)
                               select trans;
            if (fromDate != null && toDate != null)
            {
                _transaction = _transaction.Where(trans => trans.CreatedDate >= fromDate && trans.CreatedDate <= toDate);
            }
            var _transactionDtos = _mapper.Map<IEnumerable<TransactionDto>>(_transaction);
            return _transactionDtos;
        }

        public async Task<CoaaccountsDto> ModifyAccounts(CoaaccountsDto objAccounts, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_account = _mapper.Map<TblCoaaccounts>(objAccounts);
            var tbl_Accounts = _context.TblCoaaccounts.Find(tbl_account.AccountId);

            if (tbl_Accounts == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_Accounts.AccountId = objAccounts.AccountId;
            tbl_Accounts.AccountTypeId = objAccounts.AccountTypeId;
            tbl_Accounts.AccountCode = objAccounts.AccountCode;
            tbl_Accounts.AccountName = objAccounts.AccountName;
            tbl_Accounts.AccountDesc = objAccounts.AccountDesc;
            tbl_Accounts.CreatedBy = objAccounts.CreatedBy;
            tbl_Accounts.CreatedDate = objAccounts.CreatedDate;
            tbl_Accounts.ModifiedDate = objAccounts.ModifiedDate;
            tbl_Accounts.ModifiedBy = objAccounts.ModifiedBy;
            tbl_Accounts.IsActive = objAccounts.IsActive;
            _context.TblCoaaccounts.Update(tbl_Accounts);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<CoaaccountsDto>(tbl_account);
            return accountDTO;
        }

        public async Task<CoaaccountMappingDto> ModifyCoaMapping(CoaaccountMappingDto objMapAccounts, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_accountMap = _mapper.Map<TblCoaaccountMapping>(objMapAccounts);
            var tbl_AccountsMap = _context.TblCoaaccountMapping.Find(tbl_accountMap.AccountMappingId);

            if (tbl_AccountsMap == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_AccountsMap.AccountMappingId = objMapAccounts.AccountMappingId;
            tbl_AccountsMap.AccountId = objMapAccounts.AccountId;
            tbl_AccountsMap.RefAccountCode = objMapAccounts.RefAccountCode;
            tbl_AccountsMap.Name = objMapAccounts.Name;
            tbl_AccountsMap.CustomerId = objMapAccounts.CustomerId;
            tbl_AccountsMap.Description = objMapAccounts.Description;
            tbl_AccountsMap.CreatedDate = objMapAccounts.CreatedDate;
            tbl_AccountsMap.IsActive = objMapAccounts.IsActive;
            tbl_AccountsMap.AccountType = objMapAccounts.AccountType;
            tbl_AccountsMap.MicaAccountCode = objMapAccounts.MicaAccountCode;
            _context.TblCoaaccountMapping.Update(tbl_AccountsMap);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<CoaaccountMappingDto>(tbl_accountMap);
            return accountDTO;
        }
        //Disabling of COAAccounts
        public async Task<CoaaccountsDto> DisabeAccounts(CoaaccountsDto objAccounts, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_account = _mapper.Map<TblCoaaccounts>(objAccounts);
            var tbl_Accounts = _context.TblCoaaccounts.Find(tbl_account.AccountId);

            if (tbl_Accounts == null)
                throw new AppException("Account Not Found");
            // update user properties
            tbl_Accounts.IsActive = objAccounts.IsActive;
            _context.TblCoaaccounts.Update(tbl_Accounts);
            _context.SaveChanges();
            var accountDTO = _mapper.Map<CoaaccountsDto>(tbl_account);
            return accountDTO;
        }

        //For Importting the file Into Excel
        public async Task<DemoResponse<List<CoaMapExcelImportDTO>>> Import(IFormFile formFile, CancellationToken cancellationToken, ApiContext apiContext)
        {
            _context = (MICAACContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            if (formFile == null || formFile.Length <= 0)
            {
                return DemoResponse<List<CoaMapExcelImportDTO>>.GetResult(-1, "formfile is empty");
            }

            if (!Path.GetExtension(formFile.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
            {
                return DemoResponse<List<CoaMapExcelImportDTO>>.GetResult(-1, "Not Support file extension");
            }

            var list = new List<CoaMapExcelImportDTO>();

            DataTable dt = new DataTable();

            dt.Columns.Add("MICAAccountType", typeof(string));
            dt.Columns.Add("MicaAccountCode", typeof(int));
            dt.Columns.Add("MicaAccountName", typeof(string));
            dt.Columns.Add("CustomerName", typeof(string));
            dt.Columns.Add("CustomerAccountCode", typeof(int));
            dt.Columns.Add("CustomerAccountsName", typeof(string));
            dt.Columns.Add("CustomerAccountDescription", typeof(string));


            using (var stream = new MemoryStream())
            {
                await formFile.CopyToAsync(stream, cancellationToken);
                try
                {
                    using (var package = new ExcelPackage(stream))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                        var rowCount = worksheet.Dimension.Rows;

                        for (int row = 2; row <= rowCount; row++)
                        {
                            DataRow dr = dt.NewRow();
                            dr["MICAAccountType"] = worksheet.Cells[row, 1].Value.ToString().Trim();
                            dr["MicaAccountCode"] = int.Parse(worksheet.Cells[row, 2].Value.ToString().Trim());
                            dr["MicaAccountName"] = worksheet.Cells[row, 3].Value.ToString().Trim();
                            dr["CustomerName"] = worksheet.Cells[row, 4].Value.ToString().Trim();
                            dr["CustomerAccountCode"] = int.Parse(worksheet.Cells[row, 5].Value.ToString().Trim());
                            dr["CustomerAccountsName"] = worksheet.Cells[row, 6].Value.ToString().Trim();
                            dr["CustomerAccountDescription"] = worksheet.Cells[row, 6].Value.ToString().Trim();

                            dt.Rows.Add(dr);

                            list.Add(new CoaMapExcelImportDTO
                            {
                                MICAAccountType = worksheet.Cells[row, 1].Value.ToString().Trim(),
                                MicaAccountCode = int.Parse(worksheet.Cells[row, 2].Value.ToString().Trim()),
                                MicaAccountName = worksheet.Cells[row, 3].Value.ToString().Trim(),
                                CustomerName = worksheet.Cells[row, 4].Value.ToString().Trim(),
                                CustomerAccountCode = worksheet.Cells[row, 5].Value.ToString().Trim(),
                                CustomerAccountsName = worksheet.Cells[row, 6].Value.ToString().Trim(),
                                CustomerAccountDescription = worksheet.Cells[row, 7].Value.ToString().Trim()
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    //ex
                }
            }
            foreach (var l in list)
            {
                var accountList = from tblcoaAccount in _context.TblCoaaccounts
                                  where (tblcoaAccount.AccountName == l.MicaAccountName)
                                  select tblcoaAccount.AccountId;
            }
            try
            {
                // here just read and return
                string connetionString = "Data Source=inubesql.database.windows.net;Initial Catalog=MICADev;User ID=MICAUSER;Password=MICA*user123";
                using (var bulkCopy = new SqlBulkCopy(connetionString, SqlBulkCopyOptions.KeepIdentity))
                {
                    // my DataTable column names match my SQL Column names, so I simply made this loop. However if your column names don't match, just pass in which datatable name matches the SQL column name in Column Mappings
                    foreach (DataColumn col in dt.Columns)
                    {
                        bulkCopy.ColumnMappings.Add(col.ColumnName, col.ColumnName);
                    }

                    bulkCopy.BulkCopyTimeout = 600;
                    bulkCopy.DestinationTableName = "[AC].[tblCOAAccountMapping]";
                    bulkCopy.WriteToServer(dt);
                }
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
            }
            return DemoResponse<List<CoaMapExcelImportDTO>>.GetResult(0, "OK", list);
        }

    }
}
