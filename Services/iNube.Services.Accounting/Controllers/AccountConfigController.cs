using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService;
using iNube.Services.Accounting.Helpers;
using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using iNube.Services.Accounting.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Accounting.Controllers.AccountConfig
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]

    public class AccountConfigController : BaseApiController
    {
        //private IAccountConfigService _accountService;
        private IAccountConfigService _accountService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AccountConfigController(IAccountConfigService accountService,IMapper mapper, IOptions<AppSettings> appSettings
            )
        {
            _accountService = accountService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpDelete]
        public IActionResult  DeleteCoaMapping(decimal AccountMapppingId)
        {
            _accountService.DeleteCoaMapping(AccountMapppingId,Context);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccounts([FromBody]CoaaccountsDto tblCoaaccountDto)
        {
                var response =await _accountService.CreateAccounts(tblCoaaccountDto, Context);
                switch (response.Status)
                {
                    case BusinessStatus.InputValidationFailed:
                        return Ok(response);
                    case BusinessStatus.Created:
                        return Ok(response);
                    case BusinessStatus.UnAuthorized:
                        return Unauthorized();
                    default:
                        return Forbid();
                }
        }

        [HttpPost]
        public async Task<IActionResult> CreateMapping([FromBody]CoaaccountMappingDto tblCoaMappingDto)
        {
            var response = await _accountService.CreateCoaMapping(tblCoaMappingDto, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransactionMapping([FromBody]TransactionRuleMappingDto tblTransMappingDto)
        {
            var response = await _accountService.CreateTransactionMap(tblTransMappingDto, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        //[HttpPost("CreateTransaction")]
        //public async Task<IActionResult> CreateTransaction([FromBody]TransactionDto tblTransDto)
        //{
        //    var response = _accountService.CreateTransaction(tblTransDto);
        //    switch (response.Status)
        //    {
        //        case BusinessStatus.InputValidationFailed:
        //            return Ok(response);
        //        case BusinessStatus.Created:
        //            return Ok(response);
        //        case BusinessStatus.UnAuthorized:
        //            return Unauthorized();
        //        default:
        //            return Forbid();
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody]TransactionHeaderDto tblTransDto)
        {
            var response = await _accountService.CreateTransaction(tblTransDto, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpPost]
        public async Task<IActionResult> SearchAccount(AccountSearchDetailsDto searchdto)
        {
            var response = await _accountService.SearchAccount(searchdto, Context);
            if(response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        
        [HttpPost]
        public async Task<IActionResult> SearchCOAMapping(CoaMappingSearchDto searchdto)
        {
            var response = await _accountService.SearchCOAMapping(searchdto, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> SearchTransactionAccount(TransactionSearchAccountDto searchdto, DateTime fromDate, DateTime toDate)
        {
            var response = await _accountService.SearchTransactionAccount(searchdto,fromDate,toDate, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }


        //[HttpPost("SearchAccountTrial")]
        //public async Task<IActionResult> SearchAccountTrial(AccountSearchDetailsDto searchdto)
        //{
        //    var response = _accountService.SearchAccount(searchdto);
        //    if (response != null)
        //    {
        //        return Ok(response);
        //    }
        //    return NotFound();
        //}
        [HttpPost]
        public async Task<IActionResult> SearchTransaction(TransactionSearchDto searchdto)
        {
            var response = await _accountService.SearchTransaction(searchdto, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> SearchTransactionD(DateTime fromDate, DateTime toDate)
        {
            var response = await _accountService.SearchTransactionD(fromDate, toDate, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        
        [HttpPut]
        public async Task<IActionResult> ModifyCoaAccount(int AccountId, CoaaccountsDto accountDto)
        {
            accountDto.AccountId = AccountId;
            await _accountService.ModifyAccounts(accountDto, Context);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> ModifyCoaMapping(int AccountMappingId, CoaaccountMappingDto accountMapDto)
        {
            accountMapDto.AccountMappingId = AccountMappingId;
            await _accountService.ModifyCoaMapping(accountMapDto, Context);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> DisableAccount(int AccountId, CoaaccountsDto accountDto)
        {
            accountDto.AccountId = AccountId;
            await _accountService.DisabeAccounts(accountDto, Context);
            return Ok();

        }

        [HttpGet]
        public async Task<IActionResult> GetAccountById(decimal accountId)
        {
            var response = await _accountService.GetAccountById(accountId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        
        [HttpGet]
        public async Task<IActionResult> GetCOAMappingById(decimal accountMappingId)
        {
            var response = await _accountService.GetCOAMappingById(accountMappingId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpGet]
        public async Task<IActionResult> GetAccountType()
        {
            var accountDtos = await _accountService.GetAccountType(Context);
            return Ok(accountDtos);
        }
        [HttpGet]
        public async Task<IActionResult> GetSubLedgers()
        {
            var subLedgerDtos = await _accountService.GetSubLedgerType(Context);
            return Ok(subLedgerDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactionDetails()
        {
            var transactionDtos =await _accountService.GetTransactionDetails(Context);
            return Ok(transactionDtos);
        }
        [HttpGet]
        public async Task<IActionResult> GetTransactionConditionDetails()
        {
            var transactionDtos = await _accountService.GetTransaction(Context);
            return Ok(transactionDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactionMappingDetails()
        {
            var accountTransactionMapDtos =await _accountService.GetTransactionRuleMappingCondition(Context);
            return Ok(accountTransactionMapDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetJournalEntryDetailsGrid()
        {
            var accountJournalEntryDtos =await _accountService.GetJournalEnntryDetails(Context);
            return Ok(accountJournalEntryDtos);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetCoaMappingDetails()
        {
            var accountCoaMappingDtos =await _accountService.GetCoaMappingDetails(Context);
            return Ok(accountCoaMappingDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAccountWithType()
        {
            var accountListData =await _accountService.GetAccountDetails(Context);
            return Ok(accountListData);
        }


        
        ////Excel Upload For COAMapping
        [HttpPost]
        public async Task<IActionResult> ImportExcelCOAMapping(IFormFile formFile, CancellationToken cancellationToken)
        {
            await _accountService.Import(formFile, cancellationToken,Context);
            return Ok();

        }
		
		 [HttpGet]
        [AllowAnonymous]
        public IActionResult HC() 
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult HCTest()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }
    }
}

