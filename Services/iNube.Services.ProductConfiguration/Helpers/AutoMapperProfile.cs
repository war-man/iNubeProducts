using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.ProductConfiguration.Entities;
using iNube.Services.ProductConfiguration.Models;

namespace iNube.Services.ProductConfiguration.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<MappingDto, TblmasMapping>();
            CreateMap<TblmasMapping, MappingDto>();

            CreateMap<ProductDTO, TblProducts>()
                //.ForMember(dest => dest.TblProductCovers, opt => opt.MapFrom(src => src.ProductCovers))
                //.ForMember(dest => dest.TblProductBenefits, opt => opt.MapFrom(src => src.ProductBenefits))
                .ForMember(dest => dest.TblProductChannels, opt => opt.MapFrom(src => src.ProductChannels))
                .ForMember(dest => dest.TblInsurableRcbdetails, opt => opt.MapFrom(src => src.InsurableRcbdetails))
                .ForMember(dest => dest.TblProductClausesWarrentiesExclusions, opt => opt.MapFrom(src => src.ProductClausesWarrentiesExclusions))
                .ForMember(dest => dest.TblProductInsurableItems, opt => opt.MapFrom(src => src.ProductInsurableItems))
                .ForMember(dest => dest.TblProductRcbdetails, opt => opt.MapFrom(src => src.ProductRcbdetails))
                .ForMember(dest => dest.TblProductSwitchOnDetails, opt => opt.MapFrom(src => src.ProductSwitchOnDetails))
                .ForMember(dest => dest.TblProductRatingMapping, opt => opt.MapFrom(src => src.CalculateConfig))
                .ForMember(dest => dest.TblProductBasicConfiguration, opt => opt.MapFrom(src => src.ProductBasicConfiguration))

            .ForMember(dest => dest.TblProductPremium, opt => opt.MapFrom(src => src.ProductPremium)).ReverseMap();


            CreateMap<ProductSwitchOnDetailsDTO, TblProductSwitchOnDetails>().ReverseMap();
            CreateMap<ProductRatingMapping, TblProductRatingMapping>().ReverseMap();
            CreateMap<ProductBasicConfigurationDTO, TblProductBasicConfiguration>().ReverseMap();

            //CreateMap<ProductDTO, TblProducts>();
            //CreateMap<TblProducts, ProductDTO>();
            CreateMap<InsurableRcbdetailsDTO, TblInsurableRcbdetails>();
            CreateMap<TblInsurableRcbdetails, InsurableRcbdetailsDTO>();
            CreateMap<InsurableRcbdetailsDTO, TblInsurableRcbdetails>()
            .ForMember(dest => dest.TblInsurableChildRcbdetails, opt => opt.MapFrom(src => src.InsurableChildRcbdetail))
            .ForMember(dest => dest.TblCoverRcbdetails, opt => opt.MapFrom(src => src.CoverRcbdetails)).ReverseMap();
            CreateMap<CoverRcbdetailsDTO, TblCoverRcbdetails>()
           .ForMember(dest => dest.TblCoverChildRcbdetails, opt => opt.MapFrom(src => src.CoverChildRcbdetail)).ReverseMap();

            CreateMap<InsurableChildRcbdetailsDTO, TblInsurableChildRcbdetails>();
            CreateMap<TblInsurableChildRcbdetails, InsurableChildRcbdetailsDTO>();
            CreateMap<CoverChildRcbdetailsDTO, TblCoverChildRcbdetails>();
            CreateMap<TblCoverChildRcbdetails, CoverChildRcbdetailsDTO>();

            CreateMap<CommonTypesDTO, TblmasPccommonTypes>();
            CreateMap<TblmasPccommonTypes, CommonTypesDTO>();
            CreateMap<ProductInsurableItemsDTO, TblProductInsurableItems>();
            CreateMap<TblProductInsurableItems, ProductInsurableItemsDTO>();

            CreateMap<ProductCoversDTO, TblProductCovers>();
            CreateMap<TblProductCovers, ProductCoversDTO>();
            CreateMap<ProductChannelsDTO, TblProductChannels>();
            CreateMap<TblProductChannels, ProductChannelsDTO>();

            CreateMap<ProductClausesWarrentiesExclusionsDTO, TblProductClausesWarrentiesExclusions>();
            CreateMap<TblProductClausesWarrentiesExclusions, ProductClausesWarrentiesExclusionsDTO>();
            CreateMap<ProductRcbdetailsDTO, TblProductRcbdetails>();
            CreateMap<TblProductRcbdetails, ProductRcbdetailsDTO>();
            CreateMap<MasterEntityDTO, TblProductEntity>();
            CreateMap<TblProductEntity, MasterEntityDTO>();
            CreateMap<TblProductBenefits, ProductBenefitsDTO>().ReverseMap();
            CreateMap<ProductBenefitsDTO, TblProductBenefits>()
            .ForMember(dest => dest.TblBenifitRangeDetails, opt => opt.MapFrom(src => src.BenifitRangeDetails)).ReverseMap();


            CreateMap<ProductInsurableItemsDTO, TblProductInsurableItems>()
           .ForMember(dest => dest.TblProductCovers, opt => opt.MapFrom(src => src.ProductCovers)).ReverseMap();
            CreateMap<ProductCoversDTO, TblProductCovers>()
           .ForMember(dest => dest.TblProductBenefits, opt => opt.MapFrom(src => src.ProductBenefits)).ReverseMap();
            //.ForMember(dest => dest.TblProductPremium, opt => opt.MapFrom(src => src.ProductPremium)).ReverseMap();


            CreateMap<ProductMasterDTO, TblmasProductMaster>();
            CreateMap<TblmasProductMaster, ProductMasterDTO>();
            CreateMap<BenifitRangeDetails, TblBenifitRangeDetails>();
            CreateMap<TblBenifitRangeDetails, BenifitRangeDetails>();

            CreateMap<masClausesWarrentiesExclusionsDTO, TblmasClausesWarrentiesExclusions>();
            CreateMap<TblmasClausesWarrentiesExclusions, masClausesWarrentiesExclusionsDTO>();

            CreateMap<ProductClausesWarrentiesExclusionsDTO, TblmasClausesWarrentiesExclusions>();
            CreateMap<TblmasClausesWarrentiesExclusions, ProductClausesWarrentiesExclusionsDTO>();
            CreateMap<TblProductPremium, ProductPremiumDTO>();
            CreateMap<ProductPremiumDTO, TblProductPremium>();


            CreateMap<MasterDataDTO, TblmasProductMaster>();
            CreateMap<TblmasProductMaster, MasterDataDTO>();

            CreateMap<DynamicProduct, TblDynamicProduct>().ReverseMap();

            CreateMap<EntityDetailsDTO, TblEntityDetails>().ReverseMap();
            CreateMap<EntityAttributesDTO, TblEntityAttributes>().ReverseMap();

            CreateMap<EntityDetailsDTO, TblEntityDetails>()
            .ForMember(dest => dest.TblEntityAttributes, opt => opt.MapFrom(src => src.EntityAttributes)).ReverseMap();

            CreateMap<MasDynamicDTO, TblmasDynamic>().ReverseMap();
        }

    }

}
