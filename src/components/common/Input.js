import NumberFormat from "react-number-format";

export default function Input({ className, type = "text", value, onChange, displayType = "text", placeholder, separator = true, Icon, button, ...props }) {

    return (
        <div className={"input-wrapper " + (className ? className : "")}>
            {type === "text" ?
                <input type={type} className="input-wrapper__input" value={value} onChange={onChange} placeholder={placeholder} {...props} /> :
                <NumberFormat className="input-wrapper__input" value={value} onChange={onChange} thousandSeparator={separator} displayType={displayType} allowLeadingZeros={false} allowNegative={false} placeholder={placeholder} {...props} />
            }
            {Icon && <Icon className="input-wrapper__icon" />}
            {button && <button className="input-wrapper__button" />}
        </div>
    );
}
