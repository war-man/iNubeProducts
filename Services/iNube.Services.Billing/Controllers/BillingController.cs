
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using iNube.Services.Billing.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;
using System;
using iNube.Services.Billing.Helpers;
using iNube.Services.Billing.Controllers.Billing.BillingService;

namespace iNube.Services.Billing.Controllers.Billing
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class BillingController : BaseApiController
    {
        public IBillingService _billingService;

        public BillingController(IBillingService billingService)
        {
            _billingService = billingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMaster(string lMasterlist, bool isFilter = true)
        {
            try
            {
                var commonTypesDTOs = await _billingService.GetMaster(lMasterlist, Context);

                if (isFilter)
                {
                    var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                    return Ok(masterdata);
                }
                return Ok(commonTypesDTOs);
            }
            catch (Exception ex)
            {

                var response = new ResponseStatus() { Status = BusinessStatus.Ok, ResponseMessage = ex.ToString() };
                return Ok(response);
            }
           
        }

        [HttpGet]
        public async Task<IActionResult> GetObjects(string lMasterlist, bool isFilter = true)
        {
            var objectval =await _billingService.GetObjects(lMasterlist, Context);
            //if (isFilter)
            //{
            //    var objdata = objectval.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            //    return Ok(objdata);
            //}

            return Ok(objectval);
        }
        [HttpGet]
        public async Task<IActionResult> GetEvents(string lMasterlist, int obj, bool isFilter = true)
        {
            var eventval =await _billingService.GetEvents(lMasterlist, obj, Context);

            return Ok(eventval);
        }

     
       [HttpGet]
        public async Task<IActionResult> GetValueFactor(string lMasterlist, int objevemappingid, bool isFilter = true)
        {
            var eventval =await _billingService.GetValueFactor(lMasterlist, objevemappingid, Context);

            return Ok(eventval);
        }
        
            [HttpGet]
        public async Task<IActionResult> GetAllEventMapping()
        {
            var valueFactor =await _billingService.GetAllEventMapping(Context);

            return Ok(valueFactor);
        }

        [HttpGet]
        public async Task<IActionResult> GetMasterData(string sMasterlist)
        {
            var commonTypesDTOs = await _billingService.GetMasterForLocation(sMasterlist, Context);
           
               // var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            return Ok(commonTypesDTOs);
           
            
        }

        // GET: api/Product/GetLocation
        [HttpGet]
        public async Task<IActionResult> GetLocation(string locationType, int parentID)
        {
            var locationData =await _billingService.GetLocation(locationType, parentID, Context);
            return Ok(locationData);
        }

        [HttpPost]
        public async Task<IActionResult> SaveBillingDetails([FromBody]BillingConfigDTO billingitem)
        {
            var response =await _billingService.SaveBillingDetails(billingitem, Context);
            // return ServiceResponse(response);
            return Ok(response);
        }

        //[HttpDelete]
        //public async Task<IActionResult> DeleteBilling(int BillingID)
        //{
        //    _billingService.Delete(BillingID, Context);
        //    return Ok();
        //}

        // PUT: api/Product/ModifyProduct
        [HttpPut]
        public async Task<IActionResult> ModifyBilling(int BillingId, BillingConfigDTO objBilling)
        {
            objBilling.BillingConfigId = BillingId;
            await _billingService.ModifyBilling(objBilling, Context);
            return Ok();

        }

        [HttpGet]
        public async Task<IActionResult> GetHistory(decimal contractid)
        {
            var history =await _billingService.GetHistry(contractid, Context);
            return Ok(history);
        }
        [HttpPost]
        public async Task<IActionResult> SearchBilling(BillingSearchDTO billingSearchDTO)
        {
            var search =await _billingService.SearchBilling(billingSearchDTO, Context);
            return Ok(search);
        }

        [HttpPost]
        public async Task<IActionResult> SaveBillingItemDetails(BillingIDetailDTO billingitemdetail)
        {
            var bilingdetaildto =await _billingService.SaveBillingItemDetails(billingitemdetail, Context);
            return Ok(bilingdetaildto);
        }

        [HttpPost]
        public async Task<IActionResult> SearchContract([FromBody]ContractDTO contractdto)
        {
            var Contractdata =await _billingService.SearchContract(contractdto, Context);
            return Ok(Contractdata);
        }

        [HttpPost]
        public async Task<IActionResult> SearchContractById(int contractid)
        {
             var Contractdata =await _billingService.SearchContractById(contractid, Context);
             return Ok(Contractdata);
           
        }

        [HttpGet]
        public async Task<IActionResult> GetObjectEvent(int obj, int eve)
        {
            var objeve =await _billingService.GetObjectEventMapping(obj, eve, Context);
            return Ok(objeve);
        }

        [HttpGet]
        public async Task<IActionResult> GetEventMapping(int mappingid)
        {
            var objeve =await _billingService.GetEventMapping(mappingid, Context);
            return Ok(objeve);
        }
        
        [HttpPost]
        public async Task<IActionResult> SaveCustomerAsync([FromBody]CustomersDTO Customerdto)
        {
            //var response =await _billingService.SaveCustomerAsync(Customerdto, Context);
            //return Ok(response);

            try
            {
                //var files = Request.Form.Files;
                //var filename = "";
                var response = await _billingService.SaveCustomerAsync(Customerdto, Context);
                switch (response.Status)
                {
                    case BusinessStatus.InputValidationFailed:
                        return Ok(response);
                    case BusinessStatus.Created:
                        return Ok(response);
                    case BusinessStatus.UnAuthorized:
                        return Unauthorized();
                    case BusinessStatus.PreConditionFailed:
                        return Ok(response);
                    default:
                        return Forbid();
                }
                //  return Ok(response);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomerById(decimal Customerid)
        {
            var customerdata =await _billingService.GetCustomerById(Customerid, Context);
            return Ok(customerdata);
        }
        [HttpPost]
        public async Task<IActionResult> ModifyCustomer(CustomersDTO customerDto)
        {
            var customerdata =await _billingService.ModifyCustomer(customerDto, Context);
            return Ok(customerdata);
        }
        
        [HttpPost]
        public async Task<IActionResult> ModifyInvoice(InvoiceConfigDTO invoiceData)
        {
            var invoicdedata =await _billingService.ModifyInvoice(invoiceData, Context);
            return Ok(invoicdedata);
        }
        [HttpPost]
        public async Task<IActionResult> GetBillingById(decimal billingconfigid)
        {
            var Billingdata =await _billingService.GetBillingById(billingconfigid, Context);
            return Ok(Billingdata);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody]PaymentListDTO paymentDto)
        {
            var PaymentData =await _billingService.CreatePayment(paymentDto, Context);
            return Ok(PaymentData);
        }
       
        [HttpPost]
        public async Task<IActionResult> GetPaymentByInvoiceId(int invoiceId)
        {
            var PaymentData =await _billingService.GetPaymentByInvoiceId(invoiceId, Context);
            return Ok(PaymentData);
        }       
        [HttpPost]
        public async Task<IActionResult> CustomerSearch(CustomerSearchDTO customersDTO)
        {
            var searchdata =await _billingService.CustomerSearch(customersDTO, Context);
            return Ok(searchdata);
        }
       
        [HttpGet]
        public async Task<IActionResult> CustomerNamevalidation(String Name)
        {
            var response = await _billingService.CustomerNamevalidation(Name, Context);

            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                case BusinessStatus.Ok:
                    return Ok(response);
                default:
                    return Forbid();
            }


        }
        [HttpPost]
        public async Task<IActionResult> CreateCustomerConfig(CustomerConfigDTO configDTO)
        {
            var configdata =await _billingService.CreateCustomerConfig(configDTO, Context);
            return Ok(configdata);
        }
        [HttpPost]
        public async Task<IActionResult> UpdatePaymentStatus(PaymentDTO pay)
        {
            var paydata =await _billingService.UpdatePaymentStatus(pay, Context);
            return Ok(paydata);
        }
        //[AllowAnonymous]
        //[HttpPost("[action]")]
        [HttpPost]
        public async Task<IActionResult> UploadCustConfigImage(decimal ConfigId)
        {
           // var Response = new ResponseStatus() { Status = BusinessStatus.Created };
           
                long size = 0;
                var files = Request.Form.Files;
                var filename = "";

                foreach (var file in files)
                {
                    filename = ContentDispositionHeaderValue
                                    .Parse(file.ContentDisposition)
                                    .FileName
                                    .Trim('"');
                    size += file.Length;
                    var fileBasepath = System.IO.Directory.GetCurrentDirectory();
                    string filePath = fileBasepath + "" + filename;

                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                        fs.Close();
                        byte[] bytes = System.IO.File.ReadAllBytes(filePath);

                    //CustConfigImg contractimg = new CustConfigImg();
                    CustomerConfigDTO contractimg = new CustomerConfigDTO();

                        contractimg.Image = bytes;
                        //claimdoc.DocumentType = 
                        contractimg.CustConfigId = ConfigId;
                        var fileResult =await _billingService.UploadCustConfigImage(contractimg, Context);
                    }

                }

            return Ok(null);
        }

        [HttpPost]
        public async Task<IActionResult> UploadCustLogo(decimal CustomerId)
        {
            // var Response = new ResponseStatus() { Status = BusinessStatus.Created };

            long size = 0;
            var files = Request.Form.Files;
            var filename = "";

            foreach (var file in files)
            {
                filename = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
                size += file.Length;
                var fileBasepath = System.IO.Directory.GetCurrentDirectory();
                string filePath = fileBasepath + "" + filename;

                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                    fs.Close();
                    byte[] bytes = System.IO.File.ReadAllBytes(filePath);

                    //CustConfigImg contractimg = new CustConfigImg();
                    CustomersDTO customerimg = new CustomersDTO();

                    customerimg.Logo = bytes;
                    //claimdoc.DocumentType = 
                    customerimg.CustomerId = CustomerId;
                    var fileResult =await _billingService.UploadCustLogo(customerimg, Context);
                }

            }

            return Ok(null);
        }








        // Create Invoice Service
        [HttpPost]
        public async Task<IActionResult> CreateInvoiceConfig([FromBody]InvoiceConfigDTO invoiceConfigdto)
        {
            var tbl_invoice = await _billingService.CreateInvoiceConfig(invoiceConfigdto, Context);
            return Ok(tbl_invoice);
        }

        // Get Billing Details
        [HttpGet]
        public async Task<IActionResult> GetInvoiceConfigHistory()
        {
            var history = await _billingService.GetInvoiceConfigHistory(Context);
            return Ok(history);
        }

        // Create Create Contract
        [HttpPost]
        public async Task<IActionResult> CreateContract([FromBody]ContractDTO contractdto)
        {
            var tbl_contract = await _billingService.CreateContract(contractdto, Context);
            return Ok(tbl_contract);
        }

        // Get Contract Details
        [HttpGet]
        public async Task<IActionResult> GetContractHistory(decimal customerId)
        {
            var history = await _billingService.GetContractHistory(customerId,Context);
            return Ok(history);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRegenerateInvoice([FromBody]InvoicePenaltyDTO invoicePenalty)
        {
            var tbl_invoice = await _billingService.CreateRegenerateInvoice(invoicePenalty, Context);
            return Ok(tbl_invoice);
        }

        [HttpPost]
        public async Task<IActionResult> SearchCustomer(decimal customerId)
        {
            var response =await  _billingService.SearchCustomer(customerId,Context);
            return Ok(response);
          
        }


        //[AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> GenerateInvoiceAsync([FromBody]InvoiceRequest invoiceRequest)
        {
            var response = await _billingService.GenerateInvoiceAsync(invoiceRequest, Context);
            return ServiceResponse(response);
        }


        //Create Search Invoice by InvoiceID
        [HttpPost]
        public async Task<IActionResult> SearchInvoice([FromBody]InvoiceDTO invoiceDto)
        {
            var tbl_invoice = await _billingService.SearchInvoice(invoiceDto, Context);
            return Ok(tbl_invoice);
        }

        [HttpPost]
        public async Task<IActionResult> GetSearchInvoiceHistory([FromBody] InvoiceContractSearch invoiceContractSearch)
        {
            var history = await _billingService.GetSearchInvoiceHistory(invoiceContractSearch, Context);
            return Ok(history);
        }


        [HttpPost]
        public async Task<IActionResult> GetSearchInvoiceForCustomer(InvoiceCustSearch invoiceCustSearch)
        {
            var history = await _billingService.GetSearchInvoiceForCustomer(invoiceCustSearch, Context);
            return Ok(history);
        }

        //Get Billing Customer Name for Accounting 
        [HttpGet]
        public async Task<IActionResult> GetCustomerName()
        {
            var billingDtos = await _billingService.GetCustomerDetails(Context);
            return Ok(billingDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetObjectParameter()
        {
            var billingDtos = await _billingService.GetObjectParameter(Context);
            return Ok(billingDtos);
        }
        
        //Get Mapping Details For Accouting 
        [HttpGet]
        public async Task<IActionResult> GetEventMapDetails()
        {
            var accountListData = await _billingService.GetEventMapDetails(Context);
            return Ok(accountListData);
        }
        //Get Event Parameter Details
        [HttpGet]
        public async Task<IActionResult> GetEventMapParamDetails()
        {
            var accountListData = await _billingService.GetEventObjectParameter(Context);
            return Ok(accountListData);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UploadFiles(int contractId)
        {
            var Response = new ResponseStatus() { Status = BusinessStatus.Created };
            try
            {
                long size = 0;
                var files = Request.Form.Files;
                var filename = "";

                foreach (var file in files)
                {
                    filename = ContentDispositionHeaderValue
                                    .Parse(file.ContentDisposition)
                                    .FileName
                                    .Trim('"');
                    size += file.Length;
                    var fileBasepath = System.IO.Directory.GetCurrentDirectory();
                    string filePath = fileBasepath + "" + filename;

                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                        fs.Close();
                        byte[] bytes = System.IO.File.ReadAllBytes(filePath);

                        ContractDocDTO contractDoc = new ContractDocDTO();

                        contractDoc.DocumentName = filename;
                        contractDoc.DocumentStr = bytes;
                        //claimdoc.DocumentType = 
                        contractDoc.ContractId = contractId;
                        var fileResult = await _billingService.UploadFiles(contractDoc, Context);
                    }

                }
            }
            catch(Exception ex)
            {
                Response.Status = BusinessStatus.Error;
                Response.ResponseMessage = ex.Message;
            }
            return ServiceResponse(Response);
            }

        [HttpGet]
        public async Task<IActionResult> DocumentView (decimal ContractId)
        {
            var document = await _billingService.DocumentView(ContractId,Context);
            return Ok(document);
        }

      
        [HttpPost]
        public async Task<IActionResult> GetBillingItemizedDetailsAsync(int EventMappingId, InvoiceRequest invoiceRequest)
        {
            var eventval = await _billingService.GetBillingItemizedDetailsAsync(EventMappingId,invoiceRequest, Context);
            return Ok(eventval);
        }
        [HttpGet]
        public async Task<IActionResult> GetCustProvisioningDetailsAsync(decimal customerId)
        {
            var document = await _billingService.GetCustProvisioningDetailsAsync(customerId, Context);
            return Ok(document);
        }
		
		[HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok , ResponseMessage="Working as expected"};
            return Ok(response);
        }
    }
}
