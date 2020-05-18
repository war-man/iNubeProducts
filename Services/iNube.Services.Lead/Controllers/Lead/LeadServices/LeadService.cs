using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using iNube.Services.Lead.Models;

using iNube.Services.Lead.Entities;
using iNube.Utility.Framework.Model;
using System.Reflection;
using iNube.Services.Lead.Controllers.Lead.LDIntegrationServices;
using System.Dynamic;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.Swagger;
using iNube.Services.Quotation.Models;

namespace iNube.Services.Lead.Controllers.Lead.LeadService
{

    public interface ILeadService
    {

        IEnumerable<ddDTO> GetMaster(string lMasterlist);
        Task<LeadResponse> SaveSuspectAsync(LeadDTO leadDTO, ApiContext context);
        Task<IEnumerable<LeadDTO>> ContactPoolAsync(String type, ApiContext context);
        Task<IEnumerable<LeadDTO>> SuspectPoolAsync(int incStageId, ApiContext context);
        List<LeadDTO> LoadSuspectInformation(int ContactID, ApiContext context);

        LeadResponse ModifySuspect(LeadDTO leadDTO, ApiContext context);
        IEnumerable<ddDTO> GetLocation(string locationType, int parentID, ApiContext context);
        IEnumerable<LifeQqDTO> FetchLifeQqdata();
        IEnumerable<LeadDTO> FetchTblContactsdata();
        Task<ViewDetails> ViewDetailsByPositionIdAsync(string Positionid, ApiContext context);
        Task<bool> UpdateEmpProspectData(EMPDistribute eMPDistribute, ApiContext apiContext);
        Task<bool> UpdateEmpSuspectData(EMPDistribute eMPDistribute, ApiContext apiContext);
    }

    public class LeadService : ILeadService
    {
        private AVOLMContext _context;
        private IMapper _mapper;
        private ILDIntegrationService _integrationService;

        public LeadService(AVOLMContext context, IMapper mapper, ILDIntegrationService integrationService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;

        }
        /// <summary>
        /// RuleEngine
        /// </summary>
        /// <param name="lMasterlist"></param>
        /// <returns></returns>

        private static PropertyInfo[] GetProperties(object obj)
        {
            return obj.GetType().GetProperties();
        }
        //RuleEngine For Fetching Value which are differeer as compared to Partner Page 
        //private string GetRuleColumnName(string column)
        //{
        //    var lstColumn = GettblRuleColumn();
        //    string colName;
        //    if (lstColumn.TryGetValue(column, out colName))
        //    {
        //        return colName;
        //    }
        //    return "";
        //}
        //private static Dictionary<string, string> GettblRuleColumn()
        //{
        //    Dictionary<string, string> dicColumns = new Dictionary<string, string>();
        //    dicColumns.Add("Mobile", "MobileNo");
        //    dicColumns.Add("MbNo", "MobileNo");
        //    dicColumns.Add("Mno", "MobileNo");
        //    dicColumns.Add("MobileNo", "MobileNo");
        //    dicColumns.Add("EmailId", "Email");
        //    dicColumns.Add("Emailid", "Email");
        //    dicColumns.Add("Email", "Email");
        //    return dicColumns;
        //}


        /// <summary>
        /// RUleEngine End
        /// </summary>
        /// <param name="lMasterlist"></param>
        /// <returns></returns>



        public IEnumerable<ddDTO> GetMaster(string lMasterlist)
        {
            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblmasLdcommonTypes
             .Select(c => new ddDTO
             {
                 mID = c.CommonTypeId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
            return ddDTOs;
        }
        // get Location
        public IEnumerable<ddDTO> GetLocation(string locationType, int parentID, ApiContext context)
        {
            IEnumerable<ddDTO> ddDTOs;

            switch (locationType)
            {
                case "State":
                    ddDTOs = _context.TblMasState.Where(location => location.CountryId == parentID)
                        .Select(c => new ddDTO
                        {
                            mID = c.StateId,
                            mValue = c.StateName,
                            mType = "State"
                        });
                    break;
                case "District":
                    ddDTOs = _context.TblMasDistrict.Where(location => location.StateId == parentID)
                        .Select(c => new ddDTO
                        {
                            mID = c.DistrictId,
                            mValue = c.DistrictName,
                            mType = "District"
                        });
                    break;
                case "City":
                    ddDTOs = _context.TblMasCity.Where(location => location.DistrictId == parentID)
                    .Select(c => new ddDTO
                    {
                        mID = c.CityId,
                        mValue = c.CityName,
                        mType = "City"
                    });
                    break;
                case "Pincode":
                    ddDTOs = _context.TblMasPinCode.Where(location => location.CityId == parentID)
                    .Select(c => new ddDTO
                    {
                        mID = c.PincodeId,
                        mValue = c.Pincode,
                        mType = "Pincode"
                    });
                    break;
                default:
                    ddDTOs = _context.TblMasCountry.Select(location => location)
                    .Select(c => new ddDTO
                    {
                        mID = c.CountryId,
                        mValue = c.CountryName,
                        mType = "Country"
                    });
                    break;
            }
            return ddDTOs;
        }


        //await is used in rule Engine its commented
        public async Task<LeadResponse> SaveSuspectAsync(LeadDTO leadDTO, ApiContext context)
        {
            //// RuleEngine Validation 

            var ruleMapList = await _integrationService.GetRuleMapAsync(context);
            // Get Rules with Parameter
            var ruleListParam = await _integrationService.GetRulesWithParamAsync(context);
            var expando = new ExpandoObject() as IDictionary<string, Object>;
            var ruleproperties = GetProperties(leadDTO);
            foreach (var rm in ruleMapList)
            {
                //var paraColName = "";
                try
                {
                    if (leadDTO.GetType().GetProperty(rm.Param1) != null)
                    {
                        var value = leadDTO.GetType().GetProperty(rm.Param1).GetValue(leadDTO, null);
                        if (value != null)
                        {
                            expando.Add(rm.Param2, value.ToString());
                        }
                    }
                }
                catch (Exception)
                {

                }

            }
            expando.Add("RuleName", Convert.ToInt32(ruleMapList.First().RuleId));
            var ruleCheck = await _integrationService.SendRuleValidateDataAsync(expando, context);



            if (ruleCheck.Status == BusinessStatus.Ok)
            {
                // RuleEngine Validation 
                try
                {

                    leadDTO.CreationDate = DateTime.Now;
                    var lead = _mapper.Map<TblContacts>(leadDTO);
                    lead.ContactType = _context.TblmasLdcommonTypes.First(c => c.CommonTypeId == lead.ContactTypeId).Value;

                    if (lead.ContactId == 0)
                    {
                        _context.TblContacts.Add(lead);
                        //_context.SaveChanges();
                        TblOpportunity objOppurtunity = new TblOpportunity();
                        TblOpportunityHistory objOpportunityHistory = new TblOpportunityHistory();
                        objOppurtunity.ContactId = lead.ContactId;
                        objOppurtunity.StageId = 1; // Suspect
                        objOppurtunity.Createdby = context.UserId;
                        objOpportunityHistory.StageId = 1;
                        objOpportunityHistory.OpportunityId = objOppurtunity.OppurtunityId;
                        objOpportunityHistory.CreatedDate = DateTime.Now;
                        _context.TblOpportunity.Add(objOppurtunity);
                        // _context.SaveChanges();
                        objOpportunityHistory.OpportunityId = objOppurtunity.OppurtunityId;
                        _context.TblOpportunityHistory.Add(objOpportunityHistory);
                    }
                    _context.SaveChanges();
                    leadDTO = _mapper.Map<LeadDTO>(lead);
                    //return leadDTO;
                    return new LeadResponse { Status = BusinessStatus.Created, product = leadDTO, ResponseMessage = $"Lead  Saved successfully ! \n Product ID: {leadDTO.ContactID}" };

                }

                catch (Exception ex)
                {
                    throw ex;
                }
            }
            // RuleEngine Validation 

            else
            {
                return null;

            }

        }

        // RuleEngine Validation 
        public async Task<IEnumerable<LeadDTO>> ContactPoolAsync(String type, ApiContext context)
        {
            IEnumerable<LeadDTO> lst;
            switch (type)
            {

                case "Lead":
                    lst = await SuspectPoolAsync(1, context);
                    return lst;
                case "Prospect":
                    lst = await SuspectPoolAsync(2, context);
                    return lst;
                default: return new List<LeadDTO>();


            }

        }
        public async Task<IEnumerable<LeadDTO>> SuspectPoolAsync(int incStageId, ApiContext context)
        {
            List<LeadDTO> suspects = new List<LeadDTO>();
            if (string.IsNullOrEmpty(context.Name))
            {
                suspects = (from Opportunity in _context.TblOpportunity.Where(a => a.StageId == incStageId && a.IsDeleted != true /*&& a.Createdby == userId*/)
                            join Contact in _context.TblContacts/*.Where(b => b.CreatedBy == userId)*/
                            on Opportunity.ContactId equals Contact.ContactId
                            orderby Contact.ContactId descending
                            select new LeadDTO
                            {

                                ContactType = Contact.ContactType,
                                ContactID = Contact.ContactId,
                                FirstName = Contact.FirstName,
                                Place = Contact.Place,
                                MobileNo = Contact.MobileNo,
                                CreationDate = Contact.CreationDate,

                            }).ToList();
            }
            else
            {
                // Get Emp Hirarchy
                var empList = await _integrationService.GetEmpHierarchyAsync(context.Name, context);
                var staffCodes = empList.Select(rt => Convert.ToInt64(rt.PositionID).ToString());
                suspects = (from Opportunity in _context.TblOpportunity.Where(a => a.StageId == incStageId && a.IsDeleted != true && staffCodes.Contains(a.HandledBy))
                            join Contact in _context.TblContacts/*.Where(b => b.CreatedBy == userId)*/
                            on Opportunity.ContactId equals Contact.ContactId
                            orderby Contact.ContactId descending
                            select new LeadDTO
                            {

                                ContactType = Contact.ContactType,
                                ContactID = Contact.ContactId,
                                FirstName = Contact.FirstName,
                                Place = Contact.Place,
                                MobileNo = Contact.MobileNo,
                                CreationDate = Contact.CreationDate,

                            }).ToList();
            }


            var suspectpool = _mapper.Map<IEnumerable<LeadDTO>>(suspects);
            return suspects;

        }
        //public IEnumerable<ProspectPoolDTO> GetProspectPool(ApiContext context)

        //{

        //    List<ProspectPoolDTO> objLstProspectPool = (from Opportunity in _context.TblOpportunity.Where(a => a.StageId == 2 && a.IsDeleted != true
        //                                                /*&& a.Createdby == userId*/)
        //                                                join Contact in _context.TblContacts/*.Where(b => b.CreatedBy == userId)*/
        //                                                on Opportunity.ContactId equals Contact.ContactId
        //                                                orderby Contact.ContactId descending
        //                                                select new ProspectPoolDTO
        //                                                {
        //                                                    ProspectId = Contact.ContactId,
        //                                                    ProspectType = Contact.ContactType,
        //                                                    ProspectName = Contact.FirstName,
        //                                                    ProspectLastName = Contact.LastName,
        //                                                    Salutation = _context.TblMasCommonTypes.Where(a => a.Code == Contact.Title).Select(b => b.Description).FirstOrDefault(),
        //                                                    ProspectMobile = Contact.MobileNo,
        //                                                    ProspectHome = Contact.PhoneNo,
        //                                                    ProspectWork = Contact.Work,
        //                                                    ProspectEmail = Contact.EmailId,
        //                                                    ProspectNicNo = Contact.Nicno,
        //                                                    LeadNo = Contact.LeadNo,
        //                                                    Place = Contact.Place,
        //                                                    LeadDate = Contact.CreationDate.ToString(),
        //                                                    Dob = Contact.DateOfBirth.ToString(),
        //                                                    // ProspectDaysleft = 3,
        //                                                    FullName = _context.TblMasCommonTypes.Where(a => a.Code == Contact.Title).Select(b => b.ShortDesc).FirstOrDefault() + " " + Contact.FirstName + " " + Contact.LastName

        //                                                }).ToList();

        //    //foreach (var obj in objLstProspectPool)
        //    //{
        //    //    obj.Dob = obj.Dob.ToDate().ToString("dd/MM/yyyy");
        //    //    obj.LeadDate = obj.LeadDate.ToDate().ToString("dd/MM/yyyy");
        //    //}

        //    return objLstProspectPool;






        //}

        public List<LeadDTO> LoadSuspectInformation(int ContactID, ApiContext context)
        {

            var DATA = _context.TblContacts.Where(p => p.ContactId == ContactID).Include(x => x.Address).ToList();



            var pooldata = _mapper.Map<List<LeadDTO>>(DATA);
            foreach (var item in pooldata)
            {
                if (item.Address == null)
                {
                    item.Address = new AddressDTO();
                }
            }

            return pooldata;

        }

        public LeadResponse ModifySuspect(LeadDTO leadDTO, ApiContext context)
        {
            TblAddress objAddress = new TblAddress();
            TblOpportunity objopportunity = new TblOpportunity();
            var lead = _mapper.Map<TblContacts>(leadDTO);

            var tbl_lead = _context.TblContacts.Find(lead.ContactId);
            var tbl_opportunity = _context.TblOpportunity.Find(lead.ContactId);
            //bool IsProspect = true;

            // update user properties
            // tbl_lead.ContactId = leadDTO.ContactID;
            tbl_lead.ContactTypeId = leadDTO.ContactTypeId;
            tbl_lead.ContactType = _context.TblmasLdcommonTypes.First(c => c.CommonTypeId == leadDTO.ContactTypeId).Value;
            tbl_lead.FirstName = leadDTO.FirstName;
            tbl_lead.LastName = leadDTO.LastName;
            tbl_lead.MobileNo = leadDTO.MobileNo;
            tbl_lead.PhoneNo = leadDTO.PhoneNo;
            tbl_lead.Work = leadDTO.Work;
            tbl_lead.EmailId = leadDTO.EmailID;
            tbl_lead.Nicno = leadDTO.NICNO;
            tbl_lead.Place = leadDTO.Place;
            tbl_lead.MobileNo = leadDTO.MobileNo;
            tbl_lead.PassportNo = leadDTO.PassportNo;

            tbl_lead.Currency = leadDTO.Currency;
            tbl_lead.Gender = leadDTO.Gender;
            tbl_lead.MaritalStatusId = leadDTO.MaritalStatusID;
            tbl_lead.DateOfBirth = leadDTO.DateOfBirth;
            tbl_lead.Age = leadDTO.Age;
            tbl_lead.OccupationId = leadDTO.OccupationID;
            tbl_lead.MonthlyIncome = leadDTO.MonthlyIncome;


            tbl_lead.Address = new TblAddress();
            if (leadDTO.Address != null)
            {
                tbl_lead.Address.Address1 = leadDTO.Address.Address1;
                tbl_lead.Address.Address2 = leadDTO.Address.Address2;
                tbl_lead.Address.Address3 = leadDTO.Address.Address3;
                tbl_lead.Address.CountryId = leadDTO.Address.CountryId;
                tbl_lead.Address.StateId = leadDTO.Address.StateId;
                tbl_lead.Address.CityId = leadDTO.Address.CityId;
                tbl_lead.Address.DistrictId = leadDTO.Address.DistrictId;
                tbl_lead.Address.AreaId = leadDTO.Address.AreaId;

            }


            _context.TblAddress.Update(tbl_lead.Address);
            tbl_lead.AddressId = objAddress.AddressId;
            _context.TblContacts.Update(tbl_lead);
            _context.SaveChanges();
            //tbl_lead.TblOpportunity

            var objOppurtunity = _context.TblOpportunity.SingleOrDefault(x => x.ContactId == tbl_lead.ContactId);

            objOppurtunity.ContactId = leadDTO.ContactID;
            objOppurtunity.StageId = 2; // Suspect
            objOppurtunity.Createdby = context.UserId;
            _context.TblOpportunity.Update(objOppurtunity);
            _context.SaveChanges();

            var leaddto = _mapper.Map<LeadDTO>(lead);
            //return leaddto;
            return new LeadResponse { Status = BusinessStatus.Created, product = leaddto, ResponseMessage = $"Lead  modified successfully ! \n Product ID: {leaddto.ContactID}" };

        }

        //Proposal  tblLifeQqData
        public IEnumerable<LifeQqDTO> FetchLifeQqdata()
        {
            var lifeQqdata = _context.TblLifeQq.Select(x => x).ToList();
            var _lifeQqdata = _mapper.Map<List<LifeQqDTO>>(lifeQqdata);
            return _lifeQqdata;
        }

        //Proposal  tblcontacts
        public IEnumerable<LeadDTO> FetchTblContactsdata()
        {
            var tblContactsdata = _context.TblContacts.Select(x => x).ToList();
            var _tblContactsdata = _mapper.Map<List<LeadDTO>>(tblContactsdata);
            return _tblContactsdata;
        }
        public async Task<ViewDetails> ViewDetailsByPositionIdAsync(string Positionid, ApiContext context)
        {

            // var DATA = _context.TblContacts.Where(p => p.ContactId == ContactID).Include(x => x.Address).ToList();
            //var DATA = _context.TblOpportunity.Where(a => a.HandledBy == Positionid).ToList();
            var DATA = (from oppurtunity in _context.TblOpportunity
                        join contact in _context.TblContacts on oppurtunity.ContactId equals contact.ContactId
                        where oppurtunity.HandledBy == Positionid
                        select new { oppurtunity, contact })
                        .ToList();

            LeadDTO suspect = new LeadDTO();
            List<LeadDTO> suspects = new List<LeadDTO>();

            LeadDTO propect = new LeadDTO();
            List<LeadDTO> propects = new List<LeadDTO>();

            StagContactId SuspectstagContactId = new StagContactId();
            List<StagContactId> SuspectstagContactIds = new List<StagContactId>();
            StagContactId ProspectstagContactId = new StagContactId();
            List<StagContactId> ProspecttagContactIds = new List<StagContactId>();
            List<ProposalDto> proposalDtos = new List<ProposalDto>();


            QuotationDto quotationDto = new QuotationDto();
            List<QuotationDto> quotationDtos = new List<QuotationDto>();

            List<policyDto> policyDtos = new List<policyDto>();

            ViewDetails viewDetails = new ViewDetails();


            foreach (var item in DATA)
            {
                if (item.oppurtunity.StageId == 1)
                {
                    SuspectstagContactId = new StagContactId();
                    SuspectstagContactId.contactid = item.oppurtunity.ContactId;
                    SuspectstagContactId.stagid = item.oppurtunity.StageId;
                    SuspectstagContactIds.Add(SuspectstagContactId);

                }
                if (item.oppurtunity.StageId == 2)
                {
                    ProspectstagContactId = new StagContactId();
                    ProspectstagContactId.contactid = item.oppurtunity.ContactId;
                    ProspectstagContactId.stagid = item.oppurtunity.StageId;
                    ProspecttagContactIds.Add(ProspectstagContactId);

                }
            }
            //var prospect = _context.TblContacts.Select(a => a);
            foreach (var item in SuspectstagContactIds)
            {
                suspect = new LeadDTO();
                //var Tblpropsectdata = _context.TblContacts.FirstOrDefault(a => a.ContactId == item.contactid);
                var Tblpropsectdata = DATA.FirstOrDefault(a => a.contact.ContactId == item.contactid).contact;
                var prospectdata = _mapper.Map<LeadDTO>(Tblpropsectdata);
                suspect.Address = prospectdata.Address;
                suspect.ContactID = prospectdata.ContactID;
                suspect.Age = prospectdata.Age;
                suspect.ContactType = prospectdata.ContactType;
                suspect.DateOfBirth = prospectdata.DateOfBirth;
                suspect.EmailID = prospectdata.EmailID;
                suspect.FirstName = prospectdata.FirstName;

                suspect.Currency = prospectdata.Currency;
                suspect.CreationDate = prospectdata.CreationDate;
                suspect.Gender = prospectdata.Gender;
                suspect.LastName = prospectdata.LastName;
                suspect.MobileNo = prospectdata.MobileNo;
                suspect.MonthlyIncome = prospectdata.MonthlyIncome;

                suspect.NICNO = prospectdata.NICNO;
                suspect.OccupationID = prospectdata.OccupationID;
                suspect.opportunity = prospectdata.opportunity;
                suspect.PassportNo = prospectdata.PassportNo;
                suspect.PhoneNo = prospectdata.PhoneNo;
                suspect.Place = prospectdata.Place;

                suspect.Age = prospectdata.Age;
                suspect.Salutation = prospectdata.Salutation;
                suspect.SpouseAge = prospectdata.SpouseAge;
                suspect.SpouseName = prospectdata.SpouseName;
                suspect.MaritalStatusID = prospectdata.MaritalStatusID;
                suspect.LeadNo = prospectdata.LeadNo;

                suspects.Add(suspect);

            }
            foreach (var item in ProspecttagContactIds)
            {
                propect = new LeadDTO();
                //var Tblpropsectdata = _context.TblContacts.FirstOrDefault(a => a.ContactId == item.contactid);
                var Tblpropsectdata = DATA.FirstOrDefault(a => a.contact.ContactId == item.contactid).contact;
                var suspectdata = _mapper.Map<LeadDTO>(Tblpropsectdata);
                propect.Address = suspectdata.Address;
                propect.ContactID = suspectdata.ContactID;
                propect.Age = suspectdata.Age;
                propect.ContactType = suspectdata.ContactType;
                propect.DateOfBirth = suspectdata.DateOfBirth;
                propect.EmailID = suspectdata.EmailID;
                propect.FirstName = suspectdata.FirstName;


                propect.Currency = suspectdata.Currency;
                propect.CreationDate = suspectdata.CreationDate;
                propect.Gender = suspectdata.Gender;
                propect.LastName = suspectdata.LastName;
                propect.MobileNo = suspectdata.MobileNo;
                propect.MonthlyIncome = suspectdata.MonthlyIncome;

                propect.NICNO = suspectdata.NICNO;
                propect.OccupationID = suspectdata.OccupationID;
                propect.opportunity = suspectdata.opportunity;
                propect.PassportNo = suspectdata.PassportNo;
                propect.PhoneNo = suspectdata.PhoneNo;
                propect.Place = suspectdata.Place;

                propect.Age = suspectdata.Age;
                propect.Salutation = suspectdata.Salutation;
                propect.SpouseAge = suspectdata.SpouseAge;
                propect.SpouseName = suspectdata.SpouseName;
                propect.MaritalStatusID = suspectdata.MaritalStatusID;
                propect.LeadNo = suspectdata.LeadNo;

                propects.Add(propect);
            }


            //Quotation data call

            // var tblLifeQqdata = _context.TblLifeQq.FirstOrDefault(a => a.ContactId == item.contactid).LifeQqid;
            var tblLifeQqdata = (from tblMapper in _context.TblLifeQq

                                 where (tblMapper.HandledBy == Positionid)

                                 join tblMapperDetails in _context.TblQuoteMemberDetials on tblMapper.LifeQqid equals tblMapperDetails.LifeQqid

                                 select new QuotationDto

                                 {
                                     Name = tblMapperDetails.Name,

                                     QuotNumber = tblMapper.QuoteNo,
                                     ContactNumner = suspect.MobileNo,
                                     MovedTo = "",
                                     QuotationId = tblMapper.LifeQqid
                                     //CityName = suspectdata.Address.city.ToString(),

                                 }).FirstOrDefault();
            //tblLifeQqdata.ContactNumner = suspectdata.MobileNo;

            quotationDtos.Add(tblLifeQqdata);


            var proposaldata = await _integrationService.GetProposaByHandledByid(Convert.ToInt32(Positionid), context);
            ProposalDto proposalDto = new ProposalDto();
            foreach (var item in proposaldata)
            {
                proposalDto = new ProposalDto();
                proposalDto = item;
                proposalDtos.Add(proposalDto);
            }
            //  var policydata = await _integrationService.GetPolicyByProposalNO(proposalDto.ProposalNumber, context);

            //doing for the policy

            // policyDto policyDto = policydata;

            var policydata = await _integrationService.GetPolicyByHandledBy(Convert.ToInt32(Positionid), context);
            policyDto policyDto = new policyDto();
            foreach (var item in policydata)
            {
                policyDto = new policyDto();
                policyDto = item;
                policyDtos.Add(policyDto);
            }


            //for Quotation
            viewDetails.prospect = propects;
            viewDetails.suspect = suspects;
            viewDetails.quotationDtos = quotationDtos;
            viewDetails.proposalDtos = proposalDtos;
            viewDetails.policyDtos = policyDtos;
            //return pooldata;
            return viewDetails;

        }
        public async Task<bool> UpdateEmpProspectData(EMPDistribute eMPDistribute, ApiContext apiContext)
        {

            foreach (var item in eMPDistribute.EMPDistributeDTO)
            {
                var data = _context.TblContacts.FirstOrDefault(a => a.ContactId == item.PrimaryIds);
                data.HandledBy = item.PositionId.ToString();
                _context.Update(data);
            }

            _context.SaveChanges();
            return true;
        }

        public async Task<bool> UpdateEmpSuspectData(EMPDistribute eMPDistribute, ApiContext apiContext)
        {
            foreach (var item in eMPDistribute.EMPDistributeDTO)
            {
                var data = _context.TblContacts.FirstOrDefault(a => a.ContactId == item.PrimaryIds);
                data.HandledBy = item.PositionId.ToString();
                _context.Update(data);
            }

            _context.SaveChanges();
            return true;
        }
    }
}
