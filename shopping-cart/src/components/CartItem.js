import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h4>{item.nombre}</h4>
        <p>${item.precio}</p>
      </div>
      <div className="cart-item-actions">
        <button onClick={() => updateQuantity(item.id_producto, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id_producto, item.quantity + 1)}>+</button>
        <button className="remove-btn" onClick={() => removeFromCart(item.id_producto)}>Eliminar</button>
      </div>
    </div>
  );
};

export default CartItem;