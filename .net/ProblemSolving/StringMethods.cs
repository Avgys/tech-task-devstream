using System.Text;

namespace ProblemSolving
{
    internal static class StringMethods
    {
        public static string ReverseString(this string s)
        {
            if(IsPalindrome(s) || string.IsNullOrWhiteSpace(s))
                return s;

            var builder = new StringBuilder(s);

            int middleIndex = s.Length / 2;

            char temp;

            for (int i = 0; i < middleIndex; i++)
            {
                temp = builder[i];
                builder[i] = builder[builder.Length - 1 - i];
                builder[builder.Length - 1 - i] = temp;
            }

            return builder.ToString();
        }

        public static bool IsPalindrome(this string s)
        {
            int middleIndex = s.Length / 2;

            for(int i = 0; i < middleIndex; i++)
            {
                if (s[i] != s[s.Length - 1 - i])
                    return false;
            }

            return true;
        }
    }
}
