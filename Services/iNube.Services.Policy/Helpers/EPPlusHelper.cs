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
    }
   
}
