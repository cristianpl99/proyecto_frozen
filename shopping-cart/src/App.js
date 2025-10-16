import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
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