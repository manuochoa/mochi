// import { proposalsArray } from "../../services/constants";
import { useState, useEffect } from "react";
import ProposalItem from "./ProposalItem";
import { ethers } from "ethers";

const initialArray = [
  {
    proposal: "1 Week",
    left: "0",
    apr: "27.00%",
    staked: "0",
    earnings: "0",
    id: 0,
  },
  {
    proposal: "1 Month",
    left: "0",
    apr: "37.00%",
    staked: "0",
    earnings: "0",
    id: 1,
  },
  {
    proposal: "3 Month",
    left: "0",
    apr: "48.00%",
    staked: "0",
    earnings: "0",
    id: 2,
  },
];

export default function Proposals({
  walletType,
  getUserInfo,
  walletProvider,
  userInfo,
  userAddress,
  setPopupVisible,
  getTotalStaked,
}) {
  const [proposalsArray, setProposalsArray] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const updateArray = () => {
    let temp = initialArray;
    console.log(userInfo, "info");
    userInfo.deposits.map((el, index) => {
      let timeLeft;
      console.log(Number(el.timeFinish), "time");
      if (Number(el.timeFinish) === 0) {
        timeLeft = 0;
      } else {
        timeLeft = el.timeFinish * 1000 - Date.now();
      }
      temp[index].left = timeLeft;
      temp[index].staked = ethers.utils.formatEther(el.balance, 18).toString();
      temp[index].earnings = Number(el.earnings / 10 ** 18).toString();
      temp[index].hola = Number(el.earnings / 10 ** 18).toString();
    });

    // setProposalsArray(temp);
    setProposalsArray([...temp]);
    console.log(temp, "temp");
  };

  useEffect(() => {
    if (userInfo.deposits && userInfo.deposits.length > 0 && !isLoading) {
      updateArray();
    }
  }, [userInfo]);

  return (
    <ul className="cards-list cards-list--proposal">
      {proposalsArray
        ? proposalsArray.map((item) => {
            return (
              <li className="cards-list__item" key={item.id}>
                <ProposalItem
                  getTotalStaked={getTotalStaked}
                  userAddress={userAddress}
                  setPopupVisible={setPopupVisible}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  walletType={walletType}
                  walletProvider={walletProvider}
                  getUserInfo={getUserInfo}
                  approved={userInfo.isAllowed}
                  balance={Number(userInfo.balance / 10 ** 18).toString()}
                  item={item}
                />
              </li>
            );
          })
        : initialArray.map((item) => {
            return (
              <li className="cards-list__item" key={item.id}>
                <ProposalItem
                  getTotalStaked={getTotalStaked}
                  userAddress={userAddress}
                  setPopupVisible={setPopupVisible}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  walletType={walletType}
                  walletProvider={walletProvider}
                  getUserInfo={getUserInfo}
                  approved={userInfo.isAllowed}
                  balance={Number(userInfo.balance / 10 ** 18).toString()}
                  item={item}
                />
              </li>
            );
          })}
    </ul>
  );
}
