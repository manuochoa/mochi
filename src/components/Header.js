import logo from "../images/logo.png";

export default function Header() {

    return (
        <header className="header">
            <div className="header__wrapper container">
                <a href="/" className="logo header__logo">
                    <img src={logo} className="logo__icon" alt="logo" />
                </a>
                <button className="button button--header header__button">Connect wallet</button>
            </div>
        </header>
    )
}