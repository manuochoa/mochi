import { useRef, useState } from "react";
import Input from "../common/Input";
import { stake, withdraw, approveStake } from "../../blockchain/functions";

export default function ProposalItem({
  walletProvider,
  walletType,
  getUserInfo,
  approved,
  item,
  balance,
  isLoading,
  setIsLoading,
  userAddress,
  setPopupVisible,
  getTotalStaked,
}) {
  const [state, setState] = useState({
    balance: "",
    staked: "",
  });

  const timeLeft = () => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let hours = Math.floor((item.left % day) / hour).toLocaleString(undefined, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    let days = Math.floor(item.left / day);
    let minutes = Math.floor((item.left % hour) / minute).toLocaleString(
      undefined,
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );

    console.log(hours, minutes, minutes === "00");

    if (days === 0 && hours === "00" && minutes === "00") {
      return `-`;
    } else if (days < 0 && Number(hours) < 0 && Number(minutes) < 0) {
      return `Ready`;
    } else if (days <= 0) {
      return `${hours > 0 ? hours : "0"} Hours, ${minutes} Minutes`;
    }

    return `${days} Days, ${hours} Hours`;
  };

  const detailsWrapper = useRef(null);

  const [detailsHeight, setDetailsHeight] = useState(0);

  function handleInputChange(e) {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  }

  function toggleContent() {
    let wrapperHeight = detailsWrapper.current.clientHeight;
    if (detailsHeight > 0) {
      setDetailsHeight(0);
    } else {
      setDetailsHeight(wrapperHeight);
    }
  }

  const handleStake = async () => {
    setIsLoading(true);
    if (Number(state.balance) <= 0) {
      setIsLoading(false);
      return window.alert("Insert a valid amount");
    }
    let receipt = await stake(
      state.balance,
      item.id,
      walletType,
      walletProvider
    );

    if (receipt) {
      console.log(receipt);
      getUserInfo();
      getTotalStaked();
    }
    setIsLoading(false);
  };

  const handleWithdraw = async () => {
    setIsLoading(true);
    if (Number(state.staked) <= 0) {
      setIsLoading(false);
      return window.alert("Insert a valid amount");
    }
    if (Number(item.left) > 0) {
      window.alert(
        "Withdraw not ready yet, you will NOT receive rewards if you proceed"
      );
    }
    let receipt = await withdraw(
      state.staked,
      item.id,
      walletType,
      walletProvider
    );

    if (receipt) {
      console.log(receipt);
      getUserInfo();
      getTotalStaked();
    }
    setIsLoading(false);
  };

  const handleApprove = async () => {
    setIsLoading(true);
    let receipt = await approveStake(walletType, walletProvider);

    if (receipt) {
      console.log(receipt);
      getUserInfo();
    }
    setIsLoading(false);
  };

  return (
    <div className="card card--proposal">
      <ul className="card__list">
        <li className="card__item">
          <span>Proposal</span>
          <span>{item.proposal}</span>
        </li>
        <li className="card__item">
          <span>Days Left</span>
          <span>{timeLeft()}</span>
        </li>
        <li className="card__item">
          <span>APR</span>
          <span>{item.apr}</span>
        </li>
        <li className="card__item">
          <span>Staked</span>
          <span>{item.staked}</span>
        </li>
        <li className="card__item">
          <span>Earnings</span>
          <span>{item.earnings}</span>
        </li>
      </ul>
      {item.staked > 0 ? (
        <div className="card__footer">
          <h4 className="card__label">Staked: {item.staked} $MOCHI</h4>

          <Input
            max={item.staked}
            value={state.staked}
            name="staked"
            onChange={handleInputChange}
            placeholder="Type value"
            id={approved ? "Deposit" : "Approve"}
          />

          <button
            disabled={isLoading}
            onClick={handleWithdraw}
            className="button card__button"
          >
            Withdraw
          </button>
        </div>
      ) : (
        <div className="card__footer">
          <h4 className="card__label">Balance: {balance} $MOCHI</h4>

          <Input
            max={balance}
            value={state.balance}
            name="balance"
            onChange={handleInputChange}
            placeholder="Type value"
            id={approved ? "Deposit" : "Approve"}
          />

          <button
            onClick={
              !userAddress
                ? () => setPopupVisible(true)
                : approved
                ? handleStake
                : handleApprove
            }
            className="button card__button"
            disabled={isLoading}
          >
            {approved ? "Deposit" : "Approve"}
          </button>
        </div>
      )}

      {/* <div className="card__details" style={{ height: detailsHeight + "px" }}>
        <ul className="card__details-list" ref={detailsWrapper}>
          <li className="card__details-item">
            <label htmlFor="balance" className="card__label">
              Balance: {balance} $MOCHI
            </label>
            <Input
              value={state.balance}
              name="balance"
              onChange={handleInputChange}
              placeholder="Type value"
              id={approved ? "Deposit" : "Approve"}
            />
          </li>
          <li className="card__details-item">
            <label htmlFor="staked" className="card__label">
              Staked: {item.staked} $MOCHI
            </label>
            <Input
              value={state.staked}
              name="staked"
              onChange={handleInputChange}
              placeholder="Type value"
              id="Withdraw"
            />
          </li>
        </ul>
      </div> */}
    </div>
  );
}
