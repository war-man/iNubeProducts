using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation.Results;
using iNube.Services.ProductConfiguration.Models;
using iNube.Utility.Framework.Model;

namespace iNube.Services.ProductConfiguration.Helpers
{
    /// <summary>
    /// ErrorMessageHelper
    /// </summary>
    public static class ErrorMessageHelper
    {
        /// <summary>
        /// Gets the Product response.
        /// </summary>
        /// <param name="validationResult">The validation result.</param>
        /// <returns></returns>
        public static ProductResponse GetProductResponse(ValidationResult validationResult)
        {
            var data = new ProductResponse
            {
                Status = BusinessStatus.InputValidationFailed
            };

            data.Errors.AddRange(GetValidationErrors(validationResult));
            return data;
        }

        /// <summary>
        /// Gets the validation errors.
        /// </summary>
        /// <param name="validationResult">The validation result.</param>
        /// <returns></returns>
        public static List<ErrorInfo> GetValidationErrors(ValidationResult validationResult)
        {
            return
                validationResult.Errors.Select(result => new ErrorInfo
                {
                    ErrorCode = result.ErrorCode,
                    ErrorMessage = result.ErrorMessage,
                    PropertyName = result.PropertyName
                }).ToList();

        }

        
    }
}
