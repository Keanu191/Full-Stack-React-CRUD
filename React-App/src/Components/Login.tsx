// Login form component for user authentication.
// Stores the access token and user data upon successful login.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../API/authAPI";
import { useAuth } from "../Context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authAPI.post('/Authentication/Login', formData);
      const { accessToken, user, role, email } = response.data;
      localStorage.setItem('accessToken', accessToken); // Store the access token in localStorage
      console.log('Access token stored:', localStorage.getItem('accessToken')); // Log the stored token
      setUser(user, role, email); // Set the logged-in user, role, and email
      console.log('Login user:', user);
      console.log('Login role:', role);
      console.log('Login email:', email);
      navigate('/'); // Redirect to the home page or another page
    } catch (ex) {
      console.error('Error logging in:', ex);
      setError('Error logging in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Login
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