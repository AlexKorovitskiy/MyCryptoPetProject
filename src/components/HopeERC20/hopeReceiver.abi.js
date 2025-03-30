
export const hopeReceiverContractAddress = "0x01150d61bC9BF930434262E39B55E770072eb44D";

export const hopeReceiverTokenAbi = [
    "function deposit(uint256) external returns (uint256)",
    "function withdraw(uint256,uint256) external",
    "function getMyDeposits() view returns ((uint256, uint256, uint256)[])",
    "function getWithdrawDateWithoutFee() view returns (uint256)"
  ];