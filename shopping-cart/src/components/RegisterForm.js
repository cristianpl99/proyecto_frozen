import React, { useState } from 'react';
import './RegisterForm.css';

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const CuitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="M6 10h4m-4 4h4m6-4h4m-4 4h4"></path>
    </svg>
);

const AddressIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    cuit: '',
    address: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.lastName) newErrors.lastName = 'El apellido es obligatorio';
    if (!formData.cuit) newErrors.cuit = 'El CUIT es obligatorio';
    if (!formData.address) newErrors.address = 'La dirección es obligatoria';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form data submitted:', formData);
      onClose();
    }
  };

  return (
    <div className="register-form-overlay">
      <div className="register-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="form-title">
          <img src="/favicon_frozen2.png" alt="logo" className="form-logo"/>
          <div>
            <h2>Crear Cuenta</h2>
            <p className="form-subtitle">Registrate para acceder a promociones y finalizar tu compra</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="icon"><UserIcon /></span>
            </div>
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <span className="icon"><UserIcon /></span>
            </div>
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="cuit">CUIT</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="cuit"
                name="cuit"
                value={formData.cuit}
                onChange={handleChange}
                required
              />
              <span className="icon"><CuitIcon /></span>
            </div>
            {errors.cuit && <p className="error-message">{errors.cuit}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="icon"><EmailIcon /></span>
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección de Entrega</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <span className="icon"><AddressIcon /></span>
            </div>
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>
          <button type="submit" className="submit-button">Crear Cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
