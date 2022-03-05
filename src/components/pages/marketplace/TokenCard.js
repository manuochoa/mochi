import { Link } from 'react-router-dom';
import Badge from './../../common/Badge';

export default function TokenCard({ item }) {
    return (
        <Link to={"/marketplace/" + item.id} className="card card--token">
            <div className="card__image-wrapper">
                <Badge item={item} className="card__badge" />
                <img src={item.image} alt={item.name} className="card__image" />
            </div>
            <div className="card__row card__row--top">
                <h2 className="card__title">{item.title}</h2>
                <div className="price card__price">{item.price}</div>
            </div>
            <div className="card__text">
                <span>Token id:</span>
                &nbsp;
                <strong>{item.id}</strong>
            </div>
            <div className="card__row card__row--footer">
                <span className="card__text">Listed {item.date}</span>
                <span className="card__text">Rank {item.rank}</span>
            </div>
        </Link>
    )
}
