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
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon-right">
                <input id="email" type="email" />
                <span role="img" aria-label="email-icon">📧</span>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon-right">
                <input id="password" type="password" />
                <span role="img" aria-label="password-icon">🔒</span>
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;