import { ethers, providers } from "ethers";
import { abi } from "./stakingAbi";

let tokenAddress = "0x99905eCb88ad09b1Cc7499222ac3E0157Ad43F1e";
let stakingAddress = "0xbd42A6912cd6eBfa07446bB96b4914096aEf1EE9";

let tokenAbi = [
  "function balanceOf(address owner) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

let provider = new ethers.providers.JsonRpcProvider(
  // "https://data-seed-prebsc-1-s1.binance.org:8545/"
  "https://data-seed-prebsc-2-s2.binance.org:8545/"
);

let tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider);
let stakingInstance = new ethers.Contract(stakingAddress, abi, provider);

// Write Functions

export const stake = async (_amount, _class, walletType, walletProvider) => {
  try {
    let instance = await stakingContractInstance(walletType, walletProvider);
    let amount = ethers.utils.parseUnits(_amount.toString(), "ether");
    console.log("stake", amount, _class, walletType);

    let tx;
    if (_class === 0) {
      tx = await instance.enterLevel0(amount);
    } else if (_class === 1) {
      tx = await instance.enterLevel1(amount);
    } else if (_class === 2) {
      tx = await instance.enterVip(amount);
    }
    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "stake");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const withdraw = async (_amount, _class, walletType, walletProvider) => {
  try {
    let instance = await stakingContractInstance(walletType, walletProvider);
    let amount = ethers.utils.parseUnits(_amount.toString(), "ether");

    let tx;
    if (_class === 0) {
      tx = await instance.withdrawLevel0(amount);
    } else if (_class === 1) {
      tx = await instance.withdrawLevel1(amount);
    } else if (_class === 2) {
      tx = await instance.withdrawVip(amount);
    }

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "withdraw");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const approveStake = async (walletType, walletProvider) => {
  try {
    let instance = await tokenContractInstance(walletType, walletProvider);

    let tx = await instance.approve(
      stakingAddress,
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    );

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error, "approveStake");
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

// View Functions

export const getDepositData = async (userAddress) => {
  try {
    let level0 = await stakingInstance.level0Balance(userAddress);
    let level1 = await stakingInstance.level1Balance(userAddress);
    let vip = await stakingInstance.vipBalance(userAddress);

    let level0Earnings = await stakingInstance.getInterest(
      userAddress,
      0,
      level0.balance
    );
    let level1Earnings = await stakingInstance.getInterest(
      userAddress,
      1,
      level1.balance
    );
    let vipEarnings = await stakingInstance.getInterest(
      userAddress,
      2,
      vip.balance
    );

    return [
      { ...level0, earnings: level0Earnings },
      { ...level1, earnings: level1Earnings },
      { ...vip, earnings: vipEarnings },
    ];
  } catch (error) {
    console.log(error, "getDepositData");
  }
};

export const checkAllowance = async (userAddress) => {
  try {
    let receipt = await tokenInstance.allowance(userAddress, stakingAddress);

    return receipt > 0;
  } catch (error) {
    console.log(error, "checkAllowance");
  }
};

export const tokenBalance = async (userAddress) => {
  try {
    let receipt = await tokenInstance.balanceOf(userAddress);

    return receipt;
  } catch (error) {
    console.log(error, "tokenBalance");
  }
};

const tokenContractInstance = async (walletType, walletProvider) => {
  if (walletType === "WALLET_CONNECT") {
    const web3Provider = new providers.Web3Provider(walletProvider);

    let signer = web3Provider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  }
};

const stakingContractInstance = async (walletType, walletProvider) => {
  if (walletType === "WALLET_CONNECT") {
    const web3Provider = new providers.Web3Provider(walletProvider);

    let signer = web3Provider.getSigner(0);

    return new ethers.Contract(stakingAddress, abi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(stakingAddress, abi, signer);
  }
};
