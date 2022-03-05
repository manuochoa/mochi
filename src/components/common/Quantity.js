import NumberFormat from "react-number-format";

export default function Quantity({ value, setValue, className }) {

    function dercrease() {
        setValue(state => {
            if (state === 1) {
                return 1;
            } else {
                return state - 1;
            }
        })
    }

    function handleChange({ value }) {
        if ((value < 1) || (value.includes("."))) {
            setValue(1)
        } else {
            setValue(value);
        }
    }

    return (
        <div className={"quantity " + (className ? className : "")}>
            <button className="quantity__button quantity__button--1" onClick={dercrease}></button>
            <NumberFormat className="quantity__value" value={value} allowLeadingZeros={false} allowNegative={false} onValueChange={handleChange} />
            <button className="quantity__button quantity__button--2" onClick={() => setValue(++value)}></button>
        </div>
    )
}
