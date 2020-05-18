using AutoMapper;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Data;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using iNube.Services.Dispatcher.Entities;
using iNube.Services.Dispatcher.Helpers;
using iNube.Services.Dispatcher.Models;

namespace iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService.MicaObjectMapper
{
    public class MicaObjectMapperService : IObjectMapperService
    {
        private MICADTContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly Func<string, IObjectMapperService> _ratingService;

        public MicaObjectMapperService(Func<string, IObjectMapperService> ratingService, IMapper mapper, MICADTContext context,
            IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
            _ratingService = ratingService;
        }

        //Service COde Dynamic Mapper Check
        //public async Task<object> DynamicMapper(dynamic inputModel, string mappingname, ApiContext apiContext)
        //{
        //    try
        //    {             //var riskparmeters = await _integrationService.GetMappingParams(mappingname, apiContext);
        //        _context = (MICADTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
        //    }
        //    catch(Exception ex)
        //    {

        //    }
        //    var tbl_mapper = _context.TblMapper.FirstOrDefault(x => x.MapperName == mappingname);
        //    var mapperid = tbl_mapper.MapperId;
            
        //    IEnumerable<MappingDetailsDTO> riskparmeters = null;
        //    riskparmeters = _context.TblMapperDetails.Where(s => s.MapperId == mapperid)
        //                      .Select(c => new MappingDetailsDTO
        //                      {
        //                          //MappingId = c.MappingId,
        //                          SourceParameter = c.SourceParameter,
        //                          TargetParameter = c.TargetParameter,

        //                      }).ToList();
        //    Dictionary<dynamic, dynamic> dict = new Dictionary<dynamic, dynamic>();
        //    Dictionary<string, List<TargetPathDetails>> myDic = new Dictionary<string, List<TargetPathDetails>>();
        //    List<TargetPathDetails> lstParamObj = new List<TargetPathDetails>();
        //    var count1 = 0;
        //    bool singleObj = false;
        //    foreach (var item in riskparmeters)
        //    {
        //        TargetPathDetails obj = new TargetPathDetails();
        //        String[] strlist1 = item.TargetParameter.Split('.', StringSplitOptions.None);
        //        count1 = strlist1.Count();
        //        obj.TargetParam = strlist1[count1 - 1].ToString();
        //        obj.Value = (string)inputModel[item.SourceParameter];
        //        if(obj.Value == null)
        //        {
        //            obj.Value = (string)inputModel.SelectToken(item.SourceParameter);
        //        }
        //        if (count1 == 1)
        //        {
        //            lstParamObj.Add(obj);
        //            singleObj = true;
        //        }
        //        else
        //        {
        //            List<TargetPathDetails> copyList = new List<TargetPathDetails>();
        //            copyList.Add(obj);
        //            bool exits = myDic.ContainsKey(strlist1[0]);
        //            if (exits == false)
        //            {
        //                myDic.Add(strlist1[0], copyList);
        //            }
        //            else
        //            {
        //                foreach (var it in myDic)
        //                {
        //                    if (it.Key == strlist1[0])
        //                    {
        //                        it.Value.Add(obj);
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    JObject parent = new JObject();
        //    int count = 0;
        //    if(singleObj == true)
        //    {
        //        JObject child = new JObject();
        //        int countChild = 0;
        //        foreach (var item in lstParamObj)
        //        {
        //            //JObject parent = new JObject();
        //            if (countChild == 0)
        //            {
        //                child = new JObject(
        //                    new JProperty(item.TargetParam, item.Value));
        //                countChild++;
        //            }
        //            else
        //            {
        //                try
        //                {
        //                    child.Add(new JProperty(item.TargetParam, item.Value));
        //                }
        //                catch (Exception ex)
        //                {
        //                    child.Add(new JProperty(item.TargetParam + " ", item.Value));
        //                }
        //            }
        //        }
        //        return child;
        //    }
        //    foreach (var item in myDic)
        //    {
        //        int countChild = 0;
        //        //JObject parent = new JObject();
        //        JObject child = new JObject();
        //        foreach (var it in item.Value)
        //        {
        //            if (countChild == 0)
        //            {
        //                child = new JObject(
        //                    new JProperty(it.TargetParam, it.Value));
        //                countChild++;
        //            }
        //            else
        //            {
        //                try
        //                {
        //                    child.Add(new JProperty(it.TargetParam, it.Value));
        //                }
        //                catch (Exception ex)
        //                {
        //                    child.Add(new JProperty(it.TargetParam + " ", it.Value));
        //                }
        //            }
        //        }
        //        if (count == 0)
        //        {
        //            parent = new JObject(
        //                           new JProperty(item.Key, child));
        //            count++;
        //        }
        //        else
        //        {
        //            parent.Add(new JProperty(item.Key, child));
        //        }
        //    }

        //    //dict.Add("Obj", parent);
        //    //return dict;
        //    return parent;
        //}


        public async Task<dynamic> DynamicMapper(dynamic Obj, string mapName, ApiContext apiContext)
        {
            _context = (MICADTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            //IEnumerable<TblObjMapDetails> MapDetails = _context.TblObjMapDetails.Where(x => x.ObjMapCode == mapName).Select(x => x);// Contains the source and target from database
            var MapDetails = from tblMapper in _context.TblMapper
                             where (tblMapper.MapperName == mapName)
                             join tblMapperDetails in _context.TblMapperDetails on tblMapper.MapperId equals tblMapperDetails.MapperId
                             select new ObjMapDetailsDTO
                             {
                                 ObjMapSource = tblMapperDetails.SourceParameter,
                                 ObjMapTarget = tblMapperDetails.TargetParameter,
                                 ObjMapTargetPath = tblMapperDetails.TargetParameterPath
                             };


            string json = Obj.ToString();
            Dictionary<string, dynamic> Pairs = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);//Contains the input after deserialisation
            //dynamic Pairs= JsonConvert.DeserializeObject<ExpandoObject>(json);
            Dictionary<string, dynamic> NewObj = new Dictionary<string, dynamic>();
            List<Dictionary<string, dynamic>> dict = new List<Dictionary<string, dynamic>>();

            Dictionary<string, dynamic> tempObj = new Dictionary<string, dynamic>();
            List<Dictionary<string, dynamic>> tempArrayObj = new List<Dictionary<string, dynamic>>();

            Dictionary<string, dynamic> finalObj = new Dictionary<string, dynamic>();
            List<Dictionary<string, dynamic>> finalArrayObj = new List<Dictionary<string, dynamic>>();

            finalArrayObj.Add(finalObj);

            foreach (var item in MapDetails)
            {
                // Get Source Value
                dynamic sourceValue, targetPath, targetObj;

                if (item.ObjMapSource.Contains('.'))
                {
                    string[] sPathUnit = item.ObjMapSource.Split('.');
                    dynamic sPathValue = Pairs[sPathUnit[0]];
                    foreach (string sPathItem in sPathUnit)
                    {
                        if (sPathItem == sPathUnit[0])
                            continue;
                        if (int.TryParse(sPathItem, out int res))
                            sPathValue = (dynamic)(sPathValue)[res];
                        else
                            sPathValue = (dynamic)(sPathValue)[sPathItem];
                    }
                    sourceValue = sPathValue.Value;

                }
                else
                {
                    if (Pairs.ContainsKey(item.ObjMapSource))
                        sourceValue = Pairs[item.ObjMapSource];
                    else
                        sourceValue = item.ObjMapSource;

                }

                // Set the Target Value
                // If it is just an Object
                if (item.ObjMapTargetPath.Contains('.'))
                {
                    string[] sPathUnit = item.ObjMapTargetPath.Split('.');
                    dynamic sPathValue = sPathUnit[0];
                    dynamic ChildObj = finalObj;
                    targetObj = finalObj;

                    int iLevel = 0;

                    foreach (string sPathItem in sPathUnit)
                    {
                        iLevel++;
                        if (iLevel == 1)
                        {
                            if (int.TryParse(sPathItem, out int fres))
                            {
                                if (finalArrayObj.Count > fres)
                                {
                                    targetObj = finalArrayObj[fres];
                                }
                                else
                                {
                                    for (int iCount = finalArrayObj.Count; iCount <= fres; iCount++)
                                    {
                                        Dictionary<string, dynamic> tObj = new Dictionary<string, dynamic>();
                                        finalArrayObj.Add(tObj);
                                    }
                                    targetObj = finalArrayObj[fres];
                                }

                            }
                            else
                            {
                                if (targetObj.ContainsKey(sPathItem))
                                {
                                    targetObj = (dynamic)(targetObj)[sPathItem];
                                }
                                else
                                {
                                    if (sPathUnit.Length > iLevel)
                                    {
                                        if (int.TryParse(sPathUnit[iLevel], out int cres))
                                        {
                                            List<Dictionary<string, dynamic>> tArrayObj = new List<Dictionary<string, dynamic>>();
                                            for (int iCount = 0; iCount <= cres; iCount++)
                                            {
                                                Dictionary<string, dynamic> tcObj = new Dictionary<string, dynamic>();
                                                tArrayObj.Add(tcObj);
                                            }
                                            targetObj.Add(sPathItem, tArrayObj);
                                        }
                                        else
                                        {
                                            Dictionary<string, dynamic> tObj = new Dictionary<string, dynamic>();
                                            targetObj.Add(sPathItem, tObj);
                                        }
                                    }
                                    else
                                    {
                                        Dictionary<string, dynamic> tObj = new Dictionary<string, dynamic>();
                                        targetObj.Add(sPathItem, tObj);
                                    }
                                    targetObj = (dynamic)(targetObj)[sPathItem];
                                }
                            }
                            continue;
                        }
                        if (int.TryParse(sPathItem, out int res))
                        {
                            if (targetObj.Count > res)
                            {
                                targetObj = targetObj[res];
                            }


                        }
                        else
                        {
                            if (targetObj.ContainsKey(sPathItem))
                            {
                                if (sPathUnit.Length > iLevel)
                                {
                                    if (int.TryParse(sPathUnit[iLevel], out int cres))
                                    {
                                        if (targetObj[sPathItem].Count <= cres)
                                        {
                                            List<Dictionary<string, dynamic>> tArrayObj = new List<Dictionary<string, dynamic>>();
                                            for (int iCount = targetObj[sPathItem].Count; iCount <= cres; iCount++)
                                            {
                                                Dictionary<string, dynamic> tcObj = new Dictionary<string, dynamic>();
                                                targetObj[sPathItem].Add(tcObj);
                                            }
                                            targetObj = (dynamic)(targetObj)[sPathItem];
                                        }
                                        else
                                            targetObj = (dynamic)(targetObj)[sPathItem];
                                        // targetObj.Add(sPathItem, tArrayObj);
                                    }
                                    else
                                        targetObj = (dynamic)(targetObj)[sPathItem];
                                }
                                else
                                    targetObj = (dynamic)(targetObj)[sPathItem];
                            }
                            else
                            {
                                if (sPathUnit.Length > iLevel)
                                {
                                    if (int.TryParse(sPathUnit[iLevel], out int cres))
                                    {
                                        List<Dictionary<string, dynamic>> tArrayObj = new List<Dictionary<string, dynamic>>();
                                        for (int iCount = 0; iCount <= cres; iCount++)
                                        {
                                            Dictionary<string, dynamic> tcObj = new Dictionary<string, dynamic>();
                                            tArrayObj.Add(tcObj);
                                        }
                                        targetObj.Add(sPathItem, tArrayObj);
                                    }
                                    else
                                    {
                                        Dictionary<string, dynamic> tObj = new Dictionary<string, dynamic>();
                                        targetObj.Add(sPathItem, tObj);
                                    }
                                }
                                else
                                {
                                    Dictionary<string, dynamic> tObj = new Dictionary<string, dynamic>();
                                    targetObj.Add(sPathItem, tObj);
                                }
                                targetObj = (dynamic)(targetObj)[sPathItem];

                            }
                        }

                    }
                    targetPath = sPathValue;
                    targetObj.Add(item.ObjMapTarget, sourceValue);

                }
                else
                {
                    dynamic sPathValue = item.ObjMapTargetPath;
                    targetObj = finalObj;
                    if (int.TryParse(sPathValue, out int res))
                    {
                        if (finalArrayObj.Count > res)
                        {
                            targetObj = finalArrayObj[res];
                        }
                        else
                        {
                            for (int iCount = finalArrayObj.Count; iCount <= res; iCount++)
                            {
                                Dictionary<string, dynamic> tObj = new Dictionary<string, dynamic>();
                                finalArrayObj.Add(tObj);
                            }
                            targetObj = finalArrayObj[res];
                        }

                    }
                    else
                    {
                        if (targetObj.ContainsKey(sPathValue))
                        {
                            targetObj = (dynamic)(targetObj)[sPathValue];
                        }
                        else
                        {
                            Dictionary<string, dynamic> tObj = new Dictionary<string, dynamic>();
                            targetObj.Add(sPathValue, tObj);
                            targetObj = (dynamic)(targetObj)[sPathValue];
                        }
                    }
                    targetPath = sPathValue;
                    targetObj.Add(item.ObjMapTarget, sourceValue);
                }
            }
            return finalArrayObj;
        }
    }
}
