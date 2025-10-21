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
  const [completedOrderDetails, setCompletedOrderDetails] = useState({ items: [], total: 0 });

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
        setCompletedOrderDetails({ items: [...cart], total });
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
      <h2><CartIcon /> {orderComplete ? 'Resumen de la compra' : 'Carrito de Compras'}</h2>
      {orderComplete ? (
        <div className="order-summary-content">
          <table className="order-summary-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {completedOrderDetails.items.map(item => (
                <tr key={item.id_producto}>
                  <td>{item.nombre}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.precio * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary-row total-row">
            <span>Total a pagar:</span>
            <span>${completedOrderDetails.total.toFixed(2)}</span>
          </div>
          <div className="summary-info">
            <p>📧 El resumen fue enviado a: <strong>{user.email}</strong></p>
            <p>🏦 Alias de pago: <strong>frozen.pyme.congelados</strong></p>
            <p>📧 Enviá tu comprobante de transferencia a: <strong>frozenpyme@gmail.com</strong></p>
            <p>⏰ Tu pedido será reservado por 24hs.</p>
          </div>
          <div className="pay-btn-container">
            <button className="pay-btn" onClick={handleSeguirComprando}>Seguir Comprando</button>
          </div>
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
