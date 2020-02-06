using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.Claims.Entities;
using iNube.Services.Claims.Models;
using static iNube.Services.Claims.Models.BankAccountsDTO;

namespace iNube.Services.Claims.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TblClaim, ClaimDTO>();
            CreateMap<ClaimDTO, TblClaim>();

            CreateMap<TblClaims, ClaimDataDTO>();
            CreateMap<ClaimDataDTO, TblClaims>();

            CreateMap<TblClaims, ClaimsDTO>();
            CreateMap<ClaimsDTO, TblClaims>();

            CreateMap<TblClaims, SearchDTO>();
            CreateMap<SearchDTO, TblClaims>();

            CreateMap<TblClaimHistory, SearchDTO>().ReverseMap();

            CreateMap<TblBankAccounts, SearchDTO>();
            CreateMap<SearchDTO, TblBankAccounts>();

            CreateMap<TblClaims, ClaimProcessDTO>();
            CreateMap<ClaimProcessDTO, TblClaims>();

            CreateMap<TblClaimInsurable, ClaimProcessDTO>();
            CreateMap<ClaimProcessDTO, TblClaimInsurable>();

            CreateMap<TblBankAccounts, BankAccountsDTO>();
            CreateMap<BankAccountsDTO, TblBankAccounts>();

            CreateMap<TblClaimHistory, ClaimsHistoryDTO>();
            CreateMap<ClaimsHistoryDTO, TblClaimHistory>();

            CreateMap<TblmasCmcommonTypes, masCmcommonTypesDTO>();
            CreateMap<masCmcommonTypesDTO, TblmasCmcommonTypes>();

            CreateMap<TblPayment, PaymentDTO>();
            CreateMap<PaymentDTO, TblPayment>();

            CreateMap<TblClaimInsurable, ClaimInsurableDTO>()
                .ForMember(dest => dest.CoverName, opt => opt.MapFrom(src => src.TypeOfLoss)).ReverseMap();

            // CreateMap<ClaimDTO, TblClaim>()
            //.ForMember(dest => dest.TblClaimDetails, opt => opt.MapFrom(src => src.ClaimDetails))
            //.ForMember(dest => dest.TblClaimTransaction, opt => opt.MapFrom(src => src.ClaimTransaction)).ReverseMap();

            CreateMap<ClaimDataDTO, TblClaims>()
            .ForMember(dest => dest.TblClaimInsurable, opt => opt.MapFrom(src => src.ClaimInsurable))
            .ForMember(dest => dest.TblBankAccounts, opt => opt.MapFrom(src => src.TblBankAccounts))
            //.ForMember(dest => dest.TblClaimdoc, opt => opt.MapFrom(src => src.TblClaimdoc))
            .ForMember(dest => dest.LossId, opt => opt.MapFrom(src => src.lossIntimatedBy))
            .ForMember(dest => dest.LocationOfEvent, opt => opt.MapFrom(src => src.locationOfLoss))
            .ForMember(dest => dest.LossOfDescription, opt => opt.MapFrom(src => src.lossDescription))
            .ForMember(dest => dest.PolicyNo, opt => opt.MapFrom(src => src.PolicyNumber))
           // .ForMember(dest => dest.TblClaimHistory, opt => opt.MapFrom(src => src.ClaimsHistory))
            .ReverseMap();


            CreateMap<ClaimProcessDTO, TblClaims>()
            .ForMember(dest => dest.TblClaimInsurable, opt => opt.MapFrom(src => src.ClaimInsurable))
            .ForMember(dest => dest.TblClaimHistory, opt => opt.MapFrom(src => src.ClaimHistory))
            .ReverseMap();

            CreateMap<TblClaimDetails, ClaimDetailsDTO>();
            CreateMap<ClaimDetailsDTO, TblClaimDetails>();

            CreateMap<TblClaimTransaction, ClaimTransactionDTO>();
            CreateMap<ClaimTransactionDTO, TblClaimTransaction>();

            CreateMap<TblBank, BankDTO>();
            CreateMap<BankDTO, TblBank>();

            CreateMap<TblClaimdoc, ClaimdocDTO>();
            CreateMap<ClaimdocDTO, TblClaimdoc>();

            //CreateMap<ClaimResponseDTO, TblClaims>();
            //CreateMap<TblClaims, ClaimResponseDTO>();

            //CreateMap<TblClaimdoc, ClaimdocumentDTO>();
            //CreateMap<ClaimdocumentDTO, TblClaimdoc>();

            CreateMap<TblClaimTransactionNew, ClaimTransactionnewDTO>();
            CreateMap<ClaimTransactionnewDTO, TblClaimTransactionNew>();

        }
    }
}
