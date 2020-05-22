using AutoMapper;

using iNube.Services.Partners.Entities.AVO;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.UserManagement.Helpers;
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
        public AvoContractService(AVOPRContext context, IMapper mapper, IConfiguration configuration, IIntegrationService integrationService)
        {
            // _context = context;
            _integrationService = integrationService;
            _mapper = mapper;
            _configuration = configuration;
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
                List<ErrorInfo> Errors = new List<ErrorInfo>();
                _context = (AVOPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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



                                        _context.TblRecruitment.AddRange(tblRecruitments);
                                        await _context.SaveChangesAsync();
                                    }
                                }
                                return new FileUploadResponse { Status = BusinessStatus.Created, ResponseMessage = $"Excel Uploaded successfuylly", MessageKey = step1.ToString() };
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
            var data = _context.TblRecruitment.Where(a => a.RecruitmentNo == RecNo).ToList();
            var mappeddata = _mapper.Map<RecruitmentDTO>(data[0]);
            return mappeddata;

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

                dt.Columns.Add("Designation", typeof(string));
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
                                    dr["Designation"] = worksheet.Cells[row, 5].Value.ToString().Trim();
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

            //adding parameter to object dynamically
            AddProperty(dictionary_rule, "IncentiveAmount", dataRow["Incentive Amount"]);

            AddProperty(dictionary_rate, "Designation", dataRow["Designation"]);
            AddProperty(dictionary_rate, "ANP", dataRow["ANP"]);
            AddProperty(dictionary_rate, "RP", dataRow["RP"]);

            //adding Object to object dynamically
            AddProperty(incFields, "dictionary_rule", dictionary_rule);
            AddProperty(incFields, "dictionary_rate", dictionary_rate);

            var result = await _integrationService.CheckCalculationRate(incFields, apiContext);
            return result;
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





                var tblOrgStandards = _context.TblOrgStandards.Where(a => a.Level == tblParticipantMasterDto.Levelid && a.ProgramId == tblParticipantMasterDto.ProgramId).FirstOrDefault();




                //if (tblParticipantMasterDto.DesignationId != null)
                //{
                //    scontract = scontract.Where(s => s.DesignationId == tblParticipantMasterDto.DesignationId);



                //}
                //if (tblParticipantMasterDto.Levelid != null)
                //{
                //    scontract = scontract.Where(s => s.Level == tblParticipantMasterDto.Levelid);



                //}
                //if (tblParticipantMasterDto.ProgramId != null)
                //{
                //    scontract = scontract.Where(s => s.ProgramId == tblParticipantMasterDto.ProgramId);



                //}






                var contractdata = _mapper.Map<OrgStandardsDTO>(tblOrgStandards);




                // JsonSerializer.Serialize(contractdata.MappingDetails);



                //var serializer = new JavaScriptSerializer();




                //dynamic jsonObject = serializer.Deserialize<object>(contractdata.MappingDetails);
                var apiCl = JsonConvert.SerializeObject(contractdata.MappingDetails);
                // dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(apiCl.ToString());



                // var  myProperty = Convert.MyPropertyType(jsonObject["contractdata.MappingDetails"]);
                // var  rowString = contractdata.MappingDetails.Replace('"', ' ').Trim();



                var result = JsonConvert.DeserializeObject<object>(apiCl);


                 

                // var data= serializer.DeserializeObject(result.ToString());



                Object obj = result;
                var c = obj;



                return result;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
