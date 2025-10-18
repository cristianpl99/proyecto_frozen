import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, description }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;