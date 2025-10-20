import React from 'react';
import './OrderSummaryModal.css';
import Modal from './Modal';

const OrderSummaryModal = ({ show, onClose, orderDetails }) => {
  if (!orderDetails) {
    return null;
  }

  const { cart, subtotal, shippingCost, total } = orderDetails;

  return (
    <Modal show={show} onClose={onClose} title="Resumen de la Compra">
      <div className="order-summary-content">
        {cart.map(item => (
          <div key={item.id_producto} className="summary-item">
            <span>{item.nombre} (x{item.quantity})</span>
            <span>${(item.precio * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="summary-total-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-total-row">
          <span>Costo de Envío:</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="summary-total-row final-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSummaryModal;
