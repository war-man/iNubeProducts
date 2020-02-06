public static class Utilities
{
    static readonly string[] Ones = { "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" };
    static readonly string[] Teens = { "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
    static readonly string[] Tens = { "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };
    static readonly string[] ThousandsGroups = { "", " Thousand", " Lakh", " Crore" };
    /// <summary>
    /// Gets the number value.
    /// </summary>
    /// <param name="n">The n.</param>
    /// <returns></returns>
    public static string GetNumberValue(int n)
    {
        if (n < 0 || n == 0)
        {
            return "zero";
        }
        return FriendlyInteger(n, "", 0);
    }

    private static string FriendlyInteger(int n, string leftDigits, int thousands)
    {
        if (n == 0)
        {
            return leftDigits;
        }

        string friendlyInt = leftDigits;

        if (friendlyInt.Length > 0)
        {
            friendlyInt += " ";
        }

        if (n < 10)
        {
            friendlyInt += Ones[n];
        }
        else if (n < 20)
        {
            friendlyInt += Teens[n - 10];
        }
        else if (n < 100)
        {
            friendlyInt += FriendlyInteger(n % 10, Tens[n / 10 - 2], 0);
        }
        else if (n < 1000)
        {
            friendlyInt += FriendlyInteger(n % 100, (Ones[n / 100] + " Hundred"), 0);
        }
        else
        {
            friendlyInt += FriendlyInteger(n % 1000, FriendlyInteger(n / 1000, "", thousands + 1), 0);
            if (n % 1000 == 0)
            {
                return friendlyInt;
            }
        }

        return friendlyInt + ThousandsGroups[thousands];
    }

}
