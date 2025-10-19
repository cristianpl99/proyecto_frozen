import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Product from './Product';
import Modal from './Modal';
import SkeletonProductCard from './SkeletonProductCard';
import './ProductList.css';

const ProductList = ({ setFetchProducts }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart } = useContext(CartContext);

  const fetchProductsAndStock = async () => {
    setIsLoading(true);
    try {
      const productResponse = await fetch('https://frozenback-test.up.railway.app/api/productos/productos/');
      const productData = await productResponse.json();
      const products = productData.results;

      const stockPromises = products.map(product =>
        fetch(`https://frozenback-test.up.railway.app/api/stock/cantidad-disponible/${product.id_producto}/`)
          .then(res => res.json())
      );

      const stockData = await Promise.all(stockPromises);

      const productsWithStock = products.map((product, index) => ({
        ...product,
        stock: stockData[index]
      }));

      setProducts(productsWithStock);
    } catch (error) {
      console.error("Error fetching product or stock data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndStock();
    setFetchProducts(() => fetchProductsAndStock);
  }, [setFetchProducts]);

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
      const availableStock = product.stock.cantidad_disponible - quantityInCart;

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
            <Product key={product.id_producto} product={product} onProductClick={handleProductClick} />
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
