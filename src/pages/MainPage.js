import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./styles/MainPage.css";

import { YearsOff, DropDownV1 } from "../components";
import { getMonarch, findMonarch, getHint } from "../helpers";

import data from "../data.json";
import config from "../config.json";

const MAX_GUESSES = 5;

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
      <div style={{ minWidth: "80px" }}>{value}</div>
      <div style={{}}>{!loading[index] && hint}</div>
      <div className={!loading[index] && "incorrect"}>
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

const MainPage = () => {
  const [searchText, setSearchText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(MAX_GUESSES);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState({});

  const names = data.map((monarch) => monarch.name);

  const monarch = getMonarch(data);

  const handleSubmit = (value) => {
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
    setSearchText("");
  };

  return (
    <div className="main-page-container">
      <div className="content-container">
        <div className="header">
          <div>{config.appName}</div>
          <img
            style={{ objectFit: "cover", maxWidth: "3rem" }}
            src={require("../images/knight.webp")}
            alt="The Knight."
          ></img>
        </div>
        {/* <div className="prompt-container">{config.prompt}</div> */}
        <div className="image-container">
          <div className="monarch-image">
            <img
              alt="Nice try ;)"
              src={monarch.src && require("../images/" + monarch.src)}
            />
          </div>
        </div>
        <div className="guess-container">
          <div className="guess-textbox-container">
            <DropDownV1 data={names} setSearchText={setSearchText} />
          </div>
          <button
            onClick={() => handleSubmit(searchText)}
            className="guess-button"
            style={
              guessesLeft === 0 || isCorrect
                ? {
                    /* todo */
                  }
                : {}
            }
            disabled={guessesLeft === 0 || isCorrect}
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
          marginBottom: "20px",
          fontSize: "13px",
        }}
      >
        <GitHubIcon />
        Check out my code!
      </a>
    </div>
  );
};

export default MainPage;
