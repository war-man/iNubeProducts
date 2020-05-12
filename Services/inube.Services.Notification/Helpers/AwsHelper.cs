using Amazon.S3;
using Amazon.S3.Model;
using inube.Services.Notification.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace inube.Services.Notification.Helpers
{
    public static class AwsHelper
    {
        private static String accessKey = "AKIA356K6S5LD2TBTFZR";
        private static String accessSecret = "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";
        private static String bucket = "invoiceawsbucket";

        public static async Task<UploadStatus> UploadObject(FileUploadDTO fileUploadDTO)
        {
            try
            {
                // connecting to the client
                var client = new AmazonS3Client(accessKey, accessSecret, Amazon.RegionEndpoint.USEast1);

                // create unique file name for prevent the mess
                var fileName =  fileUploadDTO.FileName;

                PutObjectResponse response = null;

                if (fileUploadDTO.FileData.Length > 0)
                {
                    var memStream = new MemoryStream(fileUploadDTO.FileData);
                    memStream.Position = 0;
                    var contentType = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
                    var request = new PutObjectRequest
                    {
                        BucketName = bucket,
                        Key = fileName,
                        InputStream = memStream,
                        ContentType = fileUploadDTO.ContentType,
                        CannedACL = S3CannedACL.PublicRead
                    };
                    response = await client.PutObjectAsync(request);
                }

                if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
                {
                    // this model is up to you, in my case I have to use it following;
                    return new UploadStatus
                    {
                        FileName = fileName,
                        FileLink = "https://invoiceawsbucket.s3.amazonaws.com/" + fileName,
                        SuccessCount = 1
                    };
                }
                else
                {
                    // this model is up to you, in my case I have to use it following;
                    return new UploadStatus
                    {
                        FileName = fileName,
                        SuccessCount = 0
                    };
                }
            }
            catch (Exception)
            {
                //var syz = "";
                return null;
            }
            
        }

       
    }
    
}
