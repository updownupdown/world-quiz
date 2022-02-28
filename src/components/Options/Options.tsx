import { ValueOf } from "../../utils/utils";
import "./Options.scss";

export const Quizzes = {
  TypeCountries: "List countries",
  FindCountries: "Find country",
  GuessByFlag: "Guess country by flag",
  TypeCapital: "Guess capital",
} as const;

export type QuizModes = ValueOf<typeof Quizzes>;

interface Props {
  quizMode: QuizModes | undefined;
  setIsModalOpen: (isOpen: boolean) => void;
  time: number;
  setIsTimePaused: (isPaused: boolean) => void;
  resetGame: () => void;
}

export const Options = ({
  quizMode,
  setIsModalOpen,
  time,
  setIsTimePaused,
  resetGame,
}: Props) => {
  function formatTime() {
    const showTime = new Date(time * 1000).toISOString().substr(14, 5);
    return showTime;
  }

  return (
    <div className="options">
      <span className="mode">
        Quiz Mode: <b>{quizMode}</b>
      </span>

      <div className="options__right">
        <span className="timer">{formatTime()}</span>

        <button
          className="button--text"
          onClick={() => {
            if (window.confirm("Are you sure you want to reset the puzzle?")) {
              resetGame();
              setIsTimePaused(true);
              setIsModalOpen(true);
            }
          }}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};
