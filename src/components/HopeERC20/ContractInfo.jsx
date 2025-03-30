import React from 'react';
import './HopeERC20.css';

const ContractInfo = ({ balance, depositDuration }) => {
  return (
    <div className="hope-section contract-info">
      <h3>Contract Info</h3>
      <div className="info-list">
        <div className="balance-item">
          <span className="balance-label">Total Balance:</span>
          <span className="balance-value">{balance} HOPE</span>
        </div>
        <div className="balance-item">
          <span className="balance-label">Expiration Date:</span>
          <span className="balance-value">{depositDuration.days}d {depositDuration.hours}h {depositDuration.minutes}m</span>
        </div>
      </div>
    </div>
  );
};

export default ContractInfo; 