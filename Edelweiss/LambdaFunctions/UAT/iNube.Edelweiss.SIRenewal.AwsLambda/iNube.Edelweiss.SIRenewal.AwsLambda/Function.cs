using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

using Amazon.Lambda.Core;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace iNube.Edelweiss.SIRenewal.AwsLambda
{
    public class Function
    {

        /// <summary>
        /// A simple function that Calls Extension Module to alert payment renewal
        /// UAT - ENVIRONMENT
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<dynamic> FunctionHandler(ILambdaContext context)
        {
            HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("https://egiswitchapi.edelweisscustomeruat.com/api/Mica_EGI/RenewalScheduler");
            
            string Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6Im1vaGFuQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJpTnViZSBBZG1pbiIsIk5hbWUiOiJJbnViZSIsIlVzZXJOYW1lIjoiZWludWJlYWRtaW4iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMjk4IiwiZXhwIjoxNjE0MzQ1MjIyLCJpc3MiOiJJbnViZSIsImF1ZCI6IkludWJlTUlDQSJ9.K2amPy2bWohxvJzsbniVzWSfbqcsGtmmPYk5xG8K5lk";
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
