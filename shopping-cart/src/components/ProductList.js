import React, { useState, useEffect } from 'react';
import Product from './Product';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://frozenback-test.up.railway.app/api/productos/productos/')
      .then(response => response.json())
      .then(data => setProducts(data.results));
  }, []);

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="product-list-container">
        {filteredProducts.map(product => (
          <Product key={product.id_producto} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;