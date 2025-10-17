import React, { useState, useEffect } from 'react';
import Product from './Product';
import Modal from './Modal';
import './ProductList.css';

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://frozenback-test.up.railway.app/api/productos/productos/')
      .then(response => response.json())
      .then(data => {
        setProducts(data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="product-list-container">
        {isLoading ? (
          <p>Cargando productos...</p>
        ) : (
          filteredProducts.map(product => (
            <Product key={product.id_producto} product={product} onProductClick={handleProductClick} />
          ))
        )}
      </div>
      <Modal show={selectedProduct !== null} onClose={closeModal}>
        {selectedProduct && (
          <div>
            <h2>{selectedProduct.nombre}</h2>
            <p>{selectedProduct.descripcion}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductList;