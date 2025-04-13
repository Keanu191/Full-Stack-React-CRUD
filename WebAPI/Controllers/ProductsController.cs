using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using ProductStore.Server.Entities;
using ProductStore.Server.Models;
using ProductStore.Server.Settings;


namespace ProductStore.Server.Controllers
{
    //[Route("api/[controller]")]
    [ApiVersion("1.0")]
    [Route("api/v1/products")]
    [ApiController]

    public class ProductsController : ControllerBase
    {
        private readonly IMongoCollection<Product>? _products;
        private readonly MongoContext _mongoContext;

        public ProductsController(MongoContext mongoContext)
        {
            _products = mongoContext.Database?.GetCollection<Product>("Products");
            _mongoContext = mongoContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> publicGet([FromQuery] ProductParameterQuery queryParameters)
        {
            var filter = Builders<Product>.Filter.Empty;

            if (queryParameters.MinPrice != null)
            {
                filter &= Builders<Product>.Filter.Gte(p => p.Price, queryParameters.MinPrice.Value);
            }

            if (queryParameters.MaxPrice != null)
            {
                filter &= Builders<Product>.Filter.Lte(p => p.Price, queryParameters.MaxPrice.Value);
            }

            var productsQuery = _mongoContext.Products.Find(filter)
                .Skip(queryParameters.Size * (queryParameters.Page - 1))
                .Limit(queryParameters.Size);

            var products = await productsQuery.ToListAsync();

            if (!string.IsNullOrEmpty(queryParameters.Sku))
            {
                products = products.Where(p => p.Sku == queryParameters.Sku).ToList();
            }

            if (!string.IsNullOrEmpty(queryParameters.Name))
            {
                products = products.Where(p => p.Name.ToLower().Contains(queryParameters.Name.ToLower())).ToList();
            }

            if (!string.IsNullOrEmpty(queryParameters.sortBy))
            {
                if (typeof(Product).GetProperty(queryParameters.sortBy) != null)
                {
                    // Convert List<Product> to IQueryable<Product>
                    var productsQueryable = products.AsQueryable();

                    // Apply the custom sorting
                    productsQueryable = productsQueryable.OrderByCustom(queryParameters.sortBy, queryParameters.SortOrder);

                    // If you want to return the sorted list back, convert it to List again
                    products = productsQueryable.ToList();
                }
            }
            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product?>> GetById(int id)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.Id, id);
            var product = _products.Find(filter).FirstOrDefault();
            return product is not null ? Ok(product) : NotFound();
        }
        

        [HttpPost]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult> Post(Product product)
        {
            await _products.InsertOneAsync(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult> Update(Product product)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.Id, product.Id);

            await _products.ReplaceOneAsync(filter, product);
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.Id, id);
            await _products.DeleteOneAsync(filter);
            return Ok();
        }
    }

}
