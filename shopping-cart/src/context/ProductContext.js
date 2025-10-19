import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productResponse = await fetch('https://frozenback-production.up.railway.app/api/productos/productos/');
      const productData = await productResponse.json();
      const products = productData.results;

      const stockPromises = products.map(product =>
        fetch(`https://frozenback-production.up.railway.app/api/stock/cantidad-disponible/${product.id_producto}/`)
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
