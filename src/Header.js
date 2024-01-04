import { addNext, useAppContext } from "./store";

export default function Header() {
  const {
    state: { addition, total, points },
    dispatch,
  } = useAppContext();
  const status = addition[addition.length - 1].result;
  const handleNext = () => {
    dispatch(addNext());
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
