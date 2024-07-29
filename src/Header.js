import { Button, makeStyles } from "@fluentui/react-components";
import { addNext, multiplyNext, substractNext, useAppContext } from "./store";

const useStyles = makeStyles({
  next: {
    display: "flex",
    minWidth: "min-content",
    fontSize: "1.5rem",
    padding: "25px",
  },
});

export default function Header({ onNext, operation }) {
  const { state, dispatch } = useAppContext();
  const { total, points } = state;
  const stateKey = state[operation];
  const styles = useStyles();
  const status = stateKey[stateKey.length - 1].result;
  const handleNext = () => {
    onNext();
    if (operation === "addition") {
      dispatch(addNext());
    } else if (operation === "subtraction") {
      dispatch(substractNext());
    } else if (operation === "multiplication") {
      dispatch(multiplyNext());
    }
  };

  return (
    <div className="header">
      <span className="points">
        Points: {points} / {total}
      </span>
      {status !== undefined && (
        <span className={`status-${status}`}>
          {total > 0 ? (status ? "Correct" : "Wrong") : ""}
        </span>
      )}
      <Button className={styles.next} onClick={handleNext}>
        Next
      </Button>
    </div>
  );
}
