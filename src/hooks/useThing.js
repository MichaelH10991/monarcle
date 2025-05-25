import { useState } from "react";
import config from "../config";

const DEFAULT_MAX_GUESSES = 5;

const useThing = () => {
  const [guessesLeft, setGuessesLeft] = useState(
    config.maxGuesses || DEFAULT_MAX_GUESSES
  );

  const [isCorrect, setIsCorrect] = useState(false);

  return [guessesLeft, setGuessesLeft, isCorrect, setIsCorrect];
};

const DEFAULT_SEARCH_TEXT = "";

const useSearchText = () => {
  const [searchText, setSearchText] = useState(DEFAULT_SEARCH_TEXT);
  // return {
  //   init: () => {},
  // };
  return searchText;
};

export { useThing, useSearchText };
