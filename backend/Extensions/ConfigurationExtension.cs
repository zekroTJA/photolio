using System;
using Microsoft.Extensions.Configuration;

namespace backend.Extensions
{
    public static class ConfigurationExtension
    {
        /// <summary>
        /// Gets a value from the <see cref="IConfiguration"/> provider
        /// and executes the passed validator on the retrieved value.
        /// 
        /// If the validator returns false, an Exception is thrown.
        /// </summary>
        /// <param name="config">The configuration device.</param>
        /// <param name="key">The configuration key.</param>
        /// <param name="validator">The validator function.</param>
        /// <typeparam name="T">The value type.</typeparam>
        /// <returns></returns>
        public static T MustGetValue<T>(this IConfiguration config, string key, Func<T, bool> validator)
        {
            var res = config.GetValue<T>(key);
            if (!validator(res))
                throw new Exception($"Configuration Error: The value for key '{key}' is invalid!");
            return res;
        }

        /// <summary>
        /// Gets a value from the <see cref="IConfiguration"/> provider
        /// and throws an exception when the retrieved value is null.
        /// </summary>
        /// <param name="config">The configuration device.</param>
        /// <param name="key">The configuration key</param>
        /// <typeparam name="T">The value type.</typeparam>
        /// <returns></returns>
        public static T MustGetValue<T>(this IConfiguration config, string key) =>
            config.MustGetValue<T>(key, (v) => v != null);
    }
}