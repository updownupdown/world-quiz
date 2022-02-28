import { useState } from "react";
import clsx from "clsx";
import "./Quiz.scss";
import { useEffect } from "react";
import { QuizModes, Quizzes } from "../Options/Options";

interface Props {
  setFocusOnCountry: (country: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  inputHint: string;
  countryNum: number;
  positionInList: number;
  quizMode: QuizModes | undefined;
}

export const Quiz = ({
  inputValue,
  setInputValue,
  inputHint,
  countryNum,
  positionInList,
  quizMode,
}: Props) => {
  const [revealedHint, setRevealedHint] = useState(0);
  const hintLength = inputHint.length;

  useEffect(() => {
    setRevealedHint(0);
  }, [inputHint]);

  function triggerHint() {
    if (quizMode !== Quizzes.FindCountries && revealedHint < hintLength) {
      setRevealedHint(revealedHint + 1);
    }
  }

  function showHint() {
    if (!inputHint) return "No hint available";

    if (quizMode === Quizzes.FindCountries) {
      return inputHint;
    }

    const afterHint = revealedHint === inputHint.length ? "" : "...";

    return (
      <>
        <span className="quiz-hint__text">
          {inputHint.slice(0, revealedHint) + afterHint}
        </span>
        <span className="quiz-hint__label">Click or type "?" for hint</span>
      </>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__progress">
        <div className="quiz__progress__text">
          <span className="progress-count">
            {positionInList} of {countryNum}
          </span>
        </div>

        <div className="progress-bar animate-on-guess">
          <div
            className="progress-bar__completed"
            style={{
              width: `${(positionInList / countryNum) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="quiz__input">
        <input
          type="text"
          placeholder="Type a country..."
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "?") {
              e.preventDefault();
              triggerHint();
            }
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        <span
          className={clsx(
            "quiz-hint",
            quizMode !== Quizzes.FindCountries && "quiz-hint--clickable",
            !inputHint && "quiz-hint--empty"
          )}
          onClick={() => triggerHint()}
        >
          {showHint()}
        </span>
      </div>
    </div>
  );
};
