using MongoDbGenericRepository.Attributes;
using AspNetCore.Identity.MongoDbCore.Models;

namespace ProductStore.Server.Models
{
    /// <summary>
    /// The Application Role script in the models folder creates a collection called "Role" in the 
    /// Mongo Database with the ApplicationRole class being defined with a MongoIdentityRole with TKey of type Guid,
    /// and the CollectionNameAttribute being called Role.
    /// </summary>
    [CollectionName("Role")]
    public class ApplicationRole : MongoIdentityRole<Guid>
    {
    }
}
