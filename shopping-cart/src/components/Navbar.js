import React, { useState, useContext } from 'react';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PasswordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);


const Navbar = ({ onRegisterClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, logout } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://frozenback-production.up.railway.app/api/ventas/clientes/');
      const clients = await response.json();
      const client = clients.find(c => c.email === email);

      if (client && password === '123') {
        login(client);
        addToast(`Bienvenido, ${client.nombre}`, 'success');
        setEmail('');
        setPassword('');
        setIsOpen(false);
      } else {
        addToast('Email o contraseña incorrectos', 'error');
      }
    } catch (error) {
      addToast('Error al iniciar sesión', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    addToast('Sesión cerrada exitosamente', 'success');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/favicon_frozen2.png" alt="Frozen Pyme Logo" style={{ height: '73.6px' }} />
        </div>
        <div className="navbar-title">
          Frozen PyME
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
        <div className={`navbar-login ${isOpen ? 'active' : ''}`}>
          {user ? (
            <div className="welcome-container">
              <span className="welcome-message">Bienvenido, {user.nombre}</span>
              <button className="logout-btn" onClick={handleLogout}>Desloguear</button>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <div className="input-with-icon-right">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="icon-span"><EmailIcon /></span>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon-right">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="icon-span"><PasswordIcon /></span>
                </div>
              </div>
              <div className="button-group">
                <button type="submit">Login</button>
                <button type="button" className="register-btn" onClick={onRegisterClick}>Registrarse</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;