using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using iNube.Services.Lead.Entities;
using iNube.Services.Lead.Models;
using AutoMapper;
using iNube.Services.Lead.Helpers;
using iNube.Utility.Framework.Model;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace INube.Services.Prospect.Controllers.Prospect.ProspectService
{
    public interface IProspectService
    {
       
        IEnumerable<ProspectPoolDTO> GetProspectPool(ApiContext context);
       
    }

    public class ProspectService : IProspectService
    {
        private AVOLMContext _context;
         private IMapper _mapper;


        public ProspectService(AVOLMContext context,IMapper mapper)
        {
            _context = context;
                _mapper = mapper;

        }
       
        public IEnumerable<ProspectPoolDTO> GetProspectPool(ApiContext context)
          
        {
            
            List<ProspectPoolDTO> objLstProspectPool = (from Opportunity in _context.TblOpportunity.Where(a => a.StageId == 2 && a.IsDeleted != true /*&& a.Createdby == userId*/)
                                                        join Contact in _context.TblContacts/*.Where(b => b.CreatedBy == userId)*/
                                                        on Opportunity.ContactId equals Contact.ContactId
                                                        orderby Contact.ContactId descending
                                                        select new ProspectPoolDTO
                                                        {
                                                            ProspectId = Contact.ContactId,
                                                            ProspectType = Contact.ContactType,
                                                            ProspectName = Contact.FirstName,
                                                            ProspectLastName = Contact.LastName,
                                                            Salutation = _context.TblMasCommonTypes.Where(a => a.Code == Contact.Title).Select(b => b.Description).FirstOrDefault(),
                                                            ProspectMobile = Contact.MobileNo,
                                                            ProspectHome = Contact.PhoneNo,
                                                            ProspectWork = Contact.Work,
                                                            ProspectEmail = Contact.EmailId,
                                                            ProspectNicNo = Contact.Nicno,
                                                            LeadNo = Contact.LeadNo,
                                                            Place = Contact.Place,
                                                            LeadDate = Contact.CreationDate.ToString(),
                                                            Dob = Contact.DateOfBirth.ToString(),
                                                           // ProspectDaysleft = 3,
                                                            FullName = _context.TblMasCommonTypes.Where(a => a.Code == Contact.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + Contact.FirstName + " " + Contact.LastName

                                                        }).ToList();

            //foreach (var obj in objLstProspectPool)
            //{
            //    obj.Dob = obj.Dob.ToDate().ToString("dd/MM/yyyy");
            //    obj.LeadDate = obj.LeadDate.ToDate().ToString("dd/MM/yyyy");
            //}

            return objLstProspectPool;






        }

    }
}
