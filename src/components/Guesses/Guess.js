import "./Guess.css";
import YearsOff from "../YearsOff";
import { CorrectnessWrapper, Badge } from "../common";
import React from "react";

const bool = (isCorrect, isLoading) => {
  if (isLoading) {
    return undefined;
  }

  return isCorrect ? "Correct" : "Incorrect";
};

/**
 * Represents a single guess component, used by the guesses component.
 * @param {Object} props - The props to pass
 * - options - Various options
 * @returns {Component} - The Guess component
 */
const Guess = ({ options, theme }) => {
  const isCorrect = options.guessObject.correct;
  const isLoading = options.loading[options.index];
  const hint = options.guessObject.hint;
  const reignStarted = options.guessObject.guessedMonarch.reignStarted;
  const reignEnded = options.guessObject.guessedMonarch.reignStarted;

  let variant;
  switch (options.variant) {
    case "number":
      variant = (
        <YearsOff
          from={options.guessObject.guessedMonarch.reignStarted}
          to={options.monarch.reignStarted}
          setLoading={options.setLoading}
          index={options.index}
        />
      );
      break;
    case "bool":
      variant = bool(isCorrect, isLoading);
    default:
  }

  return (
    <div className={"previous-guess"} style={{ background: theme.secondary }}>
      <div className={"first-hint"}>
        {options.guessObject.value} - r.{reignStarted} - {reignEnded}
      </div>
      {/* <HintComponent isCorrect={isCorrect} isLoading={isLoading} hint={hint} /> */}
      <div className={"second-hint"}>
        <CorrectnessWrapper isCorrect={isCorrect} isLoading={isLoading}>
          <Badge>{variant}</Badge>
        </CorrectnessWrapper>
      </div>
    </div>
  );
};

export default Guess;
