using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;

namespace iNube.Services.Partners.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<OrganizationDTO, TblOrganization>()
            .ForMember(dest => dest.TblOrgAddress, opt => opt.MapFrom(src => src.OrgAddress))
            .ForMember(dest => dest.TblOrgSpocDetails, opt => opt.MapFrom( src => src.OrgSpocDetails)).ReverseMap();


            CreateMap<OrgAddressDTO, TblOrgAddress>();
            CreateMap<TblOrgAddress, OrgAddressDTO>();
            CreateMap<OrgSpocDetailsDTO, TblOrgSpocDetails>();
            CreateMap<TblOrgSpocDetails, OrgSpocDetailsDTO>();

            CreateMap<OrgOfficeDTO, TblOrgOffice>()
            .ForMember(dest => dest.TblOfficeSpocDetails, opt => opt.MapFrom(src => src.OfficeSpocDetails)).ReverseMap();
            

            CreateMap<OfficeSpocDetailsDTO, TblOfficeSpocDetails>();
            CreateMap<TblOfficeSpocDetails, OfficeSpocDetailsDTO>();

            CreateMap<PartnersDTO, TblPartners>()
            .ForMember(dest => dest.TblPartnerAddress, opt => opt.MapFrom(src => src.PartnerAddress)).ReverseMap();

            
            CreateMap<PartnerAddressDTO, TblPartnerAddress>();
            CreateMap<TblPartnerAddress, PartnerAddressDTO>();

            CreateMap<PRcommonTypesDTO, TblmasPrcommonTypes>();
            CreateMap<TblmasPrcommonTypes, PRcommonTypesDTO>();

            CreateMap<CountryDTO, TblMasCountry>();
            CreateMap<TblMasCountry, CountryDTO>();
            CreateMap<StateDTO, TblMasState>();
            CreateMap<TblMasState, StateDTO>();
            CreateMap<DistrictDTO, TblMasDistrict>();
            CreateMap<TblMasDistrict, DistrictDTO>();
            CreateMap<CityDTO, TblMasCity>();
            CreateMap<TblMasCity, CityDTO>();
            CreateMap<PinCodeDTO, TblMasPinCode>();
            CreateMap<TblMasPinCode, PinCodeDTO>();

            CreateMap<TblPolicyAgreement, PolicyAgreementDTO>();
            CreateMap<PolicyAgreementDTO, TblPolicyAgreement>();
            CreateMap<CdAccountsDTO, TblCdaccounts>()
            .ForMember(dest => dest.TblCdtransactions, opt => opt.MapFrom(src => src.Cdtransactions)).ReverseMap();


            CreateMap<CdTransactionsDTO, TblCdtransactions>();
            CreateMap<TblCdtransactions, CdTransactionsDTO>();
        }

    }

}
