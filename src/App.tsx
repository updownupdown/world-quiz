import { useState } from "react";
import Globe from "./components/Globe/Globe";
import { Info } from "./components/Info/Info";

import { Header } from "./components/Header/Header";
import { List } from "./components/List/List";
import { Quiz } from "./components/Quiz/Quiz";

function App() {
  const [guessedCountries, setGuessedCountries] = useState<string[]>([]);
  const [focusOnCountry, setFocusOnCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div className="page">
      <Header />

      <div className="page__content">
        <div className="display">
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

          <Info selectedCountry={selectedCountry} />
        </div>

        <Quiz
          guessedCountries={guessedCountries}
          setGuessedCountries={setGuessedCountries}
          setFocusOnCountry={setFocusOnCountry}
          setSelectedCountry={setSelectedCountry}
        />

        <List guessedCountries={guessedCountries} />
      </div>
    </div>
  );
}

export default App;
