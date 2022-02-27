import React, { useState, useEffect } from "react";
import Globe from "./globe/Globe";
import clsx from "clsx";
import { Info } from "./info/Info";
import { useMemo } from "react";
import { normalizeString } from "./utils/utils";
import {
  normalizedCountryNames,
  countryNum,
  countryList,
} from "./globe/countryData";

function App() {
  const [value, setValue] = useState("");
  const [guessedCountries, setGuessedCountries] = useState<string[]>([]);
  const [focusOnCountry, setFocusOnCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const guessedCountryList = useMemo(() => {
    const list = countryList.map((country) => {
      const isGuessed = guessedCountries.includes(country.code);

      return (
        <li
          key={country.code}
          className={clsx("guess", isGuessed && "guess--guessed")}
        >
          {country.name}
        </li>
      );
    });

    return <ul>{list}</ul>;
  }, [guessedCountries]);

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
        setInputMessage("You guessed " + matchingCountryName + "!");
      }
    }
  }, [value]);

  return (
    <div className="layout-wrap">
      <div className="layout">
        <div className="layout__globe">
          <Globe
            guessedCountries={guessedCountries}
            setGuessedCountries={setGuessedCountries}
            focusOnCountry={focusOnCountry}
            setFocusOnCountry={setFocusOnCountry}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            allowSelection={false}
            allowHover={false}
          />
        </div>

        <div className="layout__info">
          <Info selectedCountry={selectedCountry} />
        </div>

        <div className="layout__quiz">
          <p>
            Countries found: {guessedCountries.length} of {countryNum}
          </p>

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

        <div className="layout__list">{guessedCountryList}</div>
      </div>
    </div>
  );
}

export default App;
