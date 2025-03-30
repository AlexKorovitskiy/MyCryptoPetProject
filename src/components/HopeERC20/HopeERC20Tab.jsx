import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../WalletContext'
import { ethers } from 'ethers'
import './HopeERC20.css';
import Spinner from '../Spinner/Spinner';
import ContractInfo from './ContractInfo';
import ContractMethods from './ContractMethods';
import UserBalance from './UserBalance';
import DepositsList from './DepositsList';
import { hopeTokenAddress, hopeTokenAbi } from './hopeERC20.abi'
import { hopeReceiverContractAddress, hopeReceiverTokenAbi } from './hopeReceiver.abi'

const HopeERC20Tab = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawId, setWithdrawId] = useState('');
  const [balance, setBalance] = useState({ userBalance: 0.00, contractBalance: 0.00 });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [deposits, setDeposits] = useState([]);
  const [depositDuration, setDepositDuration] = useState({ days: 0, hours: 0, minutes: 0 });
  const { provider, signer, account } = useContext(WalletContext);
  
  let hopeERC20Contract;
  let hopeReceiverContract;

  useEffect(() => {
    if (!provider || !signer || !account) {
      return;
    }
    hopeERC20Contract = new ethers.Contract(hopeTokenAddress, hopeTokenAbi, signer);
    hopeReceiverContract = new ethers.Contract(hopeReceiverContractAddress, hopeReceiverTokenAbi, signer);

    FetchBalances();
    fetchDeposits();
    fetchDepositDuration();
  }, [signer, account])

  const fetchDepositDuration = async () => {
    try {
      const duration = await hopeReceiverContract.getWithdrawDateWithoutFee();
      const durationInSeconds = Number(duration);

      const days = Math.floor(durationInSeconds / (24 * 60 * 60));
      const remainingHours = Math.floor((durationInSeconds % (24 * 60 * 60)) / (60 * 60));
      const remainingMinutes = Math.floor((durationInSeconds % (60 * 60)) / 60);

      setDepositDuration({
        days,
        hours: remainingHours,
        minutes: remainingMinutes
      });
    } catch (error) {
      console.error('Error fetching deposit duration:', error);
    }
  };

  const handleDeposit = async () => {
    try {
      setIsLoading(true);
      const amount = ethers.parseUnits(depositAmount, 18);

      setLoadingText('Approving transaction...');
      const approveTx = await hopeERC20Contract.approve(hopeReceiverContractAddress, amount);
      await approveTx.wait();

      setLoadingText('Depositing tokens...');
      const depositTrx = await hopeReceiverContract.deposit(amount);
      await depositTrx.wait();

      await FetchBalances();
      await fetchDeposits();
      setDepositAmount('');
    } catch (error) {
      console.error('Error during deposit:', error);
    } finally {
      setIsLoading(false);
      setLoadingText('');
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      setLoadingText('Withdrawing tokens...');
      const amount = ethers.parseUnits(withdrawAmount, 18);
      const withdrawTx = await hopeReceiverContract.withdraw(withdrawId, amount);
      await withdrawTx.wait();

      await FetchBalances();
      await fetchDeposits();
      setWithdrawAmount('');
      setWithdrawId('');
    } catch (error) {
      console.error('Error during withdraw:', error);
    } finally {
      setIsLoading(false);
      setLoadingText('');
    }
  };

  const formatBalance = (balance) => {
    return Number(balance).toFixed(2);
  };

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  async function fetchDeposits() {
    try {
      const userDeposits = await hopeReceiverContract.getMyDeposits();
      const formattedDeposits = userDeposits.map(deposit => ({
        depositId: deposit[0].toString(),
        amount: ethers.formatUnits(deposit[1], 18),
        date: formatDate(deposit[2])
      }));
      setDeposits(formattedDeposits);
    } catch (error) {
      console.error('Error fetching deposits:', error);
    }
  }

  async function FetchBalances() {
    const decimals = await hopeERC20Contract.decimals();

    const userBalance = await hopeERC20Contract.balanceOf(account.account);
    const contractBalance = await hopeERC20Contract.balanceOf(hopeReceiverContract);

    const formatedUserBalance = ethers.formatUnits(userBalance, decimals);
    const formatedContractBalance = ethers.formatUnits(contractBalance, decimals);

    const balances = {
      contractBalance: formatBalance(formatedContractBalance),
      userBalance: formatBalance(formatedUserBalance)
    }
    setBalance(balances);
  }

  return (
    <div className="hope-container">
      {isLoading && <Spinner text={loadingText} />}
      <div className="left-section">
        <ContractInfo
          balance={balance.contractBalance}
          depositDuration={depositDuration}
        />
        <ContractMethods
          depositAmount={depositAmount}
          withdrawAmount={withdrawAmount}
          withdrawId={withdrawId}
          isLoading={isLoading}
          onDepositChange={setDepositAmount}
          onWithdrawIdChange={setWithdrawId}
          onWithdrawAmountChange={setWithdrawAmount}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
        />
      </div>

      <div className="right-section">
        <UserBalance balance={balance.userBalance} />
        <DepositsList
          deposits={deposits}
          formatBalance={formatBalance}
        />
      </div>
    </div>
  );
};

export default HopeERC20Tab; 