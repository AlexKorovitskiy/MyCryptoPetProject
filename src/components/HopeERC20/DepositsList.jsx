import React from 'react';
import './HopeERC20.css';

const DepositsList = ({ deposits, formatBalance }) => {
  return (
    <div className="hope-section deposits-info">
      <h3>Your Deposits</h3>
      <div className="deposits-list">
        {deposits.length === 0 ? (
          <div className="no-deposits">No deposits yet</div>
        ) : (
          deposits.map(deposit => (
            <div key={deposit.depositId} className="deposit-item">
              <div className="deposit-header">
                <span className="deposit-id">#{deposit.depositId}</span>
                <span className="deposit-date">{deposit.date}</span>
              </div>
              <div className="deposit-amount">
                {formatBalance(deposit.amount)} HOPE
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DepositsList; 