import { ValueOf } from "../../utils/utils";
import "./Header.scss";

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
    <header className="header-wrap">
      <div className="header">
        <div className="header__title">
          <h1>World Quiz</h1>
          <a
            href="https://github.com/updownupdown/world-quiz"
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>
        </div>

        <div className="header__mode">
          <span className="mode">{quizMode}</span>
          <span className="timer">{formatTime()}</span>
        </div>

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
          Restart
        </button>
      </div>
    </header>
  );
};
