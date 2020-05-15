using AutoMapper;
using iNube.Services.Lead.Entities;
using iNube.Services.Lead.Models;
using iNube.Services.Quotation.Controllers.Quotation.IntegrationServices;
using iNube.Services.Quotation.Models;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Quotation.Controllers.Quotation.QuotationService
{

    public interface IQuotationService
    {
        Task<IEnumerable<LeadDTO>> LoadProspectInfo(int ContactID);
        void SaveProspectInfo(LeadDTO leadDTO);
        List<QuotePoolDTO> QuotationPool(ApiContext context);
        LifeQqDTO CreateQuote(LifeQqDTO lifeQq);
        Task<QuotationModel> QuotationPdfGeneration(QuotePoolDTO quotePoolDTO, ApiContext apiContext);
        Task<LifeQuoteDTO> SaveQuote(LifeQuoteDTO objQuote);
        //IEnumerable<ddDTO> GetMaster(string lMasterlist);
        //LeadDTO SaveSuspect(LeadDTO leadDTO);
        //IEnumerable<LeadDTO> SuspectPool();
        //LeadDTO ModifySuspect(LeadDTO leadDTO);
        Task<bool> UpdateEmpQuotationData(EMPDistribute eMPDistribute, ApiContext apiContext);
    }

    public class QuotationService : IQuotationService
    {
        private AVOLMContext _context;
        private IMapper _mapper;
        public IIntegrationService _integrationService;

        private readonly IConfiguration _configuration;

        public QuotationService(AVOLMContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
        }


        public async Task<IEnumerable<LeadDTO>> LoadProspectInfo(int ContactID)
        {

            var ProspectData = await _integrationService.GetProspectInfo(ContactID);


            return ProspectData;


        }

        public void SaveProspectInfo(LeadDTO leadDTO)
        {
            var SuspectData = _integrationService.SaveProspect(leadDTO);

            return;
        }

        public List<QuotePoolDTO> QuotationPool(ApiContext context)
        {
            List<QuotePoolDTO> QuotationData = new List<QuotePoolDTO>();
            if (string.IsNullOrEmpty(context.Name))
            {
                QuotationData = _context.TblLifeQq.OrderByDescending(c => c.CreateDate).Include(x => x.Contact)
                                                 .Select(x => new QuotePoolDTO
                                                 {
                                                     ContactType = x.Contact.ContactType,
                                                     QuoteNo = x.QuoteNo,
                                                     ProposerName = x.Contact.FirstName + " " + x.Contact.LastName,
                                                     EmiratesID = x.Contact.Nicno,
                                                     LeadNo = x.Contact.LeadNo
                                                 }).ToList();
            }
            else
            {
                QuotationData = _context.TblLifeQq.OrderByDescending(c => c.CreateDate).Include(x => x.Contact)
                                                  .Select(x => new QuotePoolDTO
                                                  {
                                                      ContactType = x.Contact.ContactType,
                                                      QuoteNo = x.QuoteNo,
                                                      ProposerName = x.Contact.FirstName + " " + x.Contact.LastName,
                                                      EmiratesID = x.Contact.Nicno,
                                                      LeadNo = x.Contact.LeadNo
                                                  }).ToList();
            }

            var pooldata = _mapper.Map<List<QuotePoolDTO>>(QuotationData);

            return pooldata;

        }

        public LifeQqDTO CreateQuote(LifeQqDTO lifeQq)
        {

            var response = _context.TblContacts.Find(lifeQq.Contact.EmailID);

            if (response == null)
            {
                lifeQq.QuoteNo = "";

                var SaveQuote = _mapper.Map<TblLifeQq>(lifeQq);
                _context.Add(SaveQuote);
                _context.SaveChanges();

            }
            else
            {
                //var SaveQuote = _mapper.Map<TblLifeQq>(lifeQq);

            }



            return lifeQq;
        }


        //Quotation notify


        public async Task<QuotationModel> QuotationPdfGeneration(QuotePoolDTO quotePoolDTO, ApiContext apiContext)
        {
            // int count = 0;
            Lead.Models.NotificationRequest notificationRequest = new Lead.Models.NotificationRequest();
            QuotationModel QuoteData = new QuotationModel();
            QuoteData.ProposerName = quotePoolDTO.ProposerName;
            QuoteData.QuotationNo = quotePoolDTO.QuoteNo;
            QuoteData.Type = quotePoolDTO.ContactType;
            QuoteData.Date = quotePoolDTO.CreateDate;




            EmailRequest emailTest = new EmailRequest()
            {
                IsAttachment = true,
                Message = $"Dear Customer, Your Quotation has been successfully Generated.Find the Quotation document attached.Assuring you the best of services always. Regards, Team AVO",
                Subject = $"AVO Quotation",
                To = "ajay.v@inubesolutions.com"
            };


            QuoteData.EmailTest = emailTest;

            try
            {

                Lead.Models.NotificationRequest request = new Lead.Models.NotificationRequest();
                request.TemplateKey = "QuotationPdf";
                request.AttachPDF = true;
                request.NotificationPayload = JsonConvert.SerializeObject(QuoteData);
                request.SendEmail = true;
                request.IsAwsS3Save = true;
                var notificationResponse = await _integrationService.SendNotificationAsync(request, apiContext);

            }
            catch (Exception ex)
            {

                var msgr = ex.ToString();
            }
            return QuoteData;
        }

        public async Task<LifeQuoteDTO> SaveQuote(LifeQuoteDTO objQuote)
        {

            try
            {

                TblLifeQq objlifeQQ = new TblLifeQq();

                string userId = _context.TblContacts.SingleOrDefault(x => x.FirstName == objQuote.UserName).ContactId.ToString();

                objlifeQQ.Createdby = userId;
                if (objQuote.RefNo == null)
                {

                    objQuote.RefNo = objQuote.UserName + " - AVO";
                }
                objlifeQQ.RefNo = objQuote.RefNo;
                objlifeQQ.PolicyTermId = Convert.ToInt32(objQuote.objProductDetials.PolicyTerm);
                objlifeQQ.PremiumTerm = Convert.ToInt32(objQuote.objProductDetials.PremiumTerm);
                objlifeQQ.Qtype = objQuote.QuotationType;
                TblContacts objcontact = null;
                if (!string.IsNullOrEmpty(objQuote.objProspect.SamsLeadNumber))
                    objcontact = _context.TblContacts.Where(a => a.LeadNo == objQuote.objProspect.SamsLeadNumber).FirstOrDefault();
                else
                    objcontact = _context.TblContacts.Where(a => a.ContactId == objQuote.objProspect.ContactID).FirstOrDefault();
                if (objcontact == null)
                {
                    objcontact = new TblContacts();
                }
                if (objcontact.Address == null)
                    objcontact.Address = new TblAddress();


                objcontact.CreatedBy = userId;
                objlifeQQ.Createdby = userId;
                int type = _context.TblMasCommonTypes.Where(a => a.Description == objQuote.objProspect.Type && (a.MasterType == "Type" || a.MasterType == "BancaType")).Select(a => a.CommonTypesId).FirstOrDefault();
                if (type == 0)
                {
                    type = _context.TblMasCommonTypes.Where(a => a.Code == objQuote.objProspect.Type && a.MasterType == "Type").Select(a => a.CommonTypesId).FirstOrDefault();
                    if (type == 0)
                        type = Convert.ToInt32(objQuote.objProspect.Type);
                }

                objcontact.ContactType = _context.TblMasCommonTypes.Where(a => a.CommonTypesId == type).Select(a => a.Description).FirstOrDefault();
                objcontact.FirstName = objQuote.objProspect.Name;
                objcontact.LastName = objQuote.objProspect.LastName;
                objcontact.Work = objQuote.objProspect.Work;
                objcontact.MobileNo = objQuote.objProspect.Mobile;
                objcontact.PhoneNo = objQuote.objProspect.Home;
                objcontact.LeadNo = objQuote.objProspect.SamsLeadNumber;
                objcontact.EmailId = objQuote.objProspect.Email;
                objcontact.Nicno = objQuote.objProspect.NIC;
                objcontact.Title = _context.TblMasCommonTypes.Where(a => a.Description == objQuote.objProspect.Salutation && a.MasterType == "Salutation").Select(a => a.Code).FirstOrDefault();
                if (string.IsNullOrEmpty(objcontact.Title))
                    objcontact.Title = objQuote.objProspect.Salutation;
                objcontact.Place = objQuote.objProspect.Place;

                if (!string.IsNullOrEmpty(objQuote.objProspect.Occupation))
                {
                    string[] SplitOccupation = objQuote.objProspect.Occupation.Split('|');
                    string EngOccupation = SplitOccupation[0];
                    objcontact.OccupationId = Convert.ToInt32(_context.TblMasLifeOccupations.Where(a => a.OccupationCode == EngOccupation).Select(a => a.CompanyCode).FirstOrDefault());
                }
                else
                {
                    objcontact.OccupationId = 0;
                }
                objcontact.PassportNo = objQuote.objProspect.PassPort;
                objcontact.DateOfBirth = objQuote.objProspect.DateofBirth;
                objcontact.Age = objQuote.objProspect.AgeNextBdy;
                objcontact.CurrentAge = objQuote.objProspect.CurrentAge;
                objcontact.MaritalStatusId = _context.TblMasCommonTypes.Where(a => a.Code == objQuote.objProspect.MaritalStatus && a.MasterType == "MaritalStatus").Select(b => b.CommonTypesId).FirstOrDefault();

                objcontact.Gender = objQuote.objProspect.Gender;
                objcontact.MonthlyIncome = objQuote.objProspect.AvgMonthlyIncome;

                if (!string.IsNullOrEmpty(objQuote.objProspect.objAddress.Pincode) && objQuote.objProspect.objAddress.Pincode.Contains('|'))
                {
                    string[] PinCity = objQuote.objProspect.objAddress.Pincode.Split('|');
                    if (PinCity != null && PinCity.Length == 2)
                    {
                        string pin = PinCity[0];
                        string City = PinCity[1];
                        objcontact.Address.City = City;
                        objcontact.Address.Pincode = pin;
                    }
                }
                objcontact.Address.Address1 = objQuote.objProspect.objAddress.Address1;
                objcontact.Address.Address2 = objQuote.objProspect.objAddress.Address2;
                objcontact.Address.Address3 = objQuote.objProspect.objAddress.Address3;
                objcontact.Address.District = objQuote.objProspect.objAddress.District;
                objcontact.Address.State = objQuote.objProspect.objAddress.State;
                objcontact.Address.Country = objQuote.objProspect.objAddress.Province;
                objcontact.ClientCode = objQuote.objProspect.ClientCode;

                if (objcontact.ContactId == 0)
                {
                    objcontact.CreationDate = DateTime.Now;
                    _context.TblContacts.Add(objcontact);
                }
                else
                {
                    _context.SaveChanges();
                }
                objlifeQQ.Contact = objcontact;
                int Plan = Convert.ToInt32(objQuote.objProductDetials.Plan);


                ///Write Integartion Service for tblProducts

                // var objProductMaster = _context.tblProducts.Where(a => a.ProductId == Plan).FirstOrDefault();

                // var objProductMaster = await _integrationService.GetAVOProduct(Plan);


                objlifeQQ.RiskCommencementDate = objQuote.RiskCommencementDate;
                //var objProductMaster = _context.tblProducts.Where(a => a.ProductName == objQuote.objProductDetials.Plan).FirstOrDefault();
                objlifeQQ.ProductNameId = Plan;
                objlifeQQ.PreferredTerm = objQuote.objProductDetials.PreferredMode;
                objlifeQQ.PlanCode = objQuote.objProductDetials.PlanCode;
                objlifeQQ.PlanId = Convert.ToInt32(objQuote.objProductDetials.Variant);
                objlifeQQ.PreferredLanguage = objQuote.objProductDetials.PreferredLangauage;
                objlifeQQ.PensionPeriod = Convert.ToInt32(objQuote.objProductDetials.PensionPeriod);
                objlifeQQ.SelfPay = objQuote.IsSelfPay;
                objlifeQQ.IsFamilyFloater = objQuote.objProductDetials.IsFamilyFloater;
                objlifeQQ.Deductable = objQuote.objProductDetials.Deductable;
                objlifeQQ.DrawDownPeriod = Convert.ToInt32(objQuote.objProductDetials.DrawDownPeriod);
                objlifeQQ.MaturityBenifits = objQuote.objProductDetials.MaturityBenefits;
                objlifeQQ.RetirementAge = Convert.ToInt32(objQuote.objProductDetials.RetirementAge);
                objlifeQQ.MonthlySurvivorIncome = objQuote.objProductDetials.MonthlySurvivorIncome;
                objlifeQQ.Sam = objQuote.objProductDetials.SAM;
                objlifeQQ.AnnualizePremium = Convert.ToInt32(objQuote.objProductDetials.AnnualPremium);
                objlifeQQ.ModalPremium = objQuote.objProductDetials.ModalPremium;
                if (!string.IsNullOrEmpty(objQuote.objProductDetials.IsAfc))
                {
                    objlifeQQ.IsAfc = objQuote.objProductDetials.IsAfc;
                }
                else
                {
                    objlifeQQ.IsAfc = "False";
                }
                objlifeQQ.NoOfOnGoingProposalWithAia = objQuote.ObjQuotationPreviousInsurance.NoOfOnGoingProposalWithAIA;
                objlifeQQ.NoOfPreviousPolicyWithAia = objQuote.ObjQuotationPreviousInsurance.NoOfPreviousPolicyWithAIA;
                objlifeQQ.OnGoingProposalWithAia = Convert.ToString(objQuote.ObjQuotationPreviousInsurance.OnGoingProposalWithAIA);
                objlifeQQ.PreviousPolicyWithAia = Convert.ToString(objQuote.ObjQuotationPreviousInsurance.PreviousPolicyWithAIA);

                if (!string.IsNullOrEmpty(objQuote.NoofChilds))
                {
                    objlifeQQ.NoOfChild = Convert.ToInt32(objQuote.NoofChilds);
                }

                if (objlifeQQ.TblQuoteMemberDetials.Count() > 0)
                {
                    DeleteExisitigMemberDetails(objlifeQQ.LifeQqid);
                }
                int ChildCount = 0;
                if (objlifeQQ.PreferredTerm != "01")
                {

                    string PrevPreferredMode = objQuote.objProductDetials.PreferredMode;
                    objQuote.objProductDetials.PreferredMode = "1";
                    objQuote = await _integrationService.GetQuotePremium(objQuote);
                    objQuote.objProductDetials.PreferredMode = PrevPreferredMode;
                }

                foreach (var Member in objQuote.objQuoteMemberDetails)
                {

                    TblQuoteMemberDetials objQuoteMember = new TblQuoteMemberDetials();
                    if (Member.Relationship == "267")
                    {
                        objQuoteMember.CreatedBy = objcontact.CreatedBy;
                        objQuoteMember.Name = objcontact.FirstName;
                        objQuoteMember.Gender = objcontact.Gender;
                        objQuoteMember.OccupationId = objcontact.OccupationId;
                        objQuoteMember.Age = objcontact.Age;
                        objQuoteMember.CurrentAge = objcontact.CurrentAge;
                        objQuoteMember.Relationship = Member.Relationship;
                        objQuoteMember.DateOfBirth = objcontact.DateOfBirth;
                        objQuoteMember.Nicno = objQuote.objProspect.NIC;

                    }
                    else if (Member.Relationship == "268")
                    {
                        if (objQuote.objSpouseDetials != null)
                        {
                            objQuoteMember.Name = objQuote.objSpouseDetials.SpouseName;
                            objQuoteMember.Gender = objQuote.objSpouseDetials.Gender;
                            string[] SplitOccupation = objQuote.objSpouseDetials.Occupation.Split('|');
                            string EngOccupation = SplitOccupation[0];
                            objQuoteMember.OccupationId = Convert.ToInt32(_context.TblMasLifeOccupations.Where(a => a.OccupationCode == EngOccupation).Select(a => a.CompanyCode).FirstOrDefault());
                            //objQuoteMember.OccupationId = /*Convert.ToInt32*/(objQuote.objSpouseDetials.OccupationId);
                            // objQuoteMember.Occupation = objQuote.objSpouseDetials.Occupation;
                            objQuoteMember.Age = objQuote.objSpouseDetials.AgeNextBirthday;
                            objQuoteMember.CurrentAge = objQuote.objSpouseDetials.CurrrentAge;
                            objQuoteMember.Relationship = Member.Relationship;
                            objQuoteMember.DateOfBirth = objQuote.objSpouseDetials.DOB;
                            objQuoteMember.Nicno = objQuote.objSpouseDetials.SpouseNIC;
                        }
                    }
                    else
                    {
                        if (objQuote.objChildDetials != null)
                        {
                            if (objQuote.objChildDetials.Count() > ChildCount)
                            {
                                var child = objQuote.objChildDetials[ChildCount];
                                objQuoteMember.Age = child.AgeNextBirthday;
                                objQuoteMember.CurrentAge = child.CurrentAge;
                                objQuoteMember.Name = child.Name;
                                objQuoteMember.DateOfBirth = child.DateofBirth;
                                objQuoteMember.Gender = child.Gender;
                                if (objQuoteMember.Gender == "M")
                                {
                                    objQuoteMember.Relationship = "269";
                                }
                                if (objQuoteMember.Gender == "F")
                                {
                                    objQuoteMember.Relationship = "270";
                                }

                                ChildCount++;
                            }

                        }

                    }
                    objQuoteMember.IsDeleted = false;
                    objQuoteMember.BasicSuminsured = Convert.ToInt32(objQuote.objProductDetials.BasicSumInsured);
                    objQuoteMember.BasicPremium = Member.ObjBenefitDetails.Where(a => a.AssuredMember == "6").Select(a => a.RiderPremium).FirstOrDefault();
                    objQuoteMember.AssuredName = Member.Assured;
                    //objQuoteMember.MemberPremium = GetRiderPremium(Member.Relationship, Member.Assured, -2, objQuote.LstBenefitOverView);
                    decimal MemberPremium = decimal.Zero;
                    foreach (var item in Member.ObjBenefitDetails.Where(a => a.BenifitOpted == true).ToList())
                    {

                        TblQuoteMemberBeniftDetials objQuoteBenifit = new TblQuoteMemberBeniftDetials();
                        objQuoteBenifit.SumInsured = item.RiderSuminsured;
                        objQuoteBenifit.Premium = item.RiderPremium;
                        objQuoteBenifit.BenifitId = item.BenefitID;
                        MemberPremium = MemberPremium + Convert.ToDecimal(item.AnnualRiderPremium);
                        objQuoteBenifit.AnnualRiderPremium = Convert.ToDecimal(item.AnnualRiderPremium);
                        objQuoteBenifit.LoadingAmount = Convert.ToDecimal(item.LoadingAmount);
                        objQuoteBenifit.DiscountAmount = Convert.ToDecimal(item.DiscountAmount);
                        objQuoteBenifit.ActualPremium = Convert.ToDecimal(item.ActualRiderPremium);
                        objQuoteBenifit.LoadingPercentage = Convert.ToInt32(Convert.ToDecimal(item.LoadingPercentage));
                        objQuoteBenifit.LoadinPerMille = Convert.ToInt32(Convert.ToDecimal(item.LoadinPerMille));
                        if (objlifeQQ.PreferredTerm == "01")
                        {
                            objQuoteBenifit.AnnualModePremium = Convert.ToDecimal(item.AnnualRiderPremium);
                            objQuoteBenifit.AnnualDiscountAmount = Convert.ToDecimal(item.DiscountAmount);
                            objQuoteBenifit.AnnualLoadingAmount = Convert.ToInt32(Convert.ToDecimal(item.LoadingAmount));
                        }
                        else
                        {
                            objQuoteBenifit.AnnualModePremium = Convert.ToDecimal(item.AnnualModeAnnualpremium);
                            objQuoteBenifit.AnnualDiscountAmount = Convert.ToDecimal(item.AnnualModeDiscountAmount);
                            objQuoteBenifit.AnnualLoadingAmount = Convert.ToInt32(Convert.ToDecimal(item.AnnualModeLoadingAmount));
                        }

                        objQuoteMember.TblQuoteMemberBeniftDetials.Add(objQuoteBenifit);
                    }


                    objQuoteMember.MemberPremium = Convert.ToString(MemberPremium);
                    objlifeQQ.TblQuoteMemberDetials.Add(objQuoteMember);


                }


                objlifeQQ.IsActive = true;
                objlifeQQ.HalfyearlyPremium = objQuote.HalfYearlyPremium;
                objlifeQQ.QuarterlyPremium = objQuote.QuaterlyPremium;
                objlifeQQ.AnnualPremium = objQuote.AnnualPremium;
                objlifeQQ.Monthly = objQuote.MonthlyPremium;
                objlifeQQ.Vat = objQuote.VAT;
                objlifeQQ.Cess = objQuote.Cess;
                objlifeQQ.PolicyFee = objQuote.PolicyFee;


                if (string.IsNullOrEmpty(objQuote.QuoteNo))
                {
                    objlifeQQ.VersionNo = 1;
                    //QuoteNo objQuoteNo = new QuoteNo();

                    objlifeQQ.QuoteNo = GenerateQuoteNo("", "01");

                    objlifeQQ.StatusId = 1;// Open
                    objlifeQQ.CreateDate = DateTime.Now;
                    _context.TblLifeQq.Add(objlifeQQ);
                    _context.SaveChanges();
                }
                else
                {
                    string Result = objQuote.QuoteNo.Substring(0, objQuote.QuoteNo.Length - 2);
                    var VersionNo = (from Quote in _context.TblLifeQq
                                     where Quote.QuoteNo.Contains(Result)
                                     orderby Quote.VersionNo descending
                                     select Quote.VersionNo
                                     ).FirstOrDefault();

                    int NextVersion = Convert.ToInt32(VersionNo) + 1;
                    string value = NextVersion.ToString("D2");
                    objQuote.QuoteNo = objQuote.QuoteNo.Remove(objQuote.QuoteNo.Length - 2, 2) + value;
                    objQuote.QuoteVersion = NextVersion;
                    objlifeQQ.VersionNo = NextVersion;
                    objlifeQQ.QuoteNo = objQuote.QuoteNo;
                    objlifeQQ.StatusId = 1;// Open
                    objlifeQQ.CreateDate = DateTime.Now;
                    _context.TblLifeQq.Add(objlifeQQ);
                    _context.SaveChanges();
                }
                if (!string.IsNullOrEmpty(objQuote.Signature))
                {
                    objlifeQQ.ProspectSignature = objQuote.ProspectSign;
                    objlifeQQ.ProposerSignPath = objQuote.ProposerSignPath.Replace("ContactID", objlifeQQ.QuoteNo);
                    objlifeQQ.SignType = "ProposerSign";
                    _context.SaveChanges();

                }
                if (!string.IsNullOrEmpty(objQuote.WPProposerSignature))
                {
                    objlifeQQ.Wpsignature = objQuote.WPSignature;
                    objlifeQQ.WppsignPath = objQuote.WPProposerSignPath.Replace("ContactID", objlifeQQ.QuoteNo); ;
                    objlifeQQ.SignType = "WealthPlannerSign";
                    _context.SaveChanges();
                }



                //This Counter Offer is Used in case of Under Writer we need to use it Later - Ravi

                //#region Counter Offer Case
                //if (objQuote.IsForCounterOffer)
                //{
                //    var PolicyInfo = _context.tblPolicies.Where(a => a.QuoteNo == objQuote.PrevQuoteNo).FirstOrDefault();
                //    if (PolicyInfo != null)
                //    {
                //        objQuote.ProposalNo = PolicyInfo.ProposalNo; // Set proposal No For CLA letter Generation
                //    }
                //    else
                //    {
                //        // For Second time Save
                //        var _PolicyInfo = _context.tblPolicies.Where(a => a.QuoteNo == objQuote.QuoteNo).FirstOrDefault();
                //        if (_PolicyInfo != null)
                //        {
                //            objQuote.ProposalNo = _PolicyInfo.ProposalNo; // Set proposal No For CLA letter Generation
                //            objQuote.PrevQuoteNo = _PolicyInfo.QuoteNo;
                //        }
                //    }

                //    CounterOfferChanges(objQuote);
                //}
                //#endregion

                objQuote.QuoteNo = objlifeQQ.QuoteNo;
                objQuote.Message = "Success";
                objQuote.LifeQQID = objlifeQQ.LifeQqid;




                var illustration = await _integrationService.GetQuotePremium(objQuote);
                // objQuote = illustration.GetIllustration(objQuote);
                SaveIllustration(objQuote);

                //GetDraw DownDetails KEPT PENDING

                //illustration.GetDrawDownDetails(objQuote);

                return objQuote;

            }
            catch (Exception ex)
            {
                // log4net.GlobalContext.Properties["ErrorCode"] = Codes.GetErrorCode();
                //Logger.Error(ex);
                objQuote.Message = "Error";
                throw ex;
            }
        }



        public void SaveIllustration(LifeQuoteDTO lifeQuote)
        {

            //ApiContext apiContext = new ApiContext();
            //apiContext.ProductType = "Avo";
            //apiContext.ServerType = "AvoDev";
            //_context = (AVOPRContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);


            //using (AVOAIALifeEntities entity = new AVOAIALifeEntities())
            //{
            foreach (var item in _context.TblQuoteIllustration.Where(a => a.QuoteNo == lifeQuote.QuoteNo).ToList())
            {
                _context.Entry(item).State = EntityState.Deleted;
            }
            foreach (var item in lifeQuote.LstIllustation)
            {
                TblQuoteIllustration quoteIllustration = new TblQuoteIllustration();
                quoteIllustration.PolicyYear = item.PolicyYear;
                quoteIllustration.BasicPremium = item.BasicPremium;
                quoteIllustration.MainBenefitsPremium = item.MainBenefitsPremium;
                quoteIllustration.AdditionalBenefitsPremiums = item.AdditionalBenefitsPremiums;
                quoteIllustration.TotalPremium = item.TotalPremium;
                quoteIllustration.InvestmentAcbalance = item.FundBalanceDiv4;
                quoteIllustration.SurrenderValue4 = item.SurrenderValueDiv4;
                quoteIllustration.MonthlyDrawDown4 = item.DrawDownDiv4;
                quoteIllustration.InvestmentAcbalance8 = item.FundBalanceDiv8;
                quoteIllustration.SurrenderValue8 = item.SurrenderValueDiv8;
                quoteIllustration.MonthlyDrawDown8 = item.DrawDownDiv8;
                quoteIllustration.InvestmentAcbalance12 = item.FundBalanceDiv12;
                quoteIllustration.SurrenderValue12 = item.SurrenderValueDiv12;
                quoteIllustration.MonthlyDrawDown12 = item.DrawDownDiv12;
                quoteIllustration.PensionBoosterDiv4 = item.PensionBoosterDiv4;
                quoteIllustration.PensionBoosterDiv8 = item.PensionBoosterDiv8;
                quoteIllustration.PensionBoosterDiv12 = item.PensionBoosterDiv12;
                quoteIllustration.InvestmentAcbalance5 = item.FundBalanceDiv5;
                quoteIllustration.InvestmentAcbalance6 = item.FundBalanceDiv6;
                quoteIllustration.InvestmentAcbalance7 = item.FundBalanceDiv7;
                quoteIllustration.InvestmentAcbalance9 = item.FundBalanceDiv9;
                quoteIllustration.InvestmentAcbalance10 = item.FundBalanceDiv10;
                quoteIllustration.InvestmentAcbalance11 = item.FundBalanceDiv11;
                quoteIllustration.MonthlyDrawDown5 = item.DrawDownDiv5;
                quoteIllustration.MonthlyDrawDown6 = item.DrawDownDiv6;
                quoteIllustration.MonthlyDrawDown7 = item.DrawDownDiv7;
                quoteIllustration.MonthlyDrawDown9 = item.DrawDownDiv9;
                quoteIllustration.MonthlyDrawDown10 = item.DrawDownDiv10;
                quoteIllustration.MonthlyDrawDown11 = item.DrawDownDiv11;
                quoteIllustration.UnAllocatedPremium = item.UnAllocatedPremium;

                quoteIllustration.QuoteNo = lifeQuote.QuoteNo;
                _context.TblQuoteIllustration.Add(quoteIllustration);
            }

            _context.SaveChanges();
            //}
        }


        public string GenerateQuoteNo(string BranchCode, string Version)
        {

            var connectionString = _configuration.GetConnectionString("PCConnection");
            int QuotationNumber = 0;
            string QuoteNo = "";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("[LM].[usp_GetNextQuoteNumber]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Numberingtype", "QuoteNo");
                command.Parameters.Add("@NextNo", SqlDbType.Int);
                command.Parameters["@NextNo"].Direction = ParameterDirection.Output;
                command.CommandTimeout = 3600;
                command.ExecuteNonQuery();
                QuotationNumber = (int)command.Parameters["@NextNo"].Value;
                connection.Close();

                Int64 seqNo = Convert.ToInt64(QuotationNumber);
                string value = seqNo.ToString("D7");
                DateTime CurrentDate = DateTime.Now;
                string GetYear = CurrentDate.Year.ToString();
                GetYear = GetYear.Substring(GetYear.Length - 2);
                //   string QuoteNo = "QL-" + BranchCode + "-" + GetYear + "-" + value+"-"+ Version;
                QuoteNo = "Q" + BranchCode + GetYear + value + "-" + Version;

            }


            return QuoteNo;

        }


        public void DeleteExisitigMemberDetails(int LifeQQID)
        {
            try
            {
                // AVOAIALifeEntities Context = new AVOAIALifeEntities();
                foreach (var Member in _context.TblQuoteMemberDetials.Where(a => a.LifeQqid == LifeQQID).ToList())
                {
                    Member.IsDeleted = true;
                    _context.SaveChanges();
                }


            }
#pragma warning disable CS0168 // Variable is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // Variable is declared but never used
            {


                //  log4net.GlobalContext.Properties["ErrorCode"] = Codes.GetErrorCode();
                //Logger.Error(ex);
            }
        }

        public async Task<bool> UpdateEmpQuotationData(EMPDistribute eMPDistribute, ApiContext apiContext)
        {
            foreach (var item in eMPDistribute.EMPDistributeDTO)
            {
                var data = _context.TblLifeQq.FirstOrDefault(a => a.LifeQqid == item.PrimaryIds);
                data.HandledBy = item.PositionId.ToString();
                _context.Update(data);
            }
            _context.SaveChanges();
            return true;
        }

    }
}
