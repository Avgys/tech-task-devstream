using System.Reflection;

namespace ConsoleApp1
{
    internal static class InstanceService
    {
        public static IEnumerable<T> GetInstances<T>(string? searchPart = null)
        {
            Type baseType = typeof(T);

            List<T> instances = new List<T>();
            var linkedAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            foreach (Assembly assembly in linkedAssemblies)
            {
                var result = assembly
                  .GetTypes()
                  .Where(t => baseType.IsAssignableFrom(t) 
                      && !t.IsAbstract 
                      && !t.IsGenericType
                      && (string.IsNullOrEmpty(searchPart) || t.Name.Contains(searchPart, StringComparison.CurrentCultureIgnoreCase)))
                  .ToArray();

                foreach (var t in result)
                {
                    var instance = Instantiate<T>(t);
                    if (instance != null)
                        instances.Add(instance);
                }
            }

            return instances;
        }

        private static T? Instantiate<T>(Type t)
        {
            ConstructorInfo? ctor = t.GetConstructor(BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Instance, new Type[0]);
            return (T?)ctor?.Invoke(null);
        }
    }
}
