using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Helpers
{
    public static class EPPlusHelper
    {
        public static int GetColumnByName(this ExcelWorksheet ws, string columnName)
        {
            if (ws == null) throw new ArgumentNullException(nameof(ws));
            return ws.Cells["1:1"].First(c => c.Value.ToString().ToLower() == columnName.ToLower()).Start.Column;
        }
        public static string[] GetHeaderColumns(this ExcelWorksheet sheet)
        {
            return sheet.Cells[sheet.Dimension.Start.Row, sheet.Dimension.Start.Column, 1, sheet.Dimension.End.Column]
                .Select(firstRowCell => firstRowCell.Text).ToArray();
        }
        public static DateTime? IsDate(string tempDate)
        {
            DateTime fromDateValue;
            var formats = new[] { "dd/MM/yyyy", "yyyy-MM-dd" ,"dd-mm-yyyy"};
            if (DateTime.TryParseExact(tempDate, formats, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.NoCurrentDateDefault, out fromDateValue))
            {
                return fromDateValue;
            }
            else
            {
                return null;
            }
        }
        public static DateTime? ValidateDate(string date)
        {
            try
            {
                // for US, alter to suit if splitting on hyphen, comma, etc.
                string[] dateParts = date.Split('/');
                if (dateParts.Length == 1)
                {
                    dateParts = date.Split('-');
                }
                // create new date from the parts; if this does not fail
                // the method will return true and the date is valid
                if (dateParts[0].Length > 2)
                {
                    string[] timeParts = dateParts[2].Split('T');
                    if (timeParts.Length == 1)
                    {
                        timeParts = timeParts[0].Split(' ');
                    }
                    return new DateTime(Convert.ToInt32(dateParts[0]), Convert.ToInt32(dateParts[1]), Convert.ToInt32(timeParts[0]));
                }
                else if (dateParts[2].Length > 4)
                {
                    string[] timeParts = dateParts[2].Split('T');
                    if (timeParts.Length == 1)
                    {
                        timeParts = timeParts[0].Split(' ');
                    }
                    return new DateTime(Convert.ToInt32(timeParts[0]), Convert.ToInt32(dateParts[1]), Convert.ToInt32(dateParts[0]));
                }
                else
                {
                    return new DateTime(Convert.ToInt32(dateParts[2]), Convert.ToInt32(dateParts[1]), Convert.ToInt32(dateParts[0]));
                }
            }
            catch
            {
                // if a test date cannot be created, the
                // method will return false
                return null;
            }
        }
        public static int CalculateAge(DateTime dateOfBirth)
        {
            int age = 0;
            age = DateTime.Now.Year - dateOfBirth.Year;
            if (DateTime.Now.DayOfYear < dateOfBirth.DayOfYear)
                age = age - 1;

            return age;
        }
    }
   
}
