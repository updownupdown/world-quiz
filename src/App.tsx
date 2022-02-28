import { useEffect, useState } from "react";
import Globe from "./components/Globe/Globe";
import { Info } from "./components/Info/Info";
import { Header } from "./components/Header/Header";
import { List } from "./components/List/List";
import { Quiz } from "./components/Quiz/Quiz";
import { Options, QuizModes, Quizzes } from "./components/Options/Options";
import {
  countryNames,
  getCountryByCode,
  getCountryByName,
} from "./data/countryData";
import { animateProgressBar, normalizeString } from "./utils/utils";
import { CountryData } from "./data/countryList";
import { Modal } from "./components/Modal/Modal";
import Confetti from "react-confetti";
import clsx from "clsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const [guessedCountries, setGuessedCountries] = useState<string[]>([]);
  const [focusOnCountry, setFocusOnCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryInfo, setSelectedCountryInfo] = useState<
    CountryData | undefined
  >(undefined);

  const [quizMode, setQuizMode] = useState<QuizModes | undefined>(undefined);
  const [includeMinor, setIncludeMinor] = useState(false);
  const [includeSmall, setIncludeSmall] = useState(false);

  const [time, setTime] = useState(0);
  const [isTimePaused, setIsTimePaused] = useState(true);

  const [randomList, setRandomList] = useState<string[]>([]);
  const [countryNum, setCountryNum] = useState(0);
  const [positionInList, setPositionInList] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const [inputHint, setInputHint] = useState("");

  const [clickedCountry, setClickedCountry] = useState("");

  function resetGame() {
    setTime(0);
    setIsTimePaused(true);

    setSelectedCountry("");
    setFocusOnCountry("");
    setGuessedCountries([]);
    setInputHint("");
    setQuizMode(undefined);
    setIsModalOpen(true);
    setPositionInList(0);
    setCountryNum(0);
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      !isTimePaused && setTime(time + 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  function triggerWin() {
    setIsTimePaused(true);
    setShowConfetti(true);
    resetGame();
  }

  function advanceList(firstTime: boolean) {
    if (positionInList === randomList.length - 1) {
      triggerWin();
      return;
    }

    let selectIndex = firstTime ? 0 : positionInList + 1;
    const countryCode = randomList[selectIndex];
    const countryInfo = getCountryByCode(countryCode);

    setPositionInList(selectIndex);
    setSelectedCountry(countryCode);
    setSelectedCountryInfo(countryInfo);

    if (quizMode === Quizzes.TypeCapital) {
      setInputHint(countryInfo.capital ?? "");
    }
    if (quizMode === Quizzes.GuessByFlag) {
      setInputHint(countryInfo.name ?? "");
    }

    if (
      quizMode === Quizzes.TypeCapital ||
      quizMode === Quizzes.GuessByFlag ||
      quizMode === Quizzes.FindCountries
    ) {
      setFocusOnCountry(countryCode);
    }
  }

  // Reset game when changing mode, toggling country list
  useEffect(() => {
    if (
      quizMode === Quizzes.TypeCapital ||
      quizMode === Quizzes.FindCountries ||
      quizMode === Quizzes.GuessByFlag
    ) {
      advanceList(true);
    }
  }, [quizMode]);

  useEffect(() => {
    if (quizMode === Quizzes.FindCountries) {
      if (clickedCountry === selectedCountryInfo?.code) {
        animateProgressBar();
        setGuessedCountries([...guessedCountries, selectedCountry]);
        advanceList(false);
        setInputHint("");
      } else {
        setInputHint(
          "That was " + getCountryByCode(clickedCountry).name + "..."
        );
      }
    }
  }, [clickedCountry]);

  useEffect(() => {
    const userGuess = normalizeString(inputValue);

    if (quizMode === Quizzes.TypeCapital) {
      if (
        selectedCountryInfo &&
        selectedCountryInfo.capital &&
        userGuess === normalizeString(selectedCountryInfo.capital)
      ) {
        animateProgressBar();
        setInputValue("");
        advanceList(false);
      }
    }

    if (quizMode === Quizzes.GuessByFlag) {
      if (
        selectedCountryInfo &&
        selectedCountryInfo.capital &&
        userGuess === normalizeString(selectedCountryInfo.name)
      ) {
        animateProgressBar();
        setInputValue("");
        advanceList(false);
      }
    }

    if (quizMode === Quizzes.TypeCountries) {
      if (
        (includeMinor && countryNames.withMinors.includes(userGuess)) ||
        countryNames.withoutMinors.includes(userGuess)
      ) {
        const matchingCountry = getCountryByName(userGuess);

        if (
          matchingCountry &&
          !guessedCountries.includes(matchingCountry.code)
        ) {
          setPositionInList(positionInList + 1);
          animateProgressBar();
          setInputValue("");

          setGuessedCountries([...guessedCountries, matchingCountry.code]);
          setFocusOnCountry(matchingCountry.code);
          setSelectedCountry(matchingCountry.code);

          if (guessedCountries.length + 1 === countryNum) {
            triggerWin();
          }
        }
      }
    }
  }, [inputValue]);

  return (
    <>
      <Modal
        setIncludeMinor={setIncludeMinor}
        setIncludeSmall={setIncludeSmall}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setQuizMode={setQuizMode}
        setRandomList={setRandomList}
        setCountryNum={setCountryNum}
        setIsTimePaused={setIsTimePaused}
        showConfetti={showConfetti}
      />

      <div className="confetti-container">
        <Confetti
          numberOfPieces={showConfetti ? 1000 : 0}
          recycle={false}
          onConfettiComplete={(confetti) => {
            setShowConfetti(false);
            confetti!.reset();
          }}
        />
      </div>

      <div className={clsx("page", isModalOpen && "page--modal-open")}>
        <Header />

        <div className="page__content">
          <Options
            quizMode={quizMode}
            setIsModalOpen={setIsModalOpen}
            time={time}
            setIsTimePaused={setIsTimePaused}
            resetGame={resetGame}
          />

          <div className="top">
            <div className="top__display">
              <Info selectedCountry={selectedCountry} quizMode={quizMode} />

              <Quiz
                positionInList={positionInList}
                setFocusOnCountry={setFocusOnCountry}
                inputValue={inputValue}
                setInputValue={setInputValue}
                inputHint={inputHint}
                countryNum={countryNum}
                quizMode={quizMode}
              />
            </div>

            <div className="top__globe">
              <Globe
                guessedCountries={guessedCountries}
                focusOnCountry={focusOnCountry}
                allowSelection={quizMode === Quizzes.FindCountries}
                allowHover={quizMode === Quizzes.FindCountries}
                setClickedCountry={setClickedCountry}
                quizMode={quizMode}
              />
            </div>
          </div>

          {quizMode === Quizzes.TypeCountries && (
            <List
              guessedCountries={guessedCountries}
              includeMinor={includeMinor}
              includeSmall={includeSmall}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
