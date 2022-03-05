import NumberFormat from "react-number-format";

export default function Input({ className, value, onChange, placeholder, name, id }) {

    return (
        <div className={"input-wrapper " + (className ? className : "")}>
            <NumberFormat className="input-wrapper__input" type="text" name={name} value={value} onChange={onChange} thousandSeparator={true} allowLeadingZeros={false} allowNegative={false} placeholder={placeholder} id={id} />
            <button className="input-wrapper__max">MAX</button>
            <button className="input-wrapper__button">Approve</button>
        </div>
    );
}
