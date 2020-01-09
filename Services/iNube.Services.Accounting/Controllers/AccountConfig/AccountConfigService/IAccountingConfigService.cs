using iNube.Services.Accounting.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService
{
    public interface IAccountingConfigService
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
        Task<IEnumerable<TransactionDto>> SearchTransactionD(DateTime fromDate, DateTime toDate, ApiContext apiContext);
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
}
