import { useEffect, useState } from "react";
import { Card, CardHeader, makeStyles } from "@fluentui/react-components";
import Addition from "./Addition";
import Header from "../../Header";
import { addNext, addSubmit, useAppContext } from "../../store";

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

export default function AdditionContainer() {
  const {
    state: { addition },
    dispatch,
  } = useAppContext();
  const [key, setKey] = useState(0);
  const styles = useStyles();
  const onSubmit = (answer) => {
    dispatch(addSubmit(answer));
  };

  const { number1, number2 } = addition.length
    ? addition[addition.length - 1]
    : {};

  useEffect(() => {
    if (!addition.length) {
      dispatch(addNext());
    }
  }, [addition.length, dispatch]);

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
        description={<Header onNext={handleNext} />}
      ></CardHeader>
      <Addition
        key={key}
        number1={number1}
        number2={number2}
        onSubmit={onSubmit}
      />
    </Card>
  );
}
