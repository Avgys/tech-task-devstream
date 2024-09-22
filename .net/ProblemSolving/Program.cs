namespace ProblemSolving
{
    internal class Program
    {
        static void Main(string[] args)
        {

            string[] testStrings = new string[]
            {
                "Hello, World!",
                "1234567890",
                "A quick brown fox jumps over the lazy dog.",
                "Whitespace   test.",
                "Special characters: !@#$%^&*()_+[]{}|;:',.<>/?`~",
                "New\nLine\nCharacters",
                "Tabs\tare\there",
                "Accented characters: é, ñ, ü, ç",
                "Mixed CASE String with Numbers 12345",
                "Long string: " + new string('x', 1000),  // A string with 1000 'x' characters
                "Empty string: ",
                "",
                "Palindrome: A man, a plan, a canal, Panama!",
                "Trailing spaces    ",
                "Unicode: 你好, привет, أهلاً",
                "Emoji: 😀😂👍🔥🎉",
                "\"Quoted text\"",
                "https://www.example.com",
                "email@example.com",
                "JSON string: { \"name\": \"John\", \"age\": 30 }",
                "SQL Injection Test: SELECT * FROM users WHERE name = 'John'; --",
                "aallaa",
                "aggga",
                "allalla"
            };

            //Func<string, object>[] funcs = new Func<string, object>[]
            //{
            //    StringMethods.ReverseString,                
            //    StringMethods.IsPalindrome,
            //};

            foreach (string testString in testStrings)
            {
                var output = testString.ReverseString();
                var defaultReverse = new string(testString.Reverse().ToArray());
                if (output != defaultReverse) {
                    throw new Exception();
                }

                Console.WriteLine($"Input: {testString} | Output: {output}");
            }

            foreach (string testString in testStrings)
            {
                var output = testString.IsPalindrome();

                Console.WriteLine($"Input: {testString} | Is palindrome: {output}");
            }
        }
    }
}
