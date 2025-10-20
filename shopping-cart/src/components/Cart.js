import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';
import CartItem from './CartItem';
import ProgressBar from './ProgressBar';
import './Cart.css';

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-svg-icon">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21"r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const Cart = ({ fetchProducts }) => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { addToast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  const subtotal = parseFloat(getTotalPrice());
  const shippingCost = subtotal > 5000 ? 0 : 1000;
  const total = subtotal + shippingCost;

  const handleHacerPedido = async () => {
    if (!user) {
      addToast('Debes iniciar sesión para realizar la compra', 'error');
      return;
    }

    if (cart.length === 0) {
      addToast('Tu carrito está vacío', 'error');
      return;
    }

    const orderData = {
      id_cliente: user.id_cliente,
      fecha_entrega: new Date().toISOString(),
      id_prioridad: 1,
      productos: cart.map(item => ({
        id_producto: item.id_producto.toString(),
        cantidad: item.quantity,
        unidad_medida: item.unidad_medida || '',
      })),
    };

    try {
      const response = await fetch('https://frozenback-test.up.railway.app/api/ventas/ordenes-venta/crear/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        addToast('Orden de venta creada con éxito', 'success');
        setOrderTotal(total);
        setOrderComplete(true);
        clearCart();
      } else {
        addToast('Error al crear la orden de venta', 'error');
      }
    } catch (error) {
      addToast('Error de red al crear la orden de venta', 'error');
    }
  };

  const handleSeguirComprando = () => {
    setOrderComplete(false);
    fetchProducts();
  };

  return (
    <div className="cart-container">
      <h2><CartIcon /> Carrito de Compras</h2>
      {orderComplete ? (
        <div className="order-summary-content">
          <h3>¡Gracias por tu compra, {user.nombre} {user.apellido}!</h3>
          <p>El detalle del pedido fue enviado a {user.email}.</p>
          <p>El monto total es ${orderTotal.toFixed(2)}.</p>
          <p>Nuestro alias es <strong>frozen.pyme.congelados</strong>, por favor envianos a frozen@gmail.com el comprobante para iniciar el proceso de envio.</p>
          <button className="pay-btn" onClick={handleSeguirComprando}>Seguir Comprando</button>
        </div>
      ) : cart.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío</p>
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
              {subtotal < 5000 ? (
                <>
                  <span>🚚 Te faltan ${5000 - subtotal} para envío gratis</span>
                  <ProgressBar value={subtotal} max={5000} />
                </>
              ) : (
                <span>🎉 ¡Felicitaciones! Tenés envío gratis.</span>
              )}
            </div>
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="pay-btn-container">
              <button className="pay-btn" onClick={handleHacerPedido}>Hacer Pedido</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
