using inube.Services.Notification.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateDemo.Models
{
    public class ProductApiModel
    {
        public ProductApiModel()
        {
            numberOfApi = new List<ApiMethods>();
            methodsCalls = new List<MethodsCall>();
        }
        public string PName { get; set; }
        public List<ApiMethods> numberOfApi { get; set; }
        public List<MethodsCall> methodsCalls { get; set; }
        public bool IsAwsS3Save { get; set; }
        public EmailRequest EmailTest { get; set; }
    }
    public class ApiMethods
    {
        public string SLNo { get; set; }
        public string methodName { get; set; }
      
    }
    public class MethodsCall
    {

        public MethodsCall()
        {
            //uRLLinkModels = new List<URLLinkModel>();
            urlParams = new List<UrlParams>();
            uRLLinkModels = new List<URLLinkModel>();
            dataParams = new List<DataParams>();
            Response = new List<Response>();
           
            methodTypeModels = new List<MethodTypeModel>();
        }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<URLLinkModel> uRLLinkModels { get; set; }
        public List<UrlParams> urlParams { get; set; }
        public List<DataParams> dataParams { get; set; }
        public List<Response> Response { get; set; }
        public SampleCallModel SampleCallModel { get; set; }
        public List<MethodTypeModel> methodTypeModels { get; set; }
        public string PolicyRequest { get; set; }
        public string PolicyType { get; set; }
    }
    public class URLLinkModel
    {
        public string TestLink { get; set; }
        public string ProductionLink { get; set; }
    }
    public class MethodTypeModel
    {
        public string Type { get; set; }
    }

    public class UrlParams
    {
        public string ParamsType { get; set; }
    }
    public class DataParams
    {
        public string Field { get; set; }
        public string DataType { get; set; }
        public string IsRequired { get; set; }
        public string Description { get; set; }
    }
    public class Response
    {
        public string ResponseType { get; set; }
        public string code { get; set; }
        public string Content { get; set; }
    }
    public class SampleCallModel
    {
        
       
        public string Email { get; set; }
        public int MobileNumber { get; set; }
        public string PartnerName { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string InsuredReference { get; set; }
        public string InsuredName { get; set; }
        public int EventID { get; set; }
        public string PolicyDuration { get; set; }
        public int RechargeAmount { get; set; }
        public DateTime PolicyStartDate { get; set; }
        public DateTime PolicyEndDate { get; set; }
        public int BusinessTypeId { get; set; }
        public int PolicyStatusId { get; set; }
        public string ProposerReference { get; set; }
        public string ProposerName { get; set; }
        public DateTime PolicyDate { get; set; }


    }
}
