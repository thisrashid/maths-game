export default function Number({ value }) {
    const str = value.toString().split("");
  
    return (
      <div className="number">
        {str.map((digit, index) => (
          <span className="digit" key={index}>
            {digit}
          </span>
        ))}
      </div>
    );
  }
  