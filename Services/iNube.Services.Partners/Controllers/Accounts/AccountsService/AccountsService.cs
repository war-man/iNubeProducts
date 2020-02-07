using AutoMapper;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Accounts.AccountsService
{
    public interface IAccountService
    {
        Task<CDAccountResponse> CreateCdAccount(CdAccountsDTO cdAccountsDTO, ApiContext apiContext);
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
        //Task<List<ddDTO>> GetProductName();
    }

    public class AccountsService : IAccountService
    {
        private MICAPRContext _context;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private readonly IEmailService _emailService;
        private readonly Func<string, IAccountsProductService> _accountsProductService;
        public AccountsService(Func<string, IAccountsProductService> accountsProductService, IMapper mapper, IIntegrationService integrationService, IEmailService emailService)
        {
            _accountsProductService = accountsProductService;
            _mapper = mapper;
            _integrationService = integrationService;
            _emailService = emailService;
        }
        public async Task<CDAccountResponse> CreateCdAccount(CdAccountsDTO cdAccountsDTO, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).CreateCdAccountAsync(cdAccountsDTO, apiContext);
        }

        public async Task<ReplnishCDResponse> ReplnishCDTransaction(CdTransactionsDTO cdTransactions, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).ReplnishCDTransaction(cdTransactions, apiContext);

        }

        public async Task<CdAccountsDTO> GetCDAccountById(decimal Cdid, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).GetCDAccountById(Cdid, apiContext);

        }

        public async Task<CdTransactionsDTO> GetCDTransactionById(decimal Cdid, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).GetCDTransactionById(Cdid, apiContext);

        }

        public async Task<CdTransactionsResponse> ReverseCDTransaction(PolicyBookingTransaction reverseCdAccount, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).ReverseCDTransaction(reverseCdAccount, apiContext);

        }
        public async Task<CdTransactionsResponse> GenerateCDTransaction(PolicyBookingTransaction policyBooking, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).GenerateCDTransaction(policyBooking, apiContext);

        }
        public async Task<CdTransactionsResponse> UpdateCDTransaction(PolicyBookingTransaction policyBooking, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).UpdateCDTransaction(policyBooking, apiContext);

        }
        public async Task<IEnumerable<CdAccountResponseDTO>> SearchCdAccountAsync(SearchTransactionModel searchCDModel, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).SearchCdAccountAsync(searchCDModel, apiContext);

        }

        public async Task<IEnumerable<CdTransactionsResponseDTO>> SearchCdAccountTransactionAsync(SearchTransactionModel searchTransactionModel, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).SearchCdAccountTransactionAsync(searchTransactionModel, apiContext);

        }

        private string GetAccountNumber(decimal ProductId, decimal PartnerId)
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
            return await _accountsProductService(apiContext.ProductType).GetAccountFilter(Cdid, apiContext);

        }

        public async Task<Dictionary<int,string>> GetProductNameAsync(int partnerid, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).GetProductNameAsync(partnerid, apiContext);

        }

        public async Task<List<ddDTO>> GetCdAccountMasterAsync(bool isProduct, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).GetCdAccountMasterAsync(isProduct, apiContext);

        }

        public async Task<List<ddDTO>> GetProductName(ApiContext apiContext)
        {
            //return _accountsProductService(apiContext.ProductType).GetProductName(apiContext);
            var tblcddata = _context.TblCdaccounts.OrderByDescending(x => x.AccountNo);
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

        public async Task<MasterCDDTO> MasterPolicyCD(MasterCDDTO masterCDDTO, ApiContext apiContext)
        {
            return await _accountsProductService(apiContext.ProductType).MasterPolicyCD(masterCDDTO, apiContext);

        }


    }
}
