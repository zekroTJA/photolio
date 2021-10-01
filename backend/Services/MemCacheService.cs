using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace backend.Services
{

    public class MemCacheService : ICacheService
    {
        private readonly ConcurrentDictionary<string, object> cache = new();

        public async Task<T> GetOrAddAsync<T>(string key, Func<string, Task<T>> getter)
        {
            if (!cache.TryGetValue(key, out var res))
            {
                res = await getter(key);
                cache[key] = res;
            }

            return (T)res;
        }
    }
}