using iNube.Services.Policy.Models;
using System;
using AutoMapper;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using System.Reflection;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Newtonsoft.Json;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading;

namespace iNube.Services.Policy.Controllers.Policy.PolicyServices
{
    public interface IPolicyService
    {
        Task<PolicyResponse> CreatePolicy(dynamic policyDetail, ApiContext apiContext);

        Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext);
        Task<ProposalResponse> CreateProposal(dynamic policyDetail, ApiContext apiContext);
        Task<PolicyResponse> CreatePolicyWithPayment(dynamic policyDetail, ApiContext apiContext);
        Task<PolicyDTO> ModifyPolicy(string policyNumber, PolicyDTO policyDetail, ApiContext apiContext);
        Task<dynamic> IssuePolicy(dynamic IssuepolicyDTO, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetMaster(string sMasterlist, ApiContext apiContext);
        Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext);
        Task<PolicyDTO> GetPolicyByNumber(string policyNumber, ApiContext apiContext);
        Task<string> PolicyCancellation(PolicycancelDTO policycancel, ApiContext apiContext);
        Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch, ApiContext apiContext);
        Task<CdTransactionsResponse> CancelPolicy(PolicycancelDTO policycancelDTO, ApiContext apiContext);
        Task<IEnumerable<PolicyDTO>> GetPolicyByEventId(string eventId, string policyNumber, ApiContext apiContext);
        Task<List<object>> GetGrossWrittenPremium(int productId, string productname, int Year, ApiContext apiContext);
        Task<List<object>> DownloadPolicy(int ProductId, int PartnerId, ApiContext apiContext);
        Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext);
        Task<List<object>> PolicyDetails(decimal PolicyId, ApiContext apiContext);
        Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO policySearchby, ApiContext apiContext);
        void WriteToExcel(string path);
        Task<List<BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest pDTO, ApiContext apiContext);
        Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest pDTO, ApiContext apiContext);
        Task<PolicyInsurableResponse> PolicyInsurableDetails(string PolicyNumber, ApiContext apiContext);
        Task<List<PolicyDataForClaims>> GetPolicyForClaimsInvoice(Models.BillingEventRequest EventRequet, ApiContext apiContext);
        Task<List<ddDTOs>> PolicyDashboardMaster(ApiContext apiContext);
        Task<LeadInfoDTO> CustomerPolicy(int CustomerId, ApiContext apiContext);
        Task<IEnumerable<PolicyCountDTO>> PolicySearchDashboard(PolicySearchDashboardDTO policysearch, ApiContext apiContext);
        Task<EndorsmentDTO> AddInsurableItem(dynamic insurableItemRequest, ApiContext apiContext);
        Task<EndorsmentDTO> RemoveInsurableItem(dynamic insurableItemRequest, ApiContext apiContext);
        Task<EndorsmentDTO> SwitchOnOff(dynamic switchOnOffRequest, ApiContext apiContext);
        //Task<CdTransactionsDTO> GetCdBalanceBYPolicyAsync(string policyNumber, ApiContext apiContext);
        Task<decimal> GetPolicyDetailsByPolicyNo(string PolicyNO, ApiContext apiContext);
        Task<List<PolicyDetails>> GetAllPolicy(string productCode, ApiContext apiContext);
        Task<object> CalCulatePremium(DynamicData premiumParameter, ApiContext apiContext);
        Task<PolicyDTO> ModifyInsurabableItem(dynamic modifydata, ApiContext apiContext);

        Task<dynamic> GetInsurableItemDetails(string policyNo, string insurableItemName, ApiContext apiContext);
        Task<PolicyProposalResponse> GetProposalDetails(string proposalNo, string Mobileno, string policyno, ApiContext apiContext);
        Task<List<PolicyPremiumDetailsDTO>> GetRiskItemByPolicyNo(string PolicyNO, ApiContext apiContext);
        // Task<dynamic> GetInsurableItemDetails(string policyNo, string insurableItemName, ApiContext apiContext);
        Task<decimal> UpdateSumInsured(string PolicyNumber, decimal amount, ApiContext apiContext);
        Task<PolicyResponse> UpdateBalanceSumInsured(string PolicyNumber, decimal amount, ApiContext apiContext);
        Task<InsurableField> GetProposalByMobileNo(string MobNo, ApiContext apiContext);
        Task<object> GetPolicyDetailsByNumber(string policyNumber, ApiContext apiContext);

        Task<List<object>> SearchPolicyDetailsByNumber(string PolicyNumber, ApiContext apiContext);
        Task<List<object>> SearchProposalDetailsByNumber(string ProposalNumber, ApiContext apiContext);


        Task<ProposalResponse> UpdateProposal(dynamic modifydata, ApiContext apiContext);
        Task<ProposalResponse> PolicyEndoresemenet(dynamic endoresementDto, ApiContext apiContext);
        Task<Dictionary<dynamic, dynamic>> DynamicMapper(dynamic inputmodel, string mappingname, ApiContext apiContext);
        Task<dynamic> InternalGetPolicyDetailsByNumber(string policyNumber, ApiContext apiContext);
        Task<DailyDTO> GetDailyAccountDetails(string policyNumber, int month, int year, string TxnEventType, ApiContext apiContext);
        Task<List<UploadDocument>> GetPolicyDocumentsByNumber(string policyNumber, ApiContext apiContext);
        Task<PolicyResponse> GeneratePolicy(dynamic policyDTO, ApiContext apiContext);

        Task<FileUploadResponse> RefundUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<ReportFileUploadResponse> RefundReportUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<List<EndorsementResponse>> GetEndoresementDetails(EndorsementSearch endorsementSearch, ApiContext apiContext);
        Task<dynamic> InternalGetProposalDetailsByNumber(string proposalNumber, ApiContext apiContext);
        Task<ProposalResponse> ProposalCancellation(dynamic CancellationRequest, ApiContext apiContext);
        Task<bool> ProposalCancellationScheduler(ApiContext apiContext);
        Task<bool> SmsScheduler(ApiContext apiContext);
        Task<bool> PolicyActivate(DateTime policyIssueDate, ApiContext apiContext);

    }
    public class PolicyService : IPolicyService
    {
        public IIntegrationService _integrationService;
        private MICAPOContext _context;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly Func<string, IPolicyProductService> _policyProductService;
        public PolicyService(Func<string, IPolicyProductService> policyProductService, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration, IEmailService emailService)
        {
            _policyProductService = policyProductService;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<PolicyResponse> CreatePolicy(dynamic policyDetail, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).CreatePolicy(policyDetail, apiContext);
        }



        public async Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).CreateMultiCoverPolicy(policyDetail, apiContext);
        }
        //Create proposal
        public async Task<ProposalResponse> CreateProposal(dynamic policyDetail, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).CreateProposal(policyDetail, apiContext);
        }
      
        //Update InsurableItem

        public async Task<PolicyDTO> ModifyInsurabableItem(object modifydata, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).ModifyInsurabableItem(modifydata, apiContext);
        }
        
    

        //Get InsurableItemDetails

        public async Task<dynamic> GetInsurableItemDetails(string policyNo, string insurableItemName, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetInsurableItemDetails(policyNo, insurableItemName,apiContext);
        }
        public async Task<PolicyProposalResponse> GetProposalDetails(string proposalNo, string Mobileno, string policyno, ApiContext apiContext)
        {
            //
            return await _policyProductService(apiContext.ProductType).GetProposalDetails(proposalNo, Mobileno,policyno, apiContext);
        }
       
        public async Task<List<PolicyPremiumDetailsDTO>> GetRiskItemByPolicyNo(string policyNo, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetRiskItemByPolicyNo(policyNo,apiContext);
        }
        public async Task<PolicyResponse> CreatePolicyWithPayment(dynamic policyDetail, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).CreatePolicyWithPayment(policyDetail, apiContext);
        }


        public async Task<bool> SendEmailAsync(EmailRequest emailTest)
        {
            try
            {
                await _emailService.SendEmail(emailTest.To, emailTest.Subject, emailTest.Message);
            }
            catch (Exception ex)
            {

                throw;
            }
            return true;
        }
        public async Task<PolicyDTO> ModifyPolicy(string policyNumber, PolicyDTO policyDetail, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).ModifyPolicy(policyNumber, policyDetail, apiContext);
        }
        public async Task<dynamic> IssuePolicy(dynamic IssuepolicyDTO, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).IssuePolicy( IssuepolicyDTO, apiContext);
        }
        //GetCDBalanceByPolicyNo
        //public async Task<CdTransactionsDTO> GetCdBalanceBYPolicyAsync(string policyNumber, ApiContext apiContext)
        //{
        //    return await _policyProductService(apiContext.ProductType).GetCdBalanceBYPolicyAsync(policyNumber, apiContext);
        //}
        //GetPolicydetailsByPolicyNO

        //GetMasterPolicy
        public async Task<List<PolicyDetails>> GetAllPolicy(string productCode, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetAllPolicy(productCode, apiContext);
        }

        public async Task<decimal> GetPolicyDetailsByPolicyNo(string PolicyNO, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetPolicyDetailsByPolicyNo(PolicyNO, apiContext);
        }
        public async Task<object> GetPolicyDetailsByNumber(string policyNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetPolicyDetailsByNumber(policyNumber, apiContext);
        }

        public async Task<IEnumerable<ddDTOs>> GetMaster(string sMasterlist, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetMaster(sMasterlist, apiContext);
        }

        private PolicyDTO MapAndValidatePolicy(dynamic policyDetail,ProductDTO productDTO,PartnersDTO partnersDTO,IEnumerable<ProductRcbdetailsDTO> riskDetails, List<ErrorInfo> Errors)
        {
            PolicyDTO policyDTO = new PolicyDTO();
            // validation of risk details
            var colName = "";
            foreach (var item in riskDetails)
            {
                var riskvalue = policyDetail[item.InputType];
                if (riskvalue != null)
                {
                    colName = GetColumnName(item.InputType);
                    if (!string.IsNullOrEmpty(colName))
                    {
                        PropertyInfo piInstance = policyDTO.GetType().GetProperty(colName);
                        if (piInstance != null)
                        {
                            if (piInstance.PropertyType == typeof(DateTime) || piInstance.PropertyType == typeof(DateTime?))
                            {
                                DateTime date;
                                DateTime.TryParse(riskvalue.ToString(), out date);
                                piInstance.SetValue(policyDTO, date);
                            }
                            else if (piInstance.PropertyType == typeof(int) || piInstance.PropertyType == typeof(int?))
                            {
                                piInstance.SetValue(policyDTO, (int)riskvalue);
                            }
                            else if (piInstance.PropertyType == typeof(decimal) || piInstance.PropertyType == typeof(decimal?))
                            {
                                piInstance.SetValue(policyDTO, (decimal)riskvalue);
                            }
                            else if (piInstance.PropertyType == typeof(string))
                            {
                                piInstance.SetValue(policyDTO, riskvalue.ToString());
                            }
                        }
                    }
                }
                if (Convert.ToBoolean(item.IsReqired) && riskvalue == null)
                {
                    ErrorInfo errorInfo = new ErrorInfo() { ErrorMessage = $"For Policy creation {colName} value is required" };
                    Errors.Add(errorInfo);
                }
            }
            //if(policyDTO.AgentId == null || policyDTO.CustomerId == null || policyDTO.MasterPolicyNo == null || policyDTO.ProductIdPk == null)
            //{
            //    return null;
            //}
            // some other calculated value
            policyDTO.CreatedBy = new Guid();
            policyDTO.CreatedDate = DateTime.Now;
            policyDTO.PolicyIssueDate = DateTime.Now;
            policyDTO.IsUploadedToIcm = 0;
            policyDTO.SumInsured = productDTO.PremiumAmount;
            // policyDTO.MasterPolicyNo = "ABC";//ToDo service req
            policyDTO.PolicyVersion = 1;
            policyDTO.PolicyNo = GetPolicyNumber(partnersDTO.PartnerId, productDTO.ProductId);


            return policyDTO;
        }
       
        private string GetColumnName(string column)
        {
            var lstColumn = GettblPolicyColumn();
            string colName;
            if (lstColumn.TryGetValue(column, out colName))
            {
                return colName;
            }
            return "";
        }

        public async Task<List<object>> PolicyDetails(decimal PolicyId, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).PolicyDetails(PolicyId, apiContext);
        }

        public async Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO policySearchby, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetPolicyByDetails(policySearchby, apiContext);
        }

        public async Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetPolicyDetails(apiContext);
        }

        private static Dictionary<string,string> GettblPolicyColumn()
        {
            Dictionary<string, string> dicColumns = new Dictionary<string, string>();
            dicColumns.Add("PartnerID", "AgentId");
            dicColumns.Add("Insured reference", "CustomerId");
            dicColumns.Add("Event ID", "PolicyTypeId");
            dicColumns.Add("ProductID", "ProductIdPk");
            dicColumns.Add("PolicyStartDate", "PolicyStartDate");
            dicColumns.Add("PolicyEndDate", "PolicyEndDate");
            dicColumns.Add("Insured name", "CoverNoteNo");
           // dicColumns.Add("Proposer name", "PolicyTypeID");
            dicColumns.Add("PolicyStatusID", "PolicyStatusId");
            dicColumns.Add("MobileNumber", "MobileNumber");
            dicColumns.Add("Email", "Email");
            return dicColumns;
        }

        private string GetPolicyNumber(decimal partnerId, decimal productId)
        {
            var connectionString = _configuration.GetConnectionString("PCConnection");
            int nextNumber = 0;string policNumber="";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("[PO].[usp_GetNextNumber]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Numberingtype", "PolicyNo");
                command.Parameters.AddWithValue("@PartnerId",partnerId);
                command.Parameters.AddWithValue("@ProductId", productId);
                command.Parameters.Add("@NextNo", SqlDbType.Int);
                command.Parameters["@NextNo"].Direction = ParameterDirection.Output;
                command.CommandTimeout = 3600;
                command.ExecuteNonQuery();
                nextNumber = (int)command.Parameters["@NextNo"].Value;
                connection.Close();
            }
            policNumber = productId.ToString().PadLeft(4, '0') +"/"+Convert.ToInt16(partnerId).ToString().PadLeft(4, '0') + "/" + nextNumber.ToString().PadLeft(4,'0') + "/00/000";
            return policNumber;
        }

        private async Task SendNotificationAsync(string policyNumber,string partnerEmail,string customerEmail,string customerNumber,string cover,string coverEvent,string productName)
        {
            //partner email
            //EmailTest emailTest = new EmailTest() { Message = $"Dear Partner,\n One Insurance Policy transaction has been successful.\nYour Policy No {policyNumber} is generated for - {productName} \n  Regards,\n Team MICA ", Subject = $"Insured coverage of Cover {cover} for Cover event {coverEvent} under Policy No.{policyNumber}", To = partnerEmail };
            //await SendEmailAsync(emailTest);
            //UserEmail
            if(!string.IsNullOrEmpty(customerEmail))
            {
                EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Your Insurance Policy transaction has been successful.\n\n Your Policy No {policyNumber} is generated for - {productName} , find the Policy \n schedule document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insured coverage of Cover {cover} for Cover event {coverEvent} under Policy No.{policyNumber}", To = partnerEmail };
                await SendEmailAsync(emailTest);
            }
        }
        private List<ErrorInfo> GetPolicyRequestValidation(dynamic policyDetail)
        {
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            if (policyDetail["ProductID"] == null)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "ProductId", PropertyName = "ProductId", ErrorMessage = "ProdcutId cannot be null" };
                Errors.Add(errorInfo);
            }
            if (policyDetail["PartnerID"] == null)
            {
                ErrorInfo errorInfo = new ErrorInfo { ErrorCode = "PartnerID", PropertyName = "PartnerID", ErrorMessage = "PartnerID cannot be null" };
                Errors.Add(errorInfo);
            }
            return Errors;
        }
        private decimal SavePolicyDetails(PolicyDTO mappedPolicy, dynamic policyDetail, ApiContext apiContext)
        {
            TblPolicy policy = _mapper.Map<TblPolicy>(mappedPolicy);
            policy.PolicyStageId = ModuleConstants.PolicyStageQuote;
            policy.PolicyStatusId = ModuleConstants.PolicyStatusInActive;
            _context.TblPolicy.Add(policy);

            TblPolicyDetails policyRequest = new TblPolicyDetails();
            policyRequest.PolicyRequest = policyDetail.ToString();
            _context.TblPolicyDetails.Add(policyRequest);

            _context.SaveChanges();

            return policy.PolicyId;
        }
        private async Task<List<ErrorInfo>> DoCDTransactionAsync(decimal productId,decimal partnerId,string policyNumber,int Amount, decimal PolicyId,ApiContext apiContext)
        {
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            var cdAccount = string.Concat(productId.ToString().PadLeft(5, '0'), "/" + partnerId.ToString().PadLeft(5, '0'));
            PolicyBookingTransaction policyBookingTransaction = new PolicyBookingTransaction() { PartnerId = Convert.ToDecimal(partnerId), ProductId = Convert.ToDecimal(productId), AccountNo = cdAccount, PolicyNo = policyNumber, TxnAmount = Amount };
            var transaction = await _integrationService.DoTransaction(policyBookingTransaction,apiContext);

            if (transaction.Status == BusinessStatus.Created)
            {
                TblPolicy policyUpdate = _context.TblPolicy.Find(PolicyId);
                policyUpdate.PolicyStageId = ModuleConstants.PolicyStagePolicy;
                policyUpdate.PolicyStatusId = ModuleConstants.PolicyStatusActive;
                policyUpdate.BundleTxnId = transaction.cdTransactions.TxnId.ToString();
                // Add payment table 
                TblPolicyPayment policyPayment = new TblPolicyPayment()
                {
                    PaidAmount = Amount,
                    CreatedDate = DateTime.Now,
                    PolicyId = PolicyId
                };
                _context.TblPolicyPayment.Add(policyPayment);
                _context.SaveChanges();

                return Errors;
            }
            Errors.AddRange(transaction.Errors);
            return Errors;
        }

        public async Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetPolicyById(policyId, apiContext);
        }

        public async Task<PolicyDTO> GetPolicyByNumber(string policyNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetPolicyByNumber(policyNumber, apiContext);
        }

        private PolicyModel GetPolicyModel(ProductDTO productDTO, TblPolicy policyDTO,PartnersDTO partnersDTO)
        {
            PolicyModel model = new PolicyModel();
            model.Date = DateTime.Now;

            model.PolicyNumber = policyDTO.PolicyNo;
            //organization
            model.organization = new Organization();
            model.organization.ContactName = "Inube";
            model.organization.PhoneNumber = "9742745384";
            model.organization.EmailAddress = "iNube.MICA@inubesolutions.com";
            model.organization.Address = "JP NAGAR";

            //customer
            model.customer = new Customer();
            model.customer.ContactName = policyDTO.CoverNoteNo;
            model.customer.PhoneNumber = policyDTO.MobileNumber;
            model.customer.EmailAddress = policyDTO.Email;
            model.customer.Address = "";

            //policydetails
            model.policyDetails = new PolicyDetails();
            model.policyDetails.PolicyNumber = policyDTO.PolicyNo;
            model.policyDetails.PolicyStartDate = policyDTO.PolicyStartDate?.ToShortDateString();
            model.policyDetails.PolicyEndDate = policyDTO.PolicyEndDate?.ToShortDateString();
            model.policyDetails.ProductName = productDTO.ProductName;
            model.policyDetails.PartnerName = partnersDTO.PartnerName;


            //Product Model
            model.productsModel = new ProductsModel();

            //CoverageDetails 
            CoverageDetails coverageDetails = new CoverageDetails();

            var cover = productDTO.ProductInsurableItems.FirstOrDefault().ProductCovers.FirstOrDefault();
            coverageDetails.CoverName = cover.Cover;
            coverageDetails.CoverEvent = cover.CoverEvent;
            //coverageDetails.CoverEventFactor = cover.CoverEventFactor;
            //coverageDetails.CoverEventFactorValue = cover.CoverEventFactorValue;
            coverageDetails.From = cover.CoverEventFactorValueFrom;
            coverageDetails.To = cover.CoverEventFactorValueTo;
            model.productsModel.coverages.Add(coverageDetails);

            //benifits
            Benifits benifits = new Benifits();
            var benefit = cover.ProductBenefits.FirstOrDefault();
           // benifits.BenifitCriteria = benefit.BenefitType;
            benifits.BenifitCriteriaValue = benefit.BenefitCriteriaValue?.ToString();
            benifits.From = "1";
            benifits.To = "10.4";
            //benifits.Amount = "20,000";
            benifits.Amount = benefit.BenefitAmount.ToString();
            if(benefit.BenifitRangeDetails.Count > 0)
            {
                benifits.BenifitRangeDetails.AddRange(benefit.BenifitRangeDetails);
            }
            model.productsModel.benifits.Add(benifits);

            model.productsModel.premium.Add(new PremiumDetails { BasePremium = productDTO.PremiumAmount.ToString(), GST = 0.ToString(), TotalPremium = productDTO.PremiumAmount.ToString() });

            //CWE
            //model.productsModel.CWEdetails = new string[];
            int i = 0;
            foreach (var item in productDTO.ProductClausesWarrentiesExclusions.Where(c=> c.IsPrint))
            {
                model.productsModel.CWEdetails.Add(item.Description);
                i++;
            }
            EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Your Insurance Policy transaction has been successful.\n\n Your Policy No {model.PolicyNumber} is generated for - {model.policyDetails.ProductName} , find the Policy \n schedule document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insured coverage of Cover {model.productsModel.coverages[0].CoverName} for Cover event {model.productsModel.coverages[0].CoverEvent} under Policy No.{model.PolicyNumber}", To = policyDTO.Email, PartnerEmail=partnersDTO.Email, IsAttachment = true };
            model.EmailTest = emailTest;
            return model;
        }


        public async Task<List<ddDTOs>> PolicyDashboardMaster(ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).PolicyDashboardMaster(apiContext);
        }

        public async Task<List<object>> GetGrossWrittenPremium(int productId, string productname,int Year, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetGrossWrittenPremium(productId, productname,Year, apiContext);
        }


        public async Task<Dictionary<int, string>> GetProductName(ApiContext apiContext)
        {
            var productDetails = await _integrationService.GetProductMasterAsync(apiContext);

            var ProductId = productDetails.Select(x => x.mID);
            var ProductName = productDetails.Select(x => x.mValue);

            Dictionary<int, string> ProductDetails = new Dictionary<int, string>();

            List<int> productid = new List<int>();

            List<string> productname = new List<string>();

            foreach (int id in ProductId)
            {
                productid.Add(id);
            }

            foreach (string name in ProductName)
            {
                productname.Add(name);
            }

            for (int i = 0; i < productid.Count(); i++)
            {
                ProductDetails.Add(productid[i], productname[i]);
                // continue;
            }

            return ProductDetails;

        }




        public async Task<ProductDTO> GetProductIdAsync(int id, string productname,ApiContext apiContext)
        {

            Dictionary<int, string> ProductDetails = new Dictionary<int, string>();

            ProductSearchDTO ProductDto = new ProductSearchDTO();

            if (productname == null && id != 0)
            {
                ProductDto.ProductId = id;
            }
            if (id == 0 && !string.IsNullOrWhiteSpace(productname))
            {
                ProductDto.ProductName = productname;
            }
            if (id != 0 && !string.IsNullOrWhiteSpace(productname))
            {
                ProductDto.ProductId = id;
                ProductDto.ProductName = productname;
            }

            var productDetails = await _integrationService.GetProductIdAsync(ProductDto,apiContext);
            if (productDetails.Count() == 0)
            {
                ProductDTO prod = new ProductDTO();
                return prod;
            }
            else
            {

                ProductDTO product = new ProductDTO();

                List<int> Pid = new List<int>();

                List<string> name = new List<string>();

                foreach (var Id in productDetails)
                {
                    Pid.Add(Id.ProductId);
                }

                foreach (var Pname in productDetails)
                {
                    name.Add(Pname.ProductName);
                }

                for (int i = 0; i < Pid.Count(); i++)
                {
                    ProductDetails.Add(Pid[i], name[i]);
                    // continue;
                }

                if (ProductDto.ProductId != 0 && string.IsNullOrEmpty(ProductDto.ProductName))
                {
                    //Dictionary<int, string> Productname = new Dictionary<int, string>();

                    var Productname = ProductDetails.Where(x => x.Key == ProductDto.ProductId).Select(x => x.Value);
                    foreach (var item in Productname)
                    {
                        product.ProductName = item;
                    }


                }

                if (ProductDto.ProductId == 0 && !string.IsNullOrEmpty(ProductDto.ProductName))
                {

                    var Productname = ProductDetails.Where(x => x.Value == ProductDto.ProductName).Select(x => x.Key);
                    foreach (var item in Productname)
                    {
                        product.ProductId = item;
                    }


                }

                return product;
            }

        }


        public async Task<IEnumerable<PolicyDTO>> GetPolicyByEventId(string eventId, string policyNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetPolicyByEventId(eventId, policyNumber, apiContext);
        }

        public async Task<string> PolicyCancellation(PolicycancelDTO policycancel, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).PolicyCancellation(policycancel, apiContext);
        }
        
        public async Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).PolicySearch(policysearch, apiContext);
        }

        public async Task<CdTransactionsResponse> CancelPolicy(PolicycancelDTO policycancelDTO, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).CancelPolicy(policycancelDTO, apiContext);
        }
        
        public async Task<CdTransactionsDTO> GetcddataAsync(int TxnId,ApiContext apiContext)
        {
            var cddetails = await _integrationService.GetcddataAsync(TxnId,apiContext);
            return cddetails;
        }

        public async Task<CdTransactionsResponse> ReverseCdAsync(PolicyCancelTransaction transaction,ApiContext apiContext)
        {
            var data = await _integrationService.ReverseCdAsync(transaction,apiContext);
            return data.FirstOrDefault();
        }

        public Task<List<object>> DownloadPolicy(int ProductId, int PartnerId, ApiContext apiContext)
        {
            return _policyProductService(apiContext.ProductType).DownloadPolicy(ProductId, PartnerId, apiContext);

        }


        public void WriteToExcel(string path)
        {
            throw new NotImplementedException();
        }

        public Task<List<BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest pDTO, ApiContext apiContext)
        {
            return _policyProductService(apiContext.ProductType).BillingEventData(pDTO, apiContext);
        }
        public Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest pDTO, ApiContext apiContext)
        {
            return _policyProductService(apiContext.ProductType).BillingEventResponse(pDTO, apiContext);
        }

        public async Task<PolicyInsurableResponse> PolicyInsurableDetails(string PolicyNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).PolicyInsurableDetails(PolicyNumber, apiContext);
        }

        public Task<List<PolicyDataForClaims>> GetPolicyForClaimsInvoice(Models.BillingEventRequest EventRequet, ApiContext apiContext)
        {
            return _policyProductService(apiContext.ProductType).GetPolicyForClaimsInvoice(EventRequet, apiContext);
        }
        public async Task<LeadInfoDTO> CustomerPolicy(int CustomerId, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).CustomerPolicy(CustomerId, apiContext);
        }
        public async Task<IEnumerable<PolicyCountDTO>> PolicySearchDashboard(PolicySearchDashboardDTO policysearch, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).PolicySearchDashboard(policysearch, apiContext);
        }


        public async Task<EndorsmentDTO> AddInsurableItem(dynamic insurableItemRequest, ApiContext apiContext)
        {

            return await _policyProductService(apiContext.ProductType).AddInsurableItem(insurableItemRequest, apiContext);

        }
        public async Task<EndorsmentDTO> RemoveInsurableItem(dynamic insurableItemRequest, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).RemoveInsurableItem(insurableItemRequest, apiContext);
        }
        public async Task<EndorsmentDTO> SwitchOnOff(dynamic switchOnOffRequest, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).SwitchOnOff(switchOnOffRequest, apiContext);
        }           
        
        public async Task<object> CalCulatePremium(DynamicData premiumParameter, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).CalCulatePremium(premiumParameter, apiContext);
        }           
        public async Task<decimal> UpdateSumInsured(string PolicyNumber, decimal amount, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).UpdateSumInsured(PolicyNumber, amount, apiContext);
        }
        public async Task<PolicyResponse> UpdateBalanceSumInsured(string PolicyNumber, decimal amount, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).UpdateBalanceSumInsured(PolicyNumber, amount, apiContext);
        }

        public async Task<InsurableField> GetProposalByMobileNo(string MobNo, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetProposalByMobileNo(MobNo, apiContext);
        }
        

        


        public async Task<ProposalResponse> UpdateProposal(object modifydata, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).UpdateProposal(modifydata, apiContext);
        }


        public async Task<ProposalResponse> PolicyEndoresemenet(dynamic endoresementDto, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).PolicyEndoresemenet(endoresementDto, apiContext);
        }
        public async Task<Dictionary<dynamic, dynamic>> DynamicMapper(dynamic inputModel, string mappingname, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).DynamicMapper(inputModel,mappingname, apiContext);
        }

        public async Task<dynamic> InternalGetPolicyDetailsByNumber(string policyNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).InternalGetPolicyDetailsByNumber(policyNumber, apiContext);
        }
        public async Task<dynamic> InternalGetProposalDetailsByNumber(string proposalNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).InternalGetProposalDetailsByNumber(proposalNumber, apiContext);
        }
        public async Task<DailyDTO> GetDailyAccountDetails(string policyNumber, int month, int year, string TxnEventType, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetDailyAccountDetails(policyNumber, month, year, TxnEventType, apiContext);
        }

        public async Task<List<UploadDocument>> GetPolicyDocumentsByNumber(string policyNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetPolicyDocumentsByNumber(policyNumber, apiContext);
        }

        public async Task<List<object>> SearchPolicyDetailsByNumber(string PolicyNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).SearchPolicyDetailsByNumber(PolicyNumber, apiContext);
        }
        
        public async Task<List<object>> SearchProposalDetailsByNumber(string ProposalNumber, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).SearchProposalDetailsByNumber(ProposalNumber, apiContext);
        }

        public async Task<FileUploadResponse> RefundUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).RefundUpload(httpRequest, cancellationToken, apiContext);
        }
        public async Task<ReportFileUploadResponse> RefundReportUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).RefundReportUpload(httpRequest, cancellationToken, apiContext);
        }

        public async Task<List<EndorsementResponse>> GetEndoresementDetails(EndorsementSearch endorsementSearch, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GetEndoresementDetails(endorsementSearch, apiContext);
        }

        public async Task<ProposalResponse> ProposalCancellation(dynamic CancellationRequest, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).ProposalCancellation(CancellationRequest, apiContext);
         
        }
        public async Task<bool> ProposalCancellationScheduler(ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).ProposalCancellationScheduler(apiContext);
        }

        public async Task<bool> SmsScheduler(ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).SmsScheduler(apiContext);
        }

        public async Task<PolicyResponse> GeneratePolicy(dynamic policyDTO, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).GeneratePolicy(policyDTO, apiContext);
        }
        public async Task<bool> PolicyActivate(DateTime policyIssueDate, ApiContext apiContext)
        {
            return await _policyProductService(apiContext.ProductType).PolicyActivate(policyIssueDate, apiContext);
        }

    }
}
