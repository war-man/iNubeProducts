using AutoMapper;
using iNube.Services.Lead.Models;
using iNube.Services.Lead.Entities;


namespace iNube.Services.Lead.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<ddDTO, TblmasLdcommonTypes>();
            CreateMap<TblmasLdcommonTypes, ddDTO>();
            CreateMap<LeadDTO, TblContacts>();
            CreateMap<TblContacts, LeadDTO>();
            CreateMap<TblAddress, AddressDTO>();
            CreateMap<AddressDTO, TblAddress>();
            CreateMap<TblContacts, ProspectPoolDTO>();
            CreateMap<ProspectPoolDTO, TblContacts>();

        }

    }

}
