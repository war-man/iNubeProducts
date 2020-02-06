using System.Threading.Tasks;
using iNube.Services.Lead.Models;
using iNube.Services.Quotation.Controllers.Quotation.QuotationService;
using iNube.Services.Quotation.Models;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Mvc;

namespace iNube.Services.Quotation.Controllers.Quotation
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class QuotationController : BaseApiController
    {
        public IQuotationService _quotationService;





        public QuotationController(IQuotationService quotationService)
        {
            _quotationService = quotationService;
        }


        [HttpPost]
        public async Task<IActionResult> QuotationSave(LifeQuoteDTO lifeQuoteDTO)
        {
            var response = await _quotationService.SaveQuote(lifeQuoteDTO);
            return Ok(response);
        }



        // GET: api/LoadProspectInfo
        [HttpGet]
        public async Task<IActionResult> LoadProspectInfo(int ContactId)
        {

            var response = await _quotationService.LoadProspectInfo(ContactId);

            return Ok(response);
        }



        // GET: api/QuotationPool
        [HttpGet]
        public  IActionResult QuotationPool()
        {

            var response = _quotationService.QuotationPool();

            return Ok(response);
        }



        // GET: api/LoadNeedAnalysis
        [HttpGet]
        public IActionResult LoadNeedAnalysis()
        {   

           // var response =  _quotationService.LoadNeedAnalysis();

            return Ok();
        }


        // GET: api/LoadPreviousInsuranceDetails
        [HttpGet]
        public IActionResult LoadPreviousInsuranceDetails()
        {

            // var response =  _quotationService.LoadPreviousInsuranceDetails();

            return Ok();
        }


        // GET: api/LoadProductDetails
        [HttpGet]
        public IActionResult LoadProductDetails()
        {

            // var response =  _quotationService.LoadProductDetails();

            return Ok();
        }


        //POST: api/SaveProspectInfo
        [HttpPost]
        public IActionResult SaveProspectInfo(LeadDTO leadDTO)
        {
           _quotationService.SaveProspectInfo(leadDTO);
            return Ok();
        }



        //POST:api/CreateQuote
        [HttpPost]
        public IActionResult CreateQuote(LifeQqDTO lifeQq)
        {
            var response = _quotationService.CreateQuote(lifeQq);

            return Ok();
        }

        // GET: api/Quotation/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Quotation
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Quotation/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        [HttpPost]
        public async Task<IActionResult> EmailQuotation([FromBody]QuotePoolDTO quotePoolDTO)
        {
            var response = await _quotationService.QuotationPdfGeneration(quotePoolDTO, Context);
            return ServiceResponse(response);
        }

    }
}
