import { useRef, useState } from "react";
import Input from "../common/Input";


export default function ProposalItem({ item }) {
    const [state, setState] = useState({
        balance: "",
        staked: ""
    });

    const detailsWrapper = useRef(null);

    const [detailsHeight, setDetailsHeight] = useState(0);

    function handleInputChange(e) {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    function toggleContent() {
        let wrapperHeight = detailsWrapper.current.clientHeight;
        if (detailsHeight > 0) {
            setDetailsHeight(0);
        } else {
            setDetailsHeight(wrapperHeight);
        }
    }

    return (
        <div className="card card--proposal">
            <ul className="card__list">
                <li className="card__item">
                    <span>Proposal</span>
                    <span>{item.proposal}</span>
                </li>
                <li className="card__item">
                    <span>Days Left</span>
                    <span>{item.left}</span>
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
            <div className="card__footer">
                <button className="card__more" onClick={toggleContent}>Staking Details</button>
                <button className="button card__button">Claim Rewards</button>
            </div>
            <div className="card__details" style={{ height: detailsHeight + "px" }}>
                <ul className="card__details-list" ref={detailsWrapper}>
                    <li className="card__details-item">
                        <label htmlFor="balance" className="card__label">Balance: 345123,12 $MOCHI</label>
                        <Input value={state.balance} name="balance" onChange={handleInputChange} placeholder="Type value" id="balance" />
                    </li>
                    <li className="card__details-item">
                        <label htmlFor="staked" className="card__label">Staked: 3211.12 $MOCHI</label>
                        <Input value={state.staked} name="staked" onChange={handleInputChange} placeholder="Type value" id="staked" />
                    </li>
                </ul>
            </div>
        </div>
    )
}
