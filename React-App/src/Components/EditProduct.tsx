import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../API/api";
import { Product } from "../Interface/baseInterface";

// Form component for editing an existing product.
// Fetches product data by ID and updates it via the backend API.
export const EditProduct = () => {

    const { id } = useParams();
   
    const navigate = useNavigate();

   
    
  const [formData, setFormData] = useState<Product>({
    id: 0,
    categoryId: 0,
    name: '',
    storeLocation: '',
    postCode: 0,
    price: 0,
    isAvailable: false as boolean,
    sku: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 

    useEffect(() => {
        fetchProduct();
      }, [id]);

    
      const fetchProduct = async () => {
        try {
          const { data } = await API.get(`/Products/${id}`);
          setFormData(data);
          setLoading(false);
        } catch (ex) {
          console.error('Error fetching product:', ex);
          setError("Error fetching product. Please try again." + error);
          setLoading(false);
        }
      };
   

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await API.put(`/Products/${id}`, formData);
          navigate(`/products/${id}`);
        } catch (ex) {
          console.error('Error updating product:', ex);
          setError("Error updating product. Please try again." + error);
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
    <div className="max-w-2xl mx-auto px-4 py-8">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Product ID</label>
          <input
            type="number"
            value={formData.id.toString()}
            onChange={(e) => setFormData({...formData, id: Math.max(0, Number(e.target.value))})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Category ID</label>
          <input
            type="number"
            value={formData.categoryId.toString()}
            onChange={(e) => setFormData({...formData, categoryId: Math.max(0, Number(e.target.value))})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            value={formData.price.toString()}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={() => navigate(`/product/${id}`)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}