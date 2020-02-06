using AutoMapper;
using iNube.Services.Billing.Entities;
using iNube.Services.Billing.Models;

namespace iNube.Services.Billing.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ddDTO, TblmasBicommonTypes>().ReverseMap();
           // CreateMap<TblmasBicommonTypes, ddDTO>();
            CreateMap<TblBillingItem, BillingItemDTO>().ReverseMap();
            CreateMap<BillingConfigDTO, TblBillingConfig>().ReverseMap(); 
            CreateMap<BillingItemDetailDTO, TblBillingItemDetail>().ReverseMap();
            
            CreateMap<TblContractDoc, ContractDocDTO>().ReverseMap();
            CreateMap<TblInvoice, TblInvoicePenalty>().ReverseMap();
            CreateMap<TblBillingItem, HistoryDTO>().ReverseMap();
            // CreateMap<CustAddressDTO, CustomersDTO>();
            //CreateMap<CustomersDTO, CustAddressDTO>();
            
            CreateMap<CustomersDTO, TblCustomers>()
            .ForMember(dest => dest.TblCustAddress, opt => opt.MapFrom(src => src.CustAddress))
            .ForMember(dest => dest.TblCustSpocDetails, opt => opt.MapFrom(src => src.CustSpocDetails))
            .ForMember(dest => dest.TblContract, opt => opt.MapFrom(src => src.Contract)).ReverseMap();
               
            //CreateMap<TblCustomers, CustomersDTO>();
            CreateMap<TblCustAddress, CustAddressDTO>();
            CreateMap<CustAddressDTO, TblCustAddress>();
            CreateMap<CustSpocDetailsDTO, TblCustSpocDetails>();
            CreateMap<TblCustSpocDetails, CustSpocDetailsDTO>();
            CreateMap<ContractDTO, TblContract>().ReverseMap();
                //.ForMember(dest => dest.TblBillingConfig, opt => opt.MapFrom(src => src.BillingConfig))
                //.ForMember(dest => dest.TblInvoiceConfig, opt => opt.MapFrom(src => src.InvoiceConfig)).ReverseMap();


            CreateMap<CustomersDTO, OrganizationDTO>()
                .ForMember(dest => dest.OrgCategoryId, opt => opt.MapFrom(src => src.CategoryId))
                .ForMember(dest => dest.OrgTypeId, opt => opt.MapFrom(src => src.TypeId))
                // .ForMember(dest => dest.ConfigurationTypeId, opt => opt.MapFrom(src => src.ConfigurationTypeId))
                // .ForMember(dest => dest.CorpAddressSameAs, opt => opt.MapFrom(src => src.CorpAddressSameAs))
                // .ForMember(dest => dest.MailingAddressSameAs, opt => opt.MapFrom(src => src.MailingAddressSameAs))
                .ForMember(dest => dest.OrgLogo, opt => opt.MapFrom(src => src.Logo))
                .ForMember(dest => dest.OrgWebsite, opt => opt.MapFrom(src => src.Website))
                .ForMember(dest => dest.OrgPhoneNo, opt => opt.MapFrom(src => src.PhoneNo))
                .ForMember(dest => dest.OrgFaxNo, opt => opt.MapFrom(src => src.FaxNo))
                .ForMember(dest => dest.OrgLevels, opt => opt.MapFrom(src => src.Levels))
                .ForMember(dest => dest.OrgRegistrationNo, opt => opt.MapFrom(src => src.RegistrationNo))
                .ForMember(dest => dest.OrgRegistrationDate, opt => opt.MapFrom(src => src.RegistrationDate))
                .ForMember(dest => dest.OrgRegisteringAuthority, opt => opt.MapFrom(src => src.RegisteringAuthority))
                .ForMember(dest => dest.OrgServiceTaxRegistrationNumber, opt => opt.MapFrom(src => src.ServiceTaxRegistrationNumber))
                .ForMember(dest => dest.OrgPanno, opt => opt.MapFrom(src => src.Panno))
                .ForMember(dest => dest.OrgTanno, opt => opt.MapFrom(src => src.Tanno))
                .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
                .ForMember(dest => dest.OrgAddress, opt => opt.MapFrom(src => src.CustAddress))
                //.ForMember(dest => dest.OrgAddressType, opt => opt.MapFrom(src => src.CustAddress))
                .ForMember(dest => dest.OrgSpocDetails, opt => opt.MapFrom(src => src.CustSpocDetails)).ReverseMap();


            CreateMap<CustAddressDTO, OrgAddressDTO>()
                .ForMember(dest => dest.OrgAddressType, opt => opt.MapFrom(src => src.AddressType))
                .ForMember(dest => dest.OrgCountryId, opt => opt.MapFrom(src => src.CountryId))
                .ForMember(dest => dest.OrgStateId, opt => opt.MapFrom(src => src.StateId))
                .ForMember(dest => dest.OrgDistrictId, opt => opt.MapFrom(src => src.DistrictId))
                .ForMember(dest => dest.OrgCityId, opt => opt.MapFrom(src => src.CityId))
                .ForMember(dest => dest.OrgAddressLine1, opt => opt.MapFrom(src => src.AddressLine1))
                .ForMember(dest => dest.OrgAddressLine2, opt => opt.MapFrom(src => src.AddressLine2))
                .ForMember(dest => dest.OrgAddressLine3, opt => opt.MapFrom(src => src.AddressLine3))
                .ForMember(dest => dest.OrgPincodeId, opt => opt.MapFrom(src => src.PincodeId)).ReverseMap();
            //CreateMap<OrgAddressDTO, CustAddressDTO>();
            CreateMap<CustSpocDetailsDTO, OrgSpocDetailsDTO>()
                .ForMember(dest => dest.SpocfirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.Spocmobileno, opt => opt.MapFrom(src => src.Mobileno))
                .ForMember(dest => dest.SpocemailId, opt => opt.MapFrom(src => src.EmailId))
                .ForMember(dest => dest.Spocdesignation, opt => opt.MapFrom(src => src.Designation))
                .ForMember(dest => dest.SpoccountryId, opt => opt.MapFrom(src => src.CountryId))
                .ForMember(dest => dest.SpocstateId, opt => opt.MapFrom(src => src.StateId))
                .ForMember(dest => dest.SpocdistrictId, opt => opt.MapFrom(src => src.DistrictId))
                .ForMember(dest => dest.SpoccityId, opt => opt.MapFrom(src => src.CityId))
                .ForMember(dest => dest.SpocaddressLine1, opt => opt.MapFrom(src => src.AddressLine1))
                .ForMember(dest => dest.SpocaddressLine2, opt => opt.MapFrom(src => src.AddressLine2))
                .ForMember(dest => dest.SpocaddressLine3, opt => opt.MapFrom(src => src.AddressLine3))
                .ForMember(dest => dest.SpocpincodeId, opt => opt.MapFrom(src => src.PincodeId))
                .ForMember(dest => dest.SpocMiddleName, opt => opt.MapFrom(src => src.MiddleName))
                .ForMember(dest => dest.SpocLastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Spocdob, opt => opt.MapFrom(src => src.Dob))
                .ForMember(dest => dest.Spocdoj, opt => opt.MapFrom(src => src.Doj))
                .ForMember(dest => dest.SpocpanNo, opt => opt.MapFrom(src => src.PanNo))
                .ForMember(dest => dest.SpocUserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.SpocMaritalStatusId, opt => opt.MapFrom(src => src.MaritalStatusId))
                .ForMember(dest => dest.SpocGenderId, opt => opt.MapFrom(src => src.GenderId)).ReverseMap();


            CreateMap<TblPayment, PaymentDTO>().ReverseMap();
            CreateMap<TblCustomerConfig, CustomerConfigDTO>().ReverseMap();



            CreateMap<TblInvoicePenalty, InvoicePenaltyDTO>().ReverseMap();

            CreateMap<InvoiceRequest, TblInvoiceConfig>();
            CreateMap<TblInvoiceConfig, InvoiceRequest>();
            //CreateMap<TblContract, ContractDTO>().ReverseMap();
            CreateMap<TblContractDoc, ContractDocDTO>().ReverseMap();
            //CreateMap<TblInvoice, InvoiceDTO>();
            //CreateMap<InvoiceDTO, TblInvoice>();
            CreateMap<InvoiceDTO, TblInvoice>()
                .ForMember(dest => dest.TblInvoiceDetail, opt => opt.MapFrom(src => src.InvoiceDetails)).ReverseMap();
            CreateMap<InvoiceDetailDTO, TblInvoiceDetail>();
            CreateMap<TblInvoiceDetail, InvoiceDetailDTO>();
            CreateMap<TblInvoiceDetail, TblInvoice>();
            CreateMap<TblInvoice, TblInvoiceDetail>();
            CreateMap<TblNumberingScheme, NumberingSchemeDTO>();
            CreateMap<NumberingSchemeDTO, TblNumberingScheme>();
            CreateMap<TblInvoiceConfig, InvoiceConfigDTO>().ReverseMap();
         
        }
    }
}
