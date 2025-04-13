// Displays a list of products within a specific category.
// Fetches data from the backend API based on the category ID.
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../Interface/baseInterface";
import API from "../API/api";

export const CategoryProducts = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    try {
      const { data } = await API.get(`/products?categoryId=${id}`);
      setProducts(data);
      setLoading(false);
    } catch (ex) {
      console.error("Error fetching category products:", ex);
      setError("Error fetching products. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Products in Category {id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id.toString()}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name || "Unnamed Product"}
              </h2>
              <p className="text-gray-600 mb-4">SKU: {product.sku?.toString() || "N/A"}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  ${product.price?.toFixed(2) || "N/A"}
                </span>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    product.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4 space-x-2">
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};