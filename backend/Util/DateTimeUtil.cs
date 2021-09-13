using System.Linq;
using System;

namespace backend.Util
{
    public static class DateTimeUtil
    {
        /// <summary>
        /// Takes an EXIF formatted date time string (yyyy:mm:dd HH:MM:SS)
        /// and parses it into a DateTimeOffset with the given offset.
        /// </summary>
        /// <param name="value">Value string.</param>
        /// <param name="offset">Offset.</param>
        /// <returns></returns>
        public static DateTimeOffset ParseExif(string value, TimeSpan offset)
        {
            var split = value.Split(' ', 2);
            (string sdate, string stime) = (split[0], split[1]);

            (int y, int m, int d) = SplitTripel(sdate);
            (int H, int M, int S) = SplitTripel(stime);

            return new DateTimeOffset(y, m, d, H, M, S, TimeSpan.Zero);
        }

        /// <summary>
        /// Takes an EXIF formatted date time string (yyyy:mm:dd HH:MM:SS)
        /// and parses it into a DateTimeOffset with an offset of 0.
        /// </summary>
        /// <param name="value">Value string.</param>
        /// <returns></returns>
        public static DateTimeOffset ParseExif(string value) =>
            ParseExif(value, TimeSpan.Zero);

        private static (int a, int b, int c) SplitTripel(string value)
        {
            var split = value
                .Split(':', 3)
                .Select(v => int.Parse(v))
                .ToArray();
            return (split[0], split[1], split[2]);
        }
    }
}