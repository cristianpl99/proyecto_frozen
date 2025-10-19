import React, { useState, useContext } from 'react';
import './RegisterForm.css';
import { ToastContext } from '../context/ToastContext';

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

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const EyeOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    cuit: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const { addToast } = useContext(ToastContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.lastName) newErrors.lastName = 'El apellido es obligatorio';
    if (!formData.cuit) newErrors.cuit = 'El CUIT es obligatorio';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await fetch('https://frozenback-test.up.railway.app/api/ventas/clientes/');
        const data = await response.json();
        const existingClient = data.results.find(c => c.email === formData.email);

        if (existingClient) {
          addToast('El email ya está registrado', 'error');
          return;
        }

        const clientData = {
          nombre: formData.name,
          apellido: formData.lastName,
          email: formData.email,
          cuil: formData.cuit,
          contraseña: formData.password,
        };

        const createResponse = await fetch('https://frozenback-test.up.railway.app/api/ventas/clientes/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
        });

        if (createResponse.ok) {
          addToast('Cliente creado exitosamente', 'success');
          onClose();
        } else {
          addToast('Error al crear el cliente', 'error');
        }
      } catch (error) {
        addToast('Error de red al crear el cliente', 'error');
      }
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
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Repetir Contraseña</label>
            <div className="input-with-icon">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </span>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="submit-button">Crear Cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
