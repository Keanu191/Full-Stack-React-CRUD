using MongoDB.Driver;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using MongoDB.Driver.Core.Configuration;
using ProductStore.Server.Entities;

namespace ProductStore.Server.Settings
{
    public class MongoContext
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoDatabase _database;

        public MongoContext(IConfiguration configuration)
        {
            _configuration = configuration;

            // Get the connection string from configuration
            var connectionString = _configuration.GetConnectionString("DbConnection");

            // Extract the database name from the connection string or specify it explicitly
            var mongoUrl = MongoUrl.Create(connectionString);
            var databaseName = mongoUrl.DatabaseName; // Extract database name from the connection string

            // If the connection string doesn't include a database name, specify it explicitly
            if (string.IsNullOrEmpty(databaseName))
            {
                databaseName = "Products"; // Replace with your actual database name
            }

            var mongoClient = new MongoClient(mongoUrl);
            _database = mongoClient.GetDatabase(databaseName);
        }

        public IMongoDatabase Database => _database;

        // Create IMongoCollection instances for the product and category entities
        public IMongoCollection<Product> Products => _database.GetCollection<Product>("Products");
        public IMongoCollection<Category> Categories => _database.GetCollection<Category>("Categories");
    }
}