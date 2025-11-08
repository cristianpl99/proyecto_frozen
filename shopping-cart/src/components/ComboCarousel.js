import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import './ComboCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ComboCarousel = () => {
  const [combos, setCombos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const response = await axios.get('https://frozenback-test.up.railway.app/api/productos/combos');
        const comboData = response.data.results;
        if (Array.isArray(comboData)) {
          setCombos(comboData);
        } else {
          console.error("Fetched combo data is not an array:", comboData);
          setCombos([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching combos:', error);
        setIsLoading(false);
      }
    };

    fetchCombos();
  }, []);

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

  if (isLoading) {
    return <div>Loading combos...</div>;
  }

  return (
    <div className="combo-carousel-container">
      <h2 className="combo-carousel-title">Nuestros Combos</h2>
      <Slider {...settings}>
        {combos.map(combo => (
          <div key={combo.id_combo} className="combo-card-wrapper">
            <div className="product-card combo-card">
              <div className="product-card-content">
                <h3>{combo.nombre}</h3>
                <p className="combo-description">{combo.descripcion}</p>
                <button disabled>🛒 Agregar</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ComboCarousel;