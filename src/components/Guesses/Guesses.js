import Guess from "./Guess";
import "./Guesses.css";

/**
 * The component which creates Guess components.
 * @param {Object} props - The Guesses props
 * @returns {Component} - An Array of Guess components
 */
const Guesses = ({ guesses, monarch, setLoading, loading, theme }) => {
  return (
    <div>
      {guesses.length > 0 && (
        <div
          style={{
            fontStyle: "italic",
            color: "#808080",
            marginBottom: "5px",
          }}
        >
          Guesses
        </div>
      )}
      <div className="previous-guesses-container">
        {guesses.map((guess, index) => {
          return (
            <Guess
              options={{
                guessObject: guess,
                monarch: monarch,
                loading: loading,
                setLoading: setLoading,
                index: index,
                variant: "number",
              }}
              theme={theme}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Guesses;
