import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          {/* Placeholder for ice icon */}
          <span role="img" aria-label="ice-icon" style={{fontSize: '2rem', marginRight: '10px'}}>❄️</span>
          Frozen SRL
        </div>
        <div className="navbar-login">
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;