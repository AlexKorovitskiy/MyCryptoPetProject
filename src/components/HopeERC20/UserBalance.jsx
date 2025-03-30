import React from 'react';
import './HopeERC20.css';

const UserBalance = ({ balance }) => {
  return (
    <div className="hope-section user-balance">
      <h3>Your Balance</h3>
      <div className="balance-item">
        <span className="balance-label">Available:</span>
        <span className="balance-value">{balance} HOPE</span>
      </div>
    </div>
  );
};

export default UserBalance; 