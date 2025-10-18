import React from 'react';
import './SkeletonProductCard.css';

const SkeletonProductCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
      <div className="skeleton-button"></div>
    </div>
  );
};

export default SkeletonProductCard;
