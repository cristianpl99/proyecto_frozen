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
          filteredProducts.map(product => (
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
