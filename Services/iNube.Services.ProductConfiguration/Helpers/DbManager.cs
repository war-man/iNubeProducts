using iNube.Services.ProductConfiguration.Controllers.Product.IntegrationServices;
using iNube.Services.ProductConfiguration.Entities;
using iNube.Services.ProductConfiguration.Entities.AvoEntities;
//using iNube.Services.ProductConfiguration.Entities.AVO;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using iNube.Utility.Framework.LogPrivider.LogService;

namespace iNube.Services.ProductConfiguration.Helpers
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
            if(string.IsNullOrEmpty(dbName))
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

            DbHelper dbHelper = new DbHelper(new IntegrationService(configuration, new LoggerManager(configuration)));
            string dbConnectionString = await dbHelper.GetEnvironmentConnectionAsync(product, Convert.ToDecimal(connectionKey));

            switch (product)
            {
                case "Mica":
                    var optionsBuilder = new DbContextOptionsBuilder<MICAPCContext>();
                    optionsBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAPCContext> dbContextOption = (DbContextOptions<MICAPCContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICAPCContext(optionsBuilder.Options);
                    break;
                case "Avo":
                    var optionBuilder = new DbContextOptionsBuilder<AVOPRContext>();
                  //DbContextOptions<AVOPRContext> dbAvoContextOption = (DbContextOptions<AVOPRContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    optionBuilder.UseSqlServer(dbConnectionString);
                    context = new AVOPRContext(optionBuilder.Options);
                    break;
                case "Motor":
                    dbConnectionString = DbConnectionManager.GetConnectionString("Prod");
                    break;
                default:
                    var optionsBuilderDefault = new DbContextOptionsBuilder<MICAPCContext>();
                    optionsBuilderDefault.UseSqlServer(dbConnectionString);
                   // DbContextOptions<MICAPCContext> dbDefaultContextOption = (DbContextOptions<MICAPCContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICAPCContext(optionsBuilderDefault.Options);
                    break;
            }

            return context;
        }
    }
}
