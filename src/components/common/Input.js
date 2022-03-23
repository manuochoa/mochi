import NumberFormat from "react-number-format";

export default function Input({
  className,
  value,
  onChange,
  placeholder,
  name,
  id,
  max,
}) {
  const setMax = () => {
    let e = {
      target: {
        name: name,
        value: max,
      },
    };

    console.log(e, "max");

    onChange(e);
  };
  return (
    <div className={"input-wrapper " + (className ? className : "")}>
      <NumberFormat
        className="input-wrapper__input"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        // thousandSeparator={true}
        allowLeadingZeros={false}
        allowNegative={false}
        placeholder={placeholder}
        id={id}
      />
      <button onClick={setMax} className="input-wrapper__max">
        MAX
      </button>
      {/* <button className="input-wrapper__button">{id}</button> */}
    </div>
  );
}
