using AutoMapper;
using iNube.Services.DynamicReports.model;
using iNube.Services.Policy.Entities.DynamicReportEntities;
using iNube.Services.Policy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Helpers.DynamicReportHelpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ReportConfigDTO, TblReportConfig>().ReverseMap();
            CreateMap<ReportConfigDTO, TblReportConfig>()
                .ForMember(dest => dest.TblReportConfigParam, opt => opt.MapFrom(src => src.TblReportConfigParam)).ReverseMap();

        }
    }
}
