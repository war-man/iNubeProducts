using AutoMapper;
using AutoMapper.Mappers;
using iNube.Services.Proposal.Models;
using iNube.Services.Proposal.PLEntities;

namespace iNube.Components.RuleEngine.Helpers
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            CreateMap<TblAddress, TblAddressDto>();
            CreateMap<TblAddressDto, TblAddress>();

           // CreateMap<TblPolicy, FetchProposalDataDto>();
            //CreateMap<FetchProposalDataDto, TblPolicy>();

            CreateMap<TblContacts, TblContactsDto>();
            CreateMap<TblContactsDto, TblContacts>();

            CreateMap<TblCustomers, TblCustomersDto>();
            CreateMap<TblCustomersDto, TblCustomers>();


            CreateMap<TblLifeQq, TblLifeQqDto>();
            CreateMap<TblLifeQqDto, TblLifeQq>();

            CreateMap<TblMemberAdditionalLifeStyleDetails, TblMemberAdditionalLifeStyleDetailsDto>();
            CreateMap<TblMemberAdditionalLifeStyleDetailsDto, TblMemberAdditionalLifeStyleDetails>();


            CreateMap<TblMemberLifeStyleDetails, TblMemberLifeStyleDetailsDto>();
            CreateMap<TblMemberLifeStyleDetailsDto, TblMemberLifeStyleDetails>();

            CreateMap<TblMemberQuestions, TblMemberQuestionsDto>();
            CreateMap<TblMemberQuestionsDto, TblMemberQuestions>();

            CreateMap<TblOrganization, TblOrganizationDto>();
            CreateMap<TblOrganizationDto, TblOrganization>();

            CreateMap<TblPlcommonTypes, TblPlcommonTypesDto>();
            CreateMap<TblPlcommonTypesDto, TblPlcommonTypes>();

            CreateMap<TblPllifeQuestionnaires, TblPllifeQuestionnairesDto>();
            CreateMap<TblPllifeQuestionnairesDto, TblPllifeQuestionnaires>();


            CreateMap<TblPolicy, TblPolicyDto>();
            CreateMap<TblPolicyDto, TblPolicy>();

            CreateMap<TblPolicyClients, TblPolicyClientsDto>();
            CreateMap<TblPolicyClientsDto, TblPolicyClients>();

            CreateMap<TblPolicyClients, TblPolicyClientsDto>();
            CreateMap<TblPolicyClientsDto, TblPolicyClients>();

            CreateMap<TblPolicyMemberDetails, TblPolicyMemberDetailsDto>();
            CreateMap<TblPolicyMemberDetailsDto, TblPolicyMemberDetails>();


            CreateMap<TblPolicyMemberFamilyHistory, TblPolicyMemberFamilyHistoryDto>();
            CreateMap<TblPolicyMemberFamilyHistoryDto, TblPolicyMemberFamilyHistory>();

            CreateMap<TblPolicyMemberInsuranceInfo, TblPolicyMemberInsuranceInfoDto>();
            CreateMap<TblPolicyMemberInsuranceInfoDto, TblPolicyMemberInsuranceInfo>();

            CreateMap<TblPolicyNomineeDetails, TblPolicyNomineeDetailsDto>();
            CreateMap<TblPolicyNomineeDetailsDto, TblPolicyNomineeDetails>();

            CreateMap<TblPolicyRelationship, TblPolicyRelationshipDto>();
            CreateMap<TblPolicyRelationshipDto, TblPolicyRelationship>();

            CreateMap<TblPolicyTopupDetails, TblPolicyTopupDetailsDto>();
            CreateMap<TblPolicyTopupDetailsDto, TblPolicyTopupDetails>();

            CreateMap<TblProposalPremium, TblProposalPremiumDto>();
            CreateMap<TblProposalPremiumDto, TblProposalPremium>();

            CreateMap<TblQuestionDetails, TblQuestionDetailsDto>();
            CreateMap<TblQuestionDetailsDto, TblQuestionDetails>();

        }
    }
}
