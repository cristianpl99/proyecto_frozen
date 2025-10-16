import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span role="img" aria-label="ice-icon" style={{fontSize: '2rem', marginRight: '10px'}}>❄️</span>
          Frozen SRL
        </div>
        <div className="navbar-login">
          <form>
            <div className="input-with-icon">
              <span role="img" aria-label="email-icon">📧</span>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-with-icon">
              <span role="img" aria-label="password-icon">🔒</span>
              <input type="password" placeholder="Password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;