const NumberButton = ({ number }) => {
  return (
    <div className={"number-button col col-" + (number === 0 ? 6 : 3)}>
      <button id={"btn-" + number} className="btn btn-primary" onClick="">
        {number}
      </button>
    </div>
  );
};

export default NumberButton;
