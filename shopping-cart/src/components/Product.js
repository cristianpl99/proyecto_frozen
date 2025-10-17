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

  const stockInfo = product.stock;
  const isOutOfStock = stockInfo && stockInfo.cantidad_disponible === 0;

  return (
    <div className="product-card" onClick={() => onProductClick(product)}>
      <h3>{product.nombre}</h3>
      <p className="price">${product.precio}</p>
      {stockInfo && (
        <div className="stock-info">
          Disponible: {stockInfo.cantidad_disponible} {stockInfo.unidad_medida}
        </div>
      )}
      <button
        onClick={handleAddToCart}
        disabled={isAdded || isOutOfStock}
        className={`${isAdded ? 'added' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}
      >
        {isOutOfStock ? 'Producto Agotado' : (isAdded ? '✔ Agregado' : 'Agregar al Carrito')}
      </button>
    </div>
  );
};

export default Product;