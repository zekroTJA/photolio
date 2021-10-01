using System;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface ICacheService
    {
        Task<T> GetOrAddAsync<T>(string key, Func<string, Task<T>> getter);
    }
}