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
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMongoCollection<Category>? _categories;

        public CategoryController(MongoContext mongoContext)
        {
            _categories = mongoContext.Database.GetCollection<Category>("Categories");
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            return await _categories.Find(FilterDefinition<Category>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category?>> GetByID(int id)
        {
            var filter = Builders<Category>.Filter.Eq(x => x.Id, id);
            var category = _categories.Find(filter).FirstOrDefault();
            return category is not null ? Ok(category) : NotFound();
        }

        [HttpPost]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult> Update(Category category)
        {
            var filter = Builders<Category>.Filter.Eq(x => x.Id, category.Id);

            await _categories.ReplaceOneAsync(filter, category);
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var filter = Builders<Category>.Filter.Eq(x => x.Id, id);

            await _categories.DeleteOneAsync(filter);
            return Ok();
        }
    }
}
