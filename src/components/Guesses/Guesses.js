import Guess from "./Guess";

/**
 * The component which creates Guess components.
 * @param {Object} props - The Guesses props
 * @returns {Component} - An Array of Guess components
 */
const Guesses = ({ guesses, monarch, setLoading, loading, theme }) => {
  return guesses.map((guess, index) => {
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
  });
};

export default Guesses;
