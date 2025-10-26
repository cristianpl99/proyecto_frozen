import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import EditProfileForm from './components/EditProfileForm';
import ComplaintForm from './components/ComplaintForm';
import SuggestionForm from './components/SuggestionForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';
import useGoogleMapsScript from './hooks/useGoogleMapsScript';

function App() {
  const { isLoaded, error } = useGoogleMapsScript();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
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

  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfileForm = () => {
    setShowEditProfile(false);
  };

  const handleComplaintClick = () => {
    setShowComplaintForm(true);
  };

  const handleCloseComplaintForm = () => {
    setShowComplaintForm(false);
  };

  const handleSuggestionClick = () => {
    setShowSuggestionForm(true);
  };

  const handleCloseSuggestionForm = () => {
    setShowSuggestionForm(false);
  };

  return (
    <ToastProvider>
      <CartProvider>
        <AuthProvider>
          <div className="App">
            <Navbar
              onRegisterClick={handleRegisterClick}
              onEditProfileClick={handleEditProfileClick}
              onComplaintClick={handleComplaintClick}
              onSuggestionClick={handleSuggestionClick}
            />
            {showRegisterForm && <RegisterForm onClose={handleCloseRegisterForm} />}
            {showEditProfile && <EditProfileForm onClose={handleCloseEditProfileForm} />}
            {showComplaintForm && <ComplaintForm onClose={handleCloseComplaintForm} />}
            {showSuggestionForm && <SuggestionForm onClose={handleCloseSuggestionForm} />}
            <main className="main-content">
              <div className="product-list">
                <ProductList products={products} isLoading={isLoading} />
              </div>
              <aside className="cart">
                {error && <div>Error al cargar el mapa.</div>}
                {!isLoaded && !error && <div>Cargando mapa...</div>}
                {isLoaded && !error && <Cart products={products} fetchProducts={fetchProductsAndStock} />}
              </aside>
            </main>
            <ToastContainer />
            <Footer />
            <df-messenger
              class="custom-dialogflow-icon"
              intent="WELCOME"
              chat-title="FrozenBot🧊"
              agent-id="8131c29a-e3f7-4657-995a-917f9658b14c"
              language-code="es"
            ></df-messenger>
          </div>
        </AuthProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
