using FluentValidation;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Helpers.Business.Validations;

namespace iNube.Services.Partners.Validations
{
    public class PolicyBookingRequestValidator : BaseValidator<PolicyBookingTransaction>
    {
        /// <summary>
        /// Derived method from virtual method base for Rules implementation
        /// </summary>
        protected override void RuleFor()
        {
            RuleFor(request => request.AccountNo)
               .NotEmpty()
               .WithMessage("Account Number is required")
               .WithErrorCode("AccountNumber_required");

            RuleFor(request => request.PolicyNo)
              .NotEmpty()
              .WithMessage("Policy Number is required")
              .WithErrorCode("PolicyNumber_required");
        }
    }
}
