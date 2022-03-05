import Stats from '../../Stats';
import Input from '../../common/Input';
import { useState } from 'react';
import Select from '../../common/Select';
import Sidebar from './Sidebar';

import TokenCard from './TokenCard';
import { tokens } from './../../../services/constants';
import Filters from './../../../Icons/Filters';
import { useEffect } from 'react';

const sortArray = [
    { title: "Newest", selected: true, id: 0 },
    { title: "Oldest", selected: false, id: 1 }
];

const filtersInitialState = {
    price: 0,
    background: [
        { title: "All", selected: true, id: 0 },
        { title: "Variant 1", selected: false, id: 1 },
        { title: "Variant 2", selected: false, id: 2 }
    ],
    floki: [
        { title: "All", selected: true, id: 0 },
        { title: "Variant 1", selected: false, id: 1 },
        { title: "Variant 2", selected: false, id: 2 }
    ],
    rarity: [
        { title: "All", selected: true, id: 0 },
        { title: "Variant 1", selected: false, id: 1 },
        { title: "Variant 2", selected: false, id: 2 }
    ],
    head: [
        { title: "All", selected: true, id: 0 },
        { title: "Variant 1", selected: false, id: 1 },
        { title: "Variant 2", selected: false, id: 2 }
    ],
    eyes: [
        { title: "All", selected: true, id: 0 },
        { title: "Variant 1", selected: false, id: 1 },
        { title: "Variant 2", selected: false, id: 2 }
    ],
    wristband: [
        { title: "All", selected: true, id: 0 },
        { title: "Variant 1", selected: false, id: 1 },
        { title: "Variant 2", selected: false, id: 2 }
    ],
    mouth: [
        { title: "All", selected: true, id: 0 },
        { title: "Variant 1", selected: false, id: 1 },
        { title: "Variant 2", selected: false, id: 2 }
    ]
};

export default function Marketplace() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({
        date: sortArray,
        type: [true, false, false]
    });
    const [filters, setFilters] = useState(filtersInitialState);
    const [filtersVisible, setFiltersVisible] = useState(false);

    function resetFilters() {
        setFilters(filtersInitialState);
    }

    function setList({ name, index }) {
        setFilters(state => ({ ...state, [name]: state[name].map((item, itemIndex) => ({ ...item, selected: itemIndex === index ? true : false })) }));
    }

    function selectSortType(index) {
        setSort(state => ({ ...state, type: state.type.map((item, itemIndex) => index === itemIndex ? true : false) }))
    }

    useEffect(() => {
        if (filtersVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = null;
        }
    }, [filtersVisible]);

    return (
        <div className="marketplace">
            <Stats />
            <div className="marketplace__wrapper container">
                <div className="marketplace__header">
                    <Input className="input-wrapper--search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type your keywords" button={true} />
                    <div className="marketplace__columns marketplace__columns--header">
                        <div className="marketplace__column marketplace__column--1">
                            <Select
                                list={sort.date}
                                setList={({ index }) => setSort(state => ({ ...state, date: state.date.map((item, itemIndex) => ({ ...item, selected: itemIndex === index ? true : false })) }))}
                                className="select--sort"
                            />
                            <button className="marketplace__filters" onClick={() => setFiltersVisible(true)}>
                                <Filters className="marketplace__filters-icon" />
                            </button>
                        </div>
                        <div className="marketplace__column marketplace__column--2">
                            <h6 className="marketplace__header-title">128 Results</h6>
                            <div className="marketplace__header-buttons">
                                <button className={"marketplace__header-button" + (sort.type[0] ? " active" : "")} onClick={() => selectSortType(0)}>For Sale</button>
                                <button className={"marketplace__header-button" + (sort.type[1] ? " active" : "")} onClick={() => selectSortType(1)}>Trades</button>
                                <button className={"marketplace__header-button" + (sort.type[2] ? " active" : "")} onClick={() => selectSortType(2)}>All Tokens</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="marketplace__columns">
                    <Sidebar filtersVisible={filtersVisible} filters={filters} setFilters={setFilters} resetFilters={resetFilters} setList={setList} setFiltersVisible={setFiltersVisible} />
                    <ul className="marketplace__column marketplace__column--2 cards-list cards-list--marketplace">
                        {tokens.map(item => {
                            return (
                                <li className="cards-list__item" key={item.id}>
                                    <TokenCard item={item} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
