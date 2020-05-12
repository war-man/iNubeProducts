using System;
using System.Collections.Generic;
using System.Linq;
using iNube.Utility.Framework.Model;
using System.Threading.Tasks;
using iNube.Services.Billing.Models;
using iNube.Services.Billing.Controllers.Billing.BillingService;

namespace iNube.Services.Billing.Controllers.Billing.MotorBillingService
{
    public class MotorBillingService : IBillingProductService
    {
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<BillingConfigDTO> SaveBillingDetails(BillingConfigDTO billingitem, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<BillingConfigDTO> ModifyBilling(BillingConfigDTO objBilling, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<HistoryDTO>> GetHistry(decimal contractid, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<BillingConfigDTO>> SearchBilling(BillingSearchDTO billingSearchDTO, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<BillingItemDetailDTO>> SaveBillingItemDetails(BillingIDetailDTO billingitemdetail, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTO>> GetObjects(string lMasterlist, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTO>> GetEvents(string lMasterlist, int obj, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ContractDTO>> SearchContract(ContractDTO contractdto, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ContractDTO>> SearchContractById(int contractid, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<String> GetObjectEvent(int obj, int eve, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<CustomerResponse> SaveCustomerAsync(CustomersDTO Customerdto, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<string>> GetObjectEventMapping(int obj, int eve, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<objParamDTO>> GetValueFactor(string lMasterlist, int objectid, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<BillingConfigDTO> GetBillingById(decimal billingconfigid, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<CustomersDTO> ModifyCustomer(CustomersDTO customerDto, ApiContext Context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<InvoiceConfigDTO> ModifyInvoice(InvoiceConfigDTO invoiceData, ApiContext Context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<object>> ClaimDetails(decimal ClaimId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<CustomersDTO>> SearchCustomer(decimal customerId, ApiContext Context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IQueryable<String>> GetEventMapping(int mappingid, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<PaymentDTO>> CreatePayment(PaymentListDTO paymentDto, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<PaymentHistoryDTO>> GetPaymentByInvoiceId(int invoiceId, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<CustomerSearchDTO>> CustomerSearch(CustomerSearchDTO customersDTO, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<CustomerResponse> CustomerNamevalidation(string Name, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<CustomerConfigDTO> CreateCustomerConfig(CustomerConfigDTO configDTO, ApiContext Context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<CustomerConfigDTO> UploadCustConfigImage(CustomerConfigDTO contractimg, ApiContext Context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<PaymentDTO> UpdatePaymentStatus(PaymentDTO pay, ApiContext Context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<objParamDTO>> GetAllEventMapping(ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTO>> GetMasterForLocation(string lMasterlist, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<BillingEventResponseDTO> GetBillingItemizedDetailsAsync(int EventMappingId, InvoiceRequest invoiceRequest, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<CustomersDTO> UploadCustLogo(CustomersDTO CustomerLogo, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<InvoiceConfigDTO> CreateInvoice(InvoiceConfigDTO invoiceConfig, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<InvoiceConfigHistory>> GetInvoiceConfigHistory(ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ContractDTO> CreateContract(ContractDTO contract, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ContractHistoryDetails>> GetContractHistory(decimal customerId, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ContractDocDTO> UploadFiles(ContractDocDTO contractDoc, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceHistory(InvoiceContractSearch invoiceContractSearch, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceForCustomer(InvoiceCustSearch invoiceCustSearch, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<InvoiceConfigDTO> CreateInvoiceConfig(InvoiceConfigDTO invoiceConfig, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<InvoicePenaltyDTO> CreateRegenerateInvoice(InvoicePenaltyDTO invoicePenalty, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<InvoiceDTO> SearchInvoice(InvoiceDTO invoiceDto, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<InvoiceResponse> GenerateInvoiceAsync(InvoiceRequest invoiceRequest, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ContractDocDTO>> DocumentView(decimal ContractId, ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<CustomersDTOS>> GetCustomerDetails(ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<EventMappingModel>> GetEventMapDetails(ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<EventObjParamMapping>> GetEventObjectParameter(ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

        public Task<CustomersDTO> GetCustProvisioningDetailsAsync(decimal customerId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ObjectsDTO>> GetObjectParameter(ApiContext context)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<dynamic> GetBillingEntries(decimal customerId, String EventType, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }
    }
}