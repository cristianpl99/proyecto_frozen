import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, description, icon }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          {icon && <div className="modal-icon">{icon}</div>}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;