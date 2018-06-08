import React from 'react';
import './index.css';

export const LoadingContainer = (props) => (
  <div {...props} className="spinner">
    <div className="dot1"></div>
    <div className="dot2"></div>
  </div>
);