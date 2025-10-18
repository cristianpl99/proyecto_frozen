import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    cuit: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    onClose();
  };

  return (
    <div className="register-form-overlay">
      <div className="register-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Formulario de Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cuit">CUIT</label>
            <input
              type="text"
              id="cuit"
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección de Entrega</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
