import React, { useState, useContext } from 'react';
import Slider from 'react-slick';
import { CartContext } from '../context/CartContext';
import Modal from './Modal';
import './ComboCarousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ComboCarousel = ({ combos, products }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedCombo, setSelectedCombo] = useState(null);

  const handleComboClick = (combo) => {
    setSelectedCombo(combo);
  };

  const closeModal = () => {
    setSelectedCombo(null);
  };

  const handleAddToCart = (e, combo) => {
    e.stopPropagation();
    let comboPrice = 0;
    const comboProducts = combo.products.map(comboProduct => {
      const productInfo = products.find(p => p.id_producto === comboProduct.id_producto);
      if (productInfo) {
        comboPrice += productInfo.precio * comboProduct.cantidad;
        return { ...productInfo, quantity: comboProduct.cantidad };
      }
      return null;
    }).filter(p => p !== null);

    const comboForCart = {
      id_producto: `combo_${combo.id_combo}`,
      nombre: combo.nombre,
      precio: comboPrice,
      quantity: 1,
      isCombo: true,
      products: comboProducts
    };

    addToCart(comboForCart);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="combo-carousel-container">
      <h2>Combos</h2>
      <Slider {...settings}>
        {combos.map(combo => (
          <div key={combo.id_combo} className="combo-card" onClick={() => handleComboClick(combo)}>
            <h3>{combo.nombre}</h3>
            <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(e, combo)}>
              Agregar
            </button>
          </div>
        ))}
      </Slider>
      <Modal
        show={selectedCombo !== null}
        onClose={closeModal}
        title={selectedCombo ? selectedCombo.nombre : ''}
        description={selectedCombo ? selectedCombo.descripcion : ''}
      />
    </div>
  );
};

export default ComboCarousel;
