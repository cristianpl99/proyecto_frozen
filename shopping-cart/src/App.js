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
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <ToastProvider>
      <CartProvider>
        <div className="App">
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <main className="main-content">
            <div className="product-list">
              <ProductList searchTerm={searchTerm} />
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