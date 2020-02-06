using inube.Services.Notification.Models;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Threading.Tasks;
using TemplateDemo.Models;

namespace inube.Services.Notification
{
    public class QuestionHelper
    {
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
      


        public QuestionsDetails GetQuestionList(decimal PaperSetFrom, decimal PaperSetTo)
        {
            Question question = new Question();
            QuestionsDetails questionsDetails = new QuestionsDetails();
            questionsDetails.Exam = "Campus Placement";
            questionsDetails.Date = DateTime.Now.ToShortDateString();
            DataTable dt = GetAllQuestion(PaperSetFrom, PaperSetTo);
            var questionList = dt.ToList<Question>();
            questionsDetails.AllQuestions.AddRange(questionList);
            questionsDetails.Status = BusinessStatus.Ok;
            return questionsDetails;
        }
        private DataTable GetAllQuestion(decimal QuestionBankIdFrom, decimal @QuestionBankIdTo)
        {
              //_context = (MICAPOContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            var connectionString = "Data Source=inubepeg.database.windows.net;Initial Catalog=iNubeQuestionBank;User Id=iNubeQuestions;Password=iNube*Questions123";
            DataTable dt = new DataTable();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("[dbo].[usp_GetQuestionsWithAnswer]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@QuestionBankIdFrom", QuestionBankIdFrom);
                command.Parameters.AddWithValue("@QuestionBankIdTo", @QuestionBankIdTo);
                command.CommandTimeout = 3600;
                command.ExecuteNonQuery();
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(command);
                sqlDataAdapter.Fill(dt);
               
                connection.Close();
            }
            return dt;
        }

       
    }
   
    public static class DataTableExtension
    {
        public static List<T> ToList<T>(this DataTable table) where T : class, new()
        {
            try
            {
                List<T> list = new List<T>();

                foreach (var row in table.AsEnumerable())
                {
                    T obj = new T();

                    foreach (var prop in obj.GetType().GetProperties())
                    {
                        try
                        {
                            PropertyInfo propertyInfo = obj.GetType().GetProperty(prop.Name);
                            propertyInfo.SetValue(obj, Convert.ChangeType(row[prop.Name], propertyInfo.PropertyType), null);
                        }
                        catch
                        {
                            continue;
                        }
                    }

                    list.Add(obj);
                }

                return list;
            }
            catch
            {
                return null;
            }
        }
    }
    }
