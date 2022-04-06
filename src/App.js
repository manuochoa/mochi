import { useState, useEffect } from "react";
import Header from "./components/Header";
import Panel from "./components/Panel";
import Proposals from "./components/Proposals/Proposals";
import NotificationProvider from "./contexts/NotificationProvider";
import ConnectPopup from "./components/ConnectPopup";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import {
  tokenBalance,
  checkAllowance,
  getDepositData,
  getTotalSupply,
} from "./blockchain/functions";
import { useMoralisWeb3Api } from "react-moralis";

export default function App() {
  const Web3Api = useMoralisWeb3Api();
  const [popupVisible, setPopupVisible] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [walletProvider, setWalletProvider] = useState();
  const [totalStaked = { totalStaked }, setTotalStaked] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [userInfo, setUserInfo] = useState({
    balance: "",
    isAllowed: false,
    deposits: [],
  });

  const connectMetamask = async () => {
    console.log("hola");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);
      setPopupVisible(false);

      window.localStorage.setItem("userAddress", accounts[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (chainId !== "0x4") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      }

      window.ethereum.on("accountsChanged", function (accounts) {
        setUserAddress(accounts[0]);
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletConnect = async () => {
    try {
      console.log("hola");
      const provider = new WalletConnectProvider({
        rpc: {
          4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          // 56: "https://bsc-dataseed.binance.org/",
          // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        // network: "binance",
        chainId: 4,
        infuraId: null,
      });

      await provider.enable();
      setWalletProvider(provider);
      const web3 = new Web3(provider);

      // const accounts = await ethers.listAccounts();
      const accounts = await web3.eth.getAccounts();

      setUserAddress(accounts[0]);
      setPopupVisible(false);
      setWalletType("WALLET_CONNECT");
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    if (walletType === "WALLET_CONNECT") {
      const provider = new WalletConnectProvider({
        rpc: {
          4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          // 56: "https://bsc-dataseed1.ninicoin.io/",

          // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        chainId: 4,
        infuraId: null,
      });
      await provider.disconnect();
    } else {
      window.localStorage.removeItem("userAddress");
    }

    setUserAddress("");
  };

  const getUserInfo = async () => {
    if (userAddress) {
      console.log(userAddress, "user");
      let balance = await tokenBalance(userAddress);
      let isAllowed = await checkAllowance(userAddress);
      let deposits = await getDepositData(userAddress);

      if (balance || isAllowed || deposits) {
        setUserInfo({ balance, isAllowed, deposits });
      }
    }
  };

  const getTotalStaked = async () => {
    let result = await tokenBalance(
      "0xBa9Cec669E12DeFA8741a3964F1EDaF30E8065b0"
    );
    let options = {
      address: "0x8f62795dfa0bac8f13759a241eb29e6d886a6979",
      chain: "eth",
      exchange: "uniswap-v2",
    };
    let price = await Web3Api.token.getTokenPrice(options);
    console.log(price, "price");
    setCurrentValue(price.nativePrice.value / 10 ** 18);
    let totalSupply = await getTotalSupply();
    console.log(result, "contract balance");
    setTotalStaked((result * 100) / totalSupply);
  };

  useEffect(() => {
    getUserInfo();
  }, [userAddress]);

  useEffect(() => {
    let user = window.localStorage.getItem("userAddress");
    if (user) {
      connectMetamask();
    }
    getTotalStaked();
  }, []);

  return (
    <NotificationProvider>
      <Header
        userAddress={userAddress}
        disconnectWallet={disconnectWallet}
        setPopupVisible={setPopupVisible}
      />
      <main className="main container">
        <Panel
          currentValue={currentValue}
          grandTotal={totalStaked}
          userInfo={userInfo}
        />
        <Proposals
          currentValue={currentValue}
          getTotalStaked={getTotalStaked}
          userAddress={userAddress}
          setPopupVisible={setPopupVisible}
          walletType={walletType}
          getUserInfo={getUserInfo}
          walletProvider={walletProvider}
          userInfo={userInfo}
        />
      </main>
      <ConnectPopup
        connectMetamask={connectMetamask}
        connectWalletConnect={connectWalletConnect}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
      />
    </NotificationProvider>
  );
}
