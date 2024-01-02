import { useState } from "react";
import Number from "./Number";
import Input from "./Input";

export default function Addition({ number1, number2, onSubmit }) {
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [d3, setD3] = useState("");
  const handleSubmit = () => {
    const numStr = `${d3}${d2}${d1}`;

    if (numStr !== "") {
      const ans = +numStr;
      onSubmit(number1 + number2 === ans);
      setD1("");
      setD2("");
      setD3("");
    }
  };
  console.log(d1, d2, d3)

  return (
    <div className="addition">
      <Number value={number1} />
      <div className="row">
        <span className="symbol">+</span>
        <Number value={number2} />
      </div>
      <hr className="divider" />
      <div className="row">
        <Input value={d3} onChange={(e) => setD3(e)} />
        <Input value={d2} onChange={(e) => setD2(e)} />
        <Input value={d1} onChange={(e) => setD1(e)} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
