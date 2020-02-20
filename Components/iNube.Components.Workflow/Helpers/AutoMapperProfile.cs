using System;
using AutoMapper;
using AutoMapper.Mappers;

using iNube.Components.Workflow.Models;
using iNube.Components.Workflow.Entities;


namespace iNube.Components.Workflow.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TblWfprocess, WfProcessDto>();
            CreateMap<WfProcessDto, TblWfprocess>();

            CreateMap<TblWfstage, WfStageDto>();
            CreateMap<WfStageDto, TblWfstage>();

            CreateMap<TblWfstageflow, WfStageFlowDto>();
            CreateMap<WfStageFlowDto, TblWfstageflow>();

            CreateMap<TblWfstageStatus, WfStageStatusDto>();
            CreateMap<WfStageStatusDto, TblWfstageStatus>();

            CreateMap<TblWfstatusflow, WfStatusFlowDto>();
            CreateMap<WfStatusFlowDto, TblWfstatusflow>();

            CreateMap<TblWorkflow, WorkflowDto>();
            CreateMap<WorkflowDto, TblWorkflow>();

            CreateMap<TblWorkflowHistory, WfHistoryDto>();
            CreateMap<WfHistoryDto, TblWorkflowHistory>();


        }

    }
}
