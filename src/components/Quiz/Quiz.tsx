import { useState } from "react";
import clsx from "clsx";
import "./Quiz.scss";
import { useEffect } from "react";

interface Props {
  setFocusOnCountry: (country: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  inputHint: string;
  countryNum: number;
  positionInList: number;
}

export const Quiz = ({
  inputValue,
  setInputValue,
  inputHint,
  countryNum,
  positionInList,
}: Props) => {
  const [revealedHint, setRevealedHint] = useState(0);
  const hintLength = inputHint.length;

  useEffect(() => {
    setRevealedHint(0);
  }, [inputHint]);

  function showHint() {
    if (!inputHint) return "No hint available";

    const afterHint = revealedHint === inputHint.length ? "" : "...";

    return inputHint.slice(0, revealedHint) + afterHint;
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
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        <span
          className={clsx("quiz-hint", !inputHint && "quiz-hint--empty")}
          onClick={() => {
            if (revealedHint < hintLength) {
              setRevealedHint(revealedHint + 1);
            }
          }}
        >
          <span className="quiz-hint__label">Click for hint:</span>
          <span className="quiz-hint__text">{showHint()}</span>
        </span>
      </div>
    </div>
  );
};
