using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Models;
using static iNube.Services.Policy.Models.ProposalModel;
using iNube.Services.Policy.Entities.AvoEntities;

namespace iNube.Services.Policy.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<PolicyInsurableDetailsDTO, TblPolicyInsurableDetails>();
            CreateMap<TblPolicyInsurableDetails, PolicyInsurableDetailsDTO>();

            CreateMap<PolicyDTO, Entities.TblPolicy>()
            .ForMember(dest => dest.TblPolicyInsurableDetails, opt => opt.MapFrom(src => src.PolicyInsurableDetails)).ReverseMap();

            CreateMap<PolicyDto, Entities.AvoEntities.TblPolicy>();
            CreateMap<Entities.AvoEntities.TblPolicy, PolicyDto>();

            CreateMap<PolicysearchDTO, Entities.TblPolicy>();
            CreateMap<Entities.TblPolicy, PolicysearchDTO>();

            CreateMap<MasCommonTypesDto, TblMasCommonTypes>();
            CreateMap<TblMasCommonTypes, MasCommonTypesDto>();

            CreateMap<MasLifeQuestionnairesDto, TblMasLifeQuestionnaires>();
            CreateMap<TblMasLifeQuestionnaires, MasLifeQuestionnairesDto>();

            CreateMap<PolicyClientAddressDto, TblPolicyClientAddress>();
            CreateMap<TblPolicyClientAddress, PolicyClientAddressDto>();

            CreateMap<PolicyClientsDto, TblPolicyClients>();
            CreateMap<TblPolicyClients, PolicyClientsDto>();

            CreateMap<PolicyDocumentsDto, TblPolicyDocuments>();
            CreateMap<TblPolicyDocuments, PolicyDocumentsDto>();

            CreateMap<PolicyExtensionDto, TblPolicyExtension>();
            CreateMap<TblPolicyExtension, PolicyExtensionDto>();

            CreateMap<PolicyMemberAdditionalLifeStyleDetailsDto, TblPolicyMemberAdditionalLifeStyleDetails>();
            CreateMap<TblPolicyMemberAdditionalLifeStyleDetails, PolicyMemberAdditionalLifeStyleDetailsDto>();

            CreateMap<PolicyMemberAddressDto, TblPolicyMemberAddress>();
            CreateMap<TblPolicyMemberAddress, PolicyMemberAddressDto>();

            CreateMap<PolicyMemberBenefitDetailsDto, TblPolicyMemberBenefitDetails>();
            CreateMap<TblPolicyMemberBenefitDetails, PolicyMemberBenefitDetailsDto>();

            CreateMap<PolicyMemberClaimInfoDto, TblPolicyMemberClaimInfo>();
            CreateMap<TblPolicyMemberClaimInfo, PolicyMemberClaimInfoDto>();

            CreateMap<PolicyMemberDetailsDto, TblPolicyMemberDetails>();
            CreateMap<TblPolicyMemberDetails, PolicyMemberDetailsDto>();

            CreateMap<PolicyMemberFamilyHistoryDto, TblPolicyMemberFamilyHistory>();
            CreateMap<TblPolicyMemberFamilyHistory, PolicyMemberFamilyHistoryDto>();

            CreateMap<PolicyMemberInsuranceInfoDto, TblPolicyMemberInsuranceInfo>();
            CreateMap<TblPolicyMemberInsuranceInfo, PolicyMemberInsuranceInfoDto>();

            CreateMap<PolicyMemberLifeStyleDetailsDto, TblPolicyMemberLifeStyleDetails>();
            CreateMap<TblPolicyMemberLifeStyleDetails, PolicyMemberLifeStyleDetailsDto>();

            CreateMap<PolicyMemberQuestionsDto, TblPolicyMemberQuestions>();
            CreateMap<TblPolicyMemberQuestions, PolicyMemberQuestionsDto>();

            CreateMap<PolicyNomineeDetailsDto, TblPolicyNomineeDetails>();
            CreateMap<TblPolicyNomineeDetails, PolicyNomineeDetailsDto>();

            CreateMap<PolicyPremiumDto, TblPolicyPremium>();
            CreateMap<TblPolicyPremium, PolicyPremiumDto>();

            CreateMap<PolicyQuestionDetailsDto, TblPolicyQuestionDetails>();
            CreateMap<TblPolicyQuestionDetails, PolicyQuestionDetailsDto>();

            CreateMap<PolicyTopupDetailsDto, TblPolicyTopupDetails>();
            CreateMap<TblPolicyTopupDetails, PolicyTopupDetailsDto>();

            CreateMap<PolicyRelationshipDto, TblPolicyRelationship>();
            CreateMap<TblPolicyRelationship, PolicyRelationshipDto>();

            
        }

    }

}
