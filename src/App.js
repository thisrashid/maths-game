import { useState } from "react";
import "./App.css";
import Addition from "./Addition";
import Header from "./Header";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getNumber() {
  return getRandomInt(10, 99);
}

export default function App() {
  const [points, setPoints] = useState(0);
  const [total, setTotal] = useState(0);
  const [number1, setNumber1] = useState(() => getNumber());
  const [number2, setNumber2] = useState(() => getNumber());
  const [status, setStatus] = useState(true);
  const onSubmit = (result) => {
    setTotal((prev) => prev + 1);
    setPoints((prev) => (result ? prev + 1 : prev));
    setNumber1(getNumber());
    setNumber2(getNumber());
    setStatus(result);
  };

  return (
    <div className="App">
      <Header points={points} total={total} status={status}/>
      <Addition number1={number1} number2={number2} onSubmit={onSubmit} />
    </div>
  );
}
