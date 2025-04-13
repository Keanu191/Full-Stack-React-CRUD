using System.Linq.Expressions;

namespace ProductStore.Server.Models
{
    /// <summary>
    /// Provides custom sorting functionality for an <see cref="IQueryable{TEntity}"/>.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entities in the collection.</typeparam>
    /// <param name="items">The collection of entities to be sorted.</param>
    /// <param name="sortBy">The name of the property to sort by.</param>
    /// <param name="sortOrder">The sort order: either "asc" for ascending or "desc" for descending.</param>
    /// <returns>A new <see cref="IQueryable{TEntity}"/> sorted by the specified property and order.</returns>
    /// <exception cref="ArgumentException">Thrown if the specified property does not exist on the entity type.</exception>
    /// <remarks>
    /// This extension method uses reflection to dynamically build an order-by expression based on the provided
    /// property name and order. The method chooses between <see cref="Queryable.OrderBy"/> or <see cref="Queryable.OrderByDescending"/>
    /// depending on the provided sort order.
    /// </remarks>

    public static class IQueryableExtension
    {
        public static IQueryable<TEntity> OrderByCustom<TEntity>(this IQueryable<TEntity> items, string sortBy, string sortOrder)
        {
            var type = typeof(TEntity);
            var expression2 = Expression.Parameter(type, "t");
            var property = type.GetProperty(sortBy);
            var expression1 = Expression.MakeMemberAccess(expression2, property);
            var lambda = Expression.Lambda(expression1, expression2);
            var result = Expression.Call(
                typeof(Queryable),
                sortOrder == "desc" ? "OrderByDescending" : "OrderBy",
                new Type[] { type, property.PropertyType },
                items.Expression,
                Expression.Quote(lambda));

            return items.Provider.CreateQuery<TEntity>(result);
        }
    }
}
