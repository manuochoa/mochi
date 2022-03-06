import metamaskIcon from "../images/svg/metamask.svg";
import Goto from './../Icons/Goto';
import Copy from './../Icons/Copy';
import { useContext } from "react";
import { NotificationContext } from './../contexts/NotificationProvider';

export default function HeaderDropdown() {
    const { setNotification } = useContext(NotificationContext);

    function handleCopy() {
        window.navigator.clipboard.writeText("0x7c8d1c186506df224a4e781b9f4ac6b9fasda21");
        setNotification("Your address is copied.");
    }

    return (
        <div className="dropdown dropdown--header">
            <div className="dropdown__wrapper">
                <div className="dropdown__row">
                    <h3 className="dropdown__title">Account</h3>
                    <button className="dropdown__button">Disconnect</button>
                </div>
                <div className="dropdown__account">
                    <div className="dropdown__account-icon-wrapper">
                        <img src={metamaskIcon} className="dropdown__account-icon" alt="metamask" />
                    </div>
                    <div className="dropdown__account-column">
                        <div className="dropdown__account-row">
                            <span className="dropdown__account-address">0x7c8d1c186506...sda21</span>
                            <button className="dropdown__account-action" onClick={handleCopy}>
                                <Copy className="dropdown__account-action-icon" />
                            </button>
                            <button className="dropdown__account-action">
                                <Goto className="dropdown__account-action-icon" />
                            </button>
                        </div>
                        <div className="dropdown__account-row dropdown__account-row--wallet">Metamask</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
