
using inube.Services.Notification.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;


namespace TemplateDemo.Models
{
    public class AptiQuestionsModel
    {
        public Question AllQuestions { get; set; }
        public QuestionsDetails QuestionsDetails { get; set; }
        public QBKPattern QBKPattern { get; set; }
        public QBKPatternDetails QBKPatternDetails { get; set; }
       // public QuestionAnswers QuestionAnswers { get; set; }
        public DateTime? Date { get; set; }
        public QuestionBank QuestionBank { get; set; }
      //  public QuestionBankQuestionMap QuestionBankQuestionMap { get; set; }
        public Questions Questions { get; set; }
        public EmailRequest EmailTest { get; set; }
    }
    //public class QuestionsDetails
    //{
    //    public QuestionsDetails()
    //    {
    //        AllQuestions = new List<AllQuestions>();
    //    }
    //    public List<AllQuestions> AllQuestions { get; set; }
    //}
    public class AllQuestions
    {

        public int Id { get; set; }
        public int? Qno { get; set; }
        public string QuestionType { get; set; }
        public string Question { get; set; }
        public string Level { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string Answer { get; set; }
        ///public List<QuestionsDetails> QuestionsDetails { get; set; }
    }
    public partial class QBKPattern
    {
        public decimal Pid { get; set; }
        public decimal? QbkpatternId { get; set; }
        public string Qtext { get; set; }
        public int? Qcount { get; set; }
    }
    public partial class QBKPatternDetails
    {
        public decimal Pdid { get; set; }
        public decimal? QbkpatternId { get; set; }
        public string Qcategory { get; set; }
        public string Qtype { get; set; }
        public string Qlevel { get; set; }
        public int? Qcount { get; set; }
    }
   

    public class QuestionsDetails : ResponseStatus
    {
        public string Exam { get; set; }
        public string Date { get; set; }
        public QuestionsDetails()
        {
            AllQuestions = new List<Question>();
        }
        public List<Question> AllQuestions { get; set; }
        public EmailRequest EmailTest { get; set; }
        public decimal PaperSetFrom { get; set; }
        public decimal PaperSetTo { get; set; }
        public bool IsAwsS3Save { get; set; }
        public bool IsAzureBlobSave { get; set; }
    }

    public class Question
    {
        public int QBId { get; set; }
        public int QId { get; set; }
        public string QText { get; set; }
        public string QBText { get; set; }
        public string QType { get; set; }
        public string Level { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string Answer { get; set; }
    }
    public class QuestionBankDetails
    {

        public decimal Qbid { get; set; }
        public string Qbtext { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? Createddate { get; set; }
    }
    public class QuestionBank
    {
        public QuestionBank()
        {
            QuestionBankDetails = new List<QuestionBankDetails>();
        }


        public  List<QuestionBankDetails> QuestionBankDetails { get; set; }
    }
    
    public partial class Questions
    {
        public decimal Qid { get; set; }
        public string Qtext { get; set; }
        public string Qtype { get; set; }
        public bool? IsActive { get; set; }
        public string Level { get; set; }
        public DateTime? Createddate { get; set; }
        public string Qcategory { get; set; }
    }


   


}

