// Root component of the application.
// Configures routing and wraps the app with the `AuthProvider`.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Navbar from "./Components/Navbar";
import ProductDetail from "./Components/ProductDetail";
import { CreateProduct } from "./Components/CreateProduct";
import { EditProduct } from "./Components/EditProduct";
import { ProductList } from './Components/ProductList';
import { CreateCategory } from './Components/CreateCategory';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { CategoryList } from './Components/CategoryList';
import { CategoryProducts } from "./Components/CategoryProducts";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/category/:id" element={<CategoryProducts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;