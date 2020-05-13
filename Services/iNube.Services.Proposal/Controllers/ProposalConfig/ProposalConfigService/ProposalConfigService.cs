using AutoMapper;
using iNube.Services.Proposal.Common;
using iNube.Services.Proposal.Models;
using iNube.Services.Proposal.PLEntities;
using iNube.Services.Proposal.Policy;
using iNube.Utility.Framework.Model;
using log4net.Repository.Hierarchy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;
using static Microsoft.AspNetCore.Razor.Language.TagHelperMetadata;

namespace iNube.Services.Proposal.Controllers.ProposalConfig.ProposalConfigService
{
    public interface IProposalService
    {
        //ActionResult ModifyProposal(string PolicyID, string userType = null);
        // ProposalInboxDTO FetchProposalIncompleteDetails(ProposalInboxDTO objProposalData);
        // void ProposalPool();
        List<InboxDetailsDto> ProposalPoll();
        List<PolicyOwnerDetailsDto> PolicyOwnerDetails();
        List<InboxDetailsDto> FetchProposalSubmittedDetails();
        List<PandingRequirementsDto> FetchPendingRequirements();
        List<FetchProposalDataDto> FetchProposal();
        List<FetchProposalDataDto> PartialFormData();
        List<TblPlcommonTypesDto> MastertypeData();
      //  List<TblPolicyDto> SaveProposal();
        // PolicyDto SubmitModifyProposal(PolicyDto tblPolicyDto);
    }
    public class ProposalService : IProposalService
    {
        private PLContext Context;
        private IMapper _mapper;
        string userId = "Sahir";


        public ProposalService(PLContext context, IMapper mapper)
        {
            Context = context;
            _mapper = mapper;

        }



        //this is used for proposal pool and partial form data
        public List<InboxDetailsDto> ProposalPoll()
        {
#pragma warning disable CS0219 // Variable is assigned but its value is never used
            var userId = "sahir";
#pragma warning restore CS0219 // Variable is assigned but its value is never used
            var ProposalData =
                (from objtblpolicy in Context.TblPolicy.Where(a => a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                                      || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192)
                 join objtbllifeQQ in Context.TblLifeQq
                 on objtblpolicy.QuoteNo equals objtbllifeQQ.QuoteNo
                 join Contact in Context.TblContacts
                 on objtbllifeQQ.ContactId equals Contact.ContactId
                 join relationship in Context.TblPolicyRelationship
                 on objtblpolicy.PolicyId equals relationship.PolicyId
                 join objproduct in Context.TblProducts
                 on objtblpolicy.ProductId equals objproduct.ProductId
                 join policyClients in Context.TblPolicyClients
                 on relationship.PolicyClientId equals policyClients.PolicyClientId
                 join commontype in Context.TblPlcommonTypes
                 on objtblpolicy.PolicyStageStatusId equals commontype.CommonTypesId
                 join objTblPolicyExtensionDto in Context.TblPolicyExtension
                 on objtblpolicy.PlanId equals objTblPolicyExtensionDto.PolicyId
                 // where objtblpolicy.Createdby == userId
                 select new InboxDetailsDto
                 {
                     PolicyID = objtblpolicy.PolicyId,
                     QuoteNo = objtblpolicy.QuoteNo,
                     FirstName = policyClients.FirstName,
                     ProposalNo = objtblpolicy.ProposalNo,
                     NIC = policyClients.Newnicno,
                     Salutation = policyClients.Title,
                     Surname = policyClients.LastName,
                     // PreferredLanguage = objtblpolicy.PreferredLanguage,
                     // ProductCode = Common.ProductCode,
                     PlanName = objproduct.ProductName,
                     PaymentFrequency = objtblpolicy.PaymentFrequency,
                     Need = objTblPolicyExtensionDto.ProposalNeed,
                     LeadNo = Contact.LeadNo,
                     Banca = Contact.IntroducerCode,
                     ProposalStatus = commontype.Description,
                     FullName = (policyClients.FullName != "CORP" ? Context.TblPlcommonTypes.Where(a => a.Code == policyClients.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + policyClients.FirstName + " " + policyClients.LastName : policyClients.CorporateName)
                 }).ToList();
            var pooldata = _mapper.Map<List<InboxDetailsDto>>(ProposalData);
            return pooldata;
        }
        public List<InboxDetailsDto> FetchProposalSubmittedDetails()
        {


#pragma warning disable CS0219 // Variable is assigned but its value is never used
            var userId = "sahir";
#pragma warning restore CS0219 // Variable is assigned but its value is never used
            var ProposalData = (from objtblpolicy in Context.TblPolicy.Where(a => a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                              || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192 || a.PolicyStageStatusId == 194 || a.PolicyStageStatusId == 195 || a.PolicyStageStatusId == 196 || a.PolicyStageStatusId == 197 || a.PolicyStageStatusId == 198
                                                              || a.PolicyStageStatusId == 1068 || a.PolicyStageStatusId == 1447 || a.PolicyStageStatusId == 1448 || a.PolicyStageStatusId == 2374 || a.PolicyStageStatusId == 2375 || a.PolicyStageStatusId == 2376 || a.PolicyStageStatusId == 2490 || a.PolicyStageStatusId == 2491)
                                join lifeqq in Context.TblLifeQq
                                on objtblpolicy.QuoteNo equals lifeqq.QuoteNo
                                //join Common in Context.tblProducts on objtblpolicy.ProductID equals Common.ProductId
                                join Contact in Context.TblContacts
                                on lifeqq.ContactId equals Contact.ContactId
                                join objproduct in Context.TblProducts
                                on objtblpolicy.ProductId equals objproduct.ProductId
                                join commontype in Context.TblPlcommonTypes
                                on objtblpolicy.PolicyStageStatusId equals commontype.CommonTypesId
                                join relationship in Context.TblPolicyRelationship
                                on objtblpolicy.PolicyId equals relationship.PolicyId
                                join objTblPolicyExtensionDto in Context.TblPolicyExtension
                                 on objtblpolicy.PlanId equals objTblPolicyExtensionDto.PolicyId
                                join policyClients in Context.TblPolicyClients
                                on relationship.PolicyClientId equals policyClients.PolicyClientId
                                // where objtblpolicy.Createdby == UserInfo.Id
                                select new InboxDetailsDto
                                {
                                    PolicyID = objtblpolicy.PolicyId,
                                    ProposalNo = objtblpolicy.ProposalNo,
                                    QuoteNo = objtblpolicy.QuoteNo,
                                    FirstName = policyClients.FirstName,
                                    Surname = policyClients.LastName,
                                    NIC = policyClients.Newnicno,
                                    Salutation = policyClients.Title,

                                    PlanName = objproduct.ProductName,
                                    PaymentFrequency = objtblpolicy.PaymentFrequency,
                                    Need = objTblPolicyExtensionDto.ProposalNeed,
                                    //SubmittedPropMobile = objtblpolicyclients.MobileNo,
                                    //SubmittedPropHome = objtblpolicyclients.HomeNo,
                                    //SubmittedPropWork = objtblpolicyclients.WorkNo,
                                    // SubmittedPropEmail = objtblpolicyclients.EmailID,
                                    LeadNo = Contact.LeadNo,
                                    ProposalStatus = commontype.Description,
                                    FullName = (policyClients.FullName != "CORP" ? Context.TblPlcommonTypes.Where(a => a.Code == policyClients.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + policyClients.FirstName + " " + policyClients.LastName : policyClients.CorporateName)
                                    //SubmittedPropInforce = "",
                                }).OrderByDescending(a => a.ProposalNo).ToList();
            try
            {
                if (ProposalData == null)
                {
                    ProposalData = new List<InboxDetailsDto>();
                }
            }
            catch (Exception)
            {
                log4net.GlobalContext.Properties["ErrorCode"] = "Error";//InboxDetails() have to see
                                                                        // Logger.Error(ex);
            }
            var poolProposaldata = _mapper.Map<List<InboxDetailsDto>>(ProposalData);
            return poolProposaldata;
        }
        public List<PandingRequirementsDto> FetchPendingRequirements()
        {
            UWInboxDto objUWInbox = new UWInboxDto();
            try
            {

                var USerInfo = "SAHIR";// Context.AspNetUsers.Where(a => a.UserName == objUWInbox.UserName).FirstOrDefault();
                if (USerInfo != null)
                {
                    if (objUWInbox.Message == "Pending")
                    {
                        objUWInbox.LstProposals = (from objpolicy in Context.TblPolicy//where condition i have to put form UserId
                                                                                      //  join objproduct in Context.tblProducts
                                                                                      //  on objpolicy.ProductID equals objproduct.ProductId
                                                   join objtblpolicyrelationship in Context.TblPolicyRelationship on objpolicy.PolicyId equals objtblpolicyrelationship.PolicyId
                                                   join objtblpolicyclients in Context.TblPolicyClients on objtblpolicyrelationship.PolicyClientId equals objtblpolicyclients.PolicyClientId
                                                   join objProposalPayments in Context.TblProposalPremium on objpolicy.PolicyId equals objProposalPayments.PolicyId
                                                   where //objpolicy.PolicyStageStatusID == CrossCuttingConstants.PolicyStageStatusDecline ||
                                                   objpolicy.PolicyStageStatusId == CrossCuttingConstantsDto.PolicyStageStatusPending
                                                   || objpolicy.PolicyStageStatusId == CrossCuttingConstantsDto.PolicyStageStatusCounterOffer
                                                   || objpolicy.PolicyStageStatusId == CrossCuttingConstantsDto.PolicyStageStatusOutStandingReq
                                                   select new PandingRequirementsDto
                                                   {
                                                       ProposalNo = objpolicy.ProposalNo,
                                                       QuoteNo = objpolicy.QuoteNo,
                                                       //InsuredName = objtblpolicyclients.FirstName,
                                                       FullName = (objtblpolicyclients.FullName != "CORP" ? Context.TblPlcommonTypes.Where(a => a.Code == objtblpolicyclients.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + objtblpolicyclients.FirstName + " " + objtblpolicyclients.LastName : objtblpolicyclients.CorporateName),
                                                       // PlanName = objproduct.ProductName,//this data will come form ajay
                                                       //  PolicyId = objpolicy.PolicyID,
                                                       //  PolicyTerm = objpolicy.PolicyTerm,
                                                       // IssueDate = objpolicy.CreatedDate,
                                                       IssueDate = objpolicy.CreatedDate.ToString(),
                                                       Premium = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium),
                                                       Premiumlkr = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium).ToString(),
                                                       // AdditionalPremium = objProposalPayments.AdditionalPremium,
                                                   }).ToList();
                        for (int i = 0; i < objUWInbox.LstProposals.Count(); i++)
                        {
                            objUWInbox.LstProposals[i].Premiumlkr = string.Format(CultureInfo.GetCultureInfo(1033), "{0:n0}", Convert.ToInt64((objUWInbox.LstProposals[i].Premiumlkr.Split('.')[0])));
                        }
                    }
                    else if (objUWInbox.Message == "Processed")
                    {
#pragma warning disable CS0168 // Variable is declared but never used
                        List<decimal?> PolicyIDs;//(Context.tblPolicyUWRemarkHistories.Where(a => a.CreatedBy == USerInfo.Id && a.CommonID != null
#pragma warning restore CS0168 // Variable is declared but never used
                              //                         && (a.Decision == CrossCuttingConstants.UWDecisionAccepted || a.Decision == CrossCuttingConstants.UWDecisionDecline
                              //                         || a.Decision == CrossCuttingConstants.UWDecisionPostPone || a.Decision == CrossCuttingConstants.UWDecisionWithDrawn || a.Decision == CrossCuttingConstants.UWDecisionReferToUW
                              //                          || a.Decision == CrossCuttingConstants.UWDecisionOutStandingReq || a.Decision == CrossCuttingConstants.UWDecisionNotTaken
                              //                          || a.Decision == CrossCuttingConstants.UWDecisionCounterOffer)).Select(a => a.PolicyID)).ToList();


                        objUWInbox.LstProposals = (from objpolicy in Context.TblPolicy//.Where(a => PolicyIDs.Contains(a.PolicyId))
                                                                                      // join objproduct in Context.tblProducts
                                                                                      //on objpolicy.ProductId equals objproduct.ProductId
                                                   join objtblpolicyrelationship in Context.TblPolicyRelationship on objpolicy.PolicyId equals objtblpolicyrelationship.PolicyId
                                                   join objtblpolicyclients in Context.TblPolicyClients on objtblpolicyrelationship.PolicyClientId equals objtblpolicyclients.PolicyClientId
                                                   join objProposalPayments in Context.TblProposalPremium on objpolicy.PolicyId equals objProposalPayments.PolicyId
                                                   select new PandingRequirementsDto
                                                   {
                                                       ProposalNo = objpolicy.ProposalNo,
                                                       QuoteNo = objpolicy.QuoteNo,
                                                       //  NIC = objtblpolicyclients.Newnicno,
                                                       FullName = objtblpolicyclients.LastName,
                                                       //  planName = objproduct.ProductName,
                                                       // PolicyId = objpolicy.PolicyID,
                                                       // PolicyTerm = objpolicy.PolicyTerm,
                                                       IssueDate = objpolicy.CreatedDate.ToString(),

                                                       Premium = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium),
                                                       // Decision = objpolicy.PolicyStageStatusID.ToString(),

                                                   }).ToList().Select(c => new PandingRequirementsDto
                                                   {
                                                       ProposalNo = c.ProposalNo,
                                                       QuoteNo = c.QuoteNo,
                                                       // NIC = c.NIC,
                                                       // InsuredName = c.InsuredName,
                                                       // PlanName = c.PlanName,
                                                       //PolicyId = c.PolicyId,             //Data will come from another table
                                                       // PolicyTerm = c.PolicyTerm,
                                                       IssueDate = c.IssueDate,
                                                       Premium = c.Premium,
                                                       // Decision = GetDecisionDescription(c.Decision),
                                                   }).ToList();

                    }
                    else
                    {
                        #region UW Inbox 
                        objUWInbox.LstProposals = (from objpolicy in Context.TblPolicy
                                                       // join objproduct in Context.tblProducts
                                                       //on objpolicy.ProductID equals objproduct.ProductId

                                                       //join AspnetUsers in Context.AspNetUsers on objpolicy.Createdby equals AspnetUsers.Id
                                                       //join objUserdetails in Context.tblUserDetails on AspnetUsers.UserName equals objUserdetails.LoginID
                                                       // join objUserChannelMap in Context.tblUserChannelMaps on objUserdetails.NodeID equals objUserChannelMap.NodeId
                                                       // join objChannel in Context.tblmasChannels on objUserChannelMap.ChannelID equals objChannel.ChannelID


                                                   join objtblpolicyrelationship in Context.TblPolicyRelationship on objpolicy.PolicyId equals objtblpolicyrelationship.PolicyId
                                                   join objtblpolicyclients in Context.TblPolicyClients on objtblpolicyrelationship.PolicyClientId equals objtblpolicyclients.PolicyClientId
                                                   join objProposalPayments in Context.TblProposalPremium on objpolicy.PolicyId equals objProposalPayments.PolicyId

                                                   join objtblpolicyMemberDetails in Context.TblPolicyMemberDetails.Where(a => a.Assuredname == "MainLife") on objpolicy.PolicyId equals objtblpolicyMemberDetails.PolicyId

                                                   // join objpolicyAllocation in Context.tblPolicyUWAllocations on objpolicy.PolicyID equals objpolicyAllocation.PolicyID
                                                   //  where objpolicy.PolicyStageStatusID == CrossCuttingConstants.PolicyStageStatusReferToUW && objpolicyAllocation.AllocatedTo == USerInfo.Id // UW
                                                   let ISAFC = objtblpolicyMemberDetails.Afc == true ? objtblpolicyMemberDetails.Afc : false
                                                   select new PandingRequirementsDto
                                                   {
                                                       ProposalNo = objpolicy.ProposalNo,
                                                       // ProductPriority = objproduct.Priority,
                                                       // ChannelPriority = objChannel.Priority,
                                                       QuoteNo = objpolicy.QuoteNo,
                                                       FullName = objtblpolicyclients.LastName,
                                                       // NIC = objtblpolicyclients.NEWNICNo,
                                                       // ProductName = objproduct.ProductName,
                                                       // PolicyId = objpolicy.PolicyID,
                                                       // PolicyTerm = objpolicy.PolicyTerm,
                                                       // IssueDate = objpolicy.CreatedDate,
                                                       IssueDate = objpolicy.CreatedDate.ToString(),
                                                       Premium = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium),
                                                       //  Channel = objChannel.ChannelName,
                                                       //  AllocatedDate = objpolicyAllocation.CreatedDate,
                                                       // SARVal = objtblpolicyMemberDetails.SAR,
                                                       //ISAFC = ISAFC,
                                                       // NoofDays = DbFunctions.DiffDays(objpolicyAllocation.CreatedDate, DateTime.Now)
                                                   }).  // SAR
                                                   ToList();
                        #endregion
                    }
                    foreach (var obj in objUWInbox.LstProposals)
                    {
                        obj.IssueDate = obj.IssueDate.ToString();
                    }
                }
            }
            catch (Exception)
            {
                log4net.GlobalContext.Properties["ErrorCode"] = "Error";//Codes.GetErrorCode();
                                                                        // Logger.Error(ex);
            }
            return objUWInbox.LstProposals;

        }

        public List<FetchProposalDataDto> FetchProposal()
        {
            var FetchProposalData = (
                from objTblPolicyDto in Context.TblPolicy
                join objTblPolicyExtensionDto in Context.TblPolicyExtension
                on objTblPolicyDto.PlanId equals objTblPolicyExtensionDto.PolicyId
                select new FetchProposalDataDto
                {
                    QuoteNo = objTblPolicyDto.QuoteNo,
                    ProposalNo = objTblPolicyDto.ProposalNo,
                    PaymentFrequency = objTblPolicyDto.PaymentFrequency,
                    PlanName = "",
                    Need = objTblPolicyExtensionDto.ProposalNeed
                }
                ).ToList();
            var fetchProposalldata = _mapper.Map<List<FetchProposalDataDto>>(FetchProposalData);
            return fetchProposalldata;
        }

        //public PolicyDto SubmitModifyProposal(PolicyDto tblPolicyDto)
        //{
        //    tblPolicyDto.PolicyStartDate = DateTime.Now;

        //    tblPolicyDto.PolicyIssueDate = DateTime.Now;
        //    tblPolicyDto.PolicyEndDate = DateTime.Now;
        //    tblPolicyDto.Deductible = false;
        //    var data = _mapper.Map<TblPolicy>(tblPolicyDto);
        //    try
        //    {
        //        Context.TblPolicy.Add(data);
        //        Context.SaveChanges();
        //    }
        //    catch (Exception ex)
        //    {

        //        // throw;
        //    }
        //    return tblPolicyDto;
        //}
        //public List<FetchProposalDataDto> PartialFormData()
        //{
        //    var partialFormData=(
        //        from objtblpolicy in Context.TblPolicy
        //        join lifeqq in Context.TblLifeQq
        //        on objtblpolicy.QuoteNo equals lifeqq.QuoteNo


        //        )
        //    return null;
        //}


        public List<FetchProposalDataDto> PartialFormData()
        {
            var partialFormData = (
                from objtblpolicy in Context.TblPolicy.Where(a => a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                                      || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192)
                join objTblPolicyExtensionDto in Context.TblPolicyExtension

               on objtblpolicy.PlanId equals objTblPolicyExtensionDto.PolicyId
                join objproduct in Context.TblProducts
                on objtblpolicy.ProductId equals objproduct.ProductId
                select new FetchProposalDataDto
                {
                    ProposalNo = objtblpolicy.ProposalNo,
                    QuoteNo = objtblpolicy.QuoteNo,
                    PlanName = objproduct.ProductName,
                    PaymentFrequency = objtblpolicy.PaymentFrequency,
                    Need = objTblPolicyExtensionDto.ProposalNeed
                }

                ).ToList();
            var pooldata = _mapper.Map<List<FetchProposalDataDto>>(partialFormData);
            return pooldata;

        }

        //Policy Owner Details
        public List<PolicyOwnerDetailsDto> PolicyOwnerDetails()
        {

            {
#pragma warning disable CS0219 // Variable is assigned but its value is never used
                var userId = "sahir";
#pragma warning restore CS0219 // Variable is assigned but its value is never used
                var PolicyOwnerDetailsData =
                    (from objtblpolicy in Context.TblPolicy.Where(a => a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                                          || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192)
                     join objtbllifeQQ in Context.TblLifeQq
                     on objtblpolicy.QuoteNo equals objtbllifeQQ.QuoteNo
                     join Contact in Context.TblContacts
                     on objtbllifeQQ.ContactId equals Contact.ContactId
                     join relationship in Context.TblPolicyRelationship
                     on objtblpolicy.PolicyId equals relationship.PolicyId
                     join objproduct in Context.TblProducts
                     on objtblpolicy.ProductId equals objproduct.ProductId
                     join policyClients in Context.TblPolicyClients
                     on relationship.PolicyClientId equals policyClients.PolicyClientId
                     
                    // join commontype in Context.TblPlcommonTypes
                    // on policyClients.AdressId equals commontype.CommonTypesId
                     //join objTblPolicyExtensionDto in Context.TblPolicyExtension
                     //on objtblpolicy.PlanId equals objTblPolicyExtensionDto.PolicyId
                     join objtblAdress in Context.TblAddress
                     on policyClients.AdressId equals objtblAdress.AddressId
                     // where objtblpolicy.Createdby == userId
                     select new PolicyOwnerDetailsDto
                     {
                         Salutation = policyClients.Title,
                         NameWithInitial = policyClients.NameWithInitials,
                         GivenName = "",
                         SurName=policyClients.LastName,
                         EmiratesId="",
                         DateOfBirth = policyClients.DateOfBirth,
                         Age = policyClients.Age,

                         GenderID=policyClients.Gender,//bit confusion
                         MaritialStatus= policyClients.MaritalStatus,
                         Occupation = policyClients.OccupationId,//bit confusion here
                         AnnualIncome = policyClients.MonthlyIncome,
                         PassportNumber = policyClients.PassportNumber,
                         NameOfEmployee = policyClients.FullName,//Bit consusion also here
                         Nationality = policyClients.Nationality,
                         CountryOfResidence = "" ,//have to check into another table
                         AgeProof = "",
                         OccupationRequireHarzasousWork= policyClients.OccupationHazardousWork,
                         SpecifyOccupationWork=policyClients.SpecifyHazardousWork,//bit confusion
                         CountryOfOccupation=policyClients.CountryOccupation,
                         MobileNo=policyClients.MobileNo,
                         Home=policyClients.HomeNo,
                         OfficeNo=policyClients.WorkNo,
                         Email=policyClients.EmailId,
                         Address1= objtblAdress.Address1,
                         Address2 = objtblAdress.Address2,
                         Address3 = objtblAdress.Address3,
                         PostalCode=objtblAdress.Pincode,
                         District=objtblAdress.District,
                         Province=objtblAdress.State,
                         PAddress1= objtblAdress.Address1,
                         PAddress2= objtblAdress.Address2,
                         PAddress3=objtblAdress.Address3,
                         PPostalCode=objtblAdress.Pincode,
                         PDistrict= objtblAdress.District,
                         PProvince= objtblAdress.State,


                     }).ToList();
                var pooldata = _mapper.Map<List<PolicyOwnerDetailsDto>>(PolicyOwnerDetailsData);
                return pooldata;
            }



        }


        //Get master data
        public List<TblPlcommonTypesDto> MastertypeData()
        {


            //if (Context.TblPlcommonTypes.Where(x => x.MasterType == mType))


            var MasterData = Context.TblPlcommonTypes
                                                .Select(x => new TblPlcommonTypesDto
                                                {
                                                    mID = x.CommonTypesId,
                                                    mValue = x.Description,
                                                    mType = x.MasterType

                                                }).ToList();



            return MasterData;



        }


        //Modifying The proposal data
        //public TblPolicyDto SaveProposal(TblPolicyDto TblpolicyDto)
        //{
        //    try
        //    {
        //        TblPolicy objpolicy = new TblPolicy();

        //        if (!string.IsNullOrEmpty(TblpolicyDto.QuoteNo))
        //        {
        //            objpolicy = Context.TblPolicy.Where(a => a.QuoteNo == TblpolicyDto.QuoteNo).FirstOrDefault();
        //            if (objpolicy == null)
        //            {
        //                objpolicy = new TblPolicy();
        //            }
        //        }
        //        if (TblpolicyDto.RefNo == null)
        //        {
        //           // policyDto.RefNo = policyDto.UserName + " - AVO";
        //        }

        //        objpolicy.RefNo = TblpolicyDto.RefNo;
        //        TblLifeQq objlifeQQ = new TblLifeQq();
        //        objlifeQQ = Context.TblLifeQq.Where(a => a.QuoteNo == TblpolicyDto.QuoteNo).FirstOrDefault();



        //        //filling the data for policy

        //      //  objpolicy = FillPolicyInfo(TblpolicyDto, objpolicy);
        //        if (TblpolicyDto.PlanName != null)//plan name is not there
        //        {
        //            //objpolicy.PlanID = Context.tblProducts.Where(a => a.ProductName == ObjPolicy.PlanName).FirstOrDefault().ProductId;
        //            objpolicy.PlanId = objlifeQQ.PlanId;
        //        }

        //        if (TblpolicyDto.PlanName != null)
        //        {
        //            //objpolicy.ProductID = Context.tblMasProductPlans.Where(a => a.PlanDescriprion == ObjPolicy.PlanName).FirstOrDefault().PlanId;
        //            objpolicy.ProductId = objlifeQQ.ProductNameId;
        //        }
        //        if (TblpolicyDto.PlanName != null)
        //        {
        //            TblpolicyDto.PlanCode = objlifeQQ.PlanCode;
        //        }


        //        TblPolicyRelationship objtblpolicyrelationship = objpolicy.TblPolicyRelationship.FirstOrDefault();
        //        if (objtblpolicyrelationship == null)
        //        {
        //            objtblpolicyrelationship = new TblPolicyRelationship();
        //        }

        //        TblPolicyClients objtblPolicyClient = objtblpolicyrelationship.PolicyClient; //Bit confusion 
        //        if (objtblPolicyClient == null)
        //        {
        //            objtblPolicyClient = new TblPolicyClients();
        //        }

        //      //  objtblPolicyClient = FilltblpolicyClient(TblpolicyDto.TblPolicyMemberDetails, objtblPolicyClient);

        //        #region FillCustomer Info
        //        TblCustomers objCustomer = objtblPolicyClient.Customer;
        //        if (objCustomer == null)
        //        {
        //            objCustomer = new TblCustomers();
        //        }

        //       // objCustomer = FillCustomerInfo(TblpolicyDto.TblPolicyMemberDetails, objCustomer);
        //        objCustomer.Adress = objtblPolicyClient.Adress; //not sure between permamentAddress and adress
        //        objtblPolicyClient.Customer = objCustomer;
        //        #endregion

        //        objtblpolicyrelationship.PolicyClient = objtblPolicyClient;
        //        objtblpolicyrelationship.CreatedDate = DateTime.Now;
        //        objtblpolicyrelationship.RelationshipId = 267;//prospect


        //        //
        //        #region  Member Details
        //        //if (TblpolicyDto.TblPolicyMemberDetails != null)
        //        //{
        //        //    #region Identify Main Life
        //        //    string MainLifeRelationID = string.Empty;
        //        //    if (TblpolicyDto.TblPolicyMemberDetails.IsSelfCovered)
        //        //    {
        //        //        MainLifeRelationID = "267";
        //        //    }
        //        //    else
        //        //    {
        //        //        if (TblpolicyDto.TblPolicyMemberDetails.IsSpouseCoverd)
        //        //        {
        //        //            MainLifeRelationID = "268";
        //        //        }
        //        //    }
        //            #endregion

        //            //foreach (TblPolicyMemberDetailsDto objMember in TblpolicyDto.TblPolicyMemberDetails)
        //            //{

        //            //    TblPolicyMemberDetails objMemberDetail = new TblPolicyMemberDetails(); //null
        //            //    TblPolicyMemberDetails ExisitingobjMemberDetail = new TblPolicyMemberDetails(); //= null;//
        //            //    if (objMember.MemberID > 0)
        //            //    {

        //            //        ExisitingobjMemberDetail = objpolicy.tblPolicyMemberDetails.Where(a => a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //        objMemberDetail = objpolicy.tblPolicyMemberDetails.Where(a => a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //        FillMemberDetails(Context, objMemberDetail, objMember, ObjPolicy.QuoteNo);
        //            //    }
        //            //    else
        //            //    {
        //            //        objMemberDetail = new tblPolicyMemberDetail();
        //            //        FillMemberDetails(Context, objMemberDetail, objMember, ObjPolicy.QuoteNo);
        //            //    }


        //            //    if (objMember.RelationShipWithPropspect == "267" || objMember.RelationShipWithPropspect == "268")
        //            //    {
        //            //        #region LifeStyleDetails
        //            //        if (objMember.objLifeStyleQuetions != null)
        //            //        {
        //            //            tblMemberLifeStyleDetail objMemberLifeStyleDetails = objMemberDetail.tblMemberLifeStyleDetails.FirstOrDefault();
        //            //            if (objMemberLifeStyleDetails == null)
        //            //            {
        //            //                objMemberLifeStyleDetails = new tblMemberLifeStyleDetail();
        //            //            }
        //            //            if (objMember.objLifeStyleQuetions.MemberLifeStyleID > 0 && objMemberDetail.MemberID > 0)
        //            //            {
        //            //                //UpdateLifeStyleDetails(objMember.objLifeStyleQuetions.MemberLifeStyleID);// Added To Mark deleted for existing entry

        //            //                //var ExistingobjMemberLifeStyleDetails = objMemberDetail.tblMemberLifeStyleDetails.Where(a => a.MemberLifeStyleID == objMember.objLifeStyleQuetions.MemberLifeStyleID).FirstOrDefault();
        //            //                objMemberLifeStyleDetails.Height = Convert.ToString(objMember.objLifeStyleQuetions.Height);
        //            //                objMemberLifeStyleDetails.HeightFeets = Convert.ToString(objMember.objLifeStyleQuetions.HeightFeets);
        //            //                objMemberLifeStyleDetails.Weight = Convert.ToString(objMember.objLifeStyleQuetions.Weight);
        //            //                objMemberLifeStyleDetails.UnitofHeight = objMember.objLifeStyleQuetions.HeightUnit;
        //            //                objMemberLifeStyleDetails.UnitofWeight = objMember.objLifeStyleQuetions.WeightUnit;
        //            //                objMemberLifeStyleDetails.IsWeightSteady = objMember.objLifeStyleQuetions.SteadyWeight;
        //            //                objMemberLifeStyleDetails.IsAlcoholic = objMember.objLifeStyleQuetions.IsAlcholic;
        //            //                objMemberLifeStyleDetails.IsSmoker = objMember.objLifeStyleQuetions.IsSmoker;
        //            //                ////objMemberLifeStyleDetails.IsNarcoticDrug = objMember.objLifeStyleQuetions.IsNarcoticDrugs;

        //            //                //objMemberLifeStyleDetails.MemberID = ExistingobjMemberLifeStyleDetails.MemberID;
        //            //                //objMemberLifeStyleDetails.MemberLifeStyleID = ExistingobjMemberLifeStyleDetails.MemberLifeStyleID;


        //            //                foreach (var SmokeDetails in objMember.objLifeStyleQuetions.objSmokeDetails)
        //            //                {
        //            //                    tblMemberAdditionalLifeStyleDetail objMemberAdditionalLifeStyleDetail = new tblMemberAdditionalLifeStyleDetail();
        //            //                    if (SmokeDetails.AdditionalLifeStyleID > 0 && objMemberLifeStyleDetails.MemberLifeStyleID > 0)
        //            //                    {
        //            //                        var ExistingAdditionalLifeStyleDetail = Context.tblMemberAdditionalLifeStyleDetails.Where(a => a.AdditionalLifeStyleID == SmokeDetails.AdditionalLifeStyleID).FirstOrDefault();
        //            //                        objMemberAdditionalLifeStyleDetail.ItemType = "Smoke";
        //            //                        objMemberAdditionalLifeStyleDetail.MemberLifeStyleID = ExistingAdditionalLifeStyleDetail.MemberLifeStyleID;
        //            //                        objMemberAdditionalLifeStyleDetail.Type = SmokeDetails.SmokeType;
        //            //                        objMemberAdditionalLifeStyleDetail.Number = SmokeDetails.SmokeQuantity;
        //            //                        objMemberAdditionalLifeStyleDetail.Per = SmokeDetails.SmokePerDay;
        //            //                        objMemberAdditionalLifeStyleDetail.Term = SmokeDetails.SmokeDuration;
        //            //                        objMemberAdditionalLifeStyleDetail.IsDeleted = SmokeDetails.Isdeleted;
        //            //                        objMemberAdditionalLifeStyleDetail.AdditionalLifeStyleID = ExistingAdditionalLifeStyleDetail.AdditionalLifeStyleID;
        //            //                        Context.Entry(ExistingAdditionalLifeStyleDetail).CurrentValues.SetValues(objMemberAdditionalLifeStyleDetail);
        //            //                    }
        //            //                    else
        //            //                    {
        //            //                        objMemberAdditionalLifeStyleDetail.ItemType = "Smoke";
        //            //                        objMemberAdditionalLifeStyleDetail.Type = SmokeDetails.SmokeType;
        //            //                        objMemberAdditionalLifeStyleDetail.Number = SmokeDetails.SmokeQuantity;
        //            //                        objMemberAdditionalLifeStyleDetail.Per = SmokeDetails.SmokePerDay;
        //            //                        objMemberAdditionalLifeStyleDetail.Term = SmokeDetails.SmokeDuration;
        //            //                        objMemberAdditionalLifeStyleDetail.IsDeleted = SmokeDetails.Isdeleted;
        //            //                        objMemberAdditionalLifeStyleDetail.MemberLifeStyleID = objMemberLifeStyleDetails.MemberLifeStyleID;
        //            //                        Context.tblMemberAdditionalLifeStyleDetails.Add(objMemberAdditionalLifeStyleDetail);
        //            //                        //  objMemberLifeStyleDetails.tblMemberAdditionalLifeStyleDetails.Add(objMemberAdditionalLifeStyleDetail);
        //            //                    }

        //            //                }

        //            //                foreach (var AlcoholDetails in objMember.objLifeStyleQuetions.objAlcoholDetails)
        //            //                {
        //            //                    tblMemberAdditionalLifeStyleDetail objMemberAdditionalLifeStyleDetail = new tblMemberAdditionalLifeStyleDetail();
        //            //                    if (AlcoholDetails.AdditionalLifeStyleID > 0 && objMemberLifeStyleDetails.MemberLifeStyleID > 0)
        //            //                    {
        //            //                        var ExistingAdditionalLifeStyleDetail = Context.tblMemberAdditionalLifeStyleDetails.Where(a => a.AdditionalLifeStyleID == AlcoholDetails.AdditionalLifeStyleID).FirstOrDefault();
        //            //                        objMemberAdditionalLifeStyleDetail.MemberLifeStyleID = ExistingAdditionalLifeStyleDetail.MemberLifeStyleID;
        //            //                        objMemberAdditionalLifeStyleDetail.ItemType = "Alcohol";
        //            //                        objMemberAdditionalLifeStyleDetail.Type = AlcoholDetails.AlcholType;
        //            //                        objMemberAdditionalLifeStyleDetail.Number = AlcoholDetails.AlcholQuantity;
        //            //                        objMemberAdditionalLifeStyleDetail.Per = AlcoholDetails.AlcholPerDay;
        //            //                        objMemberAdditionalLifeStyleDetail.Term = AlcoholDetails.AlcholDuration;
        //            //                        objMemberAdditionalLifeStyleDetail.IsDeleted = AlcoholDetails.Isdeleted;
        //            //                        objMemberAdditionalLifeStyleDetail.AdditionalLifeStyleID = ExistingAdditionalLifeStyleDetail.AdditionalLifeStyleID;
        //            //                        Context.Entry(ExistingAdditionalLifeStyleDetail).CurrentValues.SetValues(objMemberAdditionalLifeStyleDetail);
        //            //                    }
        //            //                    else
        //            //                    {
        //            //                        objMemberAdditionalLifeStyleDetail.ItemType = "Alcohol";
        //            //                        objMemberAdditionalLifeStyleDetail.Type = AlcoholDetails.AlcholType;
        //            //                        objMemberAdditionalLifeStyleDetail.Number = AlcoholDetails.AlcholQuantity;
        //            //                        objMemberAdditionalLifeStyleDetail.Per = AlcoholDetails.AlcholPerDay;
        //            //                        objMemberAdditionalLifeStyleDetail.Term = AlcoholDetails.AlcholDuration;
        //            //                        objMemberAdditionalLifeStyleDetail.IsDeleted = AlcoholDetails.Isdeleted;
        //            //                        objMemberAdditionalLifeStyleDetail.MemberLifeStyleID = objMemberLifeStyleDetails.MemberLifeStyleID;
        //            //                        Context.tblMemberAdditionalLifeStyleDetails.Add(objMemberAdditionalLifeStyleDetail);
        //            //                        // objMemberLifeStyleDetails.tblMemberAdditionalLifeStyleDetails.Add(objMemberAdditionalLifeStyleDetail);
        //            //                    }
        //            //                }
        //            //            }
        //            //            else
        //            //            {
        //            //                objMemberLifeStyleDetails.Height = Convert.ToString(objMember.objLifeStyleQuetions.Height);
        //            //                objMemberLifeStyleDetails.HeightFeets = Convert.ToString(objMember.objLifeStyleQuetions.HeightFeets);
        //            //                objMemberLifeStyleDetails.Weight = Convert.ToString(objMember.objLifeStyleQuetions.Weight);
        //            //                objMemberLifeStyleDetails.UnitofHeight = objMember.objLifeStyleQuetions.HeightUnit;
        //            //                objMemberLifeStyleDetails.UnitofWeight = objMember.objLifeStyleQuetions.WeightUnit;
        //            //                objMemberLifeStyleDetails.IsWeightSteady = objMember.objLifeStyleQuetions.SteadyWeight;
        //            //                objMemberLifeStyleDetails.IsAlcoholic = objMember.objLifeStyleQuetions.IsAlcholic;
        //            //                objMemberLifeStyleDetails.IsSmoker = objMember.objLifeStyleQuetions.IsSmoker;
        //            //                //objMemberLifeStyleDetails.IsNarcoticDrug = objMember.objLifeStyleQuetions.IsNarcoticDrugs;

        //            //                foreach (var SmokeDetails in objMember.objLifeStyleQuetions.objSmokeDetails.Where(a => a.Isdeleted != true).ToList())
        //            //                {
        //            //                    tblMemberAdditionalLifeStyleDetail objMemberAdditionalLifeStyleDetail = new tblMemberAdditionalLifeStyleDetail();

        //            //                    objMemberAdditionalLifeStyleDetail.ItemType = "Smoke";
        //            //                    objMemberAdditionalLifeStyleDetail.Type = SmokeDetails.SmokeType;
        //            //                    objMemberAdditionalLifeStyleDetail.Number = SmokeDetails.SmokeQuantity;
        //            //                    objMemberAdditionalLifeStyleDetail.Per = SmokeDetails.SmokePerDay;
        //            //                    objMemberAdditionalLifeStyleDetail.Term = SmokeDetails.SmokeDuration;
        //            //                    objMemberAdditionalLifeStyleDetail.IsDeleted = false;
        //            //                    objMemberLifeStyleDetails.tblMemberAdditionalLifeStyleDetails.Add(objMemberAdditionalLifeStyleDetail);

        //            //                }
        //            //                foreach (var AlcoholDetails in objMember.objLifeStyleQuetions.objAlcoholDetails.Where(a => a.Isdeleted != true).ToList())
        //            //                {
        //            //                    tblMemberAdditionalLifeStyleDetail objMemberAdditionalLifeStyleDetail = new tblMemberAdditionalLifeStyleDetail();
        //            //                    objMemberAdditionalLifeStyleDetail.ItemType = "Alcohol";
        //            //                    objMemberAdditionalLifeStyleDetail.Type = AlcoholDetails.AlcholType;
        //            //                    objMemberAdditionalLifeStyleDetail.Number = AlcoholDetails.AlcholQuantity;
        //            //                    objMemberAdditionalLifeStyleDetail.Per = AlcoholDetails.AlcholPerDay;
        //            //                    objMemberAdditionalLifeStyleDetail.Term = AlcoholDetails.AlcholDuration;
        //            //                    objMemberAdditionalLifeStyleDetail.IsDeleted = false;
        //            //                    objMemberLifeStyleDetails.tblMemberAdditionalLifeStyleDetails.Add(objMemberAdditionalLifeStyleDetail);
        //            //                }

        //            //                objMemberDetail.tblMemberLifeStyleDetails.Add(objMemberLifeStyleDetails);
        //            //            }
        //            //        }
        //            //        #endregion

        //            //        #region BMI Calucation 
        //            //        if (objMember.objLifeStyleQuetions != null)
        //            //        {
        //            //            decimal _Height = decimal.Zero;
        //            //            if (objMember.objLifeStyleQuetions.HeightFeets != null)
        //            //            {
        //            //                if (objMember.objLifeStyleQuetions.HeightFeets == 2411)//Ft
        //            //                {
        //            //                    _Height = (Convert.ToDecimal(objMember.objLifeStyleQuetions.Height) * (30.48m));
        //            //                }
        //            //                else if (objMember.objLifeStyleQuetions.HeightFeets == 2412)//Inches
        //            //                {
        //            //                    _Height = (Convert.ToDecimal(objMember.objLifeStyleQuetions.Height) * (2.54m));

        //            //                }
        //            //                else if (objMember.objLifeStyleQuetions.HeightFeets == 2413)// CMS
        //            //                {
        //            //                    _Height = Convert.ToDecimal(objMember.objLifeStyleQuetions.Height);
        //            //                }
        //            //                if (_Height > 0)
        //            //                {
        //            //                    decimal Height = _Height / 100;
        //            //                    decimal Weight = Convert.ToDecimal(objMember.objLifeStyleQuetions.Weight);
        //            //                    objMemberDetail.BMIValue = Convert.ToString(Math.Round((Weight / (Height * Height))));
        //            //                }
        //            //                else
        //            //                {
        //            //                    objMemberDetail.BMIValue = null;
        //            //                }
        //            //            }

        //            //        }
        //            //        #endregion

        //            //        #region Life Style Q&A
        //            //        if (objMember.Questions != null)
        //            //        {
        //            //            foreach (var LifeQuestions in objMember.Questions)
        //            //            {
        //            //                tblMemberQuestion objMemberQuestion = new tblMemberQuestion();
        //            //                if (LifeQuestions.MemberQuestionID > 0 || objMemberDetail.MemberID > 0)
        //            //                {
        //            //                    tblMemberQuestion ExistingMemberQuestion = objMemberDetail.tblMemberQuestions.Where(a => a.QID == LifeQuestions.QuestionID).FirstOrDefault();
        //            //                    objMemberQuestion.ItemType = "LifeStyle";
        //            //                    objMemberQuestion.QID = Convert.ToInt32(LifeQuestions.QuestionID);
        //            //                    objMemberQuestion.Answer = LifeQuestions.Answer;
        //            //                    if (ExistingMemberQuestion != null)
        //            //                    {
        //            //                        objMemberQuestion.MemberID = ExistingMemberQuestion.MemberID;
        //            //                        objMemberQuestion.MemberQuestionID = ExistingMemberQuestion.MemberQuestionID;
        //            //                        Context.Entry(ExistingMemberQuestion).CurrentValues.SetValues(objMemberQuestion);
        //            //                    }
        //            //                    else
        //            //                    {
        //            //                        objMemberQuestion.MemberID = objMember.MemberID;
        //            //                        objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                    }
        //            //                }
        //            //                else
        //            //                {
        //            //                    objMemberQuestion.ItemType = "LifeStyle";
        //            //                    objMemberQuestion.QID = Convert.ToInt32(LifeQuestions.QuestionID);
        //            //                    objMemberQuestion.Answer = LifeQuestions.Answer;
        //            //                    objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                }
        //            //            }
        //            //        }
        //            //        #endregion

        //            //        #region Life Style EasyPension Q&A
        //            //        if (objMember.LstEasyPensionQuestions != null)
        //            //        {
        //            //            foreach (var LifeEasyPensionQuestions in objMember.LstEasyPensionQuestions)
        //            //            {
        //            //                tblMemberQuestion objMemberQuestion = new tblMemberQuestion();
        //            //                if (LifeEasyPensionQuestions.MemberQuestionID > 0 || objMemberDetail.MemberID > 0)
        //            //                {
        //            //                    tblMemberQuestion ExistingMemberQuestion = objMemberDetail.tblMemberQuestions.Where(a => a.QID == LifeEasyPensionQuestions.QuestionID).FirstOrDefault();
        //            //                    objMemberQuestion.ItemType = "LifeStyle";
        //            //                    objMemberQuestion.QID = Convert.ToInt32(LifeEasyPensionQuestions.QuestionID);
        //            //                    objMemberQuestion.Answer = LifeEasyPensionQuestions.Answer;
        //            //                    if (ExistingMemberQuestion != null)
        //            //                    {
        //            //                        objMemberQuestion.MemberID = ExistingMemberQuestion.MemberID;
        //            //                        objMemberQuestion.MemberQuestionID = ExistingMemberQuestion.MemberQuestionID;
        //            //                        Context.Entry(ExistingMemberQuestion).CurrentValues.SetValues(objMemberQuestion);
        //            //                    }
        //            //                    else
        //            //                    {
        //            //                        objMemberQuestion.MemberID = objMember.MemberID;
        //            //                        objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                    }
        //            //                }
        //            //                else
        //            //                {
        //            //                    objMemberQuestion.ItemType = "LifeStyle";
        //            //                    objMemberQuestion.QID = Convert.ToInt32(LifeEasyPensionQuestions.QuestionID);
        //            //                    objMemberQuestion.Answer = LifeEasyPensionQuestions.Answer;
        //            //                    objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                }
        //            //            }
        //            //        }
        //            //        #endregion

        //            //        #region Family BackGround History  
        //            //        if (objMember.objLstFamilyBackground != null)
        //            //        {
        //            //            foreach (var item in objMember.objLstFamilyBackground)
        //            //            {
        //            //                tblPolicyMemberFamilyHistory objfamilyHistory = new tblPolicyMemberFamilyHistory();
        //            //                if (item.FamilyBackgroundId > 0 && objMemberDetail.MemberID > 0)
        //            //                {
        //            //                    var ExistingobjfamilyHistory = objMemberDetail.tblPolicyMemberFamilyHistories.Where(a => a.MemberFamilyHistoryID == item.FamilyBackgroundId).FirstOrDefault();
        //            //                    objfamilyHistory.IsDeleted = item.Isdeleted;
        //            //                    objfamilyHistory.PresentAge = item.PresentAge;
        //            //                    objfamilyHistory.RelationshipWithMember = item.FamilyPersonType;
        //            //                    objfamilyHistory.StateofHealth = item.StateOfHealth;
        //            //                    objfamilyHistory.AgeAtDeath = item.AgeAtDeath;
        //            //                    objfamilyHistory.CauseofDeath = item.Cause;
        //            //                    objfamilyHistory.AnyPerson = item.AnyMemberOfFamily;
        //            //                    objfamilyHistory.Below_60_Age_Death = item.DeathBelow;
        //            //                    objfamilyHistory.Details = item.Details;
        //            //                    //  UpdateFamilyHistory(item, objMember.MemberID);
        //            //                    objfamilyHistory.MemberID = ExistingobjfamilyHistory.MemberID;
        //            //                    objfamilyHistory.MemberFamilyHistoryID = ExistingobjfamilyHistory.MemberFamilyHistoryID;
        //            //                    Context.Entry(ExistingobjfamilyHistory).CurrentValues.SetValues(objfamilyHistory);
        //            //                }
        //            //                else
        //            //                {
        //            //                    FillFamilyHistory(objfamilyHistory, item);
        //            //                    objfamilyHistory.AnyPerson = item.AnyMemberOfFamily;
        //            //                    objfamilyHistory.Below_60_Age_Death = item.DeathBelow;
        //            //                    objfamilyHistory.RelationshipWithMember = item.FamilyPersonType;
        //            //                    objfamilyHistory.Details = item.Details;
        //            //                    objfamilyHistory.IsDeleted = item.Isdeleted;
        //            //                    objMemberDetail.tblPolicyMemberFamilyHistories.Add(objfamilyHistory);
        //            //                }
        //            //            }
        //            //        }
        //            //        #endregion

        //            //    }

        //            //    #region Set Gender Based on relationship
        //            //    if (objMember.RelationShipWithPropspect == "269")
        //            //    {
        //            //        //objMemberDetails[i].Gender = Context.tblQuoteMemberDetials.Where(a => a.Relationship == "269").Select(a => a.Gender).FirstOrDefault();
        //            //        objMember.Gender = "M";
        //            //    }
        //            //    else if (objMember.RelationShipWithPropspect == "270")
        //            //    {
        //            //        //objMemberDetails[i].Gender = Context.tblQuoteMemberDetials.Where(a => a.Relationship == "270").Select(a => a.Gender).FirstOrDefault();
        //            //        objMember.Gender = "F";
        //            //    }
        //            //    #endregion

        //            //    #region Member Medical History
        //            //    if (objMember.objLstMedicalHistory != null)
        //            //    {
        //            //        foreach (var MedicalHistoryQuestion in objMember.objLstMedicalHistory)
        //            //        {
        //            //            tblMemberQuestion objMemberQuestion = new tblMemberQuestion();
        //            //            if (MedicalHistoryQuestion.MemberQuestionID > 0 || objMemberDetail.MemberID > 0)
        //            //            {
        //            //                tblMemberQuestion ExistingMemberQuestion = objMemberDetail.tblMemberQuestions.Where(a => a.QID == MedicalHistoryQuestion.QuestionID).FirstOrDefault();
        //            //                objMemberQuestion.ItemType = "MedicalHistory";
        //            //                objMemberQuestion.QID = Convert.ToInt32(MedicalHistoryQuestion.QuestionID);
        //            //                objMemberQuestion.Answer = MedicalHistoryQuestion.Answer;
        //            //                if (ExistingMemberQuestion != null)
        //            //                {
        //            //                    objMemberQuestion.MemberID = ExistingMemberQuestion.MemberID;
        //            //                    objMemberQuestion.MemberQuestionID = ExistingMemberQuestion.MemberQuestionID;
        //            //                    Context.Entry(ExistingMemberQuestion).CurrentValues.SetValues(objMemberQuestion);
        //            //                }
        //            //                else
        //            //                {
        //            //                    objMemberQuestion.MemberID = objMember.MemberID;
        //            //                    objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                }
        //            //            }
        //            //            else
        //            //            {
        //            //                objMemberQuestion.ItemType = "MedicalHistory";
        //            //                objMemberQuestion.QID = Convert.ToInt32(MedicalHistoryQuestion.QuestionID);
        //            //                objMemberQuestion.Answer = MedicalHistoryQuestion.Answer;
        //            //                objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //            }



        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region Medical Questionnaries Arthritis Doctors Grid View Questionnaries Details & Additional Questions Grid View
        //            //    if (objMember.LstMedicalQuestionnariesDetails != null)
        //            //    {
        //            //        if (objMember.LstMedicalQuestionnariesDetails.Count > 0)
        //            //        {
        //            //            //if (objMember.MemberID > 0)
        //            //            //{
        //            //            //    UpdateQuestionDetailsInfo(Convert.ToInt32(objMember.MemberID));
        //            //            //}
        //            //            foreach (var item in objMember.LstMedicalQuestionnariesDetails)
        //            //            {
        //            //                string MedicalQuestionID = Context.tblMasLifeQuestionnaires.Where(a => a.QId == 294).Select(a => a.QId).FirstOrDefault().ToString();

        //            //                //tblQuestionDetail objquestiondetails = objMemberDetail.tblQuestionDetails.Where(a => a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //                tblQuestionDetail objquestiondetails = new tblQuestionDetail();
        //            //                if (objMember.MemberID > 0 && item.QuestionsId > 0)
        //            //                {
        //            //                    var ExistingQuestionDetails = Context.tblQuestionDetails.Where(a => a.QuestionsId == item.QuestionsId).FirstOrDefault();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    objquestiondetails.varcharFiled9 = item.varcharFiled9;
        //            //                    objquestiondetails.varcharFiled10 = item.varcharFiled10;
        //            //                    objquestiondetails.varcharFiled11 = item.varcharFiled11;
        //            //                    objquestiondetails.DateFiled3 = item.DateFiled3;
        //            //                    //objquestiondetails.MemberID = objMember.MemberID;
        //            //                    objquestiondetails.IsDeleted = item.IsDeleted;
        //            //                    if (ExistingQuestionDetails != null)
        //            //                    {
        //            //                        objquestiondetails.QuestionsId = ExistingQuestionDetails.QuestionsId;
        //            //                        objquestiondetails.MemberID = ExistingQuestionDetails.MemberID;
        //            //                        objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                        //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                        Context.Entry(ExistingQuestionDetails).CurrentValues.SetValues(objquestiondetails);
        //            //                    }
        //            //                }
        //            //                else
        //            //                {
        //            //                    objquestiondetails = new tblQuestionDetail();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    objquestiondetails.varcharFiled9 = item.varcharFiled9;
        //            //                    objquestiondetails.varcharFiled10 = item.varcharFiled10;
        //            //                    objquestiondetails.varcharFiled11 = item.varcharFiled11;
        //            //                    objquestiondetails.DateFiled3 = item.DateFiled3;
        //            //                    objquestiondetails.MemberID = objMember.MemberID;
        //            //                    objquestiondetails.IsDeleted = false;
        //            //                    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                    //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                }

        //            //                //if (objquestiondetails.QuestionsId == 0)
        //            //                //{
        //            //                //    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                //    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                //}
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region LstMedicalDoctorsQuestionnariesDetails
        //            //    if (objMember.LstMedicalDoctorsQuestionnariesDetails != null)
        //            //    {
        //            //        if (objMember.LstMedicalDoctorsQuestionnariesDetails.Count > 0)
        //            //        {
        //            //            //if (objMember.MemberID > 0)
        //            //            //{
        //            //            //    UpdateQuestionDetailsInfo(Convert.ToInt32(objMember.MemberID));
        //            //            //}
        //            //            foreach (var item in objMember.LstMedicalDoctorsQuestionnariesDetails)
        //            //            {
        //            //                string MedicalQuestionID = Context.tblMasLifeQuestionnaires.Where(a => a.QId == 299).Select(a => a.QId).FirstOrDefault().ToString();
        //            //                tblQuestionDetail objquestiondetails = new tblQuestionDetail();
        //            //                //tblQuestionDetail objquestiondetails = objMemberDetail.tblQuestionDetails.Where(a => a.QuestionsId == item.QuestionsId).FirstOrDefault();
        //            //                if (objMember.MemberID > 0 && item.QuestionsId > 0)
        //            //                {
        //            //                    var ExistingQuestionDetails = Context.tblQuestionDetails.Where(a => a.QuestionsId == item.QuestionsId).FirstOrDefault();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    // objquestiondetails.QID = ExistingQuestionDetails.QID;
        //            //                    objquestiondetails.varcharFiled1 = item.varcharFiled1;
        //            //                    objquestiondetails.varcharFiled2 = item.varcharFiled2;
        //            //                    objquestiondetails.DateFiled1 = item.DateFiled1;
        //            //                    objquestiondetails.IsDeleted = item.IsDeleted;
        //            //                    if (ExistingQuestionDetails != null)
        //            //                    {
        //            //                        objquestiondetails.QuestionsId = ExistingQuestionDetails.QuestionsId;
        //            //                        objquestiondetails.MemberID = ExistingQuestionDetails.MemberID;
        //            //                        objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                        //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                        Context.Entry(ExistingQuestionDetails).CurrentValues.SetValues(objquestiondetails);
        //            //                    }
        //            //                }
        //            //                else
        //            //                {
        //            //                    objquestiondetails = new tblQuestionDetail();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    objquestiondetails.MemberID = objMember.MemberID;
        //            //                    objquestiondetails.varcharFiled1 = item.varcharFiled1;
        //            //                    objquestiondetails.varcharFiled2 = item.varcharFiled2;
        //            //                    objquestiondetails.DateFiled1 = item.DateFiled1;
        //            //                    objquestiondetails.IsDeleted = false;
        //            //                    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                    // Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                }
        //            //                //if (objquestiondetails.QuestionsId == 0)
        //            //                //{
        //            //                //    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                //    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                //}
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region Arthritis Test Grid
        //            //    if (objMember.LstMedicalTestQuestionnariesDetails != null)
        //            //    {
        //            //        if (objMember.LstMedicalTestQuestionnariesDetails.Count > 0)
        //            //        {
        //            //            //if (objMember.MemberID > 0)
        //            //            //{
        //            //            //    UpdateQuestionDetailsInfo(Convert.ToInt32(objMember.MemberID));
        //            //            //}
        //            //            foreach (var item in objMember.LstMedicalTestQuestionnariesDetails)
        //            //            {
        //            //                string MedicalQuestionID = Context.tblMasLifeQuestionnaires.Where(a => a.QId == 296).Select(a => a.QId).FirstOrDefault().ToString();
        //            //                tblQuestionDetail objquestiondetails = new tblQuestionDetail();
        //            //                //tblQuestionDetail objquestiondetails = objMemberDetail.tblQuestionDetails.Where(a => a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //                if (objMember.MemberID > 0 && item.QuestionsId > 0)
        //            //                {
        //            //                    var ExistingQuestionDetails = Context.tblQuestionDetails.Where(a => a.QuestionsId == item.QuestionsId && a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    //objquestiondetails.QID = ExistingQuestionDetails.QID;
        //            //                    objquestiondetails.varcharFiled3 = item.varcharFiled3;
        //            //                    objquestiondetails.varcharFiled4 = item.varcharFiled4;
        //            //                    objquestiondetails.varcharFiled5 = item.varcharFiled5;
        //            //                    objquestiondetails.DateFiled2 = item.DateFiled2;
        //            //                    objquestiondetails.IsDeleted = item.IsDeleted;

        //            //                    if (ExistingQuestionDetails != null)
        //            //                    {
        //            //                        Context.tblQuestionDetails.Remove(ExistingQuestionDetails);
        //            //                        //objquestiondetails.QuestionsId = ExistingQuestionDetails.QuestionsId;
        //            //                        //objquestiondetails.MemberID = ExistingQuestionDetails.MemberID;
        //            //                        //objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                        //Context.Entry(ExistingQuestionDetails).CurrentValues.SetValues(objquestiondetails);
        //            //                    }
        //            //                    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                    Context.tblQuestionDetails.Add(objquestiondetails);

        //            //                }
        //            //                else
        //            //                {
        //            //                    objquestiondetails = new tblQuestionDetail();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    objquestiondetails.MemberID = objMember.MemberID;
        //            //                    objquestiondetails.varcharFiled3 = item.varcharFiled3;
        //            //                    objquestiondetails.varcharFiled4 = item.varcharFiled4;
        //            //                    objquestiondetails.varcharFiled5 = item.varcharFiled5;
        //            //                    objquestiondetails.DateFiled2 = item.DateFiled2;
        //            //                    objquestiondetails.IsDeleted = false;
        //            //                    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                    //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                }
        //            //                //if (objquestiondetails.QuestionsId == 0)
        //            //                //{
        //            //                //    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                //    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                //}
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region Arthritis Current Test Grid
        //            //    if (objMember.LstMedicalCurrentQuestionnariesDetails != null)
        //            //    {
        //            //        if (objMember.LstMedicalCurrentQuestionnariesDetails.Count > 0)
        //            //        {
        //            //            //if (objMember.MemberID > 0)
        //            //            //{
        //            //            //    UpdateQuestionDetailsInfo(Convert.ToInt32(objMember.MemberID));
        //            //            //}
        //            //            foreach (var item in objMember.LstMedicalCurrentQuestionnariesDetails)
        //            //            {
        //            //                string MedicalQuestionID = Context.tblMasLifeQuestionnaires.Where(a => a.QId == 292).Select(a => a.QId).FirstOrDefault().ToString();
        //            //                tblQuestionDetail objquestiondetails = new tblQuestionDetail();
        //            //                //tblQuestionDetail objquestiondetails = objMemberDetail.tblQuestionDetails.Where(a=>a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //                if (objMember.MemberID > 0 && item.QuestionsId > 0)
        //            //                {
        //            //                    var ExistingQuestionDetails = Context.tblQuestionDetails.Where(a => a.QuestionsId == item.QuestionsId).FirstOrDefault();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    //objquestiondetails.QID = ExistingQuestionDetails.QID;
        //            //                    objquestiondetails.varcharFiled6 = item.varcharFiled6;
        //            //                    objquestiondetails.varcharFiled7 = item.varcharFiled7;
        //            //                    objquestiondetails.varcharFiled8 = item.varcharFiled8;
        //            //                    objquestiondetails.IsDeleted = item.IsDeleted;
        //            //                    if (ExistingQuestionDetails != null)
        //            //                    {
        //            //                        objquestiondetails.QuestionsId = ExistingQuestionDetails.QuestionsId;
        //            //                        objquestiondetails.MemberID = ExistingQuestionDetails.MemberID;
        //            //                        objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                        //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                        Context.Entry(ExistingQuestionDetails).CurrentValues.SetValues(objquestiondetails);

        //            //                    }
        //            //                }
        //            //                else
        //            //                {
        //            //                    objquestiondetails = new tblQuestionDetail();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    objquestiondetails.MemberID = objMember.MemberID;
        //            //                    objquestiondetails.varcharFiled6 = item.varcharFiled6;
        //            //                    objquestiondetails.varcharFiled7 = item.varcharFiled7;
        //            //                    objquestiondetails.varcharFiled8 = item.varcharFiled8;
        //            //                    objquestiondetails.IsDeleted = false;
        //            //                    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                    //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                }
        //            //                //if (objquestiondetails.QuestionsId == 0)
        //            //                //{
        //            //                //    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                //    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                //}
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region PAQ Grid View 1
        //            //    if (objMember.LstConcurrentlyProposedInsurancePAQ1Details != null)
        //            //    {
        //            //        if (objMember.LstConcurrentlyProposedInsurancePAQ1Details.Count > 0)
        //            //        {
        //            //            //if (objMember.MemberID > 0)
        //            //            //{
        //            //            //    UpdateQuestionDetailsInfo(Convert.ToInt32(objMember.MemberID));
        //            //            //}
        //            //            foreach (var item in objMember.LstConcurrentlyProposedInsurancePAQ1Details)
        //            //            {
        //            //                string MedicalQuestionID = Context.tblMasLifeQuestionnaires.Where(a => a.QId == 1178).Select(a => a.QId).FirstOrDefault().ToString();
        //            //                tblQuestionDetail objquestiondetails = new tblQuestionDetail();
        //            //                //tblQuestionDetail objquestiondetails = objMemberDetail.tblQuestionDetails.Where(a=>a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //                if (objMember.MemberID > 0 && item.QuestionsId > 0)
        //            //                {
        //            //                    var ExistingQuestionDetails = Context.tblQuestionDetails.Where(a => a.QuestionsId == item.QuestionsId).FirstOrDefault();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    //objquestiondetails.QID = ExistingQuestionDetails.QID;
        //            //                    objquestiondetails.PAQvarcharFiled1 = item.PAQvarcharFiled1;
        //            //                    objquestiondetails.PAQvarcharFiled2 = item.PAQvarcharFiled2;
        //            //                    objquestiondetails.PAQvarcharFiled3 = item.PAQvarcharFiled3;
        //            //                    objquestiondetails.PAQvarcharFiled4 = item.PAQvarcharFiled4;
        //            //                    objquestiondetails.IsDeleted = item.IsDeleted;
        //            //                    if (ExistingQuestionDetails != null)
        //            //                    {
        //            //                        objquestiondetails.QuestionsId = ExistingQuestionDetails.QuestionsId;
        //            //                        objquestiondetails.MemberID = ExistingQuestionDetails.MemberID;
        //            //                        objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                        //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                        Context.Entry(ExistingQuestionDetails).CurrentValues.SetValues(objquestiondetails);

        //            //                    }
        //            //                }
        //            //                else
        //            //                {
        //            //                    objquestiondetails = new tblQuestionDetail();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    objquestiondetails.MemberID = objMember.MemberID;
        //            //                    objquestiondetails.PAQvarcharFiled1 = item.PAQvarcharFiled1;
        //            //                    objquestiondetails.PAQvarcharFiled2 = item.PAQvarcharFiled2;
        //            //                    objquestiondetails.PAQvarcharFiled3 = item.PAQvarcharFiled3;
        //            //                    objquestiondetails.PAQvarcharFiled4 = item.PAQvarcharFiled4;
        //            //                    objquestiondetails.IsDeleted = item.IsDeleted;
        //            //                    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                    //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                }
        //            //                //if (objquestiondetails.QuestionsId == 0)
        //            //                //{
        //            //                //    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                //    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                //}
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region PAQ Grid View 2
        //            //    if (objMember.LstExistingPolicieswithAIAlnsurancePAQ2Details != null)
        //            //    {
        //            //        if (objMember.LstExistingPolicieswithAIAlnsurancePAQ2Details.Count > 0)
        //            //        {
        //            //            //if (objMember.MemberID > 0)
        //            //            //{
        //            //            //    UpdateQuestionDetailsInfo(Convert.ToInt32(objMember.MemberID));
        //            //            //}
        //            //            foreach (var item in objMember.LstExistingPolicieswithAIAlnsurancePAQ2Details)
        //            //            {
        //            //                string MedicalQuestionID = Context.tblMasLifeQuestionnaires.Where(a => a.QId == 1180).Select(a => a.QId).FirstOrDefault().ToString();
        //            //                tblQuestionDetail objquestiondetails = new tblQuestionDetail();
        //            //                //tblQuestionDetail objquestiondetails = objMemberDetail.tblQuestionDetails.Where(a=>a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //                if (objMember.MemberID > 0 && item.QuestionsId > 0)
        //            //                {
        //            //                    var ExistingQuestionDetails = Context.tblQuestionDetails.Where(a => a.QuestionsId == item.QuestionsId).FirstOrDefault();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    //objquestiondetails.QID = ExistingQuestionDetails.QID;
        //            //                    objquestiondetails.PAQvarcharFiled5 = item.PAQvarcharFiled5;
        //            //                    objquestiondetails.PAQvarcharFiled6 = item.PAQvarcharFiled6;
        //            //                    objquestiondetails.PAQvarcharFiled7 = item.PAQvarcharFiled7;
        //            //                    objquestiondetails.PAQvarcharFiled8 = item.PAQvarcharFiled8;
        //            //                    objquestiondetails.IsDeleted = item.IsDeleted;
        //            //                    if (ExistingQuestionDetails != null)
        //            //                    {
        //            //                        objquestiondetails.QuestionsId = ExistingQuestionDetails.QuestionsId;
        //            //                        objquestiondetails.MemberID = ExistingQuestionDetails.MemberID;
        //            //                        objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                        //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                        Context.Entry(ExistingQuestionDetails).CurrentValues.SetValues(objquestiondetails);
        //            //                    }
        //            //                }
        //            //                else
        //            //                {
        //            //                    objquestiondetails = new tblQuestionDetail();
        //            //                    objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //                    objquestiondetails.MemberID = objMember.MemberID;
        //            //                    objquestiondetails.PAQvarcharFiled5 = item.PAQvarcharFiled5;
        //            //                    objquestiondetails.PAQvarcharFiled6 = item.PAQvarcharFiled6;
        //            //                    objquestiondetails.PAQvarcharFiled7 = item.PAQvarcharFiled7;
        //            //                    objquestiondetails.PAQvarcharFiled8 = item.PAQvarcharFiled8;
        //            //                    objquestiondetails.IsDeleted = item.IsDeleted;
        //            //                    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                    //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                }
        //            //                //if (objquestiondetails.QuestionsId == 0)
        //            //                //{
        //            //                //    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                //    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                //}
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region PAQ Grid View 3
        //            //    if (objMember.ObjTotalAnnualIncomePAQ3Details != null)
        //            //    {
        //            //        //if (objMember.LstTotalAnnualIncomePAQ3Details.Count > 0)
        //            //        //{
        //            //        //if (objMember.MemberID > 0)
        //            //        //{
        //            //        //    UpdateQuestionDetailsInfo(Convert.ToInt32(objMember.MemberID));
        //            //        //}
        //            //        //foreach (var item in objMember.LstTotalAnnualIncomePAQ3Details)
        //            //        //{
        //            //        string MedicalQuestionID = Context.tblMasLifeQuestionnaires.Where(a => a.QId == 1181).Select(a => a.QId).FirstOrDefault().ToString();
        //            //        tblQuestionDetail objquestiondetails = new tblQuestionDetail();
        //            //        //tblQuestionDetail objquestiondetails = objMemberDetail.tblQuestionDetails.Where(a=>a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //        if (objMember.MemberID > 0 && objMember.ObjTotalAnnualIncomePAQ3Details.QuestionsId > 0)
        //            //        {
        //            //            var ExistingQuestionDetails = Context.tblQuestionDetails.Where(a => a.QuestionsId == objMember.ObjTotalAnnualIncomePAQ3Details.QuestionsId).FirstOrDefault();
        //            //            objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //            //objquestiondetails.QID = ExistingQuestionDetails.QID;
        //            //            objquestiondetails.PAQYearFiled1 = objMember.ObjTotalAnnualIncomePAQ3Details.PAQYearFiled1;
        //            //            objquestiondetails.PAQYearFiled2 = objMember.ObjTotalAnnualIncomePAQ3Details.PAQYearFiled2;
        //            //            objquestiondetails.PAQYearFiled3 = objMember.ObjTotalAnnualIncomePAQ3Details.PAQYearFiled3;
        //            //            objquestiondetails.IsDeleted = false;
        //            //            if (ExistingQuestionDetails != null)
        //            //            {
        //            //                objquestiondetails.QuestionsId = ExistingQuestionDetails.QuestionsId;
        //            //                objquestiondetails.MemberID = ExistingQuestionDetails.MemberID;
        //            //                objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                Context.Entry(ExistingQuestionDetails).CurrentValues.SetValues(objquestiondetails);
        //            //            }
        //            //        }
        //            //        else
        //            //        {
        //            //            objquestiondetails = new tblQuestionDetail();
        //            //            objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //            objquestiondetails.MemberID = objMember.MemberID;
        //            //            objquestiondetails.PAQYearFiled1 = objMember.ObjTotalAnnualIncomePAQ3Details.PAQYearFiled1;
        //            //            objquestiondetails.PAQYearFiled2 = objMember.ObjTotalAnnualIncomePAQ3Details.PAQYearFiled2;
        //            //            objquestiondetails.PAQYearFiled3 = objMember.ObjTotalAnnualIncomePAQ3Details.PAQYearFiled3;
        //            //            objquestiondetails.IsDeleted = false;
        //            //            objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //            Context.tblQuestionDetails.Add(objquestiondetails);
        //            //            //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //        }
        //            //        //if (objquestiondetails.QuestionsId == 0)
        //            //        //{
        //            //        //    objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //        //    Context.tblQuestionDetails.Add(objquestiondetails);
        //            //        //}
        //            //        //}
        //            //        //}
        //            //    }
        //            //    #endregion

        //            //    #region PAQ Grid View 4
        //            //    if (objMember.ObjAssetsandLiabilitiesPAQ4Details != null)
        //            //    {

        //            //        string MedicalQuestionID = Context.tblMasLifeQuestionnaires.Where(a => a.QId == 1184).Select(a => a.QId).FirstOrDefault().ToString();
        //            //        tblQuestionDetail objquestiondetails = new tblQuestionDetail();
        //            //        //tblQuestionDetail objquestiondetails = objMemberDetail.tblQuestionDetails.Where(a=>a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //        if (objMember.MemberID > 0 && objMember.ObjAssetsandLiabilitiesPAQ4Details.QuestionsId > 0)
        //            //        {
        //            //            var ExistingQuestionDetails = Context.tblQuestionDetails.Where(a => a.QuestionsId == objMember.ObjAssetsandLiabilitiesPAQ4Details.QuestionsId).FirstOrDefault();
        //            //            objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //            //objquestiondetails.QID = ExistingQuestionDetails.QID;


        //            //            objquestiondetails.PAQAssetsProperty = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsProperty;
        //            //            objquestiondetails.PAQAssetsInvestment = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsInvestment;
        //            //            objquestiondetails.PAQAssetsEquities = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsEquities;
        //            //            objquestiondetails.PAQAssetsOther = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsOther;

        //            //            objquestiondetails.PAQLiabilitiesLoans = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQLiabilitiesLoans;
        //            //            objquestiondetails.PAQLiabilitiesMortgages = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQLiabilitiesMortgages;
        //            //            objquestiondetails.PAQLiabilitiesOthers = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQLiabilitiesOthers;

        //            //            objquestiondetails.PAQAssetsTotal = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsTotal;
        //            //            objquestiondetails.PAQLiabilitiesTotal = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQLiabilitiesTotal;
        //            //            objquestiondetails.IsDeleted = false;
        //            //            if (ExistingQuestionDetails != null)
        //            //            {
        //            //                objquestiondetails.QuestionsId = ExistingQuestionDetails.QuestionsId;
        //            //                objquestiondetails.MemberID = ExistingQuestionDetails.MemberID;
        //            //                objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //                //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //                Context.Entry(ExistingQuestionDetails).CurrentValues.SetValues(objquestiondetails);
        //            //            }
        //            //        }
        //            //        else
        //            //        {
        //            //            objquestiondetails = new tblQuestionDetail();
        //            //            objquestiondetails.QID = Convert.ToInt32(MedicalQuestionID);
        //            //            objquestiondetails.MemberID = objMember.MemberID;

        //            //            objquestiondetails.PAQAssetsProperty = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsProperty;
        //            //            objquestiondetails.PAQAssetsInvestment = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsInvestment;
        //            //            objquestiondetails.PAQAssetsEquities = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsEquities;
        //            //            objquestiondetails.PAQAssetsOther = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsOther;

        //            //            objquestiondetails.PAQLiabilitiesLoans = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQLiabilitiesLoans;
        //            //            objquestiondetails.PAQLiabilitiesMortgages = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQLiabilitiesMortgages;
        //            //            objquestiondetails.PAQLiabilitiesOthers = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQLiabilitiesOthers;

        //            //            objquestiondetails.PAQAssetsTotal = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQAssetsTotal;
        //            //            objquestiondetails.PAQLiabilitiesTotal = objMember.ObjAssetsandLiabilitiesPAQ4Details.PAQLiabilitiesTotal;
        //            //            objquestiondetails.IsDeleted = false;
        //            //            objquestiondetails.IsDeleted = false;
        //            //            objquestiondetails.tblPolicyMemberDetail = objMemberDetail;
        //            //            Context.tblQuestionDetails.Add(objquestiondetails);
        //            //            //Context.tblQuestionDetails.Add(objquestiondetails);
        //            //        }


        //            //    }
        //            //    #endregion

        //            //    #region Family BackGround History Q&A
        //            //    if (objMember.objLstFamily != null)
        //            //    {
        //            //        foreach (var FamilyBackGroundQuestion in objMember.objLstFamily)
        //            //        {
        //            //            tblMemberQuestion objMemberQuestion = new tblMemberQuestion();
        //            //            if (FamilyBackGroundQuestion.MemberQuestionID > 0 || objMemberDetail.MemberID > 0)
        //            //            {
        //            //                tblMemberQuestion ExistingMemberQuestion = objMemberDetail.tblMemberQuestions.Where(a => a.QID == FamilyBackGroundQuestion.QuestionID).FirstOrDefault();
        //            //                objMemberQuestion.ItemType = "FamilyBackGround";
        //            //                objMemberQuestion.QID = Convert.ToInt32(FamilyBackGroundQuestion.QuestionID);
        //            //                objMemberQuestion.Answer = FamilyBackGroundQuestion.Answer;
        //            //                if (ExistingMemberQuestion != null)
        //            //                {
        //            //                    objMemberQuestion.MemberID = ExistingMemberQuestion.MemberID;
        //            //                    objMemberQuestion.MemberQuestionID = ExistingMemberQuestion.MemberQuestionID;
        //            //                    Context.Entry(ExistingMemberQuestion).CurrentValues.SetValues(objMemberQuestion);
        //            //                }
        //            //                else
        //            //                {
        //            //                    objMemberQuestion.MemberID = objMember.MemberID;
        //            //                    objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                }
        //            //            }
        //            //            else
        //            //            {
        //            //                objMemberQuestion.ItemType = "FamilyBackGround";
        //            //                objMemberQuestion.QID = Convert.ToInt32(FamilyBackGroundQuestion.QuestionID);
        //            //                objMemberQuestion.Answer = FamilyBackGroundQuestion.Answer;
        //            //                objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region Additional Q&A
        //            //    if (objMember.objAdditionalQuestions != null)
        //            //    {
        //            //        //if (objMember.RelationShipWithPropspect == "267")
        //            //        //{
        //            //        //    if (!string.IsNullOrEmpty(ObjPolicy.MainLifeAdditionalQuestion))
        //            //        //    {
        //            //        //        var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<List<QuestionsList>>(ObjPolicy.MainLifeAdditionalQuestion);
        //            //        //        // Newtonsoft.Json.JsonSerializerSettings setting = new Newtonsoft.Json.JsonSerializerSettings();
        //            //        //        objMember.objAdditionalQuestions =Newtonsoft.Json.JsonConvert.DeserializeObject<List<QuestionsList>>(ObjPolicy.MainLifeAdditionalQuestion).ToList();
        //            //        //    }
        //            //        //}
        //            //        //if (objMember.RelationShipWithPropspect == "268")
        //            //        //{
        //            //        //    if (!string.IsNullOrEmpty(ObjPolicy.SpouseAdditionalQuestion))
        //            //        //    {
        //            //        //        //Newtonsoft.Json.JsonSerializerSettings setting = new Newtonsoft.Json.JsonSerializerSettings();
        //            //        //        objMember.objAdditionalQuestions = Newtonsoft.Json.JsonConvert.DeserializeObject<List<QuestionsList>>(ObjPolicy.SpouseAdditionalQuestion).ToList();

        //            //        //    }

        //            //        //}
        //            //        // For PAQ Questionaires
        //            //        foreach (var AdditionalQuestion in objMember.objAdditionalQuestions)
        //            //        {
        //            //            tblMemberQuestion objMemberQuestion = new tblMemberQuestion();
        //            //            if (AdditionalQuestion.MemberQuestionID > 0 || objMemberDetail.MemberID > 0)
        //            //            {
        //            //                tblMemberQuestion ExistingMemberQuestion = objMemberDetail.tblMemberQuestions.Where(a => a.QID == AdditionalQuestion.QuestionID).FirstOrDefault();
        //            //                objMemberQuestion.ItemType = "AdditionalQuestions";
        //            //                objMemberQuestion.QID = Convert.ToInt32(AdditionalQuestion.QuestionID);
        //            //                objMemberQuestion.Answer = AdditionalQuestion.Answer;
        //            //                if (ExistingMemberQuestion != null)
        //            //                {
        //            //                    objMemberQuestion.MemberID = ExistingMemberQuestion.MemberID;
        //            //                    objMemberQuestion.MemberQuestionID = ExistingMemberQuestion.MemberQuestionID;
        //            //                    Context.Entry(ExistingMemberQuestion).CurrentValues.SetValues(objMemberQuestion);
        //            //                }
        //            //                else
        //            //                {
        //            //                    objMemberQuestion.MemberID = objMember.MemberID;
        //            //                    objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                }
        //            //            }
        //            //            else
        //            //            {
        //            //                objMemberQuestion.ItemType = "AdditionalQuestions";
        //            //                objMemberQuestion.QID = Convert.ToInt32(AdditionalQuestion.QuestionID);
        //            //                objMemberQuestion.Answer = AdditionalQuestion.Answer;
        //            //                objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    //objMemberDetails[i].OccupationID = Context.tblQuoteMemberDetials.Where(a => a.LifeQQID == tbllifeQQ.LifeQQID && a.IsDeleted != true).Select(a => a.OccupationID).FirstOrDefault();


        //            //    if (objMember.RelationShipWithPropspect == "267")
        //            //    {
        //            //        #region  WealthPlannerQuestions
        //            //        // objMember.objLstWealthPlannerQuestions = GetMasQuestions(Context, "WealthPlannerQuestions", null, null, null, null, Member.MemberID);
        //            //        if (objMember.objLstWealthPlannerQuestions != null)
        //            //        {
        //            //            foreach (var LstWealthPlannerQuestions in objMember.objLstWealthPlannerQuestions)
        //            //            {

        //            //                tblMemberQuestion objMemberQuestion = new tblMemberQuestion();
        //            //                if (LstWealthPlannerQuestions.MemberQuestionID > 0 || objMemberDetail.MemberID > 0)
        //            //                {
        //            //                    if (ObjPolicy.objMemberDetails[0].RelationShipWithPropspect == "267")
        //            //                    {
        //            //                        tblMemberQuestion ExistingMemberQuestion = objMemberDetail.tblMemberQuestions.Where(a => a.QID == LstWealthPlannerQuestions.QuestionID).FirstOrDefault();
        //            //                        objMemberQuestion.ItemType = "WealthPlannerQuestions";
        //            //                        objMemberQuestion.QID = Convert.ToInt32(LstWealthPlannerQuestions.QuestionID);
        //            //                        objMemberQuestion.Answer = LstWealthPlannerQuestions.Answer;
        //            //                        if (ExistingMemberQuestion != null)
        //            //                        {
        //            //                            objMemberQuestion.MemberID = ExistingMemberQuestion.MemberID;
        //            //                            objMemberQuestion.MemberQuestionID = ExistingMemberQuestion.MemberQuestionID;
        //            //                            Context.Entry(ExistingMemberQuestion).CurrentValues.SetValues(objMemberQuestion);
        //            //                        }
        //            //                        else
        //            //                        {
        //            //                            objMemberQuestion.MemberID = objMember.MemberID;
        //            //                            objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                        }
        //            //                    }
        //            //                }
        //            //                else
        //            //                {
        //            //                    if (ObjPolicy.objMemberDetails[0].RelationShipWithPropspect == "267")
        //            //                    {
        //            //                        objMemberQuestion.ItemType = "WealthPlannerQuestions";
        //            //                        objMemberQuestion.QID = Convert.ToInt32(LstWealthPlannerQuestions.QuestionID);
        //            //                        objMemberQuestion.Answer = LstWealthPlannerQuestions.Answer;
        //            //                        objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                    }
        //            //                }

        //            //            }
        //            //        }
        //            //        #endregion
        //            //    }

        //            //    #region Previous & Other Insurance Questions
        //            //    if (objMember.objLstOtherInsuranceDetails != null)
        //            //    {
        //            //        foreach (var OtherInsuranceQuestion in objMember.objLstOtherInsuranceDetails)
        //            //        {
        //            //            tblMemberQuestion objMemberQuestion = new tblMemberQuestion();
        //            //            if (OtherInsuranceQuestion.MemberQuestionID > 0 || objMemberDetail.MemberID > 0)
        //            //            {
        //            //                tblMemberQuestion ExistingMemberQuestion = objMemberDetail.tblMemberQuestions.Where(a => a.QID == OtherInsuranceQuestion.QuestionID).FirstOrDefault();
        //            //                objMemberQuestion.ItemType = "PreviousAndCurrentLifeInsurance";
        //            //                objMemberQuestion.QID = Convert.ToInt32(OtherInsuranceQuestion.QuestionID);
        //            //                objMemberQuestion.Answer = OtherInsuranceQuestion.Answer;
        //            //                if (ExistingMemberQuestion != null)
        //            //                {
        //            //                    objMemberQuestion.MemberID = ExistingMemberQuestion.MemberID;
        //            //                    objMemberQuestion.MemberQuestionID = ExistingMemberQuestion.MemberQuestionID;
        //            //                    Context.Entry(ExistingMemberQuestion).CurrentValues.SetValues(objMemberQuestion);
        //            //                }
        //            //                else
        //            //                {
        //            //                    objMemberQuestion.MemberID = objMember.MemberID;
        //            //                    objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //                }
        //            //            }
        //            //            else
        //            //            {
        //            //                objMemberQuestion.ItemType = "PreviousAndCurrentLifeInsurance";
        //            //                objMemberQuestion.QID = Convert.ToInt32(OtherInsuranceQuestion.QuestionID);
        //            //                objMemberQuestion.Answer = OtherInsuranceQuestion.Answer;
        //            //                objMemberDetail.tblMemberQuestions.Add(objMemberQuestion);
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    #region OtherInsurance Info
        //            //    int Index = ObjPolicy.objMemberDetails.FindIndex(a => a.AssuredName == ObjPolicy.AssuredName);
        //            //    ObjPolicy.AssuredIndex = Index;
        //            //    if (objMember.objLifeAssuredOtherInsurance != null)
        //            //    {
        //            //        if (objMember.objLifeAssuredOtherInsurance.Count > 0)
        //            //        {
        //            //            if (objMember.MemberID > 0)
        //            //            {
        //            //                UpdatePreviousInsuranceInfo(Convert.ToInt32(objMember.MemberID));
        //            //            }
        //            //            foreach (var item in objMember.objLifeAssuredOtherInsurance.Where(a => a.IsDeleted != true))
        //            //            {
        //            //                tblPolicyMemberInsuranceInfo objOtherInsuInfo = new tblPolicyMemberInsuranceInfo();
        //            //                if (objMemberDetail.MemberID > 0 && item.OtherInsuranceId > 0)
        //            //                {
        //            //                    // objOtherInsuInfo= objMemberDetail.tblPolicyMemberInsuranceInfoes.Where(a => a.MemberInsuranceID == item.OtherInsuranceId).FirstOrDefault();
        //            //                    var ExistingobjOtherInsuInfo = objMemberDetail.tblPolicyMemberInsuranceInfoes.Where(a => a.MemberInsuranceID == item.OtherInsuranceId).FirstOrDefault();
        //            //                    objOtherInsuInfo.AccidentalBenifit = item.AccidentalBenefitAmount;
        //            //                    objOtherInsuInfo.CompanyName = item.CompanyName;
        //            //                    objOtherInsuInfo.CriticalIllnessBenifit = item.CriticalIllnessBenefit;
        //            //                    //objOtherInsuInfo.HospitalizationReimbursement = item.TotalPermanentDisability; 
        //            //                    objOtherInsuInfo.HospitalizationPerDay = item.HospitalizationPerDay;
        //            //                    objOtherInsuInfo.HospitalizationReimbursement = item.HospitalizationReimbursement;
        //            //                    objOtherInsuInfo.Policy_ProposalNo = item.PolicyNo;
        //            //                    objOtherInsuInfo.TotalSIAtDeath = item.TotalSAAtDeath;
        //            //                    objOtherInsuInfo.CurrentStatus = item.CurrentStatus;
        //            //                    objOtherInsuInfo.IsDeleted = item.IsDeleted;
        //            //                    if (ExistingobjOtherInsuInfo != null)
        //            //                    {
        //            //                        objOtherInsuInfo.MemberID = ExistingobjOtherInsuInfo.MemberID;
        //            //                        objOtherInsuInfo.MemberInsuranceID = ExistingobjOtherInsuInfo.MemberInsuranceID;
        //            //                        Context.Entry(ExistingobjOtherInsuInfo).CurrentValues.SetValues(objOtherInsuInfo);
        //            //                    }

        //            //                }
        //            //                else
        //            //                {
        //            //                    objOtherInsuInfo.AccidentalBenifit = item.AccidentalBenefitAmount;
        //            //                    objOtherInsuInfo.CompanyName = item.CompanyName;
        //            //                    objOtherInsuInfo.CriticalIllnessBenifit = item.CriticalIllnessBenefit;
        //            //                    objOtherInsuInfo.HospitalizationPerDay = item.HospitalizationPerDay;
        //            //                    objOtherInsuInfo.HospitalizationReimbursement = item.HospitalizationReimbursement;
        //            //                    objOtherInsuInfo.Policy_ProposalNo = item.PolicyNo;
        //            //                    objOtherInsuInfo.TotalSIAtDeath = item.TotalSAAtDeath;
        //            //                    objOtherInsuInfo.IsDeleted = item.IsDeleted;
        //            //                    objOtherInsuInfo.CurrentStatus = item.CurrentStatus;
        //            //                    objMemberDetail.tblPolicyMemberInsuranceInfoes.Add(objOtherInsuInfo);
        //            //                }
        //            //            }
        //            //        }
        //            //    }

        //            //    #endregion

        //            //    #region Policy Member Claim Info
        //            //    objMemberDetail.IsClaimExits = objMember.AreyouClaimedAnyPolicies;
        //            //    if (objMember.MemberID > 0)
        //            //    {
        //            //        UpdatePreviousClaimInfo(objMember.MemberID);
        //            //    }
        //            //    if (objMember.objClaimInfo != null)
        //            //    {
        //            //        if (objMember.objClaimInfo.Count > 0)
        //            //        {

        //            //            foreach (var item in objMember.objClaimInfo.Where(a => a.IsDeleted != true))
        //            //            {
        //            //                tblPolicyMemberClaimInfo tblMemberClaimInfo = new tblPolicyMemberClaimInfo();
        //            //                if (objMemberDetail.MemberID > 0 && item.OtherClaimId != null)
        //            //                {
        //            //                    var ExistingobjClaimInfo = objMemberDetail.tblPolicyMemberClaimInfoes.Where(a => a.MemberID == objMember.MemberID).FirstOrDefault();
        //            //                    tblMemberClaimInfo.CompanyName = item.CompanyName;
        //            //                    tblMemberClaimInfo.NatureOfClaim = item.NatureOfClaim;
        //            //                    tblMemberClaimInfo.ProposalNo = item.PolicyNo;
        //            //                    tblMemberClaimInfo.DateOfClaim = item.DateOfClaim;
        //            //                    tblMemberClaimInfo.IsDeleted = item.IsDeleted;
        //            //                    if (ExistingobjClaimInfo != null)
        //            //                    {
        //            //                        tblMemberClaimInfo.MemberID = ExistingobjClaimInfo.MemberID;
        //            //                        tblMemberClaimInfo.MemberClaimID = ExistingobjClaimInfo.MemberClaimID;
        //            //                        Context.Entry(ExistingobjClaimInfo).CurrentValues.SetValues(tblMemberClaimInfo);
        //            //                    }

        //            //                }
        //            //                else
        //            //                {
        //            //                    tblMemberClaimInfo.CompanyName = item.CompanyName;
        //            //                    tblMemberClaimInfo.NatureOfClaim = item.NatureOfClaim;
        //            //                    tblMemberClaimInfo.ProposalNo = item.PolicyNo;
        //            //                    tblMemberClaimInfo.DateOfClaim = item.DateOfClaim;
        //            //                    tblMemberClaimInfo.IsDeleted = item.IsDeleted;
        //            //                    objMemberDetail.tblPolicyMemberClaimInfoes.Add(tblMemberClaimInfo);
        //            //                }
        //            //            }
        //            //        }
        //            //    }
        //            //    #endregion

        //            //    if (objMember.MemberID > 0)
        //            //    {
        //            //        Context.Entry(ExisitingobjMemberDetail).CurrentValues.SetValues(objMemberDetail);
        //            //    }
        //            //    else
        //            //    {
        //            //        #region Adding Benefit Details
        //            //        //var QuoteDetails = Context.tblLifeQQs.Where(a => a.QuoteNo == ObjPolicy.QuoteNo).FirstOrDefault();
        //            //        //var QuoteMember = Context.tblQuoteMemberDetials.Where(a => a.MemberID == objlifeQQ.QuoteNo).FirstOrDefault();
        //            //        // var QuoteMember = Context.tblQuoteMemberDetials.Where(a => a.LifeQQID == QuoteDetails.LifeQQID && a.AssuredName==objMember.AssuredName).FirstOrDefault();
        //            //        var QuoteMember = Context.tblQuoteMemberDetials.Where(a => a.MemberID == objMember.QuoteMemberID).FirstOrDefault();
        //            //        if (QuoteMember != null)
        //            //        {
        //            //            foreach (var QuoteBenefit in QuoteMember.tblQuoteMemberBeniftDetials.ToList())
        //            //            {
        //            //                tblPolicyMemberBenefitDetail objProposalBenifit = new tblPolicyMemberBenefitDetail();
        //            //                objProposalBenifit.SumInsured = QuoteBenefit.SumInsured;
        //            //                //objProposalBenifit.Premium = QuoteBenefit.Premium;
        //            //                objProposalBenifit.Premium = QuoteBenefit.ActualPremium.ToString();
        //            //                objProposalBenifit.BenifitID = QuoteBenefit.BenifitID;
        //            //                objProposalBenifit.AssuredName = QuoteMember.AssuredName;
        //            //                objProposalBenifit.RelationShipWithProposer = QuoteMember.Relationship;
        //            //                objProposalBenifit.LoadingAmount = Convert.ToString(QuoteBenefit.LoadingAmount);
        //            //                objProposalBenifit.LoadingPerc = QuoteBenefit.LoadingPercentage;
        //            //                objProposalBenifit.LoadinPerMille = QuoteBenefit.LoadinPerMille;
        //            //                // objProposalBenifit.TotalPremium = QuoteBenefit.ActualPremium.ToString();
        //            //                objProposalBenifit.TotalPremium = QuoteBenefit.Premium;
        //            //                objProposalBenifit.IsDeleted = false;
        //            //                objMemberDetail.tblPolicyMemberBenefitDetails.Add(objProposalBenifit);

        //            //                if (QuoteBenefit.LoadingPercentage > 0)
        //            //                {
        //            //                    tblMemberBenefitOtherDetail objRiderDetails = new tblMemberBenefitOtherDetail();
        //            //                    objRiderDetails.tblPolicyMemberBenefitDetail = objProposalBenifit;
        //            //                    objRiderDetails.tblPolicyMemberBenefitDetail1 = objProposalBenifit;
        //            //                    objRiderDetails.LoadingType = Context.tblMasCommonTypes.Where(a => a.MasterType == "LoadingType" && a.Description == "Percentage" && a.isDeleted == 0).Select(a => a.CommonTypesID).FirstOrDefault().ToString();
        //            //                    objRiderDetails.LoadingBasis = Context.tblMasCommonTypes.Where(a => a.MasterType == "LoadingBasis" && a.Code == "OC" && a.isDeleted == 0).Select(a => a.CommonTypesID).FirstOrDefault().ToString();
        //            //                    objRiderDetails.LoadingAmount = Convert.ToString(QuoteBenefit.LoadingPercentage);
        //            //                    objRiderDetails.ExtraPremium = Convert.ToString(QuoteBenefit.LoadingAmount);
        //            //                    objRiderDetails.CreatedDate = DateTime.Now;
        //            //                    Context.tblMemberBenefitOtherDetails.Add(objRiderDetails);
        //            //                }
        //            //                if (QuoteBenefit.LoadinPerMille > 0)
        //            //                {
        //            //                    tblMemberBenefitOtherDetail objRiderDetails = new tblMemberBenefitOtherDetail();
        //            //                    objRiderDetails.tblPolicyMemberBenefitDetail = objProposalBenifit;
        //            //                    objRiderDetails.tblPolicyMemberBenefitDetail1 = objProposalBenifit;
        //            //                    objRiderDetails.LoadingType = Context.tblMasCommonTypes.Where(a => a.MasterType == "LoadingType" && a.Description == "Per Milli" && a.isDeleted == 0).Select(a => a.CommonTypesID).FirstOrDefault().ToString();
        //            //                    objRiderDetails.LoadingBasis = Context.tblMasCommonTypes.Where(a => a.MasterType == "LoadingBasis" && a.Code == "OC" && a.isDeleted == 0).Select(a => a.CommonTypesID).FirstOrDefault().ToString();
        //            //                    objRiderDetails.LoadingAmount = Convert.ToString(QuoteBenefit.LoadinPerMille);
        //            //                    objRiderDetails.ExtraPremium = Convert.ToString(QuoteBenefit.LoadingAmount);
        //            //                    objRiderDetails.CreatedDate = DateTime.Now;
        //            //                    Context.tblMemberBenefitOtherDetails.Add(objRiderDetails);
        //            //                }
        //            //            }
        //            //            objpolicy.tblPolicyMemberDetails.Add(objMemberDetail);
        //            //        }

        //            //        #endregion
        //            //    }
        //            //}
        //        }









        //    }
        //    catch (Exception E)
        //    {

        //    }


        //    return null;  //need to check 
        //}


        //Objpolicy is PolicyDto model Object and objpolicy is TblPolicy object dont be confused
        public TblPolicy FillPolicyInfo(TblPolicyDto ObjPolicy, TblPolicy objpolicy)
        {
            try
            {
               // string userId = Common.CommonBusiness.GetUserId(ObjPolicy.UserName); Need To ask about it
                objpolicy.Createdby = userId;
                objpolicy.PolicyTerm = ObjPolicy.PolicyTerm;
                objpolicy.PremiumTerm = ObjPolicy.PremiumTerm;
                objpolicy.PaymentFrequency = ObjPolicy.PaymentFrequency;
                objpolicy.PaymentMethod = ObjPolicy.PaymentMethod;
                objpolicy.PaymentPaidBy = ObjPolicy.PaymentPaidBy;
                objpolicy.Others = ObjPolicy.Others;
                //PaymentReceiptPrefferdBy
                objpolicy.ProposalNo = ObjPolicy.ProposalNo;
                objpolicy.ModeOfCommunication = ObjPolicy.ModeOfCommunication;
                objpolicy.PreferredReceipt = ObjPolicy.PaymentReceiptPrefferdBy;
                objpolicy.PreferredLanguage = ObjPolicy.PreferredLanguage;

                objpolicy.MaturityBenefits = ObjPolicy.MaturityBenefits;
                objpolicy.Years = ObjPolicy.Years;
                objpolicy.SmartPensionReceivingPeriod = ObjPolicy.SmartPensionReceivingPeriod;
                objpolicy.SmartPensionMonthlyIncome = ObjPolicy.SmartPensionMonthlyIncome;
                objpolicy.AnnualPremium = ObjPolicy.TotalAnnualPremiumContribution;
                objpolicy.DepositPremium = ObjPolicy.DepositPremium;
                objpolicy.BankAccountNumber = ObjPolicy.BankAccountNumber;
                objpolicy.BankBranchName = ObjPolicy.BankBranchName;
                objpolicy.CreditCardNo = ObjPolicy.CreditCardNo;
                objpolicy.BankName = ObjPolicy.BankName;

                if (!string.IsNullOrEmpty(ObjPolicy.QuoteNo) && ObjPolicy.ProposalNo == null)
                {
                    objpolicy.ProposalNo = ObjPolicy.QuoteNo.Replace("Q", "P");
                }
                //else
                //{
                //objpolicy.ProposalNo = ObjPolicy.ProposalNo;
                //}
                objpolicy.QuoteNo = ObjPolicy.QuoteNo;
                objpolicy.PolicyVersion = 1;
                objpolicy.Createdby = (new Guid()).ToString();
                if (objpolicy.CreatedDate == DateTime.MinValue)
                    objpolicy.CreatedDate = DateTime.Now;
                objpolicy.ProposalSubmitDate = DateTime.Now;
                objpolicy.InceptionTime = DateTime.Now.TimeOfDay;
                //Temp Purpose
                DateTime today = DateTime.Now;
                int[] exceptionDays = new int[3] { 29, 30, 31 };
                if (exceptionDays.Contains(today.Day))
                    today = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 28);
                ObjPolicy.RiskCommencementDate = today;
                objpolicy.PolicyIssueDate = ObjPolicy.RiskCommencementDate;
                objpolicy.PolicyStartDate = ObjPolicy.RiskCommencementDate;
                objpolicy.PolicyEndDate = ObjPolicy.RiskCommencementDate.AddYears(Convert.ToInt32(ObjPolicy.PolicyTerm));

                objpolicy.Deductible = ObjPolicy.Deductible;
                objpolicy.LeadNo = ObjPolicy.LeadNo;
                objpolicy.IntroducerCode = ObjPolicy.IntroducerCode;

                return objpolicy;
            }
            catch (Exception ex)
            {

                throw ex;
            }


            
        }

        public TblPolicyClients FilltblpolicyClient(TblPolicyMemberDetailsDto objMemberDetails, TblPolicyClients objPolicyClient)
        {
            try
            {

             //   AVOAIALifeEntities Context = new AVOAIALifeEntities();
                objPolicyClient.ContactPerson = objMemberDetails.ContactPerson;
               // objPolicyClient.Designation = objMemberDetails.Designation;
               // objPolicyClient.BusinessRegistrationNo = objMemberDetails.BusinessRegistrationNo;

                objPolicyClient.FullName =  objMemberDetails.RelationShipWithProposer.ToString();
                objPolicyClient.CompanyName = objMemberDetails.CompanyName;
               // objPolicyClient.CorporateName = objMemberDetails.NatureOfDuties;
                objPolicyClient.ProposerEamilId = objMemberDetails.Email;
                objPolicyClient.ProposerTelepohoneNo = objMemberDetails.Mobile;
                //objPolicyClient.DateOfBirth = objMemberDetails.DateOfBirth;
                objPolicyClient.DateOfBirth = objMemberDetails.Dob;//== null ? (string.IsNullOrEmpty(objMemberDetails.Newnicno) == false ? Convert.ToDateTime(CommonBusiness.FetchDateMonth(objMemberDetails.NewNICNO)) : DateTime.Now) : objMemberDetails.DateOfBirth;
                objPolicyClient.Age = objMemberDetails.Age;
                objPolicyClient.EmailId = objMemberDetails.Email;
                objPolicyClient.FirstName = objMemberDetails.FirstName;
                objPolicyClient.MiddleName = objMemberDetails.MiddleName;
                objPolicyClient.LastName = objMemberDetails.LastName;
                string names = string.Empty;
                if (objMemberDetails.RelationShipWithProposer.ToString() != "CORP")
                {
                    var name = objMemberDetails.FirstName.Split(' ');
                    if (name != null)
                    {
                        foreach (var item in name)
                        {
                            if (item != "")
                            {
                                if (name.Count() > 1)
                                {
                                    names = names + " " + item[0];
                                }
                                else
                                {
                                    names = names + item[0];
                                }
                            }
                        }
                    }
                    objPolicyClient.NameWithInitials = names.TrimStart() + " " + objMemberDetails.LastName;
                }


                //objPolicyClient.NameWithInitials = objMemberDetails.NameWithInitial;
                objPolicyClient.Gender = objMemberDetails.Gender;
                string title = Context.TblPlcommonTypes.Where(a => a.Description == objMemberDetails.Salutation && a.MasterType == "Salutation").Select(b => b.Code).FirstOrDefault();
                if (string.IsNullOrEmpty(title))
                    objPolicyClient.Title = objMemberDetails.Salutation;
                else
                    objPolicyClient.Title = title;

                objPolicyClient.WorkNo = objMemberDetails.Work;
                objPolicyClient.HomeNo = objMemberDetails.Home;
              //  objPolicyClient.MaritalStatus = GetMaritialStatus(objMemberDetails.MaritialStatus);
               // objPolicyClient.MaritalStatus = objMemberDetails.MaritialStatus;

                //objPolicyClient.MaritalStatus = objMemberDetails.MaritalStatuslist
                objPolicyClient.MaritalStatus = Convert.ToInt32(objMemberDetails.MaritialStatus);
                objPolicyClient.MobileNo = objMemberDetails.Mobile;
                objPolicyClient.AlteranteMobileNo = objMemberDetails.AlternateMobileNo;
                objPolicyClient.MonthlyIncome = objMemberDetails.MonthlyIncome;

                // objPolicyClient.Nationality = Convert.ToInt32(objMemberDetails.Nationality);
               // objPolicyClient.Nationality = GetSaveNationality(objMemberDetails.Nationality);

                objPolicyClient.NatureOfDuties = objMemberDetails.NatureOfDuties;
                objPolicyClient.Newnicno = objMemberDetails.Newnicno;
                objPolicyClient.Oldnicno = objMemberDetails.Oldnicno;
               // objPolicyClient.IsProposerAssured = objMemberDetails.IsproposerlifeAssured;
                objPolicyClient.OccupationId = objMemberDetails.OccupationId;
                //objPolicyClient.PreferredName = objMemberDetails.PrefferedName           
                objPolicyClient.CreatedDate = DateTime.Now;

                objPolicyClient.CountryOccupation = objMemberDetails.CountryOccupation;
                objPolicyClient.CitizenShip = objMemberDetails.CitizenShip;
                objPolicyClient.Citizenship1 = objMemberDetails.Citizenship1;
                objPolicyClient.Citizenship2 = objMemberDetails.Citizenship2;
                objPolicyClient.ResidentialNationality = objMemberDetails.ResidentialNationality;
                objPolicyClient.ResidentialNationalityStatus = objMemberDetails.ResidentialNationalityStatus;
                objPolicyClient.USTaxpayerId = objMemberDetails.UstaxpayerId;
                objPolicyClient.OccupationHazardousWork = objMemberDetails.OccupationHazardousWork;
                objPolicyClient.SpecifyHazardousWork = objMemberDetails.SpecifyHazardousWork;
                objPolicyClient.PassportNumber = objMemberDetails.PassportNumber;
                objPolicyClient.DrivingLicense = objMemberDetails.DrivingLicense;




                //objPolicyClient.CountryofOccupation = objMemberDetails.CountryofOccupation; 

                #region FillAddressDetails
                TblAddress objtbladdress = objPolicyClient.Adress;
                if (objtbladdress == null)
                {
                    objtbladdress = new TblAddress();
                }

                //Fill the address details


            

                objtbladdress = FillAddressDetails(objMemberDetails.Adress, objtbladdress);

                //Need to create the fillAdd





                objPolicyClient.Adress = objtbladdress;
                if (objMemberDetails.IsPermanentAddrSameasCommAddr)
                {
                    objPolicyClient.IsPermanentAddrSameasCommAddr = true;
                    objPolicyClient.PermanetAddress = objtbladdress;
                }
                else
                {
                    TblAddress objtblPermanentaddress = objPolicyClient.Adress;
                    if (objtblPermanentaddress == null)
                    {
                        objtblPermanentaddress = new TblAddress();
                    }
                    if (objMemberDetails.RelationShipWithProposer.ToString() != "CORP") //Bit confusion
                    {
                        objtblPermanentaddress = FillAddressDetails(objMemberDetails.PermanetAddress, objtblPermanentaddress);
                    }

                    objPolicyClient.PermanetAddress = objtblPermanentaddress;
                }
                #endregion

                return objPolicyClient;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        //FillAddressDetails method implementation Fill policydetails mai ye fucntion hai eska implementatioin 
        public TblAddress FillAddressDetails(TblAddressDto objAddress, TblAddress objtblAddress)
        {
            try
            {
                if (objAddress.Pincode != null)
                {
                    string[] PinCity = objAddress.Pincode.Split('|');
                    string pin = PinCity[0];
                    string City = PinCity[1];
                    objtblAddress.Address1 = objAddress.Address1;
                    objtblAddress.Address2 = objAddress.Address2;
                    objtblAddress.Address3 = objAddress.Address3;
                    objtblAddress.City = City;
                    objtblAddress.District = objAddress.District;
                    objtblAddress.State = objAddress.State;
                    objtblAddress.Pincode = pin;
                }
                return objtblAddress;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }







    }
}







