
import useSmallScreen from './../hooks/useSmallScreen';

export default function Panel() {
    const mobileScreen = useSmallScreen(768);
    const smallScreen = useSmallScreen(480);

    return (
        <div className="panel">
            {mobileScreen ?
                <ul className="panel__list">
                    <li className="panel__item">
                        <h6 className="panel__title">Staking Balance</h6>
                        <h1 className="panel__value">13211.44 {!smallScreen && "$MOCHI"}</h1>
                    </li>
                    <li className="panel__item">
                        <h6 className="panel__title">Total Earnings</h6>
                        <h1 className="panel__value">+4211.44 {!smallScreen && "$MOCHI"}</h1>
                    </li>
                    <li className="panel__item">
                        <h6 className="panel__title">Available Rewards</h6>
                        <h1 className="panel__value">311.44 {!smallScreen && "$MOCHI"}</h1>
                        <div className="panel__buttons">
                            <button className="button button--blue panel__button">Claim Rewards</button>
                            <button className="button button--transparent panel__button">Unstake</button>
                        </div>
                    </li>
                </ul> :
                <>
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
                </>
            }
        </div>
    )
}
