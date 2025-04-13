using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductStore.Server.Entities
{
    public class Category
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.Int32)]
        // setting ID a string to prevent exception objectid is not a valid representation for an int32serializer
        public int Id { get; set; }

        [BsonElement("name"), BsonRepresentation(BsonType.String)]
        public string? Name { get; set; }

        [BsonElement("products")]
        public virtual List<Product> Products { get; set; } = new List<Product>();
    }
}
