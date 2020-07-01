using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Entities.AVO;
using iNube.Services.UserManagement.Entities.MICACP;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Helpers
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
        public static string _TimeZone { get; set; }
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
                case "CP":
                    dbConnectionString = DbConnectionManager.GetConnectionString("Mica");
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

        public static DbContext GetContext(string product, string connectionKey)
        {
            DbContext context = null;
            //string dbConnectionString = DbConnectionManager.GetConnectionString(connectionKey);
            DbHelper dbHelper = new DbHelper();

            string dbConnectionString = dbHelper.GetEnvironmentConnection(product, Convert.ToDecimal(connectionKey));

            switch (product)
            {
                case "Mica":
                    var optionsBuilder = new DbContextOptionsBuilder<MICAUMContext>();
                    optionsBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICAUMContext(optionsBuilder.Options);
                    break;
                case "Avo":
                    var avoOptionsBuilder = new DbContextOptionsBuilder<AVOUMContext>();
                    avoOptionsBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new AVOUMContext(avoOptionsBuilder.Options);
                    break;
                case "Motor":
                    //var motorOptionsBuilder = new DbContextOptionsBuilder<Mot>();
                    //motorOptionsBuilder.UseSqlServer(dbConnectionString);
                    ////DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    //context = new AVOUMContext(motorOptionsBuilder.Options);
                    break;
                case "CP":
                    var optionsCPBuilder = new DbContextOptionsBuilder<MICACPContext>();
                    optionsCPBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICACPContext(optionsCPBuilder.Options);
                    break;
                default:
                    var optionsBuilderDefault = new DbContextOptionsBuilder<MICAUMContext>();
                    optionsBuilderDefault.UseSqlServer(dbConnectionString);
                    // DbContextOptions<MICAUMContext> dbDefaultContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICAUMContext(optionsBuilderDefault.Options);
                    break;
            }

            return context;
        }

        public static DbContext GetCPContext(string product)
        {
            DbContext context = null;
            string dbConnectionString = "Data Source=micadev.coow0ess1gft.ap-south-1.rds.amazonaws.com;Initial Catalog=iNubeCommon;User Id=admin;Password=micaadmin";
            //string dbConnectionString = "Data Source=inubepeg.database.windows.net;Initial Catalog=MICADev;User Id=MICAUSER;Password=MICA*user123";
            //string dbConnectionString = "Data Source=micaprod.coow0ess1gft.ap-south-1.rds.amazonaws.com;Initial Catalog=iNubeCommon;User Id=admin;Password=micaadmin";

            var optionsCPBuilder = new DbContextOptionsBuilder<MICACPContext>();
            optionsCPBuilder.UseSqlServer(dbConnectionString);
            //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
            context = new MICACPContext(optionsCPBuilder.Options);

            return context;
        }

        public static DbContext GetContextByConnection(string product, string dbConnectionString)
        {
            DbContext context = null;

            switch (product)
            {
                case "Mica":
                    var optionsBuilder = new DbContextOptionsBuilder<MICAUMContext>();
                    optionsBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICAUMContext(optionsBuilder.Options);
                    break;
                case "Avo":
                    var avoOptionsBuilder = new DbContextOptionsBuilder<AVOUMContext>();
                    avoOptionsBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new AVOUMContext(avoOptionsBuilder.Options);
                    break;
                case "Motor":
                    //var motorOptionsBuilder = new DbContextOptionsBuilder<Mot>();
                    //motorOptionsBuilder.UseSqlServer(dbConnectionString);
                    ////DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    //context = new AVOUMContext(motorOptionsBuilder.Options);
                    break;
                case "CP":
                    var optionsCPBuilder = new DbContextOptionsBuilder<MICACPContext>();
                    optionsCPBuilder.UseSqlServer(dbConnectionString);
                    //DbContextOptions<MICAUMContext> dbContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICACPContext(optionsCPBuilder.Options);
                    break;
                default:
                    var optionsBuilderDefault = new DbContextOptionsBuilder<MICAUMContext>();
                    optionsBuilderDefault.UseSqlServer(dbConnectionString);
                    // DbContextOptions<MICAUMContext> dbDefaultContextOption = (DbContextOptions<MICAUMContext>)SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), dbConnectionString).Options;
                    context = new MICAUMContext(optionsBuilderDefault.Options);
                    break;
            }

            return context;
        }
        public static CustomerSettingsDTO GetCustomerSettings(string type, ApiContext apiContext)
        {

            DbHelper dbHelper = new DbHelper();
            var result = dbHelper.GetCustomerSettings(apiContext.OrgId, type, apiContext.ProductType, 0, apiContext);
            return result;
        }

        public static DateTime GetDateTimeByZone(string userTimeZone)
        {

            DateTime zonelocalDateTime = System.DateTime.UtcNow.AddMinutes(330);

            return zonelocalDateTime;
        }
    }
}
