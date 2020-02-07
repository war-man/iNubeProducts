using AspNetCore.Reporting;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace inube.Services.Notification.Controllers.RDLC.RdlcService
{
    public interface IReportsService
    {
        ReportResult ReportForCoveringLetter(string PolicyNo);
        ReportResult ReportForAVOGIReport(string PolicyNo, string CoverNoteNo);
    }
    public class ReportsService:IReportsService
    {

        public ReportsService()
        {
          
        }

        public ReportResult ReportForCoveringLetter(string PolicyNo)
        {
            //Policy No for reference which consists of data :-> P190002323-11
            DataSet dataset = FuncForCovLetterDetailPDF(PolicyNo);
            List<DataSet> dslst = new List<DataSet>();
            dslst.Add(dataset);
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("PolicyNo", PolicyNo);
            var path = Path.Combine(Directory.GetCurrentDirectory(), "Reports\\OtherProductsCoveringLetter.rdlc");
            var result = GenerateRDLCReports(dslst, parameters, path);
            return result;
        }

        public ReportResult GenerateRDLCReports(List<System.Data.DataSet> dsPayementStmt, Dictionary<string, string> Parameters, string ReportPath)
        {
            var localReport = new AspNetCore.Reporting.LocalReport(ReportPath);
            int extension = 1;
            int count = 0;
            foreach (DataSet item in dsPayementStmt)
            {
                count++;
                localReport.AddDataSource("DataSet" + count, item.Tables[0]);
            }
            var reportdata = localReport.Execute(RenderType.Pdf, extension, parameters: Parameters);
            return reportdata;
        }


        public DataSet FuncForCovLetterDetailPDF(string PolicyNo)
        {
            try
            {
                string cs = @"Data Source=inubepeg.database.windows.net;Initial Catalog=AVOLife2;User ID=AVOLifeUser;Password=AVO*Life123;";

                System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(cs);
                con.Open();
                System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "usp_CovLetterDetails_PDF";
                cmd.Parameters.AddWithValue("@PolicyNo", PolicyNo);

                DataSet ds = new DataSet();
                System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter(cmd);
                da.Fill(ds);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //AVOGIReport_PC Rdlc
        public ReportResult ReportForAVOGIReport(string PolicyNo, string CoverNoteNo)
        {
            //Policy No for reference which consists of data :-> P190002323-11
            DataSet dataset = FuncForAVOGIReportPDFD2(CoverNoteNo);
            List<DataSet> dslst = new List<DataSet>();
            dslst.Add(dataset);
            DataSet ds1 = FuncForAVOGIReportPDFD1(PolicyNo);
            dslst.Add(ds1);
            DataSet ds2 = FuncForAVOGIReportPDFD3(PolicyNo);
            dslst.Add(ds2);
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("PolicyNo", PolicyNo);
            //parameters.Add("CoverNoteNo", CoverNoteNo);
            //var path = Path.Combine(Directory.GetCurrentDirectory(), "Reports\\OtherProductsCoveringLetter.rdlc");

            var path = Path.Combine(Directory.GetCurrentDirectory(), "Reports\\AVOGIReport_PC.rdlc");
            var result = GenerateRDLCReports(dslst, parameters, path);
            return result;
        }
        public DataSet FuncForAVOGIReportPDFD2(string CoverNoteNo)
        {
            try
            {
                //string cs = @"Data Source=inubepeg.database.windows.net;Initial Catalog=AVOLife2;User ID=AVOLifeUser;Password=AVO*Life123;";
                string cs = @"Data Source=sqlserver_ec2_aws_uat.libertyinsurance.in,8190;Initial Catalog=Partner_and_CustomerPortal_UAT;User ID=PP_DML;Password=Pass@123;";

                System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(cs);
                con.Open();
                System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getPaymentDetails_For_Reporting";
                cmd.Parameters.AddWithValue("@PolicyNo", CoverNoteNo);
                //cmd.CommandText = "getIPADetails_For_Reporting";
                //cmd.Parameters.AddWithValue("@PolicyNo", PolicyNo);

                DataSet ds = new DataSet();
                System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter(cmd);
                da.Fill(ds);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataSet FuncForAVOGIReportPDFD1(string PolicyNo)
        {
            try
            {
                //string cs = @"Data Source=inubepeg.database.windows.net;Initial Catalog=AVOLife2;User ID=AVOLifeUser;Password=AVO*Life123;";
                string cs = @"Data Source=sqlserver_ec2_aws_uat.libertyinsurance.in,8190;Initial Catalog=Partner_and_CustomerPortal_UAT;User ID=PP_DML;Password=Pass@123;";

                System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(cs);
                con.Open();
                System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getBQADetails_For_Reporting_Private_CP";
                cmd.Parameters.AddWithValue("@PolicyNo", PolicyNo);
                //cmd.CommandText = "getIPADetails_For_Reporting";
                //cmd.Parameters.AddWithValue("@PolicyNo", PolicyNo);

                DataSet ds = new DataSet();
                System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter(cmd);
                da.Fill(ds);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataSet FuncForAVOGIReportPDFD3(string PolicyNo)
        {
            try
            {
                //string cs = @"Data Source=inubepeg.database.windows.net;Initial Catalog=AVOLife2;User ID=AVOLifeUser;Password=AVO*Life123;";
                string cs = @"Data Source=sqlserver_ec2_aws_uat.libertyinsurance.in,8190;Initial Catalog=Partner_and_CustomerPortal_UAT;User ID=PP_DML;Password=Pass@123;";

                System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(cs);
                con.Open();
                System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "usp_getbqADigitalSignature";
                //cmd.Parameters.AddWithValue("@PolicyNo", PolicyNo);
                //cmd.CommandText = "getIPADetails_For_Reporting";
                //cmd.Parameters.AddWithValue("@PolicyNo", PolicyNo);

                DataSet ds = new DataSet();
                System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter(cmd);
                da.Fill(ds);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
