import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.css';

const Modal = ({ show, onClose, title, description, image }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="modal-close" onClick={onClose}>&times;</button>
            <div className="modal-header">
              {image && <img src={`data:image/jpeg;base64,${image}`} alt={title} className="modal-image" />}
              {title && <h2 className="modal-title">{title}</h2>}
            </div>
            <div className="modal-body">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;