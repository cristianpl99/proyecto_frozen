import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value, max }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
