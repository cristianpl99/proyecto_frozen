import React, { createContext, useState, useContext } from 'react';
import { ToastContext } from './ToastContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useContext(ToastContext);
  const [cart, setCart] = useState([]);
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [step, setStep] = useState(1);


  const addToCart = (product) => {
    setStep(1);
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id_producto === product.id_producto);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id_producto === product.id_producto
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    addToast(`${product.nombre} agregado con éxito`, 'success');
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cart.find(p => p.id_producto === productId);
    setCart((prevCart) => prevCart.filter((product) => product.id_producto !== productId));
    if (itemToRemove) {
      addToast(`${itemToRemove.nombre} eliminado del carrito`, 'error');
    }
  };

  const updateQuantity = (productId, quantity) => {
    const itemToUpdate = cart.find(p => p.id_producto === productId);
    if (!itemToUpdate) return;

    if (quantity > itemToUpdate.stock.cantidad_disponible) {
      addToast(`No hay más stock de ${itemToUpdate.nombre}`, 'error');
      return;
    }

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id_producto === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.precio) * item.quantity, 0).toFixed(2);
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearAddress = () => {
    setStreet('');
    setStreetNumber('');
    setCity('');
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id_producto === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart, street, setStreet, streetNumber, setStreetNumber, city, setCity, clearAddress, step, setStep, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};