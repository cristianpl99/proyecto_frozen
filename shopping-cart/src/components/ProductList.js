import React, { useState, useEffect } from 'react';
import Product from './Product';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://frozenback-test.up.railway.app/api/productos/productos/')
      .then(response => response.json())
      .then(data => setProducts(data.results));
  }, []);

  return (
    <div className="product-list-container">
      {products.map(product => (
        <Product key={product.id_producto} product={product} />
      ))}
    </div>
  );
};

export default ProductList;