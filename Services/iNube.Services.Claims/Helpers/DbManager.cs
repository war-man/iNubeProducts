using iNube.Services.Claims.Controllers.ClaimManagement.IntegrationServices;
using iNube.Services.Claims.Entities;
using iNube.Services.Claims.Entities.CNEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace iNube.Services.Claims.Helpers
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
            var dbConnectionString = "";
            switch (dbName)
            {
                case "Dev":
                    dbConnectionString = DbConnectionManager.GetConnectionString("Dev");
                    break;
                case "Mica":
                    dbConnectionString = DbConnectionManager.GetConnectionString("Mica");
                    break;
                case "Prod":
                    dbConnectionString = DbConnectionManager.GetConnectionString("Prod");
                    break;
                case "Test":
                    dbConnectionString = DbConnectionManager.GetConnectionString("Test");
                    break;
                default:
                    dbConnectionString = DbConnectionManager.GetConnectionString("Mica");
                    break;
            }
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
                    var optionsBuilder = new DbContextOptionsBuilder<MICACMContext>();
                    optionsBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICACMContext(optionsBuilder.Options);
                    break;
                //case "Avo":
                //    DbContextOptions<> dbAvoContextOption = (DbContextOptions<AVOCMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                //    context = new AVOUMContext(dbAvoContextOption);
                //    break;
                //case "Motor":
                //    dbConnectionString = DbConnectionManager.GetConnectionString("Prod");
                //    break;AVOCMContext
                default:
                    var optionsBuilderDefault = new DbContextOptionsBuilder<MICACMContext>();
                    optionsBuilderDefault.UseSqlServer(dbConnectionString);
                    // DbContextOptions<MICAUMContext> dbDefaultContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICACMContext(optionsBuilderDefault.Options);
                    break;
            }

            return context;
        }

        public static async Task<DbContext> GetNewContextAsync(string product, string connectionKey, IConfiguration configuration)
        {
            DbContext context = null;
            //string dbConnectionString = DbConnectionManager.GetConnectionString(connectionKey);

            DbHelper dbHelper = new DbHelper(new IntegrationService(configuration));
            string dbConnectionString = await dbHelper.GetEnvironmentConnectionAsync(product, Convert.ToDecimal(connectionKey));

            switch (product)
            {
                case "Mica":
                    var optionsBuilder = new DbContextOptionsBuilder<MICACNContext>();
                    optionsBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICACNContext(optionsBuilder.Options);
                    break;
                //case "Avo":
                //    DbContextOptions<> dbAvoContextOption = (DbContextOptions<AVOCMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                //    context = new AVOUMContext(dbAvoContextOption);
                //    break;
                //case "Motor":
                //    dbConnectionString = DbConnectionManager.GetConnectionString("Prod");
                //    break;AVOCMContext
                default:
                    var optionsBuilderDefault = new DbContextOptionsBuilder<MICACNContext>();
                    optionsBuilderDefault.UseSqlServer(dbConnectionString);
                    // DbContextOptions<MICAUMContext> dbDefaultContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICACNContext(optionsBuilderDefault.Options);
                    break;
            }

            return context;
        }
    }
}
