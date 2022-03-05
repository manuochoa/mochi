import Twitter from './../../Icons/Twitter';
import Telegram from './../../Icons/Telegram';

export default function Social({ className }) {
    return (
        <ul className={"social " + (className ? className : "")}>
            <li className="social__item">
                <a href="/" className="social__link">
                    <Twitter className="social__icon" />
                </a>
            </li>
            <li className="social__item">
                <a href="/" className="social__link">
                    <Telegram className="social__icon" />
                </a>
            </li>
        </ul>
    )
}
