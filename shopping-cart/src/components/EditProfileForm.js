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

const AddressIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const EditProfileForm = ({ onClose }) => {
  const { user, refreshUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    cuit: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      const [name, ...lastName] = user.nombre.split(' ');
      setFormData({
        name: name,
        lastName: lastName.join(' '),
        cuit: user.cuit,
        address: user.direccion,
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
    if (!formData.cuit) newErrors.cuit = 'El CUIT es obligatorio';
    if (!formData.address) newErrors.address = 'La dirección es obligatoria';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const clientData = {
          nombre: `${formData.name} ${formData.lastName}`,
          cuit: formData.cuit,
          direccion: formData.address,
          email: user.email,
        };

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
          addToast('Error al actualizar los datos', 'error');
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
          <button type="submit" className="submit-button">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
