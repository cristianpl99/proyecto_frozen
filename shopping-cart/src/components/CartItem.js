import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h4>{item.nombre}</h4>
      <p>${item.precio}</p>
      <button onClick={() => removeFromCart(item.id_producto)}>Remove</button>
    </div>
  );
};

export default CartItem;