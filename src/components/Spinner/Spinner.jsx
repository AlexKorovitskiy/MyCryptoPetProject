import React from 'react';
import './Spinner.css';

const Spinner = ({ text }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        {text && <div className="spinner-text">{text}</div>}
      </div>
    </div>
  );
};

export default Spinner; 