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
          {title && <h2 className="modal-title">{title}</h2>}
          {description && (
            <div className="modal-description">
              {description.split('.').filter(s => s.trim()).map((sentence, index) => {
                const trimmedSentence = sentence.trim();
                if (index === 0) {
                  return <span key={index}>{trimmedSentence}.</span>;
                }
                const words = trimmedSentence.split(' ');
                const firstWord = words.shift();
                const rest = words.join(' ');
                return (
                  <p key={index} style={{ margin: '0.5em 0 0 0', padding: 0 }}>
                    <strong>{firstWord}</strong>
                    {rest && ` ${rest}`}.
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;