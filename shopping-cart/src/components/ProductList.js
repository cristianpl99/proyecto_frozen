import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Product from './Product';
import Modal from './Modal';
import SkeletonProductCard from './SkeletonProductCard';
import './ProductList.css';

const getProductIcon = (productName) => {
  const name = productName.toLowerCase();
  if (name.includes('hamburguesa')) return '🍔';
  if (name.includes('milanesa')) return '🥩';
  if (name.includes('patita')) return '🍗';
  if (name.includes('medallon')) return '🍖';
  if (name.includes('nugget')) return '🐔';
  if (name.includes('vegetal')) return '🥬';
  if (name.includes('papa')) return '🍟';
  if (name.includes('helado')) return '🍦';
  return '🧊';
};

const ProductList = ({ products, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart } = useContext(CartContext);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products
    .map(product => {
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
    })
    .filter(product =>
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
        icon={selectedProduct ? getProductIcon(selectedProduct.nombre) : ''}
      />
    </div>
  );
};

export default ProductList;
