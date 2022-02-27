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
  const [quizMessage, setQuizMessage] = useState("");

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
      }
    }
  }, [value, guessedCountries]);

  return (
    <div className="quiz">
      <div className="quiz__left">
        <div className="quiz__left__found">
          <span>
            Countries found:{" "}
            <b>
              {guessedCountries.length} of {countryNum}
            </b>
          </span>

          <div className="progress-bar">
            <div
              className="progress-bar__completed"
              style={{
                width: `${(guessedCountries.length / countryNum) * 100}%`,
              }}
            />
          </div>

          <button
            className="reset-guesses-button"
            onClick={() => {
              setGuessedCountries([]);
            }}
          >
            Reset Guesses
          </button>
        </div>

        <span className="quiz-message">{quizMessage}</span>
      </div>

      <div className="quiz__right">
        <input
          type="text"
          placeholder="Type a country..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
