import React from 'react';
import './HopeERC20.css';

const ContractMethods = ({ 
  depositAmount, 
  withdrawAmount, 
  withdrawId, 
  isLoading,
  onDepositChange,
  onWithdrawIdChange,
  onWithdrawAmountChange,
  onDeposit,
  onWithdraw
}) => {
  return (
    <div className="hope-section contract-methods">
      <h3>Contract Methods</h3>
      <div className="method-group">
        <div className="method-block">
          <h4>Deposit Tokens</h4>
          <div className="deposit-group">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => onDepositChange(e.target.value)}
              placeholder="Enter amount"
              className="amount-input"
            />
            <button onClick={onDeposit} className="action-button" disabled={isLoading}>
              Deposit
            </button>
          </div>
        </div>

        <div className="method-block">
          <h4>Withdraw Tokens</h4>
          <div className="withdraw-group">
            <input
              type="number"
              value={withdrawId}
              onChange={(e) => onWithdrawIdChange(e.target.value)}
              placeholder="Enter deposit ID"
              className="amount-input"
            />
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => onWithdrawAmountChange(e.target.value)}
              placeholder="Enter amount"
              className="amount-input"
            />
            <button onClick={onWithdraw} className="action-button" disabled={isLoading}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractMethods; 