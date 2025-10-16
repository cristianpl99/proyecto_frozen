import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './Product.css';

const Product = ({ product, onProductClick }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the button
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="product-card" onClick={() => onProductClick(product)}>
      <h3>{product.nombre}</h3>
      <p className="price">${product.precio}</p>
      <button onClick={handleAddToCart} disabled={isAdded} className={isAdded ? 'added' : ''}>
        {isAdded ? '✔ Agregado' : 'Agregar al Carrito'}
      </button>
    </div>
  );
};

export default Product;