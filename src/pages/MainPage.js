import { DropDown, YearsOff, DropDownV1 } from "../components";

import { useEffect, useState } from "react";
import "./styles/MainPage.css";

import { DateTime } from "luxon";

import data from "../data.json";

const randomNumber = (high, low) => Math.random() * (high - low) + low;

const getHintAndRemove = (hints) => {};

const getElementCyclic = (data) => {
  const index = DateTime.now().ordinal % data.length;
  return data[index];
};

const getMonarch = (monarchs) => {
  return getElementCyclic(monarchs);
};

const findMonarch = (monarchs, name) => {
  return monarchs.find((monarch) => monarch.name === name);
};

const Feedback = ({ isCorrect, text }) => {
  if (!text) {
    return undefined;
  }

  const className = isCorrect ? "positive-feedback" : "negative-feedback";

  return <div className={className}>{text}</div>;
};

const Correct = ({ value, monarch, loading, setLoading, index }) => {
  return (
    <div className={`previous-guess ${!loading[index] && "correct"}`}>
      <div style={{ whiteSpace: "nowrap" }}>{value}</div>
      <div>
        <YearsOff
          guess={findMonarch(data, value).reignStarted}
          answer={monarch.reignStarted}
          setLoading={setLoading}
          index={index}
        />
      </div>
    </div>
  );
};

const Incorrect = ({ value, monarch, loading, setLoading, hint, index }) => {
  return (
    <div className={`previous-guess ${!loading[index] && "incorrect"}`}>
      <div style={{ whiteSpace: "nowrap" }}>{value}</div>
      <div>{!loading[index] && hint}</div>
      <div>
        <YearsOff
          guess={findMonarch(data, value).reignStarted}
          answer={monarch.reignStarted}
          setLoading={setLoading}
          index={index}
        />
      </div>
    </div>
  );
};

const PreviousGuesses = ({ guesses, monarch, setLoading, loading }) => {
  return guesses.map((guess, index) => {
    return (
      <div>
        {guess.correct ? (
          <Correct
            value={guess.value}
            monarch={monarch}
            loading={loading}
            setLoading={setLoading}
            index={index}
          />
        ) : (
          <Incorrect
            value={guess.value}
            monarch={monarch}
            loading={loading}
            setLoading={setLoading}
            hint={guess.hint}
            index={index}
          />
        )}
      </div>
    );
  });
};

const getHint = (monarch, guessCount) => {
  console.log(guessCount);
  return monarch.hints && monarch.hints[guessCount];
};

const MAX_GUESSES = 5;

const MainPage = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(MAX_GUESSES);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState({});
  const [hintDialogOpen, setHintDialogOpen] = useState(false);

  const names = data.map((monarch) => monarch.name);

  const monarch = getMonarch(data);

  // const handleFocusLeave = () => {
  //   console.log("focus leave");
  //   setDropDownOpen(false);
  // };

  const showHint = () => {
    setHintDialogOpen(true);
  };

  const handleTextInput = (value) => {
    setSearchText(value);
  };

  const handleSubmit = (value) => {
    setLoading((loadingStates) => ({ ...loadingStates, [guessCount]: true }));
    setGuessCount((curCount) => curCount + 1);

    if (!value) {
      setLoading((loadingStates) => ({
        ...loadingStates,
        [guessCount]: false,
      }));
      return;
    }

    const correct = value.toLowerCase() === monarch.name.toLocaleLowerCase();

    setGuesses((guesses) => [
      ...guesses,
      {
        value,
        correct,
        hint: getHint(monarch, guessCount),
      },
    ]);
    setIsCorrect(correct);
    setGuessesLeft(guessesLeft - 1);
    setFeedbackText(correct ? `It's ${monarch.name}!` : "Not quite...");
    setSearchText("");
  };

  return (
    <div className="main-page-container">
      <div className="content-container">
        <div className="header">
          <div>monarcle.io</div>
        </div>
        <div className="prompt-container">Who on earth is this?</div>
        <div className="image-container">
          <div className="monarch-image">
            {guessesLeft === 1 && (
              <button className="hint-button" onClick={() => showHint()}>
                ?
              </button>
            )}
            <img
              alt="Nice try ;)"
              src={monarch.src && require("../images/" + monarch.src)}
            />
            {/* {loading === false && (
              <Feedback isCorrect={isCorrect} text={feedbackText} />
            )} */}
          </div>
        </div>
        <div className="guess-container">
          <div className="guess-textbox-container">
            {/* <input
              className="guess-textbox"
              onClick={() => setDropDownOpen(true)}
              // onBlur={() => handleFocusLeave(searchText)}
              onChange={(e) => handleTextInput(e.target.value)}
              value={searchText}
              type="text"
              placeholder="Monarch..."
            /> */}
            {/* <DropDown
              data={names}
              open={dropDownOpen}
              setOpen={setDropDownOpen}
              searchText={searchText}
              setSearchText={setSearchText}
            /> */}
            <DropDownV1 data={names} setSearchText={setSearchText} />
          </div>
          <button
            onClick={() => handleSubmit(searchText)}
            className="guess-button"
            disabled={guessesLeft === 0}
          >
            Guess
          </button>
        </div>
        <div className="guesses-container">
          <div className="guesses-left">
            {guessCount === MAX_GUESSES || isCorrect
              ? `It's ${monarch.name}.`
              : `GUESS ${MAX_GUESSES - guessesLeft + 1} of ${MAX_GUESSES}`}
          </div>
          <PreviousGuesses
            guesses={guesses}
            monarch={monarch}
            setLoading={setLoading}
            loading={loading}
            isCorrect={isCorrect}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
