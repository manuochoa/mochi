import { useRef } from "react";

export default function Popup({
    popupShow,
    setPopupShow,
    children,
    className,
}) {
    const popup = useRef(null);

    function closePopup(e) {
        if (e.nativeEvent.target === popup.current) {
            setPopupShow(false);
        }
    }

    return (
        <div
            className={"popup " + (className || "") + (popupShow ? " opened" : "")}
            ref={popup}
            onClick={closePopup}
        >
            <div className="popup__wrapper">{children}</div>
        </div>
    );
}
