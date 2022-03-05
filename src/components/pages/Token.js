import { useParams } from "react-router";
import { tokens } from './../../services/constants';
import Badge from './../common/Badge';

import cake from "../../images/svg/cake.svg";
import Quantity from './../common/Quantity';
import { useEffect, useRef, useState } from "react";
import truncate from './../../services/truncate';
import { checkForScrollbar } from "../../services/scrollbarService";

export default function Token() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(0);
    const item = tokens.find(item => item.id === Number(id));
    const [tabs, setTabs] = useState([true, false, false, false]);
    const scrollwrapper = useRef(null);
    const [scrollVisible, setScrollVisible] = useState(false);

    function changeTab(index) {
        setTabs(tabs.map((item, itemIndex) => itemIndex === index))
    }

    useEffect(() => {
        if (!scrollwrapper.current) return;
        
        setScrollVisible(checkForScrollbar(scrollwrapper.current));
    }, [tabs]);

    return (
        <div className="token container">
            <div className="token__image-wrapper">
                <img src={item.fullImage} alt={item.name} className="token__image" />
            </div>
            <div className="token__column">
                <h1 className="token__title">Floki Title</h1>
                <div className="token__row">
                    <div className="price token__price">{item.price}</div>
                    <Badge className="token__badge" item={item} />
                    <a href="/" className="token__link">
                        <img src={cake} alt="cake token" className="token__link-icon" />
                        <span>On Pancake Swap</span>
                    </a>
                </div>
                <p className="token__text">{item.desc}</p>
                <div className="token__row token__row--2">
                    <Quantity value={quantity} setValue={setQuantity} />
                    <button className="button token__button">Connect Wallet to buy</button>
                </div>
                <div className="token__tabs">
                    <div className="token__tabs-buttons">
                        <button className={"token__tabs-button" + (tabs[0] ? " active" : "")} onClick={() => changeTab(0)}>Info</button>
                        <button className={"token__tabs-button" + (tabs[1] ? " active" : "")} onClick={() => changeTab(1)}>Attributes</button>
                        <button className={"token__tabs-button" + (tabs[2] ? " active" : "")} onClick={() => changeTab(2)}>Owners</button>
                        <button className={"token__tabs-button" + (tabs[3] ? " active" : "")} onClick={() => changeTab(3)}>History</button>
                    </div>
                    <div className="token__tabs-wrapper">
                        {tabs[0] &&
                            <ul className="token__tabs-list">
                                <li className="token__tabs-item">
                                    <h6 className="token__tabs-name">Token id:</h6>
                                    <p className="token__tabs-value">{item.id}</p>
                                </li>
                                <li className="token__tabs-item">
                                    <h6 className="token__tabs-name">Rank:</h6>
                                    <p className="token__tabs-value">{item.rank}</p>
                                </li>
                                <li className="token__tabs-item">
                                    <h6 className="token__tabs-name">Listed:</h6>
                                    <p className="token__tabs-value">{item.date}</p>
                                </li>
                            </ul>
                        }
                        {tabs[1] &&
                            <ul className="token__tabs-list">
                                <li className="token__tabs-item">
                                    <h6 className="token__tabs-name">Head:</h6>
                                    <p className="token__tabs-value">{item.attributes.head}</p>
                                </li>
                                <li className="token__tabs-item">
                                    <h6 className="token__tabs-name">Eyes:</h6>
                                    <p className="token__tabs-value">{item.attributes.eyes}</p>
                                </li>
                                <li className="token__tabs-item">
                                    <h6 className="token__tabs-name">Type:</h6>
                                    <p className="token__tabs-value">{item.attributes.type}</p>
                                </li>
                            </ul>
                        }
                        {tabs[2] &&
                            <ul className="token__tabs-list">
                                {item.owners.map((owner, index) => {
                                    return (
                                        <li className="token__tabs-item" key={index}>
                                            <h6 className="token__tabs-name">Owner {index + 1}:</h6>
                                            <p className="token__tabs-value">{truncate(owner, 20)}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        }
                        {tabs[3] &&
                            <div className="table">
                                <div className="table__header">
                                    <div className="table__row">
                                        {Object.entries(item.history[0]).map(([key], index) => {
                                            return key !== "id" && (
                                                <div className={"table__text table__text--header table__column table__column--" + (index + 1)} key={index}>{key}</div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className={"scrollwrapper table__scrollwrapper" + (scrollVisible ? " scroll-visible" : "")} ref={scrollwrapper}>
                                    <div className="table__body">
                                        {item.history.map(item => {
                                            return (
                                                <div className="table__row" key={item.id}>
                                                    {Object.entries(item).map(([key, value], index) => {
                                                        if (index === 3 || index === 4) {
                                                            return (
                                                                <div className={"table__column table__column--" + (index + 1)} key={index}>
                                                                    <span className="table__text">{truncate(value, 20)}</span>
                                                                </div>
                                                            )
                                                        } else if (key !== "id") {
                                                            return (
                                                                <div className={"table__column table__column--" + (index + 1)} key={index}>
                                                                    <span className="table__text">{value}</span>
                                                                </div>
                                                            )
                                                        } else {
                                                            return null;
                                                        }
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
