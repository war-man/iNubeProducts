using System.Net.Http;
using System.Text;
using Newtonsoft.Json;


namespace iNube.Services.UserManagement.Test.Helpers
{
    class TestHelper
    {
    }
    public static class ContentHelper
    {
        public static StringContent GetStringContent(object obj)
            => new StringContent(JsonConvert.SerializeObject(obj), Encoding.Default, "application/json");
    }
}
