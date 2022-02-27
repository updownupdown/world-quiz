import React, { useState, useEffect } from "react";
import Globe from "./components/Globe/Globe";
import clsx from "clsx";
import { Info } from "./components/Info/Info";
import { useMemo } from "react";
import { normalizeString } from "./utils/utils";
import {
  normalizedCountryNames,
  countryNum,
  countryList,
} from "./data/countryData";
import { Header } from "./components/Header/Header";
import { List } from "./components/List/List";

function App() {
  const [value, setValue] = useState("");
  const [guessedCountries, setGuessedCountries] = useState<string[]>([]);
  const [focusOnCountry, setFocusOnCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [inputMessage, setInputMessage] = useState("");

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
  }, [value, guessedCountries]);

  return (
    <div className="page">
      <Header />

      <div className="display">
        <div className="display__globe">
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

        <Info selectedCountry={selectedCountry} />
      </div>

      <div className="quiz">
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

      <List guessedCountries={guessedCountries} />
    </div>
  );
}

export default App;
