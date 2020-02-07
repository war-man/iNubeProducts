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

            CreateMap<TblParticipantBranch, TblParticipantBranchDto>();
            CreateMap<TblParticipantBranchDto, TblParticipantBranch>();

            CreateMap<TblRetentionGroup, TblRetentionGroupDto>();
            CreateMap<TblRetentionGroupDto, TblRetentionGroup>();
            CreateMap<TblTreaty, TblTreatyDto>();
            CreateMap<TblTreatyDto, TblTreaty>();

            CreateMap<TblRimappingDetail, TblRimappingDetailDto>();
            CreateMap<TblRimappingDetailDto, TblRimappingDetail>();
            //CreateMap<TblRimappingDetailDto, TblRimappingDetail>()
            //       .ForMember(dest => dest.RimappingTypeId, opt => opt.MapFrom(src => src.RimappingTypeId))
            //.ReverseMap();

            CreateMap<TblRimapping, TblRimappingDto>();
            CreateMap<TblRimappingDto, TblRimapping>();
            //CreateMap<TblRimappingDto, TblRimapping>()
            // .ForMember(dest => dest.TblRimappingDetail, opt => opt.MapFrom(src => src.TblRimappingDetail))
            //.ReverseMap();
           





            CreateMap<TblParticipant, TblParticipantDto>();
            CreateMap<TblParticipantDto, TblParticipant>();

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
