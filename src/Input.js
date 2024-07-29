// import { useState } from "react";

export default function Input({ value, onChange, setValue }) {
  const changeHandler = (e) => {
    const num = String(e.target.value);

    if (num.length === 0 || (num.length === 1 && num.match(/^[\d]+$/))) {
      setValue(num);
      onChange(num);
    }
  };

  return (
    <input
      className="input"
      maxLength={1}
      value={value}
      onChange={changeHandler}
    />
  );
}
