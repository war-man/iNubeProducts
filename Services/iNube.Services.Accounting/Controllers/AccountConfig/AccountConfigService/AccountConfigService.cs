using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Accounting.Entities;
using iNube.Services.Accounting.Helpers;
using iNube.Services.Accounting.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using OfficeOpenXml;

namespace iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService
{
    public interface IAccountConfigService
    {
        Task<AccountResponce> CreateAccounts(CoaaccountsDto coaacountsdto, ApiContext apiContext);
        //IEnumerable<CoaaccountsDto> SearchAccount(AccountSearchDto accountSearchDto);
        Task<IEnumerable<AccountTypeDto>> GetAccountType(ApiContext apiContext);
        Task<IEnumerable<AccountDetailsDto>> GetAccountDetails(ApiContext apiContext);
        Task<CoaaccountsDto> ModifyAccounts(CoaaccountsDto objAccounts, ApiContext apiContext);
        Task<CoaaccountsDto> GetAccountById(decimal accountId, ApiContext apiContext);
        Task<CoaMapResponse> CreateCoaMapping(CoaaccountMappingDto coamappingdto, ApiContext apiContext);
        Task<TransactionMapResponse> CreateTransactionMap(TransactionRuleMappingDto transactionmappingdto, ApiContext apiContext);
        //TransactionResponse CreateTransaction(TransactionDto transactionDto);
        Task<TransactionResponse> CreateTransaction(TransactionHeaderDto transactionDto, ApiContext apiContext);
        //IEnumerable<TransactionRuleMappingDto> GetMappingDetails();
        Task<IEnumerable<TransactionDto>> SearchTransaction(TransactionSearchDto searchTransaction, ApiContext apiContext);
        Task<IEnumerable<TransactionDto>> GetTransactionDetails(ApiContext apiContext);
        Task<IEnumerable<TransactionDto>> SearchTransactionD(DateTime fromDate,DateTime toDate, ApiContext apiContext);
        Task<IEnumerable<JournalEntryConfriguationDto>> GetJournalEnntryDetails(ApiContext apiContext);
        Task<IEnumerable<CoaAccountMappingDto>> GetCoaMappingDetails(ApiContext apiContext);
        Task<DemoResponse<List<CoaMapExcelImportDTO>>> Import(IFormFile formFile, CancellationToken cancellationToken, ApiContext apiContext);
        Task<IEnumerable<CoaaccountsSearchDto>> SearchAccount(AccountSearchDetailsDto accountSearchDto, ApiContext apiContext);
        Task<IEnumerable<CoaMappingSearchDto>> SearchCOAMapping(CoaMappingSearchDto coaMappingSearch, ApiContext apiContext);
        Task<IEnumerable<TransactionRuleMappingConditionsDto>> GetTransactionRuleMappingCondition(ApiContext apiContext);
        //For TransactionSearch
        Task<IEnumerable<TransactionAccountSearchDto>> SearchTransactionAccount(TransactionSearchAccountDto transactionAccountSearchDto, DateTime fromDate, DateTime toDate, ApiContext apiContext);
        Task<CoaaccountsDto> DisabeAccounts(CoaaccountsDto objAccounts, ApiContext apiContext);
        Task<CoaaccountMappingDto> GetCOAMappingById(decimal accountMappingId, ApiContext apiContext);
        Task<CoaaccountMappingDto> ModifyCoaMapping(CoaaccountMappingDto objMapAccounts, ApiContext apiContext);
        void DeleteCoaMapping(decimal AccountMappingId, ApiContext apiContext);
    }

    public class AccountConfigService : IAccountConfigService
    {
        private MICAACContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly Func<string, IAccountingConfigService> _accountsService;

        public AccountConfigService(Func<string, IAccountingConfigService> accountsService, IMapper mapper, MICAACContext context,
            IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
            _accountsService = accountsService;
        }

        public async Task<AccountResponce> CreateAccounts(CoaaccountsDto coaacountsdto, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).CreateAccounts(coaacountsdto, apiContext);
        }


        //Delete CoaMapping
        public async void DeleteCoaMapping(decimal AccountMappingId, ApiContext apiContext)
        {
            _accountsService(apiContext.ProductType).DeleteCoaMapping(AccountMappingId, apiContext);
        }

        public async Task<CoaMapResponse> CreateCoaMapping(CoaaccountMappingDto coamappingdto, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).CreateCoaMapping(coamappingdto, apiContext);
        }

        public async Task<TransactionMapResponse> CreateTransactionMap(TransactionRuleMappingDto transactionmappingdto, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).CreateTransactionMap(transactionmappingdto, apiContext);
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
            return await _accountsService(apiContext.ProductType).CreateTransaction(transactionDto, apiContext);
        }


        public async Task<CoaaccountsDto> GetAccountById(decimal accountId, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).GetAccountById(accountId, apiContext);
        }

        //Get TransactionMapping By ID
        public async Task<CoaaccountMappingDto> GetCOAMappingById(decimal accountMappingId, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).GetCOAMappingById(accountMappingId, apiContext);
        }

        public async Task<IEnumerable<AccountTypeDto>> GetAccountType(ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).GetAccountType(apiContext);
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
            return await _accountsService(apiContext.ProductType).GetTransactionRuleMappingCondition(apiContext);

        }

        public async Task<IEnumerable<TransactionDto>> GetTransactionDetails(ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).GetTransactionDetails(apiContext);

        }

        //CoaMapping Details for Export to Excel Part
        public async Task<IEnumerable<CoaAccountMappingDto>> GetCoaMappingDetails(ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).GetCoaMappingDetails(apiContext);

        }

        //Get the Journal Entry Confriguation Grid
        public async Task<IEnumerable<JournalEntryConfriguationDto>> GetJournalEnntryDetails(ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).GetJournalEnntryDetails(apiContext);

        }
        // Getting details with AccountName and Id
        public async Task<IEnumerable<AccountDetailsDto>> GetAccountDetails(ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).GetAccountDetails(apiContext);

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
            return await _accountsService(apiContext.ProductType).SearchAccount(accountSearchDto, apiContext);

        }

        //Searching of CoaMapping
        public async Task<IEnumerable<CoaMappingSearchDto>> SearchCOAMapping(CoaMappingSearchDto coaMappingSearch, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).SearchCOAMapping(coaMappingSearch, apiContext);

        }



        public async Task<IEnumerable<TransactionDto>> SearchTransaction(TransactionSearchDto searchTransaction, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).SearchTransaction(searchTransaction, apiContext);

        }

        //Fetching Transaction Data
        public async Task<IEnumerable<TransactionAccountSearchDto>> SearchTransactionAccount(TransactionSearchAccountDto transactionAccountSearchDto, DateTime fromDate, DateTime toDate, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).SearchTransactionAccount(transactionAccountSearchDto, fromDate, toDate, apiContext);

        }

        public async Task<IEnumerable<TransactionDto>> SearchTransactionD(DateTime fromDate, DateTime toDate, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).SearchTransactionD(fromDate, toDate, apiContext);

        }

        public async Task<CoaaccountsDto> ModifyAccounts(CoaaccountsDto objAccounts, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).ModifyAccounts(objAccounts, apiContext);

        }

        public async Task<CoaaccountMappingDto> ModifyCoaMapping(CoaaccountMappingDto objMapAccounts, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).ModifyCoaMapping(objMapAccounts, apiContext);

        }
        //Disabling of COAAccounts
        public async Task<CoaaccountsDto> DisabeAccounts(CoaaccountsDto objAccounts, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).DisabeAccounts(objAccounts, apiContext);

        }

        //For Importting the file Into Excel
        public async Task<DemoResponse<List<CoaMapExcelImportDTO>>> Import(IFormFile formFile, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _accountsService(apiContext.ProductType).Import(formFile, cancellationToken, apiContext);

        }
    }
}
