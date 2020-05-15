using AutoMapper;
using iNube.Services.Policy.Controllers.Proposal.IntegrationService;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Entities.AvoEntities;
using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using static iNube.Services.Policy.Models.ProposalModel;
using static iNube.Services.Policy.Models.QuestionsListDTO;

namespace iNube.Services.Policy.Controllers.Proposal.ProposalService
{
    public interface IProposalService
    {
        Task<IEnumerable<LifeQqDTO>> LoadLifeQqData();
        Task<IEnumerable<LeadDTO>> FetchTblContactsdata();
        IEnumerable<QuestionsListDTO> GetMasQuestions();
        Task<List<InboxDetailsDto>> ProposalPollAsync(ApiContext apiContext);
        List<MasCommonTypesDto> MastertypeData();
          
        ProposalResponce PartialFormDataSave(Models.ProposalModel.PolicyDto policyDto, ApiContext Context);

        Task<List<ProposalDto>> GetProposalByPositionId(int postid, ApiContext Context);
        Task<policyDto> GetPolicyByQuotNO(string proposalNo, ApiContext Context);
        Task<List<InboxDetailsDto>> FetchProposalSubmittedDetailsAsync(ApiContext apiContext);
        Task<List<PandingRequirementsDto>> FetchPendingRequirementsAsync(ApiContext apiContext);
    }
    public class ProposalService : IProposalService
    {
        private Entities.AvoEntities.ProposalContext _context;
        private IMapper _mapper;
        //string userId = "Sahir";
        public IPOIntegrationService _integrationService;


        public ProposalService(Entities.AvoEntities.ProposalContext context, IMapper mapper, IPOIntegrationService integrationService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;

        }
        public async Task<IEnumerable<LifeQqDTO>> LoadLifeQqData()
        {
            var ProposalLifeQqData = await _integrationService.fetchLifeQqDataAsync();
            return ProposalLifeQqData;
        }
        public async Task<IEnumerable<LeadDTO>> FetchTblContactsdata()
        {
            var PltblContactsData = await _integrationService.FetchTblContactsdataAsync();
            return PltblContactsData;
        }
        public IEnumerable<QuestionsListDTO> GetMasQuestions()
        {
            var questions = (from objLsQuestions in _context.TblMasLifeQuestionnaires
                                 select new QuestionsListDTO
                                 {
                                     QuestionID = objLsQuestions.Qid,
                                     QuestionText = objLsQuestions.Qtext,
                                     QuestionType = objLsQuestions.Qtype,
                                     ControlType = objLsQuestions.ControlType,
                                     Gender = objLsQuestions.Gender,
                                     Value = objLsQuestions.Value,
                                     Answer = "",
                                     SubControlType = objLsQuestions.SubControlType,
                                     QuestionIndex = (int)objLsQuestions.SequenceNo,

                                 }).ToList();


            var lstQues = _mapper.Map<IEnumerable<QuestionsListDTO>>(questions);
            return lstQues;

        }
        public async Task<List<InboxDetailsDto>> ProposalPollAsync(ApiContext apiContext)
        {
            var userId = "sahir";
            List<InboxDetailsDto> ProposalData = new List<InboxDetailsDto>();
            if (string.IsNullOrEmpty(apiContext.Name))
            {
                 ProposalData =
                (from objtblpolicy in _context.TblPolicy.Where(a => a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                                      || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192)
                 join relationship in _context.TblPolicyRelationship
                 on objtblpolicy.PolicyId equals relationship.PolicyId
                  join policyClients in _context.TblPolicyClients
                 on relationship.PolicyClientId equals policyClients.PolicyClientId
                 join commontype in _context.TblMasCommonTypes
                 on objtblpolicy.PolicyStageStatusId equals commontype.CommonTypesId
                 join objTblPolicyExtensionDto in _context.TblPolicyExtension
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
                     //  PlanName = objproduct.ProductName,
                     PaymentFrequency = objtblpolicy.PaymentFrequency,
                     Need = objTblPolicyExtensionDto.ProposalNeed,
                     // LeadNo = Contact.LeadNo,
                     //  Banca = Contact.IntroducerCode,
                     ProposalStatus = commontype.Description,
                     FullName = (policyClients.FullName != "CORP" ? _context.TblMasCommonTypes.Where(a => a.Code == policyClients.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + policyClients.FirstName + " " + policyClients.LastName : policyClients.CorporateName)
                 }).ToList();
            }
            else
            {
                var empList = await _integrationService.GetEmpHierarchyAsync(apiContext.Name, apiContext);
                var staffCodes = empList.Select(rt => Convert.ToInt64(rt.PositionID).ToString()); 
                 ProposalData = 
               (from objtblpolicy in _context.TblPolicy.Where(a => staffCodes.Contains(a.HandledBy) && ( a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                                     || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192))
                join relationship in _context.TblPolicyRelationship
                on objtblpolicy.PolicyId equals relationship.PolicyId
                join policyClients in _context.TblPolicyClients
                on relationship.PolicyClientId equals policyClients.PolicyClientId
                join commontype in _context.TblMasCommonTypes
                on objtblpolicy.PolicyStageStatusId equals commontype.CommonTypesId
                join objTblPolicyExtensionDto in _context.TblPolicyExtension
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
                     //  PlanName = objproduct.ProductName,
                     PaymentFrequency = objtblpolicy.PaymentFrequency,
                    Need = objTblPolicyExtensionDto.ProposalNeed,
                     // LeadNo = Contact.LeadNo,
                     //  Banca = Contact.IntroducerCode,
                     ProposalStatus = commontype.Description,
                    FullName = (policyClients.FullName != "CORP" ? _context.TblMasCommonTypes.Where(a => a.Code == policyClients.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + policyClients.FirstName + " " + policyClients.LastName : policyClients.CorporateName)
                }).ToList();
            }
            var pooldata = _mapper.Map<List<InboxDetailsDto>>(ProposalData);
            return pooldata;
        }

        public List<MasCommonTypesDto> MastertypeData()
        {


            //if (Context.TblPlcommonTypes.Where(x => x.MasterType == mType))


            var MasterData = _context.TblMasCommonTypes
                                                .Select(x => new MasCommonTypesDto
                                                {
                                                    mID = x.CommonTypesId,
                                                    mValue = x.Description,
                                                    mType = x.MasterType

                                                }).ToList();



            return MasterData;



        }
        //save partial form data

        public ProposalResponce PartialFormDataSave(Models.ProposalModel.PolicyDto policyDto, ApiContext apiContext)
        {
            try
            {
                policyDto.CreatedDate = DateTime.Now;
                policyDto.Createdby = apiContext.UserId;
                var dto = _mapper.Map<Entities.AvoEntities.TblPolicy>(policyDto);
                _context.TblPolicy.Add(dto);
                _context.SaveChanges();
                var formdataDTO = _mapper.Map<Models.ProposalModel.PolicyDto>(dto);
                return new ProposalResponce { Status = BusinessStatus.Created, ResponseMessage = $"Partial Form Data Saved for: {formdataDTO.ProposalNo}"  };
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        public async Task<List<ProposalDto>> GetProposalByPositionId(int postid, ApiContext Context)
        {
            //  _context = (ProposalContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var Proposaldata = (from tblMapper in _context.TblPolicy

                                where (tblMapper.HandledBy== postid.ToString() && tblMapper.PolicyNo == null)

                                join tblMapperDetails in _context.TblPolicyMemberDetails on tblMapper.PolicyId equals tblMapperDetails.PolicyId

                                select new ProposalDto

                                {
                                    Name = tblMapperDetails.FirstName,

                                    ProposalNumber = tblMapper.ProposalNo,
                                    ContactNumner = tblMapperDetails.Mobile,
                                    MovedTo = "",
                                    // CityName = tblMapperDetails,

                                }).ToList();
            return Proposaldata;

        }
        public async Task<policyDto> GetPolicyByQuotNO(string proposalNo, ApiContext Context)
        {
            //  _context = (ProposalContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var Policydata = (from tblMapper in _context.TblPolicy

                                where (tblMapper.ProposalNo == proposalNo && tblMapper.PolicyNo !=null)

                                join tblMapperDetails in _context.TblPolicyMemberDetails on tblMapper.PolicyId equals tblMapperDetails.PolicyId

                                select new policyDto

                                {

                                    PolicyNumber = tblMapper.ProposalNo,
                                    ContactNumner = tblMapperDetails.Mobile,
                                    MovedTo = "",
                                    PolicyStatus= Convert.ToInt32(tblMapper.PolicyStatusId),
                                    PremiumAmount= tblMapperDetails.BasicPremium,
                                    Mode= tblMapper.PaymentMethod,
                                    
                                    // CityName = tblMapperDetails,

                                }).FirstOrDefault();
            return Policydata;

        }

        public async Task<List<InboxDetailsDto>> FetchProposalSubmittedDetailsAsync(ApiContext apiContext)
        {


#pragma warning disable CS0219 // Variable is assigned but its value is never used
            var userId = "sahir";
#pragma warning restore CS0219 // Variable is assigned but its value is never used
            List<InboxDetailsDto> ProposalData = new List<InboxDetailsDto>();
            if (string.IsNullOrEmpty(apiContext.Name))
            {
                 ProposalData = (from objtblpolicy in _context.TblPolicy.Where(a => a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                              || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192 || a.PolicyStageStatusId == 194 || a.PolicyStageStatusId == 195 || a.PolicyStageStatusId == 196 || a.PolicyStageStatusId == 197 || a.PolicyStageStatusId == 198
                                                              || a.PolicyStageStatusId == 1068 || a.PolicyStageStatusId == 1447 || a.PolicyStageStatusId == 1448 || a.PolicyStageStatusId == 2374 || a.PolicyStageStatusId == 2375 || a.PolicyStageStatusId == 2376 || a.PolicyStageStatusId == 2490 || a.PolicyStageStatusId == 2491)
                                        // join lifeqq in _context.TblLifeQq
                                        // on objtblpolicy.QuoteNo equals lifeqq.QuoteNo
                                        //join Common in _context.tblProducts on objtblpolicy.ProductID equals Common.ProductId
                                        // join Contact in _context.TblContacts
                                        // on lifeqq.ContactId equals Contact.ContactId
                                        // join objproduct in _context.TblProducts
                                        // on objtblpolicy.ProductId equals objproduct.ProductId
                                        //  join commontype in _context.TblPlcommonTypes
                                        //  on objtblpolicy.PolicyStageStatusId equals commontype.CommonTypesId
                                    join relationship in _context.TblPolicyRelationship
                                    on objtblpolicy.PolicyId equals relationship.PolicyId
                                    join objTblPolicyExtensionDto in _context.TblPolicyExtension
                                     on objtblpolicy.PlanId equals objTblPolicyExtensionDto.PolicyId
                                    join policyClients in _context.TblPolicyClients
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

                                        // PlanName = objproduct.ProductName,
                                        PaymentFrequency = objtblpolicy.PaymentFrequency,
                                        Need = objTblPolicyExtensionDto.ProposalNeed,
                                        //SubmittedPropMobile = objtblpolicyclients.MobileNo,
                                        //SubmittedPropHome = objtblpolicyclients.HomeNo,
                                        //SubmittedPropWork = objtblpolicyclients.WorkNo,
                                        // SubmittedPropEmail = objtblpolicyclients.EmailID,
                                        //  LeadNo = Contact.LeadNo,
                                        // ProposalStatus = commontype.Description,
                                        //FullName = (policyClients.FullName != "CORP" ? _context.TblPlcommonTypes.Where(a => a.Code == policyClients.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + policyClients.FirstName + " " + policyClients.LastName : policyClients.CorporateName)
                                        //SubmittedPropInforce = "",
                                    }).OrderByDescending(a => a.ProposalNo).ToList();
            }
            else
            {
                var empList = await _integrationService.GetEmpHierarchyAsync(apiContext.Name, apiContext);
                var staffCodes = empList.Select(rt => Convert.ToInt64(rt.PositionID).ToString());
                ProposalData = (from objtblpolicy in _context.TblPolicy.Where(a => staffCodes.Contains(a.HandledBy) && (a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                             || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192 || a.PolicyStageStatusId == 194 || a.PolicyStageStatusId == 195 || a.PolicyStageStatusId == 196 || a.PolicyStageStatusId == 197 || a.PolicyStageStatusId == 198
                                                             || a.PolicyStageStatusId == 1068 || a.PolicyStageStatusId == 1447 || a.PolicyStageStatusId == 1448 || a.PolicyStageStatusId == 2374 || a.PolicyStageStatusId == 2375 || a.PolicyStageStatusId == 2376 || a.PolicyStageStatusId == 2490 || a.PolicyStageStatusId == 2491))
                                    // join lifeqq in _context.TblLifeQq
                                    // on objtblpolicy.QuoteNo equals lifeqq.QuoteNo
                                    //join Common in _context.tblProducts on objtblpolicy.ProductID equals Common.ProductId
                                    // join Contact in _context.TblContacts
                                    // on lifeqq.ContactId equals Contact.ContactId
                                    // join objproduct in _context.TblProducts
                                    // on objtblpolicy.ProductId equals objproduct.ProductId
                                    //  join commontype in _context.TblPlcommonTypes
                                    //  on objtblpolicy.PolicyStageStatusId equals commontype.CommonTypesId
                                join relationship in _context.TblPolicyRelationship
                                on objtblpolicy.PolicyId equals relationship.PolicyId
                                join objTblPolicyExtensionDto in _context.TblPolicyExtension
                                 on objtblpolicy.PlanId equals objTblPolicyExtensionDto.PolicyId
                                join policyClients in _context.TblPolicyClients
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

                                    // PlanName = objproduct.ProductName,
                                    PaymentFrequency = objtblpolicy.PaymentFrequency,
                                    Need = objTblPolicyExtensionDto.ProposalNeed,
                                    //SubmittedPropMobile = objtblpolicyclients.MobileNo,
                                    //SubmittedPropHome = objtblpolicyclients.HomeNo,
                                    //SubmittedPropWork = objtblpolicyclients.WorkNo,
                                    // SubmittedPropEmail = objtblpolicyclients.EmailID,
                                    //  LeadNo = Contact.LeadNo,
                                    // ProposalStatus = commontype.Description,
                                    //FullName = (policyClients.FullName != "CORP" ? _context.TblPlcommonTypes.Where(a => a.Code == policyClients.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + policyClients.FirstName + " " + policyClients.LastName : policyClients.CorporateName)
                                    //SubmittedPropInforce = "",
                                }).OrderByDescending(a => a.ProposalNo).ToList();
            }
            try
            {
                if (ProposalData == null)
                {
                    ProposalData = new List<InboxDetailsDto>();
                }
            }
            catch (Exception)
            {
                
            }
            var poolProposaldata = _mapper.Map<List<InboxDetailsDto>>(ProposalData);
            return poolProposaldata;
        }

        public async Task<List<PandingRequirementsDto>> FetchPendingRequirementsAsync(ApiContext apiContext)
        {
            UWInboxDto objUWInbox = new UWInboxDto();
            try
            {

                var USerInfo = "SAHIR";// _context.AspNetUsers.Where(a => a.UserName == objUWInbox.UserName).FirstOrDefault();
                if (USerInfo != null)
                {
                    if (objUWInbox.Message == "Pending")
                    {
                        objUWInbox.LstProposals = (from objpolicy in _context.TblPolicy//where condition i have to put form UserId
                                                                                      //  join objproduct in _context.tblProducts
                                                                                      //  on objpolicy.ProductID equals objproduct.ProductId
                                                   join objtblpolicyrelationship in _context.TblPolicyRelationship on objpolicy.PolicyId equals objtblpolicyrelationship.PolicyId
                                                   join objtblpolicyclients in _context.TblPolicyClients on objtblpolicyrelationship.PolicyClientId equals objtblpolicyclients.PolicyClientId
                                                 //  join objProposalPayments in _context.TblProposalPremium on objpolicy.PolicyId equals objProposalPayments.PolicyId
                                                   where //objpolicy.PolicyStageStatusID == CrossCuttingConstants.PolicyStageStatusDecline ||
                                                   objpolicy.PolicyStageStatusId == CrossCuttingConstantsDto.PolicyStageStatusPending
                                                   || objpolicy.PolicyStageStatusId == CrossCuttingConstantsDto.PolicyStageStatusCounterOffer
                                                   || objpolicy.PolicyStageStatusId == CrossCuttingConstantsDto.PolicyStageStatusOutStandingReq
                                                   select new PandingRequirementsDto
                                                   {
                                                       ProposalNo = objpolicy.ProposalNo,
                                                       QuoteNo = objpolicy.QuoteNo,
                                                       //InsuredName = objtblpolicyclients.FirstName,
                                                       //FullName = (objtblpolicyclients.FullName != "CORP" ? _context.TblPlcommonTypes.Where(a => a.Code == objtblpolicyclients.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + objtblpolicyclients.FirstName + " " + objtblpolicyclients.LastName : objtblpolicyclients.CorporateName),
                                                       // PlanName = objproduct.ProductName,//this data will come form ajay
                                                       //  PolicyId = objpolicy.PolicyID,
                                                       //  PolicyTerm = objpolicy.PolicyTerm,
                                                       // IssueDate = objpolicy.CreatedDate,
                                                       IssueDate = objpolicy.CreatedDate.ToString(),
                                                      // Premium = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium),
                                                      // Premiumlkr = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium).ToString(),
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
                        List<decimal?> PolicyIDs;//(_context.tblPolicyUWRemarkHistories.Where(a => a.CreatedBy == USerInfo.Id && a.CommonID != null
#pragma warning restore CS0168 // Variable is declared but never used
                        //                         && (a.Decision == CrossCuttingConstants.UWDecisionAccepted || a.Decision == CrossCuttingConstants.UWDecisionDecline
                        //                         || a.Decision == CrossCuttingConstants.UWDecisionPostPone || a.Decision == CrossCuttingConstants.UWDecisionWithDrawn || a.Decision == CrossCuttingConstants.UWDecisionReferToUW
                        //                          || a.Decision == CrossCuttingConstants.UWDecisionOutStandingReq || a.Decision == CrossCuttingConstants.UWDecisionNotTaken
                        //                          || a.Decision == CrossCuttingConstants.UWDecisionCounterOffer)).Select(a => a.PolicyID)).ToList();


                        objUWInbox.LstProposals = (from objpolicy in _context.TblPolicy//.Where(a => PolicyIDs.Contains(a.PolicyId))
                                                                                      // join objproduct in _context.tblProducts
                                                                                      //on objpolicy.ProductId equals objproduct.ProductId
                                                   join objtblpolicyrelationship in _context.TblPolicyRelationship on objpolicy.PolicyId equals objtblpolicyrelationship.PolicyId
                                                   join objtblpolicyclients in _context.TblPolicyClients on objtblpolicyrelationship.PolicyClientId equals objtblpolicyclients.PolicyClientId
                                                  // join objProposalPayments in _context.TblProposalPremium on objpolicy.PolicyId equals objProposalPayments.PolicyId
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

                                                     //  Premium = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium),
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
                        if (string.IsNullOrEmpty(apiContext.Name))
                        {
                            objUWInbox.LstProposals = (from objpolicy in _context.TblPolicy
                                                           // join objproduct in _context.tblProducts
                                                           //on objpolicy.ProductID equals objproduct.ProductId

                                                           //join AspnetUsers in _context.AspNetUsers on objpolicy.Createdby equals AspnetUsers.Id
                                                           //join objUserdetails in _context.tblUserDetails on AspnetUsers.UserName equals objUserdetails.LoginID
                                                           // join objUserChannelMap in _context.tblUserChannelMaps on objUserdetails.NodeID equals objUserChannelMap.NodeId
                                                           // join objChannel in _context.tblmasChannels on objUserChannelMap.ChannelID equals objChannel.ChannelID


                                                       join objtblpolicyrelationship in _context.TblPolicyRelationship on objpolicy.PolicyId equals objtblpolicyrelationship.PolicyId
                                                       join objtblpolicyclients in _context.TblPolicyClients on objtblpolicyrelationship.PolicyClientId equals objtblpolicyclients.PolicyClientId
                                                       // join objProposalPayments in _context.TblProposalPremium on objpolicy.PolicyId equals objProposalPayments.PolicyId

                                                       join objtblpolicyMemberDetails in _context.TblPolicyMemberDetails.Where(a => a.Assuredname == "MainLife") on objpolicy.PolicyId equals objtblpolicyMemberDetails.PolicyId

                                                       // join objpolicyAllocation in _context.tblPolicyUWAllocations on objpolicy.PolicyID equals objpolicyAllocation.PolicyID
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
                                                           //Premium = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium),
                                                           //  Channel = objChannel.ChannelName,
                                                           //  AllocatedDate = objpolicyAllocation.CreatedDate,
                                                           // SARVal = objtblpolicyMemberDetails.SAR,
                                                           //ISAFC = ISAFC,
                                                           // NoofDays = DbFunctions.DiffDays(objpolicyAllocation.CreatedDate, DateTime.Now)
                                                       }).  // SAR
                                                   ToList();
                        }
                        else
                        {
                            var empList = await _integrationService.GetEmpHierarchyAsync(apiContext.Name, apiContext);
                            var staffCodes = empList.Select(rt => Convert.ToInt64(rt.PositionID).ToString());
                            objUWInbox.LstProposals = (from objpolicy in _context.TblPolicy.Where(a => staffCodes.Contains(a.HandledBy))
                                                           // join objproduct in _context.tblProducts
                                                           //on objpolicy.ProductID equals objproduct.ProductId

                            //join AspnetUsers in _context.AspNetUsers on objpolicy.Createdby equals AspnetUsers.Id
                            //join objUserdetails in _context.tblUserDetails on AspnetUsers.UserName equals objUserdetails.LoginID
                            // join objUserChannelMap in _context.tblUserChannelMaps on objUserdetails.NodeID equals objUserChannelMap.NodeId
                            // join objChannel in _context.tblmasChannels on objUserChannelMap.ChannelID equals objChannel.ChannelID


                                                       join objtblpolicyrelationship in _context.TblPolicyRelationship on objpolicy.PolicyId equals objtblpolicyrelationship.PolicyId
                                                       join objtblpolicyclients in _context.TblPolicyClients on objtblpolicyrelationship.PolicyClientId equals objtblpolicyclients.PolicyClientId
                                                       // join objProposalPayments in _context.TblProposalPremium on objpolicy.PolicyId equals objProposalPayments.PolicyId

                                                       join objtblpolicyMemberDetails in _context.TblPolicyMemberDetails.Where(a => a.Assuredname == "MainLife") on objpolicy.PolicyId equals objtblpolicyMemberDetails.PolicyId

                                                       // join objpolicyAllocation in _context.tblPolicyUWAllocations on objpolicy.PolicyID equals objpolicyAllocation.PolicyID
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
                                                           //Premium = (objProposalPayments.AnnualPremium + objProposalPayments.AdditionalPremium),
                                                           //  Channel = objChannel.ChannelName,
                                                           //  AllocatedDate = objpolicyAllocation.CreatedDate,
                                                           // SARVal = objtblpolicyMemberDetails.SAR,
                                                           //ISAFC = ISAFC,
                                                           // NoofDays = DbFunctions.DiffDays(objpolicyAllocation.CreatedDate, DateTime.Now)
                                                       }).  // SAR
                                                  ToList();
                        }
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
                
            }
            return objUWInbox.LstProposals;

        }

    }
}
