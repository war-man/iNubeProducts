using FluentValidation;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Helpers.Business.Validations;

namespace iNube.Services.Partners.Validations
{
    public class CreatePartnerRequestValidator : BaseValidator<PartnersDTO>
    {
        /// <summary>
        /// Derived method from virtual method base for Rules implementation
        /// </summary>
        protected override void RuleFor()
        {
            //RuleFor(request => request.AccountNo)
            //   .NotEmpty()
            //   .WithMessage("Account Number is required")
            //   .WithErrorCode("AccountNumber_required");

            RuleFor(request => request.PartnerTypeId)
              .NotEmpty()
              .WithMessage("Partner type is required")
              .WithErrorCode("Partner type_required");
            RuleFor(request => request.PartnerClassId)
              .NotEmpty()
              .WithMessage("PartnerClassId value is required")
              .WithErrorCode("PartnerClassId_required");
            RuleFor(request => request.SalutationId)
             .NotEmpty()
             .WithMessage("SalutationId value is required")
             .WithErrorCode("SalutationId_required");

            RuleFor(request => request.PartnerName)
            .NotEmpty()
            .WithMessage("PartnerName value is required")
            .WithErrorCode("PartnerName_required");


            RuleFor(request => request.Mobile)
            .NotEmpty()
            .WithMessage("Mobile number value is required")
            .WithErrorCode("Mobilenumber_required");

            RuleFor(request => request.Email)
            .NotEmpty()
            .WithMessage("Email value is required")
            .WithErrorCode("Email_required");

            RuleFor(request => request.Pan)
            .NotEmpty()
            .WithMessage("Pan value is required")
            .WithErrorCode("Pan_required");

            RuleFor(request => request.Website)
           .NotEmpty()
           .WithMessage("Website value is required")
           .WithErrorCode("Website_required");

            RuleForEach(user => user.PartnerAddress).SetValidator(new PartnerAddressValidator());
        }
    }
    public class PartnerAddressValidator : BaseValidator<PartnerAddressDTO>
    {
        protected override void RuleFor()
        {
            RuleFor(request => request.PartnerAddressLine1)
               .NotEmpty()
               .WithMessage("AddressLine1 is required")
               .WithErrorCode("AddressLine1_required");

            RuleFor(request => request.PartnerCountryId)
               .NotEmpty()
               .WithMessage("Country is required")
               .WithErrorCode("Country_required");

            RuleFor(request => request.PartnerStateId)
               .NotEmpty()
               .WithMessage("State is required")
               .WithErrorCode("State_required");

            RuleFor(request => request.PartnerDistrictId)
               .NotEmpty()
               .WithMessage("District is required")
               .WithErrorCode("District_required");

            RuleFor(request => request.PartnerCityId)
               .NotEmpty()
               .WithMessage("City is required")
               .WithErrorCode("City_required");
        }
    }
}

