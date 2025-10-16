import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <h1>E-commerce</h1>
        <div className="container">
          <div className="product-list">
            <ProductList />
          </div>
          <div className="cart">
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
