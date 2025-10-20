import React, { useState, useContext, useEffect } from 'react';
import './EditProfileForm.css';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';

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

const EditProfileForm = ({ onClose }) => {
  const { user, refreshUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    cuit: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.nombre,
        lastName: user.apellido,
        cuit: user.cuil,
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const [errors, setErrors] = useState({});

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
    if (!formData.cuit) newErrors.cuit = 'El CUIL es obligatorio';
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const clientData = {
          nombre: formData.name,
          apellido: formData.lastName,
          cuil: formData.cuit,
          email: user.email,
        };

        if (formData.password) {
          clientData.contraseña = formData.password;
        }

        const response = await fetch(`https://frozenback-test.up.railway.app/api/ventas/clientes/${user.id_cliente}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
        });

        if (response.ok) {
          addToast('Datos actualizados exitosamente', 'success');
          refreshUser();
          onClose();
        } else {
          const errorData = await response.json();
          const errorMessage = Object.values(errorData).flat().join(' ');
          addToast(`Error: ${errorMessage}`, 'error');
        }
      } catch (error) {
        addToast('Error de red al actualizar los datos', 'error');
      }
    }
  };

  return (
    <div className="edit-profile-form-overlay">
      <div className="edit-profile-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="form-title">
          <img src="/favicon_frozen2.png" alt="logo" className="form-logo"/>
          <div>
            <h2>Editar Datos</h2>
            <p className="form-subtitle">Actualizá tu información personal</p>
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
            <label htmlFor="cuit">CUIL</label>
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
            <label htmlFor="password">Nueva Contraseña (opcional)</label>
            <div className="input-with-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Repetir Nueva Contraseña</label>
            <div className="input-with-icon">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span className="icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </span>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="submit-button">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
