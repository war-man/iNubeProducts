using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iNube.Services.Partners.Controllers.Partner.PartnerService;
using iNube.Utility.Framework.Model;
using iNube.Services.UserManagement.Helpers;

namespace iNube.Services.Partners.Controllers.Office.OfficeService
{

    public class MotorOfficeService : IOfficeProductService
    {
        private MICAPRContext _context;
        private IMapper _mapper;


        public MotorOfficeService(MICAPRContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<OfficeResponse> CreateOffice(OrgOfficeDTO officeDTO, ApiContext apiContext)
        {

            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

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
            return new OfficeResponse { Status = BusinessStatus.Ok, ResponseMessage = $" Office ID {office.OrgOfficeId} successfully {(officeDTO.OrgOfficeId == 0 ? "created " : "modified")}  for {officeDTO.OfficeName}!" };
        }

        public async Task<OrgOfficeDTO> GetOffice(int officeID, ApiContext apiContext)
        {

            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            OrgOfficeDTO _organizationDTO = new OrgOfficeDTO();
            TblOrgOffice _tblOrgOffice = _context.TblOrgOffice.Where(org => org.OrgOfficeId == officeID)
                                    .Include(add => add.TblOfficeSpocDetails)
                                    .FirstOrDefault();
            OrgOfficeDTO _officeDTO = _mapper.Map<OrgOfficeDTO>(_tblOrgOffice);
            return _officeDTO;


        }
        public async Task<IEnumerable<OrgOfficeDTO>> SearchOfficeData(int officeID, ApiContext apiContext)
        {

            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            // OrgOfficeDTO _organizationDTO = new OrgOfficeDTO();
            var _tblOrgOffice = _context.TblOrgOffice.Where(org => org.OfficeCode == "2323")
                                    .Include(add => add.TblOfficeSpocDetails)
                                    .ToList();
            var _officeDTO = _mapper.Map<IEnumerable<OrgOfficeDTO>>(_tblOrgOffice);
            return _officeDTO;


        }
        public async Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
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
