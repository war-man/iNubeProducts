using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace iNube.Edelweiss.SMS.AwsLambda
{
    public class Function
    {

        /// <summary>
        /// A simple function that Calls Policy Module to SEND SMS Reminders on 2nd, 4th & 7th Day
        /// PRODUCTION - ENVIRONMENT
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<dynamic> FunctionHandler(DateTime? dateTime, ILambdaContext context)
        {
            HttpClient client = new HttpClient();

            if (dateTime == null)
            {
                client.BaseAddress = new Uri("https://egiswitchapi.edelweissinsurance.com/api/Policy/SmsScheduler");
            }
            else
            {
                //client.BaseAddress = new Uri("https://egiswitchapi.edelweissinsurance.com/api/Policy/SmsScheduler?dateTime=" + dateTime);
                return false;
            }

            string Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1ZjZjNGNiOC0zNDEyLTQwZjEtYWM0Mi1kZGI2NjU0YTZhMjQiLCJFbWFpbCI6ImludWJldXNlckBpbnViZXNvbHV0aW9ucy5jb20iLCJPcmdJZCI6IjIiLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6IkVkZWx3ZWlzcyIsIlVzZXJOYW1lIjoiRWRlbHdlaXNzVXNlciIsIlByb2R1Y3RUeXBlIjoiTUlDQSIsIlNlcnZlclR5cGUiOiIyOTciLCJleHAiOjE2NTAxNjk3NDQsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.OwQuftSndVxuSfbfpBhDjpxu7qMfqmBCPmOw4SsJL7s";
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);

            try
            {

                //HTTP GET
                using (var response = await client.GetAsync(client.BaseAddress))
                using (var content = response.Content)
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var serviceResponse = await content.ReadAsStringAsync();

                        if (!String.IsNullOrEmpty(serviceResponse))
                        {
                            var request = new PublishRequest
                            {
                                Message = $"SMS Scheduler successfully executed & Its Status - " + serviceResponse,
                                TopicArn = "arn:aws:sns:ap-south-1:471379395009:SchedulerTopic",
                            };


                            var awsconfig = new AmazonSimpleNotificationServiceClient(Amazon.RegionEndpoint.APSouth1);
                            var AwsSns = await awsconfig.PublishAsync(request);

                            return serviceResponse;
                        }
                        else
                        {
                            var request = new PublishRequest
                            {
                                Message = $"SMS scheduler failed - reponse did not come as expected",
                                TopicArn = "arn:aws:sns:ap-south-1:471379395009:SchedulerTopic",
                            };

                            var awsconfig = new AmazonSimpleNotificationServiceClient(Amazon.RegionEndpoint.APSouth1);
                            var AwsSns = await awsconfig.PublishAsync(request);

                        }

                    }
                }
            }
            catch
            {
                var request = new PublishRequest
                {
                    Message = $"SMS scheduler failed due to some exception",
                    TopicArn = "arn:aws:sns:ap-south-1:471379395009:SchedulerTopic",
                };

                var awsconfig = new AmazonSimpleNotificationServiceClient(Amazon.RegionEndpoint.APSouth1);
                var AwsSns = await awsconfig.PublishAsync(request);

            }

            return false;
        }
    }
}
