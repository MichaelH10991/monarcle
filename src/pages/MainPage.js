import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./styles/MainPage.css";

import { YearsOff, DropDownV1 } from "../components";
import { getMonarch, findMonarch, getHint } from "../helpers";

import config from "../config.js";
const data = config.data;

const MAX_GUESSES = config.maxGuesses || 5;

const Correct = ({ value, monarch, loading, setLoading, index }) => {
  return (
    <div className={`previous-guess`}>
      <div style={{ whiteSpace: "nowrap" }}>{value}</div>
      <div className={!loading[index] && "correct"}>
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
    <div className={`previous-guess`}>
      <div style={{ fontSize: "10px", minWidth: "49px" }}>{value}</div>
      <div style={{ fontSize: "10px" }}>{!loading[index] && hint}</div>
      <div
        style={{
          display: "flex",
          width: "248px",
          alignItems: "center",
          justifyContent: "right",
          fontSize: "8px",
          fontWeight: "bold",
        }}
      >
        <div className={!loading[index] && "incorrect"}>
          <YearsOff
            guess={findMonarch(data, value).reignStarted}
            answer={monarch.reignStarted}
            setLoading={setLoading}
            index={index}
          />
        </div>
      </div>
    </div>
  );
};

const Foo = ({ options }) => {
  const className = options.correct ? "correct" : "incorrect";

  const HintComponent = () => {
    if (options.correct || !options.hint) {
      return undefined;
    }
    return (
      <div style={{ fontSize: "10px" }}>
        {!options.loading[options.index] && options.hint}
      </div>
    );
  };

  return (
    <div
      className={`previous-guess`}
      style={{ background: config.theme.secondary }}
    >
      <div style={{ fontSize: "10px", minWidth: "49px" }}>{options.value}</div>
      <HintComponent />
      <div
        style={{
          display: "flex",
          width: "248px",
          alignItems: "center",
          justifyContent: "right",
          fontSize: "8px",
          fontWeight: "bold",
        }}
      >
        <div className={!options.loading[options.index] ? className : ""}>
          <YearsOff
            indicatorValue={config.indicatorValue(
              findMonarch(data, options.value),
              options.monarch
            )}
            setLoading={options.setLoading}
            index={options.index}
          />
        </div>
      </div>
    </div>
  );
};

const PreviousGuesses = ({ guesses, monarch, setLoading, loading }) => {
  return guesses.map((guess, index) => {
    return (
      <Foo
        options={{
          value: guess.value,
          monarch: monarch,
          loading: loading,
          setLoading: setLoading,
          index: index,
          hint: guess.hint,
          correct: guess.correct,
        }}
      />
    );
    // return (
    //   <div>
    //     {guess.correct ? (
    //       <Correct
    //         value={guess.value}
    //         monarch={monarch}
    //         loading={loading}
    //         setLoading={setLoading}
    //         index={index}
    //       />
    //     ) : (
    //       <Incorrect
    //         value={guess.value}
    //         monarch={monarch}
    //         loading={loading}
    //         setLoading={setLoading}
    //         hint={guess.hint}
    //         index={index}
    //       />
    //     )}
    //   </div>
    // );
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
      <div>{config.appName}</div>
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

    // if (!value) {
    //   setLoading((loadingStates) => ({
    //     ...loadingStates,
    //     [guessCount]: false,
    //   }));
    //   return;
    // }

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
      <a
        href="https://github.com/MichaelH10991/monarcle"
        target="_blank"
        rel="noreferrer"
        style={{
          textAlign: "center",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          paddingBottom: "20px",
          fontSize: "13px",
        }}
      >
        <GitHubIcon />
        Check out the code!
      </a>
    </div>
  );
};

export default MainPage;
