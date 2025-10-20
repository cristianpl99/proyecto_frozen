import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import EditProfileForm from './components/EditProfileForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

function App() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const [fetchProducts, setFetchProducts] = useState(null);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleEditProfileClick = () => {
    setShowEditProfileForm(true);
  };

  const handleCloseEditProfileForm = () => {
    setShowEditProfileForm(false);
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <div className="App">
            <Navbar onRegisterClick={handleRegisterClick} onEditProfileClick={handleEditProfileClick} />
          {showRegisterForm && <RegisterForm onClose={handleCloseRegisterForm} />}
          {showEditProfileForm && <EditProfileForm onClose={handleCloseEditProfileForm} />}
          <main className="main-content">
            <div className="product-list">
              <ProductList setFetchProducts={setFetchProducts} />
            </div>
            <aside className="cart">
              <Cart fetchProducts={fetchProducts} />
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