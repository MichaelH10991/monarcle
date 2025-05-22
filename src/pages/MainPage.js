import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./styles/MainPage.css";

import { YearsOff, DropDownV1 } from "../components";
import { getMonarch, findMonarch, getHint } from "../helpers";

import config from "../config.js";
const data = config.data;

const MAX_GUESSES = config.maxGuesses || 5;

const FeedbackComponent = ({ options }) => {
  const className = options.guessObject.correct ? "correct" : "incorrect";

  const HintComponent = () => {
    if (options.guessObject.correct || !options.guessObject.hint) {
      return undefined;
    }
    return (
      <div style={{ fontSize: "10px" }}>
        {!options.loading[options.index] && options.guessObject.hint}
      </div>
    );
  };

  const Foo = () => {
    if (options.variant === "number") {
      return (
        <div className={!options.loading[options.index] ? className : ""}>
          <YearsOff
            from={options.guessObject.guessedMonarch.reignStarted}
            to={options.monarch.reignStarted}
            setLoading={options.setLoading}
            index={options.index}
          />
        </div>
      );
    }
  };

  return (
    <div
      className={"previous-guess"}
      style={{ background: config.theme.secondary }}
    >
      <div className={"first-hint"}>{options.guessObject.value}</div>
      <HintComponent />
      <div className={"second-hint"}>
        {(options.variant === "number" && (
          <div className={!options.loading[options.index] ? className : ""}>
            <YearsOff
              from={options.guessObject.guessedMonarch.reignStarted}
              to={options.monarch.reignStarted}
              setLoading={options.setLoading}
              index={options.index}
            />
          </div>
        )) ||
          (options.variant === "text" && <div>correct</div>)}
        {/* <Foo /> */}
      </div>
    </div>
  );
};

const PreviousGuesses = ({ guesses, monarch, setLoading, loading }) => {
  return guesses.map((guess, index) => {
    return (
      <FeedbackComponent
        options={{
          guessObject: guess,
          monarch: monarch,
          loading: loading,
          setLoading: setLoading,
          index: index,
          variant: "number",
        }}
      />
    );
  });
};

const Banner = () => {
  const Icon = ({ flip }) => {
    try {
      const icon = require(`../images/icon.webp`);
      return (
        <img
          className={flip ? "knight-flip" : "knight"}
          src={icon}
          alt={config.iconAlt || "icon"}
        />
      );
    } catch (e) {
      return undefined;
    }
  };

  return (
    <div className="header">
      <Icon />
      <div
        className="header-text"
        style={{ fontFamily: config.theme.fontFamily }}
      >
        {config.appName}
      </div>
      <Icon flip />
    </div>
  );
};

const MainPage = () => {
  const [searchText, setSearchText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(MAX_GUESSES);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState({});

  const names = data.map((monarch) => monarch.name);

  const correctAnswer = getMonarch(data);

  const handleSubmit = (value) => {
    // can refactor this, create a response obj which contains all the data
    // required to handle an answer response
    if (!value) {
      return;
    }

    if (!findMonarch(data, value)) {
      alert(`Monarch "${value}" not found in list.`);
      return;
    }

    setLoading((loadingStates) => ({ ...loadingStates, [guessCount]: true }));
    setGuessCount((curCount) => curCount + 1);

    let correct;
    if (config.logic) {
      correct = config.logic(
        value.toLowerCase(),
        correctAnswer.name.toLowerCase()
      );
    } else {
      correct = value.toLowerCase() === correctAnswer.name.toLocaleLowerCase();
    }

    setGuesses((guesses) => [
      ...guesses,
      {
        value,
        correct,
        hint: getHint(correctAnswer, guessCount),
        guessedMonarch: findMonarch(data, value),
      },
    ]);
    setIsCorrect(correct);
    setGuessesLeft(guessesLeft - 1);
    setSearchText("");
  };

  return (
    <div className="main-page-container">
      <div className="content-container">
        <Banner />
        {config.prompt && (
          <div className="prompt-container">{config.prompt}</div>
        )}

        <div className="image-container">
          <div className="monarch-image">
            <img
              alt="Nice try ;)"
              src={
                correctAnswer.src && require("../images/" + correctAnswer.src)
              }
            />
          </div>
        </div>
        <div className="guess-container">
          <div className="guess-textbox-container">
            <DropDownV1
              data={names}
              setSearchText={setSearchText}
              placeholder={config.placeholderText}
            />
          </div>
          <button
            onClick={() => handleSubmit(searchText)}
            className="guess-button"
            style={{
              background: config.theme.secondary,
              borderColor: config.theme.borderColor,
            }}
            disabled={guessesLeft === 0 || isCorrect}
          >
            Guess
          </button>
        </div>
        <div className="guesses-container">
          <div
            className="guesses-left"
            style={{
              background: config.theme.secondary,
              borderColor: config.theme.borderColor,
            }}
          >
            {guessCount === MAX_GUESSES || isCorrect
              ? `It's ${correctAnswer.name}.`
              : `GUESS ${MAX_GUESSES - guessesLeft + 1} of ${MAX_GUESSES}`}
          </div>
          <PreviousGuesses
            guesses={guesses}
            monarch={correctAnswer}
            setLoading={setLoading}
            loading={loading}
            isCorrect={isCorrect}
          />
        </div>
      </div>
      <div
        style={{
          paddingBottom: "20px",
          fontSize: "13px",
          textAlign: "center",
        }}
      >
        <a
          href="https://github.com/MichaelH10991/monarcle"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            color: "white",
          }}
        >
          <GitHubIcon />
          Check out the code!
        </a>
        <div style={{ fontSize: "10px" }}>v{process.env.REACT_APP_VERSION}</div>
      </div>
    </div>
  );
};

export default MainPage;
