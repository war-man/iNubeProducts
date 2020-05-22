using AutoMapper;

using iNube.Services.Partners.Entities.AVO;
using iNube.Services.Partners.Models;
using iNube.Services.UserManagement.Helpers;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
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

        public AvoContractService(AVOPRContext context, IMapper mapper, IConfiguration configuration)
        {
            // _context = context;
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
                                       await  _context.SaveChangesAsync();
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
    }
}
