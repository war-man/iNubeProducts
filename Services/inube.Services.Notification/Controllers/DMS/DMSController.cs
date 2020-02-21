
using inube.Services.Notification.Controllers.DMS.DMSService;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Paytm;
using Paytm.Checksum;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using MongoDB.Bson.IO;
using System.Xml;
using iNube.Utility.Framework.Notification;
using Microsoft.Extensions.Configuration;
using inube.Services.Notification.Models;
using System.Text;
using Microsoft.AspNetCore.Http;
using System.Web;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Authorization;
//using AutoMapper.Configuration;
//using System.Web.Script.Serialization;

namespace inube.Services.Notification.Controllers.DMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DMSController : BaseApiController
    {
        private readonly IDMSService _dMSService;
       private readonly IEmailService _emailService;
       private readonly IConfiguration _configuration;

        public DMSController(IDMSService dMSService ,IEmailService emailService,
        IConfiguration configuration)
        {
            _dMSService = dMSService;
            _emailService = emailService;
            _configuration = configuration;
        }
        [HttpPost("[action]")]
        public IActionResult Documentupload(string tagName, string tagValue)
        {
           var response= _dMSService.Documentupload(Request,tagName,tagValue);
            return ServiceResponse(response);
           // return Ok();
        }
        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult MobileDocumentupload(string tagName, string tagValue)
        {
            var response = _dMSService.Documentupload(Request, tagName, tagValue);
            return ServiceResponse(response);
            // return Ok();
        }

        [HttpPost("[action]")]
        public List<DMSResponse> DocumentSimpleupload(ImageDTO fileUploadDTO)
        {
           var response= _dMSService.DocumentSimpleupload(fileUploadDTO);

            return response;
        }

        [HttpGet]
        public async Task<IActionResult> SearchParam(string tagName,string tagValue)
        {
            var resp = await _dMSService.SearchParam(tagName, tagValue);
            return Ok(resp);
        }
        [HttpGet]
        public async Task<IActionResult> DownloadView(string id)
        {
            var bytes = await _dMSService.DownloadView(id);
            var result = new HttpResponseMessage(HttpStatusCode.OK);
            var filememstream = new MemoryStream(bytes.data);
            result.Content = new StreamContent(filememstream);
            var headers = result.Content.Headers;
            headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            headers.ContentDisposition.FileName = "DmsDoc.pdf";
            headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            headers.ContentLength = filememstream.Length;
            //var response = File(filememstream, "application/octet-stream", bytes.fileName);
            var response = bytes;
            return Ok(response);

        }

        [HttpGet]
        public async Task<IActionResult> DownloadFile(string id)
        {
            var bytes = await _dMSService.DownloadFile(id);
            var result = new HttpResponseMessage(HttpStatusCode.OK);
            var filememstream = new MemoryStream(bytes.data);
            result.Content = new StreamContent(filememstream);
            var headers = result.Content.Headers;
            headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            headers.ContentDisposition.FileName = "DmsDoc.pdf";
            headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            headers.ContentLength = filememstream.Length;
            return File(filememstream, "application/octet-stream", bytes.fileName);
            

        }
        [HttpGet]
        public IActionResult DeleteDocument(string id)
        {
            _dMSService.DeleteDocument(id);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> AddTags(string id, string tagName, string tagvalue)
        {
            var resp = await _dMSService.AddTags(id, tagName, tagvalue);
            return Ok(resp);
        }
  
        [HttpGet]
        public Dictionary<string,string>  PaytmPayment(decimal policyId,decimal Amount,string mobileNumber)
        {
            Dictionary<String, String> paytmParams = new Dictionary<String, String>();

            paytmParams.Add("MID", "AZyAhR11147908974732");

            paytmParams.Add("WEBSITE", "WEBSTAGING");

            paytmParams.Add("INDUSTRY_TYPE_ID", "Retail");



            paytmParams.Add("CHANNEL_ID", "WEB");

            Random r = new Random();
            int rInt = r.Next(0, 100); 

            //var orderId = rInt.ToString();

            paytmParams.Add("ORDER_ID", policyId.ToString());

            int CUstInt = r.Next(0, 100);

            var CustId = rInt.ToString();

            paytmParams.Add("CUST_ID", CustId);

            paytmParams.Add("MOBILE_NO", mobileNumber);

            paytmParams.Add("EMAIL", "889610bkm@gmail.com");

            paytmParams.Add("TXN_AMOUNT", Amount.ToString());

            paytmParams.Add("CALLBACK_URL", "https://inubeservicesnotification.azurewebsites.net/api/DMS/recievechecksum");

            //  var url = "https://inubeservicesnotification.azurewebsites.net/api/DMS/recievechecksum";
            //var url ="http://localhost:53000/api/DMS/recievechecksum"
            
            String checksum = CheckSum.GenerateCheckSum("8UYwJj@2JCJBTYR3", paytmParams);

            paytmParams.Add("CHECKSUMHASH", checksum);



            /* for Staging */

           // String url = "https://securegw-stage.paytm.in/order/process";

            paytmParams.Add("URL", "https://securegw-stage.paytm.in/order/process");
            return paytmParams;
        }

        [HttpPost]
        public Dictionary<String, String> recievechecksum()
        {
           var orderid = 10;
            var cutomerid = 20;
            EmailRequest emailTest = new EmailRequest();
            emailTest.Message = "HI";
            emailTest.PartnerEmail = "suyash.pandey@inubesolutions.com";
            emailTest.Subject = "Paytm";
            emailTest.To = "brajesh.kumar@inubesolutions.com";
            emailTest.IsAttachment = false;


            TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
            templateHelper.SendEmailAsync(emailTest);

            String paytmChecksum = "";
            Dictionary<String, String> paytmParams = new Dictionary<String, String>();
            foreach (string key in Request.Form.Keys)
            {
                if (key.Equals("CHECKSUMHASH"))
                {
                    paytmChecksum = Request.Form[key];
                }
                else
                {
                    paytmParams.Add(key.Trim(), Request.Form[key]);
                }
            }
            string kk = "";
            return paytmParams;
        }
    }




}
