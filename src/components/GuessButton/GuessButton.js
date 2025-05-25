import "./GuessButton.css";

const GuessButton = ({ handleSubmit, disabled, style, text }) => {
  const buttonText = text || "Guess";
  return (
    <button
      onClick={() => handleSubmit()}
      className="guess-button"
      style={style}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default GuessButton;
