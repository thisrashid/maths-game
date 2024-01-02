import { useState } from "react";

export default function Input({ value, onChange }) {
    const [digit, setDigit] = useState(value);
  const changeHandler = (e) => {
    const num = String(e.target.value);

    if(num.length === 0 || (num.length === 1 && num.match(/^[\d]+$/))) {
        setDigit(num);
        onChange(num);
    }
  }

  return (
        <input
          className="input"
          maxLength={1}
          value={digit}
          onChange={changeHandler}
        />
  );
}
