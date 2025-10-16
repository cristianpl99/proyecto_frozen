import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Product.css';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <h3>{product.nombre}</h3>
      <p>{product.descripcion}</p>
      <p>${product.precio}</p>
      <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
    </div>
  );
};

export default Product;