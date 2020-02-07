using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Partners.Controllers.Accounts.AccountsService;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace iNube.Services.Partners.Controllers.Accounts
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class AccountsController : BaseApiController
    {
        public IAccountService _accountService;
        private IMapper _mapper;
        public AccountsController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        /// <summary>
        /// Creates the cd account.
        /// </summary>
        /// <param name="cdAccountsDTO">The cd accounts dto.</param>
        /// <returns></returns>
        [ProducesDefaultResponseType(typeof(CdAccountsDTO))]
        [HttpPost]
        public async Task<IActionResult> CreateCdAccount(CdAccountsDTO cdAccountsDTO)
        {
            var response =await _accountService.CreateCdAccount(cdAccountsDTO,Context);
            //TODO: Need to return ResponseStatus instead of ErrorResponse
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    //return Created(string.Empty, response);
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                case BusinessStatus.NotFound:
                    return NotFound(response);
                default:
                    return Forbid();
            }
        }
        /// <summary>
        /// Replenishes the cd account.
        /// </summary>
        /// <param name="cdTransactionsDTO">The cd transactions dto.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> ReplenishCdAccount(CdTransactionsDTO cdTransactionsDTO)
        {
            if (cdTransactionsDTO.TxnAmount > 0)
            {
                var response =await _accountService.ReplnishCDTransaction(cdTransactionsDTO, Context);
            //TODO: Need to return ResponseStatus instead of ErrorResponse
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.NotFound:
                    return Ok(response);
                default:
                    return Forbid();
            }
            }
            else
            {
                var message = new ReplnishCDResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"Insufficient balance for transaction! " };
                return Ok(message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> SearchCdAccountAsync([FromBody]SearchTransactionModel searchAccountModel)
        {
            var response =await _accountService.SearchCdAccountAsync(searchAccountModel, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> SearchCdTransactionAsync([FromBody]SearchTransactionModel searchTransactionModel)
        {
            var response =await _accountService.SearchCdAccountTransactionAsync(searchTransactionModel, Context);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAccountById(int accountId)
        {
            var response = await _accountService.GetCDAccountById(accountId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpGet]
        public async Task<IActionResult> GetCDTransactionById(int txnId)
        {
            var response =await _accountService.GetCDTransactionById(txnId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        /// <summary>
        /// Reverses the cd transaction.
        /// </summary>
        /// <param name="reverseCdAccount">The reverse cd account.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> ReverseCDTransaction(PolicyBookingTransaction reverseCdAccount)
        {
            var response =await _accountService.ReverseCDTransaction(reverseCdAccount, Context);
            //TODO: Need to return ResponseStatus instead of ErrorResponse
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
        /// <summary>
        /// Generates the cd transaction.
        /// </summary>
        /// <param name="reverseCdAccount">The reverse cd account.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GenerateCDTransaction(PolicyBookingTransaction reverseCdAccount)
        {
            var response =await _accountService.GenerateCDTransaction(reverseCdAccount, Context);
            //TODO: Need to return ResponseStatus instead of ErrorResponse
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.NotFound:
                    return NotFound(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.PreConditionFailed:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }
        /// <summary>
        /// Updates the cd transaction.
        /// </summary>
        /// <param name="reverseCdAccount">The reverse cd account.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UpdateCDTransaction(PolicyBookingTransaction updateTransaction)
        {
            var response =await _accountService.UpdateCDTransaction(updateTransaction, Context);
            //TODO: Need to return ResponseStatus instead of ErrorResponse
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Updated:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }


        [HttpGet]
        public async Task<List<object>> GetAccountFilter(int Cdid)
        {

            var response =await _accountService.GetAccountFilter(Cdid, Context);
            return response;
        }

        [HttpGet]
        public async Task<List<ddDTO>> GetCdAccountMasterAsync(bool isProduct)
        {
            //if(isProduct)
            //{
             var response = await _accountService.GetCdAccountMasterAsync(isProduct, Context);
             return response;
                //return null;
            //}
            //else
            //{
              // var response = _accountService.GetProductName();
                //return (response);
           // }
        }

        [HttpPost]
        public async Task<Dictionary<int, string>> GetProductName (int partnerid)
        {
            var response = (await _accountService.GetProductNameAsync(partnerid, Context));
            return response;
        }

        [HttpPost]
        public async Task<IActionResult> MasterPolicyCD(MasterCDDTO masterCDDTO)
        {
            var response = (await _accountService.MasterPolicyCD(masterCDDTO, Context));
            return Ok(response);

        }


    }
}
