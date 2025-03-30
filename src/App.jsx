import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import TabsContainer from './components/TabsContainer'
import { ethers } from 'ethers'
import { WalletContext } from './components/WalletContext'

function App() {
  const { provider, signer, account, connectWallet } = useContext(WalletContext);
  console.log("app render")

  console.log("params: ", provider, signer, account)

  function disconnectWallet() {
 
  }

function test(){
  connectWallet(null);
}
  return (
    <div className="app">
      <Header onClick={account?.account == null ? test : disconnectWallet}
        currentAccount={account?.account}
        balance={account?.balance} />
      <main className="main-content">
        <TabsContainer />
      </main>
    </div>
  )
}

export default App
