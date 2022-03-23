import logo from "../images/logo.png";
import HeaderDropdown from "./HeaderDropdown";
import metamaskIcon from "../images/svg/metamask.svg";
import Arrow2 from "./../Icons/Arrow2";
import truncate from "./../services/truncate";
import useSmallScreen from "./../hooks/useSmallScreen";

export default function Header({
  userAddress,
  disconnectWallet,
  setPopupVisible,
}) {
  const smallScreen = useSmallScreen(620);

  return (
    <header className="header">
      <div className="header__wrapper container">
        <a href="/" className="logo header__logo">
          <img src={logo} className="logo__icon" alt="logo" />
        </a>
        <button
          className="button button--header header__button"
          onClick={userAddress ? disconnectWallet : () => setPopupVisible(true)}
        >
          {userAddress
            ? `${userAddress.slice(0, 6)}...${userAddress.slice(-6)}`
            : "Connect wallet"}
        </button>
        <div className="header__account" style={{ display: "none" }}>
          <button className="header__account-button">
            <span className="header__account-button-icon-wrapper">
              <img
                src={metamaskIcon}
                className="header__account-button-icon"
                alt="metamask"
              />
            </span>
            <span>
              {truncate(
                "0x5Ad38C57fba63189641aB5E024646684fAdBee75",
                smallScreen ? 20 : 25
              )}
            </span>
            <Arrow2 className="header__account-button-arrow" />
          </button>
          <HeaderDropdown />
        </div>
      </div>
    </header>
  );
}
