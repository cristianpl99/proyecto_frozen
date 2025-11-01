import React, { createContext, useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { ToastContext } from './ToastContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const cartContext = useContext(CartContext);
  const { addToast } = useContext(ToastContext);

  const login = async (email, password) => {
    try {
      const response = await fetch('https://frozenback-test.up.railway.app/api/ventas/clientes/');
      if (!response.ok) {
        throw new Error('Error al obtener los datos de los clientes');
      }
      const data = await response.json();
      const clients = data.results;
      const client = clients.find(c => c.email === email);

      if (client) {
        if (client.contraseña === password) {
          setUser(client);
          addToast(`Bienvenido, ${client.nombre}`, 'success');
          return true;
        } else {
          addToast('Contraseña incorrecta', 'error');
          return false;
        }
      } else {
        addToast('Usuario no encontrado', 'error');
        return false;
      }
    } catch (error) {
      addToast('Error de red al iniciar sesión', 'error');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (cartContext) {
      cartContext.clearCart();
      cartContext.clearAddress();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};