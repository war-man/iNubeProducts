using iNube.Utility.Framework.Model;

using iNube.Services.Billing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace iNube.Services.Billing.Controllers.Billing.BillingService
{
    public interface IBillingProductService
    {
        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext context);
        Task<BillingConfigDTO> SaveBillingDetails(BillingConfigDTO billingitem, ApiContext context);
        //void Delete(int BillingID, ApiContext context);
        Task<BillingConfigDTO> ModifyBilling(BillingConfigDTO objBilling, ApiContext context);
        Task<IEnumerable<HistoryDTO>> GetHistry(decimal contractid, ApiContext context);
        Task<IEnumerable<BillingConfigDTO>> SearchBilling(BillingSearchDTO billingSearchDTO, ApiContext context);
        Task<List<BillingItemDetailDTO>> SaveBillingItemDetails(BillingIDetailDTO billingitemdetail, ApiContext context);
        Task<IEnumerable<ddDTO>> GetObjects(string lMasterlist, ApiContext context);
        Task<IEnumerable<ddDTO>> GetEvents(string lMasterlist, int obj, ApiContext context);
        Task<IEnumerable<ContractDTO>> SearchContract(ContractDTO contractdto, ApiContext context);
        Task<IEnumerable<ContractDTO>> SearchContractById(int contractid, ApiContext context);
        Task<String> GetObjectEvent(int obj, int eve, ApiContext context);
        Task<CustomerResponse> SaveCustomerAsync(CustomersDTO Customerdto, ApiContext apiContext);
        Task<List<string>> GetObjectEventMapping(int obj, int eve, ApiContext context);
        Task<IEnumerable<objParamDTO>> GetValueFactor(string lMasterlist, int objectid, ApiContext context);
        Task<BillingConfigDTO> GetBillingById(decimal billingconfigid, ApiContext context);
        //IEnumerable<CustomersDTO> SearchCustomer(CustomersDTO customersDTO);
        Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext context);
        Task<CustomersDTO> ModifyCustomer(CustomersDTO customerDto, ApiContext Context);
        Task<InvoiceConfigDTO> ModifyInvoice(InvoiceConfigDTO invoiceData, ApiContext Context);

        Task<IEnumerable<CustomersDTO>> SearchCustomer(decimal customerId, ApiContext apiContext);
        Task<IQueryable<String>> GetEventMapping(int mappingid, ApiContext context);
        Task<List<PaymentDTO>> CreatePayment(PaymentListDTO paymentDto, ApiContext context);
        Task<IEnumerable<PaymentHistoryDTO>> GetPaymentByInvoiceId(int invoiceId, ApiContext context);
        Task<IEnumerable<CustomerSearchDTO>> CustomerSearch(CustomerSearchDTO customersDTO, ApiContext context);
        Task<CustomerResponse> CustomerNamevalidation(string Name, ApiContext apiContext);
        Task<CustomerConfigDTO> CreateCustomerConfig(CustomerConfigDTO configDTO, ApiContext Context);
        Task<CustomerConfigDTO> UploadCustConfigImage(CustomerConfigDTO contractimg, ApiContext apiContext);
        Task<PaymentDTO> UpdatePaymentStatus(PaymentDTO pay, ApiContext Context);
        Task<IEnumerable<objParamDTO>> GetAllEventMapping(ApiContext context);
        Task<IEnumerable<ddDTO>> GetMasterForLocation(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext);
        Task<BillingEventResponseDTO> GetBillingItemizedDetailsAsync(int EventMappingId, InvoiceRequest invoiceRequest, ApiContext apiContext);
        Task<CustomersDTO> UploadCustLogo(CustomersDTO CustomerLogo, ApiContext apiContext);
        Task<InvoiceConfigDTO> CreateInvoice(InvoiceConfigDTO invoiceConfig, ApiContext apiContext);
        Task<IEnumerable<InvoiceConfigHistory>> GetInvoiceConfigHistory(ApiContext apiContext);
        Task<ContractDTO> CreateContract(ContractDTO contract, ApiContext apiContext);
        Task<IEnumerable<ContractHistoryDetails>> GetContractHistory(decimal customerId, ApiContext apiContext);
        Task<ContractDocDTO> UploadFiles(ContractDocDTO contractDoc, ApiContext apiContext);
        Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceHistory(InvoiceContractSearch invoiceContractSearch, ApiContext apiContext);
        Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceForCustomer(InvoiceCustSearch invoiceCustSearch, ApiContext apiContext);
        Task<InvoiceConfigDTO> CreateInvoiceConfig(InvoiceConfigDTO invoiceConfig, ApiContext apiContext);
        Task<InvoicePenaltyDTO> CreateRegenerateInvoice(InvoicePenaltyDTO invoicePenalty, ApiContext apiContext);
        Task<InvoiceDTO> SearchInvoice(InvoiceDTO invoiceDto, ApiContext apiContext);
        Task<InvoiceResponse> GenerateInvoiceAsync(InvoiceRequest invoiceRequest, ApiContext apiContext);
        Task<IEnumerable<ContractDocDTO>> DocumentView(decimal ContractId, ApiContext apiContext);

        // For Accounting 
        Task<IEnumerable<CustomersDTOS>> GetCustomerDetails(ApiContext context);
        Task<IEnumerable<EventMappingModel>> GetEventMapDetails(ApiContext context);
        Task<IEnumerable<EventObjParamMapping>> GetEventObjectParameter(ApiContext context);
        Task<IEnumerable<ObjectsDTO>> GetObjectParameter(ApiContext context);

        //For CP
        Task<CustomersDTO> GetCustProvisioningDetailsAsync(decimal customerId, ApiContext apiContext);

        Task<dynamic> GetBillingEntries(decimal customerId, String EventType, ApiContext apiContext);

    }

}
