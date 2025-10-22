import React from 'react';
import './Stepper.css';

const Stepper = ({ currentStep }) => {
  const steps = ['Carrito', 'Envío', 'Confirmación'];

  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`step-item ${index + 1 <= currentStep ? 'active' : ''}`}>
            <div className="step-counter">{index + 1}</div>
            <div className="step-name">{step}</div>
          </div>
          {index < steps.length - 1 && <div className="step-connector" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
