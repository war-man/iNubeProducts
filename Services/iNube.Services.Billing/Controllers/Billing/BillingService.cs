using AutoMapper;
using iNube.Services.Billing.Controllers.Billing.IntegrationServices;
using iNube.Services.Billing.Entities;
using iNube.Services.Billing.Models;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace iNube.Services.Billing.Controllers.Billing.BillingService
{
    public interface IBillingService
    {
        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext context);
        Task<BillingConfigDTO> SaveBillingDetails(BillingConfigDTO billingitem, ApiContext context);
       // void Delete(int BillingID, ApiContext context);
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

        //For Cusomer_Provisioning
        Task<CustomersDTO> GetCustProvisioningDetailsAsync(decimal customerId, ApiContext apiContext);



    }
    public class BillingService : IBillingService
    {
        private MICABIContext _context;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private readonly IConfiguration _configuration;
        private readonly Func<string, IBillingProductService> _productService;

        public BillingService(Func<string, IBillingProductService> productService,MICABIContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            _productService = productService;
        }

        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext context)
        {
            return await _productService(context.ProductType).GetMaster(lMasterlist, context);
        }

        public async Task<BillingConfigDTO> SaveBillingDetails(BillingConfigDTO billingitem, ApiContext context)
        {
            return await _productService(context.ProductType).SaveBillingDetails(billingitem, context);
        }

        //public void Delete(int BillingID, ApiContext context)
        //        {
        //            return _productService(context.ProductType).Delete(BillingID, context);
        //        }

        public async Task<BillingConfigDTO> ModifyBilling(BillingConfigDTO objBilling, ApiContext context)
        {
            return await _productService(context.ProductType).ModifyBilling(objBilling, context);
        }
        public async Task<IEnumerable<HistoryDTO>> GetHistry(decimal contractid, ApiContext context)
        {
            return await _productService(context.ProductType).GetHistry(contractid, context);
        }
        public async Task<IEnumerable<BillingConfigDTO>> SearchBilling(BillingSearchDTO billingSearchDTO, ApiContext context)
        {
            return await _productService(context.ProductType).SearchBilling(billingSearchDTO, context);
        }
        public async Task<List<BillingItemDetailDTO>> SaveBillingItemDetails(BillingIDetailDTO billingitemdetail, ApiContext context)
        {
            return await _productService(context.ProductType).SaveBillingItemDetails(billingitemdetail, context);
        }
        public async Task<IEnumerable<ddDTO>> GetObjects(string lMasterlist, ApiContext context)
        {
            return await _productService(context.ProductType).GetObjects(lMasterlist, context);
        }
        public async Task<IEnumerable<ddDTO>> GetEvents(string lMasterlist, int obj, ApiContext context)
        {
            return await _productService(context.ProductType).GetEvents(lMasterlist, obj, context);
        }
        public async Task<IEnumerable<ContractDTO>> SearchContract(ContractDTO contractdto, ApiContext context)
        {
            return await _productService(context.ProductType).SearchContract(contractdto, context);
        }
        public async Task<IEnumerable<ContractDTO>> SearchContractById(int contractid, ApiContext context)
        {
            return await _productService(context.ProductType).SearchContractById(contractid, context);
        }
        public async Task<String> GetObjectEvent(int obj, int eve, ApiContext context)
        {
            return await _productService(context.ProductType).GetObjectEvent(obj, eve, context);
        }
        public async Task<CustomerResponse> SaveCustomerAsync(CustomersDTO Customerdto, ApiContext context)
        {
            return await _productService(context.ProductType).SaveCustomerAsync(Customerdto, context);
        }
        public async Task<List<string>> GetObjectEventMapping(int obj, int eve, ApiContext context)
        {
            return await _productService(context.ProductType).GetObjectEventMapping(obj, eve, context);
        }
        public async Task<IEnumerable<objParamDTO>> GetValueFactor(string lMasterlist, int objectid, ApiContext context)
        {
            return await _productService(context.ProductType).GetValueFactor(lMasterlist, objectid, context);
        }
        public async Task<BillingConfigDTO> GetBillingById(decimal billingconfigid, ApiContext context)
        {
            return await _productService(context.ProductType).GetBillingById(billingconfigid, context);
        }
        //IEnumerable<CustomersDTO> SearchCustomer(CustomersDTO customersDTO);
        public async Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext context)
        {
            return await _productService(context.ProductType).GetCustomerById(Customerid, context);
        }
        public async Task<CustomersDTO> ModifyCustomer(CustomersDTO customerDto, ApiContext Context)
        {
            return await _productService(Context.ProductType).ModifyCustomer(customerDto, Context);
        }
        public async Task<InvoiceConfigDTO> ModifyInvoice(InvoiceConfigDTO invoiceData, ApiContext Context)
        {
            return await _productService(Context.ProductType).ModifyInvoice(invoiceData, Context);
        }

        public async Task<IEnumerable<CustomersDTO>> SearchCustomer(decimal customerId, ApiContext Context)
        {
            return await _productService(Context.ProductType).SearchCustomer(customerId, Context);
        }
        public async Task<IQueryable<String>> GetEventMapping(int mappingid, ApiContext context)
        {
            return await _productService(context.ProductType).GetEventMapping(mappingid, context);
        }
        public async Task<List<PaymentDTO>> CreatePayment(PaymentListDTO paymentDto, ApiContext context)
        {
            return await _productService(context.ProductType).CreatePayment(paymentDto, context);
        }
        public async Task<IEnumerable<PaymentHistoryDTO>> GetPaymentByInvoiceId(int invoiceId, ApiContext context)
        {
            return await _productService(context.ProductType).GetPaymentByInvoiceId(invoiceId, context);
        }
        public async Task<IEnumerable<CustomerSearchDTO>> CustomerSearch(CustomerSearchDTO customersDTO, ApiContext context)
        {
            return await _productService(context.ProductType).CustomerSearch(customersDTO, context);
        }
        public async Task<CustomerResponse> CustomerNamevalidation(string Name, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).CustomerNamevalidation(Name, apiContext);
        }
        public async Task<CustomerConfigDTO> CreateCustomerConfig(CustomerConfigDTO configDTO, ApiContext Context)
        {
            return await _productService(Context.ProductType).CreateCustomerConfig(configDTO, Context);
        }
        public async Task<CustomerConfigDTO> UploadCustConfigImage(CustomerConfigDTO contractimg, ApiContext Context)
        {
            return await _productService(Context.ProductType).UploadCustConfigImage(contractimg, Context);
        }
        public async Task<PaymentDTO> UpdatePaymentStatus(PaymentDTO pay, ApiContext Context)
        {
            return await _productService(Context.ProductType).UpdatePaymentStatus(pay, Context);
        }
        public async Task<IEnumerable<objParamDTO>> GetAllEventMapping(ApiContext context)
        {
            return await _productService(context.ProductType).GetAllEventMapping(context);
        }
        
             public async Task<IEnumerable<ddDTO>> GetMasterForLocation(string lMasterlist, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetMasterForLocation(lMasterlist,apiContext);
        }
        
        public async Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetLocation( locationType,  parentID, apiContext);
        }
        public async Task<BillingEventResponseDTO> GetBillingItemizedDetailsAsync(int EventMappingId, InvoiceRequest invoiceRequest, ApiContext context)
        {
            return await _productService(context.ProductType).GetBillingItemizedDetailsAsync(EventMappingId, invoiceRequest, context);
        }
        public async Task<CustomersDTO> UploadCustLogo(CustomersDTO CustomerLogo, ApiContext context)
        {
            return await _productService(context.ProductType).UploadCustLogo(CustomerLogo, context);
        }

        public async Task<InvoiceConfigDTO> CreateInvoice(InvoiceConfigDTO invoiceConfig, ApiContext context)
        {
            return await _productService(context.ProductType).CreateInvoice(invoiceConfig, context);
        }
        public async Task<IEnumerable<InvoiceConfigHistory>> GetInvoiceConfigHistory(ApiContext context)
        {
            return await _productService(context.ProductType).GetInvoiceConfigHistory(context);
        }
        public async Task<ContractDTO> CreateContract(ContractDTO contract, ApiContext context)
        {
            return await _productService(context.ProductType).CreateContract(contract, context);
        }
        public async Task<IEnumerable<ContractHistoryDetails>> GetContractHistory(decimal customerId, ApiContext context)
        {
            return await _productService(context.ProductType).GetContractHistory(customerId, context);
        }

        public async Task<ContractDocDTO> UploadFiles(ContractDocDTO contractDoc, ApiContext context)
        {
            return await _productService(context.ProductType).UploadFiles(contractDoc, context);
        }
        public async Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceHistory(InvoiceContractSearch invoiceContractSearch, ApiContext context)
        {
            return await _productService(context.ProductType).GetSearchInvoiceHistory(invoiceContractSearch, context);
        }
        
        public async Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceForCustomer(InvoiceCustSearch invoiceCustSearch, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetSearchInvoiceForCustomer(invoiceCustSearch, apiContext);
        }
        public async Task<InvoiceConfigDTO> CreateInvoiceConfig(InvoiceConfigDTO invoiceConfig, ApiContext context)
        {
            return await _productService(context.ProductType).CreateInvoiceConfig(invoiceConfig, context);
        }
        public async Task<InvoicePenaltyDTO> CreateRegenerateInvoice(InvoicePenaltyDTO invoicePenalty, ApiContext context)
        {
            return await _productService(context.ProductType).CreateRegenerateInvoice(invoicePenalty, context);
        }
        public async Task<InvoiceDTO> SearchInvoice(InvoiceDTO invoiceDto, ApiContext context)
        {
            return await _productService(context.ProductType).SearchInvoice(invoiceDto, context);
        }
        public async Task<InvoiceResponse> GenerateInvoiceAsync(InvoiceRequest invoiceRequest, ApiContext context)
        {
            return await _productService(context.ProductType).GenerateInvoiceAsync(invoiceRequest, context);
        }
        public async Task<IEnumerable<ContractDocDTO>> DocumentView(decimal ContractId, ApiContext context)
        {
            return await _productService(context.ProductType).DocumentView(ContractId, context);
        }

        // For Accounting 
        public async Task<IEnumerable<CustomersDTOS>> GetCustomerDetails(ApiContext context)
        {
            return await _productService(context.ProductType).GetCustomerDetails(context);
        }
        public async Task<IEnumerable<EventMappingModel>> GetEventMapDetails(ApiContext context)
        {
            return await _productService(context.ProductType).GetEventMapDetails(context);
        }
        public async Task<IEnumerable<EventObjParamMapping>> GetEventObjectParameter(ApiContext context)
        {
            return await _productService(context.ProductType).GetEventObjectParameter(context);
        }
        public async Task<CustomersDTO> GetCustProvisioningDetailsAsync(decimal customerId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetCustProvisioningDetailsAsync(customerId,apiContext);
        }
        public async Task<IEnumerable<ObjectsDTO>> GetObjectParameter(ApiContext context)
        {
            return await _productService(context.ProductType).GetObjectParameter(context);
        }

    }
}
