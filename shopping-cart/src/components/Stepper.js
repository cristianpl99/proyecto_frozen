import React from 'react';
import './Stepper.css';

const Checkmark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Stepper = ({ currentStep }) => {
  const steps = ['Productos', 'Envío', 'Resumen', 'Confirmación'];

  return (
    <div className="stepper-wrapper">
      <div className="stepper-container">
        {steps.map((step, index) => {
          const stepIndex = index + 1;
          const isCompleted = stepIndex < currentStep;
          const isActive = stepIndex === currentStep;
          const isPending = stepIndex > currentStep;

          let stepClassName = "step-item";
          if (isActive) stepClassName += " active";
          if (isCompleted) stepClassName += " completed";
          if (isPending) stepClassName += " pending";

          return (
            <React.Fragment key={index}>
              <div className={stepClassName}>
                <div className="step-counter">
                  {isCompleted ? <Checkmark /> : stepIndex}
                </div>
                <div className="step-name">{step}</div>
              </div>
              {index < steps.length - 1 && <div className={`step-connector ${isCompleted || isActive ? 'active' : ''}`} />}
            </React.Fragment>
          );
        })}
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}></div>
      </div>
    </div>
  );
};

export default Stepper;
