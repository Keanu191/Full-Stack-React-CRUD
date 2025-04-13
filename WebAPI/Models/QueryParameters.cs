namespace ProductStore.Server.Models
{
    public class QueryParameters
    {
        /// <summary>
        /// The maximum allowed page size.
        /// </summary>
        /// <remarks>
        /// This constant value ensures that the page size does not exceed the specified limit.
        /// </remarks>
        const int maxSize = 100;

        private int _pageSize = 50;

        public int Page { get; set; } = 1;

        /// <summary>
        /// Gets or sets the number of items per page.
        /// </summary>
        /// <remarks>
        /// The page size is capped to the value of <see cref="maxSize"/>.
        /// </remarks>
        public int Size
        {
            get { return _pageSize; }

            set { _pageSize = Math.Min(_pageSize, value); }
        }

        /// <summary>
        /// Gets or sets the name of the property to sort by.
        /// </summary>
        /// <remarks>
        /// Defaults to "Id" if not explicitly set.
        /// </remarks>
        public string sortBy { get; set; } = "Id";

        public string sortOrder = "asc";

        /// <summary>
        /// Gets or sets the order in which to sort the items.
        /// </summary>
        /// <value>
        /// Accepts either "asc" for ascending or "desc" for descending order.
        /// If an invalid value is provided, the sort order remains unchanged.
        /// </value>
        public string SortOrder
        {
            get
            {
                return sortOrder;
            }
            set
            {
                if (value == "asc" ||  value == "desc")
                {
                    sortOrder = value;
                }
            }
        }
    }
}
