import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

function App() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <ToastProvider>
      <CartProvider>
        <div className="App">
          <Navbar onRegisterClick={handleRegisterClick} />
          {showRegisterForm && <RegisterForm onClose={handleCloseRegisterForm} />}
          <main className="main-content">
            <div className="product-list">
              <ProductList />
            </div>
            <aside className="cart">
              <Cart />
            </aside>
          </main>
          <ToastContainer />
          <Footer />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;