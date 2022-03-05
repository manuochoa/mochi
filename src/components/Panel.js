

export default function Panel() {
    return (
        <div className="panel">
            <ul className="panel__list">
                <li className="panel__item">
                    <h6 className="panel__title">Staking Balance</h6>
                    <h1 className="panel__value">13211.44 $MOCHI</h1>
                </li>
                <li className="panel__item">
                    <h6 className="panel__title">Total Earnings</h6>
                    <h1 className="panel__value">+4211.44 $MOCHI</h1>
                </li>
                <li className="panel__item">
                    <h6 className="panel__title">Available Rewards</h6>
                    <h1 className="panel__value">311.44 $MOCHI</h1>
                </li>
            </ul>
            <button className="button button--blue panel__button">Claim Rewards</button>
            <button className="button button--transparent panel__button">Unstake</button>
        </div>
    )
}
