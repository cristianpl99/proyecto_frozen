import React, { createContext, useState, useContext } from 'react';
import { CartContext } from './CartContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const cartContext = useContext(CartContext);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    if (cartContext) {
      cartContext.clearCart();
      cartContext.clearAddress();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
