using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductStore.Server.Entities
{
    public class Product
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.Int32)]
        // setting ID a string to prevent exception objectid is not a valid representation for an int32serializer
        public int Id { get; set; }

        [Required]
        [BsonElement("category_id"), BsonRepresentation(BsonType.Int32)]
        // setting CategoryID a string to prevent exception objectid is not a valid representation for an int32serializer
        public int CategoryId { get; set; }

        [Required]

        [BsonElement("name"), BsonRepresentation(BsonType.String)]
        public string Name { get; set; } = string.Empty;

        [Required]

        [BsonElement("store_location"), BsonRepresentation(BsonType.String)]
        public string StoreLocation { get; set; } = string.Empty;

        [BsonElement("post_code"), BsonRepresentation(BsonType.Int32)]
        public int PostCode { get; set; }
        [Required]

        [BsonElement("price"), BsonRepresentation(BsonType.Decimal128)]
        public decimal Price { get; set; }
        [Required]

        [BsonElement("is_available"), BsonRepresentation(BsonType.Boolean)]
        public bool IsAvailable { get; set; }


        [Required]  // Ensures that the sku field is required
        [BsonElement("sku"), BsonRepresentation(BsonType.String)]
        public string? Sku { get; set; }

        [JsonIgnore]

        [BsonElement("category")]
        public virtual Category? Category { get; set; }

    }
}
