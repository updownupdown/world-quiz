import React, { useState, useEffect } from "react";
import Globe from "./globe/Globe";
import {
  countriesData,
  countriesValidNames,
  countryNum,
  normalizeString,
} from "./globe/countriesData";
import clsx from "clsx";

function App() {
  const [value, setValue] = useState("");
  const [guessedCountries, setGuessedCountries] = useState<string[]>([]);
  const [focusOnCountry, setFocusOnCountry] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const countryList = () => {
    const list = countriesData
      // .filter((country) => guessedCountries.includes(country.country_code))
      .map((country) => {
        const guessed = guessedCountries.includes(country.country_code);
        return (
          <li
            key={country.country_code}
            className={clsx("guess", guessed && "guess--guessed")}
          >
            {country.name}
          </li>
        );
      });

    return <ul>{list}</ul>;
  };

  useEffect(() => {
    const userGuess = normalizeString(value);

    if (countriesValidNames.includes(userGuess)) {
      const matchingCountries = countriesData.filter((obj) => {
        return userGuess === normalizeString(obj.name);
      });

      const matchingCountryCode = matchingCountries[0].country_code;

      if (
        matchingCountryCode &&
        !guessedCountries.includes(matchingCountryCode)
      ) {
        setGuessedCountries([...guessedCountries, matchingCountryCode]);
        setFocusOnCountry(matchingCountryCode);
        setValue("");
        setInputMessage("You guessed " + matchingCountries[0].name + "!");
      }
    }
  }, [value, setValue]);

  return (
    <div className="layout">
      <div className="layout__globe">
        <Globe
          guessedCountries={guessedCountries}
          setGuessedCountries={setGuessedCountries}
          focusOnCountry={focusOnCountry}
          setFocusOnCountry={setFocusOnCountry}
          allowSelection={false}
          allowHover={false}
        />
      </div>
      <div className="layout__right">
        <div className="layout__right__quiz">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />

          <p>{inputMessage}</p>

          <button
            onClick={() => {
              setGuessedCountries([]);
            }}
          >
            Reset Guesses
          </button>
        </div>
        <div className="layout__right__info">
          <p>
            Countries found: {guessedCountries.length} of {countryNum}
          </p>
          {countryList()}
        </div>
      </div>
    </div>
  );
}

export default App;
