using iNube.Services.ProductConfiguration.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.ProductConfiguration.Controllers.Product.AvoProductServices
{
    public interface IAvoProductConfigService
    {
        Task<List<MasterListItemDTO>> ListProducts(ApiContext apiContext);

        Task<List<ddDTOs>> GetProductMasterAvo(string masterType, int parentID, ApiContext apiContext);

        Task<MapQuoteDTO> CalculateQuotePremium(MapQuoteDTO objLifeQuote, ApiContext apiContext, bool AnnualMode = false);

        Task<MapQuoteDTO> GetRiderSumAssured(MapQuoteDTO objLifeQuote);

        Task<List<object>> GetRiders(int ProductId, int PlanId, ApiContext apiContext);

        Task<bool> CheckSpouse(int ProductID, int PlanID, ApiContext apiContext);
    }
}
