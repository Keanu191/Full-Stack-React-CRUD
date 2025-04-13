import { useEffect, useState } from "react";
import { Category } from "../Interface/baseInterface";
import { useNavigate } from "react-router-dom";
import authAPI from "../API/authAPI";

// Displays a list of all categories.
// Includes navigation to view products within a specific category.
export const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await authAPI.get('/Category');
      setCategories(data);
      setLoading(false);
    } catch (ex) {
      console.error('Error fetching categories:', ex);
      setError("Error fetching categories. Please try again.");
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Categories</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {category.name}
            </h2>
            <button
              onClick={() => navigate(`/category/${category.id}`)}
              className="btn btn-primary w-full"
            >
              View Products
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};