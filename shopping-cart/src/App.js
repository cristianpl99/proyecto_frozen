import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
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
      </div>
    </CartProvider>
  );
}

export default App;
