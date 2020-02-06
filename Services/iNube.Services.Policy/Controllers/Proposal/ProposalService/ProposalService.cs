using AutoMapper;
using iNube.Services.Policy.Controllers.Proposal.IntegrationService.iNube.Services.Proposal.Controllers.ProposalConfig.IntegrationService;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
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
        List<InboxDetailsDto> ProposalPoll();
        List<MasCommonTypesDto> MastertypeData();
          
        ProposalResponce PartialFormDataSave(Models.ProposalModel.PolicyDto policyDto, ApiContext Context);

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
        public List<InboxDetailsDto> ProposalPoll()
        {
            var userId = "sahir";
            var ProposalData =
                (from objtblpolicy in _context.TblPolicy.Where(a => a.PolicyStageStatusId == 1153 || a.PolicyStageStatusId == 476 || a.PolicyStageStatusId == 477 || a.PolicyStageStatusId == 193
                                                                      || a.PolicyStageStatusId == 191 || a.PolicyStageStatusId == 192)
                     //  join objtbllifeQQ in Context.TblLifeQq
                     //  on objtblpolicy.QuoteNo equals objtbllifeQQ.QuoteNo
                     // join Contact in Context.TblContacts
                     // on objtbllifeQQ.ContactId equals Contact.ContactId
                 join relationship in _context.TblPolicyRelationship
                 on objtblpolicy.PolicyId equals relationship.PolicyId
                 //  join objproduct in Context.TblProducts
                 // on objtblpolicy.ProductId equals objproduct.ProductId
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
    }
}
