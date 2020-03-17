using AutoMapper;
using AutoMapper.Mappers;

using iNube.Components.RuleEngine.Models;
using iNube.Components.RuleEngine.Entities;
using iNube.Components.RuleEngine.Entities.AllocationEntities;
using static iNube.Components.RuleEngine.Models.ALModels;

namespace iNube.Components.RuleEngine.Helpers
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            CreateMap<TblParameters, ParametersDto>();
            CreateMap<ParametersDto, TblParameters>();

            CreateMap<TblParamSet, ParamSetDto>();
            CreateMap<ParamSetDto, TblParamSet>();

            CreateMap<TblParamSetDetails, ParamSetDetailsDto>();
            CreateMap<ParamSetDetailsDto, TblParamSetDetails>();

            CreateMap<TblRuleConditions, RuleConditionsDto>();
            CreateMap<RuleConditionsDto, TblRuleConditions>();

            CreateMap<TblRuleConditionValues, RuleConditionValuesDto>();
            CreateMap<RuleConditionValuesDto, TblRuleConditionValues>();

            CreateMap<TblRuleParamSetMapping, RuleParamSetMappingDto>();
            CreateMap<RuleParamSetMappingDto, TblRuleParamSetMapping>();

            CreateMap<TblRules, RulesDto>();
            CreateMap<RulesDto, TblRules>();

            CreateMap<TblRuleMapping, RuleMappingDto>();
            CreateMap<RuleMappingDto, TblRuleMapping>();

            CreateMap<TblAllocationParameters, ParameterSetDTO>();
            CreateMap<ParameterSetDTO, TblAllocationParameters>();

            CreateMap<TblAllocParameterSet, ParameterSetDetailsDTO>();
            CreateMap<ParameterSetDetailsDTO, TblAllocParameterSet>();

            CreateMap<TblAllocParameterSetDetails, ParamSetDetailsDTO>();
            CreateMap<ParamSetDetailsDTO, TblAllocParameterSetDetails>();

            CreateMap<TblAllocation, AllocationDTO>();
            CreateMap<AllocationDTO, TblAllocation>();

            CreateMap<TblAllocationRules, AllocationRulesDTO>();
            CreateMap<AllocationRulesDTO, TblAllocationRules>();

            CreateMap<TblAllocationRuleConditions, AllocationRuleConditionsDTO>();
            CreateMap<AllocationRuleConditionsDTO, TblAllocationRuleConditions>();





        }
    }
}
