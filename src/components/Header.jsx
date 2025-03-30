import React, { useEffect, useState } from 'react';
import './Header.css';

const defaultButtonName = "Connect Wallet";

const Header = (props) => {
  const [buttonCaption, setButtonCaption] = useState(defaultButtonName);

  useEffect(() => {
    if (!props.currentAccount) {
      setButtonCaption(defaultButtonName);
      return;
    }
    let address = maskAddress(props.currentAccount);
    setButtonCaption(address);
  }, [props.currentAccount])

  const maskAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 5)}***${address.slice(-3)}`;
  };

  const formatBalance = (balance) => {
    const [whole, decimal] = Number(balance).toString().split('.');
    if (!decimal) return whole;
    return `${whole}.${decimal.slice(0, 3)}`;
  };

  function onMouseIn(event) {
    setButtonCaption("Dsconnect")
  }
  function obMouseOut(event) {
    let address = maskAddress(props.currentAccount);
    setButtonCaption(address);
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">CryptoPet</div>
        <div className="wallet-container">
          {props.currentAccount && (
            <div className="balance">
              Balance: {formatBalance(props.balance || '0.00')} ETH
            </div>
          )}
          <button className="connect-wallet-btn"
            onMouseEnter={props.currentAccount ? onMouseIn : null}
            onMouseLeave={props.currentAccount ? obMouseOut : null}
            onClick={props.onClick}>{buttonCaption}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 