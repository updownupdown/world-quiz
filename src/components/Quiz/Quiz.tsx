import { useEffect, useState } from "react";
import {
  countryList,
  countryNum,
  normalizedCountryNames,
} from "../../data/countryData";
import { normalizeString } from "../../utils/utils";
import "./Quiz.scss";

interface Props {
  guessedCountries: string[];
  setGuessedCountries: (countries: string[]) => void;
  setFocusOnCountry: (country: string) => void;
  setSelectedCountry: (country: string) => void;
}

export const Quiz = ({
  guessedCountries,
  setGuessedCountries,
  setFocusOnCountry,
  setSelectedCountry,
}: Props) => {
  const [value, setValue] = useState("");

  const defaultQuizMessage = "Type a guess to get started...";
  const [quizMessage, setQuizMessage] = useState(defaultQuizMessage);

  function animateProgressBar() {
    // const el = document.getElementById("progress-bar")!;
    const animatedItems = document.getElementsByClassName("animate-on-guess")!;

    for (let el of animatedItems) {
      el.classList.add("animate");

      setTimeout(() => {
        el.classList.remove("animate");
      }, 1000);
    }
  }

  useEffect(() => {
    const userGuess = normalizeString(value);

    const guessIndex = normalizedCountryNames.indexOf(userGuess);

    if (guessIndex !== -1) {
      const matchingCountryCode = countryList[guessIndex].code;
      const matchingCountryName = countryList[guessIndex].name;

      if (
        matchingCountryCode &&
        !guessedCountries.includes(matchingCountryCode)
      ) {
        setGuessedCountries([...guessedCountries, matchingCountryCode]);
        setFocusOnCountry(matchingCountryCode);
        setSelectedCountry(matchingCountryCode);
        setValue("");
        setQuizMessage("You guessed " + matchingCountryName + "!");
        animateProgressBar();
      }
    }
  }, [value, guessedCountries]);

  return (
    <div className="quiz">
      <div className="quiz__left">
        <div className="quiz__progress">
          <div className="quiz__progress__top">
            <span className="quiz-message animate-on-guess">{quizMessage}</span>
            <span className="progress-count">
              {guessedCountries.length} of {countryNum}
            </span>
          </div>

          <div className="progress-bar animate-on-guess">
            <div
              className="progress-bar__completed"
              style={{
                width: `${(guessedCountries.length / countryNum) * 100}%`,
              }}
            />
          </div>

          <button
            className="button--simple"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to reset your guesses?")
              ) {
                setGuessedCountries([]);
                setQuizMessage(defaultQuizMessage);
                setSelectedCountry("");
              }
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Type a country..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};
