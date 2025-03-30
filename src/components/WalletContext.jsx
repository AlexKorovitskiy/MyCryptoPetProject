import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const WalletContext = createContext(null);

export const WalletProvider = function ({ children }) {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    console.log("context render")
    useEffect(() => {
        console.log("context useEffects render");
        if (!window.ethereum) {
            console.log("MetaMask not installed");
            alert("MetaMask is not installed. Please install MetaMask to use this application: https://metamask.io/");
            //TODO: modal block instead of alert
            return;
        }
        
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(browserProvider);

        async function fetchAccounts() {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                connectWallet(browserProvider);
            }
        }
        fetchAccounts();
        
        window.ethereum.on("accountsChanged", (accounts) => {
            debugger;
            if (accounts.length === 0) {
                console.log("Wallet disconnected.");
            } else {
                console.log("New selected account:", accounts[0]);
                fetchAccounts()
            }
        })
    }, [])


    function getFormattedBalance(balance) {
        if (!balance) {
            return null;
        }

        //return ethers.formatUnits(balance, 18)
        return ethers.formatEther(balance);
    }

    async function connectWallet(localProvider) {
        localProvider = localProvider ?? provider;
        localProvider.getSigner()
            .then((response) => {
                setSigner(response);

                localProvider.getBalance(response.address)
                    .then((balance) => {
                        let accountInfo = {
                            account: response.address,
                            balance: getFormattedBalance(balance)
                        }
                        setAccount(accountInfo);
                    })
                    .catch((error) => console.log("Getting balance error", error));
            })
            .catch((error) => console.log("Getting signer error", error));
    }


    return (
        <WalletContext.Provider value={{ provider, signer, account, connectWallet }}>
            {children}
        </WalletContext.Provider>
    )
}