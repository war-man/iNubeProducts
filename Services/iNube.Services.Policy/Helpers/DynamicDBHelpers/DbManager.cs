using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Helpers;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using iNube.Services.Policy.Entities.DynamicGraphEntities;
using iNube.Services.Policy.Entities.AVO.DynamicReportEntities;

namespace iNube.Services.Policy.Helpers.DynamicDBHelpers
{
    public class DbConnection
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("dbconnection")]
        public string Dbconnection { get; set; }

        public static List<DbConnection> FromJson(string json) => JsonConvert.DeserializeObject<List<DbConnection>>(json);
    }
    public static class DbConnectionManager
    {
        public static List<DbConnection> GetAllConnections()
        {
            List<DbConnection> result;
            using (StreamReader r = new StreamReader("DbConnection.json"))
            {
                string json = r.ReadToEnd();
                result = DbConnection.FromJson(json);
            }
            return result;
        }

        public static string GetConnectionString(string dbName)
        {
            if (string.IsNullOrEmpty(dbName))
            {
                dbName = "MicaDev";
            }
            return GetAllConnections().FirstOrDefault(c => c.Name == dbName)?.Dbconnection;
        }
    }
    public static class DbManager
    {
        public static string DbName;

        public static string GetDbConnectionString(string dbName)
        {
            var dbConnectionString = DbConnectionManager.GetConnectionString(dbName);

            //switch (dbName)
            //{
            //    case "Dev":
            //        dbConnectionString = DbConnectionManager.GetConnectionString("Dev");
            //        break;
            //    case "Mica":
            //        dbConnectionString = DbConnectionManager.GetConnectionString("Mica");
            //        break;
            //    case "Prod":
            //        dbConnectionString = DbConnectionManager.GetConnectionString("Prod");
            //        break;
            //    case "Test":
            //        dbConnectionString = DbConnectionManager.GetConnectionString("Test");
            //        break;
            //    default:
            //        dbConnectionString = DbConnectionManager.GetConnectionString("Mica");
            //        break;
            //}
            return dbConnectionString;
        }

        public static async Task<DbContext> GetContextAsync(string product, string connectionKey, IConfiguration configuration)
        {
            DbContext context = null;
            //string dbConnectionString = DbConnectionManager.GetConnectionString(connectionKey);

            DbHelper dbHelper = new DbHelper(new IntegrationService(configuration));
            string dbConnectionString = await dbHelper.GetEnvironmentConnectionAsync(product, Convert.ToDecimal(connectionKey));

            switch (product)
            {
                case "Mica":
                    var optionsBuilder = new DbContextOptionsBuilder<MICADBContext>();
                    optionsBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAPCContext> dbContextOption = (DbContextOptions<MICAPCContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICADBContext(optionsBuilder.Options);
                    break;
                case "Avo":
                    var optionBuilder = new DbContextOptionsBuilder<AVORPContext>();
                    //DbContextOptions<AVORPContext> dbAvoContextOption = (DbContextOptions<AVOPRContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    optionBuilder.UseSqlServer(dbConnectionString);
                    context = new AVORPContext(optionBuilder.Options);
                    break;
                case "Motor":
                    dbConnectionString = DbConnectionManager.GetConnectionString("Prod");
                    break;
                default:
                    var optionsBuilderDefault = new DbContextOptionsBuilder<MICADBContext>();
                    optionsBuilderDefault.UseSqlServer(dbConnectionString);
                    // DbContextOptions<MICAPCContext> dbDefaultContextOption = (DbContextOptions<MICAPCContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICADBContext(optionsBuilderDefault.Options);
                    break;
            }

            return context;
        }
    }
}
