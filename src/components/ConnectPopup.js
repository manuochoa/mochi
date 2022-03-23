import { useState } from "react";
import Popup from "./common/Popup";

import metamaskIcon from "../images/svg/metamask.svg";
import wcIcon from "../images/svg/wc.svg";
import Close from "./../Icons/Close";

export default function ConnectPopup({
  connectMetamask,
  connectWalletConnect,
  popupVisible,
  setPopupVisible,
}) {
  const [checkboxes] = useState({
    metamask: false,
    walletConnect: false,
  });

  function closePopup() {
    setPopupVisible(false);
  }

  return (
    <Popup
      className="popup--connect"
      popupShow={popupVisible}
      setPopupShow={setPopupVisible}
    >
      <button className="popup__close" onClick={closePopup}>
        <Close className="popup__close-icon" />
      </button>
      <h2 className="popup__title">Connect Wallet</h2>
      <div className="popup__scrollwrapper scrollwrapper">
        <div className="popup__container">
          <h1 className="popup__text">Please select your provider</h1>
          <div className="popup__checkboxes">
            <button
              className={
                "popup__checkbox" + (checkboxes.metamask ? " active" : "")
              }
              onClick={connectMetamask}
            >
              <div className="popup__checkbox-icon-wrapper">
                <img
                  src={metamaskIcon}
                  className="popup__checkbox-icon"
                  alt="metamask"
                />
              </div>
              <span>Metamask</span>
            </button>
            <button
              className={
                "popup__checkbox" + (checkboxes.walletConnect ? " active" : "")
              }
              onClick={connectWalletConnect}
            >
              <div className="popup__checkbox-icon-wrapper">
                <img
                  src={wcIcon}
                  className="popup__checkbox-icon"
                  alt="wallet connect"
                />
              </div>
              <span>WalletConnect</span>
            </button>
          </div>
        </div>
      </div>
      {/* <button className="popup__button button button--transparent">
        Connect
      </button> */}
    </Popup>
  );
}
