import React, { useState, useContext, useEffect } from 'react';
import './RegisterForm.css';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';
import { formatCuil } from '../utils/utils';

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
  const { user } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cuil: '',
    password: '',
    newPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        cuil: user.cuil ? user.cuil.replace(/-/g, '') : '',
        password: '',
        newPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedCuil = formData.cuil.replace(/-/g, '');
    if (!/^\d{10,11}$/.test(cleanedCuil)) {
      addToast('El CUIL debe tener 10 u 11 dígitos', 'error');
      return;
    }

    const updatedData = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      cuil: formatCuil(formData.cuil),
      contraseña: formData.password,
    };

    if (formData.newPassword) {
      updatedData.nueva_contraseña = formData.newPassword;
    }

    try {
      const response = await fetch(`https://frozenback-test.up.railway.app/api/ventas/clientes/${user.id_cliente}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        addToast('Datos actualizados exitosamente', 'success');
        onClose();
      } else {
        addToast('Error al actualizar los datos', 'error');
      }
    } catch (error) {
      addToast('Error de red al actualizar los datos', 'error');
    }
  };

  return (
    <div className="register-form-overlay">
      <div className="register-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="form-title">
          <img src="/favicon_ice.png" alt="logo" className="form-logo"/>
          <div>
            <h2>Editar Datos</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <span className="icon"><UserIcon /></span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              <span className="icon"><UserIcon /></span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cuil">CUIL</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="cuil"
                name="cuil"
                value={formData.cuil}
                onChange={handleChange}
                pattern="\d*"
                required
              />
              <span className="icon"><CuitIcon /></span>
            </div>
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
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nueva Contraseña <i>(Opcional)</i></label>
            <div className="input-with-icon">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <span className="icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </span>
            </div>
          </div>
          <button type="submit" className="submit-button">Confirmar cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;