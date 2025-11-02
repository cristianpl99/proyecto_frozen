import React, { useState, useContext, useMemo } from 'react';
import Fuse from 'fuse.js';
import { CartContext } from '../context/CartContext';
import Product from './Product';
import Modal from './Modal';
import SkeletonProductCard from './SkeletonProductCard';
import './ProductList.css';

const ProductList = ({ products, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { cart } = useContext(CartContext);

  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ['nombre'],
        threshold: 0.3,
      }),
    [products]
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const results = fuse.search(value);
      setSuggestions(results.map(result => result.item));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.nombre);
    setSuggestions([]);
  };

  const filteredProducts = searchTerm
    ? products.filter(product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  const productsWithStock = filteredProducts.map(product => {
    const itemInCart = cart.find(item => item.id_producto === product.id_producto);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;
    const availableStock = Math.max(0, product.stock.cantidad_disponible - quantityInCart);

    return {
      ...product,
      stock: {
        ...product.stock,
        cantidad_disponible: availableStock
      }
    };
  });

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <span className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="product-list-container">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <SkeletonProductCard key={index} />)
        ) : (
          productsWithStock.map(product => (
            <Product
              key={product.id_producto}
              product={product}
              availableStock={product.stock.cantidad_disponible}
              onProductClick={handleProductClick}
            />
          ))
        )}
      </div>
      <Modal
        show={selectedProduct !== null}
        onClose={closeModal}
        title={selectedProduct ? selectedProduct.nombre : ''}
        description={selectedProduct ? selectedProduct.descripcion : ''}
      />
    </div>
  );
};

export default ProductList;
