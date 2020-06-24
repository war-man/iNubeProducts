using AutoMapper;
using AutoMapper.Mappers;
using iNube.Services.ReInsurance.Entities;
using iNube.Services.ReInsurance.Models;

namespace iNube.Services.ReInsurance.Helpers
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {

            CreateMap<TblParticipantMaster, TblParticipantMasterDto>();
            CreateMap<TblParticipantMasterDto, TblParticipantMaster>();

            CreateMap<TblParticipantMasterDto, TblParticipantMaster>()
                  .ForMember(dest => dest.TblParticipantBranch, opt => opt.MapFrom(src => src.TblParticipantBranch)).ReverseMap();


            CreateMap<TblParticipantBranch, TblParticipantBranchDto>();
            CreateMap<TblParticipantBranchDto, TblParticipantBranch>();

            CreateMap<TblRetentionGroup, TblRetentionGroupDto>();
            CreateMap<TblRetentionGroupDto, TblRetentionGroup>();

            CreateMap<TblTreaty, TblTreatyDto>();
            CreateMap<TblTreatyDto, TblTreaty>();

            //CreateMap<TblTreatyDto, TblTreaty>()
            //     .ForMember(dest => dest.TblTreatyGroup, opt => opt.MapFrom(src => src.TblTreatyGroup)).ReverseMap();

            //CreateMap<TblTreatyDto, TblTreaty>()
            //    .ForMember(dest => dest.TblParticipant, opt => opt.MapFrom(src => src.TblParticipant)).ReverseMap();

            CreateMap<TblTreatyGroup, TblTreatyGroupDto>();
            CreateMap<TblTreatyGroupDto, TblTreatyGroup>();

            CreateMap<TblArrangement, TblArrangementDto>();
            CreateMap<TblArrangementDto, TblArrangement>();

            //CreateMap<TblTreatyGroupDto, TblTreatyGroup>()
            //    .ForMember(dest => dest.TblArrangement, opt => opt.MapFrom(src => src.TblArrangement)).ReverseMap();





            CreateMap<TblRimapping, TblRimappingDto>();
            CreateMap<TblRimappingDto, TblRimapping>();

            CreateMap<TblRimappingDetail, TblRimappingDetailDto>();
            CreateMap<TblRimappingDetailDto, TblRimappingDetail>();
            //CreateMap<TblRimappingDetailDto, TblRimappingDetail>()
            //       .ForMember(dest => dest.RimappingTypeId, opt => opt.MapFrom(src => src.RimappingTypeId))
            //.ReverseMap();

          
            //CreateMap<TblRimappingDto, TblRimapping>()
            // .ForMember(dest => dest.TblRimappingDetail, opt => opt.MapFrom(src => src.TblRimappingDetail))
            //.ReverseMap();
           





            CreateMap<TblParticipant, TblParticipantDto>();
            CreateMap<TblParticipantDto, TblParticipant>();



            CreateMap<RiallocationDto, TblRiallocation>().ReverseMap();
            CreateMap<TblRiallocation, RiallocationDto>().ReverseMap();

            CreateMap<RiallocationDto, TblRiallocation>()
                   .ForMember(dest => dest.TblRiallocationHistory, opt => opt.MapFrom(src => src.RiallocationHistory)).ReverseMap();

            CreateMap<RiallocationHistoryDto, TblRiallocationHistory>();
            CreateMap<TblRiallocationHistory, RiallocationHistoryDto>();
            //CreateMap<TblAccountType, AccountTypeDto>();
            //CreateMap<AccountTypeDto, TblAccountType>();

            //CreateMap<TblAccountType, AccountTypeDto>();
            //CreateMap<AccountTypeDto, TblAccountType>();

            //CreateMap<TblAccountType, AccountTypeDto>();
            //CreateMap<AccountTypeDto, TblAccountType>();

            //CreateMap<TblAccountType, AccountTypeDto>();
            //CreateMap<AccountTypeDto, TblAccountType>();

            //CreateMap<TblTransactionRuleMapping, TransactionRuleMappingDto>()
            //    .ForMember(dest => dest.TransactionConditions, opt => opt.MapFrom(src => src.TblTransactionConditions))
            //    .ForMember(dest => dest.SubLedgerReferences, opt => opt.MapFrom(src => src.TblSubLedgerReferences)).ReverseMap();

        }
    }
}
