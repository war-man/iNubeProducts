using AutoMapper;

using iNube.Services.Partners.Entities.AVO;
using iNube.Services.Partners.Helpers;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.UserManagement.Helpers;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Contracts.ContractService.AvoContract
{
    public class AvoContractService : IContractProductService
    {
        private AVOPRContext _context = null;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        private IIntegrationService _integrationService;
        public DbHelper dbHelper;
        public AvoContractService(AVOPRContext context, IMapper mapper, IConfiguration configuration, IIntegrationService integrationService)
        {
            // _context = context;
            _integrationService = integrationService;
            _mapper = mapper;
            _configuration = configuration;
            dbHelper = new DbHelper(new IntegrationService(configuration, new LoggerManager(configuration)));
        }

        public async Task<bool> GetmasterData(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<FileUploadResponse> ContractUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            string filePath = "";
            int step1 = 0;
            try
            {


                TblRecruitment tblRecruitment = new TblRecruitment();
                List<TblRecruitment> tblRecruitments = new List<TblRecruitment>();
                var files = httpRequest.Form.Files;
                //var docId = GetActiveResult(file.Name); HttpRequest
                DataTable dt = new DataTable();
                List<ShowErrorInfoDetails> errorInfoDetails = new List<ShowErrorInfoDetails>();
                List<ErrorInfo> Errors = new List<ErrorInfo>();
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
                var lstrecutNo = _context.TblRecruitment.Select(s => s.RecruitmentNo).ToList();


                foreach (var file in files)
                {
                    step1++;

                    if (file == null || file.Length <= 0)
                    {
                        return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                    }
                    var filename = ContentDispositionHeaderValue
                                       .Parse(file.ContentDisposition)
                                       .FileName
                                       .Trim('"');
                    var path = Path.Combine("", filename);
                    filePath = Path.GetFullPath(path);
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }

                    step1++;

                    var sheetName = System.IO.Path.GetFileNameWithoutExtension(path).ToString();

                    var fileExt = Path.GetExtension(file.FileName);


                    if (fileExt.Equals(".xlsx", StringComparison.OrdinalIgnoreCase) || fileExt.Equals(".csv", StringComparison.OrdinalIgnoreCase))
                    {
                        var sheetNameValue = "";
                        using (var stream = new MemoryStream())
                        {
                            await file.CopyToAsync(stream, cancellationToken);
                            try
                            {
                                using (var package = new ExcelPackage(stream))
                                {
                                    foreach (var sheetName1 in package.Workbook.Worksheets)
                                    {
                                        sheetNameValue = sheetName1.Name;
                                    }
                                    ExcelWorksheet worksheet = package.Workbook.Worksheets[sheetNameValue];



                                    var idxRecruitmentNo = worksheet
                                              .Cells["1:1"]
                                              .First(c => c.Value.ToString() == "RecruitmentNo")
                                              .Start
                                              .Column;

                                    var idxName = worksheet
                                             .Cells["1:1"]
                                             .First(c => c.Value.ToString() == "Name")
                                             .Start
                                             .Column;

                                    var idxSubchannel = worksheet
                                             .Cells["1:1"]
                                             .First(c => c.Value.ToString() == "SubChannel")
                                             .Start
                                             .Column;

                                    var idxChannel = worksheet
                                             .Cells["1:1"]
                                             .First(c => c.Value.ToString() == "Channel")
                                             .Start
                                             .Column;

                                    var idxDesignation = worksheet
                                             .Cells["1:1"]
                                             .First(c => c.Value.ToString() == "Designation")
                                             .Start
                                             .Column;

                                    //int endrsId = worksheet.GetColumnByName("RecruitmentNo");

                                    if (worksheet != null)
                                    {
                                        var rowCount = worksheet.Dimension.Rows;
                                        for (int row = 2; row <= rowCount; row++)
                                        {
                                            tblRecruitment = new TblRecruitment();
                                            var recNo = worksheet.Cells[row, idxRecruitmentNo].Text.ToString().Trim();
                                            if (lstrecutNo.Contains(recNo) == false)
                                            {
                                                if (worksheet.Cells[row, idxRecruitmentNo].Text.ToString().Trim() != null)
                                                {
                                                    var recrutmentNo = worksheet.Cells[row, idxRecruitmentNo].Text.ToString().Trim();
                                                    tblRecruitment.RecruitmentNo = recrutmentNo;
                                                }
                                                if (worksheet.Cells[row, idxName].Text.ToString().Trim() != null)
                                                {
                                                    var Name = worksheet.Cells[row, idxName].Text.ToString().Trim();
                                                    tblRecruitment.Name = Name;
                                                }

                                                if (worksheet.Cells[row, idxSubchannel].Text.ToString().Trim() != null)
                                                {
                                                    var Subchannel = worksheet.Cells[row, idxSubchannel].Text.ToString().Trim();
                                                    tblRecruitment.SubChannel = Subchannel;
                                                }
                                                if (worksheet.Cells[row, idxChannel].Text.ToString().Trim() != null)
                                                {
                                                    var Channel = worksheet.Cells[row, idxChannel].Text.ToString().Trim();
                                                    tblRecruitment.Channel = Channel;
                                                }
                                                if (worksheet.Cells[row, idxDesignation].Text.ToString().Trim() != null)
                                                {
                                                    var Designation = worksheet.Cells[row, idxDesignation].Text.ToString().Trim();
                                                    tblRecruitment.Designation = Designation;
                                                }

                                                tblRecruitments.Add(tblRecruitment);

                                            }
                                            else
                                            {
                                                ErrorInfo errorInfo = new ErrorInfo { ErrorMessage = "Recruitment Number is already present in database for row:" + row + "",PropertyName=recNo };
                                                Errors.Add(errorInfo);
                                            }
                                        }



                                        _context.TblRecruitment.AddRange(tblRecruitments);
                                        await _context.SaveChangesAsync();
                                    }
                                }
                                return new FileUploadResponse { Status = BusinessStatus.Created, Errors = Errors, ResponseMessage = $"Excel Uploaded successfuylly", MessageKey = step1.ToString() };
                            }
                            catch (Exception ex)
                            {
                                var error = ex.ToString();
                                return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter", MessageKey = step1.ToString() };
                            }
                        }

                    }
                    else
                    {
                        return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx/csv file" };
                    }


                }

            }
            catch (Exception ex)
            {
                return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Document upload error!" + ex.ToString(), MessageKey = step1.ToString() + " " + filePath };
            }

            return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Document upload successfully!" };
        }

        public async Task<RecruitmentDTO> RecruitmentByCode(string RecNo, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var data = _context.TblRecruitment.FirstOrDefault(a => a.RecruitmentNo == RecNo);
            if (data != null)
            {
                if (data.IsContract.HasValue && Convert.ToBoolean(data.IsContract))
                {
                    return new RecruitmentDTO { Status = BusinessStatus.NotFound, ResponseMessage = $"For Recruitment Number {RecNo} Contract is already Created!" };
                }
                var mappeddata = _mapper.Map<RecruitmentDTO>(data);
                mappeddata.Status = BusinessStatus.Ok;
                return mappeddata;
            }
            return new RecruitmentDTO { Status = BusinessStatus.NotFound, ResponseMessage = $"Recruitment Number {RecNo} Not Found!" };

        }
        private async Task<bool> UpdateRecruitmentContract(string RecNo, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var data = _context.TblRecruitment.FirstOrDefault(a => a.RecruitmentNo == RecNo);
            if (data != null)
            {
                data.IsContract = true;
                _context.SaveChanges();
            }
            return true;
        }
        public async Task<IncentiveResponse> IncentiveCalculation(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            //throw new NotImplementedException();
            var files = httpRequest.Form.Files;
            DataTable dt = new DataTable();
            List<dynamic> obj = new List<dynamic>();

            foreach (var file in files)
            {
                if (file == null || file.Length <= 0)
                {
                    return new IncentiveResponse { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                }
                if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return new IncentiveResponse { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx file" };
                }
                dt.Columns.Add("Emp Code", typeof(string));
                dt.Columns.Add("Incentive Name", typeof(string));
                dt.Columns.Add("Channel", typeof(string));
                dt.Columns.Add("Sub Channel", typeof(string));
                dt.Columns.Add("Designation", typeof(string));
                dt.Columns.Add("Level", typeof(string));
                dt.Columns.Add("Incentive Amount", typeof(string));
                dt.Columns.Add("ANP", typeof(string));
                dt.Columns.Add("RP", typeof(string));

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream, cancellationToken);
                    try
                    {
                        using (var package = new ExcelPackage(stream))
                        {
                            ExcelWorksheet worksheet = package.Workbook.Worksheets["Sheet1"];
                            if (worksheet != null)
                            {
                                var rowCount = worksheet.Dimension.Rows;
                                var columncount = worksheet.Dimension.Columns;
                                for (int row = 2; row <= rowCount; row++)
                                {
                                    DataRow dr = dt.NewRow();
                                    dr["Emp Code"] = worksheet.Cells[row, 1].Value.ToString().Trim();
                                    dr["Incentive Name"] = worksheet.Cells[row, 2].Value.ToString().Trim();
                                    dr["Channel"] = worksheet.Cells[row, 3].Value.ToString().Trim();
                                    dr["Sub Channel"] = worksheet.Cells[row, 4].Value.ToString().Trim();
                                    dr["Designation"] = worksheet.Cells[row, 5].Value.ToString().Trim();
                                    dr["Level"] = worksheet.Cells[row, 6].Value.ToString().Trim();
                                    dr["Incentive Amount"] = worksheet.Cells[row, 7].Value.ToString().Trim();
                                    dr["ANP"] = worksheet.Cells[row, 8].Value.ToString().Trim();
                                    dr["RP"] = worksheet.Cells[row, 9].Value.ToString().Trim();
                                    dt.Rows.Add(dr);
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        var error = ex.ToString();
                        return new IncentiveResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please check the values and re-enter" };
                    }
                }
            }
            try
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    var result = await GetDynamic(dt.Rows[i], apiContext);
                    obj.Add(result);
                }
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                return new IncentiveResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please check the values and re-enter" };
            }
            return new IncentiveResponse { Status = BusinessStatus.Ok, Incentive = obj, ResponseMessage = $"Document uploaded successfully!" };

        }

        private async Task<dynamic> GetDynamic(DataRow dataRow, ApiContext apiContext)
        {
            dynamic incFields = new ExpandoObject();
            dynamic dictionary_rule = new ExpandoObject();
            dynamic dictionary_rate = new ExpandoObject();

            dynamic obj = new ExpandoObject();

            string empcode = dataRow["Emp Code"].ToString();

            var empname = await GetEmpName(empcode, apiContext);

            AddProperty(obj, "EmpCode", empcode);
            AddProperty(obj, "EmpName", empname);
            AddProperty(obj, "IncentiveName", dataRow["Incentive Name"]);
            AddProperty(obj, "Channel", dataRow["Channel"]);
            AddProperty(obj, "SubChannel", dataRow["Sub Channel"]);
            AddProperty(obj, "Designation", dataRow["Designation"]);
            AddProperty(obj, "Level", dataRow["Level"]);
            AddProperty(obj, "IncentiveAmount", dataRow["Incentive Amount"]);
            AddProperty(obj, "ANP", dataRow["ANP"]);
            AddProperty(obj, "RP", dataRow["RP"]);

            //adding parameter to object dynamically
            AddProperty(dictionary_rule, "IncentiveAmount", dataRow["Incentive Amount"]);

            AddProperty(dictionary_rate, "Designation", dataRow["Designation"]);
            AddProperty(dictionary_rate, "ANP", dataRow["ANP"]);
            AddProperty(dictionary_rate, "RP", dataRow["RP"]);

            //adding Object to object dynamically
            AddProperty(incFields, "dictionary_rule", dictionary_rule);
            AddProperty(incFields, "dictionary_rate", dictionary_rate);

            var result = await _integrationService.CheckCalculationRate(incFields, apiContext);
            if (result.Count != 0)
            {
                AddProperty(obj, "IncentiveRate", result[3].eValue);
                AddProperty(obj, "IncentiveValue", result[4].eValue);
            }
            return obj;
        }

        public async Task<string> GetEmpName(string code, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var emp = _context.TblOrgEmployee.FirstOrDefault(a => a.StaffCode == code);
            if (emp != null)
            {
                return emp.StaffName;
            }
            return "Employee not exist";
        }

        public void AddProperty(ExpandoObject expando, string propertyName, object propertyValue)
        {
            // ExpandoObject supports IDictionary so we can extend it like this

            var expandoDict = expando as IDictionary<string, object>;
            if (expandoDict.ContainsKey(propertyName))
            {
                expandoDict[propertyName] = propertyValue;
            }
            else
            {
                expandoDict.Add(propertyName, propertyValue);
            }
        }

        public async Task<object> SearchTarget(TargetDto tblParticipantMasterDto, ApiContext apiContext)
        {
            try
            {
                // OrgStandardsDTO scontract = null;
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
                TblOrgStandards tblOrgStandards = null;
                if (tblParticipantMasterDto.DesignationId > 0)
                {
                    tblOrgStandards = _context.TblOrgStandards.Where(a => a.Level == tblParticipantMasterDto.Levelid && a.DesignationId == tblParticipantMasterDto.DesignationId && a.ProgramId == tblParticipantMasterDto.ProgramId).FirstOrDefault();
                }
                else
                {
                    tblOrgStandards = _context.TblOrgStandards.Where(a => a.Level == tblParticipantMasterDto.Levelid && a.ProgramId == tblParticipantMasterDto.ProgramId).FirstOrDefault();
                }
                var contractdata = _mapper.Map<OrgStandardsDTO>(tblOrgStandards);

                var b = contractdata.MappingDetails;
                var res = b.Replace("=", ":");
                var result = JsonConvert.DeserializeObject<object>(res);


                return result;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<ContractResponse> CreateUpdateContractAsync(ContractDTO contractDTO, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            CustomerSettingsDTO UserDateTime = await _integrationService.GetCustomerSettings("TimeZone", apiContext);
            dbHelper._TimeZone = UserDateTime.KeyValue;

            DateTime DateTimeNow = dbHelper.GetDateTimeByZone(dbHelper._TimeZone);
            var IsRecruitmentExist = _context.TblContract.Any(s => s.RecruitmentNo == contractDTO.RecruitmentNo);
            if (!IsRecruitmentExist)
            {

                TblContract contract = _mapper.Map<TblContract>(contractDTO);
                contractDTO.Flag = false;
                if (contract.ContractId == 0)
                {
                    contract.CreatedBy = apiContext.UserId;
                    contract.OrganizationId = apiContext.OrgId;
                    contract.CreatedDate = DateTimeNow;
                    _context.TblContract.Add(contract);
                    contractDTO.Flag = true;

                }
                else
                {
                    contract.ModifiedDate = DateTimeNow;
                    contract.ModifiedBy = apiContext.UserId;

                    _context.Update(contract);
                }
                _context.SaveChanges();
                if (contractDTO.Flag)
                {
                    await UpdateRecruitmentContract(contract.RecruitmentNo, apiContext);
                    // Generate PDF
                    if (contractDTO.lstIllustraionModels.Count > 0)
                    {
                        var model = GetAnpModel(contractDTO);
                        await SendNotificationAsync(model, "ContractCertificate", contractDTO.RecruitmentNo, apiContext);
                    }
                }
                List<string> lstParameters = new List<string>();
                lstParameters.Add(contractDTO.ContractId.ToString());
                lstParameters.Add(contractDTO.RecruitmentNo);

                return new ContractResponse() { Status = BusinessStatus.Created, Id = contractDTO.ContractId.ToString(), contract = contractDTO, ResponseMessage = $"Contract ID: {contractDTO.ContractId} successfully {(contractDTO.Flag == true ? "created " : "modified")} for RecruitmentNo: {contractDTO.RecruitmentNo}", MessageKey = (contractDTO.Flag == true ? "CreateContractMsg" : "ModifiedContractMsg"), MessageValue = lstParameters };
            }
            else
            {
                return new ContractResponse { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"RecruitmentNo already Exist" };

            }
        }
        public async Task<ContractResponse> GetContractDetailsById(int contractId, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            TblContract _tblPartner = _context.TblContract.Where(org => org.ContractId == contractId)
                                    .FirstOrDefault();
            if (_tblPartner != null)
            {
                ContractDTO _contractDTO = _mapper.Map<ContractDTO>(_tblPartner);
                return new ContractResponse { Status = BusinessStatus.Ok, contract = _contractDTO };
            }
            return new ContractResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"ContractId {contractId} Not Found!" };
        }
        public async Task<ContractResponse> GetContractByRecruitmentNo(string recruitmentNo, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            TblContract _tblPartner = _context.TblContract.Where(org => org.RecruitmentNo == recruitmentNo)
                                    .FirstOrDefault();
            if (_tblPartner != null)
            {
                ContractDTO _contractDTO = _mapper.Map<ContractDTO>(_tblPartner);
                return new ContractResponse { Status = BusinessStatus.Ok, contract = _contractDTO };
            }
            return new ContractResponse { Status = BusinessStatus.NotFound, ResponseMessage = $"Recruitment No {recruitmentNo} Not Found!" };
        }

        public async Task<ContractSearchResponse> SearchContract(ContractSearchDTO contractSearchDTO, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var _tblContracts = _context.TblContract.OrderByDescending(p => p.CreatedDate).Select(x => x);
            if (contractSearchDTO.ContractId > 0)
            {
                _tblContracts = _tblContracts.Where(p => p.ContractId == contractSearchDTO.ContractId);
            }
            if (!string.IsNullOrEmpty(contractSearchDTO.Name))
            {
                _tblContracts = _tblContracts.Where(p => p.Name.Contains(contractSearchDTO.Name));
            }
            if (!string.IsNullOrEmpty(contractSearchDTO.RecruitmentNo))
            {
                _tblContracts = _tblContracts.Where(p => p.RecruitmentNo.Contains(contractSearchDTO.RecruitmentNo));
            }
            if (!string.IsNullOrEmpty(contractSearchDTO.Channel))
            {
                _tblContracts = _tblContracts.Where(p => p.Channel == contractSearchDTO.Channel);
            }
            if (!string.IsNullOrEmpty(contractSearchDTO.SubChannel))
            {
                _tblContracts = _tblContracts.Where(p => p.SubChannel == contractSearchDTO.SubChannel);
            }
            if (contractSearchDTO.LevelId > 0)
            {
                _tblContracts = _tblContracts.Where(p => p.LevelId == contractSearchDTO.LevelId);
            }
            if (contractSearchDTO.Duration > 0)
            {
                _tblContracts = _tblContracts.Where(p => p.Duration == contractSearchDTO.Duration);
            }
            if (contractSearchDTO.Status == 24)
            {
                _tblContracts = _tblContracts.Where(p => p.IsActive == false);
            }
            if (contractSearchDTO.Status == 23)
            {
                _tblContracts = _tblContracts.Where(p => p.IsActive == true);
            }
            var contracts = _mapper.Map<List<ContractDTO>>(_tblContracts);
            ContractSearchResponse response = new ContractSearchResponse() { Status = BusinessStatus.Ok };
            if (contracts.Count > 0)
            {
                response.contracts.AddRange(contracts);
                return response;
            }
            response.Status = BusinessStatus.NotFound;
            return response;
        }

        public async Task<bool> UpdateEmployeeContract(string RecNo, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var data = _context.TblContract.FirstOrDefault(a => a.RecruitmentNo == RecNo);
            if (data != null)
            {
                data.IsEmployee = true;
                _context.SaveChanges();
            }
            return true;
        }
        public async Task<ContractDTO> GetContractDetails(string recruitmentNo, ApiContext apiContext)
        {
            _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var contractData = _context.TblContract.Where(x => x.RecruitmentNo == recruitmentNo).Select(x => x).FirstOrDefault();
            var _conData = _mapper.Map<ContractDTO>(contractData);
            return _conData;

        }


        private ContractModel GetAnpModel(ContractDTO contract)
        {
            ContractModel model = new ContractModel();
            model.RecruitmentNo = contract.RecruitmentNo;
            model.Allowance = (decimal)contract.Allowance;
            model.AnpTarget = (decimal)contract.TotalAnpTarget;
            model.TotalCost = (decimal)contract.TotalCost;
            model.Designation = contract.Designation;
            model.Level ="Level "+ contract.LevelId;

            List<ANPModel> aNPModels = new List<ANPModel>();
            ANPModel aNPModel = null;
            foreach (var item in contract.lstIllustraionModels)
            {
                aNPModel = new ANPModel();
                aNPModel.MonthlyAnp = Convert.ToDecimal(item.oMonthlyANP);
                aNPModel.CumulativeAnp = Convert.ToDecimal(item.oCummulativeANP);
                aNPModel.EndingManpower =Math.Round( Convert.ToDecimal(item.oEndingManPower),2);
                aNPModel.ActivityRatio = Convert.ToDecimal(item.oActivityRatio);
                aNPModel.ActiveAgent = Convert.ToInt16(item.oActiveAgent);
                aNPModels.Add(aNPModel);
            }
            model.lstANPModels.AddRange(aNPModels);
            return model;
        }

        private async Task SendNotificationAsync(dynamic notificationModel,string TemplateKey, string IdentificationNumber, ApiContext apiContext)
        {
            try
            {
                Partners.Models.NotificationRequest request = new Partners.Models.NotificationRequest();
                request.TemplateKey = TemplateKey;
                request.AttachPDF = true;
                request.StorageName = IdentificationNumber;
                request.NotificationPayload = JsonConvert.SerializeObject(notificationModel);
                request.SendEmail = true;
                request.SendSms = false;
                 var notificationResponse = await _integrationService.SendNotificationAsync(request, apiContext);
            }
            catch (Exception ex)
            {
                var msgr = ex.ToString();
            }
        }
    }
}
