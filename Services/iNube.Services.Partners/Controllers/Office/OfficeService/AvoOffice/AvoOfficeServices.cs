using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
//using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Entities.AVO;
using iNube.Services.Partners.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iNube.Services.Partners.Controllers.Partner.PartnerService;
using iNube.Utility.Framework.Model;
using iNube.Services.UserManagement.Helpers;
using Microsoft.Extensions.Configuration;

namespace iNube.Services.Partners.Controllers.Office.OfficeService
{

    public class AvoOfficeService : IOfficeProductService
    {
        private AVOPRContext _context;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;


        public AvoOfficeService(AVOPRContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;

        }

        public async Task<OfficeResponse> CreateOffice(OrgOfficeDTO officeDTO,ApiContext apiContext)
        {

            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var office = _mapper.Map<TblOrgOffice>(officeDTO);
            //_context.Entry(office).State=(office.OrgOfficeId == 0)?EntityState.Added : EntityState.Modified;
            if (office.OrgOfficeId == 0)
            {
                _context.TblOrgOffice.Add(office);
            }
            else
            {
                //_context.Entry(office).State = EntityState.Modified;
                _context.Update(office);
            }
            _context.SaveChanges();
            var pDTO = _mapper.Map<OrgOfficeDTO>(office);
             return new OfficeResponse { Status =BusinessStatus.Ok,   ResponseMessage = $" Office ID {office.OrgOfficeId} successfully {(officeDTO.OrgOfficeId == 0 ? "created " : "modified")}  for {officeDTO.OfficeName}!" };
          }

        public async Task<AVOOrgOffice> GetOffice(string OfficeCode, ApiContext apiContext)
        {
            

            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {
                AVOOrgOffice _organizationDTO = new AVOOrgOffice();
            TblOrgOffice _tblOrgOffice = _context.TblOrgOffice.Where(org => org.OfficeCode == OfficeCode)
                                    .Include(add => add.TblOfficeSpocDetails)
                                    .FirstOrDefault();
                AVOOrgOffice _officeDTO = _mapper.Map<AVOOrgOffice>(_tblOrgOffice);
            return _officeDTO;
        }
            catch (Exception ex)
            {
                return null;
            }

}
        public async Task<IEnumerable<AVOOrgOffice>> SearchOfficeData(string OfficeCode, ApiContext apiContext)
        {
            try
            {

                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // OrgOfficeDTO _organizationDTO = new OrgOfficeDTO();
            var _tblOrgOffice = _context.TblOrgOffice.Where(org => org.OfficeCode == OfficeCode)
                                    .Include(add => add.TblOfficeSpocDetails)
                                    .ToList();
            var _officeDTO = _mapper.Map<IEnumerable<AVOOrgOffice>>(_tblOrgOffice);
            return _officeDTO;
}
            catch (Exception ex)
            {
                return null;
            }

        }
        public async Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<ddDTO> officeDTOs;

            officeDTOs = _context.TblOrgOffice
             .Select(c => new ddDTO
             {
                 mID = (int)c.OfficeLevelId,
                 mValue = c.OfficeName,
                 mType = "office"
             });


            return officeDTOs;

        }

        public int TestMethod()
        {
            return 0;
        }


    }
}
