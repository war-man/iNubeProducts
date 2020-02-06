using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Office.OfficeService
{
    public interface IOfficeProductService
    {

        Task<OfficeResponse> CreateOffice(OrgOfficeDTO officeDTO,ApiContext apiContext);
        Task<OrgOfficeDTO> GetOffice(int officeID, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext);
        Task<IEnumerable<OrgOfficeDTO>> SearchOfficeData(int officeID, ApiContext apiContext);

        int TestMethod();
    }
}
