import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const { cart, getTotalPrice } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2><span role="img" aria-label="cart-icon">🛒</span> Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => <CartItem key={item.id_producto} item={item} />)}
          <div className="cart-total">
            <h3>Total: ${getTotalPrice()}</h3>
            <button className="pay-btn">Pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;