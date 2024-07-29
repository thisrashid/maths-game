import { useState } from "react";
import Number from "../../Number";
import Input from "../../Input";
import { useAppContext } from "../../store";
import { Button, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  addition: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "300px",
  },

  button: {
    fontSize: "32px",
    padding: "16px",
    margin: "40px 8px 8px 8px",
    width: "100%",
    backgroundColor: "green",
    color: "white",
    fontWeight: "bolder",

    "&:hover": {
      backgroundColor: "greenyellow",
      cursor: "pointer",
    },
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  symbol: {
    fontSize: "72px",
  },
  divider: {
    width: "100%",
    height: "5px",
    backgroundColor: "black",
  },
});

export default function Addition({ onSubmit }) {
  const {
    state: { addition },
  } = useAppContext();
  const styles = useStyles();
  const { number1, number2 } = addition[addition.length - 1];
  const digitsCount = Math.max(
    number1.toString().length,
    number2.toString().length
  );
  const [digits, setDigit] = useState(
    Array.from({ length: digitsCount + 1 }, () => "")
  );

  const handleSubmit = () => {
    const numStr = digits.reduce((acc, cur) => `${acc}${cur}`);

    if (numStr !== "") {
      const ans = +numStr;
      onSubmit(ans);
    }
  };

  return (
    <div className={styles.addition}>
      <Number value={number1} />
      <div className={styles.row}>
        <span className={styles.symbol}>+</span>
        <Number value={number2} />
      </div>
      <hr className={styles.divider} />
      <div className={styles.row}>
        {digits.map((digit, index) => (
          <Input
            key={index}
            value={digit}
            setValue={(e) =>
              setDigit([
                ...digits.slice(0, index),
                e,
                ...digits.slice(index + 1),
              ])
            }
            onChange={(e) =>
              setDigit([
                ...digits.slice(0, index),
                e,
                ...digits.slice(index + 1),
              ])
            }
          />
        ))}
      </div>
      <Button className={styles.button} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
