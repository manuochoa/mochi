import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Menu({ className }) {
    const location = useLocation();

    function checkUrl(url) {
        let current_path = location.pathname;
        return url === current_path;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <ul className={"menu " + (className ? className : "")}>
            <li className="menu__item">
                <Link to="/" className={"menu__link" + (checkUrl("/") ? " active" : "")}>Home</Link>
            </li>
            <li className="menu__item">
                <Link to="/marketplace" className={"menu__link" + (checkUrl("/marketplace") ? " active" : "")}>Marketplace</Link>
            </li>
            <li className="menu__item">
                <Link to="/collection" className={"menu__link" + (checkUrl("/collection") ? " active" : "")}>Collection</Link>
            </li>
        </ul>
    );
}