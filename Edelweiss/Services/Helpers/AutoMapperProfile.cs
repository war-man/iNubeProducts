using AutoMapper;
using AutoMapper.Mappers;
using iNube.Services.MicaExtension_EGI.Models;
using MicaExtension_EGI.Entities;


namespace iNube.Services.MicaExtension_EGI.Helpers
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {

            CreateMap<TblQuotation, QuotationDTO>().ReverseMap();
            CreateMap<TblSchedule, ScheduleDTO>().ReverseMap();

            CreateMap<TblSendOtp, SendOtp>().ReverseMap();

        }
    }
}
