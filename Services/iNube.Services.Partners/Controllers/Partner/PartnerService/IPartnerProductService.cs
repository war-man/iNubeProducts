using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Partner.PartnerService
{
    public interface IPartnerProductService
    {
        Task<PartnerResponse> CreatePartnerAsync(PartnersDTO partnerDTO, ApiContext apiContext);
        Task<PartnersDTO> GetPartner(int partnerID, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetMasterAsync(ApiContext apiContext, string sMasterList, string partnerId = "");
        Task<IEnumerable<PolicyAgreementDTO>> GetAssignProduct(decimal partnerId,ApiContext apiContext);
        Task<PolicyAgreementResponse> SaveAssignProduct(AssignProductDTO assignProductDto, ApiContext apiContext);
        Task<IEnumerable<PartnersDTO>> GetSearchPartner(PartnerSearchDTO partnerSearchDTO, ApiContext apiContext);
        Task<PolicyAgreementDTO> GetSearchProductDetails(SearchProductModel productdetails, ApiContext apiContext);
        Task<PolicyAgreementDTO> DeletePartnerById(decimal partnerId, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetAssignProductbyId(AssignedProducts assignedProducts, ApiContext apiContext);
        Task<IEnumerable<PartnerProductDTO>> GetPartnerbyProductid(int id, ApiContext apiContext);
        Task<ProductApiModel> GetPartnerApiKitAsync(decimal productId, ApiContext apiContext);
        Task<PartnerUploadlogoResponse> UploadLogo(LogoDTO logo, ApiContext apiContext);
        Task<PartnerResponse> PartnerCodeValidations(string partnercode, ApiContext apiContext);
        void DeletePartner(decimal PartnerId, ApiContext apiContext);
    }
}
