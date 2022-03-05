import React, { useEffect, useRef, useState } from 'react';
import Arrow from '../../Icons/Arrow';
import { checkForScrollbar } from "../../services/scrollbarService";

export default function Select({ className, list, setList, callback, Icon, CustomArrow, name }) {
    const [opened, setOpened] = useState(false);
    let selected = list.find(item => item.selected === true);
    const [scrollvisible, setScrollvisible] = useState(false);
    const scrollwrapper = useRef(null);

    function selectItem(index) {
        setList({ name, index });
        callback && callback(index);
    }

    function toggleSelect() {
        setOpened(state => !state);
    }

    useEffect(() => {
        function handleDocumentClick() {
            if (opened) {
                toggleSelect();
            }
        };

        setScrollvisible(checkForScrollbar(scrollwrapper.current));

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    }, [opened]);

    return (
        <div className={"select " + (className || "") + (opened ? " opened" : "") + (scrollvisible ? " scroll-visible" : "")}>
            <button className="select__button" onClick={toggleSelect}>
                {Icon && <Icon className="select__button-icon" />}
                {selected.icon && <img src={selected.icon} className="select__button-icon" alt={selected.title} />}
                <span className="select__button-text">{selected.title}</span>
                {CustomArrow ? <CustomArrow className="select__button-arrow" /> : <Arrow className="select__button-arrow" />}
            </button>
            <div className="select__list-wrapper">
                <ul className="select__list scrollwrapper select__scrollwrapper" ref={scrollwrapper}>
                    {list.map((item, index) => {
                        return (
                            <li className="select__item" key={item.id}>
                                <button
                                    className={"select__item-button" + (item.selected ? " selected" : "")}
                                    onClick={() => {
                                        selectItem(index);
                                    }}
                                >
                                    {item.icon && <img src={item.icon} className="select__item-icon" alt={item.title} />}
                                    <span>{item.title}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}