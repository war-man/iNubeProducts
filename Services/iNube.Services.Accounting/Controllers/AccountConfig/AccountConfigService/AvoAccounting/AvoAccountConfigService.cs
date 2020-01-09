using iNube.Services.Accounting.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService.AvoAccounting
{
    public class AvoAccountConfigService : IAccountingConfigService
    {

        public async Task<AccountResponce> CreateAccounts(CoaaccountsDto coaacountsdto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }


        //Delete CoaMapping
        public void DeleteCoaMapping(decimal AccountMappingId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<CoaMapResponse> CreateCoaMapping(CoaaccountMappingDto coamappingdto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<TransactionMapResponse> CreateTransactionMap(TransactionRuleMappingDto transactionmappingdto, ApiContext apiContext)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }


        public async Task<CoaaccountsDto> GetAccountById(decimal accountId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //Get TransactionMapping By ID
        public async Task<CoaaccountMappingDto> GetCOAMappingById(decimal accountMappingId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<AccountTypeDto>> GetAccountType(ApiContext apiContext)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TransactionDto>> GetTransactionDetails(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //CoaMapping Details for Export to Excel Part
        public async Task<IEnumerable<CoaAccountMappingDto>> GetCoaMappingDetails(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //Get the Journal Entry Confriguation Grid
        public async Task<IEnumerable<JournalEntryConfriguationDto>> GetJournalEnntryDetails(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        // Getting details with AccountName and Id
        public async Task<IEnumerable<AccountDetailsDto>> GetAccountDetails(ApiContext apiContext)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        //Searching of CoaMapping
        public async Task<IEnumerable<CoaMappingSearchDto>> SearchCOAMapping(CoaMappingSearchDto coaMappingSearch, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }



        public async Task<IEnumerable<TransactionDto>> SearchTransaction(TransactionSearchDto searchTransaction, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //Fetching Transaction Data
        public async Task<IEnumerable<TransactionAccountSearchDto>> SearchTransactionAccount(TransactionSearchAccountDto transactionAccountSearchDto, DateTime fromDate, DateTime toDate, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TransactionDto>> SearchTransactionD(DateTime fromDate, DateTime toDate, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<CoaaccountsDto> ModifyAccounts(CoaaccountsDto objAccounts, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<CoaaccountMappingDto> ModifyCoaMapping(CoaaccountMappingDto objMapAccounts, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        //Disabling of COAAccounts
        public async Task<CoaaccountsDto> DisabeAccounts(CoaaccountsDto objAccounts, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //For Importting the file Into Excel
        public async Task<DemoResponse<List<CoaMapExcelImportDTO>>> Import(IFormFile formFile, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();

        }
    }
}
