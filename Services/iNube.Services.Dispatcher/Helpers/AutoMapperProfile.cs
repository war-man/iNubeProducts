﻿
using AutoMapper;
using iNube.Services.Dispatcher.Entities;
using iNube.Services.Dispatcher.Models;

namespace iNube.Services.Dispatcher.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TblMapper, MapperDTO>()
                .ForMember(dest => dest.MapperDetailsDTO, opt => opt.MapFrom(src => src.TblMapperDetails)).ReverseMap();

            CreateMap<TblMapperDetails, MapperDetailsDTO>().ReverseMap();

            

        }
    }
}
