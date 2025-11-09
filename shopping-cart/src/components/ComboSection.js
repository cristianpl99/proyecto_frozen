import React, { useState, useEffect } from 'react';
import SkeletonProductCard from './SkeletonProductCard';
import './Product.css';
import './ProductList.css';

const ComboSection = () => {
  const [combos, setCombos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCombos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://frozenback-test.up.railway.app/api/productos/combos');
        if (!response.ok) {
          throw new Error('Failed to fetch combos');
        }
        const data = await response.json();
        if (data.results) {
          setCombos(data.results);
        } else {
          setCombos(data);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching combos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCombos();
  }, []);

  const cardStyle = {
    background: 'linear-gradient(145deg, #4facfe, #6b4aee)',
  };

  return (
    <div className="product-list-container">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => <SkeletonProductCard key={index} />)
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        combos.map(combo => (
          <div key={combo.id} className="product-card" style={cardStyle}>
            <div className="product-card-content">
              <h3>{combo.nombre}</h3>
              <p>{combo.descripcion}</p>
              <button disabled>
                🛒 Agregar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ComboSection;
