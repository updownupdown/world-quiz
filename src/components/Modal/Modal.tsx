import clsx from "clsx";
import { useState } from "react";
import { countryNames, getRandomCountryList } from "../../data/countryData";
import { QuizModes, Quizzes } from "../Options/Options";
import { Toggle, ToggleGroup } from "../Options/Toggle";
import "./Modal.scss";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setQuizMode: (mode: QuizModes) => void;
  includeMinor: boolean;
  setRandomList: (list: string[]) => void;
  setCountryNum: (number: number) => void;
  setIsTimePaused: (isPaused: boolean) => void;
  setIncludeMinor: (include: boolean) => void;
  showConfetti: boolean;
}

export const Modal = ({
  isModalOpen,
  setIsModalOpen,
  setQuizMode,
  includeMinor,
  setRandomList,
  setCountryNum,
  setIsTimePaused,
  setIncludeMinor,
  showConfetti,
}: Props) => {
  const [optionQuizMode, setOptionQuizMode] = useState<QuizModes>(
    Quizzes.TypeCountries
  );
  const [optionIncludeMinor, setOptionIncludeMinor] = useState(false);
  const [optionLimit, setOptionLimit] = useState(5);

  if (!isModalOpen) return <></>;

  return (
    <div className="modal-container">
      <h2
        className={clsx("win-message", showConfetti && "win-message--visible")}
      >
        Good job!
      </h2>

      <div className="modal-mask" />
      <div className="modal">
        <h3>Start Quiz</h3>

        <ToggleGroup label="Quiz Mode">
          <Toggle
            label="Type country names"
            isCurrent={optionQuizMode === Quizzes.TypeCountries}
            onClick={() => setOptionQuizMode(Quizzes.TypeCountries)}
          />
          <Toggle
            label="Guess capitals"
            isCurrent={optionQuizMode === Quizzes.TypeCapital}
            onClick={() => setOptionQuizMode(Quizzes.TypeCapital)}
          />
          <Toggle
            label="Guess country by flag"
            isCurrent={optionQuizMode === Quizzes.GuessByFlag}
            onClick={() => setOptionQuizMode(Quizzes.GuessByFlag)}
          />
          <Toggle
            label="Find country on globe"
            isCurrent={optionQuizMode === Quizzes.FindCountries}
            onClick={() => setOptionQuizMode(Quizzes.FindCountries)}
          />
        </ToggleGroup>

        <ToggleGroup label="Number of Countries">
          <Toggle
            label="5"
            isCurrent={optionLimit === 5}
            onClick={() => setOptionLimit(5)}
          />
          <Toggle
            label="10"
            isCurrent={optionLimit === 10}
            onClick={() => setOptionLimit(10)}
          />
          <Toggle
            label="20"
            isCurrent={optionLimit === 20}
            onClick={() => setOptionLimit(20)}
          />
          <Toggle
            label="50"
            isCurrent={optionLimit === 50}
            onClick={() => setOptionLimit(50)}
          />
          <Toggle
            label="All"
            isCurrent={optionLimit === 0}
            onClick={() => setOptionLimit(0)}
          />
        </ToggleGroup>

        <ToggleGroup label="Include Minor Countries">
          <Toggle
            label="Yes"
            isCurrent={optionIncludeMinor}
            onClick={() => setOptionIncludeMinor(true)}
          />
          <Toggle
            label="No"
            isCurrent={!optionIncludeMinor}
            onClick={() => setOptionIncludeMinor(false)}
          />
        </ToggleGroup>

        <button
          className="button--text"
          onClick={() => {
            setQuizMode(optionQuizMode);

            setRandomList(
              getRandomCountryList(optionIncludeMinor, optionLimit)
            );

            let numberOfCountries = optionLimit;
            if (numberOfCountries === 0) {
              numberOfCountries = optionIncludeMinor
                ? countryNames.withMinors.length
                : countryNames.withoutMinors.length;
            }
            setCountryNum(numberOfCountries);

            setIsModalOpen(false);
            setIsTimePaused(false);
            setIncludeMinor(optionIncludeMinor);
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};
