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
        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<BillingConfigDTO> SaveBillingDetails(BillingConfigDTO billingitem, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<BillingConfigDTO> ModifyBilling(BillingConfigDTO objBilling, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<HistoryDTO>> GetHistry(decimal contractid, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<BillingConfigDTO>> SearchBilling(BillingSearchDTO billingSearchDTO, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BillingItemDetailDTO>> SaveBillingItemDetails(BillingIDetailDTO billingitemdetail, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTO>> GetObjects(string lMasterlist, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTO>> GetEvents(string lMasterlist, int obj, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ContractDTO>> SearchContract(ContractDTO contractdto, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<ContractDTO>> SearchContractById(int contractid, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<String> GetObjectEvent(int obj, int eve, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomerResponse> SaveCustomerAsync(CustomersDTO Customerdto, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<List<string>> GetObjectEventMapping(int obj, int eve, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<objParamDTO>> GetValueFactor(string lMasterlist, int objectid, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<BillingConfigDTO> GetBillingById(decimal billingconfigid, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomersDTO> ModifyCustomer(CustomersDTO customerDto, ApiContext Context)
        {
            throw new NotImplementedException();
        }

        public async Task<InvoiceConfigDTO> ModifyInvoice(InvoiceConfigDTO invoiceData, ApiContext Context)
        {
            throw new NotImplementedException();
        }

        public async Task<List<object>> ClaimDetails(decimal ClaimId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CustomersDTO>> SearchCustomer(decimal customerId, ApiContext Context)
        {
            throw new NotImplementedException();
        }

        public async Task<IQueryable<String>> GetEventMapping(int mappingid, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<List<PaymentDTO>> CreatePayment(PaymentListDTO paymentDto, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<PaymentHistoryDTO>> GetPaymentByInvoiceId(int invoiceId, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CustomerSearchDTO>> CustomerSearch(CustomerSearchDTO customersDTO, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomerResponse> CustomerNamevalidation(string Name, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomerConfigDTO> CreateCustomerConfig(CustomerConfigDTO configDTO, ApiContext Context)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomerConfigDTO> UploadCustConfigImage(CustomerConfigDTO contractimg, ApiContext Context)
        {
            throw new NotImplementedException();
        }

        public async Task<PaymentDTO> UpdatePaymentStatus(PaymentDTO pay, ApiContext Context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<objParamDTO>> GetAllEventMapping(ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTO>> GetMasterForLocation(string lMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        
 public async Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<BillingEventResponseDTO> GetBillingItemizedDetailsAsync(int EventMappingId, InvoiceRequest invoiceRequest, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomersDTO> UploadCustLogo(CustomersDTO CustomerLogo, ApiContext context)
        {
            throw new NotImplementedException();
        }
        
        public async Task<InvoiceConfigDTO> CreateInvoice(InvoiceConfigDTO invoiceConfig, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<InvoiceConfigHistory>> GetInvoiceConfigHistory(ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<ContractDTO> CreateContract(ContractDTO contract, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<ContractHistoryDetails>> GetContractHistory(decimal customerId, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<ContractDocDTO> UploadFiles(ContractDocDTO contractDoc, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceHistory(InvoiceContractSearch invoiceContractSearch, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceForCustomer(InvoiceCustSearch invoiceCustSearch, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<InvoiceConfigDTO> CreateInvoiceConfig(InvoiceConfigDTO invoiceConfig, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<InvoicePenaltyDTO> CreateRegenerateInvoice(InvoicePenaltyDTO invoicePenalty, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<InvoiceDTO> SearchInvoice(InvoiceDTO invoiceDto, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<InvoiceResponse> GenerateInvoiceAsync(InvoiceRequest invoiceRequest, ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<ContractDocDTO>> DocumentView(decimal ContractId, ApiContext context)
        {
            throw new NotImplementedException();
        }
        
        public async Task<IEnumerable<CustomersDTOS>> GetCustomerDetails(ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<EventMappingModel>> GetEventMapDetails(ApiContext context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<EventObjParamMapping>> GetEventObjectParameter(ApiContext context)
        {
            throw new NotImplementedException();
        }

        public Task<CustomersDTO> GetCustProvisioningDetailsAsync(decimal customerId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<ObjectsDTO>> GetObjectParameter(ApiContext context)
        {
            throw new NotImplementedException();
        }
    }
}