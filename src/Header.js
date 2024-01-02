export default function Header({ points, total, status }) {
    return (
      <div className="header">
        <span className="points">
          Points: {points} / {total}
        </span>
        <span className={`status-${status}`}>{total > 0 ? status ? "Correct" : "Wrong" : ""}</span>
      </div>
    );
  }
  