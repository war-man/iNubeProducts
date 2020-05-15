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
        Task<AVOOrgOffice> GetOffice(string OfficeCode, ApiContext apiContext);
       // Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext);
        Task<IEnumerable<AVOOrgOffice>> SearchOfficeData(string OfficeCode, ApiContext apiContext);
        Task<List<MasterDto>> GetAllOfficeData( ApiContext apiContext);
        int TestMethod();
    }
}
