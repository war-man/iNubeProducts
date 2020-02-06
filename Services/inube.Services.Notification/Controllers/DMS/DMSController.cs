
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
//using System.Web.Script.Serialization;

namespace inube.Services.Notification.Controllers.DMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DMSController : ControllerBase
    {
        private readonly IDMSService _dMSService;

        public DMSController(IDMSService dMSService)
        {
            _dMSService = dMSService;
        }
        [HttpPost("[action]")]
        public IActionResult Documentupload()
        {
            _dMSService.Documentupload(Request);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> SearchParam(string tagName,string tagValue)
        {
            var resp = await _dMSService.SearchParam(tagName, tagValue);
            return Ok(resp);
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

        [HttpPost]
        public IDictionary<string, string> Paytm()
        {
          //  Dictionary<String, String> paytmParams = new Dictionary<String, String>();
            var MId = "AZyAhR11147908974732";
            var email = "889610bkm@gmail.com";
            var mob = "6363432402";
            var mKey = "8UYwJj@2JCJBTYR3";
            var Ammount = "1.00";
            var orderId = "ORD1001";
            var WEBSITE = "WEBSTAGING";
            var callBackUrl = "http://localhost:53000//api/DMS/recievechecksum";
            var INDUSTRY_TYPE_ID = "Retail";
            var CHANNEL_ID = "WEB";
            var MOBILE_NO = "898989987665";
            var CUST_ID = "101";




            Dictionary<String, String> paytmParams = new Dictionary<String, String>();

            /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
            paytmParams.Add("MID", MId);

            ///* Find your WEBSITE in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
            paytmParams.Add("WEBSITE", WEBSITE);


            paytmParams.Add("INDUSTRY_TYPE_ID", INDUSTRY_TYPE_ID);

            paytmParams.Add("CHANNEL_ID", CHANNEL_ID);

            /* Enter your order id which needs to be check status for */
            paytmParams.Add("ORDER_ID", orderId);





            ///* customer's mobile number */
            paytmParams.Add("MOBILE_NO", MOBILE_NO);

            ///* customer's email */
            paytmParams.Add("EMAIL", email);

            /**
            * Amount in INR that is payble by customer
            * this should be numeric with optionally having two decimal points
*/
            paytmParams.Add("TXN_AMOUNT", Ammount);

            paytmParams.Add("CALLBACK_URL", callBackUrl);
            paytmParams.Add("CUST_ID", CUST_ID);
                

            String checksum = CheckSum.GenerateCheckSum(mKey, paytmParams);


            paytmParams.Add("CHECKSUMHASH", checksum);

           // string paytmURL = "https://securegw-stage.paytm.in/theia/processTransaction?orderid=" + orderId;


          //  this.Response.Redirect("https://securegw-stage.paytm.in/order/process?ORDER_ID=" + orderId + "&WEBSITE="+ WEBSITE + "&MID="+ MId + "&INDUSTRY_TYPE_ID="+INDUSTRY_TYPE_ID + "&CHANNEL_ID="+ CHANNEL_ID + "&CUST_ID="+CUST_ID+ "&MOBILE_NO"+MOBILE_NO+ "&EMAIL="+ email + "&TXN_AMOUNT="+ Ammount + "&CALLBACK_URL="+ callBackUrl + "&CHECKSUMHASH="+checksum+ "&MERC_UNQ_REF=MRC1001");

           
            return paytmParams;




            //String paytmChecksum = "";

            /* Create a Dictionary from the parameters received in POST */
           // Dictionary<String, String> paytmParams = new Dictionary<String, String>();
////            foreach (string key in paytmParams.Keys)
////            {
////                if (key.Equals("CHECKSUMHASH"))
////                {
////                    paytmChecksum = paytmParams[key];
////                }
////                else
////                {
////                    paytmParams.Add(key.Trim(), Request.Form[key]);
////                }
////            }

////            /**
////            * Verify checksum
////            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
////*/
////            bool isValidChecksum = CheckSum.VerifyCheckSum(mKey, paytmParams, paytmChecksum);
////            if (isValidChecksum)
////            {
////              //  Response.println("Checksum matched");
////            }
////            else
////            {
////              //  Response.Write("Checksum Mismatched");
////            }




            //validationg the checksum



            /* put generated checksum value here */
            

            /* prepare JSON string for request */
            //string post_data = JsonConvert.SerializeObject(paytmParams, Formatting.Indented);
            //try
            //{
            //    Response.Redirect("https://securegw-stage.paytm.in/order/process?" + post_data);
            //}
            //catch(Exception E)
            //{ }

            


            //// String post_data = new JavaScriptSerializer().Serialize(paytmParams);

            /////* for Staging */
            ////String url = "https://securegw-stage.paytm.in/order/status";

            /////* for Production */
            ////// String url = "https://securegw.paytm.in/order/status";

            //try
            //{
            //    HttpWebRequest connection = (HttpWebRequest)WebRequest.Create(url);
            //    connection.Headers.Add("ContentType", "application/json");
            //    connection.Method = "POST";
            //    using (StreamWriter requestWriter = new StreamWriter(connection.GetRequestStream()))
            //    {
            //        requestWriter.Write(post_data);
            //    }
            //    string responseData = string.Empty;
            //    using (StreamReader responseReader = new StreamReader(connection.GetResponse().GetResponseStream()))
            //    {
            //        responseData = responseReader.ReadToEnd();
            //    }
            //    // Response.Write(responseData);
            //    // Response.Write("Request: " + post_data);

            //   // Response.Redirect("https://securegw-stage.paytm.in/order/process?" + responseData);
            //    return Redirect("https://securegw-stage.paytm.in/order/process?"+ responseData);


            //}
            //catch (Exception ex)
            //{
            //   // Response.Write(ex.Message.ToString());
            //}




            // return View("PaymentPage");

            //  return outputHtml;
            

        }
        
        [HttpPost]
        public void recievechecksum()
        {
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
        }
    }




}
