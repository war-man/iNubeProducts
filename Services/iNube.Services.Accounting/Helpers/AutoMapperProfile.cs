using AutoMapper;
using AutoMapper.Mappers;
using iNube.Services.Accounting.Entities;
using iNube.Services.Accounting.Models;

namespace iNube.Services.Accounting.Helpers
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {

            CreateMap<TblAccountType, AccountTypeDto>();
            CreateMap<AccountTypeDto, TblAccountType>();


            CreateMap<TblCoaaccounts, CoaaccountsDto>();
            CreateMap<CoaaccountsDto, TblCoaaccounts>();

            CreateMap<TblCoaaccountMapping, CoaaccountMappingDto>();
            CreateMap<CoaaccountMappingDto, TblCoaaccountMapping>();


            CreateMap<TblTransaction, TransactionDto>();
            CreateMap<TransactionDto, TblTransaction>();

            CreateMap<TblTransactionRuleMapping, TransactionRuleMappingDto>()
                .ForMember(dest => dest.TransactionConditions, opt => opt.MapFrom(src => src.TblTransactionConditions))
                .ForMember(dest => dest.SubLedgerReferences, opt => opt.MapFrom(src => src.TblSubLedgerReferences)).ReverseMap();

            CreateMap<TblTransactionConditions, TransactionConditionsDto>();
            CreateMap<TransactionConditionsDto, TblTransactionConditions>();

            CreateMap<TblSubLedgerReferences, SubLedgerReferencesDto>();
            CreateMap<SubLedgerReferencesDto, TblSubLedgerReferences>();

            CreateMap<TblTransactionSubLedger, TransactionSubLedgerDto>();
            CreateMap<TransactionSubLedgerDto, TblTransactionSubLedger>();

            CreateMap<TblTransactionHeader, TransactionHeaderDto>()
                .ForMember(dest => dest.Transaction, opt => opt.MapFrom(src => src.TblTransaction))
                .ForMember(dest => dest.TransactionSubLedger, opt => opt.MapFrom(src => src.TblTransactionSubLedger)).ReverseMap();
        }
    }
}
