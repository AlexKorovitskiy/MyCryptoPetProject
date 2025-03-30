import React, { useState } from 'react';
import './TabsContainer.css';
import HopeERC20Tab from './HopeERC20/HopeERC20Tab';

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState('hopeERC20');

  const renderContent = () => {
    switch (activeTab) {
      case 'hopeERC20':
        return (
          <div className="tab-content">
            <h2>HopeERC20 Contract</h2>
            <HopeERC20Tab />
          </div>
        );
      case 'multisig':
        return (
          <div className="tab-content">
            <h2>Multisig Contract</h2>
            {/* Content for Multisig will be here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <button 
          className={`tab-button ${activeTab === 'hopeERC20' ? 'active' : ''}`}
          onClick={() => setActiveTab('hopeERC20')}
        >
          HopeERC20
        </button>
        <button 
          className={`tab-button ${activeTab === 'multisig' ? 'active' : ''}`}
          onClick={() => setActiveTab('multisig')}
        >
          Multisig
        </button>
      </div>
      <div className="tabs-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabsContainer; 