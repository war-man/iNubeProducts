using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

using Amazon.Lambda.Core;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace iNube.Edelweiss.PremiumScheduler.AwsLambda
{
    public class Function
    {

        /// <summary>
        /// A simple function that Calls MICA Extension Module PremiumBooking API
		/// PRODUCTION - ENVIRONMENT
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<dynamic> FunctionHandler(DateTime? dateTime, ILambdaContext context)
        {
            HttpClient client = new HttpClient();

            if (dateTime == null)
            {
                client.BaseAddress = new Uri("https://egiswitchapi.edelweissinsurance.com/api/Mica_EGI/PremiumBooking");
            }
            else
            {
                client.BaseAddress = new Uri("https://egiswitchapi.edelweissinsurance.com/api/Mica_EGI/PremiumBooking?dateTime=" + dateTime);
            }

            string Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1ZjZjNGNiOC0zNDEyLTQwZjEtYWM0Mi1kZGI2NjU0YTZhMjQiLCJFbWFpbCI6ImludWJldXNlckBpbnViZXNvbHV0aW9ucy5jb20iLCJPcmdJZCI6IjIiLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6IkVkZWx3ZWlzcyIsIlVzZXJOYW1lIjoiRWRlbHdlaXNzVXNlciIsIlByb2R1Y3RUeXBlIjoiTUlDQSIsIlNlcnZlclR5cGUiOiIyOTciLCJleHAiOjE2NTAxNjk3NDQsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.OwQuftSndVxuSfbfpBhDjpxu7qMfqmBCPmOw4SsJL7s";

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);

            //HTTP GET
            using (var response = await client.GetAsync(client.BaseAddress))
            using (var content = response.Content)
            {
                if (response.IsSuccessStatusCode)
                {
                    var serviceResponse = await content.ReadAsStringAsync();

                    if (serviceResponse != null)
                    {
                        return serviceResponse;
                    }

                }
            }

            return false;
        }
    }
}
