using AutoMapper;
using iNube.Services.DynamicGraph.model;
using iNube.Services.DynamicReports.model;
using iNube.Services.Policy.Entities.DynamicGraphEntities;
using iNube.Services.Policy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Helpers.DynamicDBHelpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DashboardConfigDTO, TblDashboardConfig>().ReverseMap();
            CreateMap<DashboardConfigDTO, TblDashboardConfig>()
                .ForMember(dest => dest.TblDashboardConfigParam, opt => opt.MapFrom(src => src.TblDashboardConfigParam)).ReverseMap();
        }
    }
}
