using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Accounts.AccountsService
{
    public interface IAccountsProductService
    {

        Task<CDAccountResponse> CreateCdAccountAsync(CdAccountsDTO cdAccountsDTO,ApiContext apiContext);
        Task<ReplnishCDResponse> ReplnishCDTransaction(CdTransactionsDTO cdTransactionsDTO, ApiContext apiContext);
        Task<IEnumerable<CdAccountResponseDTO>> SearchCdAccountAsync(SearchTransactionModel searchTransactionModel, ApiContext apiContext);
        Task<IEnumerable<CdTransactionsResponseDTO>> SearchCdAccountTransactionAsync(SearchTransactionModel searchTransactionModel, ApiContext apiContext);
        Task<CdAccountsDTO> GetCDAccountById(decimal Cdid, ApiContext apiContext);
        Task<CdTransactionsDTO> GetCDTransactionById(decimal Cdid, ApiContext apiContext);
        Task<CdTransactionsResponse> ReverseCDTransaction(PolicyBookingTransaction reverseCdAccount, ApiContext apiContext);
        Task<CdTransactionsResponse> GenerateCDTransaction(PolicyBookingTransaction policyBooking, ApiContext apiContext);
        Task<CdTransactionsResponse> UpdateCDTransaction(PolicyBookingTransaction policyBooking, ApiContext apiContext);
        Task<List<object>> GetAccountFilter(int Cdid, ApiContext apiContext);
        Task<Dictionary<int, string>> GetProductNameAsync(int partnerid, ApiContext apiContext);
        Task<List<ddDTO>> GetCdAccountMasterAsync(bool isProduct, ApiContext apiContext);
        Task<MasterCDDTO> MasterPolicyCD(MasterCDDTO masterCDDTO, ApiContext apiContext);
        Task<MasterCDDTO> MasterCDACC(MicaCD CDDTO, ApiContext apiContext);
        Task<MasterCDDTO> CDAccountCreation(string accountnumber, ApiContext apiContext);
        //Task<List<ddDTO>> GetProductName();

    }
}
