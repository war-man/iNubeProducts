using AutoMapper;
using iNube.Services.Billing.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using iNube.Services.Billing.Models;
using iNube.Services.Billing.Helpers;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;

using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using iNube.Services.Billing.Controllers.Billing.IntegrationServices;
//using AutoMapper.Configuration;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using iNube.Services.Billing.Controllers.Billing.BillingService;

namespace iNube.Services.Billing.Controllers.Billing.MicaBillingService
{
    public class MicaBillingService : IBillingProductService
    {
        private MICABIContext _context;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private readonly IConfiguration _configuration;

        public MicaBillingService(MICABIContext context, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
        }


        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ddDTO> ddDTOs;


            ddDTOs = _context.TblmasBicommonTypes
         .Select(c => new ddDTO
         {
             mID = c.CommonTypeId,
             mValue = c.Value,
             mType = c.MasterType
         });


            return ddDTOs;
        }

        public async Task<IEnumerable<ddDTO>> GetObjects(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ddDTO> obj;
            obj = from pr in _context.TblObjects.OrderByDescending(p => p.CreatedDate)
                  select new ddDTO
                  {
                      mID = pr.ObjectId,
                      mValue = pr.ObjectName,
                      mType = lMasterlist,

                  };
            return obj;
        }

        // For ACCOOUNTING
        //Get AllEventDetails For Accounting Module
        public async Task<IEnumerable<EventMappingModel>> GetEventMapDetails(ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var accountMapDTOS = from tblobjectEventMap in _context.TblObjectEventMapping
                                     join tblObject in _context.TblObjects on tblobjectEventMap.ObjectId equals tblObject.ObjectId
                                     join tblEvent in _context.TblEvents on tblobjectEventMap.EventId equals tblEvent.EventId
                                     //join tblObjectEventParameter in _context.TblObjectEventParameter on tblobjectEventMap.ObjectId equals tblObjectEventParameter.ObjectId
                                     select new EventMappingModel
                                     {
                                         EventId = tblEvent.EventId,
                                         EventName = tblEvent.EventName,
                                         ObjectId = tblObject.ObjectId,
                                         ObjectName = tblObject.ObjectName,
                                         Tablename = tblobjectEventMap.Tablename,
                                         Colname = tblobjectEventMap.Colname,
                                         Colvalue = tblobjectEventMap.Colvalue,
                                     };
                var accountMapList = _mapper.Map<IEnumerable<EventMappingModel>>(accountMapDTOS);
                return accountMapList;

            }
            catch (Exception ex)
            {

            }
            return null;
        }

        public async Task<IEnumerable<EventObjParamMapping>> GetEventObjectParameter(ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var accountMapDTOS = from tblobjectEventParam in _context.TblObjectEventParameter
                                     join tblObject in _context.TblObjects on tblobjectEventParam.ObjectId equals tblObject.ObjectId

                                     select new EventObjParamMapping
                                     {
                                         ObjectId = tblObject.ObjectId,
                                         ObjectName = tblObject.ObjectName,
                                         EventParameterId = tblobjectEventParam.EventParameterId,
                                         Parameter = tblobjectEventParam.Parameter,
                                         TableName = tblobjectEventParam.Tablename,
                                         ColName = tblobjectEventParam.Colname,
                                         ColType = tblobjectEventParam.Coltype,
                                     };
                var accountMapList = _mapper.Map<IEnumerable<EventObjParamMapping>>(accountMapDTOS);
                return accountMapList;

            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //Get Customer Name for Accounting Details
        public async Task<IEnumerable<CustomersDTOS>> GetCustomerDetails(ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var abc = _context.TblCustomers.OrderBy(C => C.IsActive == true);
            var customerList = _mapper.Map<IEnumerable<CustomersDTOS>>(abc);

            return customerList;

        }


        public async Task<IEnumerable<ddDTO>> GetEvents(string lMasterlist, int obj, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ddDTO> eve;
            eve = from a in _context.TblObjectEventMapping.Where(x => x.ObjectId == obj).OrderByDescending(x => x.CreatedBy)
                  join o in _context.TblObjects on a.ObjectId equals o.ObjectId
                  join e in _context.TblEvents on a.EventId equals e.EventId
                  select new ddDTO
                  {
                      mID = e.EventId,
                      mValue = e.EventName,
                      mType = lMasterlist,
                  };
            return eve;
        }

        public async Task<IEnumerable<objParamDTO>> GetValueFactor(string lMasterlist, int objectid, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<objParamDTO> param;
            param = _context.TblObjectEventParameter.Where(x => x.ObjectId == objectid && x.Coltype == "C").Select(x => new objParamDTO
            {
                mID = x.EventParameterId,
                mValue = x.Parameter,
                mType = lMasterlist,
            });
            return param;
            //return null;
        }
        public async Task<IEnumerable<objParamDTO>> GetAllEventMapping(ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var mapdescription = _context.TblObjectEventMapping.Select(x => new objParamDTO
            {
                mID = x.EventMappingId,
                mValue = x.Description,
                mType = "EventMapping",
            });
            return mapdescription;

        }

        public async Task<IEnumerable<ddDTO>> GetMasterForLocation(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ddDTO> ddDTOs;
            ddDTOs = _context.TblMasCountry
             .Select(c => new ddDTO
             {
                 mID = c.CountryId,
                 mValue = c.CountryName,
                 mType = lMasterlist,
             });
            return ddDTOs;
        }

        public async Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

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

        public async Task<BillingConfigDTO> SaveBillingDetails(BillingConfigDTO billingitem, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var _tblBillingconfig = _mapper.Map<TblBillingConfig>(billingitem);

                //var bill = _mapper.Map<TblBillingItem>(billingitem);

                _context.TblBillingConfig.Add(_tblBillingconfig);

                _context.SaveChanges();
                var billingitems = _mapper.Map<BillingConfigDTO>(_tblBillingconfig);
                return billingitems;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Delete Billing Id
        public void Delete(int BillingID, ApiContext apiContext)
        {
            //_context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //var delete_bill = _context.TblBillingItem.Find(BillingID);
            //if (delete_bill != null)
            //{
            //    _context.TblBillingItem.Remove(delete_bill);
            //    _context.SaveChanges();
            //}
        }
        //update for Billing
        public async Task<BillingConfigDTO> ModifyBilling(BillingConfigDTO objBilling, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tbl_bill = _mapper.Map<TblBillingConfig>(objBilling);
            var tbl_Billing = _context.TblBillingConfig.Find(tbl_bill.BillingConfigId);

            if (tbl_Billing == null)
                throw new AppException("Record not found");

            // update user billing
            tbl_Billing.BillingEndDate = objBilling.BillingEndDate;
            tbl_Billing.BillingStartDate = objBilling.BillingStartDate;

            tbl_Billing.BillingAmount = objBilling.BillingAmount;
            tbl_Billing.ContractId = objBilling.ContractId;
            tbl_Billing.CurrencyId = objBilling.CurrencyId;

            _context.TblBillingConfig.Update(tbl_Billing);
            _context.SaveChanges();
            var productDTO = _mapper.Map<BillingConfigDTO>(tbl_bill);
            return productDTO;
        }
        public async Task<IEnumerable<HistoryDTO>> GetHistry(decimal contractid, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var BillingHistory = (from s in _context.TblBillingConfig.Where(x => x.ContractId == contractid)
                                  join cs in _context.TblBillingItem on s.BillingConfigId equals cs.BillingConfigId
                                  select new HistoryDTO
                                  {
                                      ModifiedDate = DateTime.Now.Date,
                                      CurrencyId = s.CurrencyId,
                                      BillingFrequencyId = cs.BillingFrequencyId,
                                      EfficitiveDate = s.BillingStartDate,
                                      EndDate = s.BillingEndDate,
                                      EventMappingId = cs.EventMappingId,

                                  }).ToList();


            var CommonTypeData = _context.TblmasBicommonTypes.Select(x => x);

            Dictionary<int?, string> CommonTypeFrequency = new Dictionary<int?, string>();
            Dictionary<int?, string> CommonTypeCurrency = new Dictionary<int?, string>();

            foreach (var item in BillingHistory)
            {

                if (item.BillingFrequencyId != 0)
                {
                    var check = CommonTypeFrequency.Where(x => x.Key == item.BillingFrequencyId).Any();
                    if (!check)
                    {
                        var data2 = CommonTypeData.SingleOrDefault(x => x.CommonTypeId == item.BillingFrequencyId);

                        CommonTypeFrequency.Add(item.BillingFrequencyId, data2.Value);
                    }
                }

                if (item.CurrencyId != 0)
                {
                    var check = CommonTypeCurrency.Where(x => x.Key == item.CurrencyId).Any();
                    if (!check)
                    {
                        var data3 = CommonTypeData.SingleOrDefault(x => x.CommonTypeId == item.CurrencyId);

                        CommonTypeCurrency.Add(item.CurrencyId, data3.Value);

                    }
                }

            }
            //var ObjectEventMapping = _context.TblObjectEventMapping.Select(x => x);
            //Dictionary<int?, string> Mapping = new Dictionary<int?, string>();
            //foreach (var item in BillingHistory)
            //{

            //    if (item.EventMappingId != 0)
            //    {
            //        var check = Mapping.Where(x => x.Key == item.EventMappingId).Any();
            //        if (!check)
            //        {
            //            var data3 = ObjectEventMapping.SingleOrDefault(x => x.EventMappingId == item.EventMappingId);

            //            Mapping.Add(item.BillingFrequencyId, data3.Description);
            //        }
            //    }
            //}

            foreach (var item in BillingHistory)
            {

                if (item.BillingFrequencyId != 0)
                {
                    item.BillingFrequency = CommonTypeFrequency[item.BillingFrequencyId];
                }
                if (item.CurrencyId != 0)
                {
                    item.CurrencyType = CommonTypeCurrency[item.CurrencyId];
                }
                //if (item.EventMappingId != 0)
                //{
                //    item.EventMap = Mapping[item.EventMappingId];
                //}
            }

            var historytable = _mapper.Map<IEnumerable<HistoryDTO>>(BillingHistory);
            return historytable;

        }

        //search for Billing
        public async Task<IEnumerable<BillingConfigDTO>> SearchBilling(BillingSearchDTO billingSearchDTO, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var _bill = from bi in _context.TblBillingConfig.OrderByDescending(p => p.CreatedDate)
                        select bi;

            if (!string.IsNullOrEmpty(billingSearchDTO.ContractName))
            {
                var _contract = _context.TblContract.SingleOrDefault(x => x.ContractName == billingSearchDTO.ContractName);
                _bill = _bill.Where(bi => bi.ContractId == _contract.ContractId);
            }


            if (billingSearchDTO.BillingConfigId > 0)
            {
                _bill = _bill.Where(bi => bi.BillingConfigId == billingSearchDTO.BillingConfigId);

            }
            if (billingSearchDTO.ContractId > 0)
            {
                _bill = _bill.Where(bi => bi.ContractId == billingSearchDTO.ContractId);
            }
            if (billingSearchDTO.BillingStartDate.HasValue)
            {
                _bill = _bill.Where(pr => pr.BillingStartDate.Value.Date == billingSearchDTO.BillingStartDate.Value.Date);
            }
            if (billingSearchDTO.BillingEndDate.HasValue)
            {
                _bill = _bill.Where(pr => pr.BillingEndDate.Value.Date == billingSearchDTO.BillingEndDate.Value.Date);
            }


            var _billingsearchdto = _mapper.Map<IEnumerable<BillingConfigDTO>>(_bill);
            foreach (var item in _billingsearchdto)
            {
                item.BillingConfigId = item.BillingConfigId;
                item.ContractId = item.ContractId;
                item.BillingStartDate = item.BillingStartDate;
                item.BillingEndDate = item.BillingEndDate;
            }
            return _billingsearchdto;
        }


        public async Task<List<BillingItemDetailDTO>> SaveBillingItemDetails(BillingIDetailDTO billingitemdetail, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var bill = _mapper.Map<List<TblBillingItemDetail>>(billingitemdetail.BillingitemAdd);

                _context.TblBillingItemDetail.AddRange(bill);
                _context.SaveChanges();
                var _billingitemdetail = _mapper.Map<List<BillingItemDetailDTO>>(bill);
                return _billingitemdetail;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ContractDTO>> SearchContract(ContractDTO contractdto, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var _contract = from pr in _context.TblContract.OrderByDescending(p => p.CreatedDate)
                            select pr;

            if (contractdto.ContractId > 0)
            {
                _contract = _contract.Where(pr => pr.ContractId == contractdto.ContractId);

            }
            if (!string.IsNullOrEmpty(contractdto.ContractName))
            {
                _contract = _contract.Where(pr => pr.ContractName.Contains(contractdto.ContractName));
            }

            if (contractdto.ContractEffectiveDate.HasValue)
            {
                _contract = _contract.Where(pr => pr.ContractEffectiveDate.Value.Date == contractdto.ContractEffectiveDate.Value.Date);
            }
            if (contractdto.ContractEndDate.HasValue)
            {
                _contract = _contract.Where(pr => pr.ContractEndDate.Value.Date == contractdto.ContractEndDate.Value.Date);
            }


            var _contractSearchDTOs = _mapper.Map<IEnumerable<ContractDTO>>(_contract);
            foreach (var item in _contractSearchDTOs)
            {
                item.ContractId = item.ContractId;
                item.ContractName = item.ContractName;
                item.ContractEffectiveDate = item.ContractEffectiveDate;
                item.ContractEndDate = item.ContractEndDate;
            }
            return _contractSearchDTOs;
        }

        public async Task<IEnumerable<ContractDTO>> SearchContractById(int contractid, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ContractDTO> scontract = _context.TblContract.Where(a => a.ContractId == contractid)
                            .Select(c => new ContractDTO
                            {
                                ContractName = c.ContractName,
                                ContractId = c.ContractId,
                                ContractEffectiveDate = c.ContractEffectiveDate,
                                ContractEndDate = c.ContractEndDate,
                            });


            var contractdata = _mapper.Map<IEnumerable<ContractDTO>>(scontract);
            return contractdata;
        }

        public async Task<String> GetObjectEvent(int obj, int eve, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var str1 = _context.TblObjects.First(c => c.ObjectId == obj).ObjectName;
            var str2 = _context.TblEvents.First(b => b.EventId == eve).EventName;
            //select a.ObjectName,b.EventName from[BI].[tblObjects] a, [BI].[tblEvents] b where a.ObjectId=b.ObjectId
            string str = str1 + " " + str2;
            return str;

        }

        public async Task<List<string>> GetObjectEventMapping(int obj, int eve, ApiContext apiContext)
        {
            //int str = from a in _context.TblObjectEventMapping.OrderByDescending(x => x.CreatedBy)
            //          join o in _context.TblObjects on a.ObjectId equals o.ObjectId
            //          join e in _context.TblEvents on a.EventId equals e.EventId
            //          select a.EventMappingId;
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var str = _context.TblObjectEventMapping.Where(x => x.ObjectId == obj && x.EventId == eve).Select(x => new { x.EventMappingId, x.Description }).SingleOrDefault();

            List<string> Mapdata = new List<string>();

            Mapdata.Add(str.EventMappingId.ToString());
            Mapdata.Add(str.Description);
            return Mapdata;
        }
        public async Task<IQueryable<String>> GetEventMapping(int mappingid, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var mapdescription = _context.TblObjectEventMapping.Where(x => x.EventMappingId == mappingid).Select(x => x.Description);
            return mapdescription;

        }

        public async Task<CustomerResponse> SaveCustomerAsync(CustomersDTO Customerdto, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //try
            //{
            //var dtomap = _mapper.Map<CustomersDTO>(Customerdto);
            var _tblCustomer = _mapper.Map<TblCustomers>(Customerdto);

            _tblCustomer.CategoryId = 1;
            _tblCustomer.TypeId = 6;
            _tblCustomer.ConfigurationTypeId = 3;
            _tblCustomer.CorpAddressSameAs = "R";
            _tblCustomer.MailingAddressSameAs = "C";
            // EventRequest.Logo = ;
            //EventRequest.Levels = ;

            //InvoiceConfigDTO invoice = new InvoiceConfigDTO();
            //invoice = Customerdto.Contract.TblInvoiceConfig;

            _context.TblCustomers.Add(_tblCustomer);

            _context.SaveChanges();
            var Customer = _mapper.Map<CustomersDTO>(_tblCustomer);
            //return Customer;

            var orgdto = _mapper.Map<OrganizationDTO>(Customer);
            var ps = await _integrationService.SaveCustomerAsync(orgdto, apiContext);
            //var cust = _mapper.Map<CustomersDTO>(ps);
            //return Customer;
            return new CustomerResponse() { Status = BusinessStatus.Created, Id = Customerdto.CustomerId.ToString(), customer = Customerdto, ResponseMessage = $"Customer : {Customerdto.CustomerName} created successfully" };
            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}

        }

        public async Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var _customer = _context.TblCustomers.Where(item => item.CustomerId == Customerid)
                   .Include(add => add.TblCustAddress)
                   .Include(a => a.TblCustSpocDetails)
                   .Include(c => c.TblContract)
                   .Include("TblContract.TblBillingConfig")
                   .Include("TblContract.TblBillingConfig.TblBillingItem")
                   .Include("TblContract.TblBillingConfig.TblBillingItem.TblBillingItemDetail")
                   .Include("TblContract.TblInvoiceConfig")
                   .SingleOrDefault();
            var contractdata = _mapper.Map<CustomersDTO>(_customer);
            return contractdata;
        }
        public async Task<CustomersDTO> ModifyCustomer(CustomersDTO customerDto, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var tbl_cust = _mapper.Map<TblCustomers>(customerDto);

                _context.TblCustomers.Update(tbl_cust);
                _context.SaveChanges();
                var paymentDTO = _mapper.Map<CustomersDTO>(tbl_cust);
                return paymentDTO;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<InvoiceConfigDTO> ModifyInvoice(InvoiceConfigDTO invoiceData, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var tbl_inv = _mapper.Map<TblInvoiceConfig>(invoiceData);

                _context.TblInvoiceConfig.Update(tbl_inv);
                _context.SaveChanges();
                var invoiceDTO = _mapper.Map<InvoiceConfigDTO>(tbl_inv);
                return invoiceDTO;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IEnumerable<ObjectsDTO>> GetObjectParameter(ApiContext context)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(context.ProductType, context.ServerType));
            var data = _context.TblObjects;
            var dtoObject = _mapper.Map<IList<ObjectsDTO>>(data);
            return dtoObject;
        }


        public async Task<BillingConfigDTO> GetBillingById(decimal billingconfigid, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var _billingconfig = _context.TblBillingConfig.Where(item => item.ContractId == billingconfigid)
                   .Include(add => add.TblBillingItem)
                   .Include("TblBillingItem.TblBillingItemDetail")
                        .SingleOrDefault();
            var contractdata = _mapper.Map<BillingConfigDTO>(_billingconfig);
            return contractdata;
        }

        //Payment
        public async Task<List<PaymentDTO>> CreatePayment(PaymentListDTO paymentDto, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var _tblpayment = _mapper.Map<List<TblPayment>>(paymentDto.payment);
                _context.TblPayment.AddRange(_tblpayment);

                _context.SaveChanges();
                var Paymentitem = _mapper.Map<List<PaymentDTO>>(_tblpayment);
                return Paymentitem;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IEnumerable<PaymentHistoryDTO>> GetPaymentByInvoiceId(int invoiceId, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            // var _Payment = _context.TblPayment.Where(x => x.InvoiceId == invoiceId).Select(x => x);

            var _Payment = (from p in _context.TblPayment.Where(x => x.InvoiceId == invoiceId)
                            select new PaymentHistoryDTO
                            {
                                PaymentId = p.PaymentId,
                                PaymentTypeId = p.PaymentTypeId,
                                BankName = p.BankName,
                                IfscCode = p.IfscCode,
                                PaymentRefId = p.PaymentRefId,
                                Paymentamount = p.Paymentamount,
                                PaymentDate = p.PaymentDate,
                                RealisedDate = p.RealisedDate,
                                StatusId = p.StatusId,
                            }).ToList();

            var CommonTypeData = _context.TblmasBicommonTypes.Select(x => x);

            Dictionary<int?, string> CommonTypeStatus = new Dictionary<int?, string>();
            Dictionary<int?, string> CommonPaymentType = new Dictionary<int?, string>();
            foreach (var item in _Payment)
            {

                if (item.StatusId != 0)
                {
                    var check = CommonTypeStatus.Where(x => x.Key == item.StatusId).Any();
                    if (!check)
                    {
                        var data1 = CommonTypeData.SingleOrDefault(x => x.CommonTypeId == item.StatusId);

                        CommonTypeStatus.Add(item.StatusId, data1.Value);
                    }
                }
                if (item.PaymentTypeId != 0)
                {
                    var check = CommonPaymentType.Where(x => x.Key == item.PaymentTypeId).Any();
                    if (!check)
                    {
                        var data2 = CommonTypeData.SingleOrDefault(x => x.CommonTypeId == item.PaymentTypeId);

                        CommonPaymentType.Add(item.PaymentTypeId, data2.Value);
                    }
                }
            }
            foreach (var item in _Payment)
            {

                if (item.StatusId != 0)
                {
                    item.Status = CommonTypeStatus[item.StatusId];
                }
                if (item.PaymentTypeId != 0)
                {
                    item.PaymentType = CommonPaymentType[item.PaymentTypeId];
                }
            }

            var paymentData = _mapper.Map<IEnumerable<PaymentHistoryDTO>>(_Payment);

            return paymentData;
        }
        public async Task<IEnumerable<CustomerSearchDTO>> CustomerSearch(CustomerSearchDTO customersDTO, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var _cust = (from cust in _context.TblCustomers.OrderByDescending(x => x.CreatedDate)
                         join cont in _context.TblContract on cust.CustomerId equals cont.CustomerId
                         select new CustomerSearchDTO
                         {
                             CustomerName = cust.CustomerName,
                             CustomerId = cust.CustomerId,
                             ContractName = cont.ContractName,
                             ContractId = cont.ContractId

                         });

            if (customersDTO.CustomerId != 0)
            {
                _cust = _cust.Where(x => x.CustomerId == customersDTO.CustomerId);
            }
            if (!string.IsNullOrEmpty(customersDTO.CustomerName))
            {
                _cust = _cust.Where(x => x.CustomerName == customersDTO.CustomerName);
            }

            if (!string.IsNullOrEmpty(customersDTO.ContractName))
            {
                _cust = _cust.Where(x => x.ContractName == customersDTO.ContractName);
            }

            return _cust;
        }

        public async Task<CustomerResponse> CustomerNamevalidation(string Name, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var data = _context.TblCustomers.Any(e => e.CustomerName == Name);

            if (data == true)
            {
                return new CustomerResponse() { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Customer Name {Name} already taken" };
            }
            else
            {
                return new CustomerResponse() { Status = BusinessStatus.Ok, ResponseMessage = $"ok " };
            }
        }

        public async Task<CustomerConfigDTO> CreateCustomerConfig(CustomerConfigDTO configDTO, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var _tblconfig = _mapper.Map<TblCustomerConfig>(configDTO);
                _context.TblCustomerConfig.AddRange(_tblconfig);

                _context.SaveChanges();
                var Configitem = _mapper.Map<CustomerConfigDTO>(_tblconfig);
                return Configitem;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public async Task<PaymentDTO> UpdatePaymentStatus(PaymentDTO pay, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var tbl_pay = _mapper.Map<TblPayment>(pay);
                var tbl_payment = _context.TblPayment.Find(tbl_pay.PaymentId);

                if (tbl_payment == null)
                    throw new AppException("Record not found");

                // update user billing

                tbl_payment.StatusId = pay.StatusId;
                if (pay.StatusId == 22)
                {
                    var invoice = _context.TblInvoice.Find(tbl_payment.InvoiceId);
                    invoice.PaymentRecd = invoice.PaymentRecd + tbl_payment.Paymentamount;
                    invoice.Balance = invoice.InvAmount - invoice.PaymentRecd;
                    _context.TblInvoice.Update(invoice);
                    _context.SaveChanges();
                }
                _context.TblPayment.Update(tbl_payment);
                _context.SaveChanges();
                var paymentDTO = _mapper.Map<PaymentDTO>(tbl_pay);
                return paymentDTO;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CustomerConfigDTO> UploadCustConfigImage(CustomerConfigDTO contractimg, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var tbl_pay = _mapper.Map<TblCustomerConfig>(contractimg);
                var tbl_payment = _context.TblCustomerConfig.Find(tbl_pay.CustConfigId);

                if (tbl_payment == null)
                    throw new AppException("Record not found");

                // update user billing

                tbl_payment.Image = contractimg.Image;

                _context.TblCustomerConfig.Update(tbl_payment);
                _context.SaveChanges();
                var paymentDTO = _mapper.Map<CustomerConfigDTO>(tbl_pay);
                return paymentDTO;
            }
            catch (Exception ex)
            {
                //Response.Status = BusinessStatus.Error;
                //Response.ResponseMessage = ex.Message;
                throw ex;

            }
        }
        public async Task<CustomersDTO> UploadCustLogo(CustomersDTO CustomerLogo, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var tbl_pay = _mapper.Map<TblCustomers>(CustomerLogo);
                var tbl_payment = _context.TblCustomers.Find(tbl_pay.CustomerId);

                if (tbl_payment == null)
                    throw new AppException("Record not found");

                // update user billing

                tbl_payment.Logo = CustomerLogo.Logo;

                _context.TblCustomers.Update(tbl_payment);
                _context.SaveChanges();
                var paymentDTO = _mapper.Map<CustomersDTO>(tbl_pay);
                return paymentDTO;
            }
            catch (Exception ex)
            {
                //Response.Status = BusinessStatus.Error;
                //Response.ResponseMessage = ex.Message;
                throw ex;

            }
        }

        // Save Invoice config(Create Invoice)
        public async Task<InvoiceConfigDTO> CreateInvoice(InvoiceConfigDTO invoiceConfig, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var invoice = _mapper.Map<TblInvoiceConfig>(invoiceConfig);

                _context.TblInvoiceConfig.Add(invoice);
                _context.SaveChanges();
                invoiceConfig = _mapper.Map<InvoiceConfigDTO>(invoice);
                return invoiceConfig;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // Save Create Contract to database(Create Contract)
        public async Task<ContractDTO> CreateContract(ContractDTO contract, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                //CustomersDTO customers = new CustomersDTO();
                //contract.CustomerId = 3;
                var tblContract = _mapper.Map<TblContract>(contract);
                _context.TblContract.Add(tblContract);
                _context.SaveChanges();
                contract = _mapper.Map<ContractDTO>(tblContract);
                return contract;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // To get data from data base and show in grid
        public async Task<IEnumerable<ContractHistoryDetails>> GetContractHistory(decimal customerId, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var customer = _context.TblCustomers.Where(c => c.CustomerId == customerId);
                var history = from contract in _context.TblContract
                              join contractDoc in _context.TblContractDoc on contract.ContractId equals contractDoc.ContractId
                              join masBicommonTypes in _context.TblmasBicommonTypes on contract.CurrencyId equals masBicommonTypes.CommonTypeId
                              join customers in _context.TblCustomers on contract.CustomerId equals customers.CustomerId
                              select new ContractHistoryDetails
                              {
                                  CustomerId = customers.CustomerId,
                                  ContractId = contract.ContractId,
                                  DocumentName = contractDoc.DocumentName,
                                  CustomerName = customers.CustomerName,
                                  CreatedDate = contract.CreatedDate,
                                  ContractEffectiveDate = contract.ContractEffectiveDate,
                                  ContractEndDate = contract.ContractEndDate,
                                  Currency = masBicommonTypes.Value,
                                  MaxCreditAmountAllowed = contract.MaxCreditAmountAllowed,
                                  MaxCreditPeriod = contract.MaxCreditPeriod,
                                  GracePeriod = contract.GracePeriod,
                                  Pono = contract.Pono,
                                  Podate = contract.Podate
                              };
                var _history = _mapper.Map<IEnumerable<ContractHistoryDetails>>(history);

                return _history;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ContractDocDTO> UploadFiles(ContractDocDTO contractDoc, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //_context = (MICACMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            //var claimdetails = _context.TblClaimdoc.SingleOrDefault(x => x.ClaimId == ClaimId);

            ContractDocDTO contractDocDTO = new ContractDocDTO();

            contractDocDTO.DocumentStr = contractDoc.DocumentStr;
            contractDocDTO.DocumentName = contractDoc.DocumentName;
            contractDocDTO.ContractId = contractDoc.ContractId;
            contractDocDTO.CreatedDate = contractDoc.CreatedDate;
            contractDocDTO.UploadDate = DateTime.Now;
            var ContractDoc = _mapper.Map<TblContractDoc>(contractDocDTO);

            _context.TblContractDoc.Add(ContractDoc);
            _context.SaveChanges();
            var _upload = _mapper.Map<ContractDocDTO>(ContractDoc);
            _upload.Status = BusinessStatus.Created;
            _upload.ResponseMessage = "document uploaded";
            return _upload;
            //return "Üpload SuccessFul";
        }

        //view the uploaded document
        public async Task<IEnumerable<ContractDocDTO>> DocumentView(decimal ContractId, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var tblContractDoc = _context.TblContractDoc.Where(s => s.ContractId == ContractId).ToList();
            if (tblContractDoc != null)
            {
                var contractDocDTO = _mapper.Map<IEnumerable<ContractDocDTO>>(tblContractDoc);
                return contractDocDTO;
            }
            return null;
        }
        // Save Invoice config(Create Invoice)
        public async Task<InvoiceConfigDTO> CreateInvoiceConfig(InvoiceConfigDTO invoiceConfig, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var invoice = _mapper.Map<TblInvoiceConfig>(invoiceConfig);

                _context.TblInvoiceConfig.Add(invoice);
                _context.SaveChanges();
                invoiceConfig = _mapper.Map<InvoiceConfigDTO>(invoice);
                return invoiceConfig;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // To get data from data base and show in grid
        public async Task<IEnumerable<InvoiceConfigHistory>> GetInvoiceConfigHistory(ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var history = from invoice in _context.TblInvoiceConfig
                              join masBicommonTypes in _context.TblmasBicommonTypes on invoice.FrequencyId equals masBicommonTypes.CommonTypeId
                              select new
                              {
                                  Frequency = masBicommonTypes.Value,
                                  InvoiceCreditPeriod = invoice.InvoiceCreditPeriod,
                                  InvoiceGracePeriod = invoice.InvoiceGracePeriod,
                                  InvoiceStartDate = invoice.InvoiceStartDate,
                                  InvoiceEndDate = invoice.InvoiceEndDate,
                              };
                var _history = _mapper.Map<List<InvoiceConfigHistory>>(history);
                return _history;
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        // Save Search Invoice (Create Invoice)
        public async Task<InvoiceDTO> SearchInvoice(InvoiceDTO invoiceDto, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                //CustomersDTO customers = new CustomersDTO();
                invoiceDto.InvoiceConfigId = 1;
                var invoice = _mapper.Map<TblInvoice>(invoiceDto);

                _context.TblInvoice.Add(invoice);
                _context.SaveChanges();
                var invoiceData = _mapper.Map<InvoiceDTO>(invoice);
                return invoiceData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //To get data from data base and show in grid for Search Invoice table
        public async Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceHistory(InvoiceContractSearch invoiceContractSearch, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            InvoiceSearchHistory invoiceSearchHistory = new InvoiceSearchHistory();

            string[] lstStatus = new string[] { "InvoiceStatus" };
            var masterList = _context.TblmasBicommonTypes.Where(p => lstStatus.Contains(p.MasterType))
                              .ToDictionary(m => m.CommonTypeId, n => n.Value);
            try
            {
                //int defaultValue = 0;
                var history = from tblinvoice in _context.TblInvoice
                              join tblcontract in _context.TblContract on tblinvoice.ContractId equals tblcontract.ContractId
                              join tblcustomers in _context.TblCustomers on tblcontract.CustomerId equals tblcustomers.CustomerId
                              join tblinvoiceConfig in _context.TblInvoiceConfig on tblinvoice.InvoiceConfigId equals tblinvoiceConfig.InvoiceConfigId
                              join tblmasBicommonTypes in _context.TblmasBicommonTypes on tblinvoice.StatusId equals tblmasBicommonTypes.CommonTypeId
                              join tblbillingconfig in _context.TblBillingConfig on tblinvoice.ContractId equals tblbillingconfig.ContractId
                              join tblmasBicommonTypess in _context.TblmasBicommonTypes on tblbillingconfig.CurrencyId equals tblmasBicommonTypess.CommonTypeId
                              join tblinvoicePenalty in _context.TblInvoicePenalty on tblinvoice.InvoiceId equals tblinvoicePenalty.InvoiceId into penaltyData
                              from pd in penaltyData.DefaultIfEmpty()
                              select new InvoiceSearchHistory
                              {
                                  ContractName = tblcontract.ContractName,
                                  CreatedDate = tblinvoice.InvoiceDate,
                                  InvoiceNo = tblinvoice.InvoiceNo,
                                  InvoiceEffectiveDate = tblinvoiceConfig.InvoiceStartDate,
                                  InvoiceEndDate = tblinvoiceConfig.InvoiceEndDate,
                                  InvoiceId = tblinvoice.InvoiceId,
                                  ContractId = tblinvoice.ContractId,
                                  InvoiceDate = tblinvoice.InvoiceDate,
                                  CreditDaysRemaining = tblinvoiceConfig.InvoiceGracePeriod + tblinvoiceConfig.InvoiceCreditPeriod,
                                  Currency = tblmasBicommonTypess.Value,
                                  InvAmount = (decimal)tblinvoice.InvAmount,
                                  Balance = tblinvoice.Balance,
                                  Status = tblmasBicommonTypes.Value,
                                  StatusId = tblmasBicommonTypes.CommonTypeId,
                                  Paid = tblinvoice.InvAmount - tblinvoice.Balance,
                                  OrgName = tblcustomers.CustomerName,
                                  DueDate = tblinvoice.DueDate,
                                  DefaultDays = tblinvoice.DefaultDays,
                                  PenaltyRate = tblinvoiceConfig.PenaltyPercentage,
                                  PenaltyCalculation = tblinvoice.InvAmount - tblinvoice.Balance,
                                  PenaltyAmount = (invoiceSearchHistory.PenaltyCalculation == 0) ? 0 : tblinvoice.Balance * tblinvoiceConfig.PenaltyPercentage / 100,
                                  RevisedInvoiceAmount = tblinvoice.InvAmount + tblinvoice.PenaltyAmount,
                                  UserId = tblinvoice.CreatedUserId,
                                  ModifiedDate = DateTime.Now,
                                  RevisedPenaltyRate = pd.PenaltyRate,
                                  RevisedPenaltyAmount = pd.PenaltyAmount,
                                  RevisedInvoiceAmountGrid = pd.RevisedInvAmount,
                                  UserName = ""
                              };

                //foreach (var ht in history)
                //{
                //    var UserData = await _integrationService.GetUserNameById(ht.UserId, apiContext);
                //    ht.UserName = UserData.UserName;
                //    //invoiceSearchHistory.UserName = UserData.UserName;
                //}

                if (invoiceContractSearch.InvoiceId > 0)
                {
                    history = history.Where(s => s.InvoiceId == invoiceContractSearch.InvoiceId);
                }

                if (!string.IsNullOrEmpty(invoiceContractSearch.CustomerName))
                {
                    history = history.Where(s => s.OrgName.Contains(invoiceContractSearch.CustomerName));
                }

                if (invoiceContractSearch.InvoiceNo != "")
                {
                    history = history.Where(s => s.InvoiceNo == invoiceContractSearch.InvoiceNo);
                }

                if (invoiceContractSearch.StatusId > 0)
                {
                    history = history.Where(s => s.StatusId == invoiceContractSearch.StatusId);
                }

                if (invoiceContractSearch.InvoiceEffectiveDate.HasValue && invoiceContractSearch.InvoiceEndDate.HasValue)
                {
                    history = history.Where(s => (s.CreatedDate >= invoiceContractSearch.InvoiceEffectiveDate && s.CreatedDate <= invoiceContractSearch.InvoiceEndDate));
                }
                else if (invoiceContractSearch.InvoiceEffectiveDate.HasValue)
                {
                    history = history.Where(s => s.CreatedDate >= invoiceContractSearch.InvoiceEffectiveDate);
                }

                else if (invoiceContractSearch.InvoiceEndDate.HasValue)
                {
                    history = history.Where(s => s.CreatedDate <= invoiceContractSearch.InvoiceEndDate);
                }

                var _history = _mapper.Map<List<InvoiceSearchHistory>>(history);
                foreach (var item in _history)
                {
                    item.InvoiceId = item.InvoiceId;
                    item.InvoiceNo = item.InvoiceNo;
                    item.Status = masterList.FirstOrDefault(p => p.Key == item.StatusId).Value;
                    item.OrgName = item.OrgName;
                    item.InvoiceEffectiveDate = item.InvoiceEffectiveDate;
                    item.InvoiceEndDate = item.InvoiceEndDate;
                }
                return _history;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //To get data from data base and show in grid for Search Invoice table--for inube Customer
        public async Task<IEnumerable<InvoiceSearchHistory>> GetSearchInvoiceForCustomer(InvoiceCustSearch invoiceCustSearch, ApiContext apiContext)
        {
            //if (invoiceCustSearch.EnvId > 0)
            //{
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //}
            //else
            //{
            //    _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //}

            InvoiceSearchHistory invoiceSearchHistory = new InvoiceSearchHistory();

            string[] lstStatus = new string[] { "InvoiceStatus" };
            var masterList = _context.TblmasBicommonTypes.Where(p => lstStatus.Contains(p.MasterType))
                              .ToDictionary(m => m.CommonTypeId, n => n.Value);
            try
            {
                //int defaultValue = 0;
                var history = from tblinvoice in _context.TblInvoice
                              join tblcontract in _context.TblContract on tblinvoice.ContractId equals tblcontract.ContractId
                              join tblcustomers in _context.TblCustomers on tblcontract.CustomerId equals tblcustomers.CustomerId
                              join tblinvoiceConfig in _context.TblInvoiceConfig on tblinvoice.InvoiceConfigId equals tblinvoiceConfig.InvoiceConfigId
                              join tblmasBicommonTypes in _context.TblmasBicommonTypes on tblinvoice.StatusId equals tblmasBicommonTypes.CommonTypeId
                              join tblbillingconfig in _context.TblBillingConfig on tblinvoice.ContractId equals tblbillingconfig.ContractId
                              join tblmasBicommonTypess in _context.TblmasBicommonTypes on tblbillingconfig.CurrencyId equals tblmasBicommonTypess.CommonTypeId
                              join tblinvoicePenalty in _context.TblInvoicePenalty on tblinvoice.InvoiceId equals tblinvoicePenalty.InvoiceId into penaltyData
                              from pd in penaltyData.DefaultIfEmpty()
                                  // where (invoiceCustSearch.OrgId == apiContext.OrgId)
                              select new InvoiceSearchHistory
                              {
                                  ContractName = tblcontract.ContractName,
                                  CreatedDate = tblinvoice.InvoiceDate,
                                  InvoiceNo = tblinvoice.InvoiceNo,
                                  InvoiceEffectiveDate = tblinvoiceConfig.InvoiceStartDate,
                                  InvoiceEndDate = tblinvoiceConfig.InvoiceEndDate,
                                  InvoiceId = tblinvoice.InvoiceId,
                                  ContractId = tblinvoice.ContractId,
                                  InvoiceDate = tblinvoice.InvoiceDate,
                                  CreditDaysRemaining = tblinvoiceConfig.InvoiceGracePeriod + tblinvoiceConfig.InvoiceCreditPeriod,
                                  Currency = tblmasBicommonTypess.Value,
                                  InvAmount = (decimal)tblinvoice.InvAmount,
                                  Balance = tblinvoice.Balance,
                                  Status = tblmasBicommonTypes.Value,
                                  StatusId = tblmasBicommonTypes.CommonTypeId,
                                  Paid = tblinvoice.InvAmount - tblinvoice.Balance,
                                  OrgName = tblcustomers.CustomerName,
                                  DueDate = tblinvoice.DueDate,
                                  DefaultDays = tblinvoice.DefaultDays,
                                  PenaltyRate = tblinvoiceConfig.PenaltyPercentage,
                                  PenaltyCalculation = tblinvoice.InvAmount - tblinvoice.Balance,
                                  PenaltyAmount = (invoiceSearchHistory.PenaltyCalculation == 0) ? 0 : tblinvoice.Balance * tblinvoiceConfig.PenaltyPercentage / 100,
                                  RevisedInvoiceAmount = tblinvoice.InvAmount + tblinvoice.PenaltyAmount,
                                  UserId = tblinvoice.CreatedUserId,
                                  ModifiedDate = DateTime.Now,
                                  RevisedPenaltyRate = pd.PenaltyRate,
                                  RevisedPenaltyAmount = pd.PenaltyAmount,
                                  RevisedInvoiceAmountGrid = pd.RevisedInvAmount,
                                  UserName = "",
                                  CustId = tblcustomers.CustomerId
                              };

                //foreach (var ht in history)
                //{
                //    var UserData = await _integrationService.GetUserNameById(ht.UserId, apiContext);
                //    ht.UserName = UserData.UserName;
                //    //invoiceSearchHistory.UserName = UserData.UserName;
                //}
                if (apiContext.OrgId > 0)
                {
                    history = history.Where(pr => pr.CustId == apiContext.OrgId);
                }

                //if (invoiceCustSearch.InvoiceId > 0)
                //{
                //    history = history.Where(s => s.InvoiceId == invoiceCustSearch.InvoiceId);
                //}
                if (apiContext.OrgId > 0 && invoiceCustSearch.InvoiceId > 0)
                {
                    history = history.Where(pr => pr.CustId == apiContext.OrgId && pr.InvoiceId == invoiceCustSearch.InvoiceId);
                }

                if (apiContext.OrgId > 0 && !string.IsNullOrEmpty(invoiceCustSearch.CustomerName))
                {
                    history = history.Where(pr => pr.CustId == apiContext.OrgId && pr.OrgName.Contains(invoiceCustSearch.CustomerName));
                }

                if (apiContext.OrgId > 0 && invoiceCustSearch.InvoiceNo != "")
                {
                    history = history.Where(pr => pr.CustId == apiContext.OrgId && pr.InvoiceNo == invoiceCustSearch.InvoiceNo);
                }

                if (apiContext.OrgId > 0 && invoiceCustSearch.StatusId > 0)
                {
                    history = history.Where(pr => pr.CustId == apiContext.OrgId && pr.StatusId == invoiceCustSearch.StatusId);
                }

                if (apiContext.OrgId > 0 && invoiceCustSearch.InvoiceEffectiveDate.HasValue && invoiceCustSearch.InvoiceEndDate.HasValue)
                {
                    history = history.Where(pr => pr.CustId == apiContext.OrgId && (pr.CreatedDate >= invoiceCustSearch.InvoiceEffectiveDate && pr.CreatedDate <= invoiceCustSearch.InvoiceEndDate));
                }
                else if (apiContext.OrgId > 0 && invoiceCustSearch.InvoiceEffectiveDate.HasValue)
                {
                    history = history.Where(pr => pr.CustId == apiContext.OrgId && pr.CreatedDate >= invoiceCustSearch.InvoiceEffectiveDate);
                }

                else if (apiContext.OrgId > 0 && invoiceCustSearch.InvoiceEndDate.HasValue)
                {
                    history = history.Where(pr => pr.CustId == apiContext.OrgId && pr.CreatedDate <= invoiceCustSearch.InvoiceEndDate);
                }

                var _history = _mapper.Map<List<InvoiceSearchHistory>>(history);
                foreach (var item in _history)
                {
                    item.InvoiceId = item.InvoiceId;
                    item.InvoiceNo = item.InvoiceNo;
                    item.Status = masterList.FirstOrDefault(p => p.Key == item.StatusId).Value;
                    item.OrgName = item.OrgName;
                    item.InvoiceEffectiveDate = item.InvoiceEffectiveDate;
                    item.InvoiceEndDate = item.InvoiceEndDate;
                }
                return _history;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Save the regenerated invoice in InvoicePenalty table
        public async Task<InvoicePenaltyDTO> CreateRegenerateInvoice(InvoicePenaltyDTO invoicePenalty, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {

                var invoice = _mapper.Map<TblInvoicePenalty>(invoicePenalty);

                _context.TblInvoicePenalty.Add(invoice);
                _context.SaveChanges();

                var result = _context.TblInvoice.SingleOrDefault(x => x.InvoiceId == invoicePenalty.InvoiceId);//To save the invAmount in Invoice table as well(from InvoicePenalty table)
                result.InvAmount = (decimal)invoicePenalty.RevisedInvAmount;
                _context.SaveChanges();
                var _invoice = _mapper.Map<InvoicePenaltyDTO>(invoice);
                return _invoice;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Search customer based on customer Id
        public async Task<IEnumerable<CustomersDTO>> SearchCustomer(decimal customerId, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<CustomersDTO> scustomer = _context.TblCustomers.Where(a => a.CustomerId == customerId)
                           .Select(c => new CustomersDTO
                           {
                               CustomerName = c.CustomerName,
                               CustomerId = c.CustomerId,
                           });


            var customerdata = _mapper.Map<IEnumerable<CustomersDTO>>(scustomer);
            return customerdata;
        }

        //Get the list of contractId between InvoiceStartDate and InvoiceEndDate

        public async Task<InvoiceResponse> GenerateInvoiceAsync(InvoiceRequest invoiceRequest, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                if (invoiceRequest.InvoiceStartDate != null && invoiceRequest.InvoiceEndDate != null)
                {
                    // Get the list of ContractId
                    var invoiceSearch = _context.TblInvoiceConfig
                        //.Where(i => i.InvoiceStartDate >= invoiceRequest.InvoiceStartDate && i.InvoiceEndDate <= invoiceRequest.InvoiceEndDate && i.FrequencyId==invoiceRequest.FrequencyId).
                        .Where(i => i.InvoiceStartDate >= invoiceRequest.InvoiceStartDate && i.InvoiceEndDate <= invoiceRequest.InvoiceEndDate).
                        Select(i => new InvoiceConfigDTO
                        {
                            ContractId = i.ContractId,
                            InvoiceConfigId = i.InvoiceConfigId,
                        });
                    // Get the Billing list based on  ContractId
                    if (invoiceSearch.ToList().Count > 0)
                    {
                        var contractId = _context.TblContract.SingleOrDefault(s => s.CustomerId == invoiceRequest.CustomerId).ContractId;//To get particular contract ( matching for invoice config & billing config dates) for the inputed customer
                        var validInvoice = _context.TblInvoiceConfig.SingleOrDefault(p => p.ContractId == contractId);
                        var validInvoiceDTO = _mapper.Map<InvoiceConfigDTO>(validInvoice);

                        //If invoice is getting generated for 1st time
                        if (validInvoice.LastCycleExecDate == null)
                        {
                            var invoice = await GetInvoiceBillingDetailsAsync(invoiceRequest, validInvoiceDTO, apiContext);
                            if (invoice != null)
                            {
                                return new InvoiceResponse() { Status = BusinessStatus.Created, invoice = invoice, ResponseMessage = $"{invoice.TblInvoice.Count} number of Invoive Generated successfully " };
                            }
                            return new InvoiceResponse { Status = BusinessStatus.Error, ResponseMessage = "Some Error Occured" };
                        }

                        //If invoice is generated in middle of start date and end date
                        else if (validInvoice.LastCycleExecDate > invoiceRequest.InvoiceStartDate && validInvoice.LastCycleExecDate < invoiceRequest.InvoiceEndDate)
                        {
                            invoiceRequest.InvoiceStartDate = validInvoice.LastCycleExecDate;
                            var invoice = await GetInvoiceBillingDetailsAsync(invoiceRequest, validInvoiceDTO, apiContext);
                            if (invoice != null)
                            {
                                return new InvoiceResponse() { Status = BusinessStatus.Created, invoice = invoice, ResponseMessage = $"{invoice.TblInvoice.Count} number of Invoive Generated successfully " };
                            }
                            return new InvoiceResponse { Status = BusinessStatus.Error, ResponseMessage = "Some Error Occured" };
                        }

                        //If invoice is already generated
                        else
                        {
                            return new InvoiceResponse { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Invoice already generated for {invoiceRequest.InvoiceStartDate} and {invoiceRequest.InvoiceEndDate} " };
                        }
                    }

                    return new InvoiceResponse { Status = BusinessStatus.PreConditionFailed, ResponseMessage = "No records exist for invoice." };
                }
                else
                {
                    return new InvoiceResponse { Status = BusinessStatus.InputValidationFailed, ResponseMessage = "Date field cannot be null" };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<InvoiceConfigDTO> GetInvoiceBillingDetailsAsync(InvoiceRequest invoiceRequest, InvoiceConfigDTO lstInvoiceConfig, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            InvoiceDTO invoiceDto = new InvoiceDTO();
            InvoiceConfigDTO invoiceConfigDto = new InvoiceConfigDTO();
            InvoiceDetailDTO invoiceDetailDto = new InvoiceDetailDTO();
            BillingItemDTO billingItemDto = new BillingItemDTO();

            try
            {

                // //foreach (var item in lstInvoiceConfig)
                // //{
                var billingSearch = _context.TblBillingConfig.Where(b => b.ContractId == lstInvoiceConfig.ContractId);
                // var billingSearch = _context.TblBillingConfig.Where(b => b.BillingConfigId == 228);

                foreach (var bItem in billingSearch)
                {
                    //var invoice = await SaveBillingInvoiceAsync(bItem.BillingConfigId, invoiceRequest, item, apiContext);
                    invoiceDto = await SaveBillingInvoiceAsync(bItem.BillingConfigId, invoiceRequest, lstInvoiceConfig, apiContext);
                    invoiceConfigDto.TblInvoice.Add(invoiceDto);
                }
                return invoiceConfigDto;
                //}
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        //Verifying BillingConfigId with BillingConfigId from TblBillingItem and selecting whole BillingItem table
        public async Task<InvoiceDTO> SaveBillingInvoiceAsync(decimal BillingConfigId, InvoiceRequest invoiceRequest, InvoiceConfigDTO invoiceConfigDTO, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            try
            {
                decimal totalInvoiceAmount = 0;
                InvoiceDTO invoiceDto = new InvoiceDTO();
                var main_bill = from tblbillingConfig in _context.TblBillingConfig
                                join tblbillingItem in _context.TblBillingItem on tblbillingConfig.BillingConfigId equals tblbillingItem.BillingConfigId
                                join tblmascommon in _context.TblmasBicommonTypes on tblbillingConfig.CurrencyId equals tblmascommon.CommonTypeId
                                where tblbillingItem.BillingConfigId == BillingConfigId
                                select new { tblbillingItem, tblmascommon.Value };

                InvoiceDetailDTO invoiceDetailDTO = null;
                BillingItemDetailDTO billingItemDetilsDTO = null;
                billingItemDetilsDTO = new BillingItemDetailDTO();
                int count = 0;

                // Calling & Getting Event details based on EventMappingId for each BillingItemId
                InvoiceModel invoiceModel = new InvoiceModel();
                invoiceModel.InvoiceSecondPageDetails.Currency = main_bill.FirstOrDefault().Value;
                foreach (var bill in main_bill)
                {

                    ++count;
                    invoiceDetailDTO = new InvoiceDetailDTO();
                    invoiceDetailDTO.EventMappingId = bill.tblbillingItem.EventMappingId;
                    invoiceDetailDTO.BillingItemId = bill.tblbillingItem.BillingItemId;
                    invoiceDetailDTO.SeqNo = count;

                    var billingEventDetail = await GetBillingEventDetailsAsync((int)bill.tblbillingItem.EventMappingId, invoiceRequest, apiContext);
                    //var billingItemDetail = await GetBillingItemizedDetailsAsync((int)bill.tblbillingItem.EventMappingId, invoiceRequest, apiContext);


                    if (invoiceDetailDTO.EventMappingId == ModuleConstants.ProductCreation || invoiceDetailDTO.EventMappingId == ModuleConstants.PolicyCreation || invoiceDetailDTO.EventMappingId == ModuleConstants.ClaimIntimation)
                    {
                        invoiceDetailDTO.Eventcount = billingEventDetail.Sum(e => e.Count);
                    }
                    else
                        invoiceDetailDTO.Eventcount = 0;

                    //If single, Directly return a Value

                    if (bill.tblbillingItem.RateCategoryId == ModuleConstants.Single)
                    {
                        if (invoiceDetailDTO.EventMappingId == ModuleConstants.ProductCreation && billingEventDetail.FirstOrDefault().Count == 0)
                        {
                            invoiceDetailDTO.Value = 0;
                        }
                        else if (invoiceDetailDTO.EventMappingId == ModuleConstants.PolicyCreation && billingEventDetail.FirstOrDefault().Count == 0)
                        {
                            invoiceDetailDTO.Value = 0;
                        }
                        else if (invoiceDetailDTO.EventMappingId == ModuleConstants.ClaimIntimation && billingEventDetail.FirstOrDefault().Count == 0)
                        {
                            invoiceDetailDTO.Value = 0;
                        }
                        else
                            invoiceDetailDTO.Value = bill.tblbillingItem.Rate;
                    }
                    //Else calculate for range and slab
                    else
                    {
                        invoiceDetailDTO.Value = GetBillingInvoiceAmount(bill.tblbillingItem, billingEventDetail);
                        //This method return InvoiceItemAmount and its value is stored in InvocieDetails(Value)
                    }
                    invoiceDto.InvoiceDetails.Add(invoiceDetailDTO); //Save in Invoice Details Table

                    totalInvoiceAmount = totalInvoiceAmount + (decimal)invoiceDetailDTO.Value; //Get the Total InvAmount

                }

                //Fill Invoice Table
                invoiceDto.InvoiceConfigId = invoiceConfigDTO.InvoiceConfigId;
                invoiceDto.ContractId = invoiceConfigDTO.ContractId;
                invoiceDto.InvoiceDate = DateTime.Now;
                //invoiceDto.RevisedInvAmount = 0;
                invoiceDto.PaymentRecd = 0;//From Payment table--PaymentAmount
                invoiceDto.Balance = totalInvoiceAmount;
                invoiceDto.PenaltyAmount = 0;
                invoiceDto.DueDate = DateTime.Today.AddDays(Convert.ToInt32(invoiceConfigDTO.InvoiceCreditPeriod));
                //invoiceDto.InvoiceConfigId = 3;
                invoiceDto.DefaultDays = invoiceConfigDTO.InvoiceGracePeriod;
                invoiceDto.OtherAmount = 0;
                invoiceDto.GstPercent = 0;
                invoiceDto.TaxAmount = (totalInvoiceAmount * invoiceDto.GstPercent) / 100;
                invoiceDto.CreatedUserId = apiContext.UserId;
                invoiceDto.Discount = 0;
                invoiceDto.StatusId = ModuleConstants.InvoicePendingStatus;
                invoiceDto.CreatedDate = DateTime.Now;
                invoiceDto.InvoiceNo = GetInvoiceNumber();
                invoiceDto.InvAmount = totalInvoiceAmount;
                invoiceDto.TotalAmount = invoiceDto.InvAmount - invoiceDto.Discount + invoiceDto.TaxAmount + invoiceDto.PenaltyAmount;

                await InvoicePdfGeneration(invoiceModel, invoiceDto, invoiceRequest, apiContext);//Save in PDF

                var invoice = _mapper.Map<TblInvoice>(invoiceDto);
                _context.TblInvoice.Add(invoice);
                _context.SaveChanges();//Save changes in Invoice Table

                var ExecDate = _context.TblInvoiceConfig.Where(a => a.InvoiceConfigId == invoiceDto.InvoiceConfigId).First();
                ExecDate.LastCycleExecDate = invoiceDto.InvoiceDate;
                _context.TblInvoiceConfig.Update(ExecDate);//update last execution date in InvoiceConfig table
                _context.SaveChanges();
                return invoiceDto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Based on EventMappingId get the count of ProductCreation, PolicyCreation.... and save in (var billingEventDetail|..)
        private async Task<IEnumerable<BilingEventDataDTO>> GetBillingEventDetailsAsync(int EventMappingId, InvoiceRequest invoiceRequest, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            BillingEventRequest EventRequet = new BillingEventRequest();
            EventRequet.FromDate = (DateTime)invoiceRequest.InvoiceStartDate;
            EventRequet.ToDate = (DateTime)invoiceRequest.InvoiceEndDate;
            EventRequet.CustomerId = invoiceRequest.CustomerId;
            EventRequet.EvtId = invoiceRequest.EnvId;

            switch (EventMappingId)
            {

                case ModuleConstants.ProductCreation:
                    {
                        return await _integrationService.GetProductBilingDetailsAsync(EventRequet, apiContext);
                    }
                case ModuleConstants.PolicyCreation:
                    return await _integrationService.GetPolicyBilingDetailsAsync(EventRequet, apiContext);

                case ModuleConstants.ClaimIntimation:
                    return await _integrationService.GetClaimBilingDetailsAsync(EventRequet, apiContext);

                case ModuleConstants.InsuredMember:
                    return new List<BilingEventDataDTO>();
                default:
                    return new List<BilingEventDataDTO>();

            }

        }
        public async Task<BillingEventResponseDTO> GetBillingItemizedDetailsAsync(int EventMappingId, InvoiceRequest invoiceRequest, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //int EventMappingId = 2;
            BillingEventRequest EventRequet = new BillingEventRequest();

            EventRequet.FromDate = (DateTime)invoiceRequest.InvoiceStartDate;
            EventRequet.ToDate = (DateTime)invoiceRequest.InvoiceEndDate;

            switch (EventMappingId)
            {
                case ModuleConstants.ProductCreation:
                    return await _integrationService.GetProductItemizedDetailsAsync(EventRequet, apiContext);

                case ModuleConstants.PolicyCreation:
                    return await _integrationService.GetPolicyItemizedDetailsAsync(EventRequet, apiContext);

                case ModuleConstants.ClaimIntimation:
                    return await _integrationService.GetClaimItemizedDetailsAsync(EventRequet, apiContext);

                default:
                    return new BillingEventResponseDTO();
            }
        }
        //For PDF
        public string InvoiceItemDescription(InvoiceDetailDTO invoiceDetailDTO)
        {
            // _context = (MICABIContext)DbManager.GetContext(context.ProductType, context.ServerType);
            string BillingDetailsType = "";

            if (invoiceDetailDTO.EventMappingId == ModuleConstants.ProductCreation)
            {
                BillingDetailsType = "Product Creation";
            }
            else if (invoiceDetailDTO.EventMappingId == ModuleConstants.PolicyCreation)
            {
                BillingDetailsType = "Policy Creation";
            }
            else if (invoiceDetailDTO.EventMappingId == ModuleConstants.ClaimIntimation)
            {
                BillingDetailsType = "Claim Intimation";
            }
            else if (invoiceDetailDTO.EventMappingId == ModuleConstants.OneTimeLicenseCost)
            {
                BillingDetailsType = "Onetime License Cost";
            }
            else if (invoiceDetailDTO.EventMappingId == ModuleConstants.RecurringInstallment)
            {
                BillingDetailsType = "Recurring Installment";
            }
            else if (invoiceDetailDTO.EventMappingId == ModuleConstants.RecurringFlatAmount)
            {
                BillingDetailsType = "Recurring Flat Amount";
            }
            return BillingDetailsType;
        }

        //Saving In PDF
        public async Task<InvoiceModel> InvoicePdfGeneration(InvoiceModel invoiceModel, InvoiceDTO invoiceDto, InvoiceRequest invoiceRequest, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            int count = 0;
            // InvoiceModel invoiceModel = new InvoiceModel();
            NotificationRequest notificationRequest = new NotificationRequest();


            var _contract = _context.TblContract.Where(a => a.ContractId == invoiceDto.ContractId).First();

            invoiceModel.InvoiceItemsModel.InvoiceNo = invoiceDto.InvoiceNo;
            invoiceModel.InvoiceItemsModel.InvoiceDate = DateTime.Now.ToShortDateString(); //DateTime.Now.ToString("dd'-'MMM'-'YYYY'");
            //invoiceModel.InvoiceItemsModel.InvoiceDate = DateTime(string.Format("{ 0:yyyy - MM - dd hh: mm} ", DateTime.Now));
            //invoiceModel.InvoiceItemsModel.InvoiceDate =invoiceDto.InvoiceDate "{ "dd'-'MMM'-'YYYY"}";
            invoiceModel.InvoiceItemsModel.SuppliesrsRef = "";
            //invoiceModel.InvoiceItemsModel.OthersRef = ""; //To do -->Customer spoc details
            invoiceModel.InvoiceItemsModel.Days = _contract.MaxCreditPeriod.ToString();
            invoiceModel.InvoiceItemsModel.OrderNo = _contract.Pono;
            invoiceModel.InvoiceItemsModel.PODate = _contract.Podate.Value.ToShortDateString();// con.Podate.Value.ToString("dd'-'MMM'-'YYYY'");
            //invoiceModel.InvoiceItemsModel.PODate = con.Podate.Value.ToString("dd'-'MMM'-'YYYY'");
            invoiceModel.InvoiceItemsModel.TotalAmount = (double)invoiceDto.InvAmount;
            invoiceModel.InvoiceItemsModel.TotalTaxAmount = invoiceDto.TotalAmount;
            invoiceModel.InvoiceItemsModel.AmountInWords = Utilities.GetNumberValue(Convert.ToInt32(invoiceDto.TotalAmount));
            invoiceModel.InvoiceItemsModel.TaxAmountInWords = Utilities.GetNumberValue(Convert.ToInt32(invoiceDto.TaxAmount));
            invoiceModel.InvoiceItemsModel.TermsofDelivery = "As Per Contract";
            invoiceModel.InvoiceItemsModel.TaxAmount = (double)invoiceDto.TaxAmount;
            invoiceModel.InvoiceItemsModel.GST = invoiceDto.GstPercent.ToString();

            //ContractDTO contract = new ContractDTO();
            var address = (from customers in _context.TblCustomers
                           where customers.CustomerId == invoiceRequest.CustomerId
                           join spoc in _context.TblCustSpocDetails on customers.CustomerId equals spoc.CustomerId
                           join custAdd in _context.TblCustAddress on customers.CustomerId equals custAdd.CustomerId
                           join masCountry in _context.TblMasCountry on custAdd.CountryId equals masCountry.CountryId
                           join masState in _context.TblMasState on custAdd.StateId equals masState.StateId
                           join masDistrict in _context.TblMasDistrict on custAdd.DistrictId equals masDistrict.DistrictId
                           join masCity in _context.TblMasCity on custAdd.CityId equals masCity.CityId
                           join masPincode in _context.TblMasPinCode on custAdd.PincodeId equals masPincode.PincodeId
                           //join contract in _context.TblContract on customers.CustomerId equals contract.CustomerId
                           where _contract.ContractId == invoiceDto.ContractId
                           //where _contract.CustomerId == invoiceRequest.CustomerId

                           select new
                           {
                               customerId = customers.CustomerId,
                               countryName = masCountry.CountryName,
                               stateName = masState.StateName,
                               districtId = masDistrict.DistrictName,
                               cityId = masCity.CityName,
                               pincode = masPincode.Pincode,
                               address1 = custAdd.AddressLine1,
                               address2 = custAdd.AddressLine2,
                               address3 = custAdd.AddressLine3,
                               buyer = customers.CustomerName,
                               code = masState.StateCode,
                               otherRef = spoc.FirstName + " " + spoc.LastName,
                               pan = customers.Panno,
                               custEmail = spoc.EmailId

                           });

            ++count;
            foreach (var ad in address)
            {
                invoiceModel.BuyersAddress.Buyer = ad.buyer;
                invoiceModel.BuyersAddress.AddressLine1 = ad.address1;
                invoiceModel.BuyersAddress.AddressLine2 = ad.address2;
                invoiceModel.BuyersAddress.AddressLine3 = ad.address3;
                invoiceModel.BuyersAddress.UIN = "27AABCF0191R2Z8"; //To know
                invoiceModel.BuyersAddress.State = ad.stateName;
                invoiceModel.BuyersAddress.Code = ad.code;
                invoiceModel.BuyersAddress.CIN = ""; //To know 
                invoiceModel.BuyersAddress.PAN = ad.pan; //To know
                invoiceModel.BuyersAddress.OthersRef = ad.otherRef;
                invoiceModel.BuyersAddress.CustEmail = ad.custEmail;
            }

            invoiceModel.Address.AddressId = count;//ask
            invoiceModel.Address.Code = "29";
            invoiceModel.Address.AddressLine1 = " #31,2nd Floor, Kothanur Main Road,";
            invoiceModel.Address.AddressLine2 = "RBI Layout, JP Nagar 7th Phase";
            invoiceModel.Address.AddressLine3 = "";
            invoiceModel.Address.OfficeName = "INUBE SOFTWARE SOLUTIONS PVT LTD ";
            invoiceModel.Address.OfficeNo = "";
            invoiceModel.Address.State = " Karnataka";
            invoiceModel.Address.City = "Bangalore";
            invoiceModel.Address.PinCode = "560078";
            invoiceModel.Address.Statecode = "";
            invoiceModel.Address.UIN = "29AACCI3916L1ZA";
            invoiceModel.Address.CIN = "U72200KA2010PTC054801";
            invoiceModel.Address.PAN = "AABCF0191R";

            InvoiceItemsDetails invoiceItemsDetailsModel = null;

            int NumbIncrement = 0;
            foreach (var item in invoiceDto.InvoiceDetails)
            {
                invoiceItemsDetailsModel = new InvoiceItemsDetails();
                if (item.Eventcount > 0)
                {
                    invoiceItemsDetailsModel.EventCount = item.Eventcount;
                }
                else
                    invoiceItemsDetailsModel.EventCount = 1;
                invoiceItemsDetailsModel.ItemDescription1 = InvoiceItemDescription(item);
                invoiceItemsDetailsModel.ItemDescription2 = "";
                invoiceItemsDetailsModel.ItemDescription3 = "";
                invoiceItemsDetailsModel.ItemDescription4 = "";
                invoiceItemsDetailsModel.HSN = "";
                // invoiceItemsDetailsModel.GST = invoiceDto.GstPercent.ToString();
                invoiceItemsDetailsModel.Amount = item.Value.ToString();
                if (item.Value > 0)
                {
                    ++NumbIncrement;
                    invoiceItemsDetailsModel.SlNo = NumbIncrement;
                    invoiceModel.Invoices.Add(invoiceItemsDetailsModel);
                }
            }

            //for Tax
            //++NumbIncrement;
            //invoiceItemsDetailsModel = new InvoiceItemsDetails();
            //invoiceItemsDetailsModel.SlNo = NumbIncrement;
            //invoiceItemsDetailsModel.ItemDescription1 = "GST 0%";
            //invoiceItemsDetailsModel.ItemDescription2 = "";
            //invoiceItemsDetailsModel.ItemDescription3 = "";
            //invoiceItemsDetailsModel.ItemDescription4 = "";
            //invoiceItemsDetailsModel.HSN = "";
            // invoiceItemsDetailsModel.GST = invoiceDto.GstPercent.ToString();
            //invoiceItemsDetailsModel.Amount = invoiceModel.InvoiceItemsModel.TaxAmount.ToString();
            //invoiceModel.Invoices.Add(invoiceItemsDetailsModel);

            invoiceModel.BankDetails.TaxAmtInWords = Utilities.GetNumberValue(Convert.ToInt32(invoiceDto.TaxAmount));
            invoiceModel.BankDetails.BankName = "Axis Bank - OD A/c 919030017289373";
            invoiceModel.BankDetails.AccNo = " 919030017289373 ";
            invoiceModel.BankDetails.Branch = "  JP Nagar  ";
            invoiceModel.BankDetails.IFSC = "   UTIB0000333  ";
            invoiceModel.BankDetails.Remarks = "MICA Services fee for the period";
            invoiceModel.BankDetails.Remarks1 = "From " + invoiceRequest.InvoiceStartDate.Value.ToShortDateString() + "  To  " + invoiceRequest.InvoiceEndDate.Value.ToShortDateString();
            invoiceModel.BankDetails.Remarks2 = "";
            invoiceModel.BankDetails.CompanysPAN = "AACCI3916L ";

            invoiceModel.TaxDetails.TaxableValue = "";
            invoiceModel.TaxDetails.Rate = "18";
            invoiceModel.TaxDetails.Amount = invoiceDto.TaxAmount.ToString();
            invoiceModel.TaxDetails.TotalTaxAmount = invoiceDto.TotalAmount.ToString();

            //Displaying Itemized List in Invoice 2nd page PDF
            invoiceModel.InvoiceSecondPageDetails.Buyer = invoiceModel.BuyersAddress.Buyer;
            invoiceModel.InvoiceSecondPageDetails.FromDate = invoiceRequest.InvoiceStartDate.Value.ToShortDateString();
            invoiceModel.InvoiceSecondPageDetails.ToDate = invoiceRequest.InvoiceEndDate.Value.ToShortDateString();
            invoiceModel.InvoiceSecondPageDetails.InvoiceNo = GetInvoiceNumber();
            invoiceModel.InvoiceSecondPageDetails.Total = 0;//to do

            //Onetime licenseCost
            invoiceModel.OneTimeLicenseCost.SlNo = count;
            invoiceModel.OneTimeLicenseCost.ApplicationName = "MICA Services";
            invoiceModel.OneTimeLicenseCost.Date = DateTime.Now.ToShortDateString();//to ask
            invoiceModel.OneTimeLicenseCost.OneTimeAmount = 0;//to do
            invoiceModel.OneTimeLicenseCost.OneTimeSubTotal = 0;//to do


            EmailRequest emailTest = new EmailRequest()
            {
                IsAttachment = true,
                Message = $"Dear Customer,\n The Invoice No." + " " + invoiceModel.InvoiceSecondPageDetails.InvoiceNo + " " + "Dated" + " " + invoiceModel.InvoiceItemsModel.InvoiceDate + " " + "for the period from " + " " + invoiceModel.InvoiceSecondPageDetails.FromDate + " " + "to" + " " + invoiceModel.InvoiceSecondPageDetails.ToDate + " " + "is attached for your reference.   Kindly arrange for the payment as per the terms agreed. Also, please inform once payment is made.\n \n Regards,\n \n Finance Manager – MICA \n iNube Software Solutions Pvt Ltd \n",
                Subject = $" Test Email from MICA",
                To = invoiceModel.BuyersAddress.CustEmail,
                //To = "nadira.khanum@inubesolutions.com",
                PartnerEmail = "nadira.khanum@inubesolutions.com"
            };

            invoiceModel.EmailTest = emailTest;

            try
            {
                NotificationRequest request = new NotificationRequest();
                request.TemplateKey = "Invoice";
                request.AttachPDF = true;
                request.NotificationPayload = JsonConvert.SerializeObject(invoiceModel);
                request.SendEmail = true;
                request.IsAwsS3Save = true;
                var notificationResponse = await _integrationService.SendNotificationAsync(request, apiContext);
            }
            catch (Exception ex)
            {
                var msgr = ex.ToString();
            }
            return invoiceModel;
        }

        //To get the Unique InvoiceNo from stored Procedure
        private string GetInvoiceNumber()
        {

            // _context = (MICABIContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var connectionString = _configuration.GetConnectionString("BIConnection");
            int nextNumber = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("[BI].[usp_GetNextNumber]", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Numberingtype", "InvoiceNo");
                    //command.Parameters.AddWithValue("@InvoiceId",invoiceId);
                    //command.Parameters.AddWithValue("@ProductId", productId);
                    command.Parameters.Add("@NextNo", SqlDbType.Int);
                    command.Parameters["@NextNo"].Direction = ParameterDirection.Output;
                    command.CommandTimeout = 3600;
                    command.ExecuteNonQuery();
                    nextNumber = (int)command.Parameters["@NextNo"].Value;
                    connection.Close();
                }
            }
            catch (Exception ex)
            {

            }
            DateTime date = DateTime.Now;
            int year = date.Year;

            var invoiceNumber = "MICA" + year.ToString().Substring(2, 2) + "-" + (year + 1).ToString().Substring(2, 2) + "/" + nextNumber.ToString();
            return invoiceNumber;
        }


        //RangeValue includes From, To and Rate
        private decimal GetBillingInvoiceAmount(TblBillingItem bill, IEnumerable<BilingEventDataDTO> billingEventDetail)
        {
            List<RangeValue> rangeValue = new List<RangeValue>();
            decimal invoiceItemAmount;

            //for others(product,policy creation ...), take "Amount" from "BillingItemDetails" Table
            if (bill.RateCategoryId == ModuleConstants.Range || bill.RateCategoryId == ModuleConstants.Slab)
            {
                var billingItemDetails = _context.TblBillingItemDetail.Where(b => b.BillingItemId == bill.BillingItemId);
                //Flat Range Slab
                foreach (var billItem in billingItemDetails)
                {
                    RangeValue rangeItem = new RangeValue();
                    rangeItem.From = (int)billItem.From;
                    rangeItem.To = (int)billItem.To;
                    rangeItem.Rate = (decimal)((billItem.Amount > 0 || billItem.Amount != null) ? billItem.Amount : billItem.RatePercent);
                    rangeValue.Add(rangeItem);
                }
            }
            //calculation 
            bool IsPremium = bill.ValueFactorId == ModuleConstants.Premium ? true : false;

            // Based on the ValueFactorId

            //For Range -- > Flat and Percentage , get InvoiceItemAmount
            if (bill.RateCategoryId == ModuleConstants.Range)
            {
                if (bill.RateTypeId == ModuleConstants.Flat)
                {
                    invoiceItemAmount = GetFlatAmount(billingEventDetail, rangeValue);
                }
                else
                {
                    invoiceItemAmount = GetPercentgeAmount(billingEventDetail, rangeValue, IsPremium);
                }
            }

            //For Slab -- > Flat and Percentage , get InvoiceItemAmount
            else
            {
                if (bill.RateTypeId == ModuleConstants.Flat)
                {
                    invoiceItemAmount = GetSlabFlatAmount(billingEventDetail, rangeValue);
                }
                else
                {
                    invoiceItemAmount = GetSlabPercentgeAmount(billingEventDetail, rangeValue, IsPremium);
                }
            }

            //For one time license cost, directly take "Rate" from "BillingItem" Table
            if (bill.EventMappingId == ModuleConstants.OneTimeLicenseCost)
            {
                invoiceItemAmount = (decimal)bill.Rate;
            }

            return invoiceItemAmount;
        }
        private decimal GetFlatAmount(IEnumerable<BilingEventDataDTO> policyList, IList<RangeValue> ranges)
        {

            decimal total = 0;
            decimal SumTotal = 0;
            foreach (var p in policyList)
            {
                foreach (var r in ranges)
                {
                    if (Enumerable.Range(r.From, r.To).Contains(p.Count))
                    {
                        total = p.Count * r.Rate;
                    }
                }
                SumTotal = SumTotal + total;

                Console.WriteLine("Total rate for product: " + p.ProductName + " total: " + SumTotal);
            }
            return SumTotal;
        }

        private decimal GetPercentgeAmount(IEnumerable<BilingEventDataDTO> policyList, IList<RangeValue> range, bool IsPremium)
        {
            decimal totalpremium = 0;
            foreach (var pl in policyList)
            {
                if (IsPremium)
                {
                    totalpremium = pl.Count * pl.Premium;
                }
                else
                {
                    totalpremium = pl.Count * pl.SumInsured;
                }
                foreach (var ra in range)
                {
                    if (Enumerable.Range(ra.From, ra.To).Contains(pl.Count))
                    {
                        totalpremium = (totalpremium * ra.Rate) / 100;
                    }
                }
                Console.WriteLine("Total rate for product: " + pl.ProductName + " total: " + totalpremium);
            }
            return totalpremium;
        }

        private decimal GetSlabFlatAmount(IEnumerable<BilingEventDataDTO> policyList, IList<RangeValue> slab)
        {
            int count = 0;
            decimal rate = 0;
            int itemPolicy = 0;
            int tempPolicycount = 0;
            int temp = 0;
            int length = slab.Count();
            foreach (var pList in policyList)
            {
                rate = 0;
                itemPolicy = pList.Count;
                count = 0;
                foreach (var slb in slab)
                {

                    if (pList.Count >= slb.To)
                    {
                        tempPolicycount = slb.To;
                        pList.Count = pList.Count - slb.To;
                    }
                    else
                    {
                        tempPolicycount = pList.Count;
                        pList.Count = 0;
                    }
                    ++count;
                    rate = rate + tempPolicycount * slb.Rate;
                    if (pList.Count == 0)
                    {
                        break;
                    }
                }
                pList.Count = itemPolicy;
                Console.WriteLine("Product :" + pList.ProductName + " PolicyCount " + itemPolicy + " Amount " + rate + " Loop count " + count);
            }
            return rate;
        }
        private decimal GetSlabPercentgeAmount(IEnumerable<BilingEventDataDTO> policyList, IList<RangeValue> slab, bool IsPremium)
        {
            int count = 0;
            decimal rate = 0;
            int itemPolicy = 0;
            int tempcount = 0;
            decimal temp = 0;
            int length = slab.Count();
            foreach (var pList in policyList)
            {
                rate = 0;
                itemPolicy = pList.Count;
                count = 0;
                foreach (var slb in slab)
                {

                    if (pList.Count >= slb.To)
                    {
                        tempcount = slb.To;
                        pList.Count = pList.Count - slb.To;
                    }
                    else
                    {
                        tempcount = pList.Count;
                        pList.Count = 0;
                    }
                    ++count;
                    if (IsPremium)
                    {
                        temp = tempcount * pList.Premium;
                    }
                    else
                    {
                        temp = tempcount * pList.SumInsured;
                    }
                    rate = rate + temp * slb.Rate / 100;
                    if (pList.Count == 0)
                    {
                        break;
                    }
                }
                pList.Count = itemPolicy;
                Console.WriteLine("Product :" + pList.ProductName + " PolicyCount " + itemPolicy + "Premium " + pList.Premium + " SumInsured " + pList.SumInsured + " Amount " + rate + " Loop count " + count);
            }
            return rate;
        }

        public async Task<CustomersDTO> GetCustProvisioningDetailsAsync(decimal customerId, ApiContext apiContext)
        {
            _context = (MICABIContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var _spocdetails = _context.TblCustomers.Where(x => x.CustomerId == customerId)
                .Include(add => add.TblCustAddress)
                .Include(add => add.TblCustSpocDetails)
                .FirstOrDefault();
            //var _data = _mapper.Map<TblCustSpocDetails>(_spocdetails);
            var result = _mapper.Map<CustomersDTO>(_spocdetails);
            return result;
        }

    }
}