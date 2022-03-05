import React, { useState } from 'react'
import Select from '../common/Select'
import bsc from "../../images/svg/bsc.svg";
import eth from "../../images/svg/eth.svg";

import gainz from "../../images/svg/gainz.svg";
import Input from '../common/Input';
import Swap from './../../Icons/Swap';
import Arrow2 from './../../Icons/Arrow2';

const assetsInitialState = [
    { title: "$GAINZ", icon: gainz, selected: true, id: 0 },
    { title: "$GAINZ 2", icon: gainz, selected: false, id: 1 },
    { title: "$GAINZ 3", icon: gainz, selected: false, id: 3 },
    { title: "$GAINZ 4", icon: gainz, selected: false, id: 4 }
];

export default function Bridge() {
    const [bridgeState, setBridgeState] = useState({
        assets: assetsInitialState,
        quantity: ""
    });

    function selectAssets({ index }) {
        setBridgeState({ ...bridgeState, assets: bridgeState.assets.map((item, itemIndex) => ({ ...item, selected: itemIndex === index })) });
    }

    const [chains, setChains] = useState({
        tokenOut: {
            icon: bsc,
            code: "BEP20",
            title: "Binance Smart Chain"
        },
        tokenIn: {
            icon: eth,
            code: "ERC20",
            title: "Ethereum Chain Network"
        }
    });

    function swapChains() {
        const tokenOut = chains.tokenIn;
        const tokenIn = chains.tokenOut;

        setChains({ tokenIn, tokenOut });
    }

    return (
        <div className="section section--orange">
            <div className="container">
                <h1 className="title">Floki <span>bridge</span></h1>
                <div className="bridge">
                    <div className="bridge__wrapper">
                        <div className="bridge__item">
                            <label className="bridge__label">Asset</label>
                            <Select
                                list={bridgeState.assets}
                                setList={selectAssets}
                                className="select--asset"
                                CustomArrow={Arrow2}
                            />
                        </div>
                        <div className="bridge__item">
                            <div className="bridge__row">
                                <label className="bridge__label">Qty</label>
                                <label className="bridge__label">Balance: 10.000 $GAINZ</label>
                            </div>
                            <div className="bridge__row bridge__row--action">
                                <Input
                                    className="input-wrapper--bridge bridge__input-wrapper"
                                    value={bridgeState.quantity} onChange={(e) => setBridgeState({ ...bridgeState, quantity: e.target.value })}
                                    placeholder="Quantity"
                                    type="number"
                                    displayType="input"
                                />
                                <div className="bridge__amounts">
                                    <button className="bridge__amount">25%</button>
                                    <button className="bridge__amount">50%</button>
                                    <button className="bridge__amount">75%</button>
                                    <button className="bridge__amount">MAX</button>
                                </div>
                            </div>
                        </div>
                        <div className="bridge__item bridge__item--50">
                            <label className="bridge__label">From</label>
                            <div className="bridge__chain">
                                <button className="bridge__chain-button">
                                    <img src={chains.tokenOut.icon} alt={chains.tokenOut.title} className="bridge__chain-icon" />
                                    <div className="bridge__chain-code">{chains.tokenOut.code}</div>
                                    <h2 className="bridge__chain-title">{chains.tokenOut.title}</h2>
                                </button>
                                <button className="bridge__swap" onClick={swapChains}>
                                    <Swap className="bridge__swap-icon" />
                                </button>
                            </div>
                        </div>
                        <div className="bridge__item bridge__item--50">
                            <label className="bridge__label">To</label>
                            <div className="bridge__chain">
                                <button className="bridge__chain-button">
                                    <img src={chains.tokenIn.icon} alt={chains.tokenIn.title} className="bridge__chain-icon" />
                                    <div className="bridge__chain-code">{chains.tokenIn.code}</div>
                                    <h2 className="bridge__chain-title">{chains.tokenIn.title}</h2>
                                </button>
                            </div>
                        </div>
                        <button className="bridge__button button button--beige">Sign transaction</button>
                        <button className="bridge__button button button--orange">Transfer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
