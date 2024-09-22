using System.Text.Json;
using Vehicles;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Print name");
            var searchLine = Console.ReadLine();

            var instances = InstanceService.GetInstances<Vehicle>(searchLine).ToList();

            instances.Sort((x, y) => string.Compare(
                   x.GetType().Name,
                   y.GetType().Name,
                   StringComparison.CurrentCultureIgnoreCase));

            ReportInstances(instances);
            SerializeToDisk(instances);
        }

        private static void ReportInstances(List<Vehicle> instances)
        {
            var result = string.Join("; ", instances.Select(x => x.GetType().Name + ':' + x.GetSpeed + " speed"));
            Console.WriteLine(result);
            File.WriteAllText("instances.txt", result);
        }

        public static void SerializeToDisk(IEnumerable<object> objects)
        {
            string json = JsonSerializer.Serialize(objects, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText("instances.json", json);
        }
    }
}
