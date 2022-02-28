import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__center">
        <h1>World Quiz</h1>
        <a
          href="https://github.com/updownupdown/world-quiz"
          target="_blank"
          rel="noreferrer"
        >
          About
        </a>
      </div>
    </header>
  );
};
