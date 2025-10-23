import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './Product.css';

const Product = ({ product, availableStock, onProductClick }) => {
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

  const isOutOfStock = availableStock <= 0;

  const cardStyle = product.imagenes && product.imagenes[0] ? {
    backgroundImage: `url(data:image/jpeg;base64,${product.imagenes[0].imagen_base64})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    zIndex: 1,
  } : {};

  return (
    <div className="product-card" style={cardStyle} onClick={() => onProductClick(product)}>
      <div className="product-card-content">
        <h3>{product.nombre}</h3>
        <p className="price">${product.precio}</p>
        {product.stock && (
          <div className="stock-info">
            Disponible: {availableStock} {product.stock.unidad_medida}
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={isAdded || isOutOfStock}
          className={`${isAdded ? 'added' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}
        >
          {isOutOfStock ? (
            <>
              <span className="out-of-stock-icon">❌</span> Agotado
            </>
          ) : (isAdded ? '✔ Agregado' : '🛒 Agregar')}
        </button>
      </div>
    </div>
  );
};

export default Product;