import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

function App() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductsAndStock = useCallback(async () => {
    setIsLoading(true);
    try {
      const productResponse = await fetch('https://frozenback-test.up.railway.app/api/productos/productos/');
      const productData = await productResponse.json();
      const products = productData.results;

      const stockPromises = products.map(product =>
        fetch(`https://frozenback-test.up.railway.app/api/stock/cantidad-disponible/${product.id_producto}/`)
          .then(res => res.json())
      );

      const stockData = await Promise.all(stockPromises);

      const productsWithStock = products.map((product, index) => ({
        ...product,
        stock: stockData[index]
      }));

      setProducts(productsWithStock);
    } catch (error) {
      console.error("Error fetching product or stock data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsAndStock();
  }, [fetchProductsAndStock]);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <div className="App">
            <Navbar onRegisterClick={handleRegisterClick} />
          {showRegisterForm && <RegisterForm onClose={handleCloseRegisterForm} />}
          <main className="main-content">
            <div className="product-list">
              <ProductList products={products} isLoading={isLoading} />
            </div>
            <aside className="cart">
              <Cart fetchProducts={fetchProductsAndStock} />
            </aside>
          </main>
          <ToastContainer />
          <Footer />
        </div>
      </CartProvider>
    </ToastProvider>
  </AuthProvider>
  );
}

export default App;