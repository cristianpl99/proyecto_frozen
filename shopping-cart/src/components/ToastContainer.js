import React, { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import Toast from './Toast';
import './ToastContainer.css';

const ToastContainer = () => {
  const { toasts } = useContext(ToastContext);

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
};

export default ToastContainer;