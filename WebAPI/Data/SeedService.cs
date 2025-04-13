using System;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProductStore.Server.Entities;
using ProductStore.Server.Settings;

namespace ProductStoreAPI.Data
{
    /// <summary>
    /// Load a template Category and Product's into the Mongo Database 
    /// </summary>
    public class SeedService
    {
        private readonly MongoContext _mongoContext;

        public SeedService(MongoContext context)
        {
            _mongoContext = context;
        }

        // Seed categories and products
        public async Task SeedData()
        {
            // Seed categories
            var categories = new List<Category>
            {
                new Category { Id = 1, Name = "Bouquetes" },
                new Category { Id = 2, Name = "Box Flowers" },
                new Category { Id = 3, Name = "Wrapps" },
                new Category { Id = 4, Name = "Single Flower" },
                new Category { Id = 5, Name = "Additional" },
            };

            try
            {
                foreach (var category in categories)
                {
                    var existingCategory = await _mongoContext.Categories
                        .Find(c => c.Name == category.Name)
                        .FirstOrDefaultAsync();

                    // Avoid duplicate categories
                    if (existingCategory == null)
                    {
                        await _mongoContext.Categories.InsertOneAsync(category);
                    }
                }

                // Seed products
                var products = new List<Product>
                {
                    new Product { Id = 1, CategoryId = 1, Name = "Flowers in the city", StoreLocation = "Canning Vale", PostCode = 6155, Price = 68, IsAvailable = true, Sku = "FLR-001" },
                    new Product { Id = 2, CategoryId = 1, Name = "Gerberas", StoreLocation = "Willeton", PostCode = 6155, Price = 35, IsAvailable = true, Sku = "GRB-002" },
                    new Product { Id = 3, CategoryId = 1, Name = "Aziatic Lilies", StoreLocation = "Palmyra", PostCode = 6123, Price = 33, IsAvailable = true, Sku = "AZL-003" },
                    new Product { Id = 4, CategoryId = 1, Name = "European Lilies", StoreLocation = "Melville", PostCode = 6145, Price = 125, IsAvailable = true, Sku = "EUL-004" },
                    new Product { Id = 5, CategoryId = 1, Name = "Chrisantemum", StoreLocation = "Canninghton", PostCode = 6112, Price = 60, IsAvailable = true, Sku = "CHR-005" },
                    new Product { Id = 6, CategoryId = 1, Name = "Alstroemeria", StoreLocation = "Waikiki", PostCode = 6112, Price = 95, IsAvailable = true, Sku = "ALS-006" },
                    new Product { Id = 7, CategoryId = 1, Name = "Snapdragon small", StoreLocation = "Tuart Hill", PostCode = 6112, Price = 65, IsAvailable = true, Sku = "SNP-007" },
                    new Product { Id = 8, CategoryId = 1, Name = "V-Crocus", StoreLocation = "Willeton", PostCode = 6113, Price = 65, IsAvailable = true, Sku = "VCR-008" },
                    new Product { Id = 9, CategoryId = 1, Name = "Crocus", StoreLocation = "Armadale", PostCode = 6114, Price = 17, IsAvailable = true, Sku = "CRC-009" },
                    new Product { Id = 10, CategoryId = 2, Name = "Calla Lily", StoreLocation = "Aubin Grove", PostCode = 6115, Price = 99, IsAvailable = true, Sku = "CLL-010" },
                    new Product { Id = 11, CategoryId = 2, Name = "Geranium small", StoreLocation = "Darch", PostCode = 6116, Price = 0, IsAvailable = false, Sku = "GRS-011" },
                    new Product { Id = 12, CategoryId = 2, Name = "Grunge Skater Jeans", StoreLocation = "Jonndana", PostCode = 6117, Price = 68, IsAvailable = true, Sku = "GSJ-012" },
                    new Product { Id = 13, CategoryId = 2, Name = "Geranium Large", StoreLocation = "Joonedaloop", PostCode = 6112, Price = 125, IsAvailable = true, Sku = "GRL-013" },
                    new Product { Id = 14, CategoryId = 2, Name = "Stretchy Dance Pants", StoreLocation = "Geralton", PostCode = 6118, Price = 55, IsAvailable = true, Sku = "SDP-014" },
                    new Product { Id = 15, CategoryId = 2, Name = "Alstroemeria", StoreLocation = "Piara Waters", PostCode = 6121, Price = 22, IsAvailable = false, Sku = "ALS-015" },
                    new Product { Id = 16, CategoryId = 2, Name = "Gerberas", StoreLocation = "Byford", PostCode = 6132, Price = 95, IsAvailable = true, Sku = "GRB-016" },
                    new Product { Id = 17, CategoryId = 2, Name = "Marigold", StoreLocation = "Dianella", PostCode = 6342, Price = 17, IsAvailable = true, Sku = "MRG-017" },
                    new Product { Id = 18, CategoryId = 3, Name = "Azalea", StoreLocation = "Leong", PostCode = 6123, Price = 2.8M, IsAvailable = true, Sku = "AZL-018" },
                    new Product { Id = 19, CategoryId = 3, Name = "Lemon-LAzalea", StoreLocation = "Fremantle", PostCode = 6124, Price = 2.8M, IsAvailable = true, Sku = "LMA-019" },
                    new Product { Id = 20, CategoryId = 3, Name = "Zinnia", StoreLocation = "BEaconsfield", PostCode = 6125, Price = 2.8M, IsAvailable = false, Sku = "ZNN-020" },
                    new Product { Id = 21, CategoryId = 3, Name = "Peach Zinnia", StoreLocation = "North Freo", PostCode = 6126, Price = 2.8M, IsAvailable = true, Sku = "PCZ-021" },
                    new Product { Id = 22, CategoryId = 3, Name = "Raspberry Zinnia", StoreLocation = "Munster", PostCode = 6127, Price = 2.8M, IsAvailable = true, Sku = "RSZ-022" },
                    new Product { Id = 23, CategoryId = 3, Name = "Snapdragon big", StoreLocation = "Coogee", PostCode = 6128, Price = 2.8M, IsAvailable = true, Sku = "SNB-023" },
                    new Product { Id = 24, CategoryId = 4, Name = "Petunia", StoreLocation = "South Freo", PostCode = 6129, Price = 24.99M, IsAvailable = true, Sku = "PTN-024" },
                    new Product { Id = 25, CategoryId = 5, Name = "Dahlia (long lasting)", StoreLocation = "City", PostCode = 6112, Price = 9.99M, IsAvailable = true, Sku = "DLL-025" },
                    new Product { Id = 26, CategoryId = 5, Name = "Dahlia", StoreLocation = "West Perth", PostCode = 6130, Price = 12.49M, IsAvailable = true, Sku = "DHL-026" },
                    new Product { Id = 27, CategoryId = 5, Name = "Orchid domestic", StoreLocation = "East Perth", PostCode = 6131, Price = 13.99M, IsAvailable = true, Sku = "ORD-027" },
                    new Product { Id = 28, CategoryId = 5, Name = "Orchid Expensive", StoreLocation = "Bentley", PostCode = 6132, Price = 12.49M, IsAvailable = true, Sku = "ORE-028" },
                    new Product { Id = 29, CategoryId = 5, Name = "Marigold", StoreLocation = "Carslie", PostCode = 6133, Price = 9.99M, IsAvailable = true, Sku = "MRG-029" },
                    new Product { Id = 30, CategoryId = 5, Name = "Gardenia type C", StoreLocation = "Lathlain", PostCode = 6134, Price = 11.99M, IsAvailable = true, Sku = "GDC-030" },
                    new Product { Id = 31, CategoryId = 5, Name = "Gardenia type-B", StoreLocation = "Booragoon", PostCode = 6135, Price = 12.99M, IsAvailable = true, Sku = "GDB-031" },
                    new Product { Id = 32, CategoryId = 5, Name = "Gardenia", StoreLocation = "Applecross", PostCode = 6136, Price = 9.99M, IsAvailable = true, Sku = "GDN-032" },
                    new Product { Id = 33, CategoryId = 5, Name = "Calla Lily", StoreLocation = "Rockingham", PostCode = 6001, Price = 12.49M, IsAvailable = true, Sku = "CLL-033" }
                };

                foreach (var product in products)
                {
                    var existingProduct = await _mongoContext.Products
                        .Find(p => p.Name == product.Name)
                        .FirstOrDefaultAsync();

                    // Avoid duplicate products
                    if (existingProduct == null)
                    {
                        await _mongoContext.Products.InsertOneAsync(product);
                    }
                }
            }
            catch (MongoCommandException ex)
            {
                Console.WriteLine("A MongoCommandException has occured, Message Output:" + ex.Message);
                Console.WriteLine("Command: " + ex.Command);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw new Exception("An error occurred while seeding the data.", ex);
            }
        }
    }
}
