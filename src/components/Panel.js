import useSmallScreen from "./../hooks/useSmallScreen";
import { useState, useEffect } from "react";
import { stake } from "../blockchain/functions";

export default function Panel({ grandTotal, userInfo, currentValue }) {
  const mobileScreen = useSmallScreen(768);
  const smallScreen = useSmallScreen(480);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);

  useEffect(() => {
    if (userInfo.deposits && userInfo.deposits.length) {
      let earned = 0;
      let staked = 0;
      userInfo.deposits.map((el) => {
        staked += Number(el.balance / 10 ** 18);
        earned += Number(el.earnings / 10 ** 18);
      });

      setTotalStaked(staked);
      setTotalEarned(earned);
    }
  }, [userInfo]);

  return (
    <div className="panel">
      {mobileScreen ? (
        <ul className="panel__list">
          <li className="panel__item">
            <h6 className="panel__title">Balance</h6>
            <h1 className="panel__value">
              {Number(userInfo.balance / 10 ** 18).toString()}{" "}
              {smallScreen && "$MOCHI"}
            </h1>
          </li>
          <li className="panel__item">
            <h6 className="panel__title">My Earnings</h6>
            <h1 className="panel__value">
              {(totalEarned * currentValue).toFixed(8)} ETH
              {!smallScreen && "$MOCHI"}
            </h1>
          </li>
          <li className="panel__item">
            <h6 className="panel__title">My Staked Tokens</h6>
            <h1 className="panel__value">
              {totalStaked.toFixed(2)} {!smallScreen && "$MOCHI"}
            </h1>
          </li>
          <li className="panel__item">
            <h6 className="panel__title">Total Staked</h6>
            <h1 className="panel__value">
              {Number(grandTotal).toFixed(2)} %{!smallScreen && "$MOCHI"}
            </h1>
          </li>
        </ul>
      ) : (
        <>
          <ul className="panel__list">
            <li className="panel__item">
              <h6 className="panel__title">Balance</h6>
              <h1 className="panel__value">
                {Number(userInfo.balance / 10 ** 18).toString()} $MOCHI
              </h1>
            </li>
            <li className="panel__item">
              <h6 className="panel__title">My Earnings</h6>
              <h1 className="panel__value">
                {(totalEarned * currentValue).toFixed(8)} ETH
              </h1>
            </li>
            <li className="panel__item">
              <h6 className="panel__title">My Staked Tokens</h6>
              <h1 className="panel__value">{totalStaked.toFixed(2)} $MOCHI</h1>
            </li>
            <li className="panel__item">
              <h6 className="panel__title">Total Staked</h6>
              <h1 className="panel__value">
                {Number(grandTotal).toFixed(2)} %
              </h1>
            </li>
          </ul>
          {/* <button className="button button--blue panel__button">Claim Rewards</button>
                    <button className="button button--transparent panel__button">Unstake</button> */}
        </>
      )}
    </div>
  );
}
