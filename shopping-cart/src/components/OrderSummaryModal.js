import React from 'react';
import './OrderSummaryModal.css';
import Modal from './Modal';

const OrderSummaryModal = ({ user, total, onClose }) => {
  if (!user) {
    return null;
  }

  return (
    <Modal onClose={onClose} modalId="order-summary-modal" title="">
      <div className="order-summary-content">
        <h2>¡Gracias por tu compra, {user.nombre} {user.apellido}!</h2>
        <p>El detalle del pedido fue enviado a {user.email}.</p>
        <p>El monto total es ${total.toFixed(2)}.</p>
        <p>Nuestro alias es <strong>frozen.pyme.congelados</strong>, por favor envianos a frozen@gmail.com el comprobante para iniciar el proceso de envio.</p>
      </div>
    </Modal>
  );
};

export default OrderSummaryModal;
