import React from 'react';
import './Navbar.css';
import SnowflakeIcon from './SnowflakeIcon';

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


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <SnowflakeIcon color="white" size={32} />
        </div>
        <div className="navbar-title">
          Frozen SRL
        </div>
        <div className="navbar-login">
          <form>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon-right">
                <input id="email" type="email" />
                <span className="icon-span"><EmailIcon /></span>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon-right">
                <input id="password" type="password" />
                <span className="icon-span"><PasswordIcon /></span>
              </div>
            </div>
            <button type="button" className="register-btn">Registrarse</button>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;