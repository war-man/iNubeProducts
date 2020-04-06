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
using Microsoft.Extensions.Configuration;
using iNube.Services.Partners.Helpers;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;

namespace iNube.Services.Partners.Controllers.Office.OfficeService
{
    public class MicaOfficeService : IOfficeProductService
    {
        private MICAPRContext _context;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private readonly IConfiguration _configuration;
        public DbHelper dbHelper;
        private IIntegrationService integrationService;

        public MicaOfficeService(MICAPRContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            dbHelper = new DbHelper(new IntegrationService(configuration)); ;
        }
        public async Task<OfficeResponse> CreateOffice(OrgOfficeDTO officeDTO, ApiContext apiContext)
        {
            //_context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

         

            var office = _mapper.Map<TblOrgOffice>(officeDTO);

            //_context.Entry(office).State=(office.OrgOfficeId == 0)?EntityState.Added : EntityState.Modified;
            if (office.OrgOfficeId == 0)
            {
                office.CreatedBy = apiContext.UserId;
                office.CreatedDate = DateTime.Now;
                _context.TblOrgOffice.Add(office);
            }
            else
            {
                office.ModifiedBy = apiContext.UserId;
                office.ModifiedDate = DateTime.Now;
                //_context.Entry(office).State = EntityState.Modified;
                _context.Update(office);
            }
            _context.SaveChanges();
            var pDTO = _mapper.Map<OrgOfficeDTO>(office);
            return new OfficeResponse { Status = BusinessStatus.Ok, ResponseMessage = $" Office ID {office.OrgOfficeId} successfully {(officeDTO.OrgOfficeId == 0 ? "created " : "modified")}  for {officeDTO.OfficeName}!" };
        }

        //public async Task<OfficeResponse> CreateOffice(OrgOfficeDTO officeDTO, ApiContext apiContext)
        //{
        //    //_context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
        //    CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
        //    dbHelper._TimeZone = UserDateTime.KeyValue;

        //    DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
        //    var office = _mapper.Map<TblOrgOffice>(officeDTO);
        //    //_context.Entry(office).State=(office.OrgOfficeId == 0)?EntityState.Added : EntityState.Modified;
        //    if (office.OrgOfficeId == 0)
        //    {
        //        office.CreatedBy = apiContext.UserId;
        //        office.CreatedDate = DateTimeNow;
        //        _context.TblOrgOffice.Add(office);
        //    }
        //    else
        //    {
        //        office.ModifiedBy = apiContext.UserId;
        //        office.ModifiedDate = DateTimeNow;
        //        //_context.Entry(office).State = EntityState.Modified;
        //        _context.Update(office);
        //    }
        //    _context.SaveChanges();
        //    var pDTO = _mapper.Map<OrgOfficeDTO>(office);
        //    return new OfficeResponse { Status = BusinessStatus.Ok, ResponseMessage = $" Office ID {office.OrgOfficeId} successfully {(officeDTO.OrgOfficeId == 0 ? "created " : "modified")}  for {officeDTO.OfficeName}!" };
        //}

        public async Task<OrgOfficeDTO> GetOffice(string OfficeCode, ApiContext apiContext)
        {
            //_context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            OrgOfficeDTO _organizationDTO = new OrgOfficeDTO();
            TblOrgOffice _tblOrgOffice = _context.TblOrgOffice.Where(org => org.OfficeCode == OfficeCode)
                                    .Include(add => add.TblOfficeSpocDetails)
                                    .FirstOrDefault();
            OrgOfficeDTO _officeDTO = _mapper.Map<OrgOfficeDTO>(_tblOrgOffice);
            return _officeDTO;
        }
        public async Task<IEnumerable<OrgOfficeDTO>> SearchOfficeData(string OfficeCode, ApiContext apiContext)
        {
          //  _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
           try {
            // OrgOfficeDTO _organizationDTO = new OrgOfficeDTO();
            var _tblOrgOffice = _context.TblOrgOffice.Where(org => org.OfficeCode == OfficeCode)
                                    .Include(add => add.TblOfficeSpocDetails)
                                    .ToList();
            var _officeDTO = _mapper.Map<IEnumerable<OrgOfficeDTO>>(_tblOrgOffice);
            return _officeDTO;
           }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
