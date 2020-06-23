using AutoMapper;
using iNube.Services.ProductConfiguration.Entities;
using iNube.Services.ProductConfiguration.Models;
using System;
using System.Collections.Generic;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Services.ProductConfiguration.Controllers.Product.AvoProductServices;
using iNube.Services.ProductConfiguration.Entities.AvoEntities;
using System.Linq;
using iNube.Services.ProductConfiguration.Helpers;
using System.Xml.Serialization;
using System.IO;
using System.Xml;
using System.Data;
//using iNube.Services.ProductConfiguration.Controllers.ProductConfiguration.IntegrationServices;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Threading;

namespace iNube.Services.ProductConfiguration.Controllers.Product.ProductServices.AvoProduct
{
    public class AvoProductService : IProductConfigService, IAvoProductConfigService
    {
        private AVOPRContext _context;
        private IMapper _mapper;
        private readonly IServiceProvider _serviceProvider;
        private ILoggerManager _logger;
        private readonly IEmailService _emailService;
        // public IProductConfigurationIntegrationService _integrationService;
        private readonly IConfiguration _configuration;

        public AvoProductService(AVOPRContext context, IMapper mapper, IServiceProvider serviceProvider, ILoggerManager logger, IEmailService emailService, IConfiguration configuration)
        {
            _mapper = mapper;
            _serviceProvider = serviceProvider;
            _logger = logger;
            _emailService = emailService;
            // _integrationService = integrationService;
            _configuration = configuration;

        }

        public async Task<List<ddDTOs>> GetProductMasterAvo(string masterType, int parentID, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var ProductData = _context.TblProducts.Where(x => x.IsActive == true)
                                                  .Select(x => new ddDTOs
                                                  {
                                                      mID = x.ProductId,
                                                      mValue = x.ProductName,
                                                      mType = "Product"

                                                  }).ToList();


            if (masterType == "Plan")
            {
                var PlanData = _context.TblProductPlan.Where(x => x.ProductId == parentID)
                                                      .Select(x => new ddDTOs
                                                      {
                                                          mID = x.PlanId,
                                                          mValue = x.PlanDescriprion,
                                                          planCode = x.PlanCode

                                                      }).ToList();
                return PlanData;
            }

            if (masterType == "Policy Term")
            {
                var PolicyData = _context.TblProductPolicyTerm.Where(x => x.PlanId == parentID)
                                                               .Select(x => new ddDTOs
                                                               {
                                                                   mID = x.PolicyTermId,
                                                                   mValue = x.Term.ToString(),
                                                               }).ToList();
                return PolicyData;
            }

            if (masterType == "Preffered Mode")
            {
                var PrefferedData = _context.TblMasCommonTypes.Where(x => x.IsDeleted == 0 && x.MasterType == "PaymentFrequency")
                                                               .Select(x => new ddDTOs
                                                               {
                                                                   mID = x.CommonTypesId,
                                                                   mValue = x.Description
                                                               }).ToList();

                return PrefferedData;
            }


            return ProductData;
        }

        #region XML classes
        [XmlRoot(ElementName = "ProposalDetails")]
        public class ProposalDetails
        {
            [XmlElement(ElementName = "Product")]
            public Product Product { get; set; }
            [XmlElement(ElementName = "Member")]
            public List<Member> Member { get; set; }
        }
        [XmlRoot(ElementName = "Product")]
        public class Product
        {
            [XmlAttribute(AttributeName = "ProductId")]
            public string ProductId { get; set; }
            [XmlAttribute(AttributeName = "PlanId")]
            public string PlanId { get; set; }
            [XmlAttribute(AttributeName = "PaymentFrequency")]
            public string PaymentFrequency { get; set; }
            [XmlAttribute(AttributeName = "DrawDownPeriod")]
            public string DrawDownPeriod { get; set; }
            [XmlAttribute(AttributeName = "AdditionalMortalityPer")]
            public string AdditionalMortalityPer { get; set; }
            [XmlAttribute(AttributeName = "AdditionalMortality_per_mille")]
            public string AdditionalMortalitypermille { get; set; }
            [XmlAttribute(AttributeName = "BasicSumAssured")]
            public string BasicSumAssured { get; set; }
            [XmlAttribute(AttributeName = "PolicyTerm")]
            public string PolicyTerm { get; set; }
            [XmlAttribute(AttributeName = "PremiumPayingTerm")]
            public string PremiumPayingTerm { get; set; }
            [XmlAttribute(AttributeName = "WOPAvailability")]
            public string WOPAvailability { get; set; }
            [XmlAttribute(AttributeName = "Premium")]
            public string Premium { get; set; }
            [XmlAttribute(AttributeName = "SumAssuredLevel")]
            public string SumAssuredLevel { get; set; }
            [XmlAttribute(AttributeName = "NoOfChildren")]
            public string NoOfChildren { get; set; }

            [XmlAttribute(AttributeName = "HIRDeductible")]
            public string HIRDeductible { get; set; }
            [XmlAttribute(AttributeName = "HIRFamilyFloater")]
            public string HIRFamilyFloater { get; set; }
            [XmlAttribute(AttributeName = "ApplyOccupationLoading")]
            public string ApplyOccupationLoading { get; set; }
            [XmlAttribute(AttributeName = "TotalLifeBenefit")]
            public string TotalLifeBenefit { get; set; }

        }

        [XmlRoot(ElementName = "Rider")]
        public class Rider
        {
            [XmlAttribute(AttributeName = "RiderId")]
            public string RiderId { get; set; }
            [XmlAttribute(AttributeName = "SumAssured")]
            public string SumAssured { get; set; }
        }
        [XmlRoot(ElementName = "Member")]
        public class Member
        {
            [XmlAttribute(AttributeName = "Id")]
            public string Id { get; set; }
            [XmlAttribute(AttributeName = "Relation")]
            public string Relation { get; set; }
            [XmlAttribute(AttributeName = "Age")]
            public string Age { get; set; }
            [XmlAttribute(AttributeName = "ChildCount")]
            public string ChildCount { get; set; }
            [XmlAttribute(AttributeName = "OccupationId")]
            public string OccupationId { get; set; }
            [XmlAttribute(AttributeName = "Gender")]
            public string Gender { get; set; }
            [XmlElement(ElementName = "Rider")]
            public List<Rider> Rider { get; set; }
        }
        #endregion

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ProductDTO>> GetProductByLob(int id, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

        public string MapQuotePremiumObject(MapQuoteDTO objLifeQuote, bool forRiders = false)
        {
            ProposalDetails proposalDetails = new ProposalDetails();
            proposalDetails.Product = new Product();
            proposalDetails.Product.BasicSumAssured = objLifeQuote.objProductDetials.BasicSumInsured.ToString();
            //if (objLifeQuote.objProductDetials.Plan != "1" && objLifeQuote.objProductDetials.Plan != "3")
            //    proposalDetails.Product.BasicSumAssured = "";
            //if (objLifeQuote.objProductDetials.Plan == "1")
            //{
            proposalDetails.Product.TotalLifeBenefit = proposalDetails.Product.BasicSumAssured;
            //proposalDetails.Product.BasicSumAssured = "200000";
            proposalDetails.Product.BasicSumAssured = proposalDetails.Product.BasicSumAssured;
            //}
            proposalDetails.Product.ProductId = objLifeQuote.objProductDetials.Plan;
            proposalDetails.Product.PlanId = objLifeQuote.objProductDetials.Variant;
            proposalDetails.Product.AdditionalMortalityPer = "0";
            proposalDetails.Product.AdditionalMortalitypermille = "0";
            proposalDetails.Product.DrawDownPeriod = string.IsNullOrEmpty(objLifeQuote.objProductDetials.DrawDownPeriod) == true ? objLifeQuote.objProductDetials.PensionPeriod : objLifeQuote.objProductDetials.DrawDownPeriod;
            proposalDetails.Product.NoOfChildren = Convert.ToInt32(objLifeQuote.NoofChilds) >= 1 ? "1" : "0";
            proposalDetails.Product.PaymentFrequency = objLifeQuote.objProductDetials.PreferredMode;
            proposalDetails.Product.PremiumPayingTerm = objLifeQuote.objProductDetials.PremiumTerm;
            proposalDetails.Product.PolicyTerm = objLifeQuote.objProductDetials.PolicyTerm;
            if (objLifeQuote.objProductDetials.PlanCode == "HPA")
            {
                proposalDetails.Product.Premium = "";
            }
            else if ((objLifeQuote.objProductDetials.PlanCode != "HPA"))
            {
                proposalDetails.Product.Premium = objLifeQuote.objProductDetials.AnnualPremium;
            }
            proposalDetails.Product.SumAssuredLevel = objLifeQuote.objProductDetials.SAM == 0 ? "" : objLifeQuote.objProductDetials.SAM.ToString();
            proposalDetails.Product.HIRDeductible = objLifeQuote.objProductDetials.Deductable == true ? "1" : "0";
            proposalDetails.Product.HIRFamilyFloater = objLifeQuote.objProductDetials.IsFamilyFloater == true ? "1" : "0";
            proposalDetails.Product.ApplyOccupationLoading = "1";

            proposalDetails.Product.WOPAvailability = objLifeQuote.objQuoteMemberDetails[0].ObjBenefitDetails.Where(a => a.RiderID == 10).Select(b => b.BenifitOpted).FirstOrDefault() == true ? "1" : "0";

            proposalDetails.Member = new List<Member>();
            int pCount = 0;
            for (int i = 0; i < objLifeQuote.objQuoteMemberDetails.Count; i++)
            {

                Member member = new Member();
                member.Age = (objLifeQuote.objQuoteMemberDetails[i].AgeNextBirthDay - 1).ToString();
                member.Id = objLifeQuote.objQuoteMemberDetails[i].TabIndex = (i + 1).ToString();

                if (objLifeQuote.objQuoteMemberDetails[i].Relationship == "267" || objLifeQuote.objQuoteMemberDetails[i].Relationship == "268")
                {
                    member.Relation = (objLifeQuote.objQuoteMemberDetails[i].Relationship == "267" ? "1" : "2");
                    string EngOccupation = "";
                    string OccupationStr = "";
                    if (objLifeQuote.objQuoteMemberDetails[i].Relationship == "267")
                    {
                        OccupationStr = objLifeQuote.objProspect.Occupation;
                        member.Gender = objLifeQuote.objProspect.Gender;
                    }
                    else if (objLifeQuote.objQuoteMemberDetails[i].Relationship == "268")
                    {
                        OccupationStr = objLifeQuote.objSpouseDetials.Occupation;
                        member.Gender = objLifeQuote.objSpouseDetials.Gender;
                    }

                    if (!string.IsNullOrEmpty(OccupationStr))
                    {
                        string[] SplitOccupation = OccupationStr.Split('|');
                        EngOccupation = SplitOccupation[0];
                    }
                    else
                    {
                        EngOccupation = objLifeQuote.objProspect.Occupation;
                    }

                    member.OccupationId = "268";
                    //  var QuoteData = _integrationService.GetMasLifeOccupations(EngOccupation);

                    // member.OccupationId = entity.tblMasLifeOccupations.Where(a => a.OccupationCode == EngOccupation).Select(a => a.ID).FirstOrDefault().ToString();

                }
                //else if (objLifeQuote.objQuoteMemberDetails[i].Relationship == "268")
                //{
                //    member.Relation = "2";
                //    member.OccupationId = entity.tblMasLifeOccupations.Where(a => a.CompanyCode == objLifeQuote.objSpouseDetials.Occupation).Select(a => a.ID).FirstOrDefault().ToString();
                //    member.Gender = objLifeQuote.objSpouseDetials.Gender;
                //}
                else
                {

                    member.Gender = objLifeQuote.objChildDetials[pCount].Gender;
                    member.Relation = "3";
                    pCount = pCount + 1;
                    member.ChildCount = Convert.ToString(pCount);
                }
                member.Rider = new List<Rider>();
                var selectedRiders = forRiders == true ? objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails : objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails.Where(a => a.BenifitOpted == true).ToList();
                foreach (var item in selectedRiders)
                {
                    Rider rider = new Rider();
                    rider.RiderId = item.BenefitID.ToString();
                    if (item.RiderID == 10 || item.CalType == "Cal")
                    {
                        rider.SumAssured = "";
                    }
                    else
                    {
                        rider.SumAssured = item.RiderSuminsured == null ? "" : item.RiderSuminsured.ToString();
                    }
                    if (item.RiderID == 5 && item.CalType == "Cal")
                    {
                        if (objLifeQuote.objProductDetials.PlanCode != "PPG" && objLifeQuote.objProductDetials.PlanCode != "SBA" &&
                            objLifeQuote.objProductDetials.PlanCode != "SBB" && objLifeQuote.objProductDetials.PlanCode != "SBC"
                                && objLifeQuote.objProductDetials.PlanCode != "SBD")
                        {
                            if (Convert.ToUInt32(objLifeQuote.objProductDetials.SAM) * Convert.ToUInt32(objLifeQuote.objProductDetials.AnnualPremium) > 30000000)
                            {
                                rider.SumAssured = "30000000";
                            }
                        }


                    }


                    rider.SumAssured = rider.SumAssured.Replace(" ", "");
                    member.Rider.Add(rider);
                }
                proposalDetails.Member.Add(member);


            }

            return proposalDetails.ToXml();
        }

        public async Task<MapQuoteDTO> CalculateQuotePremium(MapQuoteDTO objLifeQuote, ApiContext apiContext, bool AnnualMode = false)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));


            //using (AVOAIALifeEntities entity = new AVOAIALifeEntities())
            //{

            string xmlStr = MapQuotePremiumObject(objLifeQuote);
            //#region  Log Input 
            //tbllogxml objlogxml = new tbllogxml();
            //objlogxml.Description = "premium xml";
            //objlogxml.PolicyID = Convert.ToString(objLifeQuote.objProspect.ContactID);
            //objlogxml.UserID = objLifeQuote.UserName;
            //objlogxml.XMlData = xmlStr;
            //objlogxml.CreatedDate = DateTime.Now;
            //entity.tbllogxmls.Add(objlogxml);
            //entity.SaveChanges();
            //#endregion

            var connectionString = _configuration.GetConnectionString("PRConnection");

            System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(connectionString);
            con.Open();
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
            cmd.Connection = con;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "[PR].[usp_GetPremiumForAllProducts]";
            cmd.Parameters.Add("@s", SqlDbType.VarChar);
            cmd.Parameters.Add("@withDecimal", SqlDbType.Bit);
            cmd.Parameters[0].Value = xmlStr;
            cmd.Parameters[1].Value = 0;
            DataSet ds = new DataSet();
            //  DataTable dtTest = new DataTable();
            System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter(cmd);
            da.Fill(ds);
            // ds.Tables.Add(dtTest);
            List<BenifitDetailsDTO> lstPremium = new List<BenifitDetailsDTO>();
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                BenifitDetailsDTO benifit = new BenifitDetailsDTO();
                benifit.BenefitID = Convert.ToInt32(ds.Tables[0].Rows[i]["ProductRiderId"]);
                benifit.BenifitName = Convert.ToString(ds.Tables[0].Rows[i]["RiderName"]);
                benifit.RiderSuminsured = Convert.ToString(ds.Tables[0].Rows[i]["SumAssured"]);
                benifit.RiderPremium = Convert.ToString(ds.Tables[0].Rows[i]["RiderPremium"] == DBNull.Value ? "0" : ds.Tables[0].Rows[i].ItemArray[3]);
                benifit.AssuredMember = Convert.ToString(ds.Tables[0].Rows[i]["RelationID"]);
                benifit.TotalPremium = Convert.ToString(ds.Tables[0].Rows[i]["PayablePremium"]);
                benifit.MemberID = Convert.ToString(ds.Tables[0].Rows[i]["MemberId"]);
                benifit.LoadingAmount = Convert.ToString(ds.Tables[0].Rows[i]["LoadingAmount"]);
                benifit.DiscountAmount = Convert.ToString(ds.Tables[0].Rows[i]["DiscountAmount"]);
                benifit.AnnualRiderPremium = Convert.ToString(ds.Tables[0].Rows[i]["AnnualRiderPremium"]);
                benifit.LoadingPercentage = Convert.ToString(ds.Tables[0].Rows[i]["LoadingPer"]);
                benifit.LoadinPerMille = Convert.ToString(ds.Tables[0].Rows[i]["LoadingPerMille"]);
                lstPremium.Add(benifit);
            }
            if (AnnualMode == false)
            {
                objLifeQuote.AnnualPremium = lstPremium.Select(a => a.TotalPremium).FirstOrDefault();
            }


            for (int i = 0; i < objLifeQuote.objQuoteMemberDetails.Count; i++)
            {
                var Id = objLifeQuote.objQuoteMemberDetails[i].TabIndex;
                for (int j = 0; j < objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails.Count; j++)
                {
                    var riderId = objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].BenefitID;

                    var prem = lstPremium.Where(a => a.BenefitID == riderId && a.MemberID == Id).FirstOrDefault();
                    if (prem != null)
                    {
                        if (AnnualMode == true)
                        {
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualModeLoadingAmount = prem.LoadingAmount;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualModeDiscountAmount = prem.DiscountAmount;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualModeAnnualpremium = prem.AnnualRiderPremium;
                        }
                        else
                        {
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AssuredMember = prem.AssuredMember;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].ActualRiderPremium = (Convert.ToInt64(prem.RiderPremium) - Convert.ToInt64(prem.LoadingAmount)).ToString();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].RiderSuminsured = prem.RiderSuminsured;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].LoadingAmount = prem.LoadingAmount;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].RiderPremium = prem.RiderPremium;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].DiscountAmount = prem.DiscountAmount;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualRiderPremium = prem.AnnualRiderPremium;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].LoadingPercentage = prem.LoadingPercentage;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].LoadinPerMille = prem.LoadinPerMille;
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].TotalPremium = prem.TotalPremium;

                        }

                    }
                    else
                    {
                        if (AnnualMode == true)
                        {
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualModeLoadingAmount = "0";
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualModeDiscountAmount = "0";
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualModeAnnualpremium = "0";
                        }
                        else
                        {
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].BenifitName = lstPremium.Select(x => x.BenifitName).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].RiderPremium = lstPremium.Select(x => x.RiderPremium).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].LoadingAmount = lstPremium.Select(x => x.LoadingAmount).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].ActualRiderPremium = lstPremium.Select(x => x.AnnualRiderPremium).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].RiderSuminsured = lstPremium.Select(x => x.RiderSuminsured).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].DiscountAmount = lstPremium.Select(x => x.DiscountAmount).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualRiderPremium = lstPremium.Select(x => x.AnnualRiderPremium).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].LoadingPercentage = lstPremium.Select(x => x.LoadingPercentage).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].LoadinPerMille = lstPremium.Select(x => x.LoadinPerMille).FirstOrDefault();
                            objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].TotalPremium = lstPremium.Select(x => x.TotalPremium).FirstOrDefault();



                        }
                    }
                    // objLifeQuote.AnnualModePremium.Add(prem);

                    // }

                }

            }

            var IllustrationData = GetIllustration(objLifeQuote);
            objLifeQuote = await IllustrationData;

            return objLifeQuote;
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<MapQuoteDTO> GetIllustration(MapQuoteDTO objLifeQuote)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            string xmlStr = MapQuotePremiumObject(objLifeQuote);

            //#region  Log Input 
            //AVOAIALifeEntities entities = new AVOAIALifeEntities();
            //tbllogxml objlogxml = new tbllogxml();
            //objlogxml.Description = "Illustration xml";
            //objlogxml.PolicyID = Convert.ToString(objLifeQuote.objProspect.ContactID);
            //objlogxml.UserID = objLifeQuote.UserName;
            //objlogxml.XMlData = xmlStr;
            //objlogxml.CreatedDate = DateTime.Now;
            //entities.tbllogxmls.Add(objlogxml);
            //entities.SaveChanges();
            //#endregion


            var connectionString = _configuration.GetConnectionString("PRConnection");

            System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(connectionString);
            con.Open();
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
            cmd.Connection = con;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "[PR].[usp_GetIllustration]";
            cmd.Parameters.Add("@XmlStr", SqlDbType.VarChar);
            cmd.Parameters[0].Value = xmlStr;
            DataSet ds = new DataSet();
            System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter(cmd);
            da.Fill(ds);
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                IllustationDTO ill = new IllustationDTO();
                ill.PolicyYear = Convert.ToInt32(ds.Tables[0].Rows[i]["PolicyYear"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["PolicyYear"]);
                ill.BasicPremium = Convert.ToInt32(ds.Tables[0].Rows[i]["BasicPremium"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["BasicPremium"]);
                ill.MainBenefitsPremium = Convert.ToInt32(ds.Tables[0].Rows[i]["MainBenefitsPremium"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["MainBenefitsPremium"]);
                ill.AdditionalBenefitsPremiums = Convert.ToInt32(ds.Tables[0].Rows[i]["AdditionalBenefitsPremiums"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["AdditionalBenefitsPremiums"]);
                ill.TotalPremium = Convert.ToInt32(ds.Tables[0].Rows[i]["TotalPremium"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["TotalPremium"]);
                ill.FundBalanceDiv4 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv4"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv4"]);
                ill.SurrenderValueDiv4 = Convert.ToInt64(ds.Tables[0].Rows[i]["SurrenderValueDiv4"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["SurrenderValueDiv4"]);
                ill.DrawDownDiv4 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv4"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv4"]);
                ill.PensionBoosterDiv4 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv4_Pensionbooster"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv4_Pensionbooster"]);
                ill.FundBalanceDiv8 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv8"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv8"]);
                ill.SurrenderValueDiv8 = Convert.ToInt64(ds.Tables[0].Rows[i]["SurrenderValueDiv8"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["SurrenderValueDiv8"]);
                ill.DrawDownDiv8 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv8"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv8"]);
                ill.PensionBoosterDiv8 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv8_Pensionbooster"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv8_Pensionbooster"]);
                ill.FundBalanceDiv12 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv12"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv12"]);
                ill.SurrenderValueDiv12 = Convert.ToInt64(ds.Tables[0].Rows[i]["SurrenderValueDiv12"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["SurrenderValueDiv12"]);
                ill.DrawDownDiv12 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv12"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv12"]);
                ill.PensionBoosterDiv12 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv12_Pensionbooster"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv12_Pensionbooster"]);
                ill.FundBalanceDiv5 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv5"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv5"]);
                ill.FundBalanceDiv6 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv6"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv6"]);
                ill.FundBalanceDiv7 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv7"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv7"]);
                ill.FundBalanceDiv9 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv9"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv9"]);
                ill.FundBalanceDiv10 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv10"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv10"]);
                ill.FundBalanceDiv11 = Convert.ToInt64(ds.Tables[0].Rows[i]["FundBalanceDiv11"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["FundBalanceDiv11"]);
                ill.DrawDownDiv5 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv5"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv5"]);
                ill.DrawDownDiv6 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv6"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv6"]);
                ill.DrawDownDiv7 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv7"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv7"]);
                ill.DrawDownDiv9 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv9"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv9"]);
                ill.DrawDownDiv10 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv10"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv10"]);
                ill.DrawDownDiv11 = Convert.ToInt64(ds.Tables[0].Rows[i]["DrawDownDiv11"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["DrawDownDiv11"]);
                ill.UnAllocatedPremium = Convert.ToInt64(ds.Tables[0].Rows[i]["UnAllocatedPremium"] == DBNull.Value ? 0 : ds.Tables[0].Rows[i]["UnAllocatedPremium"]);
                objLifeQuote.LstIllustation.Add(ill);
            }
            return objLifeQuote;
        }

        public async Task<List<MasterListItemDTO>> ListProducts(ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            List<MasterListItemDTO> lstProducts = new List<MasterListItemDTO>();
            lstProducts = (from Product in _context.TblProducts.Where(a => a.IsActive == true)
                           select new MasterListItemDTO
                           {
                               Text = Product.ProductName,
                               Value = Product.ProductId.ToString()
                           }
                      ).ToList();

            return lstProducts;

        }

        public async Task<ProductMastersDTO> LoadProductMasters(ProductMastersDTO obj, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            Entities.AvoEntities.TblProducts Product = new Entities.AvoEntities.TblProducts();

            if (obj.ProductID > 0)
            {
                Product = _context.TblProducts.Where(a => a.ProductId == obj.ProductID).FirstOrDefault();
            }
            else
            {
                Product = _context.TblProducts.Where(a => a.ProductName == obj.ProductName).FirstOrDefault();
            }

            if (Product != null)
            {
                obj.ProductID = Product.ProductId;
                obj.PlanCode = Product.ProductCode;

                //#region Policy Term
                //var ProductParameter = _context.tblProductParameters.Where(a => a.ParameterId == 6 && a.ProductId == obj.ProductID).FirstOrDefault();
                //if (ProductParameter != null)
                //{
                //    obj.LstPolicyTerm = new List<MasterListItemDTO>();
                //    int Minvalue = Convert.ToInt32(ProductParameter.NumericValueFrom);

                //    while (Minvalue <= ProductParameter.NumericValueTo)
                //    {
                //        MasterListItemDTO objMasterItem = new MasterListItemDTO();
                //        objMasterItem.Text = Convert.ToString(Minvalue);
                //        objMasterItem.Value = Convert.ToString(Minvalue);
                //        obj.LstPolicyTerm.Add(objMasterItem);
                //        Minvalue++;
                //    }

                //}
                //#endregion


                //#region Policy Premium Term
                //var PolicyPremiumTerm = _context.tblProductParameters.Where(a => a.ParameterId == 8 && a.ProductId == obj.ProductID).FirstOrDefault();
                //if (PolicyPremiumTerm != null)
                //{

                //    obj.LstPremiumTerm = new List<MasterListItemDTO>();
                //    if (PolicyPremiumTerm.StringValueFrom == "Same as policy term")
                //    {
                //        obj.LstPremiumTerm.AddRange(obj.LstPolicyTerm);
                //    }
                //    else
                //    {
                //        int Minvalue = Convert.ToInt32(PolicyPremiumTerm.StringValueFrom);
                //        int MaxValue = Convert.ToInt32(PolicyPremiumTerm.StringValueTo);
                //        while (Minvalue <= MaxValue)
                //        {
                //            MasterListItemDTO objMasterItem = new MasterListItemDTO();
                //            objMasterItem.Text = Convert.ToString(Minvalue);
                //            objMasterItem.Value = Convert.ToString(Minvalue);
                //            obj.LstPremiumTerm.Add(objMasterItem);
                //            Minvalue++;
                //        }
                //    }


                //}
                //#endregion
            }




            return obj;
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<MapQuoteDTO> GetRiderSumAssured(MapQuoteDTO objLifeQuote)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            //using (AVOAIALifeEntities entity = new AVOAIALifeEntities())
            //{

            string xmlStr = MapQuotePremiumObject(objLifeQuote, true);

            // string xmlStr = MapQuotePremiumObject(entity, objLifeQuote, true);
            //#region  Log Input 
            //tbllogxml objlogxml = new tbllogxml();
            //objlogxml.Description = "premium xml";
            //objlogxml.PolicyID = Convert.ToString(objLifeQuote.objProspect.ContactID);
            //objlogxml.UserID = objLifeQuote.UserName;
            //objlogxml.XMlData = xmlStr;
            //objlogxml.CreatedDate = DateTime.Now;
            //entity.tbllogxmls.Add(objlogxml);
            //entity.SaveChanges();
            //#endregion
            var connectionString = _configuration.GetConnectionString("PRConnection");

            System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(connectionString);
            con.Open();
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
            cmd.Connection = con;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "[PR].[usp_GetPremiumForAllProducts]";
            cmd.Parameters.Add("@s", SqlDbType.VarChar);
            cmd.Parameters.Add("@withDecimal", SqlDbType.Bit);
            cmd.Parameters[0].Value = xmlStr;
            cmd.Parameters[1].Value = 0;
            DataSet ds = new DataSet();
            System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter(cmd);
            da.Fill(ds);

            List<BenifitDetailsDTO> lstPremium = new List<BenifitDetailsDTO>();
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                BenifitDetailsDTO benifit = new BenifitDetailsDTO();
                benifit.BenefitID = Convert.ToInt32(ds.Tables[0].Rows[i]["ProductRiderId"]);
                benifit.BenifitName = Convert.ToString(ds.Tables[0].Rows[i]["RiderName"]);
                benifit.RiderSuminsured = Convert.ToString(ds.Tables[0].Rows[i]["SumAssured"]);
                benifit.RiderPremium = Convert.ToString(ds.Tables[0].Rows[i]["RiderPremium"] == DBNull.Value ? "0" : ds.Tables[0].Rows[i].ItemArray[3]);
                benifit.AssuredMember = Convert.ToString(ds.Tables[0].Rows[i]["RelationID"]);
                benifit.MemberID = Convert.ToString(ds.Tables[0].Rows[i]["MemberId"]);
                benifit.LoadingAmount = Convert.ToString(ds.Tables[0].Rows[i]["LoadingAmount"]);
                benifit.DiscountAmount = Convert.ToString(ds.Tables[0].Rows[i]["DiscountAmount"]);
                benifit.AnnualRiderPremium = Convert.ToString(ds.Tables[0].Rows[i]["AnnualRiderPremium"]);
                lstPremium.Add(benifit);
            }


            for (int i = 0; i < objLifeQuote.objQuoteMemberDetails.Count; i++)
            {
                var Id = objLifeQuote.objQuoteMemberDetails[i].TabIndex;
                for (int j = 0; j < objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails.Count; j++)
                {
                    var riderId = objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].BenefitID;
                    var prem = lstPremium.Where(a => a.BenefitID == riderId && a.MemberID == Id).FirstOrDefault();
                    if (prem != null)
                    {
                        objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AssuredMember = prem.AssuredMember;
                        objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].ActualRiderPremium = (Convert.ToInt64(prem.RiderPremium) - Convert.ToInt64(prem.LoadingAmount)).ToString();
                        objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].RiderSuminsured = prem.RiderSuminsured;
                        objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].LoadingAmount = prem.LoadingAmount;
                        objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].RiderPremium = prem.RiderPremium;
                        objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].DiscountAmount = prem.DiscountAmount;
                        objLifeQuote.objQuoteMemberDetails[i].ObjBenefitDetails[j].AnnualRiderPremium = prem.AnnualRiderPremium;


                    }
                }

            }

            //    }

            return objLifeQuote;
        }

        public async Task<List<object>> GetRiders(int ProductId, int PlanId, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));


            var RiderData = _context.TblProductPlanRiders
                                    .Where(x => x.ProductId == ProductId && x.PlanId == PlanId && x.IsActive == true).ToList();

            RiderData.OrderBy(x => x.DisplayOrder);

            List<Object> objBenefitDetails = new List<object>();


            foreach (var item in RiderData)
            {
                BenifitDetailsDTO benifitDetails = new BenifitDetailsDTO();
                benifitDetails.BenefitID = (int)item.ProductPlanRiderId;
                benifitDetails.BenifitName = item.DisplayName;
                benifitDetails.Mandatory = (bool)item.Mandatory;
                benifitDetails.RiderCode = item.RefRiderCode;
                benifitDetails.RiderID = (int)item.RiderId;
                benifitDetails.RelationshipWithProspect = item.RelationId.ToString();
                benifitDetails.LoadingAmount = "0";
                benifitDetails.RiderPremium = "0";
                benifitDetails.TotalPremium = "0";


                objBenefitDetails.Add(benifitDetails);
            }



            return objBenefitDetails;
        }

        public async Task<bool> CheckSpouse(int ProductID, int PlanID, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            //RelationID = 2 , Bcz Spouse RelaationID is 2 in DB 

            var Spouse = _context.TblProductPlanRiders.Where(x => x.ProductId == ProductID && x.PlanId == PlanID && x.RelationId == 2).Any();

            return Spouse;

        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ProductResponse> Create(ProductDTO objProduct, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTOs>> GetMaster(string sMasterList, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<EntityDTOs>> GetEntityMaster(ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ProductDTO>> GetProducts(string lProductlist, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ProductDTO>> SearchProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<TblProductChannels> ChannelDetails(decimal ChannelId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<TblProductClausesWarrentiesExclusions> ClaimsDetails(decimal Cweid, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<TblProductRcbdetails> RiskDetails(decimal RcbdetailsId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ProductRcbdetailsDTO>> RCBDetails(decimal ProductId, string type, string FieldType, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

        public void Delete(int ProductID, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ProductResponse> ProductCodevalidation(string code, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ProductDTO> ModifyProducts(ProductDTO objProduct, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<ProductClausesWarrentiesExclusionsDTO>> CWEDetails(int LOBId, int CWETypeID, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTOs>> GetProductMaster(string masterType, int parentID, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ProductResponse> GetProductGWP(ProductDTO productDTO, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ProductDTO>> SearchAssignProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<MasterDataResponse> AddMasterData(MasterDataDTO masterDataDTO, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<MasterEntityDTO> AddEntityData(MasterEntityDTO entityDTO, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<Models.BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest pDTO, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

        public object GetMasLifeOccupations(string EngOccupation)
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTOs>> GetRiskClaimMaster(string masterType, int typeId, int parentID, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ProductDTO> GetProductByCode(string ProductCode, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal ProductId, string type, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest pDTO, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTOs>> GetAllProductMaster(string masterType, int parentID, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

        public Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<DocumentResponse> Docupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public Task<DocumentResponse> PromoDocupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<LeadInfoDTO>> BulkSMS(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<LeadInfoDTO> GetLeadInfo(int LeadID, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public Task<List<CoverListValue>> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public Task<ProductResponse> ProductNamevalidation(string name, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //public Task<List<CoverListValue>> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext)
        //{
        //    throw new NotImplementedException();
        //}

        public Task<ProductResponse> PromoApply(PromoDTO promo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<dynamic> GetProductRateConfig(int productid, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProductRatingMapping>> GetProductRateMapping(int productid, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<MasDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<MasDTO>> GetRiskParam(string lMasterlist, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<MappingDto>> CreateMapping(MappingListDto MapDto, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<MasDTO>> GetPSDMasterData(string masterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<EntityDetailsDTO> SaveEntities(EntityDetailsDTO entityDetails, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<EntityDetailsDTO>> SearchEntities(string type, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<EntityDetailsDTO>> SearchEntitiesByType(string type, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DynamicProduct>> GetDynamicProduct(string type, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTOs>> GetParentid(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

    }
}
