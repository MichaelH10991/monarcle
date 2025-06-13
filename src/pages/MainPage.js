import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./styles/MainPage.css";

import { DropDown, GuessButton, Guesses, Hint, common } from "../components";
import {
  getMonarch,
  findMonarch,
  getHint,
  getRandomMonarch,
  getIsLoading,
} from "../helpers";

import config from "../config.js";

const { CorrectnessWrapper } = common;

const data = config.data;
const theme = config.theme;

const MAX_GUESSES = config.maxGuesses || 5;

const Banner = ({ handleClick }) => {
  const Icon = ({ flip }) => {
    try {
      const icon = require(`../images/icon.webp`);
      return (
        <img
          onClick={() => handleClick()}
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

const useDisabled = (guessesLeft, isCorrect) => {
  return guessesLeft === 0 || isCorrect;
};

const MainPage = () => {
  const [searchText, setSearchText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(getMonarch(data));
  const [guesses, setGuesses] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(MAX_GUESSES);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [hints, setHints] = useState([]);

  const [clickedCount, setClickedCount] = useState(0);

  const [stats, setStats] = useState({}); // use to combine guessCount, guessesLeft etc

  const disabled = useDisabled(guessesLeft, isCorrect);
  const isLoading = getIsLoading(guesses, loadingStates);

  // const [guessesLeft, setGuessesLeft, isCorrect, setIsCorrect] =
  //   useThing(config);

  // const [searchText, setSearchText] = useSearchText("");

  const names = data.map((monarch) => monarch.name);

  // const correctAnswer = getMonarch(data);

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

    if (config.variant === "number") {
      setLoadingStates((loadingStates) => ({
        ...loadingStates,
        [guessCount]: "loading",
      }));
    }
    setGuessCount((curCount) => curCount + 1);

    const correct =
      value.toLowerCase() === correctAnswer.name.toLocaleLowerCase();

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

    setHints(
      (prevHints) =>
        !isLoading && [...prevHints, getHint(correctAnswer, guessCount)]
    );
  };

  const handleNewGame = (canStartNewGame) => {
    if (canStartNewGame) {
      console.log(getRandomMonarch(data));
      setCorrectAnswer(getRandomMonarch(data));
    }
  };

  const handleSpecial = (clickedCount, setClickedCount, disabled) => {
    // const canStartNewGame = clickedCount >= 5 && disabled;
    const canStartNewGame = true;
    if (canStartNewGame) {
      setClickedCount(0);
      handleNewGame(canStartNewGame);
      setHints([]);
      setGuesses([]);
      setGuessCount(0);
      setGuessCount(0);
    } else {
      setClickedCount((count) => (count += 1));
    }
  };

  return (
    <div className="main-page-container">
      <div className="content-container">
        <Banner
          handleClick={() =>
            handleSpecial(clickedCount, setClickedCount, disabled)
          }
        />
        {config.prompt && (
          <div className="prompt-container">{config.prompt}</div>
        )}

        <div className="image-container">
          <img
            alt={config.altText}
            src={correctAnswer.src && require("../images/" + correctAnswer.src)}
          />
        </div>
        <div className="guess-container">
          <div className="guess-textbox-container">
            <DropDown
              data={names}
              setSearchText={setSearchText}
              placeholder={config.placeholderText}
              theme={theme}
            />
          </div>
          <GuessButton
            style={{
              background: config.theme.secondary,
              borderColor: config.theme.borderColor,
            }}
            handleSubmit={() => handleSubmit(searchText)}
            disabled={disabled}
            text="Guess"
          />
        </div>
        <div className="guesses-container">
          <CorrectnessWrapper
            state={loadingStates[guesses.length - 1]}
            style={{
              correct: theme.correct,
              incorrect: theme.incorrect,
            }}
          >
            <div
              className="guesses-left"
              style={{
                background: config.theme.secondary,
                borderColor: config.theme.borderColor,
              }}
            >
              {guessCount === MAX_GUESSES || (!isLoading && isCorrect)
                ? `It's ${correctAnswer.name}!`
                : `GUESS ${MAX_GUESSES - guessesLeft + 1} of ${MAX_GUESSES}`}
            </div>
          </CorrectnessWrapper>
          <Hint
            isCorrect={isCorrect}
            isLoading={isLoading}
            hints={hints}
            theme={config.theme}
          />
          <Guesses
            guesses={guesses}
            monarch={correctAnswer}
            setLoading={setLoadingStates}
            loading={loadingStates}
            isCorrect={isCorrect}
            theme={theme}
            variant={config.variant}
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
