using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Services.Partners.Entities.AVO;

namespace iNube.Services.Partners.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<OrganizationDTO, Entities.TblOrganization>()
            .ForMember(dest => dest.TblOrgAddress, opt => opt.MapFrom(src => src.OrgAddress))
            .ForMember(dest => dest.TblOrgSpocDetails, opt => opt.MapFrom(src => src.OrgSpocDetails)).ReverseMap();


            CreateMap<OrgAddressDTO, Entities.TblOrgAddress>();
            CreateMap<Entities.TblOrgAddress, OrgAddressDTO>();
            CreateMap<OrgSpocDetailsDTO, Entities.TblOrgSpocDetails>();
            CreateMap<Entities.TblOrgSpocDetails, OrgSpocDetailsDTO>();

            CreateMap<OrgOfficeDTO, Entities.TblOrgOffice>()
            .ForMember(dest => dest.TblOfficeSpocDetails, opt => opt.MapFrom(src => src.OfficeSpocDetails)).ReverseMap();


            CreateMap<OfficeSpocDetailsDTO, Entities.TblOfficeSpocDetails>();
            CreateMap<Entities.TblOfficeSpocDetails, OfficeSpocDetailsDTO>();

            CreateMap<PartnersDTO, TblPartners>()
            .ForMember(dest => dest.TblPartnerAddress, opt => opt.MapFrom(src => src.PartnerAddress)).ReverseMap();


            CreateMap<PartnerAddressDTO, TblPartnerAddress>();
            CreateMap<TblPartnerAddress, PartnerAddressDTO>();

            CreateMap<PRcommonTypesDTO, Entities.TblmasPrcommonTypes>();
            CreateMap<Entities.TblmasPrcommonTypes, PRcommonTypesDTO>();

            CreateMap<CountryDTO, Entities.TblMasCountry>();
            CreateMap<Entities.TblMasCountry, CountryDTO>();
            CreateMap<StateDTO, Entities.TblMasState>();
            CreateMap<Entities.TblMasState, StateDTO>();
            CreateMap<DistrictDTO, Entities.TblMasDistrict>();
            CreateMap<Entities.TblMasDistrict, DistrictDTO>();
            CreateMap<CityDTO, Entities.TblMasCity>();
            CreateMap<Entities.TblMasCity, CityDTO>();
            CreateMap<PinCodeDTO, Entities.TblMasPinCode>();
            CreateMap<Entities.TblMasPinCode, PinCodeDTO>();

            CreateMap<TblPolicyAgreement, PolicyAgreementDTO>();
            CreateMap<PolicyAgreementDTO, TblPolicyAgreement>();
            CreateMap<CdAccountsDTO, TblCdaccounts>()
            .ForMember(dest => dest.TblCdtransactions, opt => opt.MapFrom(src => src.Cdtransactions)).ReverseMap();


            CreateMap<CdTransactionsDTO, TblCdtransactions>();
            CreateMap<TblCdtransactions, CdTransactionsDTO>();

            ////AVO

            CreateMap<AVOOrganizationDTO, Entities.AVO.TblOrganization>()
            .ForMember(dest => dest.TblOrgAddress, opt => opt.MapFrom(src => src.AVOOrgAddress))
            .ForMember(dest => dest.TblOrgSpocDetails, opt => opt.MapFrom(src => src.AVOOrgSpocDetails))
            .ForMember(dest => dest.TblOrgOffice, opt => opt.MapFrom(src => src.AVOOrgOffice)).ReverseMap();
            //.ForMember(dest => dest.OrgStructure, opt => opt.MapFrom(src => src.OrgStructure))


            CreateMap<AVOOrgAddress, Entities.AVO.TblOrgAddress>();
            CreateMap<Entities.AVO.TblOrgAddress, AVOOrgAddress>();

            CreateMap<Entities.AVO.TblOrgOffice, AVOOrgOffice>();
            CreateMap<AVOOrgOffice, Entities.AVO.TblOrgOffice>();

            CreateMap<AVOOrgSpocDetails, Entities.AVO.TblOrgSpocDetails>();
            CreateMap<Entities.AVO.TblOrgSpocDetails, AVOOrgSpocDetails>();

            CreateMap<TblOrgStructure, AVOOrgStructure>();
            CreateMap<AVOOrgStructure, TblOrgStructure>();

            CreateMap<AVOOrgOffice, Entities.AVO.TblOrgOffice>()
            .ForMember(dest => dest.TblOfficeSpocDetails, opt => opt.MapFrom(src => src.AVOOfficeSpocDetails)).ReverseMap();
            //.ForMember(dest => dest.TblOrgOfficeMappingPrimaryOffice, opt => opt.MapFrom(src => src.AVOOrgOfficeMapping)).ReverseMap();

            CreateMap<OfficeSpocDetailsDTO, Entities.AVO.TblOfficeSpocDetails>();
            CreateMap<Entities.AVO.TblOfficeSpocDetails, OfficeSpocDetailsDTO>();

            CreateMap<AVOOrgOfficeMapping, TblOrgOfficeMapping>();
            CreateMap<TblOrgOfficeMapping, AVOOrgOfficeMapping>();


            //CreateMap<PartnersDTO, TblPartners>()
            //.ForMember(dest => dest.TblPartnerAddress, opt => opt.MapFrom(src => src.PartnerAddress)).ReverseMap();


            //CreateMap<PartnerAddressDTO, TblPartnerAddress>();
            //CreateMap<TblPartnerAddress, PartnerAddressDTO>();

            CreateMap<PRcommonTypesDTO, Entities.AVO.TblmasPrcommonTypes>();
            CreateMap<Entities.AVO.TblmasPrcommonTypes, PRcommonTypesDTO>();

            CreateMap<CountryDTO, Entities.AVO.TblMasCountry>();
            CreateMap<Entities.AVO.TblMasCountry, CountryDTO>();
            CreateMap<StateDTO, Entities.AVO.TblMasState>();
            CreateMap<Entities.AVO.TblMasState, StateDTO>();
            CreateMap<DistrictDTO, Entities.AVO.TblMasDistrict>();
            CreateMap<Entities.AVO.TblMasDistrict, DistrictDTO>();
            CreateMap<CityDTO, Entities.AVO.TblMasCity>();
            CreateMap<Entities.AVO.TblMasCity, CityDTO>();
            CreateMap<PinCodeDTO, Entities.AVO.TblMasPinCode>();
            CreateMap<Entities.AVO.TblMasPinCode, PinCodeDTO>();

        }

    }

}
