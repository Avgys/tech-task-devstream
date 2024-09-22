namespace ProblemSolvingMissingElements
{
    internal class Program
    {
        static void Main(string[] args)
        {

            Random random = new Random();
            int[] numbers = new int[30];

            for (int i = 0; i < numbers.Length; i++)
            {
                var number = numbers[i];
                while (numbers.Any(x => x == number))
                    number = random.Next(20, 151);
                numbers[i] = number;
            }

            var result = MissingElements(numbers);

            Console.WriteLine($"Input: [{string.Join(", ", numbers)}]\n Output: [{string.Join(", ", result)}]");
            numbers = numbers.Concat(result).ToArray();
            result = MissingElements(numbers);

            Console.WriteLine();
            Console.WriteLine($"Input: [{string.Join(", ", numbers)}]\n Output: [{string.Join(", ", result)}]");
        }

        public static IEnumerable<int> MissingElements(int[] arr)
        {
            Array.Sort(arr);

            var currentNumber = arr[0];
            var step = 1;
            var missingNumber = new List<int>();

            for (int i = 1; i < arr.Length; i++)
            {
                while (arr[i] - currentNumber > step)
                    missingNumber.Add(++currentNumber);

                currentNumber = arr[i];
            }

            return missingNumber;
        }
    }
}
