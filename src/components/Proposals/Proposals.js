import { proposalsArray } from "../../services/constants";
import ProposalItem from "./ProposalItem";

export default function Proposals() {
    return (
        <ul className="cards-list cards-list--proposal">
            {proposalsArray.map(item => {
                return (
                    <li className="cards-list__item" key={item.id}>
                        <ProposalItem item={item} />
                    </li>
                );
            })}
        </ul>
    )
}
