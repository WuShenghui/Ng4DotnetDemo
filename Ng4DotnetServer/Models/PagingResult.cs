using System.Collections.Generic;

namespace Ng4DotnetServer.Models
{
    public class PagingResult<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int TotalCount { get; set; }

        public PagingResult(IEnumerable<T> items, int totalRecords)
        {
            TotalCount = totalRecords;
            Items = items;
        }
    }
}