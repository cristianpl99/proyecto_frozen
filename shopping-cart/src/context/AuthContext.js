import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const refreshUser = async () => {
    if (user) {
      try {
        const response = await fetch(`https://frozenback-test.up.railway.app/api/ventas/clientes/${user.id_cliente}/`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error refreshing user data:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
