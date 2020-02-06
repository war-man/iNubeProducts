using FluentValidation;
using iNube.Services.ProductConfiguration.Models;
using iNube.Utility.Framework.Helpers.Business.Validations;

namespace iNube.Services.ProductConfiguration.Validations
{
    public class CreateProductRequestValidator : BaseValidator<ProductDTO>
    {
        /// <summary>
        /// Derived method from virtual method base for Rules implementation
        /// </summary>
        protected override void RuleFor()
        {

            RuleFor(request => request.ProductName)
               .NotNull()
               .WithMessage("Product Name is required")
               .WithErrorCode("ProductName_required");

            //RuleFor(request => request.ProductCovers)
            //  .NotNull()
            //  .WithMessage("Product cover data is required")
            //  .WithErrorCode("ProductCover_required");

            RuleForEach(product => product.ProductChannels)
                .Must(x => x.ChannelTypeId != null)
                .WithMessage("ChannelTypeId data is required")
              .WithErrorCode("ChannelTypeId_required");
                 //RuleForEach(product => product.ProductCovers).SetValidator( new CoverValidator());
                 //RuleForEach(product => product.ProductBenefits).SetValidator(new BenefitValidator());
           // RuleForEach(product => product.TblProductClausesWarrentiesExclusions).SetValidator(new CWEValidator());
           // RuleForEach(product => product.TblProductChannels).SetValidator(new ChannelsValidator());
            //RuleForEach(product => product.TblProductChannels).SetValidator(new RisksValidator());

            //When(request => request.TblProductCovers.Any(), () =>
            //{
            //    RuleFor(product => product.TblProductCovers).SetCollectionValidator(new CoverValidator());
            //});
            RuleFor(p => p.ProductCode)
                .Length(1, 25)
                .WithMessage("Product Code Length should be between 1-25")
                .WithErrorCode("ProducCodeLength");
            RuleFor(p => p.ActiveFrom)
               .NotEmpty()
               .WithMessage("Product Active from is required")
               .WithErrorCode("ProductactiveFromDate_required ");

            RuleFor(p => p.ActiveTo)
               .NotEmpty()
               .WithMessage("Product Active To is required")
               .WithErrorCode("ProductactiveToDate_required ");

            RuleFor(p => p.Lobid)
               .NotEmpty()
               .WithMessage("Line Of Business is required")
               .WithErrorCode("Product_lineofBusiness is required");

            RuleFor(p => p.Cobid)
               .NotEmpty()
               .WithMessage("Class Of Business is required")
               .WithErrorCode("Product_classofBusiness is required");

            RuleFor(p => p.ProductStatusId)
               .NotEmpty()
               .WithMessage("Product Status is required")
               .WithErrorCode("Product_classofBusiness is required");

            //RuleFor(p => p.PremiumAmount)
            //   .NotEmpty()
            //   .WithMessage("Product Premium Amount is required")
            //   .WithErrorCode("Product_PremiumAmount is required");

        }
    }

    public class ChannelsValidator : BaseValidator<ProductChannelsDTO>
    {
        protected override void RuleFor()
        {
            RuleFor(p => p.EffectiveFrom)
               .NotEmpty()
               .WithMessage("Product Channel Effective From Date is required")
               .WithErrorCode("ProductChannelEffectiveFromDate is required");

            RuleFor(p => p.EffectiveTo)
               .NotEmpty()
               .WithMessage("Product Channel Effective To Date is required")
               .WithErrorCode("ProductChannelEffectiveToDate is required");

            RuleFor(p => p.Brokage)
               .NotEmpty()
               .WithMessage("Product Channel Brokerage is required")
               .WithErrorCode("ProductChannelBrokerage is required");
        }
    }

    public class CWEValidator : BaseValidator<ProductClausesWarrentiesExclusionsDTO>
    {
        protected override void RuleFor()
        {
            RuleFor(p => p.Cweid)
               .NotEmpty()
               .WithMessage("Product Clauses or Warranties or Exclusions is required")
               .WithErrorCode("ProductClausesWarrentiesExclusions is required");

            RuleFor(p => p.CwetypeId)
               .NotEmpty()
               .WithMessage("Product CWE Type is required")
               .WithErrorCode("ProductCWEType is required");

            RuleFor(p => p.Description)
               .NotEmpty()
               .WithMessage("Product CWE Description is required")
               .WithErrorCode("ProductCWEDescription is required");

            RuleFor(p => p.TypeName)
               .NotEmpty()
               .WithMessage("Product CWE TypeName is required")
               .WithErrorCode("ProductCWETypeName is required");

        }
    }

    public class BenefitValidator : BaseValidator<ProductBenefitsDTO>
    {
        protected override void RuleFor()
        {

  

            ////RuleFor(p => p.BenefitAmount)
            ////   .NotEmpty()
            ////   .WithMessage("Product Benefit Amount is required")
            ////   .WithErrorCode("Product_BenefitAmount is required");

       

           // RuleFor(m => m.BenefitCriteriaValue).NotEmpty().When(m => string.IsNullOrEmpty(m.MaxBenefitAmount.ToString()));
            //RuleFor(m => m.MaxBenefitAmount).NotEmpty().When(m => string.IsNullOrEmpty(m.BenefitCriteriaValue.ToString()));


        }
    }

        public class CoverValidator : BaseValidator<ProductCoversDTO>
    {
        /// <summary>
        /// Derived method from virtual method base for Rules implementation
        /// </summary>
        protected override void RuleFor()
        {

            //RuleFor(request => request.CoverTypeId)
            //   .NotNull()
            //   .WithMessage("CoverTypeId is required")
            //   .WithErrorCode("CoverTypeId_required");

            //RuleFor(request => request.CoverDescription)
            // .NotNull()
            // .WithMessage("CoverDescription is required")
            // .WithErrorCode("CoverDescription_required");

            //RuleFor(request => request.CoverEventFactorId)
            //    .NotNull()
            //    .WithMessage("Cover Event Factor is required")
            //    .WithErrorCode("CoverEventFactorId_required");

            //RuleFor(request => request.CoverEventFactorValueUnitId)
            //    .NotNull()
            //    .WithMessage("Cover Event Factor Value Unit is required")
            //    .WithErrorCode("CoverEventFactorValueUnitID_required");

            //RuleFor(request => request.CoverEventFactorValueFrom)
            //    .NotNull()
            //    .WithMessage("Cover Event Factor Value From Date is required")
            //    .WithErrorCode("CoverEventFactorValueFromDate_required");

            //RuleFor(request => request.CoverEventFactorValueTo)
            //    .NotNull()
            //    .WithMessage("Cover Event Factor Value To Date is required")
            //    .WithErrorCode("CoverEventFactorValueToDate_required");

            //RuleFor(request => request.SingleValue)
            //    .NotNull()
            //    .WithMessage("Single Value is required")
            //    .WithErrorCode("SingleValue_required");

        }
    }
}
