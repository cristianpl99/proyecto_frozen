import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import './Cart.css';

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-svg-icon">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21"r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const Cart = () => {
  const { cart, getTotalPrice } = useContext(CartContext);

  const subtotal = parseFloat(getTotalPrice());
  const shippingCost = subtotal > 5000 ? 0 : 1000;
  const total = subtotal + shippingCost;

  return (
    <div className="cart-container">
      <h2><CartIcon /> Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          {cart.map(item => <CartItem key={item.id_producto} item={item} />)}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Costo de Envío:</span>
              {shippingCost === 0 ? (
                <span className="bonificado">Bonificado</span>
              ) : (
                <span>${shippingCost.toFixed(2)}</span>
              )}
            </div>
            <div className="shipping-info">
              Envio Gratis superando los $5000
            </div>
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="pay-btn">Pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;