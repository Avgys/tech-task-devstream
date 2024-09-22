using System.Security.Cryptography.X509Certificates;

namespace Vehicles
{
    public abstract class Vehicle
    {
        protected float Speed;

        public float GetSpeed => Speed;
    }
}
