using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Helpers
{
    public class DbHelper
    {
        private IIntegrationService _integrationService;

        public DbHelper(IIntegrationService integrationService)
        {
            _integrationService = integrationService;
        }
         
        public async Task<string> GetEnvironmentConnectionAsync(string product,decimal EnvId)
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
