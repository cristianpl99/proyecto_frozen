import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import SkeletonProductCard from './SkeletonProductCard';
import './ComboSection.css';

const ComboSection = () => {
  const [combos, setCombos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [addedComboId, setAddedComboId] = useState(null);

  useEffect(() => {
    const fetchCombos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://frozenback-test.up.railway.app/api/productos/combos');
        if (!response.ok) {
          throw new Error('Failed to fetch combos');
        }
        const data = await response.json();
        // The API returns an object with a 'results' key
        if (data.results) {
          setCombos(data.results);
        } else {
          setCombos(data); // Fallback for unexpected API response structure
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

  const handleAddToCart = (combo) => {
    const product = {
        id_producto: combo.id,
        nombre: combo.nombre,
        descripcion: combo.descripcion,
        precio: combo.precio_total,
        isCombo: true,
        productos: combo.productos,
    };
    addToCart(product);
    setAddedComboId(combo.id);
    setTimeout(() => {
        setAddedComboId(null);
    }, 2000);
  };

  return (
    <div className="combo-section">
      <h2 className="combo-section-title">Combos destacados 🍕</h2>
      <div className="combo-grid">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => <SkeletonProductCard key={index} />)
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          combos.map(combo => (
            <div key={combo.id} className="combo-card">
              <div className="combo-card-content">
                <h3>{combo.nombre}</h3>
                <p>{combo.descripcion}</p>
                <button onClick={() => handleAddToCart(combo)} className={addedComboId === combo.id ? 'added' : ''}>
                  {addedComboId === combo.id ? '✔ Agregado' : 'Agregar'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComboSection;
