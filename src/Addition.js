import { useEffect, useState } from "react";
import Number from "./Number";
import Input from "./Input";
import { useAppContext } from "./store";

export default function Addition({ onSubmit }) {
  const { state: { addition }} = useAppContext();
  const { number1, number2, result} = addition[addition.length - 1];
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [d3, setD3] = useState("");
  const handleSubmit = () => {
    const numStr = `${d3}${d2}${d1}`;

    if (numStr !== "") {
      const ans = +numStr;
      onSubmit(ans);
      // setD1("");
      // setD2("");
      // setD3("");
    }
  };

  useEffect(() => {
    if(result === undefined) {
      setD1("");
    setD2("");
    setD3("");
    }
  }, [result]);

  return (
    <div className="addition">
      <Number value={number1} />
      <div className="row">
        <span className="symbol">+</span>
        <Number value={number2} />
      </div>
      <hr className="divider" />
      <div className="row">
        <Input value={d3} setValue={setD3} onChange={(e) => setD3(e)} />
        <Input value={d2} setValue={setD2} onChange={(e) => setD2(e)} />
        <Input value={d1} setValue={setD1} onChange={(e) => setD1(e)} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
