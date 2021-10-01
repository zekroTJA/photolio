using System;
using System.Text.Json;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace backend.Services
{
    public class RedisCacheService : ICacheService
    {
        private const string KEY_PREFIX = "PHOTOLIO_";

        private readonly ConnectionMultiplexer mpx;
        private readonly IDatabase db;

        public RedisCacheService(string redisAddress, int database = -1)
        {
            mpx = ConnectionMultiplexer.Connect(redisAddress);
            db = mpx.GetDatabase(database);
        }

        public async Task<T> GetOrAddAsync<T>(string key, Func<string, Task<T>> getter)
        {
            key = Key(key);

            var res = default(T);
            var resRaw = await db.StringGetAsync(key);
            if (resRaw.IsNull)
            {
                res = await getter(key);
                await db.StringSetAsync(key, Encode(res));
            }
            else
            {
                res = Decode<T>(resRaw);
            }

            return res;
        }

        private string Encode<T>(T val) => JsonSerializer.Serialize(val);

        private T Decode<T>(string data) => JsonSerializer.Deserialize<T>(data);

        private string Key(string key) => $"{KEY_PREFIX}{key}";
    }
}