using iNube.Services.Policy.Controllers.DynamicReports.IntegrationServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Helpers.DynamicReportHelpers
{
    public class DbHelper
    {
        private IRPIntegrationService _integrationService;

        public DbHelper(IRPIntegrationService integrationService)
        {
            _integrationService = integrationService;
        }

        public async Task<string> GetEnvironmentConnectionAsync(string product, decimal EnvId)
        {
            var constring = await _integrationService.GetEnvironmentConnection(product, EnvId);
            return constring.Dbconnection;
        }

    }
    public static class ReflectionUtils
    {
        /// <summary>
        /// Get all the fields of a class
        /// </summary>
        /// <param name="type">Type object of that class</param>
        /// <returns></returns>
        public static IEnumerable<FieldInfo> GetAllFields(this Type type)
        {
            if (type == null)
            {
                return Enumerable.Empty<FieldInfo>();
            }

            BindingFlags flags = BindingFlags.Public |
                                 BindingFlags.NonPublic |
                                 BindingFlags.Static |
                                 BindingFlags.Instance |
                                 BindingFlags.DeclaredOnly;

            return type.GetFields(flags).Union(GetAllFields(type.BaseType));
        }
    }
}


