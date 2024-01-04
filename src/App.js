import { useEffect, useRef } from "react";
import "./App.css";
import Addition from "./Addition";
import Header from "./Header";
import { addNext, addSubmit, useAppContext } from "./store";

export default function App() {
  const {
    state: { addition },
    dispatch,
  } = useAppContext();
  const isInited = useRef(false);
  const onSubmit = (answer) => {
    dispatch(addSubmit(answer));
  };

  const { number1, number2 } = addition.length
    ? addition[addition.length - 1]
    : {};

  useEffect(() => {
    if (!isInited.current) {
      dispatch(addNext());
      isInited.current = true;
    }
  }, [dispatch, isInited]);

  if (!number1 || !number2) {
    return null;
  }

  return (
    <div className="App">
      <Header />
      <Addition number1={number1} number2={number2} onSubmit={onSubmit} />
    </div>
  );
}
