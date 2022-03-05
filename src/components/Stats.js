

const statsArray = [
    { title: "FLOOR PRICE", value: "0.166 BNB", id: 0 },
    { title: "VOLUME", value: "3183 BNB", id: 1 },
    { title: "HOLDERS", value: "2480", id: 2 }
];

export default function Stats() {
    return (
        <div className="stats">
            <ul className="cards-list cards-list--stats container">
                {statsArray.map(item => {
                    return (
                        <li className="cards-list__item" key={item.id}>
                            <div className="card card--stats">
                                <div className="card__wrapper">
                                    <h3 className="card__title">{item.title}</h3>
                                    <p className="card__value">{item.value}</p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
