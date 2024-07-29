import { useEffect, useState } from "react";
import { Card, CardHeader, makeStyles } from "@fluentui/react-components";
import Header from "../../Header";
import {
  addNext,
  addSubmit,
  multiplySubmit,
  substractSubmit,
  useAppContext,
} from "../../store";
import Operation from "./Operation";

const useStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: "100%",
    height: "fit-content",
    alignItems: "center",
  },
  cardHeader: {
    width: "100%",
  },
});

export default function OperationContainer({ symbol, operation }) {
  const { state, dispatch } = useAppContext();
  const stateKey = state[operation];
  const [key, setKey] = useState(0);
  const styles = useStyles();
  const onSubmit = (answer) => {
    if (operation === "addition") {
      dispatch(addSubmit(answer));
    } else if (operation === "subtraction") {
      dispatch(substractSubmit(answer));
    } else if (operation === "multiplication") {
      dispatch(multiplySubmit(answer));
    }
  };

  const { number1, number2 } = stateKey.length
    ? stateKey[stateKey.length - 1]
    : {};

  useEffect(() => {
    if (!stateKey.length) {
      dispatch(addNext());
    }
  }, [stateKey.length, dispatch]);

  if (!number1 || !number2) {
    return null;
  }

  const handleNext = () => {
    setKey((key) => key + 1);
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        description={<Header onNext={handleNext} operation={operation} />}
      ></CardHeader>
      <Operation
        key={key}
        number1={number1}
        number2={number2}
        symbol={symbol}
        operation={operation}
        onSubmit={onSubmit}
      />
    </Card>
  );
}
