// Navigation bar component for the application.
// Displays links and user-specific actions (e.g., login/logout).

import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { email, role, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null, null, null);
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white p-4 sticky top-0 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-lg font-bold">
          Product Store
        </button>
        <div className="flex space-x-4">
          <button onClick={() => navigate('/categories')} className="hover:bg-gray-700 px-4 py-2 rounded-md">
            Categories
          </button>
          {email ? (
            <>
              <span className="hidden md:inline">Welcome, {email} ({role})</span>
              <button onClick={() => navigate('/create-product')} className="hover:bg-gray-700 px-4 py-2 rounded-md">
                Create Product
              </button>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="hover:bg-gray-700 px-4 py-2 rounded-md">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="hover:bg-gray-700 px-4 py-2 rounded-md">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;