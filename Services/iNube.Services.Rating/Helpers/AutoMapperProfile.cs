
using AutoMapper;
using iNube.Services.Rating.Entities;
using iNube.Services.Rating.Models;

namespace iNube.Services.Rating.Helpers
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            CreateMap<TblRatingParameters, RatingParametersDTO>();
            CreateMap<RatingParametersDTO, TblRatingParameters>();
            CreateMap<TblRatingRuleConditions, RatingRuleConditionsDTO>();
            CreateMap<RatingRuleConditionsDTO, TblRatingRuleConditions>();
            CreateMap<TblRating, RatingDTO>();
            CreateMap<RatingDTO, TblRating>();

            CreateMap<TblParameterSet, ParameterSetDTO>()
                .ForMember(dest => dest.ParameterSetDetails, opt => opt.MapFrom(src => src.TblParameterSetDetails)).ReverseMap();

            CreateMap<TblParameterSetDetails, ParameterSetDetailsDTO>().ReverseMap();

            CreateMap<TblRating, RatingDTO>()
                .ForMember(dest => dest.RatingRules, opt => opt.MapFrom(src => src.TblRatingRules)).ReverseMap();


            CreateMap<TblRatingRules, RatingRulesDTO>()
                .ForMember(dest => dest.RatingRuleConditions, opt => opt.MapFrom(src => src.TblRatingRuleConditions)).ReverseMap();

            CreateMap<TblCalculationConfigExpression, CalculationConfigExpressionDTO>().ReverseMap();
            CreateMap<TblCalculationConfigParam, CalculationConfigParamDTO>().ReverseMap();

            CreateMap<TblCalculationConfig, CalculationConfigDTO>()
                .ForMember(dest => dest.CalculationConfigExpression, opt => opt.MapFrom(src => src.TblCalculationConfigExpression))
                .ForMember(dest => dest.CalculationConfigParam, opt => opt.MapFrom(src => src.TblCalculationConfigParam)).ReverseMap();

            
            CreateMap<TblIllustrationConfig, IllustrationConfigDTO>()
                .ForMember(dest => dest.IllustrationMapping, opt => opt.MapFrom(src => src.TblIllustrationMapping))
                .ForMember(dest => dest.IllustrationConfigParam, opt => opt.MapFrom(src => src.TblIllustrationConfigParam)).ReverseMap();
            CreateMap<TblIllustrationConfigParam, IllustrationConfigParamDTO>().ReverseMap();
            CreateMap<TblIllustrationMapping, IllustrationMappingDTO>().ReverseMap();



            CreateMap<TblCalculationHeader, CalculationHeaderDTO>().ReverseMap();
            CreateMap<TblCalculationResult, CalculationResultDTO>().ReverseMap();
            CreateMap<TblParameterSet, ParameterSetDataDTO>().ReverseMap();
        }
    }
}
