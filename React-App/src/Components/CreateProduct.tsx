import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API/api";
import axios from "axios";

export const CreateProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    categoryId: '',
    name: '',
    storeLocation: '',
    postCode: '',
    price: '',
    isAvailable: false,
    sku: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage

    try {
      await API.post('/Products', {
        ...formData,
        id: Number(formData.id),
        categoryId: Number(formData.categoryId),
        postCode: Number(formData.postCode),
        price: Number(formData.price),
        sku: String(formData.sku), // Convert sku to string
        product: formData.name // Assuming product is the name field
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
      navigate('/');
    } catch (ex) {
      if (axios.isAxiosError(ex)) {
        console.error('Error creating product:', ex.response?.data);
        if (ex.response?.data?.title) {
          setError(ex.response?.data.title);
        }
        setError(JSON.stringify(ex.response?.data, null, 2));
      } else {
        console.error('Error creating product:', ex);
        setError("Error creating product. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Product</h2>
        {error && <pre className="text-red-500 mb-4 whitespace-pre-wrap">{error}</pre>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Product ID</label>
            <input
              type="number"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Category ID</label>
            <input
              type="number"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <textarea
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Store Location</label>
            <textarea
              value={formData.storeLocation}
              onChange={(e) => setFormData({ ...formData, storeLocation: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Post Code</label>
            <input
              type="number"
              value={formData.postCode}
              onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">SKU</label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Is Available?</label>
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) => setFormData(prevState => ({
                ...prevState,
                isAvailable: e.target.checked
              }))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};