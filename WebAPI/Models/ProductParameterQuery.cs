namespace ProductStore.Server.Models
{
    // Make the ProductParameterQuery class to extend the QueryParameters script's class (also located in the Models folder)
    public class ProductParameterQuery : QueryParameters
    {
        public decimal? MinPrice { get; set; }

        public decimal? MaxPrice { get; set; }

        public string Sku { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
    }
}
