import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../API/authAPI";
import axios from "axios";

// Form component for creating a new category with associated products.
// Supports dynamic addition/removal of products within the category.
export const CreateCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    products: [
      {
        id: 0,
        categoryId: 0,
        name: "",
        storeLocation: "",
        postCode: 0,
        price: 0,
        isAvailable: true,
        sku: "",
      },
    ],
  });

  const [error, setError] = useState<string | null>(null);

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        {
          id: 0,
          categoryId: 0,
          name: "",
          storeLocation: "",
          postCode: 0,
          price: 0,
          isAvailable: true,
          sku: "",
        },
      ],
    });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken"); // Retrieve the access token from localStorage

    try {
      console.log("Payload:", formData); // Log the payload for debugging
      const response = await authAPI.post(
        "/Category",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data); // Log the API response
      navigate("/categories");
    } catch (ex) {
      if (axios.isAxiosError(ex)) {
        console.error("Error creating category:", ex.response?.data);
        if (ex.response?.data?.title) {
          setError(ex.response?.data.title);
        } else {
          setError(JSON.stringify(ex.response?.data, null, 2));
        }
      } else {
        console.error("Error creating category:", ex);
        setError("Error creating category. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Category
        </h2>
        {error && (
          <pre className="text-red-500 mb-4 whitespace-pre-wrap">{error}</pre>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Category ID</label>
            <input
              type="number"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, id: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Products
            </h3>
            {formData.products.map((product, index) => (
              <div
                key={index}
                className="border p-4 rounded-md mb-4 space-y-2 bg-gray-50"
              >
                <div>
                  <label className="block text-gray-700 mb-2">Product ID</label>
                  <input
                    type="number"
                    value={product.id}
                    onChange={(e) =>
                      handleProductChange(index, "id", Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleProductChange(index, "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Store Location
                  </label>
                  <input
                    type="text"
                    value={product.storeLocation}
                    onChange={(e) =>
                      handleProductChange(index, "storeLocation", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Post Code</label>
                  <input
                    type="number"
                    value={product.postCode}
                    onChange={(e) =>
                      handleProductChange(index, "postCode", Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleProductChange(index, "price", Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">SKU</label>
                  <input
                    type="text"
                    value={product.sku}
                    onChange={(e) =>
                      handleProductChange(index, "sku", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Is Available</label>
                  <input
                    type="checkbox"
                    checked={product.isAvailable}
                    onChange={(e) =>
                      handleProductChange(index, "isAvailable", e.target.checked)
                    }
                    className="w-5 h-5"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-2"
                >
                  Remove Product
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addProduct}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Create Category
            </button>
            <button
              type="button"
              onClick={() => navigate("/categories")}
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