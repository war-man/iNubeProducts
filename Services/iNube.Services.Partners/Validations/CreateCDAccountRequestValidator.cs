using FluentValidation;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Helpers.Business.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Validations
{
    public class CreateCDAccountRequestValidator : BaseValidator<CdAccountsDTO>
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

            RuleFor(request => request.DropLimit)
              .NotEmpty()
              .WithMessage("Drop limit value is required")
              .WithErrorCode("DropLimit_required");
            RuleFor(request => request.ThresholdValue)
              .NotEmpty()
              .WithMessage("Threshold value is required")
              .WithErrorCode("ThresholdValue_required");
            RuleFor(request => request.PartnerId)
             .NotEmpty()
             .WithMessage("PartnerId value is required")
             .WithErrorCode("PartnerId_required");

            RuleFor(request => request.ProductId)
            .NotEmpty()
            .WithMessage("ProductId value is required")
            .WithErrorCode("ProductId_required");
        }
    }
}
